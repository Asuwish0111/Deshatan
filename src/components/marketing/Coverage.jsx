// Ported from the original single-file prototype, markup unchanged.
export default function Coverage() {
  return (
    <>
      <section className="coverage" id="coverage">
        <div className="wrap">
          <div className="coverage-head reveal">
            <span className="eyebrow"><span className="hindi" data-i18n="coverage.eyebrow.word">Kahaan-Kahaan</span> <span data-i18n="coverage.eyebrow.gloss">Where we take you</span></span>
            <h2 data-i18n="coverage.h2">Kashmir to Kanyakumari. Kutch to Kohima. And beyond the border.</h2>
          </div>
          <div className="coverage-grid">
            <div className="stamp red reveal"><div className="stamp-inner">
              <div className="cov-num">28</div>
              <div className="cov-label" data-i18n="coverage.s1.label">States of Bharat</div>
              <p className="cov-sub" data-i18n="coverage.s1.sub">From Himachal's deodar valleys to Kerala's backwaters — every single state, mapped with guides on the ground.</p>
            </div></div>
            <div className="stamp gold reveal"><div className="stamp-inner">
              <div className="cov-num">8</div>
              <div className="cov-label" data-i18n="coverage.s2.label">Union Territories</div>
              <p className="cov-sub" data-i18n="coverage.s2.sub">Ladakh's moonscapes, Andaman's reefs, Puducherry's yellow lanes — the territories most trips skip.</p>
            </div></div>
            <div className="stamp blue reveal"><div className="stamp-inner">
              <div className="cov-num">+2</div>
              <div className="cov-label" data-i18n="coverage.s3.label">Nepal &amp; Bhutan</div>
              <p className="cov-sub" data-i18n="coverage.s3.sub">Cross the Himalaya without changing apps. Kathmandu, Pokhara, Thimphu and Paro — same guides, same tracking, same trust.</p>
            </div></div>
          </div>
          <div className="region-chips reveal" role="list">
            <span className="chip on" role="listitem" data-i18n="coverage.chip1">Himalayas</span>
            <span className="chip" role="listitem" data-i18n="coverage.chip2">Rajasthan &amp; the West</span>
            <span className="chip" role="listitem" data-i18n="coverage.chip3">The Deep South</span>
            <span className="chip" role="listitem" data-i18n="coverage.chip4">Seven Sisters</span>
            <span className="chip" role="listitem" data-i18n="coverage.chip5">Coasts &amp; Islands</span>
            <span className="chip" role="listitem" data-i18n="coverage.chip6">The Heartland</span>
            <span className="chip" role="listitem" data-i18n="coverage.chip7">Nepal</span>
            <span className="chip" role="listitem" data-i18n="coverage.chip8">Bhutan</span>
          </div>
        </div>
      </section>    </>
  );
}
