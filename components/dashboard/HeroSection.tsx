"use client";

import Link from "next/link";
import { useCopy } from "@/lib/copy";
import s from "./dashboard.module.css";

// the three accents deliberately foreshadow the three stat cards below.
// i18n stores each as "figure\nlabel", translated in all ten languages.
const PROOF = [
  { key: "hero.proof1", figure: "2,600+", label: "Verified guides", tone: s.heroProofRust },
  { key: "hero.proof2", figure: "50,000+", label: "Safe stays", tone: s.heroProofGold },
  { key: "hero.proof3", figure: "₹25L+", label: "Trips booked", tone: s.heroProofIndigo },
];

// the same silhouettes the frieze band uses, laid out as a horizon line
const HORIZON: [string, number, number][] = [
  ["warli-6", 28.577, 59.673],
  ["warli-4", 75.455, 54.677],
  ["warli-3", 103.285, 63.616],
  ["warli-5", 45.976, 61.2],
  ["warli-1", 76.374, 49.117],
  ["warli-2", 50.502, 72.6],
  ["warli-7", 97.702, 54.678],
  ["warli-4", 75.455, 54.677],
  ["warli-6", 28.577, 59.673],
  ["warli-3", 103.285, 63.616],
  ["warli-1", 76.374, 49.117],
  ["warli-5", 45.976, 61.2],
  ["warli-7", 97.702, 54.678],
  ["warli-6", 28.577, 59.673],
  ["warli-4", 75.455, 54.677],
  ["warli-2", 50.502, 72.6],
];

export default function HeroSection() {
  const { line, t, language } = useCopy();

  return (
    <section className={s.hero} id="top">
      <div className={s.heroArch} aria-hidden="true" />

      <div className={s.heroInner}>
        <p className={s.eyebrow}>
          <span className={s.eyebrowBar} aria-hidden="true" />
          <span className={s.eyebrowWord}>{line("nav.tagline", "Ghoomo Poora Bharat")}</span>
          <span className={s.eyebrowBar} aria-hidden="true" />
        </p>

        <h1 className={s.heroTitle}>
          {/* the designed two-line lockup only holds for the English copy;
              other languages take the translated line whole */}
          {language === "en" ? (
            <>
              Explore all of India
              <span className={s.heroTitleAccent}>
                <span className={s.heroAmp}>&amp;</span> just beyond it.
              </span>
            </>
          ) : (
            t("hero.h1")
          )}
        </h1>

        <p className={s.heroLede}>
          {line(
            "hero.lede",
            "Carefully curated journeys across 28 states, 8 union territories, Nepal and Bhutan. Local guides, verified stays, live tracking. Dream bigger.",
          )}
        </p>

        <div className={s.heroCtas}>
          <Link className={s.heroCtaPrimary} href="/book/search">
            {line("hero.cta1", "Start exploring")}
            <span className={s.heroCtaArrow} aria-hidden="true">
              →
            </span>
          </Link>
          <Link className={s.heroCtaGhost} href="#showcase">
            {line("hero.cta2", "See where we go")}
          </Link>
        </div>

        <dl className={s.heroProof}>
          {PROOF.map((item) => {
            const [figure, label] = (t(item.key) || "").split("\n");
            return (
              <div key={item.key} className={item.tone}>
                <dt>{figure || item.figure}</dt>
                <dd>{label || item.label}</dd>
              </div>
            );
          })}
        </dl>
      </div>

      <div className={s.heroHorizon} aria-hidden="true">
        <div className={`${s.heroHorizonRow} ${s.heroHorizonFar}`}>
          {HORIZON.map(([name, width, height], i) => (
            <span
              key={`far-${name}-${i}`}
              className={s.heroMonument}
              style={{
                width: `${width}px`,
                height: `${height}px`,
                maskImage: `url(/figma/${name}.svg)`,
                WebkitMaskImage: `url(/figma/${name}.svg)`,
              }}
            />
          ))}
        </div>
        <div className={s.heroHorizonRow}>
          {HORIZON.map(([name, width, height], i) => (
            <span
              key={`${name}-${i}`}
              className={s.heroMonument}
              style={{
                width: `${width}px`,
                height: `${height}px`,
                maskImage: `url(/figma/${name}.svg)`,
                WebkitMaskImage: `url(/figma/${name}.svg)`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
