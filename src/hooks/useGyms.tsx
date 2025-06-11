
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Gym {
  id: number;
  created_at: string;
}

export const useGyms = () => {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('gyms')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          setError(error.message);
          console.error('Error fetching gyms:', error);
          return;
        }

        setGyms(data || []);
      } catch (err) {
        setError('Failed to fetch gyms');
        console.error('Error fetching gyms:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGyms();
  }, []);

  return { gyms, loading, error };
};
