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

  // Authenticate caller
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const userClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    { global: { headers: { Authorization: authHeader } } }
  );

  const token = authHeader.replace("Bearer ", "");
  const { data: claimsData, error: claimsError } = await userClient.auth.getClaims(token);
  if (claimsError || !claimsData?.claims) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  const userId = claimsData.claims.sub as string;

  // Service role client for privileged updates
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    const { bookingId, action, notes } = await req.json();

    if (!bookingId || !action) {
      return new Response(JSON.stringify({ error: "Booking ID and action are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const allowedActions = ["confirmed", "rejected", "cancelled"];
    if (!allowedActions.includes(action)) {
      return new Response(JSON.stringify({ error: "Invalid action" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get booking and verify caller authorization
    const { data: booking, error: bookingError } = await supabaseClient
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .single();

    if (bookingError || !booking) {
      return new Response(JSON.stringify({ error: "Booking not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Authorization: caller must be the business owner OR (for cancellation) the booking customer
    let authorized = false;
    if (booking.business_id) {
      const { data: bp } = await supabaseClient
        .from("business_profiles")
        .select("user_id")
        .eq("id", booking.business_id)
        .single();
      if (bp?.user_id === userId) authorized = true;
    }
    if (booking.trainer_id && !authorized) {
      const { data: tp } = await supabaseClient
        .from("trainer_profiles")
        .select("user_id")
        .eq("id", booking.trainer_id)
        .single();
      if (tp?.user_id === userId) authorized = true;
    }
    // Allow customer to cancel their own booking
    if (!authorized && action === "cancelled" && booking.user_id === userId) {
      authorized = true;
    }

    if (!authorized) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Update booking status using the database function
    const { error: updateError } = await supabaseClient.rpc("update_booking_status", {
      booking_id_param: bookingId,
      new_status_param: action,
      notes_param: notes,
    });

    if (updateError) throw updateError;

    const emailSubject = action === "confirmed"
      ? `✅ Booking Confirmed`
      : action === "rejected"
        ? `❌ Booking Rejected`
        : `📧 Booking Update`;

    const emailMessage = action === "confirmed"
      ? `Your booking for ${booking.booking_date} at ${booking.booking_time} has been confirmed!`
      : action === "rejected"
        ? `Unfortunately, your booking for ${booking.booking_date} at ${booking.booking_time} has been rejected.${notes ? ` Reason: ${notes}` : ""}`
        : `Your booking status has been updated to: ${action}`;

    await supabaseClient
      .from("in_app_notifications")
      .insert([{
        user_id: booking.user_id,
        title: emailSubject,
        message: emailMessage,
        type: "booking_status",
        booking_id: bookingId,
      }]);

    return new Response(JSON.stringify({
      success: true,
      message: `Booking ${action} successfully`,
      bookingId,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in send-booking-confirmation:", error instanceof Error ? error.stack : error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
