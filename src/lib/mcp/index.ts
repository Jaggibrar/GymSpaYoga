import { defineMcp, auth } from "@lovable.dev/mcp-js";
import searchBusinessesTool from "./tools/search-businesses";
import searchTrainersTool from "./tools/search-trainers";
import listBlogsTool from "./tools/list-blogs";

const SUPABASE_URL = "https://pihmoaogjjiicfnkmpbe.supabase.co";

export default defineMcp({
  name: "gymspayoga-mcp",
  title: "GymSpaYoga MCP",
  version: "0.1.0",
  instructions:
    "Tools to search GymSpaYoga's public directory of gyms, spas, yoga studios, trainers, therapists, chiropractors, and wellness blog content across India.",
  // Require OAuth: only clients presenting a valid Supabase-issued token can call tools.
  auth: auth.oauth.issuer({
    issuer: `${SUPABASE_URL}/auth/v1`,
    jwksUri: `${SUPABASE_URL}/auth/v1/.well-known/jwks.json`,
    acceptedAudiences: ["authenticated"],
    resourceName: "GymSpaYoga MCP",
  }),
  tools: [searchBusinessesTool, searchTrainersTool, listBlogsTool],
});
