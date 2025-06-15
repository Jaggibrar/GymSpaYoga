
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
    const { imageUrl, fileName } = await req.json();

    // Download from external URL
    const response = await fetch(imageUrl);
    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch image from origin" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const imgBuffer = await response.arrayBuffer();
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
