
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Spa {
  id: number;
  created_at: string;
}

export const useSpas = () => {
  const [spas, setSpas] = useState<Spa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpas = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('spas')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          setError(error.message);
          console.error('Error fetching spas:', error);
          return;
        }

        setSpas(data || []);
      } catch (err) {
        setError('Failed to fetch spas');
        console.error('Error fetching spas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpas();
  }, []);

  return { spas, loading, error };
};
