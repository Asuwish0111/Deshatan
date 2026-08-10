import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stay details — Deshatan",
  description: "Amenities, house rules and what this stay costs on top of your travel style.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
