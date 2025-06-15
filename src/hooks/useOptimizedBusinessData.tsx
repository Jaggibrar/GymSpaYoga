
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
  opening_time: string;
  closing_time: string;
  phone: string;
  email: string;
  amenities: string[];
  tier?: string;
}

export const useOptimizedBusinessData = (
  businessType?: string,
  searchTerm?: string,
  locationFilter?: string,
  tierFilter?: string
) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize the query parameters to prevent unnecessary re-fetches
  const queryParams = useMemo(() => ({
    businessType,
    searchTerm: searchTerm?.toLowerCase().trim(),
    locationFilter: locationFilter?.toLowerCase().trim(),
    tierFilter
  }), [businessType, searchTerm, locationFilter, tierFilter]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchBusinesses = async () => {
      try {
        setLoading(true);
        setError(null);

        // Build optimized query
        let query = supabase
          .from('business_profiles')
          .select(`
            id,
            business_name,
            business_type,
            category,
            city,
            state,
            image_urls,
            monthly_price,
            session_price,
            description,
            opening_time,
            closing_time,
            phone,
            email,
            amenities
          `)
          .eq('status', 'approved')
          .limit(20); // Limit results for better performance

        // Apply filters efficiently
        if (queryParams.businessType) {
          query = query.eq('business_type', queryParams.businessType);
        }

        if (queryParams.searchTerm) {
          query = query.ilike('business_name', `%${queryParams.searchTerm}%`);
        }

        if (queryParams.locationFilter) {
          query = query.or(`city.ilike.%${queryParams.locationFilter}%,state.ilike.%${queryParams.locationFilter}%`);
        }

        const { data, error: fetchError } = await query;

        if (!isMounted) return;

        if (fetchError) {
          throw fetchError;
        }

        // Process and add tier information
        const processedData = (data || []).map(business => ({
          ...business,
          tier: getTier(business.monthly_price, business.session_price)
        }));

        // Apply tier filter in memory (more efficient for small datasets)
        const filteredData = queryParams.tierFilter && queryParams.tierFilter !== 'all'
          ? processedData.filter(business => business.tier === queryParams.tierFilter)
          : processedData;

        setBusinesses(filteredData);
      } catch (err: any) {
        if (!isMounted) return;
        console.error('Error fetching businesses:', err);
        setError(err.message || 'Failed to load businesses');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Debounce the fetch to avoid too many requests
    const timeoutId = setTimeout(fetchBusinesses, 300);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [queryParams]);

  return { businesses, loading, error };
};

// Helper function to determine tier
const getTier = (monthlyPrice?: number, sessionPrice?: number): string => {
  const price = monthlyPrice || sessionPrice || 0;
  if (price >= 5000) return 'luxury';
  if (price >= 3000) return 'premium';
  return 'budget';
};
