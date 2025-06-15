
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
      if (businessOwnersOnly) {
        // Get bookings for businesses owned by current user
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            user_profiles!bookings_user_id_fkey(full_name, phone)
          `)
          .eq('business_profiles.user_id', user?.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching business bookings:', error);
          return;
        }

        const formattedData = data?.map(booking => ({
          ...booking,
          user_profile: booking.user_profiles ? {
            full_name: booking.user_profiles.full_name || 'Unknown User',
            phone: booking.user_profiles.phone
          } : undefined
        })) || [];

        setBookings(formattedData);
      } else {
        // Get bookings for current user
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            business_profiles!bookings_business_id_fkey(business_name)
          `)
          .eq('user_id', user?.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching user bookings:', error);
          return;
        }

        const formattedData = data?.map(booking => ({
          ...booking,
          business_profile: booking.business_profiles ? {
            business_name: booking.business_profiles.business_name || 'Unknown Business'
          } : undefined
        })) || [];

        setBookings(formattedData);
      }
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
