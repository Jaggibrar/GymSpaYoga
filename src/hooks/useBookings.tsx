
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface Booking {
  id: number;
  user_id: string | null;
  business_type: 'gym' | 'spa' | 'yoga' | 'trainer' | null;
  business_id: string | null;
  trainer_id: string | null;
  booking_date: string | null;
  booking_time: string | null;
  duration_minutes: number | null;
  total_amount: number | null;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | null;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded' | null;
  notes: string | null;
  created_at: string;
  updated_at: string | null;
}

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          setError(error.message);
          console.error('Error fetching bookings:', error);
          return;
        }

        setBookings(data || []);
      } catch (err) {
        setError('Failed to fetch bookings');
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const createBooking = async (bookingData: Omit<Booking, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([{ ...bookingData, user_id: user.id }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      setBookings(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('Error creating booking:', err);
      throw err;
    }
  };

  return { bookings, loading, error, createBooking };
};
