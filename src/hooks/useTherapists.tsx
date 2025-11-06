import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Therapist {
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

export const useTherapists = () => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTherapists = async () => {
    console.log('Fetching therapists from database...');
    try {
      setLoading(true);
      setError(null);
      
      // Fetch approved therapists from secure public view
      const { data, error } = await supabase
        .from('public_business_listings')
        .select('*')
        .eq('business_type', 'therapist')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching therapists:', error);
        throw error;
      }

      console.log(`Fetched ${data?.length || 0} therapist listings:`, data);
      setTherapists(data || []);
    } catch (err: any) {
      console.error('Failed to fetch therapists:', err);
      setError(err.message);
      toast.error('Failed to load therapist listings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTherapists();
  }, []);

  return {
    therapists,
    loading,
    error,
    refetch: fetchTherapists
  };
};
