'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { PersonAvatar } from '@/components/app/Media';

export default function AdminPartners() {
  const [data, setData] = useState({ guides: [], drivers: [] });
  useEffect(() => { api('/api/admin/partners').then(setData).catch(() => {}); }, []);

  return (
    <>
      <h1>Guides &amp; drivers</h1>
      <div className="sub">Everyone currently taking bookings. New partners arrive through Applications.</div>

      <h2>Guides ({data.guides.length})</h2>
      <div className="pick-grid">
        {data.guides.map((g) => (
          <div className="pick-card" key={g.id}>
            <PersonAvatar id={g.id} name={g.name} />
            <div>
              <b>{g.name}</b>
              <div className="meta">{g.city} · ★ {g.rating} · {g.reviews} reviews</div>
              {g.verified && <span className="tag">Verified</span>}
            </div>
          </div>
        ))}
      </div>

      <h2>Drivers ({data.drivers.length})</h2>
      <div className="pick-grid">
        {data.drivers.map((d) => (
          <div className="pick-card" key={d.id}>
            <PersonAvatar id={d.id} name={d.name} />
            <div>
              <b>{d.name}</b>
              <div className="meta">{d.vehicle} · ★ {d.rating}</div>
              {d.verified && <span className="tag">Verified</span>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
