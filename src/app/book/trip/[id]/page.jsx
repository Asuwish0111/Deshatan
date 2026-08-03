'use client';
import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useDraft } from '@/components/app/DraftProvider';
import { Photo, RegionTag } from '@/components/app/Media';
import Stepper from '@/components/app/Stepper';
import { rupees, STYLE_OPTIONS } from '@/lib/pricing';

export default function TripPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { draft, setDraft, ready } = useDraft();
  const [data, setData] = useState(null);
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/api/destinations/' + id)
      .then((d) => {
        setData(d);
        // Only fill in defaults the traveller has not chosen yet - a trip picked
        // from the calculator keeps its days / travellers / style.
        setDraft((prev) => ({ ...prev, destId: id, days: prev.destId === id ? prev.days : (prev.days || d.destination.days) }));
      })
      .catch((e) => setError(e.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (!ready || !data) return;
    api('/api/quote', {
      method: 'POST',
      body: JSON.stringify({ destId: id, days: draft.days, pax: draft.pax, style: draft.style })
    }).then((d) => setQuote(d.quote)).catch(() => {});
  }, [ready, data, id, draft.days, draft.pax, draft.style]);

  if (error) return <><h1>Trip not found</h1><p>{error}</p><Link className="btn" href="/book">Back to search</Link></>;
  if (!data) return <h1>Loading trip…</h1>;

  const d = data.destination;

  return (
    <>
      <div className="app-crumb"><Link href="/book">← All trips</Link></div>
      <Stepper current={0} />
      <h1>{d.title}</h1>
      <div className="sub">{d.region}{d.area ? ` · ${d.area}` : ''} · {d.days} suggested days · {d.reviews} reviews</div>

      <div className="app-card" style={{ overflow: 'hidden', marginBottom: '24px' }}>
        <div className="card-media" style={{ height: '320px' }}>
          <Photo image={d.image} scene={d.scene} region={d.region} alt={d.title} />
          <span className="media-badge"><span className="star">★</span> {d.rating}</span>
          <RegionTag region={d.region} />
        </div>
        <div className="card-body">
          <p>{d.blurb}</p>
        </div>
      </div>

      <h2>Shape the trip</h2>
      <div className="field">
        <label htmlFor="days">Days on the road <output>{draft.days}</output></label>
        <input id="days" type="range" min="2" max="21" value={draft.days} onChange={(e) => setDraft({ days: +e.target.value })} />
      </div>
      <div className="field">
        <label htmlFor="pax">Travellers <output>{draft.pax}</output></label>
        <input id="pax" type="range" min="1" max="8" value={draft.pax} onChange={(e) => setDraft({ pax: +e.target.value })} />
      </div>
      <div className="field">
        <label id="style-label">Travel style</label>
        <div className="seg" role="group" aria-labelledby="style-label">
          {STYLE_OPTIONS.map((s) => (
            <button key={s.key} type="button" className={draft.style === s.key ? 'on' : ''} onClick={() => setDraft({ style: s.key })}>{s.label}</button>
          ))}
        </div>
        <div className="field-hint">{STYLE_OPTIONS.find((s) => s.key === draft.style)?.hint}</div>
      </div>

      <div className="summary-box">
        <div className="summary-row"><span>Base trip ({draft.days} days × {draft.pax})</span><b>{quote ? rupees(quote.base) : '—'}</b></div>
        <div className="summary-row summary-total"><span>Estimate so far</span><b>{quote ? rupees(quote.total) : '—'}</b></div>
        <div className="field-hint">Stays, meals, pickup and add-ons come next — the number updates as you choose.</div>
      </div>

      <div className="pill-row" style={{ marginTop: '20px' }}>
        <button className="btn red" onClick={() => router.push('/book/customize/' + id)}>Customize this trip →</button>
      </div>
    </>
  );
}
