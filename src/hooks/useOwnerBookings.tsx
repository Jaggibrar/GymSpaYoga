
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

        // Build query
        let query = supabase
          .from('bookings')
          .select(`
            *,
            user_profile:user_profiles!bookings_user_id_fkey(full_name, phone),
            business_profile:business_profiles!bookings_business_id_fkey(business_name)
          `)
          .in('business_id', businessIds)
          .order('created_at', { ascending: false });

        // Apply status filter
        if (filter !== "all") {
          query = query.eq('status', filter);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching owner bookings:', error);
          setError(error.message);
          setLoading(false);
          return;
        }

        // Normalize the data
        const normalizedBookings = (data || []).map((booking: any) => ({
          ...booking,
          user_profile: booking.user_profile && !booking.user_profile.error 
            ? booking.user_profile 
            : null,
          business_profile: booking.business_profile && !booking.business_profile.error 
            ? booking.business_profile 
            : null,
        }));

        setBookings(normalizedBookings);
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
