import { describe, it, expect } from "vitest";
import {
  buildValidationSet,
  tuneWeights,
  validateSet,
  VALIDATION_QUESTIONS,
  isDynamicDef,
  type ValidationCore,
  type ValidationQuestion,
} from "@/lib/validation";

/**
 * v5.1 VALIDATION ENGINE — data-layer contract tests.
 * Bank bounds (30-50), DOB determinism, banned-copy law (interpret-never-
 * predict, formal-Hindi ban), dynamic questions that actually move with the
 * numbers, and the tuneWeights schema {love, wealth, career, shadow}.
 */

// The two anchor DOBs drive most probes: school mulank 2 + low-mulank
// contrast; owner DOB is the third leg.
const CORE_A: ValidationCore = {
  mulank: 2,
  bhagyank: 3,
  birthDay: 2,
  birthMonth: 11,
  birthYear: 1995,
  ageNow: 30,
};
const CORE_B: ValidationCore = {
  mulank: 5,
  bhagyank: 9,
  birthDay: 5,
  birthMonth: 5,
  birthYear: 1990,
  ageNow: 36,
};
const CORE_OWNER: ValidationCore = {
  mulank: 8,
  bhagyank: 8,
  namank: 7,
  birthDay: 17,
  birthMonth: 8,
  birthYear: 1989,
  ageNow: 37,
};

const DOBS: ValidationCore[] = [
  CORE_A,
  CORE_B,
  CORE_OWNER,
  { mulank: 1, bhagyank: 6, birthDay: 1, birthMonth: 1, birthYear: 2000, ageNow: 26 },
  { mulank: 9, bhagyank: 9, birthDay: 27, birthMonth: 9, birthYear: 1980, ageNow: 46 },
  { mulank: 11, bhagyank: 22, birthDay: 29, birthMonth: 2, birthYear: 2002, ageNow: 24 },
  { mulank: 3, bhagyank: 7, birthDay: 3, birthMonth: 7, birthYear: 1972, ageNow: 54 },
];

function q(set: ValidationQuestion[], id: string): ValidationQuestion {
  const found = set.find((x) => x.id === id);
  expect(found, `question "${id}" should exist in the set`).toBeTruthy();
  return found as ValidationQuestion;
}

describe("v5.1 validation engine — bank + set bounds", () => {
  it("bank holds ≥10 dynamic definitions and builds 30-50 question sets for every probed DOB", () => {
    const dynamicCount = VALIDATION_QUESTIONS.filter(isDynamicDef).length;
    expect(dynamicCount).toBeGreaterThanOrEqual(8);
    for (const core of DOBS) {
      const set = buildValidationSet(core);
      expect(set.length).toBeGreaterThanOrEqual(30);
      expect(set.length).toBeLessThanOrEqual(50);
      // ordered per narrative: life-events first, fear-hope last
      expect(set[0].cat).toBe("life-event");
      expect(set[set.length - 1].cat).toBe("fear-hope");
    }
  });

  it("the bank order is life-event → trait → money → relationship → fear-hope", () => {
    const order: string[] = [];
    for (const def of VALIDATION_QUESTIONS) {
      if (!order.includes(def.cat)) order.push(def.cat);
    }
    expect(order).toEqual(["life-event", "trait", "money", "relationship", "fear-hope"]);
  });

  it("every category carries static questions too (not only dynamics)", () => {
    const cats = new Set<ValidationQuestion["cat"]>();
    for (const def of VALIDATION_QUESTIONS) if (!isDynamicDef(def)) cats.add(def.cat);
    expect(cats.size).toBe(5);
  });
});

describe("v5.1 validation engine — DOB determinism", () => {
  it("same DOB twice → byte-identical set; different DOB → different set", () => {
    const s1 = buildValidationSet(CORE_A);
    const s2 = buildValidationSet(CORE_A);
    expect(JSON.stringify(s1)).toBe(JSON.stringify(s2));

    const other = buildValidationSet(CORE_B);
    expect(JSON.stringify(other)).not.toBe(JSON.stringify(s1));
  });
});

