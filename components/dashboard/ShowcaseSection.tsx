"use client";

import Image from 'next/image';
import { useCopy } from "@/lib/copy";
import s from './dashboard.module.css';

// The Figma image frames are named after their photo but carry no fill, so the
// photos are sourced separately — from Wikimedia Commons, each one of the exact
// place the design names, under a licence that permits commercial use. CREDITS
// below carries the attribution CC BY and CC BY-SA require; keep it rendered.
type Card = {
  title: string;
  copy: string;
  region: string;
  photo: string;
  image: string | null;
};

type Credit = { photo: string; author: string; licence: string; href: string; page: string };

const CREDITS: Credit[] = [
  {
    photo: 'Leh–Manali Highway',
    author: 'Vyacheslav Argenberg',
    licence: 'CC BY 4.0',
    href: 'https://creativecommons.org/licenses/by/4.0/',
    page: 'https://commons.wikimedia.org/wiki/File:Leh-Manali_Highway,_Ladakh,_India.jpg',
  },
  {
    photo: 'Kedarnath temple',
    author: 'Shaq774',
    licence: 'Public domain',
    href: 'https://commons.wikimedia.org/wiki/File:Kedarnath_Temple.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Kedarnath_Temple.jpg',
  },
  {
    photo: 'Taj Lake Palace, Udaipur',
    author: 'Vyacheslav Argenberg',
    licence: 'CC BY 4.0',
    href: 'https://creativecommons.org/licenses/by/4.0/',
    page: 'https://commons.wikimedia.org/wiki/File:Udaipur,_India,_Taj_Lake_Palace.jpg',
  },
  {
    photo: 'Alleppey backwaters',
    author: 'Paul Arps',
    licence: 'CC BY 2.0',
    href: 'https://creativecommons.org/licenses/by/2.0/',
    page: 'https://commons.wikimedia.org/wiki/File:Houseboat_on_Alleppey_backwaters_(Kerala,_India_2023)_(52703799562).jpg',
  },
  {
    photo: 'National Memorial Chorten, Thimphu',
    author: 'Bernard Gagnon',
    licence: 'CC BY-SA 4.0',
    href: 'https://creativecommons.org/licenses/by-sa/4.0/',
    page: 'https://commons.wikimedia.org/wiki/File:National_Memorial_Chorten,_Thimphu_01.jpg',
  },
  {
    photo: 'Siikhe Lake, Ziro',
    author: 'Suraj Digrase',
    licence: 'CC0',
    href: 'https://creativecommons.org/publicdomain/zero/1.0/',
    page: 'https://commons.wikimedia.org/wiki/File:Siikhe_Lake_Ziro.jpg',
  },
  {
    photo: 'Radhanagar beach, Havelock',
    author: 'Vyacheslav Argenberg',
    licence: 'CC BY 4.0',
    href: 'https://creativecommons.org/licenses/by/4.0/',
    page: 'https://commons.wikimedia.org/wiki/File:Havelock_Island,_Radhanagar_Beach,_Andaman_Islands.jpg',
  },
  {
    photo: 'Key monastery, Spiti',
    author: 'Ksuryawanshi',
    licence: 'CC BY-SA 4.0',
    href: 'https://creativecommons.org/licenses/by-sa/4.0/',
    page: 'https://commons.wikimedia.org/wiki/File:Kee_monastery_Spiti_Valley.JPG',
  },
];

const CARDS: Card[] = [
  {
    title: 'Manali to Leh',
    copy: 'High-altitude passes and a driver who knows every hairpin.',
    region: 'Himalayas',
    photo: 'Leh–Manali Highway, Ladakh',
    image: '/photos/manali-leh.jpg'
  },
  {
    title: 'Char Dham Yatra',
    copy: 'Yamunotri to Badrinath — by road or helicopter.',
    region: 'Himalayas',
    photo: 'Kedarnath temple, Char Dham',
    image: '/photos/kedarnath.jpg'
  },
  {
    title: 'Rajasthan Heritage Trail',
    copy: 'Lake palaces, desert dunes, blue lanes of Jodhpur.',
    region: 'Rajasthan',
    photo: 'Taj Lake Palace, Udaipur',
    image: '/photos/udaipur.jpg'
  },
  {
    title: 'Kerala Backwaters',
    copy: 'Houseboats in Alleppey, coffee mornings in Coorg.',
    region: 'Deep South',
    photo: 'Alleppey backwaters, Kerala',
    image: '/photos/alleppey.jpg'
  },
  {
    title: 'Nepal & Bhutan Crossing',
    copy: 'Kathmandu, Pokhara, Thimphu, Paro — one continuous trip.',
    region: 'Nepal & Bhutan',
    photo: 'National Memorial Chorten, Thimphu, Bhutan',
    image: '/photos/thimphu.jpg'
  },
  {
    title: 'Offbeat Northeast',
    copy: "Ziro's pine valleys, Majuli's river island.",
    region: 'Offbeat',
    photo: 'Siikhe lake, Ziro, Arunachal Pradesh',
    image: '/photos/ziro.jpg'
  },
  {
    title: 'Andaman Islands',
    copy: 'Reefs, quiet beaches, island-hopping ferries.',
    region: 'Seaside',
    photo: 'Radhanagar beach, Havelock, Andaman',
    image: '/photos/radhanagar.jpg'
  },
  {
    title: 'Spiti Valley Circuit',
    copy: "Cold-desert monasteries under some of Bharat's bluest skies.",
    region: 'Himalayas',
    photo: 'Key monastery, Spiti Valley',
    image: '/photos/keymonastery.jpg'
  }
];

export default function ShowcaseSection() {
  const { line } = useCopy();
  return (
    <section className={s.showcase} id="showcase">
      <div className={s.showcaseHead}>
        <p className={s.eyebrow}>
          <span className={s.eyebrowBar} aria-hidden="true" />
          <span className={s.eyebrowWord}>{line("showcase.eyebrow", "Asli Tasveerein")}</span>
          <span className={s.eyebrowBar} aria-hidden="true" />
        </p>
        <h2>{line("showcase.h2", "Every arch and frieze on this page is drawn. These aren't.")}</h2>
      </div>

      <div className={s.showcaseGrid}>
        {CARDS.map((card) => (
          <article className={s.card} key={card.title}>
            {/* the wrapper no longer claims role="img" — the photo carries the
                alt itself, and both would be announced */}
            <div className={s.cardMedia}>
              {card.image ? (
                /* next/image so the 800px source is re-encoded and sized down
                   to the card — the JPEGs are ~180KB each as shipped */
                <Image
                  src={card.image}
                  alt={card.photo}
                  width={800}
                  height={543}
                  sizes="(max-width: 700px) 100vw, (max-width: 1160px) 45vw, 300px"
                />
              ) : null}
              <span className={s.cardRegion}>{card.region}</span>
            </div>
            <div className={s.cardBody}>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </div>
          </article>
        ))}
      </div>

      <p className={s.photoCredits}>
        <span className={s.photoCreditsLead}>Photographs:</span>{' '}
        {CREDITS.map((credit, i) => (
          <span key={credit.photo}>
            {i > 0 ? ' · ' : ''}
            <a href={credit.page} target="_blank" rel="noopener noreferrer">
              {credit.photo}
            </a>{' '}
            {credit.author},{' '}
            <a href={credit.href} target="_blank" rel="noopener noreferrer">
              {credit.licence}
            </a>
          </span>
        ))}
      </p>
    </section>
  );
}
