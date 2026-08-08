import s from './dashboard.module.css';

type Stamp = { tone: string; num: string; label: string; copy: string };

const STAMPS: Stamp[] = [
  {
    tone: s.stampRed,
    num: '28',
    label: 'States of Bharat',
    copy: "From Himachal's deodar valleys to Kerala's backwaters — every single state, mapped with guides on the ground."
  },
  {
    tone: s.stampGold,
    num: '8',
    label: 'Union Territories',
    copy: "Ladakh's moonscapes, Andaman's reefs, Puducherry's yellow lanes — the territories most trips skip."
  },
  {
    tone: s.stampBlue,
    num: '+2',
    label: 'Nepal & Bhutan',
    copy: 'Cross the Himalaya without changing apps. Kathmandu, Pokhara, Thimphu and Paro — same guides, same tracking, same trust.'
  }
];

const CHIPS: string[] = [
  'Himalayas',
  'Rajasthan & the West',
  'The Deep South',
  'Seven Sisters',
  'Coasts & Islands',
  'The Heartland',
  'Nepal',
  'Bhutan'
];

export default function CoverageSection() {
  return (
    <section className={s.coverage} id="coverage">
      <div className={s.coverageHead}>
        <p className={s.eyebrow}>
          <span className={s.eyebrowBar} aria-hidden="true" />
          <span className={s.eyebrowWord}>Kahaan-Kahaan</span>
          <span className={s.eyebrowBar} aria-hidden="true" />
        </p>
        <h2>Kashmir to Kanyakumari. Kutch to Kohima. And beyond the border.</h2>
      </div>

      <div className={s.stamps}>
        {STAMPS.map((stamp) => (
          <div className={`${s.stamp} ${stamp.tone}`} key={stamp.label}>
            <div className={s.stampInner}>
              <p className={s.stampNum}>{stamp.num}</p>
              <p className={s.stampLabel}>{stamp.label}</p>
              <p className={s.stampBody}>{stamp.copy}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={s.chips} role="list">
        {CHIPS.map((chip, i) => (
          <span className={`${s.chip} ${i === 0 ? s.chipOn : ''}`} role="listitem" key={chip}>
            {chip}
          </span>
        ))}
      </div>
    </section>
  );
}
