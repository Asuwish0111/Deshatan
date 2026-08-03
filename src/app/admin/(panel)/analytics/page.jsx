'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { rupees } from '@/lib/pricing';

function Bars({ title, rows, format = (v) => v }) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <div className="app-card" style={{ marginBottom: '20px' }}>
      <div className="card-body">
        <h3>{title}</h3>
        {rows.map((r) => (
          <div key={r.label} style={{ margin: '10px 0' }}>
            <div className="meta" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{r.label}</span><b>{format(r.value)}</b>
            </div>
            <div style={{ height: '10px', background: 'rgba(38,25,14,.1)', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ width: (r.value / max) * 100 + '%', height: '100%', background: 'var(--sindoor, #A14834)' }} />
            </div>
          </div>
        ))}
        {!rows.length && <p className="meta">Nothing to chart yet.</p>}
      </div>
    </div>
  );
}

export default function AdminAnalytics() {
  const [data, setData] = useState(null);
  useEffect(() => { api('/api/admin/analytics').then(setData).catch(() => {}); }, []);
  if (!data) return <h1>Loading analytics…</h1>;

  return (
    <>
      <h1>Analytics</h1>
      <div className="sub">Revenue, volume and travel style, straight from the bookings table.</div>
      <Bars title="Revenue by region" rows={data.revenueByRegion} format={rupees} />
      <Bars title="Bookings by month" rows={data.bookingsByMonth} />
      <Bars title="Travel style split" rows={data.styleSplit} />
    </>
  );
}
