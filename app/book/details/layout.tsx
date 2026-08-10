import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your details — Deshatan",
  description: "Who is travelling and when. Nothing is charged at this step.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
