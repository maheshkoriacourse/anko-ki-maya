import { describe, it, expect } from "vitest";

/**
 * v3.1 UI-SAFETY + REASONING-LANGUAGE SCAN — source-level guardrails:
 *  1. No reading/reasoning/forecast text container may silently cut text
 *     (truncate / line-clamp classes) — owner bug report on /longterm.
 *  2. Reasoning blocks read as Basis — 'Why this reading' phrasing banned
 *     in all user-facing JSX (correction #3).
 *  3. Repetitions UI must exist on the numeroscope page + blueprint
 *     chapter (correction #4).
 *  4. Life-graph page must build the timeline from big years (correction #2).
 *  5. Divine hero + bg texture integrated (owner cinematic order).
 */

const BANNED_TRUNCATION = [
  // truncate/ellipsis on any reading-type content container
  /className="[^"]*\btruncate\b[^"]*"/,
  /className="[^"]*\bline-clamp-\d+/,
  /text-overflow:\s*ellipsis/,
];

const REASONING_FILE_CHECKS: [string, RegExp[]][] = [
  // Calculation steps with an explicit uncertainty boundary; no prediction guarantee.
  ["components/loshu-kit.tsx", [/Basis/, /Yeh ank-ganna ka aadhar/, /not a certain prediction/]],
  ["components/shared.tsx", [/Basis — /, /This shows the calculation behind the reflection/, /not a certain prediction/]],
];

describe("v3.1 no silent text truncation", () => {
  it("no truncate/line-clamp classes on any page or component", async () => {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const roots = ["app", "components"];
    const violations: string[] = [];
    for (const root of roots) {
      const walk = async (dir: string) => {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        for (const e of entries) {
          const full = path.join(dir, e.name);
          if (e.isDirectory()) await walk(full);
          else if (/\.(tsx?)$/.test(e.name)) {
            const text = await fs.readFile(full, "utf-8");
            for (const rx of BANNED_TRUNCATION) {
              if (rx.test(text)) violations.push(`${full}: ${rx}`);
            }
          }
        }
      };
      await walk(root);
    }
    expect(violations).toEqual([]);
  });

  it("overflow-wrap safety is applied on flowing text containers", async () => {
    const lt = await fs_read("app/longterm/page.tsx");
    expect(lt).toMatch(/\[overflow-wrap:anywhere\]/);
    expect(lt).not.toMatch(/truncate/);
  });

  it("longterm PY rows render the full theme label (no label-less cards)", async () => {
    const lt = await fs_read("app/longterm/page.tsx");
    expect(lt).toMatch(/\{r\.label\}/);
  });
});

describe("v3.1 reasoning language — Basis everywhere", () => {
  for (const [file, musts] of REASONING_FILE_CHECKS) {
    it(`${file} carries the Basis phrasing`, async () => {
      const text = await fs_read(file);
      for (const rx of musts) expect(text).toMatch(rx);
    });
  }

  it("'Why this reading' / 'यह क्यों कहा' appear only inside comments, never in JSX strings", async () => {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const bannedInJsx = [/Why this reading\?/i, /यह क्यों कहा/];
    const violations: string[] = [];
    for (const root of ["app", "components"]) {
      const walk = async (dir: string) => {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        for (const e of entries) {
          const full = path.join(dir, e.name);
          if (e.isDirectory()) await walk(full);
          else if (/\.(tsx?)$/.test(e.name)) {
            const text = await fs.readFile(full, "utf-8");
            // strip block+line comments, then scan the remaining code
            const code = text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
            for (const rx of bannedInJsx) if (rx.test(code)) violations.push(`${full}: ${rx}`);
          }
        }
      };
      await walk(root);
    }
    expect(violations).toEqual([]);
  });
});

describe("v3.1 repetitions UI (correction #4)", () => {
  it("numeroscope page has the Repetitions section + Bhagyank note", async () => {
    const loshu = await fs_read("app/loshu/page.tsx");
    expect(loshu).toMatch(/data-testid="repetitions"/);
    expect(loshu).toMatch(/Ank-Repetitions/);
    expect(loshu).toMatch(/Bhagyank bhi grid mein bharta hai/);
    expect(loshu).toMatch(/analyzeRepetitions/);
  });

  it("flagship report explains repeated chart values without treating them as independent evidence", async () => {
    const bp = await fs_read("components/premium-report.tsx");
    expect(bp).toMatch(/Repetition and contrast in your chart/);
    expect(bp).toMatch(/multiple independent pieces of evidence/);
    expect(bp).toMatch(/calculation convention/);
  });
});

