"use client";

/**
 * Shared UI pieces used across pages: number cards, explainers, journal
 * shortcuts, empty/loading states and the footer line (v3: single small
 * 'Traditional numerology-based reading' line — no disclaimer wall).
 * v3 Sanatan look: saffron/maroon/gold palette, Om + diya + lotus motifs.
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
        <h1 className="font-dossier text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
        <hr aria-hidden className="gold-hairline mt-2.5 w-40 border-0" />
        {subtitle ? <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </header>
  );
}

/**
 * v3.1 reasoning block — कारण-गणित / Basis. The old 'Why this reading?'
 * phrasing is BANNED (owner correction #3); every explainer renders as
 * direct calculation steps and an explicit uncertainty boundary. The old component name is kept as an alias so existing pages
 * keep working with the new language.
 */
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
        Basis — {title}
        <span className="ml-auto text-xs text-muted-foreground group-open:hidden">show</span>
      </summary>
      <div className="border-t px-3.5 py-3">
        <ol className="list-decimal space-y-1 pl-5 text-xs text-muted-foreground">
          {steps.map((s, i) => (
            <li key={i} className="whitespace-pre-wrap">{s}</li>
          ))}
        </ol>
        {note ? <p className="mt-2 text-xs italic text-muted-foreground">{note}</p> : null}
        <p className="mt-2 font-serif-display text-xs italic text-gold">
          This shows the calculation behind the reflection; it is not a certain prediction.
        </p>
      </div>
    </details>
  );
}

/**
 * SANATAN MOTIFS — Om (ॐ), diya (lamp) and lotus. Replaces the v2 western
 * star motif. Pure inline SVG; scales via className.
 */

export function OmMotif({ className }: { className?: string }) {
  return (
    <span aria-hidden className={`select-none leading-none ${className ?? ""}`} style={{ fontFamily: "var(--font-hindi)" }}>
      ॐ
    </span>
  );
}

