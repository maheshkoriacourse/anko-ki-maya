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
  ["components/loshu-kit.tsx", [/आधार \/ Basis/, /इसी आधार पर हम आपके लिए यह predict करते हैं/, /On this basis we predict/]],
  ["components/shared.tsx", [/Basis — /, /On this basis we predict your reading\./]],
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
    expect(loshu).toMatch(/अंक-पुनरावृत्ति \(Repetitions\)/);
    expect(loshu).toMatch(/भाग्यांक भी ग्रिड में भरता है/);
    expect(loshu).toMatch(/analyzeRepetitions/);
  });

  it("blueprint chapter carries repetition lines with strength/shadow/upay", async () => {
    const bp = await fs_read("app/blueprint/page.tsx");
    expect(bp).toMatch(/अंक-पुनरावृत्ति/);
    expect(bp).toMatch(/reps\.mulankBhagyankSame/);
    expect(bp).toMatch(/analyzeRepetitions/);
  });
});

describe("v3.1 big-years timeline (correction #2)", () => {
  it("life-graph page renders the बड़े साल timeline section", async () => {
    const lg = await fs_read("app/life-graph/page.tsx");
    expect(lg).toMatch(/बड़े साल — समय-रेखा बड़ी घटनाओं से बनती है/);
    expect(lg).toMatch(/graph\.bigYears/);
    expect(lg).toMatch(/geo\.bigPins/);
    expect(lg).toMatch(/geo\.faintPath/);
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

  it("onboarding carries the subdued blurred banner", async () => {
    const ob = await fs_read("app/page.tsx");
    expect(ob).toMatch(/divine-header\.webp/);
    expect(ob).toMatch(/blur-\[2px\]/);
  });
});

async function fs_read(p: string): Promise<string> {
  const fs = await import("node:fs/promises");
  return fs.readFile(p, "utf-8");
}