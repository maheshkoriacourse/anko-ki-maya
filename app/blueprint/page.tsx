"use client";

/**
 * Anko Ki Maya v2 — LIFE BLUEPRINT REPORT
 * An 80-120 page-equivalent structured HTML report: gold-foil cover,
 * blueprint chapters, past-present-future narrative, life-area maps,
 * month-wise event-weather calendar, turning points, milestone alignment,
 * name optimization, lucky section, methodology + THE WHY asides throughout.
 * Print CSS makes it a PDF (browser print → save as PDF).
 */

import * as React from "react";
import { Printer, ArrowLeft, Sparkles } from "lucide-react";
import { Button, Badge } from "@/components/ui";
import { useProfile } from "@/components/seeded-profile";
import { useT } from "@/lib/lang";
import { t as rawT } from "@/lib/content";
import { assembleBlueprint, pinnacleNarrative, primaryRemedy } from "@/lib/blueprint";
import { meaningFor, DISCLAIMER, LIFE_AREA_PROMPT } from "@/lib/meanings";
import { numberContent, masterContent, zeroMasters, karmicDebtContent, karmicLessonContent, bridgeContent, hiddenPassionContent, balanceNote, rationalThoughtContent } from "@/lib/content";
import { LO_SHU_DIGIT_THEME } from "@/lib/loshu";
import { PLANET_FOR_NUMBER } from "@/lib/lucky";
import { GOLD_NOTE } from "@/lib/remedies";
import { isValidBirthDate, monthName } from "@/lib/numerology";
import { ReasoningBlock, DigitCell, PlaneBadge } from "@/components/loshu-kit";

/* ------------------------------------------------------------------ */
/* Small atoms                                                         */
/* ------------------------------------------------------------------ */

function Chapter({ id, num, title, children }: { id: string; num: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="avoid-break page-break-scroll space-y-4 py-8">
      <header className="flex items-baseline gap-4">
        <span aria-hidden className="font-serif-display text-5xl text-gold/40">{num}</span>
        <h2 id={`${id}-h`} className="font-display text-2xl font-semibold tracking-tight">{title}</h2>
      </header>
      <div className="gold-rule" />
      {children}
    </section>
  );
}

function Why({ title, steps, lang }: { title: string; steps: string[]; lang: "en" | "hi" }) {
  return <ReasoningBlock title={title} steps={steps} lang={lang} />;
}

