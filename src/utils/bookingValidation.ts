import { supabase } from '@/integrations/supabase/client';

export interface BusinessHours {
  opening_time: string;
  closing_time: string;
}

export interface BookingValidation {
  isValid: boolean;
  errors: string[];
}

export const validateBookingTime = async (
  businessId: string,
  bookingDate: string,
  bookingTime: string,
  duration: number = 60
): Promise<BookingValidation> => {
  const errors: string[] = [];

  try {
    // Get business hours
    const { data: business, error: businessError } = await supabase
      .from('business_profiles')
      .select('opening_time, closing_time, business_name')
      .eq('id', businessId)
      .eq('status', 'approved')
      .maybeSingle();

    if (businessError || !business) {
      errors.push('Business not found or not available');
      return { isValid: false, errors };
    }

    // Check if booking date is in the future
    const bookingDateTime = new Date(`${bookingDate}T${bookingTime}`);
    const now = new Date();
    
    if (bookingDateTime <= now) {
      errors.push('Booking must be scheduled for a future date and time');
    }

    // Check if booking time is within business hours
    const openingTime = new Date(`${bookingDate}T${business.opening_time}`);
    const closingTime = new Date(`${bookingDate}T${business.closing_time}`);
    const endTime = new Date(bookingDateTime.getTime() + duration * 60000);

    if (bookingDateTime < openingTime) {
      errors.push(`Business opens at ${business.opening_time}. Please select a later time.`);
    }

    if (endTime > closingTime) {
      errors.push(`Business closes at ${business.closing_time}. Please select an earlier time or shorter duration.`);
    }

    // Check for existing bookings at the same time
    const { data: existingBookings, error: bookingError } = await supabase
      .from('bookings')
      .select('id, booking_date, booking_time, duration_minutes')
      .eq('business_id', businessId)
      .eq('booking_date', bookingDate)
      .in('status', ['pending', 'confirmed']);

    if (bookingError) {
      console.error('Error checking existing bookings:', bookingError);
      errors.push('Unable to verify booking availability');
    } else if (existingBookings && existingBookings.length > 0) {
      // Check for time conflicts
      const hasConflict = existingBookings.some(existing => {
        const existingStart = new Date(`${existing.booking_date}T${existing.booking_time}`);
        const existingEnd = new Date(existingStart.getTime() + (existing.duration_minutes || 60) * 60000);
        
        return (
          (bookingDateTime >= existingStart && bookingDateTime < existingEnd) ||
          (endTime > existingStart && endTime <= existingEnd) ||
          (bookingDateTime <= existingStart && endTime >= existingEnd)
        );
      });

      if (hasConflict) {
        errors.push('This time slot is already booked. Please select a different time.');
      }
    }

    // Check if booking is too far in advance (optional - 90 days)
    const maxAdvanceDays = 90;
    const maxAdvanceDate = new Date(now.getTime() + maxAdvanceDays * 24 * 60 * 60 * 1000);
    
    if (bookingDateTime > maxAdvanceDate) {
      errors.push(`Bookings can only be made up to ${maxAdvanceDays} days in advance`);
    }

  } catch (error) {
    console.error('Error validating booking:', error);
    errors.push('Unable to validate booking. Please try again.');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateBookingData = (bookingData: {
  businessId?: string;
  date?: string;
  time?: string;
  duration?: number;
  amount?: number;
}): BookingValidation => {
  const errors: string[] = [];

  if (!bookingData.businessId) {
    errors.push('Business selection is required');
  }

  if (!bookingData.date) {
    errors.push('Booking date is required');
  }

  if (!bookingData.time) {
    errors.push('Booking time is required');
  }

  if (bookingData.duration && (bookingData.duration < 15 || bookingData.duration > 480)) {
    errors.push('Duration must be between 15 minutes and 8 hours');
  }

  if (bookingData.amount && bookingData.amount < 0) {
    errors.push('Amount cannot be negative');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};