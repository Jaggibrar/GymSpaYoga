
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
}

export const useRealTimeBookings = (businessOwnersView = false) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchBookings = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      let query = supabase.from('bookings').select('*');

      if (businessOwnersView) {
        // Fetch bookings for businesses owned by the current user
        const { data: businessProfiles } = await supabase
          .from('business_profiles')
          .select('id')
          .eq('user_id', user.id);

        if (businessProfiles && businessProfiles.length > 0) {
          const businessIds = businessProfiles.map(bp => bp.id);
          query = query.in('business_id', businessIds);
        } else {
          setBookings([]);
          setLoading(false);
          return;
        }
      } else {
        // Fetch bookings for the current user
        query = query.eq('user_id', user.id);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching bookings:', error);
        setError(error.message);
        toast.error('Failed to fetch bookings');
        return;
      }

      setBookings(data || []);
      setError(null);
    } catch (err) {
      console.error('Error in fetchBookings:', err);
      setError('Failed to fetch bookings');
      toast.error('Failed to fetch bookings');
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
          fetchBookings(); // Refetch to ensure we get the latest data
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, businessOwnersView]);

  return { bookings, loading, error, updateBookingStatus, refetch };
};
