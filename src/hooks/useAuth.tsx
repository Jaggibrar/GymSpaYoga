
import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  user_id: string;
  full_name?: string;
  role: string;
  avatar_url?: string;
  phone?: string;
  city?: string;
  state?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  
  const mountedRef = useRef(true);
  const initializingRef = useRef(false);
  const subscriptionRef = useRef<{ unsubscribe: () => void } | null>(null);
  const profileFetchedRef = useRef(false);

  const fetchUserProfile = async (userId: string) => {
    if (profileFetchedRef.current) return;
    
    try {
      console.log('Fetching user profile for:', userId);
      
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user profile:', error);
        return;
      }

      if (mountedRef.current) {
        setUserProfile(data || null);
        profileFetchedRef.current = true;
        console.log('User profile set:', data);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    if (initializingRef.current) return;
    
    initializingRef.current = true;
    mountedRef.current = true;

    console.log('🚀 Initializing auth...');

    // Clean up any existing subscription
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth state changed:', event);
        
        if (!mountedRef.current) return;

        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
          profileFetchedRef.current = false;
          await fetchUserProfile(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setUserProfile(null);
          profileFetchedRef.current = false;
        }
        
        setLoading(false);
      }
    );

    subscriptionRef.current = subscription;

    // Check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!mountedRef.current) return;

        if (session) {
          setSession(session);
          setUser(session.user);
          await fetchUserProfile(session.user.id);
        } else {
          setLoading(false);
        }
        
      } catch (error) {
        console.error('❌ Error initializing auth:', error);
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      console.log('🧹 Cleaning up auth...');
      mountedRef.current = false;
      initializingRef.current = false;
      profileFetchedRef.current = false;
      
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔐 Attempting sign in...');
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('❌ Sign in error:', error);
        toast.error(error.message);
        return { error };
      }
      
      console.log('✅ Sign in successful');
      return { error: null };
    } catch (error: any) {
      console.error('❌ Sign in failed:', error);
      toast.error('Sign in failed');
      return { error };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      console.log('📝 Attempting sign up...');
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });
      
      if (error) {
        console.error('❌ Sign up error:', error);
        toast.error(error.message);
        return { error };
      }
      
      console.log('✅ Sign up successful');
      toast.success('Check your email to verify your account');
      return { error: null };
    } catch (error: any) {
      console.error('❌ Sign up failed:', error);
      toast.error('Sign up failed');
      return { error };
    }
  };

  const signOut = async () => {
    try {
      console.log('🚪 Signing out user...');
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('❌ Sign out error:', error);
        toast.error('Sign out failed');
        return;
      }
      
      // Clear state immediately
      setUserProfile(null);
      setUser(null);  
      setSession(null);
      profileFetchedRef.current = false;
      
      console.log('✅ Successfully signed out');
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('❌ Sign out error:', error);
      toast.error('Sign out failed');
    }
  };

  const value = {
    user,
    session,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
