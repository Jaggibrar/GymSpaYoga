import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ALLOWED_TEMPLATES = new Set([
  "booking-confirmation",
  "booking-request",
  "business-approved",
  "trainer-approved",
]);

interface EmailNotificationRequest {
  // recipientUserId is required and must be an existing user. We never accept
  // arbitrary `to` addresses from the client to prevent email injection / spam.
  recipientUserId: string;
  subject: string;
  template: string;
  data?: Record<string, unknown>;
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
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
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

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  try {
    const body = await req.json() as EmailNotificationRequest;

    // Validate inputs
    if (!body?.recipientUserId || typeof body.recipientUserId !== "string") {
      return new Response(JSON.stringify({ error: "recipientUserId is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!body.subject || typeof body.subject !== "string" || body.subject.length > 200) {
      return new Response(JSON.stringify({ error: "Invalid subject" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!ALLOWED_TEMPLATES.has(body.template)) {
      return new Response(JSON.stringify({ error: "Invalid template" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Look up recipient email server-side; never trust client-supplied emails
    const { data: recipientAuth, error: recipientError } = await supabase.auth.admin.getUserById(body.recipientUserId);
    if (recipientError || !recipientAuth?.user?.email) {
      return new Response(JSON.stringify({ error: "Recipient not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const to = recipientAuth.user.email;

    // Insert notification record. We store the template KEY only — actual
    // HTML is rendered server-side from a fixed template, never from caller input.
    const { error: dbError } = await supabase
      .from("notifications")
      .insert({
        recipient_email: to,
        subject: body.subject,
        template: body.template,
        data: body.data ?? {},
        status: "sent",
        sent_at: new Date().toISOString(),
      });

    if (dbError) console.error("Database error:", dbError);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in send-email-notification:", error instanceof Error ? error.stack : error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
