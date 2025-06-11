
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface YogaStudio {
  id: number;
  created_at: string;
}

export const useYogaStudios = () => {
  const [yogaStudios, setYogaStudios] = useState<YogaStudio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchYogaStudios = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('yoga_studios')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          setError(error.message);
          console.error('Error fetching yoga studios:', error);
          return;
        }

        setYogaStudios(data || []);
      } catch (err) {
        setError('Failed to fetch yoga studios');
        console.error('Error fetching yoga studios:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchYogaStudios();
  }, []);

  return { yogaStudios, loading, error };
};
