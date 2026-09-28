/**
 * Anko Ki Maya v3.3 — VEDIC LAYER WRAPPER (secret engine layer).
 *
 * Brand/UI speaks 'Ank Shastra' (numbers-first); this module quietly verifies
 * and deepens every number-reading with real jyotish via the vendored
 * panchanga lib (MIT; Lahiri sidereal; dep astronomy-engine only). The word
 * 'astrology' never surfaces in UI copy — graha-chain lines render inside the
 * Basis block as 'graha pramanikaran' (graha verification).
 *
 * Fusion rules (VEDIC-LAYER-PLAN.md a–h):
 *  (a) nakshatra verification of the Mulank reading — agreement ⇒ 'double
 *      confirmation', conflict ⇒ blended nuance (dominant by dasha context);
 *  (b) dasha-precision for the event-weather calendar — mahadasha = year
 *      theme, antardasha = month flavor, pratyantardasha = week texture;
 *      ACTIVE GRAHA = dasha lord × Mulank planet (friendly = strong,
 *      enemy = honest friction);
 *  (c) dasha sandhi (the last year of a mahadasha) feeds big-years detection;
 *  (d) remedies selected by the weakest planet across BOTH systems;
 *  (e) compatibility = ashtakoota guna milan (36) × number harmony;
 *  (f) doshas framed as 'Ank+Graha dosh pariksha' — care, never fear;
 *  (g) birth time optional — moonKundali fallback when unknown;
 *  (h) muhurat 'shubh samay' engine for user-picked dates.
 */

import {
  janmaFacts,
  kundali,
  moonKundali,
  localCivilTimeToUTC,
  vimshottariDasha,
  nakshatraLord,
  gunaMilan,
  mangalDosha,
  kalaSarpa,
  dailyPanchanga,
  type GeoLocation,
  type JanmaFacts,
  type DashaPeriod,
  type AntardashaPeriod,
  type Kundali,
  type GunaMilanResult,
} from "@vendor/panchanga";

import { NAVGRAH, grahaFor, planetRelation, type PlanetRelation } from "./navgrah";
import type { Lang } from "./content";

/* ------------------------------------------------------------------ */
/* Location + birth parsing                                            */
/* ------------------------------------------------------------------ */

export const MUMBAI: GeoLocation = {
  latitude: 19.076,
  longitude: 72.8777,
  timeZone: "Asia/Kolkata",
};

/** Default when the user gives no place — the school's reference city. */
export const DEFAULT_LOCATION = MUMBAI;

export interface BirthInput {
  year: number;
  month: number; // 1-12
  day: number;
  /** Optional local clock time. Undefined ⇒ Moon-chart mode (rule g). */
  hour?: number;
  minute?: number;
  loc?: GeoLocation;
}

/** Birth instant as UTC Date; noon local used when time unknown (chart-safe default). */
export function birthUTC(b: BirthInput): Date {
  const hour = b.hour ?? 12;
  const minute = b.minute ?? 0;
  return localCivilTimeToUTC(b.year, b.month, b.day, hour, minute, (b.loc ?? DEFAULT_LOCATION).timeZone);
}

/* ------------------------------------------------------------------ */
/* Core chart — rule (g): birth time optional, Moon-chart fallback      */
/* ------------------------------------------------------------------ */

export interface VedicChart {
  /** true when the birth time was unknown (Moon-chart mode). */
  timeUnknown: boolean;
  janma: JanmaFacts;
  /** Moon rashi index (0-11) + name — the Chandra lagna fallback reference. */
  rashi: number;
  rashiName: string;
  nakshatra: number;
  nakshatraName: string;
  pada: number;
  /** Dashas to pratyantardasha (levels: 3). */
  dasha: DashaPeriod[];
  /** Mangal dosha + kala-sarpa, Moon-chart based; lagna refs only when known. */
  doshas: {
    mangal: ReturnType<typeof mangalDosha>;
    kalaSarpa: ReturnType<typeof kalaSarpa>;
  };
  /** Moon longitudes for guna milan parties. */
  moonLongitude: number;
}

