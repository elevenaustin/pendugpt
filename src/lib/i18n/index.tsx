import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { en } from "./en";
import { pa } from "./pa";
import type { Dict } from "./en";

export type Lang = "en" | "pa";

const DICTS: Record<Lang, Dict> = { en, pa };
export const STORAGE_KEY = "pendugpt.lang";

type I18nValue = {
  lang: Lang;
  t: Dict;
  setLang: (lang: Lang) => void;
  chosen: boolean;
  hydrated: boolean;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [chosen, setChosen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "pa") {
        setLangState(stored);
        setChosen(true);
      }
    } catch {
      /* storage unavailable */
    }
    setHydrated(true);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    setChosen(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable */
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = next === "pa" ? "pa" : "en";
    }
  }, []);

  const value = useMemo<I18nValue>(
    () => ({ lang, t: DICTS[lang], setLang, chosen, hydrated }),
    [lang, setLang, chosen, hydrated],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
