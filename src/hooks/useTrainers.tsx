
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Trainer {
  id: string;
  user_id: string;
  name: string;
  bio: string | null;
  specializations: string[];
  certifications: string[];
  experience_years: number;
  hourly_rate: number;
  rating: number;
  image_url: string | null;
  phone: string | null;
  email: string | null;
  location: string | null;
  availability: any;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
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
          .from('trainers')
          .select('*')
          .eq('is_active', true)
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