export function vedicChart(b: BirthInput): VedicChart {
  const loc = b.loc ?? DEFAULT_LOCATION;
  const utc = birthUTC(b);
  const timeUnknown = b.hour === undefined;

  const k = timeUnknown
    ? (moonKundali(utc, loc) as unknown as Kundali)
    : kundali(utc, loc);
  const dasha = vimshottariDasha(k.janma, { levels: 3 });
  const grahas = k.grahas;
  const lagnaRashi = timeUnknown ? null : k.lagna.rashi;

  return {
    timeUnknown,
    janma: k.janma,
    rashi: k.janma.janmaRashi,
    rashiName: k.janma.janmaRashiName,
    nakshatra: k.janma.janmaNakshatra,
    nakshatraName: k.janma.janmaNakshatraName,
    pada: k.janma.janmaPada,
    dasha,
    doshas: {
      mangal: mangalDosha(grahas, lagnaRashi),
      kalaSarpa: kalaSarpa(grahas),
    },
    moonLongitude: k.janma.moon.longitude,
  };
}

/* ------------------------------------------------------------------ */
/* Rule (a): Nakshatra × Mulank verification                           */
/* ------------------------------------------------------------------ */

/** Map a panchanga Graha name to the school's digit (navgrah mapping). */
const GRAHA_TO_DIGIT: Record<string, number> = {
  Sun: 1, Moon: 2, Jupiter: 3, "Rahu": 4, Mercury: 5, Venus: 6,
  "Ketu": 7, Saturn: 8, Mars: 9,
};

const DIGIT_FOR_GRAHA_SCHOOL: Record<number, string> = {
  1: "Surya", 2: "Chandra", 3: "Guru", 4: "Rahu", 5: "Budh",
  6: "Shukra", 7: "Ketu", 8: "Shani", 9: "Mangal",
};

export interface NakshatraVerification {
  mulank: number;
  mulankGraha: string; // school name e.g. 'Surya'
  nakshatraLordGraha: string; // panchanga name e.g. 'Sun' → school-mapped
  nakshatraLordDigit: number;
  /** 'agree' | 'same-digit' | 'friend' | 'conflict' */
  agreement: "agree" | "same-digit" | "friend" | "conflict";
  /** rule (a): agree ⇒ double confirmation; conflict ⇒ blended nuance. */
  badgeEn: string;
  badgeHi: string;
  lineEn: string;
  lineHi: string;
  /** dominant reading: same | nakshatra | mulank */
  dominant: "same" | "nakshatra" | "mulank";
}

export function verifyNakshatra(mulank: number, chart: VedicChart): NakshatraVerification {
  const lord = nakshatraLord(chart.nakshatra); // panchanga Graha
  const lordDigit = GRAHA_TO_DIGIT[lord] ?? 1;
  const mulankGraha = DIGIT_FOR_GRAHA_SCHOOL[mulank] ?? "Surya";
  const rel: PlanetRelation = planetRelation(mulank, lordDigit);

  let agreement: NakshatraVerification["agreement"];
  if (lordDigit === mulank) agreement = "same-digit";
  else if (rel === "friend") agreement = "agree";
  else if (rel === "karmic") agreement = "friend"; // karmic pair = working bond
  else agreement = "conflict";

  const mulEntry = grahaFor(mulank);
  const nakName = chart.nakshatraName;
  const lordSchool = DIGIT_FOR_GRAHA_SCHOOL[lordDigit] ?? lord;

  if (agreement === "same-digit" || agreement === "agree") {
    return {
      mulank, mulankGraha,
      nakshatraLordGraha: lord,
      nakshatraLordDigit: lordDigit,
      agreement,
      badgeEn: "Double confirmation",
      badgeHi: "double pramanikaran",
      lineEn: `Your janma nakshatra ${nakName} is ruled by ${lordSchool} — the same force as your Mulank ${mulank} (${mulankGraha}). Two independent systems point at one reading: trust it with double weight.`,
      lineHi: `aapka janma nakshatra ${nakName} — iska swami ${lordSchool} hai, bilkul Mulank ${mulank} (${mulankGraha}) jaisa. do alag-alag system ek hi baat keh rahe hain: is reading par doona bhaar rakho.`,
      dominant: "same",
    };
  }
  // conflict — blended nuance; dasha context picks the dominant voice.
  return {
    mulank, mulankGraha,
    nakshatraLordGraha: lord,
    nakshatraLordDigit: lordDigit,
    agreement,
    badgeEn: "Blended nuance",
    badgeHi: "mishrit rang",
    lineEn: `Your janma nakshatra ${nakName} is ruled by ${lordSchool}, while your Mulank ${mulank} carries ${mulankGraha}. Two notes, one voice: the reading blends both — the mulank paints the outer path, the nakshatra tints the inner weather.`,
    lineHi: `aapka janma nakshatra ${nakName} — swami ${lordSchool}, aur Mulank ${mulank} ka graha ${mulankGraha}. do swar, ek gaana: vachan dono ko mila-kar bolta hai — mulank baahar ka raasta dikhata hai, nakshatra andar ka mausam.`,
    dominant: "nakshatra",
  };
}

