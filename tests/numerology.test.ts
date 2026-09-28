import { describe, it, expect } from "vitest";
import {
  reduce, reduceFully, lifePath, nameNumbers, birthdayNumber, maturityNumber,
  personalYear, personalMonth, personalDay, pinnacles, challenges,
  compatibility, isValidBirthDate, sanitizeName, letterValue,
  SYSTEM_LETTER_VALUES, upcomingMonths, fullReading,
} from "@/lib/numerology";

/* ------------------------------------------------------------------ */
/* reduce / master numbers                                             */
/* ------------------------------------------------------------------ */

describe("reduce", () => {
  it("reduces to a single digit (1990 → 1+9+9+0=19 → 10 → 1)", () => {
    expect(reduce(1990)).toBe(1);
  });
  it("reduces 19 → 1 and 10 → 1", () => {
    expect(reduce(19)).toBe(1);
    expect(reduce(10)).toBe(1);
  });
  it("preserves master numbers 11/22/33", () => {
    expect(reduce(29)).toBe(11);
    expect(reduce(11)).toBe(11);
    expect(reduce(22)).toBe(22);
    expect(reduce(33)).toBe(33);
    expect(reduce(48)).toBe(3); // 48 → 12 → 3 (no master in the chain)
    expect(reduce(12)).toBe(3);
    expect(reduce(38)).toBe(11); // 38 → 11, master preserved mid-reduction
  });
  it("reduceFully collapses masters", () => {
    expect(reduceFully(29)).toBe(2);
    expect(reduceFully(11)).toBe(2);
  });
});

/* ------------------------------------------------------------------ */
/* Letter values (both systems)                                        */
/* ------------------------------------------------------------------ */

describe("letter values", () => {
  it("Pythagorean chart matches the spec", () => {
    expect(letterValue("A", "pythagorean")).toBe(1);
    expect(letterValue("I", "pythagorean")).toBe(9);
    expect(letterValue("J", "pythagorean")).toBe(1);
    expect(letterValue("R", "pythagorean")).toBe(9);
    expect(letterValue("Z", "pythagorean")).toBe(8);
    expect(letterValue("Y", "pythagorean")).toBe(7);
  });
  it("Chaldean chart matches the spec (no letter maps to 9)", () => {
    expect(letterValue("A", "chaldean")).toBe(1);
    expect(letterValue("E", "chaldean")).toBe(5);
    expect(letterValue("F", "chaldean")).toBe(8);
    expect(letterValue("G", "chaldean")).toBe(3);
    expect(letterValue("O", "chaldean")).toBe(7);
    expect(letterValue("Y", "chaldean")).toBe(1);
    expect(letterValue("Z", "chaldean")).toBe(7);
    const values = Object.values(SYSTEM_LETTER_VALUES.chaldean);
    expect(values).not.toContain(9);
    expect(values).toHaveLength(26);
  });
});

/* ------------------------------------------------------------------ */
/* Life Path                                                           */
/* ------------------------------------------------------------------ */

describe("lifePath", () => {
  it("computes 15 June 1990 → 3 (6+6+1=13→4? no: month 6 + day 6 + year 1 = 13 → 4 is wrong; verify: 1+9+9+0=19→1, so 6+6+1=13→4)", () => {
    // Per the spec method (month+day+year each reduced separately):
    // 6 + 6 + (1990 → 19 → 10 → 1) = 13 → 4.
    const r = lifePath(1990, 6, 15);
    expect(r.number).toBe(4);
    expect(r.compound).toBe("13/4");
    expect(r.steps.join(" ")).toContain("13");
  });
  it("preserves master Life Path (29 Feb style edge: 2/29/1980 → 2 + 11 + 9 = 22)", () => {
    const r = lifePath(1980, 2, 29);
    expect(r.number).toBe(22);
  });
  it("another master case: 22 Nov 2000 → 22? (22 → 4; 11 → 2; 2000 → 2; 4+2+2=8)", () => {
    const r = lifePath(2000, 11, 22);
    expect(r.number).toBe(8);
  });
});

/* ------------------------------------------------------------------ */
/* Name numbers                                                        */
/* ------------------------------------------------------------------ */

describe("nameNumbers", () => {
  it("Aarav Mehta Pythagorean: Expression 9, Soul Urge 9, Personality 9", () => {
    const r = nameNumbers("Aarav Mehta", "pythagorean");
    // A=1 A=1 R=9 A=1 V=4 = 16 ; M=4 E=5 H=8 T=2 A=1 = 20 ; total 36 → 9
    expect(r.expression).toBe(9);
    // vowels: A,A,A (1+1+1) + E,A (5+1) = 9
    expect(r.soulUrge).toBe(9);
    // consonants: R=9,V=4 (13) + M=4,H=8,T=2 (14) = 27 → 9
    expect(r.personality).toBe(9);
  });
  it("Chaldean differs from Pythagorean for the same name", () => {
    const py = nameNumbers("Aarav Mehta", "pythagorean");
    const ch = nameNumbers("Aarav Mehta", "chaldean");
    expect(ch.expression).not.toBe(py.expression); // engine supports the selector
    expect(ch.expressionSteps.join(" ")).toContain("Chaldean");
  });
  it("ignores spaces and punctuation", () => {
    const r1 = nameNumbers("A  B", "pythagorean");
    const r2 = nameNumbers("AB", "pythagorean");
    expect(r1.expression).toBe(r2.expression);
  });
});

