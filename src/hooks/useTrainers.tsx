
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Trainer {
  id: string;
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
  updated_at?: string;
}

export const useTrainers = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('trainer_profiles')
          .select('*')
          .eq('status', 'approved')
          .order('created_at', { ascending: false });

        if (error) {
          setError(error.message);
          console.error('Error fetching trainers:', error);
          return;
        }

        setTrainers(data || []);
      } catch (err) {
        setError('Failed to fetch trainers');
        console.error('Error fetching trainers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  return { trainers, loading, error };
};
