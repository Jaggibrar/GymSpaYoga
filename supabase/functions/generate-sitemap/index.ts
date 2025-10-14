import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch all approved businesses
    const { data: businesses } = await supabaseClient
      .from('business_profiles')
      .select('id, business_name, business_type, city, state, updated_at')
      .eq('status', 'approved')
      .order('updated_at', { ascending: false });

    // Fetch all approved trainers
    const { data: trainers } = await supabaseClient
      .from('trainer_profiles')
      .select('id, name, category, location, updated_at')
      .eq('status', 'approved')
      .order('updated_at', { ascending: false });

    // Fetch published blogs
    const { data: blogs } = await supabaseClient
      .from('blogs')
      .select('slug, title, updated_at')
      .eq('published', true)
      .order('updated_at', { ascending: false });

    // Generate XML sitemap
    const baseUrl = 'https://gymspayoga.com';
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add business listings
    businesses?.forEach(business => {
      const businessType = business.business_type.toLowerCase();
      sitemap += `
  <url>
    <loc>${baseUrl}/business/${business.id}</loc>
    <lastmod>${new Date(business.updated_at || business.created_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/${businessType}s/${business.id}</loc>
    <lastmod>${new Date(business.updated_at || business.created_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    // Add trainer listings
    trainers?.forEach(trainer => {
      sitemap += `
  <url>
    <loc>${baseUrl}/trainers/${trainer.id}</loc>
    <lastmod>${new Date(trainer.updated_at || trainer.created_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    // Add blog posts
    blogs?.forEach(blog => {
      sitemap += `
  <url>
    <loc>${baseUrl}/blog/${blog.slug}</loc>
    <lastmod>${new Date(blog.updated_at).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    sitemap += '\n</urlset>';

    return new Response(sitemap, {
      headers: { 
        ...corsHeaders,
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=7200'
      }
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});
