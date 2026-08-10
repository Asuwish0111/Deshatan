import { StayPhoto } from "@/components/booking/stayPhotos";

/* Attribution for the showcase photography. CC BY and CC BY-SA make this a
   licence condition, not a courtesy — it has to stay reachable from the pages
   that use the images, which is what /credits is for. */
export type Credit = {
  photo: string;
  author: string;
  licence: string;
  href: string;
  page: string;
};

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

export const SHOWCASE_CREDITS = CREDITS;

/* Not every licence needs a name: CC0 and public-domain images are here for
   completeness, but only the CC BY / CC BY-SA ones are required. */
export const REQUIRES_ATTRIBUTION = (licence: string) =>
  licence.startsWith("CC BY");

export type AnyCredit = Credit | StayPhoto;
