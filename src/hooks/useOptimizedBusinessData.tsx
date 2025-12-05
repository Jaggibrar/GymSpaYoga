
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

// Global cache to prevent duplicate requests
const dataCache = new Map<string, { data: Business[]; timestamp: number; loading: Promise<Business[]> | null }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useOptimizedBusinessData = (
  category?: string,
  searchTerm: string = '',
  location: string = '',
  sortBy: string = 'created_at'
) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const getCacheKey = useCallback(() => {
    return `${category || 'all'}-${searchTerm}-${location}-${sortBy}`;
  }, [category, searchTerm, location, sortBy]);

  const fetchBusinesses = useCallback(async (): Promise<Business[]> => {
    const cacheKey = getCacheKey();
    const cached = dataCache.get(cacheKey);
    
    // Return cached data if valid
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      if (cached.loading) {
        return await cached.loading;
      }
      return cached.data;
    }

    // If already loading, wait for that request
    if (cached?.loading) {
      return await cached.loading;
    }

    // Cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    // Create loading promise
    const loadingPromise = (async () => {
      try {
        let data: Business[] = [];

        // For trainer category, fetch from trainer_profiles
        if (category === 'trainer') {
          const { data: trainers, error: trainerError } = await supabase
            .from('trainer_profiles')
            .select('*')
            .eq('status', 'approved')
            .order('created_at', { ascending: false })
            .abortSignal(signal);

          if (trainerError) throw trainerError;

          // Transform trainer data to match Business interface
          data = (trainers || []).map(trainer => ({
            id: trainer.id,
            business_name: trainer.name,
            business_type: 'trainer',
            category: trainer.category,
            email: trainer.email,
            phone: trainer.phone,
            address: trainer.location,
            city: trainer.location.split(',')[0] || trainer.location,
            state: trainer.location.split(',')[1]?.trim() || 'India',
            pin_code: '000000',
            opening_time: '09:00:00',
            closing_time: '18:00:00',
            session_price: trainer.hourly_rate,
            description: trainer.bio,
            amenities: trainer.specializations || [],
            image_urls: trainer.profile_image_url ? [trainer.profile_image_url] : [],
            status: trainer.status,
            created_at: trainer.created_at,
            updated_at: trainer.updated_at || trainer.created_at
          }));
        } else {
          // Build optimized query for businesses
          let query = supabase
            .from('business_profiles')
            .select('*')
            .eq('status', 'approved')
            .limit(50); // Reasonable limit

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
              query = query.order('business_name', { ascending: true });
              break;
            case 'price':
              query = query.order('monthly_price', { ascending: true, nullsFirst: false });
              break;
            case 'created_at':
            default:
              query = query.order('created_at', { ascending: false });
              break;
          }

          const { data: businessData, error: fetchError } = await query.abortSignal(signal);
          
          if (fetchError) throw fetchError;

          data = (businessData || []).map(business => ({
            ...business,
            amenities: Array.isArray(business.amenities) ? business.amenities : [],
            image_urls: Array.isArray(business.image_urls) ? business.image_urls : [],
            monthly_price: business.monthly_price || undefined,
            session_price: business.session_price || undefined,
            description: business.description || 'No description available',
            business_name: business.business_name || 'Unnamed Business'
          }));
        }

        // Update cache with successful result
        dataCache.set(cacheKey, { data, timestamp: Date.now(), loading: null });
        return data;
        
      } catch (err: any) {
        // Remove from cache on error
        dataCache.delete(cacheKey);
        throw err;
      }
    })();

    // Store loading promise in cache
    dataCache.set(cacheKey, { data: [], timestamp: Date.now(), loading: loadingPromise });
    
    return loadingPromise;
  }, [category, searchTerm, location, sortBy, getCacheKey]);

  // Fetch data with error handling
  useEffect(() => {
    let mounted = true;
    
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchBusinesses();
        if (mounted) {
          setBusinesses(data);
        }
      } catch (err: any) {
        if (mounted && err.name !== 'AbortError') {
          console.error('Error fetching businesses:', err);
          setError(err.message || 'Failed to load businesses');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [fetchBusinesses]);

  // Set up real-time subscription with debouncing
  useEffect(() => {
    let mounted = true;
    let timeoutId: NodeJS.Timeout;
    
    const channel = supabase
      .channel('optimized-business-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'business_profiles' },
        () => {
          if (!mounted) return;
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            if (mounted) {
              dataCache.clear();
              const loadData = async () => {
                try {
                  const data = await fetchBusinesses();
                  if (mounted) {
                    setBusinesses(data);
                  }
                } catch (err) {
                  // Silent fail for real-time updates
                }
              };
              loadData();
            }
          }, 2000);
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      supabase.removeChannel(channel);
    };
  }, [fetchBusinesses]);

  return { 
    businesses, 
    loading, 
    error, 
    refetch: fetchBusinesses 
  };
};

// Helper function to determine tier
const getTier = (monthlyPrice?: number, sessionPrice?: number): string => {
  const price = monthlyPrice || sessionPrice || 0;
  if (price >= 5000) return 'luxury';
  if (price >= 3000) return 'premium';
  return 'budget';
};
