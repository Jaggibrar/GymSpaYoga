
import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Business {
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
  description: string;
  amenities: string[];
  image_urls: string[];
  status: string;
  created_at: string;
  updated_at: string;
}

const PAGE_SIZE = 9;

export const usePaginatedBusinessData = (
  category?: string,
  searchTerm: string = '',
  location: string = '',
  sortBy: string = 'created_at'
) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchBusinesses = useCallback(async (pageNum: number, append: boolean = false) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const from = pageNum * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let query = supabase
        .from('business_profiles')
        .select('*', { count: 'exact' })
        .eq('status', 'approved')
        .range(from, to);

      if (category && category !== 'all') {
        query = query.eq('business_type', category);
      }

      if (searchTerm?.trim()) {
        query = query.or(`business_name.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      if (location?.trim()) {
        query = query.or(`city.ilike.%${location}%,state.ilike.%${location}%`);
      }

      // Apply sorting
      switch (sortBy) {
        case 'name':
        case 'business_name':
          query = query.order('business_name', { ascending: true });
          break;
        case 'price':
        case 'monthly_price':
          query = query.order('monthly_price', { ascending: true, nullsFirst: false });
          break;
        case 'created_at':
        default:
          query = query.order('created_at', { ascending: false });
          break;
      }

      const { data: businessData, error: fetchError, count } = await query.abortSignal(signal);
      
      if (fetchError) throw fetchError;

      const transformedData = (businessData || []).map(business => ({
        ...business,
        amenities: Array.isArray(business.amenities) ? business.amenities : [],
        image_urls: Array.isArray(business.image_urls) ? business.image_urls : [],
        monthly_price: business.monthly_price || undefined,
        session_price: business.session_price || undefined,
        description: business.description || 'No description available',
        business_name: business.business_name || 'Unnamed Business'
      }));

      if (append) {
        setBusinesses(prev => [...prev, ...transformedData]);
      } else {
        setBusinesses(transformedData);
      }

      // Check if there's more data
      const totalFetched = (pageNum + 1) * PAGE_SIZE;
      setHasMore(count ? totalFetched < count : transformedData.length === PAGE_SIZE);
      
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error('Error fetching businesses:', err);
        setError(err.message || 'Failed to load businesses');
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [category, searchTerm, location, sortBy]);

  // Initial fetch and reset on filter changes
  useEffect(() => {
    setPage(0);
    setBusinesses([]);
    setHasMore(true);
    fetchBusinesses(0, false);
  }, [category, searchTerm, location, sortBy]);

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchBusinesses(nextPage, true);
    }
  }, [page, loadingMore, hasMore, fetchBusinesses]);

  const refetch = useCallback(() => {
    setPage(0);
    setBusinesses([]);
    setHasMore(true);
    fetchBusinesses(0, false);
  }, [fetchBusinesses]);

  return { 
    businesses, 
    loading, 
    loadingMore,
    error, 
    hasMore,
    loadMore,
    refetch
  };
};
