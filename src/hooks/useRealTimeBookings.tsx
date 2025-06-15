
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface Booking {
  id: number;
  user_id: string;
  business_id: string;
  trainer_id?: string;
  booking_date: string;
  booking_time: string;
  status: string;
  business_type: string;
  total_amount?: number;
  duration_minutes?: number;
  notes?: string;
  confirmed_at?: string;
  cancelled_at?: string;
  created_at: string;
  updated_at: string;
}

interface BookingWithUserInfo extends Booking {
  user_profile?: {
    full_name: string;
    phone?: string;
  };
  business_profile?: {
    business_name: string;
  };
}

export const useRealTimeBookings = (businessOwnersOnly: boolean = false) => {
  const [bookings, setBookings] = useState<BookingWithUserInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetchBookings();
    subscribeToBookings();
  }, [user, businessOwnersOnly]);

  const fetchBookings = async () => {
    try {
      let query = supabase
        .from('bookings')
        .select(`
          *,
          user_profiles!inner(full_name, phone),
          business_profiles!inner(business_name)
        `)
        .order('created_at', { ascending: false });

      if (businessOwnersOnly) {
        // Get bookings for businesses owned by current user
        query = query.eq('business_profiles.user_id', user?.id);
      } else {
        // Get bookings for current user
        query = query.eq('user_id', user?.id);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching bookings:', error);
        return;
      }

      const formattedData = data?.map(booking => ({
        ...booking,
        user_profile: booking.user_profiles,
        business_profile: booking.business_profiles
      })) || [];

      setBookings(formattedData);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToBookings = () => {
    const channel = supabase
      .channel('bookings-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings'
        },
        (payload) => {
          console.log('Booking change detected:', payload);
          // Refetch bookings to get updated data with joins
          fetchBookings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
        toast.error('Failed to update booking status');
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

  return {
    bookings,
    loading,
    updateBookingStatus,
    refetch: fetchBookings
  };
};
