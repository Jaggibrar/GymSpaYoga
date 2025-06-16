
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
  };
  business_profile?: {
    business_name: string | null;
  };
}

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

      let data;
      let error;

      if (businessOwnersView) {
        // Fetch bookings for businesses owned by the current user with user profile data
        const { data: businessProfiles, error: businessError } = await supabase
          .from('business_profiles')
          .select('id')
          .eq('user_id', user.id);

        if (businessError) {
          console.error('Error fetching business profiles:', businessError);
          setError('Failed to fetch business profiles');
          return;
        }

        if (businessProfiles && businessProfiles.length > 0) {
          const businessIds = businessProfiles.map(bp => bp.id);

          // Build entire query with all clauses before calling order
          const result = await supabase
            .from('bookings')
            .select(`
              *,
              user_profile:user_id(full_name, phone),
              business_profile:business_id(business_name)
            `)
            .in('business_id', businessIds)
            .order('created_at', { ascending: false });

          data = result.data;
          error = result.error;
        } else {
          setBookings([]);
          setLoading(false);
          return;
        }
      } else {
        // Fetch bookings for the current user with business profile data
        const result = await supabase
          .from('bookings')
          .select(`
            *,
            business_profile:business_id(business_name)
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        data = result.data;
        error = result.error;
      }

      if (error) {
        console.error('Error fetching bookings:', error);
        setError(error.message);
        return;
      }

      setBookings(data || []);
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
