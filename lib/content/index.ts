/**
 * Anko Ki Maya v2 — Content router + UI strings (EN / HI).
 *
 * `useLang` reads the persisted preference (akm.v2.lang) — default EN, stored
 * in Settings. Components call `t()` for shared labels and the number-content
 * getters for interpretive copy.
 */

export type Lang = "en" | "hi";

import {
  NUMBER_CONTENT_EN,
  MASTER_CONTENT_EN,
  ZERO_MASTERS_EN,
  KARMIC_DEBT_CONTENT_EN,
  KARMIC_LESSON_EN,
  BRIDGE_CONTENT_EN,
  HIDDEN_PASSION_EN,
  BALANCE_NOTE_EN,
  RATIONAL_THOUGHT_EN,
  type NumberContent,
} from "./numbers-en";
import {
  NUMBER_CONTENT_HI,
  MASTER_CONTENT_HI,
  ZERO_MASTERS_HI,
  KARMIC_DEBT_CONTENT_HI,
  KARMIC_LESSON_HI,
  BRIDGE_CONTENT_HI,
  HIDDEN_PASSION_HI,
  BALANCE_NOTE_HI,
  RATIONAL_THOUGHT_HI,
} from "./numbers-hi";

export function numberContent(n: number, lang: Lang): NumberContent {
  const en = NUMBER_CONTENT_EN[n] ?? MASTER_CONTENT_EN[n];
  const hi = NUMBER_CONTENT_HI[n] ?? MASTER_CONTENT_HI[n];
  const picked = lang === "hi" ? hi : en;
  return picked ?? en;
}

export function masterContent(n: number, lang: Lang): NumberContent | null {
  if (n !== 11 && n !== 22 && n !== 33) return null;
  return lang === "hi" ? MASTER_CONTENT_HI[n] : MASTER_CONTENT_EN[n];
}

export function zeroMasters(lang: Lang): string {
  return lang === "hi" ? ZERO_MASTERS_HI : ZERO_MASTERS_EN;
}

export function karmicDebtContent(n: number, lang: Lang): { title: string; theme: string } | null {
  const en = KARMIC_DEBT_CONTENT_EN[n];
  const hi = KARMIC_DEBT_CONTENT_HI[n];
  if (!en) return null;
  return lang === "hi" ? (hi ?? en) : en;
}

export function karmicLessonContent(digit: number, lang: Lang): string | null {
  if (lang === "hi") return KARMIC_LESSON_HI[digit] ?? null;
  return KARMIC_LESSON_EN[digit] ?? null;
}

export function bridgeContent(digit: number, lang: Lang): string | null {
  if (lang === "hi") return BRIDGE_CONTENT_HI[digit] ?? null;
  return BRIDGE_CONTENT_EN[digit] ?? null;
}

export function hiddenPassionContent(digit: number, lang: Lang): string | null {
  if (lang === "hi") return HIDDEN_PASSION_HI[digit] ?? null;
  return HIDDEN_PASSION_EN[digit] ?? null;
}

export function balanceNote(lang: Lang): string {
  return lang === "hi" ? BALANCE_NOTE_HI : BALANCE_NOTE_EN;
}

export function rationalThoughtContent(digit: number, lang: Lang): string | null {
  if (lang === "hi") return RATIONAL_THOUGHT_HI[digit] ?? null;
  return RATIONAL_THOUGHT_EN[digit] ?? null;
}

/* ------------------------------------------------------------------ */
/* UI strings                                                          */
/* ------------------------------------------------------------------ */

type Dict = Record<string, string>;

