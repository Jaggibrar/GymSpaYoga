
import { supabase } from '@/integrations/supabase/client';

interface EmailNotificationData {
  recipient_email: string;
  subject: string;
  template: string;
  data: Record<string, any>;
}

export const sendEmailNotification = async (notificationData: EmailNotificationData) => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .insert([{
        ...notificationData,
        status: 'pending'
      }]);

    if (error) {
      console.error('Failed to queue email notification:', error);
      throw error;
    }

    console.log('Email notification queued successfully:', data);
    return data;
  } catch (error) {
    console.error('Email notification error:', error);
    throw error;
  }
};

export const sendBookingConfirmationEmail = async (
  userEmail: string,
  businessName: string,
  bookingDate: string,
  bookingTime: string
) => {
  return sendEmailNotification({
    recipient_email: userEmail,
    subject: `Booking Confirmation - ${businessName}`,
    template: 'booking_confirmation',
    data: {
      businessName,
      bookingDate,
      bookingTime,
      confirmationCode: `GYM${Date.now()}`
    }
  });
};

export const sendBookingStatusUpdateEmail = async (
  userEmail: string,
  businessName: string,
  newStatus: string,
  bookingDate: string
) => {
  return sendEmailNotification({
    recipient_email: userEmail,
    subject: `Booking ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)} - ${businessName}`,
    template: 'booking_status_update',
    data: {
      businessName,
      status: newStatus,
      bookingDate
    }
  });
};

export const sendNewBookingNotificationEmail = async (
  businessOwnerEmail: string,
  businessName: string,
  customerName: string,
  bookingDate: string,
  bookingTime: string
) => {
  return sendEmailNotification({
    recipient_email: businessOwnerEmail,
    subject: `New Booking Request - ${businessName}`,
    template: 'new_booking_notification',
    data: {
      businessName,
      customerName,
      bookingDate,
      bookingTime
    }
  });
};
