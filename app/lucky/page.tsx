"use client";

/**
 * Anko Ki Maya v2 — Lucky Toolkit page: lucky numbers / traditional days /
 * colors / gems (Cheiro chart) + traditional remedies (mantra, japa, yantra,
 * daan) for the personal numbers. All framed as traditional associations.
 */

import * as React from "react";
import { Gem, CalendarDays, Palette, Scroll } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input, Label } from "@/components/ui";
import { PageHeader, EmptyState, DeityBand, RudrakshDivider } from "@/components/shared";
import { useProfile } from "@/components/seeded-profile";
import { useT } from "@/lib/lang";
import { t as rawT } from "@/lib/content";
import { luckyProfile, PLANET_FOR_NUMBER } from "@/lib/lucky";
import { reduceFully } from "@/lib/numerology";
import { REMEDIES, GOLD_NOTE } from "@/lib/remedies";
import { expandedRemedyFor, DAILY_HABITS, NEELAM_CAUTION_EN, NEELAM_CAUTION_HI } from "@/lib/remedy-table";
import { devNum } from "@/lib/navgrah";
import { vedicChart, grahaChainLine, shubhSamay, type ShubhSamay } from "@/lib/vedic";
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

  // v3.3: secret graha-chain verification line — sits inside the Basis block.
  const chainChart = vedicChart({ year: y, month: m, day: d });
  const chainSteps = [...lucky.steps, grahaChainLine(birthNumber, chainChart, lang)];

  // v3.3 rule (h): 'shubh samay' muhurat scorer — user picks a date, the
  // panchanga tables grade it for a wedding/launch start.
  const [muDate, setMuDate] = React.useState<string>("");
  const [muPurpose, setMuPurpose] = React.useState<"marriage" | "launch">("marriage");
  const [muResult, setMuResult] = React.useState<ShubhSamay | null>(null);
  function runMuhurat(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(muDate)) return;
    setMuResult(shubhSamay(new Date(`${muDate}T09:00:00`), muPurpose));
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={t("navLucky")}
        subtitle={
          lang === "hi"
            ? "Janm-ank aur Mulank ke hisaab se traditional associations — number, din, rang, ratna aur upay. Yeh parampara ke connections hain, koi guarantee nahi."
            : "Traditional associations for your birth and life-path numbers — digits, days, colors, gems and remedies. Associations of tradition, not guarantees."
        }
        actions={<Badge variant="gold"><Gem aria-hidden className="size-3" /> {lang === "hi" ? "traditional" : "traditional"}</Badge>}
      />

      {/* v3.2: durga-blessing header band — Maa ka ashirwad on the Upay page */}
      <DeityBand
        src="/img/durga-blessing.webp"
        caption={lang === "hi" ? "माँ के आशीर्वाद से" : undefined}
        objectPosition="center 22%"
        height={210}
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
            ? `Janm-ank ${birthNumber} aur Bhagyank-unit ${lifePathUnit} ke harmony-parivaar (5 sabse mel-khata).`
            : `Harmony families of birth number ${birthNumber} and Life Path unit ${lifePathUnit} (5 pairs with all).`}
        </p>
      </section>

      <ReasoningBlock title={t("luckyNumbers")} steps={chainSteps} lang={lang} />

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
            ? "Ratna-parampara ek cultural association hai — koi bhi ratna pehenne se pehle apni vivek aur (chaho to) kisi yogya guru ki salah le lo."
            : "Gem traditions are cultural associations — wear anything only by your own discernment (and, if you wish, qualified counsel)."}
        </p>
        {/* Neelam caution (owner: 8-Shani stone needs consult-before-wearing note) */}
        <div className="mt-3 rounded-lg border border-gold/40 bg-gold/5 p-3 text-xs">
          {lang === "hi"
            ? "⚠ Neelam (ank 8, Shani) — parampara ka sabse tez ratna: pehenne se pehle yogya jyotishi se apni kundali mein Shani ki sthiti check karao; bina pariksha ke na pehno."
            : "⚠ Neelam (number 8, Shani) — tradition's sharpest stone: have a qualified jyotishi check Shani's placement before wearing; never wear it untested."}
        </div>
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
                      {lang === "hi" ? `Ank ${n} — ` : `Number ${n} — `}
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

      {/* v3.2: rudraksh-shivling divider band above the remedies table */}
      <RudrakshDivider className="my-6" />

      {/* Expanded remedy table + daily habits (v3) */}
      <section aria-labelledby="remedy-v3-h">
        <h2 id="remedy-v3-h" className="font-display text-lg font-semibold">
          {lang === "hi" ? "Vistarit upay-table — graha, ratna, mantra, daan" : "Expanded remedy table — planet, gem, mantra, daan"}
        </h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b text-left text-xs text-muted-foreground">
                <th className="py-2 pr-3">{lang === "hi" ? "Ank" : "No."}</th>
                <th className="py-2 pr-3">{lang === "hi" ? "Graha" : "Planet"}</th>
                <th className="py-2 pr-3">{lang === "hi" ? "Ratna" : "Gem"}</th>
                <th className="py-2 pr-3">{lang === "hi" ? "Rang" : "Color"}</th>
                <th className="py-2 pr-3 font-devanagari">{lang === "hi" ? "Mantra + japa" : "Mantra + japa"}</th>
                <th className="py-2 font-devanagari">{lang === "hi" ? "Daan" : "Daan"}</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
                const r = expandedRemedyFor(n);
                return (
                  <tr key={n} className="border-b last:border-0">
                    <td className="py-2 pr-3 font-display text-lg text-gold">{lang === "hi" ? devNum(n) : n}</td>
                    <td className="py-2 pr-3">{lang === "hi" ? r.planetHi : r.planet}</td>
                    <td className="py-2 pr-3">{lang === "hi" ? r.gemHi : r.gem}</td>
                    <td className="py-2 pr-3">{lang === "hi" ? r.colorHi : r.color}</td>
                    <td className="py-2 pr-3 font-devanagari text-xs">
                      {r.mantra}
                      <span className="block text-[10px] text-muted-foreground">{lang === "hi" ? `japa ${devNum(r.japa)}` : `japa ${r.japa}`}</span>
                    </td>
                    <td className="py-2 font-devanagari text-xs">{lang === "hi" ? r.daanHi : r.daan}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="mt-2 rounded-lg border border-gold/40 bg-gold/5 p-3 text-xs">
            {lang === "hi" ? NEELAM_CAUTION_HI : NEELAM_CAUTION_EN}
          </p>
        </div>
      </section>

      {/* Daily habits */}
      <section aria-labelledby="habits-h">
        <h2 id="habits-h" className="font-display text-lg font-semibold">
          {lang === "hi" ? "Roz ki discipline — hafte ka ank-practice" : "Daily discipline — the week's ank-practice"}
        </h2>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {DAILY_HABITS.map((h) => (
            <Card key={h.day}>
              <CardContent className="py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold">{lang === "hi" ? h.dayHi : h.day}</p>
                <p className="mt-1 text-sm">{lang === "hi" ? h.habitHi : h.habitEn}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* v3.3 rule (h): SHUBH SAMAY — muhurat scorer for a picked date */}
      <section aria-labelledby="muhurat-h" data-testid="shubh-samay">
        <h2 id="muhurat-h" className="font-display text-lg font-semibold">
          {lang === "hi" ? "Shubh samay — date ki pariksha" : "Shubh Samay — test a picked date"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {lang === "hi"
            ? "shaadi ya launch ki date pakki karne se pehle — panchang ke mez (vaar, tithi, nakshatra, yog) date ko score karte hain; Rahu-kaal ki khidki bhi bat jaati hai."
            : "Before locking a wedding or launch date — the panchanga tables (vara, tithi, nakshatra, yoga) score the day and flag the Rahu-kala avoid-window."}
        </p>
        <Card className="mt-3">
          <CardContent className="py-4">
            <form onSubmit={runMuhurat} className="flex flex-wrap items-end gap-3" aria-label="Shubh samay checker">
              <div>
                <Label htmlFor="mu-date">{lang === "hi" ? "Date chuno" : "Pick a date"}</Label>
                <Input
                  id="mu-date"
                  type="date"
                  value={muDate}
                  onChange={(e) => setMuDate(e.target.value)}
                  className="mt-1 w-44"
                />
              </div>
              <div>
                <Label htmlFor="mu-purpose">{lang === "hi" ? "Kis kaam ke liye" : "For"}</Label>
                <select
                  id="mu-purpose"
                  value={muPurpose}
                  onChange={(e) => setMuPurpose(e.target.value as "marriage" | "launch")}
                  className="mt-1 rounded-md border bg-card px-3 py-2 text-sm"
                >
                  <option value="marriage">{lang === "hi" ? "shaadi" : "wedding"}</option>
                  <option value="launch">{lang === "hi" ? "launch/naya kaam" : "launch / new venture"}</option>
                </select>
              </div>
              <Button type="submit" size="sm" variant="secondary">
                <CalendarDays aria-hidden className="size-4" />
                {lang === "hi" ? "samay jaancho" : "Score the date"}
              </Button>
            </form>
            {muResult ? (
              <div className="mt-4 space-y-2" aria-live="polite">
                <div className="intensity" aria-hidden>
                  <span style={{ width: `${Math.min(100, Math.max(0, muResult.score))}%` }} />
                </div>
                <p className="text-sm font-medium">{lang === "hi" ? muResult.verdictHi : muResult.verdictEn}</p>
                <p className="text-xs text-muted-foreground">{muResult.panchangaLine}</p>
                {muResult.avoidEn ? (
                  <p className="rounded-lg border border-destructive/40 bg-destructive/5 p-2.5 text-xs">
                    ⚠ {lang === "hi" ? "Parhez-ghadi: " : "Avoid: "}
                    {lang === "hi" ? muResult.avoidHi : muResult.avoidEn}
                  </p>
                ) : null}
              </div>
            ) : null}
          </CardContent>
        </Card>
      </section>

      <div className="pt-2" />
    </div>
  );
}