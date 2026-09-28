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
import { vedicChart, grahaChainLine, doshaReadings, weakestPlanet, dashaMonthFlavor } from "@/lib/vedic";
import { nakshatraText, dashaText } from "@/lib/vedic-content";
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
        title={hi ? "pehle janm-vivaran do" : "No profile yet"}
        body={hi ? "report janm-tithi se ganit hoti hai — pehle vivaran do." : "The report is computed from the birth date — give details first."}
        action={<Link href="/" className="text-sm text-primary underline">{hi ? "shuru karein" : "Start"}</Link>}
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

  // v3.3 secret layer — graha-chain verification, dosha pariksha, weakest
  // planet (rule d: remedies feed the weakest across BOTH systems), and
  // dasha-precision flavors for the 6-month weather rows.
  const vc = vedicChart({ year: y, month: m, day: d, hour: 12, minute: 0 });
  const chainLine = grahaChainLine(mulank, vc, lang);
  const doshas = doshaReadings(vc);
  const wp = weakestPlanet(mulank, bhagyank, vc, chart.missing);
  const flavorByLabel = new Map<string, ReturnType<typeof dashaMonthFlavor>>();
  for (const mo of months) {
    flavorByLabel.set(mo.label, dashaMonthFlavor(mulank, vc, new Date(mo.year, mo.month - 1, 1)));
  }
  const bpFlavor = flavorByLabel.get(months[0]?.label ?? "");
  const vcDashaLord = dashaMonthFlavor(mulank, vc, new Date()).yearThemeEn.split(" ")[0].replace(" mahadasha", "").replace(/^(Surya|Chandra|Guru|Rahu|Budh|Shukra|Ketu|Shani|Mangal)$/, (s) => ({ Surya: "Sun", Chandra: "Moon", Guru: "Jupiter", Rahu: "Rahu", Budh: "Mercury", Shukra: "Venus", Ketu: "Ketu", Shani: "Saturn", Mangal: "Mars" } as Record<string, string>)[s] ?? s);

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <PageHeader
        title={t("navBlueprint")}
        subtitle={hi
          ? `janm ${devNum(d)}-${devNum(m)}-${devNum(y)} · vachan ${hi ? "Hinglish" : "EN"} · ${devNum(areaReport.sections.length)} jeevan-kshetra`
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
            {hi ? "pahala adhyay — Abhi ka haal" : "Chapter 1 — Abhi Ka Haal (Your present state)"}
          </h2>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {hi
            ? "report yaheen se shuru hoti hai: aap is vakat kaha khadae hain, aapki jaindai mein is samay kyaa chal raha hai."
            : "The report opens here: where you stand at this moment and what is running through your life right now."}
        </p>

        <Card className="glass yantra-bg mt-4">
          <CardHeader>
            <CardTitle>
              {hi
                ? `Ank Dasha ${devNum(curPy)} (${grahaFor(curPy).grahaHi}) — ${dashaYear.nameHi}`
                : `Ank Dasha ${curPy} (${grahaFor(curPy).graha}) — ${dashaYear.name}`}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm leading-relaxed">{hi ? dashaYear.lineHi : dashaYear.lineEn}</p>
            <p className="text-sm leading-relaxed">
              <span className="font-semibold">{hi ? `is mahine (ank ${devNum(curPm)}): ` : `This month (Ank ${curPm}): `}</span>
              {hi ? dashaMonth.lineHi : dashaMonth.lineEn}
            </p>
            <div className="rounded-lg border bg-secondary/40 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                {hi ? "Mulank-Bhagyank sthiti" : "Mulank–Bhagyank state"}
              </p>
              <p className="mt-1 text-sm">{hi ? state.hi : state.en}</p>
            </div>
            <p className="text-sm leading-relaxed">
              {hi
                ? `Mulank ${devNum(mulank)} = ${gMul.grahaHi} — ${gMul.behaviorHi}`
                : `Mulank ${mulank} = ${gMul.graha} — ${gMul.behaviorEn}`}
            </p>
            <p className="text-sm leading-relaxed">
              {hi
                ? `Bhagyank ${devNum(bhagyank)} = ${gBhag.grahaHi} — ${gBhag.behaviorHi}`
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
                {hi ? (v.kind === "difficult" ? "kathin sach — upaay saath" : v.kind === "mixed" ? "mishrit sach" : "shubh sach") : (v.kind === "difficult" ? "The hard truth — with its remedy" : v.kind === "mixed" ? "The mixed truth" : "The good truth")}
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
                {hi ? `👑 aapke chart mein ${devNum(rajyogas.unique.length)} Rajyoga hain` : `👑 Your chart carries ${rajyogas.unique.length} Rajyoga${rajyogas.unique.length > 1 ? "s" : ""}`}
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
          {hi ? "doosara adhyay — ateet: kab kyaa hua hoga" : "Chapter 2 — The past: when what happened"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {hi
            ? "ank-ganit har pichhle saal ka 'kyaa hua hoga' bataata hai. jeevan-graph par ✓ sahi chihnit saal neeche gaadae gae hain."
            : "The numbers compute a 'what happened' line for every past year. Years you marked ✓ sahi on the life graph are pinned below."}
        </p>

        <div className="mt-4 space-y-2.5">
          {graph.past.slice(-12).map((p) => {
            const isPinned = marks.some((mk) => mk.year === p.year && mk.verdict === "sahi");
            const yr = truthForYear(p.py, truthCtx);
            return (
              <div key={p.year} className={`rounded-xl border p-3.5 ${isPinned ? "border-kesari/60 bg-kesari/5" : ""}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-display font-semibold">
                    {hi ? `${devNum(p.year)} · umra ${devNum(p.age)}` : `${p.year} · age ${p.age}`}{" "}
                    {isPinned ? <Badge variant="gold">✓ {hi ? "sahi" : "confirmed"}</Badge> : null}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {hi ? `Ank Dasha ${devNum(p.py)} (${grahaFor(p.py).grahaHi})` : `Ank Dasha ${p.py} (${grahaFor(p.py).graha})`}
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
          {hi ? `poora ateet jeevan-graph par (${devNum(graph.past.length)} saal). ` : `Full past on the life graph (${graph.past.length} years). `}
          <Link href="/life-graph" className="text-primary underline">{hi ? "graph kholen" : "Open the graph"}</Link>
        </p>
        {pn.en || pn.hi ? <p className="mt-1 text-xs text-muted-foreground">{hi ? pn.hi : pn.en}</p> : null}
      </section>

      <SanatanDivider />

      {/* ============ CHAPTER 3: FUTURE ============ */}
      <section aria-labelledby="ch3" id="ch3-future">
        <h2 id="ch3" className="font-display text-2xl font-semibold">
          {hi ? "teesara adhyay — bhavishya: kab kyaa hoga" : "Chapter 3 — The future: when what comes"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {hi ? "mahine-vaar mausam, phir 3-saal ka nakasha, phir 9-saal ka poora chakra." : "Month-by-month weather, then the 3-year map, then the full 9-year cycle."}
        </p>

        <Card className="mt-4">
          <CardHeader><CardTitle className="text-base">{hi ? "agle 6 mahine" : "Next 6 months"}</CardTitle></CardHeader>
          <CardContent>
            <ol className="grid gap-2.5 sm:grid-cols-2">
              {months.map((mo) => {
                const fv = flavorByLabel.get(mo.label);
                return (
                  <li key={mo.label} className="rounded-lg border p-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-medium">{monthName(mo.month)} {mo.year}</span>
                      <span aria-hidden className="number-glyph text-xl text-primary/80">{hi ? devNum(mo.personalMonth) : mo.personalMonth}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {ANK_DASHA_MONTH[mo.personalMonth]?.[hi ? "lineHi" : "lineEn"] ?? ""}
                    </p>
                    {/* v3.3: dasha-precision (secret layer) */}
                    {fv ? (
                      <p className="mt-1.5 rounded-md border border-gold/25 bg-gold/5 px-2 py-1.5 text-[11px] text-gold">
                        {hi ? fv.monthFlavorHi : fv.monthFlavorEn}
                      </p>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </CardContent>
        </Card>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {future3.map((f) => (
            <Card key={f.year} className="border-dashed">
              <CardContent className="py-3.5">
                <p className="font-display text-base font-semibold">
                  {hi ? `${devNum(f.year)} · umra ${devNum(f.age)}` : `${f.year} · age ${f.age}`}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{hi ? f.readingHi : f.readingEn}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-4">
          <CardHeader><CardTitle className="text-base">{hi ? "9-varsheey chakra ka nakasha" : "The 9-year cycle map"}</CardTitle></CardHeader>
          <CardContent>
            <ol className="grid gap-2 sm:grid-cols-3">
              {graph.future.map((f) => (
                <li key={f.year} className="rounded-lg border p-2.5 text-xs">
                  <span className="font-semibold">{hi ? devNum(f.year) : f.year}</span> · {hi ? `dasha ${devNum(f.py)}` : `Dasha ${f.py}`}
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
          {hi ? "chautha adhyay — das jeevan-kshetra: poora hisaab" : "Chapter 4 — Ten life areas: the full account"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {hi
            ? "har kshetra mein: ateet mein kyaa raha → abhi kyaa chal raha → aage kab (saal/umra ke saath) → us kshetra ka upaay. shubh aur kathin dono sach, aadhaar sahit."
            : "Each area: what the past held → what runs now → what comes (with years/ages) → that area's remedy. Both the good and the hard truth, with basis."}
        </p>

        <nav aria-label={hi ? "kshetra-soochi" : "Area index"} className="mt-3 flex flex-wrap gap-1.5">
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
                <p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? "ateet mein kyaa raha" : "What the past held"}</p>
                <p className="mt-1.5 text-sm leading-relaxed">{hi ? a.pastHi : a.pastEn}</p>
              </div>

              {/* (b) CURRENT */}
              <div className="mt-2 rounded-xl border p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? "abhi kyaa chal raha hai" : "What runs now"}</p>
                <p className="mt-1.5 text-sm leading-relaxed">{hi ? a.nowHi : a.nowEn}</p>
              </div>

              {/* (c) FUTURE windows with years/ages */}
              <div className="mt-2 rounded-xl border p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? "aage kab — khidki-saal" : "What comes — window years"}</p>
                <ul className="mt-1.5 space-y-1.5">
                  {a.windows.map((w, i) => (
                    <li key={w.year + String(i)} className="text-sm leading-relaxed">
                      <Badge variant="gold" className="mr-1.5">{hi ? `${devNum(w.year)} · umra ${devNum(w.age)}` : `${w.year} · age ${w.age}`}</Badge>
                      {hi ? w.whyHi : w.why}
                    </li>
                  ))}
                </ul>
                {hasConcreteYears(a) ? null : <p className="mt-1 text-xs text-muted-foreground">{hi ? "khidki-saal ganana ho rahi hai." : "Window years are being computed."}</p>}
              </div>

              {/* (d) REMEDY */}
              <div className="mt-2 rounded-xl border border-gold/30 bg-gold/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? "is kshetra ka upaay" : "Remedy for this area"}</p>
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
          {hi ? "paachava adhyay — blooprint: Mulank, Bhagyank, Namank" : "Chapter 5 — Blueprint: Mulank, Bhagyank, Namank"}
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
                    {hi ? `upaay: ${remedy.mantra} — ${remedy.worshipDay} ko ${devNum(remedy.japa)} japa.` : `Upay: ${remedy.mantra} — ${remedy.japa} japa on ${remedy.worshipDay}.`}
                  </p>
                </CardContent>
              </Card>
            );
          })}
          <Card className="glass">
            <CardHeader><CardTitle>{t("expression")} · {hi ? `Namank ${devNum(reading.nameNumbers.expression)}` : `Namank ${reading.nameNumbers.expression}`}</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm">{hi ? nameScore.omen.meaning : nameScore.omen.meaning}</p>
              <p className="mt-1 text-xs text-muted-foreground">{hi ? nameScore.reasons.join(" · ") : nameScore.reasons.join(" · ")}</p>
            </CardContent>
          </Card>
        </div>

        {/* v3.1: NUMBER REPETITIONS (owner correction #4 — school deck 'vartmaan ank gunan') */}
        <Card className="mt-4 border-gold/40 bg-gold/5">
          <CardHeader>
            <CardTitle className="text-base">
              {hi ? "ank-repetition — poori janm-tithi ke doharaae ank" : "Number repetitions — repeated digits of the full birth date"}
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              {hi
                ? "school-paddhati: 2-samaan = oorja doguni (taakat + chhaya dono); 3-samaan = atyant teevr. har doharaae ank ka bal, chhaya aur chhaya ka upaay neeche."
                : "School method: 2-same = energy doubled (strength AND shadow); 3-same = very intense. Each repeated digit carries its strength, shadow and the upay for the shadow."}
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-gold">
              {hi
                ? `ginai: ${reps.entries.map((e) => `${devNum(e.digit)}×${devNum(e.count)}`).join(" · ")}${Object.entries(reps.counts).length ? " — 0 grid se bahar" : ""}`
                : `Tally: ${reps.entries.map((e) => `${e.digit}×${e.count}`).join(" · ")}`}
            </p>
            {reps.entries.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                {hi
                  ? "koi ank doharaayaa nahi gaya — oorja nau ankon mein bi hai; prabalata Mulank-Bhagyank se padhaen."
                  : "No digit repeats in your date — the energy spreads across nine digits; read strength from Mulank and Bhagyank."}
              </p>
            ) : (
              reps.entries.map((e) => (
                <div key={e.digit} className="rounded-lg border bg-card/60 p-3">
                  <p className="font-display text-sm font-semibold text-gold">
                    {hi
                      ? `${devNum(e.digit)} × ${devNum(e.count)} — ${e.level === "triple" ? "atyant teevr (trik)" : "oorja doguni (yugal)"}`
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
                    ? `vishesh: Mulank aur Bhagyank dono ${devNum(reps.mulankBhagyankSame.digit)} — yehi ank aapka vaahak bhi hai aur niyati bhi. pahala haaph aur doosara haaph, ek hi graha ke haath men.`
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

        {/* v3.3 SECRET LAYER — Ank+Graha pariksha (rule f + a + d) */}
        <Card className="glass mt-4" data-testid="vedic-pariksha">
          <CardHeader>
            <CardTitle className="text-base">
              {hi ? "Ank+Graha pariksha — dono system ka hisaab" : "Ank+Graha pariksha — both systems' account"}
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              {hi
                ? "school ke ank-ganit ke saath graha-table ki jaanch — yahi vachan ko tez banata hai."
                : "The graha-table check alongside the school's number math — this is what sharpens the reading."}
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* rule (c): the running dasha essay + theme (year/month flavor) */}
            <div className="rounded-lg border bg-secondary/40 p-3 text-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                {hi ? "chalti dasha" : "Running dasha"}
              </p>
              <p className="mt-1.5">{hi ? dashaText(vcDashaLord, "hi") : dashaText(vcDashaLord, "en")}</p>
              {bpFlavor ? (
                <p className="mt-2 text-xs text-muted-foreground">
                  {hi ? `${bpFlavor.yearThemeHi} — ${bpFlavor.monthFlavorHi}` : `${bpFlavor.yearThemeEn} — ${bpFlavor.monthFlavorEn}`}
                </p>
              ) : null}
            </div>

            {/* rule (a): nakshatra verification essay */}
            <div className="rounded-lg border border-gold/40 bg-gold/5 p-3 text-sm" data-testid="bp-nakshatra-essay">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                {hi ? "janm-nakshatra — mann ki pushti" : "Janma nakshatra — the mind's confirmation"}
              </p>
              <p className="mt-1.5">
                {hi
                  ? `janm-nakshatra ${vc.nakshatraName} (pada ${devNum(vc.pada)}, rash ${vc.rashiName}) — ${nakshatraText(vc.nakshatra, lang)}`
                  : `Janma nakshatra ${vc.nakshatraName} (pada ${vc.pada}, rashi ${vc.rashiName}) — ${nakshatraText(vc.nakshatra, lang)}`}
              </p>
            </div>

            {/* rule (f): dosha pariksha — care, never fear */}
            {doshas.map((dsh) => (
              <div key={dsh.key} className="rounded-lg border p-3 text-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                  {hi ? dsh.titleHi : dsh.titleEn}
                </p>
                <p className="mt-1.5">{hi ? dsh.explainHi : dsh.explainEn}</p>
                <p className="mt-1 text-xs text-muted-foreground">{hi ? dsh.upayHi : dsh.upayEn}</p>
              </div>
            ))}

            {/* rule (d): weakest planet → the remedy target */}
            <div className="rounded-lg border border-kesari/50 bg-kesari/10 p-3 text-sm" data-testid="weakest-planet">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                {hi ? "sabse kamzor graha — pehle isi ko bal" : "The weakest planet — feed this one first"}
              </p>
              <p className="mt-1.5">
                {hi
                  ? `${wp.graha} (ank ${devNum(wp.digit)}) — ${wp.reasonHi}`
                  : `${wp.graha} (digit ${wp.digit}) — ${wp.reasonEn}`}
              </p>
            </div>

            {/* Basis: the graha-chain line closes the pariksha */}
            <ol className="list-decimal space-y-1 pl-5 text-xs text-muted-foreground">
              <li>{chainLine}</li>
            </ol>
            <p className="font-serif-display text-xs italic text-gold">
              {hi ? "Isi basis par hum aapke liye yeh predict karte hain." : "On this basis we predict your reading."}
            </p>
          </CardContent>
        </Card>

        {/* Karmic debts */}
        {karmHits.hits.length > 0 ? (
          <Card className="mt-4 border-destructive/30 bg-destructive/5">
            <CardHeader><CardTitle className="text-base">{hi ? "ran-ank (karmic rin)" : "Karmic debt numbers"}</CardTitle></CardHeader>
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
          <CardHeader><CardTitle className="text-base">{hi ? "ank-chakra: khaali ank aur tal" : "Numeroscope: missing numbers and planes"}</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm">
              {hi ? `khaali ank: ${chart.missing.map((x) => devNum(x)).join(", ") || "koi nahi"}` : `Missing numbers: ${chart.missing.join(", ") || "none"}`}
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
          {hi ? "upaay aur shubh-soochi" : "Remedies and the lucky list"}
        </h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="text-base">{hi ? "mantra / yantra / daan" : "Mantra / yantra / daan"}</CardTitle></CardHeader>
            <CardContent className="space-y-1.5 text-sm">
              <p>{hi ? remedy.mantra : remedy.mantra}</p>
              <p>{hi ? `japa: ${devNum(remedy.japa)} × ${devNum(remedy.japaSets)} set` : `Japa: ${remedy.japa} × ${remedy.japaSets} sets`}</p>
              <p>{hi ? `${remedy.yantra} — ${remedy.worshipDay}` : `${remedy.yantra} — ${remedy.worshipDay}`}</p>
              <p>{hi ? `daan: ${remedy.daan.join(", ")}` : `Daan: ${remedy.daan.join(", ")}`}</p>
              {remedy.extraNote ? <p className="text-xs text-muted-foreground">{remedy.extraNote}</p> : null}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">{hi ? "shubh ank / din / rang / ratna" : "Lucky numbers / days / colors / gems"}</CardTitle></CardHeader>
            <CardContent className="space-y-1 text-sm">
              <p>{hi ? "shubh ank: " : "Lucky numbers: "}{lucky.numbers.map((n) => (hi ? devNum(n) : n)).join(", ")}</p>
              <p>{hi ? "shubh din: " : "Days: "}{lucky.days.join(", ")}</p>
              <p>{hi ? "rang: " : "Colors: "}{lucky.colors.join(", ")}</p>
              <p>{hi ? "ratna: " : "Gems: "}{lucky.gems.join(", ")}</p>
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
      <ReasoningBlock title={hi ? "ganit ke charan" : "Calculation steps"} lang={lang} steps={reading.lifePath.steps} />
      <div className="text-center">
        <DisclaimerLine />
      </div>
      <p className="text-center text-xs text-muted-foreground">
        {hi ? "paramparagat ank-shastra aadhaarit vachan." : "Traditional numerology-based reading."}
      </p>
    </div>
  );
}