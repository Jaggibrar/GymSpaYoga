
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
    if (!authHeader) throw new Error("No authorization header provided");
    
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    
    const user = userData.user;
    if (!user) throw new Error("User not authenticated");

    const bookingData = await req.json();

    // Create booking
    const { data: booking, error: bookingError } = await supabaseClient
      .from('bookings')
      .insert([{
        user_id: user.id,
        business_id: bookingData.businessId,
        trainer_id: bookingData.trainerId,
        business_type: bookingData.businessType,
        booking_date: bookingData.date,
        booking_time: bookingData.time,
        duration_minutes: parseInt(bookingData.duration),
        total_amount: bookingData.amount,
        notes: bookingData.notes,
        status: 'pending',
        payment_status: 'pending'
      }])
      .select()
      .single();

    if (bookingError) {
      throw bookingError;
    }

    // Send notification to business owner (placeholder)
    console.log('New booking created:', booking);

    return new Response(JSON.stringify({ 
      success: true, 
      booking,
      message: "Booking created successfully" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Error in create-booking:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
