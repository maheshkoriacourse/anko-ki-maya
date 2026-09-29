"use client";

/**
 * v4.0 SanketBanner — the shared app-wide warning component (owner order:
 * "har page me ye concept integrate karo"). Renders pageSanket() results as
 * level-banded cards; always pairs the warning with upay (never doom-saying).
 * Add <SanketBanner core={...} lang={...} title? /> into any page that has the
 * profile numbers.
 */

import * as React from "react";
import { pageSanket, type CoreNumbers } from "@/lib/sanket";
import { devNum } from "@/lib/navgrah";

const LEVEL_STYLE: Record<string, { box: string; chip: string; labelEn: string; labelHi: string }> = {
  dhyan: {
    box: "border-gold/40 bg-gold/5",
    chip: "text-gold",
    labelEn: "DHYAN — keep your eyes open",
    labelHi: "DHAYN — aankh khuli rakho",
  },
  savdhan: {
    box: "border-kesari/50 bg-kesari/10",
    chip: "text-kesari",
    labelEn: "SAVDHAN — careful, this one has teeth",
    labelHi: "SAVDHAN — saavdhan, ismein daant hain",
  },
  rok: {
    box: "border-destructive/50 bg-destructive/10",
    chip: "text-destructive",
    labelEn: "ROK — stop and think twice",
    labelHi: "ROK — ruk ke do baar socho",
  },
};

export function SanketBanner({
  core,
  lang,
  extraClassName = "",
}: {
  core: CoreNumbers;
  lang: "en" | "hi";
  extraClassName?: string;
}) {
  const hi = lang === "hi";
  const warnings = React.useMemo(() => pageSanket(core), [
    core.mulank, core.bhagyank, core.namank, core.birthMonth, core.birthDay, core.birthYear,
  ]);
  if (warnings.length === 0) {
    return (
      <div
        data-testid="sanket-clean"
        className={`rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm ${extraClassName}`}
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-gold">
          {hi ? "aaj ka sanket" : "Today's sanket"}
        </p>
        <p className="mt-1 leading-relaxed">
          {hi
            ? "is page ke ankon mein koi sanket nahi — par yahan bhi poora hisaab neeche diya hai; achha aur sambhalna dono haath chalte hain."
            : "No sanket on this page's numbers — but the full account stands below; good news and guardrails travel together."}
        </p>
      </div>
    );
  }
  return (
    <div className={`space-y-2 ${extraClassName}`} data-testid="sanket-banner">
      <p className="text-xs font-semibold uppercase tracking-wide text-gold">
        {hi
          ? `sanket — ${devNum(String(warnings.length))} baat jo dhyan mangti hai`
          : `Sanket — ${warnings.length} ${warnings.length === 1 ? "thing" : "things"} that need your eyes`}
      </p>
      {warnings.map((wt) => {
        const st = LEVEL_STYLE[wt.level];
        return (
          <div
            key={wt.id}
            data-testid={`sanket-${wt.id}`}
            className={`rounded-xl border ${st.box} px-4 py-3`}
          >
            <div className="flex items-baseline justify-between gap-2">
              <p className={`text-xs font-semibold uppercase tracking-wide ${st.chip}`}>
                {hi ? st.labelHi : st.labelEn}
              </p>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed">{hi ? wt.hi : wt.en}</p>
            <p className="mt-1 text-xs text-muted-foreground">{hi ? wt.basisHi : wt.basisEn}</p>
            <div className="mt-2 rounded-lg border border-border bg-background/40 px-3 py-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold/90">
                {hi ? "upay" : "The fix"}
              </p>
              <p className="mt-1 text-sm leading-relaxed">{hi ? wt.upayHi : wt.upayEn}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Convenience hook: build CoreNumbers from the shared profile reading. */
export function coreFromReading(
  birthdayNumber: number,
  lifePathNumber: number,
  expressionNumber: number | undefined,
  birthDate: string,
): CoreNumbers {
  return {
    mulank: birthdayNumber,
    bhagyank: lifePathNumber,
    namank: expressionNumber,
    birthMonth: Number(birthDate.slice(5, 7)),
    birthDay: Number(birthDate.slice(8, 10)),
    birthYear: Number(birthDate.slice(0, 4)),
  };
}