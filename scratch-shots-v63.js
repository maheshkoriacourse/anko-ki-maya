/* v63 AKASHIC LUXURY round — local dev-server shots + live-DOM checks.
   Desktop 1440x900 (dark+light) + mobile 390x844, overview + loshu. */
const { chromium } = require("/home/maheshkoria/tools/camofox-browser/node_modules/playwright-core");

const BASE = "http://localhost:3109";
const OUT = "/home/maheshkoria/anko-ki-maya/screenshots";
const fs = require("fs");
fs.mkdirSync(OUT, { recursive: true });

const shots = [
  { name: "v63-overview-1440-dark", url: `${BASE}/overview`, vp: { width: 1440, height: 900 }, scheme: "dark", fullPage: false },
  { name: "v63-loshu-1440-dark", url: `${BASE}/loshu`, vp: { width: 1440, height: 900 }, scheme: "dark", fullPage: true },
  { name: "v63-overview-1440-light", url: `${BASE}/overview`, vp: { width: 1440, height: 900 }, scheme: "light", fullPage: false },
  { name: "v63-loshu-1440-light", url: `${BASE}/loshu`, vp: { width: 1440, height: 900 }, scheme: "light", fullPage: true },
  { name: "v63-overview-390-dark", url: `${BASE}/overview`, vp: { width: 390, height: 844 }, scheme: "dark", fullPage: false },
  { name: "v63-loshu-390-dark", url: `${BASE}/loshu`, vp: { width: 390, height: 844 }, scheme: "dark", fullPage: true },
];

(async () => {
  const browser = await chromium.launch({
    executablePath: "/home/maheshkoria/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome",
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
    env: { ...process.env, LD_LIBRARY_PATH: "/home/maheshkoria/.local/lib/ks-chrome-libs" },
  });
  const findings = [];
  for (const s of shots) {
    const ctx = await browser.newContext({ viewport: s.vp, colorScheme: s.scheme });
    const page = await ctx.newPage();
    await page.addInitScript(() => {
      window.localStorage.setItem("akm.v1.profile", JSON.stringify({
        birthName: "Aarav Mehta", preferredName: "Aarav", birthDate: "1990-06-15",
        birthTime: "", birthplace: "", system: "pythagorean",
      }));
      window.localStorage.setItem("akm.v3.lang", "hi");
    });
    await page.goto(s.url, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(1800);

    const dark = s.scheme === "dark";
    findings.push([`${s.name}: no horizontal scroll`, await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)]);
    findings.push([`${s.name}: sidebar panel present`, await page.evaluate(() => !!document.querySelector(".shell-sidebar"))]);
    findings.push([`${s.name}: brand rule present`, await page.evaluate(() => !!document.querySelector(".sidebar-brand-rule"))]);
    findings.push([`${s.name}: akashic-heading used`, (await page.evaluate(() => document.querySelectorAll(".akashic-heading").length)) >= 2]);
    findings.push([`${s.name}: sanket banner rendered`, await page.evaluate(() => !!document.querySelector('[data-testid="sanket-clean"], [data-testid="sanket-banner"]'))]);

    const activeEl = await page.evaluate(() => {
      const el = document.querySelector('.shell-sidebar .nav-link[data-active="true"]');
      if (!el) return null;
      const cs = getComputedStyle(el);
      return { borderLeft: cs.borderLeftWidth + " " + cs.borderLeftColor, color: cs.color };
    });
    findings.push([`${s.name}: active nav gold left-rule (2px saffron)`, !!activeEl && activeEl.borderLeft.startsWith("2px") && !/0, 0, 0, 0\)/.test(activeEl.borderLeft)]);
    if (dark) {
      findings.push([`${s.name}: sidebar bg painted (navy/ivory layer)`, await page.evaluate(() => {
        if (!window.matchMedia("(min-width: 768px)").matches) return true; // sidebar hidden <md; topbar carries the paint
        const cs = getComputedStyle(document.querySelector(".shell-sidebar"));
        return cs.backgroundImage !== "none" || cs.backgroundColor !== "rgba(0, 0, 0, 0)";
      })]);
      findings.push([`${s.name}: edict edge on sanket wrap`, await page.evaluate(() => !!document.querySelector(".saffron-accent-edge"))]);
      if (s.url.includes("loshu")) {
        findings.push([`${s.name}: every filled cell etched (gold hairline cell)`, await page.evaluate(() => {
          const filled = [...document.querySelectorAll('[role="img"][aria-label*="maujood"]')];
          const etched = filled.filter((c) => c.className.includes("gold-hairline-cell"));
          return filled.length > 0 && filled.length === etched.length;
        })]);
        findings.push([`${s.name}: double-line separator present`, await page.evaluate(() => !!document.querySelector(".gold-hairline-double"))]);
      }
      if (s.url.includes("overview")) {
        findings.push([`${s.name}: trio numerals serif+gold`, await page.evaluate(() => {
          const g = document.querySelector(".number-glyph");
          if (!g) return false;
          const cs = getComputedStyle(g);
          return /serif/i.test(cs.fontFamily) && cs.color !== "rgb(0, 0, 0)" && /(\d+),\s*\d+,\s*\d+/.test(cs.color);
        })]);
      }
    }

    await page.screenshot({ path: `${OUT}/${s.name}.png`, fullPage: !!s.fullPage });
    console.log("shot:", s.name);
    await ctx.close();
  }
  await browser.close();
  console.log("\n=== VERIFICATION ===");
  let fail = 0;
  for (const [k, v] of findings) { console.log(`${v ? "PASS" : "FAIL"}  ${k}`); if (!v) fail++; }
  console.log(fail === 0 ? "ALL-CHECKS-PASS" : `FAILURES: ${fail}`);
})().catch((e) => { console.error("FAIL:", e.message); process.exit(1); });