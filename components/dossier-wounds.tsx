
"use client";

/**
 * v5.4 DOSSIER — WOUNDS chapter UI vs lib/dossier-wounds agent API:
 * woundsOf(WoundsCore) → WoundPattern[]; upayEn/upayHi are string[]
 * (render as list); basis is string.
 */

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { woundsOf } from "@/lib/dossier-wounds";
import { useProfile } from "@/components/seeded-profile";
import { lifePath, birthdayNumber } from "@/lib/numerology";
import { useLang } from "@/lib/lang";

export function DossierWounds({ onNext }: { onNext?: () => void }) {
  const { profile } = useProfile();
  const { lang } = useLang();
  const hi = lang === "hi";
  if (!profile) return null;
  const d = Number(profile.birthDate.slice(8, 10));
  const m = Number(profile.birthDate.slice(5, 7));
  const y = Number(profile.birthDate.slice(0, 4));
  const digits = `${y}${String(m).padStart(2, "0")}${String(d).padStart(2, "0")}`.split("").map(Number);
  const present = new Set(digits);
  // bhagyank digit folds back into the missing-set per WoundsCore contract
  const lp = lifePath(y, m, d).number;
  for (const ch of String(lp)) present.add(Number(ch));
  const missing = [1,2,3,4,5,6,7,8,9].filter((n) => !present.has(n));
  const wounds = woundsOf({ mulank: birthdayNumber(d).number, bhagyank: lp, missing, karmic: [] });

  return (
    <Card className="glass" data-testid="dossier-wounds">
      <CardHeader>
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold/90">{hi ? "chapter chaar" : "Chapter Four"}</p>
        <CardTitle className="font-dossier text-2xl">{hi ? "jo ghaav kabhi poore bhar na aaye" : "The wounds you never healed"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div aria-hidden className="relative mx-auto flex h-36 max-w-md items-center justify-center rounded-xl border border-gold/25 bg-obsidian/30">
          <svg viewBox="0 0 200 110" className="h-full">
            <path d="M46 98 q10 -18 24 -4 M50 97 q22 -28 40 -8 M60 92 q4 -20 20 -14" fill="none" stroke="#4b3a5a" strokeWidth="1.3" strokeLinecap="round" opacity="0.75" />
            <path d="M96 88 q10 -30 22 -2 q3 8 -9 10 q-11 -3 -13 -8 z" fill="none" stroke="#FFB347" strokeWidth="1.5" />
            <path d="M96 96 q22 -16 40 -2" fill="none" stroke="#FFB347" strokeWidth="0.8" opacity="0.45" />
            <ellipse cx="128" cy="46" rx="24" ry="4.5" fill="none" stroke="#FFB347" strokeWidth="0.9" opacity="0.5" />
          </svg>
          <p className="absolute bottom-1.5 text-[11px] text-gold/70">{hi ? "paththar ke beech kamal" : "lotus from stone — pain, then bloom"}</p>
        </div>
        {wounds.map((w, i) => (
          <section key={w.id} data-testid={`wound-${i}`} className="rounded-xl border border-border bg-secondary/30 p-4">
            <p className="font-display text-lg text-gold">{hi ? w.nameHi : w.nameEn}</p>
            <p className="mt-2 text-sm leading-relaxed">{hi ? w.howItFormsHi : w.howItFormsEn}</p>
            <p className="mt-1.5 text-sm leading-relaxed">{hi ? w.howItShowsHi : w.howItShowsEn}</p>
            <div className="mt-2.5 rounded-lg border border-gold/30 bg-gold/5 px-3 py-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? "shifa-ka-raasta" : "the healing path"}</p>
              <p className="mt-1 text-sm italic leading-relaxed">{hi ? w.redemptionHi : w.redemptionEn}</p>
            </div>
            <div className="mt-2 rounded-lg border border-border px-3 py-2">
              <p className="text-xs font-semibold text-saffron">{hi ? "aaj se shuru karo" : "start today"}</p>
              <ul className="mt-1 space-y-1 text-sm leading-relaxed">
                {(hi ? w.upayHi : w.upayEn).map((u, j) => (<li key={j}>• {u}</li>))}
              </ul>
              <p className="mt-1 text-xs text-muted-foreground">{w.basis}</p>
            </div>
          </section>
        ))}
        {onNext ? (
          <div className="flex justify-center pt-2">
            <button onClick={onNext} data-testid="wounds-next" className="rounded-lg border border-gold/50 bg-gold/10 px-5 py-2.5 text-sm font-semibold text-gold hover:bg-gold/20">
              {hi ? "agli chapter: pyaar ka blueprint →" : "Next: the love blueprint →"}
            </button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