/* ------------------------------------------------------------------ */
/* Rule (b): dasha ladder + active-graha fusion for the calendar        */
/* ------------------------------------------------------------------ */

export interface DashaPosition {
  maha: { lord: string; start: Date; end: Date; schoolGraha: string };
  antar: { lord: string; start: Date; end: Date; schoolGraha: string } | null;
  pratyantar: { lord: string; start: Date; end: Date; schoolGraha: string } | null;
}

/** Find the running maha/antar/pratyantar at a moment. */
export function dashaAt(chart: VedicChart, at: Date): DashaPosition {
  const find = (ps: { lord: string; start: Date; end: Date }[]): number => {
    const t = at.getTime();
    return ps.findIndex((p) => p.start.getTime() <= t && t < p.end.getTime());
  };
  const mi = find(chart.dasha);
  if (mi < 0) {
    // beyond 120 years — return the last maha safely
    const last = chart.dasha[chart.dasha.length - 1];
    return { maha: mk(last.lord, last.start, last.end), antar: null, pratyantar: null };
  }
  const m = chart.dasha[mi];
  const antars: AntardashaPeriod[] = m.antardashas ?? [];
  const ai = find(antars);
  const a = ai >= 0 ? antars[ai] : null;
  const pr = a?.pratyantardashas ?? [];
  const pi = find(pr);
  const p = pi >= 0 ? pr[pi] : null;
  return {
    maha: mk(m.lord, m.start, m.end),
    antar: a ? mk(a.lord, a.start, a.end) : null,
    pratyantar: p ? mk(p.lord, p.start, p.end) : null,
  };
}

function mk(lord: string, start: Date, end: Date): DashaPosition["maha"] {
  const digit = GRAHA_TO_DIGIT[lord] ?? 1;
  return { lord, start, end, schoolGraha: DIGIT_FOR_GRAHA_SCHOOL[digit] ?? lord };
}

/** Active graha = dasha lord × Mulank planet (rule b). */
export function activeGraha(mulank: number, pos: DashaPosition): {
  dashaDigit: number;
  mulankDigit: number;
  relation: PlanetRelation;
  verdict: "strong" | "supportive" | "friction";
  labelEn: string;
  labelHi: string;
} {
  const deepLord = pos.pratyantar?.lord ?? pos.antar?.lord ?? pos.maha.lord;
  const dashaDigit = GRAHA_TO_DIGIT[deepLord] ?? 1;
  const rel = planetRelation(mulank, dashaDigit);
  void deepLord;
  const mulEntry = grahaFor(mulank);
  const dg = DIGIT_FOR_GRAHA_SCHOOL[dashaDigit] ?? "Surya";
  const verdict = dashaDigit === mulank ? "strong" : rel === "friend" ? "strong" : rel === "karmic" ? "supportive" : rel === "tense" ? "friction" : "supportive";
  const labelEn =
    dashaDigit === mulank
      ? `${dg} runs its own dasha over your Mulank ${mulank} — the planet's season is now: double weight on its verdicts.`
      : rel === "tense"
        ? `${dg} dasha runs against ${mulEntry.graha} (your Mulank ${mulank}) — honest friction: results come, but they demand double discipline.`
        : rel === "friend"
          ? `${dg} dasha runs with ${mulEntry.graha} — the wind is at your back; move on the big tables now.`
          : `${dg} dasha sits neutral-to-friendly with ${mulEntry.graha} — steady, no bonus wind, no headwind.`;
  const labelHi =
    dashaDigit === mulank
      ? `${dg} ki apni hi dasha Mulank ${mulank} par chal rahi hai — graha ka mausam ab hai: iske vachanon par doona bhaar.`
      : rel === "tense"
        ? `${dg} ki dasha ${mulEntry.graha} (Mulank ${mulank}) ke khilaaf chal rahi hai — saaf jhagda: phal milenge, par dugni mehnat maangenge.`
        : rel === "friend"
          ? `${dg} ki dasha ${mulEntry.graha} ke saath chal rahi hai — hawa peechhe ki taraf; bade mez par ab khelo.`
          : `${dg} ki dasha ${mulEntry.graha} se sam-bhaav hai — sthir raasta, na bonus hawa, na sar-dard.`;
  return { dashaDigit, mulankDigit: mulank, relation: rel, verdict, labelEn, labelHi };
}

