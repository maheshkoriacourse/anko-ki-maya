/**
 * Anko Ki Maya v2 — Karmic & name-structure engine.
 *
 * Pure functions. Interpretive copy lives in lib/content/. Every result
 * carries `steps` so the UI can show the calculation (the Basis block).
 *
 * Systems implemented here (per the project study notes):
 *  - Karmic debt numbers 13 / 14 / 16 / 19 detected in core positions.
 *  - Karmic lessons = digits missing from the birth name's letter values.
 *  - Hidden passion = most repeated digit among the name's letter values.
 *  - Balance number = reduced sum of the name's initials.
 *  - Cornerstone = first letter of the first name; First vowel = first vowel.
 *  - Bridge numbers = gaps between Life Path / Expression / Soul / Personality.
 *  - Rational thought = first-name consonant sum blended with the birth day.
 *
 * Safe-language rule: the engine only reports structure. Copy layers add the
 * reflective framing ("a theme to reflect on"), never guarantees.
 */

import { reduce, letterValue, lifePath, type NumerologySystem, type FullReading } from "./numerology";

/* ------------------------------------------------------------------ */
/* Shared helpers                                                      */
/* ------------------------------------------------------------------ */

const VOWELS = new Set(["A", "E", "I", "O", "U"]);

function letterValues(name: string, system: NumerologySystem): { letter: string; value: number }[] {
  const out: { letter: string; value: number }[] = [];
  for (const ch of name.toUpperCase()) {
    if (!/[A-Z]/.test(ch)) continue;
    out.push({ letter: ch, value: letterValue(ch, system) });
  }
  return out;
}

function sumValues(values: { value: number }[]): number {
  return values.reduce((s, v) => s + v.value, 0);
}

/* ------------------------------------------------------------------ */
/* Karmic debt numbers 13 / 14 / 16 / 19                               */
/* ------------------------------------------------------------------ */

export const KARMIC_DEBT_NUMBERS = [13, 14, 16, 19] as const;
export type KarmicDebtNumber = (typeof KARMIC_DEBT_NUMBERS)[number];

export interface KarmicDebtHit {
  where: string;
  number: KarmicDebtNumber;
}

export interface KarmicDebtResult {
  hits: KarmicDebtHit[];
  steps: string[];
}

interface CoreNumbersLike {
  lifePathCompoundSum: number;
  expressionTotal: number;
  soulTotal: number;
  personalityTotal: number;
  birthDay: number;
  maturitySum: number;
}

function isDebt(n: number): n is KarmicDebtNumber {
  return (KARMIC_DEBT_NUMBERS as readonly number[]).includes(n);
}

/**
 * Detect 13/14/16/19 in the classic positions: the Life Path compound sum,
 * each name-number total, the raw birth day, and the maturity sum.
 */
export function karmicDebts(core: CoreNumbersLike): KarmicDebtResult {
  const candidates: { where: string; n: number }[] = [
    { where: "Life Path (compound sum before reduction)", n: core.lifePathCompoundSum },
    { where: "Expression / Destiny (letter total)", n: core.expressionTotal },
    { where: "Soul Urge (vowel total)", n: core.soulTotal },
    { where: "Personality (consonant total)", n: core.personalityTotal },
    { where: "Birth day", n: core.birthDay },
    { where: "Maturity (Life Path + Expression)", n: core.maturitySum },
  ];
  const hits: KarmicDebtHit[] = [];
  for (const c of candidates) {
    if (isDebt(c.n)) hits.push({ where: c.where, number: c.n });
  }
  const steps = [
    ...candidates.map((c) => `${c.where}: ${c.n}${isDebt(c.n) ? " — karmic debt mark" : ""}`),
    hits.length === 0
      ? "No 13/14/16/19 mark appears in the core positions."
      : `${hits.length} karmic debt mark${hits.length > 1 ? "s" : ""} found.`,
  ];
  return { hits, steps };
}

/* ------------------------------------------------------------------ */
/* Karmic lessons (missing digits in the name)                         */
/* ------------------------------------------------------------------ */

