import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For guides — Deshatan",
  description: "Work with Deshatan as a verified local guide.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
