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
  1: [{ en: "gold", hi: "स्वर्ण" }, { en: "yellow", hi: "पीला" }, { en: "bronze", hi: "कांस्य" }],
  2: [{ en: "green", hi: "हरा" }, { en: "cream", hi: "क्रीम" }, { en: "white", hi: "सफ़ेद" }],
  3: [
    { en: "mauve", hi: "मॉव" },
    { en: "violet", hi: "बैंगनी" },
    { en: "blue", hi: "नीला" },
    { en: "crimson", hi: "गहरा लाल" },
    { en: "rose", hi: "गुलाबी" },
  ],
  4: [{ en: "electric blue", hi: "विद्युत-नीला" }, { en: "grey", hi: "स्लेटी" }],
  5: [{ en: "grey", hi: "स्लेटी" }, { en: "white", hi: "सफ़ेद" }, { en: "shimmering fabrics", hi: "चमकीले रंग" }],
  6: [{ en: "blue with rose", hi: "नीला-गुलाबी" }, { en: "pink", hi: "पिंक" }],
  7: [{ en: "pale green", hi: "हल्का हरा" }, { en: "white", hi: "सफ़ेद" }, { en: "yellow", hi: "पीला" }],
  8: [
    { en: "dark grey", hi: "गहरा स्लेटी" },
    { en: "black", hi: "काला" },
    { en: "dark blue", hi: "गहरा नीला" },
    { en: "purple", hi: "बैंगनी" },
  ],
  9: [{ en: "crimson", hi: "गहरा लाल" }, { en: "red", hi: "लाल" }, { en: "rose", hi: "गुलाबी" }],
};

export interface GemName {
  en: string;
  hi: string;
}

export const LUCKY_GEMS: Record<number, GemName[]> = {
  1: [{ en: "topaz", hi: "पुखराज" }, { en: "amber", hi: "एम्बर" }, { en: "yellow diamond", hi: "पीला हीरा" }],
  2: [{ en: "pearl", hi: "मोती" }, { en: "moonstone", hi: "चंद्रकांता" }, { en: "jade", hi: "जेड" }],
  3: [{ en: "amethyst", hi: "जमुनिया (अमेथिस्ट)" }],
  4: [{ en: "sapphire (light or dark)", hi: "नीलम" }],
  5: [{ en: "diamond", hi: "हीरा" }, { en: "platinum", hi: "प्लैटिनम" }],
  6: [{ en: "turquoise", hi: "फिरोज़ा" }, { en: "emerald", hi: "पन्ना" }],
  7: [
    { en: "moonstone", hi: "चंद्रकांता" },
    { en: "cat's eye", hi: "लहसुनिया" },
    { en: "moss agate", hi: "मॉस एगेट" },
  ],
  8: [{ en: "amethyst", hi: "जमुनिया" }, { en: "dark sapphire", hi: "गहरा नीलम" }],
  9: [{ en: "ruby", hi: "माणिक्य" }, { en: "garnet", hi: "गार्नेट" }, { en: "bloodstone", hi: "हेलियोट्रोप" }],
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