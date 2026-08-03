'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const KEY = 'deshatan-draft';
const EMPTY = {
  destId: null, days: 7, pax: 2, style: 'comfort', pace: 'balanced',
  meal: 'breakfast', pickup: 'self', occasion: 'none', addons: [],
  guideId: null, driverId: null, stayId: null, roomTier: 'standard',
  guestName: '', guestEmail: '', guestPhone: '', startDate: ''
};

const DraftContext = createContext({ draft: EMPTY, setDraft: () => {}, ready: false });
export const useDraft = () => useContext(DraftContext);

export default function DraftProvider({ children }) {
  const [draft, setDraftState] = useState(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(KEY);
      if (saved) setDraftState({ ...EMPTY, ...JSON.parse(saved) });
    } catch {}
    setReady(true);
  }, []);

  const setDraft = (patch) => {
    setDraftState((prev) => {
      const next = typeof patch === 'function' ? patch(prev) : { ...prev, ...patch };
      try { sessionStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  return <DraftContext.Provider value={{ draft, setDraft, ready }}>{children}</DraftContext.Provider>;
}
