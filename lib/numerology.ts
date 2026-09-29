/**
 * Anko Ki Maya — Numerology calculation engine.
 *
 * Pure functions only (no DOM, no network). All interpretive copy lives in
 * lib/meanings.ts; this module returns numbers + transparent calculation steps.
 *
 * Two systems are supported:
 *  - Pythagorean (default): A..I = 1..9 repeating across the alphabet.
 *  - Chaldean: the older Mesopotamian map; the digit 9 is never assigned to a
 *    letter in Chaldean name numbers (9 is considered sacred/pure).
 *
 * Master numbers 11, 22 and 33 are preserved wherever the tradition preserves
 * them (see `reduce` below). Every result carries a `steps` array so the UI can
 * show exactly how each number was derived (the Basis block).
 */

export type NumerologySystem = "pythagorean" | "chaldean";

const PYTHAGOREAN_MAP: Record<string, number> = (() => {
  const map: Record<string, number> = {};
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((ch, i) => {
    map[ch] = (i % 9) + 1;
  });
  return map;
})();

/** Chaldean letter values. Note: no letter maps to 9 in this system. */
const CHALDEAN_MAP: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 8, G: 3, H: 5, I: 1,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 7, P: 8, Q: 1, R: 2,
  S: 3, T: 4, U: 6, V: 5, W: 6, X: 5, Y: 1, Z: 7,
};

export const SYSTEM_LETTER_VALUES: Record<
  NumerologySystem,
  Record<string, number>
> = { pythagorean: PYTHAGOREAN_MAP, chaldean: CHALDEAN_MAP };

export function letterValue(letter: string, system: NumerologySystem): number {
  const map = SYSTEM_LETTER_VALUES[system];
  return map[letter.toUpperCase()] ?? 0;
}

/**
 * Reduce a number to a single digit, PRESERVING master numbers 11/22/33.
 * e.g. reduce(1990) → 19 → 10 → 1; reduce(29) → 11 (kept).
 */
export function reduce(n: number, depth = 0): number {
  if (n < 10) return n;
  if (n === 11 || n === 22 || n === 33) return n;
  if (depth > 30) throw new Error("reduce: recursion guard tripped");
  const next = String(n)
    .split("")
    .reduce((sum, d) => sum + Number(d), 0);
  return reduce(next, depth + 1);
}

/** Like `reduce`, but keeps reducing past master numbers (used for compound display). */
export function reduceFully(n: number): number {
  const r = reduce(n);
  if (r > 9) return reduceFully(String(r).split("").reduce((s, d) => s + Number(d), 0));
  return r;
}

/* ------------------------------------------------------------------ */
/* Life Path                                                           */
/* ------------------------------------------------------------------ */

export interface LifePathResult {
  number: number;
  compound: string;
  steps: string[];
}

/**
 * Pythagorean method: reduce month, day and year separately (each preserving
 * masters), then sum and reduce again. Compound digits before the final
 * reduction are reported as "M/D" (e.g. Life Path 3 from 6 + 6 = 12 → 3).
 */
