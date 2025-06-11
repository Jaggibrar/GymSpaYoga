
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export const useBookingConfirmation = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const confirmBooking = async (bookingId: number, notes?: string) => {
    if (!user) {
      toast.error("Please login to confirm bookings");
      return false;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-booking-confirmation', {
        body: {
          bookingId,
          action: 'confirmed',
          notes
        }
      });

      if (error) {
        throw error;
      }

      toast.success("Booking confirmed successfully!");
      return true;
    } catch (error) {
      console.error('Error confirming booking:', error);
      toast.error("Failed to confirm booking");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const rejectBooking = async (bookingId: number, reason?: string) => {
    if (!user) {
      toast.error("Please login to reject bookings");
      return false;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-booking-confirmation', {
        body: {
          bookingId,
          action: 'cancelled',
          notes: reason
        }
      });

      if (error) {
        throw error;
      }

      toast.success("Booking rejected");
      return true;
    } catch (error) {
      console.error('Error rejecting booking:', error);
      toast.error("Failed to reject booking");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async (bookingData: any) => {
    if (!user) {
      toast.error("Please login to create bookings");
      return null;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-booking', {
        body: bookingData
      });

      if (error) {
        throw error;
      }

      toast.success("Booking request submitted!");
      return data.booking;
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error("Failed to create booking");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    confirmBooking,
    rejectBooking,
    createBooking,
    loading
  };
};
