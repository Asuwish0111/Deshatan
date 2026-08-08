import s from "./dashboard.module.css";

const STYLES = ["Backpacker", "Comfort", "Heritage Royal"];
const ACTIVE_STYLE = "Comfort";

const REGIONS = [
  "Himalayas",
  "Rajasthan",
  "Deep South",
  "Nepal & Bhutan",
  "Seaside",
  "Offbeat location",
  "Trek location",
];
const ACTIVE_REGION = "Himalayas";

const BREAKDOWN = [
  { label: "Stay", value: "₹31,185" },
  { label: "Travel + driver", value: "₹24,255" },
  { label: "Guide + experiences", value: "₹13,860" },
];

export default function CalculatorSection() {
  return (
    <section className={s.calculator} id="calculator">
      <div className={s.calculatorInner}>
        <div className={s.calcCopy}>
          <p className={s.eyebrow}>
            <span className={s.eyebrowBar} aria-hidden="true" />
            <span className={s.eyebrowWord}>Kahaan-Kahaan</span>
            <span className={s.eyebrowBar} aria-hidden="true" />
          </p>
          <div className={s.calcCopyBody}>
            <div className={s.calcCopyText}>
              <h2>Your dream trip has a number. Find it in thirty seconds.</h2>
              <p>
                Pick your days, your people, your style and your region. The calculator
                prices real stays, real drivers and real guides — not a marketing estimate.
                Move a slider, watch the rupees move.
              </p>
            </div>
            <p className={s.calcNote}>
              <span className={s.calcNoteLead}>Budget sorting, built in:</span> once you have
              your number, every itinerary we show you is sorted against it — under budget
              first, always.
            </p>
          </div>
        </div>

        <div className={s.calcCard}>
          <div className={s.calcCardHead}>
            <h3>Sapno ka Calculator</h3>
            <span className={s.calcLive}>live estimate</span>
          </div>

          <div className={s.calcField}>
            <p className={s.calcLabel}>Search your destination</p>
            <div className={s.calcSearch}>
              <span className={s.calcInput}>Manali, Kerala backwaters, Rajasthan…</span>
              <span className={s.calcSearchBtn}>Search</span>
            </div>
          </div>

          <div className={s.calcSlider}>
            <div className={s.calcSliderLabel}>
              <span className={s.calcLabel}>Days on the road</span>
              <span className={s.calcOutput}>7 din</span>
            </div>
            <div className={s.calcTrack}>
              <span />
            </div>
          </div>

          <div className={s.calcSlider}>
            <div className={s.calcSliderLabel}>
              <span className={s.calcLabel}>Travellers</span>
              <span className={s.calcOutput}>2 log</span>
            </div>
            <div className={s.calcTrack}>
              <span />
            </div>
          </div>

          <div className={s.calcField}>
            <p className={s.calcLabel}>Travel style</p>
            <div className={s.calcChoices}>
              {STYLES.map((style) => (
                <span
                  className={`${s.calcChoice} ${style === ACTIVE_STYLE ? s.calcChoiceOn : ""}`}
                  key={style}
                >
                  {style}
                </span>
              ))}
            </div>
          </div>

          <div className={s.calcField}>
            <p className={s.calcLabel}>Region</p>
            <div className={s.calcChoices}>
              {REGIONS.map((region) => (
                <span
                  className={`${s.calcChoice} ${region === ACTIVE_REGION ? s.calcChoiceOn : ""}`}
                  key={region}
                >
                  {region}
                </span>
              ))}
            </div>
          </div>

          <div className={s.calcEstimate}>
            <p className={s.calcTotal}>₹69,300</p>
            <p className={s.calcPerPerson}>≈ ₹34,650 per person, sab kuch included</p>
            <div className={s.calcBreakdown}>
              {BREAKDOWN.map((row) => (
                <div key={row.label}>
                  <p className={s.calcBreakLabel}>{row.label}</p>
                  <p className={s.calcBreakValue}>{row.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={s.calcCta}>
            <span className={s.calcCtaBtn}>Like this number? Start a real booking →</span>
          </div>
        </div>
      </div>
    </section>
  );
}
