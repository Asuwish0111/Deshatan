import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find your yatra — Deshatan",
  description:
    "Search verified trips across 28 states, 8 union territories, Nepal and Bhutan. Filter by region, length and budget.",
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
