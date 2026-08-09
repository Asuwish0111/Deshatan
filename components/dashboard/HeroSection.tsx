import Link from "next/link";
import s from "./dashboard.module.css";

const PROOF = [
  { figure: "2,600+", label: "Verified guides" },
  { figure: "50,000+", label: "Safe stays" },
  { figure: "₹25L+", label: "Trips booked" },
];

// the same silhouettes the frieze band uses, laid out as a horizon line
const HORIZON: [string, number, number][] = [
  ["warli-6", 28.577, 59.673],
  ["warli-4", 75.455, 54.677],
  ["warli-3", 103.285, 63.616],
  ["warli-5", 45.976, 61.2],
  ["warli-1", 76.374, 49.117],
  ["warli-2", 50.502, 72.6],
  ["warli-7", 97.702, 54.678],
  ["warli-4", 75.455, 54.677],
  ["warli-6", 28.577, 59.673],
  ["warli-3", 103.285, 63.616],
  ["warli-1", 76.374, 49.117],
  ["warli-5", 45.976, 61.2],
  ["warli-7", 97.702, 54.678],
  ["warli-6", 28.577, 59.673],
  ["warli-4", 75.455, 54.677],
  ["warli-2", 50.502, 72.6],
];

export default function HeroSection() {
  return (
    <section className={s.hero} id="top">
      <div className={s.heroInner}>
        <p className={s.eyebrow}>
          <span className={s.eyebrowBar} aria-hidden="true" />
          <span className={s.eyebrowWord}>Ghoomo Poora Bharat</span>
          <span className={s.eyebrowBar} aria-hidden="true" />
        </p>

        <h1 className={s.heroTitle}>
          Explore all of India
          <span className={s.heroTitleAccent}>&amp; just beyond it.</span>
        </h1>

        <p className={s.heroLede}>
          Carefully curated journeys across 28 states, 8 union territories, Nepal and
          Bhutan. Local guides, verified stays, live tracking. Dream bigger.
        </p>

        <div className={s.heroCtas}>
          <Link className={s.heroCtaPrimary} href="/book/search">
            Start exploring
          </Link>
          <Link className={s.heroCtaGhost} href="#showcase">
            See where we go
          </Link>
        </div>

        <dl className={s.heroProof}>
          {PROOF.map((item) => (
            <div key={item.label}>
              <dt>{item.figure}</dt>
              <dd>{item.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={s.heroHorizon} aria-hidden="true">
        <div className={s.heroHorizonRow}>
          {HORIZON.map(([name, width, height], i) => (
            <span
              key={`${name}-${i}`}
              className={s.heroMonument}
              style={{
                width: `${width}px`,
                height: `${height}px`,
                maskImage: `url(/figma/${name}.svg)`,
                WebkitMaskImage: `url(/figma/${name}.svg)`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