/**
 * Rule (b) — dasha-precision pass for ONE calendar month:
 * mahadasha = year theme, antardasha = month flavor, pratyantar = week texture.
 */
export interface DashaMonthFlavor {
  yearThemeEn: string;
  yearThemeHi: string;
  monthFlavorEn: string;
  monthFlavorHi: string;
  weekTextureEn: string;
  weekTextureHi: string;
  activeGraha: ReturnType<typeof activeGraha>;
}

const MAHA_THEME: Record<string, { en: string; hi: string }> = {
  Sun: { en: "Surya mahadasha — the year asks for name, position and leadership", hi: "Surya mahadasha — saal naam, pad aur netritva maangta hai" },
  Moon: { en: "Chandra mahadasha — the year flows on mood, home and public trust", hi: "Chandra mahadasha — saal man, ghar aur jan-bharose par chalta hai" },
  Jupiter: { en: "Guru mahadasha — the year expands through counsel, study and wealth", hi: "Guru mahadasha — saal gyaan, salah aur dhan se phailta hai" },
  "Rahu": { en: "Rahu mahadasha — the year of sudden rises; keep paperwork clean", hi: "Rahu mahadasha — achanak chadhaav ka saal; kaagzaat saaf rakho" },
  Mercury: { en: "Budh mahadasha — the year runs on deals, skill and communication", hi: "Budh mahadasha — saal saudon, hunar aur samvaad par chalta hai" },
  Venus: { en: "Shukra mahadasha — the year rewards craft, comfort and relationships", hi: "Shukra mahadasha — saal kaarigari, aaraam aur rishton ko inaam deta hai" },
  "Ketu": { en: "Ketu mahadasha — the year goes deep on one craft; ignore the crowd", hi: "Ketu mahadasha — saal ek hi kaam mein gehrai maangta hai; bheed se matha phero" },
  Saturn: { en: "Shani mahadasha — the year pays the disciplined; patience compounds", hi: "Shani mahadasha — anushasan ka saal; sabr ka byaaj milta hai" },
  Mars: { en: "Mangal mahadasha — the year rewards the one who moves first", hi: "Mangal mahadasha — jo pehle badhta hai, usi ko saal deta hai" },
};

export function dashaMonthFlavor(
  mulank: number,
  chart: VedicChart,
  monthStart: Date,
): DashaMonthFlavor {
  const pos = dashaAt(chart, monthStart);
  const ag = activeGraha(mulank, pos);
  const theme = MAHA_THEME[pos.maha.lord] ?? MAHA_THEME.Sun;

  // Month flavor from the antardasha lord (or maha when between antars).
  const flavorLord = pos.antar?.schoolGraha ?? pos.maha.schoolGraha;
  const flavor = grahaFor(GRAHA_TO_DIGIT[pos.antar?.lord ?? pos.maha.lord] ?? 1);
  const monthFlavorEn = `Antardasha ${flavorLord} tints the month: ${flavor.natureEn}.`;
  const monthFlavorHi = `Antardasha ${flavorLord} mahine ka rang lagata hai: ${flavor.natureHi}.`;

  // Week texture from the pratyantardasha lord (mid-month sample).
  const mid = new Date(monthStart.getTime() + 15 * 86400_000);
  const posMid = dashaAt(chart, mid);
  const weekLord = posMid.pratyantar?.schoolGraha ?? posMid.antar?.schoolGraha ?? pos.maha.schoolGraha;
  const weekTextureEn = `Pratyantar ${weekLord} sets the week's texture — small moves this week ride that current.`;
  const weekTextureHi = `Pratyantar ${weekLord} hafte ki banavat tay karta hai — is hafte ke chhote kadam usi lehar par chalte hain.`;

  return {
    yearThemeEn: theme.en,
    yearThemeHi: theme.hi,
    monthFlavorEn, monthFlavorHi,
    weekTextureEn, weekTextureHi,
    activeGraha: ag,
  };
}

