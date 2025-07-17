import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { ReactNode, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface BusinessRouteProps {
  children: ReactNode;
}

const BusinessRoute = ({ children }: BusinessRouteProps) => {
  const { user, loading } = useAuth();
  const [isBusinessOwner, setIsBusinessOwner] = useState<boolean | null>(null);
  const [checkingBusiness, setCheckingBusiness] = useState(true);

  useEffect(() => {
    const checkBusinessStatus = async () => {
      if (!user) {
        setCheckingBusiness(false);
        return;
      }

      try {
        const { data } = await supabase
          .from('business_profiles')
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle();
        
        setIsBusinessOwner(!!data);
      } catch (error) {
        console.error('Error checking business status:', error);
        setIsBusinessOwner(false);
      } finally {
        setCheckingBusiness(false);
      }
    };

    checkBusinessStatus();
  }, [user]);

  if (loading || checkingBusiness) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Verifying business access...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isBusinessOwner) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Building2 className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <CardTitle>Business Owner Access Only</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">You need to be a registered business owner to access this area.</p>
            <button 
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Go Back
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default BusinessRoute;