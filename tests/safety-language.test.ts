import { describe, it, expect } from "vitest";
import { DISCLAIMER, meaningFor, PERSONAL_YEAR_THEMES, PERSONAL_MONTH_THEMES, PERSONAL_MONTH_WATCHOUTS, LIFE_AREA_PROMPT } from "@/lib/meanings";
import { demoProfile } from "@/lib/storage";

/**
 * SAFE-LANGUAGE GUARDRAIL TESTS
 * The product owner's hard rule: this is a self-reflection app. Copy may use
 * themes/opportunities/reflection windows — never guarantees about specific
 * life events. These tests scan ALL user-facing strings in the meanings module
 * for forbidden deterministic patterns.
 */

const BANNED_PATTERNS: RegExp[] = [
  /you will (get|marry|die|meet|find|become|have|earn|lose|face|struggle|succeed|fail|move|start|receive)/i,
  /will get (a )?(job|married)/i,
  /guarantee/i,
  /destined to/i,
  /will definitely/i,
  /predicts? (that )?you/i,
  /will (happen|occur|come true)/i,
  /\b(marriage|death|illness|pregnancy|accident|disaster) (will|is) (predicted|guaranteed|certain)/i,
  /this month you will/i,
  /in november you will/i,
];

const FORBIDDEN_TOPICS_AS_PREDICTIONS: RegExp[] = [
  // The words may appear in "we never predict X" disclaimers; those are fine.
  /you will (marry|die of|become ill|get pregnant|commit)/i,
];

function collectStrings(): string[] {
  const out: string[] = [];
  const scan = (obj: unknown) => {
    if (typeof obj === "string") out.push(obj);
    else if (Array.isArray(obj)) obj.forEach(scan);
    else if (obj && typeof obj === "object") Object.values(obj).forEach(scan);
  };
  Object.values(PERSONAL_YEAR_THEMES).forEach(scan);
  Object.values(PERSONAL_MONTH_THEMES).forEach(scan);
  Object.values(PERSONAL_MONTH_WATCHOUTS).forEach(scan);
  Object.values(LIFE_AREA_PROMPT).forEach(scan);
  for (let n = 1; n <= 33; n++) {
    try {
      scan(meaningFor(n));
    } catch {
      /* skip */
    }
  }
  return out;
}

describe("Safety language rules", () => {
  const strings = collectStrings();

  it("has a meaningful corpus to check", () => {
    expect(strings.length).toBeGreaterThan(30);
  });

  it("contains no deterministic predictions in any meaning/theme copy", () => {
    const violations: string[] = [];
    for (const s of strings) {
      for (const rx of BANNED_PATTERNS) {
        if (rx.test(s)) violations.push(`${rx} → "${s}"`);
      }
    }
    expect(violations).toEqual([]);
  });

  it("never frames life-event topics as predictions", () => {
    const violations = strings.filter((s) => FORBIDDEN_TOPICS_AS_PREDICTIONS.some((rx) => rx.test(s)));
    expect(violations).toEqual([]);
  });

  it("uses approved reflective phrasing in themes", () => {
    const joined = strings.join(" ");
    expect(joined).toMatch(/may be a supportive period|a theme to reflect on|consider/i);
  });

  it("disclaimer matches the exact required v3 wording (owner: consent/disclaimer wall removed, footer line only)", () => {
    expect(DISCLAIMER).toBe("Traditional numerology-based reading.");
  });

  it("master numbers get their own meanings", () => {
    expect(meaningFor(11).title).toContain("11");
    expect(meaningFor(22).title).toContain("22");
    expect(meaningFor(33).title).toContain("33");
  });

  it("demo profile is the specified seeded person", () => {
    const p = demoProfile();
    expect(p.birthName).toBe("Aarav Mehta");
    expect(p.birthDate).toBe("1990-06-15");
    expect(p.system).toBe("pythagorean");
  });
});