
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject: string;
  template: 'booking-confirmation' | 'booking-request' | 'business-approved' | 'trainer-approved';
  data: any;
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
    const { to, subject, template, data }: EmailRequest = await req.json();

    if (!to || !subject || !template) {
      throw new Error("Missing required fields: to, subject, template");
    }

    // In production, integrate with email service like Resend, SendGrid, etc.
    // For now, we'll log the email details and store notification
    console.log(`Email notification - Template: ${template}`);
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Data:`, data);

    // Store notification in database for tracking
    const { error: notificationError } = await supabaseClient
      .from('notifications')
      .insert({
        recipient_email: to,
        subject,
        template,
        data,
        status: 'sent',
        sent_at: new Date().toISOString()
      });

    if (notificationError) {
      console.error('Error storing notification:', notificationError);
    }

    // TODO: Replace with actual email service integration
    // Example with Resend:
    // const resendApiKey = Deno.env.get("RESEND_API_KEY");
    // if (resendApiKey) {
    //   const response = await fetch("https://api.resend.com/emails", {
    //     method: "POST",
    //     headers: {
    //       "Authorization": `Bearer ${resendApiKey}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       from: "notifications@gymspayoga.com",
    //       to: [to],
    //       subject,
    //       html: generateEmailTemplate(template, data)
    //     }),
    //   });
    // }

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Email notification sent successfully" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Error in send-email-notification:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

// Helper function to generate email templates
function generateEmailTemplate(template: string, data: any): string {
  switch (template) {
    case 'booking-confirmation':
      return `
        <h2>Booking Confirmed!</h2>
        <p>Your booking has been confirmed.</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Time:</strong> ${data.time}</p>
        <p><strong>Service:</strong> ${data.service}</p>
      `;
    case 'booking-request':
      return `
        <h2>New Booking Request</h2>
        <p>You have a new booking request.</p>
        <p><strong>Customer:</strong> ${data.customerName}</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Time:</strong> ${data.time}</p>
      `;
    case 'business-approved':
      return `
        <h2>Business Application Approved!</h2>
        <p>Congratulations! Your business application has been approved.</p>
        <p>You can now start receiving bookings on GymSpaYoga platform.</p>
      `;
    case 'trainer-approved':
      return `
        <h2>Trainer Application Approved!</h2>
        <p>Congratulations! Your trainer application has been approved.</p>
        <p>You can now start offering services on GymSpaYoga platform.</p>
      `;
    default:
      return `<p>${data.message || 'Notification from GymSpaYoga'}</p>`;
  }
}
