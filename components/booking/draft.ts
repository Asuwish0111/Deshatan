import {
  ADDONS,
  MEAL_PLANS,
  PICKUP_OPTIONS,
  REGION_MULTIPLIERS,
  STYLE_OPTIONS,
} from "@/lib/constants";
import { Destination } from "@/types";

/* The in-progress booking, carried across the flow's routes in sessionStorage
   so a refresh mid-flow does not lose the answers. Field names mirror the
   Booking type so confirming is a copy, not a translation. */
export type Draft = {
  destId: string;
  days: number;
  pax: number;
  style: "backpacker" | "comfort" | "heritage";
  pace: "relaxed" | "balanced" | "packed";
  meal: "breakfast" | "half" | "full";
  pickup: "self" | "railway" | "airport" | "home";
  addons: string[];
  occasion: string;
  notes: string;
  travelDate: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
};

const KEY = "deshatan-draft";

export const emptyDraft = (destId = "", days = 5): Draft => ({
  destId,
  days,
  pax: 2,
  style: "comfort",
  pace: "balanced",
  meal: "half",
  pickup: "self",
  addons: [],
  occasion: "none",
  notes: "",
  travelDate: "",
  guestName: "",
  guestEmail: "",
  guestPhone: "",
});

export function loadDraft(): Draft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Draft) : null;
  } catch {
    return null;
  }
}

export function saveDraft(draft: Draft) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(KEY, JSON.stringify(draft));
}

export function clearDraft() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(KEY);
}

export type Price = {
  base: number;
  meals: number;
  pickup: number;
  addons: number;
  total: number;
  perHead: number;
};

/* Same shape as the dashboard calculator — style rate × region multiplier,
   with a per-head group discount capped at 22% — then the extras customise
   adds on top. */
export function priceDraft(draft: Draft, dest?: Destination): Price {
  const rate = STYLE_OPTIONS.find((o) => o.key === draft.style)?.price ?? 4500;
  const mult = dest ? (REGION_MULTIPLIERS[dest.region] ?? 1) : 1;
  const groupFactor = 1 - Math.min(Math.max(draft.pax - 2, 0) * 0.04, 0.22);

  const base = Math.round(draft.days * draft.pax * rate * mult * groupFactor);
  const perDay = MEAL_PLANS.find((m) => m.key === draft.meal)?.perDayPerPax ?? 0;
  const meals = perDay * draft.days * draft.pax;
  const pickup = PICKUP_OPTIONS.find((p) => p.key === draft.pickup)?.fee ?? 0;
  const addons = draft.addons.reduce(
    (sum, id) => sum + (ADDONS.find((a) => a.id === id)?.price ?? 0),
    0,
  );

  const total = base + meals + pickup + addons;
  return { base, meals, pickup, addons, total, perHead: Math.round(total / draft.pax) };
}

export function makeReference(id: string) {
  return "DSH-" + id.slice(-6).toUpperCase();
}
