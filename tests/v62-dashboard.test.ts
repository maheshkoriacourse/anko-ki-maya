import { describe, it, expect } from "vitest";
import { computeDashboard3, dashSeed } from "@/lib/dashboard3";
import type { Dashboard3Result, DashCard } from "@/lib/dashboard3";

/**
 * v6.2 DAILY 3-CARD COSMIC DASHBOARD — engine tests.
 * Owner law baked in: interpretive sanket framing only — no prediction
 * strings ('will happen' family / 'zaroor hoga' family) in ANY card body,
 * both languages. Determinism is hard: same (mulank, yyyymmdd) twice must
 * produce identical output.
 */

const D1 = new Date(2026, 9, 1); // 1 Oct 2026
const D2 = new Date(2026, 2, 17); // 17 Mar 2026

function collectStrings(r: Dashboard3Result): { en: string[]; hi: string[] } {
  const en: string[] = [];
  const hi: string[] = [];
  for (const c of r.cards) {
    en.push(c.titleEn, c.bodyEn, c.actionEn, c.bandEn);
    hi.push(c.titleHi, c.bodyHi, c.actionHi, c.bandHi);
  }
  return { en, hi };
}

/** Banned prediction-family strings — EN. */
const BANNED_EN: RegExp[] = [
  /will happen/i,
  /you will (get|marry|die|become|have|earn|lose|face|receive|win|find|start|succeed|fail)/i,
  /will definitely/i,
  /\bguarantee\b/i,
  /guaranteed/i,
  /destined to/i,
  /going to happen/i,
  /will certainly/i,
  /\bpredicts? (that )?you\b/i,
];

/** Banned guarantee family — roman-Hinglish HI voice (v3.2 roman ban-list). */
const BANNED_HI: RegExp[] = [
  /\bzaroor hoga\b/i,
  /\bzaroor hogi\b/i,
  /\bzaroor honge\b/i,
  /\bpakka hoga\b/i,
  /\bpakka hogi\b/i,
  /\bavashya hoga\b/i,
  /\bnishchit roop se hoga\b/i,
];

describe("v6.2 dashboard3 — determinism", () => {
  it("same mulank + date twice = identical output (deep equal)", () => {
    const a = computeDashboard3(5, D1);
    const b = computeDashboard3(5, D1);
    expect(a).toEqual(b);
  });

  it("dashSeed is pure: same inputs → same index, in 0..8", () => {
    const s1a = dashSeed(7, 20261001);
    const s1b = dashSeed(7, 20261001);
    expect(s1a).toBe(s1b);
    expect(s1a).toBeGreaterThanOrEqual(0);
    expect(s1a).toBeLessThan(9);
  });
});

describe("v6.2 dashboard3 — structure", () => {
  it("returns exactly 3 cards: yesterday, today, tomorrow — in order", () => {
    const r = computeDashboard3(3, D1);
    expect(r.cards.length).toBe(3);
    expect(r.cards.map((c) => c.id)).toEqual(["yesterday", "today", "tomorrow"]);
  });

  it("every card carries bilingual fields, all non-empty (9 mulanks × 2 dates)", () => {
    for (let mulank = 1; mulank <= 9; mulank++) {
      for (const date of [D1, D2]) {
        const r = computeDashboard3(mulank, date);
        for (const c of r.cards) {
          for (const [field, value] of Object.entries(c) as [keyof DashCard, unknown][]) {
            if (field === "score") continue;
            expect(typeof value, `${mulank}/${c.id}/${field}`).toBe("string");
            expect(String(value).length, `${mulank}/${c.id}/${field}`).toBeGreaterThan(0);
          }
        }
        expect(r.cards[1].actionEn.length).toBeGreaterThan(0);
        expect(r.cards[1].actionHi.length).toBeGreaterThan(0);
      }
    }
  });

  it("all cards always carry an action field (micro-action), not just today", () => {
    for (let mulank = 1; mulank <= 9; mulank++) {
      const r = computeDashboard3(mulank, D1);
      for (const c of r.cards) {
        expect(c.actionEn.trim().length, `${c.id}/actionEn`).toBeGreaterThan(0);
        expect(c.actionHi.trim().length, `${c.id}/actionHi`).toBeGreaterThan(0);
      }
    }
  });
});

