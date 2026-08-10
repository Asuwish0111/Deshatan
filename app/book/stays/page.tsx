"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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

type Sort = "recommended" | "cheapest" | "rated";

const SORTS: { key: Sort; label: string }[] = [
  { key: "recommended", label: "Most reviewed" },
  { key: "cheapest", label: "Cheapest first" },
  { key: "rated", label: "Best rated" },
];

export default function StaysPage() {
  const router = useRouter();
  const { db } = useDeshatan();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [region, setRegion] = useState("All");
  const [type, setType] = useState("All");
  const [maxNight, setMaxNight] = useState("");
  const [sort, setSort] = useState<Sort>("recommended");

  useEffect(() => {
    const d = loadDraft();
    setDraft(d);
    // in a booking, default the region filter to where the trip actually goes
    if (d?.destId) {
      const dest = undefined;
      void dest;
    }
  }, []);

  const stays = db?.stays ?? [];
  const dest = db?.destinations.find((d) => d.id === draft?.destId);

  // once the trip resolves, narrow to its region the first time
  const [seeded, setSeeded] = useState(false);
  useEffect(() => {
    if (dest && !seeded && region === "All") {
      if (stays.some((st) => st.region === dest.region)) setRegion(dest.region);
      setSeeded(true);
    }
  }, [dest, seeded, region, stays]);

  const regions = useMemo(
    () => ["All", ...Array.from(new Set(stays.map((st) => st.region)))],
    [stays],
  );
  const types = useMemo(
    () => ["All", ...Array.from(new Set(stays.map((st) => st.type)))],
    [stays],
  );

  const results = useMemo(() => {
    const cap = Number(maxNight) || Infinity;
    const list = stays.filter((st) => {
      if (region !== "All" && st.region !== region) return false;
      if (type !== "All" && st.type !== type) return false;
      return st.pricePerNight <= cap;
    });
    return [...list].sort((a, b) => {
      if (sort === "cheapest") return a.pricePerNight - b.pricePerNight;
      if (sort === "rated") return b.rating - a.rating;
      return b.reviews - a.reviews;
    });
  }, [stays, region, type, maxNight, sort]);

  const inFlow = !!draft?.destId;
  const nights = draft ? nightsFor(draft.days) : 0;
  const tier = draft ? INCLUDED_NIGHTLY[draft.style] : 0;

  const choose = (stayId: string) => {
    if (!draft) return;
    const next = { ...draft, stayId };
    saveDraft(next);
    setDraft(next);
    router.push("/book/details");
  };

  return (
    <BookingShell
      eyebrow="Kahaan Rukein"
      title="Where you'll sleep"
      lede={
        inFlow
          ? `${nights} ${nights === 1 ? "night" : "nights"} on this trip. Anything up to ${inr(tier)} a night is already covered by your ${draft?.style} rate — above that you only pay the difference.`
          : "Havelis, homestays, tea estates and monastery rooms. Every one inspected in the last six months."
      }
      step={inFlow ? "stay" : undefined}
    >
      <div className={s.filters}>
        <div className={s.filterRow}>
          <span className={s.filterLabel} id="stay-region">
            Region
          </span>
          <div className={s.chipRow} role="group" aria-labelledby="stay-region">
            {regions.map((r) => (
              <button
                type="button"
                key={r}
                className={`${s.chip} ${region === r ? s.chipOn : ""}`}
                aria-pressed={region === r}
                onClick={() => setRegion(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className={s.filterRow}>
          <span className={s.filterLabel} id="stay-type">
            Kind of stay
          </span>
          <div className={s.chipRow} role="group" aria-labelledby="stay-type">
            {types.map((t) => (
              <button
                type="button"
                key={t}
                className={`${s.chip} ${type === t ? s.chipOn : ""}`}
                aria-pressed={type === t}
                onClick={() => setType(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className={s.searchRow}>
          <div className={s.field} style={{ flex: "0 1 230px" }}>
            <label htmlFor="pn">Max ₹ per night</label>
            <input
              id="pn"
              type="number"
              min={0}
              step={500}
              placeholder="No limit"
              value={maxNight}
              onChange={(e) => setMaxNight(e.target.value)}
            />
          </div>
          <div className={s.filterRow} style={{ flex: "1 1 260px" }}>
            <span className={s.filterLabel} id="stay-sort">
              Sort by
            </span>
            <div className={s.chipRow} role="group" aria-labelledby="stay-sort">
              {SORTS.map((o) => (
                <button
                  type="button"
                  key={o.key}
                  className={`${s.chip} ${sort === o.key ? s.chipOn : ""}`}
                  aria-pressed={sort === o.key}
                  onClick={() => setSort(o.key)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={s.resultBar} aria-live="polite">
        <span>
          <span className={s.resultCount}>{results.length}</span>{" "}
          {results.length === 1 ? "stay" : "stays"}
          {region !== "All" ? ` in ${region}` : ""}
        </span>
        {region !== "All" || type !== "All" || maxNight ? (
          <button
            type="button"
            className={s.chip}
            onClick={() => {
              setRegion("All");
              setType("All");
              setMaxNight("");
            }}
          >
            Clear filters
          </button>
        ) : null}
      </div>

      {results.length === 0 ? (
        <div className={s.empty}>
          <p>No stays match that yet. Try a wider region or a higher nightly rate.</p>
        </div>
      ) : (
        <div className={s.grid}>
          {results.map((st) => {
            const upgrade = draft ? stayUpgrade(draft, st) : 0;
            const chosen = draft?.stayId === st.id;
            return (
              <article className={s.stayCard} key={st.id}>
                <div className={s.stayHead}>
                  <span className={s.stayType}>{st.type}</span>
                  {st.verified ? <span className={s.stayVerified}>✦ Verified</span> : null}
                </div>
                <h2>{st.title}</h2>
                <p className={s.tripMeta}>
                  {st.city} · {st.region}
                </p>
                <p className={s.tripMeta} style={{ marginTop: 6 }}>
                  <span className={s.tripStars} aria-hidden="true">
                    {stars(st.rating)}
                  </span>{" "}
                  {st.rating} · {st.reviews} reviews
                </p>
                <ul className={s.amenities}>
                  {st.amenities.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
                <div className={s.tripFoot}>
                  <p className={s.tripPrice}>
                    {inr(st.pricePerNight)}
                    <small>per night</small>
                  </p>
                  {inFlow ? (
                    <span className={s.stayDelta}>
                      {upgrade === 0 ? "Included" : `+${inr(upgrade)} for ${nights}n`}
                    </span>
                  ) : null}
                </div>
                <div className={s.stayActions}>
                  <Link className={s.btnGhost} href={`/book/stays/${st.id}`}>
                    View stay
                  </Link>
                  {inFlow ? (
                    <button
                      type="button"
                      className={s.btn}
                      onClick={() => choose(st.id)}
                    >
                      {chosen ? "Chosen ✓" : "Choose"}
                    </button>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {inFlow ? (
        <div className={s.actions}>
          <Link className={s.btnGhost} href="/book/customize">
            ← Back to customise
          </Link>
          <Link className={s.btnGhost} href="/book/details">
            Skip — pick a stay for me →
          </Link>
        </div>
      ) : (
        <div className={s.actions}>
          <Link className={s.btnGhost} href="/book">
            ← All yatras
          </Link>
        </div>
      )}
    </BookingShell>
  );
}
