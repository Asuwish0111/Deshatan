import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Review and confirm — Deshatan",
  description: "Check the trip and the price before you book. You pay on arrival.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
