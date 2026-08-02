export interface Destination {
  id: string;
  title: string;
  region: string;
  days: number;
  priceFrom: number;
  rating: number;
  reviews: number;
  scene: string;
  image?: string;
  blurb: string;
  area: string;
  hidden: boolean;
}

export interface Guide {
  id: string;
  name: string;
  city: string;
  phone: string;
  rating: number;
  reviews: number;
  verified: boolean;
  languages: string[];
}

export interface Driver {
  id: string;
  name: string;
  vehicle: string;
  phone: string;
  rating: number;
  verified: boolean;
}

export interface Stay {
  id: string;
  title: string;
  region: string;
  city: string;
  type: string;
  pricePerNight: number;
  rating: number;
  reviews: number;
  amenities: string[];
  verified: boolean;
}

export interface Booking {
  id: string;
  destId: string;
  guideId?: string;
  driverId?: string;
  stayId?: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  travelDate: string;
  days: number;
  pax: number;
  style: "backpacker" | "comfort" | "heritage";
  pace: "relaxed" | "balanced" | "packed";
  meal: "breakfast" | "half" | "full";
  pickup: "self" | "railway" | "airport" | "home";
  addons: string[];
  occasion: string;
  notes: string;
  total: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export interface Review {
  id: string;
  bookingId: string;
  guideId?: string;
  driverId?: string;
  stayId?: string;
  rating: number;
  text: string;
  status: "pending" | "published" | "rejected";
}

export interface AuditEntry {
  timestamp: string;
  action: string;
  detail: string;
  user: string;
}

export interface Settings {
  siteName: string;
  supportEmail: string;
  paymentMethods: string[];
}

export interface Database {
  destinations: Destination[];
  guides: Guide[];
  drivers: Driver[];
  stays: Stay[];
  bookings: Booking[];
  reviews: Review[];
  auditLog: AuditEntry[];
  settings: Settings;
}

export interface StyleOption {
  key: "backpacker" | "comfort" | "heritage";
  label: string;
  price: number;
}

export interface PaceOption {
  key: "relaxed" | "balanced" | "packed";
  label: string;
  hint: string;
}

export interface MealPlan {
  key: "breakfast" | "half" | "full";
  label: string;
  perDayPerPax: number;
  hint: string;
}

export interface PickupOption {
  key: "self" | "railway" | "airport" | "home";
  label: string;
  fee: number;
  hint: string;
}

export interface Addon {
  id: string;
  label: string;
  price: number;
}

export interface Occasion {
  key: string;
  label: string;
}

export type Language =
  | "en"
  | "hi"
  | "bn"
  | "mr"
  | "te"
  | "ta"
  | "gu"
  | "ur"
  | "kn"
  | "or";
