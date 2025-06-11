
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Gym {
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

export const useGyms = () => {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('business_profiles')
          .select('*')
          .eq('business_type', 'gym')
          .eq('status', 'approved')
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
