
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Spa {
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

export const useSpas = () => {
  const [spas, setSpas] = useState<Spa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpas = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('business_profiles')
          .select('*')
          .eq('business_type', 'spa')
          .eq('status', 'approved')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Supabase error fetching spas:', error);
          setError(`Failed to fetch spas: ${error.message}`);
          toast.error('Failed to load spas. Please try again.');
          return;
        }

        console.log('Fetched spas:', data?.length || 0);
        setSpas(data || []);
        
        if (data && data.length === 0) {
          console.log('No spas found in database');
        }
      } catch (err) {
        console.error('Error fetching spas:', err);
        setError('Failed to fetch spas');
        toast.error('An unexpected error occurred while loading spas.');
      } finally {
        setLoading(false);
      }
    };

    fetchSpas();
  }, []);

  return { spas, loading, error, refetch: () => window.location.reload() };
};
