const STEPS = ['Trip', 'Customize', 'Guide & driver', 'Stay', 'Details', 'Payment', 'Confirmed'];

export default function Stepper({ current = 0 }) {
  return (
    <div className="stepper" aria-label={`Step ${current + 1} of ${STEPS.length}`}>
      {STEPS.map((label, i) => (
        <div key={label} className={'step' + (i === current ? ' on' : '') + (i < current ? ' done' : '')}>
          <span className="step-dot">{i < current ? '✓' : i + 1}</span>
          <span>{label}</span>
          {i < STEPS.length - 1 && <span className="step-line" />}
        </div>
      ))}
    </div>
  );
}
