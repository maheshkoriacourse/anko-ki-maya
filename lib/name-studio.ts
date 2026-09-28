/**
 * Anko Ki Maya v2 — Name optimization engine (Chaldean vibration scoring).
 *
 * Traditional Chaldean practice reads a name's compound number (before final
 * reduction) for its symbolic omen, and scores how the name's numbers sit
 * against the person's core numbers. All verdicts here are reflective —
 * "traditionally considered harmonious" — never guarantees. Works for
 * personal names AND brand/company names (skip the DOB-based terms by
 * passing core numbers as null — see `scoreName`).
 */

import { reduce, reduceFully, letterValue, SYSTEM_LETTER_VALUES, type NumerologySystem } from "./numerology";

/* ------------------------------------------------------------------ */
/* Chaldean compound omens (Cheiro's classical 10-52 set, rewritten)   */
/* ------------------------------------------------------------------ */

export interface CompoundOmen {
  compound: number;
  title: string;
  tone: "fortunate" | "cautionary" | "mixed" | "neutral";
  meaning: string; // rewritten safe-language meaning
}

export const COMPOUND_OMENS: Record<number, CompoundOmen> = {
  10: { compound: 10, title: "The Wheel of Fortune", tone: "mixed", meaning: "A wheel that rises and falls — honour received and lost with the same ease. Traditionally read as a name of changing fortunes; a theme of graceful ups and downs." },
  11: { compound: 11, title: "The Clenched Hand / Lion Muzzled", tone: "cautionary", meaning: "Hidden trials and trials of friendship — a warning of treachery from others. Traditionally read as demanding caution in partnerships." },
  12: { compound: 12, title: "The Sacrifice", tone: "cautionary", meaning: "The victim or the sacrificed one — traditionally read as others benefiting from your efforts; a theme of choosing wisely whom you serve." },
  13: { compound: 13, title: "Change of Plans", tone: "mixed", meaning: "Not unfortunate in itself: a power that, wrongly used, wreaks destruction — tradition reads it as upheaval of plans and a call to use power carefully." },
  14: { compound: 14, title: "Movement and Risk", tone: "mixed", meaning: "Movement, danger from natural elements, and fortunate for money and dealings — but with risk. Traditionally read as favourable change requiring judgment." },
  15: { compound: 15, title: "Occult Magnetism", tone: "fortunate", meaning: "Magic and magnetism — traditionally fortunate for obtaining money, gifts and favours, with a caution about losing one's own judgment through influence." },
  16: { compound: 16, title: "The Shattered Citadel", tone: "cautionary", meaning: "A tower struck by lightning — tradition reads it as sudden fall from high places; a theme of humility and rebuilding after collapse." },
  17: { compound: 17, title: "Star of the Magi", tone: "fortunate", meaning: "A highly spiritual star — overcoming trials, tradition reads it as a name of lasting fortune and inner peace." },
  18: { compound: 18, title: "The Rayed Moon", tone: "cautionary", meaning: "Materialism quarrelling with spirituality — tradition warns of quarrels and bitter rivalry; a theme of choosing peace over petty wars." },
  19: { compound: 19, title: "The Prince of Heaven", tone: "fortunate", meaning: "The Sun — happiness, success and honour traditionally read here; regarded as one of the most fortunate compounds." },
  20: { compound: 20, title: "The Awakening", tone: "cautionary", meaning: "The Judgment — a call to rise and act with purpose. Traditionally read as delays and obstacles that awaken purpose." },
  21: { compound: 21, title: "Crown of the Magi", tone: "fortunate", meaning: "Success after a long struggle — tradition reads this as crowning achievement following persistent effort." },
  22: { compound: 22, title: "Illusion / Delusion", tone: "cautionary", meaning: "A good person asleep or awakened — tradition reads it as illusion and delusion; a theme of seeing through appearances." },
  23: { compound: 23, title: "Royal Star of the Lion", tone: "fortunate", meaning: "Help from superiors and success traditionally read here; regarded as one of the most fortunate compounds." },
  24: { compound: 24, title: "Assistance from Rank", tone: "fortunate", meaning: "Fortune through help of the powerful and gain through love/opposites; tradition reads it as a supportive compound for growth." },
  25: { compound: 25, title: "Strength Through Experience", tone: "fortunate", meaning: "Strength gained through trials and observation of others; tradition reads success that arrives after learning lessons." },
  26: { compound: 26, title: "Grave Warnings", tone: "cautionary", meaning: "Grave warnings traditionally read here, particularly through partnerships and bad advice; a theme of choosing partners with care." },
  27: { compound: 27, title: "The Sceptre", tone: "fortunate", meaning: "Authority and reward for productive intellect — tradition reads it as a commanding compound of achievement." },
  28: { compound: 28, title: "Contradictions", tone: "cautionary", meaning: "Promise and loss in one — tradition reads trust misplaced and beginning again; a theme of resilient restarts." },
  29: { compound: 29, title: "Uncertainties", tone: "cautionary", meaning: "Uncertainty, treachery from others; yet tradition also reads mental superiority — a theme of sharpening the mind amid noise." },
  30: { compound: 30, title: "Thoughtful Fortune", tone: "mixed", meaning: "Thoughtful deduction and mental superiority over opponents; tradition reads fortune that follows deliberate thinking." },
  31: { compound: 31, title: "The Self-Contained", tone: "mixed", meaning: "Isolated and self-contained — tradition reads a name of quiet independence and its loneliness as the price." },
  32: { compound: 32, title: "Magical Like 14 and 23", tone: "fortunate", meaning: "Traditionally magical power like 14 and 23 — fortune if one holds one's own judgment and opinion." },
  33: { compound: 33, title: "Same as 24", tone: "fortunate", meaning: "The same current as 24 — assistance and gain through kindness; traditionally favourable." },
  34: { compound: 34, title: "Same as 25", tone: "fortunate", meaning: "The same current as 25 — strength through experience; traditionally favourable." },
  35: { compound: 35, title: "Same as 26", tone: "cautionary", meaning: "The same current as 26 — warnings around partnerships; traditionally read with care." },
  36: { compound: 36, title: "Same as 27", tone: "fortunate", meaning: "The same current as 27 — the sceptre; authority through productive intellect." },
  37: { compound: 37, title: "Fortune in Friendship", tone: "fortunate", meaning: "Traditionally fortunate for friendships and partnerships — good fortune in love." },
  38: { compound: 38, title: "Same as 29", tone: "cautionary", meaning: "The same current as 29 — uncertainties; a theme of sharpened discernment." },
  39: { compound: 39, title: "Same as 30", tone: "mixed", meaning: "The same current as 30 — thoughtful fortune." },
  40: { compound: 40, title: "Same as 31", tone: "mixed", meaning: "The same current as 31 — self-contained independence." },
  41: { compound: 41, title: "Same as 32", tone: "fortunate", meaning: "The same current as 32 — magical fortune with held judgment." },
  42: { compound: 42, title: "Same as 24", tone: "fortunate", meaning: "The same current as 24 — assistance and gain." },
  43: { compound: 43, title: "Revolution", tone: "cautionary", meaning: "Tradition reads upheaval and conflict here; a theme of steering change deliberately." },
  44: { compound: 44, title: "Same as 26", tone: "cautionary", meaning: "The same current as 26 — partnership warnings." },
  45: { compound: 45, title: "Same as 27", tone: "fortunate", meaning: "The same current as 27 — the sceptre; authority." },
  46: { compound: 46, title: "Same as 28", tone: "cautionary", meaning: "The same current as 28 — contradictions and restarts." },
  47: { compound: 47, title: "Same as 29", tone: "cautionary", meaning: "The same current as 29 — uncertainties; discernment." },
  48: { compound: 48, title: "Same as 30", tone: "mixed", meaning: "The same current as 30 — thoughtful fortune." },
  49: { compound: 49, title: "Same as 31", tone: "mixed", meaning: "The same current as 31 — self-contained." },
  50: { compound: 50, title: "Same as 32", tone: "fortunate", meaning: "The same current as 32 — magical fortune with held judgment." },
  51: { compound: 51, title: "Prince of Heaven / Warrior", tone: "fortunate", meaning: "Sudden advancement — tradition reads a warrior's fortune, favourably for one who leads justly." },
  52: { compound: 52, title: "Same as 43", tone: "cautionary", meaning: "The same current as 43 — upheaval; a theme of steering change." },
};

