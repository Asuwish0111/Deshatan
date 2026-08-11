"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDeshatan } from "@/lib/context";
import s from "./dashboard.module.css";

type Hit = {
  kind: "trip" | "stay" | "region";
  id: string;
  label: string;
  meta: string;
  href: string;
};

/* Free-text prompts rather than destination names — they teach the box what it
   can take, which is the whole point of the pattern. */
const PROMPTS = [
  "Monasteries in Spiti",
  "Kerala backwaters",
  "Char Dham",
  "A beach that isn't Goa",
];

const GROUP_LABEL: Record<Hit["kind"], string> = {
  trip: "Yatras",
  stay: "Stays",
  region: "Regions",
};

export default function HeroSearch() {
  const router = useRouter();
  const { db } = useDeshatan();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const hits = useMemo<Hit[]>(() => {
    if (!db) return [];

    /* A whole-string match would mean "monasteries in Spiti" finds nothing,
       which is exactly the phrasing the prompts invite. Score on the words
       that carry meaning instead, and rank by how many land. */
    const STOP = new Set([
      "a", "an", "the", "in", "on", "at", "to", "for", "of", "and", "or",
      "that", "this", "is", "isn't", "not", "somewhere", "some", "any",
      "me", "my", "i", "want", "go", "trip", "near", "with",
    ]);
    const tokens = q
      .toLowerCase()
      .split(/[^\p{L}\p{N}]+/u)
      .filter((w) => w.length > 1 && !STOP.has(w));
    if (!tokens.length) return [];

    const score = (hay: string) => {
      const h = hay.toLowerCase();
      return tokens.reduce((n, w) => n + (h.includes(w) ? 1 : 0), 0);
    };

    const scored: (Hit & { score: number })[] = [];

    for (const d of db.destinations) {
      if (d.hidden) continue;
      const n = score([d.title, d.region, d.area, d.blurb].join(" "));
      if (n)
        scored.push({
          kind: "trip", id: d.id, label: d.title,
          meta: `${d.days} days · ${d.area}`,
          href: `/book/trip/${d.id}`, score: n,
        });
    }
    for (const st of db.stays) {
      const n = score([st.title, st.city, st.region, st.type, ...st.amenities].join(" "));
      if (n)
        scored.push({
          kind: "stay", id: st.id, label: st.title,
          meta: `${st.type} · ${st.city}`,
          href: `/book/stays/${st.id}`, score: n,
        });
    }
    for (const r of Array.from(new Set(db.destinations.map((d) => d.region)))) {
      const n = score(r);
      if (n)
        scored.push({
          kind: "region", id: r, label: r,
          meta: "Everything in this region",
          href: `/book?region=${encodeURIComponent(r)}`, score: n,
        });
    }

    // best matches first, but keep each kind together once ranked
    scored.sort((a, b) => b.score - a.score);
    const order = { trip: 0, stay: 1, region: 2 };
    const top = scored.slice(0, 7);
    top.sort((a, b) => b.score - a.score || order[a.kind] - order[b.kind]);
    return top;
  }, [q, db]);

  useEffect(() => setActive(0), [q]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  /* Enter with nothing highlighted still has to do something useful, so it
     falls through to the search page rather than dead-ending. */
  const submit = () => {
    if (hits[active]) return go(hits[active].href);
    const term = q.trim();
    go(term ? `/book?q=${encodeURIComponent(term)}` : "/book");
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
      return;
    }
    if (!hits.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => (a + 1) % hits.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => (a - 1 + hits.length) % hits.length);
    }
  };

  const showList = open && hits.length > 0;
  let lastKind: Hit["kind"] | null = null;

  return (
    <div className={s.heroSearch} ref={wrap}>
      <div className={s.heroSearchBar}>
        <span className={s.heroSearchIcon} aria-hidden="true">
          <img src="/brand/search.svg" alt="" width={22} height={22} />
        </span>

        <input
          ref={input}
          className={s.heroSearchInput}
          type="text"
          role="combobox"
          aria-expanded={showList}
          aria-controls="hero-search-list"
          aria-autocomplete="list"
          aria-activedescendant={showList ? `hero-hit-${active}` : undefined}
          aria-label="Search yatras, stays and regions"
          placeholder="Where do you want to go?"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
        />

        <button
          type="button"
          className={s.heroSearchGo}
          aria-label="Search"
          onClick={submit}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      {showList ? (
        <ul className={s.heroSearchList} id="hero-search-list" role="listbox">
          {hits.map((hit, i) => {
            const head = hit.kind !== lastKind ? GROUP_LABEL[hit.kind] : null;
            lastKind = hit.kind;
            return (
              <li key={hit.kind + hit.id} role="none">
                {head ? (
                  <p className={s.heroSearchGroup} role="presentation">
                    {head}
                  </p>
                ) : null}
                <button
                  type="button"
                  id={`hero-hit-${i}`}
                  role="option"
                  aria-selected={i === active}
                  className={`${s.heroSearchHit} ${i === active ? s.heroSearchHitOn : ""}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(hit.href)}
                >
                  <span className={s.heroSearchHitLabel}>{hit.label}</span>
                  <span className={s.heroSearchHitMeta}>{hit.meta}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

      {!showList ? (
        <div className={s.heroPrompts}>
          <span className={s.heroPromptsLead}>Try</span>
          {PROMPTS.map((p) => (
            <button
              type="button"
              key={p}
              className={s.heroPrompt}
              onClick={() => {
                setQ(p);
                setOpen(true);
                input.current?.focus();
              }}
            >
              {p}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
