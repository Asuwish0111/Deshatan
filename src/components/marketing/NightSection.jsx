// Ported from the original single-file prototype, markup unchanged.
export default function NightSection() {
  return (
    <>
      <section className="night">
        <div className="wrap night-grid">
          <div className="reveal">
            <span className="eyebrow"><span className="hindi" data-i18n="night.eyebrow.word">Live Tracker</span> <span data-i18n="night.eyebrow.gloss">Live yatra tracker</span></span>
            <h2 data-i18n="night.h2">Ghar waale dekh sakte hain — you're moving, you're safe.</h2>
            <p data-i18n="night.p">Share one link with family. They see your live route, your driver's name and rating, your next stop and your ETA — updated every minute of the journey.</p>
            <ul className="night-list" data-i18n="night.list">
              <li><span className="bindu"></span><div><b>Live route sharing</b> — parents in Hyderabad watch your bus climb to Leh, turn by turn.</div></li>
              <li><span className="bindu"></span><div><b>Driver &amp; guide on the card</b> — name, photo, rating and plate number visible to whoever you share with.</div></li>
              <li><span className="bindu"></span><div><b>Auto check-ins</b> — reached the hotel? Family gets a gentle ping. No "pahunch gaye?" calls needed.</div></li>
              <li><span className="bindu"></span><div><b>Works with the offline safety map</b> — last known location stays visible even when your signal drops.</div></li>
            </ul>
          </div>
          <div className="tracker-card reveal" role="img" aria-label="Live tracker card showing a route from Manali to Leh with a moving location dot">
            <div className="tc-head">
              <span data-i18n="night.tcHead">Priya's Yatra · Manali → Leh</span>
              <span className="live-pill"><i></i><span data-i18n="night.live">LIVE</span></span>
            </div>
            <svg viewBox="0 0 460 260">
              <rect width="460" height="260" fill="#0E1430" />
              <g stroke="#2A356B" strokeWidth="1.5">
                <path d="M0 60 H460 M0 130 H460 M0 200 H460 M80 0 V260 M180 0 V260 M280 0 V260 M380 0 V260" />
              </g>
              <path d="M40 220 C120 210 130 140 200 130 S320 90 420 44" fill="none" stroke="#CF9E46" strokeWidth="4" strokeDasharray="10 9" strokeLinecap="round" />
              <circle cx="40" cy="220" r="8" fill="#F6EDD9" stroke="#26190E" strokeWidth="2" />
              <text x="40" y="246" textAnchor="middle" fill="#F6EDD9" fontFamily="Mukta,sans-serif" fontSize="13" fontWeight="600">Manali</text>
              <circle cx="420" cy="44" r="8" fill="#A14834" stroke="#F6EDD9" strokeWidth="2" />
              <text x="414" y="26" textAnchor="middle" fill="#F6EDD9" fontFamily="Mukta,sans-serif" fontSize="13" fontWeight="600">Leh</text>
              <circle r="9" fill="#CF9E46" stroke="#26190E" strokeWidth="2.5">
                <animateMotion dur="9s" repeatCount="indefinite" path="M40 220 C120 210 130 140 200 130 S320 90 420 44"/>
              </circle>
            </svg>
            <div className="tracker-foot">
              <span><span data-i18n="night.driverLabel">Driver</span> · <b>Tashi N. ★4.9</b></span>
              <span><span data-i18n="night.nextStopLabel">Next stop</span> · <b>Jispa, 6:40 pm</b></span>
            </div>
          </div>
        </div>
      </section>    </>
  );
}