export interface KarmicLessonsResult {
  missing: number[];
  steps: string[];
}

/** Digits 1-9 that never appear among the name's letter values. */
export function karmicLessons(
  fullName: string,
  system: NumerologySystem = "pythagorean",
): KarmicLessonsResult {
  const present = new Set<number>();
  for (const v of letterValues(fullName, system)) present.add(v.value);
  const missing = ([1, 2, 3, 4, 5, 6, 7, 8, 9] as const).filter((d) => !present.has(d));
  const steps = [
    `Letter values of "${fullName}": ${letterValues(fullName, system)
      .map((v) => `${v.letter}${v.value}`)
      .join(" ")}`,
    `Digits present: ${[...present].sort().join(", ")}`,
    missing.length === 0
      ? "All digits 1-9 appear — no missing-digit lessons."
      : `Missing (karmic lesson digits): ${missing.join(", ")}`,
  ];
  return { missing, steps };
}

/* ------------------------------------------------------------------ */
/* Hidden passion (most repeated digit in the name)                    */
/* ------------------------------------------------------------------ */

export interface HiddenPassionResult {
  digits: number[]; // digits tied for the top repeat count
  count: number;
  steps: string[];
}

export function hiddenPassion(
  fullName: string,
  system: NumerologySystem = "pythagorean",
): HiddenPassionResult {
  const counts = new Map<number, number>();
  for (const v of letterValues(fullName, system)) {
    counts.set(v.value, (counts.get(v.value) ?? 0) + 1);
  }
  let top = 0;
  for (const c of counts.values()) top = Math.max(top, c);
  const digits = ([...counts.entries()] as [number, number][])
    .filter(([, c]) => c === top && top > 0)
    .map(([d]) => d)
    .sort((a, b) => a - b);
  const tally = ([...counts.entries()] as [number, number][])
    .sort((a, b) => a[0] - b[0])
    .map(([d, c]) => `${d}×${c}`)
    .join(", ");
  return {
    digits,
    count: top,
    steps: [
      `Letter-value tally: ${tally}`,
      `Highest repeat: ${top}× → digit${digits.length > 1 ? "s" : ""} ${digits.join(", ")}`,
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Balance number (initials)                                           */
/* ------------------------------------------------------------------ */

export interface BalanceNumberResult {
  number: number;
  raw: number;
  initials: string[];
  steps: string[];
}

export function balanceNumber(fullName: string, system: NumerologySystem = "pythagorean"): BalanceNumberResult {
  const words = fullName.trim().split(/\s+/).filter(Boolean);
  const initials = words.map((w) => w[0]?.toUpperCase() ?? "").filter((c) => /[A-Z]/.test(c));
  const raw = initials.reduce((s, c) => s + letterValue(c, system), 0);
  const n = reduce(raw);
  return {
    number: n,
    raw,
    initials,
    steps: [
      `Initials: ${initials.join(" ")} = ${initials.map((c) => letterValue(c, system)).join(" + ") || 0} = ${raw}`,
      `${raw} reduces to ${n}`,
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Cornerstone & first vowel                                           */
/* ------------------------------------------------------------------ */

export interface CornerstoneResult {
  cornerstone: string | null;
  cornerstoneValue: number;
  firstVowel: string | null;
  firstVowelValue: number;
  steps: string[];
}

export function cornerstoneAndFirstVowel(
  fullName: string,
  system: NumerologySystem = "pythagorean",
): CornerstoneResult {
  const firstWord = fullName.trim().split(/\s+/)[0] ?? "";
  const letters = letterValues(firstWord, system);
  const corner = letters[0] ?? null;
  const vowel = letters.find((v) => VOWELS.has(v.letter)) ?? null;
  return {
    cornerstone: corner?.letter ?? null,
    cornerstoneValue: corner?.value ?? 0,
    firstVowel: vowel?.letter ?? null,
    firstVowelValue: vowel?.value ?? 0,
    steps: [
      `First name: "${firstWord}"`,
      corner ? `Cornerstone (first letter): ${corner.letter} = ${corner.value}` : "No letters found",
      vowel ? `First vowel: ${vowel.letter} = ${vowel.value}` : "No vowel found",
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Bridge numbers                                                      */
/* ------------------------------------------------------------------ */

export interface BridgeResult {
  key: string;
  a: number;
  b: number;
  gap: number;
  reduced: number;
}

export interface BridgesResult {
  bridges: BridgeResult[];
  steps: string[];
}

/** |Life Path − Expression|, |Soul − Personality|, |Expression − Personality|. */
export function bridgeNumbers(
  lifePathNum: number,
  expression: number,
  soulUrge: number,
  personality: number,
): BridgesResult {
  const mk = (key: string, a: number, b: number): BridgeResult => {
    const gap = Math.abs(a - b);
    return { key, a, b, gap, reduced: reduce(gap) };
  };
  const bridges = [
    mk("life-path-expression", lifePathNum, expression),
    mk("soul-personality", soulUrge, personality),
    mk("expression-personality", expression, personality),
  ];
  return {
    bridges,
    steps: bridges.map((b) => `|${b.a} − ${b.b}| = ${b.gap} → bridge ${b.reduced}`),
  };
}

/* ------------------------------------------------------------------ */
/* Rational thought number                                             */
/* ------------------------------------------------------------------ */

export interface RationalThoughtResult {
  number: number;
  raw: number;
  steps: string[];
}

/** First-name consonant sum blended with the reduced birth day, then reduced. */
export function rationalThought(
  firstName: string,
  day: number,
  system: NumerologySystem = "pythagorean",
): RationalThoughtResult {
  const consonants = letterValues(firstName, system).filter((v) => !VOWELS.has(v.letter));
  const consonantSum = sumValues(consonants);
  const dayNum = reduce(day);
  const raw = consonantSum + dayNum;
  const n = reduce(raw);
  return {
    number: n,
    raw,
    steps: [
      `Consonants of "${firstName}": ${consonants.map((v) => v.letter).join("")} = ${consonantSum}`,
      `Birth day ${day} → ${dayNum}`,
      `${consonantSum} + ${dayNum} = ${raw} → ${n}`,
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Full karmic snapshot from a FullReading                             */
/* ------------------------------------------------------------------ */

export interface KarmicSnapshot {
  debts: KarmicDebtResult;
  lessons: KarmicLessonsResult;
  passion: HiddenPassionResult;
  balance: BalanceNumberResult;
  cornerstone: CornerstoneResult;
  bridges: BridgesResult;
  rational: RationalThoughtResult;
}

export function karmicSnapshot(reading: FullReading): KarmicSnapshot {
  const name = reading.input.birthName;
  const system = reading.input.system;
  const y = reading.input.year;
  const m = reading.input.month;
  const d = reading.input.day;

  // Recompute raw totals for debt detection (the v1 module reduces them).
  const lpSum = reduce(m) + reduce(d) + reduce(y);
  const all = letterValues(name, system);
  const vowels = all.filter((v) => VOWELS.has(v.letter));
  const consonants = all.filter((v) => !VOWELS.has(v.letter));
  const exprTotal = sumValues(all);
  const soulTotal = sumValues(vowels);
  const persTotal = sumValues(consonants);
  const maturitySum = reading.lifePath.number + reading.nameNumbers.expression;

  const firstName = name.trim().split(/\s+/)[0] ?? name;

  return {
    debts: karmicDebts({
      lifePathCompoundSum: lpSum,
      expressionTotal: exprTotal,
      soulTotal: soulTotal,
      personalityTotal: persTotal,
      birthDay: d,
      maturitySum,
    }),
    lessons: karmicLessons(name, system),
    passion: hiddenPassion(name, system),
    balance: balanceNumber(name, system),
    cornerstone: cornerstoneAndFirstVowel(name, system),
    bridges: bridgeNumbers(
      reading.lifePath.number,
      reading.nameNumbers.expression,
      reading.nameNumbers.soulUrge,
      reading.nameNumbers.personality,
    ),
    rational: rationalThought(firstName, d, system),
  };
}