function WhyAside({ children }: { children: React.ReactNode }) {
  return (
    <aside className="border-l-2 border-gold/50 bg-gold/5 px-4 py-3 font-serif-display text-sm italic text-muted-foreground">
      {children}
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function BlueprintPage() {
  const { profile, today, hasProfile } = useProfile();
  const { lang } = useT();
  const t = (key: string) => rawT(lang, key);

  const data = React.useMemo(() => {
    if (!profile) return null;
    const y = Number(profile.birthDate.slice(0, 4));
    const m = Number(profile.birthDate.slice(5, 7));
    const d = Number(profile.birthDate.slice(8, 10));
    if (!isValidBirthDate(y, m, d)) return null;
    try {
      return assembleBlueprint(profile.birthName, profile.preferredName, y, m, d, profile.system, today, lang);
    } catch {
      return null;
    }
  }, [profile, today, lang]);

  if (!hasProfile || !profile) {
    return <div className="py-16 text-center text-sm text-muted-foreground">No profile yet.</div>;
  }
  if (!data) {
    return <div className="py-16 text-center text-sm text-muted-foreground">Invalid birth date — fix it in Settings.</div>;
  }

  const { reading } = data;
  const isHi = lang === "hi";
  const nameDisplay = profile.preferredName || profile.birthName;
  const pn = pinnacleNarrative(data, lang);

  const coreNumbers = [
    { key: "lifePath", label: t("lifePath"), number: reading.lifePath.number, steps: reading.lifePath.steps },
    { key: "expression", label: t("expression"), number: reading.nameNumbers.expression, steps: reading.nameNumbers.expressionSteps },
    { key: "soulUrge", label: t("soulUrge"), number: reading.nameNumbers.soulUrge, steps: reading.nameNumbers.soulUrgeSteps },
    { key: "personality", label: t("personality"), number: reading.nameNumbers.personality, steps: reading.nameNumbers.personalitySteps },
    { key: "birthday", label: t("birthdayNumber"), number: reading.birthday.number, steps: reading.birthday.steps },
    { key: "maturity", label: t("maturity"), number: reading.maturity.number, steps: reading.maturity.steps },
  ];

  const rem = primaryRemedy(data);
  const birthContent = numberContent(data.reading.birthday.number, lang);

  return (
    <article className="print-full mx-auto max-w-3xl">
      {/* toolbar */}
      <div className="no-print mb-6 flex items-center justify-between">
        <a href="/overview" className="inline-flex items-center gap-1 text-sm text-primary underline underline-offset-4">
          <ArrowLeft aria-hidden className="size-4" /> {t("back")}
        </a>
        <Button onClick={() => window.print()}>
          <Printer aria-hidden /> {t("printPdf")}
        </Button>
      </div>

      {/* ---------------- COVER ---------------- */}
      <header className="glass constellation-bg aurora-wash relative overflow-hidden rounded-2xl px-6 py-16 text-center">
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">{t("appName")}</p>
          <h1 className="mt-4 font-display text-4xl font-bold gold-foil sm:text-6xl">
            {isHi ? "लाइफ़ ब्लूप्रिंट" : "Life Blueprint"}
          </h1>
          <p className="mt-2 font-serif-display text-xl italic text-muted-foreground">
            {isHi ? "आपके अंकों का संपूर्ण नक्शा" : "The complete map of your numbers"}
          </p>
          <div className="gold-rule mx-auto my-8 w-48" />
          <p className="font-display text-2xl">{nameDisplay}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {data.input.day} {monthName(data.input.month)} {data.input.year}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <Badge variant="gold">{t("lifePath")} {reading.lifePath.number}</Badge>
            {data.masterList.map((mn) => (
              <Badge key={mn} variant="gold">{t("masterBadge")} {mn}</Badge>
            ))}
            <Badge variant="secondary">{isHi ? "तिथि" : "Generated"} {today.toISOString().slice(0, 10)}</Badge>
          </div>
          <p className="mx-auto mt-8 max-w-md text-xs text-muted-foreground">{DISCLAIMER}</p>
        </div>
      </header>

      {/* ---------------- CH 1: THE CORE NUMBERS ---------------- */}
      <Chapter id="core" num="I" title={isHi ? "आपके मुख्य अंक" : "Your Core Numbers"}>
        <p className="text-sm text-muted-foreground">
          {isHi
            ? "छह मुख्य अंक आपके अंक-चार्ट की रीढ़ हैं। प्रत्येक के नीचे गणना-चरण भी दिए हैं — कुछ भी जादू नहीं, सब जोड़-घटाव है।"
            : "Six core numbers form the spine of your chart. The calculation steps sit beneath each — nothing hidden, everything arithmetic."}
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {coreNumbers.map((cn) => {
            const c = numberContent(cn.number, lang);
            return (
              <div key={cn.key} className="rounded-xl border p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{cn.label}</p>
                    <p className="mt-1 font-serif-display text-3xl text-primary dark:text-gold-bright">
                      {cn.number}
                      {cn.number > 9 ? <span className="text-sm text-gold"> /{cn.number === 11 ? 2 : cn.number === 22 ? 4 : 6}</span> : null}
                    </p>
                    <p className="text-xs font-medium text-gold">{c.title}</p>
                  </div>
                  {cn.number === 11 || cn.number === 22 || cn.number === 33 ? (
                    <Badge variant="gold">{t("masterBadge")}</Badge>
                  ) : null}
                </div>
                <p className="mt-2 text-sm">{c.essence}</p>
                <details className="mt-2">
                  <summary className="cursor-pointer text-xs font-medium text-primary">{t("whyThis")}</summary>
                  <ol className="mt-1 list-decimal space-y-0.5 pl-4 text-xs text-muted-foreground">
                    {cn.steps.map((s, i) => <li key={i}>{s}</li>)}
                  </ol>
                </details>
              </div>
            );
          })}
        </div>
        <Why title={t("coreNumbers")} steps={[...reading.lifePath.steps, ...reading.nameNumbers.expressionSteps]} lang={lang} />
      </Chapter>

      {/* ---------------- CH 2: MASTER NUMBERS ---------------- */}
      <Chapter id="masters" num="II" title={isHi ? "मास्टर अंक — 11, 22, 33" : "Master Numbers — 11, 22, 33"}>
        {data.hasMasters ? (
          <div className="space-y-5">
            {data.masterList.map((mn) => {
              const mc = masterContent(mn, lang);
              if (!mc) return null;
              return (
                <div key={mn} className="rounded-xl border border-gold/30 bg-gold/5 p-5">
                  <div className="flex items-center gap-3">
                    <span aria-hidden className="number-glyph mandala-ring grid size-16 place-items-center rounded-full text-3xl text-gold">{mn}</span>
                    <div>
                      <p className="font-display text-lg font-semibold">{mc.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {mn}/{mn === 11 ? 2 : mn === 22 ? 4 : 6} — {t("dualNotation")}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm">{mc.essence}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{mc.gift}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed p-6 text-center">
            <p className="font-serif-display text-lg italic text-gold">{isHi ? "कोई मास्टर अंक नहीं — और यह पूर्णतः मान्य है" : "No master numbers — and that is fully valid"}</p>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">{zeroMasters(lang)}</p>
          </div>
        )}
      </Chapter>

      {/* ---------------- CH 3: PERSONAL-YEAR ESSAY (present) ---------------- */}
      <Chapter id="present-year" num="III" title={isHi ? "वर्तमान: व्यक्तिगत वर्ष " + data.py : "The Present: Your Personal Year " + data.py}>
        <div className="flex items-center gap-4">
          <span aria-hidden className="number-glyph mandala-ring grid size-20 place-items-center rounded-full text-4xl text-gold">{data.py}</span>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{t("personalYear")} {today.getFullYear()}</p>
            <p className="font-display text-lg font-semibold">{numberContent(data.py === 11 ? 2 : data.py, lang).title}</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed">{numberContent(data.py === 11 ? 2 : data.py, lang).essay}</p>
        <WhyAside>
          {isHi
            ? `गणना: जन्म-मास + जन्म-दिन + चालू वर्ष, सब अलग-अलग न्यूनीकृत, फिर योग न्यूनीकृत। 9-वर्षीय चक्र का यह वर्ष है।`
            : `Calculation: birth month + birth day + current year, each reduced separately, then the sum reduced. This is one year of the 9-year cycle.`}
        </WhyAside>
        <Why title={t("personalYear")} steps={personalYearSteps(data.input.month, data.input.day, today.getFullYear())} lang={lang} />
      </Chapter>

      {/* ---------------- CH 4: PAST–PRESENT–FUTURE ---------------- */}
      <Chapter id="narrative" num="IV" title={isHi ? "अतीत — वर्तमान — भविष्य" : "Past — Present — Future"}>
        <div className="space-y-4">
          <div className="rounded-xl border p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">{isHi ? "अतीत" : "Past"}</p>
            <p className="mt-1.5 text-sm text-muted-foreground">{pn.past}</p>
          </div>
          <div className="rounded-xl border border-gold/30 bg-gold/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">{isHi ? "वर्तमान" : "Present"}</p>
            <p className="mt-1.5 text-sm text-muted-foreground">{pn.present}</p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">{isHi ? "भविष्य" : "Future"}</p>
            <p className="mt-1.5 text-sm text-muted-foreground">{pn.future}</p>
          </div>
        </div>
        <Why title={isHi ? "शिखर-अंक" : "Pinnacles"} steps={reading.pinnacleSteps} lang={lang} />
      </Chapter>

      {/* ---------------- CH 5: LO SHU GRID ---------------- */}
      <Chapter id="loshu" num="V" title={t("navLoShu")}>
        <div className="mx-auto grid max-w-xs grid-cols-3 gap-2">
          {data.loShu.grid.flat().map((cell) => (
            <DigitCell key={cell.digit} digit={cell.digit} count={cell.count} lang={lang} />
          ))}
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {data.loShu.planes.map((p) => (
            <div key={p.key} className="rounded-lg border p-3">
              <p className="flex items-center justify-between text-sm font-medium">{p.name} <PlaneBadge complete={p.complete} lang={lang} /></p>
              <p className="mt-1 text-xs text-muted-foreground">{p.note}</p>
            </div>
          ))}
        </div>
        {data.yogas.yogas.length > 0 ? (
          <div className="grid gap-3 md:grid-cols-2">
            {data.yogas.yogas.map((yg) => (
              <div key={yg.id} className="rounded-lg border p-3">
                <p className="text-sm font-medium">{isHi ? yg.titleHi : yg.titleEn}</p>
                <p className="mt-1 text-xs text-muted-foreground">{isHi ? yg.noteHi : yg.noteEn}</p>
              </div>
            ))}
          </div>
        ) : null}
        <ul className="list-disc space-y-1 pl-5 text-xs text-muted-foreground">
          {data.loShu.missingNotes.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
        <Why title={t("navLoShu")} steps={data.loShu.steps} lang={lang} />
      </Chapter>

      {/* ---------------- CH 6: KARMIC LAYER ---------------- */}
      <Chapter id="karmic" num="VI" title={isHi ? "कर्मिक परत" : "The Karmic Layer"}>
        {/* Debts */}
        <h3 className="font-display text-base font-semibold">{t("karmicDebt")}</h3>
        {data.karmic.debts.hits.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {isHi ? "मुख्य स्थितियों में 13/14/16/19 का कोई चिह्न नहीं — ऋण-परत निष्क्रिय।" : "No 13/14/16/19 mark in the core positions — the debt layer is quiet."}
          </p>
        ) : (
          data.karmic.debts.hits.map((hit, i) => {
            const kd = karmicDebtContent(hit.number, lang);
            return (
              <div key={i} className="rounded-xl border border-gold/30 p-4">
                <p className="text-xs uppercase tracking-wide text-gold">{hit.where}</p>
                {kd ? <p className="mt-1 font-display text-base font-semibold">{kd.title}</p> : null}
                {kd ? <p className="mt-1.5 text-sm text-muted-foreground">{kd.theme}</p> : null}
              </div>
            );
          })
        )}
        {/* Lessons */}
        <h3 className="mt-6 font-display text-base font-semibold">{t("karmicLessons")}</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {data.karmic.lessons.missing.map((dg) => (
            <div key={dg} className="rounded-lg border p-3.5">
              <p className="text-sm font-medium">
                {isHi ? `अंक ${dg} अनुपस्थित` : `Missing ${dg}`} — {LO_SHU_DIGIT_THEME[dg]}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{karmicLessonContent(dg, lang)}</p>
            </div>
          ))}
          {data.karmic.lessons.missing.length === 0 ? (
            <p className="text-sm text-muted-foreground">{isHi ? "नाम में सभी 1-9 अंक विद्यमान।" : "All digits 1-9 present in the name."}</p>
          ) : null}
        </div>
        {/* Hidden passion + balance */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border p-3.5">
            <p className="text-sm font-medium">{t("hiddenPassion")}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {data.karmic.passion.digits.map((dg) => hiddenPassionContent(dg, lang)).join(" ")}
            </p>
          </div>
          <div className="rounded-lg border p-3.5">
            <p className="text-sm font-medium">{t("balanceNumber")} · {data.karmic.balance.number}</p>
            <p className="mt-1 text-xs text-muted-foreground">{balanceNote(lang)}</p>
          </div>
        </div>
        {/* Cornerstone */}
        <div className="mt-3 rounded-lg border p-3.5">
          <p className="text-sm font-medium">{t("cornerstone")}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {isHi
              ? `पहला अक्षर ${data.karmic.cornerstone.cornerstone ?? "—"} (${data.karmic.cornerstone.cornerstoneValue}), पहला स्वर ${data.karmic.cornerstone.firstVowel ?? "—"} (${data.karmic.cornerstone.firstVowelValue})। परंपरा इन्हें बाहरी-स्वरूप की द्वार-शिलाएँ पढ़ती है।`
              : `First letter ${data.karmic.cornerstone.cornerstone ?? "—"} (${data.karmic.cornerstone.cornerstoneValue}), first vowel ${data.karmic.cornerstone.firstVowel ?? "—"} (${data.karmic.cornerstone.firstVowelValue}). Tradition reads these as the doorway stones of the outer self.`}
          </p>
        </div>
        {/* Bridges */}
        <h3 className="mt-6 font-display text-base font-semibold">{t("bridges")}</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {data.karmic.bridges.bridges.map((b) => (
            <div key={b.key} className="rounded-lg border p-3.5">
              <p className="text-sm font-medium">Bridge {b.reduced}</p>
              <p className="text-xs text-muted-foreground">|{b.a} − {b.b}| = {b.gap}</p>
              <p className="mt-1 text-xs text-muted-foreground">{bridgeContent(b.reduced, lang)}</p>
            </div>
          ))}
        </div>
        {/* Rational thought */}
        <div className="mt-3 rounded-lg border p-3.5">
          <p className="text-sm font-medium">{t("rationalThought")} · {data.karmic.rational.number}</p>
          <p className="mt-1 text-xs text-muted-foreground">{rationalThoughtContent(data.karmic.rational.number, lang)}</p>
        </div>
        <Why title={t("karmicDebt")} steps={data.karmic.debts.steps} lang={lang} />
      </Chapter>

      {/* ---------------- CH 7: MONTH-WEATHER CALENDAR ---------------- */}
      <Chapter id="weather" num="VII" title={t("monthWeather")}>
        <p className="text-sm text-muted-foreground">
          {isHi
            ? "12 महीनों का मौसम-मानचित्र: तीव्रता /10, निर्णय-रेखा, श्रेष्ठ तिथियाँ और सावधानी-पंक्तियाँ (साथ में परंपरागत उपाय)।"
            : "A 12-month weather map: intensity /10, verdict line, best dates and caution rows (each with its traditional remedy beside it)."}
        </p>
        <div className="space-y-3">
          {data.weather.months.map((mo) => (
            <div key={`${mo.year}-${mo.month}`} className={`rounded-xl border p-4 ${mo.turningPoint ? "border-gold/50 bg-gold/5" : ""}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-display text-base font-semibold">
                  {mo.label} · PM{mo.personalMonth}
                  {mo.turningPoint ? <Badge variant="gold" className="ml-2">{t("turningPoints")}</Badge> : null}
                </p>
                <p className="text-xs font-medium text-gold">{t("intensity")} {mo.intensity}/10 — {isHi ? mo.verdictHi : mo.verdict}</p>
              </div>
              {/* intensity bar */}
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-gradient-to-r from-gold/60 to-gold" style={{ width: `${mo.intensity * 10}%` }} />
              </div>
              <p className="mt-2 text-sm">{isHi ? mo.narrativeHi : mo.narrative}</p>
              {mo.bestDates.length > 0 ? (
                <p className="mt-2 text-xs text-muted-foreground">
                  <span className="font-medium text-gold">{t("bestDates")}: </span>
                  {mo.bestDates.map((bd) => `${bd.day} (${bd.omenTitle})`).join(" · ")}
                </p>
              ) : null}
              {mo.warning ? (
                <div className="mt-2 rounded-lg border-l-2 border-destructive/60 bg-destructive/5 px-3 py-2">
                  <p className="text-xs text-muted-foreground">⚠ {isHi ? mo.warningHi : mo.warning}</p>
                  <p className="mt-1 font-devanagari text-xs text-gold">{mo.remedyLine}</p>
                </div>
              ) : null}
              {mo.turningPoint && mo.turningPointWhy ? (
                <p className="mt-2 font-serif-display text-xs italic text-gold">↻ {mo.turningPointWhy}</p>
              ) : null}
            </div>
          ))}
        </div>
        <Why title={t("monthWeather")} steps={data.weather.steps} lang={lang} />
      </Chapter>

      {/* ---------------- CH 8: TURNING POINTS ---------------- */}
      <Chapter id="turning" num="VIII" title={t("turningPoints")}>
        <div className="space-y-4">
          {data.weather.turningPoints.map((tp, i) => (
            <div key={i} className="rounded-xl border border-gold/40 bg-gold/5 p-5">
              <p className="font-display text-lg font-semibold">{tp.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{tp.turningPointWhy}</p>
            </div>
          ))}
        </div>
      </Chapter>

      {/* ---------------- CH 9: LIFE-AREA MAPS ---------------- */}
      <Chapter id="areas" num="IX" title={isHi ? "जीवन-क्षेत्र मानचित्र" : "Life-Area Maps"}>
        <div className="grid gap-4 sm:grid-cols-2">
          {Object.entries(LIFE_AREA_PROMPT).map(([area, prompt]) => {
            const areaDigit = ((data.py + area.length) % 9) || 9;
            const ac = numberContent(areaDigit, lang);
            return (
              <div key={area} className="rounded-xl border p-4">
                <p className="font-display text-base font-semibold">{area}</p>
                <p className="mt-1 text-xs text-gold">{ac.title} · {t("intensity")} {5 + (areaDigit % 4)}/10</p>
                <p className="mt-2 text-sm text-muted-foreground">{ac.essence}</p>
                <p className="mt-2 font-serif-display text-sm italic">{prompt}</p>
              </div>
            );
          })}
        </div>
      </Chapter>

      {/* ---------------- CH 10: NAME OPTIMIZATION ---------------- */}
      <Chapter id="name" num="X" title={t("navNameStudio")}>
        <div className="rounded-xl border p-4">
          <p className="text-sm">
            <span className="font-medium">{profile.birthName}</span>
            <span className={`ml-2 font-display text-2xl ${data.nameStudio.current.score >= 70 ? "text-emerald-500" : data.nameStudio.current.score >= 45 ? "text-gold" : "text-destructive"}`}>
              {data.nameStudio.current.score}/100
            </span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {t("navNameStudio")} — {data.nameStudio.current.omen.title} (compound {data.nameStudio.current.compound})
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{data.nameStudio.current.omen.meaning}</p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {data.nameStudio.suggestions.map((s) => (
            <div key={s.spelling} className="rounded-lg border p-3.5">
              <p className="font-serif-display text-xl">{s.spelling}</p>
              <p className="font-display text-xl text-gold">{s.score}/100</p>
              <p className="text-xs text-muted-foreground">{s.omenTitle} · {s.total}</p>
            </div>
          ))}
        </div>
        <Why title={t("navNameStudio")} steps={data.nameStudio.steps} lang={lang} />
      </Chapter>

      {/* ---------------- CH 11: LUCKY SECTION ---------------- */}
      <Chapter id="lucky" num="XI" title={t("navLucky")}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border p-4">
            <p className="text-sm font-medium">{t("luckyNumbers")}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {data.lucky.numbers.map((n) => (
                <span key={n} aria-hidden className="number-glyph mandala-ring grid size-10 place-items-center rounded-full text-lg text-gold">{n}</span>
              ))}
            </div>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-sm font-medium">{t("luckyDays")}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {data.lucky.days.map((d2) => <Badge key={d2} variant="secondary">{d2}</Badge>)}
            </div>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-sm font-medium">{t("luckyColors")}</p>
            <p className="mt-2 text-sm text-muted-foreground">{data.lucky.colors.map((c) => (isHi ? c.hi : c.en)).join(" · ")}</p>
          </div>
          <div className="rounded-xl border p-4">
            <p className="text-sm font-medium">{t("luckyGems")}</p>
            <p className="mt-2 text-sm text-muted-foreground">{data.lucky.gems.map((g) => (isHi ? g.hi : g.en)).join(" · ")}</p>
          </div>
        </div>
      </Chapter>

      {/* ---------------- CH 12: REMEDIES ---------------- */}
      <Chapter id="remedies" num="XII" title={t("remedies")}>
        <p className="text-xs text-muted-foreground">{t("remedyDisclaimer")}</p>
        <div className="rounded-xl border border-gold/30 bg-gold/5 p-5">
          <p className="text-sm font-medium">{isHi ? `अंक ${rem.number} — ${rem.planetKey}` : `Number ${rem.number} — ${PLANET_FOR_NUMBER[rem.number]}`}</p>
          <p className="mt-2 font-devanagari text-lg text-gold">{rem.mantra}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {t("japaCount")}: {rem.japa} × {rem.japaSets} · {t("worshipDay")}: {rem.worshipDay} · {t("yantra")}: <span className="font-devanagari">{rem.yantra}</span>
          </p>
          <p className="mt-2 text-xs">
            <span className="font-medium">{t("daan")}: </span>
            <span className="font-devanagari">{rem.daan.join(" · ")}</span>
          </p>
          <p className="mt-3 font-devanagari text-xs text-muted-foreground">{GOLD_NOTE}</p>
        </div>
      </Chapter>

      {/* ---------------- CH 13: MILESTONE ALIGNMENT ---------------- */}
      <Chapter id="milestones" num="XIII" title={isHi ? "मील-पत्थर संरेखण" : "Milestone Alignment"}>
        <p className="text-sm text-muted-foreground">
          {isHi
            ? "आपकी जीवन-घटनाएँ (जो आपने जर्नल/लाइफ़-इवेंट्स में दर्ज कीं) आपके चक्रों से कहाँ मिलती हैं:"
            : "Where your recorded life events (from the Life Events graph) meet your cycles:"}
        </p>
        {data.events ? (
          <>
            <p className="text-sm">{data.events.summary}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {data.events.resonances.slice(0, 4).map((r) => (
                <div key={r.personalYear} className="rounded-lg border p-3.5">
                  <p className="text-sm font-medium">PY{r.personalYear} · {r.events.length} {isHi ? "घटनाएँ" : "events"} · {r.averageImpact.toFixed(1)}/10</p>
                  <p className="mt-1 text-xs text-muted-foreground">{r.observation}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
            {isHi ? "अभी कोई घटना दर्ज नहीं — लाइफ़-इवेंट्स ग्राफ़ में 3-4 घटनाएँ जोड़ें।" : "No events recorded yet — add 3-4 in the Life Events graph."}
          </p>
        )}
      </Chapter>

      {/* ---------------- CH 14: METHODOLOGY ---------------- */}
      <Chapter id="methodology" num="XIV" title={t("methodology")}>
        <p className="text-sm leading-relaxed">
          {isHi
            ? "यह रिपोर्ट आपकी अपनी संख्याओं से पढ़ाई करती है। जन्मतिथि के अंकों का योग मूलांक बनाता है — उदाहरण के लिए आपकी तिथि: "
            : "This report teaches with your own numbers. The digits of your birth date sum to the Life Path — for your date: "}
          <span className="font-medium text-gold">
            {data.input.day}/{data.input.month}/{data.input.year} → {reading.lifePath.steps[4] ?? reading.lifePath.compound}
          </span>
          {isHi
            ? "। नाम के अक्षरों को संख्या-मान मिलते हैं — योग से अभिव्यक्ति-अंक। लो शु ग्रिड तिथि के अंकों को 3×3 वर्ग में बिठाता है। व्यक्तिगत वर्ष = जन्म-मास + जन्म-दिन + चालू वर्ष (न्यूनीकृत)। प्रत्येक अध्याय के साथ 'यह क्यों कहा' ब्लॉक गणना दिखाता है — पारदर्शिता ही विश्वास की नींव है।"
            : ". Name letters carry numeric values — their sums give the Expression number. The Lo Shu grid seats the date's digits in a 3×3 square. Personal Year = birth month + birth day + current year (reduced). Every chapter's 'THE WHY' block shows its arithmetic — transparency is the foundation of trust."}
        </p>
        <WhyAside>
          {isHi
            ? "परंपरा कहती है: 'हर पुरुष एक संख्या है।' हम कहते हैं: हर संख्या एक दर्पण है — देखने के लिए, भविष्य लिखने के लिए नहीं।"
            : "Tradition says 'Every man is a Number.' We say: every number is a mirror — for looking, not for writing fate."}
        </WhyAside>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
          <li>{isHi ? "मूलांक: जन्म-मास + दिन + वर्ष, अलग-अलग और फिर योग, 11/22/33 धारित।" : "Life Path: birth month + day + year reduced separately then summed; masters 11/22/33 preserved."}</li>
          <li>{isHi ? "अभिव्यक्ति/आत्म/व्यक्तित्व: पूरे नाम के अक्षर-मान (स्वर/व्यंजन अलग)।" : "Expression/Soul/Personality: letter values of the full name (vowels/consonants split)."}</li>
          <li>{isHi ? "लो शु: तिथि के अंक 4-9-2 / 3-5-7 / 8-1-6 कक्षों में गिने जाते हैं।" : "Lo Shu: date digits counted into the 4-9-2 / 3-5-7 / 8-1-6 cells."}</li>
          <li>{isHi ? "व्यक्तिगत वर्ष/मास/दिन: संचयी योग, हर स्तर पर न्यूनीकृत।" : "Personal Year/Month/Day: cumulative sums reduced at each level."}</li>
          <li>{isHi ? "कैल्डियन नाम-स्कोर: अक्षर-योग → कंपाउंड (1-52) → शुभ-संकेत + मूलांक-तालमेल।" : "Chaldean name score: letter sum → compound (1-52) → omen + Life Path harmony."}</li>
        </ol>
      </Chapter>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="mt-10 border-t border-gold/30 pt-6 pb-10 text-center">
        <Sparkles aria-hidden className="mx-auto size-5 text-gold" />
        <p className="mt-3 font-serif-display text-lg italic">{t("appName")} — {t("tagline")}</p>
        <p className="mx-auto mt-2 max-w-md text-xs text-muted-foreground">{DISCLAIMER}</p>
        <p className="mt-4 text-xs text-muted-foreground">
          {isHi
            ? "यह रिपोर्ट आपके ब्राउज़र में ही बनी — कोई सर्वर, कोई भंडारण नहीं।"
            : "This report was generated in your browser — no server, no storage."}
        </p>
      </footer>
    </article>
  );
}

function personalYearSteps(m: number, d: number, year: number): string[] {
  return [
    `Birth month ${m} + birth day ${d} + current year ${year}`,
    `Each reduced separately, then the sum reduced (masters preserved)`,
  ];
}