/* ------------------------------------------------------------------ */
/* Birthday / Maturity                                                 */
/* ------------------------------------------------------------------ */

describe("birthdayNumber & maturityNumber", () => {
  it("birthday 15 → 6", () => {
    expect(birthdayNumber(15).number).toBe(6);
  });
  it("maturity = LifePath + Expression reduced (4 + 9 = 13 → 4)", () => {
    expect(maturityNumber(4, 9).number).toBe(4);
  });
});

/* ------------------------------------------------------------------ */
/* Personal Year / Month / Day                                         */
/* ------------------------------------------------------------------ */

describe("personal cycles", () => {
  it("Personal Year for 15 June 1990 in 2026 → 4", () => {
    expect(personalYear(6, 15, 2026).number).toBe(4);
  });
  it("Personal Month = PY + calendar month (4 + 9 = 13 → 4 for Sep 2026)", () => {
    expect(personalMonth(4, 9).number).toBe(4);
  });
  it("Personal Day = PM + calendar day", () => {
    // PM 4 + day 28 → 32 → 5
    expect(personalDay(4, 28).number).toBe(5);
  });
  it("master preservation: PY 2 + month 9 = 11 stays 11", () => {
    expect(personalMonth(2, 9).number).toBe(11);
  });
});

/* ------------------------------------------------------------------ */
/* Pinnacles & Challenges                                              */
/* ------------------------------------------------------------------ */

describe("pinnacles & challenges", () => {
  const pin = pinnacles(1990, 6, 15);
  it("uses the documented formulas", () => {
    // P1 = 6+6=12→3, P2 = 6+1990→1 → 7, P3 = 3+7=10→1, P4 = 6+1=7
    expect(pin.pinnacles[0].number).toBe(3);
    expect(pin.pinnacles[1].number).toBe(7);
    expect(pin.pinnacles[2].number).toBe(1);
    expect(pin.pinnacles[3].number).toBe(7);
  });
  it("timing starts at 36 − LifePath (36−4=32)", () => {
    expect(pin.pinnacles[0].ageStart).toBe(32);
    expect(pin.pinnacles[3].ageEnd).toBe(Infinity);
  });
  it("challenges are absolute differences", () => {
    const ch = challenges(1990, 6, 15);
    // C1 = |6-6| = 0, C2 = |6-1| = 5, C3 = |0-5| = 5, C4 = |6-1| = 5
    expect(ch.challenges.map((c) => c.number)).toEqual([0, 5, 5, 5]);
  });
});

/* ------------------------------------------------------------------ */
/* Compatibility                                                       */
/* ------------------------------------------------------------------ */

describe("compatibility", () => {
  it("pairs and reduces both profiles' numbers", () => {
    const r = compatibility(
      { lifePath: 4, expression: 9, soulUrge: 8 },
      { lifePath: 3, expression: 7, soulUrge: 5 },
    );
    expect(r.lifePathPair.combined).toBe(7); // 4+3
    expect(r.expressionPair.combined).toBe(7); // 9+7=16→7
    expect(r.soulUrgePair.combined).toBe(4); // 8+5=13→4
    expect(r.lifePathPair.steps).toContain("4 + 3 = 7");
  });
});

/* ------------------------------------------------------------------ */
/* Timeline helper                                                     */
/* ------------------------------------------------------------------ */

describe("upcomingMonths", () => {
  it("returns 6 consecutive months with correct rollover", () => {
    const rows = upcomingMonths(6, 15, 2026, 9, 6);
    expect(rows).toHaveLength(6);
    expect(rows[0].label).toBe("September 2026");
    expect(rows[5].label).toBe("February 2027");
    expect(rows[0].personalMonth).toBe(personalMonth(4, 9).number);
  });
});

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

describe("validation", () => {
  it("accepts valid dates and rejects impossible ones", () => {
    expect(isValidBirthDate(1990, 6, 15)).toBe(true);
    expect(isValidBirthDate(1990, 2, 30)).toBe(false);
    expect(isValidBirthDate(1899, 12, 31)).toBe(false);
    expect(isValidBirthDate(2000, 13, 1)).toBe(false);
    expect(isValidBirthDate(2000, 1, 0)).toBe(false);
  });
  it("sanitizes names", () => {
    expect(sanitizeName("  Aarav   Mehta ")).toBe("Aarav Mehta");
  });
});

/* ------------------------------------------------------------------ */
/* Full reading integration                                            */
/* ------------------------------------------------------------------ */

describe("fullReading", () => {
  it("assembles a complete reading for the demo profile", () => {
    const r = fullReading({
      birthName: "Aarav Mehta",
      preferredName: "Aarav",
      year: 1990,
      month: 6,
      day: 15,
      system: "pythagorean",
    });
    expect(r.lifePath.number).toBe(4);
    expect(r.nameNumbers.expression).toBe(9);
    expect(r.nameNumbers.soulUrge).toBe(9);
    expect(r.nameNumbers.personality).toBe(9);
    expect(r.birthday.number).toBe(6);
    expect(r.maturity.number).toBe(4); // 4+9=13→4
    expect(r.pinnacles).toHaveLength(4);
    expect(r.challenges).toHaveLength(4);
  });
});