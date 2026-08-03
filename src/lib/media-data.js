// extracted from the original single-file prototype
const data = {
 "SCENE_PHOTOS": {
  "mountain": "https://commons.wikimedia.org/wiki/Special:FilePath/Chandratal_lake_of_Spiti_valley.jpg?width=700",
  "temple": "https://commons.wikimedia.org/wiki/Special:FilePath/Madurai_Meenakshi_Amman_Temple_Gopuram.jpg?width=700",
  "monastery": "https://commons.wikimedia.org/wiki/Special:FilePath/Tawang_Monastery,_Arunachal_Pradesh.jpg?width=700",
  "desert": "https://commons.wikimedia.org/wiki/Special:FilePath/Thar_Desert,_India,_Sand_dunes.jpg?width=700",
  "backwater": "https://commons.wikimedia.org/wiki/Special:FilePath/Kerala_Backwaters,_India.JPG?width=700",
  "forest": "https://commons.wikimedia.org/wiki/Special:FilePath/Western_Ghats_Kerala.jpg?width=700",
  "beach": "https://commons.wikimedia.org/wiki/Special:FilePath/Cliffs_of_Varkala.jpg?width=700",
  "heritage": "https://commons.wikimedia.org/wiki/Special:FilePath/Hawa_Mahal_2011.jpg?width=700",
  "village": "https://commons.wikimedia.org/wiki/Special:FilePath/The_village_of_Tosh_in_Himachal_Pradesh,_India_(photo_by_Jim_Ankan_Deka).jpg?width=700"
 },
 "REGION_PHOTOS": {
  "Andhra Pradesh": "https://commons.wikimedia.org/wiki/Special:FilePath/A_view_of_Araku_Valley_hill_station_in_Andhra_Pradesh.jpg?width=700",
  "Himachal Pradesh": "https://commons.wikimedia.org/wiki/Special:FilePath/Chandratal_lake_of_Spiti_valley.jpg?width=700",
  "Gujarat": "https://commons.wikimedia.org/wiki/Special:FilePath/Sunset_at_Rann_of_Kutch,_Dhordo,_Gujarat.jpg?width=700",
  "Karnataka": "https://commons.wikimedia.org/wiki/Special:FilePath/Hampi_karnataka.jpg?width=700",
  "Kerala": "https://commons.wikimedia.org/wiki/Special:FilePath/Kerala_Backwaters,_India.JPG?width=700",
  "Madhya Pradesh": "https://commons.wikimedia.org/wiki/Special:FilePath/Kanderia_Mahadeo_temple,_Khajuraho,_Madhya_Pradesh.JPG?width=700",
  "Jharkhand": "https://commons.wikimedia.org/wiki/Special:FilePath/Hill_station_of_jharkhand,Netarhat.jpg?width=700",
  "Maharashtra": "https://commons.wikimedia.org/wiki/Special:FilePath/Aerial_view_of_Ellora_Caves,_Maharashtra.jpg?width=700",
  "Goa": "https://commons.wikimedia.org/wiki/Special:FilePath/Palolem_Sunset.JPG?width=700",
  "Odisha": "https://commons.wikimedia.org/wiki/Special:FilePath/Boat_ride_on_Chilika_Lake,_Balugaon,_Odisha,_India.jpg?width=700",
  "Meghalaya": "https://commons.wikimedia.org/wiki/Special:FilePath/Mawlynnong's_Living_Root_Bridge_in_Meghalaya,_India.jpg?width=700",
  "Chhattisgarh": "https://commons.wikimedia.org/wiki/Special:FilePath/Chitrakot_waterfalls.JPG?width=700",
  "Haryana": "https://commons.wikimedia.org/wiki/Special:FilePath/Sultanpur_Bird_Sanctuary,_Haryana..JPG?width=700",
  "Manipur": "https://commons.wikimedia.org/wiki/Special:FilePath/Loktak_Lake_View.jpg?width=700",
  "Bihar": "https://commons.wikimedia.org/wiki/Special:FilePath/Mahabodhi_Temple_Bodh_Gaya_Bihar_India.jpg?width=700",
  "Mizoram": "https://commons.wikimedia.org/wiki/Special:FilePath/Reiek.JPG?width=700",
  "Nagaland": "https://commons.wikimedia.org/wiki/Special:FilePath/The_breathtaking_beauty_of_the_Dzukou_Valley.jpg?width=700",
  "Punjab": "https://commons.wikimedia.org/wiki/Special:FilePath/Golden_Temple,Amritsar.JPG?width=700",
  "Assam": "https://commons.wikimedia.org/wiki/Special:FilePath/One-Horned_Rhino_at_the_Kaziranga_National_Park,_Assam.jpg?width=700",
  "Arunachal Pradesh": "https://commons.wikimedia.org/wiki/Special:FilePath/Siikhe_lake_in_Ziro,_Arunachal_Pradesh.jpg?width=700"
 },
 "REGION_MULT": {
  "Himalayas": 1.1,
  "Rajasthan": 1,
  "Deep South": 1.05,
  "Nepal & Bhutan": 1.3,
  "Seven Sisters": 1.15,
  "Coasts & Islands": 1.2,
  "Himachal Pradesh": 1.1,
  "Punjab": 1.1,
  "Haryana": 1.1,
  "Arunachal Pradesh": 1.12,
  "Assam": 1.12,
  "Manipur": 1.12,
  "Meghalaya": 1.12,
  "Mizoram": 1.12,
  "Nagaland": 1.12,
  "Kerala": 1.12,
  "Karnataka": 1.12,
  "Chhattisgarh": 1.12,
  "Jharkhand": 1.12,
  "Goa": 1.08,
  "Andhra Pradesh": 1.08,
  "Gujarat": 1.08,
  "Maharashtra": 1.08,
  "Odisha": 1.08,
  "Bihar": 1,
  "Madhya Pradesh": 1
 },
 "REGION_ACCENT": {
  "Himalayas": {
   "bg": "var(--indigo-accent)",
   "text": "var(--paper)"
  },
  "Rajasthan": {
   "bg": "var(--marigold-accent)",
   "text": "var(--ink)"
  },
  "Deep South": {
   "bg": "var(--peacock-accent)",
   "text": "var(--paper)"
  },
  "Nepal & Bhutan": {
   "bg": "var(--indigo-accent)",
   "text": "var(--paper)"
  },
  "Seven Sisters": {
   "bg": "var(--peacock-accent)",
   "text": "var(--paper)"
  },
  "Coasts & Islands": {
   "bg": "var(--sindoor-accent)",
   "text": "var(--paper)"
  },
  "Himachal Pradesh": {
   "bg": "var(--indigo-accent)",
   "text": "var(--paper)"
  },
  "Punjab": {
   "bg": "var(--indigo-accent)",
   "text": "var(--paper)"
  },
  "Haryana": {
   "bg": "var(--indigo-accent)",
   "text": "var(--paper)"
  },
  "Arunachal Pradesh": {
   "bg": "var(--peacock-accent)",
   "text": "var(--paper)"
  },
  "Assam": {
   "bg": "var(--peacock-accent)",
   "text": "var(--paper)"
  },
  "Manipur": {
   "bg": "var(--peacock-accent)",
   "text": "var(--paper)"
  },
  "Meghalaya": {
   "bg": "var(--peacock-accent)",
   "text": "var(--paper)"
  },
  "Mizoram": {
   "bg": "var(--peacock-accent)",
   "text": "var(--paper)"
  },
  "Nagaland": {
   "bg": "var(--peacock-accent)",
   "text": "var(--paper)"
  },
  "Kerala": {
   "bg": "var(--peacock-accent)",
   "text": "var(--paper)"
  },
  "Karnataka": {
   "bg": "var(--peacock-accent)",
   "text": "var(--paper)"
  },
  "Chhattisgarh": {
   "bg": "var(--peacock-accent)",
   "text": "var(--paper)"
  },
  "Jharkhand": {
   "bg": "var(--peacock-accent)",
   "text": "var(--paper)"
  },
  "Goa": {
   "bg": "var(--sindoor-accent)",
   "text": "var(--paper)"
  },
  "Andhra Pradesh": {
   "bg": "var(--sindoor-accent)",
   "text": "var(--paper)"
  },
  "Gujarat": {
   "bg": "var(--sindoor-accent)",
   "text": "var(--paper)"
  },
  "Maharashtra": {
   "bg": "var(--sindoor-accent)",
   "text": "var(--paper)"
  },
  "Odisha": {
   "bg": "var(--sindoor-accent)",
   "text": "var(--paper)"
  },
  "Bihar": {
   "bg": "var(--marigold-accent)",
   "text": "var(--ink)"
  },
  "Madhya Pradesh": {
   "bg": "var(--marigold-accent)",
   "text": "var(--ink)"
  }
 },
 "STAY_SCENE": {
  "Homestay": "village",
  "Haveli": "heritage",
  "Camp": "desert",
  "Houseboat": "backwater",
  "Resort": "beach"
 }
};
export default data;
