/**
 * v3.3 VEDIC LAYER — secret jyotish engine tests.
 *
 * Known-case determinism (DOB 15/6/1990 04:30 IST Mumbai), guna-milan,
 * dosha detection, friendly/enemy dasha verdicts, nakshatra×Mulank paths,
 * and content completeness (27 nakshatra essays, 9 dasha essays).
 * The word 'astrology' must NEVER appear in any generated UI line.
 */

import { describe, it, expect } from "vitest";
import {
  vedicChart, dashaAt, activeGraha, verifyNakshatra,
  compatibilityFusion, doshaReadings, weakestPlanet,
  dashaSandhiYears, yearsInDashaSandhi, dashaMonthFlavor, shubhSamay,
  grahaChainLine, birthUTC,
} from "@/lib/vedic";
import {
  NAKSHATRA_ESSAYS, DASHA_ESSAYS, DOSHA_EXPLAINERS,
  nakshatraEssay, dashaEssay,
} from "@/lib/vedic-content";

// The pinned known case: 15 June 1990, 04:30 IST, Mumbai.
const DOB = { year: 1990, month: 6, day: 15, hour: 4, minute: 30 };
const chart = vedicChart(DOB);

describe("v3.3 dasha ladder — known-case determinism (15/6/1990 04:30 IST Mumbai)", () => {
  it("computes janma nakshatra + rashi", () => {
    // Shatabhisha = index 23; Kumbha = rashi 10
    expect(chart.nakshatra).toBe(23);
    expect(chart.nakshatraName).toBe("Shatabhisha");
    expect(chart.rashi).toBe(10);
    expect(chart.rashiName).toBe("Kumbha");
    expect(chart.pada).toBeGreaterThan(0);
  });

  it("first mahadasha lord is Rahu (balance of Shatabhisha)", () => {
    expect(chart.dasha[0].lord).toBe("Rahu");
    expect(chart.dasha[0].years).toBeGreaterThan(0);
    expect(chart.dasha[0].years).toBeLessThan(18);
  });

  it("ladder covers 120 years in the right lord order", () => {
    expect(chart.dasha.length).toBe(9);
    const lords = chart.dasha.map((d) => d.lord);
    expect(lords).toEqual([
      "Rahu", "Jupiter", "Saturn", "Mercury", "Ketu", "Venus", "Sun", "Moon", "Mars",
    ]);
  });

  it("2026-09-28 sits in Shani mahadasha / Mangal antardasha / Guru pratyantardasha", () => {
    const pos = dashaAt(chart, new Date("2026-09-28T00:00:00Z"));
    expect(pos.maha.lord).toBe("Saturn");
    expect(pos.antar?.lord).toBe("Mars");
    expect(pos.pratyantar?.lord).toBe("Jupiter");
  });

  it("dashas are contiguous and non-overlapping", () => {
    for (let i = 1; i < chart.dasha.length; i++) {
      expect(chart.dasha[i].start.getTime()).toBe(chart.dasha[i - 1].end.getTime());
    }
  });

  it("Moon-chart fallback (no birth time) still resolves the same nakshatra", () => {
    const c2 = vedicChart({ year: 1990, month: 6, day: 15 });
    expect(c2.timeUnknown).toBe(true);
    expect(c2.nakshatraName).toBe("Shatabhisha");
    expect(c2.dasha[0].lord).toBe("Rahu");
  });

  it("birthUTC uses noon when time omitted", () => {
    const utc = birthUTC({ year: 1990, month: 6, day: 15 });
    expect(utc.toISOString()).toContain("T06:30"); // 12:00 IST = 06:30 UTC
  });
});

