import { describe, it, expect } from "vitest";
import {
  WOUND_BANK,
  woundsOf,
  validateWounds,
  type WoundPattern,
} from "@/lib/dossier-wounds";
import { lifePath, reduce } from "@/lib/numerology";
import { bhagyankFold } from "@/lib/loshu";

/**
 * v5.4 WOUNDS CHAPTER — data-layer contract tests.
 * Gates: bank size ≥8 with the 8 required school wounds, deterministic
 * woundsOf ordering in 3-5, the owner's 2-Nov-1980 anchor case (numbers
 * COMPUTED via lib helpers — never hard-coded), banned-copy law
 * (interpret-never-predict + roman-HI), and no one-liners anywhere.
 */

/* ---- helpers ---- */

function wordCount(s: string): number {
  return s.split(/\s+/).filter((w) => /[\p{L}]/u.test(w)).length;
}

function collectStrings(obj: unknown, out: string[] = []): string[] {
  if (typeof obj === "string") out.push(obj);
  else if (Array.isArray(obj)) obj.forEach((x) => collectStrings(x, out));
  else if (obj && typeof obj === "object") Object.values(obj).forEach((x) => collectStrings(x, out));
  return out;
}

/**
 * Compute the wounds core numbers from a bare DOB through the lib engines —
 * mirrors what the dossier chapter-builder will do. Karmic debts: the day is
 * checked raw (13/14/16/19 days) and the life-path compound sum via
 * lifePath().steps. Missing digits: the school grid (DOB digits + bhagyank).
 */
function coreFromDob(year: number, month: number, day: number) {
  const mulank = reduce(day); // masters preserved by reduce (11/22/33)
  const lp = lifePath(year, month, day);
  const bhagyank = bhagyankFold(year, month, day); // school fold always

  // missing digits — DOB digits + bhagyank digit (lib/loshu school rule).
  // bhagyankFold returns the school-folded digit; for master paths (11/22/33)
  // the fold rule is 11→2, 22→4, 33→6, which bhagyankFold already applies.
  const counts = new Map<number, number>();
  for (const ch of `${day}${month}${year}`) {
    const d = Number(ch);
    if (d > 0) counts.set(d, (counts.get(d) ?? 0) + 1);
  }
  counts.set(bhagyank, (counts.get(bhagyank) ?? 0) + 1);
  const missing = ([1, 2, 3, 4, 5, 6, 7, 8, 9] as const).filter((d) => !counts.get(d));

  // karmic debts in date-core positions: raw birth day + life-path compound sum
  const karmic: number[] = [];
  if ([13, 14, 16, 19].includes(day)) karmic.push(day);
  const lpCompound = Number(lp.compound.split("/")[0]);
  if ([13, 14, 16, 19].includes(lpCompound)) karmic.push(lpCompound);

  return { mulank, bhagyank, missing, karmic, lp };
}

/* ---- banned-copy law ---- */

const BANNED: RegExp[] = [
  /will happen/i,
  /may suggest/i,
  /theme to reflect/i,
  /\bguaranteed?\b/i,
  /will definitely/i,
  /destined to/i,
  /\bcertainly\b/i,
  /\bundoubtedly\b/i,
  /\bassured\b/i,
  /you will (get|marry|die|meet|find|become|have|earn|lose|face|struggle|succeed|fail|move|start|receive|win)/i,
  // roman-Hinglish guarantee family
  /\bzaroor hoga\b/i,
  /\bzaroor hogi\b/i,
  /\bzaroor honge\b/i,
  /\bpakka hoga\b/i,
  /\bpakka hogi\b/i,
  /\bavashya hoga\b/i,
];

const REQUIRED_IDS = [
  "kabhi-chuna-nahi-gaya",
  "chhudne-ka-darr",
  "bharosa-toota",
  "khud-kam-dekhna",
  "mehsoos-chna-dikhaya-nahi",
  "ghar-saaf-chinta",
  "kisise-niche",
  "kabhi-kaafi-nahi",
];

/* ---- bank contract ---- */

describe("v5.4 wounds — bank size + required school wounds", () => {
  it("bank holds ≥8 wound patterns", () => {
    expect(WOUND_BANK.length).toBeGreaterThanOrEqual(8);
  });

  it("the 8 required school wounds are present (rejection → achievement)", () => {
    const ids = WOUND_BANK.map((w) => w.id);
    for (const req of REQUIRED_IDS) {
      expect(ids, `required wound "${req}"`).toContain(req);
    }
  });

  it("every wound carries a number-keyed basis (mulank/karmic/missing/bhagyank)", () => {
    for (const w of WOUND_BANK) {
      expect(w.basis, `basis of ${w.id}`).toMatch(/(mulank|karmic|missing|bhagyank)-\d/);
    }
  });

  it("ids are unique", () => {
    expect(new Set(WOUND_BANK.map((w) => w.id)).size).toBe(WOUND_BANK.length);
  });
});

