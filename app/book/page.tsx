"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useMemo } from "react";
import { useDeshatan } from "@/lib/context";
import BookingShell from "@/components/booking/BookingShell";
import { TRIP_ALT, TRIP_PHOTOS, inr, stars } from "@/components/booking/trips";
import { emptyDraft, estimateFor, loadDraft, saveDraft } from "@/components/booking/draft";
import s from "@/components/booking/booking.module.css";

type Sort = "booked" | "cheapest" | "rated" | "shortest";

const SORTS: { key: Sort; label: string }[] = [
  { key: "booked", label: "Most booked" },
  { key: "cheapest", label: "Cheapest first" },
  { key: "rated", label: "Best rated" },
  { key: "shortest", label: "Shortest first" },
];

const LENGTHS: { key: string; label: string; test: (d: number) => boolean }[] = [
  { key: "any", label: "Any length", test: () => true },
  { key: "short", label: "Up to 5 days", test: (d) => d <= 5 },
  { key: "week", label: "6–8 days", test: (d) => d >= 6 && d <= 8 },
  { key: "long", label: "9 days +", test: (d) => d >= 9 },
];

const todayISO = () => new Date().toISOString().slice(0, 10);

function FindInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { db } = useDeshatan();

  // the URL is the search: shareable, bookmarkable, and it survives the
  // trip page and the browser's back button
  const q = params.get("q") ?? "";
  const cap = params.get("cap") ?? "";
  const region = params.get("region") ?? "All";
  const length = params.get("len") ?? "any";
  const sort = (params.get("sort") as Sort) ?? "booked";
  const pax = Math.max(1, Number(params.get("pax")) || 2);
  const from = params.get("from") ?? "";

  const setParam = useCallback(
    (patch: Record<string, string>) => {
      const next = new URLSearchParams(params.toString());
      for (const [k, v] of Object.entries(patch)) {
        if (!v || v === "All" || v === "any" || (k === "pax" && v === "2")) next.delete(k);
        else next.set(k, v);
      }
      const qs = next.toString();
      router.replace(qs ? `/book?${qs}` : "/book", { scroll: false });
    },
    [params, router],
  );

  const destinations = useMemo(
    () => (db?.destinations ?? []).filter((d) => !d.hidden),
    [db],
  );

  const regions = useMemo(
    () => ["All", ...Array.from(new Set(destinations.map((d) => d.region)))],
    [destinations],
  );

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const ceiling = Number(cap) || Infinity;
    const lengthTest = LENGTHS.find((l) => l.key === length)?.test ?? (() => true);
    const list = destinations.filter((d) => {
      if (region !== "All" && d.region !== region) return false;
      if (d.priceFrom > ceiling) return false;
      if (!lengthTest(d.days)) return false;
      if (!needle) return true;
      return [d.title, d.region, d.area, d.blurb].join(" ").toLowerCase().includes(needle);
    });
    return [...list].sort((a, b) => {
      if (sort === "cheapest") return a.priceFrom - b.priceFrom;
      if (sort === "rated") return b.rating - a.rating;
      if (sort === "shortest") return a.days - b.days;
      return b.reviews - a.reviews;
    });
  }, [destinations, q, cap, region, length, sort]);

  const active = [q, cap, region !== "All" ? region : "", length !== "any" ? length : ""]
    .filter(Boolean).length;

  const clear = () => router.replace("/book", { scroll: false });

  // carry what they searched into the flow so customise opens on their answers
  const openTrip = (destId: string, days: number) => {
    const draft = loadDraft() ?? emptyDraft(destId, days);
    saveDraft({
      ...draft,
      destId,
      days: draft.destId === destId ? draft.days : days,
      pax,
      travelDate: from || draft.travelDate,
    });
  };

  const loading = !db;

  return (
    <BookingShell
      eyebrow="Kahaan Jaayein"
      title="Find your yatra"
      lede="Every trip here runs with a verified guide, inspected stays and live tracking. Tell us when and who's coming, and the prices below are yours — not a headline rate."
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
              defaultValue={q}
              onChange={(e) => setParam({ q: e.target.value })}
            />
          </div>
          <div className={s.field} style={{ flex: "0 1 170px" }}>
            <label htmlFor="from">Going from</label>
            <input
              id="from"
              type="date"
              min={todayISO()}
              value={from}
              onChange={(e) => setParam({ from: e.target.value })}
            />
          </div>
          <div className={s.field} style={{ flex: "0 1 130px" }}>
            <label htmlFor="pax">Travellers</label>
            <input
              id="pax"
              type="number"
              min={1}
              max={15}
              value={pax}
              onChange={(e) => setParam({ pax: String(Math.max(1, Number(e.target.value) || 1)) })}
            />
          </div>
          <div className={s.field} style={{ flex: "0 1 170px" }}>
            <label htmlFor="cap">Max ₹ per person</label>
            <input
              id="cap"
              type="number"
              min={0}
              step={500}
              placeholder="No limit"
              defaultValue={cap}
              onChange={(e) => setParam({ cap: e.target.value })}
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
                onClick={() => setParam({ region: r })}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className={s.filterRow}>
          <span className={s.filterLabel} id="len-label">
            How long
          </span>
          <div className={s.chipRow} role="group" aria-labelledby="len-label">
            {LENGTHS.map((l) => (
              <button
                type="button"
                key={l.key}
                className={`${s.chip} ${length === l.key ? s.chipOn : ""}`}
                aria-pressed={length === l.key}
                onClick={() => setParam({ len: l.key })}
              >
                {l.label}
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
                onClick={() => setParam({ sort: o.key })}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={s.resultBar} aria-live="polite">
        <span>
          {loading ? (
            "Looking up yatras…"
          ) : (
            <>
              <span className={s.resultCount}>{results.length}</span>{" "}
              {results.length === 1 ? "yatra" : "yatras"}
              {region !== "All" ? ` in ${region}` : " across Bharat and beyond"}
              {pax !== 2 ? ` · priced for ${pax}` : ""}
            </>
          )}
        </span>
        {active > 0 ? (
          <button type="button" className={s.chip} onClick={clear}>
            Clear {active} {active === 1 ? "filter" : "filters"}
          </button>
        ) : null}
      </div>

      {loading ? (
        <div className={s.grid} aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <div className={s.skeletonCard} key={i}>
              <div className={s.skeletonMedia} />
              <div className={s.skeletonBody}>
                <span style={{ width: "70%" }} />
                <span style={{ width: "45%" }} />
                <span style={{ width: "90%" }} />
              </div>
            </div>
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className={s.empty}>
          <p>
            Nothing matches all four filters. The narrowest is usually{" "}
            <b>{region !== "All" ? "the region" : cap ? "the budget" : "the length"}</b> —
            try widening that first.
          </p>
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
                    {inr(estimateFor(d, pax))}
                    <small>
                      for {pax} {pax === 1 ? "person" : "people"} · {d.days} days
                    </small>
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
                  <Link
                    className={s.btn}
                    href={`/book/trip/${d.id}`}
                    onClick={() => openTrip(d.id, d.days)}
                  >
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

export default function BookSearchPage() {
  return (
    <Suspense
      fallback={
        <BookingShell eyebrow="Kahaan Jaayein" title="Find your yatra" step="search">
          <p style={{ textAlign: "center" }}>Looking up yatras…</p>
        </BookingShell>
      }
    >
      <FindInner />
    </Suspense>
  );
}
