"use client";

/**
 * ANKO KI MAYA v3 — LIFE BLUEPRINT REPORT (owner-mandated order):
 * Ch.1 Abhi Ka Haal (current dasha) → Ch.2 past year-by-year →
 * Ch.3 future (6-month weather + 3y + 9y map) → Ch.4 ten life-area
 * chapters (hook-first: past → now → window-years → remedy, truth-telling)
 * → Ch.5 blueprint numbers (Mulank/Bhagyank/Namank essays + karmic +
 * planes) → remedies (mantra/yantra/daan) → lucky list → name studio.
 */

import * as React from "react";
import Link from "next/link";
import {
  Card, CardContent, CardHeader, CardTitle, Badge, Button,
} from "@/components/ui";
import {
  PageHeader, EmptyState, LoadingCards, SanatanDivider, DiyaMotif, YantraMotif, DisclaimerLine,
} from "@/components/shared";
import { useProfile } from "@/components/seeded-profile";
import { useT } from "@/lib/lang";
import { t as rawT } from "@/lib/content";
import {
  buildLifeAreaReport, hasConcreteYears, type AreaSection,
} from "@/lib/life-areas";
import { chartTruth, truthForYear } from "@/lib/truth";
import { buildLifeGraph, patternNote, type YearMark } from "@/lib/life-graph";
import { loadYearMarks } from "@/lib/marks-storage";
import { ANK_DASHA_YEAR, ANK_DASHA_MONTH, mulankBhagyankState } from "@/lib/voice";
import { personalYear, personalMonth, monthName, upcomingMonths, pinnacles, type MonthCycle } from "@/lib/numerology";
import { grahaFor, devNum, planetRelation, RELATION_LABEL } from "@/lib/navgrah";
import { karmicDebts, type KarmicDebtHit } from "@/lib/karmic";
import { detectRajyogas } from "@/lib/rajyoga";
import { remedyForNumber } from "@/lib/remedies";
import { luckyProfile } from "@/lib/lucky";
import { reduce } from "@/lib/numerology";
import { scoreName } from "@/lib/name-studio";
import { loShuGrid } from "@/lib/loshu";
import { analyzeRepetitions } from "@/lib/repetitions";
import { ReasoningBlock } from "@/components/loshu-kit";

function sectionAnchor(id: string): string {
  return id.replace(/[^a-z0-9-]/g, "-");
}

