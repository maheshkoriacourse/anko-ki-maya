"use client";

/**
 * ANKO KI MAYA v3 — OVERVIEW = "अभी का हाल" (owner-mandated chapter 1).
 * Where you stand right now: Ank Dasha (year/month/day) + Mulank/Bhagyank
 * state + Navgrah behaviour lines — direct, personal, powerful.
 * Then the 6-month weather, deep-dive tiles and journal shortcut.
 */

import * as React from "react";
import { CalendarDays, Flame, Smartphone, Crown, Grid3X3, Gem } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui";
import {
  PageHeader, NumberCard, JournalShortcut, DiyaMotif, YantraMotif, EmptyState, LoadingCards, DivineHero,
} from "@/components/shared";
import { useProfile } from "@/components/seeded-profile";
import { useT } from "@/lib/lang";
import { t as rawT } from "@/lib/content";
import { ANK_DASHA_YEAR, ANK_DASHA_MONTH, mulankBhagyankState } from "@/lib/voice";
import { personalYear, personalMonth, personalDay, upcomingMonths, monthName, type MonthCycle } from "@/lib/numerology";
import { grahaFor, devNum, planetRelation, RELATION_LABEL } from "@/lib/navgrah";

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
        title={hi ? "पहले जन्म-विवरण दीजिए" : "No profile yet"}
        body={hi ? "नाम और जन्म-तिथि दीजिए — वाचन तुरंत खुलेगा।" : "Give name and birth date — the reading opens instantly."}
        action={<a href="/" className="text-sm text-primary underline">{hi ? "शुरू करें" : "Start onboarding"}</a>}
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
        title={hi ? `नमस्ते, ${firstName}` : `Namaste, ${firstName}`}
        subtitle={
          hi
            ? `अंक दशा ${devNum(currentPY.number)} चल रही है — ${dashaYear.nameHi}। नीचे पूरा हिसाब: अभी कहाँ खड़े हैं, आगे क्या चलेगा।`
            : `Ank Dasha ${currentPY.number} runs now — ${dashaYear.name}. Below: where you stand and what runs next.`
        }
        actions={
          <Badge variant="gold" className="hero-badge">
            <DiyaMotif aria-hidden className="size-3.5" />
            {hi ? "ज्योतिष का अंक-हिस्सा" : "Ank Shastra"}
          </Badge>
        }
      />

      {/* ---------- ABHI KA HAAL (chapter-1 hero) ---------- */}
      <Card className="glass yantra-bg">
        <CardHeader>
          <CardTitle className="font-display text-xl">
            {hi ? "अभी का हाल — आप इस वक़्त कहाँ खड़े हैं" : "Abhi Ka Haal — where you stand right now"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Ank Dasha trio */}
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-gold/40 bg-gold/5 p-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold">{t("personalYear")}</p>
              <p aria-hidden className="number-glyph mt-1 text-5xl text-kesari">{hi ? devNum(currentPY.number) : currentPY.number}</p>
              <p className="mt-1 text-xs text-muted-foreground">{today.getFullYear()} · {grahaFor(currentPY.number).graha}</p>
            </div>
            <div className="rounded-xl border p-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold">{t("personalMonth")}</p>
              <p aria-hidden className="number-glyph mt-1 text-5xl text-primary dark:text-gold-bright">{hi ? devNum(pmNow) : pmNow}</p>
              <p className="mt-1 text-xs text-muted-foreground">{monthName(today.getMonth() + 1)}</p>
            </div>
            <div className="rounded-xl border p-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold">{t("personalDay")}</p>
              <p aria-hidden className="number-glyph mt-1 text-5xl text-primary dark:text-gold-bright">{hi ? devNum(pDay.number) : pDay.number}</p>
              <p className="mt-1 text-xs text-muted-foreground">{today.getDate()} {monthName(today.getMonth() + 1).slice(0, 3)}</p>
            </div>
          </div>

          {/* Direct dasha narrative */}
          <div className="rounded-xl border bg-secondary/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">{dashaYear.name}</p>
            <p className="mt-1.5 text-sm font-medium leading-relaxed">{hi ? dashaYear.lineHi : dashaYear.lineEn}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{hi ? "इस महीने: " : "This month: "}</span>
              {hi ? dashaMonth.lineHi : dashaMonth.lineEn}
            </p>
            <p className="mt-2 text-sm">
              <span className="font-semibold">{hi ? "इस वर्ष का व्रत: " : "This year's vow: "}</span>
              {hi ? dashaYear.actionHi : dashaYear.actionEn}
            </p>
          </div>

          {/* Mulank/Bhagyank state */}
          <div className="rounded-xl border p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">
              {hi ? "मूलांक · भाग्यांक की स्थिति" : "Mulank · Bhagyank state"}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed">{hi ? state.hi : state.en}</p>
            <p className="mt-2 text-sm leading-relaxed">
              {hi
                ? `मूलांक ${devNum(mulank)} = ${gMul.grahaHi}: ${gMul.behaviorHi}`
                : `Mulank ${mulank} = ${gMul.graha}: ${gMul.behaviorEn}`}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {hi
                ? `भाग्यांक ${devNum(bhagyank)} = ${gBhag.grahaHi}: ${gBhag.behaviorHi}`
                : `Bhagyank ${bhagyank} = ${gBhag.graha}: ${gBhag.behaviorEn}`}
            </p>
            <p className="mt-2 text-xs text-gold">
              {hi
                ? `दोनों ग्रहों का संबंध: ${RELATION_LABEL[mulBhagRel].hi}`
                : `Planet relation: ${RELATION_LABEL[mulBhagRel].en}`}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ---------- CORE NUMBER CARDS ---------- */}
      <section aria-labelledby="core-numbers">
        <div className="mb-3 flex items-center justify-between">
          <h2 id="core-numbers" className="font-display text-lg font-semibold">{t("coreNumbers")}</h2>
          <a href="/numbers" className="text-sm text-primary underline-offset-4 hover:underline">
            {hi ? "पूरा विवरण →" : "Full breakdown →"}
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
        <h2 id="timeline" className="mb-3 font-display text-lg font-semibold">
          {hi ? "अगले 6 महीने — अंक-दशा मौसम" : "Next 6 months — Ank Dasha weather"}
        </h2>
        <Card>
          <CardContent className="py-5">
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {months.map((m) => {
                const intensity = m.personalMonth <= 9 ? m.personalMonth : 9;
                return (
                  <li key={m.label} className="rounded-lg border p-3.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-medium">{monthName(m.month)} {m.year}</span>
                      <span aria-hidden className="number-glyph text-2xl text-primary/80">{hi ? devNum(m.personalMonth) : m.personalMonth}</span>
                    </div>
                    <div className="intensity mt-2" aria-hidden>
                      <span style={{ width: `${(intensity / 9) * 100}%` }} />
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground [overflow-wrap:anywhere]">
                      {ANK_DASHA_MONTH[m.personalMonth]?.[hi ? "lineHi" : "lineEn"] ?? ""}
                    </p>
                    <span className="sr-only">Ank month intensity {intensity} of 9.</span>
                  </li>
                );
              })}
            </ol>
            <p className="mt-4 text-xs text-muted-foreground">
              {hi
                ? "अंक 8/9/1 के महीने सबसे प्रबल — उन्हीं में बड़े निर्णय लीजिए।"
                : "Months 8/9/1 run strongest — make the big moves inside those."}
            </p>
          </CardContent>
        </Card>
      </section>

      {/* ---------- HOT WINDOWS ---------- */}
      <section aria-labelledby="windows">
        <h2 id="windows" className="mb-3 font-display text-lg font-semibold">
          {hi ? "गर्म खिड़कियाँ" : "Hot windows"}
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {hotMonths.length > 0 ? (
            hotMonths.map((w) => (
              <Card key={w.label} className="bg-accent/40">
                <CardHeader className="flex-row items-center gap-2 pb-1">
                  <Flame aria-hidden className="size-4 text-kesari" />
                  <CardTitle className="text-sm">{w.label} · {hi ? `अंक ${devNum(w.pm)}` : `PM ${w.pm}`}</CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">{w.text}</CardContent>
              </Card>
            ))
          ) : (
            <div className="sm:col-span-3">
              <EmptyState
                title={hi ? "इस आधे साल कोई प्रबल खिड़की नहीं" : "No hot windows this half-year"}
                body={hi ? "छह-महीने का पूरा मौसम ऊपर है।" : "The full six-month weather is above."}
              />
            </div>
          )}
        </div>
      </section>

      {/* Daily prompt + journal shortcut */}
      <section aria-labelledby="prompt">
        <h2 id="prompt" className="sr-only">{hi ? "दैनिक प्रतिफ़ल" : "Daily reflection"}</h2>
        <JournalShortcut />
      </section>

      {/* ---------- DEEP-DIVE TILES ---------- */}
      <section aria-labelledby="tiles">
        <h2 id="tiles" className="mb-3 font-display text-lg font-semibold">
          {hi ? "गहराई में जाइए" : "Go deeper"}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/life-graph", icon: <CalendarDays aria-hidden className="size-5 text-gold" />, labelKey: "navLifeGraph", desc: hi ? "अतीत का वाचन — खुद भरता ग्राफ़" : "Past auto-reading — the self-filling graph" },
            { href: "/rajyoga", icon: <Crown aria-hidden className="size-5 text-gold" />, labelKey: "navRajyoga", desc: hi ? "आपके चार्ट के शाही योग" : "Royal yogas in your chart" },
            { href: "/number-tools", icon: <Smartphone aria-hidden className="size-5 text-gold" />, labelKey: "navNumberTools", desc: hi ? "फ़ोन/मकान/गाड़ी जाँच" : "Phone/house/vehicle check" },
            { href: "/loshu", icon: <Grid3X3 aria-hidden className="size-5 text-gold" />, labelKey: "navLoShu", desc: hi ? "अंक-चक्र: तल, विकर्ण, युतियाँ" : "Numeroscope: planes, diagonals, yogas" },
            { href: "/lucky", icon: <Gem aria-hidden className="size-5 text-gold" />, labelKey: "navLucky", desc: hi ? "अंक, दिन, रंग, रत्न, उपाय" : "Numbers, days, colors, gems, upay" },
          ].map((tile) => (
            <a key={tile.href} href={tile.href} className="group">
              <Card interactive className="h-full glass">
                <CardContent className="flex flex-col items-start gap-1.5 py-4">
                  {tile.icon}
                  <span className="text-sm font-medium group-hover:underline">{t(tile.labelKey)}</span>
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
            {hi ? "पूर्ण लाइफ़ ब्लूप्रिंट रिपोर्ट" : "Open the full Life Blueprint report"}
          </a>
          {" · "}
          <a href="/compatibility" className="text-primary underline underline-offset-4">
            {hi ? "तुलना" : "Compare with someone"}
          </a>
        </p>
      </div>
    </div>
  );
}