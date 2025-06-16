
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
      
      // Fetch all gym businesses regardless of status for debugging
      const { data, error } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('business_type', 'gym')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching gyms:', error);
        throw error;
      }

      console.log(`Fetched ${data?.length || 0} gym listings:`, data);
      
      // Filter approved gyms for display, but show count of all
      const approvedGyms = data?.filter(gym => gym.status === 'approved') || [];
      const pendingCount = (data?.length || 0) - approvedGyms.length;
      
      if (pendingCount > 0) {
        console.log(`${pendingCount} gym(s) are pending approval and won't be displayed`);
      }
      
      setGyms(approvedGyms);
    } catch (err: any) {
      console.error('Failed to fetch gyms:', err);
      setError(err.message);
      toast.error('Failed to load gym listings');
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
