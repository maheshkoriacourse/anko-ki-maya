/**
 * Anko Ki Maya v2 — Lucky number / day / color / gem derivation.
 *
 * Tables follow the classical chart (Cheiro's Book of Numbers, matching the
 * prosperity-numerology chart in the study notes). Presentation rule: all of
 * this is rendered as "traditionally associated" — never as a guarantee, and
 * gems/colors are offered as cultural associations, not purchases advice.
 */

export type DayCode = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

export const PLANET_FOR_NUMBER: Record<number, string> = {
  1: "Sun",
  2: "Moon",
  3: "Jupiter",
  4: "Rahu",
  5: "Mercury",
  6: "Venus",
  7: "Ketu",
  8: "Saturn",
  9: "Mars",
};

/** Cheiro's lucky-weekday table, keyed by the birth (root) number. */
export const LUCKY_DAYS: Record<number, DayCode[]> = {
  1: ["Sun", "Mon"],
  2: ["Sun", "Mon", "Fri"],
  3: ["Thu", "Fri", "Tue"],
  4: ["Sat", "Sun", "Mon"],
  5: ["Wed", "Fri"],
  6: ["Tue", "Thu", "Fri"],
  7: ["Sun", "Mon"],
  8: ["Sat", "Sun", "Mon"],
  9: ["Tue", "Thu", "Fri"],
};

export interface ColorName {
  en: string;
  hi: string;
}

export const LUCKY_COLORS: Record<number, ColorName[]> = {
  1: [{ en: "gold", hi: "svarn" }, { en: "yellow", hi: "peela" }, { en: "bronze", hi: "kaansya" }],
  2: [{ en: "green", hi: "hara" }, { en: "cream", hi: "cream" }, { en: "white", hi: "safed" }],
  3: [
    { en: "mauve", hi: "mov" },
    { en: "violet", hi: "baingai" },
    { en: "blue", hi: "neela" },
    { en: "crimson", hi: "gehra laal" },
    { en: "rose", hi: "gulaabi" },
  ],
  4: [{ en: "electric blue", hi: "vidyut-neela" }, { en: "grey", hi: "slei" }],
  5: [{ en: "grey", hi: "slei" }, { en: "white", hi: "safed" }, { en: "shimmering fabrics", hi: "chamakeele rang" }],
  6: [{ en: "blue with rose", hi: "neela-gulaabi" }, { en: "pink", hi: "pink" }],
  7: [{ en: "pale green", hi: "halka hara" }, { en: "white", hi: "safed" }, { en: "yellow", hi: "peela" }],
  8: [
    { en: "dark grey", hi: "gehra slei" },
    { en: "black", hi: "kaala" },
    { en: "dark blue", hi: "gehra neela" },
    { en: "purple", hi: "baingai" },
  ],
  9: [{ en: "crimson", hi: "gehra laal" }, { en: "red", hi: "laal" }, { en: "rose", hi: "gulaabi" }],
};

export interface GemName {
  en: string;
  hi: string;
}

export const LUCKY_GEMS: Record<number, GemName[]> = {
  1: [{ en: "topaz", hi: "Pukhraj" }, { en: "amber", hi: "embar" }, { en: "yellow diamond", hi: "peela Heera" }],
  2: [{ en: "pearl", hi: "Moti" }, { en: "moonstone", hi: "chndrakaanta" }, { en: "jade", hi: "jed" }],
  3: [{ en: "amethyst", hi: "jamuniyaa (amethist)" }],
  4: [{ en: "sapphire (light or dark)", hi: "Neelam" }],
  5: [{ en: "diamond", hi: "Heera" }, { en: "platinum", hi: "plaitinam" }],
  6: [{ en: "turquoise", hi: "phiroja" }, { en: "emerald", hi: "Panna" }],
  7: [
    { en: "moonstone", hi: "chndrakaanta" },
    { en: "cat's eye", hi: "Lehsunia" },
    { en: "moss agate", hi: "mos eget" },
  ],
  8: [{ en: "amethyst", hi: "jamuniyaa" }, { en: "dark sapphire", hi: "gehra Neelam" }],
  9: [{ en: "ruby", hi: "Maanikya" }, { en: "garnet", hi: "gaarnet" }, { en: "bloodstone", hi: "heliyotrop" }],
};

/**
 * Cheiro's harmony families. 5 is the free-floating digit that pairs with
 * every number; 1-2-4-7 and 3-6-9 are the two main currents (8 harmonises
 * with the 3-6-9 current in Cheiro's reading).
 */
export const ALLIES: Record<number, number[]> = {
  1: [1, 2, 4, 7, 5],
  2: [1, 2, 4, 7, 5],
  3: [3, 6, 9, 5],
  4: [1, 2, 4, 7, 5],
  5: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  6: [3, 6, 9, 5],
  7: [1, 2, 4, 7, 5],
  8: [3, 6, 9, 5],
  9: [3, 6, 9, 5],
};

export interface LuckyProfile {
  birthNumber: number; // reduced root number (masters folded with note)
  lpUnit: number;
  masterNote: string | null; // set when a master number was folded
  numbers: number[]; // lucky numbers (deduped)
  days: DayCode[];
  colors: ColorName[];
  gems: GemName[];
  steps: string[];
}

/** Merge the birth-number chart with the Life Path unit's chart. */
export function luckyProfile(
  birthDay: number,
  lifePathNumber: number,
  reduceFullyLike: (n: number) => number,
): LuckyProfile {
  const rawBirth = birthDay > 9 ? Number(String(birthDay).split("").reduce((s, d) => s + Number(d), "")) : birthDay;
  void rawBirth;
  const birthNumber = reduceFullyLike(birthDay);
  const lpUnit = reduceFullyLike(lifePathNumber);
  const masterNote =
    lifePathNumber === 11 || lifePathNumber === 22 || lifePathNumber === 33
      ? `Life Path ${lifePathNumber} is read on the ${lpUnit} chart with the master vibration noted alongside.`
      : null;

  const numbers = Array.from(new Set([...(ALLIES[birthNumber] ?? [birthNumber]), ...(ALLIES[lpUnit] ?? [])]));
  const days = Array.from(new Set([...(LUCKY_DAYS[birthNumber] ?? []), ...(LUCKY_DAYS[lpUnit] ?? [])]));
  const colorMap = new Map<string, ColorName>();
  for (const c of [...(LUCKY_COLORS[birthNumber] ?? []), ...(LUCKY_COLORS[lpUnit] ?? [])]) colorMap.set(c.en, c);
  const gemMap = new Map<string, GemName>();
  for (const g of [...(LUCKY_GEMS[birthNumber] ?? []), ...(LUCKY_GEMS[lpUnit] ?? [])]) gemMap.set(g.en, g);

  return {
    birthNumber,
    lpUnit,
    masterNote,
    numbers,
    days,
    colors: [...colorMap.values()],
    gems: [...gemMap.values()],
    steps: [
      `Birth number ${birthDay} → root ${birthNumber}; Life Path ${lifePathNumber} → unit ${lpUnit}.`,
      `Lucky numbers merge the harmony families of both (5 pairs with every digit).`,
      `Days, colors and gems follow the classical Cheiro chart for each root.`,
    ],
  };
}