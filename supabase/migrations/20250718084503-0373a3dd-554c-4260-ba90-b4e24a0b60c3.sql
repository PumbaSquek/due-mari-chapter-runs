
-- Drop existing auth trigger and function since we're changing the registration flow
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create table for pending registrations
CREATE TABLE public.pending_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  codice_fiscale TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  reviewed_by UUID REFERENCES public.profiles(id),
  reviewed_at TIMESTAMP WITH TIME ZONE
);

-- Add codice_fiscale to profiles table
ALTER TABLE public.profiles ADD COLUMN codice_fiscale TEXT UNIQUE;
ALTER TABLE public.profiles ADD COLUMN status TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended'));

-- Enable RLS on pending_registrations
ALTER TABLE public.pending_registrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for pending_registrations
CREATE POLICY "Admins can view all pending registrations" ON public.pending_registrations
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage pending registrations" ON public.pending_registrations
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can insert pending registrations" ON public.pending_registrations
  FOR INSERT WITH CHECK (true);

-- Create first admin user (you'll need to update the codice_fiscale)
-- This creates a user in auth.users and corresponding profile
-- Replace 'ADMIN_CODICE_FISCALE' with the actual admin fiscal code
-- Replace 'admin@duemari.com' with the actual admin email
INSERT INTO auth.users (
  id, 
  email, 
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data
) VALUES (
  gen_random_uuid(),
  'admin@duemari.com',
  crypt('AdminPassword123!', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"first_name": "Admin", "last_name": "Due Mari"}'::jsonb
) ON CONFLICT (email) DO NOTHING;

-- Insert admin profile
INSERT INTO public.profiles (
  id, 
  email, 
  first_name, 
  last_name, 
  codice_fiscale,
  status
) SELECT 
  id,
  email,
  'Admin',
  'Due Mari',
  'ADMIN_CODICE_FISCALE',
  'approved'
FROM auth.users 
WHERE email = 'admin@duemari.com'
ON CONFLICT (id) DO NOTHING;

-- Assign admin role
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM public.profiles 
WHERE email = 'admin@duemari.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Function to approve pending registration
CREATE OR REPLACE FUNCTION public.approve_registration(
  registration_id UUID,
  admin_email TEXT DEFAULT NULL,
  admin_password TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE PLPGSQL
SECURITY DEFINER
AS $$
DECLARE
  reg_record public.pending_registrations%ROWTYPE;
  new_user_id UUID;
  temp_email TEXT;
  temp_password TEXT;
BEGIN
  -- Get the pending registration
  SELECT * INTO reg_record 
  FROM public.pending_registrations 
  WHERE id = registration_id AND status = 'pending';
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Registration not found or already processed';
  END IF;
  
  -- Generate temporary credentials if not provided
  temp_email := COALESCE(admin_email, LOWER(reg_record.first_name || '.' || reg_record.last_name || '@duemari.local'));
  temp_password := COALESCE(admin_password, 'TempPass123!');
  
  -- Create user in auth.users
  INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_user_meta_data
  ) VALUES (
    gen_random_uuid(),
    temp_email,
    crypt(temp_password, gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    jsonb_build_object(
      'first_name', reg_record.first_name,
      'last_name', reg_record.last_name
    )
  ) RETURNING id INTO new_user_id;
  
  -- Create profile
  INSERT INTO public.profiles (
    id,
    email,
    first_name,
    last_name,
    codice_fiscale,
    status
  ) VALUES (
    new_user_id,
    temp_email,
    reg_record.first_name,
    reg_record.last_name,
    reg_record.codice_fiscale,
    'approved'
  );
  
  -- Assign user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new_user_id, 'user');
  
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

-- Function to reject pending registration
CREATE OR REPLACE FUNCTION public.reject_registration(
  registration_id UUID,
  rejection_notes TEXT DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE PLPGSQL
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.pending_registrations
  SET 
    status = 'rejected',
    notes = COALESCE(rejection_notes, notes),
    reviewed_by = auth.uid(),
    reviewed_at = NOW(),
    updated_at = NOW()
  WHERE id = registration_id AND status = 'pending';
  
  RETURN FOUND;
END;
$$;
