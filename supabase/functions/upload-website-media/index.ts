
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Require authenticated caller (high-privilege function)
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const authClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: claims, error: authErr } = await authClient.auth.getClaims(
      authHeader.replace("Bearer ", "")
    );
    if (authErr || !claims?.claims?.sub) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { imageUrl, fileName } = await req.json();

    // SSRF guard: validate URL strictly
    if (typeof imageUrl !== "string" || typeof fileName !== "string") {
      return new Response(
        JSON.stringify({ error: "imageUrl and fileName required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    let parsed: URL;
    try {
      parsed = new URL(imageUrl);
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid URL" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (parsed.protocol !== "https:") {
      return new Response(
        JSON.stringify({ error: "Only https:// URLs are allowed" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const host = parsed.hostname.toLowerCase();
    const blocked = [
      "localhost", "127.0.0.1", "0.0.0.0", "169.254.169.254",
      "::1", "metadata.google.internal",
    ];
    const isPrivate =
      blocked.includes(host) ||
      /^10\./.test(host) ||
      /^192\.168\./.test(host) ||
      /^172\.(1[6-9]|2\d|3[01])\./.test(host) ||
      host.endsWith(".internal") ||
      host.endsWith(".local");
    if (isPrivate) {
      return new Response(
        JSON.stringify({ error: "URL host not allowed" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Download from external URL with size cap
    const response = await fetch(parsed.toString(), { redirect: "error" });
    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch image from origin" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.startsWith("image/")) {
      return new Response(
        JSON.stringify({ error: "URL did not return an image" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const imgBuffer = await response.arrayBuffer();
    if (imgBuffer.byteLength > 10 * 1024 * 1024) {
      return new Response(
        JSON.stringify({ error: "Image too large (max 10MB)" }),
        { status: 413, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const ext = fileName.split('.').pop() || "jpeg";
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const targetPath = `site-assets/${fileName}`;
    // Upload to public website-media bucket, upsert in case of overwrite
    const { error } = await supabase.storage
      .from("website-media")
      .upload(targetPath, new Uint8Array(imgBuffer), {
        cacheControl: "31536000",
        upsert: true,
        contentType: `image/${ext}`
      });

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get public URL
    const { data } = supabase.storage
      .from("website-media")
      .getPublicUrl(targetPath);

    return new Response(
      JSON.stringify({ publicUrl: data.publicUrl }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("Upload error:", e);
    return new Response(
      JSON.stringify({ error: "Unexpected error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
