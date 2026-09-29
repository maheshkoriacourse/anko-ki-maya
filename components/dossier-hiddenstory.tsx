"use client";

/**
 * v5.2 DOSSIER CHAPTER 2 — THE HIDDEN STORY (narrative, not numbers)
 * 6-beat arc from lib/dossier-chapters.ts; ends on cliffhanger (onNext).
 */

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { hiddenStoryOf } from "@/lib/dossier-chapters";
import { useProfile } from "@/components/seeded-profile";
import { lifePath, birthdayNumber } from "@/lib/numerology";
import { useLang } from "@/lib/lang";

export function DossierHiddenStory({ onNext }: { onNext: () => void }) {
  const { profile } = useProfile();
  const { lang } = useLang();
  const hi = lang === "hi";
  if (!profile) return null;
  const d = Number(profile.birthDate.slice(8, 10));
  const m = Number(profile.birthDate.slice(5, 7));
  const y = Number(profile.birthDate.slice(0, 4));
  const story = hiddenStoryOf(birthdayNumber(d).number);

  return (
    <Card className="glass" data-testid="dossier-hidden-story">
      <CardHeader>
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold/90">
          {hi ? "chapter do" : "Chapter Two"}
        </p>
        <CardTitle className="font-dossier text-2xl">
          {hi ? story.titleHi : story.titleEn}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {story.beats.map((b, i) => (
          <figure key={i} className="border-l-2 border-gold/50 pl-4" data-testid={`story-beat-${i}`}>
            <p className="text-xs uppercase tracking-widest text-gold/80">{hi ? b.labelHi : ["the hook", "the design", "the proof", "the price", "the turn", "the gift"][i]}</p>
            <p className="mt-1 text-[15px] leading-relaxed">{hi ? b.textHi : b.textEn}</p>
          </figure>
        ))}

        <div className="flex justify-center pt-2">
          <button
            onClick={onNext}
            data-testid="hiddenstory-next"
            className="rounded-lg border border-gold/50 bg-gold/10 px-5 py-2.5 text-sm font-semibold text-gold hover:bg-gold/20"
          >
            {hi ? "agli chapter: jeevan-map →" : "Next chapter: The Life Map →"}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}