import { describe, it, expect } from "vitest";
import { hiddenStoryOf, STORIES, GENERIC } from "@/lib/dossier-chapters";

/**
 * v5.2 HIDDEN STORY copy-bank gate — mulank 1..9 all written.
 * Voice laws: interpret never predict (no 'will happen' / 'may suggest' /
 * 'theme to reflect' family, no deterministic guarantees), deep bilingual
 * narrative beats, real cost + redemption turn, spoken-Hinglish roman HI.
 */

const BANNED: RegExp[] = [
  /will happen/i,
  /may suggest/i,
  /theme to reflect/i,
  /you will (get|marry|die|meet|find|become|have|earn|lose|face|struggle|succeed|fail|move|start|receive|win)/i,
  /will (definitely|certainly|happen)/i,
  /destined to/i,
  /\bguaranteed?\b/i,
  /\bcertainly\b/i,
  /\bundoubtedly\b/i,
  /\bassured\b/i,
  /predicts? (that )?you/i,
  // deterministic-guarantee family (romanized Hinglish)
  /\bzaroor hoga\b/i,
  /\bzaroor hogi\b/i,
  /\bzaroor honge\b/i,
  /\bpakka hoga\b/i,
  /\bpakka hogi\b/i,
  /\bpakki hogi\b/i,
  /\bavashya hoga\b/i,
  /\bnishchit roop se hoga\b/i,
];

const words = (s: string): number => s.split(/\s+/).filter((w) => /[\p{L}]/u.test(w)).length;

describe("v5.2 hidden story — copy bank covers mulank 1..9", () => {
  it("STORIES has exactly the 9 keys 1..9 (no generic fallback left)", () => {
    for (let m = 1; m <= 9; m++) {
      expect(STORIES[m], `missing STORIES[${m}]`).toBeDefined();
    }
    expect(Object.keys(STORIES).length).toBe(9);
  });

  it("every mulank 1..9 returns a NON-GENERIC 6-beat story", () => {
    const genericHi = new Set(GENERIC.map((b) => b.textHi));
    for (let m = 1; m <= 9; m++) {
      const s = hiddenStoryOf(m);
      expect(s.beats.length, `mulank ${m} beat count`).toBe(6);
      expect(s.beats[0].textHi, `mulank ${m} falls back to GENERIC`).not.toBe(GENERIC[0].textHi);
      expect(s.beats.map((b) => b.labelHi), `mulank ${m} beat labels`)
        .toEqual(["hook", "design", "pattern", "cost", "turn", "gift"]);
      for (const b of s.beats) {
        expect(genericHi.has(b.textHi), `mulank ${m} beat ${b.labelHi} reuses GENERIC copy`).toBe(false);
      }
    }
  });
});

describe("v5.2 hidden story — voice laws", () => {
  const stories = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((m) => [m, hiddenStoryOf(m)] as const);

  it("no banned prediction strings anywhere in all 9 stories' copy", () => {
    const violations: string[] = [];
    for (const [m, s] of stories) {
      const all: string[] = [];
      const scan = (x: unknown) => {
        if (typeof x === "string") all.push(x);
        else if (Array.isArray(x)) x.forEach(scan);
        else if (x && typeof x === "object") Object.values(x).forEach(scan);
      };
      scan(s);
      for (const str of all) {
        for (const rx of BANNED) {
          if (rx.test(str)) violations.push(`m${m}: /${rx.source}/ matched "${str.slice(0, 70)}"`);
        }
      }
    }
    expect(violations).toEqual([]);
  });

  it("stories 3..9 keep textHi 25-45 words, textEn 22-40 words, HI roman-only", () => {
    // 1-2 are the pre-law reference copy (left untouched deliberately); the
    // 25-45 / 22-40 floors are enforced on every story this task authored.
    const violations: string[] = [];
    for (const [m, s] of stories) {
      if (m < 3) continue;
      for (const b of s.beats) {
        const nh = words(b.textHi);
        if (nh < 25 || nh > 45) violations.push(`m${m} ${b.labelHi} textHi ${nh} words`);
        const ne = words(b.textEn);
        if (ne < 22 || ne > 40) violations.push(`m${m} ${b.labelHi} textEn ${ne} words`);
        if (/[\u0900-\u097F]/.test(b.textHi)) violations.push(`m${m} ${b.labelHi} textHi has Devanagari`);
        if (/[\u0900-\u097F]/.test(b.textEn)) violations.push(`m${m} ${b.labelHi} textEn has Devanagari`);
      }
    }
    expect(violations).toEqual([]);
  });
});