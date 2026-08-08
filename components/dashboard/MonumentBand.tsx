import s from './dashboard.module.css';

// Silhouette frieze across the arch: 16 monuments at the band's own
// sizes and 16.18px gap, centred so the row lands where the design's does.
type Monument = [name: string, width: number, height: number];

const SEQUENCE: Monument[] = [
  ['warli-4', 75.455, 54.677],
  ['warli-1', 76.374, 49.117],
  ['warli-5', 45.976, 61.2],
  ['warli-3', 103.285, 63.616],
  ['warli-6', 28.577, 59.673],
  ['warli-7', 97.702, 54.678],
  ['warli-4', 75.455, 54.677],
  ['warli-5', 45.976, 61.2],
  ['warli-6', 28.577, 59.673],
  ['warli-4', 75.455, 54.677],
  ['warli-7', 97.702, 54.678],
  ['warli-6', 28.577, 59.673],
  ['warli-1', 76.374, 49.117],
  ['warli-2', 50.502, 72.6],
  ['warli-3', 103.285, 63.616],
  ['warli-4', 75.455, 54.677]
];

export default function MonumentBand() {
  return (
    <div className={s.band} aria-hidden="true">
      <div className={s.bandRow}>
        {SEQUENCE.map(([name, width, height], i) => (
          <span
            key={`${name}-${i}`}
            className={s.monument}
            style={{
              width: `${width}px`,
              height: `${height}px`,
              maskImage: `url(/figma/${name}.svg)`,
              WebkitMaskImage: `url(/figma/${name}.svg)`
            }}
          />
        ))}
      </div>
    </div>
  );
}
