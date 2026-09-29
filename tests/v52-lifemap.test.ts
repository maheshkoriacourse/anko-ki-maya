import { describe, it, expect } from "vitest";
import { buildLifeMap } from "@/lib/dossier-lifemap";
import { hiddenStoryOf } from "@/lib/dossier-chapters";

describe("v5.2 dossier chapters — hidden story + life map", () => {
  it("OWNER case 2-Nov-1980: 16 mahadasha bands, Rahu current abhi-marked, age 45", () => {
    const l = buildLifeMap(1980, 11, 2, "2026-09-30");
    expect(l.ageNow).toBe(45);
    expect(l.bands.length).toBeGreaterThanOrEqual(10);
    const rahu = l.bands.find((b) => b.basis.includes("Rahu"));
    expect(rahu).toBeTruthy();
    expect(rahu!.basis).toContain("abhi");
  });

  it("hidden story mulank-2 is non-generic 6-beat, banned-copy free", () => {
    const s = hiddenStoryOf(2);
    expect(s.beats.length).toBe(6);
    for (const b of s.beats) {
      for (const t of [b.textEn]) {
        const lo = t.toLowerCase();
        expect(lo).not.toContain("may suggest");
        expect(lo).not.toContain("will happen");
        expect(lo).not.toContain("theme to reflect");
      }
      expect(b.textHi.length).toBeGreaterThan(20);
    }
  });

  it("mulank 8 → Slow Mountain story (non-generic beat-0)", () => {
    const s = hiddenStoryOf(8);
    expect(s.beats[0].textHi).not.toContain("pattern chal raha hai");
  });
});
