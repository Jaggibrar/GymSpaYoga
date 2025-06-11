
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailNotificationRequest {
  to: string;
  subject: string;
  template: 'booking-confirmation' | 'booking-request' | 'business-approved' | 'trainer-approved';
  data: any;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, template, data }: EmailNotificationRequest = await req.json();

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Store notification in database
    const { error: dbError } = await supabase
      .from('notifications')
      .insert({
        recipient_email: to,
        subject,
        template,
        data,
        status: 'sent'
      });

    if (dbError) {
      console.error('Database error:', dbError);
    }

    // Generate email content based on template
    let emailContent = '';
    
    switch (template) {
      case 'booking-confirmation':
        emailContent = `
          <h2>Booking Confirmed!</h2>
          <p>Dear ${data.customerName},</p>
          <p>Your booking has been confirmed with the following details:</p>
          <ul>
            <li><strong>Business:</strong> ${data.businessName}</li>
            <li><strong>Date:</strong> ${data.bookingDate}</li>
            <li><strong>Time:</strong> ${data.bookingTime}</li>
            <li><strong>Amount:</strong> ₹${data.amount}</li>
          </ul>
          <p>Thank you for choosing our platform!</p>
        `;
        break;
        
      case 'booking-request':
        emailContent = `
          <h2>New Booking Request</h2>
          <p>You have received a new booking request:</p>
          <ul>
            <li><strong>Customer:</strong> ${data.customerName}</li>
            <li><strong>Date:</strong> ${data.bookingDate}</li>
            <li><strong>Time:</strong> ${data.bookingTime}</li>
            <li><strong>Amount:</strong> ₹${data.amount}</li>
          </ul>
          <p>Please log into your dashboard to respond to this request.</p>
        `;
        break;
        
      case 'business-approved':
        emailContent = `
          <h2>Business Application Approved!</h2>
          <p>Congratulations! Your business "${data.businessName}" has been approved.</p>
          <p>You can now start receiving bookings through our platform.</p>
        `;
        break;
        
      case 'trainer-approved':
        emailContent = `
          <h2>Trainer Application Approved!</h2>
          <p>Congratulations! Your trainer profile has been approved.</p>
          <p>You can now start receiving training requests through our platform.</p>
        `;
        break;
        
      default:
        emailContent = `<p>${data.message || 'Thank you for using our platform!'}</p>`;
    }

    // In a real implementation, you would send the email using a service like Resend
    // For now, we'll just log it and mark as sent
    console.log(`Email notification sent to ${to}:`);
    console.log(`Subject: ${subject}`);
    console.log(`Content: ${emailContent}`);

    // Update notification status
    await supabase
      .from('notifications')
      .update({ 
        status: 'sent',
        sent_at: new Date().toISOString()
      })
      .eq('recipient_email', to)
      .eq('subject', subject);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email notification processed successfully' 
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error) {
    console.error('Error in send-email-notification function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error' 
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
});
