
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface EmailData {
  to: string;
  subject: string;
  template: 'booking-confirmation' | 'booking-request' | 'business-approved' | 'trainer-approved';
  data: any;
}

export const useEmailNotification = () => {
  const sendNotification = async (emailData: EmailData) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-email-notification', {
        body: emailData
      });

      if (error) {
        throw error;
      }

      console.log('Email notification sent:', data);
      return true;
    } catch (error) {
      console.error('Error sending email notification:', error);
      toast.error('Failed to send notification');
      return false;
    }
  };

  return { sendNotification };
};
