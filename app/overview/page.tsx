"use client";

/**
 * ANKO KI MAYA v3 — OVERVIEW = "Abhi ka haal" (owner-mandated chapter 1).
 * Where you stand right now: Ank Dasha (year/month/day) + Mulank/Bhagyank
 * state + Navgrah behaviour lines — direct, personal, powerful.
 * Then the 6-month weather, deep-dive tiles and journal shortcut.
 */

import * as React from "react";
import { CalendarDays, Flame, Smartphone, Crown, Grid3X3, Gem, Repeat } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui";
import {
  PageHeader, NumberCard, JournalShortcut, DiyaMotif, YantraMotif, EmptyState, LoadingCards, DivineHero,
} from "@/components/shared";
import { useProfile } from "@/components/seeded-profile";
import { useT } from "@/lib/lang";
import { t as rawT } from "@/lib/content";
import { ANK_DASHA_YEAR, ANK_DASHA_MONTH, mulankBhagyankState } from "@/lib/voice";
import { MasterNumberCard } from "@/components/mahadasha-section";
import { personalYear, personalMonth, personalDay, upcomingMonths, monthName, type MonthCycle } from "@/lib/numerology";
import { grahaFor, devNum, planetRelation, RELATION_LABEL } from "@/lib/navgrah";
import { vedicChart, dashaMonthFlavor, verifyNakshatra, grahaChainLine } from "@/lib/vedic";
import { nakshatraText } from "@/lib/vedic-content";
import { SanketBanner, coreFromReading } from "@/components/sanket-banner";
import { birthdayNumber as _bn, lifePath as _lp } from "@/lib/numerology";