describe("v6.2 dashboard3 — coverage", () => {
  it("9 mulanks × 2 dates all resolve without throwing, score stays in band", () => {
    for (let mulank = 1; mulank <= 9; mulank++) {
      for (const date of [D1, D2]) {
        const r = computeDashboard3(mulank, date);
        expect(r.mulank).toBe(mulank);
        expect(r.yyyymmdd).toBe(date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate());
        for (const c of r.cards) {
          expect(c.score).toBeGreaterThanOrEqual(1);
          expect(c.score).toBeLessThanOrEqual(10);
        }
      }
    }
  });

  it("seed rotates across dates and mulanks (not constant)", () => {
    const seeds = new Set<number>();
    for (let d = 1; d <= 9; d++) {
      seeds.add(dashSeed(1, 20261000 + d));
    }
    for (let m = 1; m <= 9; m++) seeds.add(dashSeed(m, 20261001));
    expect(seeds.size).toBeGreaterThan(2);
  });
});

describe("v6.2 dashboard3 — voice law (interpretive sanket framing)", () => {
  it("no banned prediction strings in ANY body/title/action — EN scan, 9×2 grid", () => {
    for (let mulank = 1; mulank <= 9; mulank++) {
      for (const date of [D1, D2]) {
        const r = computeDashboard3(mulank, date);
        const { en } = collectStrings(r);
        for (const s of en) {
          for (const rx of BANNED_EN) {
            expect(rx.test(s), `EN banned ${rx} hit: "${s.slice(0, 80)}" (mulank ${mulank})`).toBe(false);
          }
        }
      }
    }
  });

  it("no banned 'zaroor hoga' family in ANY body — HI scan, 9×2 grid", () => {
    for (let mulank = 1; mulank <= 9; mulank++) {
      for (const date of [D1, D2]) {
        const r = computeDashboard3(mulank, date);
        const { hi } = collectStrings(r);
        for (const s of hi) {
          for (const rx of BANNED_HI) {
            expect(rx.test(s), `HI banned ${rx} hit: "${s.slice(0, 80)}" (mulank ${mulank})`).toBe(false);
          }
        }
      }
    }
  });

  it("tomorrow card uses interpretive framing ('sanket' or 'dikh' family) in both langs", () => {
    for (let mulank = 1; mulank <= 9; mulank++) {
      for (const date of [D1, D2]) {
        const r = computeDashboard3(mulank, date);
        const t = r.cards[2];
        const enOk = /sanket/i.test(t.bodyEn) || /dikh/i.test(t.bodyEn);
        const hiOk = /sanket/i.test(t.bodyHi) || /dikh/i.test(t.bodyHi);
        expect(enOk, `tomorrow EN interpretive framing (mulank ${mulank}): "${t.bodyEn.slice(0, 90)}"`).toBe(true);
        expect(hiOk, `tomorrow HI interpretive framing (mulank ${mulank}): "${t.bodyHi.slice(0, 90)}"`).toBe(true);
      }
    }
  });

  it("today card names the sanket explicitly and carries a micro-action line", () => {
    const r = computeDashboard3(5, D1);
    const t = r.cards[1];
    expect(/sanket/i.test(t.bodyEn)).toBe(true);
    expect(/sanket/i.test(t.bodyHi)).toBe(true);
    expect(/^one micro-action/i.test(t.actionEn)).toBe(true);
    expect(/^ek micro-action/i.test(t.actionHi)).toBe(true);
  });

  it("yesterday card is framed as learning, not prophecy", () => {
    const r = computeDashboard3(2, D2);
    const c = r.cards[0];
    expect(/learning|seekh/i.test(c.bodyEn)).toBe(true);
    expect(/seekh/i.test(c.bodyHi)).toBe(true);
  });
});