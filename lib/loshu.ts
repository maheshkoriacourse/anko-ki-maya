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
 * v3.1 (owner correction #1): the BHAGYANK (life-path) digit ALSO fills its
 * cell — school rule 'Bhagyank bhi grid mein bharta hai'. Grid digits = DOB digits
 * + Bhagyank digit; missing-number logic is verified AFTER the Bhagyank digit
 * is added (a digit missing from the DOB but present as Bhagyank is NOT
 * missing from the grid).
 *
 * v3.4 (owner QA round): bilingual output — loShuGrid takes an optional
 * `lang` param; every interpretive string (planes/diagonals notes, strengths,
 * missingNotes, steps) is written in the DIRECT jyotishi voice in that
 * language: spoken-simple English, spoken Hinglish for hi. No 'theme',
 * no hedged filler (numerology-product-lab voice rules).
 *
 * Two diagonals are commonly read in Indian Lo Shu practice:
 *   2-4-6-8  "Golden" (money/wealth) diagonal
 *   1-5-9    confidence / spiritual diagonal
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
  note: string; // direct jyotishi note in the requested language
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
  counts: Record<number, number>; // digit → occurrences (DOB digits + Bhagyank digit)
  dobCounts: Record<number, number>; // digit → occurrences in the DOB digits only
  bhagyank: number; // the life-path digit that fills its cell (1-9)
  zeros: number;
  planes: LoShuPlane[];
  diagonals: LoShuDiagonal[];
  strengths: string[]; // completed rows/diagonals ("arrows") — in lang
  missing: number[]; // digits with count 0 AFTER the Bhagyank digit is added
  missingNotes: string[]; // direct notes per missing digit — in lang
  steps: string[];
  /** v3.4: the language the interpretive strings were built in. */
  lang: LoShuLang;
}

export type LoShuLang = "en" | "hi";

/**
 * v3.1 helper — the Bhagyank digit that fills the grid cell.
 * Bhagyank = month + day + year each digit-summed, then the sum reduced to a
 * single digit. Masters 11/22/33 fold by the school rule (11→2, 22→4, 33→6)
 * so the digit always sits in a real cell.
 */
function digitSumOf(n: number): number {
  let s = n;
  while (s > 9) s = String(s).split("").reduce((acc, d) => acc + Number(d), 0);
  return s;
}

export function bhagyankFold(year: number, month: number, day: number): number {
  const sum = digitSumOf(month) + digitSumOf(day) + digitSumOf(year);
  const reduced = digitSumOf(sum);
  return reduced === 11 ? 2 : reduced === 22 ? 4 : reduced === 33 ? 6 : reduced;
}

const GRID_ROWS: [number, number, number][] = [
  [4, 9, 2], // thought plane
  [3, 5, 7], // emotion plane
  [8, 1, 6], // action plane
];

export const LO_SHU_LAYOUT = GRID_ROWS;

/* ------------------------------------------------------------------ */
/* v3.4 bilingual meta — direct jyotishi voice, {en, hi}                */
/* (en = spoken-simple, hi = spoken Hinglish; no hedged filler)         */
/* ------------------------------------------------------------------ */

const PLANE_META: Record<
  LoShuPlane["key"],
  {
    name: { en: string; hi: string };
    fullNote: { en: string; hi: string };
    partialNote: { en: string; hi: string };
    emptyNote: { en: string; hi: string };
  }
