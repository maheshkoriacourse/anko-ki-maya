import { describe, it, expect } from "vitest";
import {
  karmicDebts, karmicLessons, hiddenPassion, balanceNumber,
  cornerstoneAndFirstVowel, bridgeNumbers, rationalThought, karmicSnapshot,
} from "@/lib/karmic";
import { fullReading } from "@/lib/numerology";
import { demoProfile } from "@/lib/storage";

/**
 * Karmic engine tests — structure only (copy safety is tested separately).
 */

describe("karmic debts (13/14/16/19)", () => {
  it("detects 13/14/16/19 in core positions", () => {
    const r = karmicDebts({
      lifePathCompoundSum: 13,
      expressionTotal: 20,
      soulTotal: 8,
      personalityTotal: 12,
      birthDay: 19,
      maturitySum: 30,
    });
    expect(r.hits.map((h) => h.number).sort()).toEqual([13, 19]);
    expect(r.hits.map((h) => h.where)).toContain("Birth day");
  });

  it("returns no hits for a clean profile", () => {
    const r = karmicDebts({
      lifePathCompoundSum: 10,
      expressionTotal: 20,
      soulTotal: 8,
      personalityTotal: 12,
      birthDay: 15,
      maturitySum: 30,
    });
    expect(r.hits).toHaveLength(0);
  });

  it("flags 14 in the Life Path compound", () => {
    const r = karmicDebts({
      lifePathCompoundSum: 14, expressionTotal: 9, soulTotal: 3,
      personalityTotal: 6, birthDay: 5, maturitySum: 10,
    });
    expect(r.hits).toHaveLength(1);
    expect(r.hits[0].number).toBe(14);
  });
});

describe("karmic lessons (missing name digits)", () => {
  it("finds missing digits in 'Aarav Mehta' (Pythagorean)", () => {
    // A=1 a=1 r=9 a=1 v=4 → {1,9,4}; M=4 e=5 h=5 t=2 a=1 → {4,5,2,1}
    const r = karmicLessons("Aarav Mehta", "pythagorean");
    expect(r.missing).toEqual([3, 6, 7]);
    expect(r.missing).not.toContain(1);
    expect(r.missing).not.toContain(8);
  });

  it("returns empty when all digits present", () => {
    // 'Abcdefghi' → 1,2,3,4,5,6,7,8,9
    const r = karmicLessons("abcdefghi", "pythagorean");
    expect(r.missing).toEqual([]);
  });
});

describe("hidden passion", () => {
  it("finds the most repeated digit", () => {
    const r = hiddenPassion("Aarav Mehta", "pythagorean");
    // A=1×3 (A,a,a), a=1 → total 1 appears 3 times... A,a,r,a,v,M,e,h,t,a → 1,1,9,1,4,4,5,5,2,1 → 1×4
    expect(r.digits).toEqual([1]);
    expect(r.count).toBe(4);
  });

  it("handles ties", () => {
    const r = hiddenPassion("Bo Cdux", "pythagorean");
    // B=2,o=6,C=3,d=4,u=3,x=6 → 2,6,3,4,3,6 → tie 3×2 and 6×2
    expect(r.digits).toEqual([3, 6]);
  });
});

describe("balance number", () => {
  it("reduces the initials sum", () => {
    const r = balanceNumber("Aarav Mehta", "pythagorean");
    expect(r.initials).toEqual(["A", "M"]);
    expect(r.raw).toBe(1 + 4);
    expect(r.number).toBe(5);
  });
});

describe("cornerstone & first vowel", () => {
  it("picks the first letter and first vowel of the first name", () => {
    const r = cornerstoneAndFirstVowel("Aarav Mehta", "pythagorean");
    expect(r.cornerstone).toBe("A");
    expect(r.cornerstoneValue).toBe(1);
    expect(r.firstVowel).toBe("A");
    expect(r.firstVowelValue).toBe(1);
  });
});

describe("bridge numbers", () => {
  it("computes gaps and reductions", () => {
    const r = bridgeNumbers(6, 4, 5, 5);
    expect(r.bridges[0].gap).toBe(2);
    expect(r.bridges[0].reduced).toBe(2);
    expect(r.bridges[1].gap).toBe(0);
    expect(r.bridges[1].reduced).toBe(0);
  });
});

describe("rational thought", () => {
  it("blends first-name consonants with the birth day", () => {
    // 'Aarav' consonants r=9,v=4 → 13 → wait: pythagorean r=9, v=4 → 13; day 15 → 6; 13+6=19 → 10 → 1
    const r = rationalThought("Aarav", 15, "pythagorean");
    expect(r.raw).toBe(19);
    expect(r.number).toBe(1); // reduce(19) = 1 (19 is not a preserved master in debt terms here)
  });
});

describe("karmic snapshot", () => {
  it("assembles all parts from the demo reading", () => {
    const reading = fullReading({
      birthName: "Aarav Mehta", preferredName: "Aarav",
      year: 1990, month: 6, day: 15, system: "pythagorean",
    });
    const snap = karmicSnapshot(reading);
    expect(snap.lessons.missing.length).toBeGreaterThan(0);
    expect(snap.passion.digits.length).toBeGreaterThan(0);
    expect(snap.balance.number).toBeGreaterThan(0);
    expect(snap.bridges.bridges).toHaveLength(3);
    expect(snap.cornerstone.cornerstone).toBe("A");
  });

  it("matches the demo profile input", () => {
    const p = demoProfile();
    const reading = fullReading({
      birthName: p.birthName, preferredName: p.preferredName,
      year: Number(p.birthDate.slice(0, 4)), month: Number(p.birthDate.slice(5, 7)),
      day: Number(p.birthDate.slice(8, 10)), system: p.system,
    });
    const snap = karmicSnapshot(reading);
    expect(snap.rational.number).toBeGreaterThan(0);
  });
});