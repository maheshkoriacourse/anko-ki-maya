"use client";

/**
 * Your Numbers — full breakdown with transparent calculation steps,
 * strengths, growth edges, reflection questions + the Lo Shu Grid section.
 */

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, Badge, Tabs } from "@/components/ui";
import { PageHeader, WhyThisReading, EmptyState, LoadingCards, StarMotif } from "@/components/shared";
import { useProfile } from "@/components/seeded-profile";
import { meaningFor } from "@/lib/meanings";
import type { LoShuResult } from "@/lib/loshu";
import { SanketBanner, coreFromReading } from "@/components/sanket-banner";
import { birthdayNumber, lifePath } from "@/lib/numerology";

/* ------------------------------------------------------------------ */
/* Lo Shu grid component (accessible 3×3)                               */
/* ------------------------------------------------------------------ */

function LoShuGridPanel({ loShu }: { loShu: LoShuResult }) {
  return (
    <Card id="loshu" className="scroll-mt-24">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Lo Shu Grid
          <Badge variant="secondary">3×3 · planes &amp; diagonals</Badge>
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Your birth-date digits mapped onto the classic 3×3 grid. Counts are
          working strengths and work-through gaps — never fixed traits.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-wrap gap-6">
          {/* The grid */}
          <div
            role="grid"
            aria-label="Lo Shu grid of your birth date digits"
            className="w-[220px] shrink-0 overflow-hidden rounded-xl border"
          >
            {loShu.grid.map((row, ri) => (
              <div role="row" key={ri} className="grid grid-cols-3">
                {loShu.grid[ri].map((cell, ci) => {
                  const plane =
                    ri === 0 ? "Thought" : ri === 1 ? "Emotion" : "Action";
                  const label = cell.count === 0
                    ? `Cell ${cell.digit}: missing. ${plane} plane.`
                    : `Cell ${cell.digit}: ${cell.count} time${cell.count > 1 ? "s" : ""}. ${plane} plane.`;
                  return (
                    <div
                      key={cell.digit}
                      role="gridcell"
                      aria-label={label}
                      className={`flex h-[70px] flex-col items-center justify-center border ${
                        cell.count > 0 ? "bg-secondary/60" : "bg-transparent"
                      }`}
                    >
                      <span className="number-glyph text-2xl">{cell.digit}</span>
                      <span className="mt-0.5 flex h-2 items-center gap-0.5" aria-hidden>
                        {Array.from({ length: Math.min(cell.count, 3) }).map((_, i) => (
                          <span key={i} className="size-1.5 rounded-full bg-primary/80" />
                        ))}
                      </span>
                      <span className="sr-only">
                        {cell.count} occurrence{cell.count === 1 ? "" : "s"}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Planes + diagonals */}
          <div className="flex-1 space-y-2.5 text-sm">
            {loShu.planes.map((p) => (
              <div key={p.key} className="rounded-lg border p-3">
                <p className="font-medium">
                  {p.name} ({p.digits.join("-")}){" "}
                  <Badge variant={p.complete ? "default" : "outline"} className="ml-1">
                    {p.complete ? "complete" : "open"}
                  </Badge>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{p.note}</p>
              </div>
            ))}
            {loShu.diagonals.map((d) => (
              <div key={d.key} className="rounded-lg border bg-accent/30 p-3">
                <p className="font-medium">
                  {d.name}{" "}
                  <Badge variant={d.complete ? "gold" : "outline"} className="ml-1">
                    {d.complete ? "complete" : "open"}
                  </Badge>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{d.note}</p>
              </div>
            ))}
            {loShu.zeros > 0 ? (
              <p className="text-xs text-muted-foreground">
                Zero appears {loShu.zeros}× in your date — it sits outside the grid; some readers treat it as a quiet, supportive background presence.
              </p>
            ) : null}
          </div>
        </div>

        {/* Strengths + missing numbers */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border p-3.5">
            <p className="text-sm font-semibold">Strengths (completed lines)</p>
            {loShu.strengths.length > 0 ? (
              <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-muted-foreground">
                {loShu.strengths.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            ) : (
              <p className="mt-2 text-xs text-muted-foreground">
                No completed lines in this reading — strengths live in your other numbers too.
              </p>
            )}
          </div>
          <div className="rounded-lg border p-3.5">
            <p className="text-sm font-semibold">Missing numbers — gentle reflections</p>
            {loShu.missingNotes.length > 0 ? (
              <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-muted-foreground">
                {loShu.missingNotes.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            ) : (
              <p className="mt-2 text-xs text-muted-foreground">
                All digits 1–9 appear — nothing highlighted as a gap in this reading.
              </p>
            )}
          </div>
        </div>

        <WhyThisReading title="Lo Shu Grid" steps={loShu.steps} />
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

type SectionKey = "core" | "loshu" | "cycles";
const SECTIONS: { id: SectionKey; label: string }[] = [
  { id: "core", label: "Core numbers" },
  { id: "loshu", label: "Lo Shu Grid" },
  { id: "cycles", label: "Cycles & timing" },
];

export default function NumbersPage() {
  const { profile, reading, loShu } = useProfile();
  const [ready, setReady] = React.useState(false);
  const [section, setSection] = React.useState<SectionKey>("core");
  React.useEffect(() => setReady(true), []);

  if (!ready) return <LoadingCards count={3} label="Loading your numbers" />;

  if (!reading || !profile) {
    return (
      <EmptyState
        title="No profile yet"
        body="Add your birth details to unlock your full number breakdown."
        action={<a href="/" className="text-sm text-primary underline">Start onboarding</a>}
      />
    );
  }

  const coreNumbers = [
    { id: "life-path", label: "Life Path", number: reading.lifePath.number, steps: reading.lifePath.steps },
    { id: "expression", label: "Expression / Destiny", number: reading.nameNumbers.expression, steps: reading.nameNumbers.expressionSteps },
    { id: "soul-urge", label: "Soul Urge", number: reading.nameNumbers.soulUrge, steps: reading.nameNumbers.soulUrgeSteps },
    { id: "personality", label: "Personality", number: reading.nameNumbers.personality, steps: reading.nameNumbers.personalitySteps },
    { id: "birthday", label: "Birthday Number", number: reading.birthday.number, steps: reading.birthday.steps },
    { id: "maturity", label: "Maturity", number: reading.maturity.number, steps: reading.maturity.steps },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Your Numbers"
        subtitle={`For ${profile.preferredName || profile.birthName} · ${profile.birthDate.split("-").reverse().join("-")} · ${profile.system === "chaldean" ? "Chaldean" : "Pythagorean"} system. Every card shows exactly how its number was calculated.`}
      />

      {/* v4.0: page-level sanket — honest warnings, app-wide (owner order) */}
      {profile ? (
        <SanketBanner
          core={coreFromReading(birthdayNumber(Number(profile.birthDate.slice(8, 10))).number, lifePath(Number(profile.birthDate.slice(0, 4)), Number(profile.birthDate.slice(5, 7)), Number(profile.birthDate.slice(8, 10))).number, undefined, profile.birthDate)}
          lang="en"
        />
      ) : null}



      <Tabs
        ariaLabel="Numbers sections"
        tabs={SECTIONS}
        active={section}
        onChange={(id) => setSection(id as SectionKey)}
      />

      {section === "core" ? (
        <div className="space-y-5">
          {coreNumbers.map((n) => {
            const m = meaningFor(n.number);
            return (
              <Card key={n.id} id={n.id} className="scroll-mt-24">
                <CardHeader className="flex-row items-start justify-between gap-4">
                  <div>
                    <CardTitle>{n.label}</CardTitle>
                    <p className="mt-0.5 text-xs font-medium text-gold">{m.title}</p>
                  </div>
                  <span aria-hidden className="number-glyph text-6xl text-primary/90">{n.number}</span>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{m.essence}</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg bg-secondary/50 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Strengths</p>
                      <p className="mt-1 text-sm">{m.strengths}</p>
                    </div>
                    <div className="rounded-lg bg-accent/40 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Growth edge</p>
                      <p className="mt-1 text-sm">{m.growthEdge}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Reflection questions</p>
                    <ul className="mt-1.5 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
                      {m.reflectionQuestions.map((q, i) => <li key={i}>{q}</li>)}
                    </ul>
                  </div>
                  <WhyThisReading title={n.label} steps={n.steps} />
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : null}

      {section === "loshu" ? (
        loShu ? <LoShuGridPanel loShu={loShu} /> : <EmptyState title="No grid yet" body="Add your birth date to build your Lo Shu grid." />
      ) : null}

      {section === "cycles" ? (
        <div className="space-y-5">
          <Card id="pinnacles">
            <CardHeader>
              <CardTitle>Pinnacle periods</CardTitle>
              <p className="text-xs text-muted-foreground">
                Four long chapters of life, each with its own reflective theme.
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {reading.pinnacles.map((p) => (
                  <div key={p.index} className="rounded-lg border p-3 text-center">
                    <span aria-hidden className="number-glyph text-4xl text-primary">{p.number}</span>
                    <p className="mt-1 text-xs font-medium">Pinnacle {p.index}</p>
                    <p className="text-[11px] text-muted-foreground">
                      ages {p.ageStart}–{p.ageEnd === Infinity ? "onward" : p.ageEnd}
                    </p>
                  </div>
                ))}
              </div>
              <WhyThisReading title="Pinnacles" steps={reading.pinnacleSteps} note="Pinnacle numbers describe long reflective chapters — themes, not scheduled events." />
            </CardContent>
          </Card>

          <Card id="challenges">
            <CardHeader>
              <CardTitle>Challenge numbers</CardTitle>
              <p className="text-xs text-muted-foreground">
                Growth work to do — never obstacles with guaranteed outcomes.
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {reading.challenges.map((c) => (
                  <div key={c.index} className="rounded-lg border p-3 text-center">
                    <span aria-hidden className="number-glyph text-4xl text-primary/80">{c.number}</span>
                    <p className="mt-1 text-xs font-medium">{c.label} challenge</p>
                  </div>
                ))}
              </div>
              <WhyThisReading title="Challenges" steps={reading.challengeSteps} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start gap-3 py-4 text-xs text-muted-foreground">
              <StarMotif className="mt-0.5 size-5 shrink-0 text-gold" />
              <span>
                Cycles are interpretive themes, not guaranteed outcomes. Timing windows describe
                emphases you may notice when you reflect back — you remain the author of your choices.
              </span>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
}