import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";

/**
 * Repetitions and optional cultural associations remain easy to find.
 * /lucky no longer prescribes purchases, donations, or date-selection scores.
 * (c) dashboard 'Go deeper' tiles: Repetitions entry → /loshu#repetitions-h
 */
describe("discoverability — repetitions & optional associations", () => {
  it("/loshu has top jump chips (Repetitions anchor + /lucky link)", () => {
    const p = readFileSync("app/loshu/page.tsx", "utf8");
    expect(p).toMatch(/loshu-jump-chips/);
    expect(p).toMatch(/#repetitions-h/);
    expect(p).toMatch(/href="\/lucky"/);
    expect(p).toMatch(/Ank-Repetitions/);
  });

  it("/loshu bottom explains where optional associations and practical actions live", () => {
    const p = readFileSync("app/loshu/page.tsx", "utf8");
    expect(p).toMatch(/loshu-remedies-teaser/);
    expect(p).toMatch(/optional paramparagat ank|optional traditional number/);
    expect(p).toMatch(/no-purchase reflection/);
  });

  it("lucky tool does not score auspicious dates or recommend purchases", () => {
    const p = readFileSync("app/lucky/page.tsx", "utf8");
    expect(p).toMatch(/You do not need to buy a gemstone/);
    expect(p).not.toMatch(/shubhSamay|Score the date|muResult|gemstone.*based on/);
  });

  it("dashboard 'Go deeper' tiles include a Repetitions entry → /loshu#repetitions-h", () => {
    const p = readFileSync("app/overview/page.tsx", "utf8");
    expect(p).toMatch(/\/loshu#repetitions-h/);
    expect(p).toMatch(/doharaae ank|Repeated digits/);
  });
});
