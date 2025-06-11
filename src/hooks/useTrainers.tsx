
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Trainer {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  trainer_tier: string;
  experience: number;
  certifications?: string;
  specializations: string[];
  hourly_rate: number;
  location: string;
  bio: string;
  profile_image_url?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export const useTrainers = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrainers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching trainers from database...');
      
      const { data, error } = await supabase
        .from('trainer_profiles')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        setError(error.message);
        return;
      }

      console.log('Fetched trainers:', data?.length || 0);
      
      // Ensure specializations is an array
      const processedData = (data || []).map(trainer => ({
        ...trainer,
        specializations: Array.isArray(trainer.specializations) ? trainer.specializations : []
      }));
      
      setTrainers(processedData);
      
      if (!data || data.length === 0) {
        console.info('No trainers found in database');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch trainers';
      setError(errorMessage);
      console.error('Error fetching trainers:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrainers();
  }, [fetchTrainers]);

  return { trainers, loading, error, refetch: fetchTrainers };
};