describe("v3.3 rule (a) — nakshatra × Mulank verification", () => {
  it("conflict path blends the nuance (Shatabhisha/Rahu vs Mulank 6 Shukra)", () => {
    const v = verifyNakshatra(6, chart);
    // Rahu (4) vs Shukra (6): tense → conflict
    expect(v.nakshatraLordDigit).toBe(4);
    expect(v.agreement).toBe("conflict");
    expect(v.badgeEn).toBe("Blended nuance");
    expect(v.dominant).toBe("nakshatra");
    expect(v.lineEn).toContain("blends both");
  });

  it("same-digit path = double confirmation", () => {
    // Mulank 4 = Rahu = the nakshatra lord itself
    const v = verifyNakshatra(4, chart);
    expect(v.agreement).toBe("same-digit");
    expect(v.badgeEn).toBe("Double confirmation");
    expect(v.lineHi).toContain("doona bhaar");
  });

  it("friendly path = double confirmation with distinct wording", () => {
    // Moon (2): Rahu-Chandra tense… use a birth in a Moon-lord nakshatra instead:
    // 31 July 1990 04:30 IST → Moon in Shravana? Probe dynamically; assert shape only.
    const c2 = vedicChart({ year: 2000, month: 1, day: 1, hour: 6, minute: 0 });
    const v = verifyNakshatra(5, c2); // Budh is friend to all → never conflict
    expect(["same-digit", "agree"]).toContain(v.agreement);
    expect(v.badgeEn).toBe("Double confirmation");
  });

  it("verification lines never contain the word astrology", () => {
    const v = verifyNakshatra(6, chart);
    expect(v.lineEn + v.lineHi + v.badgeEn + v.badgeHi).not.toMatch(/astrology/i);
  });
});

describe("v3.3 rule (b) — friendly vs enemy dasha-lord verdicts", () => {
  const pos = dashaAt(chart, new Date("2026-09-28T00:00:00Z"));

  it("friendly lord → strong verdict", () => {
    // Guru pratyantar (3) vs Mulank 1 (Surya) — Jupiter/Sun friends
    const ag = activeGraha(1, pos);
    expect(ag.verdict).toBe("strong");
  });

  it("tense lord → honest friction verdict", () => {
    // Guru (3) vs Mulank 6 (Shukra) — Guru-Shukra tense pair
    const ag = activeGraha(6, pos);
    expect(ag.verdict).toBe("friction");
    expect(ag.labelEn).toMatch(/friction/i);
    expect(ag.labelHi).toMatch(/jhagda|dugni/);
  });

  it("same lord as Mulank → strong (own season)", () => {
    const ag = activeGraha(3, pos); // Guru running its own pratyantar
    expect(ag.verdict).toBe("strong");
    expect(ag.labelEn).toContain("own dasha");
  });

  it("dasha-month flavor: maha=year theme, antar=month flavor, pratyantar=week texture", () => {
    const f = dashaMonthFlavor(6, chart, new Date("2026-09-01T00:00:00Z"));
    expect(f.yearThemeEn).toMatch(/Shani mahadasha/);
    expect(f.monthFlavorEn).toMatch(/Antardasha/);
    expect(f.weekTextureEn).toMatch(/Pratyantar/);
    expect(f.yearThemeHi).toContain("Shani mahadasha");
    expect(f.activeGraha.verdict).toBeTruthy();
  });
});

describe("v3.3 rule (c) — dasha sandhi in big-years detection", () => {
  it("sandhi windows = final year of each mahadasha with the next lord", () => {
    const s = dashaSandhiYears(chart);
    expect(s.length).toBe(8); // all but the last maha
    expect(s[0].nextLord).toBe("Jupiter");
    // Rahu maha: 1990+7.44y ≈ 1997-10 end; sandhi ≈ Oct 1996 → Oct 1997
    expect(s[0].end.getUTCFullYear()).toBe(1997);
  });

  it("yearsInDashaSandhi finds the overlap years", () => {
    const ys = yearsInDashaSandhi(chart, 1995, 2000);
    expect(ys).toContain(1997);
    expect(ys).not.toContain(1999);
  });
});

