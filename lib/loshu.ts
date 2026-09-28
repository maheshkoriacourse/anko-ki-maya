/**
 * Anko Ki Maya — Lo Shu Grid engine (added per product-owner request).
 *
 * The Lo Shu grid is the classic 3×3 magic square arranged as used in Indian
 * Lo Shu practice:
 *
 *        4  9  2      ← Thought / Mind plane
 *        3  5  7      ← Emotion / Will plane
 *        8  1  6      ← Action / Practical plane
 *
 * Each birth-date digit (1-9) is counted into its fixed cell. Zeros do not map
 * to any cell (there is no 0 in the grid) — they are reported separately as a
 * note. Repeated digits tally: a cell can show 0-3+ occurrences.
 *
 * Two diagonals are commonly read in Indian Lo Shu practice:
 *   2-4-6-8  "Golden" (money/wealth) diagonal
 *   1-5-9    confidence / spiritual diagonal
 *
 * All interpretation copy is reflective and non-deterministic — see
 * lib/meanings.ts and the README "Safety language rules" section.
 */

export interface LoShuCell {
  digit: number; // 1-9
  count: number; // occurrences of that digit in the DOB (0 = missing)
}

export interface LoShuPlane {
  key: "thought" | "emotion" | "action";
  name: string;
  digits: [number, number, number];
  complete: boolean; // all three digits present (≥1)
  note: string; // safe-language reflection note
}

export interface LoShuDiagonal {
  key: "golden" | "spiritual";
  name: string;
  digits: number[];
  complete: boolean;
  note: string;
}

export interface LoShuResult {
  grid: LoShuCell[][]; // [row][col]; row 1 = top (4,9,2)
  counts: Record<number, number>; // digit → occurrences in DOB
  zeros: number;
  planes: LoShuPlane[];
  diagonals: LoShuDiagonal[];
  strengths: string[]; // completed rows/diagonals ("arrows")
  missing: number[]; // digits with count 0
  missingNotes: string[]; // gentle reflection notes per missing digit
  steps: string[];
}

const GRID_ROWS: [number, number, number][] = [
  [4, 9, 2], // thought plane
  [3, 5, 7], // emotion plane
  [8, 1, 6], // action plane
];

export const LO_SHU_LAYOUT = GRID_ROWS;

const PLANE_META: Record<
  LoShuPlane["key"],
  { name: string; fullNote: string; partialNote: string; emptyNote: string }
> = {
  thought: {
    name: "Thought / Mind plane",
    fullNote:
      "A complete Thought plane may be a supportive pattern for planning and analysing ideas — a strength to be aware of.",
    partialNote:
      "A partially filled Thought plane may suggest a theme around balancing analysis with imagination to reflect on.",
    emptyNote:
      "An empty Thought plane may suggest a theme around trusting ideas and planning in small steps to reflect on.",
  },
  emotion: {
    name: "Emotion / Will plane",
    fullNote:
      "A complete Emotion plane may be a supportive pattern for emotional expression and creative follow-through.",
    partialNote:
      "A partially filled Emotion plane may suggest a theme around voicing feelings and creative confidence to reflect on.",
    emptyNote:
      "An empty Emotion plane may suggest a theme around exploring feelings and creativity gently, at your own pace.",
  },
  action: {
    name: "Action / Practical plane",
    fullNote:
      "A complete Action plane may be a supportive pattern for practical, hands-on execution.",
    partialNote:
      "A partially filled Action plane may suggest a theme around pacing practical follow-through to reflect on.",
    emptyNote:
      "An empty Action plane may suggest a theme around building routines and practical habits to reflect on.",
  },
};

const DIAGONAL_META: Record<
  LoShuDiagonal["key"],
  { name: string; fullNote: string; openNote: string }
> = {
  golden: {
    name: "Golden diagonal (2-4-6-8)",
    fullNote:
      "A complete Golden diagonal may be a supportive pattern for money-mindset clarity — a theme to reflect on with curiosity.",
    openNote:
      "An open Golden diagonal may suggest a theme around money mindset and long-term security to reflect on.",
  },
  spiritual: {
    name: "Confidence / spiritual diagonal (1-5-9)",
    fullNote:
      "A complete 1-5-9 diagonal may be a supportive pattern for confidence and self-belief — traditionally called the confidence arrow.",
    openNote:
      "An open 1-5-9 diagonal may suggest a theme around confidence and self-belief to reflect on.",
  },
};

