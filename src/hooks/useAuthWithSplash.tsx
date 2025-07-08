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
  showSplashScreen: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  hideSplashScreen: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSplashScreen, setShowSplashScreen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const mountedRef = useRef(true);
  const subscriptionRef = useRef<{ unsubscribe: () => void } | null>(null);
  const sessionStorageKey = 'gymspayoga_splash_shown';

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data } = await supabase
        .from('admin_permissions')
        .select('role, permissions')
        .eq('user_id', userId)
        .single();

      const adminStatus = data && data.permissions?.includes('super_admin');
      setIsAdmin(adminStatus || false);
      return adminStatus;
    } catch (error) {
      setIsAdmin(false);
      return false;
    }
  };

  const fetchUserProfile = async (userId: string) => {
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
        console.log('User profile set:', data);
        
        // Check admin status
        await checkAdminStatus(userId);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const shouldShowSplash = () => {
    // Check if splash was already shown in this session
    const splashShown = sessionStorage.getItem(sessionStorageKey);
    const lastShown = sessionStorage.getItem(`${sessionStorageKey}_timestamp`);
    const now = Date.now();
    
    // Only show splash if it hasn't been shown or if it's been more than 30 minutes
    if (!splashShown || !lastShown || (now - parseInt(lastShown)) > 30 * 60 * 1000) {
      return true;
    }
    return false;
  };

  const markSplashAsShown = () => {
    const now = Date.now();
    sessionStorage.setItem(sessionStorageKey, 'true');
    sessionStorage.setItem(`${sessionStorageKey}_timestamp`, now.toString());
  };

  useEffect(() => {
    mountedRef.current = true;
    console.log('🚀 Initializing auth...');

    // Clean up any existing subscription
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth state changed:', event, session?.user?.id);
        
        if (!mountedRef.current) return;

        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchUserProfile(session.user.id);
          
          // Show splash screen only for fresh sign-ins, not token refreshes or existing sessions
          if (event === 'SIGNED_IN' && shouldShowSplash()) {
            setShowSplashScreen(true);
            markSplashAsShown();
          }
        } else if (event === 'SIGNED_OUT') {
          setUserProfile(null);
          setIsAdmin(false);
          setShowSplashScreen(false);
          // Clear splash screen session storage on sign out
          sessionStorage.removeItem(sessionStorageKey);
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
          console.log('✅ Existing session found');
          setSession(session);
          setUser(session.user);
          await fetchUserProfile(session.user.id);
          // Don't show splash for existing sessions
        }
        
        setLoading(false);
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
      
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('🔐 Attempting sign in...');
      setLoading(true);
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('❌ Sign in error:', error);
        toast.error(error.message);
        setLoading(false);
        return { error };
      }
      
      console.log('✅ Sign in successful');
      toast.success('Successfully signed in!');
      return { error: null };
    } catch (error: any) {
      console.error('❌ Sign in failed:', error);
      toast.error('Sign in failed');
      setLoading(false);
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
      setIsAdmin(false);
      setShowSplashScreen(false);
      
      console.log('✅ Successfully signed out');
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('❌ Sign out error:', error);
      toast.error('Sign out failed');
    }
  };

  const hideSplashScreen = () => {
    setShowSplashScreen(false);
  };

  const value = {
    user,
    session,
    userProfile,
    loading,
    showSplashScreen,
    isAdmin,
    signIn,
    signUp,
    signOut,
    hideSplashScreen
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