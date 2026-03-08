import express from "express";

const router = express.Router();

function guessCategory(text) {
  const t = text.toLowerCase();
  if (t.includes("wedding")) return "Wedding";
  if (t.includes("birthday")) return "Birthday";
  if (t.includes("corporate") || t.includes("office") || t.includes("company"))
    return "Corporate";
  if (t.includes("conference") || t.includes("summit")) return "Conference";
  return "Other";
}

function guessBudget(text) {
  const t = text.toLowerCase();
  if (t.includes("high budget") || t.includes("luxury") || t.includes("premium"))
    return "High";
  if (t.includes("low budget") || t.includes("cheap") || t.includes("budget"))
    return "Low";
  if (t.includes("medium budget") || t.includes("moderate")) return "Medium";
  return null;
}

function guessGuests(text) {
  
  const match = text.match(/\b(\d{1,6})\b/); // Digits 1-6 (50, 200, 1500)
  if (!match) return null;
  const n = parseInt(match[1], 10);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

function guessVibe(text) {
  const t = text.toLowerCase();
  const vibes = [
    "elegant",
    "romantic",
    "casual",
    "formal",
    "modern",
    "classic",
    "fun",
    "luxury",
    "outdoor",
    "beach",
  ];
  const found = vibes.find((v) => t.includes(v));
  if (!found) return null;
  // Capitalize first letter
  return found.charAt(0).toUpperCase() + found.slice(1);
}

router.post("/", async (req, res) => {
  try {
    const description = (req.body?.description ?? "").toString();

    if (!description.trim()) {
      return res.json({ ok: false, error: "Missing description" });
    }

    const suggestion = {
      category: guessCategory(description),
      guests: guessGuests(description),
      budget: guessBudget(description),
      vibe: guessVibe(description),
    };

    return res.json({ ok: true, suggestion });
  } catch (err) {
    return res.json({ ok: false, error: "Server error" });
  }
});

export default router;