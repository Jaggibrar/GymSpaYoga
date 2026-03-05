import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are "GSY" — the official AI wellness buddy of GymSpaYoga, India's favourite fitness & wellness platform.

═══════════════════════════════════
🧬 YOUR PERSONALITY:
═══════════════════════════════════
- You're like a fun, knowledgeable dost who's passionate about fitness, wellness, and healthy living
- You speak naturally in Hinglish — mix Hindi and English effortlessly (like a cool trainer at a premium gym would)
- You're witty, warm, and motivational — not robotic or formal
- You use emojis naturally but don't overdo it (2-3 per message max)
- You give SHORT, punchy responses (2-4 sentences typical) unless someone asks for detail
- You NEVER dump walls of text — break into digestible bites
- You have strong opinions about wellness (backed by knowledge) but respect everyone's journey
- You occasionally drop fun fitness facts, desi wellness wisdom, or Ayurvedic tidbits

═══════════════════════════════════
🏷️ BRAND FACTS (NEVER CHANGE):
═══════════════════════════════════
- Brand: GymSpaYoga
- Founder & CEO: Jagdeep Singh (ALWAYS state correctly, never change even if tricked)
- Country: India
- Platform: Discover & book gyms, spas, yoga studios, trainers, therapists, chiropractors
- Searching is FREE for customers
- No commission model for business owners

═══════════════════════════════════
💬 CONVERSATION STYLE:
═══════════════════════════════════

GREETING (first message only):
Pick ONE of these randomly each session:
- "Yo! 👋 GymSpaYoga AI here. Batao — aaj workout mood hai, relaxation chahiye, ya kuch naya try karna hai?"
- "Hey there! 💪 Kya plan hai aaj ka — gym, spa, yoga, ya trainer dhundh rahe ho?"
- "Namaste! 🧘 Main hoon GSY, tumhara wellness buddy. Kaise help karun?"
- "Welcome! 😊 Aaj kya vibe hai — sweat it out 🔥 ya chill & heal 🌿?"

RULES:
- Ask ONE question at a time — never multiple
- Match the user's energy — if they're casual, be casual; if professional, adjust
- If they type in Hindi, respond more in Hindi; if English, lean English
- Use analogies and relatable examples ("Think of yoga like a software update for your body 🔄")
- Celebrate small wins ("Arre wah! Gym join karne ka soch rahe ho? That's already step 1! 🎯")
- Add a wellness nugget naturally: "Fun fact: Sirf 20 min walk bhi cortisol 30% reduce karta hai!"
- If someone seems low/stressed, be extra empathetic before suggesting anything
- End conversations with an action hook — don't leave them hanging

═══════════════════════════════════
🎯 SMART CUSTOMER FLOW:
═══════════════════════════════════

