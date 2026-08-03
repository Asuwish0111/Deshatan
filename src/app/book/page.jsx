'use client';
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import { useDraft } from '@/components/app/DraftProvider';
import { Photo, RegionTag } from '@/components/app/Media';
import { rupees } from '@/lib/pricing';

const POPULAR = ['Manali', 'Char Dham', 'Spiti', 'Rajasthan', 'Kerala backwaters', 'Nepal & Bhutan', 'Northeast', 'Andaman'];

function SearchInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { setDraft } = useDraft();

  const [q, setQ] = useState(params.get('q') || '');
  const [region, setRegion] = useState('All');
  const [sort, setSort] = useState('popular');
  const [maxBudget, setMaxBudget] = useState('');
  const [regions, setRegions] = useState([]);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // The homepage calculator hands over days / travellers / style through the URL.
  useEffect(() => {
    const patch = {};
    if (params.get('days')) patch.days = Number(params.get('days'));
    if (params.get('pax')) patch.pax = Number(params.get('pax'));
    if (params.get('style')) patch.style = params.get('style');
    if (Object.keys(patch).length) setDraft(patch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { api('/api/regions').then((d) => setRegions(d.regions)).catch(() => {}); }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(true);
      const sp = new URLSearchParams({ limit: '36', sort });
      if (q.trim()) sp.set('q', q.trim());
      if (region !== 'All') sp.set('region', region);
      if (maxBudget) sp.set('maxBudget', maxBudget);
      api('/api/destinations?' + sp.toString())
        .then((d) => { setItems(d.items); setTotal(d.total); })
        .catch(() => setItems([]))
        .finally(() => setLoading(false));
    }, 220);
    return () => clearTimeout(t);
  }, [q, region, sort, maxBudget]);

  const open = (id) => { setDraft({ destId: id }); router.push('/book/trip/' + id); };

  return (
    <>
      <h1>Find your yatra</h1>
      <div className="sub">Browse real itineraries, then customize days, people, style and region — sab kuch, ek jagah.</div>
      <div className="demo-note">Sample inventory: destinations, prices and availability are seed content, not live stock. Destination photos via Wikimedia Commons contributors.</div>

      <div className="search-row">
        <input type="text" placeholder="Search a destination, region or vibe…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search destinations" />
      </div>

      <div className="trend-label">Popular searches right now</div>
      <div className="trend-row">
        {POPULAR.map((term) => (
          <button key={term} className="trend-chip" onClick={() => { setQ(term); setRegion('All'); }}>{term}</button>
        ))}
      </div>

      <div className="trend-label">Or browse by region</div>
      <div className="pill-row">
        {['All', ...regions.map((r) => r.region)].map((r) => (
          <button key={r} className={'pill-btn' + (r === region ? ' on' : '')} onClick={() => setRegion(r)}>{r}</button>
        ))}
      </div>

      <div className="trend-label">Sort and budget</div>
      <div className="pill-row" style={{ alignItems: 'center', gap: '10px' }}>
        {[['popular', 'Most booked'], ['price', 'Cheapest first'], ['rating', 'Best rated']].map(([key, label]) => (
          <button key={key} className={'pill-btn' + (sort === key ? ' on' : '')} onClick={() => setSort(key)}>{label}</button>
        ))}
        <input
          type="number" placeholder="Max ₹ per person" value={maxBudget} min="0" step="1000"
          onChange={(e) => setMaxBudget(e.target.value)} aria-label="Maximum budget"
          style={{ maxWidth: '200px' }} />
      </div>

      <p className="meta" style={{ marginTop: '18px' }}>
        {loading ? 'Looking…' : `${total} ${total === 1 ? 'trip' : 'trips'} match. Showing ${items.length}.`}
      </p>

      <div className="card-grid">
        {items.map((d) => (
          <div className="app-card dest-card" key={d.id}>
            <div className="card-media">
              <Photo image={d.image} scene={d.scene} region={d.region} alt={d.title} />
              <span className="media-badge"><span className="star">★</span> {d.rating}</span>
              <RegionTag region={d.region} />
            </div>
            <div className="card-body">
              <h3>{d.title}</h3>
              <div className="meta">{d.days} days · {d.reviews} reviews · verified guides &amp; drivers</div>
              <div className="price">{rupees(d.priceFrom)} <small>starting, per person</small></div>
              <div className="pill-row" style={{ margin: '14px 0 0' }}>
                <button className="btn red" style={{ fontSize: '14px', padding: '9px 16px' }} onClick={() => open(d.id)}>View trip</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!loading && !items.length && <p>No destinations match that search. Try a different region or clear the budget filter.</p>}
    </>
  );
}

export default function BookSearchPage() {
  return <Suspense fallback={<h1>Find your yatra</h1>}><SearchInner /></Suspense>;
}