const MISSING_GENTLE: Record<number, string> = {
  1: "missing 1 may suggest a theme around self-leadership and voicing your own ideas to reflect on",
  2: "missing 2 may suggest a theme around patience and partnership to reflect on",
  3: "missing 3 may suggest a theme around creative expression to reflect on",
  4: "missing 4 may suggest a theme around routines and order to reflect on",
  5: "missing 5 may suggest a theme around balance and adaptability to reflect on",
  6: "missing 6 may suggest a theme around care and responsibility toward others to reflect on",
  7: "missing 7 may suggest a theme around quiet reflection and analysis to reflect on",
  8: "missing 8 may suggest a theme around money mindset and long-term security to reflect on",
  9: "missing 9 may suggest a theme around empathy and bigger-picture thinking to reflect on",
};

/**
 * Build the Lo Shu reading from a date of birth.
 * Digits are taken from the full DOB (e.g. 15-06-1990 → 1,5,0,6,1,9,9,0);
 * each digit 1-9 counts into its fixed cell; 0s are noted separately.
 */
export function loShuGrid(year: number, month: number, day: number): LoShuResult {
  const dateStr = `${String(day).padStart(2, "0")}${String(month).padStart(
    2,
    "0",
  )}${String(year)}`;
  const digits = dateStr.split("").map(Number);

  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  let zeros = 0;
  for (const d of digits) {
    if (d === 0) {
      zeros++;
      continue;
    }
    counts[d]++;
  }

  const grid: LoShuCell[][] = GRID_ROWS.map((row) =>
    row.map((digit) => ({ digit, count: counts[digit] })),
  );

  const planes: LoShuPlane[] = GRID_ROWS.map((row, i) => {
    const key = (["thought", "emotion", "action"] as const)[i];
    const complete = row.every((d) => counts[d] > 0);
    const meta = PLANE_META[key];
    return {
      key,
      name: meta.name,
      digits: row as [number, number, number],
      complete,
      note: complete
        ? meta.fullNote
        : row.some((d) => counts[d] > 0)
          ? meta.partialNote
          : meta.emptyNote,
    };
  });

  const hasGolden = [2, 4, 6, 8].every((d) => counts[d] > 0);
  const hasSpiritual = [1, 5, 9].every((d) => counts[d] > 0);
  const diagonals: LoShuDiagonal[] = [
    {
      key: "golden",
      name: DIAGONAL_META.golden.name,
      digits: [2, 4, 6, 8],
      complete: hasGolden,
      note: hasGolden ? DIAGONAL_META.golden.fullNote : DIAGONAL_META.golden.openNote,
    },
    {
      key: "spiritual",
      name: DIAGONAL_META.spiritual.name,
      digits: [1, 5, 9],
      complete: hasSpiritual,
      note: hasSpiritual
        ? DIAGONAL_META.spiritual.fullNote
        : DIAGONAL_META.spiritual.openNote,
    },
  ];

  const strengths: string[] = [];
  for (const p of planes) {
    if (p.complete) strengths.push(`${p.name} complete (arrow) — ${p.note}`);
  }
  if (hasGolden) strengths.push(`${DIAGONAL_META.golden.name} complete — money-mindset pattern to reflect on`);
  if (hasSpiritual) strengths.push(`${DIAGONAL_META.spiritual.name} complete — confidence pattern to reflect on`);

  const missing = ([1, 2, 3, 4, 5, 6, 7, 8, 9] as const).filter((d) => counts[d] === 0);
  const missingNotes = missing.map(
    (d) => `Missing ${d}: ${MISSING_GENTLE[d]}.`,
  );

  const steps: string[] = [
    `Digits of the birth date ${String(day).padStart(2, "0")}-${String(month).padStart(2, "0")}-${year}: ${digits.join(", ")}`,
    `Each digit 1-9 is counted in its fixed Lo Shu cell; 0 does not sit in the grid${zeros > 0 ? ` (${zeros} zero${zeros > 1 ? "s" : ""} noted separately)` : ""}.`,
    `Counts: ${([1, 2, 3, 4, 5, 6, 7, 8, 9] as const)
      .filter((d) => counts[d] > 0)
      .map((d) => `${d}×${counts[d]}`)
      .join(", ")}.`,
    `Planes: Thought (4-9-2), Emotion (3-5-7), Action (8-1-6); diagonals: Golden 2-4-6-8, Confidence 1-5-9.`,
  ];

  return {
    grid,
    counts,
    zeros,
    planes,
    diagonals,
    strengths,
    missing,
    missingNotes,
    steps,
  };
}

/** Safe-language Lo Shu theme per digit — used by UI cards and tests. */
export const LO_SHU_DIGIT_THEME: Record<number, string> = {
  1: "self-leadership and new beginnings",
  2: "patience, partnership and sensitivity",
  3: "creative expression and joyful communication",
  4: "order, routines and steady foundations",
  5: "freedom, adaptability and balanced change",
  6: "care, responsibility and home harmony",
  7: "quiet analysis and inner reflection",
  8: "money mindset and long-term security",
  9: "empathy, idealism and bigger-picture thinking",
};