/* ------------------------------------------------------------------ */
/* Rule (c): dasha sandhi → big-years detection                        */
/* ------------------------------------------------------------------ */

/** True when `at` falls in the FINAL year of a mahadasha (dasha sandhi). */
export function dashaSandhiYears(chart: VedicChart): { start: Date; end: Date; nextLord: string }[] {
  const out: { start: Date; end: Date; nextLord: string }[] = [];
  const periods = chart.dasha;
  for (let i = 0; i < periods.length; i++) {
    const p = periods[i];
    const next = periods[i + 1];
    if (!next) continue;
    // sandhi = final 12 months of the outgoing mahadasha
    const start = new Date(p.end.getTime() - 365.25 * 86400_000);
    if (start < p.start) start.setTime(p.start.getTime());
    out.push({ start, end: p.end, nextLord: next.lord });
  }
  return out;
}

/** Rule (c): a year number whose calendar year overlaps a dasha-sandhi window. */
export function yearsInDashaSandhi(chart: VedicChart, fromYear: number, toYear: number): number[] {
  const sandhis = dashaSandhiYears(chart);
  const years: number[] = [];
  for (let y = fromYear; y <= toYear; y++) {
    const yStart = new Date(y, 0, 1);
    const yEnd = new Date(y, 11, 31);
    for (const s of sandhis) {
      if (s.start <= yEnd && s.end >= yStart) { years.push(y); break; }
    }
  }
  return years;
}

/* ------------------------------------------------------------------ */
/* Rule (e): compatibility — guna milan × number harmony               */
/* ------------------------------------------------------------------ */

export interface CompatibilityFusion {
  /** panchanga ashtakoota result (36). */
  guna: GunaMilanResult;
  /** school harmony from the numerology engine (0-100ish pair score). */
  numberScore: number;
  numberBand: "high" | "mid" | "low";
  /** rule (e): combined world-class verdict. */
  combinedScore: number; // 0-100, guna 70% + number 30%
  bandEn: string;
  bandHi: string;
  adviceEn: string;
  adviceHi: string;
}

function numberHarmonyScore(mulankA: number, mulankB: number, bhagyankA: number, bhagyankB: number): number {
  // 0-100: two relations (mulank×mulank, bhagyank×bhagyank)
  const score = (r: PlanetRelation): number => (r === "friend" ? 100 : r === "karmic" ? 70 : r === "neutral" ? 55 : 30);
  return Math.round(score(planetRelation(mulankA, mulankB)) * 0.5 + score(planetRelation(bhagyankA, bhagyankB)) * 0.5);
}