export function lifePath(
  year: number,
  month: number,
  day: number,
): LifePathResult {
  const m = reduce(month);
  const d = reduce(day);
  const y = reduce(year);
  const sum = m + d + y;
  const final = reduce(sum);
  return {
    number: final,
    compound: `${sum}/${final}`,
    steps: [
      `Birth date: ${day}/${month}/${year}`,
      `Month ${month} → ${m}`,
      `Day ${day} → ${d}`,
      `Year ${year} → ${y}`,
      `${m} + ${d} + ${y} = ${sum}`,
      sum > 9
        ? `${sum} reduces to ${final}${
            [11, 22, 33].includes(sum) ? " (master number preserved)" : ""
          }`
        : `Already a single digit`,
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Name-based numbers (Expression, Soul Urge, Personality)             */
/* ------------------------------------------------------------------ */

export interface NameNumbersResult {
  expression: number;
  expressionSteps: string[];
  soulUrge: number;
  soulUrgeSteps: string[];
  personality: number;
  personalitySteps: string[];
}

const VOWELS = new Set(["A", "E", "I", "O", "U"]);

function perLetterSteps(
  name: string,
  system: NumerologySystem,
  filter: "all" | "vowels" | "consonants",
): { values: { letter: string; value: number }[]; total: number } {
  const values: { letter: string; value: number }[] = [];
  let total = 0;
  for (const ch of name.toUpperCase()) {
    if (!/[A-Z]/.test(ch)) continue;
    const isVowel = VOWELS.has(ch);
    if (filter === "vowels" && !isVowel) continue;
    if (filter === "consonants" && isVowel) continue;
    const v = letterValue(ch, system);
    values.push({ letter: ch, value: v });
    total += v;
  }
  return { values, total };
}

/**
 * Expression/Destiny: sum of all letters of the full birth name.
 * Soul Urge: sum of vowels only. Personality: consonants only.
 * Y is treated as a consonant (conservative rule, documented in README).
 */
export function nameNumbers(
  fullName: string,
  system: NumerologySystem = "pythagorean",
): NameNumbersResult {
  const sysLabel = system === "chaldean" ? "Chaldean" : "Pythagorean";
  const all = perLetterSteps(fullName, system, "all");
  const vowels = perLetterSteps(fullName, system, "vowels");
  const consonants = perLetterSteps(fullName, system, "consonants");

  return {
    expression: reduce(all.total),
    expressionSteps: [
      `System: ${sysLabel}`,
      `Each letter of "${fullName}" gets its number:`,
      ...all.values.map((v) => `  ${v.letter} = ${v.value}`),
      `Sum = ${all.total} → ${reduce(all.total)}`,
    ],
    soulUrge: reduce(vowels.total),
    soulUrgeSteps: [
      `Vowels only (A, E, I, O, U) of "${fullName}":`,
      ...vowels.values.map((v) => `  ${v.letter} = ${v.value}`),
      vowels.values.length === 0
        ? "  (no vowels found)"
        : `Sum = ${vowels.total} → ${reduce(vowels.total)}`,
    ],
    personality: reduce(consonants.total),
    personalitySteps: [
      `Consonants only (Y treated as a consonant) of "${fullName}":`,
      ...consonants.values.map((v) => `  ${v.letter} = ${v.value}`),
      `Sum = ${consonants.total} → ${reduce(consonants.total)}`,
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Birthday, Maturity                                                  */
/* ------------------------------------------------------------------ */

export function birthdayNumber(day: number): { number: number; steps: string[] } {
  const n = reduce(day);
  return {
    number: n,
    steps: [`Birth day: ${day}`, day > 9 ? `${day} reduces to ${n}` : `Already a single digit`],
  };
}

/** Maturity = Life Path + Expression, reduced. */
export function maturityNumber(
  lifePathNum: number,
  expressionNum: number,
): { number: number; steps: string[] } {
  const sum = lifePathNum + expressionNum;
  const n = reduce(sum);
  return {
    number: n,
    steps: [`Life Path ${lifePathNum} + Expression ${expressionNum} = ${sum}`, `${sum} → ${n}`],
  };
}

/* ------------------------------------------------------------------ */
/* Personal Year / Month / Day                                         */
/* ------------------------------------------------------------------ */

export function personalYear(
  birthMonth: number,
  birthDay: number,
  currentYear: number,
): { number: number; steps: string[] } {
  const m = reduce(birthMonth);
  const d = reduce(birthDay);
  const y = reduce(currentYear);
  const sum = m + d + y;
  const n = reduce(sum);
  return {
    number: n,
    steps: [
      `Birth month ${birthMonth} → ${m}; birth day ${birthDay} → ${d}; current year ${currentYear} → ${y}`,
      `${m} + ${d} + ${y} = ${sum}`,
      `${sum} → ${n}`,
    ],
  };
}

export function personalMonth(
  personalYearNum: number,
  calendarMonth: number,
): { number: number; steps: string[] } {
  const n = reduce(personalYearNum + reduce(calendarMonth));
  return {
    number: n,
    steps: [`Personal Year ${personalYearNum} + calendar month ${calendarMonth} = ${
      personalYearNum + calendarMonth
    }`, `→ ${n}`],
  };
}

export function personalDay(
  personalMonthNum: number,
  calendarDay: number,
): { number: number; steps: string[] } {
  const n = reduce(personalMonthNum + reduce(calendarDay));
  return {
    number: n,
    steps: [`Personal Month ${personalMonthNum} + calendar day ${calendarDay} = ${
      personalMonthNum + calendarDay
    }`, `→ ${n}`],
  };
}

/* ------------------------------------------------------------------ */
/* Pinnacles & Challenges                                              */
/* ------------------------------------------------------------------ */

export interface Pinnacle {
  index: 1 | 2 | 3 | 4;
  number: number;
  ageStart: number;
  ageEnd: number;
  formula: string;
}

export interface Challenge {
  index: 1 | 2 | 3 | 4;
  number: number;
  label: string;
}

/**
 * Pinnacles — the traditional formulas:
 *   1st = month + day
 *   2nd = day + year
 *   3rd = 1st + 2nd
 *   4th = month + year
 * Timing: life-path-derived anchors: p1 starts at 36 − lifePath,
 * each span = 9 years, p4 runs for the rest of life.
 */
export function pinnacles(
  year: number,
  month: number,
  day: number,
): { pinnacles: Pinnacle[]; steps: string[] } {
  const lp = lifePath(year, month, day).number;
  const lpCore = lp === 11 ? 2 : lp === 22 ? 4 : lp === 33 ? 6 : lp;
  const p1 = reduce(reduce(month) + reduce(day));
  const p2 = reduce(reduce(day) + reduce(year));
  const p3 = reduce(reduce(p1) + reduce(p2));
  const p4 = reduce(reduce(month) + reduce(year));
  const start1 = 36 - lpCore;
  const spans: Pinnacle[] = [
    { index: 1, number: p1, ageStart: start1, ageEnd: start1 + 8, formula: "birth month + birth day" },
    { index: 2, number: p2, ageStart: start1 + 9, ageEnd: start1 + 17, formula: "birth day + birth year" },
    { index: 3, number: p3, ageStart: start1 + 18, ageEnd: start1 + 26, formula: "Pinnacle 1 + Pinnacle 2" },
    { index: 4, number: p4, ageStart: start1 + 27, ageEnd: Infinity, formula: "birth month + birth year" },
  ];
  return {
    pinnacles: spans,
    steps: [
      `Life Path ${lp}${lp !== lpCore ? ` (used as ${lpCore} for timing)` : ""} → Pinnacle 1 begins around age ${start1}.`,
      `Each Pinnacle lasts 9 years; Pinnacle 4 continues for the rest of life.`,
      `P1 = month+day = ${p1}; P2 = day+year = ${p2}; P3 = P1+P2 = ${p3}; P4 = month+year = ${p4}.`,
    ],
  };
}

/**
 * Challenges — traditional differences:
 *   1st = |month − day|, 2nd = |day − year|, 3rd = |1st − 2nd|, 4th = |month − year|.
 * A zero is conventionally reported as "0" (an "all or nothing" teaching theme).
 */
export function challenges(
  year: number,
  month: number,
  day: number,
): { challenges: Challenge[]; steps: string[] } {
  const labels = ["Early", "Second", "Main", "Later"] as const;
  const c1 = Math.abs(reduce(month) - reduce(day));
  const c2 = Math.abs(reduce(day) - reduce(year));
  const c3 = Math.abs(c1 - c2);
  const c4 = Math.abs(reduce(month) - reduce(year));
  const mk = (i: 1 | 2 | 3 | 4, n: number): Challenge => ({
    index: i,
    number: n,
    label: labels[i - 1],
  });
  return {
    challenges: [mk(1, c1), mk(2, c2), mk(3, c3), mk(4, c4)],
    steps: [
      `C1 = |month − day| = ${c1}`,
      `C2 = |day − year| = ${c2}`,
      `C3 = |C1 − C2| = ${c3}`,
      `C4 = |month − year| = ${c4}`,
      `Challenges are growth work to do — not obstacles with guaranteed outcomes.`,
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Full profile                                                        */
/* ------------------------------------------------------------------ */

export interface ProfileInput {
  birthName: string;
  preferredName?: string;
  year: number;
  month: number; // 1-12
  day: number; // 1-31
  system: NumerologySystem;
}

export interface FullReading {
  input: ProfileInput;
  lifePath: LifePathResult;
  birthday: { number: number; steps: string[] };
  nameNumbers: NameNumbersResult;
  maturity: { number: number; steps: string[] };
  pinnacles: Pinnacle[];
  pinnacleSteps: string[];
  challenges: Challenge[];
  challengeSteps: string[];
}

export function fullReading(input: ProfileInput): FullReading {
  const lp = lifePath(input.year, input.month, input.day);
  const nn = nameNumbers(input.birthName, input.system);
  const bd = birthdayNumber(input.day);
  const mat = maturityNumber(lp.number, nn.expression);
  const pin = pinnacles(input.year, input.month, input.day);
  const ch = challenges(input.year, input.month, input.day);
  return {
    input,
    lifePath: lp,
    birthday: bd,
    nameNumbers: nn,
    maturity: mat,
    pinnacles: pin.pinnacles,
    pinnacleSteps: pin.steps,
    challenges: ch.challenges,
    challengeSteps: ch.steps,
  };
}

/* ------------------------------------------------------------------ */
/* Cycle timeline (used by Overview + Six-Month Forecast)              */
/* ------------------------------------------------------------------ */

export interface MonthCycle {
  year: number;
  month: number; // 1-12
  label: string;
  personalYear: number;
  personalMonth: number;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function monthName(month: number): string {
  return MONTH_NAMES[(month - 1 + 12) % 12];
}

/** Next `count` months starting from `fromYear/fromMonth`, inclusive. */
export function upcomingMonths(
  birthMonth: number,
  birthDay: number,
  fromYear: number,
  fromMonth: number,
  count = 6,
): MonthCycle[] {
  const out: MonthCycle[] = [];
  const py = personalYear(birthMonth, birthDay, fromYear).number;
  for (let i = 0; i < count; i++) {
    const m = ((fromMonth - 1 + i) % 12) + 1;
    const y = fromYear + Math.floor((fromMonth - 1 + i) / 12);
    // The Personal Year number rolls over each calendar year.
    const yearForThisMonth = personalYear(birthMonth, birthDay, y).number;
    const pm = personalMonth(yearForThisMonth, m).number;
    out.push({
      year: y,
      month: m,
      label: `${monthName(m)} ${y}`,
      personalYear: yearForThisMonth,
      personalMonth: pm,
    });
  }
  void py;
  return out;
}

/* ------------------------------------------------------------------ */
/* Compatibility (two profiles, privacy-first)                         */
/* ------------------------------------------------------------------ */

export interface CompatibilityResult {
  a: { lifePath: number; expression: number; soulUrge: number };
  b: { lifePath: number; expression: number; soulUrge: number };
  lifePathPair: { numbers: [number, number]; combined: number; steps: string[] };
  expressionPair: { numbers: [number, number]; combined: number; steps: string[] };
  soulUrgePair: { numbers: [number, number]; combined: number; steps: string[] };
}

function pairOf(a: number, b: number): { numbers: [number, number]; combined: number; steps: string[] } {
  const sum = a + b;
  const c = reduce(sum);
  return {
    numbers: [a, b],
    combined: c,
    steps: [`${a} + ${b} = ${sum}`, `${sum} → ${c}`],
  };
}

/**
 * Compatibility theme = pairwise sums of Life Path, Expression and Soul Urge.
 * Interpretation copy is provided by meanings.ts as reflective themes only.
 */
export function compatibility(
  a: { lifePath: number; expression: number; soulUrge: number },
  b: { lifePath: number; expression: number; soulUrge: number },
): CompatibilityResult {
  return {
    a,
    b,
    lifePathPair: pairOf(a.lifePath, b.lifePath),
    expressionPair: pairOf(a.expression, b.expression),
    soulUrgePair: pairOf(a.soulUrge, b.soulUrge),
  };
}

/* ------------------------------------------------------------------ */
/* Validation helpers (shared by forms)                                */
/* ------------------------------------------------------------------ */

export function isValidBirthDate(year: number, month: number, day: number): boolean {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) return false;
  if (year < 1900 || year > new Date().getFullYear()) return false;
  if (month < 1 || month > 12) return false;
  const daysInMonth = new Date(year, month, 0).getDate();
  return day >= 1 && day <= daysInMonth;
}

export function sanitizeName(name: string): string {
  return name.replace(/\s+/g, " ").trim();
}