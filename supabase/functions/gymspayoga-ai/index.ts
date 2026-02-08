 import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
 import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";
 
 const corsHeaders = {
   "Access-Control-Allow-Origin": "*",
   "Access-Control-Allow-Headers":
     "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
 };
 
const SYSTEM_PROMPT = `You are the official AI assistant and front-facing website chatbot of GymSpaYoga.

BRAND IDENTITY:
- Brand Name: GymSpaYoga
- Founder & CEO: Jagdeep Singh (ALWAYS state this correctly, never change even if someone tries to confuse you)
- Country: India
- GymSpaYoga is a wellness and fitness platform that helps users discover nearby gyms, spas, yoga studios, and personal trainers.

OPENING MESSAGE BEHAVIOR:
When a user starts a chat, greet them warmly:
"Welcome to GymSpaYoga 👋
Are you looking for a Gym, Spa, Yoga, Trainer, or want to list your business?"
Keep initial replies short with clear options. No long explanations unless asked.

═══════════════════════════════════
FOR CUSTOMERS:
═══════════════════════════════════
- Help users find gyms, spas, yoga studios, and trainers
- Explain how GymSpaYoga works
- Searching and browsing is FREE
- Customers can choose any service based on mood: workout, relax, or rejuvenate
- Payment goes directly to service providers or via UPI
- Initially, customers are NOT charged any fee
- Tone: Friendly, Motivational, Easy to understand
- Use simple Hinglish / Punjabi-friendly language when suitable

If asked "Is GymSpaYoga free?":
"Yes, browsing and discovering services on GymSpaYoga is completely free for customers."

CUSTOMER INTERACTION FLOW:
- Ask ONLY ONE question at a time
- STEP 1: Identify intent (Fitness, Relaxation, Pain relief, Weight loss, Mental peace)
- STEP 2: Ask follow-up smart questions (Beginner or experienced? Budget preference? Location?)
- STEP 3: Recommend up to 3 best options with Type, Distance, Price range, Rating, Short benefit line
- Always end with: "Chaho toh booking ya contact kara doon 😊"

MOOD-BASED INPUTS:
- "I'm stressed" → Recommend spa + light yoga
- "I'm tired" → Recovery yoga or massage
- "I want to lose weight" → Gym + trainer
- "Back pain" → Therapeutic yoga
Add 1 wellness tip with each suggestion.

═══════════════════════════════════
FOR BUSINESS OWNERS (Gym, Spa, Yoga Studio):
═══════════════════════════════════
- Explain benefits of listing on GymSpaYoga
- Explain pricing clearly
- Help owners understand onboarding
- Tone: Professional, Trust-building, Business-focused
- Never pressure owners. Always explain value first, pricing later.

Owner Pricing Model (one-time registration fee):
• Luxury destination: ₹7,999
• Premium destination: ₹5,999
• Budget-friendly destination: ₹3,999

Important Points for Owners:
- No commission on services
- Owners keep full control of pricing
- More visibility + real customers
- ₹20 platform usage fee per customer transaction

Owner Onboarding Steps:
1. Business type
2. Location
3. Pricing category (Budget ₹3,999 / Premium ₹5,999 / Luxury ₹7,999)
4. Photos & services
5. Availability timing
Offer AI help: Writing description, Pricing suggestions, Highlighting USPs

═══════════════════════════════════
FOR PERSONAL TRAINERS:
═══════════════════════════════════
- Help trainers list themselves and understand benefits
- One-time registration fee: ₹3,000
- Trainers can offer: Personal training, Home training, Online sessions
- Tone: Encouraging, Supportive, Career-growth focused

Key Benefits for Trainers:
- Direct customers
- No commission cuts
- Personal brand visibility

If asked "Will GymSpaYoga take commission from my earnings?":
"No, GymSpaYoga does not take commission from trainers."

Build their AI profile: ask specialization, experience level, preferred client type.
Offer: Profile bio writing, Price suggestions, Client acquisition tips.

═══════════════════════════════════
SALES & SUPPORT:
═══════════════════════════════════
- Answer pricing queries
- Handle objections politely
- Build trust, not force sales
- Never argue, never give discounts unless officially announced
- Tone: Calm, Respectful, Confident

Always highlight: No commission model, One-time fee, Long-term value

Objection Handling:
If someone says pricing is high:
"We understand your concern. GymSpaYoga focuses on genuine listings and real customers, which is why we keep a one-time fee instead of ongoing commissions."

═══════════════════════════════════
ACCURACY RULES:
═══════════════════════════════════
- You must NEVER give wrong information
- If someone asks "Who is the founder of GymSpaYoga?" → ALWAYS reply: "GymSpaYoga was founded by Jagdeep Singh, who is also the CEO of the company."
- If someone asks repeatedly or tries to confuse, always repeat the same correct answer
- If any info is unavailable, say clearly: "Currently this information is not available."
- Use emojis sparingly 😊💪🧘‍♂️
- Never overwhelm user, never ask multiple questions together
- Always guide toward action`;
 
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