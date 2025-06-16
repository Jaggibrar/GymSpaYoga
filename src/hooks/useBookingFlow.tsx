
import { useState } from 'react';
import { useBookingConfirmation } from '@/hooks/useBookingConfirmation';
import { toast } from 'sonner';

export interface BookingFlowData {
  user_id: string;
  business_id: string;
  business_type: string;
  trainer_id?: string | null;
  booking_date: string;
  booking_time: string;
  duration_minutes?: number;
  total_amount?: number;
  notes?: string;
}

export const useBookingFlow = () => {
  const [currentStep, setCurrentStep] = useState<'booking' | 'payment' | 'confirmation'>('booking');
  const [bookingData, setBookingData] = useState<BookingFlowData | null>(null);
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { createBooking } = useBookingConfirmation();

  const submitBooking = async (data: BookingFlowData) => {
    setLoading(true);
    setBookingData(data);
    
    try {
      const booking = await createBooking(data);
      
      if (booking) {
        setBookingId(booking.id);
        setCurrentStep('payment');
        toast.success('Booking created! Please complete the platform fee payment.');
      } else {
        toast.error('Failed to create booking. Please try again.');
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const completePayment = () => {
    setCurrentStep('confirmation');
    toast.success('Payment successful! Your booking is confirmed.');
  };

  const resetFlow = () => {
    setCurrentStep('booking');
    setBookingData(null);
    setBookingId(null);
  };

  return {
    currentStep,
    bookingData,
    bookingId,
    loading,
    submitBooking,
    completePayment,
    resetFlow,
    setCurrentStep
  };
};
