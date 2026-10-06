import { describe, it, expect } from "vitest";
import { buildLifeGraph, digitSurge, BIG_REASON_LABEL } from "@/lib/life-graph";
import { analyzeRepetitions } from "@/lib/repetitions";
import { pinnacles } from "@/lib/numerology";
import { BasisBlock } from "@/components/basis-block";
import { fireEvent, render } from "@testing-library/react";

/**
 * v3.1 FIX ROUND — owner's 4 corrections, engine-level assertions.
 */

describe("v3.1 correction #2 — LIFE GRAPH BIG-YEAR detection", () => {
  const pins = pinnacles(1990, 6, 15).pinnacles;
  const graph = buildLifeGraph(1990, 6, 15, 2026, pins, { mulank: 6, bhagyank: 4 });

  it("known DOB 15/6/1990 → expected big-years list", () => {
    const bigYears = graph.bigYears.map((p) => p.year);
    // v3.4 SCORED OUTLIER model: big = weighted score >= 3, capped top-9.
    // For DOB 15/6/1990 the surviving set is 1996/2002/2005/2014/2017/2020/
    // 2022/2023 (+2026 as the current year) — each with a heavyweight reason:
    // PY 1 starts (karmic debt on top), surge years (debt+surge), 2017/2026
    // (bhagyank+cycle-end+milestone), 2022 (pinnacle boundary + PY 9 end).
    for (const y of [1996, 2002, 2005, 2014, 2017, 2020, 2022, 2023, 2026]) {
      expect(bigYears).toContain(y);
    }
    // v3.4 sharpening: 4..9 big years total, timeline stays selective —
    // plain years (1994 PY 8, 1995 PY 9 solo, 1999 PY 4 solo, 2001/2010/2019
    // PY 6 solo, 2013 PY 9 solo) fall below the outlier bar now.
    expect(bigYears.length).toBeGreaterThanOrEqual(4);
    expect(bigYears.length).toBeLessThanOrEqual(9);
    expect(bigYears).not.toContain(1994);
    expect(bigYears).not.toContain(1995);
    expect(bigYears).not.toContain(1999);
    expect(bigYears).not.toContain(2013);
  });

  it("every big year names its LIKELY EVENT TYPE directly", () => {
    for (const p of graph.bigYears) {
      expect(p.eventEn).toBeTruthy();
      expect(p.eventHi).toMatch(/\b(hai|saal|ka|ki|ke)\b/);
      expect(p.eventHi).not.toMatch(/[\u0900-\u097F\u0966-\u096F]/);
      expect(p.bigReasons.length).toBeGreaterThan(0);
      for (const r of p.bigReasons) {
        expect(BIG_REASON_LABEL[r]).toBeTruthy();
      }
    }
  });

  it("event-type mapping: PY 1 → job/admission change (1996); PY 4 → foundation (2017); PY 9 → completion/legacy (2022)", () => {
    const py1 = graph.bigYears.find((p) => p.py === 1)!;
    expect(py1.eventEn).toMatch(/job\/admission/i);
    expect(py1.eventHi).toContain("naukri/admission");
    const py4 = graph.bigYears.find((p) => p.py === 4)!;
    expect(py4.eventEn).toMatch(/foundation/i);
    expect(py4.eventHi).toContain("neev");
    const py9 = graph.bigYears.find((p) => p.py === 9)!;
    expect(py9.eventEn).toMatch(/chapter closed|legacy/i);
    expect(py9.eventHi).toContain("virasat");
  });

  it("non-big years carry no event (sub-threshold years keep their reason evidence)", () => {
    for (const p of graph.past.filter((p) => !p.big)) {
      expect(p.eventEn).toBeNull();
      expect(p.eventHi).toBeNull();
      // v3.4: non-big years MAY retain reason-tags (evidence of near-misses
      // is fine) but every retained tag must be labelled.
      for (const r of p.bigReasons) {
        expect(BIG_REASON_LABEL[r]).toBeTruthy();
      }
    }
    expect(graph.past.length).toBeGreaterThan(graph.bigYears.length);
  });

  it("milestone ages 27/36/45/54 mark their years big", () => {
    const age27 = graph.past.find((p) => p.age === 27)!;
    expect(age27.big).toBe(true);
    expect(age27.bigReasons).toContain("milestone-age");
  });

  it("PY = Mulank and PY = Bhagyank reason tags exist in the ENGINE (kept for tag coverage)", () => {
    // v3.4: solo py-mulank / py-bhagyank years (score 1) no longer qualify as
    // big — the tags still exist and mark 2017/2026 (bhagyank) on this DOB.
    const bhagyankYear = graph.bigYears.find((p) => p.bigReasons.includes("py-bhagyank"));
    expect(bhagyankYear?.py).toBe(4);
    const mulankTag = BIG_REASON_LABEL["py-mulank"];
    expect(mulankTag).toBeTruthy();
  });

  it("digit-repetition surge years are detected (2020 for 15/6/1990)", () => {
    expect(digitSurge(2020, 6, 15)).toEqual({ digit: 2, extra: 2 });
    expect(digitSurge(2021, 6, 15)).toBeNull();
    const surgeYear = graph.bigYears.find((p) => p.year === 2020)!;
    expect(surgeYear.bigReasons).toContain("digit-surge-2");
  });

  it("default opts derive mulank/bhagyank from the DOB (same big-year set as explicit)", () => {
    const g2 = buildLifeGraph(1990, 6, 15, 2026, pins);
    // default mulank = reduced day = 6 (same), default bhagyank = ds-sum = 4
    // (same as the explicit master-preserved 4) → identical sets here.
    const a = g2.bigYears.map((p) => p.year).join(",");
    const b = graph.bigYears.map((p) => p.year).join(",");
    expect(a).toBe(b);
  });
});