describe("v5.1 validation engine — voice law (banned copy + codes)", () => {
  it("validateSet passes on built sets; every question carries an EV: code and both texts", () => {
    for (const core of DOBS) {
      const set = buildValidationSet(core); // throws internally if breached
      expect(() => validateSet(set)).not.toThrow();
      for (const question of set) {
        expect(question.code).toMatch(/^EV:[A-Z]/);
        expect(question.textEn.length).toBeGreaterThan(20);
        expect(question.textHi.length).toBeGreaterThan(20);
        if (question.kind === "choice") {
          expect(question.options?.length ?? 0).toBeGreaterThanOrEqual(2);
        }
      }
    }
  });

  it("no banned construction in any text across every probe DOB", () => {
    const banned = [/may suggest/i, /theme to reflect/i, /will happen/i, /आपका|आपकी|आपके|आपको/];
    for (const core of DOBS) {
      const set = buildValidationSet(core);
      const texts: string[] = [];
      for (const question of set) {
        texts.push(question.textEn, question.textHi);
        texts.push(...(question.options ?? []), ...(question.optionsHi ?? []));
      }
      for (const t of texts) {
        for (const ban of banned) {
          expect(ban.test(t)).toBe(false);
        }
      }
    }
  });

  it("validateSet throws below 30 and above 50 questions", () => {
    const set = buildValidationSet(CORE_A);
    expect(() => validateSet(set.slice(0, 29))).toThrow(/at least 30/);
    expect(() => validateSet(set.slice(0, 30))).not.toThrow();
    const fat = [...set, ...set.map((question, i) => ({ ...question, id: `${question.id}-x${i}` }))];
    expect(fat.length).toBeGreaterThan(50);
    expect(() => validateSet(fat)).toThrow(/at most 50/);
    expect(() => validateSet(fat.slice(0, 50))).not.toThrow();
  });

  it("validateSet throws on a real banned string injected into the data", () => {
    const set = buildValidationSet(CORE_A).map((question) => ({
      ...question,
      textEn: question.id === "ev-school-feel" ? "This may suggest a pattern" : question.textEn,
    }));
    expect(() => validateSet(set)).toThrow(/banned/);
  });
});

describe("v5.1 validation engine — dynamic questions move with the numbers", () => {
  it("mulank wording + evidence code change between mulank 2 / 5 / 8 / 11", () => {
    const mul2 = q(buildValidationSet(CORE_A), "tr-mulank");
    const mul5 = q(buildValidationSet(CORE_B), "tr-mulank");
    const mul8 = q(buildValidationSet(CORE_OWNER), "tr-mulank");
    const mul11 = q(
      buildValidationSet({ ...CORE_A, mulank: 11 }),
      "tr-mulank",
    );
    // mulank 11 folds to 2 by school rule → same statement as mulank 2
    expect(mul11.textEn).toBe(mul2.textEn);
    expect(mul2.code).toBe("EV:M2");
    expect(mul11.code).toBe("EV:M2");
    expect(mul5.textEn).not.toBe(mul2.textEn);
    expect(mul5.code).toBe("EV:M5");
    expect(mul8.code).toBe("EV:M8");
    expect(new Set([mul2.textEn, mul5.textEn, mul8.textEn]).size).toBe(3);
  });

  it("age-window probes shift with birthDay and age (past / inside / ahead phrasing)", () => {
    const young = q(buildValidationSet({ ...CORE_A, ageNow: 20 }), "ev-conf-window");
    const mid = q(buildValidationSet({ ...CORE_A, ageNow: 26 }), "ev-conf-window");
    const older = q(buildValidationSet({ ...CORE_A, ageNow: 40 }), "ev-conf-window");
    // phases differ → wording differs inside one DOB
    expect(new Set([young.textEn, mid.textEn, older.textEn]).size).toBe(3);

    const a2 = q(buildValidationSet({ ...CORE_A, birthDay: 2 }), "ev-conf-window").code;
    const a9 = q(buildValidationSet({ ...CORE_A, birthDay: 9, mulank: 9 }), "ev-conf-window").code;
    expect(a2).not.toBe(a9); // window start is a function of the birth day

    // the spec's example anchor: windows live in the 21-29 zone
    expect(a2).toMatch(/^EV:W2[0-8]-[0-9]+$/);
  });

  it("missing-Lo-Shu-digit wording changes between a 4-gap DOB and an 8-gap DOB", () => {
    // 28/01/1985 + bhagyank 7: digits 2,8,0,1,1,9,8,5 + bhagyank 7 → 3,4,6
    // missing; 8 present → priority picks 4
    const gap = q(
      buildValidationSet({
        mulank: 1,
        bhagyank: 7,
        birthDay: 28,
        birthMonth: 1,
        birthYear: 1985,
        ageNow: 41,
      }),
      "tr-grid-gap",
    );
    expect(gap.code).toBe("EV:G4");
    // 05/05/1990 + bhagyank 9: digits 0,5,0,5,1,9,9,0 + 9 → 2,3,4,6,7,8 missing → priority 8
    const gap8 = q(buildValidationSet(CORE_B), "tr-grid-gap");
    expect(gap8.code).toBe("EV:G8");
    expect(gap.textEn).not.toBe(gap8.textEn);
  });

  it("choice-kind fear question leads with a mulank-keyed option (dynamic options)", () => {
    const f2 = q(buildValidationSet(CORE_A), "fh-fear-choice");
    const f8 = q(buildValidationSet(CORE_OWNER), "fh-fear-choice");
    expect(f2.kind).toBe("choice");
    expect(f2.code).toBe("EV:F2");
    expect(f8.code).toBe("EV:F8");
    expect(f2.options?.[0]).not.toBe(f8.options?.[0]);
    expect(f2.options?.length).toBe(4);
    expect(f2.optionsHi?.length).toBe(4);
  });

  it("personal-year hope probe keys to the coming year, not the birth year", () => {
    const py = q(buildValidationSet(CORE_OWNER), "fh-next-year");
    expect(py.code).toMatch(/^EV:PY[0-9]$/);
    // 1989+1 → 1990 → bhagyankFold(1+9+9+0)=1+7+8=... deterministic per DOB
    expect(py.code).toBe(`EV:PY${py.code.slice(5)[0]}`);
    const other = q(buildValidationSet(CORE_A), "fh-next-year");
    expect(other.code).not.toBe(py.code);
  });
});

