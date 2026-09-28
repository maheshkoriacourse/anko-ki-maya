"use client";

/**
 * ANKO KI MAYA v3 — LIFE GRAPH = PAST AUTO-READING (flagship page).
 *
 * The engine reads EVERY year birth→now from the numbers and writes a
 * "kya hua hoga" line for each. The user only confirms: ✓ sahi / ✗ galat.
 * Confirmed (sahi) years are pinned on the SVG intensity curve; the
 * pattern note sharpens with every mark. Future 10 years render as a
 * dashed continuation.
 */

import * as React from "react";
import { Check, X, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from "@/components/ui";
import { PageHeader, EmptyState, SanatanDivider, YantraMotif } from "@/components/shared";
import { useProfile } from "@/components/seeded-profile";
import { useT } from "@/lib/lang";
import { t as rawT } from "@/lib/content";
import {
  buildLifeGraph, curveGeometry, patternNote, BIG_REASON_LABEL,
  type YearMark,
} from "@/lib/life-graph";
import { loadYearMarks, saveYearMark } from "@/lib/marks-storage";
import { devNum, grahaFor } from "@/lib/navgrah";
import { ReasoningBlock } from "@/components/loshu-kit";

export default function LifeGraphPage() {
  const { profile, reading, hasProfile } = useProfile();
  const { lang } = useT();
  const t = (key: string) => rawT(lang, key);
  const hi = lang === "hi";

  const [marks, setMarks] = React.useState<YearMark[]>([]);
  React.useEffect(() => {
    if (profile) setMarks(loadYearMarks(profile.birthDate));
  }, [profile]);

  if (!hasProfile || !profile || !reading) {
    return (
      <EmptyState
        title={hi ? "pehle janm-vivaran do" : "No profile yet"}
        body={hi ? "janm-tithi do — graph khud bhar jaaega." : "Add your birth details — the graph fills itself."}
        action={<a href="/" className="text-sm text-primary underline">{hi ? "shuru karein" : "Start"}</a>}
      />
    );
  }

  const y = Number(profile.birthDate.slice(0, 4));
  const m = Number(profile.birthDate.slice(5, 7));
  const d = Number(profile.birthDate.slice(8, 10));
  const nowYear = new Date().getFullYear();
  const graph = buildLifeGraph(y, m, d, nowYear, reading.pinnacles);
  const geo = curveGeometry(graph, marks);
  const pn = patternNote(marks, graph.past);
  const markMap = new Map(marks.map((mk) => [mk.year, mk.verdict]));

  function mark(year: number, verdict: "sahi" | "galat") {
    const next = saveYearMark(profile!.birthDate, year, verdict);
    setMarks(next);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={t("navLifeGraph")}
        subtitle={
          hi
            ? "engine ne aapke janm se aaj tak ke har saal ka 'kyaa hua hoga' vachan ankon se bhar diyaa hai — aap bas ✓ sahi / ✗ galat chihnit karo. bade saal samay-rekha banaate hain; baakaee saal pheei prishthabhoomi-vakr."
            : "The engine has filled a 'what happened' reading for every year birth→now from your numbers — you only mark ✓ right / ✗ wrong. Big years build the timeline; the rest stays a faint background curve."
        }
        actions={
          <Badge variant="gold">
            {hi
              ? `${devNum(graph.bigYears.length)} bade saal`
              : `${graph.bigYears.length} big years`}
          </Badge>
        }
      />

      {/* THE GRAPH */}
      <Card className="glass yantra-bg">
        <CardHeader>
          <CardTitle className="flex flex-wrap items-center justify-between gap-2">
            <span>
              {hi
                ? `teevrata-vakr — ${devNum(y)} se ${devNum(nowYear + 10)} (aage bindukat)`
                : `Intensity curve — ${y} to ${nowYear + 10} (future dotted)`}
            </span>
            <span className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span aria-hidden className="inline-block size-2.5 rounded-full bg-gold" />
                {hi ? "pakki ghatna (sahi)" : "confirmed (sahi)"}
              </span>
              <span className="flex items-center gap-1">
                <span aria-hidden className="inline-block size-2.5 rounded-full border border-muted-foreground bg-transparent" />
                {hi ? "galat chihnit" : "marked wrong"}
              </span>
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <svg
            viewBox={`0 0 ${geo.width} ${geo.height}`}
            className="h-auto w-full min-w-[720px]"
            role="img"
            aria-label={hi ? "jeevan-teevrata graph" : "Life intensity graph"}
          >
            {/* intensity gridlines */}
            {[2, 5, 8, 10].map((imp) => {
              const yy = 24 + (1 - (imp - 1) / 9) * (geo.height - 64);
              return (
                <g key={imp}>
                  <line x1={46} x2={geo.width - 20} y1={yy} y2={yy} stroke="currentColor" strokeOpacity={0.08} strokeDasharray="3 5" />
                  <text x={10} y={yy + 4} fontSize={10} fill="currentColor" opacity={0.45}>{imp}</text>
                </g>
              );
            })}
            {/* year ticks */}
            {geo.ticks.map((tick, i) => (
              <text key={i} x={tick.x} y={geo.height - 10} fontSize={10} fill="currentColor" opacity={0.55} textAnchor="middle">
                {hi ? devNum(tick.label) : tick.label}
              </text>
            ))}
            {/* now line */}
            {(() => {
              const nowPt = geo.points.find((p) => p.isCurrent) ?? geo.points[geo.points.length - 1];
              return (
                <g>
                  <line
                    x1={nowPt.x} x2={nowPt.x} y1={14} y2={geo.height - 28}
                    stroke="var(--kesari)" strokeWidth={1.5} strokeDasharray="2 4" opacity={0.9}
                  />
                  <text x={nowPt.x} y={12} fontSize={10} textAnchor="middle" fill="var(--kesari)">
                    {hi ? "abhi" : "NOW"}
                  </text>
                </g>
              );
            })()}
            {/* future dashed segment */}
            <path d={geo.futurePath} fill="none" stroke="var(--gold)" strokeWidth={2} strokeDasharray="5 6" opacity={0.55} strokeLinecap="round" />
            {/* v3.1: faint background curve (non-big past years) */}
            <path d={geo.faintPath} fill="none" stroke="var(--gold)" strokeWidth={1.2} opacity={0.18} strokeLinecap="round" />
            {/* v3.1: big-years strong curve */}
            <path d={geo.bigPath} fill="none" stroke="var(--kesari)" strokeWidth={3} opacity={0.95} strokeLinecap="round" />
            {/* main curve (subtle spine beneath the big/faint split) */}
            <path d={geo.path} fill="none" stroke="var(--gold)" strokeWidth={1} opacity={0.25} strokeLinecap="round" />
            {/* year dots */}
            {geo.points.map((p) => (
              <g key={p.year}>
                <circle
                  cx={p.x} cy={p.y}
                  r={p.pinned ? 6 : p.rejected ? 4.5 : 3.5}
                  fill={p.pinned ? "var(--kesari)" : p.rejected ? "var(--background)" : "var(--gold)"}
                  stroke={p.rejected ? "var(--destructive)" : "var(--background)"}
                  strokeWidth={p.pinned ? 1.5 : 2}
                  opacity={p.isFuture ? 0.5 : 1}
                >
                  <title>{`${p.year} · PY ${p.py} · ${p.intensity}/10${p.pinned ? " ✓" : p.rejected ? " ✗" : ""}`}</title>
                </circle>
              </g>
            ))}
            {/* pinned labels (user-confirmed sahi events) */}
            {geo.pins.map((p) => (
              <text key={`pin-${p.year}`} x={p.x} y={p.y - 11} fontSize={10} textAnchor="middle" fill="var(--kesari)" fontWeight="600">
                ✓ {hi ? devNum(p.year) : p.year}
              </text>
            ))}
            {/* v3.1: BIG-YEAR event pins — bade saal with their event labels */}
            {geo.bigPins.map((p) => (
              <g key={`big-${p.year}`}>
                <circle
                  cx={p.x} cy={p.y} r={7.5}
                  fill="var(--kesari)" stroke="var(--background)" strokeWidth={2}
                  opacity={0.95}
                >
                  <title>{`${p.year} · bade saal · ${p.eventLabelHi ?? ""}`}</title>
                </circle>
                <text x={p.x} y={p.y + 3.5} fontSize={7.5} textAnchor="middle" fill="var(--background)" fontWeight="700">
                  {p.py}
                </text>
                <text x={p.x} y={p.y - 12} fontSize={9} textAnchor="middle" fill="var(--kesari)" fontWeight="700">
                  {hi ? devNum(p.year) : p.year}
                </text>
                <text x={p.x} y={p.y + 20} fontSize={8} textAnchor="middle" fill="var(--gold-bright)" opacity={0.9}>
                  {(hi ? p.eventLabelHi : p.eventLabel)?.slice(0, 26) ?? ""}
                </text>
              </g>
            ))}
          </svg>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            {hi
              ? `oocha bindu = us saal ki teevrata (ank-dasha ke anusaar). ${grahaFor(8).grahaHi}/Surya/Mangal saal sabse ooche — neev/Ketu saal neeche.`
              : "High points = that year's intensity (per Ank Dasha). Shani/Surya/Mangal years run highest; foundation/Ketu years rest low."}
          </p>
        </CardContent>
      </Card>

      {/* Pattern note */}
      {pn.hi || pn.en ? (
        <Card className="border-gold/40 bg-gold/5">
          <CardContent className="py-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">
              {hi ? "aapke chihnon se paitarn" : "Pattern from your marks"}
            </p>
            <p className="mt-1 text-sm">{hi ? pn.hi : pn.en}</p>
          </CardContent>
        </Card>
      ) : null}

      {/* THIS YEAR */}
      {graph.currentYear ? (
        <Card className="glass border-kesari/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="gold">{hi ? "is saal" : "THIS YEAR"} · {hi ? devNum(graph.currentYear.year) : graph.currentYear.year}</Badge>
              <span className="text-sm text-muted-foreground">
                {hi ? `Ank Dasha ${devNum(graph.currentYear.py)} — ${grahaFor(graph.currentYear.py).grahaHi}` : `Ank Dasha ${graph.currentYear.py} — ${grahaFor(graph.currentYear.py).graha}`}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{hi ? graph.currentYear.readingHi : graph.currentYear.readingEn}</p>
          </CardContent>
        </Card>
      ) : null}

      {/* v3.1: bade saal — BIG-YEAR TIMELINE (owner correction #2) */}
      <section aria-labelledby="big-years-h">
        <h2 id="big-years-h" className="font-display text-xl font-semibold">
          {hi ? "Bade saal — samay-rekha badi ghatnaon se banti hai" : "Big years — the timeline is built from them"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {hi
            ? "sirph bade saal hi neeche samay-rekha par khadae hain — karmic rin, shikhar-badal, dasha 1/9, Mulank-Bhagyank ki dasha, ank-repetition ya meel-patthar aayu (२७/३६/४५/५४) waale saal. baakaee saal upar pheeke vakr hain."
            : "Only big years stand on the timeline below — years with karmic debt, a pinnacle boundary, PY 1/9, PY = Mulank/Bhagyank, a digit-repetition surge, or a milestone age (27/36/45/54). The rest stay the faint curve above."}
        </p>
        <div className="mt-4 space-y-3">
          {graph.bigYears.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {hi ? "is antaraal mein koi bada saal nahi bana." : "No big years in this span."}
            </p>
          ) : (
            [...graph.bigYears].reverse().map((p) => {
              const verdict = markMap.get(p.year);
              return (
                <Card
                  key={`big-${p.year}`}
                  className={verdict === "sahi" ? "border-kesari/70 bg-kesari/10" : "border-kesari/40"}
                >
                  <CardContent className="py-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span aria-hidden className="number-glyph mandala-ring grid size-11 place-items-center rounded-full bg-kesari/15 text-lg text-kesari">
                          {hi ? devNum(p.py) : p.py}
                        </span>
                        <div>
                          <p className="font-display text-base font-semibold">
                            {hi ? `bada saal ${devNum(p.year)} · umra ${devNum(p.age)}` : `Big year ${p.year} · age ${p.age}`}
                            {verdict === "sahi" ? <Badge variant="gold" className="ml-2">✓ {hi ? "sahi" : "confirmed"}</Badge> : null}
                            {verdict === "galat" ? <Badge variant="secondary" className="ml-2">✗ {hi ? "galat" : "wrong"}</Badge> : null}
                          </p>
                          <p className="mt-0.5 flex flex-wrap gap-1.5">
                            {p.bigReasons.map((r, i) => (
                              <Badge key={r + i} variant="secondary" className="text-[10px]">
                                {hi ? BIG_REASON_LABEL[r]?.hi : BIG_REASON_LABEL[r]?.en}
                              </Badge>
                            ))}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Button
                          size="sm"
                          variant={verdict === "sahi" ? "default" : "outline"}
                          aria-pressed={verdict === "sahi"}
                          aria-label={`${p.year} — ${hi ? "sahi" : "right"}`}
                          onClick={() => mark(p.year, "sahi")}
                        >
                          <Check aria-hidden /> ✓ {hi ? "sahi" : "right"}
                        </Button>
                        <Button
                          size="sm"
                          variant={verdict === "galat" ? "destructive" : "outline"}
                          aria-pressed={verdict === "galat"}
                          aria-label={`${p.year} — ${hi ? "galat" : "wrong"}`}
                          onClick={() => mark(p.year, "galat")}
                        >
                          <X aria-hidden /> ✗ {hi ? "galat" : "wrong"}
                        </Button>
                      </div>
                    </div>
                    {/* The LIKELY EVENT TYPE — named directly */}
                    <p className="mt-3 font-serif-display text-[15px] font-medium leading-relaxed text-gold-bright dark:text-gold-bright">
                      {hi ? p.eventHi : p.eventEn}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{hi ? p.readingHi : p.readingEn}</p>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </section>

      {/* PAST YEAR-BY-YEAR READINGS (full list, below the big-years timeline) */}
      <section aria-labelledby="past-readings-h">
        <h2 id="past-readings-h" className="font-display text-xl font-semibold">
          {hi ? "ateet — saal-dar-saal 'kyaa hua hoga'" : "The past — year-by-year 'what happened'"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {hi
            ? "har vachan aapke ankon se ganit hai — padho, chihn lagao; pakke saal graph par gaad jaaenge."
            : "Every reading is computed from your numbers — read, mark; confirmed years pin onto the graph."}
        </p>
        <div className="mt-4 space-y-3">
          {[...graph.past].reverse().map((p) => {
            const verdict = markMap.get(p.year);
            return (
              <Card
                key={p.year}
                className={verdict === "sahi" ? "border-kesari/60 bg-kesari/5" : verdict === "galat" ? "opacity-70" : ""}
              >
                <CardContent className="py-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span aria-hidden className="number-glyph mandala-ring grid size-11 place-items-center rounded-full text-lg text-gold">
                        {hi ? devNum(p.py) : p.py}
                      </span>
                      <div>
                        <p className="font-display text-base font-semibold">
                          {hi ? `${devNum(p.year)} · umra ${devNum(p.age)}` : `${p.year} · age ${p.age}`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {hi
                            ? `ank-dasha ${devNum(p.py)} (${grahaFor(p.py).grahaHi}) · teevrata ${devNum(p.intensity)}/10`
                            : `Ank Dasha ${p.py} (${grahaFor(p.py).graha}) · intensity ${p.intensity}/10`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Button
                        size="sm"
                        variant={verdict === "sahi" ? "default" : "outline"}
                        aria-pressed={verdict === "sahi"}
                        aria-label={`${p.year} — ${hi ? "sahi" : "right"}`}
                        onClick={() => mark(p.year, "sahi")}
                      >
                        <Check aria-hidden /> ✓ {hi ? "sahi" : "right"}
                      </Button>
                      <Button
                        size="sm"
                        variant={verdict === "galat" ? "destructive" : "outline"}
                        aria-pressed={verdict === "galat"}
                        aria-label={`${p.year} — ${hi ? "galat" : "wrong"}`}
                        onClick={() => mark(p.year, "galat")}
                      >
                        <X aria-hidden /> ✗ {hi ? "galat" : "wrong"}
                      </Button>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed">{hi ? p.readingHi : p.readingEn}</p>
                  {p.activations.length > 0 ? (
                    <p className="mt-2 flex flex-wrap gap-1.5">
                      {p.activations.map((a, i) => (
                        <Badge key={a + i} variant="secondary" className="text-[10px]">
                          {hi ? p.activationTagsHi[i] : a}
                        </Badge>
                      ))}
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <SanatanDivider />

      {/* FUTURE 10 YEARS */}
      <section aria-labelledby="future-readings-h">
        <h2 id="future-readings-h" className="font-display text-xl font-semibold">
          {hi ? "bhavishya — agle 10 saal" : "The future — next 10 years"}
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {graph.future.map((f) => (
            <Card key={f.year} className="border-dashed">
              <CardContent className="py-3.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-display text-base font-semibold">
                    {hi ? `${devNum(f.year)} · umra ${devNum(f.age)}` : `${f.year} · age ${f.age}`}
                  </p>
                  <Badge variant={f.py === 8 || f.py === 1 || f.py === 9 ? "gold" : "secondary"}>
                    {hi ? `Ank Dasha ${devNum(f.py)}` : `Dasha ${f.py}`}
                  </Badge>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">{hi ? f.readingHi : f.readingEn}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <ReasoningBlock title={t("navLifeGraph")} steps={graph.steps} lang={lang} />
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Info aria-hidden className="size-3.5" />
        {hi
          ? "vachan ank-ganit se bante hain; aapke chihn isi browser mein saheje jaate hain aur paitarn-note ko tez karte hain."
          : "Readings are computed from the numbers; your marks stay in this browser and sharpen the pattern note."}
        <YantraMotif className="size-4 text-gold" />
      </div>
    </div>
  );
}