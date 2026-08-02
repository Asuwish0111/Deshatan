"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Database, Language } from "@/types";
import { seedDatabase } from "./db";

interface DeshatanContextType {
  db: Database;
  language: Language;
  setLanguage: (lang: Language) => void;
  updateDB: (updater: (db: Database) => Database) => void;
}

const DeshatanContext = createContext<DeshatanContextType | undefined>(
  undefined
);

export function DeshatanProvider({ children }: { children: React.ReactNode }) {
  const [db, setDB] = useState<Database | null>(null);
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("deshatan-lang") as Language;
    const savedDB = localStorage.getItem("deshatan-db");

    if (savedLang) setLanguageState(savedLang);

    if (savedDB) {
      try {
        setDB(JSON.parse(savedDB));
      } catch {
        setDB(seedDatabase());
      }
    } else {
      setDB(seedDatabase());
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("deshatan-lang", lang);
    document.body.className = `lang-${lang}`;
  };

  const updateDB = (updater: (db: Database) => Database) => {
    setDB((prev) => {
      if (!prev) return prev;
      const updated = updater(prev);
      localStorage.setItem("deshatan-db", JSON.stringify(updated));
      return updated;
    });
  };

  if (!db) {
    return <div>Loading...</div>;
  }

  return (
    <DeshatanContext.Provider value={{ db, language, setLanguage, updateDB }}>
      {children}
    </DeshatanContext.Provider>
  );
}

export function useDeshatan() {
  const context = useContext(DeshatanContext);
  if (!context) {
    throw new Error("useDeshatan must be used within DeshatanProvider");
  }
  return context;
}
