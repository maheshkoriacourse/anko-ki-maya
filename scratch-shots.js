/* v3 screenshot run — Playwright chromium (WSL recipe) */
const { chromium } = require("playwright-core");

const BASE = "https://anko-ki-maya.vercel.app";
const OUT = "/home/maheshkoria/anko-ki-maya/screenshots";
const fs = require("fs");
fs.mkdirSync(OUT, { recursive: true });

const shots = [
  { name: "v3-dashboard-dark", url: `${BASE}/overview`, scheme: "dark", before: "seed" },
  { name: "v3-dashboard-light", url: `${BASE}/overview`, scheme: "light", before: "seed" },
  { name: "v3-loshu-planes", url: `${BASE}/loshu`, scheme: "dark", before: "seed" },
  { name: "v3-life-graph", url: `${BASE}/life-graph`, scheme: "dark", before: "mark", fullPage: true },
  { name: "v3-report-ch1-hi", url: `${BASE}/blueprint`, scheme: "dark", before: "hi", fullPage: false },
  { name: "v3-report-ch1-en", url: `${BASE}/blueprint`, scheme: "light", before: "en" },
  { name: "v3-lucky-remedies", url: `${BASE}/lucky`, scheme: "dark", before: "seed", fullPage: true },
  { name: "v3-concierge", url: `${BASE}/`, scheme: "dark", before: "concierge" },
];

(async () => {
  const browser = await chromium.launch({
    executablePath: "/home/maheshkoria/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome",
    args: ["--no-sandbox", "--disable-dev-shm-usage"], env: { ...process.env, LD_LIBRARY_PATH: "/home/maheshkoria/.local/lib/ks-chrome-libs" },
  });
  for (const s of shots) {
    const ctx = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      colorScheme: s.scheme,
    });
    const page = await ctx.newPage();
    // seed demo profile + Hindi default via localStorage before load
    await page.addInitScript(() => {
      window.localStorage.setItem("akm.v1.profile", JSON.stringify({
        birthName: "Aarav Mehta", preferredName: "Aarav", birthDate: "1990-06-15",
        birthTime: "", birthplace: "", system: "pythagorean",
      }));
      window.localStorage.setItem("akm.lang", "hi");
    });
    await page.goto(s.url, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(1600);

    // per-shot interactions
    if (s.before === "seed") {
      // nothing more
    } else if (s.before === "hi") {
      // default already HI
    } else if (s.before === "en") {
      const enBtn = page.locator('button:has-text("EN")').first();
      if (await enBtn.count()) { await enBtn.click(); await page.waitForTimeout(900); }
    } else if (s.before === "concierge") {
      const el = page.locator("#concierge, [id*=concierge]").first();
      if (await el.count()) { await el.scrollIntoViewIfNeeded(); await page.waitForTimeout(600); }
    }

    await page.screenshot({ path: `${OUT}/${s.name}.png`, fullPage: !!s.fullPage });
    console.log("shot:", s.name);
    await ctx.close();
  }
  await browser.close();
  console.log("DONE");
})().catch((e) => { console.error("FAIL:", e.message); process.exit(1); });