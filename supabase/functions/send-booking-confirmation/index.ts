
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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
    const { bookingId, action, notes } = await req.json();

    if (!bookingId || !action) {
      throw new Error("Booking ID and action are required");
    }

    // Get booking details
    const { data: booking, error: bookingError } = await supabaseClient
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .single();

    if (bookingError || !booking) {
      throw new Error("Booking not found");
    }

    // Update booking status using the database function
    const { error: updateError } = await supabaseClient.rpc('update_booking_status', {
      booking_id_param: bookingId,
      new_status_param: action,
      notes_param: notes
    });

    if (updateError) {
      throw updateError;
    }

    // Here you would integrate with email service (like Resend)
    // For now, we'll just log the action
    console.log(`Booking ${bookingId} ${action}`, { booking, notes });

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Booking ${action} successfully`,
      bookingId 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Error in send-booking-confirmation:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
