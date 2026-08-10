"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDeshatan } from "@/lib/context";
import BookingShell from "@/components/booking/BookingShell";
import { inr, stars } from "@/components/booking/trips";
import {
  Draft,
  INCLUDED_NIGHTLY,
  loadDraft,
  nightsFor,
  saveDraft,
  stayUpgrade,
} from "@/components/booking/draft";
import s from "@/components/booking/booking.module.css";

export default function StayPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { db } = useDeshatan();
  const [draft, setDraft] = useState<Draft | null>(null);

  useEffect(() => {
    setDraft(loadDraft());
  }, []);

  const stay = db?.stays.find((st) => st.id === params?.id);

  if (!db) {
    return (
      <BookingShell eyebrow="Ek Minute" title="Loading the stay…">
        <p style={{ textAlign: "center" }}>One moment.</p>
      </BookingShell>
    );
  }

  if (!stay) {
    return (
      <BookingShell
        eyebrow="Nahin Mila"
        title="We can't find that stay"
        lede="The link may be old, or the property may be off the list this season."
      >
        <div className={s.empty}>
          <p>Have a look at everywhere else we put yatris up.</p>
          <Link className={s.btn} href="/book/stays">
            All stays
          </Link>
        </div>
      </BookingShell>
    );
  }

  const inFlow = !!draft?.destId;
  const nights = draft ? nightsFor(draft.days) : 0;
  const upgrade = draft ? stayUpgrade(draft, stay) : 0;
  const tier = draft ? INCLUDED_NIGHTLY[draft.style] : 0;

  // other trips that actually pass through this stay's region
  const nearby = db.destinations.filter((d) => d.region === stay.region && !d.hidden);
  const alsoHere = db.stays.filter((st) => st.region === stay.region && st.id !== stay.id);

  const choose = () => {
    if (!draft) return;
    const next = { ...draft, stayId: stay.id };
    saveDraft(next);
    setDraft(next);
    router.push("/book/details");
  };

  return (
    <BookingShell
      eyebrow="Yahaan Rukiye"
      title={stay.title}
      step={inFlow ? "stay" : undefined}
    >
      <div className={s.split}>
        <div className={s.stack}>
          <div className={s.card}>
            <div className={s.stayHead}>
              <span className={s.stayType}>{stay.type}</span>
              {stay.verified ? <span className={s.stayVerified}>✦ Verified</span> : null}
            </div>
            <p className={s.tripMeta} style={{ marginTop: 10 }}>
              {stay.city} · {stay.region}
            </p>
            <p className={s.tripMeta} style={{ marginTop: 6 }}>
              <span className={s.tripStars} aria-hidden="true">
                {stars(stay.rating)}
              </span>{" "}
              <b>{stay.rating}</b> · {stay.reviews} reviews
            </p>
            <p className={s.tripBlurb} style={{ marginTop: 14, fontSize: 15 }}>
              A {stay.type.toLowerCase()} in {stay.city}, inspected in the last six months
              and rated by {stay.reviews} yatris who actually stayed. Your guide knows the
              owners.
            </p>
          </div>

          <div className={`${s.panelFrame} ${s.panelFramePeacock}`}>
            <div className={s.panelInner}>
              <h2>What&apos;s here</h2>
              <ul className={s.includes}>
                {stay.amenities.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </div>

          {nearby.length > 0 ? (
            <div className={s.card}>
              <h2>Yatras that stay here</h2>
              <div className={s.chipRow}>
                {nearby.map((d) => (
                  <Link key={d.id} className={s.chip} href={`/book/trip/${d.id}`}>
                    {d.title}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          {alsoHere.length > 0 ? (
            <div className={s.card}>
              <h2>Also in {stay.region}</h2>
              <div className={s.chipRow}>
                {alsoHere.map((st) => (
                  <Link key={st.id} className={s.chip} href={`/book/stays/${st.id}`}>
                    {st.title}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className={s.stack}>
          <div className={`${s.card} ${s.summary}`}>
            <h2>Nightly rate</h2>
            <div className={s.summaryTotal}>
              <b>{inr(stay.pricePerNight)}</b>
              <span>per night, per room</span>
            </div>

            {inFlow ? (
              <>
                <dl className={s.summaryRows} style={{ marginTop: 16 }}>
                  <div>
                    <dt>Your {draft?.style} rate covers</dt>
                    <dd>{inr(tier)}/night</dd>
                  </div>
                  <div>
                    <dt>
                      {nights} {nights === 1 ? "night" : "nights"}
                    </dt>
                    <dd>{upgrade === 0 ? "Included" : `+${inr(upgrade)}`}</dd>
                  </div>
                </dl>
                <p className={s.fieldHint} style={{ marginTop: 10 }}>
                  {upgrade === 0
                    ? "Nothing extra to pay — this one sits inside your travel style."
                    : "You only pay the difference above what your style already covers."}
                </p>
                <div style={{ marginTop: 16 }}>
                  <button type="button" className={s.btn} onClick={choose}>
                    {draft?.stayId === stay.id ? "Chosen ✓" : "Choose this stay →"}
                  </button>
                </div>
              </>
            ) : (
              <p className={s.fieldHint} style={{ marginTop: 14 }}>
                Pick a yatra first and we&apos;ll show what this costs on top of your
                travel style — often nothing.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className={s.actions}>
        <Link className={s.btnGhost} href="/book/stays">
          ← All stays
        </Link>
        {inFlow ? (
          <Link className={s.btnGhost} href="/book/details">
            Skip — pick a stay for me →
          </Link>
        ) : (
          <Link className={s.btn} href="/book">
            Find a yatra →
          </Link>
        )}
      </div>
    </BookingShell>
  );
}
