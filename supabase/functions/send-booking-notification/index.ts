import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingNotificationRequest {
  bookingId: number;
  type: "new_booking" | "booking_confirmed" | "booking_rejected";
}

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

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    const data: BookingNotificationRequest = await req.json();
    if (!data?.bookingId || !data?.type) {
      return new Response(JSON.stringify({ error: "Invalid request" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const allowedTypes = ["new_booking", "booking_confirmed", "booking_rejected"];
    if (!allowedTypes.includes(data.type)) {
      return new Response(JSON.stringify({ error: "Invalid type" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Resolve booking and authorize caller server-side; never trust client-supplied emails
    const { data: booking, error: bookingError } = await supabaseClient
      .from("bookings")
      .select("id, user_id, business_id, trainer_id, booking_date, booking_time")
      .eq("id", data.bookingId)
      .single();

    if (bookingError || !booking) {
      return new Response(JSON.stringify({ error: "Booking not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Determine recipient based on type and verify caller authorization
    let recipientUserId: string | null = null;
    let businessName = "your booking";

    if (booking.business_id) {
      const { data: bp } = await supabaseClient
        .from("business_profiles")
        .select("user_id, business_name")
        .eq("id", booking.business_id)
        .single();
      if (bp) businessName = bp.business_name ?? businessName;

      if (data.type === "new_booking") {
        // Customer notifies business owner
        if (booking.user_id !== userId) {
          return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
        recipientUserId = bp?.user_id ?? null;
      } else {
        // Owner notifies customer
        if (bp?.user_id !== userId) {
          return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
        recipientUserId = booking.user_id;
      }
    }

    if (!recipientUserId) {
      return new Response(JSON.stringify({ error: "Recipient could not be determined" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Look up recipient email server-side from auth.users
    const { data: recipientAuth } = await supabaseClient.auth.admin.getUserById(recipientUserId);
    const recipientEmail = recipientAuth?.user?.email ?? "";

    if (!recipientEmail) {
      return new Response(JSON.stringify({ error: "Recipient email not found" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let subject = "";
    let templateKey = "";
    switch (data.type) {
      case "new_booking":
        subject = `New Booking Request - ${businessName}`;
        templateKey = "new_booking";
        break;
      case "booking_confirmed":
        subject = `Booking Confirmed - ${businessName}`;
        templateKey = "booking_confirmed";
        break;
      case "booking_rejected":
        subject = `Booking Update - ${businessName}`;
        templateKey = "booking_rejected";
        break;
    }

    // Store a notification record. Templates are referenced by key (server-rendered later)
    // and any caller-supplied HTML is intentionally NOT used to prevent injection.
    const { error: notificationError } = await supabaseClient
      .from("notifications")
      .insert({
        recipient_email: recipientEmail,
        subject,
        template: templateKey,
        data: {
          booking_id: booking.id,
          booking_date: booking.booking_date,
          booking_time: booking.booking_time,
          business_name: businessName,
        },
        status: "pending",
      });

    if (notificationError) console.error("Error storing notification:", notificationError);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in send-booking-notification:", error instanceof Error ? error.stack : error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
