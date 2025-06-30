
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useLoadingTimeout } from './useLoadingTimeout';

interface BookingData {
  user_id: string;
  business_id: string;
  trainer_id?: string | null;
  business_type: string;
  booking_date: string;
  booking_time: string;
  duration_minutes: number;
  total_amount: number;
  status: string;
  payment_status: string;
  notes?: string;
}

export const useBookings = () => {
  const [submitting, setSubmitting] = useState(false);
  const { executeWithTimeout } = useLoadingTimeout({
    timeout: 30000,
    retryAttempts: 2,
    onTimeout: () => {
      toast.error('Booking request is taking longer than expected. Please try again.');
    }
  });

  const submitBooking = useCallback(async (bookingData: BookingData) => {
    console.log('🎯 Starting booking submission...', bookingData);
    
    const result = await executeWithTimeout(async (signal) => {
      setSubmitting(true);
      
      try {
        // Get current user session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw new Error(`Session error: ${sessionError.message}`);
        }
        
        if (!session?.access_token) {
          throw new Error('No valid session found. Please log in again.');
        }

        // Call the edge function
        const response = await fetch('/functions/v1/create-booking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            businessId: bookingData.business_id,
            trainerId: bookingData.trainer_id,
            businessType: bookingData.business_type,
            date: bookingData.booking_date,
            time: bookingData.booking_time,
            duration: bookingData.duration_minutes,
            amount: bookingData.total_amount,
            notes: bookingData.notes
          }),
          signal
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: 'Network error' }));
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.error || 'Booking submission failed');
        }

        console.log('✅ Booking submitted successfully:', result.booking);
        return result.booking;
        
      } catch (error) {
        console.error('❌ Booking submission error:', error);
        throw error;
      } finally {
        setSubmitting(false);
      }
    }, 'Submit Booking');

    return result;
  }, [executeWithTimeout]);

  const fetchUserBookings = useCallback(async (userId: string) => {
    console.log('📚 Fetching user bookings...');
    
    const result = await executeWithTimeout(async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          business_profile:business_profiles(
            business_name,
            business_type,
            city,
            state,
            image_urls
          ),
          trainer_profile:trainer_profiles(
            name,
            category,
            profile_image_url
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch bookings: ${error.message}`);
      }

      return data || [];
    }, 'Fetch User Bookings');

    return result || [];
  }, [executeWithTimeout]);

  return {
    submitBooking,
    fetchUserBookings,
    loading: submitting
  };
};
