"use client";

import { useDeshatan } from "@/lib/context";
import { t } from "@/lib/i18n";
import Link from "next/link";

export default function Hero() {
  const { language } = useDeshatan();

  const handleExplore = () => {
    const elem = document.getElementById("showcase");
    elem?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div>
          <div className="eyebrow">
            <span className="hindi">घूमो</span>
            <span>EXPLORE</span>
          </div>
          <h1>
            <span>{t("hero.h1", language)}</span>
          </h1>
          <p className="lede">{t("hero.lede", language)}</p>

          <div className="hero-ctas">
            <button className="btn" onClick={handleExplore}>{t("hero.cta1", language)}</button>
            <Link href="/book/search" className="btn red">{t("hero.cta2", language)}</Link>
          </div>

          <div className="hero-proof">
            <div>
              <b>2,600+</b>
              <span>{t("hero.proof1", language)}</span>
            </div>
            <div>
              <b>50,000+</b>
              <span>{t("hero.proof2", language)}</span>
            </div>
            <div>
              <b>₹25L+</b>
              <span>{t("hero.proof3", language)}</span>
            </div>
          </div>
        </div>

        <div className="hero-art">
          <div className="garland" aria-hidden="true"></div>
          <svg viewBox="0 0 500 500" style={{ maxWidth: "100%", width: "100%", height: "auto" }}>
            <defs>
              <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "var(--sindoor)", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "var(--marigold)", stopOpacity: 1 }} />
              </linearGradient>
              <linearGradient id="heroGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "var(--indigo)", stopOpacity: 0.2 }} />
                <stop offset="100%" style={{ stopColor: "var(--peacock)", stopOpacity: 0.2 }} />
              </linearGradient>
            </defs>
            <circle cx="250" cy="250" r="220" fill="url(#heroGrad2)" opacity="0.3" />
            <circle cx="250" cy="250" r="180" fill="var(--paper)" opacity="0.95" />
            <path d="M150,350 Q200,320 250,310 Q300,320 350,350 L350,420 Q250,450 150,420 Z" fill="var(--marigold-soft)" opacity="0.4" />
            <polygon points="250,80 300,180 350,280 250,300 150,280 200,180" fill="var(--sindoor)" opacity="0.6" />
            <circle cx="180" cy="200" r="25" fill="var(--indigo)" opacity="0.3" />
            <circle cx="320" cy="240" r="20" fill="var(--peacock)" opacity="0.3" />
            <circle cx="250" cy="140" r="15" fill="var(--marigold)" opacity="0.5" />
            <circle cx="200" cy="260" r="12" fill="var(--sindoor)" opacity="0.4" />
            <circle cx="300" cy="280" r="18" fill="var(--indigo)" opacity="0.25" />
          </svg>
          <div className="garland-row" aria-hidden="true"></div>
        </div>
      </div>
    </section>
  );
}
