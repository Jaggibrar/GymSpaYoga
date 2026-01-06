
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { performanceMonitor } from '@/utils/performanceMonitor';
import { useLoadingTimeout } from '@/hooks/useLoadingTimeout';

export interface Business {
  id: string;
  slug?: string;
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

export const useBusinessData = (
  category?: string,
  searchTerm: string = '',
  location: string = '',
  sortBy: string = 'created_at'
) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const { executeWithTimeout, loading, error } = useLoadingTimeout({
    timeout: 12000,
    retryAttempts: 2,
    onTimeout: () => {
      toast.error('Loading is taking longer than expected. Please check your connection.');
    }
  });

  const fetchBusinesses = useCallback(async () => {
    const startTime = Date.now();
    console.log('🔍 Fetching businesses with timeout protection... Category:', category || 'all');
    console.log('📊 Search params:', { searchTerm, location, sortBy });
    
    const result = await executeWithTimeout(async () => {
      // For trainer category, fetch from trainer_profiles
      if (category === 'trainer') {
        const { data: trainers, error: trainerError } = await supabase
          .from('trainer_profiles')
          .select('*')
          .eq('status', 'approved')
          .order('created_at', { ascending: false });

        performanceMonitor.trackApiCall('trainer_profiles', startTime);

        if (trainerError) {
          throw new Error(`Failed to fetch trainers: ${trainerError.message}`);
        }

        console.log('✅ Successfully fetched trainers:', trainers?.length || 0);
        
        // Transform trainer data to match Business interface
        const transformedTrainers = (trainers || []).map(trainer => ({
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

        return transformedTrainers;
      }

      // For regular businesses, use optimized query with secure public view
      let query = supabase
        .from('public_business_listings')
        .select('*');

      // Apply category filter (exclude trainer as it's handled above)
      if (category && category !== 'all' && category !== 'trainer') {
        console.log('🎯 Filtering by category:', category);
        query = query.eq('business_type', category);
      }

      // Apply search term filter
      if (searchTerm?.trim()) {
        console.log('🔤 Applying search term:', searchTerm);
        query = query.or(`business_name.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      // Apply location filter
      if (location?.trim()) {
        console.log('📍 Applying location filter:', location);
        query = query.or(`city.ilike.%${location}%,state.ilike.%${location}%`);
      }

      // Apply sorting with fallback
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

      const { data, error: fetchError } = await query;
      
      performanceMonitor.trackApiCall('business_profiles', startTime);

      if (fetchError) {
        throw new Error(`Failed to fetch businesses: ${fetchError.message}`);
      }

      console.log('✅ Successfully fetched businesses:', data?.length || 0);
      
      // Ensure we have valid business objects with proper defaults
      const validBusinesses = (data || []).map(business => ({
        ...business,
        amenities: Array.isArray(business.amenities) ? business.amenities : [],
        image_urls: Array.isArray(business.image_urls) ? business.image_urls : [],
        monthly_price: business.monthly_price || undefined,
        session_price: business.session_price || undefined,
        description: business.description || 'No description available',
        business_name: business.business_name || 'Unnamed Business'
      }));

      console.log('🎯 Final filtered results:', validBusinesses.length, 'businesses');
      return validBusinesses;
    }, 'Fetch Business Data');

    if (result) {
      setBusinesses(result);
    }
  }, [category, searchTerm, location, sortBy, executeWithTimeout]);

  // Set up optimized real-time subscription with proper cleanup
  useEffect(() => {
    let mounted = true;
    let businessChannel: any = null;
    let trainerChannel: any = null;

    const setupRealtimeSubscription = () => {
      if (!mounted) return;
      
      try {
        // Business profiles subscription with unique channel name
        businessChannel = supabase
          .channel(`business-changes-${Date.now()}-${Math.random()}`)
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'business_profiles'
            },
            (payload) => {
              if (!mounted) return;
              console.log('📡 Real-time business update received:', payload.eventType);
              // Debounced refetch to prevent too many calls
              setTimeout(() => {
                if (mounted) fetchBusinesses();
              }, 1000);
            }
          )
          .subscribe();

        // Trainer profiles subscription with unique channel name
        trainerChannel = supabase
          .channel(`trainer-changes-${Date.now()}-${Math.random()}`)
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'trainer_profiles'
            },
            (payload) => {
              if (!mounted) return;
              console.log('📡 Real-time trainer update received:', payload.eventType);
              setTimeout(() => {
                if (mounted) fetchBusinesses();
              }, 1000);
            }
          )
          .subscribe();

        console.log('📡 Real-time subscriptions established');
      } catch (err) {
        console.warn('Failed to setup real-time subscriptions:', err);
      }
    };

    setupRealtimeSubscription();

    return () => {
      mounted = false;
      if (businessChannel) {
        supabase.removeChannel(businessChannel);
      }
      if (trainerChannel) {
        supabase.removeChannel(trainerChannel);
      }
      console.log('🧹 Cleaned up real-time subscriptions');
    };
  }, [fetchBusinesses]);

  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);

  return { 
    businesses, 
    loading, 
    error, 
    refetch: fetchBusinesses 
  };
};