export default function BlueprintReportPage() {
  const { profile, reading, hasProfile } = useProfile();
  const { lang } = useT();
  const t = (key: string) => rawT(lang, key);
  const hi = lang === "hi";
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => setReady(true), []);

  const [areaReport, setAreaReport] = React.useState<ReturnType<typeof buildLifeAreaReport> | null>(null);
  const [graph, setGraph] = React.useState<ReturnType<typeof buildLifeGraph> | null>(null);
  const [marks, setMarks] = React.useState<YearMark[]>([]);

  React.useEffect(() => {
    if (!profile || !reading) return;
    const yy = Number(profile.birthDate.slice(0, 4));
    const mm = Number(profile.birthDate.slice(5, 7));
    const dd = Number(profile.birthDate.slice(8, 10));
    setGraph(buildLifeGraph(yy, mm, dd, new Date().getFullYear(), reading.pinnacles, {
      mulank: reading.birthday.number,
      bhagyank: reading.lifePath.number,
    }));
    setMarks(loadYearMarks(profile.birthDate));
    setAreaReport(buildLifeAreaReport({
      birthYear: yy,
      birthMonth: mm,
      birthDay: dd,
      mulank: reading.birthday.number,
      bhagyank: reading.lifePath.number,
      pinnacles: reading.pinnacles,
      nowYear: new Date().getFullYear(),
    }));
  }, [profile, reading, lang]);

  if (!ready) return <LoadingCards count={5} label="Loading report" />;

  if (!hasProfile || !profile || !reading || !graph || !areaReport) {
    return (
      <EmptyState
        title={hi ? "पहले जन्म-विवरण दीजिए" : "No profile yet"}
        body={hi ? "रिपोर्ट जन्म-तिथि से गणित होती है — पहले विवरण दीजिए।" : "The report is computed from the birth date — give details first."}
        action={<Link href="/" className="text-sm text-primary underline">{hi ? "शुरू करें" : "Start"}</Link>}
      />
    );
  }

  const y = Number(profile.birthDate.slice(0, 4));
  const m = Number(profile.birthDate.slice(5, 7));
  const d = Number(profile.birthDate.slice(8, 10));
  const nowYear = new Date().getFullYear();
  const nowMonth = new Date().getMonth() + 1;
  const mulank = reading.birthday.number;
  const bhagyank = reading.lifePath.number;
  const curPy = personalYear(m, d, nowYear).number;
  const curPm = personalMonth(curPy, nowMonth).number;
  const state = mulankBhagyankState(mulank, bhagyank, curPy, lang);
  const dashaYear = ANK_DASHA_YEAR[curPy] ?? ANK_DASHA_YEAR[1];
  const dashaMonth = ANK_DASHA_MONTH[curPm] ?? ANK_DASHA_MONTH[1];
  const gMul = grahaFor(mulank);
  const gBhag = grahaFor(bhagyank);

  const nameScore = scoreName(profile.birthName, {
    lifePath: bhagyank,
    birthNumber: mulank,
    system: profile.system,
  });
  const lpCompound = reduce(
    profile.birthName.split("").reduce((s, ch) => s + 0, y + m + d),
  );
  void lpCompound;

  const karmHits = karmicDebts({
    lifePathCompoundSum: bhagyank,
    expressionTotal: reading.nameNumbers.expression,
    soulTotal: reading.nameNumbers.soulUrge,
    personalityTotal: reading.nameNumbers.personality,
    birthDay: d,
    maturitySum: reading.maturity.number,
  });
  const chart = loShuGrid(y, m, d);
  const reps = analyzeRepetitions(y, m, d, mulank, bhagyank);

  const truthCtx = {
    mulank,
    bhagyank,
    py: curPy,
    karmicDebts: karmHits.hits.map((h) => h.number),
    missingDigits: chart.missing,
    tensePairs: [] as [number, number][],
    nowYear,
    birthYear: y,
  };
  const truth = chartTruth(truthCtx);

  const rajyogas = detectRajyogas(y, m, d, profile.birthName);
  const remedy = remedyForNumber(mulank).remedy;
  const lucky = luckyProfile(d, bhagyank, reduce);

  const months: MonthCycle[] = upcomingMonths(m, d, nowYear, nowMonth, 6);
  const pn = patternNote(marks, graph.past);

  const future3 = graph.future.slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <PageHeader
        title={t("navBlueprint")}
        subtitle={hi
          ? `जन्म ${devNum(d)}-${devNum(m)}-${devNum(y)} · वाचन ${hi ? "हिंदी" : "EN"} · ${devNum(areaReport.sections.length)} जीवन-क्षेत्र`
          : `Born ${d}-${m}-${y} · reading in ${lang.toUpperCase()} · ${areaReport.sections.length} life areas`}
        actions={
          <div className="print:hidden flex gap-2">
            <Button onClick={() => window.print()} variant="outline" size="sm">🖨 {t("print")}</Button>
          </div>
        }
      />

      {/* ============ CHAPTER 1: ABHI KA HAAL ============ */}
      <section aria-labelledby="ch1" id="ch1-abhi-ka-haal">
        <div className="flex items-center gap-3">
          <DiyaMotif className="size-6 text-kesari" />
          <h2 id="ch1" className="font-display text-2xl font-semibold">
            {hi ? "पहला अध्याय — अभी का हाल" : "Chapter 1 — Abhi Ka Haal (Your present state)"}
          </h2>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {hi
            ? "रिपोर्ट यहीं से शुरू होती है: आप इस वक़्त कहाँ खड़े हैं, आपकी ज़िंदगी में इस समय क्या चल रहा है।"
            : "The report opens here: where you stand at this moment and what is running through your life right now."}
        </p>

        <Card className="glass yantra-bg mt-4">
          <CardHeader>
            <CardTitle>
              {hi
                ? `अंक दशा ${devNum(curPy)} (${grahaFor(curPy).grahaHi}) — ${dashaYear.nameHi}`
                : `Ank Dasha ${curPy} (${grahaFor(curPy).graha}) — ${dashaYear.name}`}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm leading-relaxed">{hi ? dashaYear.lineHi : dashaYear.lineEn}</p>
            <p className="text-sm leading-relaxed">
              <span className="font-semibold">{hi ? `इस महीने (अंक ${devNum(curPm)}): ` : `This month (Ank ${curPm}): `}</span>
              {hi ? dashaMonth.lineHi : dashaMonth.lineEn}
            </p>
            <div className="rounded-lg border bg-secondary/40 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                {hi ? "मूलांक-भाग्यांक स्थिति" : "Mulank–Bhagyank state"}
              </p>
              <p className="mt-1 text-sm">{hi ? state.hi : state.en}</p>
            </div>
            <p className="text-sm leading-relaxed">
              {hi
                ? `मूलांक ${devNum(mulank)} = ${gMul.grahaHi} — ${gMul.behaviorHi}`
                : `Mulank ${mulank} = ${gMul.graha} — ${gMul.behaviorEn}`}
            </p>
            <p className="text-sm leading-relaxed">
              {hi
                ? `भाग्यांक ${devNum(bhagyank)} = ${gBhag.grahaHi} — ${gBhag.behaviorHi}`
                : `Bhagyank ${bhagyank} = ${gBhag.graha} — ${gBhag.behaviorEn}`}
            </p>
            <p className="text-xs text-gold">{hi ? RELATION_LABEL[planetRelation(mulank, bhagyank)].hi : RELATION_LABEL[planetRelation(mulank, bhagyank)].en}</p>
          </CardContent>
        </Card>

        {/* Truth verdicts: SACCHAN → KAARAN → UPAY → SAMAY */}
        {truth.verdicts.map((v, vi) => (
          <Card key={vi} className={v.kind === "difficult" ? "border-destructive/40 bg-destructive/5" : "border-gold/40 bg-gold/5"}>
            <CardContent className="py-4">
              <p className="text-xs font-semibold uppercase tracking-wide">
                {hi ? (v.kind === "difficult" ? "कठिन सच — उपाय साथ" : v.kind === "mixed" ? "मिश्रित सच" : "शुभ सच") : (v.kind === "difficult" ? "The hard truth — with its remedy" : v.kind === "mixed" ? "The mixed truth" : "The good truth")}
              </p>
              <p className="mt-1.5 text-sm font-medium">{hi ? v.truthHi : v.truthEn}</p>
              <p className="mt-1.5 text-xs text-muted-foreground">{hi ? v.basisHi : v.basisEn}</p>
              <p className="mt-1.5 text-xs">{hi ? v.remedyHi : v.remedyEn}</p>
              {v.easesHi || v.easesEn ? (
                <p className="mt-1 text-xs text-muted-foreground">{hi ? v.easesHi : v.easesEn}</p>
              ) : null}
            </CardContent>
          </Card>
        ))}

        {/* Rajyoga banner */}
        {rajyogas.unique.length > 0 ? (
          <Card className="border-gold/50 bg-gold/5">
            <CardContent className="py-4">
              <p className="font-display text-lg text-gold">
                {hi ? `👑 आपके चार्ट में ${devNum(rajyogas.unique.length)} राजयोग हैं` : `👑 Your chart carries ${rajyogas.unique.length} Rajyoga${rajyogas.unique.length > 1 ? "s" : ""}`}
              </p>
              <ul className="mt-1.5 space-y-1 text-sm">
                {rajyogas.unique.map(({ yoga, sources }) => (
                  <li key={yoga.id}>
                    <span className="font-medium">{hi ? yoga.titleHi : yoga.title}</span>
                    <span className="text-muted-foreground"> — {hi ? yoga.effectHi : yoga.effectEn}</span>
                    <Badge variant="gold" className="ml-2 text-[10px]">{sources[0]}</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ) : null}
      </section>

      <SanatanDivider />

      {/* ============ CHAPTER 2: PAST ============ */}
      <section aria-labelledby="ch2" id="ch2-past">
        <h2 id="ch2" className="font-display text-2xl font-semibold">
          {hi ? "दूसरा अध्याय — अतीत: कब क्या हुआ होगा" : "Chapter 2 — The past: when what happened"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {hi
            ? "अंक-गणित हर पिछले वर्ष का 'क्या हुआ होगा' बताता है। जीवन-ग्राफ़ पर ✓ सही चिह्नित वर्ष नीचे गाड़े गए हैं।"
            : "The numbers compute a 'what happened' line for every past year. Years you marked ✓ सही on the life graph are pinned below."}
        </p>

        <div className="mt-4 space-y-2.5">
          {graph.past.slice(-12).map((p) => {
            const isPinned = marks.some((mk) => mk.year === p.year && mk.verdict === "sahi");
            const yr = truthForYear(p.py, truthCtx);
            return (
              <div key={p.year} className={`rounded-xl border p-3.5 ${isPinned ? "border-kesari/60 bg-kesari/5" : ""}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-display font-semibold">
                    {hi ? `${devNum(p.year)} · उम्र ${devNum(p.age)}` : `${p.year} · age ${p.age}`}{" "}
                    {isPinned ? <Badge variant="gold">✓ {hi ? "सही" : "confirmed"}</Badge> : null}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {hi ? `अंक दशा ${devNum(p.py)} (${grahaFor(p.py).grahaHi})` : `Ank Dasha ${p.py} (${grahaFor(p.py).graha})`}
                  </span>
                </div>
                <p className="mt-1 text-sm">{hi ? p.readingHi : p.readingEn}</p>
                {yr.kind !== "strong" ? (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {hi ? `${yr.truthHi} — ${yr.remedyHi}` : `${yr.truthEn} — ${yr.remedyEn}`}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {hi ? `पूरा अतीत जीवन-ग्राफ़ पर (${devNum(graph.past.length)} वर्ष)। ` : `Full past on the life graph (${graph.past.length} years). `}
          <Link href="/life-graph" className="text-primary underline">{hi ? "ग्राफ़ खोलें" : "Open the graph"}</Link>
        </p>
        {pn.en || pn.hi ? <p className="mt-1 text-xs text-muted-foreground">{hi ? pn.hi : pn.en}</p> : null}
      </section>

      <SanatanDivider />

      {/* ============ CHAPTER 3: FUTURE ============ */}
      <section aria-labelledby="ch3" id="ch3-future">
        <h2 id="ch3" className="font-display text-2xl font-semibold">
          {hi ? "तीसरा अध्याय — भविष्य: कब क्या होगा" : "Chapter 3 — The future: when what comes"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {hi ? "महीने-वार मौसम, फिर 3-वर्ष का नक़्शा, फिर 9-वर्ष का पूरा चक्र।" : "Month-by-month weather, then the 3-year map, then the full 9-year cycle."}
        </p>

        <Card className="mt-4">
          <CardHeader><CardTitle className="text-base">{hi ? "अगले 6 महीने" : "Next 6 months"}</CardTitle></CardHeader>
          <CardContent>
            <ol className="grid gap-2.5 sm:grid-cols-2">
              {months.map((mo) => (
                <li key={mo.label} className="rounded-lg border p-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium">{monthName(mo.month)} {mo.year}</span>
                    <span aria-hidden className="number-glyph text-xl text-primary/80">{hi ? devNum(mo.personalMonth) : mo.personalMonth}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {ANK_DASHA_MONTH[mo.personalMonth]?.[hi ? "lineHi" : "lineEn"] ?? ""}
                  </p>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {future3.map((f) => (
            <Card key={f.year} className="border-dashed">
              <CardContent className="py-3.5">
                <p className="font-display text-base font-semibold">
                  {hi ? `${devNum(f.year)} · उम्र ${devNum(f.age)}` : `${f.year} · age ${f.age}`}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{hi ? f.readingHi : f.readingEn}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-4">
          <CardHeader><CardTitle className="text-base">{hi ? "9-वर्षीय चक्र का नक़्शा" : "The 9-year cycle map"}</CardTitle></CardHeader>
          <CardContent>
            <ol className="grid gap-2 sm:grid-cols-3">
              {graph.future.map((f) => (
                <li key={f.year} className="rounded-lg border p-2.5 text-xs">
                  <span className="font-semibold">{hi ? devNum(f.year) : f.year}</span> · {hi ? `दशा ${devNum(f.py)}` : `Dasha ${f.py}`}
                  <p className="mt-0.5 text-muted-foreground">{hi ? f.readingHi : f.readingEn}</p>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </section>

      <SanatanDivider />

      {/* ============ CHAPTER 4: TEN LIFE-AREA CHAPTERS ============ */}
      <section aria-labelledby="ch4" id="ch4-life-areas">
        <h2 id="ch4" className="font-display text-2xl font-semibold">
          {hi ? "चौथा अध्याय — दस जीवन-क्षेत्र: पूरा हिसाब" : "Chapter 4 — Ten life areas: the full account"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {hi
            ? "हर क्षेत्र में: अतीत में क्या रहा → अभी क्या चल रहा → आगे कब (वर्ष/उम्र के साथ) → उस क्षेत्र का उपाय। शुभ और कठिन दोनों सच, आधार सहित।"
            : "Each area: what the past held → what runs now → what comes (with years/ages) → that area's remedy. Both the good and the hard truth, with basis."}
        </p>

        <nav aria-label={hi ? "क्षेत्र-सूची" : "Area index"} className="mt-3 flex flex-wrap gap-1.5">
          {areaReport.sections.map((a: AreaSection) => (
            <a key={a.areaId} href={`#area-${sectionAnchor(a.areaId)}`} className="rounded-full border px-3 py-1 text-xs hover:bg-accent">
              {hi ? a.titleHi : a.titleEn}
            </a>
          ))}
        </nav>

        <div className="mt-6 space-y-8">
          {areaReport.sections.map((a: AreaSection, idx: number) => (
            <section key={a.areaId} id={`area-${sectionAnchor(a.areaId)}`} aria-labelledby={`area-${a.areaId}`} className="scroll-mt-24">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-sm text-gold">{hi ? devNum(idx + 1) : idx + 1}.</span>
                <h3 id={`area-${a.areaId}`} className="font-display text-xl font-semibold">{hi ? a.titleHi : a.titleEn}</h3>
              </div>

              {/* (a) PAST */}
              <div className="mt-3 rounded-xl border p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? "अतीत में क्या रहा" : "What the past held"}</p>
                <p className="mt-1.5 text-sm leading-relaxed">{hi ? a.pastHi : a.pastEn}</p>
              </div>

              {/* (b) CURRENT */}
              <div className="mt-2 rounded-xl border p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? "अभी क्या चल रहा है" : "What runs now"}</p>
                <p className="mt-1.5 text-sm leading-relaxed">{hi ? a.nowHi : a.nowEn}</p>
              </div>

              {/* (c) FUTURE windows with years/ages */}
              <div className="mt-2 rounded-xl border p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? "आगे कब — खिड़की-वर्ष" : "What comes — window years"}</p>
                <ul className="mt-1.5 space-y-1.5">
                  {a.windows.map((w, i) => (
                    <li key={w.year + String(i)} className="text-sm leading-relaxed">
                      <Badge variant="gold" className="mr-1.5">{hi ? `${devNum(w.year)} · उम्र ${devNum(w.age)}` : `${w.year} · age ${w.age}`}</Badge>
                      {hi ? w.whyHi : w.why}
                    </li>
                  ))}
                </ul>
                {hasConcreteYears(a) ? null : <p className="mt-1 text-xs text-muted-foreground">{hi ? "खिड़की-वर्ष गणना हो रही है।" : "Window years are being computed."}</p>}
              </div>

              {/* (d) REMEDY */}
              <div className="mt-2 rounded-xl border border-gold/30 bg-gold/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? "इस क्षेत्र का उपाय" : "Remedy for this area"}</p>
                <p className="mt-1.5 text-sm">{hi ? a.remedyHi : a.remedyEn}</p>
              </div>
            </section>
          ))}
        </div>
      </section>

      <SanatanDivider />

      {/* ============ CHAPTER 5: BLUEPRINT NUMBERS ============ */}
      <section aria-labelledby="ch5" id="ch5-blueprint">
        <h2 id="ch5" className="font-display text-2xl font-semibold">
          {hi ? "पाँचवाँ अध्याय — ब्लूप्रिंट: मूलांक, भाग्यांक, नामांक" : "Chapter 5 — Blueprint: Mulank, Bhagyank, Namank"}
        </h2>
        <div className="mt-3 space-y-4">
          {[mulank, bhagyank].map((n, i) => {
            const g = grahaFor(n);
            return (
              <Card key={n + String(i)} className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span aria-hidden className="number-glyph mandala-ring grid size-12 place-items-center rounded-full text-xl text-gold">{hi ? devNum(n) : n}</span>
                    <span>
                      {i === 0 ? t("birthdayNumber") : t("lifePath")} · {hi ? g.grahaHi : g.graha}
                      <span className="block text-xs font-normal text-muted-foreground">{hi ? g.natureHi : g.natureEn}</span>
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{hi ? g.behaviorHi : g.behaviorEn}</p>
                  <p className="mt-2 text-xs text-gold">
                    {hi ? `उपाय: ${remedy.mantra} — ${remedy.worshipDay} को ${devNum(remedy.japa)} जप।` : `Upay: ${remedy.mantra} — ${remedy.japa} japa on ${remedy.worshipDay}.`}
                  </p>
                </CardContent>
              </Card>
            );
          })}
          <Card className="glass">
            <CardHeader><CardTitle>{t("expression")} · {hi ? `नामांक ${devNum(reading.nameNumbers.expression)}` : `Namank ${reading.nameNumbers.expression}`}</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm">{hi ? nameScore.omen.meaning : nameScore.omen.meaning}</p>
              <p className="mt-1 text-xs text-muted-foreground">{hi ? nameScore.reasons.join(" · ") : nameScore.reasons.join(" · ")}</p>
            </CardContent>
          </Card>
        </div>

        {/* v3.1: NUMBER REPETITIONS (owner correction #4 — school deck 'वर्तमान अंक गुणन') */}
        <Card className="mt-4 border-gold/40 bg-gold/5">
          <CardHeader>
            <CardTitle className="text-base">
              {hi ? "अंक-पुनरावृत्ति — पूरी जन्म-तिथि के दोहराए अंक" : "Number repetitions — repeated digits of the full birth date"}
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              {hi
                ? "स्कूल-पद्धति: 2-समान = ऊर्जा दोगुनी (ताक़त + छाया दोनों); 3-समान = अत्यंत तीव्र। हर दोहराए अंक का बल, छाया और छाया का उपाय नीचे।"
                : "School method: 2-same = energy doubled (strength AND shadow); 3-same = very intense. Each repeated digit carries its strength, shadow and the upay for the shadow."}
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-gold">
              {hi
                ? `गिनती: ${reps.entries.map((e) => `${devNum(e.digit)}×${devNum(e.count)}`).join(" · ")}${Object.entries(reps.counts).length ? " — 0 ग्रिड से बाहर" : ""}`
                : `Tally: ${reps.entries.map((e) => `${e.digit}×${e.count}`).join(" · ")}`}
            </p>
            {reps.entries.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                {hi
                  ? "कोई अंक दोहराया नहीं गया — ऊर्जा नौ अंकों में बँटी है; प्रबलता मूलांक-भाग्यांक से पढ़ें।"
                  : "No digit repeats in your date — the energy spreads across nine digits; read strength from Mulank and Bhagyank."}
              </p>
            ) : (
              reps.entries.map((e) => (
                <div key={e.digit} className="rounded-lg border bg-card/60 p-3">
                  <p className="font-display text-sm font-semibold text-gold">
                    {hi
                      ? `${devNum(e.digit)} × ${devNum(e.count)} — ${e.level === "triple" ? "अत्यंत तीव्र (त्रिक)" : "ऊर्जा दोगुनी (युगल)"}`
                      : `${e.digit} × ${e.count} — ${e.level === "triple" ? "very intense (triple)" : "energy doubled (double)"}`}
                  </p>
                  <p className="mt-1 text-sm">{hi ? e.strengthHi : e.strengthEn}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{hi ? e.shadowHi : e.shadowEn}</p>
                  <p className="mt-1.5 text-xs text-gold">{hi ? e.upayHi : e.upayEn}</p>
                </div>
              ))
            )}
            {reps.mulankBhagyankSame ? (
              <div className="rounded-lg border border-kesari/50 bg-kesari/10 p-3">
                <p className="font-display text-sm font-semibold text-kesari">
                  {hi
                    ? `विशेष: मूलांक और भाग्यांक दोनों ${devNum(reps.mulankBhagyankSame.digit)} — यही अंक आपका वाहक भी है और नियति भी। पहला हाफ़ और दूसरा हाफ़, एक ही ग्रह के हाथ में।`
                    : `Special callout: Mulank AND Bhagyank are both ${reps.mulankBhagyankSame.digit} — the same digit drives your first half and rules your second. One planet holds both reins.`}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {hi ? reps.mulankBhagyankSame.shadowHi : reps.mulankBhagyankSame.shadowEn}
                </p>
                <p className="mt-1 text-xs text-gold">
                  {hi ? reps.mulankBhagyankSame.upayHi : reps.mulankBhagyankSame.upayEn}
                </p>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* Karmic debts */}
        {karmHits.hits.length > 0 ? (
          <Card className="mt-4 border-destructive/30 bg-destructive/5">
            <CardHeader><CardTitle className="text-base">{hi ? "ऋण-अंक (कर्मिक ऋण)" : "Karmic debt numbers"}</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {karmHits.hits.map((h: KarmicDebtHit) => (
                <div key={h.where + h.number}>
                  <p className="text-sm font-medium">{hi ? `${devNum(h.number)} — ${h.where}` : `${h.number} — ${h.where}`}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : null}

        {/* Missing numbers + planes */}
        <Card className="mt-4">
          <CardHeader><CardTitle className="text-base">{hi ? "अंक-चक्र: खाली अंक और तल" : "Numeroscope: missing numbers and planes"}</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm">
              {hi ? `खाली अंक: ${chart.missing.map((x) => devNum(x)).join(", ") || "कोई नहीं"}` : `Missing numbers: ${chart.missing.join(", ") || "none"}`}
            </p>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              {chart.planes.map((pl) => (
                <li key={pl.key}><span className="font-medium text-foreground">{pl.name}:</span> {pl.note}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <SanatanDivider />

      {/* ============ REMEDIES + LUCKY + NAME STUDIO ============ */}
      <section aria-labelledby="remedies" id="ch6-remedies">
        <h2 id="remedies" className="font-display text-2xl font-semibold">
          {hi ? "उपाय और शुभ-सूची" : "Remedies and the lucky list"}
        </h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="text-base">{hi ? "मंत्र / यंत्र / दान" : "Mantra / yantra / daan"}</CardTitle></CardHeader>
            <CardContent className="space-y-1.5 text-sm">
              <p>{hi ? remedy.mantra : remedy.mantra}</p>
              <p>{hi ? `जप: ${devNum(remedy.japa)} × ${devNum(remedy.japaSets)} सेट` : `Japa: ${remedy.japa} × ${remedy.japaSets} sets`}</p>
              <p>{hi ? `${remedy.yantra} — ${remedy.worshipDay}` : `${remedy.yantra} — ${remedy.worshipDay}`}</p>
              <p>{hi ? `दान: ${remedy.daan.join(", ")}` : `Daan: ${remedy.daan.join(", ")}`}</p>
              {remedy.extraNote ? <p className="text-xs text-muted-foreground">{remedy.extraNote}</p> : null}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">{hi ? "शुभ अंक / दिन / रंग / रत्न" : "Lucky numbers / days / colors / gems"}</CardTitle></CardHeader>
            <CardContent className="space-y-1 text-sm">
              <p>{hi ? "शुभ अंक: " : "Lucky numbers: "}{lucky.numbers.map((n) => (hi ? devNum(n) : n)).join(", ")}</p>
              <p>{hi ? "शुभ दिन: " : "Days: "}{lucky.days.join(", ")}</p>
              <p>{hi ? "रंग: " : "Colors: "}{lucky.colors.join(", ")}</p>
              <p>{hi ? "रत्न: " : "Gems: "}{lucky.gems.join(", ")}</p>
              {lucky.masterNote ? <p className="text-xs text-muted-foreground">{lucky.masterNote}</p> : null}
            </CardContent>
          </Card>
        </div>
        <Card className="mt-4">
          <CardHeader><CardTitle className="text-base">{t("navNameStudio")}</CardTitle></CardHeader>
          <CardContent className="text-sm">
            <p>{nameScore.omen.meaning}</p>
            <p className="mt-1 text-xs text-muted-foreground">{nameScore.reasons.join(" · ")}</p>
          </CardContent>
        </Card>
      </section>

      <SanatanDivider />
      <ReasoningBlock title={hi ? "गणित के चरण" : "Calculation steps"} lang={lang} steps={reading.lifePath.steps} />
      <div className="text-center">
        <DisclaimerLine />
      </div>
      <p className="text-center text-xs text-muted-foreground">
        {hi ? "परंपरागत अंक-शास्त्र आधारित वाचन।" : "Traditional numerology-based reading."}
      </p>
    </div>
  );
}