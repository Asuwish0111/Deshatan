'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { rupees } from '@/lib/pricing';

export default function AdminListings() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState('');
  const [regions, setRegions] = useState([]);

  useEffect(() => { api('/api/regions').then((d) => setRegions(d.regions)).catch(() => {}); }, []);
  useEffect(() => {
    const t = setTimeout(() => {
      const sp = new URLSearchParams({ limit: '60' });
      if (q.trim()) sp.set('q', q.trim());
      api('/api/destinations?' + sp).then((d) => { setItems(d.items); setTotal(d.total); }).catch(() => {});
    }, 220);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <>
      <h1>Destinations &amp; stays</h1>
      <div className="sub">{total} destinations across {regions.length} regions in the catalogue.</div>

      <div className="search-row">
        <input placeholder="Search the catalogue…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search catalogue" />
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>Title</th><th>Region</th><th>Area</th><th>Days</th><th>From</th><th>Rating</th><th>Listing</th></tr></thead>
          <tbody>
            {items.map((d) => (
              <tr key={d.id}>
                <td>{d.title}</td><td>{d.region}</td><td>{d.area || '—'}</td><td>{d.days}</td>
                <td>{rupees(d.priceFrom)}</td><td>★ {d.rating}</td>
                <td>{d.hidden ? <span className="status-pill pending">offbeat</span> : <span className="status-pill confirmed">flagship</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="field-hint">Catalogue editing is read-only for now — seed data lives in data/seed.json and the destinations table.</p>
    </>
  );
}
