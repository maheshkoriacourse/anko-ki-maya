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
  tagline: "The magic of numbers — for reflection, never prediction.",
  navOverview: "Overview",
  navNumbers: "Your Numbers",
  navForecast: "Six-Month Forecast",
  navLongterm: "Long-Term Map",
  navJournal: "Journal",
  navSettings: "Settings & Privacy",
  navLoShu: "Lo Shu Grid",
  navLucky: "Lucky Toolkit",
  navNameStudio: "Name Studio",
  navLifeEvents: "Life Events Graph",
  navBlueprint: "Life Blueprint Report",
  navConcierge: "Concierge",
  whyThis: "THE WHY",
  whyThisHi: "यह क्यों कहा",
  showSteps: "show",
  lifePath: "Life Path",
  expression: "Expression / Destiny",
  soulUrge: "Soul Urge",
  personality: "Personality",
  birthdayNumber: "Birthday Number",
  maturity: "Maturity Number",
  personalYear: "Personal Year",
  personalMonth: "Personal Month",
  personalDay: "Personal Day",
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
  remedies: "Traditional Remedies",
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
  hindi: "हिन्दी",
  settingsLanguage: "Language (EN ⇄ हिन्दी)",
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
  disclaimer: "For entertainment and self-reflection only — not medical, legal, financial, or predictive advice.",
};

const UI_HI: Dict = {
  appName: "अंकों की माया",
  tagline: "अंकों की माया — चिंतन के लिए, भविष्यवाणी के लिए नहीं।",
  navOverview: "सार-दृश्य",
  navNumbers: "आपके अंक",
  navForecast: "छह-मास भविष्य-दृश्य",
  navLongterm: "दीर्घ-काल मानचित्र",
  navJournal: "चिंतन-पत्रिका",
  navSettings: "सेटिंग्स और गोपनीयता",
  navLoShu: "लो शु ग्रिड",
  navLucky: "शुभ-टूलकिट",
  navNameStudio: "नाम-स्टूडियो",
  navLifeEvents: "जीवन-घटना ग्राफ़",
  navBlueprint: "लाइफ़ ब्लूप्रिंट रिपोर्ट",
  navConcierge: "कंसीयज",
  whyThis: "यह क्यों कहा",
  whyThisHi: "यह क्यों कहा",
  showSteps: "दिखाएँ",
  lifePath: "मूलांक (लाइफ़ पाथ)",
  expression: "अभिव्यक्ति-अंक",
  soulUrge: "आत्म-इच्छा",
  personality: "व्यक्तित्व-अंक",
  birthdayNumber: "जन्म-अंक (भवनाथ)",
  maturity: "परिपक्वता-अंक",
  personalYear: "व्यक्तिगत वर्ष",
  personalMonth: "व्यक्तिगत मास",
  personalDay: "व्यक्तिगत दिन",
  karmicDebt: "कर्मिक ऋण-अंक",
  karmicLessons: "कर्मिक पाठ (अनुपस्थित अंक)",
  hiddenPassion: "छिपा रुझान",
  balanceNumber: "संतुलन-अंक",
  cornerstone: "कॉर्नरस्टोन और प्रथम स्वर",
  bridges: "ब्रिज-अंक",
  rationalThought: "तर्क-विचार अंक",
  luckyNumbers: "शुभ अंक",
  luckyDays: "परंपरागत दिन",
  luckyColors: "परंपरागत रंग",
  luckyGems: "परंपरागत रत्न",
  remedies: "पारंपरिक उपाय",
  mantra: "मंत्र",
  japaCount: "परंपरागत जप-संख्या",
  yantra: "यंत्र",
  daan: "दान (पारंपरिक)",
  worshipDay: "परंपरागत पूजन-दिन",
  remedyDisclaimer:
    "परंपरागत उपाय जो ऊर्जा को सहयोग दे सकते हैं — यह श्रद्धा-अभ्यास है, कोई चिकित्सीय या आर्थिक गारंटी नहीं।",
  goldNote: "परंपरा कहती है — सोना सभी ग्रहों का स्वीकृत दान है।",
  masterBadge: "मास्टर अंक",
  dualNotation: "द्वैत लेखन",
  languageToggle: "भाषा",
  english: "English",
  hindi: "हिन्दी",
  settingsLanguage: "भाषा (EN ⇄ हिन्दी)",
  settingsLanguageHint: "पूरे ऐप और ब्लूप्रिंट रिपोर्ट पर लागू होता है। इसी ब्राउज़र में सहेजा जाता है।",
  printPdf: "प्रिंट / PDF सहेजें",
  back: "वापस",
  loading: "लोड हो रहा है",
  coreNumbers: "आपके मुख्य अंक",
  gridYogas: "ग्रिड युतियाँ",
  planes: "तल (प्लेन)",
  diagonals: "विकर्ण",
  missingNumbers: "अनुपस्थित-अंक चिंतन",
  lifeEvents: "जीवन-घटना ग्राफ़",
  addEvent: "घटना जोड़ें",
  year: "वर्ष",
  label: "शीर्षक",
  impact: "प्रभाव (1-10)",
  cycleResonance: "चक्र-अनुनाद टिप्पणियाँ",
  conciergeTitle: "लाइफ़ ब्लूप्रिंट कंसीयज",
  conciergePrice: "₹99,999",
  conciergeCta: "व्हाट्सएप पर पूछें",
  conciergeCtaMail: "ईमेल से पूछें",
  blueprint: "लाइफ़ ब्लूप्रिंट रिपोर्ट",
  bestDates: "श्रेष्ठ तिथियाँ",
  turningPoints: "मोड़-बिंदु महीने",
  monthWeather: "मास-वार घटना-मौसम",
  intensity: "तीव्रता",
  verdict: "निर्णय-रेखा",
  methodology: "आपकी रीडिंग के पीछे का गणित",
  disclaimer: "केवल मनोरंजन और आत्म-चिंतन हेतु — चिकित्सकीय, क़ानूनी, आर्थिक या भविष्यवाणी-परामर्श नहीं।",
};

const DICTS: Record<Lang, Dict> = { en: UI_EN, hi: UI_HI };

export function t(lang: Lang, key: string): string {
  return DICTS[lang][key] ?? DICTS.en[key] ?? key;
}