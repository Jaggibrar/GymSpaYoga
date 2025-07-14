
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface Booking {
  id: number;
  user_id: string | null;
  business_type: string | null;
  business_id: string | null;
  trainer_id: string | null;
  booking_date: string | null;
  booking_time: string | null;
  duration_minutes: number | null;
  total_amount: number | null;
  status: string | null;
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
    email: string | null;
  } | null;
  business_profile?: {
    business_name: string | null;
    monthly_price?: number | null;
    session_price?: number | null;
  } | null;
}

// Type guard to validate booking data
const isValidBooking = (data: any): data is Booking => {
  return data && typeof data.id === 'number' && typeof data.created_at === 'string';
};

// Type guard to ensure proper profile data
const normalizeBookingData = (rawBooking: any): Booking => {
  return {
    ...rawBooking,
    user_profile: rawBooking.user_profile && !rawBooking.user_profile.error 
      ? rawBooking.user_profile 
      : null,
    business_profile: rawBooking.business_profile && !rawBooking.business_profile.error 
      ? rawBooking.business_profile 
      : null,
  };
};

export const useRealTimeBookings = (businessOwnersView = false) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchBookings = async () => {
    if (!user) {
      setBookings([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (businessOwnersView) {
        // First get business profiles for the current user
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

        if (businessProfiles && businessProfiles.length > 0) {
          const businessIds = businessProfiles.map(bp => bp.id);

          // Fetch bookings for businesses owned by the current user
          const { data, error } = await supabase
            .from('bookings')
            .select(`
              *,
              user_profile:user_profiles(full_name, phone),
              business_profile:business_profiles(business_name, monthly_price, session_price)
            `)
            .in('business_id', businessIds)
            .order('created_at', { ascending: false });

          if (error) {
            console.error('Error fetching business bookings:', error);
            setError(`Failed to load business bookings: ${error.message}`);
            setLoading(false);
            return;
          }

          // Normalize and validate the data
          const validBookings = (data || [])
            .map(normalizeBookingData)
            .filter(isValidBooking);
          
          setBookings(validBookings);
        } else {
          setBookings([]);
        }
      } else {
        // Fetch bookings for the current user - include pricing info for tier calculation
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            business_profile:business_profiles(business_name, monthly_price, session_price)
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching user bookings:', error);
          setError(`Failed to load bookings: ${error.message}`);
          setLoading(false);
          return;
        }

        // Normalize and validate the data
        const validBookings = (data || [])
          .map(normalizeBookingData)
          .filter(isValidBooking);
        
        setBookings(validBookings);
      }
    } catch (err) {
      console.error('Error in fetchBookings:', err);
      setError('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: number, status: string, notes?: string) => {
    try {
      const { error } = await supabase.rpc('update_booking_status', {
        booking_id_param: bookingId,
        new_status_param: status,
        notes_param: notes
      });

      if (error) {
        console.error('Error updating booking status:', error);
        toast.error(`Failed to update booking status: ${error.message}`);
        return false;
      }

      toast.success(`Booking ${status} successfully`);
      fetchBookings(); // Refetch bookings after update
      return true;
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast.error('Failed to update booking status');
      return false;
    }
  };

  const refetch = fetchBookings;

  useEffect(() => {
    fetchBookings();

    // Set up real-time subscription
    const channel = supabase
      .channel('booking-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings'
        },
        (payload) => {
          console.log('Real-time booking update:', payload);
          fetchBookings(); // Refetch to ensure we get the latest data with joins
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, businessOwnersView]);

  return { bookings, loading, error, updateBookingStatus, refetch };
};