export function DiyaMotif({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" aria-hidden className={className} fill="none">
      {/* flame */}
      <path
        d="M24 2 C27 8 29 11 29 14 a5 5 0 0 1-10 0 C19 11 21 8 24 2 Z"
        fill="currentColor"
        opacity="0.9"
      />
      {/* bowl */}
      <path
        d="M8 22 h32 c0 5-7 8-16 8 s-16-3-16-8 Z"
        fill="currentColor"
        opacity="0.55"
      />
      <ellipse cx="24" cy="22" rx="16" ry="2.6" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

export function LotusMotif({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" aria-hidden className={className} fill="none">
      <path d="M24 4 C28 10 29 16 24 26 C19 16 20 10 24 4 Z" fill="currentColor" opacity="0.75" />
      <path d="M14 10 C19 14 21 19 24 26 C17 23 13 17 14 10 Z" fill="currentColor" opacity="0.55" />
      <path d="M34 10 C29 14 27 19 24 26 C31 23 35 17 34 10 Z" fill="currentColor" opacity="0.55" />
      <path d="M6 18 C12 20 18 23 24 26 C17 27 10 24 6 18 Z" fill="currentColor" opacity="0.4" />
      <path d="M42 18 C36 20 30 23 24 26 C31 27 38 24 42 18 Z" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

/** Sri-Yantra style mandala ring (geometric, decorative backdrop). */
export function YantraMotif({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className} fill="none">
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      {[0, 30, 60, 90, 120, 150].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 32 32)`}>
          <path d="M32 6 L56 50 L8 50 Z" stroke="currentColor" strokeWidth="0.7" opacity="0.35" />
          <path d="M32 58 L56 14 L8 14 Z" stroke="currentColor" strokeWidth="0.7" opacity="0.35" />
        </g>
      ))}
      <circle cx="32" cy="32" r="3.5" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

/**
 * v3.1 CINEMATIC DIVINE HEADER — the dashboard hero banner.
 * public/img/divine-header.webp: giant golden Om over the Sri-Yantra
 * mandala, deities in cosmic mist, diya lamps, temple light rays over
 * indigo night. Full-width ~400px (230px mobile), ken-burns zoom,
 * gradient melts into the page background. Decorative — NOT clickable.
 * Title/greeting overlays it (white + gold, text-shadow). Loaded eager +
 * fetchpriority=high on the dashboard only (LCP element).
 */
export function DivineHero({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <section className="divine-hero no-print" aria-label={title}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/img/divine-header.webp"
        alt=""
        aria-hidden
        fetchPriority="high"
        loading="eager"
        decoding="async"
        className="divine-hero-img"
      />
      <div aria-hidden className="divine-hero-overlay" />
      <div className="divine-hero-content">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="min-w-0">
            <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-4xl">
              {title}
            </h1>
            {subtitle ? (
              <p className="hero-sub mt-1.5 max-w-2xl text-xs leading-relaxed sm:text-sm">
                {subtitle}
              </p>
            ) : null}
          </div>
          {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
        </div>
      </div>
    </section>
  );
}

/**
 * v3.2 LANDING HERO — mahadev-hero.webp full-bleed on '/'.
 * Mahadev sits center-right (face just above vertical center); a deep
 * indigo gradient runs left→right so the left column (title + blessing +
 * form hint) stays readable. Image is eager + fetchpriority=high (LCP on
 * the landing). Blessing line is a deity line — Devanagari allowed.
 */
export function LandingHero({ blessing }: { blessing?: string }) {
  return (
    <section className="landing-hero no-print" aria-label="Mahadev hero">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/img/mahadev-hero.webp"
        alt=""
        aria-hidden
        fetchPriority="high"
        loading="eager"
        decoding="async"
        className="landing-hero-img"
      />
      <div aria-hidden className="landing-hero-overlay" />
      <div className="landing-hero-content">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">
          अंकों की माया
        </h1>
        <span aria-hidden className="om-divider-mark mt-1 block text-xl">ॐ</span>
        <p className="mt-2 font-devanagari text-sm text-gold-bright sm:text-base">
          {blessing ?? "भोलेनाथ की कृपा से · माँ के आशीर्वाद से"}
        </p>
        <p className="hero-sub mt-2 max-w-xl text-xs leading-relaxed sm:text-sm">
          Ank Shastra — aapke numbers aapka past, present aur future batate hain.
        </p>
      </div>
    </section>
  );
}

/**
 * v3.2 DEITY BAND — wide short header band for pages (durga-blessing.webp
 * on Lucky & Upay). object-position tuned per image so the deity's face
 * stays fully in frame (never cropped); left gradient keeps a caption
 * readable. Caption is a deity line — Devanagari allowed here.
 */
export function DeityBand({
  src,
  caption,
  objectPosition = "center 18%",
  height = 200,
}: {
  src: string;
  caption?: string;
  objectPosition?: string;
  height?: number;
}) {
  return (
    <section className="deity-band no-print" style={{ height }} aria-hidden={caption ? undefined : true}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="deity-band-img"
        style={{ objectPosition }}
      />
      <div aria-hidden className="deity-band-overlay" />
      {caption ? (
        <p className="deity-band-caption font-devanagari text-sm text-gold-bright sm:text-base">
          {caption}
        </p>
      ) : null}
    </section>
  );
}

/**
 * v3.2 RUDRAKSH DIVIDER — thin rudraksh-shivling band placed directly above
 * the remedies table: rudraksh + shivling + diya = the upay mood-setter.
 * Purely decorative; gentle vignette keeps it a divider, not a billboard.
 */
export function RudrakshDivider({ className = "" }: { className?: string }) {
  return (
    <section className={`rudraksh-band no-print ${className}`} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/img/rudraksh-shivling.webp"
        alt=""
        loading="lazy"
        decoding="async"
        className="deity-band-img"
        style={{ objectPosition: "center 34%" }}
      />
      <div aria-hidden className="rudraksh-band-overlay" />
      <span aria-hidden className="om-divider-mark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl drop-shadow-[0_1px_8px_rgba(20,17,58,0.9)]">
        ॐ
      </span>
    </section>
  );
}

/**
 * v3.1 — small ॐ watermark for section dividers (owner order).
 */
export function OmDividerMark({ className }: { className?: string }) {
  return (
    <span aria-hidden className={`om-divider-mark text-lg ${className ?? ""}`}>
      ॐ
    </span>
  );
}

/**
 * MARIGOLD/DIYA DIVIDER STRIP — a shloka-style separator between report
 * chapters and page sections: lotus · gold rule · diya glow (+ v3.1 ॐ mark).
 */
export function SanatanDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden className={`flex items-center gap-3 py-2 ${className ?? ""}`}>
      <LotusMotif className="size-5 text-gold" />
      <span className="gold-rule flex-1" />
      <OmDividerMark />
      <DiyaMotif className="size-6 text-gold" />
      <span className="gold-rule flex-1" />
      <LotusMotif className="size-5 -scale-x-100 text-gold" />
    </div>
  );
}

/** Star + mandala SVG motif (kept for compat with existing pages). */
export function StarMotif({ className }: { className?: string }) {
  return <YantraMotif className={className} />;
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
        <DiyaMotif className="size-10 text-gold" />
        <p className="font-display font-semibold">{title}</p>
        <p className="max-w-sm text-sm text-muted-foreground">{body}</p>
        {action ? <div className="mt-2">{action}</div> : null}
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Number card (used on Overview + Your Numbers) — v3: Navgrah layer    */
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
/* Journal shortcut (daily ank-dasha prompt)                            */
/* ------------------------------------------------------------------ */

const DAILY_PROMPTS = [
  "Aaj maine kya shuru kiya jo agle nau saal dhoega?",
  "Which small win today belongs to this year's Ank Dasha?",
  "What is one thing I will begin this week — name it now.",
  "Where did patience pay off recently?",
  "What am I holding that I will close tonight?",
  "Which conversation do I want to have this week?",
  "What did today's number ask of me — and did I answer?",
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
            Today&apos;s ank-dasha prompt
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
