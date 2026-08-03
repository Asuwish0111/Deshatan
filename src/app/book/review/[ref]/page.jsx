'use client';
import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

export default function ReviewPage({ params }) {
  const { ref } = use(params);
  const [data, setData] = useState(null);
  const [targetType, setTargetType] = useState('guide');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => { api('/api/bookings/' + ref).then(setData).catch((e) => setMessage(e.message)); }, [ref]);

  const targetName = targetType === 'guide' ? data?.guide?.name : targetType === 'driver' ? data?.driver?.name : data?.stay?.name;

  const submit = async () => {
    setMessage('');
    if (!targetName) { setMessage('That part of the trip has not been assigned yet.'); return; }
    try {
      await api('/api/reviews', {
        method: 'POST',
        body: JSON.stringify({
          bookingId: ref, targetType, targetName, rating, text,
          author: data?.booking?.guestName || 'Traveller'
        })
      });
      setDone(true);
    } catch (e) { setMessage(e.message); }
  };

  if (done) return (
    <>
      <h1>Thank you — review submitted.</h1>
      <p>It goes live once our team checks it, usually within a day.</p>
      <Link className="btn red" href="/book/mytrips">Back to my trips</Link>
    </>
  );

  return (
    <>
      <h1>How was the yatra?</h1>
      <div className="sub">Reviews here decide which guides and drivers stay on the platform, so be honest.</div>

      <div className="field-section">
        <h3>What are you reviewing?</h3>
        <div className="seg" role="group">
          {[['guide', 'Guide'], ['driver', 'Driver'], ['stay', 'Stay']].map(([key, label]) => (
            <button key={key} type="button" className={targetType === key ? 'on' : ''} onClick={() => setTargetType(key)}>{label}</button>
          ))}
        </div>
        <div className="field-hint">{targetName ? targetName : 'Not assigned on this booking yet.'}</div>
      </div>

      <div className="field-section">
        <h3>Rating</h3>
        <div className="seg" role="group">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" className={rating === n ? 'on' : ''} onClick={() => setRating(n)}>{n} ★</button>
          ))}
        </div>
      </div>

      <div className="form-field notes-field">
        <label htmlFor="text">In your words</label>
        <textarea id="text" rows="5" value={text} onChange={(e) => setText(e.target.value)} placeholder="What worked, what did not?" />
      </div>

      {message && <div className="demo-note" role="alert">{message}</div>}

      <div className="pill-row" style={{ marginTop: '20px' }}>
        <button className="btn red" onClick={submit}>Submit review</button>
      </div>
    </>
  );
}
