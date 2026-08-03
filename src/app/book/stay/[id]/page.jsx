'use client';
import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useDraft } from '@/components/app/DraftProvider';
import { Photo } from '@/components/app/Media';
import Stepper from '@/components/app/Stepper';
import { rupees } from '@/lib/pricing';
import { STAY_SCENE } from '@/lib/media';

export default function StayPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { draft, setDraft } = useDraft();
  const [stays, setStays] = useState([]);

  useEffect(() => { api('/api/destinations/' + id).then((d) => setStays(d.stays)).catch(() => {}); }, [id]);

  return (
    <>
      <div className="app-crumb"><Link href={'/book/pick/' + id}>← Guide &amp; driver</Link></div>
      <Stepper current={3} />
      <h1>Where you sleep</h1>
      <div className="sub">Homestays, havelis, camps and houseboats near your route. Room cost is added to your total.</div>

      <div className="stay-grid card-grid">
        {stays.map((s) => (
          <div className={'app-card' + (draft.stayId === s.id ? ' on' : '')} key={s.id}>
            <div className="card-media">
              <Photo image={s.image} scene={STAY_SCENE[s.type] || 'village'} region={s.region} alt={s.name} />
              <span className="media-badge"><span className="star">★</span> {s.rating}</span>
            </div>
            <div className="card-body">
              <h3>{s.name}</h3>
              <div className="meta">{s.type} · {s.region}</div>
              <div className="price">{rupees(s.pricePerNight)} <small>per night</small></div>
              <div className="pill-row" style={{ margin: '14px 0 0' }}>
                <Link className="btn" href={`/book/hotel/${id}/${s.id}`} style={{ fontSize: '14px', padding: '9px 16px' }}>See rooms &amp; details</Link>
                <button className="btn red" style={{ fontSize: '14px', padding: '9px 16px' }} onClick={() => setDraft({ stayId: s.id, roomTier: 'standard' })}>
                  {draft.stayId === s.id ? 'Selected ✓' : 'Pick this stay'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pill-row" style={{ marginTop: '20px' }}>
        <button className="btn red" disabled={!draft.stayId} onClick={() => router.push('/book/details/' + id)}>
          {draft.stayId ? 'Add your details →' : 'Pick a stay to continue'}
        </button>
      </div>
    </>
  );
}