describe("v3.1 correction #4 — NUMBER REPETITIONS (school deck)", () => {
  it("DOB 15/6/1990 → digits 1,5,6,1,9,9,0 → 1×2 and 9×2 asserted", () => {
    const r = analyzeRepetitions(1990, 6, 15, 6, 4);
    expect(r.entries.map((e) => e.digit).sort()).toEqual([1, 9]);
    const one = r.entries.find((e) => e.digit === 1)!;
    const nine = r.entries.find((e) => e.digit === 9)!;
    expect(one.count).toBe(2);
    expect(nine.count).toBe(2);
    expect(one.level).toBe("double");
    expect(one.strengthEn).toMatch(/leadership/i);
    expect(one.shadowEn).toContain("double 1 = ego and impatience");
    expect(one.shadowHi).toContain("Double 1");
    expect(one.upayEn).toMatch(/Upay/i);
    expect(nine.shadowHi).toMatch(/\b(hai|ka|ki|ke|mein)\b/);
    expect(nine.shadowHi).not.toMatch(/[\u0900-\u097F]/);
  });

  it("triple case 09/09/1999 → 9×5 = very intense (triple level)", () => {
    const r = analyzeRepetitions(1999, 9, 9, 9, 9);
    expect(r.entries).toHaveLength(1);
    const nine = r.entries[0];
    expect(nine.digit).toBe(9);
    expect(nine.count).toBe(5);
    expect(nine.level).toBe("triple");
    // Mulank 9 = Bhagyank 9 → special callout on the same digit
    expect(r.mulankBhagyankSame?.digit).toBe(9);
  });

  it("triple 3 carries the school line 'गुरु का झंडा — टीचर/स्पीकर'", () => {
    // 03-03-1993 → digits 0,3,0,3,1,9,9,3 → 3×3
    const r = analyzeRepetitions(1993, 3, 3, 3, 3);
    const three = r.entries.find((e) => e.digit === 3)!;
    expect(three.level).toBe("triple");
    expect(three.strengthEn).toContain("Guru ka jhanda");
    expect(three.strengthEn).toContain("teacher-speaker");
    expect(three.strengthHi).toContain("Guru ka jhanda");
  });

  it("double 5 = restlessness shadow; double 8 = deep-but-delayed karma", () => {
    // 25-05-1985: digits 2,5,0,5,1,9,8,5 → 5×3 (triple), 2×1, others single
    const r = analyzeRepetitions(1985, 5, 25, 7, 3);
    const five = r.entries.find((e) => e.digit === 5)!;
    expect(five.level).toBe("triple");
    expect(five.shadowEn).toContain("double 5 = restlessness");
    expect(five.shadowHi).toContain("bechaini");
    expect(five.upayEn).toMatch(/Upay/);
    // every entry carries a shadow line
    for (const e of r.entries) expect(e.shadowEn.length).toBeGreaterThan(20);
    // the 8 copy exists in the bank (double 8 = deep-but-delayed karma)
    const r8 = analyzeRepetitions(1988, 8, 28, 1, 8); // digits 2,8,0,8,1,9,8,8 → 8×4
    const eight = r8.entries.find((e) => e.digit === 8)!;
    expect(eight.shadowEn).toContain("double 8 = deep-but-delayed karma");
    expect(eight.shadowHi).toContain("gehra-par-vilambit");
  });

  it("same digit as BOTH Mulank and Bhagyank → special callout", () => {
    // 28-08-1999: mulank 1 (28→10→1), bhagyank 1+1+9=11→2... construct cleanly:
    // 09-09-1999 → mulank 9, bhagyank 9 (9+9+(9+9+9... ) → same digit)
    const r = analyzeRepetitions(1999, 9, 9, 9, 9);
    expect(r.mulankBhagyankSame).not.toBeNull();
    expect(r.steps.join(" ")).toContain("SAME digit in both positions");
    // And a case where they differ: 15-06-1990 → 6 vs 4 → no callout
    const r2 = analyzeRepetitions(1990, 6, 15, 6, 4);
    expect(r2.mulankBhagyankSame).toBeNull();
  });

  it("every repeated digit has strength + shadow + upay in BOTH languages (Hinglish voice)", () => {
    for (let d = 1; d <= 9; d++) {
      const r = analyzeRepetitions(1990 + d, ((d * 3) % 12) + 1, d + 10, d, d);
      for (const e of r.entries) {
        expect(e.strengthEn.length).toBeGreaterThan(20);
        expect(e.strengthHi).toMatch(/\b(hai|hain|ka|ki|ke|ko|mein|saal|nahi|karo|rakh|ban)\w*/);
        expect(e.strengthHi).not.toMatch(/[\u0900-\u097F]/);
        expect(e.shadowEn.length).toBeGreaterThan(20);
        expect(e.shadowHi).toMatch(/\b(hai|hain|ka|ki|ke|ko|mein|saal|nahi|karo|rakh|ban)\w*/);
        expect(e.shadowHi).not.toMatch(/[\u0900-\u097F]/);
        expect(e.upayEn.length).toBeGreaterThan(20);
        expect(e.upayHi.length).toBeGreaterThan(20);
        expect(e.upayHi).not.toMatch(/[\u0900-\u097F]/);
      }
    }
  });
});

