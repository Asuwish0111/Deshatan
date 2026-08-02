import { StyleOption, PaceOption, MealPlan, PickupOption, Addon, Occasion } from "@/types";

export const STYLE_OPTIONS: StyleOption[] = [
  { key: "backpacker", label: "Backpacker", price: 2200 },
  { key: "comfort", label: "Comfort", price: 4500 },
  { key: "heritage", label: "Heritage", price: 9500 },
];

export const PACE_OPTIONS: PaceOption[] = [
  {
    key: "relaxed",
    label: "Relaxed",
    hint: "2–3 stops a day. Take time to soak it in.",
  },
  {
    key: "balanced",
    label: "Balanced",
    hint: "4–5 stops. Mix driving with exploring.",
  },
  {
    key: "packed",
    label: "Packed",
    hint: "6+ stops. See as much as you can.",
  },
];

export const MEAL_PLANS: MealPlan[] = [
  { key: "breakfast", label: "Breakfast only", perDayPerPax: 0, hint: "" },
  { key: "half", label: "Half board (breakfast + dinner)", perDayPerPax: 500, hint: "" },
  { key: "full", label: "Full board (all meals)", perDayPerPax: 900, hint: "" },
];

export const PICKUP_OPTIONS: PickupOption[] = [
  { key: "self", label: "Self arrival", fee: 0, hint: "" },
  { key: "railway", label: "Railway station pickup", fee: 500, hint: "" },
  { key: "airport", label: "Airport pickup", fee: 800, hint: "" },
  { key: "home", label: "Home pickup & drop", fee: 1200, hint: "" },
];

export const ADDONS: Addon[] = [
  {
    id: "photo",
    label: "Professional photography day",
    price: 3500,
  },
  {
    id: "cuisine",
    label: "Local cuisine trail & tasting",
    price: 1800,
  },
  {
    id: "adventure",
    label: "Adventure activity pass",
    price: 2600,
  },
  {
    id: "insurance",
    label: "Group travel insurance",
    price: 1200,
  },
  {
    id: "sim",
    label: "Local SIM & data pack",
    price: 600,
  },
];

export const OCCASIONS: Occasion[] = [
  { key: "none", label: "Just travelling" },
  { key: "honeymoon", label: "Honeymoon" },
  { key: "family", label: "Family reunion" },
  { key: "solo", label: "Solo trip" },
  { key: "friends", label: "Friends trip" },
];

export const REGION_MULTIPLIERS: Record<string, number> = {
  "Himalayas": 1.1,
  "Rajasthan": 1.0,
  "Deep South": 1.05,
  "Northeast": 1.15,
  "Bengal": 1.05,
  "Gujarat": 1.0,
  "Karnataka": 1.05,
  "Goa": 1.08,
  "Kerala": 1.08,
  "Andhra Pradesh": 1.05,
  "Tamil Nadu": 1.05,
  "Telangana": 1.05,
  "Odisha": 1.0,
  "Bihar": 1.0,
  "Jharkhand": 1.0,
  "Chhattisgarh": 1.0,
  "Madhya Pradesh": 1.0,
  "Uttarakhand": 1.12,
  "Himachal Pradesh": 1.1,
  "Punjab": 1.0,
  "Haryana": 1.0,
  "Uttar Pradesh": 1.0,
  "Maharashtra": 1.05,
  "Delhi": 1.0,
  "Jammu & Kashmir": 1.2,
  "Ladakh": 1.2,
  "Nepal & Bhutan": 1.3,
};

export const REGION_ACCENTS: Record<
  string,
  { bg: string; text: string }