> = {
  thought: {
    name: { en: "Thought / Mind plane", hi: "man-tal (dimaag)" },
    fullNote: {
      en: "Thought plane (4-9-2) complete — planning and analysis are your working strengths. Write the plan in one line before every big move and use this edge openly.",
      hi: "man-tal (4-9-2) poora — sochne-samajhne aur planning aapki asli taakat hai. Har bade kaam se pehle plan ek line mein likho aur is edge ka khul kar istemal karo.",
    },
    partialNote: {
      en: "Thought plane (4-9-2) partially filled — analysis is ready, imagination needs feeding. Plan on paper and test one bold idea the same week.",
      hi: "man-tal (4-9-2) aadha bhara — vishleshan hai, kalpana ko poshan chahiye. Soch paper par likho aur usi hafte ek bada idea test karo.",
    },
    emptyNote: {
      en: "Thought plane (4-9-2) empty — ideas keep waiting for the perfect plan and the plan never comes. Write the plan in one line and act on it the same day.",
      hi: "man-tal (4-9-2) khaali — perfect plan ka intezar bekaar hai. Plan ek line mein likho aur usi din kaam shuru karo.",
    },
  },
  emotion: {
    name: { en: "Emotion / Will plane", hi: "bhav-tal (dil)" },
    fullNote: {
      en: "Emotion plane (3-5-7) complete — you feel deeply and finish what your heart starts. Say the feeling out loud; spoken feeling converts into work.",
      hi: "bhav-tal (3-5-7) poora — dil ki baat dil se kehte ho aur jo shuru karte ho use poora karte ho. Jo mehsoos hota hai bol do — wahi baat kaam banti hai.",
    },
    partialNote: {
      en: "Emotion plane (3-5-7) partially filled — feelings run deep, expression stays selective. Speak the important sentence before this phase closes.",
      hi: "bhav-tal (3-5-7) aadha bhara — emotions gehre hain, bas kehne mein chunnee hoti hai. Zaroori baat is daur band hone se pehle keh do.",
    },
    emptyNote: {
      en: "Emotion plane (3-5-7) empty — feelings stay stored instead of shown. One honest sentence at the right moment does more than a year of silence.",
      hi: "bhav-tal (3-5-7) khaali — feelings andar hi andar rakhne ki aadat. Ek imaandaar sentence sahi mauke par poore saal ki khamoshi se bada kaam karta hai.",
    },
  },
  action: {
    name: { en: "Action / Practical plane", hi: "karm-tal (kaam)" },
    fullNote: {
      en: "Action plane (8-1-6) complete — execution is your natural mode: you start, repair and finish with your own hands.",
      hi: "karm-tal (8-1-6) poora — kaam apne haath se karna aapki fitrat hai: shuru karte ho, seekh ke theek karte ho, poore karte ho.",
    },
    partialNote: {
      en: "Action plane (8-1-6) partially filled — the work ethic is present, follow-through needs pacing. One committed task finished daily beats ten plans.",
      hi: "karm-tal (8-1-6) aadha bhara — mehnat hai, bas follow-through ki raftaar theek karni hai. Roz ek pakka kaam poora karna das plans se bada hai.",
    },
    emptyNote: {
      en: "Action plane (8-1-6) empty — routines keep breaking because they start too big. Pick one small habit, hold it 21 days; the rest joins in.",
      hi: "karm-tal (8-1-6) khaali — routine banti hai phir toot jaati hai kyunki shuruaat badi rakh dete ho. Ek chhota aadat pakdo, 21 din chalao; baaki apne aap judta hai.",
    },
  },
};

const DIAGONAL_META: Record<
  LoShuDiagonal["key"],
  { name: { en: string; hi: string }; fullNote: { en: string; hi: string }; openNote: { en: string; hi: string } }
> = {
  golden: {
    name: { en: "Golden diagonal (2-4-6-8)", hi: "Golden baan (2-4-6-8) — dhan-rekha" },
    fullNote: {
      en: "Golden diagonal (2-4-6-8) complete — the money arrow is drawn: records, planning and patience together make earnings land clean and strong.",
      hi: "Golden baan (2-4-6-8) poora — dhan-rekha bani: record, planning aur sabr saath chalain toh kamai saaf aur pakki baithti hai.",
    },
    openNote: {
      en: "Golden diagonal (2-4-6-8) is open — mind the money this year: spend carefully and think through every new purchase before committing.",
      hi: "Golden baan (2-4-6-8) khula hai — paison par dhyaan dene ka saal: kharcha sambhal ke rakho aur nayi kharidari soch-samajh kar karo.",
    },
  },
  spiritual: {
    name: { en: "Confidence / spiritual diagonal (1-5-9)", hi: "vishwas-baan (1-5-9)" },
    fullNote: {
      en: "1-5-9 diagonal complete — the determination arrow: self-belief carries you through every change. Speak first; the room follows.",
      hi: "1-5-9 baan poora — sankalp baan: aatm-vishwas har badlaav mein aapko aage le jaata hai. Pehle aap bolo, mehfil aapke saath aati hai.",
    },
    openNote: {
      en: "1-5-9 diagonal is open — confidence is built, not found: speak first in one room every week and this arrow sharpens on its own.",
      hi: "1-5-9 baan khula hai — vishwas banaya jaata hai: hafte mein ek mehfil mein pehle bolo, baan apne aap tez hota jaayega.",
    },
  },
};

