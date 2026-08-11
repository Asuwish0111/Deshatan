import { Destination } from "@/types";
import { Draft } from "./draft";

/* Reading intent from what someone types, without a language model.
   Keyword signals, scored against the real catalogue — deterministic, offline,
   and honest about what it is. Swapping in an LLM later means replacing
   readMood() and leaving everything downstream untouched. */

export type Signal =
  | "mountains"
  | "beach"
  | "spiritual"
  | "quiet"
  | "adventure"
  | "romantic"
  | "family"
  | "offbeat"
  | "heritage"
  | "budget"
  | "luxury";

const CUES: Record<Signal, string[]> = {
  mountains: ["mountain", "himalaya", "snow", "peak", "valley", "trek", "hills", "spiti", "ladakh", "manali", "altitude", "cold"],
  beach: ["beach", "island", "sea", "coast", "sand", "swim", "snorkel", "andaman", "shore", "reef"],
  spiritual: ["temple", "spiritual", "pilgrim", "dham", "monastery", "shrine", "sacred", "meditat", "peace of mind"],
  quiet: ["quiet", "calm", "slow", "relax", "rest", "escape", "unwind", "peace", "recharge", "burnt out", "burnout", "tired", "breathe"],
  adventure: ["adventure", "thrill", "bike", "raft", "climb", "hike", "rush", "extreme", "camp", "wild"],
  romantic: ["romantic", "honeymoon", "couple", "partner", "wife", "husband", "anniversary", "just the two"],
  family: ["family", "parents", "kids", "children", "mum", "mom", "dad", "grandparent", "elders"],
  offbeat: ["offbeat", "hidden", "unexplored", "crowd", "touristy", "different", "unusual", "nobody", "secret"],
  heritage: ["heritage", "history", "fort", "palace", "culture", "architecture", "royal", "old city"],
  budget: ["budget", "cheap", "affordable", "backpack", "student", "low cost", "save"],
  luxury: ["luxury", "luxe", "premium", "splurge", "five star", "indulge", "spoil"],
};

/* What each signal says about the trip, once we have one. */
const SIGNAL_STYLE: Partial<Record<Signal, Draft["style"]>> = {
  budget: "backpacker",
  luxury: "heritage",
  heritage: "heritage",
};
const SIGNAL_PACE: Partial<Record<Signal, Draft["pace"]>> = {
  quiet: "relaxed",
  adventure: "packed",
  family: "relaxed",
};

export const SIGNAL_LABEL: Record<Signal, string> = {
  mountains: "mountains",
  beach: "coast and islands",
  spiritual: "temples and monasteries",
  quiet: "somewhere quiet",
  adventure: "something active",
  romantic: "a trip for two",
  family: "travelling as a family",
  offbeat: "off the usual trail",
  heritage: "forts and palaces",
  budget: "keeping it affordable",
  luxury: "treating yourselves",
};

export function readMood(text: string): Signal[] {
  const t = text.toLowerCase();
  const found: Signal[] = [];
  for (const [signal, cues] of Object.entries(CUES) as [Signal, string[]][]) {
    if (cues.some((c) => t.includes(c))) found.push(signal);
  }
  return found;
}

/* Which words in the catalogue each signal cares about. */
const SIGNAL_TERMS: Record<Signal, string[]> = {
  mountains: ["himalaya", "mountain", "spiti", "ladakh", "manali", "pass", "valley"],
  beach: ["andaman", "beach", "island", "reef", "seaside"],
  spiritual: ["temple", "dham", "monaster", "yatra", "sacred"],
  quiet: ["quiet", "offbeat", "backwater", "valley", "monaster"],
  adventure: ["trek", "highway", "circuit", "pass", "island"],
  romantic: ["backwater", "palace", "lake", "houseboat"],
  family: ["heritage", "backwater", "temple"],
  offbeat: ["offbeat", "northeast", "ziro", "majuli", "spiti"],
  heritage: ["heritage", "palace", "fort", "rajasthan", "jodhpur"],
  budget: ["northeast", "spiti", "offbeat"],
  luxury: ["palace", "heritage", "backwater"],
};

export function rankDestinations(
  destinations: Destination[],
  signals: Signal[],
): { dest: Destination; score: number; why: string[] }[] {
  return destinations
    .filter((d) => !d.hidden)
    .map((d) => {
      const hay = [d.title, d.region, d.area, d.blurb, d.scene].join(" ").toLowerCase();
      const why: string[] = [];
      let score = 0;
      for (const sig of signals) {
        if (SIGNAL_TERMS[sig].some((term) => hay.includes(term))) {
          score += 2;
          why.push(SIGNAL_LABEL[sig]);
        }
      }
      // a gentle nudge from popularity so ties do not come back arbitrary
      score += Math.min(d.reviews / 500, 1);
      return { dest: d, score, why };
    })
    .sort((a, b) => b.score - a.score);
}

export function styleFor(signals: Signal[]): Draft["style"] {
  for (const sig of signals) if (SIGNAL_STYLE[sig]) return SIGNAL_STYLE[sig]!;
  return "comfort";
}

export function paceFor(signals: Signal[]): Draft["pace"] {
  for (const sig of signals) if (SIGNAL_PACE[sig]) return SIGNAL_PACE[sig]!;
  return "balanced";
}

/* A place query goes to the place. Anything else is a mood, and goes to the
   planner — this is the split the hero search makes. */
export function looksLikeMood(text: string, hadPlaceMatch: boolean): boolean {
  if (hadPlaceMatch) return false;
  const words = text.trim().split(/\s+/).length;
  return words >= 3 || readMood(text).length > 0;
}
