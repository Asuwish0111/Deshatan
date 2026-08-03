'use client';
import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useDraft } from '@/components/app/DraftProvider';
import Stepper from '@/components/app/Stepper';
import { rupees } from '@/lib/pricing';

export default function DetailsPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { draft, setDraft, ready } = useDraft();
  const [quote, setQuote] = useState(null);
  const [errors, setErrors] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!ready) return;
    api('/api/quote', {
      method: 'POST',
      body: JSON.stringify({ destId: id, days: draft.days, pax: draft.pax, style: draft.style, meal: draft.meal, pickup: draft.pickup, addons: draft.addons, stayId: draft.stayId, roomTier: draft.roomTier })
    }).then((d) => setQuote(d.quote)).catch(() => {});
  }, [ready, id, draft.days, draft.pax, draft.style, draft.meal, draft.pickup, draft.addons, draft.stayId, draft.roomTier]);

  const submit = async () => {
    setSaving(true); setMessage(''); setErrors([]);
    try {
      const { booking } = await api('/api/bookings', { method: 'POST', body: JSON.stringify({ ...draft, destId: id }) });
      setDraft({ bookingId: booking.id });
      router.push('/book/payment/' + booking.id);
    } catch (e) {
      setErrors(e.data?.fields || []);
      setMessage(e.message);
      setSaving(false);
    }
  };

  const bad = (f) => errors.includes(f) ? { borderColor: 'var(--sindoor-deep)' } : undefined;
  const backHref = draft.stayId ? `/book/hotel/${id}/${draft.stayId}` : `/book/stay/${id}`;

  return (
    <>
      <div className="app-crumb"><Link href={backHref}>← Stay</Link></div>
      <Stepper current={4} />
      <h1>Who is travelling</h1>
      <div className="sub">We need one contact for the trip. Your guide and driver get these details after payment, nobody else.</div>

      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="name">Full name</label>
          <input id="name" value={draft.guestName} style={bad('guestName')} onChange={(e) => setDraft({ guestName: e.target.value })} placeholder="Priya Kapoor" />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={draft.guestEmail} style={bad('guestEmail')} onChange={(e) => setDraft({ guestEmail: e.target.value })} placeholder="you@example.com" />
        </div>
        <div className="form-field">
          <label htmlFor="phone">Phone / WhatsApp</label>
          <input id="phone" type="tel" value={draft.guestPhone} style={bad('guestPhone')} onChange={(e) => setDraft({ guestPhone: e.target.value })} placeholder="98765 43210" />
        </div>
        <div className="form-field">
          <label htmlFor="start">Start date</label>
          <input id="start" type="date" value={draft.startDate || ''} onChange={(e) => setDraft({ startDate: e.target.value })} />
        </div>
      </div>

      {message && <div className="demo-note" role="alert">{message}</div>}

      <div className="summary-box">
        <div className="summary-row"><span>Trip ({draft.days} days · {draft.pax} travellers)</span><b>{quote ? rupees(quote.base) : '—'}</b></div>
        <div className="summary-row"><span>Rooms</span><b>{quote ? rupees(quote.rooms) : '—'}</b></div>
        <div className="summary-row"><span>Meals · pickup · add-ons</span><b>{quote ? rupees(quote.mealTotal + quote.pickupFee + quote.addonTotal) : '—'}</b></div>
        <div className="summary-row"><span>GST (5%)</span><b>{quote ? rupees(quote.gst) : '—'}</b></div>
        <div className="summary-row summary-total"><span>Total</span><b>{quote ? rupees(quote.total) : '—'}</b></div>
      </div>

      <div className="pill-row" style={{ marginTop: '20px' }}>
        <button className="btn red" onClick={submit} disabled={saving}>{saving ? 'Saving…' : 'Continue to payment →'}</button>
      </div>
    </>
  );
}
