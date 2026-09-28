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
import { gridYogas } from "@/lib/grid-yogas";
import { ReasoningBlock, PlaneBadge, DigitCell } from "@/components/loshu-kit";

export default function LoShuPage() {
  const { loShu, hasProfile } = useProfile();
  const { lang } = useT();
  const t = (key: string) => rawT(lang, key);

  if (!hasProfile || !loShu) {
    return <EmptyOr />;
  }

  const yogas = gridYogas(loShu.counts);

  return (
    <div className="space-y-8">
      <PageHeader
        title={t("navLoShu")}
        subtitle={
          lang === "hi"
            ? "आपकी जन्मतिथि के अंक 3×3 जादुई वर्ग में कहाँ बैठते हैं — तल, विकर्ण, बाण और युतियाँ।"
            : "Where the digits of your birth date sit in the 3×3 magic square — planes, diagonals, arrows and yogas."
        }
        actions={<Badge variant="gold"><Eye aria-hidden className="size-3" /> {lang === "hi" ? "ग्रिड विश्लेषण" : "Grid analysis"}</Badge>}
      />

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