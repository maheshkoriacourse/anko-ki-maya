/**
 * Anko Ki Maya v2 — persisted language preference (EN ⇄ हिन्दी).
 * Default is English; the toggle lives in Settings and the app shell.
 */

"use client";

import * as React from "react";
import { safeGet, safeSet } from "./safe-storage";
import { t } from "./content";
import type { Lang } from "./content";

const KEY = "akm.v2.lang";

export function loadLang(): Lang {
  return safeGet<Lang>(KEY) === "hi" ? "hi" : "en";
}

export function saveLang(lang: Lang): void {
  safeSet(KEY, lang);
}

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LangContext = React.createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>("en");

  React.useEffect(() => {
    setLangState(loadLang());
  }, []);

  const setLang = React.useCallback((l: Lang) => {
    setLangState(l);
    saveLang(l);
  }, []);

  const value = React.useMemo(() => ({ lang, setLang }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): Ctx {
  const ctx = React.useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}

/** Convenience: current language + `t()` bound to it. */
export function useT() {
  const { lang } = useLang();
  const bound = React.useCallback((key: string) => t(lang, key), [lang]);
  return { lang, t: bound };
}