import { defineMcp } from "@lovable.dev/mcp-js";
import searchBusinessesTool from "./tools/search-businesses";
import searchTrainersTool from "./tools/search-trainers";
import listBlogsTool from "./tools/list-blogs";

export default defineMcp({
  name: "gymspayoga-mcp",
  title: "GymSpaYoga MCP",
  version: "0.1.0",
  instructions:
    "Tools to search GymSpaYoga's public directory of gyms, spas, yoga studios, trainers, therapists, chiropractors, and wellness blog content across India.",
  tools: [searchBusinessesTool, searchTrainersTool, listBlogsTool],
});
