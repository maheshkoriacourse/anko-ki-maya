"use client";

/**
 * v5.0 /dossier — THE AKASHIC LIFE DOSSIER page (canonical spec).
 * Assembles: gate (cover → revelation → 10 micro-predictions → personalize)
 * → chapter unlocks (episodic in storage akm.v1.dossierProgress).
 * Bare-mode like /report (no aside) — clean manuscript feel.
 */

import * as React from "react";
import { PageHeader, DisclaimerLine } from "@/components/shared";
import { useProfile } from "@/components/seeded-profile";
import { useLang } from "@/lib/lang";
import { DossierGate } from "@/components/dossier-gate";
import { DossierChapter1 } from "@/components/dossier-chapter1";
import { DossierHiddenStory } from "@/components/dossier-hiddenstory";
import { DossierLifeMap } from "@/components/dossier-lifemap";
import { DossierPeople, DossierWealth, DossierCareer } from "@/components/dossier-civil-chapters";
import { DossierWounds } from "@/components/dossier-wounds";
import { DossierLove } from "@/components/dossier-love";
import { DossierYearAhead, DossierFiveYears, DossierFutureLetter } from "@/components/dossier-year";
import { DossierPlaybook } from "@/components/dossier-playbook";

const PROGRESS_KEY = "akm.v1.dossierProgress";

export default function DossierPage() {
  const { profile, hasProfile } = useProfile();
  const { lang } = useLang();
  const hi = lang === "hi";
  const [ready, setReady] = React.useState(false);
  const [chapter, setChapter] = React.useState(0);
  React.useEffect(() => {
    setReady(true);
    try {
      const raw = window.localStorage.getItem(PROGRESS_KEY);
      if (raw) setChapter(Number(raw) || 0);
    } catch { /* private mode */ }
  }, []);

  function advance() {
    setChapter((c) => {
      const next = c + 1;
      try { window.localStorage.setItem(PROGRESS_KEY, String(next)); } catch { /* ignore */ }
      return next;
    });
  }

  if (!ready) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center font-dossier text-gold/70">
        {hi ? "dossier band ho raha — ek kshan" : "Unsealing your dossier — one moment"}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 pb-16 pt-8" data-testid="dossier-page">
      <PageHeader
        title={hi ? "aakashik jeevan-dossier" : "The Akashic Life Dossier"}
        subtitle={
          hi
            ? "aapka past decode ho gaya. aapki present khul gayi. aapka bhavishya kaisa hoga — interpret hona baaki hai."
            : "Your Past Decoded. Your Present Revealed. Your Future Interpreted."
        }
      />

      {!hasProfile || !profile ? (
        <div className="rounded-xl border border-gold/30 bg-gold/5 px-5 py-8 text-center">
          <p className="text-sm leading-relaxed">
            {hi
              ? "dossier janm-bashai ka hai — pehle apna naam + janm-tithi do, phir band-khulai shuru hogi."
              : "The dossier is keyed to a birth-first identity — give your name and date of birth to begin the unsealing."}
          </p>
        </div>
      ) : chapter === 0 ? (
        <DossierGate onOpenChapter={advance} />
      ) : (
        <div className="space-y-6">
          <DossierChapter1 />
          {chapter >= 2 && <DossierHiddenStory onNext={advance} />}
          {chapter >= 3 && <DossierLifeMap />}
          {chapter >= 4 && <DossierWounds onNext={advance} />}
          {chapter >= 5 && <DossierLove onNext={advance} />}
          {chapter >= 6 && <DossierPeople onNext={advance} />}
          {chapter >= 7 && <DossierWealth onNext={advance} />}
          {chapter >= 8 && <DossierCareer onNext={advance} />}
          {chapter >= 9 && <DossierYearAhead onNext={advance} />}
          {chapter >= 10 && <DossierFiveYears onNext={advance} />}
          {chapter >= 11 && <DossierFutureLetter />}
          {chapter >= 12 && <DossierPlaybook />}
          {chapter < 2 && (
            <button
              onClick={advance}
              data-testid="next-chapter"
              className="mx-auto block rounded-lg border border-gold/50 bg-gold/10 px-5 py-2.5 text-sm font-semibold text-gold hover:bg-gold/20"
            >
              {hi ? "agli chapter: chhupi kahani →" : "Next chapter: The hidden story →"}
            </button>
          )}
        </div>
      )}

      <DisclaimerLine />
    </div>
  );
}