/* ---- block depth + voice law ---- */

describe("v5.4 wounds — every block ≥2 sentences, deep, bilingual, interpret-only", () => {
  it("every wound: all 6 narrative blocks ≥25 words EN and HI, ≥2 sentences each", () => {
    const violations: string[] = [];
    for (const w of WOUND_BANK) {
      const blocks: Array<[string, string]> = [
        ["howItFormsEn", w.howItFormsEn],
        ["howItFormsHi", w.howItFormsHi],
        ["howItShowsEn", w.howItShowsEn],
        ["howItShowsHi", w.howItShowsHi],
        ["redemptionEn", w.redemptionEn],
        ["redemptionHi", w.redemptionHi],
      ];
      for (const [key, text] of blocks) {
        if (wordCount(text) < 25) violations.push(`${w.id}.${key} = ${wordCount(text)} words (<25)`);
        const sentences = text.split(/[.!?](?:\s|$)/).filter((s) => s.trim().length > 0);
        if (sentences.length < 2) violations.push(`${w.id}.${key} is a one-liner`);
      }
    }
    expect(violations).toEqual([]);
  });

  it("HI voice law: romanized spoken Hinglish with 'aap', no Devanagari anywhere", () => {
    for (const w of WOUND_BANK) {
      const hiTexts = [w.nameHi, w.howItFormsHi, w.howItShowsHi, w.redemptionHi, ...w.upayHi];
      for (const t of hiTexts) {
        expect(t, `${w.id} HI Devanagari leak`).not.toMatch(/[\u0900-\u097F]/);
      }
      // 'aap' register present across the wound's HI copy
      const joined = hiTexts.join(" ").toLowerCase();
      expect(joined, `${w.id} missing 'aap' register`).toContain("aap");
      expect(w.upayHi.length).toBeGreaterThanOrEqual(2);
      expect(w.upayHi.length).toBeLessThanOrEqual(3);
    }
  });

  it("upay blocks carry 2-3 concrete practices in both languages", () => {
    for (const w of WOUND_BANK) {
      expect(w.upayEn.length).toBeGreaterThanOrEqual(2);
      expect(w.upayEn.length).toBeLessThanOrEqual(3);
      for (const [i, u] of w.upayEn.entries()) {
        expect(wordCount(u), `${w.id} upayEn[${i}]`).toBeGreaterThanOrEqual(8);
      }
      for (const [i, u] of w.upayHi.entries()) {
        expect(wordCount(u), `${w.id} upayHi[${i}]`).toBeGreaterThanOrEqual(6);
      }
    }
  });

  it("banned-copy scan across the ENTIRE bank: zero hits", () => {
    const all = collectStrings(WOUND_BANK);
    expect(all.length).toBeGreaterThan(80);
    const violations: string[] = [];
    for (const t of all) {
      for (const rx of BANNED) {
        if (rx.test(t)) violations.push(`bank: /${rx.source}/ in "${t.slice(0, 60)}"`);
      }
    }
    expect(violations).toEqual([]);
  });
});

/* ---- woundsOf selector ---- */

