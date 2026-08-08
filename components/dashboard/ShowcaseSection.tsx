import s from './dashboard.module.css';

// The Figma image frames are named after their photo but carry no fill,
// so each card renders the empty sand plate the design shows. Drop a URL
// into `image` to light a card up.
type Card = {
  title: string;
  copy: string;
  region: string;
  photo: string;
  image: string | null;
};

const CARDS: Card[] = [
  {
    title: 'Manali to Leh',
    copy: 'High-altitude passes and a driver who knows every hairpin.',
    region: 'Himalayas',
    photo: 'Leh–Manali Highway, Ladakh',
    image: null
  },
  {
    title: 'Char Dham Yatra',
    copy: 'Yamunotri to Badrinath — by road or helicopter.',
    region: 'Himalayas',
    photo: 'Kedarnath temple, Char Dham',
    image: null
  },
  {
    title: 'Rajasthan Heritage Trail',
    copy: 'Lake palaces, desert dunes, blue lanes of Jodhpur.',
    region: 'Himalayas',
    photo: 'Taj Lake Palace, Udaipur',
    image: null
  },
  {
    title: 'Kerala Backwaters',
    copy: 'Houseboats in Alleppey, coffee mornings in Coorg.',
    region: 'Himalayas',
    photo: 'Alleppey backwaters, Kerala',
    image: null
  },
  {
    title: 'Nepal & Bhutan Crossing',
    copy: 'Kathmandu, Pokhara, Thimphu, Paro — one continuous trip.',
    region: 'Himalayas',
    photo: 'National Memorial Chorten, Thimphu, Bhutan',
    image: null
  },
  {
    title: 'Offbeat Northeast',
    copy: "Ziro's pine valleys, Majuli's river island.",
    region: 'Himalayas',
    photo: 'Siikhe lake, Ziro, Arunachal Pradesh',
    image: null
  },
  {
    title: 'Andaman Islands',
    copy: 'Reefs, quiet beaches, island-hopping ferries.',
    region: 'Himalayas',
    photo: 'Radhanagar beach, Havelock, Andaman',
    image: null
  },
  {
    title: 'Spiti Valley Circuit',
    copy: "Cold-desert monasteries under some of Bharat's bluest skies.",
    region: 'Himalayas',
    photo: 'Key monastery, Spiti Valley',
    image: null
  }
];

export default function ShowcaseSection() {
  return (
    <section className={s.showcase} id="showcase">
      <div className={s.showcaseHead}>
        <p className={s.eyebrow}>
          <span className={s.eyebrowBar} aria-hidden="true" />
          <span className={s.eyebrowWord}>Asli Tasveerein</span>
          <span className={s.eyebrowBar} aria-hidden="true" />
        </p>
        <h2>Every arch and frieze on this page is drawn. These aren&apos;t.</h2>
      </div>

      <div className={s.showcaseGrid}>
        {CARDS.map((card) => (
          <article className={s.card} key={card.title}>
            <div className={s.cardMedia} role="img" aria-label={card.photo}>
              {card.image ? <img src={card.image} alt={card.photo} loading="lazy" /> : null}
              <span className={s.cardRegion}>{card.region}</span>
            </div>
            <div className={s.cardBody}>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
