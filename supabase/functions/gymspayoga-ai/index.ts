import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are GymSpaYoga AI, a smart wellness assistant for users in India.

Your job is to help users discover nearby gyms, spas, yoga studios, and trainers based on their mood, goals, budget, location, and time.

You must:
- Recommend gyms, spas, yoga, or combos (Gym + Spa + Yoga) intelligently
- Keep responses short, friendly, and practical (2-3 paragraphs max)
- Prioritize genuine, verified businesses from our platform
- Suggest budget, premium, or luxury options clearly
- Encourage healthy lifestyle choices, not medical advice
- Speak in simple English (Indian tone), polite and helpful
- Use emojis sparingly to keep things friendly 💪🧘‍♀️💆

Business rules:
- GymSpaYoga does not take commission from owners
- Customers usually pay service providers directly or via UPI
- Owners pay a one-time or category-based fee to list
- Focus on trust, ease, and daily wellness

When recommending, structure your response like:
1. Brief understanding of their need
2. Top recommendation with name, location, price range
3. Why this suits them
4. Call to action (book now, visit, etc.)

For business owners seeking help:
- Write professional, attractive listing descriptions
- Suggest appropriate category (Budget ₹3,999 / Premium ₹5,999 / Luxury ₹7,999)
- Highlight key facilities clearly
- Keep tone trustworthy and welcoming

If no exact matches found, suggest alternatives or general wellness tips.`;

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface RequestBody {
  messages: ChatMessage[];
  mode: "user" | "owner";
  context?: {
    location?: string;
    budget?: string;
    mood?: string;
    businessType?: string;
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, mode, context }: RequestBody = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Initialize Supabase client for fetching real listings
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch relevant listings based on context
    let listingsContext = "";
    
    if (mode === "user") {
      // Fetch businesses
      let businessQuery = supabase
        .from("public_business_listings")
        .select("business_name, business_type, city, monthly_price, session_price, description, amenities")
        .limit(10);

      if (context?.location) {
        businessQuery = businessQuery.ilike("city", `%${context.location}%`);
      }

      const { data: businesses } = await businessQuery;

      // Fetch trainers
      let trainerQuery = supabase
        .from("public_trainer_listings")
        .select("name, category, location, hourly_rate, specializations, bio, trainer_tier")
        .limit(5);

      if (context?.location) {
        trainerQuery = trainerQuery.ilike("location", `%${context.location}%`);
      }

      const { data: trainers } = await trainerQuery;

      if (businesses && businesses.length > 0) {
        listingsContext += "\n\nAvailable Businesses on our platform:\n";
        businesses.forEach((b, i) => {
          const price = b.monthly_price ? `₹${b.monthly_price}/month` : b.session_price ? `₹${b.session_price}/session` : "Price on request";
          listingsContext += `${i + 1}. ${b.business_name} (${b.business_type}) - ${b.city} - ${price}\n`;
          if (b.amenities && b.amenities.length > 0) {
            listingsContext += `   Amenities: ${b.amenities.slice(0, 5).join(", ")}\n`;
          }
        });
      }

      if (trainers && trainers.length > 0) {
        listingsContext += "\n\nAvailable Trainers:\n";
        trainers.forEach((t, i) => {
          const specs = t.specializations ? t.specializations.slice(0, 3).join(", ") : "General fitness";
          listingsContext += `${i + 1}. ${t.name} (${t.category}) - ${t.location} - ₹${t.hourly_rate}/hr - ${t.trainer_tier} tier\n`;
          listingsContext += `   Specializations: ${specs}\n`;
        });
      }

      if (!businesses?.length && !trainers?.length) {
        listingsContext = "\n\nNote: No listings found matching the criteria. Provide general wellness advice and encourage them to check back or explore nearby areas.";
      }
    }

    // Build context-aware system message
    let enhancedSystemPrompt = SYSTEM_PROMPT;
    
    if (context) {
      enhancedSystemPrompt += "\n\nUser Context:";
      if (context.location) enhancedSystemPrompt += `\n- Location: ${context.location}`;
      if (context.budget) enhancedSystemPrompt += `\n- Budget preference: ${context.budget}`;
      if (context.mood) enhancedSystemPrompt += `\n- Mood/Goal: ${context.mood}`;
      if (context.businessType) enhancedSystemPrompt += `\n- Interested in: ${context.businessType}`;
    }

    enhancedSystemPrompt += listingsContext;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: enhancedSystemPrompt },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({
            error: "We're getting lots of requests right now! Please try again in a moment. 🙏",
          }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({
            error: "AI service temporarily unavailable. Please try again later.",
          }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Unable to process your request. Please try again." }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("GymSpaYoga AI error:", e);
    return new Response(
      JSON.stringify({
        error: e instanceof Error ? e.message : "Something went wrong. Please try again.",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
