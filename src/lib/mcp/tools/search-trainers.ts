import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const SUPABASE_URL = "https://pihmoaogjjiicfnkmpbe.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpaG1vYW9namppaWNmbmttcGJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMDU5NTIsImV4cCI6MjA2NDc4MTk1Mn0.AwP8FI4ykefc4CCq-48QF_f1jbK3vTy41STytcQ5SaU";

export default defineTool({
  name: "search_trainers",
  title: "Search trainers",
  description:
    "Search GymSpaYoga's public directory of fitness, yoga, and wellness trainers. Filter by location and/or category.",
  inputSchema: {
    location: z.string().optional().describe("Location/city filter (partial match)."),
    category: z.string().optional().describe("Trainer category, e.g. yoga, fitness."),
    limit: z.number().int().min(1).max(50).default(10),
  },
  annotations: { readOnlyHint: true, openWorldHint: false },
  handler: async ({ location, category, limit }) => {
    const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    let query = supabase
      .from("public_trainer_listings")
      .select(
        "name, category, location, hourly_rate, specializations, bio, trainer_tier, experience_years",
      )
      .limit(limit);
    if (location) query = query.ilike("location", `%${location}%`);
    if (category) query = query.eq("category", category);
    const { data, error } = await query;
    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { trainers: data ?? [] },
    };
  },
});