const MISSING_META: Record<number, { en: string; hi: string }> = {
  1: {
    en: "Missing 1 — self-leadership runs thin and decisions wait for others. Make one decision a day that is yours alone.",
    hi: "ank 1 khaali — khud pe faisle kamzor padte hain aur faisla doosron ka wait karta hai. Roz ek faisa lo jo sirf aapka ho.",
  },
  2: {
    en: "Missing 2 — patience and partnership need training. Give one key relationship ten steady minutes daily.",
    hi: "ank 2 khaali — dhairya aur saajhedari ki taiyaari chahiye. Kisi ek khaas rishte ko roz das pakke minute do.",
  },
  3: {
    en: "Missing 3 — your expression stays caged. Write or speak your idea to one person this week.",
    hi: "ank 3 khaali — apni baat kehni reh jaati hai. Is hafte apna idea ek insaan ko sunao ya likho.",
  },
  4: {
    en: "Missing 4 — order and routine slip. Fix a set wake-sleep-work slot and guard it.",
    hi: "ank 4 khaali — routine bikharti hai. Uthne-sona-kaam ka pakka samay banao aur use bacha ke rakho.",
  },
  5: {
    en: "Missing 5 — change feels heavy. One new route, dish or skill each month keeps you adaptive.",
    hi: "ank 5 khaali — badlaav bhaari lagta hai. Mahine mein ek nayi cheez (raasta, khana, skill) try karo.",
  },
  6: {
    en: "Missing 6 — care for others needs structure. Schedule one act of service at home every week.",
    hi: "ank 6 khaali — ghar-parivaar ki seva mein nibeddta chahiye. Hafte mein ek pakki seva nirdhshit karo.",
  },
  7: {
    en: "Missing 7 — thinking gets rushed. Keep one quiet half-hour daily before deciding anything big.",
    hi: "ank 7 khaali — sochne ka samay chhoot jaata hai. Koi bada faisla se pehle roz aadha ghanta shant baitho.",
  },
  8: {
    en: "Missing 8 — the money mindset runs loose. Track income and spend in one place and review every Sunday.",
    hi: "ank 8 khaali — paisa-dimaag dheela hai. Kamai-kharcha ek jagah likho aur har itvaar baithak karo.",
  },
  9: {
    en: "Missing 9 — the bigger picture narrows. Give one hour a month to a cause outside yourself.",
    hi: "ank 9 khaali — vishaal drishti kamzor hoti hai. Mahine mein ek ghanta apne se bahar ke kisii kaam ko do.",
  },
};

const STRENGTHS_META: { golden: { en: string; hi: string }; spiritual: { en: string; hi: string } } = {
  golden: {
    en: "Golden diagonal (2-4-6-8) complete — the money arrow stands drawn.",
    hi: "Golden baan (2-4-6-8) poora — dhan-baan khada hai.",
  },
  spiritual: {
    en: "1-5-9 diagonal complete — the determination arrow stands drawn.",
    hi: "1-5-9 baan poora — sankalp baan khada hai.",
  },
};

/**
 * Build the Lo Shu reading from a date of birth.
 * v3.1: grid digits = DOB digits + the BHAGYANK digit ('Bhagyank bhi grid mein
 * bharta hai'). Bhagyank = month + day + year, each reduced, sum reduced
 * (masters folded by their school rule inside `bhagyankFold`). Example:
 * 15-06-1990 → digits 1,5,6,1,9,9,0 + Bhagyank 4 → cell 4 gets +1.
 * Missing-number logic runs AFTER the Bhagyank digit is added: a digit
 * missing from the DOB but present as Bhagyank is NOT missing.
 * v3.4: `lang` (default 'en') switches every interpretive string — en =
 * spoken-simple direct voice, hi = spoken Hinglish. Devanagari is not used
 * here (mantras/Om/title only, app-wide rule).
 */
