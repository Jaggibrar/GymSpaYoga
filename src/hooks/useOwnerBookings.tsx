
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useLoadingTimeout } from '@/hooks/useLoadingTimeout';

interface useOwnerBooking {
  id: number;
  user_id: string | null;
  business_type: string | null;
  business_id: string | null;
  trainer_id: string | null;
  booking_date: string | null;
  booking_time: string | null;
  duration_minutes: number | null;
  total_amount: number | null;
  status: string;
  payment_status: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string | null;
  confirmation_code: string | null;
  confirmed_at: string | null;
  cancelled_at: string | null;
  cancellation_reason: string | null;
  business_response: string | null;
  response_at: string | null;
  user_profile?: {
    full_name: string | null;
    phone: string | null;
  } | null;
  business_profile?: {
    business_name: string | null;
  } | null;
}

export const useOwnerBookings = (filter: "pending" | "confirmed" | "cancelled" | "all" = "all") => {
  const [bookings, setBookings] = useState<useOwnerBooking[]>([]);
  const { user } = useAuth();
  const { executeWithTimeout, loading, error, reset } = useLoadingTimeout({
    timeout: 12000,
    retryAttempts: 2
  });

  const fetchOwnerBookings = useCallback(async () => {
    if (!user) {
      setBookings([]);
      return;
    }

    console.log('🔄 Fetching owner bookings with timeout protection...');

    const result = await executeWithTimeout(async () => {
      // Single optimized query with joins instead of multiple queries
      let query = supabase
        .from('bookings')
        .select(`
          *,
          user_profiles!inner(full_name, phone),
          business_profiles!inner(business_name, user_id)
        `)
        .eq('business_profiles.user_id', user.id)
        .order('created_at', { ascending: false });

      // Apply status filter
      if (filter !== "all") {
        query = query.eq('status', filter);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        throw new Error(`Failed to fetch bookings: ${fetchError.message}`);
      }

      // Transform the data to match the expected interface
      const transformedBookings = (data || []).map((booking: any) => ({
        ...booking,
        user_profile: booking.user_profiles ? {
          full_name: booking.user_profiles.full_name,
          phone: booking.user_profiles.phone
        } : null,
        business_profile: booking.business_profiles ? {
          business_name: booking.business_profiles.business_name
        } : null
      }));

      console.log('✅ Successfully fetched bookings:', transformedBookings.length);
      return transformedBookings;
    }, 'Fetch Owner Bookings');

    if (result) {
      setBookings(result);
    }
  }, [user, filter, executeWithTimeout]);

  // Set up optimized real-time subscription with cleanup
  useEffect(() => {
    let mounted = true;
    let channel: any = null;

    const setupRealtimeSubscription = () => {
      if (!user) return;

      try {
        channel = supabase
          .channel(`owner-bookings-${user.id}`)
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'bookings'
            },
            (payload) => {
              if (!mounted) return;
              console.log('📡 Real-time booking update received:', payload.eventType);
              // Debounced refetch to prevent too many calls
              setTimeout(() => {
                if (mounted) fetchOwnerBookings();
              }, 1000);
            }
          )
          .subscribe((status) => {
            console.log('📡 Subscription status:', status);
          });
      } catch (err) {
        console.warn('Failed to setup real-time subscription:', err);
      }
    };

    setupRealtimeSubscription();

    return () => {
      mounted = false;
      if (channel) {
        supabase.removeChannel(channel);
        console.log('🧹 Cleaned up real-time subscription');
      }
    };
  }, [user, fetchOwnerBookings]);

  useEffect(() => {
    fetchOwnerBookings();
  }, [fetchOwnerBookings]);

  const refetch = useCallback(() => {
    reset();
    fetchOwnerBookings();
  }, [fetchOwnerBookings, reset]);

  return { bookings, loading, error, refetch };
};

// Optimized helper function to check if user has any business profiles
export const useHasBusinessProfiles = () => {
  const [hasProfiles, setHasProfiles] = useState(false);
  const { user } = useAuth();
  const { executeWithTimeout, loading } = useLoadingTimeout({
    timeout: 8000,
    retryAttempts: 2
  });

  useEffect(() => {
    const checkProfiles = async () => {
      if (!user) {
        setHasProfiles(false);
        return;
      }

      const result = await executeWithTimeout(async () => {
        const { data, error } = await supabase
          .from('business_profiles')
          .select('id')
          .eq('user_id', user.id)
          .limit(1)
          .single();

        return !error && data;
      }, 'Check Business Profiles');

      setHasProfiles(!!result);
    };

    checkProfiles();
  }, [user, executeWithTimeout]);

  return { hasProfiles, loading };
};
