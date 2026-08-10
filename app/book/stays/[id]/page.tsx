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
import {
  HOUSE_RULES,
  STAY_STANDARD,
  describeStay,
  groupAmenities,
  toneFor,
} from "@/components/booking/stayDetail";
import StayGallery from "@/components/booking/StayGallery";
import { photosFor } from "@/components/booking/stayPhotos";
import s from "@/components/booking/booking.module.css";

const WARLI = ["warli-3", "warli-1", "warli-5", "warli-2", "warli-7", "warli-4", "warli-6"];

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

  const nearby = db.destinations.filter((d) => d.region === stay.region && !d.hidden);
  const alsoHere = db.stays.filter((st) => st.region === stay.region && st.id !== stay.id);
  const written = db.reviews.filter((r) => r.stayId === stay.id && r.status === "published");
  const groups = groupAmenities(stay.amenities);
  const photos = photosFor(stay);
  const tone = toneFor(stay.type);

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
      {/* Photographs of the area and the kind of stay where we have them;
          otherwise the drawn band, which is never mistakable for a photo. */}
      {photos.length > 0 ? (
        <StayGallery photos={photos} kind={stay.type} />
      ) : (
        <div
          className={`${s.stayBanner} ${s[`tone${tone[0].toUpperCase()}${tone.slice(1)}`]}`}
        >
          <div className={s.stayBannerInner}>
            <span className={s.stayType}>{stay.type}</span>
            <p className={s.stayBannerCity}>
              {stay.city} · {stay.region}
            </p>
          </div>
          <div className={s.stayBannerSky} aria-hidden="true">
            {WARLI.map((name, i) => (
              <span
                key={i}
                className={s.stayBannerMonument}
                style={{
                  maskImage: `url(/figma/${name}.svg)`,
                  WebkitMaskImage: `url(/figma/${name}.svg)`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className={s.split}>
        <div className={s.stack}>
          <div className={s.card}>
            <div className={s.stayHead}>
              <span className={s.tripRating}>
                <span className={s.tripStars} aria-hidden="true">
                  {stars(stay.rating)}
                </span>{" "}
                <b>{stay.rating}</b> from {stay.reviews} yatris
              </span>
              {stay.verified ? <span className={s.stayVerified}>✦ Verified</span> : null}
            </div>
            <p className={s.tripBlurb} style={{ marginTop: 12, fontSize: 15 }}>
              {describeStay(stay)}
            </p>
          </div>

          <div className={`${s.panelFrame} ${s.panelFramePeacock}`}>
            <div className={s.panelInner}>
              <h2>What&apos;s here</h2>
              <div className={s.amenityGroups}>
                {groups.map((g) => (
                  <div key={g.title}>
                    <h3 className={s.amenityGroupTitle}>{g.title}</h3>
                    <ul className={s.includes}>
                      {g.items.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={s.card}>
            <h2>What every Deshatan stay clears</h2>
            <ul className={s.includes}>
              {STAY_STANDARD.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>

          <div className={s.card}>
            <h2>Reviews</h2>
            {written.length > 0 ? (
              <div className={s.reviewList}>
                {written.map((r) => (
                  <blockquote key={r.id} className={s.review}>
                    <span className={s.tripStars} aria-hidden="true">
                      {stars(r.rating)}
                    </span>
                    <p>{r.text}</p>
                  </blockquote>
                ))}
              </div>
            ) : (
              /* honest: the headline number is post-trip ratings, which is not
                 the same thing as written reviews, and we have none yet */
              <p className={s.tripBlurb} style={{ margin: 0 }}>
                No written reviews yet. The <b>{stay.rating}</b> average comes from{" "}
                {stay.reviews} post-trip ratings — yatris rate every stay, and only some
                write. Reviews appear here as they are published.
              </p>
            )}
          </div>

          <div className={s.card}>
            <h2>House rules</h2>
            <dl className={s.summaryRows}>
              {HOUSE_RULES.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd style={{ fontSize: 14 }}>{v}</dd>
                </div>
              ))}
            </dl>
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
                    {st.title} · {inr(st.pricePerNight)}
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
                      {nights} {nights === 1 ? "night" : "nights"} here
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
              <>
                <dl className={s.summaryRows} style={{ marginTop: 16 }}>
                  <div>
                    <dt>Included from</dt>
                    <dd style={{ fontSize: 14 }}>
                      {stay.pricePerNight <= INCLUDED_NIGHTLY.backpacker
                        ? "Backpacker"
                        : stay.pricePerNight <= INCLUDED_NIGHTLY.comfort
                          ? "Comfort"
                          : "Heritage"}
                    </dd>
                  </div>
                  <div>
                    <dt>Kind</dt>
                    <dd style={{ fontSize: 14 }}>{stay.type}</dd>
                  </div>
                </dl>
                <p className={s.fieldHint} style={{ marginTop: 10 }}>
                  Pick a yatra and this is covered from that travel style up — often at no
                  extra cost.
                </p>
                <div style={{ marginTop: 16 }}>
                  <Link className={s.btn} href="/book">
                    Find a yatra →
                  </Link>
                </div>
              </>
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
        ) : null}
      </div>
    </BookingShell>
  );
}
