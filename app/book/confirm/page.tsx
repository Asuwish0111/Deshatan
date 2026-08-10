"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDeshatan } from "@/lib/context";
import BookingShell from "@/components/booking/BookingShell";
import { inr } from "@/components/booking/trips";
import {
  Draft,
  clearDraft,
  loadDraft,
  makeReference,
  priceDraft,
} from "@/components/booking/draft";
import { ADDONS, OCCASIONS } from "@/lib/constants";
import { Booking } from "@/types";
import s from "@/components/booking/booking.module.css";

export default function ConfirmPage() {
  const { db, updateDB } = useDeshatan();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [placed, setPlaced] = useState<Booking | null>(null);
  const [working, setWorking] = useState(false);

  useEffect(() => {
    setDraft(loadDraft());
  }, []);

  const dest = db?.destinations.find((d) => d.id === (placed?.destId ?? draft?.destId));

  if (draft === null && !placed) {
    return (
      <BookingShell eyebrow="Ek Minute" title="Loading your booking…" step="confirm">
        <p style={{ textAlign: "center" }}>One moment.</p>
      </BookingShell>
    );
  }

  /* ---- after it is placed ---- */
  if (placed) {
    return (
      <BookingShell
        eyebrow="Ho Gaya"
        title="Your yatra is booked"
        lede="We've saved it against your email. Our team confirms guide and stay within 24 hours."
      >
        <div className={s.receipt}>
          <div className={`${s.panelFrame} ${s.panelFramePeacock}`}>
            <div className={s.panelInner} style={{ textAlign: "center" }}>
              <p style={{ margin: 0, fontSize: 15 }}>Your booking reference</p>
              <p className={s.receiptCode}>{makeReference(placed.id)}</p>
              <p className={s.tripMeta} style={{ marginTop: 12 }}>
                Sent to {placed.guestEmail}
              </p>
            </div>
          </div>

          <div className={s.card} style={{ marginTop: 22 }}>
            <h2>{dest?.title ?? "Your trip"}</h2>
            <dl className={s.summaryRows}>
              <div>
                <dt>Starting</dt>
                <dd style={{ fontSize: 14 }}>{placed.travelDate}</dd>
              </div>
              <div>
                <dt>Length</dt>
                <dd>{placed.days} days</dd>
              </div>
              <div>
                <dt>Travellers</dt>
                <dd>{placed.pax}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>
                  <span className={`${s.statusPill} ${s.statusPending}`}>{placed.status}</span>
                </dd>
              </div>
            </dl>
            <div className={s.summaryTotal}>
              <b>{inr(placed.total)}</b>
              <span>paid on arrival · free cancellation to 14 days</span>
            </div>
          </div>

          <div className={s.actions}>
            <Link className={s.btnGhost} href="/book">
              Browse more yatras
            </Link>
            <Link className={s.btn} href="/book/mytrips">
              See my trips →
            </Link>
          </div>
        </div>
      </BookingShell>
    );
  }

  if (!draft || !draft.destId || !draft.guestEmail) {
    return (
      <BookingShell
        eyebrow="Adhoora"
        title="Something's missing"
        lede="We don't have a complete booking to confirm yet."
        step="confirm"
      >
        <div className={s.empty}>
          <p>Start from the trip and we&apos;ll carry your answers through.</p>
          <Link className={s.btn} href="/book">
            Find a yatra
          </Link>
        </div>
      </BookingShell>
    );
  }

  const price = priceDraft(draft, dest);
  const occasion = OCCASIONS.find((o) => o.key === draft.occasion)?.label;
  const chosenAddons = ADDONS.filter((a) => draft.addons.includes(a.id));

  const place = () => {
    setWorking(true);
    const booking: Booking = {
      id: "b" + Date.now().toString(36),
      destId: draft.destId,
      guestName: draft.guestName,
      guestEmail: draft.guestEmail,
      guestPhone: draft.guestPhone,
      travelDate: draft.travelDate,
      days: draft.days,
      pax: draft.pax,
      style: draft.style,
      pace: draft.pace,
      meal: draft.meal,
      pickup: draft.pickup,
      addons: draft.addons,
      occasion: draft.occasion,
      notes: draft.notes,
      total: price.total,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    updateDB((prev) => ({ ...prev, bookings: [...prev.bookings, booking] }));
    clearDraft();
    setPlaced(booking);
  };

  return (
    <BookingShell
      eyebrow="Ek Baar Dekh Lein"
      title="Everything look right?"
      lede="Nothing is charged now. You pay on arrival, and you can cancel free up to 14 days before."
      step="confirm"
    >
      <div className={s.split}>
        <div className={s.stack}>
          <div className={s.card}>
            <h2>{dest?.title ?? "Your trip"}</h2>
            <dl className={s.summaryRows}>
              <div>
                <dt>Starting</dt>
                <dd style={{ fontSize: 14 }}>{draft.travelDate}</dd>
              </div>
              <div>
                <dt>Length</dt>
                <dd>{draft.days} days</dd>
              </div>
              <div>
                <dt>Travellers</dt>
                <dd>{draft.pax}</dd>
              </div>
              <div>
                <dt>Style · pace</dt>
                <dd style={{ fontSize: 14, textTransform: "capitalize" }}>
                  {draft.style} · {draft.pace}
                </dd>
              </div>
              <div>
                <dt>Meals · pickup</dt>
                <dd style={{ fontSize: 14, textTransform: "capitalize" }}>
                  {draft.meal} · {draft.pickup}
                </dd>
              </div>
              {occasion && draft.occasion !== "none" ? (
                <div>
                  <dt>Occasion</dt>
                  <dd style={{ fontSize: 14 }}>{occasion}</dd>
                </div>
              ) : null}
            </dl>
            {chosenAddons.length > 0 ? (
              <ul className={s.includes} style={{ marginTop: 14 }}>
                {chosenAddons.map((a) => (
                  <li key={a.id}>
                    {a.label} — {inr(a.price)}
                  </li>
                ))}
              </ul>
            ) : null}
            {draft.notes ? (
              <p className={s.tripBlurb} style={{ marginTop: 14 }}>
                <b>Your note:</b> {draft.notes}
              </p>
            ) : null}
          </div>

          <div className={s.card}>
            <h2>Lead traveller</h2>
            <dl className={s.summaryRows}>
              <div>
                <dt>Name</dt>
                <dd style={{ fontSize: 14 }}>{draft.guestName}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd style={{ fontSize: 14 }}>{draft.guestEmail}</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd style={{ fontSize: 14 }}>{draft.guestPhone}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className={s.stack}>
          <div className={`${s.card} ${s.summary}`}>
            <h2>What it comes to</h2>
            <dl className={s.summaryRows}>
              <div>
                <dt>
                  {draft.days} days × {draft.pax}
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
              <span>≈ {inr(price.perHead)} per person</span>
            </div>
          </div>
        </div>
      </div>

      <div className={s.actions}>
        <Link className={s.btnGhost} href="/book/details">
          ← Change details
        </Link>
        <button type="button" className={s.btn} onClick={place} disabled={working}>
          {working ? "Booking…" : "Confirm this yatra →"}
        </button>
      </div>
    </BookingShell>
  );
}
