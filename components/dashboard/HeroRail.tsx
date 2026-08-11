"use client";

import Link from "next/link";
import Image from "next/image";
import { useDeshatan } from "@/lib/context";
import { TRIP_ALT, TRIP_PHOTOS, inr } from "@/components/booking/trips";
import s from "./dashboard.module.css";

/* The hero showed no product at all — a travel page whose first photograph sat
   two screens down. These are the four most-booked yatras, real prices, and
   they go straight to the trip. */
export default function HeroRail() {
  const { db } = useDeshatan();

  const top = (db?.destinations ?? [])
    .filter((d) => !d.hidden && TRIP_PHOTOS[d.id])
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 4);

  if (top.length === 0) return null;

  return (
    <div className={s.heroRail}>
      <p className={s.heroRailLead}>Most booked this season</p>
      <ul className={s.heroRailList}>
        {top.map((d) => (
          <li key={d.id}>
            <Link className={s.heroRailCard} href={`/book/trip/${d.id}`}>
              <span className={s.heroRailMedia}>
                <Image
                  src={TRIP_PHOTOS[d.id]}
                  alt={TRIP_ALT[d.id] ?? d.title}
                  width={400}
                  height={260}
                  sizes="160px"
                />
              </span>
              <span className={s.heroRailName}>{d.title}</span>
              <span className={s.heroRailMeta}>
                {d.days} days · <b>{inr(d.priceFrom)}</b>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
