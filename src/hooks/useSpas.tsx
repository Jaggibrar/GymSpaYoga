
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Spa {
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
  updated_at?: string;
}

export const useSpas = () => {
  const [spas, setSpas] = useState<Spa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSpas = async () => {
    console.log('Fetching spas from database...');
    try {
      setLoading(true);
      setError(null);
      
      // Remove status filter to show all listings
      const { data, error } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('business_type', 'spa')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching spas:', error);
        throw error;
      }

      console.log(`Fetched ${data?.length || 0} spa listings:`, data);
      setSpas(data || []);
    } catch (err: any) {
      console.error('Failed to fetch spas:', err);
      setError(err.message);
      toast.error('Failed to load spa listings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpas();
  }, []);

  return {
    spas,
    loading,
    error,
    refetch: fetchSpas
  };
};
