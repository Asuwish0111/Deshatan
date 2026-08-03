'use client';
import { useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { rupees } from '@/lib/pricing';

export default function MyTripsPage() {
  const [email, setEmail] = useState('');
  const [bookings, setBookings] = useState(null);
  const [message, setMessage] = useState('');

  const find = async () => {
    setMessage('');
    try {
      const d = await api('/api/bookings?email=' + encodeURIComponent(email));
      setBookings(d.bookings);
      if (!d.bookings.length) setMessage('No trips booked with that email yet.');
    } catch (e) { setMessage(e.message); }
  };

  return (
    <>
      <h1>My trips</h1>
      <div className="sub">Enter the email you booked with to see your yatras, tracker links and review forms.</div>

      <div className="search-row">
        <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && find()} aria-label="Email address" />
        <button className="btn red" onClick={find}>Find my trips</button>
      </div>

      {message && <p>{message}</p>}

      {bookings?.map((b) => (
        <div className="app-card" key={b.id} style={{ marginBottom: '16px' }}>
          <div className="card-body">
            <h3>{b.id}</h3>
            <div className="meta">{b.days} days · {b.pax} travellers · {b.startDate || 'dates to confirm'}</div>
            <div className="price">{rupees(b.total)} <small>{rupees(b.paid)} paid</small></div>
            <span className={'status-pill ' + b.status}>{b.status}</span>
            <div className="pill-row" style={{ margin: '14px 0 0' }}>
              <Link className="btn" href={'/book/track/' + b.id}>Track</Link>
              <Link className="btn" href={'/book/review/' + b.id}>Leave a review</Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
