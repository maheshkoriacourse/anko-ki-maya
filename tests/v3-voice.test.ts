import { describe, it, expect } from "vitest";
import { ANK_DASHA_YEAR, ANK_DASHA_MONTH, mulankBhagyankState } from "@/lib/voice";
import { buildLifeGraph, patternNote } from "@/lib/life-graph";
import { buildLifeAreaReport, hasConcreteYears } from "@/lib/life-areas";
import { chartTruth, truthForYear } from "@/lib/truth";
import { detectRajyogas } from "@/lib/rajyoga";
import { NAVGRAH, devNum, grahaFor } from "@/lib/navgrah";
import { analyzePhone, analyzeHouse } from "@/lib/number-tools";
import { pinnacles } from "@/lib/numerology";

describe("v3 voice — direct jyotishi, no blandness", () => {
  const banRx = /theme to reflect on|may be a supportive period|may support the energy|may reflect|a lens for reflection/i;
  const stringsOf = (o: unknown): string[] => {
    const out: string[] = [];
    const scan = (x: unknown) => {
      if (typeof x === "string") out.push(x);
      else if (Array.isArray(x)) x.forEach(scan);
      else if (x && typeof x === "object") Object.values(x).forEach(scan);
    };
    scan(o);
    return out;
  };

  it("dasha voices carry no banned bland phrases", () => {
    const all = [...Object.values(ANK_DASHA_YEAR), ...Object.values(ANK_DASHA_MONTH)].flatMap((v) => stringsOf(v));
    expect(all.length).toBeGreaterThan(20);
    for (const s of all) expect(s).not.toMatch(banRx);
  });

  it("life-graph past readings are direct and concrete (no blandness, carry year+age)", () => {
    const graph = buildLifeGraph(1990, 6, 15, 2026, pinnacles(1990, 6, 15).pinnacles);
    for (const p of graph.past) {
      for (const s of [p.readingEn, p.readingHi]) {
        expect(s).not.toMatch(banRx);
        expect(s.length).toBeGreaterThan(40);
      }
      expect(p.readingHi).toMatch(/\b(hai|hain|ka|ki|ke|ko|mein|saal|tha|karo)\b/);
      expect(p.readingHi).not.toMatch(/[\u0900-\u097F]/);
    }
  });

  it("life-area sections: hook-first with concrete years, all four parts, direct voice", () => {
    const rep = buildLifeAreaReport({ birthYear: 1990, birthMonth: 6, birthDay: 15, mulank: 6, bhagyank: 3, pinnacles: pinnacles(1990, 6, 15).pinnacles, nowYear: 2026 });
    expect(rep.sections.length).toBe(10);
    for (const s of rep.sections) {
      expect(s.hookEn.length).toBeGreaterThan(30);
      expect(hasConcreteYears(s)).toBe(true);
      expect(s.remedyEn.length).toBeGreaterThan(10);
      // v3.2: HI mode is Hinglish — remedy lines are instructional and may be
    // verb-led; check Hinglish markers loosely (incl. imperative verbs).
    expect(s.remedyHi).toMatch(/\b(hai|hain|ka|ki|ke|ko|mein|saal|tha|karo|do|rakho|chuno|japa|daan|upay)\b/);
      expect(s.remedyHi.replace(/'ॐ[^']*'/g, "")).not.toMatch(/[\u0900-\u097F\u0966-\u096F]/);
      expect(s.pastEn + s.nowEn + s.futureEn).not.toMatch(banRx);
    }
  });
});

describe("v3 truth-telling — SACCHAN/KAARAN/UPAY/SAMAY", () => {
  it("corpus contains BOTH strong and difficult verdicts (no all-positive corpus)", () => {
    const kinds = new Set<string>();
    for (let py = 1; py <= 9; py++) kinds.add(truthForYear(py, { mulank: 6, bhagyank: 3, py, karmicDebts: [], missingDigits: [], tensePairs: [], nowYear: 2026, birthYear: 1990 }).kind);
    expect(kinds.has("strong")).toBe(true);
    expect(kinds.has("difficult")).toBe(true);
  });

  it("every difficult verdict carries basis AND remedy AND easing window", () => {
    for (let py = 1; py <= 9; py++) {
      const v = truthForYear(py, { mulank: 8, bhagyank: 8, py, karmicDebts: [13], missingDigits: [7], tensePairs: [[1, 8]], nowYear: 2026, birthYear: 1988 });
      if (v.kind === "difficult") {
        expect(v.basisEn.length).toBeGreaterThan(20);
        expect(v.remedyEn.length).toBeGreaterThan(10);
        expect(v.remedyHi).toMatch(/\b(hai|hain|ka|ki|ke|ko|mein|saal|tha|karo)\b/);
      expect(v.remedyHi.replace(/'ॐ[^']*'/g, '')).not.toMatch(/[\u0900-\u097F\u0966-\u096F]/);
      }
    }
  });

  it("chart truth page holds multiple verdicts with the full pattern", () => {
    const t = chartTruth({ mulank: 8, bhagyank: 4, py: 4, karmicDebts: [14], missingDigits: [5], tensePairs: [[1, 8]], nowYear: 2026, birthYear: 1988 });
    expect(t.verdicts.length).toBeGreaterThanOrEqual(3);
    expect(t.summaryEn).toMatch(/truth|verdict|honest/i);
  });
});

describe("v3 NAVGRAH layer", () => {
  it("every number is a planet with the school mapping", () => {
    const expectMap: Record<number, string> = { 1: "Surya", 2: "Chandra", 3: "Guru", 4: "Rahu", 5: "Budh", 6: "Shukra", 7: "Ketu", 8: "Shani", 9: "Mangal" };
    for (const [n, g] of Object.entries(NAVGRAH)) {
      expect(g.graha).toBe(expectMap[Number(n)]);
      expect(g.behaviorHi).toMatch(/\b(hai|hain|ka|ki|ke|ko|mein|saal|tha|karo)\b/);
      expect(g.behaviorHi).not.toMatch(/[\u0900-\u097F]/);
    }
  });

  it("knows Sun-Saturn tense, Moon-Jupiter friendly, Mercury universal friend", () => {
    expect(grahaFor(1).tense).toContain(8);
    expect(grahaFor(2).friends).toContain(3);
    expect(grahaFor(5).friends).toEqual(expect.arrayContaining([1, 2, 3, 4, 6, 7, 8, 9]));
  });
});

describe("v3 RAJYOGA detection", () => {
  it("detects the owner's known-DOB case 14/6/1993", () => {
    const r = detectRajyogas(1993, 6, 14, "Rahul Sharma");
    const ids = r.unique.map((u) => u.yoga.id);
    expect(ids).toContain("surya-rahu");
    expect(ids).toContain("shukra-mangal");
    expect(ids).toContain("surya-guru-mangal");
  });

  it("classifies birth vs name sources", () => {
    const r = detectRajyogas(1990, 6, 15, "Aarav Mehta");
    for (const u of r.unique) {
      expect(u.sources.length).toBeGreaterThan(0);
      expect(["birth", "name", "combined"]).toContain(u.sources[0]);
    }
  });
});

describe("v3 Ank Tools (phone/house/vehicle)", () => {
  it("scores a mobile number via digit-sum planet friendship", () => {
    const r = analyzePhone("9876543210", 6, 3);
    expect(r.digitsum).toBe(9);
    expect(r.lineEn.length).toBeGreaterThan(30);
    expect(r.lineHi).toMatch(/\b(hai|hain|ka|ki|ke|ko|mein|saal|tha|karo)\b/);
      expect(r.lineHi.replace(/[\u0966-\u096F]/g, '')).not.toMatch(/[\u0900-\u097F]/);
  });

  it("extracts digits from house labels like B-402", () => {
    const r = analyzeHouse("B-402", 6, 3);
    expect(r.digitsum).toBe(6);
  });
});

describe("v3 onboarding — consent gate removed", () => {
  it("no consent/disclaimer-wall strings remain in onboarding or storage flow", async () => {
    const fs = await import("node:fs/promises");
    const onboard = await fs.readFile("app/page.tsx", "utf-8");
    expect(onboard).not.toMatch(/type="checkbox"|consent|Disclaimer wall|I agree/i);
    const seeded = await fs.readFile("components/seeded-profile.tsx", "utf-8");
    expect(seeded).not.toMatch(/saveConsent/);
    const meanings = await fs.readFile("lib/meanings.ts", "utf-8");
    expect(meanings).toMatch(/Traditional numerology-based reading\./);
  });

  it("pattern note sharpens with marks", () => {
    const graph = buildLifeGraph(1990, 6, 15, 2026, pinnacles(1990, 6, 15).pinnacles);
    const empty = patternNote([], graph.past);
    expect(empty.en ?? "").toBe("");
    const withMarks = patternNote([{ year: 2020, verdict: "sahi" as const }, { year: 2021, verdict: "sahi" as const }], graph.past);
    expect(withMarks.en).toMatch(/2020|pattern/i);
  });
});
