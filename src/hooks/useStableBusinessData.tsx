
import { useState, useEffect, useRef, useCallback } from 'react';
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
  address: string;
  pin_code: string;
  latitude?: number;
  longitude?: number;
}

export const useStableBusinessData = (
  businessType?: string,
  searchTerm?: string,
  locationFilter?: string,
  sortBy: string = 'created_at'
) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const cacheRef = useRef<Map<string, { data: Business[]; timestamp: number }>>(new Map());
  const isInitialLoadRef = useRef(true);
  const mountedRef = useRef(true);

  const getCacheKey = useCallback(() => {
    return `${businessType || 'all'}-${searchTerm || ''}-${locationFilter || ''}-${sortBy}`;
  }, [businessType, searchTerm, locationFilter, sortBy]);

  const fetchBusinesses = useCallback(async () => {
    const cacheKey = getCacheKey();
    const cached = cacheRef.current.get(cacheKey);
    
    // Use cache if less than 5 minutes old
    if (cached && Date.now() - cached.timestamp < 300000) {
      setBusinesses(cached.data);
      setLoading(false);
      return;
    }

    // Cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    
    try {
      if (!isInitialLoadRef.current) {
        setLoading(true);
      }
      setError(null);

      let query = supabase
        .from('business_profiles')
        .select('*')
        .eq('status', 'approved')
        .order(sortBy, { ascending: false })
        .limit(50);

      if (businessType) {
        query = query.eq('business_type', businessType);
      }

      if (searchTerm) {
        query = query.ilike('business_name', `%${searchTerm}%`);
      }

      if (locationFilter) {
        query = query.or(`city.ilike.%${locationFilter}%,state.ilike.%${locationFilter}%`);
      }

      const { data, error: fetchError } = await query.abortSignal(abortControllerRef.current.signal);

      if (fetchError) throw fetchError;

      const businessData = data || [];
      
      // Cache the results
      cacheRef.current.set(cacheKey, { data: businessData, timestamp: Date.now() });
      
      setBusinesses(businessData);
    } catch (err: any) {
      // Don't log abort errors and don't set them as real errors
      if (err.name === 'AbortError' || err.message?.includes('AbortError') || err.message?.includes('signal is aborted')) {
        console.log('Request was cancelled - this is normal during component cleanup');
        return; // Don't set error state for aborted requests
      }
      
      console.error('Error fetching businesses:', err);
      setError(err.message || 'Failed to load businesses');
    } finally {
      if (!abortControllerRef.current?.signal.aborted && mountedRef.current) {
        setLoading(false);
        isInitialLoadRef.current = false;
      }
    }
  }, [businessType, searchTerm, locationFilter, sortBy, getCacheKey]);

  useEffect(() => {
    mountedRef.current = true;
    fetchBusinesses();

    return () => {
      mountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchBusinesses]);

  const refetch = useCallback(() => {
    cacheRef.current.clear();
    fetchBusinesses();
  }, [fetchBusinesses]);

  return {
    businesses,
    loading,
    error,
    refetch
  };
};
