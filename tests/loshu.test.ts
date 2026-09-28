import { describe, it, expect } from "vitest";
import { loShuGrid, LO_SHU_LAYOUT } from "@/lib/loshu";

/**
 * Product-owner test case (OUT-OF-BAND requirement):
 * DOB 15-06-1990 → digits 1,5,0,6,1,9,9,0
 * → grid with 1×2, 5×1, 6×1, 9×2 ; missing 2,3,4,7,8 ; zeros = 2.
 */
describe("Lo Shu Grid — 15 June 1990 (spec case)", () => {
  const r = loShuGrid(1990, 6, 15);

  it("counts digits exactly as specified", () => {
    expect(r.counts[1]).toBe(2);
    expect(r.counts[5]).toBe(1);
    expect(r.counts[6]).toBe(1);
    expect(r.counts[9]).toBe(2);
    expect(r.zeros).toBe(2);
  });

  it("marks missing digits 2,3,4,7,8", () => {
    expect(r.missing).toEqual([2, 3, 4, 7, 8]);
    expect(r.missingNotes).toHaveLength(5);
  });

  it("places digits in the fixed layout 4-9-2 / 3-5-7 / 8-1-6", () => {
    expect(LO_SHU_LAYOUT).toEqual([
      [4, 9, 2],
      [3, 5, 7],
      [8, 1, 6],
    ]);
    expect(r.grid[0].map((c) => c.digit)).toEqual([4, 9, 2]);
    expect(r.grid[2].map((c) => c.digit)).toEqual([8, 1, 6]);
  });

  it("cell counts land on the right cells", () => {
    const flat = r.grid.flat();
    const cell = (d: number) => flat.find((c) => c.digit === d)!;
    expect(cell(1).count).toBe(2); // bottom-middle
    expect(cell(5).count).toBe(1); // centre
    expect(cell(6).count).toBe(1); // bottom-right
    expect(cell(9).count).toBe(2); // top-middle
    expect(cell(2).count).toBe(0);
    expect(cell(4).count).toBe(0);
  });

  it("planes: none complete (missing digits in each row)", () => {
    // Thought 4-9-2 → 9 present, 4/2 missing → partial
    // Emotion 3-5-7 → 5 present → partial
    // Action 8-1-6 → 1,6 present, 8 missing → partial
    expect(r.planes.map((p) => p.complete)).toEqual([false, false, false]);
    expect(r.planes[0].key).toBe("thought");
    expect(r.planes[1].key).toBe("emotion");
    expect(r.planes[2].key).toBe("action");
  });

  it("diagonals: golden 2-4-6-8 open; 1-5-9 confidence diagonal complete", () => {
    const golden = r.diagonals.find((d) => d.key === "golden")!;
    const conf = r.diagonals.find((d) => d.key === "spiritual")!;
    expect(golden.complete).toBe(false);
    expect(conf.complete).toBe(true); // 1 (×2), 5, 9 (×2) all present
  });

  it("strengths list includes the confidence diagonal", () => {
    expect(r.strengths.some((s) => s.includes("1-5-9"))).toBe(true);
  });

  it("uses safe language — reflective notes, never deterministic claims", () => {
    const allNotes = [
      ...r.planes.map((p) => p.note),
      ...r.diagonals.map((d) => d.note),
      ...r.missingNotes,
    ].join(" ").toLowerCase();
    for (const banned of ["will get", "will marry", "will die", "guaranteed", "you will struggle", "you will face", "will happen", "will become", "will lose", "will earn"]) {
      expect(allNotes).not.toContain(banned);
    }
    expect(r.missingNotes.join(" ")).toMatch(/reflect|theme|may suggest/);
    expect(r.missingNotes.join(" ")).toContain("Missing 2: missing 2 may suggest a theme around patience and partnership to reflect on");
  });

  it("exposes calculation steps for 'Why this reading?'", () => {
    expect(r.steps.length).toBeGreaterThanOrEqual(3);
    expect(r.steps[0]).toContain("15-06-1990");
  });
});

describe("Lo Shu — other cases", () => {
  it("a different date's digits count correctly (29-02-1980 → 2,9,0,2,9,1,9,8,0)", () => {
    // 29-02-1980 → digits 2,9,0,2,1,9,8,0 → 1×1, 2×2, 8×1, 9×2; missing 3,4,5,6,7
    const r = loShuGrid(1980, 2, 29);
    expect(r.counts[9]).toBe(2);
    expect(r.counts[2]).toBe(2);
    expect(r.counts[1]).toBe(1);
    expect(r.counts[8]).toBe(1);
    expect(r.missing).toEqual([3, 4, 5, 6, 7]);
    // Action plane 8-1-6: 8 and 1 present, 6 missing → partial, not complete
    expect(r.planes[2].complete).toBe(false);
    // Golden diagonal 2-4-6-8: 2 and 8 present, 4/6 missing → open
    expect(r.diagonals[0].complete).toBe(false);
  });

  it("no digits at all is impossible for valid dates (year ≥ 1900 supplies digits)", () => {
    const r = loShuGrid(1970, 1, 1);
    expect(Object.values(r.counts).some((c) => c > 0)).toBe(true);
  });

  it("missing-number notes stay gentle for every digit", () => {
    for (let d = 1; d <= 9; d++) {
      const r = loShuGrid(2000, 1, 1); // digits 2,0,0,0,1,1,1,1 → many missing
      if (r.missing.includes(d)) {
        const note = r.missingNotes.find((n) => n.startsWith(`Missing ${d}:`))!;
        expect(note.toLowerCase()).toContain("reflect");
      }
    }
  });
});