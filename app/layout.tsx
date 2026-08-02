import type { Metadata } from "next";
import "./globals.css";
import { DeshatanProvider } from "@/lib/context";

export const metadata: Metadata = {
  title: "Deshatan — Ghoomo Poora Bharat · 28 States · 8 Territories · Nepal & Bhutan",
  description: "Explore all of India. 2,600+ verified guides. 50,000+ curated stays. Live tracking. Book your dream trip today.",
  openGraph: {
    title: "Deshatan — Ghoomo Poora Bharat",
    description: "Carefully curated journeys across 28 states, 8 territories, Nepal & Bhutan.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DeshatanProvider>{children}</DeshatanProvider>
      </body>
    </html>
  );
}
