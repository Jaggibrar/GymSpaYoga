
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

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

export const useRealTimeBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching bookings:', error);
      } else {
        setBookings(data || []);
      }
      setLoading(false);
    };

    fetchBookings();

    // Set up real-time subscription for bookings
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
          
          if (payload.eventType === 'INSERT') {
            setBookings(prev => [payload.new as Booking, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setBookings(prev => 
              prev.map(booking => 
                booking.id === payload.new.id ? payload.new as Booking : booking
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setBookings(prev => 
              prev.filter(booking => booking.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const updateBookingStatus = async (bookingId: number, status: string, notes?: string) => {
    const { error } = await supabase.rpc('update_booking_status', {
      booking_id_param: bookingId,
      new_status_param: status,
      notes_param: notes
    });

    if (error) {
      console.error('Error updating booking status:', error);
      return false;
    }
    return true;
  };

  return {
    bookings,
    loading,
    updateBookingStatus
  };
};
