import React from "react";
import TopBar from "@/components/dashboard/TopBar";
import SkipLink from "@/components/dashboard/SkipLink";
import ds from "@/components/dashboard/dashboard.module.css";
import s from "./booking.module.css";

export const STEPS = [
  { key: "search", label: "Find" },
  { key: "trip", label: "Trip" },
  { key: "customize", label: "Customise" },
  { key: "stay", label: "Stay" },
  { key: "details", label: "Details" },
  { key: "confirm", label: "Confirm" },
] as const;

export type StepKey = (typeof STEPS)[number]["key"];

export function StepRail({ current }: { current: StepKey }) {
  const at = STEPS.findIndex((step) => step.key === current);
  return (
    <ol className={s.steps} aria-label="Booking progress">
      {STEPS.map((step, i) => {
        const state = i === at ? s.stepOn : i < at ? s.stepDone : "";
        return (
          <li key={step.key} className={state} aria-current={i === at ? "step" : undefined}>
            <span className={s.stepDot} aria-hidden="true">
              {i < at ? "✓" : i + 1}
            </span>
            <span>{step.label}</span>
          </li>
        );
      })}
    </ol>
  );
}

/* The arch, minus the sections: cap, cream plate, closing shoulder. Every
   booking page sits in this so the flow reads as the same building. */
export default function BookingShell({
  children,
  eyebrow,
  title,
  lede,
  step,
  titleAs = "h1",
}: {
  children: React.ReactNode;
  eyebrow: string;
  title: string;
  lede?: string;
  step?: StepKey;
  /* the trip page renders its own h1 in the hero, so the shell steps down
     to avoid two competing page titles */
  titleAs?: "h1" | "p";
}) {
  return (
    <div className={ds.page}>
      <SkipLink />
      <TopBar
        primary={{ label: "Find a yatra", href: "/book" }}
        secondary={{ label: "My trips", href: "/book/mytrips" }}
      />

      <main id="main" className={ds.upper}>
        <div className={ds.archCap} aria-hidden="true" />
        <div className={s.plate}>
          <div className={s.plateInner}>
            <div className={s.head}>
              <p className={ds.eyebrow}>
                <span className={ds.eyebrowBar} aria-hidden="true" />
                <span className={ds.eyebrowWord}>{eyebrow}</span>
                <span className={ds.eyebrowBar} aria-hidden="true" />
              </p>
              {titleAs === "h1" ? <h1>{title}</h1> : <p className={s.plateTitle}>{title}</p>}
              {lede ? <p>{lede}</p> : null}
            </div>

            <div style={{ marginTop: "clamp(24px, 3vw, 36px)" }}>
              {step ? <StepRail current={step} /> : null}
              {children}
            </div>
          </div>
        </div>
      </main>

      <div className={ds.archBottom} aria-hidden="true" />
    </div>
  );
}