export function compatibilityFusion(
  chartA: VedicChart, chartB: VedicChart,
  mulankA: number, mulankB: number, bhagyankA: number, bhagyankB: number,
): CompatibilityFusion {
  const partyA = { janmaNakshatra: chartA.nakshatra, janmaRashi: chartA.rashi, janmaPada: chartA.pada, moon: { longitude: chartA.moonLongitude } };
  const partyB = { janmaNakshatra: chartB.nakshatra, janmaRashi: chartB.rashi, janmaPada: chartB.pada, moon: { longitude: chartB.moonLongitude } };
  const guna = gunaMilan(partyA, partyB);
  const numberScore = numberHarmonyScore(mulankA, mulankB, bhagyankA, bhagyankB);
  const combined = Math.round(guna.total / 36 * 70 + numberScore * 0.3);
  const band = combined >= 65 ? "high" : combined >= 45 ? "mid" : "low";

  const bandEn = band === "high" ? "Strong match" : band === "mid" ? "Workable match — some tables need patience" : "Demanding match — go in with open eyes";
  const bandHi = band === "high" ? "mazboot jodi" : band === "mid" ? "kaam-kar jodi — kuch mezon par sabr chahiye" : "mehnat-wali jodi — aankhein khol-kar chalo";

  const adviceEn =
    band === "high"
      ? "The 36-guna table and the number table agree: this pairing carries real ease. Keep the honest-conversation habit and it stays that way."
      : band === "mid"
        ? "The koota table scores mid — a couple of tables score low (see the breakdown). Where the tables are soft, patience and clear roles fill the gap."
        : "Several koota tables score low — this pairing asks for deliberate work. The breakdown below names exactly which tables; decide with eyes open.";
  const adviceHi =
    band === "high"
      ? "guna-milan aur ank-dono table sehmat hain: is jodi mein aaraam hai. saaf baat karne ki aadat banaye rakho — yehi chalta rahega."
      : band === "mid"
        ? "koota table beech mein khada hai — do-teen mezon ke score kam hain (breakdown dekho). jahan mez naram hai, wahan sabr aur saaf zimmedari khali-gali ko bhar deti hai."
        : "kai koota mezon ke score kam hain — is jodi mein jaan-bujh-kar mehnat lagti hai. neeche breakdown har mez ka naam batata hai; aankhein khol-kar faisla karo.";

  return { guna, numberScore, numberBand: band, combinedScore: combined, bandEn, bandHi, adviceEn, adviceHi };
}

/* ------------------------------------------------------------------ */
/* Rule (f): doshas — 'Ank+Graha dosh pariksha' honest care framing     */
/* ------------------------------------------------------------------ */

export interface DoshaReading {
  key: "mangal" | "kalaSarpa";
  present: boolean;
  titleEn: string;
  titleHi: string;
  explainEn: string;
  explainHi: string;
  upayEn: string;
  upayHi: string;
}

export function doshaReadings(chart: VedicChart): DoshaReading[] {
  const out: DoshaReading[] = [];
  const m = chart.doshas.mangal;
  out.push({
    key: "mangal",
    present: m.present,
    titleEn: "Ank+Graha pariksha — Mangal check",
    titleHi: "Ank+Graha pariksha — Mangal jaanch",
    explainEn: m.present
      ? `Mangal sits in a dosha-house${m.fromLagna ? " from the lagna" : ""} (from the Moon: house ${m.fromMoon.house}). Classical tradition reads this as a hot temper needing a directed outlet — marriage matching weighs it, and classical parihara (matching with a fellow-Mangal chart, or the listed upay) is the tradition's own answer.${m.mitigations.length ? " Mitigation in this chart: " + m.mitigations.join("; ") + "." : ""}`
      : "Mangal sits clear of the classical dosha houses — no Mangal dosha. Marriage matching proceeds without this weight.",
    explainHi: m.present
      ? `Mangal dosh-ghar mein baitha hai (Chandra se ghar ${m.fromMoon.house}). parampara ise tez swabhaav ki ghatna kehti hai — jise disha chahiye. shaadi-milan mein iska wajan rakha jaata hai, aur parampara ka apna upay: Mangal-wale chart se milan, ya neeche diye upay.${m.mitigations.length ? " is chart mein rahat: " + m.mitigations.join("; ") + "." : ""}`
      : "Mangal dosh-gharon se door baitha hai — koi Mangal dosh nahi. milan-baithak bina is wajan ke aage badhega.",
    upayEn: m.present
      ? "Upay (parampara): Mangalvaar masoor daan, 'ॐ Mangalaya Namah' 108 japa, and Hanuman Chalisa on Tuesdays. Marriage matching should weigh it — the koota table above already does."
      : "No upay needed — keep Tuesday's discipline as general seva.",
    upayHi: m.present
      ? "Upay (parampara): Mangalvaar masoor daan, 'ॐ Mangalaya Namah' ka 108 japa, aur Mangalvaar Hanuman Chalisa. milan-baithak mein iska wajan liya ja chuka hai — oopar koota table dekho."
      : "Upay ki zaroorat nahi — Mangalvaar ki sanyam-saadhana sadharan seva ke roop mein rakho.",
  });
  const ks = chart.doshas.kalaSarpa;
  out.push({
    key: "kalaSarpa",
    present: ks.present,
    titleEn: "Ank+Graha pariksha — Rahu-Ketu axis check",
    titleHi: "Ank+Graha pariksha — Rahu-Ketu rekha jaanch",
    explainEn: ks.present
      ? "All seven grahas sit on one side of the Rahu-Ketu axis. Traditions differ on its weight — the school reads it as a karmic-tunnel life: one lane, deep. Not a verdict; a lens."
      : "Grahas occupy both sides of the Rahu-Ketu axis — no kala-sarpa pattern. Life spreads across several lanes.",
    explainHi: ks.present
      ? "saat graha Rahu-Ketu rekha ke ek taraf khade hain. paramparaon mein iska wajan alag-alag maana jaata hai — school ise karmic-tunnel kehti hai: ek hi lane, gehrai waali. faisla nahi; ek drishti."
      : "graha Rahu-Ketu rekha ke dono taraf hain — kala-sarpa pattern nahi. jeevan kai laneon mein phailta hai.",
    upayEn: ks.present
      ? "Upay (parampara): 'ॐ Rahave Namah' + 'ॐ Ketave Namah', 108 japa each on Saturdays; keep every deal on paper."
      : "No upay needed.",
    upayHi: ks.present
      ? "Upay (parampara): Shanivaar 'ॐ Rahave Namah' + 'ॐ Ketave Namah', dono ka 108-108 japa; har sauda kaagaz par."
      : "Upay ki zaroorat nahi.",
  });
  return out;
}

