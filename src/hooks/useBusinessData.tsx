
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Business {
  id: string;
  business_name: string;
  business_type: string;
  category: string;
  city: string;
  state: string;
  image_urls: string[];
  monthly_price?: number;
  session_price?: number;
  description?: string;
  amenities: string[];
  tier?: string;
  opening_time: string;
  closing_time: string;
  phone: string;
  email: string;
  address: string;
  status: string;
  created_at: string;
}

export const useBusinessData = (
  businessType?: string, 
  searchTerm?: string, 
  locationFilter?: string, 
  tierFilter?: string
) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let query = supabase
        .from('business_profiles')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      // Filter by business type if provided
      if (businessType) {
        query = query.eq('business_type', businessType);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching businesses:', error);
        throw error;
      }

      console.log(`Fetched ${data?.length || 0} businesses`, data);
      setBusinesses(data || []);
    } catch (err: any) {
      console.error('Failed to fetch businesses:', err);
      setError(err.message);
      toast.error('Failed to load businesses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, [businessType]);

  // Filter businesses based on search criteria
  const filteredBusinesses = useMemo(() => {
    let filtered = businesses;

    // Apply search term filter
    if (searchTerm && searchTerm.trim()) {
      const search = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(business => 
        business.business_name.toLowerCase().includes(search) ||
        business.description?.toLowerCase().includes(search) ||
        business.amenities?.some(amenity => amenity.toLowerCase().includes(search))
      );
    }

    // Apply location filter
    if (locationFilter && locationFilter.trim()) {
      const location = locationFilter.toLowerCase().trim();
      filtered = filtered.filter(business => 
        business.city.toLowerCase().includes(location) ||
        business.state.toLowerCase().includes(location) ||
        business.address.toLowerCase().includes(location)
      );
    }

    // Apply tier filter
    if (tierFilter && tierFilter !== 'all') {
      filtered = filtered.filter(business => 
        business.category?.toLowerCase() === tierFilter.toLowerCase()
      );
    }

    return filtered;
  }, [businesses, searchTerm, locationFilter, tierFilter]);

  return {
    businesses: filteredBusinesses,
    loading,
    error,
    refetch: fetchBusinesses,
    totalCount: businesses.length,
    filteredCount: filteredBusinesses.length
  };
};
