import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My trips — Deshatan",
  description: "Find a booking with the email you booked with. No account needed.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
