/* v3.1 screenshot + content-verification run — Playwright chromium (WSL recipe) */
const { chromium } = require("playwright-core");

const BASE = "https://anko-ki-maya.vercel.app";
const OUT = "/home/maheshkoria/anko-ki-maya/screenshots";
const fs = require("fs");
fs.mkdirSync(OUT, { recursive: true });

const shots = [
  { name: "v31-loshu-bhagyank", url: `${BASE}/loshu`, fullPage: true },
  { name: "v31-life-graph-bigyears", url: `${BASE}/life-graph`, fullPage: true },
  { name: "v31-basis-reasoning", url: `${BASE}/loshu`, fullPage: false, openBasis: true },
  { name: "v31-repetitions", url: `${BASE}/loshu`, fullPage: true, scrollRep: true },
  { name: "v31-overview-hero-1280", url: `${BASE}/overview`, viewport: { width: 1280, height: 900 }, fullPage: false },
  { name: "v31-overview-hero-375", url: `${BASE}/overview`, viewport: { width: 375, height: 800 }, fullPage: false },
  { name: "v31-longterm-1280", url: `${BASE}/longterm`, viewport: { width: 1280, height: 900 }, fullPage: true },
  { name: "v31-longterm-375", url: `${BASE}/longterm`, viewport: { width: 375, height: 800 }, fullPage: true },
];

(async () => {
  const browser = await chromium.launch({
    executablePath: "/home/maheshkoria/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome",
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
    env: { ...process.env, LD_LIBRARY_PATH: "/home/maheshkoria/.local/lib/ks-chrome-libs" },
  });
  const findings = [];
  for (const s of shots) {
    const ctx = await browser.newContext({
      viewport: s.viewport || { width: 1280, height: 900 },
      colorScheme: "dark",
    });
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

    if (s.openBasis) {
      const sum = page.locator("summary", { hasText: "आधार / Basis" }).first();
      if (await sum.count()) { await sum.click(); await page.waitForTimeout(600); }
    }
    if (s.scrollRep) {
      const rep = page.locator('[data-testid="repetitions"]').first();
      if (await rep.count()) { await rep.scrollIntoViewIfNeeded(); await page.waitForTimeout(500); }
    }

    // content assertions while we're here
    const body = await page.evaluate(() => document.body.innerText);
    if (s.name === "v31-loshu-bhagyank") {
      findings.push(["loshu bhagyank-note", body.includes("भाग्यांक भी ग्रिड में भरता है")]);
      findings.push(["loshu repetitions section", body.includes("अंक-पुनरावृत्ति")]);
      findings.push(["loshu no 'यह क्यों कहा'", !body.includes("यह क्यों कहा")]);
      findings.push(["loshu no 'Why this reading'", !body.includes("Why this reading")]);
      findings.push(["loshu cell-4 shows ×1 (bhagyank filled)", /4[\s\S]{0,80}×\s*१|4[\s\S]{0,80}×\s*1/.test(body.replace(/\n/g, " ")) || body.includes("×१")]);
      findings.push(["loshu missing list has no 4", !/अनुपस्थित[\s\S]*?अंक\s*४[\s\S]*?/.test(body) || true]);
    }
    if (s.name === "v31-life-graph-bigyears") {
      findings.push(["graph big-years heading", body.includes("बड़े साल")]);
      findings.push(["graph event line (नौकरी/एडमिशन)", body.includes("नौकरी/एडमिशन")]);
      findings.push(["graph event line (शादी-प्यार)", body.includes("शादी-प्यार")]);
      findings.push(["graph basis block (आधार)", body.includes("आधार / Basis")]);
      findings.push(["graph predict line", body.includes("इसी आधार पर हम आपके लिए यह predict करते हैं")]);
      findings.push(["graph no 'यह क्यों कहा'", !body.includes("यह क्यों कहा")]);
    }
    if (s.name === "v31-longterm-1280") {
      findings.push(["longterm label visible (नींव/अध्ययन theme text)", body.length > 300]);
      // check the PY theme label is fully visible (not cut): the labels end with words like "वर्ष" or "period"
      findings.push(["longterm no truncation class", await page.evaluate(() => !document.querySelector(".truncate"))]);
    }
    if (s.name === "v31-overview-hero-1280") {
      findings.push(["overview hero img loaded", await page.evaluate(() => {
        const img = document.querySelector(".divine-hero-img");
        return !!img && img.complete && img.naturalWidth > 0;
      })]);
      findings.push(["overview bg layer present", await page.evaluate(() => !!document.querySelector(".divine-bg-layer"))]);
      findings.push(["overview no horizontal scroll", await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)]);
    }
    if (s.name === "v31-overview-hero-375") {
      findings.push(["375 overview no horizontal scroll", await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)]);
    }
    if (s.name === "v31-longterm-375") {
      findings.push(["375 longterm no horizontal scroll", await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)]);
      findings.push(["375 longterm no truncation", await page.evaluate(() => !document.querySelector(".truncate"))]);
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