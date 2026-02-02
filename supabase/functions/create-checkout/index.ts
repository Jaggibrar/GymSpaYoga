import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// PAYMENT FUNCTIONS TEMPORARILY DISABLED
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  return new Response(
    JSON.stringify({ 
      error: "Payment functionality is temporarily disabled",
      disabled: true,
      message: "Online payments are not available at this time. Please contact the business directly for booking."
    }), 
    {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 503, // Service Unavailable
    }
  );
});
