'use client';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLang } from '../LanguageProvider';

const CALC_WORDS = {
  en: { day: 'din', singular: 'akela', plural: 'log', perPerson: 'per person, sab kuch included' },
  hi: { day: 'दिन', singular: 'अकेला', plural: 'लोग', perPerson: 'प्रति व्यक्ति, सब कुछ शामिल' },
  bn: { day: 'দিন', singular: 'একা', plural: 'জন', perPerson: 'জনপ্রতি, সব কিছু অন্তর্ভুক্ত' },
  mr: { day: 'दिवस', singular: 'एकटा', plural: 'लोक', perPerson: 'प्रति व्यक्ती, सर्व काही समाविष्ट' },
  te: { day: 'రోజులు', singular: 'ఒక్కరే', plural: 'మంది', perPerson: 'ఒక్కొక్కరికి, అన్నీ కలిపి' },
  ta: { day: 'நாட்கள்', singular: 'தனியாக', plural: 'பேர்', perPerson: 'ஒருவருக்கு, அனைத்தும் அடங்கும்' },
  gu: { day: 'દિવસ', singular: 'એકલા', plural: 'લોકો', perPerson: 'વ્યક્તિ દીઠ, બધું સામેલ' },
  ur: { day: 'دن', singular: 'اکیلا', plural: 'لوگ', perPerson: 'فی شخص، سب کچھ شامل' },
  kn: { day: 'ದಿನಗಳು', singular: 'ಒಬ್ಬಂಟಿ', plural: 'ಜನ', perPerson: 'ಪ್ರತಿ ವ್ಯಕ್ತಿಗೆ, ಎಲ್ಲವೂ ಸೇರಿದೆ' },
  or: { day: 'ଦିନ', singular: 'ଏକୁଟିଆ', plural: 'ଲୋକ', perPerson: 'ଜଣପ୍ରତି, ସବୁକିଛି ସାମିଲ' }
};

const STYLES = [[2200, 'calc.style1', 'Backpacker', 'backpacker'], [4500, 'calc.style2', 'Comfort', 'comfort'], [9500, 'calc.style3', 'Heritage Royal', 'heritage']];
const REGIONS = [
  [1.1, 'calc.region1', 'Himalayas'], [1.0, 'calc.region2', 'Rajasthan'], [1.05, 'calc.region3', 'Deep South'],
  [1.3, 'calc.region4', 'Nepal & Bhutan'], [1.2, 'calc.region5', 'Seaside'],
  [1.15, 'calc.region6', 'Offbeat location'], [1.25, 'calc.region7', 'Trek location']
];
const rupees = (n) => '₹' + Math.round(n).toLocaleString('en-IN');

