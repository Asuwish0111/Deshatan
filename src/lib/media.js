import data from './media-data.js';

export const SCENE_PHOTOS = data.SCENE_PHOTOS;
export const REGION_PHOTOS = data.REGION_PHOTOS;
export const REGION_ACCENT = data.REGION_ACCENT;
export const STAY_SCENE = data.STAY_SCENE;

// Photo resolution order: the record's own photo -> a real photo of its state ->
// a photo for its scene category. Every destination and stay resolves to a real
// photograph; nothing falls through to a placeholder.
export function photoFor({ image, scene, region } = {}) {
  return image || (region && REGION_PHOTOS[region]) || SCENE_PHOTOS[scene] || SCENE_PHOTOS.mountain;
}

export function accentFor(region) {
  return REGION_ACCENT[region] || { bg: 'var(--ink)', text: 'var(--paper)' };
}

const PERSON_HUES = [
  ['#A14834', '#F6EDD9'], ['#2B355D', '#F6EDD9'], ['#23695B', '#F6EDD9'],
  ['#CF9E46', '#26190E'], ['#803625', '#F6EDD9']
];

export function personInitials(name = '') {
  const parts = name.replace('.', '').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '??';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function personHue(id = '') {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return PERSON_HUES[hash % PERSON_HUES.length];
}