describe("v3.1 correction #3 — REASONING LANGUAGE (Basis block)", () => {
  it("BasisBlock renders calculation steps + an uncertainty boundary in Hinglish — never 'Why this reading'", () => {
    const { getByText, queryAllByText } = render(
      <BasisBlock title="Lo Shu Grid" steps={["step one"]} lang="hi" />,
    );
    expect(getByText(/Basis — Lo Shu Grid/)).toBeInTheDocument();
    expect(getByText("Yeh ank-ganna ka aadhar hai; vyakhya ko nishchit bhavishyavaani na samjhein.")).toBeInTheDocument();
    expect(queryAllByText(/Why this reading/i)).toHaveLength(0);
    expect(queryAllByText(/यह क्यों कहा/)).toHaveLength(0);
  });

  it("EN variant labels the calculation and avoids a prediction guarantee", () => {
    const { getByText } = render(
      <BasisBlock title="Life Graph" steps={["step"]} lang="en" />,
    );
    expect(getByText(/Basis — Life Graph/)).toBeInTheDocument();
    expect(getByText("This shows the calculation behind the reflection; it is not a certain prediction.")).toBeInTheDocument();
  });

  it("banned strings are gone from ALL source files (app/, components/, lib/)", async () => {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const banned = [/Why this reading/i, /यह क्यों कहा/, /THE WHY/];
    const roots = ["app", "components", "lib"];
    const violations: string[] = [];
    for (const root of roots) {
      const walk = async (dir: string) => {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        for (const e of entries) {
          const full = path.join(dir, e.name);
          if (e.isDirectory()) await walk(full);
          else if (/\.(tsx?|css)$/.test(e.name)) {
            const text = await fs.readFile(full, "utf-8");
            // Strip comments first — the ban is on USER-FACING strings.
            const code = text
              .replace(/\/\*[\s\S]*?\*\//g, "")
              .replace(/\/\/.*$/gm, "");
            for (const rx of banned) {
              if (rx.test(code)) violations.push(`${full}: ${rx}`);
            }
          }
        }
      };
      await walk(root);
    }
    expect(violations).toEqual([]);
  });

  it("the old component names still export (back-compat) and keep the uncertainty boundary", async () => {
    const shared = await import("@/components/shared");
    const loshuKit = await import("@/components/loshu-kit");
    expect(typeof shared.WhyThisReading).toBe("function");
    expect(typeof loshuKit.ReasoningBlock).toBe("function");
    const { getByText } = render(<shared.WhyThisReading title="X" steps={["a"]} />);
    expect(getByText(/Basis — X/)).toBeInTheDocument();
    fireEventOpen(getByText(/Basis — X/));
    expect(getByText("This shows the calculation behind the reflection; it is not a certain prediction.")).toBeInTheDocument();
  });
});

function fireEventOpen(el: HTMLElement) {
  fireEvent.click(el);
}
