import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { ReactNode, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface TrainerRouteProps {
  children: ReactNode;
}

const TrainerRoute = ({ children }: TrainerRouteProps) => {
  const { user, loading } = useAuth();
  const [isTrainer, setIsTrainer] = useState<boolean | null>(null);
  const [checkingTrainer, setCheckingTrainer] = useState(true);

  useEffect(() => {
    const checkTrainerStatus = async () => {
      if (!user) {
        setCheckingTrainer(false);
        return;
      }

      try {
        const { data } = await supabase
          .from('trainer_profiles')
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle();
        
        setIsTrainer(!!data);
      } catch (error) {
        console.error('Error checking trainer status:', error);
        setIsTrainer(false);
      } finally {
        setCheckingTrainer(false);
      }
    };

    checkTrainerStatus();
  }, [user]);

  if (loading || checkingTrainer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Verifying trainer access...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isTrainer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Users className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <CardTitle>Trainer Access Only</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">You need to be a registered trainer to access this area.</p>
            <button 
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
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

export default TrainerRoute;