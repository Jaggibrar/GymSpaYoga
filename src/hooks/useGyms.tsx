
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Gym {
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

export const useGyms = () => {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGyms = async () => {
    console.log('Fetching gyms from database...');
    try {
      setLoading(true);
      setError(null);
      
      // Fetch approved gym businesses from secure public view
      const { data, error } = await supabase
        .from('public_business_listings')
        .select('*')
        .eq('business_type', 'gym')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching gyms:', error);
        throw error;
      }

      console.log(`Successfully fetched ${data?.length || 0} approved gym listings:`, data);
      setGyms(data || []);
      
      if ((data?.length || 0) === 0) {
        console.log('No approved gyms found.');
      }
      
    } catch (err: any) {
      console.error('Failed to fetch gyms:', err);
      setError(err.message);
      toast.error('Failed to load gym listings');
      setGyms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGyms();
  }, []);

  return {
    gyms,
    loading,
    error,
    refetch: fetchGyms
  };
};
