import { describe, it, expect } from "vitest";
import {
  NUMBER_CONTENT_EN, MASTER_CONTENT_EN,
} from "@/lib/content/numbers-en";
import {
  NUMBER_CONTENT_HI, MASTER_CONTENT_HI,
} from "@/lib/content/numbers-hi";
import {
  numberContent, masterContent, zeroMasters, karmicDebtContent, karmicLessonContent,
  bridgeContent, hiddenPassionContent, rationalThoughtContent, balanceNote,
} from "@/lib/content";
import { KARMIC_DEBT_CONTENT_EN, KARMIC_LESSON_EN } from "@/lib/content/numbers-en";
import { KARMIC_DEBT_CONTENT_HI, KARMIC_LESSON_HI } from "@/lib/content/numbers-hi";
import { BRIDGE_CONTENT_EN } from "@/lib/content/numbers-en";
import { BRIDGE_CONTENT_HI } from "@/lib/content/numbers-hi";

/**
 * DUAL-LANGUAGE CONTENT COMPLETENESS — every interpretive string must exist
 * in BOTH English and Hindi, with the layered essence/shadow/gift/practice
 * structure and 150-300-word essays.
 */

const ALL_NINE = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const ALL_MASTERS = [11, 22, 33];

function essayWords(essay: string): number {
  return essay.trim().split(/\s+/).length;
}

describe("EN content completeness", () => {
  it.each(ALL_NINE)("number %i has full layered structure", (n) => {
    const c = NUMBER_CONTENT_EN[n];
    expect(c.title.length).toBeGreaterThan(3);
    expect(c.essence.length).toBeGreaterThan(80);
    expect(c.shadow.length).toBeGreaterThan(60);
    expect(c.gift.length).toBeGreaterThan(40);
    expect(c.practice.length).toBeGreaterThan(40);
    const words = essayWords(c.essay);
    expect(words).toBeGreaterThanOrEqual(150);
    expect(words).toBeLessThanOrEqual(320);
    expect(c.keywords.length).toBeGreaterThanOrEqual(4);
  });

  it.each(ALL_MASTERS)("master %i has full layered structure", (n) => {
    const c = MASTER_CONTENT_EN[n];
    expect(c.essence.length).toBeGreaterThan(80);
    expect(essayWords(c.essay)).toBeGreaterThanOrEqual(150);
    expect(c.title).toContain(String(n));
  });
});

describe("HI content completeness", () => {
  it.each(ALL_NINE)("number %i has full layered structure (Devanagari)", (n) => {
    const c = NUMBER_CONTENT_HI[n];
    expect(c.title.length).toBeGreaterThan(2);
    // Devanagari check: title contains at least one Devanagari codepoint
    expect(c.title).toMatch(/[\u0900-\u097F]/);
    expect(c.essence).toMatch(/[\u0900-\u097F]/);
    expect(c.shadow).toMatch(/[\u0900-\u097F]/);
    expect(c.gift).toMatch(/[\u0900-\u097F]/);
    expect(c.practice).toMatch(/[\u0900-\u097F]/);
    // Hindi essays measured in characters (Devanagari words are denser):
    expect(c.essay.length).toBeGreaterThanOrEqual(600);
    expect(c.keywords.length).toBeGreaterThanOrEqual(4);
  });

  it.each(ALL_MASTERS)("master %i has full layered structure (Devanagari)", (n) => {
    const c = MASTER_CONTENT_HI[n];
    expect(c.title).toMatch(/[\u0900-\u097F]/);
    expect(c.essay.length).toBeGreaterThanOrEqual(600);
  });
});

describe("router completeness", () => {
  it.each([...ALL_NINE, ...ALL_MASTERS])("numberContent(%i) resolves in both langs", (n) => {
    const en = numberContent(n, "en");
    const hi = numberContent(n, "hi");
    expect(en.essay.length).toBeGreaterThan(100);
    expect(hi.essay.length).toBeGreaterThan(100);
  });

  it("zero-masters framing exists in both", () => {
    expect(zeroMasters("en")).toContain("fully valid");
    expect(zeroMasters("hi")).toMatch(/मान्य/);
  });

  it("karmic debt content for 13/14/16/19 in both langs", () => {
    for (const n of [13, 14, 16, 19]) {
      expect(karmicDebtContent(n, "en")).toBeTruthy();
      expect(karmicDebtContent(n, "hi")!.theme).toMatch(/[\u0900-\u097F]/);
    }
  });

  it("karmic lesson content for 1-9 in both langs", () => {
    for (const n of ALL_NINE) {
      expect(karmicLessonContent(n, "en")).toBeTruthy();
      expect(karmicLessonContent(n, "hi")).toMatch(/[\u0900-\u097F]/);
    }
  });

  it("bridge content for 0-8 in both langs", () => {
    for (let n = 0; n <= 8; n++) {
      expect(bridgeContent(n, "en")).toBeTruthy();
      expect(bridgeContent(n, "hi")).toMatch(/[\u0900-\u097F]/);
    }
  });

  it("hidden passion + rational thought for 1-9 in both langs", () => {
    for (const n of ALL_NINE) {
      expect(hiddenPassionContent(n, "en")).toBeTruthy();
      expect(hiddenPassionContent(n, "hi")).toMatch(/[\u0900-\u097F]/);
      expect(rationalThoughtContent(n, "en")).toBeTruthy();
      expect(rationalThoughtContent(n, "hi")).toMatch(/[\u0900-\u097F]/);
    }
  });

  it("balance note exists in both", () => {
    expect(balanceNote("en").length).toBeGreaterThan(40);
    expect(balanceNote("hi")).toMatch(/[\u0900-\u097F]/);
  });

  it("EN and HI karmic tables are internally complete", () => {
    for (const n of [13, 14, 16, 19]) {
      expect(KARMIC_DEBT_CONTENT_EN[n]).toBeTruthy();
      expect(KARMIC_DEBT_CONTENT_HI[n]).toBeTruthy();
    }
    for (const n of ALL_NINE) {
      expect(KARMIC_LESSON_EN[n]).toBeTruthy();
      expect(KARMIC_LESSON_HI[n]).toBeTruthy();
    }
    for (let n = 0; n <= 8; n++) {
      expect(BRIDGE_CONTENT_EN[n]).toBeTruthy();
      expect(BRIDGE_CONTENT_HI[n]).toBeTruthy();
    }
  });
});

describe("master numbers first-class", () => {
  it("masterContent returns null for non-masters", () => {
    expect(masterContent(7, "en")).toBeNull();
    expect(masterContent(11, "en")).toBeTruthy();
  });

  it("master essays use dual notation 11/2, 22/4, 33/6", () => {
    expect(MASTER_CONTENT_EN[11].essay).toContain("11/2");
    expect(MASTER_CONTENT_EN[22].essay).toContain("22/4");
    expect(MASTER_CONTENT_EN[33].essay).toContain("33/6");
    expect(MASTER_CONTENT_HI[11].essay).toContain("11/2");
    expect(MASTER_CONTENT_HI[22].essay).toContain("22/4");
    expect(MASTER_CONTENT_HI[33].essay).toContain("33/6");
  });
});