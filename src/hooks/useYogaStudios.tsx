
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface YogaStudio {
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
  price_per_session: number;
  rating: number;
  yoga_styles: string[];
  amenities: string[];
  opening_hours: any;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
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
          .eq('is_active', true)
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
