import { describe, it, expect } from "vitest";

/**
 * v3.4 (owner order): landing page restructure — form first, divine art +
 * premium concierge as the closing section. This test pins the NEW layout.
 */

describe("v3.4 landing restructure", () => {
  it("onboarding form comes first; hero + concierge close the page", async () => {
    const fs = await import("node:fs/promises");
    const src = await fs.readFile("app/page.tsx", "utf8");
    // LandingHero import is gone — the mahadev full-bleed hero no longer
    // opens the landing page (v3.4 restructure).
    expect(src).not.toMatch(/LandingHero/);
    // ConciergeSection still present, now at the bottom.
    expect(src).toMatch(/ConciergeSection/);
    // The v3.4 closing order block exists after the disclaimer.
    expect(src).toMatch(/v3\.4 \(owner order\)/);
    // Form ("Apna naam aur janm-tithi") section exists.
    expect(src).toMatch(/Apna naam aur janm-tithi/);
    // Position check: the v3.4 closing block appears AFTER the disclaimer.
    const disclaimerIdx = src.indexOf("DisclaimerLine compact");
    const closingIdx = src.indexOf("v3.4 (owner order)");
    expect(disclaimerIdx).toBeGreaterThan(-1);
    expect(closingIdx).toBeGreaterThan(disclaimerIdx);
  });
});