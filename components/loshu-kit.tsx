/**
 * Anko Ki Maya v2 — shared Lo Shu UI atoms (grid cell, plane badge,
 * gold-rule reasoning block used by the Lo Shu page and the Blueprint report).
 */

"use client";

import { Check, CircleDashed } from "lucide-react";
import { Badge } from "@/components/ui";
import { LO_SHU_CELL_HINT } from "@/lib/meanings";
import type { Lang } from "@/lib/content";

export function DigitCell({ digit, count, lang }: { digit: number; count: number; lang: Lang }) {
  const present = count > 0;
  const label =
    lang === "hi"
      ? `अंक ${digit}: ${LO_SHU_CELL_HINT[digit]}${present ? ` — ${count}× उपस्थित` : " — अनुपस्थित"}`
      : `Digit ${digit}: ${LO_SHU_CELL_HINT[digit]}${present ? ` — ×${count} present` : " — missing"}`;
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative grid aspect-square place-items-center rounded-xl border transition-colors ${
        present
          ? "glass border-gold/40 bg-gold/5"
          : "border-dashed opacity-45"
      }`}
    >
      <span
        aria-hidden
        className={`number-glyph text-4xl sm:text-5xl ${present ? "text-primary dark:text-gold-bright" : "text-muted-foreground"}`}
      >
        {digit}
      </span>
      <span
        aria-hidden
        className={`absolute bottom-1 right-2 text-[10px] font-medium ${present ? "text-gold" : "text-muted-foreground"}`}
      >
        {present ? `×${count}` : "—"}
      </span>
    </div>
  );
}

export function PlaneBadge({ complete, lang }: { complete: boolean; lang: Lang }) {
  return complete ? (
    <Badge variant="gold" className="shrink-0">
      <Check aria-hidden className="size-3" />
      {lang === "hi" ? "पूर्ण" : "complete"}
    </Badge>
  ) : (
    <Badge variant="secondary" className="shrink-0">
      <CircleDashed aria-hidden className="size-3" />
      {lang === "hi" ? "खुला" : "open"}
    </Badge>
  );
}

/**
 * v3.1 — कारण-गणित / Basis block (owner correction #3).
 * The old "THE WHY / यह क्यों कहा" phrasing is banned; reasoning now reads
 * as DIRECT basis lines with the closing 'इसी आधार पर हम आपके लिए यह
 * predict करते हैं'. Renders the shared BasisBlock; the old export name
 * stays as an alias for the pages that import it.
 */
export function ReasoningBlock({
  title,
  steps,
  lang,
  className = "",
}: {
  title: string;
  steps: string[];
  lang: Lang;
  className?: string;
}) {
  return (
    <details className={`group rounded-lg border border-gold/25 bg-muted/30 ${className}`}>
      <summary className="flex cursor-pointer items-center gap-2 px-4 py-2.5 font-serif-display text-sm italic text-gold">
        <span aria-hidden className="gold-rule w-6" />
        {lang === "hi" ? `आधार / Basis — ${title}` : `Basis — ${title}`}
        <span className="ml-auto text-xs not-italic text-muted-foreground group-open:hidden">
          {lang === "hi" ? "दिखाएँ" : "show"}
        </span>
      </summary>
      <div className="border-t border-gold/20 px-4 py-3">
        <ol className="list-decimal space-y-1 pl-5 text-xs text-muted-foreground">
          {steps.map((s, i) => (
            <li key={i} className="whitespace-pre-wrap">{s}</li>
          ))}
        </ol>
        <p className="mt-2 font-serif-display text-xs italic text-gold">
          {lang === "hi"
            ? "इसी आधार पर हम आपके लिए यह predict करते हैं।"
            : "On this basis we predict your reading."}
        </p>
      </div>
    </details>
  );
}