describe("timeline provenance", () => {
  it("legacy life-graph links lead to the user-authored report timeline", async () => {
    const lg = await fs_read("app/life-graph/page.tsx");
    expect(lg).toMatch(/redirect\("\/blueprint#timeline"\)/);
    expect(lg).toMatch(/milestones the customer has explicitly added/);
    const shell = await fs_read("components/app-shell.tsx");
    expect(shell).not.toMatch(/href: "\/life-graph"/);
    expect(shell).not.toMatch(/\/life-graph.*navLifeGraph/);
  });

  it("legacy retrospective cycle scoring routes to the transparent user-authored timeline", async () => {
    const page = await fs_read("app/life-events/page.tsx");
    expect(page).toMatch(/redirect\("\/blueprint#timeline"\)/);
    expect(page).toMatch(/Existing browser-local entries are left untouched/);
    expect(page).not.toMatch(/analyzeLifeEvents|resonance/i);
  });
});

describe("forecast provenance", () => {
  it("grounds career paths in user context instead of promising hiring results", async () => {
    const calibration = await fs_read("app/calibration/page.tsx");
    const report = await fs_read("components/premium-report.tsx");
    const reportEngine = await fs_read("lib/premium-report.ts");
    expect(calibration).toMatch(/share your current stage, the decision, goal, and one constraint/);
    expect(calibration).toMatch(/birth numbers cannot establish whether or when you’ll get hired/);
    expect(calibration).toMatch(/naukri dhoondh rahe hain/);
    expect(reportEngine).toMatch(/specific \$\{focus\} context/);
    expect(report).toMatch(/Why this scenario is here/);
    expect(report).toMatch(/<aside className="mt-3 rounded-lg bg-secondary\/35 p-3">/);
  });

  it("warns that retrospective prompts are broad and must be checked against the user's record", async () => {
    const shortHorizon = await fs_read("components/short-horizon-reading.tsx");
    expect(shortHorizon).toMatch(/prompts are broad and may fit many people/);
    expect(shortHorizon).toMatch(/check your diary or calendar/);
    expect(shortHorizon).toMatch(/A match is not evidence that a number predicted it/);
    expect(shortHorizon).toMatch(/vyaapak hain aur kai logon par fit ho sakte hain/);
  });

  it("the old daily event-warning page routes to conditional, evidence-labelled scenarios", async () => {
    const daily = await fs_read("app/din-mausam/page.tsx");
    expect(daily).toMatch(/redirect\("\/blueprint#scenarios"\)/);
    expect(daily).toMatch(/legacy engine is not imported/);
    const shell = await fs_read("components/app-shell.tsx");
    expect(shell).not.toMatch(/href: "\/din-mausam"/);
    const dashboard = await fs_read("app/dashboard3/page.tsx");
    expect(dashboard).toMatch(/redirect\("\/blueprint#scenarios"\)/);
    expect(shell).not.toMatch(/href: "\/dashboard3"/);
  });

  it("concierge presents the report and consultation as separate owner-priced inquiry-only services", async () => {
    const page = await fs_read("app/concierge/page.tsx");
    expect(page).toMatch(/₹1,00,000/);
    expect(page).toMatch(/Two separate services/);
    expect(page).toMatch(/consultation is not included/i);
    expect(page).toMatch(/written report is not included/i);
    expect(page).toMatch(/does not accept payment or bookings/i);
    expect(page).not.toMatch(/₹99,999|90-minute private interpretation/);
  });

  it("landing offer does not bundle the consultation into the human-reviewed report", async () => {
    const landingOffer = await fs_read("components/concierge.tsx");
    expect(landingOffer).toMatch(/Standalone written report/);
    expect(landingOffer).toMatch(/Separate private consultation/);
    expect(landingOffer.match(/₹1,00,000/g)).toHaveLength(2);
    expect(landingOffer).toMatch(/not included/i);
    expect(landingOffer).toMatch(/not operational yet/i);
    expect(landingOffer).not.toMatch(/₹99,999|Walkthrough call|live service/i);
  });

  it("sample profile is labelled as fictional and is not prefilled as a customer's data", async () => {
    const shell = await fs_read("components/app-shell.tsx");
    const report = await fs_read("components/premium-report.tsx");
    const onboarding = await fs_read("app/page.tsx");
    expect(shell).toMatch(/Sample profile active/);
    expect(report).toMatch(/Sample data · not a personal report/);
    expect(onboarding).toMatch(/profile\?\.isDemoProfile \? null : profile/);
    expect(onboarding).toMatch(/hasProfile && !isDemoProfile/);
    expect(onboarding).not.toMatch(/useEffect\(\(\) => \{[\s\S]{0,500}localStorage\.getItem\("akm\.v1\.profile"\)/);
  });

  it("report distinguishes name-letter tables from date-based calculations", async () => {
    const report = await fs_read("components/premium-report.tsx");
    const settings = await fs_read("app/settings/page.tsx");
    const onboarding = await fs_read("app/page.tsx");
    expect(report).toMatch(/name mapping: \$\{nameTableLabel\}/);
    expect(report).toMatch(/letter table for name-based numbers/);
    expect(report).toMatch(/not evidence of predictive accuracy/);
    expect(report).toMatch(/Date-based numbers follow their displayed formulas/);
    expect(report).not.toMatch(/Calculates name and date numbers using/);
    expect(settings).toMatch(/name-letter table; date formulas stay the same/);
    expect(onboarding).toMatch(/id="nameSystem"/);
    expect(onboarding).toMatch(/name-based calculations only\. Date-based calculations use separate formulas/);
  });

  it("unvalidated destiny and marriage scoring stay outside the customer path", async () => {
    const rajyoga = await fs_read("app/rajyoga/page.tsx");
    expect(rajyoga).toMatch(/redirect\("\/blueprint#chart"\)/);
    const compatibility = await fs_read("app/compatibility/page.tsx");
    expect(compatibility).toMatch(/redirect\("\/blueprint#summary"\)/);
    const shell = await fs_read("components/app-shell.tsx");
    expect(shell).not.toMatch(/href: "\/rajyoga"/);
    const overview = await fs_read("app/overview/page.tsx");
    expect(overview).not.toMatch(/href="\/compatibility"/);
  });

  it("numerology-first Overview and Lo Shu do not silently import Vedic chart verification", async () => {
    const overview = await fs_read("app/overview/page.tsx");
    const loshu = await fs_read("app/loshu/page.tsx");
    for (const source of [overview, loshu]) {
      expect(source).not.toMatch(/@\/lib\/vedic|vedicChart|grahaChainLine|nakshatra/i);
    }
    expect(overview).toMatch(/Personal Year, Month, and Day calculations/);
    const contextBrief = await fs_read("components/life-context-brief.tsx");
    expect(contextBrief).not.toMatch(/grahaFor|\.graha|Mahadasha|Nakshatra/i);
    expect(contextBrief).toMatch(/Personal Year .* planning lens/);
  });

  it("number tools are a birth-data-free digit calculator, not a planet compatibility or purchase advisor", async () => {
    const page = await fs_read("app/number-tools/page.tsx");
    const engine = await fs_read("lib/number-tools.ts");
    expect(page).not.toMatch(/useProfile|grahaFor|planetRelation|verdictLabel/);
    expect(engine).not.toMatch(/planetRelation|grahaFor|friendly|tense/);
    expect(engine).toMatch(/optional traditional-symbolism reference/);
    expect(page).toMatch(/not purchase or decision advice/);
    expect(page).toMatch(/do not need to change a number/i);
  });

  it("Name Studio discloses that its score is symbolic and is not a basis for legal identity changes", async () => {
    const page = await fs_read("app/name-studio/page.tsx");
    expect(page).toMatch(/not a probability or objective measure/i);
    expect(page).toMatch(/Do not change a legal name, identity, or brand solely/i);
  });

  it("Journal list only shows entries linked to the current birth-date profile", async () => {
    const page = await fs_read("app/journal/page.tsx");
    expect(page).toMatch(/ownerBirthDate === profile\.birthDate/);
    expect(page).toMatch(/Older unlinked notes stay in browser storage but are hidden/);
  });

  it("Long-term goals are profile-scoped and the Pinnacles notice is not a conditional hook", async () => {
    const page = await fs_read("app/longterm/page.tsx");
    expect(page).toMatch(/ownerBirthDate === profile\.birthDate/);
    expect(page).toMatch(/Older unlinked goals remain stored in this browser but are hidden/);
    expect(page).not.toMatch(/usePinnacles/);
    expect(page).toMatch(/PinnaclesNotice/);
  });
});

describe("v3.1 divine artwork integration (owner cinematic order)", () => {
  it("dashboard uses DivineHero with eager+fetchpriority header image", async () => {
    const ov = await fs_read("app/overview/page.tsx");
    expect(ov).toMatch(/DivineHero/);
    const shared = await fs_read("components/shared.tsx");
    expect(shared).toMatch(/fetchPriority="high"/);
    expect(shared).toMatch(/divine-header\.webp/);
  });

  it("app-shell mounts the fixed divine-bg texture layer", async () => {
    const shell = await fs_read("components/app-shell.tsx");
    expect(shell).toMatch(/divine-bg-layer/);
    const css = await fs_read("app/globals.css");
    expect(css).toMatch(/divine-bg\.webp/);
    expect(css).toMatch(/ken-burns/);
  });

  it("onboarding closes with divine order — mahadev art stays in shared.tsx (v3.4: form first, blessings last)", async () => {
    const ob = await fs_read("app/page.tsx");
    // v3.4 owner restructure: the landing no longer OPENS with the hero —
    // form first, Mahadev blessings + concierge close the page.
    expect(ob).not.toMatch(/LandingHero/);
    expect(ob).toMatch(/landing-concierge/);
    expect(ob).toMatch(/ConciergeSection/);
    const shared = await fs_read("components/shared.tsx");
    expect(shared).toMatch(/mahadev-hero\.webp/);
    expect(shared).toMatch(/fetchPriority="high"/);
  });
});

async function fs_read(p: string): Promise<string> {
  const fs = await import("node:fs/promises");
  return fs.readFile(p, "utf-8");
}
