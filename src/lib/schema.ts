import { z } from "zod";

export const CATEGORY_OPTIONS = [
  "Wedding",
  "Birthday",
  "Corporate",
  "Conference",
  "Other",
] as const;

export const BUDGET_OPTIONS = ["Low", "Medium", "High"] as const;

export const formSchema = z.object({
  category: z.enum(CATEGORY_OPTIONS).optional(),
  guests: z
    .number()
    .int("Guest count must be an integer")
    .positive("Guest count must be positive")
    .max(100000, "Guest count too large")
    .optional(),
  budget: z.enum(BUDGET_OPTIONS).optional(),
  vibe: z.string().min(1, "Vibe cannot be empty").max(80).optional(),
});

export type FormValues = z.infer<typeof formSchema>;

export const aiSchema = formSchema.partial();
export type AiSuggestion = z.infer<typeof aiSchema>;