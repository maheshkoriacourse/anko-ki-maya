"use client";

/**
 * v3.9 Mahadasha timeline card (owner order, 30 Sep: "dasha mahadasha analysis
 * nahi hai... include karo"). Full 9-mahadasha Vimshottari timeline for the
 * profile — CURRENT dasha highlighted, its antardashas listed, school graha
 * names + the vedic-content essays, bilingual. Plugged into /blueprint under
 * the Ank+Graha pariksha card.
 */

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { buildMahadasha, masterSummary } from "@/lib/mahadasha";
import { MASTER_MEANINGS } from "@/lib/meanings";
import { devNum } from "@/lib/navgrah";

interface Props {
  birth: { year: number; month: number; day: number };
  now: Date;
  lang: "en" | "hi";
}

export function MahadashaTimeline({ birth, now, lang }: Props) {
  const hi = lang === "hi";
  const md = React.useMemo(() => buildMahadasha(birth, now), [birth.year, birth.month, birth.day, now]);

  const fmt = (d: Date) => {
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const y = d.getFullYear();
    return hi ? `${devNum(dd)}-${devNum(mm)}-${devNum(y)}` : `${dd}/${mm}/${y}`;
  };
  const yr = (d: Date) => (hi ? devNum(String(d.getFullYear())) : String(d.getFullYear()));

  return (
    <Card className="glass mt-4" data-testid="mahadasha-timeline">
      <CardHeader>
        <CardTitle className="text-base">
          {hi ? "Mahadasha timeline — jeevan ke 9 pahalu" : "Mahadasha timeline — life's nine periods"}
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          {hi
            ? " Vimshottari dasha ka poora naksha — kaunsa graha kaal kya paalta hai. abhi wali dasha chamakti hai, uske andar ki antardasha bhi saath hai."
            : "The complete Vimshottari map — which graha's era builds what. The current dasha is lit; its antardasha rides along."}
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* current-dasha strip */}
        <div className="rounded-lg border border-gold/40 bg-gold/5 p-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold">
            {hi ? "abhi ki dasha" : "Running dasha"}
          </p>
          <p className="mt-1.5">{hi ? md.headerHi : md.headerEn}</p>
        </div>

        {/* the 9 rows */}
        <ol className="space-y-2" aria-label="Mahadasha list">
          {md.rows.map((r) => (
            <li
              key={r.lord + r.start.toISOString()}
              data-testid={`md-row-${r.lord}`}
              data-current={r.isCurrent}
              className={`rounded-lg border p-3 text-sm ${
                r.isCurrent ? "border-gold/60 bg-secondary/70" : "border-border bg-transparent"
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <p className="font-semibold">
                  {hi ? `${r.school} Mahadasha — ${devNum(String(Math.round(r.years)))} saal` : `${r.school} Mahadasha — ${Math.round(r.years)} years`}
                  {r.isCurrent ? <span className="ml-2 text-xs text-gold">{hi ? "● chal rahi hai" : "● running now"}</span> : null}
                  {r.isNext && !r.isCurrent ? <span className="ml-2 text-xs text-muted-foreground">{hi ? "agli" : "next"}</span> : null}
                </p>
                <p className="text-xs text-muted-foreground">
                  {fmt(r.start)} → {yr(r.end)}
                </p>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed">{hi ? r.essayHi : r.essayEn}</p>
              {r.isCurrent && md.currentAntars.length > 0 ? (
                <div className="mt-2 rounded-md border border-border bg-background/40 p-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gold/90">
                    {hi ? "iske andar ke antardasha" : "Antardashas inside"}
                  </p>
                  <ul className="mt-1 grid grid-cols-1 gap-0.5 sm:grid-cols-3">
                    {md.currentAntars.map((a, ai) => (
                      <li
                        key={a.lord + a.start.toISOString()}
                        className={`rounded px-1.5 py-0.5 text-xs ${ai === md.currentAntarIndex ? "bg-gold/15 font-semibold text-gold" : "text-muted-foreground"}`}
                      >
                        {hi ? `${devNum(String(Math.round((a.end.getTime() - a.start.getTime()) / 31557600000)))}y ` : `${Math.round((a.end.getTime() - a.start.getTime()) / 31557600000)}y `}
                        {a.school}: {fmt(a.start)}–{fmt(a.end)}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}

/**
 * v3.9 Master-number analysis card — shows when Mulank/Bhagyank/Namank is
 * 11/22/33. Full meaning + folded single-digit line. Plugged into /overview
 * above the mulank-bhagyank card.
 */
export function MasterNumberCard({
  candidates,
  lang,
}: {
  candidates: { label: string; labelHi: string; number: number }[];
  lang: "en" | "hi";
}) {
  const hi = lang === "hi";
  const ms = masterSummary(candidates, lang);
  if (!ms.isMaster || !ms.primary) return null;
  const p = ms.primary;

  return (
    <Card className="glass mt-4" data-testid="master-number-card">
      <CardHeader>
        <CardTitle className="text-base">{hi ? p.title.replace("Master", "Master") : p.title}</CardTitle>
        <p className="text-xs font-semibold text-gold">
          {hi
            ? ms.masters.map((c) => `${c.labelHi} ${c.number}`).join(", ")
            : ms.masters.map((c) => `${c.label} ${c.number}`).join(", ")}
        </p>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p className="leading-relaxed">{hi ? essenceHi(p.number) : p.essence}</p>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? "shaktiyan" : "Strengths"}</p>
          <p className="mt-1 leading-relaxed">{strengthsFor(p.number, hi)}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? "sambhal" : "Growth edge"}</p>
          <p className="mt-1 leading-relaxed">{growthFor(p.number, hi)}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? "khud se poochho" : "Ask yourself"}</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            {p.reflection.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-gold/30 bg-gold/5 p-3">
          <p className="leading-relaxed">{hi ? ms.lineHi : ms.lineEn}</p>
        </div>
      </CardContent>
    </Card>
  );
}

/* Local bilingual bridges — MASTER_MEANINGS carries EN copy; the hi side is
   composed from the same fields (school Hinglish voice, no formal Hindi). */
function essenceHi(n: number): string {
  if (n === 11) return "2 ka tez roop: gehri antar-drishti aur inspiration — ye number wo mann padhne wala hai jo paani ke neeche ki lahar sabse pehle mehsoos karta hai.";
  if (n === 22) return "4 ka tez roop: bade kaam banaane wala — ye number system mein sapne dekhta hai aur imaaron se kai logon ka khayal rakhta hai.";
  return "6 ka tez roop: seva mast — ye number sirf apne gher ke liye, poore samaj ke liye dil kholta hai.";
}
function strengthsFor(n: number, hi: boolean): string {
  if (hi) {
    if (n === 11) return "drishti, samvedana, apni upasthiti se kamron ko bharna, adhyatm ki jigyasa.";
    if (n === 22) return "practical ideal, virasat-scale kaam ke liye dhairya, netritva.";
    return "gehi karuna, theek karne wali upasthiti, sajni ki mentorship.";
  }
  return MASTER_MEANINGS[n].strengths;
}
function growthFor(n: number, hi: boolean): string {
  if (hi) {
    if (n === 11) return "tez apne-mein-shak ban jaata hai — bharosa ko ek chhote roz ke step se zameen par utaaro.";
    if (n === 22) return "sapne ka wajan bhaari lagta hai — perfection nahi, progress gino.";
    return "sabko sambhalna aapko dhakel sakta hai — dena sustain karo, wells ko bharo.";
  }
  return MASTER_MEANINGS[n].growthEdge;
}