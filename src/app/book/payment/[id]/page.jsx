'use client';
import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import Stepper from '@/components/app/Stepper';
import { rupees } from '@/lib/pricing';

export default function PaymentPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [data, setData] = useState(null);
  const [mode, setMode] = useState('full');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => { api('/api/bookings/' + id).then(setData).catch((e) => setMessage(e.message)); }, [id]);

  if (message && !data) return <><h1>Booking not found</h1><p>{message}</p></>;
  if (!data) return <h1>Loading payment…</h1>;

  const { booking, destination } = data;
  const deposit = Math.round(booking.total * 0.25);
  const amount = mode === 'full' ? booking.total : deposit;

  const pay = async () => {
    setBusy(true); setMessage('');
    try {
      const { mock, order } = await api('/api/payments/create-order', { method: 'POST', body: JSON.stringify({ bookingId: booking.id, amount }) });
      if (mock) {
        await api('/api/payments/verify', { method: 'POST', body: JSON.stringify({ bookingId: booking.id, amount }) });
        router.push('/book/confirmation/' + booking.id);
        return;
      }
      await loadRazorpay();
      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: order.id, amount: order.amount, currency: 'INR',
        name: 'Deshatan', description: destination?.title || 'Yatra booking',
        prefill: { name: booking.guestName, email: booking.guestEmail, contact: booking.guestPhone },
        handler: async (response) => {
          try {
            await api('/api/payments/verify', { method: 'POST', body: JSON.stringify({ ...response, bookingId: booking.id, amount }) });
            router.push('/book/confirmation/' + booking.id);
          } catch (e) { setMessage(e.message); setBusy(false); }
        },
        modal: { ondismiss: () => { setBusy(false); setMessage('Payment window closed — nothing was charged.'); } }
      });
      rzp.open();
    } catch (e) {
      setMessage(e.message); setBusy(false);
    }
  };

  return (
    <>
      <Stepper current={5} />
      <h1>Pay for {destination?.title}</h1>
      <div className="sub">Booking reference {booking.id} · {booking.days} days · {booking.pax} travellers</div>

      <div className="field-section">
        <h3>How much now?</h3>
        <div className="seg" role="group">
          <button type="button" className={mode === 'full' ? 'on' : ''} onClick={() => setMode('full')}>Pay in full · {rupees(booking.total)}</button>
          <button type="button" className={mode === 'deposit' ? 'on' : ''} onClick={() => setMode('deposit')}>25% deposit · {rupees(deposit)}</button>
        </div>
        <div className="field-hint">
          {mode === 'full'
            ? 'Everything settled now. Free cancellation up to 7 days before you start.'
            : 'The rest is due 7 days before your start date. Your guide and driver are held from today.'}
        </div>
      </div>

      <div className="summary-box">
        <div className="summary-row"><span>Trip total</span><b>{rupees(booking.total)}</b></div>
        <div className="summary-row summary-total"><span>Paying now</span><b>{rupees(amount)}</b></div>
      </div>

      {message && <div className="demo-note" role="alert">{message}</div>}

      <div className="pill-row" style={{ marginTop: '20px' }}>
        <button className="btn red" onClick={pay} disabled={busy}>{busy ? 'Opening payment…' : `Pay ${rupees(amount)} securely`}</button>
      </div>
      <p className="field-hint">Payments run through Razorpay (UPI, cards, netbanking). With no gateway keys configured the app runs in test mode and no money moves.</p>
    </>
  );
}

function loadRazorpay() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve();
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.onload = resolve;
    s.onerror = () => reject(new Error('Could not reach the payment gateway. Check your connection and try again.'));
    document.body.appendChild(s);
  });
}
