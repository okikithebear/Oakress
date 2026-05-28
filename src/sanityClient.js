import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "06b42xkk", 
  dataset: "production",
  apiVersion: "2026-01-01",
  useCdn: true,
});