"use client";

/**
 * Anko Ki Maya v2 — Lo Shu analysis page (v2 occult redesign).
 * Grid front-and-center with plane/diagonal/arrow analysis, grid yogas,
 * missing-number reflections and the WHY reasoning blocks.
 */

import * as React from "react";
import { Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui";
import { PageHeader, StarMotif } from "@/components/shared";
import { useProfile } from "@/components/seeded-profile";
import { useT } from "@/lib/lang";
import { t as rawT } from "@/lib/content";
import { LO_SHU_DIGIT_THEME } from "@/lib/loshu";
import { analyzeRepetitions } from "@/lib/repetitions";
import { gridYogas } from "@/lib/grid-yogas";
import { devNum } from "@/lib/navgrah";
import { vedicChart, grahaChainLine, verifyNakshatra } from "@/lib/vedic";
import { ReasoningBlock, PlaneBadge, DigitCell } from "@/components/loshu-kit";
import { planeDeep, diagonalDeep } from "@/lib/loshu-deep";
import { SanketBanner, coreFromReading } from "@/components/sanket-banner";
import { birthdayNumber, lifePath } from "@/lib/numerology";

export default function LoShuPage() {
  const { loShu, hasProfile, profile, reading } = useProfile();
  const { lang } = useT();
  const t = (key: string) => rawT(lang, key);

  if (!hasProfile || !loShu) {
    return <EmptyOr />;
  }

  const yogas = gridYogas(loShu.counts);
  const y = profile ? Number(profile.birthDate.slice(0, 4)) : 0;
  const m = profile ? Number(profile.birthDate.slice(5, 7)) : 0;
  const d = profile ? Number(profile.birthDate.slice(8, 10)) : 0;
  const mulank = reading?.birthday.number;
  const bhagyank = reading?.lifePath.number;
  const reps = y ? analyzeRepetitions(y, m, d, mulank, bhagyank) : null;

  // v3.3: secret graha-chain + nakshatra verification — Basis-block lines.
  // The nakshatra badge renders as a quiet verification strip above the grid
  // (never the word 'astrology' — 'graha pramanikaran' only).
  let chainLine: string | null = null;
  let nakBadge: string | null = null;
  if (y && mulank) {
    const vc = vedicChart({ year: y, month: m, day: d });
    chainLine = grahaChainLine(mulank, vc, lang);
    const nv = verifyNakshatra(mulank, vc);
    nakBadge = lang === "hi"
      ? `${nv.badgeHi} — janm-nakshatra ${vc.nakshatraName} (${nv.nakshatraLordGraha}), Mulank ${devNum(mulank)} (${nv.mulankGraha}) ke vachan par mohar`
      : `${nv.badgeEn} — janma nakshatra ${vc.nakshatraName} (${nv.nakshatraLordGraha}) co-signs the Mulank ${mulank} (${nv.mulankGraha}) reading`;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={t("navLoShu")}
        subtitle={
          lang === "hi"
            ? "aapki janmatithi ke ank + Bhagyank 3×3 jaaduee varg mein kaha baithate hain — tal, vikarn, baan aur yutiyaa. Bhagyank bhi grid mein bharta hai."
            : "Where the digits of your birth date AND your Bhagyank sit in the 3×3 magic square — planes, diagonals, arrows and yogas. The Bhagyank digit also fills the grid."
        }
        actions={<Badge variant="gold"><Eye aria-hidden className="size-3" />
 {lang === "hi" ? "grid vishleshan" : "Grid analysis"}</Badge>}
      />

      {/* v4.0: page-level sanket — honest warnings, app-wide (owner order) */}
      {profile ? (
        <SanketBanner
          core={coreFromReading(birthdayNumber(Number(profile.birthDate.slice(8, 10))).number, lifePath(Number(profile.birthDate.slice(0, 4)), Number(profile.birthDate.slice(5, 7)), Number(profile.birthDate.slice(8, 10))).number, undefined, profile.birthDate)}
          lang={lang}
        />
      ) : null}


      {/* v3.4 discoverability (owner: 'repetitions kaha pe hai? remedies kaha pe hai?') —
          jump chips at top: Repetitions section on this page + remedies on /lucky */}
      <div className="flex flex-wrap gap-2" data-testid="loshu-jump-chips">
        <a
          href="#repetitions-h"
          className="rounded-full border border-gold/40 bg-gold/5 px-3.5 py-1.5 text-xs font-medium text-gold transition hover:bg-gold/15 hover:shadow-[0_0_18px_-6px_color-mix(in_srgb,var(--gold)_60%,transparent)]"
        >
          {lang === "hi" ? "↓ Ank-Repetitions" : "↓ Repetitions"}
        </a>
        <a
          href="/lucky"
          className="rounded-full border border-gold/40 bg-gold/5 px-3.5 py-1.5 text-xs font-medium text-gold transition hover:bg-gold/15 hover:shadow-[0_0_18px_-6px_color-mix(in_srgb,var(--gold)_60%,transparent)]"
        >
          {lang === "hi" ? "→ Upay (Lucky aur Upay)" : "→ Remedies (/lucky)"}
        </a>
      </div>

      {/* v3.1: Bhagyank note — 'Bhagyank bhi grid mein bharta hai' */}
      <div
        data-testid="bhagyank-note"
        className="akashic-card saffron-accent-edge rounded-xl px-5 py-4 text-sm"
      >
        <span className="font-dossier font-medium text-gold">
          {lang === "hi" ? "Bhagyank bhi grid mein bharta hai — " : "The Bhagyank digit also fills the grid — "}
        </span>
        {lang === "hi"
          ? `janmatithi ke ankon ke saath Bhagyank ${devNum(loShu.bhagyank)} bhi apni kothri mein gina jaata hai${loShu.dobCounts[loShu.bhagyank] === 0 ? " — yeh ank janmatithi mein nahi tha, isliye Bhagyank ne hi use grid mein jilaayaa (ab yeh absent nahi kahalaaega)" : ""}.`
          : `alongside the birth-date digits, Bhagyank ${loShu.bhagyank} is counted into its cell${loShu.dobCounts[loShu.bhagyank] === 0 ? " — this digit was absent from the date itself, so the Bhagyank brings it to life in the grid (it no longer counts as missing)" : ""}.`}
      </div>

      {/* v3.3: nakshatra verification badge (secret layer — graha pramanikaran) */}
      {nakBadge ? (
        <div
          data-testid="nakshatra-badge"
          className="akashic-card saffron-accent-edge rounded-xl px-5 py-4 text-sm"
        >
          <span className="font-medium text-gold">✦ </span>
          {nakBadge}
        </div>
      ) : null}

      {/* Grid front-and-center */}
      <Card className="glass constellation-bg overflow-hidden">
        <CardContent className="py-8">
          <div className="mx-auto grid max-w-sm grid-cols-3 gap-2.5">
            {loShu.grid.flat().map((cell) => (
              <DigitCell key={cell.digit} digit={cell.digit} count={cell.count} lang={lang} />
            ))}
          </div>
          <hr aria-hidden className="gold-hairline-double mx-auto mt-7 w-2/3" />
          <div className="mt-5 grid gap-2 text-center text-xs text-muted-foreground sm:grid-cols-3">
            <p><span className="font-dossier font-medium text-gold">{lang === "hi" ? "man-tal" : "Mind plane"}</span> 4-9-2</p>
            <p><span className="font-dossier font-medium text-gold">{lang === "hi" ? "bhav-tal" : "Emotion plane"}</span> 3-5-7</p>
            <p><span className="font-dossier font-medium text-gold">{lang === "hi" ? "karm-tal" : "Action plane"}</span> 8-1-6</p>
          </div>
        </CardContent>
      </Card>

      {/* v3.1: REPETITIONS section (owner correction #4) */}
      {reps ? (
        <section aria-labelledby="repetitions-h" data-testid="repetitions">
          <h2 id="repetitions-h" className="akashic-heading font-display text-lg font-semibold">
            {lang === "hi" ? "Ank-Repetitions" : "Repetitions"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {lang === "hi"
              ? "poori janm-tithi mein doharaae gae ank — 2-samaan = oorja doguni (bal + chhaya), 3-samaan = atyant teevr."
              : "Repeated digits of the full birth date — 2-same = energy doubled (strength + shadow), 3-same = very intense."}
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {reps.entries.length === 0 ? (
              <p className="text-sm text-muted-foreground md:col-span-2">
                {lang === "hi"
                  ? "koi ank doharaayaa nahi gaya — oorja nau ankon mein bi hai."
                  : "No digit repeats in your date — the energy spreads across nine digits."}
              </p>
            ) : (
              reps.entries.map((e) => (
                // level-gold edict border (matches this page's other gold bands).
                <Card key={e.digit} interactive className="!border-gold/40">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between gap-2">
                      {lang === "hi" ? `ank ${devNum(e.digit)} × ${devNum(e.count)}` : `Digit ${e.digit} × ${e.count}`}
                      <Badge variant="gold">{e.level === "triple" ? (lang === "hi" ? "atyant teevr" : "very intense") : (lang === "hi" ? "doguni oorja" : "energy doubled")}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1.5 text-sm">
                    <p><span className="font-medium text-gold">{lang === "hi" ? "bal: " : "Strength: "}</span>{lang === "hi" ? e.strengthHi : e.strengthEn}</p>
                    <p><span className="font-medium text-gold">{lang === "hi" ? "chhaya: " : "Shadow: "}</span>{lang === "hi" ? e.shadowHi : e.shadowEn}</p>
                    <p className="text-xs text-muted-foreground">{lang === "hi" ? e.upayHi : e.upayEn}</p>
                  </CardContent>
                </Card>
              ))
            )}
            {reps.mulankBhagyankSame ? (
              <Card className="md:col-span-2 border-kesari/60 bg-kesari/10">
                <CardContent className="py-4">
                  <p className="font-display text-sm font-semibold text-kesari">
                    {lang === "hi"
                      ? `vishesh: Mulank aur Bhagyank dono ${devNum(reps.mulankBhagyankSame.digit)} — vaahak aur niyati ek hi graha ke haath men.`
                      : `Special callout: Mulank AND Bhagyank are both ${reps.mulankBhagyankSame.digit} — one planet holds both reins.`}
                  </p>
                  <p className="mt-1 text-sm">{lang === "hi" ? reps.mulankBhagyankSame.strengthHi : reps.mulankBhagyankSame.strengthEn}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{lang === "hi" ? reps.mulankBhagyankSame.shadowHi : reps.mulankBhagyankSame.shadowEn}</p>
                  <p className="mt-1.5 text-xs text-gold">{lang === "hi" ? reps.mulankBhagyankSame.upayHi : reps.mulankBhagyankSame.upayEn}</p>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </section>
      ) : null}

      <ReasoningBlock
        title={t("navLoShu")}
        steps={chainLine ? [...loShu.steps, chainLine] : loShu.steps}
        lang={lang}
      />

      {/* Planes */}
      <section aria-labelledby="planes-h">
        <h2 id="planes-h" className="akashic-heading font-display text-lg font-semibold">{t("planes")}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {loShu.planes.map((p) => (
            <Card key={p.key} interactive>
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2">
                  {p.name}
                  <PlaneBadge complete={p.complete} lang={lang} />
                </CardTitle>
                <p className="text-xs text-gold">{p.digits.join("-")}</p>
              </CardHeader>
              <CardContent>
                {(() => {
                  const present = p.digits.filter((dg) => loShu.counts[dg] > 0).length;
                  const dp = planeDeep(p.key, present, lang);
                  return (
                    <>
                      <p className="text-sm font-semibold">{dp.head}</p>
                      <p className="mt-1.5 text-sm leading-relaxed">{dp.body}</p>
                      <div className="mt-2 rounded-lg border border-gold/30 bg-gold/5 px-3 py-2">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                          {lang === "hi" ? "upay" : "upay"}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed">{dp.upay}</p>
                      </div>
                    </>
                  );
                })()}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Diagonals */}
      <section aria-labelledby="diag-h">
        <h2 id="diag-h" className="akashic-heading font-display text-lg font-semibold">{t("diagonals")}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {loShu.diagonals.map((d) => (
            <Card key={d.key} interactive>
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2">
                  {d.name}
                  <PlaneBadge complete={d.complete} lang={lang} />
                </CardTitle>
                <p className="text-xs text-gold">{d.digits.join("-")}</p>
              </CardHeader>
              <CardContent>
                {(() => {
                  const dd = diagonalDeep(d.key, d.complete, lang);
                  return (
                    <>
                      <p className="text-sm font-semibold">{dd.head}</p>
                      <p className="mt-1.5 text-sm leading-relaxed">{dd.body}</p>
                      <div className="mt-2 rounded-lg border border-gold/30 bg-gold/5 px-3 py-2">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                          {lang === "hi" ? "upay" : "upay"}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed">{dd.upay}</p>
                      </div>
                    </>
                  );
                })()}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Grid yogas */}
      <section aria-labelledby="yogas-h">
        <h2 id="yogas-h" className="akashic-heading font-display text-lg font-semibold">{t("gridYogas")}</h2>
        {yogas.yogas.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            {lang === "hi"
              ? "is grid mein koi paribhaashit yuti-paitarn nahi mila — akele ank apna svar akele gaate hain."
              : "No defined yoga pattern in this grid — the digits sing solo."}
          </p>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {yogas.yogas.map((y) => (
              <Card key={y.id} interactive>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-2">
                    {lang === "hi" ? y.titleHi : y.titleEn}
                    <Badge variant={y.kind === "triple" ? "default" : "secondary"}>{y.digits.join("-")}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{lang === "hi" ? y.noteHi : y.noteEn}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        <ReasoningBlock title={t("gridYogas")} steps={yogas.steps} lang={lang} className="mt-3" />
      </section>

      {/* Missing numbers */}
      <section aria-labelledby="missing-h">
        <h2 id="missing-h" className="akashic-heading font-display text-lg font-semibold">{t("missingNumbers")}</h2>
        {loShu.missing.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            {lang === "hi"
              ? "sabhi nau ank maujood — ek durlabh, sntulit grid."
              : "All nine digits present — a rare, balanced grid."}
          </p>
        ) : (
          <div className="mt-3 space-y-2.5">
            {loShu.missing.map((d) => (
              <Card key={d}>
                <CardContent className="flex items-start gap-4 py-4">
                  <span aria-hidden className="number-glyph mandala-ring grid size-12 shrink-0 place-items-center rounded-full text-xl text-muted-foreground opacity-60">
                    {d}
                  </span>
                  <div>
                    <p className="text-sm font-medium">
                      {lang === "hi" ? `ank ${d} — ${LO_SHU_DIGIT_THEME[d]}` : `Digit ${d} — ${LO_SHU_DIGIT_THEME[d]}`}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {loShu.missingNotes[loShu.missing.indexOf(d)]}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* v3.4 remedies teaser card (owner: 'remedies kaha pe hai?') — points to /lucky */}
      <div
        data-testid="loshu-remedies-teaser"
        className="akashic-card rounded-xl px-5 py-4"
      >
        <p className="text-sm">
          {lang === "hi"
            ? "upay kaha hain? — Lucky aur Upay page par: rang, din, ank aur aapke planet-baal upay ek saath."
            : "Where are the remedies? — On the Lucky aur Upay page: colours, days, numbers and your planet-bal remedies together."}
        </p>
        <a
          href="/lucky"
          className="mt-1 inline-block text-sm font-medium text-gold underline underline-offset-4"
        >
          {lang === "hi" ? "Lucky aur Upay kholo →" : "Open Lucky & Upay →"}
        </a>
      </div>

      <div className="flex justify-center py-2">
        <StarMotif className="size-8 text-gold opacity-60" />
      </div>
    </div>
  );
}

function EmptyOr() {
  return (
    <Card className="border-dashed">
      <CardContent className="py-10 text-center text-sm text-muted-foreground">
        Add your birth details first — the grid reads your date of birth.
      </CardContent>
    </Card>
  );
}