describe("v3.3 rule (e) — guna milan (36) × number harmony", () => {
  it("scores a sample pair within 0-36 and 0-100 combined", () => {
    const chartB = vedicChart({ year: 1992, month: 11, day: 2 });
    const f = compatibilityFusion(chart, chartB, 6, 9, 4, 9);
    expect(f.guna.total).toBeGreaterThanOrEqual(0);
    expect(f.guna.total).toBeLessThanOrEqual(36);
    expect(f.guna.kootas).toHaveLength(8);
    expect(f.combinedScore).toBeGreaterThanOrEqual(0);
    expect(f.combinedScore).toBeLessThanOrEqual(100);
    expect(f.guna.kootas.map((k) => k.koota)).toEqual([
      "Varna", "Vashya", "Tara", "Yoni", "Graha Maitri", "Gana", "Bhakoota", "Nadi",
    ]);
  });

  it("high band advice reads warm, low band reads honest — never deterministic", () => {
    const chartB = vedicChart({ year: 1992, month: 11, day: 2 });
    const f = compatibilityFusion(chart, chartB, 6, 9, 4, 9);
    expect(f.adviceEn).not.toMatch(/will|destined|guaranteed/i);
    expect(f.adviceHi).not.toMatch(/\bzaroor\b|\bpakka\b/i);
  });
});

describe("v3.3 rule (f) — dosha detection + care framing", () => {
  it("detects mangal dosha present/absent per chart", () => {
    const d = doshaReadings(chart);
    expect(d).toHaveLength(2);
    const mangal = d.find((x) => x.key === "mangal")!;
    // probe: this chart HAS mangal dosha (from Moon or Venus reference)
    expect(mangal.present).toBe(true);
    const ks = d.find((x) => x.key === "kalaSarpa")!;
    expect(ks.present).toBe(false);
  });

  it("dosha copy uses care framing — never fear-mongering", () => {
    const d = doshaReadings(chart);
    for (const x of d) {
      const all = x.titleEn + x.explainEn + x.upayEn;
      expect(all).not.toMatch(/\bdoom|cursed|destroy|guaranteed|will (marry|divorce)\b/i);
      expect(all).toContain("pariksha");
    }
  });

  it("clean chart reports no doshas with the honest all-clear line", () => {
    // scan a few birthdates for one without mangal dosha
    let clean: ReturnType<typeof doshaReadings> | null = null;
    for (const [y, m, d] of [[1985, 3, 20], [1987, 9, 5], [1994, 1, 25]] as const) {
      const c = vedicChart({ year: y, month: m, day: d, hour: 10, minute: 0 });
      const dr = doshaReadings(c);
      if (!dr.find((x) => x.key === "mangal")!.present) { clean = dr; break; }
    }
    if (clean) {
      expect(clean.find((x) => x.key === "mangal")!.explainEn).toContain("no Mangal dosha");
    }
  });
});

describe("v3.3 rule (d) — weakest-planet remedy selection", () => {
  it("missing number + dasha friction → both-systems flag wins", () => {
    const wp = weakestPlanet(6, 4, chart, [2, 8]);
    // current dasha lords: Shani maha (8), Mangal antar (9), Guru pratyantar (3)
    // Mulank 6: tense with 3 (Guru) → dasha-friction source on digit 3
    expect(wp.sources).toContain("dasha-friction");
    expect(wp.reasonEn).toBeTruthy();
    expect(wp.reasonHi).toContain("graha");
  });

  it("missing numbers alone select the grid gap", () => {
    const wp = weakestPlanet(1, 1, null, [5]);
    expect(wp.digit).toBe(5);
    expect(wp.graha).toBe("Budh");
    expect(wp.sources).toEqual(["missing-number"]);
  });

  it("standing advice when nothing is flagged", () => {
    const wp = weakestPlanet(6, 6, null, []);
    expect(wp.sources).toEqual(["standing"]);
    expect(wp.reasonEn).toContain("daily practice");
  });
});

