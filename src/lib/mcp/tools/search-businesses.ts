import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const SUPABASE_URL = "https://pihmoaogjjiicfnkmpbe.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpaG1vYW9namppaWNmbmttcGJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMDU5NTIsImV4cCI6MjA2NDc4MTk1Mn0.AwP8FI4ykefc4CCq-48QF_f1jbK3vTy41STytcQ5SaU";

export default defineTool({
  name: "search_businesses",
  title: "Search wellness businesses",
  description:
    "Search GymSpaYoga's public directory of gyms, spas, yoga studios, therapists, and chiropractors. Filter by city and/or business type.",
  inputSchema: {
    city: z.string().optional().describe("City name filter (partial match)."),
    business_type: z
      .string()
      .optional()
      .describe("One of: gym, spa, yoga, therapist, chiropractor."),
    limit: z.number().int().min(1).max(50).default(10),
  },
  annotations: { readOnlyHint: true, openWorldHint: false },
  handler: async ({ city, business_type, limit }) => {
    const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    let query = supabase
      .from("public_business_listings")
      .select(
        "business_name, business_type, city, state, monthly_price, session_price, description, amenities",
      )
      .limit(limit);
    if (city) query = query.ilike("city", `%${city}%`);
    if (business_type) query = query.eq("business_type", business_type);
    const { data, error } = await query;
    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { businesses: data ?? [] },
    };
  },
});
