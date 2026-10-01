"use client";

/**
 * ANKO KI MAYA v3 — OVERVIEW = "Abhi ka haal" (owner-mandated chapter 1).
 * Where you stand right now: Ank Dasha (year/month/day) + Mulank/Bhagyank
 * state + Navgrah behaviour lines — direct, personal, powerful.
 * Then the 6-month weather, deep-dive tiles and journal shortcut.
 */

import * as React from "react";
import Link from "next/link";
import { CalendarDays, Smartphone, Crown, Grid3X3, Gem, Repeat, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui";
import {
  NumberCard, JournalShortcut, DiyaMotif, YantraMotif, EmptyState, LoadingCards, DivineHero,
} from "@/components/shared";
import { useProfile } from "@/components/seeded-profile";
import { useT } from "@/lib/lang";
import { t as rawT } from "@/lib/content";
import { MasterNumberCard } from "@/components/mahadasha-section";
import { personalYear, personalMonth, personalDay, upcomingMonths, monthName, type MonthCycle } from "@/lib/numerology";
import { grahaFor, devNum } from "@/lib/navgrah";
import { vedicChart, grahaChainLine } from "@/lib/vedic";
import { LifeContextBrief } from "@/components/life-context-brief";
import { personalCycleTheme } from "@/lib/personal-insights";

export default function OverviewPage() {
  const { profile, reading, today } = useProfile();
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
        action={<Link href="/" className="text-sm text-primary underline">{hi ? "shuru karein" : "Start onboarding"}</Link>}
      />
    );
  }

  const firstName = profile.preferredName || profile.birthName.split(" ")[0];
  const birthMonth = Number(profile.birthDate.slice(5, 7));
  const birthDay = Number(profile.birthDate.slice(8, 10));
  const mulank = reading.birthday.number;
  const bhagyank = reading.lifePath.number;

  const currentPY = personalYear(birthMonth, birthDay, today.getFullYear());
  const pmNow = personalMonth(currentPY.number, today.getMonth() + 1).number;
  const pDay = personalDay(pmNow, today.getDate());

  const months: MonthCycle[] = upcomingMonths(
    birthMonth,
    birthDay,
    today.getFullYear(),
    today.getMonth() + 1,
    6,
  );

  // v3.3 secret layer — dasha-precision for each month card + nakshatra
  // verification of the Mulank reading + the graha-chain Basis line.
  const birthClock = profile.birthTime?.match(/^(\d{2}):(\d{2})$/);
  const vc = vedicChart({
    year: Number(profile.birthDate.slice(0, 4)),
    month: birthMonth,
    day: birthDay,
    ...(birthClock ? { hour: Number(birthClock[1]), minute: Number(birthClock[2]) } : {}),
  });
  const chainLine = grahaChainLine(mulank, vc, lang);

  return (
    <div className="space-y-8">
      {/* v3.1: cinematic divine hero — greeting overlays the banner */}
      <DivineHero
        title={hi ? `namaste, ${firstName}` : `Namaste, ${firstName}`}
        subtitle={
          hi
          ? `Is saal ka Personal Year ${devNum(currentPY.number)} hai. Neeche cycle ki paramparagat vyakhya, aapka apna sandarbh aur faislon ko parakhne ke sawaal dekhein.`
          : `Your Personal Year is ${currentPY.number}. Below are its traditional interpretation, your own context, and questions to help you assess decisions.`
        }
        actions={
          <Badge variant="gold" className="hero-badge">
            <DiyaMotif aria-hidden className="size-3.5" />
            {hi ? "jyotish ka ank-hissa" : "Ank Shastra"}
          </Badge>
        }
      />

      <LifeContextBrief birthDate={profile.birthDate} lang={lang} />

      {/* ---------- ABHI KA HAAL (chapter-1 hero) ---------- */}
      <Card className="glass yantra-bg">
        <CardHeader>
          <CardTitle className="akashic-heading font-display text-xl">
            {hi ? "Abhi ka haal — aaj ka cycle aur aapka sandarbh" : "Abhi Ka Haal — your current cycle and context"}
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
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? `Is saal ka ank-theme ${devNum(currentPY.number)} · ${grahaFor(currentPY.number).grahaHi}` : `Current Personal Year ${currentPY.number} · ${grahaFor(currentPY.number).graha}`}</p>
            <p className="mt-1.5 text-sm font-medium leading-relaxed">
              {hi ? "Paramparagat ank-theme: " : "Traditional number theme: "}{personalCycleTheme(currentPY.number, lang)}. {hi ? "Yeh kisi ghatna ka saboot ya pakki bhavishyavaani nahi; apne faislon ko parakhne ka ek sawaal samjhein." : "This is not evidence of an event or a certain prediction; use it as a question for your decisions."}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{hi ? "Is mahine ka ank-theme: " : "This month's number theme: "}</span>
              {personalCycleTheme(pmNow, lang)}
            </p>
            <p className="mt-2 text-sm">
              <span className="font-semibold">{hi ? "Aapke liye agla kadam: " : "A practical next step: "}</span>
              {hi ? "Apne saamne ke faisle ka ek chhota, palatne-yogya parikshan chunein; tareekh aur review ka nateeja likh lein." : "Choose one small, reversible test for the decision in front of you; write down a date and what result you will review."}
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

          {/* Birth and life-path numbers as symbolic lenses, not diagnoses. */}
          <div className="akashic-card rounded-xl border px-5 py-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">
              {hi ? "Mukhya ankon ke paramparagat sambandh" : "Traditional associations for your core numbers"}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed">
              {hi
                ? `Parampara mein Mulank ${devNum(mulank)} (${grahaFor(mulank).grahaHi}) aur Bhagyank ${devNum(bhagyank)} (${grahaFor(bhagyank).grahaHi}) alag prateekatmak drishtikon dete hain. Yeh aapki personality ya bhavishya ka pramaan nahi.`
                : `In this tradition, Mulank ${mulank} (${grahaFor(mulank).graha}) and Bhagyank ${bhagyank} (${grahaFor(bhagyank).graha}) offer separate symbolic lenses. They do not prove a personality trait or predict your future.`}
            </p>

            {/* A traditional correspondence—not independent verification or diagnosis. */}
            <div
              className="rounded-lg border border-gold/40 bg-gold/5 px-3 py-2.5"
            >
              <p className="text-xs font-medium text-gold">
                ✦ {hi ? "Paramparagat janma-nakshatra sambandh" : "Traditional birth-star association"}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {hi
                  ? `Janma nakshatra ${vc.nakshatraName} (pada ${devNum(vc.pada)}) ek paramparagat symbolic association hai—vyaktitva ki jaanch ya bhavishyavaani nahi.`
                  : `Janma nakshatra ${vc.nakshatraName} (pada ${vc.pada}) is a traditional symbolic association—not a validated personality assessment or prediction.`}
              </p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                {hi
                  ? `Vedic hissa ${vc.timeUnknown ? "janm-samay na milne par Moon-chart approximation" : "aapke diye janm-samay"} aur Mumbai reference location ka istemaal karta hai. Janm-sthan ko coordinates mein badla nahi jaata; ise exact kundali ya alag se pushti na samjhein.`
                  : `The Vedic section uses ${vc.timeUnknown ? "a Moon-chart approximation because no birth time was provided" : "your supplied birth time"} and Mumbai as a reference location. Birthplace is not converted to coordinates; treat this as an approximation, not independent verification.`}
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
                return (
                  <li key={m.label} className="akashic-card rounded-xl border px-4 py-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-medium">{monthName(m.month)} {m.year}</span>
                      <span aria-hidden className="number-glyph font-dossier text-2xl text-gold dark:text-gold-bright">{hi ? devNum(m.personalMonth) : m.personalMonth}</span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground [overflow-wrap:anywhere]">
                      {personalCycleTheme(m.personalMonth, lang)}
                    </p>
                  </li>
                );
              })}
            </ol>
            <p className="mt-4 text-xs text-muted-foreground">
              {hi
                ? "Yeh ank-theme ek planning prompt hai; bade faisle apne saadhan, likhit shartein aur bharosemand salah dekhkar karein."
                : "These number themes are planning prompts; weigh your resources, written terms, and trusted advice before a major decision."}
            </p>
          </CardContent>
        </Card>
      </section>

      <a href="/forecast" className="group block">
        <Card interactive className="glass">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 py-4">
            <div><p className="font-medium">{hi ? "Agle 12 mahine ka planning calendar" : "Plan across the next 12 months"}</p><p className="mt-1 text-sm text-muted-foreground">{hi ? "Har month ka cycle-theme, sambhavit rukavat aur ek practical agla kadam dekhein." : "Review each month's cycle theme, possible friction, and a practical next step."}</p></div>
            <span className="inline-flex items-center gap-2 text-sm text-primary group-hover:underline">{hi ? "Calendar kholen" : "Open calendar"}<ArrowRight aria-hidden className="size-4" /></span>
          </CardContent>
        </Card>
      </a>

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
          {hi ? "Yeh ank aur parampara se liya gaya vyakhya-aadhaar hai—ghatna ka saboot nahi." : "This is the interpretive basis drawn from number cycles and tradition—not evidence that an event will occur."}
        </p>
      </details>
    </div>
  );
}