export default function OverviewPage() {
  const { profile, reading, today, hasProfile } = useProfile();
  const { lang } = useT();
  const t = (key: string) => rawT(lang, key);
  const hi = lang === "hi";
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    const timer = setTimeout(() => setReady(true), 350); // brief, intentional skeleton
    return () => clearTimeout(timer);
  }, []);

  if (!ready) return <LoadingCards count={4} label="Loading your overview" />;

  if (!reading || !profile) {
    return (
      <EmptyState
        title={hi ? "pehle janm-vivaran do" : "No profile yet"}
        body={hi ? "naam aur janm-tithi do — vachan turnt khulega." : "Give name and birth date — the reading opens instantly."}
        action={<a href="/" className="text-sm text-primary underline">{hi ? "shuru karein" : "Start onboarding"}</a>}
      />
    );
  }

  const firstName = profile.preferredName || profile.birthName.split(" ")[0];
  const birthMonth = Number(profile.birthDate.slice(5, 7));
  const birthDay = Number(profile.birthDate.slice(8, 10));
  const mulank = reading.birthday.number;
  const bhagyank = reading.lifePath.number;

  const currentPY = personalYear(birthMonth, birthDay, today.getFullYear());
  const dashaYear = ANK_DASHA_YEAR[currentPY.number] ?? ANK_DASHA_YEAR[1];
  const pmNow = personalMonth(currentPY.number, today.getMonth() + 1).number;
  const dashaMonth = ANK_DASHA_MONTH[pmNow] ?? ANK_DASHA_MONTH[1];
  const pDay = personalDay(pmNow, today.getDate());
  const state = mulankBhagyankState(mulank, bhagyank, currentPY.number, lang);
  const gMul = grahaFor(mulank);
  const gBhag = grahaFor(bhagyank);
  const mulBhagRel = planetRelation(mulank, bhagyank);

  const months: MonthCycle[] = upcomingMonths(
    birthMonth,
    birthDay,
    today.getFullYear(),
    today.getMonth() + 1,
    6,
  );

  // v3.3 secret layer — dasha-precision for each month card + nakshatra
  // verification of the Mulank reading + the graha-chain Basis line.
  const vc = vedicChart({
    year: Number(profile.birthDate.slice(0, 4)),
    month: birthMonth,
    day: birthDay,
    hour: 12,
    minute: 0,
  });
  const monthFlavor = new Map<string, ReturnType<typeof dashaMonthFlavor>>();
  for (const m of months) {
    monthFlavor.set(m.label, dashaMonthFlavor(mulank, vc, new Date(m.year, m.month - 1, 1)));
  }
  const nakVerify = verifyNakshatra(mulank, vc);
  const chainLine = grahaChainLine(mulank, vc, lang);

  const hotMonths = months
    .filter((m) => [1, 3, 8, 9].includes(m.personalMonth))
    .slice(0, 3)
    .map((m) => ({
      label: m.label,
      pm: m.personalMonth,
      text: ANK_DASHA_MONTH[m.personalMonth]?.[hi ? "lineHi" : "lineEn"] ?? "",
    }));

  return (
    <div className="space-y-8">
      {/* v3.1: cinematic divine hero — greeting overlays the banner */}
      <DivineHero
        title={hi ? `namaste, ${firstName}` : `Namaste, ${firstName}`}
        subtitle={
          hi
            ? `Ank Dasha ${devNum(currentPY.number)} chal rahi hai — ${dashaYear.nameHi}. neeche poora hisaab: abhi kaha khadae hain, aage kyaa chalega.`
            : `Ank Dasha ${currentPY.number} runs now — ${dashaYear.name}. Below: where you stand and what runs next.`
        }
        actions={
          <Badge variant="gold" className="hero-badge">
            <DiyaMotif aria-hidden className="size-3.5" />
            {hi ? "jyotish ka ank-hissa" : "Ank Shastra"}
          </Badge>
        }
      />

      {/* v4.0: page-level sanket — app-wide honest warnings (owner order) */}
      <SanketBanner
        core={coreFromReading(reading.birthday.number, reading.lifePath.number, reading.nameNumbers?.expression, profile.birthDate)}
        lang={lang}
      />

      {/* ---------- ABHI KA HAAL (chapter-1 hero) ---------- */}
      <Card className="glass yantra-bg">
        <CardHeader>
          <CardTitle className="akashic-heading font-display text-xl">
            {hi ? "Abhi ka haal — aap is vakat kaha khadae hain" : "Abhi Ka Haal — where you stand right now"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Ank Dasha trio */}
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="akashic-card gold-hairline-double-bottom rounded-xl border bg-gold/5 px-5 py-6 text-center">
              <p className="akashic-heading text-xs font-semibold uppercase tracking-widest text-gold">{t("personalYear")}</p>
              <p aria-hidden className="number-glyph font-dossier mt-1 text-6xl text-gold dark:text-gold-bright">{hi ? devNum(currentPY.number) : currentPY.number}</p>
              <p className="mt-1 text-xs text-muted-foreground">{today.getFullYear()} · {grahaFor(currentPY.number).graha}</p>
            </div>
            <div className="akashic-card rounded-xl border bg-gold/5 px-5 py-6 text-center">
              <p className="akashic-heading text-xs font-semibold uppercase tracking-widest text-gold">{t("personalMonth")}</p>
              <p aria-hidden className="number-glyph font-dossier mt-1 text-6xl text-gold dark:text-gold-bright">{hi ? devNum(pmNow) : pmNow}</p>
              <p className="mt-1 text-xs text-muted-foreground">{monthName(today.getMonth() + 1)}</p>
            </div>
            <div className="akashic-card rounded-xl border bg-gold/5 px-5 py-6 text-center">
              <p className="akashic-heading text-xs font-semibold uppercase tracking-widest text-gold">{t("personalDay")}</p>
              <p aria-hidden className="number-glyph font-dossier mt-1 text-6xl text-gold dark:text-gold-bright">{hi ? devNum(pDay.number) : pDay.number}</p>
              <p className="mt-1 text-xs text-muted-foreground">{today.getDate()} {monthName(today.getMonth() + 1).slice(0, 3)}</p>
            </div>
          </div>

          {/* Direct dasha narrative */}
          <div className="akashic-card rounded-xl border bg-secondary/40 px-5 py-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">{dashaYear.name}</p>
            <p className="mt-1.5 text-sm font-medium leading-relaxed">{hi ? dashaYear.lineHi : dashaYear.lineEn}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{hi ? "is mahine: " : "This month: "}</span>
              {hi ? dashaMonth.lineHi : dashaMonth.lineEn}
            </p>
            <p className="mt-2 text-sm">
              <span className="font-semibold">{hi ? "is saal ka vrat: " : "This year's vow: "}</span>
              {hi ? dashaYear.actionHi : dashaYear.actionEn}
            </p>
          </div>

          {/* v3.9: master numbers 11/22/33 — full analysis when present */}
          <MasterNumberCard
            lang={lang}
            candidates={[
              { label: hi ? "Mulank" : "Mulank", labelHi: "mulank", number: mulank },
              { label: hi ? "Bhagyank" : "Bhagyank", labelHi: "bhagyank", number: bhagyank },
              { label: hi ? "Namank" : "Namank", labelHi: "namank", number: reading.nameNumbers.expression },
            ]}
          />

          {/* Mulank/Bhagyank state */}
          <div className="akashic-card rounded-xl border px-5 py-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">
              {hi ? "Mulank · Bhagyank ki sthiti" : "Mulank · Bhagyank state"}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed">{hi ? state.hi : state.en}</p>
            <p className="mt-2 text-sm leading-relaxed">
              {hi
                ? `Mulank ${devNum(mulank)} = ${gMul.grahaHi}: ${gMul.behaviorHi}`
                : `Mulank ${mulank} = ${gMul.graha}: ${gMul.behaviorEn}`}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {hi
                ? `Bhagyank ${devNum(bhagyank)} = ${gBhag.grahaHi}: ${gBhag.behaviorHi}`
                : `Bhagyank ${bhagyank} = ${gBhag.graha}: ${gBhag.behaviorEn}`}
            </p>
            <p className="mt-2 text-xs text-gold">
              {hi
                ? `dono grahon ka sambandh: ${RELATION_LABEL[mulBhagRel].hi}`
                : `Planet relation: ${RELATION_LABEL[mulBhagRel].en}`}
            </p>

            {/* v3.3: nakshatra verification badge (rule a — double pramanikaran) */}
            <div
              data-testid="nakshatra-verify"
              className="rounded-lg border border-gold/40 bg-gold/5 px-3 py-2.5"
            >
              <p className="text-xs font-medium text-gold">
                ✦ {hi ? nakVerify.badgeHi : nakVerify.badgeEn}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {hi ? nakVerify.lineHi : nakVerify.lineEn}
              </p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                {hi
                  ? `janm-nakshatra ${vc.nakshatraName} (pada ${devNum(vc.pada)}) — ${nakshatraText(vc.nakshatra, lang)}`
                  : `Janma nakshatra ${vc.nakshatraName} (pada ${vc.pada}) — ${nakshatraText(vc.nakshatra, lang)}`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ---------- CORE NUMBER CARDS ---------- */}
      <section aria-labelledby="core-numbers">
        <div className="mb-3 flex items-center justify-between">
          <h2 id="core-numbers" className="akashic-heading font-display text-lg font-semibold">{t("coreNumbers")}</h2>
          <a href="/numbers" className="text-sm text-primary underline-offset-4 hover:underline">
            {hi ? "poora vivaran →" : "Full breakdown →"}
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <NumberCard
            data={{
              label: t("birthdayNumber"),
              number: mulank,
              steps: reading.birthday.steps,
              href: "/numbers#birthday",
            }}
          />
          <NumberCard
            data={{
              label: t("lifePath"),
              number: bhagyank,
              steps: reading.lifePath.steps,
              href: "/numbers#life-path",
            }}
          />
          <NumberCard
            data={{
              label: t("expression"),
              number: reading.nameNumbers.expression,
              steps: reading.nameNumbers.expressionSteps,
              href: "/numbers#expression",
            }}
          />
          <NumberCard
            data={{
              label: t("soulUrge"),
              number: reading.nameNumbers.soulUrge,
              steps: reading.nameNumbers.soulUrgeSteps,
              href: "/numbers#soul-urge",
            }}
          />
          <NumberCard
            data={{
              label: t("personalYear"),
              number: currentPY.number,
              steps: currentPY.steps,
              href: "/forecast",
            }}
          />
          <NumberCard
            data={{
              label: `${t("personalMonth")} · ${monthName(today.getMonth() + 1)}`,
              number: months[0].personalMonth,
              steps: [
                `Personal Year ${months[0].personalYear} + calendar month ${months[0].month}`,
                `→ Personal Month ${months[0].personalMonth}`,
              ],
              href: "/forecast",
            }}
          />
        </div>
      </section>

      {/* ---------- 6-MONTH WEATHER ---------- */}
      <section aria-labelledby="timeline">
        <h2 id="timeline" className="akashic-heading mb-3 font-display text-lg font-semibold">
          {hi ? "agle 6 mahine — ank-dasha mausam" : "Next 6 months — Ank Dasha weather"}
        </h2>
        <Card>
          <CardContent className="py-5">
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {months.map((m) => {
                const intensity = m.personalMonth <= 9 ? m.personalMonth : 9;
                const flavor = monthFlavor.get(m.label);
                return (
                  <li key={m.label} className="akashic-card rounded-xl border px-4 py-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-medium">{monthName(m.month)} {m.year}</span>
                      <span aria-hidden className="number-glyph font-dossier text-2xl text-gold dark:text-gold-bright">{hi ? devNum(m.personalMonth) : m.personalMonth}</span>
                    </div>
                    <div className="intensity mt-2" aria-hidden>
                      <span style={{ width: `${(intensity / 9) * 100}%` }} />
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground [overflow-wrap:anywhere]">
                      {ANK_DASHA_MONTH[m.personalMonth]?.[hi ? "lineHi" : "lineEn"] ?? ""}
                    </p>
                    {/* v3.3: dasha-precision layer (secret engine) */}
                    {flavor ? (
                      <div className="mt-2 rounded-md border border-gold/25 bg-gold/5 px-2.5 py-2 text-[11px] leading-relaxed" data-testid="dasha-flavor">
                        <p className="font-medium text-gold">{hi ? flavor.monthFlavorHi : flavor.monthFlavorEn}</p>
                        <p className="mt-1 text-muted-foreground">{hi ? flavor.weekTextureHi : flavor.weekTextureEn}</p>
                      </div>
                    ) : null}
                    <span className="sr-only">Ank month intensity {intensity} of 9.</span>
                  </li>
                );
              })}
            </ol>
            <p className="mt-4 text-xs text-muted-foreground">
              {hi
                ? "ank 8/9/1 ke mahine sabse prabal — unhi mein bade nirnay leejie."
                : "Months 8/9/1 run strongest — make the big moves inside those."}
            </p>
          </CardContent>
        </Card>
      </section>

      {/* ---------- HOT WINDOWS ---------- */}
      <section aria-labelledby="windows">
        <h2 id="windows" className="akashic-heading mb-3 font-display text-lg font-semibold">
          {hi ? "garm khidkiyaan" : "Hot windows"}
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {hotMonths.length > 0 ? (
            hotMonths.map((w) => (
              <Card key={w.label} className="bg-accent/40">
                <CardHeader className="flex-row items-center gap-2 pb-1">
                  <Flame aria-hidden className="size-4 text-kesari" />
                  <CardTitle className="text-sm">{w.label} · {hi ? `ank ${devNum(w.pm)}` : `PM ${w.pm}`}</CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">{w.text}</CardContent>
              </Card>
            ))
          ) : (
            <div className="sm:col-span-3">
              <EmptyState
                title={hi ? "is aadhe saal koi prabal khidki nahi" : "No hot windows this half-year"}
                body={hi ? "chheh-mahine ka poora mausam upar hai." : "The full six-month weather is above."}
              />
            </div>
          )}
        </div>
      </section>

      {/* Daily prompt + journal shortcut */}
      <section aria-labelledby="prompt">
        <h2 id="prompt" className="sr-only">{hi ? "roz pratiphal" : "Daily reflection"}</h2>
        <JournalShortcut />
      </section>

      {/* ---------- DEEP-DIVE TILES ---------- */}
      <section aria-labelledby="tiles">
        <h2 id="tiles" className="akashic-heading mb-3 font-display text-lg font-semibold">
          {hi ? "gehrai mein jaaie" : "Go deeper"}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/life-graph", icon: <CalendarDays aria-hidden className="size-5 text-gold" />, labelKey: "navLifeGraph", desc: hi ? "ateet ka vachan — khud bharta graph" : "Past auto-reading — the self-filling graph" },
            { href: "/rajyoga", icon: <Crown aria-hidden className="size-5 text-gold" />, labelKey: "navRajyoga", desc: hi ? "aapke chart ke shaahee yog" : "Royal yogas in your chart" },
            { href: "/number-tools", icon: <Smartphone aria-hidden className="size-5 text-gold" />, labelKey: "navNumberTools", desc: hi ? "phone/makaan/gaadi jaanch" : "Phone/house/vehicle check" },
            { href: "/loshu", icon: <Grid3X3 aria-hidden className="size-5 text-gold" />, labelKey: "navLoShu", desc: hi ? "ank-chakra: tal, vikarn, yutiyaan" : "Numeroscope: planes, diagonals, yogas" },
            { href: "/loshu#repetitions-h", icon: <Repeat aria-hidden className="size-5 text-gold" />, label: hi ? "Ank-Repetitions" : "Repetitions", desc: hi ? "doharaae ank — bal aur chhaya" : "Repeated digits — strength & shadow" },
            { href: "/lucky", icon: <Gem aria-hidden className="size-5 text-gold" />, labelKey: "navLucky", desc: hi ? "ank, din, rang, ratna, upaay" : "Numbers, days, colors, gems, upay" },
          ].map((tile) => (
            <a key={tile.href} href={tile.href} className="group">
              <Card interactive className="h-full glass">
                <CardContent className="flex flex-col items-start gap-1.5 py-4">
                  {tile.icon}
                  <span className="text-sm font-medium group-hover:underline">{t(tile.labelKey ?? tile.label!)}</span>
                  <span className="text-xs text-muted-foreground">{tile.desc}</span>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </section>

      <div>
        <YantraMotif className="mx-auto size-8 text-gold/70" />
        <p className="mt-2 text-center text-xs text-muted-foreground">
          <a href="/blueprint" className="text-primary underline underline-offset-4">
            {hi ? "poora laaiph blooprint report" : "Open the full Life Blueprint report"}
          </a>
          {" · "}
          <a href="/compatibility" className="text-primary underline underline-offset-4">
            {hi ? "tulana" : "Compare with someone"}
          </a>
        </p>
      </div>

      {/* v3.3: Basis — ank-ganit + graha-kram verification (secret layer line) */}
      <details data-testid="basis-graha-chain" className="group rounded-lg border border-gold/25 bg-muted/30 px-4 py-2.5">
        <summary className="flex cursor-pointer items-center gap-2 font-serif-display text-sm italic text-gold">
          {hi ? "Basis — ank-dasha ka hisaab" : "Basis — how the Ank Dasha was computed"}
          <span className="ml-auto text-xs not-italic text-muted-foreground group-open:hidden">
            {hi ? "dikhao" : "show"}
          </span>
        </summary>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-xs text-muted-foreground">
          <li>{reading.birthday.steps.join(" → ")}</li>
          <li>{reading.lifePath.steps.join(" → ")}</li>
          <li>{chainLine}</li>
        </ol>
        <p className="mt-2 font-serif-display text-xs italic text-gold">
          {hi ? "Isi basis par hum aapke liye yeh predict karte hain." : "On this basis we predict your reading."}
        </p>
      </details>
    </div>
  );
}