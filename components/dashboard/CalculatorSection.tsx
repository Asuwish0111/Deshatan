"use client";

import Link from "next/link";
import { useState } from "react";
import { STYLE_OPTIONS, REGION_MULTIPLIERS } from "@/lib/constants";
import { useCopy } from "@/lib/copy";
import s from "./dashboard.module.css";

type StyleKey = "backpacker" | "comfort" | "heritage";

const STYLES: { key: StyleKey; label: string }[] = [
  { key: "backpacker", label: "Backpacker" },
  { key: "comfort", label: "Comfort" },
  { key: "heritage", label: "Heritage Royal" },
];

// the shared table covers the first three; the rest are this section's own
const REGIONS: { label: string; mult: number }[] = [
  { label: "Himalayas", mult: REGION_MULTIPLIERS["Himalayas"] ?? 1.1 },
  { label: "Rajasthan", mult: REGION_MULTIPLIERS["Rajasthan"] ?? 1.0 },
  { label: "Deep South", mult: REGION_MULTIPLIERS["Deep South"] ?? 1.05 },
  { label: "Nepal & Bhutan", mult: 1.15 },
  { label: "Seaside", mult: 1.08 },
  { label: "Offbeat location", mult: 1.12 },
  { label: "Trek location", mult: 1.14 },
];

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export default function CalculatorSection() {
  const { line } = useCopy();
  const [days, setDays] = useState(7);
  const [pax, setPax] = useState(2);
  const [style, setStyle] = useState<StyleKey>("comfort");
  const [region, setRegion] = useState("Himalayas");
  const [query, setQuery] = useState("");

  const rate = STYLE_OPTIONS.find((o) => o.key === style)?.price ?? 4500;
  const mult = REGIONS.find((r) => r.label === region)?.mult ?? 1;
  // groups of three or more get a per-head discount, capped at 22%
  const groupFactor = 1 - Math.min(Math.max(pax - 2, 0) * 0.04, 0.22);

  const total = Math.round(days * pax * rate * mult * groupFactor);
  const perHead = Math.round(total / pax);
  // the last share takes the remainder so the three always sum to the total
  const stay = Math.round(total * 0.45);
  const travel = Math.round(total * 0.35);
  const guide = total - stay - travel;

  const bookingHref = `/book?days=${days}&pax=${pax}&style=${style}&region=${encodeURIComponent(region)}`;
  const searchHref = query.trim()
    ? `/book/search?q=${encodeURIComponent(query.trim())}`
    : "/book/search";

  // paints the filled part of the track up to the current value
  const track = (value: number, min: number, max: number) => ({
    "--fill": `${((value - min) / (max - min)) * 100}%`,
  }) as React.CSSProperties;

  return (
    <section className={s.calculator} id="calculator">
      <div className={s.calculatorInner}>
        <div className={s.calcCopy}>
          <p className={s.eyebrow}>
            <span className={s.eyebrowBar} aria-hidden="true" />
            <span className={s.eyebrowWord}>{line("nav.calculator", "Kahaan-Kahaan")}</span>
            <span className={s.eyebrowBar} aria-hidden="true" />
          </p>
          <div className={s.calcCopyBody}>
            <div className={s.calcCopyText}>
              <h2>{line("calc.h2", "Your dream trip has a number. Find it in thirty seconds.")}</h2>
              <p>
                Pick your days, your people, your style and your region. The calculator
                prices real stays, real drivers and real guides — not a marketing estimate.
                Move a slider, watch the rupees move.
              </p>
            </div>
            <p className={s.calcNote}>
              <span className={s.calcNoteLead}>Budget sorting, built in:</span> once you have
              your number, every itinerary we show you is sorted against it — under budget
              first, always.
            </p>
          </div>
        </div>

        <div className={s.calcFrame}>
          <div className={s.calcCard}>
            <div className={s.calcCardHead}>
              <h3>{line("calc.h3", "Sapno ka Calculator")}</h3>
              <span className={s.calcLive}>live estimate</span>
            </div>

            <div className={s.calcField}>
              <label className={s.calcLabel} htmlFor="calc-destination">
                Search your destination
              </label>
              <div className={s.calcSearch}>
                <input
                  id="calc-destination"
                  className={s.calcInput}
                  type="search"
                  placeholder="Manali, Kerala backwaters, Rajasthan…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Link className={s.calcSearchBtn} href={searchHref}>
                  <span>Search</span>
                </Link>
              </div>
            </div>

            <div className={s.calcSlider}>
              <div className={s.calcSliderLabel}>
                <label className={s.calcLabel} htmlFor="calc-days">
                  {line("calc.days", "Days on the road")}
                </label>
                <output className={s.calcOutput} htmlFor="calc-days">
                  {days} din
                </output>
              </div>
              <input
                id="calc-days"
                className={s.calcRange}
                style={track(days, 2, 30)}
                type="range"
                min={2}
                max={30}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
              />
            </div>

            <div className={s.calcSlider}>
              <div className={s.calcSliderLabel}>
                <label className={s.calcLabel} htmlFor="calc-pax">
                  {line("calc.pax", "Travellers")}
                </label>
                <output className={s.calcOutput} htmlFor="calc-pax">
                  {pax} log
                </output>
              </div>
              <input
                id="calc-pax"
                className={s.calcRange}
                style={track(pax, 1, 15)}
                type="range"
                min={1}
                max={15}
                value={pax}
                onChange={(e) => setPax(Number(e.target.value))}
              />
            </div>

            <div className={s.calcField}>
              <p className={s.calcLabel}>{line("calc.style", "Travel style")}</p>
              <div className={s.calcChoices} role="group" aria-label="Travel style">
                {STYLES.map((opt) => (
                  <button
                    type="button"
                    key={opt.key}
                    className={`${s.calcChoice} ${style === opt.key ? s.calcChoiceOn : ""}`}
                    aria-pressed={style === opt.key}
                    onClick={() => setStyle(opt.key)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={s.calcField}>
              <p className={s.calcLabel}>{line("calc.region", "Region")}</p>
              <div className={s.calcChoices} role="group" aria-label="Region">
                {REGIONS.map((opt) => (
                  <button
                    type="button"
                    key={opt.label}
                    className={`${s.calcChoice} ${region === opt.label ? s.calcChoiceOn : ""}`}
                    aria-pressed={region === opt.label}
                    onClick={() => setRegion(opt.label)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={s.calcEstimate} aria-live="polite">
              <p className={s.calcTotal}>{inr(total)}</p>
              <p className={s.calcPerPerson}>
                ≈ {inr(perHead)} per person, sab kuch included
              </p>
              <div className={s.calcBreakdown}>
                <div>
                  <p className={s.calcBreakLabel}>{line("calc.stay", "Stay")}</p>
                  <p className={s.calcBreakValue}>{inr(stay)}</p>
                </div>
                <div>
                  <p className={s.calcBreakLabel}>Travel + driver</p>
                  <p className={s.calcBreakValue}>{inr(travel)}</p>
                </div>
                <div>
                  <p className={s.calcBreakLabel}>Guide + experiences</p>
                  <p className={s.calcBreakValue}>{inr(guide)}</p>
                </div>
              </div>
            </div>

            <div className={s.calcCta}>
              <Link className={s.calcCtaBtn} href={bookingHref}>
                <span>Like this number? Start a real booking →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
