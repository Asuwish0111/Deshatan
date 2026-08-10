"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDeshatan } from "@/lib/context";
import BookingShell from "@/components/booking/BookingShell";
import { inr } from "@/components/booking/trips";
import { Draft, loadDraft, priceDraft, saveDraft } from "@/components/booking/draft";
import s from "@/components/booking/booking.module.css";

type Errors = Partial<Record<"guestName" | "guestEmail" | "guestPhone" | "travelDate", string>>;

export default function DetailsPage() {
  const router = useRouter();
  const { db } = useDeshatan();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [tried, setTried] = useState(false);

  useEffect(() => {
    setDraft(loadDraft());
  }, []);

  const dest = db?.destinations.find((d) => d.id === draft?.destId);

  if (draft === null) {
    return (
      <BookingShell eyebrow="Ek Minute" title="Loading your details…" step="details">
        <p style={{ textAlign: "center" }}>One moment.</p>
      </BookingShell>
    );
  }

  if (!draft.destId) {
    return (
      <BookingShell
        eyebrow="Shuru Karein"
        title="Let's pick a yatra first"
        lede="We need a trip before we can take your details."
        step="details"
      >
        <div className={s.empty}>
          <p>Nothing is in progress right now.</p>
          <Link className={s.btn} href="/book">
            Find a yatra
          </Link>
        </div>
      </BookingShell>
    );
  }

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((d) => (d ? { ...d, [key]: value } : d));
    if (tried) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (d: Draft): Errors => {
    const e: Errors = {};
    if (!d.guestName.trim()) e.guestName = "We need a name for the booking.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.guestEmail))
      e.guestEmail = "Enter an email we can send the confirmation to.";
    if (d.guestPhone.replace(/\D/g, "").length < 10)
      e.guestPhone = "A 10-digit number, so your driver can reach you.";
    if (!d.travelDate) e.travelDate = "Pick the date you want to start.";
    else if (new Date(d.travelDate) < new Date(new Date().toDateString()))
      e.travelDate = "That date has passed.";
    return e;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    setTried(true);
    const found = validate(draft);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.querySelector<HTMLElement>("[data-invalid='true']")?.focus();
      return;
    }
    saveDraft(draft);
    router.push("/book/confirm");
  };

  const price = priceDraft(draft, dest);
  const err = (k: keyof Errors) => (tried ? errors[k] : undefined);

  return (
    <BookingShell
      eyebrow="Aapki Jaankari"
      title="Who's travelling?"
      lede="Only what we need to run the trip and reach you on the road. Nothing is charged at this step."
      step="details"
    >
      <form onSubmit={submit} noValidate>
        <div className={s.split}>
          <div className={s.stack}>
            <div className={s.card}>
              <h2>Lead traveller</h2>
              <div className={s.stack} style={{ gap: 16 }}>
                <div className={s.field}>
                  <label htmlFor="name">Full name</label>
                  <input
                    id="name"
                    value={draft.guestName}
                    data-invalid={!!err("guestName")}
                    aria-invalid={!!err("guestName")}
                    onChange={(e) => set("guestName", e.target.value)}
                  />
                  {err("guestName") ? (
                    <span className={s.fieldError}>{err("guestName")}</span>
                  ) : null}
                </div>
                <div className={s.field}>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={draft.guestEmail}
                    data-invalid={!!err("guestEmail")}
                    aria-invalid={!!err("guestEmail")}
                    onChange={(e) => set("guestEmail", e.target.value)}
                  />
                  <span className={s.fieldHint}>
                    Your booking reference comes here — it&apos;s also how you look the trip
                    up later.
                  </span>
                  {err("guestEmail") ? (
                    <span className={s.fieldError}>{err("guestEmail")}</span>
                  ) : null}
                </div>
                <div className={s.field}>
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    placeholder="+91 "
                    value={draft.guestPhone}
                    data-invalid={!!err("guestPhone")}
                    aria-invalid={!!err("guestPhone")}
                    onChange={(e) => set("guestPhone", e.target.value)}
                  />
                  {err("guestPhone") ? (
                    <span className={s.fieldError}>{err("guestPhone")}</span>
                  ) : null}
                </div>
              </div>
            </div>

            <div className={s.card}>
              <h2>When are you going?</h2>
              <div className={s.field}>
                <label htmlFor="date">Start date</label>
                <input
                  id="date"
                  type="date"
                  value={draft.travelDate}
                  data-invalid={!!err("travelDate")}
                  aria-invalid={!!err("travelDate")}
                  onChange={(e) => set("travelDate", e.target.value)}
                />
                <span className={s.fieldHint}>
                  {draft.days} days from this date. Free to cancel up to 14 days before.
                </span>
                {err("travelDate") ? (
                  <span className={s.fieldError}>{err("travelDate")}</span>
                ) : null}
              </div>
            </div>
          </div>

          <div className={s.stack}>
            <div className={`${s.card} ${s.summary}`}>
              <h2>Your trip</h2>
              <dl className={s.summaryRows}>
                <div>
                  <dt>Yatra</dt>
                  <dd style={{ fontSize: 14 }}>{dest?.title ?? "—"}</dd>
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
                  <dt>Style</dt>
                  <dd style={{ fontSize: 14, textTransform: "capitalize" }}>{draft.style}</dd>
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
          <Link className={s.btnGhost} href="/book/customize">
            ← Back to customise
          </Link>
          <button type="submit" className={s.btn}>
            Review and confirm →
          </button>
        </div>
      </form>
    </BookingShell>
  );
}
