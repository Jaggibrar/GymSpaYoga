
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

export default function RoleBasedRedirect() {
  const { user, userProfile, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate('/login');
      return;
    }

    // Check if user is the specific admin email
    if (user.email === 'jaggibrar001234@gmail.com') {
      navigate('/admin-dashboard');
      return;
    }

    // Check if user is business owner or has trainer profile
    if (userProfile?.role === 'business_owner') {
      // Check if they have a trainer profile to determine which dashboard
      checkTrainerProfile(user.id);
      return;
    }

    // Default to home page for regular users
    navigate('/');
  }, [user, userProfile, authLoading, navigate]);

  const checkTrainerProfile = async (userId: string) => {
    try {
      const { data } = await supabase
        .from('trainer_profiles')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (data) {
        navigate('/trainer-dashboard');
      } else {
        navigate('/business-dashboard');
      }
    } catch (error) {
      console.error('Error checking trainer profile:', error);
      navigate('/business-dashboard');
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  return null;
}