/* ------------------------------------------------------------------ */
/* Rule (h): muhurat 'shubh samay' engine                              │
/* ------------------------------------------------------------------ */

export interface ShubhSamay {
  date: string; // ISO day
  score: number; // 0-100
  verdictEn: string;
  verdictHi: string;
  panchangaLine: string;
  avoidEn: string | null;
  avoidHi: string | null;
}

const VARA_SCORE: Record<string, number> = {
  Ravi: 90, Soma: 80, Mangala: 70, Budha: 85, Guru: 95, Shukra: 88, Shani: 40,
};

/** Rule (h): score a user-picked date (wedding/launch) via tithi/nakshatra/yoga/karana/vara. */
export function shubhSamay(date: Date, purpose: "marriage" | "launch", loc: GeoLocation = DEFAULT_LOCATION): ShubhSamay {
  const dp = dailyPanchanga(date, loc);
  // Base scores: favorable elements add, inauspicious subtract.
  let score = VARA_SCORE[dp.vara.name] ?? 60;
  const notes: string[] = [];
  // Tithi family: favorable shukla-paksha starters; caution on chaturthi/ashtami/navami/chaturdashi/amavasya
  const t = dp.tithi.number;
  if ([1, 5, 10, 11, 13].includes(t)) score += 10;
  if ([4, 8, 9, 14, 30].includes(t)) score -= 12;
  // Rahu kala overlap → avoid window
  const rk = dp.muhurta?.rahuKala ?? null;
  let avoid: string | null = null;
  if (rk) avoid = `Rahu kala ${rk.start}–${rk.end} — start nothing new in this window`;

  const verdictEn = score >= 75 ? `Shubh samay — ${purpose === "marriage" ? "wedding" : "launch"} table is set (${score}/100).` : score >= 55 ? `Sambhav samay — workable, mind the avoid-window (${score}/100).` : `Rok lena — this date scores low (${score}/100); pick a better one.`;
  const verdictHi = score >= 75 ? `shubh samay — ${purpose === "marriage" ? "shaadi" : "launch"} ki mez taiyar hai (${score}/100).` : score >= 55 ? `sambhav samay — chal jaega, avoid-window ka dhyaan rakho (${score}/100).` : `rok lo — is date ka score kam hai (${score}/100); doosri dekho.`;

  const panchangaLine = `${dp.vara.name} · tithi ${dp.tithi.name} · nakshatra ${dp.nakshatra.name} · yoga ${dp.yoga.name}`;

  return { date: date.toISOString().slice(0, 10), score, verdictEn, verdictHi, panchangaLine, avoidEn: avoid, avoidHi: avoid ?? null };
}

/* ------------------------------------------------------------------ */
/* Rule (d): weakest-planet remedy selection across BOTH systems        */
/* ------------------------------------------------------------------ */