/** Compound omen for a letter total (wraps past 52 by taking the unit pair rule). */
export function compoundOmenFor(total: number): CompoundOmen {
  const c = ((total - 1) % 52) + 1;
  return COMPOUND_OMENS[c] ?? COMPOUND_OMENS[19];
}

/* ------------------------------------------------------------------ */
/* Scoring                                                             */
/* ------------------------------------------------------------------ */

export interface NameScore {
  total: number; // raw letter total
  compound: number; // the omen compound (1-52 wrapped)
  omen: CompoundOmen;
  digit: number; // fully reduced digit
  score: number; // 0-100
  reasons: string[]; // what moved the score up/down
}

export interface NameScoreContext {
  lifePath: number | null; // reduced life path (masters folded)
  birthNumber: number | null; // reduced birth day (masters folded)
  system?: NumerologySystem; // default chaldean for name analysis
}

const TONE_SCORE: Record<CompoundOmen["tone"], number> = {
  fortunate: 40,
  mixed: 20,
  neutral: 20,
  cautionary: 5,
};

const CORE_HARMONY_SCORE: Record<string, number> = {
  strong: 30,
  soft: 15,
  clash: 0,
};

/** Classical Chaldean harmony between a name digit and a core digit. */
function harmony(nameDigit: number, coreDigit: number): "strong" | "soft" | "clash" {
  if (nameDigit === coreDigit) return "strong";
  const family = (n: number): number => (n === 2 || n === 4 || n === 7 || n === 1 ? 1 : n === 3 || n === 6 || n === 9 ? 2 : 3);
  if (family(nameDigit) === family(coreDigit)) return "strong";
  if (nameDigit === 5 || coreDigit === 5) return "strong";
  const opposing: [number, number][] = [[1, 8], [2, 9], [3, 4], [4, 9], [6, 7], [8, 9]];
  for (const [a, b] of opposing) {
    if ((nameDigit === a && coreDigit === b) || (nameDigit === b && coreDigit === a)) return "clash";
  }
  return "soft";
}

