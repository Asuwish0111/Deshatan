import s from "./dashboard.module.css";

// Each scene is a stack of exported vectors. The insets are the design's own —
// the nested one, where present, is the stroke bleed Figma puts around a layer.
type Layer = { src: string; inset: string; bleed?: string };

type Card = {
  title: string;
  kicker: string;
  copy: string;
  points: string[];
  art: Layer[];
};

const CARDS: Card[] = [
  {
    title: "For couples",
    kicker: "Do log, ek raasta",
    copy: "Udaipur lake palaces, Coorg coffee mornings, houseboat nights in Alleppey. Private drivers, candlelit havelis, zero group tours.",
    points: [
      "Honeymoon & anniversary circuits",
      "Couple-rated stays only",
      "Photographer add-on in 22 cities",
    ],
    art: [
      { src: "/figma/ay1-0.svg", inset: "-3.3% 0" },
      { src: "/figma/ay1-1.svg", inset: "8.88% 34.67% 44.42% 34.67%" },
      { src: "/figma/ay1-2.svg", inset: "62.69% 0 -3.3% 0" },
      { src: "/figma/ay1-3.svg", inset: "77.92% 39.33% -3.3% 39.33%" },
      { src: "/figma/ay1-4.svg", inset: "67.26% 42% 22.08% 42%" },
      {
        src: "/figma/ay1-5.svg",
        inset: "20.56% 69.33% 76.9% 20%",
        bleed: "-25% -3.5% -37.56% -3.5%",
      },
    ],
  },
  {
    title: "For the young & restless",
    kicker: "Trek, track, repeat",
    copy: "Kedarkantha summits, Spiti bike circuits, Rishikesh rapids. Graded treks with certified leads and your live track shared home automatically.",
    points: [
      "60+ graded treks, all seasons",
      "Hostel & camp bookings sorted by ₹",
      "Group point-pools for squad trips",
    ],
    art: [
      { src: "/figma/ay2-0.svg", inset: "-3.3% 0" },
      { src: "/figma/ay2-1.svg", inset: "27.16% -6.67% -3.3% -3.33%" },
      { src: "/figma/ay2-2.svg", inset: "27.16% 60% 50% 20%" },
      { src: "/figma/ay2-3.svg", inset: "42.39% 15% 38.32% 68.33%" },
      { src: "/figma/ay2-4.svg", inset: "5.84% 8.67% 67.77% 74%" },
      {
        src: "/figma/ay2-5.svg",
        inset: "89.59% 50% 6.85% 10%",
        bleed: "-28.57% -0.58% -30.97% -0.58%",
      },
    ],
  },
  {
    title: "For silver yatris",
    kicker: "Aaram se, poore shaan se",
    copy: "Char Dham by helicopter or by road — your pace, your choice. Doctors on call, lift-access stays, drivers rated for gentle highway driving.",
    points: [
      "Senior-paced itineraries, longer halts",
      "Medical support in every package",
      "Family gets live tracking by default",
    ],
    art: [
      { src: "/figma/ay3-0.svg", inset: "-3.3% 0" },
      { src: "/figma/ay3-1.svg", inset: "19.04% 36.67% 40.36% 36.67%" },
      { src: "/figma/ay3-2.svg", inset: "67.77% 34.67% -3.3% 34.67%" },
      { src: "/figma/ay3-3.svg", inset: "56.6% 34.67% 32.23% 34.67%" },
      {
        src: "/figma/ay3-4.svg",
        inset: "72.84% 32% -3.3% 32%",
        bleed: "-4.17% 0 0 -2.08%",
      },
      { src: "/figma/ay3-5.svg", inset: "79.95% 44.67% -3.3% 44.67%" },
      { src: "/figma/ay3-6.svg", inset: "103.3% 0 -3.3% 0", bleed: "-3.11px 0" },
    ],
  },
];

export default function AapkiYatraSection() {
  return (
    <section className={s.yatra} id="itineraries">
      <div className={s.yatraInner}>
        <div className={s.yatraHead}>
          <p className={s.eyebrow}>
            <span className={s.eyebrowBar} aria-hidden="true" />
            <span className={s.eyebrowWord}>Aapki Yatra</span>
            <span className={s.eyebrowBar} aria-hidden="true" />
          </p>
          <h2>Every age travels differently. So does every itinerary here.</h2>
        </div>

        <div className={s.yatraGrid}>
          {CARDS.map((card) => (
            <article className={s.yatraCard} key={card.title}>
              <div className={s.yatraArtFrame}>
                <div className={s.yatraArt} aria-hidden="true">
                  {card.art.map((layer) => (
                    <span
                      className={s.yatraArtLayer}
                      key={layer.src}
                      style={{ inset: layer.inset }}
                    >
                      <span style={{ position: "absolute", inset: layer.bleed ?? "0" }}>
                        <img src={layer.src} alt="" />
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              <div className={s.yatraBody}>
                <h3>{card.title}</h3>
                <p className={s.yatraKicker}>{card.kicker}</p>
                <p className={s.yatraCopy}>{card.copy}</p>
                <ul className={s.yatraPoints}>
                  {card.points.map((point) => (
                    <li key={point}>
                      <span aria-hidden="true">✦</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
