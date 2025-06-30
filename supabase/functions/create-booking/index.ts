
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
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header provided");
    }
    
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError) {
      console.error("Authentication error:", userError);
      throw new Error(`Authentication error: ${userError.message}`);
    }
    
    const user = userData.user;
    if (!user) {
      throw new Error("User not authenticated");
    }

    const bookingData = await req.json();

    // Validate required fields
    if (!bookingData.businessId || !bookingData.date || !bookingData.time) {
      throw new Error("Missing required booking data: businessId, date, and time are required");
    }

    // Validate business exists
    const { data: business, error: businessError } = await supabaseClient
      .from('business_profiles')
      .select('id, business_name, user_id')
      .eq('id', bookingData.businessId)
      .eq('status', 'approved')
      .single();

    if (businessError || !business) {
      throw new Error("Business not found or not approved");
    }

    // Create booking with proper error handling
    const { data: booking, error: bookingError } = await supabaseClient
      .from('bookings')
      .insert([{
        user_id: user.id,
        business_id: bookingData.businessId,
        trainer_id: bookingData.trainerId || null,
        business_type: bookingData.businessType || 'gym',
        booking_date: bookingData.date,
        booking_time: bookingData.time,
        duration_minutes: parseInt(bookingData.duration) || 60,
        total_amount: bookingData.amount || 0,
        notes: bookingData.notes || null,
        status: 'pending',
        payment_status: 'pending'
      }])
      .select()
      .single();

    if (bookingError) {
      console.error("Booking creation error:", bookingError);
      throw new Error(`Failed to create booking: ${bookingError.message}`);
    }

    // Send notification to business owner
    try {
      const { error: notificationError } = await supabaseClient
        .from('in_app_notifications')
        .insert([{
          user_id: business.user_id,
          title: 'New Booking Request',
          message: `You received a new booking request for ${business.business_name} on ${bookingData.date}`,
          type: 'new_booking',
          booking_id: booking.id
        }]);

      if (notificationError) {
        console.error('Notification creation error:', notificationError);
        // Don't fail the booking if notification fails
      }
    } catch (notifErr) {
      console.error('Notification error:', notifErr);
      // Continue without failing
    }

    console.log('Booking created successfully:', booking.id);

    return new Response(JSON.stringify({ 
      success: true, 
      booking,
      message: "Booking created successfully" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Error in create-booking function:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return new Response(JSON.stringify({ 
      success: false,
      error: errorMessage,
      details: error instanceof Error ? error.stack : undefined
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
