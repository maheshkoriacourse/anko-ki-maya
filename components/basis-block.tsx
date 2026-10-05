"use client";

/**
 * Anko Ki Maya v3.1 — कारण-गणित / Basis block (owner correction #3).
 *
 * KILLS the old "Why this reading? / THE WHY / यह क्यों कहा" phrasing
 * EVERYWHERE. Reasoning blocks now read as DIRECT basis lines:
 *   label 'आधार / Basis' + the number-chain + closing line
 *   'इसी आधार पर हम आपके लिए यह predict करते हैं' (EN: 'on this basis we
 *   predict ___').
 *
 * Both old components (`WhyThisReading` in shared.tsx, `ReasoningBlock` in
 * loshu-kit.tsx) re-render through this module so no page can show the old
 * phrasing; the old names remain exported as aliases for compatibility.
 */

import * as React from "react";
import { Info } from "lucide-react";
import type { Lang } from "@/lib/content";

export function BasisBlock({
  title,
  steps,
  lang,
  className = "",
  note,
}: {
  title: string;
  steps: string[];
  lang: Lang;
  className?: string;
  note?: string;
}) {
  return (
    <details className={`group rounded-lg border border-gold/25 bg-muted/30 ${className}`}>
      <summary className="flex cursor-pointer items-center gap-2 px-4 py-2.5 font-serif-display text-sm italic text-gold">
        <Info aria-hidden className="size-4 shrink-0" />
        <span aria-hidden className="gold-rule w-6" />
        {lang === "hi" ? `Basis — ${title}` : `Basis — ${title}`}
        <span className="ml-auto text-xs not-italic text-muted-foreground group-open:hidden">
          {lang === "hi" ? "dikhao" : "show"}
        </span>
      </summary>
      <div className="border-t border-gold/20 px-4 py-3">
        <ol className="list-decimal space-y-1 pl-5 text-xs text-muted-foreground">
          {steps.map((s, i) => (
            <li key={i} className="whitespace-pre-wrap">{s}</li>
          ))}
        </ol>
        {note ? <p className="mt-2 text-xs italic text-muted-foreground">{note}</p> : null}
        <p className="mt-2 font-serif-display text-xs italic text-gold">
          {lang === "hi"
            ? "Yeh ank-ganna ka aadhar hai; vyakhya ko nishchit bhavishyavaani na samjhein."
            : "This shows the calculation behind the reflection; it is not a certain prediction."}
        </p>
      </div>
    </details>
  );
}

/** Back-compat alias — old imports keep working, phrasing is v3.1 direct. */
export function ReasoningBlock(props: React.ComponentProps<typeof BasisBlock>) {
  return <BasisBlock {...props} />;
}
