
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

export default function RoleBasedRedirect() {
  const { user, userProfile, loading: authLoading, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate('/login');
      return;
    }

    // Check if user has admin permissions
    if (userProfile?.role === 'admin' || isAdmin) {
      navigate('/admin-dashboard');
      return;
    }

    // Check if user is business owner or trainer
    if (userProfile?.role === 'business_owner') {
      // Check if they are a trainer using the is_trainer field
      if (userProfile.is_trainer) {
        navigate('/trainer-dashboard');
      } else {
        navigate('/business-dashboard');
      }
      return;
    }

    // Default to home page for regular users
    navigate('/');
  }, [user, userProfile, authLoading, navigate]);

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