/**
 * Score a candidate name.
 * `context` may be null → brand/company names (no personal core to clash with).
 */
export function scoreName(name: string, context: NameScoreContext | null): NameScore {
  const sys = context?.system ?? "chaldean";
  const upper = name.toUpperCase();
  const parts: string[] = [];
  let total = 0;
  for (const ch of upper) {
    if (!/[A-Z]/.test(ch)) continue;
    const v = letterValue(ch, sys);
    parts.push(`${ch}=${v}`);
    total += v;
  }
  const compound = total === 0 ? 0 : ((total - 1) % 52) + 1;
  const omen = compoundOmenFor(total);
  const digit = reduceFully(total);
  const reasons: string[] = [
    `Chaldean letter values: ${parts.join(" ")}`,
    `Total ${total} → compound ${compound} ("${omen.title}") → digit ${digit}`,
  ];

  let score = TONE_SCORE[omen.tone];
  reasons.push(`Compound "${omen.title}" (${omen.tone}): +${TONE_SCORE[omen.tone]}`);

  if (context && (context.lifePath != null || context.birthNumber != null)) {
    let harmonyTotal = 0;
    let harmonyCount = 0;
    for (const core of [context.lifePath, context.birthNumber]) {
      if (core == null) continue;
      const h = harmony(digit, core);
      harmonyTotal += CORE_HARMONY_SCORE[h];
      harmonyCount++;
      reasons.push(`Digit ${digit} vs core ${core}: ${h} (+${CORE_HARMONY_SCORE[h]})`);
    }
    if (harmonyCount > 0) {
      score += Math.round(harmonyTotal / harmonyCount);
    }
    // Bonus for resonating with the Life Path compound's digit
    if (context.lifePath != null && digit === context.lifePath) {
      score += 10;
      reasons.push(`Exact match with Life Path digit: +10`);
    }
  } else {
    // Brand name: no personal core; judge only on the omen + reduced digit's classical feel.
    if ([1, 3, 5, 6, 8, 9].includes(digit)) {
      score += 20;
      reasons.push(`Reduced digit ${digit} is traditionally an expressive/commercial vibration: +20`);
    } else {
      score += 10;
      reasons.push(`Reduced digit ${digit}: +10`);
    }
  }

  score = Math.max(0, Math.min(100, score));
  return { total, compound, omen, digit, score, reasons };
}