export interface WeakestPlanet {
  graha: string; // school name
  digit: number;
  reasonEn: string;
  reasonHi: string;
  sources: string[]; // 'missing-number' | 'dasha-friction' | 'karmic-pair' | 'navgrah-tension'
}

/** Rule (d): pick the remedy target = weakest planet across BOTH systems. */
export function weakestPlanet(
  mulank: number, bhagyank: number,
  chart: VedicChart | null,
  missingNumbers: number[],
): WeakestPlanet {
  const tally = new Map<number, number>();
  const sources = new Map<number, string[]>();

  const add = (digit: number, weight: number, src: string) => {
    tally.set(digit, (tally.get(digit) ?? 0) + weight);
    if (!sources.has(digit)) sources.set(digit, []);
    sources.get(digit)!.push(src);
  };

  for (const d of missingNumbers) add(d, 3, "missing-number");

  if (chart) {
    const pos = dashaAt(chart, new Date());
    const ag = activeGraha(mulank, pos);
    if (ag.verdict === "friction") add(ag.dashaDigit, 4, "dasha-friction");
    // karmic pair of the mulank
    const mulEntry = grahaFor(mulank);
    if (mulEntry.karmicPair) add(mulEntry.karmicPair, 2, "karmic-pair");
    // dasha lord under malefic — the dasha-lord itself when its relation to bhagyank is tense
    const bRel = planetRelation(bhagyank, GRAHA_TO_DIGIT[pos.maha.lord] ?? 1);
    if (bRel === "tense") add(GRAHA_TO_DIGIT[pos.maha.lord] ?? 1, 3, "navgrah-tension");
  }

  if (tally.size === 0) {
    // nothing flagged — fall to the mulank's karmic pair or the bhagyank graha
    const mulEntry = grahaFor(mulank);
    const d = mulEntry.karmicPair ?? bhagyank;
    return {
      graha: DIGIT_FOR_GRAHA_SCHOOL[d] ?? "Surya", digit: d,
      reasonEn: "no weak planet flagged — the school's standing advice: keep the Mulank's daily practice alive",
      reasonHi: "koi kamzor graha nahi mila — school ki sadhaaran salah: Mulank ka daily-kram chalu rakho",
      sources: ["standing"],
    };
  }

  let best = -1, bestScore = -1;
  for (const [d, s] of tally) if (s > bestScore) { bestScore = s; best = d; }
  const srcs = sources.get(best) ?? [];
  const g = DIGIT_FOR_GRAHA_SCHOOL[best] ?? "Surya";
  const reasonEn =
    srcs.includes("missing-number") && srcs.includes("dasha-friction")
      ? `${g} flagged on BOTH systems: missing from your grid AND in dasha friction — this is the planet to feed first.`
      : srcs.includes("missing-number")
        ? `${g} missing from your Lo Shu grid — the number system flags it.`
        : `${g} under dasha friction — the graha system flags it.`;
  const reasonHi =
    srcs.includes("missing-number") && srcs.includes("dasha-friction")
      ? `${g} dono system mein chamka: grid mein gayab BHI hai, dasha-jhagde mein BHI — pehle isi graha ko bal do.`
      : srcs.includes("missing-number")
        ? `${g} aapke Lo Shu grid mein nahi hai — ank-system ne nishaana banaya.`
        : `${g} dasha-jhagde mein hai — graha-system ne nishaana banaya.`;
  return { graha: g, digit: best, reasonEn, reasonHi, sources: srcs };
}

/* ------------------------------------------------------------------ */
/* Basis-block graha-chain lines (subtle, never 'astrology')            */
/* ------------------------------------------------------------------ */

/** One subtle graha-chain line for Basis blocks. */
export function grahaChainLine(mulank: number, chart: VedicChart, lang: Lang): string {
  const pos = dashaAt(chart, new Date());
  const ag = activeGraha(mulank, pos);
  return lang === "hi"
    ? `graha-kram: Mulank ${mulank} × dasha ${ag.dashaDigit === mulank ? "swa" : ag.dashaDigit} — ${ag.labelHi}`
    : `graha chain: Mulank ${mulank} × dasha ${ag.dashaDigit === mulank ? "self" : ag.dashaDigit} — ${ag.labelEn}`;
}