'use client';
import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import Stepper from '@/components/app/Stepper';
import { rupees } from '@/lib/pricing';

export default function ConfirmationPage({ params }) {
  const { ref } = use(params);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => { api('/api/bookings/' + ref).then(setData).catch((e) => setError(e.message)); }, [ref]);

  if (error) return <><h1>We could not find that booking</h1><p>{error}</p><Link className="btn" href="/book">Start a new search</Link></>;
  if (!data) return <h1>Loading your booking…</h1>;

  const { booking, destination, stay, guide, driver } = data;

  return (
    <div className="confirm-wrap">
      <Stepper current={6} />
      <h1>You are going to {destination?.title}.</h1>
      <div className="sub">Reference <b>{booking.id}</b> · {booking.status === 'confirmed' ? 'Paid in full' : 'Deposit received'}</div>

      <div className="summary-box">
        <div className="summary-row"><span>Dates</span><b>{booking.startDate || 'To be confirmed'} · {booking.days} days</b></div>
        <div className="summary-row"><span>Travellers</span><b>{booking.pax}</b></div>
        <div className="summary-row"><span>Guide</span><b>{guide?.name || 'To be assigned'}</b></div>
        <div className="summary-row"><span>Driver</span><b>{driver?.name || 'To be assigned'}</b></div>
        <div className="summary-row"><span>Stay</span><b>{stay?.name || 'To be assigned'}</b></div>
        <div className="summary-row"><span>Paid</span><b>{rupees(booking.paid)}</b></div>
        <div className="summary-row summary-total"><span>Trip total</span><b>{rupees(booking.total)}</b></div>
      </div>

      <h2>What happens next</h2>
      <ol>
        <li>Your guide messages you on WhatsApp within 24 hours to plan day one.</li>
        <li>A day before you start, the live tracker opens so family can follow along.</li>
        <li>Any balance is due 7 days before the start date.</li>
      </ol>

      <div className="pill-row" style={{ marginTop: '20px' }}>
        <Link className="btn red" href={'/book/track/' + booking.id}>Open live tracker</Link>
        <Link className="btn" href="/book/mytrips">All my trips</Link>
      </div>
    </div>
  );
}