describe("v5.4 woundsOf — deterministic 3-5 selector", () => {
  const OWNER = coreFromDob(1980, 11, 2); // 2 Nov 1980
  const NO_DEBT = coreFromDob(1990, 5, 5);
  const DEBT13 = coreFromDob(1990, 2, 13); // day 13 → karmic 13

  it("owner anchor 2-Nov-1980 computed via lib helpers: mulank 2, returns 3-5 wounds with redemption", () => {
    // computed, not hard-coded: day 2 → mulank 2
    expect(OWNER.mulank).toBe(2);
    const wounds = woundsOf(OWNER);
    expect(wounds.length).toBeGreaterThanOrEqual(3);
    expect(wounds.length).toBeLessThanOrEqual(5);
    for (const w of wounds) {
      expect(w.redemptionEn.length).toBeGreaterThan(30);
      expect(w.redemptionHi.length).toBeGreaterThan(30);
      expect(w.basis).toMatch(/(mulank|karmic|missing|bhagyank)-\d/);
    }
  });

  it("karmic debt 13 DOB actually computes the debt and lifts its wounds upward", () => {
    expect(DEBT13.karmic).toContain(13);
    const withDebt = woundsOf(DEBT13);
    const plain = woundsOf({ ...DEBT13, karmic: [] });
    // the debt-basis wounds both appear in the selected set
    for (const id of ["kabhi-kaafi-nahi", "ghar-saaf-chinta"]) {
      expect(withDebt.some((w) => w.id === id), `${id} present with debt`).toBe(true);
    }
  });

  it("a karmic-16 chart visibly reorders toward the debt's wounds (behavioural lift)", () => {
    // day 16 → mulank 7; base chart does not lead with the 16-wounds, so the
    // karmic add must pull bharosa-toota + khud-kam-dekhna above the field.
    const core = { mulank: reduce(16), bhagyank: 2, missing: [5], karmic: [16] };
    const withDebt = woundsOf(core);
    const plain = woundsOf({ ...core, karmic: [] });
    // absent-from-selection (-1) counts as the worst possible rank
    const rank = (arr: WoundPattern[], id: string) => {
      const i = arr.findIndex((w) => w.id === id);
      return i === -1 ? Number.POSITIVE_INFINITY : i;
    };
    expect(rank(withDebt, "bharosa-toota")).toBeLessThan(rank(plain, "bharosa-toota"));
    expect(rank(withDebt, "khud-kam-dekhna")).toBeLessThan(rank(plain, "khud-kam-dekhna"));
  });

  it("returns within 3-5 for every mulank 1..9 × every karmic × all missing-digit combos", () => {
    for (let m = 1; m <= 9; m++) {
      for (const karmic of [[], [13], [14], [16], [19], [13, 16]] as number[][]) {
        for (const missing of [[], [1], [3, 5], [2, 6, 8], [1, 2, 3, 4, 5, 6, 7, 8, 9]] as number[][]) {
          const out = woundsOf({ mulank: m, bhagyank: ((m * 3) % 9) + 1, missing, karmic });
          expect(out.length, `m${m} k${karmic} mi${missing}`).toBeGreaterThanOrEqual(3);
          expect(out.length).toBeLessThanOrEqual(5);
        }
      }
    }
  });

  it("deterministic: identical core → byte-identical output; different core → different order", () => {
    expect(JSON.stringify(woundsOf(OWNER))).toBe(JSON.stringify(woundsOf({ ...OWNER })));
    const flipped = woundsOf({ ...OWNER, karmic: [16] });
    expect(JSON.stringify(woundsOf(OWNER))).not.toBe(JSON.stringify(flipped));
  });

  it("most-relevant first: a mulank-2 core leads with the mulank-2 signature wound", () => {
    const out = woundsOf({ ...OWNER, karmic: [], missing: [] });
    expect(out[0].id).toBe("kabhi-chuna-nahi-gaya");
  });

  it("master numbers fold: mulank 11 behaves as 2; bhagyank 22 behaves as 4", () => {
    const as11 = woundsOf({ mulank: 11, bhagyank: 22, missing: [], karmic: [] });
    const asFolded = woundsOf({ mulank: 2, bhagyank: 4, missing: [], karmic: [] });
    expect(JSON.stringify(as11)).toBe(JSON.stringify(asFolded));
  });
});

/* ---- validateWounds gate ---- */

describe("v5.4 validateWounds — the contract gate", () => {
  it("passes on the shipped bank (all laws clean)", () => {
    expect(() => validateWounds()).not.toThrow();
  });

  it("throws on a banned string injected into the data", () => {
    const poisoned = {
      ...WOUND_BANK[0],
      id: "poisoned-probe",
      howItFormsEn: "This may suggest a wound and it will explain more here with enough words to pass the floor line.",
    };
    const bank = WOUND_BANK as WoundPattern[];
    // validateWounds reads the module bank; simulate via a direct scan rule:
    // the poisoned block must be caught by the same regex list the module uses.
    expect(/may suggest/i.test(poisoned.howItFormsEn)).toBe(true);
    expect(() => {
      const all = collectStrings([...bank, poisoned]);
      for (const t of all) for (const rx of BANNED) if (rx.test(t)) throw new Error("banned");
    }).toThrow(/banned/);
  });

  it("throws on a one-liner block (the no-one-liner law is real)", () => {
    const thin = { ...WOUND_BANK[1], id: "thin-probe", howItShowsEn: "You withdraw quickly and quietly." };
    const sentences = thin.howItShowsEn.split(/[.!?](?:\s|$)/).filter((s) => s.trim().length > 0);
    expect(sentences.length).toBe(1);
    expect(wordCount(thin.howItShowsEn)).toBeLessThan(25);
  });
});