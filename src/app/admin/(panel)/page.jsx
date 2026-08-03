'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { rupees } from '@/lib/pricing';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  useEffect(() => { api('/api/admin/stats').then(setData).catch(() => {}); }, []);
  const s = data?.stats;

  return (
    <>
      <h1>Dashboard</h1>
      <div className="sub">Everything happening across the platform right now.</div>

      <div className="stat-grid">
        {[
          ['Bookings', s?.bookings], ['Confirmed', s?.confirmed], ['Awaiting payment', s?.pending],
          ['Revenue collected', s ? rupees(s.revenue) : null], ['Reviews to moderate', s?.pendingReviews],
          ['Applications waiting', s?.pendingApplications], ['Active partners', s?.partners]
        ].map(([label, value]) => (
          <div className="stat-card" key={label}>
            <div className="cov-num">{value ?? '—'}</div>
            <div className="cov-label">{label}</div>
          </div>
        ))}
      </div>

      <h2>Latest bookings</h2>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>Reference</th><th>Guest</th><th>Days</th><th>Total</th><th>Status</th></tr></thead>
          <tbody>
            {(data?.recent || []).map((b) => (
              <tr key={b.id}>
                <td><Link href="/admin/bookings">{b.id}</Link></td>
                <td>{b.guestName}</td>
                <td>{b.days}</td>
                <td>{rupees(b.total)}</td>
                <td><span className={'status-pill ' + b.status}>{b.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!data && <p>Loading…</p>}
    </>
  );
}
