"use client";

/**
 * Anko Ki Maya v2 — Lucky Toolkit page: lucky numbers / traditional days /
 * colors / gems (Cheiro chart) + traditional remedies (mantra, japa, yantra,
 * daan) for the personal numbers. All framed as traditional associations.
 */

import * as React from "react";
import { Gem, CalendarDays, Palette, Scroll } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui";
import { PageHeader, EmptyState } from "@/components/shared";
import { useProfile } from "@/components/seeded-profile";
import { useT } from "@/lib/lang";
import { t as rawT } from "@/lib/content";
import { luckyProfile, PLANET_FOR_NUMBER } from "@/lib/lucky";
import { reduceFully } from "@/lib/numerology";
import { REMEDIES, GOLD_NOTE } from "@/lib/remedies";
import { ReasoningBlock } from "@/components/loshu-kit";

export default function LuckyPage() {
  const { profile, hasProfile } = useProfile();
  const { lang } = useT();
  const t = (key: string) => rawT(lang, key);

  if (!hasProfile || !profile) {
    return <EmptyState title="No profile yet" body="Add your birth details to see your lucky toolkit." />;
  }

  const y = Number(profile.birthDate.slice(0, 4));
  const m = Number(profile.birthDate.slice(5, 7));
  const d = Number(profile.birthDate.slice(8, 10));
  const lp = 1 + (m * 9) % 9; // placeholder replaced below
  void lp;
  const lifePathUnit = reduceFully(
    (m === 11 || m === 22 ? m : m) + (d > 9 ? String(d).split("").reduce((s, x) => s + Number(x), 0) : d) + reduceFully(y),
  );
  const birthNumber = reduceFully(d);
  const lucky = luckyProfile(d, lifePathUnit, reduceFully);

  const primaryNumbers = Array.from(new Set([birthNumber, lifePathUnit])).filter((n) => n <= 9);

  return (
    <div className="space-y-8">
      <PageHeader
        title={t("navLucky")}
        subtitle={
          lang === "hi"
            ? "जन्म-अंक और मूलांक के अनुसार पारंपरिक संबद्धताएँ — अंक, दिन, रंग, रत्न और उपाय। ये परंपरा की संबद्धताएँ हैं, गारंटी नहीं।"
            : "Traditional associations for your birth and life-path numbers — digits, days, colors, gems and remedies. Associations of tradition, not guarantees."
        }
        actions={<Badge variant="gold"><Gem aria-hidden className="size-3" /> {lang === "hi" ? "परंपरागत" : "traditional"}</Badge>}
      />

      {/* Lucky numbers */}
      <section aria-labelledby="lucky-n-h">
        <h2 id="lucky-n-h" className="font-display text-lg font-semibold">{t("luckyNumbers")}</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          {lucky.numbers.map((n) => (
            <div
              key={n}
              aria-hidden
              className="number-glyph mandala-ring grid size-16 place-items-center rounded-full glass text-2xl text-primary dark:text-gold-bright"
            >
              {n}
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {lang === "hi"
            ? `जन्म-अंक ${birthNumber} और मूलांक-इकाई ${lifePathUnit} के अनुसरण-परिवार (5 सबसे मेल-खाता)।`
            : `Harmony families of birth number ${birthNumber} and Life Path unit ${lifePathUnit} (5 pairs with all).`}
        </p>
      </section>

      <ReasoningBlock title={t("luckyNumbers")} steps={lucky.steps} lang={lang} />

      {/* Days */}
      <section aria-labelledby="lucky-d-h">
        <h2 id="lucky-d-h" className="flex items-center gap-2 font-display text-lg font-semibold">
          <CalendarDays aria-hidden className="size-5 text-gold" /> {t("luckyDays")}
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {lucky.days.map((day) => (
            <Badge key={day} variant="secondary" className="px-3 py-1 text-sm">{day}</Badge>
          ))}
        </div>
      </section>

      {/* Colors */}
      <section aria-labelledby="lucky-c-h">
        <h2 id="lucky-c-h" className="flex items-center gap-2 font-display text-lg font-semibold">
          <Palette aria-hidden className="size-5 text-gold" /> {t("luckyColors")}
        </h2>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {lucky.colors.map((c) => (
            <Card key={c.en}>
              <CardContent className="flex items-center justify-between py-3">
                <span className="text-sm">{lang === "hi" ? c.hi : c.en}</span>
                <span className="text-xs text-muted-foreground">{lang === "hi" ? c.en : c.hi}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Gems */}
      <section aria-labelledby="lucky-g-h">
        <h2 id="lucky-g-h" className="flex items-center gap-2 font-display text-lg font-semibold">
          <Gem aria-hidden className="size-5 text-gold" /> {t("luckyGems")}
        </h2>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {lucky.gems.map((g) => (
            <Card key={g.en}>
              <CardContent className="flex items-center justify-between py-3">
                <span className="text-sm">{lang === "hi" ? g.hi : g.en}</span>
                <span className="text-xs text-muted-foreground">{lang === "hi" ? g.en : g.hi}</span>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {lang === "hi"
            ? "रत्न-परंपरा सांस्कृतिक संबद्धता है — कोई भी रत्न धारण करने से पहले अपने विवेक और (चाहें तो) किसी योग्य गुरु की सलाह लें।"
            : "Gem traditions are cultural associations — wear anything only by your own discernment (and, if you wish, qualified counsel)."}
        </p>
      </section>

      {/* Remedies */}
      <section aria-labelledby="remedy-h">
        <h2 id="remedy-h" className="flex items-center gap-2 font-display text-lg font-semibold">
          <Scroll aria-hidden className="size-5 text-gold" /> {t("remedies")}
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">{t("remedyDisclaimer")}</p>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {primaryNumbers.map((n) => {
            const rem = REMEDIES[n] ?? REMEDIES[1];
            return (
              <Card key={n} className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>
                      {lang === "hi" ? `अंक ${n} — ` : `Number ${n} — `}
                      {lang === "hi" ? rem.planetKey : PLANET_FOR_NUMBER[n]}
                    </span>
                    <span aria-hidden className="number-glyph text-2xl text-gold">{n}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2.5 text-sm">
                  <p>
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t("mantra")}: </span>
                    <span className="font-devanagari text-base text-gold">{rem.mantra}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("japaCount")}: {rem.japa} × {rem.japaSets} — {lang === "hi" ? rem.worshipDay : rem.worshipDay}
                  </p>
                  <p>
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t("yantra")}: </span>
                    <span className="font-devanagari">{rem.yantra}</span>
                  </p>
                  <p>
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t("daan")}: </span>
                    <span className="font-devanagari">{rem.daan.join(" · ")}</span>
                  </p>
                  {rem.extraNote ? (
                    <p className="font-devanagari text-xs text-muted-foreground">{rem.extraNote}</p>
                  ) : null}
                </CardContent>
              </Card>
            );
          })}
        </div>
        <p className="mt-3 font-devanagari text-xs text-muted-foreground">{GOLD_NOTE}</p>
      </section>

      <div className="pt-2" />
    </div>
  );
}