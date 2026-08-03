'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { rupees } from '@/lib/pricing';

const STATUSES = ['pending', 'deposit-paid', 'confirmed', 'in-progress', 'completed', 'cancelled'];

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api('/api/admin/bookings')
      .then((d) => setBookings(d.bookings))
      .catch((e) => setMessage(e.message))
      .finally(() => setLoading(false));
  }, []);

  const setStatus = async (id, status) => {
    const previous = bookings;
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    try {
      await api('/api/admin/bookings/' + id, { method: 'PATCH', body: JSON.stringify({ status }) });
    } catch (e) {
      setBookings(previous);
      setMessage(e.message);
    }
  };

  const shown = filter ? bookings.filter((b) => b.status === filter) : bookings;

  return (
    <>
      <h1>Bookings</h1>
      <div className="sub">Change a status here and the traveller&apos;s live tracker moves with it.</div>
      {message && <div className="demo-note" role="alert">{message}</div>}

      <div className="pill-row">
        <button className={'pill-btn' + (filter === '' ? ' on' : '')} onClick={() => setFilter('')}>All</button>
        {STATUSES.map((s) => (
          <button key={s} className={'pill-btn' + (filter === s ? ' on' : '')} onClick={() => setFilter(s)}>{s}</button>
        ))}
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>Reference</th><th>Trip</th><th>Guest</th><th>Contact</th><th>Days</th><th>Total</th><th>Paid</th><th>Status</th></tr></thead>
          <tbody>
            {shown.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.destTitle}</td>
                <td>{b.guestName}</td>
                <td>{b.guestEmail}<br /><small>{b.guestPhone}</small></td>
                <td>{b.days} × {b.pax}</td>
                <td>{rupees(b.total)}</td>
                <td>{rupees(b.paid)}</td>
                <td className="table-actions">
                  <select value={b.status} onChange={(e) => setStatus(b.id, e.target.value)} aria-label={'Status for ' + b.id}>
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!loading && !shown.length && <p>No bookings with that status yet.</p>}
    </>
  );
}
