import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";

/**
 * v3.4 discoverability (owner: 'repetitions kaha pe hai? remedies kaha pe hai?') —
 * (a) /loshu top: jump chips 'Repetitions ↓' + 'Upay → /lucky'
 * (b) /loshu bottom: remedies teaser card → /lucky
 * (c) dashboard 'Go deeper' tiles: Repetitions entry → /loshu#repetitions-h
 */
describe("v3.4 discoverability — repetitions & remedies findable", () => {
  it("/loshu has top jump chips (Repetitions anchor + /lucky link)", () => {
    const p = readFileSync("app/loshu/page.tsx", "utf8");
    expect(p).toMatch(/loshu-jump-chips/);
    expect(p).toMatch(/#repetitions-h/);
    expect(p).toMatch(/href="\/lucky"/);
    expect(p).toMatch(/Ank-Repetitions/);
  });

  it("/loshu bottom has a remedies teaser card pointing to /lucky", () => {
    const p = readFileSync("app/loshu/page.tsx", "utf8");
    expect(p).toMatch(/loshu-remedies-teaser/);
    expect(p).toMatch(/upay kaha hain\?|Where are the remedies\?/);
  });

  it("dashboard 'Go deeper' tiles include a Repetitions entry → /loshu#repetitions-h", () => {
    const p = readFileSync("app/overview/page.tsx", "utf8");
    expect(p).toMatch(/\/loshu#repetitions-h/);
    expect(p).toMatch(/doharaae ank|Repeated digits/);
  });
});