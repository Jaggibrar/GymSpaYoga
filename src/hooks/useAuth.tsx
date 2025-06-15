
import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userProfile: any;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string, role?: string) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchUserProfile = async (userId: string) => {
      try {
        console.log('Fetching user profile for:', userId);
        const { data: profile, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', userId)
          .maybeSingle();
        
        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching user profile:', error);
          return;
        }
        
        if (mounted) {
          setUserProfile(profile);
          console.log('User profile set:', profile);
        }
      } catch (error) {
        console.error('Profile fetch error:', error);
      }
    };

    const handleAuthChange = async (event: string, session: Session | null) => {
      console.log('Auth state changed:', event, session?.user?.email);
      
      if (!mounted) {
        console.log('Component unmounted, ignoring auth change');
        return;
      }

      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        console.log('User signed in, fetching profile');
        await fetchUserProfile(session.user.id);
      } else {
        console.log('No user, clearing profile');
        setUserProfile(null);
      }
      
      setLoading(false);
    };

    const initializeAuth = async () => {
      try {
        console.log('Initializing auth...');
        
        const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting initial session:', error);
          if (mounted) {
            setLoading(false);
          }
          return subscription;
        }

        console.log('Initial session:', session?.user?.email || 'No session');
        
        if (mounted) {
          await handleAuthChange('INITIAL_SESSION', session);
        }

        return subscription;
      } catch (error) {
        console.error('Auth initialization error:', error);
        if (mounted) {
          setLoading(false);
        }
        return null;
      }
    };

    let subscription: any = null;
    
    initializeAuth().then((sub) => {
      subscription = sub;
    });
    
    return () => {
      console.log('Cleaning up auth provider');
      mounted = false;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const signUp = async (email: string, password: string, fullName?: string, role: string = 'end_user') => {
    try {
      console.log('Signing up user:', email);
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
            role: role,
          },
        },
      });
      
      if (error) {
        console.error('Sign up error:', error);
      } else {
        console.log('Sign up successful');
      }
      
      return { error };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error: error as AuthError };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Signing in user:', email);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Sign in error:', error);
      } else {
        console.log('Sign in successful');
      }
      
      return { error };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: error as AuthError };
    }
  };

  const signOut = async () => {
    try {
      console.log('Starting sign out process...');
      
      // Sign out from Supabase first
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Supabase sign out error:', error);
        throw error;
      }
      
      console.log('Supabase sign out successful');
      
      // Clear local state
      setUser(null);
      setSession(null);
      setUserProfile(null);
      
      console.log('Local state cleared, redirecting to home');
      
    } catch (error) {
      console.error('Sign out error:', error);
      // Clear local state even if sign out fails
      setUser(null);
      setSession(null);
      setUserProfile(null);
      throw error;
    }
  };

  const value = {
    user,
    session,
    userProfile,
    loading,
    signUp,
    signIn,
    signOut,
  };

  console.log('Auth context value:', { user: user?.email, session: !!session, loading });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