export default function Calculator() {
  const router = useRouter();
  const { lang } = useLang();
  const words = CALC_WORDS[lang] || CALC_WORDS.en;

  const [days, setDays] = useState(7);
  const [pax, setPax] = useState(2);
  const [styleRate, setStyleRate] = useState(4500);
  const [regionMult, setRegionMult] = useState(1.1);
  const [query, setQuery] = useState('');

  const sums = useMemo(() => {
    const total = days * pax * styleRate * regionMult;
    return { total, per: total / pax, stay: total * 0.45, travel: total * 0.35, guide: total * 0.20 };
  }, [days, pax, styleRate, regionMult]);

  const styleKey = STYLES.find((s) => s[0] === styleRate)?.[3] || 'comfort';
  const goToBooking = () => {
    const params = new URLSearchParams({ days: String(days), pax: String(pax), style: styleKey });
    if (query.trim()) params.set('q', query.trim());
    router.push('/book?' + params.toString());
  };

  return (
    <section className="calc" id="calculator">
      <div className="wrap calc-grid">
        <div className="calc-intro reveal">
          <span className="eyebrow"><span className="hindi" data-i18n="calc.eyebrow.word">Sapno Ka Hisaab</span> <span data-i18n="calc.eyebrow.gloss">Plan your dream</span></span>
          <h2 data-i18n="calc.h2">Your dream trip has a number. Find it in thirty seconds.</h2>
          <p data-i18n="calc.p">Pick your days, your people, your style and your region. The calculator prices real stays, real drivers and real guides — not a marketing estimate. Move a slider, watch the rupees move.</p>
          <div className="budget-note" data-i18n="calc.budgetNote">
            <b>Budget sorting, built in:</b> once you have your number, every itinerary we show you is sorted against it — under budget first, always.
          </div>
        </div>

        <div className="calc-panel reveal">
          <h3><span data-i18n="calc.panelH3">Sapno ka Calculator</span> <small data-i18n="calc.panelSmall">live estimate</small></h3>

          <div className="field">
            <label htmlFor="calc-dest" data-i18n="calc.destLabel">Search your destination</label>
            <div className="search-row" style={{ marginBottom: '0' }}>
              <input
                type="text" id="calc-dest" list="calc-dest-list" autoComplete="off"
                placeholder="Manali, Kerala backwaters, Rajasthan…"
                value={query} onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); goToBooking(); } }} />
              <button type="button" className="btn red" data-i18n="calc.destGo" onClick={goToBooking}>Search</button>
            </div>
            <datalist id="calc-dest-list">
              {['Manali', 'Char Dham', 'Spiti', 'Rajasthan', 'Kerala backwaters', 'Nepal & Bhutan', 'Northeast', 'Andaman'].map((v) => <option key={v} value={v}></option>)}
            </datalist>
          </div>

          <div className="field">
            <label htmlFor="days"><span data-i18n="calc.daysLabel">Days on the road</span> <output id="days-out">{days} {words.day}</output></label>
            <input type="range" id="days" min="2" max="21" value={days} onChange={(e) => setDays(+e.target.value)} />
          </div>

          <div className="field">
            <label htmlFor="pax"><span data-i18n="calc.paxLabel">Travellers</span> <output id="pax-out">{pax} {pax === 1 ? words.singular : words.plural}</output></label>
            <input type="range" id="pax" min="1" max="8" value={pax} onChange={(e) => setPax(+e.target.value)} />
          </div>

          <div className="field">
            <label id="style-label" data-i18n="calc.styleLabel">Travel style</label>
            <div className="seg" role="group" aria-labelledby="style-label">
              {STYLES.map(([rate, key, label]) => (
                <button key={key} type="button" data-i18n={key} className={styleRate === rate ? 'on' : ''} onClick={() => setStyleRate(rate)}>{label}</button>
              ))}
            </div>
          </div>

          <div className="field">
            <label id="region-label" data-i18n="calc.regionLabel">Region</label>
            <div className="seg seg-4" role="group" aria-labelledby="region-label">
              {REGIONS.map(([mult, key, label]) => (
                <button key={key} type="button" data-i18n={key} className={regionMult === mult ? 'on' : ''} onClick={() => setRegionMult(mult)}>{label}</button>
              ))}
            </div>
          </div>

          <div className="calc-total" aria-live="polite">
            <div className="rupees" id="total">{rupees(sums.total)}</div>
            <div className="per" id="per-head">≈ {rupees(sums.per)} {words.perPerson}</div>
            <div className="calc-break">
              <span><span data-i18n="calc.stayLabel">Stay</span><b>{rupees(sums.stay)}</b></span>
              <span><span data-i18n="calc.travelLabel">Travel + driver</span><b>{rupees(sums.travel)}</b></span>
              <span><span data-i18n="calc.guideLabel">Guide + experiences</span><b>{rupees(sums.guide)}</b></span>
            </div>
          </div>

          <div className="pill-row" style={{ marginTop: '18px', justifyContent: 'center' }}>
            <button type="button" className="btn red" style={{ fontSize: '15px' }} onClick={goToBooking}>
              Like this number? Start a real booking →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
