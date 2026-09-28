import { describe, it, expect } from "vitest";
import { luckyProfile, LUCKY_DAYS, LUCKY_COLORS, LUCKY_GEMS, PLANET_FOR_NUMBER, ALLIES } from "@/lib/lucky";
import { REMEDIES, remedyForNumber, GOLD_NOTE } from "@/lib/remedies";
import { compoundOmenFor, COMPOUND_OMENS, scoreName, optimizeName } from "@/lib/name-studio";
import { gridYogas } from "@/lib/grid-yogas";
import { monthWeather } from "@/lib/weather";
import { analyzeLifeEvents, graphGeometry, type LifeEvent } from "@/lib/life-events";
import { reduceFully } from "@/lib/numerology";

/* ------------------------------------------------------------------ */
/* Lucky tables (Cheiro chart)                                         */
/* ------------------------------------------------------------------ */

describe("lucky tables", () => {
  it("covers 1-9 for days/colors/gems", () => {
    for (let n = 1; n <= 9; n++) {
      expect(LUCKY_DAYS[n]?.length).toBeGreaterThan(0);
      expect(LUCKY_COLORS[n]?.length).toBeGreaterThan(0);
      expect(LUCKY_GEMS[n]?.length).toBeGreaterThan(0);
      expect(PLANET_FOR_NUMBER[n]).toBeTruthy();
      expect(ALLIES[n].length).toBeGreaterThan(0); // 8 harmonises with 3-6-9 per Cheiro, not with itself
    }
  });

  it("luckyProfile merges birth + life-path families", () => {
    const p = luckyProfile(15, 6, reduceFully); // birth 15→6, LP 6
    expect(p.birthNumber).toBe(6);
    expect(p.lpUnit).toBe(6);
    expect(p.numbers).toContain(6);
    expect(p.days.length).toBeGreaterThan(0);
  });

  it("folds master Life Paths with a note", () => {
    const p = luckyProfile(7, 11, reduceFully);
    expect(p.lpUnit).toBe(2);
    expect(p.masterNote).toContain("11");
  });
});

/* ------------------------------------------------------------------ */
/* Remedies                                                            */
/* ------------------------------------------------------------------ */

describe("remedies", () => {
  it("has all nine planets with mantra+count+yantra+daan", () => {
    for (let n = 1; n <= 9; n++) {
      const r = REMEDIES[n];
      expect(r).toBeTruthy();
      expect(r.mantra).toContain("ॐ");
      expect(r.japa).toBeGreaterThan(0);
      expect(r.japaSets).toBe(4);
      expect(r.yantra).toContain("यंत्र");
      expect(r.daan.length).toBeGreaterThan(0);
      expect(r.worshipDay).toBeTruthy();
    }
  });

  it("masters fold to their base remedy", () => {
    expect(remedyForNumber(11).baseOfMaster).toBe(2);
    expect(remedyForNumber(22).baseOfMaster).toBe(4);
    expect(remedyForNumber(33).baseOfMaster).toBe(6);
  });

  it("gold note mentions सोना", () => {
    expect(GOLD_NOTE).toContain("सोना");
  });
});

/* ------------------------------------------------------------------ */
/* Chaldean compound omens                                             */
/* ------------------------------------------------------------------ */

describe("compound omens", () => {
  it("covers 10-52", () => {
    for (let c = 10; c <= 52; c++) {
      expect(COMPOUND_OMENS[c]).toBeTruthy();
      expect(COMPOUND_OMENS[c].meaning.length).toBeGreaterThan(20);
      expect(["fortunate", "cautionary", "mixed", "neutral"]).toContain(COMPOUND_OMENS[c].tone);
    }
  });

  it("19 is the fortunate Sun prince, 16 the cautionary tower", () => {
    expect(compoundOmenFor(19).tone).toBe("fortunate");
    expect(compoundOmenFor(16).title).toContain("Citadel");
  });

  it("scoreName returns a 0-100 score with reasons", () => {
    const s = scoreName("Aarav Mehta", { lifePath: 6, birthNumber: 6, system: "chaldean" });
    expect(s.score).toBeGreaterThanOrEqual(0);
    expect(s.score).toBeLessThanOrEqual(100);
    expect(s.reasons.length).toBeGreaterThan(2);
    expect(s.total).toBeGreaterThan(0);
  });

  it("brand names score without personal context", () => {
    const s = scoreName("Maya Labs", null);
    expect(s.score).toBeGreaterThan(0);
  });

  it("optimizeName suggests up to 3 spellings, all different", () => {
    const r = optimizeName("Aarav Mehta", { lifePath: 6, birthNumber: 6, system: "chaldean" });
    expect(r.suggestions.length).toBeLessThanOrEqual(3);
    for (const s of r.suggestions) {
      expect(s.spelling.toLowerCase()).not.toBe("aarav mehta");
      expect(s.score).toBeGreaterThanOrEqual(0);
    }
  });
});

