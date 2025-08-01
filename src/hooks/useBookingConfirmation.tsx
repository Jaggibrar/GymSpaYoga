
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface BookingData {
  user_id: string;
  business_id: string;
  business_type: string;
  trainer_id?: string | null;
  booking_date: string;
  booking_time: string;
  duration_minutes?: number;
  total_amount?: number;
  status?: string;
  payment_status?: string;
  notes?: string;
}

export const useBookingConfirmation = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const createBooking = async (bookingData: BookingData) => {
    console.log('useBookingConfirmation - createBooking called:', { 
      user: user?.id, 
      bookingData 
    });

    if (!user) {
      console.log('useBookingConfirmation - No user, showing error');
      toast.error('Please login to create a booking');
      return null;
    }

    setLoading(true);
    try {
      console.log('useBookingConfirmation - Inserting booking into database');
      
      // Insert booking into database with proper error handling
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          user_id: bookingData.user_id,
          business_id: bookingData.business_id,
          business_type: bookingData.business_type,
          trainer_id: bookingData.trainer_id,
          booking_date: bookingData.booking_date,
          booking_time: bookingData.booking_time,
          duration_minutes: bookingData.duration_minutes || 60,
          total_amount: bookingData.total_amount,
          status: bookingData.status || 'pending',
          payment_status: bookingData.payment_status || 'pending',
          notes: bookingData.notes
        })
        .select()
        .maybeSingle();

      if (bookingError) {
        console.error('useBookingConfirmation - Error creating booking:', bookingError);
        toast.error(`Failed to create booking: ${bookingError.message}`);
        return null;
      }

      console.log('useBookingConfirmation - Booking created successfully:', booking.id);

      // Get business details for notification with proper error handling
      const { data: business, error: businessError } = await supabase
        .from('business_profiles')
        .select('business_name, user_id, email')
        .eq('id', bookingData.business_id)
        .maybeSingle();

      if (businessError && businessError.code !== 'PGRST116') {
        console.error('Error fetching business details:', businessError);
      }

      // Get user details with proper error handling
      const { data: userProfile, error: userError } = await supabase
        .from('user_profiles')
        .select('full_name')
        .eq('user_id', bookingData.user_id)
        .maybeSingle();

      if (userError && userError.code !== 'PGRST116') {
        console.error('Error fetching user details:', userError);
      }

      // Send notification to business owner (optional email)
      if (business && userProfile) {
        try {
          await supabase.functions.invoke('send-booking-notification', {
            body: {
              bookingId: booking.id,
              type: 'new_booking',
              businessOwnerEmail: business.email,
              businessName: business.business_name,
              customerName: userProfile.full_name,
              bookingDate: bookingData.booking_date,
              bookingTime: bookingData.booking_time
            }
          });
        } catch (notificationError) {
          console.error('Error sending notification:', notificationError);
          // Don't fail the booking if notification fails
        }
      }

      toast.success('Booking created successfully!');
      return booking;
    } catch (error) {
      console.error('useBookingConfirmation - Error in booking creation:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Failed to create booking: ${errorMessage}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const confirmBooking = async (bookingId: number, notes?: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.rpc('update_booking_status', {
        booking_id_param: bookingId,
        new_status_param: 'confirmed',
        notes_param: notes
      });

      if (error) {
        console.error('Error confirming booking:', error);
        toast.error(`Failed to confirm booking: ${error.message}`);
        return false;
      }

      toast.success('Booking confirmed successfully');
      return true;
    } catch (error) {
      console.error('Error confirming booking:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Failed to confirm booking: ${errorMessage}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const rejectBooking = async (bookingId: number, reason?: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.rpc('update_booking_status', {
        booking_id_param: bookingId,
        new_status_param: 'rejected',
        notes_param: reason
      });

      if (error) {
        console.error('Error rejecting booking:', error);
        toast.error(`Failed to reject booking: ${error.message}`);
        return false;
      }

      toast.success('Booking rejected');
      return true;
    } catch (error) {
      console.error('Error rejecting booking:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Failed to reject booking: ${errorMessage}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createBooking,
    confirmBooking,
    rejectBooking,
    loading
  };
};
