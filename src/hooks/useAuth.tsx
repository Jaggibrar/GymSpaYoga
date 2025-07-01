
import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { performanceMonitor } from '@/utils/performanceMonitor';

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
  const profileFetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initializingRef = useRef(false);
  const profileFetchingRef = useRef(false);

  const fetchUserProfile = async (userId: string) => {
    // Prevent duplicate profile fetches
    if (profileFetchingRef.current) {
      console.log('Profile fetch already in progress, skipping...');
      return;
    }

    profileFetchingRef.current = true;
    const startTime = Date.now();
    
    try {
      console.log('Fetching user profile for:', userId);
      
      // Clear any existing timeout
      if (profileFetchTimeoutRef.current) {
        clearTimeout(profileFetchTimeoutRef.current);
      }

      // Set a shorter timeout for profile fetching (5 seconds)
      const timeoutPromise = new Promise<never>((_, reject) => {
        profileFetchTimeoutRef.current = setTimeout(() => {
          reject(new Error('Profile fetch timeout'));
        }, 5000);
      });

      const fetchPromise = supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);

      // Clear timeout on completion
      if (profileFetchTimeoutRef.current) {
        clearTimeout(profileFetchTimeoutRef.current);
        profileFetchTimeoutRef.current = null;
      }

      if (error) {
        if (error.code === 'PGRST116') {
          // No profile found, this is normal for new users
          console.log('No profile found for user, this is normal for new users');
          setUserProfile(null);
        } else {
          console.error('Error fetching user profile:', error);
        }
        performanceMonitor.trackApiCall('user_profiles_fetch', startTime, { 
          success: false, 
          error: error.message,
          userId 
        });
        return;
      }

      if (mountedRef.current) {
        console.log('User profile fetched successfully:', data);
        setUserProfile(data);
        performanceMonitor.trackApiCall('user_profiles_fetch', startTime, { 
          success: true, 
          userId 
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      performanceMonitor.trackApiCall('user_profiles_fetch', startTime, { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        userId 
      });
      
      // Clear timeout on error
      if (profileFetchTimeoutRef.current) {
        clearTimeout(profileFetchTimeoutRef.current);
        profileFetchTimeoutRef.current = null;
      }
    } finally {
      profileFetchingRef.current = false;
    }
  };

  useEffect(() => {
    // Prevent multiple initializations
    if (initializingRef.current) {
      return;
    }
    
    initializingRef.current = true;
    mountedRef.current = true;
    const initStartTime = Date.now();

    console.log('🚀 Initializing auth...');

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth state changed:', event, session?.user?.id);
        
        if (!mountedRef.current) return;

        // Always update session and user immediately
        setSession(session);
        setUser(session?.user ?? null);
        
        // Handle profile fetching with debouncing
        if (session?.user && event !== 'SIGNED_OUT') {
          // Debounce profile fetch to prevent multiple calls
          setTimeout(() => {
            if (mountedRef.current && !profileFetchingRef.current) {
              fetchUserProfile(session.user.id);
            }
          }, 200);
        } else {
          setUserProfile(null);
          profileFetchingRef.current = false;
        }
        
        // Set loading to false after handling auth state
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    );

    // THEN check for existing session
    const initializeAuth = async () => {
      try {
        console.log('🔍 Checking for existing session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ Error getting session:', error);
          performanceMonitor.trackApiCall('auth_init', initStartTime, { 
            success: false, 
            error: error.message 
          });
        } else {
          console.log('✅ Session check complete:', session?.user?.id || 'No session');
          performanceMonitor.trackApiCall('auth_init', initStartTime, { 
            success: true 
          });
        }

        if (!mountedRef.current) return;

        // Only update state if no session was already set by the listener
        if (!session) {
          setSession(null);
          setUser(null);
          setUserProfile(null);
          setLoading(false);
        }
        
      } catch (error) {
        console.error('❌ Error initializing auth:', error);
        performanceMonitor.trackApiCall('auth_init', initStartTime, { 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        });
        
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    };

    // Initialize auth with a small delay to ensure proper setup
    setTimeout(initializeAuth, 100);

    return () => {
      console.log('🧹 Cleaning up auth...');
      mountedRef.current = false;
      initializingRef.current = false;
      profileFetchingRef.current = false;
      subscription.unsubscribe();
      
      // Clear any pending timeouts
      if (profileFetchTimeoutRef.current) {
        clearTimeout(profileFetchTimeoutRef.current);
      }
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const startTime = Date.now();
    
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
        performanceMonitor.trackApiCall('auth_signin', startTime, { 
          success: false, 
          error: error.message 
        });
        return { error };
      }
      
      performanceMonitor.trackApiCall('auth_signin', startTime, { success: true });
      console.log('✅ Sign in successful');
      return { error: null };
    } catch (error: any) {
      console.error('❌ Sign in failed:', error);
      toast.error('Sign in failed');
      setLoading(false);
      performanceMonitor.trackApiCall('auth_signin', startTime, { 
        success: false, 
        error: error.message || 'Unknown error' 
      });
      return { error };
    }
  };

  const signUp = async (email: string, password: string) => {
    const startTime = Date.now();
    
    try {
      console.log('📝 Attempting sign up...');
      setLoading(true);
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
        setLoading(false);
        performanceMonitor.trackApiCall('auth_signup', startTime, { 
          success: false, 
          error: error.message 
        });
        return { error };
      }
      
      performanceMonitor.trackApiCall('auth_signup', startTime, { success: true });
      console.log('✅ Sign up successful');
      toast.success('Check your email to verify your account');
      setLoading(false);
      return { error: null };
    } catch (error: any) {
      console.error('❌ Sign up failed:', error);
      toast.error('Sign up failed');
      setLoading(false);
      performanceMonitor.trackApiCall('auth_signup', startTime, { 
        success: false, 
        error: error.message || 'Unknown error' 
      });
      return { error };
    }
  };

  const signOut = async () => {
    const startTime = Date.now();
    
    try {
      setLoading(true);
      console.log('🚪 Signing out user...');
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('❌ Sign out error:', error);
        toast.error('Sign out failed');
        setLoading(false);
        performanceMonitor.trackApiCall('auth_signout', startTime, { 
          success: false, 
          error: error.message 
        });
        return;
      }
      
      // Clear all state immediately
      setUserProfile(null);
      setUser(null);  
      setSession(null);
      setLoading(false);
      profileFetchingRef.current = false;
      
      performanceMonitor.trackApiCall('auth_signout', startTime, { success: true });
      console.log('✅ Successfully signed out');
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('❌ Sign out error:', error);
      toast.error('Sign out failed');
      setLoading(false);
      performanceMonitor.trackApiCall('auth_signout', startTime, { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
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
