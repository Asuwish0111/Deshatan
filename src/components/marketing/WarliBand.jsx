// Ported from the original single-file prototype, markup unchanged.
export default function WarliBand() {
  return (
    <>
      <div className="warli-band" aria-hidden="true" role="presentation">
        <svg viewBox="0 0 1600 60" preserveAspectRatio="none">
          <defs>
            <symbol id="wf-walk" viewBox="0 0 40 60">
              <circle cx="20" cy="9" r="6" fill="none" stroke="#26190E" strokeWidth="3" />
              <path d="M20 15 L12 30 L28 30 Z" fill="none" stroke="#26190E" strokeWidth="2.5" strokeLinejoin="round" />
              <path d="M20 30 L10 52 M20 30 L27 52" stroke="#26190E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M12 22 L4 30 M28 22 L35 16" stroke="#26190E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </symbol>
            <symbol id="wf-dance" viewBox="0 0 40 60">
              <circle cx="20" cy="9" r="6" fill="none" stroke="#26190E" strokeWidth="3" />
              <path d="M20 15 L11 30 L29 30 Z" fill="none" stroke="#26190E" strokeWidth="2.5" strokeLinejoin="round" />
              <path d="M20 30 L8 54 M20 30 L32 54" stroke="#26190E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M12 20 L2 6 M28 20 L38 6" stroke="#26190E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </symbol>
            <symbol id="wf-carry" viewBox="0 0 40 60">
              <ellipse cx="20" cy="3" rx="7" ry="4" fill="none" stroke="#26190E" strokeWidth="2.5" />
              <circle cx="20" cy="12" r="6" fill="none" stroke="#26190E" strokeWidth="3" />
              <path d="M20 18 L12 33 L28 33 Z" fill="none" stroke="#26190E" strokeWidth="2.5" strokeLinejoin="round" />
              <path d="M20 33 L11 55 M20 33 L28 55" stroke="#26190E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M12 24 L18 20 M28 24 L22 20" stroke="#26190E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </symbol>
            <symbol id="wf-tree" viewBox="0 0 40 60">
              <path d="M20 60 V24" stroke="#26190E" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M20 24 L8 12 M20 24 L32 12 M20 34 L6 24 M20 34 L34 24 M20 44 L8 36 M20 44 L32 36" stroke="#26190E" strokeWidth="2" strokeLinecap="round" fill="none" />
            </symbol>
            <symbol id="wf-hut" viewBox="0 0 50 55">
              <path d="M5 55 V32 L25 14 L45 32 V55 Z" fill="none" stroke="#26190E" strokeWidth="3" strokeLinejoin="round" />
              <path d="M17 55 V38 H33 V55" stroke="#26190E" strokeWidth="2.5" fill="none" />
              <path d="M25 14 V6" stroke="#26190E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </symbol>
          </defs>
          <g>
            <use href="#wf-walk" x="10" y="0" width="40" height="60" />
            <use href="#wf-tree" x="150" y="0" width="40" height="60" />
            <use href="#wf-dance" x="290" y="0" width="40" height="60" />
            <use href="#wf-hut" x="420" y="4" width="50" height="55" />
            <use href="#wf-carry" x="560" y="0" width="40" height="60" />
            <use href="#wf-tree" x="700" y="0" width="40" height="60" />
            <use href="#wf-walk" x="840" y="0" width="40" height="60" />
            <use href="#wf-dance" x="980" y="0" width="40" height="60" />
            <use href="#wf-hut" x="1110" y="4" width="50" height="55" />
            <use href="#wf-carry" x="1250" y="0" width="40" height="60" />
            <use href="#wf-tree" x="1390" y="0" width="40" height="60" />
            <use href="#wf-walk" x="1530" y="0" width="40" height="60" />
          </g>
        </svg>
      </div>    </>
  );
}
