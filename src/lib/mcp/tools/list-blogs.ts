import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const SUPABASE_URL = "https://pihmoaogjjiicfnkmpbe.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpaG1vYW9namppaWNmbmttcGJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMDU5NTIsImV4cCI6MjA2NDc4MTk1Mn0.AwP8FI4ykefc4CCq-48QF_f1jbK3vTy41STytcQ5SaU";

export default defineTool({
  name: "list_blogs",
  title: "List wellness blog posts",
  description:
    "List published GymSpaYoga wellness blog posts. Optionally filter by category or search text in the title.",
  inputSchema: {
    search: z.string().optional().describe("Text to search in blog titles."),
    category: z.string().optional().describe("Blog category filter."),
    limit: z.number().int().min(1).max(50).default(10),
  },
  annotations: { readOnlyHint: true, openWorldHint: false },
  handler: async ({ search, category, limit }) => {
    const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    let query = supabase
      .from("blogs")
      .select("id, title, excerpt, category, author_name, published_at, slug")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(limit);
    if (search) query = query.ilike("title", `%${search}%`);
    if (category) query = query.eq("category", category);
    const { data, error } = await query;
    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { blogs: data ?? [] },
    };
  },
});
