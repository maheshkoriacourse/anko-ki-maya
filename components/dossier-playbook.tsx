"use client";

/**
 * v5.3 DOSSIER — THE LIFE PLAYBOOK chapter UI (spec: don't leave the reader hanging).
 */

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { playbookOf } from "@/lib/dossier-playbook";
import { useProfile } from "@/components/seeded-profile";
import { useLang } from "@/lib/lang";

export function DossierPlaybook() {
  const { profile } = useProfile();
  const { lang } = useLang();
  const hi = lang === "hi";
  if (!profile) return null;
  const d = Number(profile.birthDate.slice(8, 10));
  const moves = playbookOf(d === 0 ? 1 : Number(d.toString().split("").reduce((s, x) => s + Number(x), 0) % 9 || 9), 0);

  return (
    <Card className="glass" data-testid="dossier-playbook">
      <CardHeader>
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold/90">
          {hi ? "chapters ka ant — lekin aapka shuruaat" : "The dossier ends — you begin here"}
        </p>
        <CardTitle className="font-dossier text-2xl">{hi ? "jeevan-khel ka khel-hisaab" : "The life playbook"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {moves.map((area) => (
          <section key={area.areaEn} data-testid={`play-${area.areaEn.replace(/\W+/g, "-").toLowerCase()}`}>
            <p className="font-display text-lg text-gold">{hi ? area.areaHi : area.areaEn}</p>
            <ul className="mt-2 space-y-2">
              {area.moves.map((mv, i) => (
                <li key={i} className="rounded-lg border border-border bg-secondary/30 px-3.5 py-2.5">
                  <p className="text-sm font-semibold">{hi ? mv.moveHi : mv.moveEn}</p>
                  <p className="mt-0.5 text-xs italic text-muted-foreground">{hi ? mv.whyHi : mv.whyEn}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <p className="pt-2 text-center text-xs italic text-muted-foreground">
          {hi
            ? "yahi dossier ka asli imtihaan hai — padhte-padhlete log kai hain, chalte-kam log hi banate hain."
            : "That is the dossier's real test: many read their book; the few who move get to live it."}
        </p>
      </CardContent>
    </Card>
  );
}