// Ported from the original single-file prototype, markup unchanged.
export default function Hero() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow"><span className="hindi">Atithi Devo Bhava</span> <span data-i18n="hero.eyebrow.gloss">The guest is god</span></span>
            <h1 data-i18n="hero.h1">Ghoomo poora <span className="hindi">Bharat</span>.<br />One app, one yatra.</h1>
            <p className="lede" data-i18n="hero.lede">Every state, every territory — plus Nepal and Bhutan. Verified guides, trusted drivers, live tracking your family can watch, and a calculator that turns your dream trip into a real number. Sab kuch, ek jagah.</p>
            <div className="hero-ctas">
              <a className="btn red" href="#calculator" data-i18n="hero.cta1">Calculate my dream trip</a>
              <a className="btn" href="#features" data-i18n="hero.cta2">See what's included</a>
            </div>
            <div className="hero-proof">
              <div><b>300+</b><span data-i18n="hero.proof1">destinations covered</span></div>
              <div><b>4.8 ★</b><span data-i18n="hero.proof2">avg. guide rating</span></div>
              <div><b>12,400+</b><span data-i18n="hero.proof3">yatris tracked safely home</span></div>
            </div>
          </div>
          <div className="hero-art">
            <svg viewBox="0 0 800 600" role="img" aria-label="A cusped Mughal arch framing a sunset over the Himalayas, temple silhouettes and backwaters">
              <defs>
                <clipPath id="arch">
                  <path d="M70 600 V310 A50 50 0 0 1 132 226 A50 50 0 0 1 216 162 A50 50 0 0 1 312 114 A42 42 0 0 1 386 88 L400 62 L414 88 A42 42 0 0 1 488 114 A50 50 0 0 1 584 162 A50 50 0 0 1 668 226 A50 50 0 0 1 730 310 V600 Z" />
                </clipPath>
                <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#F7B733" />
                  <stop offset="0.55" stopColor="#EE7A2B" />
                  <stop offset="1" stopColor="#A14834" />
                </linearGradient>
              </defs>
              <g clipPath="url(#arch)">
                <rect width="800" height="600" fill="url(#sky)" />
                <circle cx="400" cy="208" r="70" fill="#F6EDD9" opacity="0.92" />
                <circle cx="400" cy="208" r="86" fill="none" stroke="#F6EDD9" strokeWidth="3" opacity="0.5" />
                <path d="M40 390 L180 258 L280 348 L400 238 L520 358 L640 268 L780 398 L780 600 L40 600 Z" fill="#3A4A85" opacity="0.5" />
                <path d="M20 448 L160 328 L260 418 L390 308 L510 428 L630 338 L790 458 L790 600 L20 600 Z" fill="#2B355D" />
                <g fill="#14092E">
                  <path d="M330 600 V470 H470 V600 Z" />
                  <path d="M360 470 L400 352 L440 470 Z" />
                  <rect x="393" y="332" width="14" height="26" />
                  <circle cx="400" cy="328" r="8" />
                  <path d="M250 600 V500 H320 V600 Z" />
                  <path d="M258 500 Q285 442 312 500 Z" />
                  <path d="M480 600 V500 H550 V600 Z" />
                  <path d="M488 500 Q515 442 542 500 Z" />
                </g>
                <rect x="0" y="542" width="800" height="58" fill="#23695B" />
                <g stroke="#F6EDD9" strokeWidth="2" opacity="0.4">
                  <path d="M120 562 h60 M300 577 h80 M540 564 h64 M660 582 h50" />
                </g>
                <g stroke="#14092E" strokeWidth="3" fill="none" strokeLinecap="round">
                  <path d="M250 178 q10 -12 20 0 q10 -12 20 0" />
                  <path d="M560 148 q8 -10 16 0 q8 -10 16 0" />
                </g>
              </g>
              <path d="M70 600 V310 A50 50 0 0 1 132 226 A50 50 0 0 1 216 162 A50 50 0 0 1 312 114 A42 42 0 0 1 386 88 L400 62 L414 88 A42 42 0 0 1 488 114 A50 50 0 0 1 584 162 A50 50 0 0 1 668 226 A50 50 0 0 1 730 310 V600 Z" fill="none" stroke="#26190E" strokeWidth="6" />
            </svg>
            <div className="garland-row" aria-hidden="true"></div>
          </div>
        </div>
      </section>    </>
  );
}
