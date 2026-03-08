import type { AiSuggestion, FormValues } from "../lib/schema";

export type { AiSuggestion, FormValues };

export type ExtractResponse = {
  ok: boolean;
  suggestion?: {
    category: string | null;
    guests: number | null;
    budget: string | null;
    vibe: string | null;
  };
  error?: string;
};