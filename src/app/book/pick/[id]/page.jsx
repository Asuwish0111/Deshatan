'use client';
import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useDraft } from '@/components/app/DraftProvider';
import { PersonAvatar } from '@/components/app/Media';
import Stepper from '@/components/app/Stepper';

export default function PickPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { draft, setDraft } = useDraft();
  const [partners, setPartners] = useState({ guides: [], drivers: [] });

  useEffect(() => { api('/api/partners').then(setPartners).catch(() => {}); }, []);

  const canContinue = draft.guideId && draft.driverId;

  return (
    <>
      <div className="app-crumb"><Link href={'/book/customize/' + id}>← Customize</Link></div>
      <Stepper current={2} />
      <h1>Your guide and driver</h1>
      <div className="sub">Every partner here is verified, review-scored and paid directly through Deshatan.</div>

      <h2>Guides</h2>
      <div className="pick-grid">
        {partners.guides.map((g) => (
          <button key={g.id} className={'pick-card' + (draft.guideId === g.id ? ' on' : '')} onClick={() => setDraft({ guideId: g.id })}>
            <PersonAvatar id={g.id} name={g.name} />
            <div>
              <b>{g.name}</b>
              <div className="meta">{g.city} · ★ {g.rating} · {g.reviews} reviews</div>
              {g.verified && <span className="tag">Verified</span>}
            </div>
          </button>
        ))}
      </div>

      <h2>Drivers</h2>
      <div className="pick-grid">
        {partners.drivers.map((dr) => (
          <button key={dr.id} className={'pick-card' + (draft.driverId === dr.id ? ' on' : '')} onClick={() => setDraft({ driverId: dr.id })}>
            <PersonAvatar id={dr.id} name={dr.name} />
            <div>
              <b>{dr.name}</b>
              <div className="meta">{dr.vehicle} · ★ {dr.rating}</div>
              {dr.verified && <span className="tag">Verified</span>}
            </div>
          </button>
        ))}
      </div>

      <div className="pill-row" style={{ marginTop: '20px' }}>
        <button className="btn red" disabled={!canContinue} onClick={() => router.push('/book/stay/' + id)}>
          {canContinue ? 'Choose where you stay →' : 'Pick one guide and one driver'}
        </button>
      </div>
    </>
  );
}
