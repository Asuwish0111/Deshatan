// Ported from the original single-file prototype, markup unchanged.
export default function FinalCTA() {
  return (
    <>
      <section className="final">
        <div className="final-glow" aria-hidden="true"></div>
        <svg className="mandala-mark" viewBox="0 0 200 200" aria-hidden="true">
          <defs>
            <path id="petal-lg" d="M100 22 C122 48 122 72 100 88 C78 72 78 48 100 22 Z" />
            <path id="petal-md" d="M100 44 C113 58 113 72 100 83 C87 72 87 58 100 44 Z" />
            <path id="petal-sm" d="M100 60 C108 68 108 76 100 82 C92 76 92 68 100 60 Z" />
          </defs>
          <circle cx="100" cy="100" r="93" fill="none" stroke="#CF9E46" strokeWidth="2" strokeDasharray="0.5 9" strokeLinecap="round" opacity="0.4" />
          <g fill="#CF9E46" opacity="0.4">
            <use href="#petal-lg" transform="rotate(0 100 100)" />
            <use href="#petal-lg" transform="rotate(30 100 100)" />
            <use href="#petal-lg" transform="rotate(60 100 100)" />
            <use href="#petal-lg" transform="rotate(90 100 100)" />
            <use href="#petal-lg" transform="rotate(120 100 100)" />
            <use href="#petal-lg" transform="rotate(150 100 100)" />
            <use href="#petal-lg" transform="rotate(180 100 100)" />
            <use href="#petal-lg" transform="rotate(210 100 100)" />
            <use href="#petal-lg" transform="rotate(240 100 100)" />
            <use href="#petal-lg" transform="rotate(270 100 100)" />
            <use href="#petal-lg" transform="rotate(300 100 100)" />
            <use href="#petal-lg" transform="rotate(330 100 100)" />
          </g>
          <g fill="#A14834" opacity="0.38">
            <use href="#petal-md" transform="rotate(15 100 100)" />
            <use href="#petal-md" transform="rotate(60 100 100)" />
            <use href="#petal-md" transform="rotate(105 100 100)" />
            <use href="#petal-md" transform="rotate(150 100 100)" />
            <use href="#petal-md" transform="rotate(195 100 100)" />
            <use href="#petal-md" transform="rotate(240 100 100)" />
            <use href="#petal-md" transform="rotate(285 100 100)" />
            <use href="#petal-md" transform="rotate(330 100 100)" />
          </g>
          <g fill="#23695B" opacity="0.3">
            <use href="#petal-sm" transform="rotate(30 100 100)" />
            <use href="#petal-sm" transform="rotate(90 100 100)" />
            <use href="#petal-sm" transform="rotate(150 100 100)" />
            <use href="#petal-sm" transform="rotate(210 100 100)" />
            <use href="#petal-sm" transform="rotate(270 100 100)" />
            <use href="#petal-sm" transform="rotate(330 100 100)" />
          </g>
          <circle cx="100" cy="100" r="9" fill="#D8BC7B" opacity="0.7" />
          <circle cx="100" cy="100" r="9" fill="none" stroke="#A14834" strokeWidth="1.5" opacity="0.4" />
        </svg>
        <div className="wrap reveal">
          <div className="diya-wrap">
            <svg className="diya" viewBox="0 0 40 40" aria-hidden="true">
              <path className="flame" d="M20 4 C24 10 24 15 20 18 C16 15 16 10 20 4 Z" fill="#CF9E46" />
              <ellipse cx="20" cy="22" rx="14" ry="4" fill="#A14834" stroke="#26190E" strokeWidth="2.5" />
              <path d="M8 22 Q8 30 20 30 Q32 30 32 22" fill="none" stroke="#26190E" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="final-flourish">
            <svg className="paisley-flourish" viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2C7 2 3 7 4 13c.6 3.8 3.6 6.5 7.2 7.4 1.6.4 2.8-1.2 1.8-2.6-1-1.4-2.6-1.6-3.8-2.8C7.5 13.4 7 11 8.4 9c1.6-2.3 4.6-2.6 6.8-1.2 2.8 1.8 3.4 5.6 1.4 8.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            <div className="hindi-big" data-i18n="final.hindiBig">Chalo, Nikalte Hain?</div>
            <svg className="paisley-flourish flip" viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2C7 2 3 7 4 13c.6 3.8 3.6 6.5 7.2 7.4 1.6.4 2.8-1.2 1.8-2.6-1-1.4-2.6-1.6-3.8-2.8C7.5 13.4 7 11 8.4 9c1.6-2.3 4.6-2.6 6.8-1.2 2.8 1.8 3.4 5.6 1.4 8.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </div>
          <h2 data-i18n="final.h2">The whole map is waiting.</h2>
          <p className="final-sub" data-i18n="final.sub">From your first search to the last selfie — real guides, real drivers, real peace of mind.</p>
          <div className="final-ctas">
            <a className="btn red" href="/book" data-i18n="final.cta1">Calculate my dream trip</a>
            <a className="btn" href="/book" data-i18n="final.cta2">Browse all 300+ destinations</a>
          </div>
          <div className="final-trust">
            <div><b>300+</b><span data-i18n="hero.proof1">destinations covered</span></div>
            <div><b>4.8 ★</b><span data-i18n="hero.proof2">avg. guide rating</span></div>
            <div><b>12,400+</b><span data-i18n="hero.proof3">yatris tracked safely home</span></div>
          </div>
        </div>
      </section>    </>
  );
}
