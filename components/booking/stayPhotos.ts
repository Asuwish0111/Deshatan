import { Stay } from "@/types";

/* Photographs of the place and the kind of stay — not of the property's own
   rooms, which we hold no rights-cleared photography of. Captions say what
   each frame actually shows. Sourced from Wikimedia Commons under licences
   permitting commercial use; CC BY and CC BY-SA require the credit line, so
   keep StayGallery's caption rendered. */
export type StayPhoto = {
  src: string;
  area: string;
  author: string;
  licence: string;
  page: string;
};

export const STAY_PHOTOS: Record<string, StayPhoto[]> = {
  s1: [
    {
      src: "/stays/s1-1.jpg",
      area: "Manali, Himachal Pradesh",
      author: "Vyacheslav Argenberg",
      licence: "CC BY 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Deepak_Tal_Lake,_Leh-Manali_Highway,_Himachal_Pradesh,_India.jpg",
    },
    {
      src: "/stays/s1-2.jpg",
      area: "Manali, Himachal Pradesh",
      author: "Koshy Koshy from Faridabad, Haryana, India",
      licence: "CC BY 2.0",
      page: "https://commons.wikimedia.org/wiki/File:Himachal_Pradesh_Landscape_(2893593541).jpg",
    },
    {
      src: "/stays/s1-3.jpg",
      area: "Manali, Himachal Pradesh",
      author: "Vyacheslav Argenberg",
      licence: "CC BY 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Leh-Manali_Highway,_Himachal_Pradesh,_India.jpg",
    },
  ],
  s2: [
    {
      src: "/stays/s2-1.jpg",
      area: "Alappuzha backwaters, Kerala",
      author: "Exotica489",
      licence: "CC0",
      page: "https://commons.wikimedia.org/wiki/File:Experience_Luxury_on_an_Alappuzha_Houseboat_with_Exotica_Cruises.jpg",
    },
    {
      src: "/stays/s2-2.jpg",
      area: "Alappuzha backwaters, Kerala",
      author: "Paul Arps from The Netherlands",
      licence: "CC BY 2.0",
      page: "https://commons.wikimedia.org/wiki/File:Houseboat_on_Alleppey_backwaters_(Kerala,_India_2023)_(52703799562).jpg",
    },
    {
      src: "/stays/s2-3.jpg",
      area: "Alappuzha backwaters, Kerala",
      author: "Paul Arps from The Netherlands",
      licence: "CC BY 2.0",
      page: "https://commons.wikimedia.org/wiki/File:Houseboat_on_Alleppey_backwaters_(Kerala,_India_2023)_(52703799587).jpg",
    },
  ],
  s3: [
    {
      src: "/stays/s3-1.jpg",
      area: "Jaipur, Rajasthan",
      author: "This image was taken by Vyacheslav Argenberg If you have a",
      licence: "CC BY 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Jaipur,_India,_City_Palace,_Diwan-i_Khas.jpg",
    },
    {
      src: "/stays/s3-2.jpg",
      area: "Jaipur, Rajasthan",
      author: "Vyacheslav Argenberg",
      licence: "CC BY 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Jaipur,_India,_City_Palace,_Diwan-i_Khas_2.jpg",
    },
    {
      src: "/stays/s3-3.jpg",
      area: "Jaipur, Rajasthan",
      author: "This image was taken by Vyacheslav Argenberg If you have a",
      licence: "CC BY 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Jaipur,_India,_City_Palace,_Halls.jpg",
    },
  ],
  s4: [
    {
      src: "/stays/s4-1.jpg",
      area: "Spiti valley, Himachal Pradesh",
      author: "Sumita Roy Dutta",
      licence: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Chau_Chau_Kang_Nilda(CCKN)_peak_of_Spiti_Himachal_Pradesh_from_Komic_village_to_Demul_Vllage.jpg",
    },
    {
      src: "/stays/s4-2.jpg",
      area: "Spiti valley, Himachal Pradesh",
      author: "Shivendujha",
      licence: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Dhangkar_Lake.jpg",
    },
    {
      src: "/stays/s4-3.jpg",
      area: "Spiti valley, Himachal Pradesh",
      author: "Deepank Ranka",
      licence: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Dhankar_Gompa,_Spiti.jpg",
    },
  ],
  s5: [
    {
      src: "/stays/s5-1.jpg",
      area: "Guptkashi, Uttarakhand",
      author: "Ms Sarah Welch",
      licence: "CC0",
      page: "https://commons.wikimedia.org/wiki/File:A_distant_view_of_Damyanti_Temple,_Hyun_Uttarakhand.jpg",
    },
    {
      src: "/stays/s5-2.jpg",
      area: "Guptkashi, Uttarakhand",
      author: "https://www.flickr.com/photos/gaurav-agrawal/",
      licence: "CC BY 2.0",
      page: "https://commons.wikimedia.org/wiki/File:Chaukhamba_peak,_Garhwal_Himalayas,_Uttarakhand.jpg",
    },
  ],
  s6: [
    {
      src: "/stays/s6-1.jpg",
      area: "Wayanad, Kerala",
      author: "Jaseem Hamza",
      licence: "CC BY 3.0",
      page: "https://commons.wikimedia.org/wiki/File:Tea_Plantation,_Wayanad_Hill_Station_-_panoramio.jpg",
    },
    {
      src: "/stays/s6-2.jpg",
      area: "Wayanad, Kerala",
      author: "Jaseem Hamza",
      licence: "CC BY 3.0",
      page: "https://commons.wikimedia.org/wiki/File:Tea_Plantation,_Wayanad_Hill_Station_-_panoramio_(1).jpg",
    },
    {
      src: "/stays/s6-3.jpg",
      area: "Wayanad, Kerala",
      author: "Jaseem Hamza",
      licence: "CC BY 3.0",
      page: "https://commons.wikimedia.org/wiki/File:Tea_Plantation,_Wayanad_Hill_Station_-_panoramio_(11).jpg",
    },
  ],
  s7: [
    {
      src: "/stays/s7-1.jpg",
      area: "Fort Kochi, Kerala",
      author: "Ingo Mehling",
      licence: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Fort_Emmanuel_Kochi.jpg",
    },
    {
      src: "/stays/s7-2.jpg",
      area: "Fort Kochi, Kerala",
      author: "Robert Helvie",
      licence: "CC BY-SA 3.0",
      page: "https://commons.wikimedia.org/wiki/File:Fort_Kochi,_Kochi,_Kerala,_India_-_panoramio.jpg",
    },
    {
      src: "/stays/s7-3.jpg",
      area: "Fort Kochi, Kerala",
      author: "Ingo Mehling",
      licence: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Fort_Kochi_-_Fisher_-_3.jpg",
    },
  ],
  s8: [
    {
      src: "/stays/s8-1.jpg",
      area: "Jodhpur, Rajasthan",
      author: "Michi.nico",
      licence: "Public domain",
      page: "https://commons.wikimedia.org/wiki/File:Jodhpur_2005.jpg",
    },
    {
      src: "/stays/s8-2.jpg",
      area: "Jodhpur, Rajasthan",
      author: "Nico Crisafulli from USA",
      licence: "CC BY 2.0",
      page: "https://commons.wikimedia.org/wiki/File:Blue_houses_in_Jodhpur_seen_from_Mehrangarh_Fort,_India_set-473_(5581471860).jpg",
    },
    {
      src: "/stays/s8-3.jpg",
      area: "Jodhpur, Rajasthan",
      author: "Francisco Anzola",
      licence: "CC BY 2.0",
      page: "https://commons.wikimedia.org/wiki/File:Jodhpur_from_Fort_(1580958429).jpg",
    },
  ],
  s9: [
    {
      src: "/stays/s9-1.jpg",
      area: "Jaisalmer, Rajasthan",
      author: "sushmita balasubramani",
      licence: "CC BY 2.0",
      page: "https://commons.wikimedia.org/wiki/File:Thar_desert_Rajasthan_India.jpg",
    },
    {
      src: "/stays/s9-2.jpg",
      area: "Jaisalmer, Rajasthan",
      author: "DineshLKotia",
      licence: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Rajasthani_Folk_dance.jpg",
    },
  ],
  s10: [
    {
      src: "/stays/s10-1.jpg",
      area: "Ziro valley, Arunachal Pradesh",
      author: "Suraj Digrase",
      licence: "CC0",
      page: "https://commons.wikimedia.org/wiki/File:Raga_Arunachal_Pradesh_(31172).jpg",
    },
    {
      src: "/stays/s10-2.jpg",
      area: "Ziro valley, Arunachal Pradesh",
      author: "Suraj Digrase",
      licence: "CC0",
      page: "https://commons.wikimedia.org/wiki/File:Raga_Arunachal_Pradesh_(31668).jpg",
    },
    {
      src: "/stays/s10-3.jpg",
      area: "Ziro valley, Arunachal Pradesh",
      author: "Suraj Digrase",
      licence: "CC0",
      page: "https://commons.wikimedia.org/wiki/File:Raga_Arunachal_Pradesh_(39435).jpg",
    },
  ],
  s11: [
    {
      src: "/stays/s11-1.jpg",
      area: "Shillong, Meghalaya",
      author: "sangeeta1975",
      licence: "CC BY 2.0",
      page: "https://commons.wikimedia.org/wiki/File:Near_Shillong_Meghalaya_India.jpg",
    },
    {
      src: "/stays/s11-2.jpg",
      area: "Shillong, Meghalaya",
      author: "Avor Meyase001",
      licence: "CC BY-SA 3.0",
      page: "https://commons.wikimedia.org/wiki/File:Hills_of_Shillong.jpg",
    },
    {
      src: "/stays/s11-3.jpg",
      area: "Shillong, Meghalaya",
      author: "Original: Chirnzb Derivative work: UnpetitproleX",
      licence: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Khrangsuri_waterfall,_Meghalaya_01_(edit).jpg",
    },
  ],
  s12: [
    {
      src: "/stays/s12-1.jpg",
      area: "Havelock Island, Andaman",
      author: "Vyacheslav Argenberg",
      licence: "CC BY 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Havelock_Island,_Ethereal_mangrove_tree,_Andaman_Islands.jpg",
    },
    {
      src: "/stays/s12-2.jpg",
      area: "Havelock Island, Andaman",
      author: "Vyacheslav Argenberg",
      licence: "CC BY 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Havelock_Island,_Forest_on_the_beach_2,_Andaman_Islands.jpg",
    },
    {
      src: "/stays/s12-3.jpg",
      area: "Havelock Island, Andaman",
      author: "Vyacheslav Argenberg",
      licence: "CC BY 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Havelock_Island,_Lonely_mangrove_tree,_Andaman_Islands.jpg",
    },
  ],
  s13: [
    {
      src: "/stays/s13-1.jpg",
      area: "Thimphu, Bhutan",
      author: "Bernard Gagnon",
      licence: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Balconies_on_Norzin_Lam,_Thimphu.jpg",
    },
    {
      src: "/stays/s13-2.jpg",
      area: "Thimphu, Bhutan",
      author: "Stephen Shephard",
      licence: "CC BY-SA 3.0",
      page: "https://commons.wikimedia.org/wiki/File:Memorial_Chorten,_Thimphu_2.jpg",
    },
    {
      src: "/stays/s13-3.jpg",
      area: "Thimphu, Bhutan",
      author: "Christopher J. Fynn",
      licence: "CC BY-SA 3.0",
      page: "https://commons.wikimedia.org/wiki/File:National_Library-Thimphu-Bhutan-2008_01_23.jpg",
    },
  ],
  s14: [
    {
      src: "/stays/s14-1.jpg",
      area: "Pokhara, Nepal",
      author: "Vyacheslav Argenberg",
      licence: "CC BY 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Phewa_Lake,_Pokhara,_Nepal.jpg",
    },
    {
      src: "/stays/s14-2.jpg",
      area: "Pokhara, Nepal",
      author: "Vyacheslav Argenberg",
      licence: "CC BY 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Phewa_Lake_2,_Pokhara,_Nepal.jpg",
    },
  ],
};

export const photosFor = (stay: Stay): StayPhoto[] => STAY_PHOTOS[stay.id] ?? [];
