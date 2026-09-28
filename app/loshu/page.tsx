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
import { ReasoningBlock, PlaneBadge, DigitCell } from "@/components/loshu-kit";

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

  return (
    <div className="space-y-8">
      <PageHeader
        title={t("navLoShu")}
        subtitle={
          lang === "hi"
            ? "आपकी जन्मतिथि के अंक + भाग्यांक 3×3 जादुई वर्ग में कहाँ बैठते हैं — तल, विकर्ण, बाण और युतियाँ। भाग्यांक भी ग्रिड में भरता है।"
            : "Where the digits of your birth date AND your Bhagyank sit in the 3×3 magic square — planes, diagonals, arrows and yogas. The Bhagyank digit also fills the grid."
        }
        actions={<Badge variant="gold"><Eye aria-hidden className="size-3" /> {lang === "hi" ? "ग्रिड विश्लेषण" : "Grid analysis"}</Badge>}
      />

      {/* v3.1: Bhagyank note — 'भाग्यांक भी ग्रिड में भरता है' */}
      <div
        data-testid="bhagyank-note"
        className="rounded-xl border border-gold/40 bg-gold/5 px-4 py-3 text-sm"
      >
        <span className="font-medium text-gold">
          {lang === "hi" ? "भाग्यांक भी ग्रिड में भरता है — " : "The Bhagyank digit also fills the grid — "}
        </span>
        {lang === "hi"
          ? `जन्मतिथि के अंकों के साथ भाग्यांक ${devNum(loShu.bhagyank)} भी अपनी कोठरी में गिना जाता है${loShu.dobCounts[loShu.bhagyank] === 0 ? " — यह अंक जन्मतिथि में नहीं था, इसलिए भाग्यांक ने ही उसे ग्रिड में जिलाया (अब यह अनुपस्थित नहीं कहलाएगा)" : ""}।`
          : `alongside the birth-date digits, Bhagyank ${loShu.bhagyank} is counted into its cell${loShu.dobCounts[loShu.bhagyank] === 0 ? " — this digit was absent from the date itself, so the Bhagyank brings it to life in the grid (it no longer counts as missing)" : ""}.`}
      </div>

      {/* Grid front-and-center */}
      <Card className="glass constellation-bg overflow-hidden">
        <CardContent className="py-8">
          <div className="mx-auto grid max-w-sm grid-cols-3 gap-2.5">
            {loShu.grid.flat().map((cell) => (
              <DigitCell key={cell.digit} digit={cell.digit} count={cell.count} lang={lang} />
            ))}
          </div>
          <div className="mt-6 grid gap-2 text-center text-xs text-muted-foreground sm:grid-cols-3">
            <p><span className="font-medium text-gold">{lang === "hi" ? "मन-तल" : "Mind plane"}</span> 4-9-2</p>
            <p><span className="font-medium text-gold">{lang === "hi" ? "भाव-तल" : "Emotion plane"}</span> 3-5-7</p>
            <p><span className="font-medium text-gold">{lang === "hi" ? "कर्म-तल" : "Action plane"}</span> 8-1-6</p>
          </div>
        </CardContent>
      </Card>

      {/* v3.1: REPETITIONS section (owner correction #4) */}
      {reps ? (
        <section aria-labelledby="repetitions-h" data-testid="repetitions">
          <h2 id="repetitions-h" className="font-display text-lg font-semibold">
            {lang === "hi" ? "अंक-पुनरावृत्ति (Repetitions)" : "Repetitions"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {lang === "hi"
              ? "पूरी जन्म-तिथि में दोहराए गए अंक — 2-समान = ऊर्जा दोगुनी (बल + छाया), 3-समान = अत्यंत तीव्र।"
              : "Repeated digits of the full birth date — 2-same = energy doubled (strength + shadow), 3-same = very intense."}
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {reps.entries.length === 0 ? (
              <p className="text-sm text-muted-foreground md:col-span-2">
                {lang === "hi"
                  ? "कोई अंक दोहराया नहीं गया — ऊर्जा नौ अंकों में बँटी है।"
                  : "No digit repeats in your date — the energy spreads across nine digits."}
              </p>
            ) : (
              reps.entries.map((e) => (
                <Card key={e.digit} interactive>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between gap-2">
                      {lang === "hi" ? `अंक ${devNum(e.digit)} × ${devNum(e.count)}` : `Digit ${e.digit} × ${e.count}`}
                      <Badge variant="gold">{e.level === "triple" ? (lang === "hi" ? "अत्यंत तीव्र" : "very intense") : (lang === "hi" ? "दोगुनी ऊर्जा" : "energy doubled")}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1.5 text-sm">
                    <p><span className="font-medium text-gold">{lang === "hi" ? "बल: " : "Strength: "}</span>{lang === "hi" ? e.strengthHi : e.strengthEn}</p>
                    <p><span className="font-medium text-gold">{lang === "hi" ? "छाया: " : "Shadow: "}</span>{lang === "hi" ? e.shadowHi : e.shadowEn}</p>
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
                      ? `विशेष: मूलांक और भाग्यांक दोनों ${devNum(reps.mulankBhagyankSame.digit)} — वाहक और नियति एक ही ग्रह के हाथ में।`
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

      <ReasoningBlock title={t("navLoShu")} steps={loShu.steps} lang={lang} />

      {/* Planes */}
      <section aria-labelledby="planes-h">
        <h2 id="planes-h" className="font-display text-lg font-semibold">{t("planes")}</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
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
                <p className="text-sm text-muted-foreground">{p.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Diagonals */}
      <section aria-labelledby="diag-h">
        <h2 id="diag-h" className="font-display text-lg font-semibold">{t("diagonals")}</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
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
                <p className="text-sm text-muted-foreground">{d.note}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Grid yogas */}
      <section aria-labelledby="yogas-h">
        <h2 id="yogas-h" className="font-display text-lg font-semibold">{t("gridYogas")}</h2>
        {yogas.yogas.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            {lang === "hi"
              ? "इस ग्रिड में कोई परिभाषित युति-पैटर्न नहीं मिला — अकेले अंक अपना स्वर अकेले गाते हैं।"
              : "No defined yoga pattern in this grid — the digits sing solo."}
          </p>
        ) : (
          <div className="mt-3 grid gap-3 md:grid-cols-2">
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
        <h2 id="missing-h" className="font-display text-lg font-semibold">{t("missingNumbers")}</h2>
        {loShu.missing.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            {lang === "hi"
              ? "सभी नौ अंक उपस्थित — एक दुर्लभ, संतुलित ग्रिड।"
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
                      {lang === "hi" ? `अंक ${d} — ${LO_SHU_DIGIT_THEME[d]}` : `Digit ${d} — ${LO_SHU_DIGIT_THEME[d]}`}
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