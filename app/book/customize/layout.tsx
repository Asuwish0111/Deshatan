import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customise your trip — Deshatan",
  description: "Pace, meals, pickup and add-ons, with the price moving as you choose.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
