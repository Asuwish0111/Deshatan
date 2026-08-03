'use client';
import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useDraft } from '@/components/app/DraftProvider';
import Stepper from '@/components/app/Stepper';
import { rupees, PACE_OPTIONS, MEAL_PLANS, PICKUP_OPTIONS, ADDONS, OCCASIONS } from '@/lib/pricing';

export default function CustomizePage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { draft, setDraft, ready } = useDraft();
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    if (!ready) return;
    api('/api/quote', {
      method: 'POST',
      body: JSON.stringify({ destId: id, days: draft.days, pax: draft.pax, style: draft.style, meal: draft.meal, pickup: draft.pickup, addons: draft.addons })
    }).then((d) => setQuote(d.quote)).catch(() => {});
  }, [ready, id, draft.days, draft.pax, draft.style, draft.meal, draft.pickup, draft.addons]);

  const toggleAddon = (addonId) => setDraft((prev) => ({
    ...prev,
    addons: prev.addons.includes(addonId) ? prev.addons.filter((a) => a !== addonId) : [...prev.addons, addonId]
  }));

  return (
    <>
      <div className="app-crumb"><Link href={'/book/trip/' + id}>← Trip overview</Link></div>
      <Stepper current={1} />
      <h1>Make it yours</h1>
      <div className="sub">Pace, meals, pickup and extras. Everything here changes the price you see at the bottom.</div>

      <div className="field-section">
        <h3>Daily pace</h3>
        <div className="seg" role="group">
          {PACE_OPTIONS.map((p) => (
            <button key={p.key} type="button" className={draft.pace === p.key ? 'on' : ''} onClick={() => setDraft({ pace: p.key })}>{p.label}</button>
          ))}
        </div>
        <div className="field-hint">{PACE_OPTIONS.find((p) => p.key === draft.pace)?.hint}</div>
      </div>

      <div className="field-section">
        <h3>Meals</h3>
        <div className="seg" role="group">
          {MEAL_PLANS.map((m) => (
            <button key={m.key} type="button" className={draft.meal === m.key ? 'on' : ''} onClick={() => setDraft({ meal: m.key })}>{m.label}</button>
          ))}
        </div>
        <div className="field-hint">{MEAL_PLANS.find((m) => m.key === draft.meal)?.hint}</div>
      </div>

      <div className="field-section">
        <h3>Pickup</h3>
        <div className="seg seg-4" role="group">
          {PICKUP_OPTIONS.map((p) => (
            <button key={p.key} type="button" className={draft.pickup === p.key ? 'on' : ''} onClick={() => setDraft({ pickup: p.key })}>{p.label}</button>
          ))}
        </div>
        <div className="field-hint">{PICKUP_OPTIONS.find((p) => p.key === draft.pickup)?.hint}</div>
      </div>

      <div className="field-section">
        <h3>Add-ons</h3>
        <div className="addon-list">
          {ADDONS.map((a) => (
            <label className="addon-row" key={a.id}>
              <input type="checkbox" checked={draft.addons.includes(a.id)} onChange={() => toggleAddon(a.id)} />
              <span><b>{a.label}</b><br /><small>{a.hint}</small></span>
              <b>{rupees(a.price)}</b>
            </label>
          ))}
        </div>
      </div>

      <div className="field-section">
        <h3>What is the occasion?</h3>
        <div className="occasion-row">
          {OCCASIONS.map((o) => (
            <button key={o.key} type="button" className={'pill-btn' + (draft.occasion === o.key ? ' on' : '')} onClick={() => setDraft({ occasion: o.key })}>{o.label}</button>
          ))}
        </div>
      </div>

      <div className="summary-box">
        <div className="summary-row"><span>Base trip</span><b>{quote ? rupees(quote.base) : '—'}</b></div>
        <div className="summary-row"><span>Meals</span><b>{quote ? rupees(quote.mealTotal) : '—'}</b></div>
        <div className="summary-row"><span>Pickup</span><b>{quote ? rupees(quote.pickupFee) : '—'}</b></div>
        <div className="summary-row"><span>Add-ons</span><b>{quote ? rupees(quote.addonTotal) : '—'}</b></div>
        <div className="summary-row summary-total"><span>Running total</span><b>{quote ? rupees(quote.total) : '—'}</b></div>
      </div>

      <div className="pill-row" style={{ marginTop: '20px' }}>
        <button className="btn red" onClick={() => router.push('/book/pick/' + id)}>Choose guide &amp; driver →</button>
      </div>
    </>
  );
}
