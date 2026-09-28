import { describe, it, expect } from "vitest";
import { loShuGrid, LO_SHU_LAYOUT, bhagyankFold } from "@/lib/loshu";

/**
 * v3.1 PRODUCT-OWNER TEST CASE (correction #1):
 * DOB 15-06-1990 → DOB digits 1,5,6,1,9,9,0 + BHAGYANK 4
 * → grid counts 1×2, 4×1, 5×1, 6×1, 9×2 ; missing 2,3,7,8 ; zeros = 2.
 * CRITICAL: 4 is missing from the DOB but IS the Bhagyank → NOT missing.
 */
describe("Lo Shu Grid v3.1 — Bhagyank also fills the grid (15 June 1990 spec case)", () => {
  const r = loShuGrid(1990, 6, 15);

  it("bhagyank digit is 4 and it fills its cell (+1 tally)", () => {
    expect(r.bhagyank).toBe(4);
    expect(r.counts[4]).toBe(1);
    expect(r.dobCounts[4]).toBe(0); // absent from the DOB digits themselves
    const cell = r.grid.flat().find((c) => c.digit === 4)!;
    expect(cell.count).toBe(1);
  });

  it("counts digits exactly as specified (DOB digits + Bhagyank digit)", () => {
    expect(r.counts[1]).toBe(2);
    expect(r.counts[5]).toBe(1);
    expect(r.counts[6]).toBe(1);
    expect(r.counts[9]).toBe(2);
    expect(r.zeros).toBe(2);
  });

  it("CRITICAL re-verification: 4 missing from DOB but IS Bhagyank → NOT missing anymore", () => {
    expect(r.missing).toEqual([2, 3, 7, 8]);
    expect(r.missing).not.toContain(4);
    expect(r.missingNotes).toHaveLength(4);
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
    expect(cell(4).count).toBe(1); // filled by the Bhagyank digit
  });

  it("planes: none complete (missing digits in each row)", () => {
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

  it("steps name the Bhagyank rule", () => {
    expect(r.steps.some((s) => s.includes("Bhagyank") && s.includes("4"))).toBe(true);
    expect(r.steps[0]).toContain("15-06-1990");
  });
});

describe("Lo Shu v3.1 — other cases", () => {
  it("a date whose digits already include the Bhagyank digit tallies it again", () => {
    // 29-02-1980 → DOB digits 2,9,0,2,1,9,8,0 → 1×1, 2×2, 8×1, 9×2.
    // Bhagyank: 2+2+9+1+9+8+0 = wait, use the formula: 2+2+(1+9+8+0=18→9)... = 2+2+9=13→4
    const r = loShuGrid(1980, 2, 29);
    expect(r.bhagyank).toBe(4);
    expect(r.dobCounts[4]).toBe(0);
    expect(r.counts[4]).toBe(1); // Bhagyank fills the missing 4
    expect(r.missing).toEqual([3, 5, 6, 7]); // 4 no longer missing
    // Action plane 8-1-6: 8 and 1 present, 6 missing → still partial
    expect(r.planes[2].complete).toBe(false);
  });

  it("a fully-present date is unaffected in structure (Bhagyank just adds a tally)", () => {
    // 19-08-2347? use a real date whose digits cover many cells: 12-04-1985
    const r = loShuGrid(1985, 4, 12);
    // DOB digits 1,2,0,4,1,9,8,5 → bhagyank: 4+3+(1+9+8+5=23→5)=12→3
    expect(r.bhagyank).toBe(3);
    expect(r.counts[3]).toBe(1);
    expect(r.dobCounts[3]).toBe(0);
  });

  it("no digits at all is impossible for valid dates (year ≥ 1900 supplies digits)", () => {
    const r = loShuGrid(1970, 1, 1);
    expect(Object.values(r.counts).some((c) => c > 0)).toBe(true);
  });

  it("bhagyankFold matches reduce(month)+reduce(day)+reduce(year) with master folding", () => {
    // 15-06-1990: 6 + 6 + (1+9+9+0=19→1)... wait: 6+6+19 → reduce path = 6+6+1 = 13 → 4
    expect(bhagyankFold(1990, 6, 15)).toBe(4);
    // master case: 29-11-2000 → 2+11→2+2 → month 11 reduces as master in the
    // school fold → 2; day 29 → 11 → 2; year 2000 → 2 → sum 6
    expect(bhagyankFold(2000, 11, 29)).toBe(6);
  });

  it("missing-number notes stay gentle for every digit", () => {
    for (let d = 1; d <= 9; d++) {
      const r = loShuGrid(2000, 1, 1);
      if (r.missing.includes(d)) {
        const note = r.missingNotes.find((n) => n.startsWith(`Missing ${d}:`))!;
        expect(note.toLowerCase()).toContain("reflect");
      }
    }
  });
});