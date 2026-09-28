"use client";

/**
 * Report — print-friendly reflection report (window.print() → PDF).
 * No paid APIs. Uses the browser's own print engine.
 */

import * as React from "react";
import { Printer, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui";
import { DisclaimerLine, StarMotif } from "@/components/shared";
import { useProfile } from "@/components/seeded-profile";
import { meaningFor, PERSONAL_YEAR_THEMES } from "@/lib/meanings";
import { personalYear, personalMonth, upcomingMonths, monthName, isValidBirthDate } from "@/lib/numerology";
import { loShuGrid } from "@/lib/loshu";

export default function ReportPage() {
  const { profile, reading, today } = useProfile();

  if (!profile || !reading) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm text-muted-foreground">No profile yet — create one first.</p>
        <a href="/" className="mt-2 inline-block text-sm text-primary underline">Start onboarding</a>
      </div>
    );
  }

  const birthDate = profile.birthDate;
  const y = Number(birthDate.slice(0, 4));
  const m = Number(birthDate.slice(5, 7));
  const d = Number(birthDate.slice(8, 10));
  const safe = isValidBirthDate(y, m, d);
  const loShu = safe ? loShuGrid(y, m, d) : null;

  const py = safe ? personalYear(m, d, today.getFullYear()) : null;
  const pm = safe && py ? personalMonth(py.number, today.getMonth() + 1) : null;
  const pyTheme = py ? (PERSONAL_YEAR_THEMES[py.number] ?? PERSONAL_YEAR_THEMES[1]) : null;

  const core = reading
    ? [
        { label: "Life Path", number: reading.lifePath.number, steps: reading.lifePath.steps },
        { label: "Expression / Destiny", number: reading.nameNumbers.expression, steps: reading.nameNumbers.expressionSteps },
        { label: "Soul Urge", number: reading.nameNumbers.soulUrge, steps: reading.nameNumbers.soulUrgeSteps },
        { label: "Personality", number: reading.nameNumbers.personality, steps: reading.nameNumbers.personalitySteps },
        { label: "Birthday Number", number: reading.birthday.number, steps: reading.birthday.steps },
        { label: "Maturity", number: reading.maturity.number, steps: reading.maturity.steps },
      ]
    : [];

  return (
    <div className="print-full mx-auto max-w-3xl">
      <div className="no-print mb-6 flex items-center justify-between">
        <a href="/overview" className="inline-flex items-center gap-1 text-sm text-primary underline underline-offset-4">
          <ArrowLeft aria-hidden className="size-4" /> Back
        </a>
        <Button onClick={() => window.print()}>
          <Printer aria-hidden /> Print / Save as PDF
        </Button>
      </div>

      <header className="mb-8 text-center">
        <StarMotif className="mx-auto size-10 text-gold" />
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
          Anko Ki Maya — Reflection Report
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {profile.preferredName || profile.birthName} · {d} {monthName(m)} {y} · generated {today.toISOString().slice(0, 10)}
        </p>
      </header>

      <section className="mb-8 rounded-xl border p-5">
        <h2 className="font-display text-lg font-semibold">This year&apos;s theme</h2>
        {py && pyTheme ? (
          <p className="mt-2 text-sm">
            <span aria-hidden className="number-glyph mr-2 text-3xl text-primary">{py.number}</span>
            Personal Year {py.number} — {pyTheme.theme}. {pyTheme.focus}
          </p>
        ) : null}
        {pm ? (
          <p className="mt-2 text-xs text-muted-foreground">
            This month&apos;s Personal Month is {pm.number} — {monthName(today.getMonth() + 1)} may be a supportive period for steady reflection.
          </p>
        ) : null}
      </section>

      <section className="mb-8">
        <h2 className="mb-3 font-display text-lg font-semibold">Core numbers</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {core.map((n) => {
            const mm = meaningFor(n.number);
            return (
              <div key={n.label} className="rounded-lg border p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{n.label}</p>
                <p className="mt-1 font-serif-display text-3xl text-primary">{n.number} <span className="text-sm text-gold">· {mm.title}</span></p>
                <p className="mt-1 text-xs text-muted-foreground">{mm.essence}</p>
              </div>
            );
          })}
        </div>
      </section>

      {loShu ? (
        <section className="mb-8">
          <h2 className="mb-3 font-display text-lg font-semibold">Lo Shu Grid</h2>
          <div className="grid grid-cols-3 gap-1.5 text-center" aria-hidden>
            {loShu.grid.flat().map((cell) => (
              <div key={cell.digit} className="rounded-lg border p-3">
                <span className="number-glyph text-2xl">{cell.digit}</span>
                <span className="block text-[10px] text-muted-foreground">×{cell.count}</span>
              </div>
            ))}
          </div>
          <ul className="mt-3 list-disc space-y-1 pl-4 text-xs text-muted-foreground">
            {loShu.planes.map((p) => <li key={p.key}>{p.name}: {p.note}</li>)}
            {loShu.missingNotes.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </section>
      ) : null}

      <section className="mb-8">
        <h2 className="mb-3 font-display text-lg font-semibold">Pinnacles &amp; challenges</h2>
        <div className="grid gap-3 sm:grid-cols-4">
          {reading.pinnacles.map((p) => (
            <div key={p.index} className="rounded-lg border p-3 text-center text-xs">
              <span aria-hidden className="number-glyph text-2xl text-primary">{p.number}</span>
              <p>Pinnacle {p.index}</p>
              <p className="text-muted-foreground">ages {p.ageStart}–{p.ageEnd === Infinity ? "onward" : p.ageEnd}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-4">
          {reading.challenges.map((c) => (
            <div key={c.index} className="rounded-lg border p-3 text-center text-xs">
              <span aria-hidden className="number-glyph text-2xl text-primary/80">{c.number}</span>
              <p>{c.label} challenge</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border p-5 text-xs text-muted-foreground">
        <h2 className="mb-2 font-display text-base font-semibold text-foreground">How these were calculated</h2>
        <ul className="list-disc space-y-2 pl-4">
          {core.map((n) => (
            <li key={n.label}>
              <span className="font-medium text-foreground">{n.label}:</span>{" "}
              {n.steps.join(" · ")}
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-8 border-t pt-4">
        <DisclaimerLine />
        <p className="mt-2 text-[11px] text-muted-foreground">
          Made with Anko Ki Maya — self-reflection, never prediction.
        </p>
      </footer>
    </div>
  );
}