> = {
  "Himalayas": { bg: "var(--indigo-accent)", text: "var(--paper)" },
  "Rajasthan": { bg: "var(--sindoor-accent)", text: "var(--paper)" },
  "Deep South": { bg: "var(--peacock-accent)", text: "var(--paper)" },
  "Northeast": { bg: "var(--indigo-accent)", text: "var(--paper)" },
  "Bengal": { bg: "var(--indigo-accent)", text: "var(--paper)" },
  "Gujarat": { bg: "var(--marigold-accent)", text: "var(--ink)" },
  "Karnataka": { bg: "var(--peacock-accent)", text: "var(--paper)" },
  "Goa": { bg: "var(--peacock-accent)", text: "var(--paper)" },
  "Kerala": { bg: "var(--peacock-accent)", text: "var(--paper)" },
  "Andhra Pradesh": { bg: "var(--indigo-accent)", text: "var(--paper)" },
  "Tamil Nadu": { bg: "var(--sindoor-accent)", text: "var(--paper)" },
  "Telangana": { bg: "var(--indigo-accent)", text: "var(--paper)" },
  "Odisha": { bg: "var(--peacock-accent)", text: "var(--paper)" },
  "Bihar": { bg: "var(--indigo-accent)", text: "var(--paper)" },
  "Jharkhand": { bg: "var(--indigo-accent)", text: "var(--paper)" },
  "Chhattisgarh": { bg: "var(--peacock-accent)", text: "var(--paper)" },
  "Madhya Pradesh": { bg: "var(--sindoor-accent)", text: "var(--paper)" },
  "Uttarakhand": { bg: "var(--indigo-accent)", text: "var(--paper)" },
  "Himachal Pradesh": { bg: "var(--indigo-accent)", text: "var(--paper)" },
  "Punjab": { bg: "var(--marigold-accent)", text: "var(--ink)" },
  "Haryana": { bg: "var(--marigold-accent)", text: "var(--ink)" },
  "Uttar Pradesh": { bg: "var(--marigold-accent)", text: "var(--ink)" },
  "Maharashtra": { bg: "var(--sindoor-accent)", text: "var(--paper)" },
  "Delhi": { bg: "var(--marigold-accent)", text: "var(--ink)" },
  "Jammu & Kashmir": { bg: "var(--indigo-accent)", text: "var(--paper)" },
  "Ladakh": { bg: "var(--indigo-accent)", text: "var(--paper)" },
  "Nepal & Bhutan": { bg: "var(--indigo-accent)", text: "var(--paper)" },
};

export const ADMIN_NAV = [
  ["dashboard", "Dashboard"],
  ["analytics", "Analytics"],
  ["bookings", "Bookings"],
  ["applications", "Applications"],
  ["guides", "Guides & Drivers"],
  ["listings", "Trip Listings"],
  ["customers", "Customers"],
  ["payments", "Payments"],
  ["reviews", "Reviews"],
  ["audit", "Audit Log"],
  ["settings", "Settings"],
];

export const SCENE_PHOTOS: Record<string, string> = {
  mountain: "https://commons.wikimedia.org/wiki/Special:FilePath/Kedarnath_Temple_at_Night.jpg?width=700",
  temple: "https://commons.wikimedia.org/wiki/Special:FilePath/Meenakshi_Temple_in_Madurai.JPG?width=700",
  monastery: "https://commons.wikimedia.org/wiki/Special:FilePath/Thimphu_Chorten.jpg?width=700",
  desert: "https://commons.wikimedia.org/wiki/Special:FilePath/Khimsar_Sand_Dunes.jpg?width=700",
  backwater: "https://commons.wikimedia.org/wiki/Special:FilePath/Alleppey_Backwaters.jpg?width=700",
  forest: "https://commons.wikimedia.org/wiki/Special:FilePath/Western_Ghats_Forest.jpg?width=700",
  beach: "https://commons.wikimedia.org/wiki/Special:FilePath/Radhanagar_Beach%2C_Andaman.jpg?width=700",
  heritage: "https://commons.wikimedia.org/wiki/Special:FilePath/Taj_Lake_Palace_Udaipur.jpg?width=700",
  village: "https://commons.wikimedia.org/wiki/Special:FilePath/Ziro_Valley_Houses.jpg?width=700",
};

