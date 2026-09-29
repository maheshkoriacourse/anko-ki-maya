"use client";

/**
 * v5.0 DOSSIER CHAPTER 1 — WHO ARE YOU REALLY? (Soul Archetype)
 * Canonical spec chapter: AI-portrait slot + core nature + strengths +
 * hidden weakness + redemption + purpose + growth, ending on a cliffhanger
 * into the Life Map chapter. Voice = interpret-not-predict; copy is written
 * FOR the paying customer (never the producer).
 */

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { soulArchetype } from "@/lib/dossier";
import { useProfile } from "@/components/seeded-profile";
import { lifePath, birthdayNumber } from "@/lib/numerology";
import { useLang } from "@/lib/lang";

export function DossierChapter1() {
  const { profile } = useProfile();
  const { lang } = useLang();
  const hi = lang === "hi";

  if (!profile) return null;
  const d = Number(profile.birthDate.slice(8, 10));
  const m = Number(profile.birthDate.slice(5, 7));
  const y = Number(profile.birthDate.slice(0, 4));
  const a = soulArchetype(birthdayNumber(d).number, lifePath(y, m, d).number);

  return (
    <Card className="glass" data-testid="dossier-ch1">
      <CardHeader>
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold/90">
          {hi ? "chapter ek" : "Chapter One"}
        </p>
        <CardTitle className="font-dossier text-2xl">
          {hi ? "aap asli mein kaun ho?" : "Who are you, really?"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* portrait slot — Flux-generation comes in a later ledger tick; the box holds the frame */}
        <div
          aria-hidden
          data-testid="archetype-portrait-slot"
          className="relative mx-auto flex h-56 w-full max-w-md items-center justify-center overflow-hidden rounded-xl border border-gold/30 bg-[color-mix(in_srgb,var(--card)_92%,transparent)]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 120'%3E%3Cg fill='none' stroke='%23D4AF37' stroke-opacity='0.28' stroke-width='0.6'%3E%3Cpath d='M100 6 L138 33 L138 79 L100 106 L62 79 L62 33 Z'/%3E%3Cpath d='M100 6 L100 106 M62 33 L138 79 M62 79 L138 33'/%3E%3Ccircle cx='100' cy='56' r='30'/%3E%3Cpath d='M40 110 Q100 76 160 110'/%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: "420px 260px",
            backgroundPosition: "center",
          }}
        >
          <p className="max-w-[220px] text-center font-dossier text-sm text-gold/80">
            {hi ? "aapka aarchetype-chitra yahan khandit hoga — akashic chitrafal" : "Your archetype portrait will be inscribed here"}
          </p>
        </div>

        <div className="text-center">
          <p className="font-dossier text-3xl text-gold">{hi ? a.nameHi : a.name}</p>
          <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{hi ? a.elementHi : a.element}</p>
          <p className="mx-auto mt-3 max-w-md text-sm italic leading-relaxed text-foreground/90">
            "…{hi ? a.crestHi : a.crestEn}"
          </p>
        </div>

        <section>
          <p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? "kendra-seva" : "Core nature"}</p>
          <p className="mt-1.5 text-sm leading-relaxed">{hi ? a.coreHi : a.coreEn}</p>
        </section>

        <section>
          <p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? "shaktiyan" : "Strengths"}</p>
          <ul className="mt-1.5 grid gap-1.5 text-sm leading-relaxed sm:grid-cols-2">
            {(hi ? a.strengthsHi : a.strengthsEn).map((s) => (
              <li key={s} className="rounded-lg border border-border bg-secondary/30 px-3 py-2">{s}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-destructive/25 bg-destructive/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive">{hi ? "chhupi kamzori — jo koi nahi dekhta" : "The hidden weakness nobody names"}</p>
          <p className="mt-1.5 text-sm leading-relaxed">{hi ? a.shadowHi : a.shadowEn}</p>
          <p className="mt-2 text-sm italic leading-relaxed text-gold/90">{hi ? a.redemptionHi : a.redemptionEn}</p>
        </section>

        <section>
          <p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? "dharm" : "Purpose"}</p>
          <p className="mt-1.5 text-sm leading-relaxed">{hi ? a.purposeHi : a.purposeEn}</p>
        </section>

        <section>
          <p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? "sudhaar-ki-chadhni" : "Growth path"}</p>
          <p className="mt-1.5 text-sm leading-relaxed">{hi ? a.growthHi : a.growthEn}</p>
        </section>

        {/* cliffhanger into chapter 2 */}
        <div className="rounded-xl border border-gold/30 bg-gold/5 px-4 py-3 text-center" data-testid="ch1-cliffhanger">
          <p className="text-sm italic text-muted-foreground">
            {hi
              ? "\"…in shaktiyon aur chhupi kamzori ke beech mein ek kahani chhupi hai — jo aapki zindagi ko uske jaisa banaya. agli chapter mein: wo kahani.\""
              : "\"Between these strengths and that hidden weakness runs a story — the story that made your life the way it is. Next: the story.\""}
          </p>
          <p className="mt-1 text-xs font-semibold text-gold">
            {hi ? "agli chapter: aapki zindagi ki chhupi kahani →" : "Next: The hidden story of your life →"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}