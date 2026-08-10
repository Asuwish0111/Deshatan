"use client";

import { useDeshatan } from "./context";
import { t } from "./i18n";

/* The dashboard's English copy is the designed copy — "Every arch and frieze on
   this page is drawn. These aren't." — where lib/i18n.ts carries a shorter
   generic label ("Featured Journeys"). Wiring everything through t() would gut
   the English voice to make the other nine work.
   So: English keeps what the design says, every other language takes the
   translation. Nothing here is machine-translated — all ten blocks in i18n.ts
   already existed. */
export function useCopy() {
  const { language } = useDeshatan();
  return {
    language,
    /** designed English, translated everything else */
    line: (key: string, english: string) =>
      language === "en" ? english : t(key, language) || english,
    /** for strings that only exist in i18n */
    t: (key: string) => t(key, language),
  };
}
