"use client";

/**
 * Overview dashboard — the flagship screen (built first, most polished).
 * Greeting + Personal Year theme, number cards, 6-month timeline,
 * reflection windows and the daily journal prompt.
 */

import * as React from "react";
import { CalendarDays, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui";
import {
  PageHeader, NumberCard, JournalShortcut, StarMotif, EmptyState, LoadingCards,
} from "@/components/shared";
import { useProfile } from "@/components/seeded-profile";
import { PERSONAL_YEAR_THEMES, PERSONAL_MONTH_THEMES } from "@/lib/meanings";
import { personalYear, upcomingMonths, monthName, type MonthCycle } from "@/lib/numerology";

export default function OverviewPage() {
  const { profile, reading, today, hasProfile } = useProfile();
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setReady(true), 350); // brief, intentional skeleton
    return () => clearTimeout(t);
  }, []);

  if (!ready) return <LoadingCards count={4} label="Loading your overview" />;

  if (!reading || !profile) {
    return (
      <EmptyState
        title="No profile yet"
        body="Add your birth details to see your numbers."
        action={<a href="/" className="text-sm text-primary underline">Start onboarding</a>}
      />
    );
  }

  const firstName = profile.preferredName || profile.birthName.split(" ")[0];
  const birthMonth = Number(profile.birthDate.slice(5, 7));
  const birthDay = Number(profile.birthDate.slice(8, 10));

  const currentPY = personalYear(birthMonth, birthDay, today.getFullYear());
  const pyTheme = PERSONAL_YEAR_THEMES[currentPY.number] ?? PERSONAL_YEAR_THEMES[1];

  const months: MonthCycle[] = upcomingMonths(
    birthMonth,
    birthDay,
    today.getFullYear(),
    today.getMonth() + 1,
    6,
  );

  const reflectionWindows = months
    .filter((m) => [1, 3, 7, 8, 9].includes(m.personalMonth))
    .slice(0, 3)
    .map((m) => ({
      label: m.label,
      text:
        PERSONAL_MONTH_THEMES[m.personalMonth] ??
        "may be a supportive period for steady reflection",
    }));

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Namaste, ${firstName}`}
        subtitle={`Personal Year ${currentPY.number} — ${pyTheme.theme}. This is one lens for reflection; you decide what fits.`}
        actions={<Badge variant="gold"><Sparkles aria-hidden className="size-3" /> Demo profile</Badge>}
      />

      {/* Current personal year hero */}
      <Card className="bg-secondary/50">
        <CardContent className="flex flex-wrap items-center gap-6 py-6">
          <div aria-hidden className="number-glyph text-7xl text-primary">{currentPY.number}</div>
          <div className="min-w-[240px] flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Current Personal Year theme · {today.getFullYear()}
            </p>
            <p className="mt-1 font-display text-lg font-semibold">{pyTheme.theme}</p>
            <p className="mt-1 text-sm text-muted-foreground">{pyTheme.focus}</p>
          </div>
        </CardContent>
      </Card>

      {/* Core number cards */}
      <section aria-labelledby="core-numbers">
        <div className="mb-3 flex items-center justify-between">
          <h2 id="core-numbers" className="font-display text-lg font-semibold">Your core numbers</h2>
          <a href="/numbers" className="text-sm text-primary underline-offset-4 hover:underline">
            Full breakdown →
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <NumberCard
            data={{
              label: "Life Path",
              number: reading.lifePath.number,
              steps: reading.lifePath.steps,
              href: "/numbers#life-path",
            }}
          />
          <NumberCard
            data={{
              label: "Expression / Destiny",
              number: reading.nameNumbers.expression,
              steps: reading.nameNumbers.expressionSteps,
              href: "/numbers#expression",
            }}
          />
          <NumberCard
            data={{
              label: "Soul Urge",
              number: reading.nameNumbers.soulUrge,
              steps: reading.nameNumbers.soulUrgeSteps,
              href: "/numbers#soul-urge",
            }}
          />
          <NumberCard
            data={{
              label: "Birthday Number",
              number: reading.birthday.number,
              steps: reading.birthday.steps,
              href: "/numbers#birthday",
            }}
          />
          <NumberCard
            data={{
              label: "Personal Year",
              number: currentPY.number,
              steps: currentPY.steps,
              href: "/forecast",
            }}
          />
          <NumberCard
            data={{
              label: `Personal Month · ${monthName(today.getMonth() + 1)}`,
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

      {/* Six-month timeline */}
      <section aria-labelledby="timeline">
        <h2 id="timeline" className="mb-3 font-display text-lg font-semibold">
          Next 6 months — theme intensity
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
                      <span aria-hidden className="number-glyph text-2xl text-primary/80">{m.personalMonth}</span>
                    </div>
                    <div className="intensity mt-2" aria-hidden>
                      <span style={{ width: `${(intensity / 9) * 100}%` }} />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      <span className="sr-only">Personal Month {m.personalMonth}: </span>
                      {PERSONAL_MONTH_THEMES[m.personalMonth] ?? "a steady month for reflection"}
                    </p>
                    <span className="sr-only">Theme intensity {intensity} of 9.</span>
                  </li>
                );
              })}
            </ol>
            <p className="mt-4 text-xs text-muted-foreground">
              Intensity bars show the Personal Month number (1–9) — a lens on shifting themes, not a measure of good or bad months.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Reflection windows */}
      <section aria-labelledby="windows">
        <h2 id="windows" className="mb-3 font-display text-lg font-semibold">Key reflection windows</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {reflectionWindows.length > 0 ? (
            reflectionWindows.map((w) => (
              <Card key={w.label} className="bg-accent/40">
                <CardHeader className="flex-row items-center gap-2 pb-1">
                  <CalendarDays aria-hidden className="size-4 text-gold" />
                  <CardTitle className="text-sm">{w.label}</CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  {w.text} — a theme to reflect on, not a promise.
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="sm:col-span-3">
              <EmptyState
                title="No highlighted windows this half-year"
                body="Every month carries reflective themes — see the Six-Month Forecast for the full picture."
              />
            </div>
          )}
        </div>
      </section>

      {/* Daily prompt + journal shortcut */}
      <section aria-labelledby="prompt">
        <h2 id="prompt" className="sr-only">Daily reflection</h2>
        <JournalShortcut />
      </section>

      <div>
        <StarMotif className="mx-auto size-8 text-gold/60" />
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Cycles are interpretive themes, not guaranteed outcomes.{" "}
          <a href="/report" className="text-primary underline underline-offset-4">Print a reflection report</a>
          {" · "}
          <a href="/compatibility" className="text-primary underline underline-offset-4">Compare with someone (consent first)</a>
        </p>
      </div>
    </div>
  );
}