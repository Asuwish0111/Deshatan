import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Where you'll stay — Deshatan",
  description: "Havelis, homestays, tea estates and monastery rooms, every one inspected in the last six months.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