export const REGION_PHOTOS: Record<string, string> = {
  "Himalayas": "https://commons.wikimedia.org/wiki/Special:FilePath/Manali_to_Leh_Highway.jpg?width=700",
  "Rajasthan": "https://commons.wikimedia.org/wiki/Special:FilePath/Hawa_Mahal_Jaipur.jpg?width=700",
  "Deep South": "https://commons.wikimedia.org/wiki/Special:FilePath/Backwaters_Kerala.jpg?width=700",
  "Northeast": "https://commons.wikimedia.org/wiki/Special:FilePath/Ziro_Valley_Arunachal.jpg?width=700",
  "Bengal": "https://commons.wikimedia.org/wiki/Special:FilePath/Darjeeling_Tea_Gardens.jpg?width=700",
  "Gujarat": "https://commons.wikimedia.org/wiki/Special:FilePath/Rann_of_Kutch.jpg?width=700",
  "Karnataka": "https://commons.wikimedia.org/wiki/Special:FilePath/Hampi_Ruins.jpg?width=700",
  "Goa": "https://commons.wikimedia.org/wiki/Special:FilePath/Baga_Beach_Goa.jpg?width=700",
  "Kerala": "https://commons.wikimedia.org/wiki/Special:FilePath/Alleppey_Backwaters.jpg?width=700",
  "Andhra Pradesh": "https://commons.wikimedia.org/wiki/Special:FilePath/Charminar_Hyderabad.jpg?width=700",
  "Tamil Nadu": "https://commons.wikimedia.org/wiki/Special:FilePath/Meenakshi_Temple.jpg?width=700",
  "Telangana": "https://commons.wikimedia.org/wiki/Special:FilePath/Charminar_Hyderabad.jpg?width=700",
  "Odisha": "https://commons.wikimedia.org/wiki/Special:FilePath/Jagannath_Temple_Puri.jpg?width=700",
  "Bihar": "https://commons.wikimedia.org/wiki/Special:FilePath/Bodhgaya_Temple.jpg?width=700",
  "Jharkhand": "https://commons.wikimedia.org/wiki/Special:FilePath/Jamshedpur_Steel_City.jpg?width=700",
  "Chhattisgarh": "https://commons.wikimedia.org/wiki/Special:FilePath/Chitrakoot_Falls.jpg?width=700",
  "Madhya Pradesh": "https://commons.wikimedia.org/wiki/Special:FilePath/Khajuraho_Temples.jpg?width=700",
  "Uttarakhand": "https://commons.wikimedia.org/wiki/Special:FilePath/Kedarnath_Temple.jpg?width=700",
  "Himachal Pradesh": "https://commons.wikimedia.org/wiki/Special:FilePath/Manali_to_Leh_Highway.jpg?width=700",
  "Punjab": "https://commons.wikimedia.org/wiki/Special:FilePath/Golden_Temple_Amritsar.jpg?width=700",
  "Haryana": "https://commons.wikimedia.org/wiki/Special:FilePath/Sultanpur_Bird_Sanctuary.jpg?width=700",
  "Uttar Pradesh": "https://commons.wikimedia.org/wiki/Special:FilePath/Taj_Mahal_Agra.jpg?width=700",
  "Maharashtra": "https://commons.wikimedia.org/wiki/Special:FilePath/Gateway_of_India_Mumbai.jpg?width=700",
  "Delhi": "https://commons.wikimedia.org/wiki/Special:FilePath/Qutb_Minar_Delhi.jpg?width=700",
  "Jammu & Kashmir": "https://commons.wikimedia.org/wiki/Special:FilePath/Dal_Lake_Srinagar.jpg?width=700",
  "Ladakh": "https://commons.wikimedia.org/wiki/Special:FilePath/Pangong_Tso_Lake.jpg?width=700",
  "Nepal & Bhutan": "https://commons.wikimedia.org/wiki/Special:FilePath/Everest_Base_Camp.jpg?width=700",
};

export const CALC_WORDS: Record<string, Record<string, string>> = {
  en: {
    days: "days",
    day: "day",
    pax: "people",
    per_person: "per person",
  },
  hi: {
    days: "दिन",
    day: "दिन",
    pax: "लोग",
    per_person: "प्रति व्यक्ति",
  },
  bn: {
    days: "দিন",
    day: "দিন",
    pax: "লোক",
    per_person: "প্রতি ব্যক্তি",
  },
  mr: {
    days: "दिवस",
    day: "दिवस",
    pax: "लोक",
    per_person: "प्रति व्यक्ति",
  },
  te: {
    days: "రోజులు",
    day: "రోజు",
    pax: "వ్యక్తులు",
    per_person: "per person",
  },
  ta: {
    days: "நாட்கள்",
    day: "நாள்",
    pax: "நபர்கள்",
    per_person: "ஒரு நபருக்கு",
  },
  gu: {
    days: "દિવસ",
    day: "દિવસ",
    pax: "લોકો",
    per_person: "પ્રતિ વ્યક્તિ",
  },
  ur: {
    days: "دن",
    day: "دن",
    pax: "افراد",
    per_person: "فی فرد",
  },
  kn: {
    days: "ದಿನಗಳು",
    day: "ದಿನ",
    pax: "ಜನರು",
    per_person: "ಪ್ರತಿ ವ್ಯಕ್ತಿ",
  },
  or: {
    days: "ଦିନ",
    day: "ଦିନ",
    pax: "ଲୋକ",
    per_person: "ପ୍ରତି ବ୍ୟକ୍ତି",
  },
};