/* ------------------------------------------------------------------ */
/* Grid yogas                                                          */
/* ------------------------------------------------------------------ */

describe("grid yogas", () => {
  it("finds 6-7 and 7-5 when all digits present", () => {
    const counts = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1 };
    const r = gridYogas(counts);
    const ids = r.yogas.map((y) => y.id);
    expect(ids).toContain("yoga-6-7");
    expect(ids).toContain("yoga-7-5");
    expect(ids).toContain("yoga-3-6-9");
    expect(ids).toContain("yoga-1-5-9");
  });

  it("returns nothing for a sparse grid (no seeded pair covers 1&5)", () => {
    // 1 and 5 ARE a seeded pair — use truly unpaired digits: 2 and 8 alone form no seed.
    const r = gridYogas({ 2: 1, 8: 1 });
    expect(r.yogas).toHaveLength(0);
  });

  it("pairs include EN+HI copy", () => {
    const r = gridYogas({ 6: 1, 7: 1 });
    expect(r.yogas[0].titleHi).toBeTruthy();
    expect(r.yogas[0].noteHi.length).toBeGreaterThan(10);
  });
});

/* ------------------------------------------------------------------ */
/* Month weather                                                       */
/* ------------------------------------------------------------------ */

describe("month weather", () => {
  const w = monthWeather(6, 15, 2026, 1, 6);

  it("produces 12 months", () => {
    expect(w.months).toHaveLength(12);
  });

  it("intensity within 1-10 and a valid verdict", () => {
    for (const m of w.months) {
      expect(m.intensity).toBeGreaterThanOrEqual(1);
      expect(m.intensity).toBeLessThanOrEqual(10);
      expect(["MAJOR favorable", "strong but volatile", "caution", "consolidation"]).toContain(m.verdict);
    }
  });

  it("has best dates with omen titles", () => {
    for (const m of w.months) {
      expect(m.bestDates.length).toBeGreaterThan(0);
      for (const bd of m.bestDates) {
        expect(bd.omenTitle.length).toBeGreaterThan(3);
        expect(bd.reason.length).toBeGreaterThan(10);
      }
    }
  });

  it("marks 2-3 turning points with reasons", () => {
    expect(w.turningPoints.length).toBeGreaterThanOrEqual(2);
    expect(w.turningPoints.length).toBeLessThanOrEqual(3);
    for (const tp of w.turningPoints) {
      expect(tp.turningPoint).toBe(true);
      expect(tp.turningPointWhy!.length).toBeGreaterThan(20);
    }
  });

  it("warnings carry a remedy line", () => {
    const withWarnings = w.months.filter((m) => m.warning);
    for (const m of withWarnings) {
      expect(m.remedyLine).toContain("ॐ");
    }
  });

  it("PM2 warning avoids deterministic claims", () => {
    const pm2 = w.months.find((m) => m.personalMonth === 2);
    if (pm2?.warning) {
      expect(pm2.warning).not.toMatch(/you will|guaranteed|certainly/i);
    }
  });
});

/* ------------------------------------------------------------------ */
/* Life events                                                         */
/* ------------------------------------------------------------------ */

describe("life events", () => {
  const events: LifeEvent[] = [
    { id: "a", year: 2015, label: "Job change", impact: 8 },
    { id: "b", year: 2019, label: "Relocation", impact: 6 },
    { id: "c", year: 2024, label: "Launch", impact: 9 },
  ];

  it("maps events to personal years", () => {
    const r = analyzeLifeEvents(events, 1990, 6, 15);
    expect(r.onCycle).toHaveLength(3);
    for (const oc of r.onCycle) {
      expect(oc.personalYear).toBeGreaterThanOrEqual(1);
      expect(oc.personalYear).toBeLessThanOrEqual(9);
    }
  });

  it("produces resonances sorted by average impact", () => {
    const r = analyzeLifeEvents(events, 1990, 6, 15);
    for (let i = 1; i < r.resonances.length; i++) {
      expect(r.resonances[i - 1].averageImpact).toBeGreaterThanOrEqual(r.resonances[i].averageImpact);
    }
  });

  it("geometry yields chart points within bounds", () => {
    const g = graphGeometry(events, 1990, 6, 15, 2026);
    expect(g.points).toHaveLength(3);
    for (const p of g.points) {
      expect(p.x).toBeGreaterThanOrEqual(0);
      expect(p.y).toBeGreaterThanOrEqual(0);
    }
    expect(g.path.startsWith("M")).toBe(true);
  });

  it("empty events → summary null", () => {
    const r = analyzeLifeEvents([], 1990, 6, 15);
    expect(r.onCycle).toHaveLength(0);
    expect(r.summary).toBeNull();
  });
});