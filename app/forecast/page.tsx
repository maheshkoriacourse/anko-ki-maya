"use client";

/**
 * Six-Month Forecast — monthly reflection themes + life-area tabs.
 * Every line is phrased as a possibility; nothing is deterministic.
 */

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, Tabs } from "@/components/ui";
import { PageHeader, WhyThisReading, EmptyState, LoadingCards } from "@/components/shared";
import { useProfile } from "@/components/seeded-profile";
import { PERSONAL_MONTH_THEMES, PERSONAL_MONTH_WATCHOUTS, LIFE_AREA_PROMPT } from "@/lib/meanings";
import { upcomingMonths, monthName, type MonthCycle } from "@/lib/numerology";

const LIFE_AREAS = ["Career", "Relationships", "Money Mindset", "Wellbeing", "Creativity"] as const;
type LifeArea = (typeof LIFE_AREAS)[number];

function suggestedFocus(pm: number, area: LifeArea): string {
  const base: Record<number, string> = {
    1: "consider one small, self-led step",
    2: "consider one honest conversation",
    3: "consider sharing one piece of creative work",
    4: "consider tightening one routine",
    5: "consider one refreshing change of scene",
    6: "consider one act of care — for others or yourself",
    7: "consider one hour of quiet study or journalling",
    8: "consider one calm money or career review",
    9: "consider gracefully closing one open loop",
  };
  return `${base[pm] ?? "consider one small reflective step"} — through the lens of ${area.toLowerCase()}.`;
}

function areaPrompt(pm: number, area: LifeArea): string {
  void pm;
  return LIFE_AREA_PROMPT[area];
}

export default function ForecastPage() {
  const { profile, today } = useProfile();
  const [ready, setReady] = React.useState(false);
  const [area, setArea] = React.useState<LifeArea>("Career");
  React.useEffect(() => setReady(true), []);

  if (!ready) return <LoadingCards count={3} label="Loading your forecast" />;

  if (!profile) {
    return (
      <EmptyState
        title="No profile yet"
        body="Add your birth details to see your six-month reflection themes."
        action={<a href="/" className="text-sm text-primary underline">Start onboarding</a>}
      />
    );
  }

  const birthMonth = Number(profile.birthDate.slice(5, 7));
  const birthDay = Number(profile.birthDate.slice(8, 10));
  const months: MonthCycle[] = upcomingMonths(
    birthMonth,
    birthDay,
    today.getFullYear(),
    today.getMonth() + 1,
    6,
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Six-Month Forecast"
        subtitle={`Reflective themes for ${monthName(today.getMonth() + 1)} ${today.getFullYear()} – ${
          months[5] ? `${monthName(months[5].month)} ${months[5].year}` : ""
        }. Themes describe emphases you might notice — never fixed events.`}
      />

      <div>
        <p className="mb-2 text-sm font-medium">Life-area lens</p>
        <Tabs
          ariaLabel="Life area"
          tabs={LIFE_AREAS.map((a) => ({ id: a, label: a }))}
          active={area}
          onChange={(id) => setArea(id as LifeArea)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {months.map((m, idx) => {
          const pm = m.personalMonth;
          const steps = [
            `Personal Year ${m.personalYear} (birth month + birth day + ${m.year}, reduced)`,
            `Personal Month = PY ${m.personalYear} + calendar month ${m.month} → ${pm}`,
          ];
          return (
            <Card key={m.label} className="flex flex-col">
              <CardHeader className="flex-row items-start justify-between gap-3">
                <div>
                  <CardTitle>{m.label}</CardTitle>
                  <p className="mt-0.5 text-xs font-medium text-gold">Personal Month {pm}</p>
                </div>
                <span aria-hidden className="number-glyph text-5xl text-primary/85">{pm}</span>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-3 text-sm">
                <p>
                  <span className="font-medium">Theme:</span>{" "}
                  {PERSONAL_MONTH_THEMES[pm] ?? "a steady period for reflection"}.
                </p>
                <p>
                  <span className="font-medium">Opportunities:</span> {suggestedFocus(pm, area)}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium">Watch-out:</span>{" "}
                  {PERSONAL_MONTH_WATCHOUTS[pm] ?? "a theme to reflect on: moving faster than your values"}.
                </p>
                <p className="rounded-lg bg-secondary/50 p-2.5 text-xs">
                  <span className="font-semibold uppercase tracking-wide text-muted-foreground">Journal prompt</span>
                  <br />
                  {areaPrompt(pm, area)}
                </p>
                <div className="mt-auto">
                  <WhyThisReading title={`${m.label} · Personal Month`} steps={steps} />
                </div>
                <p className="text-[11px] text-muted-foreground">
                  {idx === 0 ? "Current month — a theme to reflect on, not a promise." : "A possibility to reflect on when the month arrives."}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground">
        The forecast highlights emphases and reflection windows — it does not predict events.
        Marriage, health, money outcomes or any specific life event are never predicted here.
      </p>
    </div>
  );
}