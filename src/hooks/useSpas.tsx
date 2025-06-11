
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Spa {
  id: string;
  name: string;
  description: string | null;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  image_url: string | null;
  category: 'luxury' | 'premium' | 'budget';
  price_range: string;
  rating: number;
  services: string[];
  amenities: string[];
  opening_hours: any;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
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
          .eq('is_active', true)
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
