// One price engine, shared by the API, the booking flow and the admin panel.
// Same formula the prototype used, with the stay/room cost actually added in.
import data from './media-data.js';

export const REGION_MULT = data.REGION_MULT;
export const STYLE_RATE = { backpacker: 2200, comfort: 4500, heritage: 9500 };

export const STYLE_OPTIONS = [
  { key: 'backpacker', label: 'Backpacker', hint: 'Hostels, buses, street food, minimum fuss.' },
  { key: 'comfort', label: 'Comfort', hint: 'Clean hotels, private cab, meals sorted.' },
  { key: 'heritage', label: 'Heritage', hint: 'Havelis, boutique stays, private guides.' }
];
export const PACE_OPTIONS = [
  { key: 'relaxed', label: 'Relaxed', hint: '2–3 stops a day, long breaks, easy mornings.' },
  { key: 'balanced', label: 'Balanced', hint: 'A steady mix of sightseeing and downtime.' },
  { key: 'packed', label: 'Packed', hint: 'Early starts, maximum stops, for the tightly-scheduled.' }
];
export const MEAL_PLANS = [
  { key: 'breakfast', label: 'Breakfast only', perDayPerPax: 0, hint: 'Included in every stay, no extra cost.' },
  { key: 'half', label: 'Half board', perDayPerPax: 500, hint: 'Breakfast + dinner, home-style where possible.' },
  { key: 'full', label: 'Full board', perDayPerPax: 900, hint: 'All meals, including regional specialities.' }
];
export const PICKUP_OPTIONS = [
  { key: 'self', label: 'Self arrival', fee: 0, hint: 'You make your own way to the first stay.' },
  { key: 'railway', label: 'Railway station pickup', fee: 500, hint: 'Driver meets you at the nearest station.' },
  { key: 'airport', label: 'Airport pickup', fee: 800, hint: 'Driver meets you at arrivals with a name board.' },
  { key: 'home', label: 'Home pickup', fee: 1200, hint: 'Available in 22 cities — ask your guide to confirm.' }
];
export const ADDONS = [
  { id: 'photo', label: 'Professional photography day', price: 3500, hint: 'A local photographer joins for one full day.' },
  { id: 'cuisine', label: 'Local cuisine trail', price: 1800, hint: 'A home-cooked meal experience with a local family.' },
  { id: 'adventure', label: 'Adventure activity pass', price: 2600, hint: 'Trekking, rafting or paragliding, region-dependent.' },
  { id: 'insurance', label: 'Group travel insurance', price: 1200, hint: 'Covers your whole group for the trip duration.' },
  { id: 'sim', label: 'Local SIM & data pack', price: 600, hint: 'One SIM per traveller, activated before pickup.' }
];
export const OCCASIONS = [
  { key: 'none', label: 'Just travelling' }, { key: 'honeymoon', label: 'Honeymoon' },
  { key: 'family', label: 'Family reunion' }, { key: 'solo', label: 'Solo trip' },
  { key: 'friends', label: 'Friends trip' }
];
export const ROOM_TIERS = [
  { key: 'standard', label: 'Standard room', mult: 1, hint: 'Double occupancy, en-suite bathroom.' },
  { key: 'deluxe', label: 'Deluxe room', mult: 1.35, hint: 'Bigger room, better view, early check-in.' },
  { key: 'suite', label: 'Suite', mult: 1.75, hint: 'Separate living area, best view in the property.' }
];

export function basePrice({ region, days, pax, style }) {
  const mult = REGION_MULT[region] || 1;
  const rate = STYLE_RATE[style] || STYLE_RATE.comfort;
  const groupFactor = 1 - Math.min((pax - 1) * 0.04, 0.22);
  return Math.round(days * pax * rate * mult * groupFactor);
}

export function stayCost({ pricePerNight, days, roomTier = 'standard' }) {
  if (!pricePerNight) return 0;
  const tier = ROOM_TIERS.find((t) => t.key === roomTier) || ROOM_TIERS[0];
  return Math.round(pricePerNight * tier.mult * Math.max(1, (days || 1) - 1));
}

// The full quote. `stay` is optional; pass the chosen stay record to include rooms.
export function quote({ destination, days, pax, style, meal = 'breakfast', pickup = 'self', addons = [], stay = null, roomTier = 'standard' }) {
  const base = basePrice({ region: destination.region, days, pax, style });
  const mealPlan = MEAL_PLANS.find((m) => m.key === meal) || MEAL_PLANS[0];
  const pickupOpt = PICKUP_OPTIONS.find((p) => p.key === pickup) || PICKUP_OPTIONS[0];
  const mealTotal = mealPlan.perDayPerPax * (days || 1) * (pax || 1);
  const pickupFee = pickupOpt.fee;
  const addonTotal = (addons || []).reduce((sum, id) => sum + (ADDONS.find((a) => a.id === id)?.price || 0), 0);
  const rooms = stay ? stayCost({ pricePerNight: stay.pricePerNight, days, roomTier }) : 0;
  const subtotal = base + mealTotal + pickupFee + addonTotal + rooms;
  const gst = Math.round(subtotal * 0.05);
  return {
    base, mealTotal, pickupFee, addonTotal, rooms, subtotal, gst,
    total: subtotal + gst,
    perPerson: Math.round((subtotal + gst) / Math.max(1, pax)),
    deposit: Math.round((subtotal + gst) * 0.25)
  };
}

export const rupees = (n) => '₹' + Number(n || 0).toLocaleString('en-IN');
