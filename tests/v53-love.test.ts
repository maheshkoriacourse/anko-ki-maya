import { describe, it, expect } from "vitest";
import {
  LOVE_BY_MULANK,
  loveBlueprintOf,
  relationMovieActs,
  loveTimeline,
  validateLove,
  type LoveBlueprint,
} from "@/lib/dossier-love";

/**
 * v5.3 LOVE BLUEPRINT — data-layer contract tests (the value-king chapter).
 * Gates: 9 mulanks fully bilingual, depth-bounded (≥22w EN / ≥24w HI),
 * 2 blind spots ≥20w each, 5-act movie, loveTimeline ≥3 windows for any
 * age 20-45, determinism, and the owner's banned-copy law.
 */

/* ---- helpers ---- */

function wordCount(s: string): number {
  return s.trim().split(/\s+/).length;
}

const BLOCK_KEYS = [
  "howYouLoveEn", "howYouLoveHi",
  "whatYouNeedEn", "whatYouNeedHi",
  "idealPartnerEn", "idealPartnerHi",
  "marriageStyleEn", "marriageStyleHi",
  "commitmentPatternEn", "commitmentPatternHi",
  "emotionalNeedsEn", "emotionalNeedsHi",
  "communicationStyleEn", "communicationStyleHi",
  "breakupTriggersEn", "breakupTriggersHi",
  "longTermRiskEn", "longTermRiskHi",
  "soulmateArchetypeEn", "soulmateArchetypeHi",
] as const;

const BANNED = [
  "will happen",
  "may suggest",
  "theme to reflect",
  "zaroor hoga", "zaroor hogi", "pakka hoga", "guaranteed",
  "you will", "you'll",
];

function collect(obj: unknown, out: string[] = []): string[] {
  if (typeof obj === "string") out.push(obj);
  else if (Array.isArray(obj)) obj.forEach((x) => collect(x, out));
  else if (obj && typeof obj === "object") Object.values(obj).forEach((x) => collect(x, out));
  return out;
}