describe("v5.1 validation engine — tuneWeights", () => {
  it("returns exactly four numeric weights {love, wealth, career, shadow}", () => {
    const w = tuneWeights({});
    expect(Object.keys(w).sort()).toEqual(["career", "love", "shadow", "wealth"]);
    for (const v of Object.values(w)) expect(typeof v).toBe("number");
    expect(w).toEqual({ love: 0, wealth: 0, career: 0, shadow: 0 });
  });

  it("YES on relationship questions warms love; NO cools it", () => {
    const allYes = tuneWeights(
      Object.fromEntries(buildValidationSet(CORE_A).map((question) => [question.id, true])),
    );
    const allNo = tuneWeights(
      Object.fromEntries(buildValidationSet(CORE_A).map((question) => [question.id, false])),
    );
    expect(allYes.love).toBeGreaterThan(allNo.love);
    expect(allYes.wealth).toBeGreaterThan(allNo.wealth);
    expect(allYes.shadow).toBeGreaterThan(allNo.shadow);
    expect(Object.values(allYes).every((v) => Number.isFinite(v))).toBe(true);
  });

  it("choice answers index the option slot; skipped/unknown answers stay silent", () => {
    const money = tuneWeights({ "mon-surplus": 0 }); // "people I love need it first"
    expect(money.love).toBeGreaterThanOrEqual(2);
    const saved = tuneWeights({ "mon-surplus": 1 }); // "quiet savings"
    expect(saved.wealth).toBeGreaterThanOrEqual(2);
    expect(tuneWeights({ "does-not-exist": true })).toEqual({
      love: 0,
      wealth: 0,
      career: 0,
      shadow: 0,
    });
    expect(tuneWeights({ "mon-surplus": null })).toEqual(saved === undefined ? {} : tuneWeights({}));
    expect(tuneWeights({ "mon-pay-quiet": "haan" })).toEqual(
      tuneWeights({ "mon-pay-quiet": true }),
    );
    expect(tuneWeights({ "mon-pay-quiet": "nahi" })).toEqual(
      tuneWeights({ "mon-pay-quiet": false }),
    );
  });
});