export function loShuGrid(year: number, month: number, day: number, lang: LoShuLang = "en"): LoShuResult {
  const dateStr = `${String(day).padStart(2, "0")}-${String(month).padStart(
    2,
    "0",
  )}-${String(year)}`;

  const digits = dateStr.replace(/-/g, "").split("").map(Number);

  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  const dobCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  let zeros = 0;
  for (const d of digits) {
    if (d === 0) {
      zeros++;
      continue;
    }
    counts[d]++;
    dobCounts[d]++;
  }

  // v3.1: the Bhagyank digit fills its grid cell too.
  const bhagyank = bhagyankFold(year, month, day);
  counts[bhagyank]++;

  const grid: LoShuCell[][] = GRID_ROWS.map((row) =>
    row.map((digit) => ({ digit, count: counts[digit] })),
  );

  const planes: LoShuPlane[] = GRID_ROWS.map((row, i) => {
    const key = (["thought", "emotion", "action"] as const)[i];
    const complete = row.every((d) => counts[d] > 0);
    const meta = PLANE_META[key];
    return {
      key,
      name: meta.name[lang],
      digits: row as [number, number, number],
      complete,
      note: complete
        ? meta.fullNote[lang]
        : row.some((d) => counts[d] > 0)
          ? meta.partialNote[lang]
          : meta.emptyNote[lang],
    };
  });

  const hasGolden = [2, 4, 6, 8].every((d) => counts[d] > 0);
  const hasSpiritual = [1, 5, 9].every((d) => counts[d] > 0);
  const diagonals: LoShuDiagonal[] = [
    {
      key: "golden",
      name: DIAGONAL_META.golden.name[lang],
      digits: [2, 4, 6, 8],
      complete: hasGolden,
      note: hasGolden ? DIAGONAL_META.golden.fullNote[lang] : DIAGONAL_META.golden.openNote[lang],
    },
    {
      key: "spiritual",
      name: DIAGONAL_META.spiritual.name[lang],
      digits: [1, 5, 9],
      complete: hasSpiritual,
      note: hasSpiritual
        ? DIAGONAL_META.spiritual.fullNote[lang]
        : DIAGONAL_META.spiritual.openNote[lang],
    },
  ];

  const strengths: string[] = [];
  for (const p of planes) {
    if (p.complete) strengths.push(lang === "hi"
      ? `${p.name} poora (baan) — ${p.note}`
      : `${p.name} complete (arrow) — ${p.note}`);
  }
  if (hasGolden) strengths.push(STRENGTHS_META.golden[lang]);
  if (hasSpiritual) strengths.push(STRENGTHS_META.spiritual[lang]);

  const missing = ([1, 2, 3, 4, 5, 6, 7, 8, 9] as const).filter((d) => counts[d] === 0);
  const missingNotes = missing.map((d) => {
    const m = MISSING_META[d];
    return (lang === "hi" ? m.hi + "." : `Missing ${d}: ${m.en}.`)
      .replace(/\.\.$/, ".");
  });

  const dSM = digitSumOf(month);
  const dSD = digitSumOf(day);
  const dSY = digitSumOf(year);
  const steps: string[] =
    lang === "hi"
      ? [
          `Janm-tithi ${dateStr} ke ank: ${dateStr.replace(/-/g, "").split("").join(", ")}`,
          `Har ank 1-9 apni pakki Lo Shu kothri mein gina jaata hai; 0 grid mein nahi baithta${zeros > 0 ? ` (${zeros} zero alag se gina)` : ""}.`,
          `Bhagyank = ${dSM} + ${dSD} + ${dSY} = ${dSM + dSD + dSY} → ${bhagyank} — Bhagyank ${bhagyank} bhi apna grid-khaana bharta hai.`,
          `Ginti (janm-tithi ke ank + Bhagyank ank): ${([1, 2, 3, 4, 5, 6, 7, 8, 9] as const)
            .filter((d) => counts[d] > 0)
            .map((d) => `${d}×${counts[d]}`)
            .join(", ")}.`,
          `Tal: man (4-9-2), bhav (3-5-7), karm (8-1-6); baan: Golden 2-4-6-8, vishwas 1-5-9.`,
        ]
      : [
          `Digits of the birth date ${dateStr}: ${dateStr.replace(/-/g, "").split("").join(", ")}`,
          `Each digit 1-9 is counted in its fixed Lo Shu cell; 0 does not sit in the grid${zeros > 0 ? ` (${zeros} zero${zeros > 1 ? "s" : ""} noted separately)` : ""}.`,
          `Bhagyank = ${dSM} + ${dSD} + ${dSY} = ${dSM + dSD + dSY} → ${bhagyank} — the Bhagyank digit also fills its grid cell (Bhagyank bhi grid mein bharta hai).`,
          `Counts (DOB digits + Bhagyank digit): ${([1, 2, 3, 4, 5, 6, 7, 8, 9] as const)
            .filter((d) => counts[d] > 0)
            .map((d) => `${d}×${counts[d]}`)
            .join(", ")}.`,
          `Planes: Thought (4-9-2), Emotion (3-5-7), Action (8-1-6); diagonals: Golden 2-4-6-8, Confidence 1-5-9.`,
        ];

  return {
    grid,
    counts,
    dobCounts,
    bhagyank,
    zeros,
    planes,
    diagonals,
    strengths,
    missing,
    missingNotes,
    steps,
    lang,
  };
}

/** Direct-voice Lo Shu subject per digit (EN) — used by UI cards and tests. */
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

/** v3.4 Hinglish twin of LO_SHU_DIGIT_THEME (spoken register, romanized). */
export const LO_SHU_DIGIT_THEME_HI: Record<number, string> = {
  1: "khud pe raj — nayi shuruaat",
  2: "dhairya, saajhedari aur mulayampan",
  3: "rachnaatmak abhivyakti aur khul kar bolna",
  4: "vyavastha, routine aur pakki neev",
  5: "azaadi, adjust karne ki shakti, santulit badlaav",
  6: "seva, zimmewari aur ghar ki rang-manzil",
  7: "shaant vichaar aur bheetari chintan",
  8: "paisa-dimaag aur lambi kamai",
  9: "dukh-sukh ki samajh aur vishaal drishti",
};