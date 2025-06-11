
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface YogaStudio {
  id: string;
  business_name: string;
  business_type: string;
  category: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pin_code: string;
  opening_time: string;
  closing_time: string;
  monthly_price?: number;
  session_price?: number;
  description?: string;
  amenities: string[];
  image_urls: string[];
  status: string;
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
          .from('business_profiles')
          .select('*')
          .eq('business_type', 'yoga')
          .eq('status', 'approved')
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