const UI_EN: Dict = {
  appName: "Anko Ki Maya",
  tagline: "A numerology-informed reflection on your lived patterns and the decisions ahead—not a guaranteed prediction.",
  navOverview: "Abhi Ka Haal",
  navCalibration: "Your Context",
  navConcierge: "Private Concierge",
  navNumbers: "Your Numbers",
  navForecast: "Month Weather",
  navDinMausam: "Aaj Ka Din",
  navDashboard3: "Aaj Ka Dashboard",
  navDossier: "Life Dossier",
  navLongterm: "3 & 9-Year Map",
  navJournal: "Journal",
  navSettings: "Settings & Privacy",
  navLoShu: "Numeroscope (Lo Shu)",
  navLucky: "Lucky & Remedies",
  navNameStudio: "Name Studio",
  navLifeGraph: "Life Graph — Past Reading",
  navRajyoga: "Rajyoga",
  navNumberTools: "Ank Tools (Phone · House)",
  navBlueprint: "Life Blueprint Report",
  basis: "Basis",
  basisHi: "Basis",
  showSteps: "show",
  lifePath: "Bhagyank (Life Path)",
  expression: "Expression / Destiny",
  soulUrge: "Soul Urge",
  personality: "Personality",
  birthdayNumber: "Mulank (Birth Number)",
  maturity: "Maturity Number",
  personalYear: "Ank Dasha — Year",
  personalMonth: "Ank Dasha — Month",
  personalDay: "Ank Dasha — Day",
  karmicDebt: "Karmic Debt",
  karmicLessons: "Karmic Lessons",
  hiddenPassion: "Hidden Passion",
  balanceNumber: "Balance Number",
  cornerstone: "Cornerstone & First Vowel",
  bridges: "Bridge Numbers",
  rationalThought: "Rational Thought Number",
  luckyNumbers: "Lucky Numbers",
  luckyDays: "Traditional Days",
  luckyColors: "Traditional Colors",
  luckyGems: "Traditional Gems",
  remedies: "Remedies (Upay)",
  mantra: "Mantra",
  japaCount: "Traditional japa count",
  yantra: "Yantra",
  daan: "Daan (traditional giving)",
  worshipDay: "Traditional worship day",
  remedyDisclaimer:
    "Traditional remedies that may support the energy — a faith practice, not a medical or financial guarantee.",
  goldNote: "Tradition says gold is the daan acceptable for every planet.",
  masterBadge: "Master number",
  dualNotation: "dual notation",
  languageToggle: "Language",
  english: "English",
  hindi: "Hinglish (Roman)",
  settingsLanguage: "Language (EN ⇄ Hinglish)",
  settingsLanguageHint: "Applies across the app and the Blueprint report. Saved in this browser.",
  printPdf: "Print / Save as PDF",
  back: "Back",
  loading: "Loading",
  coreNumbers: "Your core numbers",
  gridYogas: "Grid Yogas",
  planes: "Planes",
  diagonals: "Diagonals",
  missingNumbers: "Missing-number reflections",
  lifeEvents: "Life Events Graph",
  addEvent: "Add event",
  year: "Year",
  label: "Label",
  impact: "Impact (1-10)",
  cycleResonance: "Cycle-resonance observations",
  conciergeTitle: "The Life Blueprint Concierge",
  conciergePrice: "₹99,999",
  conciergeCta: "Inquire on WhatsApp",
  conciergeCtaMail: "Inquire by Email",
  blueprint: "Life Blueprint Report",
  bestDates: "Best dates",
  turningPoints: "Turning points",
  monthWeather: "Month-wise event weather",
  intensity: "Intensity",
  verdict: "Verdict",
  methodology: "The Mathematics Behind Your Reading",
  disclaimer: "Traditional numerology-based reading.",
};

