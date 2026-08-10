"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useDeshatan } from "@/lib/context";
import BookingShell from "@/components/booking/BookingShell";
import {
  TRIP_ALT,
  TRIP_PHOTOS,
  includesFor,
  inr,
  itineraryFor,
  stars,
} from "@/components/booking/trips";
import { STYLE_OPTIONS } from "@/lib/constants";
import s from "@/components/booking/booking.module.css";

export default function TripPage() {
  const params = useParams<{ id: string }>();
  const { db } = useDeshatan();
  const id = params?.id;

  const dest = db?.destinations.find((d) => d.id === id);

  if (!db) {
    return (
      <BookingShell eyebrow="Ek Minute" title="Loading your trip…">
        <p style={{ textAlign: "center" }}>Fetching the itinerary.</p>
      </BookingShell>
    );
  }

  if (!dest) {
    return (
      <BookingShell
        eyebrow="Raasta Nahin Mila"
        title="We can't find that yatra"
        lede="The link may be old, or the trip may have been retired for the season."
      >
        <div className={s.empty}>
          <p>Have a look at everything currently running instead.</p>
          <Link className={s.btn} href="/book">
            Back to search
          </Link>
        </div>
      </BookingShell>
    );
  }

  const guide = db.guides.find((g) => g.city && dest.area.includes(g.city)) ?? db.guides[0];
  const comfort = STYLE_OPTIONS.find((o) => o.key === "comfort");
  const itinerary = itineraryFor(dest);

  return (
    <BookingShell eyebrow="Yeh Rahi Yatra" title={dest.title} step="trip" titleAs="p">
      <div className={s.tripHero}>
        <div className={s.tripHeroMedia}>
          {TRIP_PHOTOS[dest.id] ? (
            <Image
              src={TRIP_PHOTOS[dest.id]}
              alt={TRIP_ALT[dest.id] ?? dest.title}
              width={800}
              height={543}
              sizes="(max-width: 900px) 100vw, 640px"
              priority
            />
          ) : null}
        </div>

        <div className={s.tripHeroCopy}>
          <span className={s.tripRegion} style={{ position: "static", display: "inline-block" }}>
            {dest.region}
          </span>
          <h1>{dest.title}</h1>
          <p className={s.tripBlurb} style={{ fontSize: 16, lineHeight: "27px" }}>
            {dest.blurb}
          </p>
          <div className={s.tripFacts}>
            <span>
              <b>{dest.days} days</b> on the road
            </span>
            <span>
              <b>{dest.area}</b>
            </span>
            <span>
              <span className={s.tripStars} aria-hidden="true">
                {stars(dest.rating)}
              </span>{" "}
              <b>{dest.rating}</b> · {dest.reviews} reviews
            </span>
          </div>

          <div className={s.summaryTotal} style={{ marginTop: 20 }}>
            <b>{inr(dest.priceFrom)}</b>
            <span>per person, from · {dest.days} days</span>
          </div>

          <div className={s.actions} style={{ marginTop: 20, paddingTop: 20 }}>
            <Link className={s.btnGhost} href="/book">
              ← All yatras
            </Link>
            <Link className={s.btn} href={`/book/customize?dest=${dest.id}`}>
              Customise this trip →
            </Link>
          </div>
        </div>
      </div>

      <div className={s.split}>
        <div className={s.stack}>
          <div className={s.card}>
            <h2>Day by day</h2>
            <ol className={s.itinerary}>
              {itinerary.map((day, i) => (
                <li key={i}>
                  <b>{day.title}</b>
                  <span>{day.body}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className={`${s.panelFrame} ${s.panelFramePeacock}`}>
            <div className={s.panelInner}>
              <h2>What&apos;s included</h2>
              <ul className={s.includes}>
                {includesFor(dest).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={s.stack}>
          {guide ? (
            <div className={`${s.panelFrame} ${s.panelFrameIndigo}`}>
              <div className={s.panelInner}>
                <h2>Your guide</h2>
                <p style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>{guide.name}</p>
                <p className={s.tripMeta} style={{ marginTop: 4 }}>
                  {guide.city} · {guide.languages.join(", ")}
                </p>
                <p className={s.tripMeta} style={{ marginTop: 8 }}>
                  <span className={s.tripStars} aria-hidden="true">
                    {stars(guide.rating)}
                  </span>{" "}
                  {guide.rating} · {guide.reviews} reviews
                  {guide.verified ? " · ID verified" : ""}
                </p>
              </div>
            </div>
          ) : null}

          <div className={s.card}>
            <h2>Good to know</h2>
            <dl className={s.summaryRows}>
              <div>
                <dt>Base style</dt>
                <dd>{comfort?.label ?? "Comfort"}</dd>
              </div>
              <div>
                <dt>Group size</dt>
                <dd>2–15</dd>
              </div>
              <div>
                <dt>Live tracking</dt>
                <dd>Included</dd>
              </div>
              <div>
                <dt>Cancellation</dt>
                <dd>Free to 14 days</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </BookingShell>
  );
}
