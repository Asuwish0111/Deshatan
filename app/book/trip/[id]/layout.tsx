import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trip details — Deshatan",
  description: "Day by day, what is included, your guide, and the price for your party.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
