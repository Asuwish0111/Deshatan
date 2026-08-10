"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useDeshatan } from "@/lib/context";
import BookingShell from "@/components/booking/BookingShell";
import { inr } from "@/components/booking/trips";
import {
  Draft,
  emptyDraft,
  loadDraft,
  priceDraft,
  saveDraft,
} from "@/components/booking/draft";
import {
  ADDONS,
  MEAL_PLANS,
  OCCASIONS,
  PACE_OPTIONS,
  PICKUP_OPTIONS,
  STYLE_OPTIONS,
} from "@/lib/constants";
import s from "@/components/booking/booking.module.css";

function CustomizeInner() {
  const router = useRouter();
  const search = useSearchParams();
  const { db } = useDeshatan();
  const [draft, setDraft] = useState<Draft | null>(null);

  // pick up the trip from the link, or resume whatever was in progress
  useEffect(() => {
    const fromQuery = search.get("dest");
    const saved = loadDraft();
    if (saved && (!fromQuery || saved.destId === fromQuery)) {
      setDraft(saved);
      return;
    }
    setDraft(emptyDraft(fromQuery ?? saved?.destId ?? "", 5));
  }, [search]);

  const dest = db?.destinations.find((d) => d.id === draft?.destId);

  // default the length to the trip's own once it resolves
  useEffect(() => {
    if (dest && draft && !loadDraft()) {
      setDraft({ ...draft, days: dest.days });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dest?.id]);

  if (!draft) {
    return (
      <BookingShell eyebrow="Ek Minute" title="Loading your trip…" step="customize">
        <p style={{ textAlign: "center" }}>Fetching your choices.</p>
      </BookingShell>
    );
  }

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => (d ? { ...d, [key]: value } : d));

  const toggleAddon = (id: string) =>
    setDraft((d) =>
      d
        ? {
            ...d,
            addons: d.addons.includes(id)
              ? d.addons.filter((a) => a !== id)
              : [...d.addons, id],
          }
        : d,
    );

  const price = priceDraft(draft, dest);

  const next = () => {
    saveDraft(draft);
    router.push("/book/details");
  };

  return (
    <BookingShell
      eyebrow="Apni Marzi"
      title="Shape the trip around you"
      lede={
        dest
          ? `${dest.title} — every choice below moves the price on the right, so there are no surprises later.`
          : "Every choice below moves the price on the right, so there are no surprises later."
      }
      step="customize"
    >
      <div className={s.split}>
        <div className={s.stack}>
          <div className={s.card}>
            <h2>How long, how many</h2>
            <div className={s.optionGrid}>
              <div className={s.field}>
                <label htmlFor="days">Days on the road</label>
                <input
                  id="days"
                  type="number"
                  min={2}
                  max={30}
                  value={draft.days}
                  onChange={(e) => set("days", Math.max(2, Number(e.target.value) || 2))}
                />
              </div>
              <div className={s.field}>
                <label htmlFor="pax">Travellers</label>
                <input
                  id="pax"
                  type="number"
                  min={1}
                  max={15}
                  value={draft.pax}
                  onChange={(e) => set("pax", Math.max(1, Number(e.target.value) || 1))}
                />
                <span className={s.fieldHint}>Groups of 3+ get a per-head discount.</span>
              </div>
            </div>
          </div>

          <div className={s.card}>
            <h2>Travel style</h2>
            <div className={s.optionGrid}>
              {STYLE_OPTIONS.map((o) => (
                <button
                  type="button"
                  key={o.key}
                  className={`${s.option} ${draft.style === o.key ? s.optionOn : ""}`}
                  aria-pressed={draft.style === o.key}
                  onClick={() => set("style", o.key as Draft["style"])}
                >
                  <b>{o.label}</b>
                  <span>{inr(o.price)} per person per day</span>
                </button>
              ))}
            </div>
          </div>

          <div className={s.card}>
            <h2>Pace</h2>
            <div className={s.optionGrid}>
              {PACE_OPTIONS.map((o) => (
                <button
                  type="button"
                  key={o.key}
                  className={`${s.option} ${draft.pace === o.key ? s.optionOn : ""}`}
                  aria-pressed={draft.pace === o.key}
                  onClick={() => set("pace", o.key as Draft["pace"])}
                >
                  <b>{o.label}</b>
                  <span>{o.hint}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={s.card}>
            <h2>Meals</h2>
            <div className={s.optionGrid}>
              {MEAL_PLANS.map((o) => (
                <button
                  type="button"
                  key={o.key}
                  className={`${s.option} ${draft.meal === o.key ? s.optionOn : ""}`}
                  aria-pressed={draft.meal === o.key}
                  onClick={() => set("meal", o.key as Draft["meal"])}
                >
                  <b>{o.label}</b>
                  <span>
                    {o.perDayPerPax === 0
                      ? "Included"
                      : `+${inr(o.perDayPerPax)} per person per day`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className={s.card}>
            <h2>Getting there</h2>
            <div className={s.optionGrid}>
              {PICKUP_OPTIONS.map((o) => (
                <button
                  type="button"
                  key={o.key}
                  className={`${s.option} ${draft.pickup === o.key ? s.optionOn : ""}`}
                  aria-pressed={draft.pickup === o.key}
                  onClick={() => set("pickup", o.key as Draft["pickup"])}
                >
                  <b>{o.label}</b>
                  <span>{o.fee === 0 ? "No charge" : `+${inr(o.fee)} one-off`}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={`${s.panelFrame} ${s.panelFrameGold}`}>
            <div className={s.panelInner}>
              <h2>Add-ons</h2>
              <div className={s.optionGrid}>
                {ADDONS.map((a) => (
                  <button
                    type="button"
                    key={a.id}
                    className={`${s.option} ${draft.addons.includes(a.id) ? s.optionOn : ""}`}
                    aria-pressed={draft.addons.includes(a.id)}
                    onClick={() => toggleAddon(a.id)}
                  >
                    <b>{a.label}</b>
                    <span>{inr(a.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={s.card}>
            <h2>Anything we should know?</h2>
            <div className={s.field} style={{ marginBottom: 16 }}>
              <label htmlFor="occasion">Occasion</label>
              <select
                id="occasion"
                value={draft.occasion}
                onChange={(e) => set("occasion", e.target.value)}
              >
                {OCCASIONS.map((o) => (
                  <option key={o.key} value={o.key}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div className={s.field}>
              <label htmlFor="notes">Notes for your guide</label>
              <textarea
                id="notes"
                placeholder="Dietary needs, mobility, places you want to add…"
                value={draft.notes}
                onChange={(e) => set("notes", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={s.stack}>
          <div className={`${s.card} ${s.summary}`}>
            <h2>Running total</h2>
            <dl className={s.summaryRows}>
              <div>
                <dt>
                  {draft.days} days × {draft.pax} {draft.pax === 1 ? "person" : "people"}
                </dt>
                <dd>{inr(price.base)}</dd>
              </div>
              <div>
                <dt>Meals</dt>
                <dd>{price.meals ? inr(price.meals) : "—"}</dd>
              </div>
              <div>
                <dt>Pickup</dt>
                <dd>{price.pickup ? inr(price.pickup) : "—"}</dd>
              </div>
              <div>
                <dt>Add-ons</dt>
                <dd>{price.addons ? inr(price.addons) : "—"}</dd>
              </div>
            </dl>
            <div className={s.summaryTotal}>
              <b>{inr(price.total)}</b>
              <span>≈ {inr(price.perHead)} per person, sab kuch included</span>
            </div>
          </div>
        </div>
      </div>

      <div className={s.actions}>
        <Link className={s.btnGhost} href={dest ? `/book/trip/${dest.id}` : "/book"}>
          ← Back to trip
        </Link>
        <button type="button" className={s.btn} onClick={next} disabled={!draft.destId}>
          Continue to your details →
        </button>
      </div>
    </BookingShell>
  );
}

export default function CustomizePage() {
  return (
    <Suspense
      fallback={
        <BookingShell eyebrow="Ek Minute" title="Loading your trip…" step="customize">
          <p style={{ textAlign: "center" }}>Fetching your choices.</p>
        </BookingShell>
      }
    >
      <CustomizeInner />
    </Suspense>
  );
}
