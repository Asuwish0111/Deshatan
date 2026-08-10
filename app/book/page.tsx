"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useDeshatan } from "@/lib/context";
import BookingShell from "@/components/booking/BookingShell";
import { TRIP_ALT, TRIP_PHOTOS, inr, stars } from "@/components/booking/trips";
import s from "@/components/booking/booking.module.css";

type Sort = "booked" | "cheapest" | "rated";

const SORTS: { key: Sort; label: string }[] = [
  { key: "booked", label: "Most booked" },
  { key: "cheapest", label: "Cheapest first" },
  { key: "rated", label: "Best rated" },
];

export default function BookSearchPage() {
  const { db } = useDeshatan();
  const [query, setQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [region, setRegion] = useState("All");
  const [sort, setSort] = useState<Sort>("booked");

  const destinations = useMemo(
    () => (db?.destinations ?? []).filter((d) => !d.hidden),
    [db],
  );

  const regions = useMemo(
    () => ["All", ...Array.from(new Set(destinations.map((d) => d.region)))],
    [destinations],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const cap = Number(maxPrice) || Infinity;
    const list = destinations.filter((d) => {
      if (region !== "All" && d.region !== region) return false;
      if (d.priceFrom > cap) return false;
      if (!q) return true;
      return [d.title, d.region, d.area, d.blurb].join(" ").toLowerCase().includes(q);
    });
    return list.sort((a, b) => {
      if (sort === "cheapest") return a.priceFrom - b.priceFrom;
      if (sort === "rated") return b.rating - a.rating;
      return b.reviews - a.reviews;
    });
  }, [destinations, query, maxPrice, region, sort]);

  const clear = () => {
    setQuery("");
    setMaxPrice("");
    setRegion("All");
  };

  const filtered = query.trim() !== "" || maxPrice !== "" || region !== "All";

  return (
    <BookingShell
      eyebrow="Kahaan Jaayein"
      title="Find your yatra"
      lede="Every trip here runs with a verified guide, inspected stays and live tracking. Filter by where you want to go and what you want to spend."
      step="search"
    >
      <div className={s.filters}>
        <div className={s.searchRow}>
          <div className={s.field}>
            <label htmlFor="q">Search destinations</label>
            <input
              id="q"
              type="search"
              placeholder="Manali, backwaters, monastery…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className={s.field} style={{ flex: "0 1 210px" }}>
            <label htmlFor="cap">Max ₹ per person</label>
            <input
              id="cap"
              type="number"
              min={0}
              step={500}
              placeholder="No limit"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        <div className={s.filterRow}>
          <span className={s.filterLabel} id="region-label">
            Region
          </span>
          <div className={s.chipRow} role="group" aria-labelledby="region-label">
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
          <span className={s.filterLabel} id="sort-label">
            Sort by
          </span>
          <div className={s.chipRow} role="group" aria-labelledby="sort-label">
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

      <div className={s.resultBar} aria-live="polite">
        <span>
          <span className={s.resultCount}>{results.length}</span>{" "}
          {results.length === 1 ? "yatra" : "yatras"}
          {region !== "All" ? ` in ${region}` : " across Bharat and beyond"}
        </span>
        {filtered ? (
          <button type="button" className={s.chip} onClick={clear}>
            Clear filters
          </button>
        ) : null}
      </div>

      {results.length === 0 ? (
        <div className={s.empty}>
          <p>Nothing matches that yet. Try a wider region or a higher budget.</p>
          <button type="button" className={s.btnGhost} onClick={clear}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className={s.grid}>
          {results.map((d) => (
            <article className={s.tripCard} key={d.id}>
              <div className={s.tripMedia}>
                {TRIP_PHOTOS[d.id] ? (
                  <Image
                    src={TRIP_PHOTOS[d.id]}
                    alt={TRIP_ALT[d.id] ?? d.title}
                    width={800}
                    height={543}
                    sizes="(max-width: 700px) 100vw, (max-width: 1160px) 45vw, 300px"
                  />
                ) : null}
                <span className={s.tripRegion}>{d.region}</span>
              </div>
              <div className={s.tripBody}>
                <h2>{d.title}</h2>
                <p className={s.tripMeta}>
                  {d.days} days · {d.area}
                </p>
                <p className={s.tripBlurb}>{d.blurb}</p>
                <div className={s.tripFoot}>
                  <p className={s.tripPrice}>
                    {inr(d.priceFrom)}
                    <small>per person, from</small>
                  </p>
                  <span className={s.tripRating}>
                    <span className={s.tripStars} aria-hidden="true">
                      {stars(d.rating)}
                    </span>
                    <br />
                    {d.rating} · {d.reviews} reviews
                  </span>
                </div>
                <div style={{ marginTop: 14 }}>
                  <Link className={s.btn} href={`/book/trip/${d.id}`}>
                    View trip
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </BookingShell>
  );
}
