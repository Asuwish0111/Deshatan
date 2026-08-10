import { Stay } from "@/types";

/* Amenity names in the seed are free text. This maps the ones we know into
   groups so the list reads as a spec sheet rather than a bag of chips;
   anything unrecognised falls through to "Also here" rather than vanishing. */
const GROUPS: { title: string; match: string[] }[] = [
  {
    title: "Room & comfort",
    match: ["hot water", "bedroom", "fireplace", "attached bath", "hammocks", "library"],
  },
  {
    title: "Food & drink",
    match: ["restaurant", "kitchen", "shared kitchen", "veg kitchen", "breakfast", "dinner", "home meals"],
  },
  {
    title: "Connectivity",
    match: ["wifi", "airport transfer", "luggage store", "boat hire", "bicycles"],
  },
  {
    title: "Outdoors",
    match: [
      "garden", "deck", "pool", "spa", "courtyard", "rooftop", "estate walks",
      "beachfront", "dune access", "snorkel gear", "bonfire", "lake view",
      "mountain view",
    ],
  },
  {
    title: "On hand",
    match: ["guide", "local guide", "doctor on call", "folk music"],
  },
];

export type AmenityGroup = { title: string; items: string[] };

export function groupAmenities(amenities: string[]): AmenityGroup[] {
  const used = new Set<string>();
  const out: AmenityGroup[] = [];

  for (const group of GROUPS) {
    const items = amenities.filter((a) => {
      const hit = group.match.includes(a.toLowerCase());
      if (hit) used.add(a);
      return hit;
    });
    if (items.length) out.push({ title: group.title, items });
  }

  const rest = amenities.filter((a) => !used.has(a));
  if (rest.length) out.push({ title: "Also here", items: rest });
  return out;
}

/* Every property on the list clears the same bar — this is the Deshatan
   standard, not a claim about any one stay. */
export const STAY_STANDARD = [
  "Inspected in person within the last six months",
  "Owner ID-verified, not just the listing",
  "Rated only by yatris who actually stayed",
  "Women-travellers feedback read before we list",
  "Your guide has the owner's direct number",
];

export const HOUSE_RULES = [
  ["Check in", "From 12 noon"],
  ["Check out", "By 10am"],
  ["Cancellation", "Free up to 14 days before"],
  ["Payment", "On arrival, not now"],
  ["ID", "One government ID per adult"],
];

/* A description built from what the record actually holds, so it says
   something specific about this property rather than the same line for all. */
export function describeStay(stay: Stay): string {
  const kind = stay.type.toLowerCase();
  const headline = stay.amenities.slice(0, 2).join(" and ").toLowerCase();
  const scale =
    stay.reviews > 150 ? "one of the busiest on our list" :
    stay.reviews > 90 ? "well-travelled" :
    "quieter, and easier to get into at short notice";
  return `A ${kind} in ${stay.city}, ${scale}. Yatris single out the ${headline}. It sits in ${stay.region}, so it works as a base for the routes below.`;
}

/* The tint each kind of stay carries in its hero band — drawn, not
   photographed, because we hold no photography of these properties. */
export function toneFor(type: string): "rust" | "indigo" | "peacock" | "gold" {
  const t = type.toLowerCase();
  if (t.includes("haveli") || t.includes("palace") || t.includes("hotel")) return "rust";
  if (t.includes("monastery") || t.includes("guesthouse") || t.includes("inn")) return "indigo";
  if (t.includes("beach") || t.includes("houseboat") || t.includes("camp")) return "peacock";
  return "gold";
}
