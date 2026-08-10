import { Language } from "@/types";

/* One source of truth for the switcher. Every one of these has a full block in
   lib/i18n.ts, so nothing here offers a language we cannot actually render. */
export const LANGUAGES: Language[] = [
  "en",
  "hi",
  "bn",
  "mr",
  "te",
  "ta",
  "gu",
  "ur",
  "kn",
  "or",
];

export const LANG_NAMES: Record<Language, string> = {
  en: "English",
  hi: "हिंदी",
  bn: "বাংলা",
  mr: "मराठी",
  te: "తెలుగు",
  ta: "தமிழ்",
  gu: "ગુજરાતી",
  ur: "اردو",
  kn: "ಕನ್ನಡ",
  or: "ଓଡ଼ିଆ",
};

/* Shown on the pill itself, where there is only room for a couple of glyphs. */
export const LANG_SHORT: Record<Language, string> = {
  en: "En",
  hi: "हि",
  bn: "বা",
  mr: "म",
  te: "తె",
  ta: "த",
  gu: "ગુ",
  ur: "اُر",
  kn: "ಕ",
  or: "ଓ",
};

/* Urdu is right-to-left. The layouts here were not built for RTL, so the
   switcher does not flip the document — it only marks the option itself. */
export const RTL: Language[] = ["ur"];