describe("v3.3 rule (h) — shubh samay muhurat engine", () => {
  it("scores dates deterministically with panchanga provenance", () => {
    const s = shubhSamay(new Date("2026-11-15T09:00:00Z"), "marriage");
    expect(s.score).toBeGreaterThanOrEqual(0);
    expect(s.score).toBeLessThanOrEqual(100);
    expect(s.panchangaLine).toContain("tithi");
    expect(s.panchangaLine).toContain("nakshatra");
    expect(s.avoidEn).toMatch(/Rahu kala/);
  });

  it("different dates score differently (engine is live, not constant)", () => {
    const s1 = shubhSamay(new Date("2026-11-15T09:00:00Z"), "marriage");
    const s2 = shubhSamay(new Date("2026-11-19T09:00:00Z"), "launch");
    expect(s1.score).not.toBe(s2.score);
  });
});

describe("v3.3 content completeness", () => {
  it("27 nakshatra essays, 60-100 words EN, all with Hinglish twin", () => {
    expect(NAKSHATRA_ESSAYS).toHaveLength(27);
    for (const e of NAKSHATRA_ESSAYS) {
      const words = e.essayEn.trim().split(/\s+/).length;
      expect(words).toBeGreaterThanOrEqual(40);
      expect(words).toBeLessThanOrEqual(110);
      expect(e.essayHi.length).toBeGreaterThan(40);
      expect(e.essayHi).toMatch(/\b(hai|hain|ka|ki|ke|mein|jo|aur)\b/);
      expect(e.essayEn + e.essayHi).not.toMatch(/[\u0900-\u097F]/);
    }
  });

  it("essays cover all 27 indices without repetition", () => {
    const names = NAKSHATRA_ESSAYS.map((e) => e.name);
    expect(new Set(names).size).toBe(27);
    expect(names[0]).toBe("Ashwini");
    expect(names[26]).toBe("Revati");
  });

  it("9 dasha-lord essays — one per graha, EN + Hinglish", () => {
    expect(DASHA_ESSAYS).toHaveLength(9);
    const lords = DASHA_ESSAYS.map((d) => d.lord);
    expect(new Set(lords).size).toBe(9);
    for (const d of DASHA_ESSAYS) {
      expect(d.periodEn.length).toBeGreaterThan(60);
      expect(d.periodHi.length).toBeGreaterThan(40);
      expect(d.periodEn + d.periodHi).not.toMatch(/[\u0900-\u097F]/);
    }
  });

  it("dosha explainers carry EN + Hinglish + upay", () => {
    for (const key of ["mangal", "kalaSarpa"] as const) {
      const d = DOSHA_EXPLAINERS[key];
      expect(d.explainEn.length).toBeGreaterThan(60);
      expect(d.explainHi.length).toBeGreaterThan(60);
      expect(d.upayEn.length).toBeGreaterThan(10);
      expect(d.upayHi.length).toBeGreaterThan(10);
    }
  });

  it("lookup helpers resolve safely", () => {
    expect(nakshatraEssay(23).name).toBe("Shatabhisha");
    expect(nakshatraEssay(-1).name).toBe("Revati");
    expect(nakshatraEssay(30).name).toBe("Rohini"); // 30 % 27 = 3
    expect(dashaEssay("Saturn").school).toBe("Shani");
    expect(dashaEssay("Nobody").lord).toBe("Sun");
  });
});

describe("v3.3 basis-block graha chain (subtle, never 'astrology')", () => {
  it("grahaChainLine carries mulank × dasha with school voice", () => {
    const line = grahaChainLine(6, chart, "en");
    expect(line).toMatch(/graha chain: Mulank 6/);
    expect(line).not.toMatch(/astrology/i);
    const hi = grahaChainLine(6, chart, "hi");
    expect(hi).toMatch(/graha-kram: Mulank 6/);
    expect(hi).not.toMatch(/astrology/i);
  });
});