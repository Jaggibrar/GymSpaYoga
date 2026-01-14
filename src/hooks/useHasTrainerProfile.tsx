import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface TrainerProfileStatus {
  hasProfile: boolean;
  status: string | null;
  trainerId: string | null;
  loading: boolean;
}

export const useHasTrainerProfile = (): TrainerProfileStatus => {
  const { user } = useAuth();
  const [hasProfile, setHasProfile] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [trainerId, setTrainerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkTrainerProfile = async () => {
      if (!user) {
        setHasProfile(false);
        setStatus(null);
        setTrainerId(null);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('trainer_profiles')
          .select('id, status')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error checking trainer profile:', error);
          setHasProfile(false);
          setStatus(null);
          setTrainerId(null);
        } else if (data) {
          setHasProfile(true);
          setStatus(data.status);
          setTrainerId(data.id);
        } else {
          setHasProfile(false);
          setStatus(null);
          setTrainerId(null);
        }
      } catch (error) {
        console.error('Error checking trainer profile:', error);
        setHasProfile(false);
        setStatus(null);
        setTrainerId(null);
      } finally {
        setLoading(false);
      }
    };

    checkTrainerProfile();
  }, [user]);

  return { hasProfile, status, trainerId, loading };
};
