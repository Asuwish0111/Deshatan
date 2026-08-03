'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState('');

  const load = () => api('/api/admin/reviews').then((d) => setReviews(d.reviews)).catch((e) => setMessage(e.message));
  useEffect(() => { load(); }, []);

  const moderate = async (id, status) => {
    try {
      await api('/api/admin/reviews/' + id, { method: 'PATCH', body: JSON.stringify({ status }) });
      setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    } catch (e) { setMessage(e.message); }
  };

  return (
    <>
      <h1>Reviews</h1>
      <div className="sub">Nothing is published until someone here reads it.</div>
      {message && <div className="demo-note">{message}</div>}

      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>About</th><th>Type</th><th>Rating</th><th>Review</th><th>By</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r.id}>
                <td>{r.targetName}</td><td>{r.targetType}</td><td>{'★'.repeat(r.rating)}</td>
                <td>{r.text}</td><td>{r.author}</td>
                <td><span className={'status-pill ' + r.status}>{r.status}</span></td>
                <td className="table-actions">
                  <button className="btn red" style={{ fontSize: '13px', padding: '6px 12px' }} onClick={() => moderate(r.id, 'published')}>Publish</button>
                  <button className="btn" style={{ fontSize: '13px', padding: '6px 12px' }} onClick={() => moderate(r.id, 'hidden')}>Hide</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
