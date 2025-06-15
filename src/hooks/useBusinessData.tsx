
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface BusinessData {
  id: string;
  business_name: string;
  business_type: string;
  category: string;
  city: string;
  state: string;
  description: string;
  image_urls: string[];
  monthly_price?: number;
  session_price?: number;
  opening_time: string;
  closing_time: string;
  status: string;
  created_at: string;
  tier?: string;
}

export const useBusinessData = (businessType?: string, searchTerm?: string, locationFilter?: string, tierFilter?: string) => {
  const [businesses, setBusinesses] = useState<BusinessData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getTier = (monthlyPrice?: number, sessionPrice?: number): string => {
    const price = monthlyPrice || sessionPrice || 0;
    if (monthlyPrice) {
      if (monthlyPrice >= 5000) return 'luxury';
      if (monthlyPrice >= 3000) return 'premium';
      return 'budget';
    }
    if (sessionPrice) {
      if (sessionPrice >= 2000) return 'luxury';
      if (sessionPrice >= 1000) return 'premium';
      return 'budget';
    }
    return 'budget';
  };

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('business_profiles')
          .select('*')
          .eq('status', 'approved');

        if (businessType) {
          query = query.eq('business_type', businessType);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) throw error;

        let filteredData = data || [];

        // Add tier to each business
        filteredData = filteredData.map(business => ({
          ...business,
          tier: getTier(business.monthly_price, business.session_price)
        }));

        // Apply filters
        if (searchTerm) {
          filteredData = filteredData.filter(business =>
            business.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            business.description?.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        if (locationFilter) {
          filteredData = filteredData.filter(business =>
            business.city.toLowerCase().includes(locationFilter.toLowerCase()) ||
            business.state.toLowerCase().includes(locationFilter.toLowerCase())
          );
        }

        if (tierFilter && tierFilter !== 'all') {
          filteredData = filteredData.filter(business => business.tier === tierFilter);
        }

        setBusinesses(filteredData);
      } catch (error: any) {
        console.error('Error fetching businesses:', error);
        setError(error.message || 'Failed to fetch businesses');
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [businessType, searchTerm, locationFilter, tierFilter]);

  return { businesses, loading, error, refetch: () => fetchBusinesses() };
};
