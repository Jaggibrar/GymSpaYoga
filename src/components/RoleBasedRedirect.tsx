
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useHasBusinessProfiles } from '@/hooks/useOwnerBookings';
import { Loader2 } from 'lucide-react';

export default function RoleBasedRedirect() {
  const { user, userProfile, loading: authLoading } = useAuth();
  const { hasProfiles: hasBusinessProfiles, loading: businessLoading } = useHasBusinessProfiles();
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading || businessLoading) return;

    if (!user) {
      navigate('/login');
      return;
    }

    // Check if user is admin
    if (userProfile?.role === 'admin') {
      navigate('/admin-dashboard');
      return;
    }

    // Check if user has business profiles
    if (hasBusinessProfiles) {
      navigate('/business-dashboard');
      return;
    }

    // Default to user dashboard
    navigate('/user-dashboard');
  }, [user, userProfile, hasBusinessProfiles, authLoading, businessLoading, navigate]);

  if (authLoading || businessLoading) {
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
