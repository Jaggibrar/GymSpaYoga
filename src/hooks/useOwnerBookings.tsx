
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

        // Get business profiles for the current user
        const { data: businessProfiles, error: businessError } = await supabase
          .from('business_profiles')
          .select('id')
          .eq('user_id', user.id);

        if (businessError) {
          console.error('Error fetching business profiles:', businessError);
          setError('Failed to fetch business profiles');
          setLoading(false);
          return;
        }

        if (!businessProfiles || businessProfiles.length === 0) {
          setBookings([]);
          setLoading(false);
          return;
        }

        const businessIds = businessProfiles.map(bp => bp.id);

        // Fetch bookings with separate queries to avoid join issues
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
          setError(bookingsError.message);
          setLoading(false);
          return;
        }

        // Fetch user profiles separately
        const userIds = [...new Set(bookingsData?.map(b => b.user_id).filter(Boolean) || [])];
        const { data: userProfiles } = await supabase
          .from('user_profiles')
          .select('user_id, full_name, phone')
          .in('user_id', userIds);

        // Fetch business profiles separately  
        const { data: businessProfilesData } = await supabase
          .from('business_profiles')
          .select('id, business_name')
          .in('id', businessIds);

        // Combine the data
        const enrichedBookings = (bookingsData || []).map((booking: any) => {
          const userProfile = userProfiles?.find(up => up.user_id === booking.user_id);
          const businessProfile = businessProfilesData?.find(bp => bp.id === booking.business_id);
          
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

        setBookings(enrichedBookings);
      } catch (err) {
        console.error('Error in fetchOwnerBookings:', err);
        setError('Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerBookings();
  }, [user, filter]);

  return { bookings, loading, error };
};
