import s from "./dashboard.module.css";

type Rating = { stars: string; note: string; wide?: boolean };

type Feature = {
  tone: string;
  icon: string | null;
  title: string;
  copy: string;
  rating?: Rating;
  tags?: string[];
};

const FEATURES: Feature[] = [
  {
    tone: s.toneRed,
    icon: "/figma/icon-guide.svg",
    title: "Verified local guides",
    copy: "Every guide is ID-verified, background-checked, and rated by real yatris after every single trip. Read the reviews before you book — good, bad, everything stays public.",
    rating: {
      stars: "★★★★★",
      note: '"Ramesh bhai knew lanes in Varanasi no map shows." — Meera, Pune',
      wide: true,
    },
  },
  {
    tone: s.toneIndigo,
    icon: "/figma/icon-driver.svg",
    title: "Trusted drivers, reviewed rides",
    copy: "Drivers with verified licences, verified plates, and a review score that follows them everywhere. Sleep in the back seat on the Manali highway — someone's already vouched for the person up front.",
    rating: { stars: "★★★★☆", note: "4.7 avg · 9,300 driver reviews" },
  },
  {
    tone: s.tonePeacock,
    icon: "/figma/icon-stay.svg",
    title: "Your perfect custom stay",
    copy: "Not a hotel list — a hotel brief. Tell us haveli or homestay, rooftop or riverside, veg kitchen or no kitchen. We match stays to your rules, not an algorithm's.",
    tags: ["Havelis", "Homestays", "Tea estates", "Monasteries"],
  },
  {
    tone: s.toneGold,
    icon: "/figma/icon-offbeat.svg",
    title: "Offbeat Bharat",
    copy: "Ziro's pine valleys. Gandikota's canyon. Majuli's river island. Places your relatives haven't posted from — curated by locals, reachable with our guides and drivers.",
    tags: ["Ziro", "Gandikota", "Majuli", "Chettinad", "+320 more"],
  },
  {
    // the rupee icon is drawn from two vectors plus a ₹ glyph, not one export
    tone: s.toneIndigo,
    icon: null,
    title: "Budget sorting, sabse pehle",
    copy: 'Sort every trip, stay, guide and ride by price — low to high, high to low, or "surprise me under ₹X". Your budget is a filter, never a compromise.',
    tags: ["₹ Low → High", "Under ₹5k/day", "Best value"],
  },
  {
    tone: s.toneRed,
    icon: "/figma/icon-safety.svg",
    title: "Safety map — offline & online",
    copy: "Marked safe zones, women-recommended stays, nearest police chowki and hospital — and the whole map downloads to your phone. No signal in Spiti? The map still works.",
    tags: ["Works offline", "SOS button", "Chowki finder"],
  },
];

function BudgetIcon() {
  return (
    <span className={s.iconBudget}>
      <span className={s.budgetOuter}>
        <img src="/figma/icon-budget-a.svg" alt="" />
      </span>
      <span className={s.budgetGlyph}>₹</span>
      <span className={s.budgetInner}>
        <img src="/figma/icon-budget-b.svg" alt="" />
      </span>
    </span>
  );
}

export default function EverythingSection() {
  return (
    <section className={s.everything} id="features">
      <div className={s.everythingInner}>
        <div className={s.everythingHead}>
          <p className={s.eyebrow}>
            <span className={s.eyebrowBar} aria-hidden="true" />
            <span className={s.eyebrowWord}>Sab Kuch</span>
            <span className={s.eyebrowBar} aria-hidden="true" />
          </p>
          <h2>Six things every yatri deserves — and rarely gets in one place.</h2>
        </div>

        <div className={s.featureGrid}>
          {FEATURES.map((feature) => (
            <div className={`${s.feature} ${feature.tone}`} key={feature.title}>
              <div className={s.featureInner}>
                {feature.icon ? (
                  <span className={s.featureIcon}>
                    <img src={feature.icon} alt="" />
                  </span>
                ) : (
                  <BudgetIcon />
                )}
                <h3>{feature.title}</h3>
                <p className={s.featureCopy}>{feature.copy}</p>

                <div className={s.featureFoot}>
                  {feature.rating ? (
                    <div className={s.featureRule}>
                      <span className={s.stars}>{feature.rating.stars}</span>
                      <span
                        className={feature.rating.wide ? s.ratingNoteWide : s.ratingNote}
                      >
                        {feature.rating.note}
                      </span>
                    </div>
                  ) : (
                    <div className={`${s.featureRule} ${s.featureTags}`}>
                      {feature.tags?.map((tag) => (
                        <span className={s.tag} key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
