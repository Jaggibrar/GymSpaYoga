
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface OwnerBooking {
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
  const [bookings, setBookings] = useState<OwnerBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOwnerBookings = async () => {
      if (!user) {
        setBookings([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log('Fetching bookings for user:', user.id);

        // Get business profiles for the current user with error handling
        const { data: businessProfiles, error: businessError } = await supabase
          .from('business_profiles')
          .select('id, business_name')
          .eq('user_id', user.id);

        if (businessError) {
          console.error('Error fetching business profiles:', businessError);
          setError(`Failed to fetch business profiles: ${businessError.message}`);
          setLoading(false);
          return;
        }

        console.log('Business profiles found:', businessProfiles);

        if (!businessProfiles || businessProfiles.length === 0) {
          console.log('No business profiles found for user');
          setBookings([]);
          setLoading(false);
          return;
        }

        const businessIds = businessProfiles.map(bp => bp.id);
        console.log('Business IDs:', businessIds);

        // Fetch bookings with proper error handling
        let bookingsQuery = supabase
          .from('bookings')
          .select('*')
          .in('business_id', businessIds)
          .order('created_at', { ascending: false });

        // Apply status filter
        if (filter !== "all") {
          bookingsQuery = bookingsQuery.eq('status', filter);
        }

        const { data: bookingsData, error: bookingsError } = await bookingsQuery;

        if (bookingsError) {
          console.error('Error fetching bookings:', bookingsError);
          setError(`Failed to fetch bookings: ${bookingsError.message}`);
          setLoading(false);
          return;
        }

        console.log('Bookings data:', bookingsData);

        if (!bookingsData || bookingsData.length === 0) {
          console.log('No bookings found');
          setBookings([]);
          setLoading(false);
          return;
        }

        // Fetch user profiles separately with error handling
        const userIds = [...new Set(bookingsData.map(b => b.user_id).filter(Boolean))];
        console.log('User IDs to fetch:', userIds);

        let userProfiles = [];
        if (userIds.length > 0) {
          const { data: userProfilesData, error: userProfilesError } = await supabase
            .from('user_profiles')
            .select('user_id, full_name, phone')
            .in('user_id', userIds);

          if (userProfilesError) {
            console.error('Error fetching user profiles:', userProfilesError);
            // Don't fail the entire request, just continue without user profile data
          } else {
            userProfiles = userProfilesData || [];
          }
        }

        console.log('User profiles:', userProfiles);

        // Combine the data
        const enrichedBookings = bookingsData.map((booking: any) => {
          const userProfile = userProfiles.find((up: any) => up.user_id === booking.user_id);
          const businessProfile = businessProfiles.find(bp => bp.id === booking.business_id);
          
          return {
            ...booking,
            user_profile: userProfile ? {
              full_name: userProfile.full_name,
              phone: userProfile.phone
            } : null,
            business_profile: businessProfile ? {
              business_name: businessProfile.business_name
            } : null
          };
        });

        console.log('Enriched bookings:', enrichedBookings);
        setBookings(enrichedBookings);
      } catch (err) {
        console.error('Error in fetchOwnerBookings:', err);
        setError(`Unexpected error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerBookings();
  }, [user, filter]);

  const refetch = () => {
    if (user) {
      setLoading(true);
      setError(null);
      // Trigger useEffect by updating a dependency
      fetchOwnerBookings();
    }
  };

  return { bookings, loading, error, refetch };
};

// Helper function to check if user has any business profiles
export const useHasBusinessProfiles = () => {
  const [hasProfiles, setHasProfiles] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const checkProfiles = async () => {
      if (!user) {
        setHasProfiles(false);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('business_profiles')
          .select('id')
          .eq('user_id', user.id)
          .limit(1);

        if (!error && data && data.length > 0) {
          setHasProfiles(true);
        } else {
          setHasProfiles(false);
        }
      } catch (err) {
        console.error('Error checking business profiles:', err);
        setHasProfiles(false);
      } finally {
        setLoading(false);
      }
    };

    checkProfiles();
  }, [user]);

  return { hasProfiles, loading };
};