const UI_HI: Dict = {
  appName: "अंकों की माया",
  tagline: "Ank-parampara ke nazariye se aapke anubhav aur aage ke faislon par soch—pakki bhavishyavaani nahi.",
  navOverview: "Abhi Ka Haal",
  navCalibration: "Aapka Sandarbh",
  navConcierge: "Private Concierge",
  navNumbers: "Aapke numbers",
  navForecast: "Mahine ka mausam",
  navDinMausam: "Aaj ka din — aaj aur kal",
  navDashboard3: "Aaj Ka Dashboard — teen card, ek jhaanki",
  navDossier: "Akashic Dossier — aapka jeevan-hisaab",
  navLongterm: "3 & 9-saal ka naksha",
  navJournal: "Journal",
  navSettings: "Settings aur Privacy",
  navLoShu: "Ank-chakra (Lo Shu)",
  navLucky: "Lucky aur Upay",
  navNameStudio: "Name Studio",
  navLifeGraph: "Life Graph — past reading",
  navRajyoga: "Rajyoga",
  navNumberTools: "Ank Tools (Phone · Ghar)",
  navBlueprint: "Life Blueprint Report",
  basis: "Basis",
  basisHi: "Basis",
  showSteps: "dikhao",
  lifePath: "Bhagyank (Life Path)",
  expression: "Expression number",
  soulUrge: "Soul Urge",
  personality: "Personality number",
  birthdayNumber: "Mulank (janm number)",
  maturity: "Maturity number",
  personalYear: "Ank Dasha — saal",
  personalMonth: "Ank Dasha — mahina",
  personalDay: "Ank Dasha — din",
  karmicDebt: "Karmic debt",
  karmicLessons: "Karmic lessons (absent numbers)",
  hiddenPassion: "Chhipa rujhaan",
  balanceNumber: "Balance number",
  cornerstone: "Cornerstone aur pehla swar",
  bridges: "Bridge numbers",
  rationalThought: "Rational thought number",
  luckyNumbers: "Shubh numbers",
  luckyDays: "Traditional din",
  luckyColors: "Traditional rang",
  luckyGems: "Traditional ratan",
  remedies: "Upay",
  mantra: "Mantra",
  japaCount: "Traditional japa count",
  yantra: "Yantra",
  daan: "Daan (traditional)",
  worshipDay: "Traditional poojan din",
  remedyDisclaimer:
    "Traditional upay jo energy ko support de sakte hain — shraddha ka abhyas hai, koi medical ya financial guarantee nahi.",
  goldNote: "Parampara kehti hai — sona sabhi grahon ka sweekrit daan hai.",
  masterBadge: "Master number",
  dualNotation: "dual notation",
  languageToggle: "Bhasha",
  english: "English",
  hindi: "Hinglish (Roman)",
  settingsLanguage: "Bhasha (EN ⇄ Hinglish)",
  settingsLanguageHint: "Poore app aur Blueprint report par lagu hota hai. Isi browser mein saved hota hai.",
  printPdf: "Print / PDF save karo",
  back: "Wapas",
  loading: "Load ho raha hai",
  coreNumbers: "Aapke mukhya numbers",
  gridYogas: "Grid yutiyan",
  planes: "Planes",
  diagonals: "Diagonals",
  missingNumbers: "Absent-number reflections",
  lifeEvents: "Zindagi-events graph",
  addEvent: "Event jodo",
  year: "Saal",
  label: "Label",
  impact: "Impact (1-10)",
  cycleResonance: "Cycle-resonance notes",
  conciergeTitle: "Life Blueprint Concierge",
  conciergePrice: "₹99,999",
  conciergeCta: "WhatsApp par poochho",
  conciergeCtaMail: "Email se poochho",
  blueprint: "Life Blueprint Report",
  bestDates: "Best dates",
  turningPoints: "Mod-point mahine",
  monthWeather: "Mahine-war event-mausam",
  intensity: "Intensity",
  verdict: "Verdict",
  methodology: "Aapki reading ke peechhe ka ganit",
  disclaimer: "Traditional ank-ganit par based reading.",
};

const DICTS: Record<Lang, Dict> = { en: UI_EN, hi: UI_HI };

export function t(lang: Lang, key: string): string {
  return DICTS[lang][key] ?? DICTS.en[key] ?? key;
}
