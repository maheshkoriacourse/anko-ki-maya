/**
 * Anko Ki Maya v2 — Life Blueprint Report engine (data assembly for the
 * report page). Pure functions: gathers the full v2 reading into chapter
 * data that app/blueprint/page.tsx renders.
 */

import {
  fullReading, lifePath, personalYear, personalMonth, personalDay, upcomingMonths,
  monthName, type FullReading,
} from "./numerology";
import { karmicSnapshot, type KarmicSnapshot } from "./karmic";
import { loShuGrid, type LoShuResult } from "./loshu";
import { gridYogas, type GridYogasResult } from "./grid-yogas";
import { luckyProfile, type LuckyProfile } from "./lucky";
import { personalNameReading, type PersonalNameReading } from "./name-studio";
import { monthWeather, type YearWeather } from "./weather";
import { analyzeLifeEvents, type EventsGraphResult } from "./life-events";
import { remedyForNumber } from "./remedies";
import type { LifeEvent } from "./life-events";
import { loadLifeEvents } from "./life-storage";
import type { Lang } from "./content";
import { numberContent, masterContent, zeroMasters, karmicDebtContent, karmicLessonContent, bridgeContent, hiddenPassionContent, balanceNote, rationalThoughtContent } from "./content";
import { meaningFor } from "./meanings";

export interface BlueprintData {
  input: { name: string; preferred: string; year: number; month: number; day: number; system: string };
  reading: FullReading;
  karmic: KarmicSnapshot;
  loShu: LoShuResult;
  yogas: GridYogasResult;
  lucky: LuckyProfile;
  nameStudio: PersonalNameReading;
  weather: YearWeather;
  events: EventsGraphResult | null;
  py: number;
  pm: number;
  pd: number;
  hasMasters: boolean;
  masterList: number[];
}

export function assembleBlueprint(
  birthName: string,
  preferredName: string,
  year: number,
  month: number,
  day: number,
  system: "pythagorean" | "chaldean",
  today: Date,
  lang: Lang,
): BlueprintData {
  const reading = fullReading({ birthName, preferredName, year, month, day, system });
  const karmic = karmicSnapshot(reading);
  const loShu = loShuGrid(year, month, day);
  const yogas = gridYogas(loShu.counts);
  const py = personalYear(month, day, today.getFullYear()).number;
  const pm = personalMonth(py, today.getMonth() + 1).number;
  const pd = personalDay(pm, today.getDate()).number;
  const lucky = luckyProfile(day, reading.lifePath.number, (n) => {
    // match the engine's master-aware folding
    if (n === 11 || n === 22 || n === 33) {
      return { 11: 2, 22: 4, 33: 6 }[n] ?? n;
    }
    return n < 10 ? n : (String(n).split("").reduce((s, d) => s + Number(d), 0));
  });
  const nameStudio = personalNameReading(birthName, reading.lifePath.number, day);
  const weather = monthWeather(month, day, today.getFullYear(), today.getMonth() + 1, reading.lifePath.number);
  const events = loadLifeEvents();
  const evAnalysis = events.length > 0
    ? analyzeLifeEvents(events, year, month, day)
    : null;

  const masters = new Set<number>();
  for (const n of [
    reading.lifePath.number,
    reading.nameNumbers.expression,
    reading.nameNumbers.soulUrge,
    reading.nameNumbers.personality,
    reading.birthday.number,
    reading.maturity.number,
    py,
  ]) {
    if (n === 11 || n === 22 || n === 33) masters.add(n);
  }

  return {
    input: { name: birthName, preferred: preferredName, year, month, day, system },
    reading,
    karmic,
    loShu,
    yogas,
    lucky,
    nameStudio,
    weather,
    events: evAnalysis,
    py,
    pm,
    pd,
    hasMasters: masters.size > 0,
    masterList: [...masters],
  };
}

/* ------------------------------------------------------------------ */
/* Narrative helpers                                                   */
/* ------------------------------------------------------------------ */

/** Past-present-future narrative: pinnacles crossed, current pinnacle, next. */
export function pinnacleNarrative(data: BlueprintData, lang: Lang): { past: string; present: string; future: string } {
  const nowAge = data.input.year
    ? new Date().getFullYear() - data.input.year
    : 0;
  const p = data.reading.pinnacles;
  const findP = (age: number) => p.find((x) => age >= x.ageStart && age <= x.ageEnd) ?? p[3];
  const pastP = findP(Math.max(0, nowAge - 10));
  const curP = findP(nowAge);
  const nextP = p.find((x) => x.ageStart > nowAge) ?? p[3];
  if (lang === "hi") {
    return {
      past: `पिछले दशक (लगभग आयु ${pastP.ageStart}–${pastP.ageEnd === Infinity ? "∞" : pastP.ageEnd}) आप शिखर-अंक ${pastP.number} के अधीन थे — ${meaningFor(pastP.number).title} की विषय-रेखा। उस दौर की घटनाएँ यहीं से अपना रंग लेती हैं।`,
      present: `वर्तमान शिखर-अंक ${curP.number} (आयु ${curP.ageStart}–${curP.ageEnd === Infinity ? "∞" : curP.ageEnd}) — ${meaningFor(curP.number).title}। इसी की छाया में आपके आज के निर्णय पढ़े जाते हैं।`,
      future: `अगला शिखर-अंक ${nextP.number} लगभग आयु ${nextP.ageStart} से शुरू होगा — ${meaningFor(nextP.number).title}। अब का संवर्धन उस अध्याय की नींव है।`,
    };
  }
  return {
    past: `The last decade (roughly ages ${pastP.ageStart}–${pastP.ageEnd === Infinity ? "∞" : pastP.ageEnd}) ran under Pinnacle ${pastP.number} — the ${meaningFor(pastP.number).title} current. The events of those years took their colour from this theme.`,
    present: `Your current Pinnacle is ${curP.number} (ages ${curP.ageStart}–${curP.ageEnd === Infinity ? "∞" : curP.ageEnd}) — the ${meaningFor(curP.number).title}. Today's decisions read inside this climate.`,
    future: `The next Pinnacle ${nextP.number} begins around age ${nextP.ageStart} — the ${meaningFor(nextP.number).title}. What you consolidate now becomes that chapter's foundation.`,
  };
}

/** Remedy entry for the primary (birth) number. */
export function primaryRemedy(data: BlueprintData) {
  return remedyForNumber(data.input.day > 9 ? reduceToDigit(data.input.day) : data.input.day).remedy;
}

function reduceToDigit(n: number): number {
  while (n > 9) n = String(n).split("").reduce((s, d) => s + Number(d), 0);
  return n;
}

/** Chapter-level interpretive lookup with lang routing (used by the page). */
export function contentLookup(n: number, lang: Lang) {
  return numberContent(n, lang);
}

export { numberContent, masterContent, zeroMasters, karmicDebtContent, karmicLessonContent, bridgeContent, hiddenPassionContent, balanceNote, rationalThoughtContent, monthName, upcomingMonths };