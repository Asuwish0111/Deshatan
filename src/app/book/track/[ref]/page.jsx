'use client';
import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

const STAGES = [
  'Booking confirmed', 'Guide assigned', 'Driver en route to pickup',
  'Day 1 — on the road', 'Mid-trip check-in', 'Final day', 'Trip complete'
];

export default function TrackPage({ params }) {
  const { ref } = use(params);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => { api('/api/bookings/' + ref).then(setData).catch((e) => setError(e.message)); }, [ref]);

  if (error) return <><h1>Nothing to track yet</h1><p>{error}</p><Link className="btn" href="/book/mytrips">My trips</Link></>;
  if (!data) return <h1>Loading tracker…</h1>;

  const { booking, destination, guide, driver } = data;
  // Stage is derived from status and start date rather than invented - a trip that
  // has not started yet honestly shows stage 1.
  const started = booking.startDate && new Date(booking.startDate) <= new Date();
  const stage = booking.status === 'completed' ? STAGES.length - 1 : started ? 3 : booking.guideId ? 1 : 0;

  return (
    <>
      <h1>Live yatra tracker</h1>
      <div className="sub">{destination?.title} · reference {booking.id}</div>

      <div className="tracker-card">
        <span className="live-pill">● Live</span>
        <h3>{STAGES[stage]}</h3>
        <p className="meta">Guide {guide?.name || 'to be assigned'} · Driver {driver?.name || 'to be assigned'} · {booking.pax} travellers</p>
        <ol className="night-list">
          {STAGES.map((s, i) => (
            <li key={s} style={{ opacity: i <= stage ? 1 : 0.45 }}>{i <= stage ? '✓ ' : '· '}{s}</li>
          ))}
        </ol>
        <div className="tracker-foot">
          Share this page with family — it needs no login, only the booking reference.
        </div>
      </div>

      <div className="pill-row" style={{ marginTop: '20px' }}>
        <Link className="btn" href="/book/mytrips">← My trips</Link>
        <Link className="btn red" href={'/book/review/' + booking.id}>Leave a review</Link>
      </div>
    </>
  );
}
