
"use client";

/**
 * v5.3 DOSSIER — PEOPLE + WEALTH + CAREER chapters (civil spec sections).
 */

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { peopleOf, wealthOf, careerOf } from "@/lib/dossier-civil";
import { useProfile } from "@/components/seeded-profile";
import { lifePath, birthdayNumber } from "@/lib/numerology";
import { useLang } from "@/lib/lang";

export function DossierPeople({ onNext }: { onNext?: () => void }) {
  const { profile } = useProfile();
  const { lang } = useLang();
  const hi = lang === "hi";
  if (!profile) return null;
  const mul = birthdayNumber(Number(profile.birthDate.slice(8, 10))).number;
  const people = peopleOf(mul);
  return (
    <Card className="glass" data-testid="dossier-people">
      <CardHeader>
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold/90">{hi ? "chapter chhah" : "Chapter Six"}</p>
        <CardTitle className="font-dossier text-2xl">{hi ? "wo log jinhone aapko banaya" : "The people who shaped you"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div aria-hidden className="mx-auto flex h-28 max-w-md items-center justify-center rounded-xl border border-gold/25 bg-obsidian/30">
          <svg viewBox="0 0 240 90" className="h-full">
            {[[40,40],[95,22],[150,40],[210,55],[70,70],[170,20]].map(([cx,cy],i)=>(
              <circle key={i} cx={cx} cy={cy} r="7" fill="none" stroke="#b87333" strokeWidth="1.1" opacity="0.85" />
            ))}
            <path d="M40 40 L95 22 L150 40 L210 55 M95 22 L170 20 L150 40 M70 70 L40 40 M170 20 L210 55" stroke="#d4af37" strokeWidth="0.5" opacity="0.5" fill="none" />
          </svg>
        </div>
        {people.map((p) => (
          <section key={p.id} data-testid={`person-${p.id}`}>
            <p className="font-display text-lg text-gold">{hi ? p.nameHi : p.nameEn}</p>
            <p className="mt-1 text-sm leading-relaxed">{hi ? p.patternHi : p.patternEn}</p>
          </section>
        ))}
        {onNext ? (
          <div className="flex justify-center pt-2">
            <button onClick={onNext} data-testid="people-next" className="rounded-lg border border-gold/50 bg-gold/10 px-5 py-2.5 text-sm font-semibold text-gold hover:bg-gold/20">
              {hi ? "agli chapter: paisa ka code →" : "Next: The wealth code →"}
            </button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

export function DossierWealth({ onNext }: { onNext?: () => void }) {
  const { profile } = useProfile();
  const { lang } = useLang();
  const hi = lang === "hi";
  if (!profile) return null;
  const d = Number(profile.birthDate.slice(8,10)); const m = Number(profile.birthDate.slice(5,7)); const y = Number(profile.birthDate.slice(0,4));
  const wp = wealthOf(birthdayNumber(d).number, lifePath(y,m,d).number);
  return (
    <Card className="glass" data-testid="dossier-wealth">
      <CardHeader>
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold/90">{hi ? "chapter saat" : "Chapter Seven"}</p>
        <CardTitle className="font-dossier text-2xl">{hi ? "paisa ka code" : "The wealth code"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div aria-hidden className="mx-auto flex h-32 max-w-md items-center justify-center rounded-xl border border-gold/25 bg-obsidian/30">
          <svg viewBox="0 0 200 110" className="h-full">
            <rect x="60" y="18" width="80" height="80" rx="8" fill="none" stroke="#B87333" strokeWidth="1.5" />
            <path d="M60 98 L78 78 L122 78 L140 98 Z" fill="none" stroke="#B87333" strokeWidth="1" opacity="0.6" />
            <path d="M100 18 L100 6 M70 14 L64 2 M130 14 L136 2" stroke="#FFB347" strokeWidth="1.2" opacity="0.8" />
            <circle cx="100" cy="56" r="16" fill="none" stroke="#FFB347" strokeWidth="1.3" opacity="0.9" />
            <path d="M100 40 L106 52 L100 64 L94 52 Z" fill="none" stroke="#D4AF37" strokeWidth="0.9" />
          </svg>
        </div>
        {[["money personality","paisa-peakshan",wp.moneyPersonalityEn,wp.moneyPersonalityHi],
          ["risk style","daav ka dhang",wp.riskStyleEn,wp.riskStyleHi],
          ["earning style","kamai ka raasta",wp.earningEn,wp.earningHi],
          ["spending style","kharch ka swabhav",wp.spendingEn,wp.spendingHi],
          ["business aptitude","dhandhe ki samajh",wp.businessAptitudeEn,wp.businessAptitudeHi],
          ["legacy","pedhi-shakti",wp.legacyEn,wp.legacyHi]].map(([en,hiT,vEn,vHi]) => (
          <section key={en} className="rounded-xl border border-border bg-secondary/30 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? hiT : en}</p>
            <p className="mt-1.5 text-sm leading-relaxed">{hi ? vHi : vEn}</p>
          </section>
        ))}
        {onNext ? (
          <div className="flex justify-center pt-2">
            <button onClick={onNext} data-testid="wealth-next" className="rounded-lg border border-gold/50 bg-gold/10 px-5 py-2.5 text-sm font-semibold text-gold hover:bg-gold/20">
              {hi ? "agli chapter: kaam ki pehchaan →" : "Next: Career DNA →"}
            </button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

export function DossierCareer({ onNext }: { onNext?: () => void }) {
  const { profile } = useProfile();
  const { lang } = useLang();
  const hi = lang === "hi";
  if (!profile) return null;
  const d = Number(profile.birthDate.slice(8,10)); const m = Number(profile.birthDate.slice(5,7)); const y = Number(profile.birthDate.slice(0,4));
  const cp = careerOf(birthdayNumber(d).number, lifePath(y,m,d).number);
  return (
    <Card className="glass" data-testid="dossier-career">
      <CardHeader>
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold/90">{hi ? "chapter aath" : "Chapter Eight"}</p>
        <CardTitle className="font-dossier text-2xl">{hi ? "kaam ka ankh-shastra" : "Career DNA"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div aria-hidden className="mx-auto flex h-32 max-w-md items-center justify-center rounded-xl border border-gold/25 bg-obsidian/30">
          <svg viewBox="0 0 220 100" className="h-full">
            <path d="M30 96 L92 26 L128 54 L198 8" fill="none" stroke="#d4af37" strokeWidth="1.4" opacity="0.85" />
            <circle cx="198" cy="8" r="4" fill="#FFB347" />
            <circle cx="110" cy="52" r="5" fill="none" stroke="#FFB347" strokeWidth="1.4" />
            <text x="84" y="72" fontSize="9" fill="#f0d58c">{hi ? "aaj aadhi chadhai pe" : "you are halfway up"}</text>
          </svg>
        </div>
        <section>
          <p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? "pehchaan" : "Identity"}</p>
          <p className="mt-1.5 text-sm leading-relaxed">{hi ? cp.identityHi : cp.identityEn}</p>
        </section>
        <div className="space-y-2">
          {cp.scores.map((s) => (
            <div key={s.label} data-testid={`score-${s.label.toLowerCase()}`} className="rounded-lg border border-border px-3 py-2">
              <p className="flex items-baseline justify-between text-sm">
                <span>{hi ? s.labelHi : s.label}</span>
                <span className="font-display text-lg text-gold">{hi ? s.score : s.score}</span>
              </p>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-gradient-to-r from-copper to-gold" style={{ width: `${s.score}%` }} />
              </div>
            </div>
          ))}
        </div>
        {onNext ? (
          <div className="flex justify-center pt-2">
            <button onClick={onNext} data-testid="career-next" className="rounded-lg border border-gold/50 bg-gold/10 px-5 py-2.5 text-sm font-semibold text-gold hover:bg-gold/20">
              {hi ? "agli chapter: andheri taraf →" : "Next: Shadow self →"}
            </button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
