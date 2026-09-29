
"use client";

/**
 * v5.4 DOSSIER — LOVE chapter UI against lib/dossier-love (agent lib):
 * LoveBlueprint fields are STRINGS; ACTS via relationMovieActs(mulank);
 * windows via loveTimeline(mulank, age).
 */

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { loveBlueprintOf, relationMovieActs, loveTimeline } from "@/lib/dossier-love";
import { useProfile } from "@/components/seeded-profile";
import { lifePath, birthdayNumber } from "@/lib/numerology";
import { useLang } from "@/lib/lang";

export function DossierLove({ onNext }: { onNext?: () => void }) {
  const { profile } = useProfile();
  const { lang } = useLang();
  const hi = lang === "hi";
  if (!profile) return null;
  const d = Number(profile.birthDate.slice(8, 10));
  const m = Number(profile.birthDate.slice(5, 7));
  const y = Number(profile.birthDate.slice(0, 4));
  const mul = birthdayNumber(d).number;
  const lp = lifePath(y, m, d).number;
  const bp = loveBlueprintOf(mul, lp);
  const acts = relationMovieActs(mul);
  const birth = new Date(`${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}T06:00:00Z`);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  if (now.getMonth() + 1 < m || (now.getMonth() + 1 === m && now.getDate() < d)) age--;
  const windows = loveTimeline(mul, Math.max(18, age));

  const pairs: [string, string, string, string][] = [
    ["How you love", "pyaar ka dhang", "howYouLoveEn", "howYouLoveHi"],
    ["What you need", "dil ki zarurat", "whatYouNeedEn", "whatYouNeedHi"],
    ["Blind spots", "jhoothi dhundli", "blindSpotsEn", "blindSpotsHi"],
    ["Ideal partner", "haraa-saathi", "idealPartnerEn", "idealPartnerHi"],
    ["Marriage style", "shaadi ki dhun", "marriageStyleEn", "marriageStyleHi"],
    ["Commitment", "wafaa ki chaal", "commitmentPatternEn", "commitmentPatternHi"],
    ["Emotional needs", "dil ki aawaze", "emotionalNeedsEn", "emotionalNeedsHi"],
    ["Communication", "baat-cheet", "communicationStyleEn", "communicationStyleHi"],
    ["Breakup triggers", "tootne ki dagar", "breakupTriggersEn", "breakupTriggersHi"],
    ["Long-term risk", "lambe-saath ka daav", "longTermRiskEn", "longTermRiskHi"],
    ["Soulmate archetype", "atma-saathi aarKetype", "soulmateArchetypeEn", "soulmateArchetypeHi"],
  ];

  return (
    <Card className="glass" data-testid="dossier-love">
      <CardHeader>
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold/90">{hi ? "chapter paanch — sabse mehenga hisaab" : "Chapter Five — the love blueprint"}</p>
        <CardTitle className="font-dossier text-2xl">{hi ? "pyaar ka blueprint" : "Love blueprint"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div aria-hidden className="mx-auto flex h-32 max-w-md items-center justify-center rounded-xl border border-gold/25 bg-obsidian/30">
          <svg viewBox="0 0 240 100" className="h-full">
            <path d="M10 28 C 70 8, 92 46, 150 47 S 222 58, 232 28" fill="none" stroke="#FFB347" strokeWidth="1.5" opacity="0.85" />
            <path d="M10 72 C 70 92, 92 54, 150 53 S 222 42, 232 72" fill="none" stroke="#D4AF37" strokeWidth="1.5" opacity="0.85" />
            {[14, 22, 30].map((r, i) => (<circle key={r} cx="120" cy="50" r={r} fill="none" stroke="#B87333" strokeWidth={1.2 - i * 0.35} opacity={0.9 - i * 0.25} />))}
          </svg>
        </div>
        {pairs.map(([en, hiT, kEn, kHi]) => {
          const vEn = bp[kEn as keyof typeof bp] as unknown;
          const vHi = bp[kHi as keyof typeof bp] as unknown;
          if (typeof vEn !== "string" || !vEn) return null;
          return (
            <section key={en} data-testid={`love-${en.replace(/\W+/g, "-").toLowerCase()}`} className="rounded-xl border border-border bg-secondary/30 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? hiT : en}</p>
              <p className="mt-1.5 text-sm leading-relaxed">{hi ? String(vHi) : String(vEn)}</p>
            </section>
          );
        })}
        <section data-testid="love-movie">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? "rishton ki film" : "The relationship movie"}</p>
          <div className="mt-2 space-y-2">
            {acts.map((a, i) => (
              <div key={i} className="border-l-2 border-gold/50 pl-3">
                <p className="text-sm font-semibold text-gold/95">{hi ? (a as any).nameHi ?? a.nameEn : (a as any).nameEn}</p>
                <p className="text-sm leading-relaxed">{hi ? (a as any).lineHi ?? (a as any).lineEn ?? "" : (a as any).lineEn}</p>
              </div>
            ))}
          </div>
        </section>
        <section data-testid="love-timeline">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? "dil ke darwaze" : "Emotional timeline"}</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {windows.map((w, i) => (
              <div key={i} className="rounded-lg border border-border bg-secondary/30 px-3 py-2">
                <p className="text-sm font-semibold text-saffron">{hi ? `${(w as any).fromAge ?? ""}-${(w as any).toAge ?? ""} saal` : `${(w as any).fromAge ?? ""}–${(w as any).toAge ?? ""}`}</p>
                <p className="text-sm leading-relaxed">{hi ? String((w as any).gistHi ?? (w as any).themeHi ?? "") : String((w as any).gistEn ?? (w as any).themeEn ?? "")}</p>
              </div>
            ))}
          </div>
        </section>
        {onNext ? (
          <div className="flex justify-center pt-2">
            <button onClick={onNext} data-testid="love-next" className="rounded-lg border border-gold/50 bg-gold/10 px-5 py-2.5 text-sm font-semibold text-gold hover:bg-gold/20">
              {hi ? "agli chapter: paisa ka code →" : "Next: the wealth code →"}
            </button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
