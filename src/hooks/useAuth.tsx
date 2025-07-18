import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  signIn: (identifier: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check if user is admin
        if (session?.user) {
          setTimeout(async () => {
            try {
              const { data } = await supabase
                .from('user_roles')
                .select('role')
                .eq('user_id', session.user.id)
                .eq('role', 'admin')
                .single();
              
              setIsAdmin(!!data);
            } catch (error) {
              setIsAdmin(false);
            }
          }, 0);
        } else {
          setIsAdmin(false);
        }
        
        setIsLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);


  const signIn = async (identifier: string, password: string) => {
    try {
      setIsLoading(true);
      let error = null;

      // Check if trying to login as admin
      if (identifier.toLowerCase() === 'admin') {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: 'admin@duemari.com',
          password
        });
        error = authError;
      } else {
        // Login with fiscal code
        const { data: authData, error: rpcError } = await supabase
          .rpc('authenticate_by_fiscal_code' as any, {
            input_codice_fiscale: identifier,
            input_password: password
          });

        if (rpcError || !authData || (Array.isArray(authData) && authData.length === 0)) {
          error = { message: 'Credenziali non valide o utente non approvato' };
        } else {
          // Create a session for the authenticated user
          const userData = Array.isArray(authData) ? authData[0] : authData;
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email: userData.email,
            password
          });
          error = signInError;
        }
      }

      if (error) {
        toast({
          title: "Errore durante l'accesso",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Accesso effettuato",
          description: "Benvenuto nel Due Mari Chapter!"
        });
      }

      return { error };
    } catch (error: any) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore imprevisto",
        variant: "destructive"
      });
      return { error };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      toast({
        title: "Disconnesso",
        description: "Arrivederci!"
      });
    } catch (error: any) {
      toast({
        title: "Errore",
        description: "Errore durante la disconnessione",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    session,
    isLoading,
    isAdmin,
    signIn,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};