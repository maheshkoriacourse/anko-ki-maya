"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { Badge, Card, CardContent } from "@/components/ui";
import { loadLifeContext, type LifeFocus } from "@/lib/storage";
import { personalYear } from "@/lib/numerology";
import { grahaFor, devNum } from "@/lib/navgrah";

const FOCUS_LABEL: Record<LifeFocus, { en: string; hi: string }> = {
  career: { en: "career or business", hi: "career ya business" },
  money: { en: "money and stability", hi: "paisa aur sthirta" },
  relationships: { en: "relationships", hi: "rishte" },
  family: { en: "family and responsibility", hi: "parivaar aur zimmedaari" },
  wellbeing: { en: "energy and routine", hi: "urja aur dincharya" },
  purpose: { en: "direction and purpose", hi: "disha aur uddeshya" },
  creativity: { en: "creative work", hi: "rachnatmak kaam" },
};

const CYCLE_ACTION: Record<number, { en: string; hi: string }> = {
  1: { en: "choose one beginning and give it a visible first step", hi: "ek nayi shuruaat chunein aur uska pehla kadam saaf karein" },
  2: { en: "make room for a conversation, collaboration, or patient follow-through", hi: "baat-cheet, saajhedaari aur dhairya se kaam poora karne ki jagah banaayein" },
  3: { en: "share your work, ask for feedback, and finish one visible piece", hi: "apna kaam saamne rakhein, raay lein aur ek dikhne waala hissa poora karein" },
  4: { en: "strengthen the routine, records, and boundaries that support this goal", hi: "is lakshya ko sambhaalne waali dincharya, likhit hisaab aur seemaayein mazboot karein" },
  5: { en: "test a change on a small scale before making a larger commitment", hi: "badi pratibaddhata se pehle chhote star par badlaav aazmaayein" },
  6: { en: "include care and responsibility in the plan, without carrying every part alone", hi: "yojana mein dekhbhaal aur zimmedaari ko jagah dein, par sab kuchh akele na uthaayein" },
  7: { en: "protect time to research, reflect, and improve the underlying skill", hi: "shodh, manan aur bunyaadi hunar sudhaarne ke liye samay bachaayein" },
  8: { en: "review the terms, resources, and measurable outcomes before you scale", hi: "kaam badhaane se pehle shartein, saadhan aur naapne laayak nateeje dekhein" },
  9: { en: "close one unfinished loop so the next chapter has room", hi: "agle adhyay ke liye jagah banaane ko ek adhoora kaam poora karein" },
};

export function LifeContextBrief({ birthDate, lang }: { birthDate: string; lang: "en" | "hi" }) {
  const hi = lang === "hi";
  const [context, setContext] = React.useState<ReturnType<typeof loadLifeContext>>(null);
  React.useEffect(() => setContext(loadLifeContext(birthDate)), [birthDate]);

  const year = new Date().getFullYear();
  const birthMonth = Number(birthDate.slice(5, 7));
  const birthDay = Number(birthDate.slice(8, 10));
  const currentCycle = personalYear(birthMonth, birthDay, year).number;
  const cycleBase = currentCycle > 9 ? currentCycle % 9 || 9 : currentCycle;

  if (!context) {
    return (
      <Card className="border-gold/35 bg-card/90">
        <CardContent className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gold/10 text-gold"><Compass aria-hidden className="size-5" /></span>
            <div>
              <p className="font-display font-semibold">{hi ? "Aapki zindagi ke saath reading jodein" : "Make the reading about your life"}</p>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{hi ? "Aaj ka sawaal aur kuchh yaadgaar saal bataayein. Phir hum ank-theme ko aapke apne sandarbh ke saath rakhenge." : "Share what is on your mind and a few turning points. The reading can then connect number themes to your own context."}</p>
            </div>
          </div>
          <Link href="/calibration" className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">{hi ? "Mera sandarbh jodein" : "Add my context"}<ArrowRight aria-hidden className="size-4" /></Link>
        </CardContent>
      </Card>
    );
  }

  const action = CYCLE_ACTION[cycleBase] ?? CYCLE_ACTION[1];
  return (
    <Card className="border-gold/35 bg-card/95">
      <CardContent className="space-y-5 py-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">{hi ? "Aapka vartamaan crossroads" : "Your current crossroads"}</p>
            <h2 className="mt-1 font-display text-xl font-semibold">{hi ? FOCUS_LABEL[context.focus].hi : FOCUS_LABEL[context.focus].en}</h2>
          </div>
          <Badge variant="gold">{hi ? `Personal Year ${devNum(currentCycle)} · ${grahaFor(cycleBase).grahaHi}` : `Personal Year ${currentCycle} · ${grahaFor(cycleBase).graha}`}</Badge>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border bg-background/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{hi ? "Aapne kaha" : "What you told us"}</p>
            <p className="mt-2 text-sm leading-relaxed">{context.currentChallenge || (hi ? "Abhi ki uljhan aapne khaali chhodi hai." : "You have not added a current challenge yet.")}</p>
          </div>
          <div className="rounded-xl border bg-background/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{hi ? "Aapka iraada" : "Your intended change"}</p>
            <p className="mt-2 text-sm leading-relaxed">{context.desiredOutcome || (hi ? "Agle 12 mahine ka iraada abhi khaali hai." : "You have not added a 12-month outcome yet.")}</p>
          </div>
        </div>

        {context.importantDecision ? (
          <div className="rounded-xl border-l-2 border-kesari bg-kesari/5 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? "Saamne ka faisla" : "Decision in front of you"}</p>
            <p className="mt-1 text-sm">{context.importantDecision}</p>
          </div>
        ) : null}

        <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
          <p className="text-sm leading-relaxed"><span className="font-semibold">{hi ? "Is saal ka planning lens: " : "Planning lens for this cycle: "}</span>{hi ? action.hi : action.en}. <span className="text-muted-foreground">{hi ? "Yeh paramparagat cycle-theme hai, kisi ghatna ki guarantee nahi." : "This is a traditional cycle theme, not a guarantee of an event."}</span></p>
          <Link href="/calibration" className="inline-flex h-8 items-center justify-center rounded-md border bg-transparent px-3 text-xs font-medium transition-colors hover:bg-accent">{hi ? "Sandarbh badlein" : "Update context"}</Link>
        </div>

        {context.anchors.length > 0 ? (
          <div className="border-t pt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{hi ? "Aapke chune hue turning points" : "Turning points you chose"}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {context.anchors.map((anchor) => {
                const cycle = personalYear(birthMonth, birthDay, anchor.year).number;
                return <span key={anchor.id} className="rounded-full border bg-background/70 px-3 py-1.5 text-xs"><span className="font-semibold">{anchor.year}</span> · {anchor.note} <span className="text-muted-foreground">({hi ? `cycle ${devNum(cycle)}` : `cycle ${cycle}`})</span></span>;
              })}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{hi ? "Yeh saal aapke diye hue hain. Cycle un par ek paramparagat lens hai; isse ghatna ka kaaran ya bhavishyavaani nahi maana jaata." : "You supplied these years. The cycle is a traditional lens on them, not a cause or a proof of what happened."}</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
