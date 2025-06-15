
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingNotificationRequest {
  bookingId: number;
  type: 'new_booking' | 'booking_confirmed' | 'booking_rejected';
  userEmail?: string;
  businessOwnerEmail?: string;
  businessName: string;
  customerName: string;
  bookingDate: string;
  bookingTime: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    const data: BookingNotificationRequest = await req.json();
    
    let emailTemplate = "";
    let subject = "";
    let recipientEmail = "";

    switch (data.type) {
      case 'new_booking':
        recipientEmail = data.businessOwnerEmail || "";
        subject = `New Booking Request - ${data.businessName}`;
        emailTemplate = `
          <h2>New Booking Request</h2>
          <p>You have received a new booking request for your business: <strong>${data.businessName}</strong></p>
          <p><strong>Customer:</strong> ${data.customerName}</p>
          <p><strong>Date:</strong> ${data.bookingDate}</p>
          <p><strong>Time:</strong> ${data.bookingTime}</p>
          <p>Please log in to your dashboard to confirm or reject this booking.</p>
        `;
        break;
        
      case 'booking_confirmed':
        recipientEmail = data.userEmail || "";
        subject = `Booking Confirmed - ${data.businessName}`;
        emailTemplate = `
          <h2>Your Booking is Confirmed!</h2>
          <p>Great news! Your booking with <strong>${data.businessName}</strong> has been confirmed.</p>
          <p><strong>Date:</strong> ${data.bookingDate}</p>
          <p><strong>Time:</strong> ${data.bookingTime}</p>
          <p>We look forward to seeing you!</p>
        `;
        break;
        
      case 'booking_rejected':
        recipientEmail = data.userEmail || "";
        subject = `Booking Update - ${data.businessName}`;
        emailTemplate = `
          <h2>Booking Status Update</h2>
          <p>We're sorry to inform you that your booking with <strong>${data.businessName}</strong> could not be confirmed.</p>
          <p><strong>Date:</strong> ${data.bookingDate}</p>
          <p><strong>Time:</strong> ${data.bookingTime}</p>
          <p>Please try booking a different time slot or contact the business directly.</p>
        `;
        break;
    }

    // Store notification in database for future email sending
    // In a real implementation, you would integrate with an email service like Resend
    const { error: notificationError } = await supabaseClient
      .from('notifications')
      .insert({
        recipient_email: recipientEmail,
        subject: subject,
        template: emailTemplate,
        data: data,
        status: 'pending'
      });

    if (notificationError) {
      console.error('Error storing notification:', notificationError);
    }

    console.log(`${data.type} notification prepared for: ${recipientEmail}`);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Notification processed successfully" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Error in send-booking-notification:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
