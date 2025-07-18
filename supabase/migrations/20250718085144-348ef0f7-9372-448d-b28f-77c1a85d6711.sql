
-- First, let's clean up and recreate the admin user properly
DELETE FROM public.user_roles WHERE user_id IN (
  SELECT id FROM public.profiles WHERE email = 'admin@duemari.com'
);
DELETE FROM public.profiles WHERE email = 'admin@duemari.com';
DELETE FROM auth.users WHERE email = 'admin@duemari.com';

-- Create the admin user properly
DO $$
DECLARE
  admin_user_id UUID := gen_random_uuid();
BEGIN
  -- Insert into auth.users
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role, 
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    admin_user_id,
    'authenticated',
    'authenticated',
    'admin@duemari.com',
    crypt('AdminPassword123!', gen_salt('bf')),
    NOW(),
    NULL,
    NULL,
    '{"provider": "email", "providers": ["email"]}',
    '{"first_name": "Admin", "last_name": "Due Mari"}',
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  );

  -- Insert into profiles
  INSERT INTO public.profiles (
    id,
    email,
    first_name,
    last_name,
    codice_fiscale,
    status,
    created_at,
    updated_at
  ) VALUES (
    admin_user_id,
    'admin@duemari.com',
    'Admin',
    'Due Mari',
    'ADMIN_CF_2024',
    'approved',
    NOW(),
    NOW()
  );

  -- Insert admin role
  INSERT INTO public.user_roles (user_id, role, created_at)
  VALUES (admin_user_id, 'admin', NOW());
END $$;

-- Create function to authenticate user by fiscal code
CREATE OR REPLACE FUNCTION public.authenticate_by_fiscal_code(
  input_codice_fiscale TEXT,
  input_password TEXT
)
RETURNS TABLE(
  user_id UUID,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  is_admin BOOLEAN
)
LANGUAGE PLPGSQL
SECURITY DEFINER
AS $$
DECLARE
  profile_record public.profiles%ROWTYPE;
  auth_user_record auth.users%ROWTYPE;
  is_admin_user BOOLEAN := FALSE;
BEGIN
  -- Find profile by codice_fiscale
  SELECT * INTO profile_record
  FROM public.profiles p
  WHERE p.codice_fiscale = input_codice_fiscale 
    AND p.status = 'approved';
  
  IF NOT FOUND THEN
    RETURN;
  END IF;
  
  -- Get auth user record
  SELECT * INTO auth_user_record
  FROM auth.users au
  WHERE au.id = profile_record.id;
  
  IF NOT FOUND THEN
    RETURN;
  END IF;
  
  -- Verify password
  IF auth_user_record.encrypted_password != crypt(input_password, auth_user_record.encrypted_password) THEN
    RETURN;
  END IF;
  
  -- Check if user is admin
  SELECT EXISTS(
    SELECT 1 FROM public.user_roles ur 
    WHERE ur.user_id = profile_record.id AND ur.role = 'admin'
  ) INTO is_admin_user;
  
  -- Return user data
  RETURN QUERY SELECT 
    profile_record.id,
    profile_record.email,
    profile_record.first_name,
    profile_record.last_name,
    is_admin_user;
END;
$$;

-- Update the approve_registration function to set a default password
CREATE OR REPLACE FUNCTION public.approve_registration(
  registration_id UUID,
  admin_email TEXT DEFAULT NULL,
  admin_password TEXT DEFAULT 'TempPass123!'
)
RETURNS UUID
LANGUAGE PLPGSQL
SECURITY DEFINER
AS $$
DECLARE
  reg_record public.pending_registrations%ROWTYPE;
  new_user_id UUID := gen_random_uuid();
  temp_email TEXT;
BEGIN
  -- Get the pending registration
  SELECT * INTO reg_record 
  FROM public.pending_registrations 
  WHERE id = registration_id AND status = 'pending';
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Registration not found or already processed';
  END IF;
  
  -- Generate temporary email
  temp_email := COALESCE(admin_email, LOWER(reg_record.first_name || '.' || reg_record.last_name || '@duemari.local'));
  
  -- Create user in auth.users with instance_id
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    new_user_id,
    'authenticated',
    'authenticated',
    temp_email,
    crypt(admin_password, gen_salt('bf')),
    NOW(),
    '{"provider": "email", "providers": ["email"]}',
    jsonb_build_object(
      'first_name', reg_record.first_name,
      'last_name', reg_record.last_name
    ),
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
  );
  
  -- Create profile
  INSERT INTO public.profiles (
    id,
    email,
    first_name,
    last_name,
    codice_fiscale,
    status,
    created_at,
    updated_at
  ) VALUES (
    new_user_id,
    temp_email,
    reg_record.first_name,
    reg_record.last_name,
    reg_record.codice_fiscale,
    'approved',
    NOW(),
    NOW()
  );
  
  -- Assign user role
  INSERT INTO public.user_roles (user_id, role, created_at)
  VALUES (new_user_id, 'user', NOW());
  
  -- Update pending registration status
  UPDATE public.pending_registrations
  SET 
    status = 'approved',
    reviewed_by = auth.uid(),
    reviewed_at = NOW(),
    updated_at = NOW()
  WHERE id = registration_id;
  
  RETURN new_user_id;
END;
$$;
