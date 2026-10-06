/**
 * Anko Ki Maya v3 — persisted language preference (EN ⇄ हिन्दी).
 * DEFAULT HINDI (owner order — Indian audience first); persisted.
 */

"use client";

import * as React from "react";
import { safeGet, safeSet } from "./safe-storage";
import { t } from "./content";
import type { Lang } from "./content";

const KEY = "akm.v3.lang";

export function loadLang(): Lang {
  return safeGet<Lang>(KEY) === "en" ? "en" : "hi";
}

export function saveLang(lang: Lang): void {
  safeSet(KEY, lang);
}

function subscribeLang(onChange: () => void): () => void {
  const onStorage = (event: StorageEvent) => {
    if (!event.key || event.key === KEY) onChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener("akm:lang-change", onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("akm:lang-change", onChange);
  };
}

function dispatchLangChange() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event("akm:lang-change"));
}

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LangContext = React.createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const lang = React.useSyncExternalStore<Lang>(subscribeLang, loadLang, () => "hi");

  const setLang = React.useCallback((l: Lang) => {
    saveLang(l);
    dispatchLangChange();
  }, []);

  // HINDI-TOTAL-LOOK (owner order 30 Sep: hindi option => menu/nav/font/headers SAB Devanagari feel):
  React.useEffect(() => {
    try {
      document.documentElement.dataset.lang = lang;      // CSS hooks
      document.documentElement.lang = lang === "hi" ? "hi" : "en";
    } catch { /* ssr-safe */ }
  }, [lang]);

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
