
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
        // First get businesses owned by current user
        const { data: businesses, error: businessError } = await supabase
          .from('business_profiles')
          .select('id')
          .eq('user_id', user?.id);

        if (businessError) {
          console.error('Error fetching business profiles:', businessError);
          return;
        }

        if (!businesses || businesses.length === 0) {
          setBookings([]);
          setLoading(false);
          return;
        }

        const businessIds = businesses.map(b => b.id);

        // Get bookings for these businesses with user info
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select('*')
          .in('business_id', businessIds)
          .order('created_at', { ascending: false });

        if (bookingsError) {
          console.error('Error fetching business bookings:', bookingsError);
          return;
        }

        // Fetch user profiles for each booking
        const bookingsWithUserInfo = await Promise.all(
          (bookingsData || []).map(async (booking) => {
            const { data: userProfile } = await supabase
              .from('user_profiles')
              .select('full_name, phone')
              .eq('user_id', booking.user_id)
              .single();

            return {
              ...booking,
              user_profile: userProfile ? {
                full_name: userProfile.full_name || 'Unknown User',
                phone: userProfile.phone
              } : undefined
            };
          })
        );

        setBookings(bookingsWithUserInfo);
      } else {
        // Get bookings for current user
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', user?.id)
          .order('created_at', { ascending: false });

        if (bookingsError) {
          console.error('Error fetching user bookings:', bookingsError);
          return;
        }

        // Fetch business profiles for each booking
        const bookingsWithBusinessInfo = await Promise.all(
          (bookingsData || []).map(async (booking) => {
            const { data: businessProfile } = await supabase
              .from('business_profiles')
              .select('business_name')
              .eq('id', booking.business_id)
              .single();

            return {
              ...booking,
              business_profile: businessProfile ? {
                business_name: businessProfile.business_name || 'Unknown Business'
              } : undefined
            };
          })
        );

        setBookings(bookingsWithBusinessInfo);
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