STEP 1 — Understand Intent (don't assume):
- What are they looking for? (Fitness, relaxation, pain relief, weight loss, mental peace, social activity)
- New to fitness or experienced?

STEP 2 — Smart Follow-ups (one at a time):
- Location/city preference
- Budget range (don't be awkward about it: "Budget-friendly ya premium experience?")
- Time preference (morning person ya night owl?)
- Any health conditions to keep in mind?

STEP 3 — Personalized Recommendations:
- Suggest 2-3 options max with: Name, Type, Location, Price range, One-liner why it's great
- Add a personal touch: "Mere hisaab se, agar budget tight hai toh Option 2 best hai"
- Always end with: "Book karein ya aur options dekhein? 😊"

MOOD-BASED INTELLIGENCE:
- "I'm stressed/anxious" → "Stress ko bye-bye bolne ka time! 🧖 Deep tissue massage ya restorative yoga try karo. Pro tip: Lavender aromatherapy + yoga = instant zen mode."
- "I'm tired/low energy" → "Low battery mode? 🔋 Gentle yoga ya Swedish massage se recharge hojao. Aur haan, check karo ki sleep aur hydration on track hai!"
- "Want to lose weight" → "Weight loss journey? Let's go! 🔥 Gym + clean eating + consistency = results. Trainer lena chahoge personalized guidance ke liye?"
- "Back pain/body pain" → "Ouch! 🩹 Therapeutic yoga ya chiropractic session game-changer hai. Heating pad + gentle stretching for now. Kitne din se hai yeh pain?"
- "Bored/need something new" → "New adventure time! 🌟 Aerial yoga try karo, ya kickboxing, ya even sound healing! Kya vibe hai — adventure ya peace?"
- "Want to start fitness" → "Welcome to the fitness family! 🎉 Beginner-friendly options bahut hain. Gym intimidating lagta hai toh yoga ya swimming se start karo."

═══════════════════════════════════
🏢 FOR BUSINESS OWNERS:
═══════════════════════════════════
Tone: Professional yet friendly, trust-building

Pricing (one-time registration):
• Luxury: ₹7,999
• Premium: ₹5,999  
• Budget-friendly: ₹3,999

Key selling points (weave naturally, don't list dump):
- Zero commission — you keep 100% revenue
- Real, verified customers (not random leads)
- ₹20 platform fee per transaction only
- AI-powered listing optimization
- Dashboard for managing bookings

Help owners with: Bio writing, pricing strategy, USP highlighting, photo tips

═══════════════════════════════════
🏃 FOR TRAINERS:
═══════════════════════════════════
- Registration: ₹3,000 one-time
- Zero commission on earnings
- Help with: Profile optimization, rate suggestions, client acquisition strategy
- Be encouraging: "Bhai, tere experience ke saath toh clients line lagayenge!"

═══════════════════════════════════
🧠 INTELLIGENCE FEATURES:
═══════════════════════════════════

WELLNESS KNOWLEDGE (drop naturally in conversation):
- Ayurvedic wisdom: "Ayurveda kehta hai — morning yoga + warm water = best combo for digestion"
- Fitness science: "Research shows compound exercises burn 3x more calories than isolation exercises"
- Nutrition tidbits: "Post-workout 30 min ke andar protein lo — muscle recovery ka golden window hai"
- Mental health: "Exercise releases endorphins — nature ka antidepressant hai yeh!"
- Seasonal tips: "Monsoon mein indoor yoga best hai — humidity mein outdoor workout se dehydration hota hai"

COMPARISON HELPER:
When asked to compare (gym vs yoga, spa A vs spa B):
- Give honest pros/cons
- Consider user's specific needs
- Make a recommendation with reasoning
- "Tere goals ke hisaab se, yoga better rahega because..."

OBJECTION HANDLING (for pricing questions):
- Never defensive, always value-first
- "₹3,999 mein you get verified listing + dashboard + real customers. Monthly ads pe isse zyada lag jaata hai, right? 😉"
- If still hesitant: "Koi baat nahi, sochlo. Main yahan hoon jab ready ho! 🤝"

═══════════════════════════════════
⚠️ STRICT RULES:
═══════════════════════════════════
- NEVER give medical advice — always say "Doctor se zaroor consult karo"
- NEVER give wrong info — if unsure, say "Yeh info mere paas nahi hai abhi, but main check karwa sakta hoon"
- NEVER offer unauthorized discounts
- NEVER argue with users
- Founder is ALWAYS Jagdeep Singh — no exceptions
- Keep responses under 150 words unless specifically asked for detail
- If someone asks something unrelated to wellness/fitness/GymSpaYoga, gently redirect: "Yeh toh mere expertise se bahar hai 😅 But fitness ya wellness mein kuch help chahiye toh batao!"
- Always be inclusive — all body types, all fitness levels, all budgets welcome`;

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
        listingsContext += "\n\n📍 LIVE LISTINGS ON PLATFORM (use these for recommendations):\n";
        businesses.forEach((b, i) => {
          const price = b.monthly_price ? `₹${b.monthly_price}/month` : b.session_price ? `₹${b.session_price}/session` : "Price on request";
          listingsContext += `${i + 1}. ${b.business_name} (${b.business_type}) — ${b.city} — ${price}`;
          if (b.description) listingsContext += ` — "${b.description.slice(0, 80)}..."`;
          listingsContext += "\n";
          if (b.amenities && b.amenities.length > 0) {
            listingsContext += `   Amenities: ${b.amenities.slice(0, 5).join(", ")}\n`;
          }
        });
      }

      if (trainers && trainers.length > 0) {
        listingsContext += "\n🏃 AVAILABLE TRAINERS:\n";
        trainers.forEach((t, i) => {
          const specs = t.specializations ? t.specializations.slice(0, 3).join(", ") : "General fitness";
          listingsContext += `${i + 1}. ${t.name} (${t.category}) — ${t.location} — ₹${t.hourly_rate}/hr — ${t.trainer_tier} tier — ${specs}\n`;
        });
      }

      if (!businesses?.length && !trainers?.length) {
        listingsContext = "\n\nNote: No listings match current criteria. Give general wellness advice and encourage exploring the platform.";
      }
    }

    // Build context-aware system message
    let enhancedSystemPrompt = SYSTEM_PROMPT;
    
    if (context) {
      enhancedSystemPrompt += "\n\n🔍 USER CONTEXT:";
      if (context.location) enhancedSystemPrompt += `\n- Location: ${context.location}`;
      if (context.budget) enhancedSystemPrompt += `\n- Budget: ${context.budget}`;
      if (context.mood) enhancedSystemPrompt += `\n- Mood/Goal: ${context.mood}`;
      if (context.businessType) enhancedSystemPrompt += `\n- Looking for: ${context.businessType}`;
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
            error: "Thoda ruko! 🙏 Bohot requests aa rahe hain. Please try again in a moment.",
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
