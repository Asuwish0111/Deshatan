import { Destination } from "@/types";

/* The eight seeded destinations are the same eight the dashboard showcases,
   so they reuse the photography already committed in public/photos. */
export const TRIP_PHOTOS: Record<string, string> = {
  "1": "/photos/manali-leh.jpg",
  "2": "/photos/kedarnath.jpg",
  "3": "/photos/udaipur.jpg",
  "4": "/photos/alleppey.jpg",
  "5": "/photos/thimphu.jpg",
  "6": "/photos/ziro.jpg",
  "7": "/photos/radhanagar.jpg",
  "8": "/photos/keymonastery.jpg",
};

export const TRIP_ALT: Record<string, string> = {
  "1": "Leh–Manali Highway, Ladakh",
  "2": "Kedarnath temple, Char Dham",
  "3": "Taj Lake Palace, Udaipur",
  "4": "Alleppey backwaters, Kerala",
  "5": "National Memorial Chorten, Thimphu",
  "6": "Siikhe Lake, Ziro, Arunachal Pradesh",
  "7": "Radhanagar beach, Havelock",
  "8": "Key monastery, Spiti",
};

/* What each trip covers, keyed off the seed data's own scene value so a new
   destination inherits a sensible list rather than rendering an empty block. */
const BY_SCENE: Record<string, string[]> = {
  mountain: ["Verified mountain driver", "Acclimatisation nights built in", "Oxygen support on high passes"],
  temple: ["Local priest-guide at each dham", "Queue assistance", "Vegetarian meal plan"],
  heritage: ["Heritage-property stays", "Fort and palace entries", "Evening cultural sittings"],
  backwater: ["Houseboat night", "Village canoe trail", "Coastal cuisine tasting"],
  island: ["Ferry transfers", "Snorkel session with instructor", "Beach-shack lunches"],
  forest: ["Community homestay nights", "Local naturalist guide", "Permits arranged"],
  desert: ["Dune camp night", "Folk music sitting", "Camel or jeep safari"],
};

const BASE_INCLUDES = [
  "ID-verified guide throughout",
  "Stays inspected in the last 6 months",
  "Live tracking shared with family",
  "24/7 support line",
];

export function includesFor(dest: Destination): string[] {
  return [...(BY_SCENE[dest.scene] ?? []), ...BASE_INCLUDES];
}

/* A day-by-day shape derived from the trip's own length, so the itinerary
   always matches the days the price is calculated from. */
export function itineraryFor(dest: Destination): { title: string; body: string }[] {
  const days = dest.days;
  const out: { title: string; body: string }[] = [
    {
      title: "Arrival and settling in",
      body: `Pickup as chosen, transfer to your stay in ${dest.area.split(",")[0]}, and an easy evening to find your feet.`,
    },
  ];
  for (let d = 2; d < days; d++) {
    out.push({
      title: `Exploring ${dest.region}`,
      body: `A full day on the route with your guide — the stops adjust to the pace you pick at the next step.`,
    });
  }
  if (days > 1) {
    out.push({
      title: "Last morning and departure",
      body: "A slower start, time for anything you want to see again, then your transfer out.",
    });
  }
  return out;
}

export const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

export function stars(rating: number): string {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(Math.max(0, 5 - full));
}
