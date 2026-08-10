"use client";

import { useCopy } from "@/lib/copy";
import s from "./dashboard.module.css";

const POINTS: [string, string][] = [
  [
    "Live route sharing",
    " — parents in Hyderabad watch your bus climb to Leh, turn by turn.",
  ],
  [
    "Driver & guide on the card",
    " — name, photo, rating and plate number visible to whoever you share with.",
  ],
  [
    "Auto check-ins",
    ' — reached the hotel? Family gets a gentle ping. No "pahunch gaye?" calls needed.',
  ],
  [
    "Works with the offline safety map",
    " — last known location stays visible even when your signal drops.",
  ],
];

export default function LiveTrackerSection() {
  const { line } = useCopy();

  return (
    <section className={s.tracker} id="tracker">
      <div className={s.trackerInner}>
        <div className={s.trackerCopy}>
          <p className={`${s.eyebrow} ${s.eyebrowOnDark}`}>
            <span className={s.eyebrowBar} aria-hidden="true" />
            <span className={s.eyebrowWord}>{line("tracker.head", "Live Tracker")}</span>
            <span className={s.eyebrowCaps}>Live yatra tracker</span>
            <span className={s.eyebrowBar} aria-hidden="true" />
          </p>

          <h2 className={s.trackerTitle}>
            Ghar waale dekh sakte hain — you&apos;re moving, you&apos;re safe.
          </h2>

          <p className={s.trackerLede}>
            Share one link with family. They see your live route, your driver&apos;s name
            and rating, your next stop and your ETA — updated every minute of the journey.
          </p>

          <ul className={s.trackerList}>
            {POINTS.map(([lead, rest]) => (
              <li key={lead}>
                <span className={s.trackerBullet} aria-hidden="true" />
                <p>
                  <strong>{lead}</strong>
                  {rest}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Live tracker card: route from Manali to Leh with a moving location dot */}
        <div className={s.trackerCard}>
          <div className={s.trackerCardHead}>
            <p className={s.trackerCardTitle}>Priya&apos;s Yatra · Manali → Leh</p>
            <span className={s.trackerLive}>
              <span className={s.trackerLiveDot} aria-hidden="true" />
              {line("tracker.live", "LIVE")}
            </span>
          </div>

          <div className={s.trackerMap}>
            <img className={s.trackerMapFill} src="/figma/lt-a.svg" alt="" />
            <img className={s.trackerMapGrid} src="/figma/lt-b.svg" alt="" />

            <span className={s.trackerRoute}>
              <img src="/figma/lt-route.svg" alt="" />
              {/* travels the same curve the dashed route is drawn on */}
              <span className={s.trackerMarker}>
                <img src="/figma/lt-marker.svg" alt="" />
              </span>
            </span>

            <span className={s.trackerStop} data-stop="start">
              <img src="/figma/lt-dot-start.svg" alt="" />
            </span>
            <span className={s.trackerStopLabel} data-stop="start">
              Manali
            </span>

            <span className={s.trackerStop} data-stop="end">
              <img src="/figma/lt-dot-end.svg" alt="" />
            </span>
            <span className={s.trackerStopLabel} data-stop="end">
              Leh
            </span>
          </div>

          <div className={s.trackerCardFoot}>
            <p>
              Driver · <strong>Tashi N. ★4.9</strong>
            </p>
            <p>
              Next stop · <strong>Jispa, 6:40 pm</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
