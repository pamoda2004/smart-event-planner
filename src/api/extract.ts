import type { ExtractResponse } from "../types";

export async function extractEventDetails(
  description: string
): Promise<ExtractResponse> {
  try {
    const res = await fetch("http://localhost:5000/extract", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    });

    const data = (await res.json()) as ExtractResponse;
    return data;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return { ok: false, error: message };
  }
}
