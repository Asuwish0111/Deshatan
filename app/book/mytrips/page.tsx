"use client";

import Link from "next/link";
import { useState } from "react";
import { useDeshatan } from "@/lib/context";
import BookingShell from "@/components/booking/BookingShell";
import { inr } from "@/components/booking/trips";
import { makeReference } from "@/components/booking/draft";
import s from "@/components/booking/booking.module.css";

export default function MyTripsPage() {
  const { db } = useDeshatan();
  const [email, setEmail] = useState("");
  const [looked, setLooked] = useState<string | null>(null);

  const bookings = (db?.bookings ?? []).filter(
    (b) => looked && b.guestEmail.toLowerCase() === looked.toLowerCase(),
  );

  const statusClass = (status: string) =>
    status === "confirmed"
      ? s.statusConfirmed
      : status === "cancelled"
        ? s.statusCancelled
        : s.statusPending;

  return (
    <BookingShell
      eyebrow="Meri Yatra"
      title="Find your booking"
      lede="No account needed — the email you booked with is enough."
    >
      <div className={s.receipt}>
        <div className={s.card}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLooked(email.trim());
            }}
          >
            <div className={s.field}>
              <label htmlFor="lookup">Email you booked with</label>
              <input
                id="lookup"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={{ marginTop: 14 }}>
              <button type="submit" className={s.btn}>
                Find my trips
              </button>
            </div>
          </form>
        </div>
      </div>

      {looked !== null ? (
        bookings.length === 0 ? (
          <div className={s.empty} style={{ marginTop: 26 }}>
            <p>
              Nothing booked under <b>{looked}</b> on this device yet.
            </p>
            <Link className={s.btn} href="/book">
              Find a yatra
            </Link>
          </div>
        ) : (
          <div style={{ marginTop: 26 }}>
            <div className={s.resultBar}>
              <span>
                <span className={s.resultCount}>{bookings.length}</span>{" "}
                {bookings.length === 1 ? "booking" : "bookings"} for {looked}
              </span>
            </div>
            <div className={s.grid}>
              {bookings.map((b) => {
                const dest = db?.destinations.find((d) => d.id === b.destId);
                return (
                  <article className={s.card} key={b.id}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        gap: 12,
                      }}
                    >
                      <h2 style={{ marginBottom: 0 }}>{dest?.title ?? "Your trip"}</h2>
                      <span className={`${s.statusPill} ${statusClass(b.status)}`}>
                        {b.status}
                      </span>
                    </div>
                    <p className={s.tripMeta} style={{ marginTop: 6 }}>
                      {makeReference(b.id)} · booked{" "}
                      {new Date(b.createdAt).toLocaleDateString("en-IN")}
                    </p>
                    <dl className={s.summaryRows} style={{ marginTop: 12 }}>
                      <div>
                        <dt>Starting</dt>
                        <dd style={{ fontSize: 14 }}>{b.travelDate}</dd>
                      </div>
                      <div>
                        <dt>Length</dt>
                        <dd>{b.days} days</dd>
                      </div>
                      <div>
                        <dt>Travellers</dt>
                        <dd>{b.pax}</dd>
                      </div>
                      <div>
                        <dt>Total</dt>
                        <dd>{inr(b.total)}</dd>
                      </div>
                    </dl>
                  </article>
                );
              })}
            </div>
          </div>
        )
      ) : null}
    </BookingShell>
  );
}
