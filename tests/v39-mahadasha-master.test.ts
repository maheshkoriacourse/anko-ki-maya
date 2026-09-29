import { describe, it, expect } from "vitest";
import { buildMahadasha, masterSummary } from "@/lib/mahadasha";

describe("v3.9 mahadasha + master numbers (owner order)", () => {
  it("2 Nov 1980 timeline: 9 rows, Rahu running 2026, antars present", () => {
    const md = buildMahadasha({ year: 1980, month: 11, day: 2 }, new Date(2026, 8, 30));
    expect(md.rows.length).toBe(9);
    expect(md.rows[md.currentIndex].lord).toBe("Rahu");
    expect(md.currentAntars.length).toBe(9);
    expect(md.headerHi).toContain("Rahu");
  });

  it("demo DOB 15/6/1990: sun-moon sequence sane", () => {
    const md = buildMahadasha({ year: 1990, month: 6, day: 15 }, new Date(2026, 8, 30));
    expect(md.rows.length).toBe(9);
    expect(md.currentIndex).toBeGreaterThanOrEqual(0);
  });

  it("master summary: 22 candidate fires full card content", () => {
    const ms = masterSummary([
      { label: "Mulank", labelHi: "mulank", number: 2 },
      { label: "Bhagyank", labelHi: "bhagyank", number: 22 },
    ], "en");
    expect(ms.isMaster).toBe(true);
    expect(ms.primary?.number).toBe(22);
    expect(ms.primary?.title).toContain("Builder");
    expect(ms.folded.number).toBe(4);
    expect(ms.lineEn).toContain("22");
  });

  it("no-master path returns empty isMaster (11 requires explicit candidate)", () => {
    const ms = masterSummary([
      { label: "Mulank", labelHi: "mulank", number: 2 },
      { label: "Bhagyank", labelHi: "bhagyank", number: 9 },
    ], "hi");
    expect(ms.isMaster).toBe(false);
    expect(ms.primary).toBeUndefined();
  });
});
