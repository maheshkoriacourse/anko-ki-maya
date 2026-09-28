import { describe, it, expect } from "vitest";
import {
  NUMBER_CONTENT_EN, MASTER_CONTENT_EN,
  KARMIC_DEBT_CONTENT_EN, KARMIC_LESSON_EN, BRIDGE_CONTENT_EN,
  HIDDEN_PASSION_EN, RATIONAL_THOUGHT_EN,
} from "@/lib/content/numbers-en";
import {
  NUMBER_CONTENT_HI, MASTER_CONTENT_HI,
  KARMIC_DEBT_CONTENT_HI, KARMIC_LESSON_HI, BRIDGE_CONTENT_HI,
  HIDDEN_PASSION_HI, RATIONAL_THOUGHT_HI,
} from "@/lib/content/numbers-hi";
import { COMPOUND_OMENS } from "@/lib/name-studio";
import { gridYogas } from "@/lib/grid-yogas";
import { monthWeather } from "@/lib/weather";

/**
 * HINDI + EN SAFE-LANGUAGE SCAN — the owner's hard rule:
 * banned: deterministic guarantees incl. 'zaroor hoga'-type claims;
 * allowed: 'may support', theme framing, reflective verdicts.
 * Scans ALL user-facing interpretive strings in BOTH languages.
 */

const BANNED_EN: RegExp[] = [
  /you will (get|marry|die|meet|find|become|have|earn|lose|face|struggle|succeed|fail|move|start|receive|win)/i,
  /will get (a )?(job|married)/i,
  /\bguarantee\b/i,
  /guaranteed/i,
  /destined to/i,
  /will definitely/i,
  /predicts? (that )?you/i,
  /will (happen|occur|come true|certainly)/i,
  /\bcertainly\b/i,
  /\bundoubtedly\b/i,
  /\bassured\b/i,
  /this month you will/i,
  /you are going to (get|marry|die|become|earn)/i,
];

// Hindi deterministic-guarantee markers (ज़रूर-होगा family + certainty claims).
const BANNED_HI: RegExp[] = [
  /ज़रूर होगा/i,
  /ज़रूर होगी/i,
  /ज़रूर होंगे/i,
  /जरूर होगा/,
  /निश्चित रूप से होगा/,
  /पक्का होगा/,
  /पक्की होगी/,
  /अवश्य होगा/,
  /अवश्यम्भावी/,
  /(मृत्यु|मौत) होगी/,
  /(बीमारी|रोग) होगा ही/,
  /गर्भवती होगी/,
  /(चोरी|अपराध) करोगे/,
];

// Never predict these topics deterministically in any language.
const FORBIDDEN_TOPIC_PREDICTIONS: RegExp[] = [
  /you will (marry|die of|become ill|get pregnant|commit)/i,
  /आपकी (मृत्यु|मौत) होगी/,
  /आप गर्भवती होंगी/,
];

function collectStrings(): string[] {
  const out: string[] = [];
  const scan = (obj: unknown) => {
    if (typeof obj === "string") out.push(obj);
    else if (Array.isArray(obj)) obj.forEach(scan);
    else if (obj && typeof obj === "object") Object.values(obj).forEach(scan);
  };
  const sources = [
    NUMBER_CONTENT_EN, MASTER_CONTENT_EN,
    NUMBER_CONTENT_HI, MASTER_CONTENT_HI,
    KARMIC_DEBT_CONTENT_EN, KARMIC_LESSON_EN, BRIDGE_CONTENT_EN,
    HIDDEN_PASSION_EN, RATIONAL_THOUGHT_EN,
    KARMIC_DEBT_CONTENT_HI, KARMIC_LESSON_HI, BRIDGE_CONTENT_HI,
    HIDDEN_PASSION_HI, RATIONAL_THOUGHT_HI,
    COMPOUND_OMENS,
  ];
  for (const src of sources) scan(src);
  // grid yogas with a full grid
  scan(gridYogas({ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1 }));
  // month weather for a sample profile (includes HI verdicts + narratives)
  scan(monthWeather(6, 15, 2026, 1, 6));
  return out;
}

describe("Safe language — English corpus", () => {
  const strings = collectStrings().filter((s) => /[\u0900-\u097F]/.test(s) === false);

  it("has a meaningful corpus", () => {
    expect(strings.length).toBeGreaterThan(80);
  });

  it("contains no deterministic guarantees", () => {
    const violations: string[] = [];
    for (const s of strings) {
      for (const rx of BANNED_EN) {
        if (rx.test(s)) violations.push(`${rx} → "${s.slice(0, 80)}"`);
      }
      for (const rx of FORBIDDEN_TOPIC_PREDICTIONS) {
        if (rx.test(s)) violations.push(`${rx} → "${s.slice(0, 80)}"`);
      }
    }
    expect(violations).toEqual([]);
  });
});

describe("Safe language — Hindi corpus", () => {
  const strings = collectStrings().filter((s) => /[\u0900-\u097F]/.test(s));

  it("has a meaningful Devanagari corpus", () => {
    expect(strings.length).toBeGreaterThan(60);
  });

  it("contains no 'zaroor hoga'-type guarantees", () => {
    const violations: string[] = [];
    for (const s of strings) {
      for (const rx of BANNED_HI) {
        if (rx.test(s)) violations.push(`${rx} → "${s.slice(0, 80)}"`);
      }
    }
    expect(violations).toEqual([]);
  });

  it("never predicts forbidden topics in Hindi", () => {
    const violations = strings.filter((s) => FORBIDDEN_TOPIC_PREDICTIONS.some((rx) => rx.test(s)));
    expect(violations).toEqual([]);
  });
});

describe("Safe language — approved framing present", () => {
  it("uses 'may support / theme to reflect' framing in EN", () => {
    const joined = collectStrings().join(" ");
    expect(joined).toMatch(/theme to reflect on|may (be|support|reflect)/i);
  });

  it("uses चिंतन-विषय framing in HI", () => {
    const joined = collectStrings().join(" ");
    expect(joined).toMatch(/चिंतन-विषय|परंपरा|संभव/);
  });
});

describe("Reasoning-block completeness (THE WHY / यह क्यों कहा)", () => {
  it("every engine result carries steps", () => {
    const w = monthWeather(6, 15, 2026, 1, 6);
    expect(w.steps.length).toBeGreaterThan(0);
    expect(w.months.every((m) => m.steps.length > 0)).toBe(true);
    const gy = gridYogas({ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1 });
    expect(gy.steps.length).toBeGreaterThan(0);
  });

  it("month narratives exist in both languages", () => {
    const w = monthWeather(6, 15, 2026, 1, 6);
    for (const m of w.months) {
      expect(m.narrative.length).toBeGreaterThan(60);
      expect(m.narrativeHi).toMatch(/[\u0900-\u097F]/);
      expect(m.verdictHi).toMatch(/[\u0900-\u097F]/);
    }
  });
});