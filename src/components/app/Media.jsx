'use client';
import { useState } from 'react';
import { photoFor, accentFor, personInitials, personHue } from '@/lib/media';

// One <img> with a graceful fallback: if a photo 404s we drop to the scene photo
// rather than showing a broken image.
export function Photo({ image, scene, region, alt }) {
  const [src, setSrc] = useState(photoFor({ image, scene, region }));
  const [failed, setFailed] = useState(false);
  const fallback = photoFor({ scene });
  return (
    <img
      src={src} alt={alt} loading="lazy"
      onError={() => { if (!failed) { setFailed(true); setSrc(fallback); } }}
    />
  );
}

export function RegionTag({ region }) {
  const a = accentFor(region);
  return <span className="media-tag" style={{ background: a.bg, color: a.text }}>{region}</span>;
}

export function PersonAvatar({ id, name, size = 64 }) {
  const [bg, fg] = personHue(id || name || '');
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} role="img" aria-label={name}>
      <rect width="120" height="120" fill={bg} />
      <circle cx="60" cy="60" r="46" fill="none" stroke={fg} strokeOpacity=".25" strokeWidth="2" />
      <text x="60" y="60" textAnchor="middle" dominantBaseline="central" fontFamily="'Rozha One',serif" fontSize="40" fill={fg}>
        {personInitials(name || '')}
      </text>
    </svg>
  );
}
