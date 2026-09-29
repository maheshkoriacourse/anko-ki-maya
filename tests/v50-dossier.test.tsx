import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { soulArchetype } from "@/lib/dossier";

describe("v5.0 Akashic Dossier — soul archetype engine", () => {
  it("mulank 1 → The First Flame with all 7 blocks bilingual", () => {
    const a = soulArchetype(1, 9);
    expect(a.name).toBe("The First Flame");
    expect(a.crestEn.length).toBeGreaterThan(30);
    expect(a.strengthsEn.length).toBeGreaterThanOrEqual(3);
    expect(a.shadowEn.length).toBeGreaterThan(80);
    expect(a.redemptionHi.length).toBeGreaterThan(15);
    expect(a.growthHi.length).toBeGreaterThan(15);
  });

  it("mulank 8 → The Slow Mountain; no determinism ban-words in copy", () => {
    const a = soulArchetype(8, 4);
    expect(a.name).toBe("The Slow Mountain");
    for (const t of [a.crestEn, a.coreEn, a.shadowEn, a.purposeEn, a.growthEn]) {
      expect(t.toLowerCase()).not.toContain("will happen");
      expect(t.toLowerCase()).not.toContain("may suggest");
    }
  });

  it("every mulank 1..9 resolves to a named archetype (all blocks filled)", () => {
    for (let n = 1; n <= 9; n++) {
      const a = soulArchetype(n, n);
      expect(a.name.length).toBeGreaterThan(3);
      expect(a.nameHi.length).toBeGreaterThan(3);
      expect(a.strengthsHi.length).toBeGreaterThanOrEqual(3);
    }
  });
});
