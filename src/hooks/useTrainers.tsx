
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Trainer {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  trainer_tier: string;
  category: string;
  experience: number;
  certifications?: string;
  specializations: string[];
  location: string;
  bio: string;
  profile_image_url?: string;
  hourly_rate: number;
  status: string;
  created_at: string;
  updated_at?: string;
}

export const useTrainers = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrainers = async () => {
    console.log('Fetching trainers from database...');
    try {
      setLoading(true);
      setError(null);
      
      // Remove status filter to show all listings
      const { data, error } = await supabase
        .from('trainer_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching trainers:', error);
        throw error;
      }

      console.log(`Fetched ${data?.length || 0} trainer listings:`, data);
      setTrainers(data || []);
    } catch (err: any) {
      console.error('Failed to fetch trainers:', err);
      setError(err.message);
      toast.error('Failed to load trainer listings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  return {
    trainers,
    loading,
    error,
    refetch: fetchTrainers
  };
};