describe("v5.3 love blueprint — 9 mulanke, complete + deep", () => {
  it("LOVE_BY_MULANK holds exactly mulank 1..9", () => {
    expect(Object.keys(LOVE_BY_MULANK).map(Number).sort()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  for (const mulank of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
    it(`mulank ${mulank}: every block bilingual, non-empty, depth-bounded (≥22w EN / ≥24w HI)`, () => {
      const bp = LOVE_BY_MULANK[mulank];
      // every declared key exists and is non-empty
      for (const k of BLOCK_KEYS) {
        expect(typeof bp[k], `mulank ${mulank} ${k}`).toBe("string");
        expect((bp[k] as string).trim().length, `mulank ${mulank} ${k}`).toBeGreaterThan(0);
      }
      // EN depth: every plain block ≥22 words
      for (const k of BLOCK_KEYS.filter((x) => x.endsWith("En") && !x.startsWith("blindSpots"))) {
        expect(wordCount(bp[k] as string), `mulank ${mulank} ${k} EN words`).toBeGreaterThanOrEqual(22);
      }
      // HI depth: every plain block ≥24 words
      for (const k of BLOCK_KEYS.filter((x) => x.endsWith("Hi") && !x.startsWith("blindSpots"))) {
        expect(wordCount(bp[k] as string), `mulank ${mulank} ${k} HI words`).toBeGreaterThanOrEqual(24);
      }
      // upper bound — no runaway essays (spec: depth, not a chapter dump)
      for (const k of BLOCK_KEYS) {
        expect(wordCount(bp[k] as string), `mulank ${mulank} ${k} upper`).toBeLessThanOrEqual(120);
      }
      // exactly 2 blind spots, each ≥20 words, both languages
      expect(bp.blindSpotsEn.length).toBe(2);
      expect(bp.blindSpotsHi.length).toBe(2);
      for (const b of bp.blindSpotsEn) expect(wordCount(b), "EN blind spot").toBeGreaterThanOrEqual(20);
      for (const b of bp.blindSpotsHi) expect(wordCount(b), "HI blind spot").toBeGreaterThanOrEqual(20);
      // HI voice law: roman-Hinglish with 'aap', no Devanagari
      const hiJoined = BLOCK_KEYS.filter((x) => x.endsWith("Hi") && !x.startsWith("blindSpots"))
        .map((k) => bp[k] as string)
        .join(" ");
      expect(hiJoined).toContain("aap");
      expect(hiJoined).not.toMatch(/[\u0900-\u097F]/);
    });
  }
});

describe("v5.3 love blueprint — 5-act relationship movie", () => {
  it("every mulank gets exactly 5 acts: Attraction/Attachment/Conflict/Transformation/Legacy", () => {
    for (let m = 1; m <= 9; m++) {
      const acts = relationMovieActs(m);
      expect(acts.length).toBe(5);
      expect(acts.map((a) => a.act)).toEqual([1, 2, 3, 4, 5]);
      expect(acts[0].nameEn).toContain("Attraction");
      expect(acts[1].nameEn).toContain("Attachment");
      expect(acts[2].nameEn).toContain("Conflict");
      expect(acts[3].nameEn).toContain("Transformation");
      expect(acts[4].nameEn).toContain("Legacy");
      for (const a of acts) {
        expect(a.nameHi.length).toBeGreaterThan(3);
        expect(a.lineEn.length).toBeGreaterThan(30);
        expect(a.lineHi.length).toBeGreaterThan(30);
        expect(a.lineHi).not.toMatch(/[\u0900-\u097F]/);
      }
    }
  });

  it("acts are deterministic per mulank", () => {
    expect(JSON.stringify(relationMovieActs(4))).toBe(JSON.stringify(relationMovieActs(4)));
    expect(JSON.stringify(relationMovieActs(4))).toBe(JSON.stringify(relationMovieActs(13))); // folded
  });
});

describe("v5.3 love blueprint — emotional timeline", () => {
  it("returns ≥3 windows for any age 20-45, across every mulank", () => {
    for (let m = 1; m <= 9; m++) {
      for (let age = 20; age <= 45; age++) {
        const wins = loveTimeline(m, age);
        expect(wins.length, `mulank ${m} age ${age}`).toBeGreaterThanOrEqual(3);
        expect(wins.length).toBeLessThanOrEqual(4);
        for (const w of wins) {
          expect(w.gistEn.length).toBeGreaterThan(30);
          expect(w.gistHi.length).toBeGreaterThan(30);
          expect(w.basis).toContain(`mulank-${m}`);
          expect(w.basis).toContain("interpret-only");
          expect(w.themeHi.length).toBeGreaterThan(3);
        }
        // exactly one window holds the queried age and is flagged current
        const current = wins.filter((w) => age >= w.fromAge && age <= w.toAge);
        expect(current.length).toBe(1);
        expect(wins.find((w) => w.isCurrent)).toBeTruthy();
      }
    }
  });

  it("windows carry age ranges in the interpret-only style (Love Lesson, Partnership Window present)", () => {
    const wins = loveTimeline(2, 45);
    const names = wins.map((w) => w.themeEn).join("|");
    expect(names).toContain("Mirror");
    // first window of life is the 18-22 love lesson
    expect(loveTimeline(2, 18)[0].themeEn).toContain("Love Lesson");
    expect(loveTimeline(1, 30).some((w) => w.themeEn.includes("Partnership"))).toBe(true);
  });

  it("deterministic: same mulank + age → byte-identical windows; age shifts move the anchor", () => {
    expect(JSON.stringify(loveTimeline(7, 34))).toBe(JSON.stringify(loveTimeline(7, 34)));
    expect(JSON.stringify(loveTimeline(7, 34))).not.toBe(JSON.stringify(loveTimeline(3, 34)));
  });

  it("open-ended last window stays bounded (no NaN, sorted ranges)", () => {
    for (let m = 1; m <= 9; m++) {
      const wins = loveTimeline(m, 70);
      for (let i = 0; i < wins.length; i++) {
        expect(wins[i].fromAge).toBeLessThanOrEqual(wins[i].toAge);
        expect(wins[i].toAge).toBeLessThanOrEqual(99);
      }
    }
  });
});

describe("v5.3 love blueprint — banned-copy + engine gate", () => {
  it("validateLove() passes (all 9 complete, no banned copy anywhere in the module)", () => {
    expect(() => validateLove()).not.toThrow();
  });

  it("full-module banned scan: nothing predicts, nothing hedges like a horoscope", () => {
    const all = collect(LOVE_BY_MULANK)
      .concat(relationMovieActs(1).flatMap((a) => [a.nameEn, a.nameHi, a.lineEn, a.lineHi]))
      .concat(loveTimeline(5, 30).flatMap((w) => [w.themeEn, w.themeHi, w.gistEn, w.gistHi, w.basis]));
    expect(all.length).toBeGreaterThan(200);
    for (const t of all) {
      const lo = t.toLowerCase();
      for (const b of BANNED) {
        expect(lo.includes(b), `banned "${b}" in "${t.slice(0, 80)}"`).toBe(false);
      }
    }
  });

  it("blueprint resolver: folds 10-99, ignores bhagyank for determinism of the bank", () => {
    for (const raw of [10, 19, 28, 37, 46, 55, 64, 73, 82, 91]) {
      const folded = ((raw % 9) + 9) % 9 || 9;
      expect(loveBlueprintOf(raw)).toBe(LOVE_BY_MULANK[folded]);
    }
    expect(loveBlueprintOf(55)).toBe(LOVE_BY_MULANK[1]);
  });

  it("whole-engine determinism: same inputs → byte-identical outputs", () => {
    const a = {
      bp: loveBlueprintOf(6),
      acts: relationMovieActs(6),
      tl: loveTimeline(6, 29),
    };
    const b = {
      bp: loveBlueprintOf(6),
      acts: relationMovieActs(6),
      tl: loveTimeline(6, 29),
    };
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });
});