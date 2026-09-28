"use client";

/**
 * Shared UI pieces used across pages: number cards, explainers, journal
 * shortcuts, empty/loading states and the all-important safe-language
 * disclaimer line (footer of every page).
 */

import * as React from "react";
import Link from "next/link";
import { BookOpen, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from "@/components/ui";
import { DISCLAIMER, meaningFor } from "@/lib/meanings";

export function DisclaimerLine({ compact = false }: { compact?: boolean }) {
  return (
    <p
      className={`text-muted-foreground ${compact ? "text-[11px]" : "text-xs"} leading-relaxed`}
    >
      {DISCLAIMER}
    </p>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
        {subtitle ? <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </header>
  );
}

/** Small link to the engine's calculation steps ("Why this reading?"). */
export function WhyThisReading({
  title,
  steps,
  note,
}: {
  title: string;
  steps: string[];
  note?: string;
}) {
  return (
    <details className="group rounded-lg border bg-muted/40">
      <summary className="flex cursor-pointer items-center gap-2 px-3.5 py-2.5 text-sm font-medium text-primary">
        <Info className="size-4" aria-hidden />
        Why this reading? — {title}
        <span className="ml-auto text-xs text-muted-foreground group-open:hidden">show</span>
      </summary>
      <div className="border-t px-3.5 py-3">
        <ol className="list-decimal space-y-1 pl-5 text-xs text-muted-foreground">
          {steps.map((s, i) => (
            <li key={i} className="whitespace-pre-wrap">{s}</li>
          ))}
        </ol>
        {note ? <p className="mt-2 text-xs italic text-muted-foreground">{note}</p> : null}
      </div>
    </details>
  );
}

/** Star + number SVG motif (subtle, decorative). */
export function StarMotif({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className} fill="none">
      <path
        d="M24 4 L27 21 L44 24 L27 27 L24 44 L21 27 L4 24 L21 21 Z"
        fill="currentColor"
        opacity="0.12"
      />
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1" opacity="0.15" />
    </svg>
  );
}

/** Loading skeleton for data views. */
export function LoadingCards({ count = 3, label = "Loading content" }: { count?: number; label?: string }) {
  return (
    <div role="status" aria-label={label} className="grid gap-4 sm:grid-cols-2">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader>
            <div className="h-4 w-1/3 rounded bg-muted" />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="h-3 w-full rounded bg-muted" />
            <div className="h-3 w-2/3 rounded bg-muted" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/** Empty state for data views (journal, milestones, etc.). */
export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center gap-2 py-10 text-center">
        <StarMotif className="size-10 text-gold" />
        <p className="font-display font-semibold">{title}</p>
        <p className="max-w-sm text-sm text-muted-foreground">{body}</p>
        {action ? <div className="mt-2">{action}</div> : null}
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Number card (used on Overview + Your Numbers)                        */
/* ------------------------------------------------------------------ */

export interface NumberCardData {
  label: string;
  number: number;
  steps: string[];
  href?: string;
}

export function NumberCard({ data, compact = false }: { data: NumberCardData; compact?: boolean }) {
  const m = meaningFor(data.number);
  return (
    <Card interactive className="flex flex-col">
      <CardHeader className="flex-row items-start justify-between gap-2">
        <div>
          <CardTitle>{data.label}</CardTitle>
          <p className="mt-0.5 text-xs font-medium text-gold">{m.title}</p>
        </div>
        <span
          aria-hidden
          className="number-glyph text-5xl text-primary/90"
        >
          {data.number}
        </span>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        <p className="text-sm">{m.essence}</p>
        {!compact ? (
          <p className="text-xs text-muted-foreground">{m.strengths}</p>
        ) : null}
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <WhyThisReading title={data.label} steps={data.steps} />
          {data.href ? (
            <Link
              href={data.href}
              className="shrink-0 text-xs font-medium text-primary underline-offset-4 hover:underline"
            >
              Full meaning →
            </Link>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Journal shortcut (daily reflection prompt)                           */
/* ------------------------------------------------------------------ */

const DAILY_PROMPTS = [
  "What felt most 'like me' today?",
  "Which small moment am I grateful for right now?",
  "What is one thing I'm ready to begin — even nervously?",
  "Where did patience pay off recently?",
  "What am I holding that I could set down tonight?",
  "Which conversation do I want to have this week?",
  "What did my body ask for today?",
];

export function dailyPrompt(date = new Date()): string {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000,
  );
  return DAILY_PROMPTS[dayOfYear % DAILY_PROMPTS.length];
}

export function JournalShortcut({ prompt }: { prompt?: string }) {
  const q = prompt ?? dailyPrompt();
  return (
    <Card className="bg-secondary/60">
      <CardContent className="flex flex-wrap items-center justify-between gap-3 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Today's reflection prompt
          </p>
          <p className="mt-1 font-serif-display text-lg">{q}</p>
        </div>
        <Link href="/journal" aria-label="Open journal to write about today's prompt">
          <Button size="sm" variant="secondary">
            <BookOpen aria-hidden /> Write in journal
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}