/* ------------------------------------------------------------------ */
/* Spelling suggestions                                                */
/* ------------------------------------------------------------------ */

export interface SpellingSuggestion {
  spelling: string;
  score: number;
  total: number;
  compound: number;
  omenTitle: string;
}

function variantSpellings(name: string): string[] {
  const out = new Set<string>();
  const trimmed = name.trim();
  if (!trimmed) return [];
  const upper = trimmed.toUpperCase();
  const first = trimmed[0];
  const rest = trimmed.slice(1);

  // 1. Double a consonant if plausible (classic Chaldean tweak).
  if (rest.length >= 2 && /[a-z]/i.test(rest[1]) && !"aeiouy".includes(rest[1].toLowerCase())) {
    out.add(first + rest[0] + rest[1] + rest.slice(1));
  }
  // 2. Drop a trailing vowel (e.g. "Mehta" → "Meht").
  if (rest.length >= 2 && "aeiou".includes(rest[rest.length - 1].toLowerCase())) {
    out.add(first + rest.slice(0, -1));
  }
  // 3. Add a trailing 'a'.
  if (!"aeiou".includes(trimmed[trimmed.length - 1].toLowerCase())) {
    out.add(trimmed + "a");
  }
  // 4. Swap a doubled letter for a single one.
  if (rest.length >= 2 && rest[0].toLowerCase() === rest[1].toLowerCase()) {
    out.add(first + rest.slice(1));
  }
  // 5. Swap a vowel inside the word (first vowel → e/a/i variants).
  const m = rest.match(/[aeiou]/i);
  if (m && m.index !== undefined) {
    for (const v of ["a", "e", "i", "o", "u"]) {
      if (v !== m[0].toLowerCase()) {
        out.add(first + rest.slice(0, m.index) + v + rest.slice(m.index + 1));
      }
    }
  }
  // 6. Y for I swap.
  if (upper.includes("I")) {
    out.add(trimmed.replace(/i/g, "y").replace(/I/g, "Y"));
  }
  out.delete(trimmed);
  return [...out].filter((s) => s.length >= 2).slice(0, 8);
}

export interface NameOptimizationResult {
  current: NameScore;
  suggestions: SpellingSuggestion[];
  steps: string[];
}

/**
 * Suggest up to 3 improved spellings ranked by score.
 * `context` null → brand/company names.
 */
export function optimizeName(
  name: string,
  context: NameScoreContext | null,
): NameOptimizationResult {
  const current = scoreName(name, context);
  const variants = variantSpellings(name);
  const scored = variants
    .map((s) => {
      const sc = scoreName(s, context);
      return {
        spelling: s,
        score: sc.score,
        total: sc.total,
        compound: sc.compound,
        omenTitle: sc.omen.title,
      };
    })
    .filter((s) => s.spelling.toLowerCase() !== name.toLowerCase())
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  return {
    current,
    suggestions: scored,
    steps: [
      `Scoring system: compound omen weight + harmony with your core numbers (Life Path / birth number).`,
      `Suggestions test small spelling shifts — classic Chaldean practice — then re-score.`,
      `A higher score reflects traditional harmony, not a guaranteed outcome.`,
    ],
  };
}

/* ------------------------------------------------------------------ */
/* Full personal name reading (with personal context)                  */
/* ------------------------------------------------------------------ */

export interface PersonalNameReading {
  current: NameScore;
  suggestions: SpellingSuggestion[];
  steps: string[];
}

export function personalNameReading(
  name: string,
  lifePath: number,
  birthDay: number,
): PersonalNameReading {
  return optimizeName(name, {
    lifePath: reduce(lifePath) > 9 ? reduceFully(lifePath) : reduce(lifePath),
    birthNumber: birthDay > 9 ? reduceFully(birthDay) : birthDay,
    system: "chaldean",
  });
}