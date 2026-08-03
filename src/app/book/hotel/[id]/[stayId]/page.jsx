'use client';
import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useDraft } from '@/components/app/DraftProvider';
import { Photo } from '@/components/app/Media';
import { rupees, ROOM_TIERS, stayCost } from '@/lib/pricing';
import { STAY_SCENE } from '@/lib/media';

const AMENITIES = {
  Homestay: ['Home-cooked meals', 'Family hosts', 'Wi-Fi'],
  Haveli: ['Heritage architecture', 'Rooftop dining', 'Courtyard'],
  Camp: ['Bonfire evenings', 'Folk music', 'Attached washroom'],
  Houseboat: ['Private deck', 'All meals included', 'AC bedroom'],
  Resort: ['Pool', 'Restaurant on-site', 'Room service']
};

export default function HotelDetailPage({ params }) {
  const { id, stayId } = use(params);
  const router = useRouter();
  const { draft, setDraft } = useDraft();
  const [data, setData] = useState(null);
  const [tier, setTier] = useState(draft.stayId === stayId ? draft.roomTier : 'standard');

  useEffect(() => { api('/api/stays/' + stayId).then(setData).catch(() => {}); }, [stayId]);

  if (!data) return <h1>Loading stay…</h1>;
  const s = data.stay;
  const nights = Math.max(1, (draft.days || 2) - 1);
  const rooms = stayCost({ pricePerNight: s.pricePerNight, days: draft.days, roomTier: tier });

  const choose = () => { setDraft({ stayId: s.id, roomTier: tier }); router.push('/book/details/' + id); };

  return (
    <>
      <div className="app-crumb"><Link href={'/book/stay/' + id}>← All stays</Link></div>

      <div className="app-card" style={{ overflow: 'hidden', marginBottom: '24px' }}>
        <div className="card-media" style={{ height: '320px' }}>
          <Photo image={s.image} scene={STAY_SCENE[s.type] || 'village'} region={s.region} alt={s.name} />
          <span className="media-badge"><span className="star">★</span> {s.rating}</span>
        </div>
      </div>

      <h1>{s.name}</h1>
      <div className="sub">{s.type} in {s.region} · ★ {s.rating} · {data.reviews.length} traveller reviews</div>
      <p>A {s.type.toLowerCase()} chosen for its location on this route rather than its brand — close enough to the day&apos;s stops that you are not spending your holiday in the car.</p>

      <h2>What is included</h2>
      <div className="tag-row">
        {(AMENITIES[s.type] || ['Breakfast', 'Wi-Fi', 'Hot water']).map((a) => <span className="tag" key={a}>{a}</span>)}
      </div>

      <h2>Choose a room</h2>
      <div className="pick-grid">
        {ROOM_TIERS.map((t) => (
          <button key={t.key} className={'pick-card' + (tier === t.key ? ' on' : '')} onClick={() => setTier(t.key)}>
            <div>
              <b>{t.label}</b>
              <div className="meta">{t.hint}</div>
              <div className="price">{rupees(Math.round(s.pricePerNight * t.mult))} <small>per night</small></div>
            </div>
          </button>
        ))}
      </div>

      {!!data.reviews.length && (
        <>
          <h2>What travellers said</h2>
          {data.reviews.map((r) => (
            <div className="review-line" key={r.id}>
              <b>{'★'.repeat(r.rating)}</b> {r.text} <span className="meta">— {r.author}</span>
            </div>
          ))}
        </>
      )}

      <h2>Policies</h2>
      <div className="app-card"><div className="card-body">
        <p>Free cancellation up to 7 days before check-in. Check-in from 12:00, check-out by 10:00. Government photo ID required for every adult guest.</p>
      </div></div>

      <div className="summary-box">
        <div className="summary-row"><span>{ROOM_TIERS.find((t) => t.key === tier)?.label} × {nights} nights</span><b>{rupees(rooms)}</b></div>
        <div className="field-hint">Added on top of your trip cost.</div>
      </div>

      <div className="pill-row" style={{ marginTop: '20px' }}>
        <button className="btn red" onClick={choose}>Book this stay →</button>
      </div>
    </>
  );
}
