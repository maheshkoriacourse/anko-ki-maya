"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { loadLifeContext, type LifeContext } from "@/lib/storage";
import { personalYear } from "@/lib/numerology";
import { cleanQuoteText, focusAction, personalCycleTheme } from "@/lib/personal-insights";

type Crossroad = { key: "careerCrossroad" | "moneyCrossroad" | "relationshipCrossroad"; focus: LifeContext["focus"]; en: string; hi: string; optionA: { en: string; hi: string }; optionB: { en: string; hi: string }; signal: { en: string; hi: string }; question: { en: string; hi: string } };

const CROSSROADS: Crossroad[] = [
  { key: "careerCrossroad", focus: "career", en: "Career / business", hi: "Kaam / career", optionA: { en: "Clarify ownership, scope, timeline, and compensation in the current opportunity.", hi: "Maujooda mauke mein apna adhikaar, kaam ka daayra, samay aur muawza saaf karein." }, optionB: { en: "Run a small, reversible test of the alternative before leaving a stable commitment.", hi: "Kisi sthir vaade ko chhodne se pehle doosre raaste ka chhota, palatne-yogya parikshan karein." }, signal: { en: "Responsibility is increasing but decision rights, support, or terms remain vague.", hi: "Zimmedaari badhe, par faisle ka adhikaar, sahaara ya shartein aspasht rahein." }, question: { en: "Which choice builds skill or leverage without silently consuming all your capacity?", hi: "Kaunsa vikalp aapki kshamata ya hunar badhaata hai—bina aapka saara samay chupchaap le liye?" } },
  { key: "moneyCrossroad", focus: "money", en: "Money / security", hi: "Paisa / suraksha", optionA: { en: "Map the next 30 days of income, fixed costs, and commitments before deciding.", hi: "Faisle se pehle agle 30 din ki aamdani, pakke kharch aur vaade likhein." }, optionB: { en: "Pause a non-essential commitment until its total cost and exit terms are clear.", hi: "Jab tak kul kharch aur nikalne ki shartein saaf na hon, gair-zaroori vaada rok kar rakhein." }, signal: { en: "You are being asked to decide before the full cost, timing, or obligation is written down.", hi: "Poora kharch, samay ya zimmedaari likhe bina faisla karne ko kaha ja raha ho." }, question: { en: "What number or term do you need in writing before this becomes a responsible yes?", hi: "Zimmedaari se haan kehne se pehle kaunsa ank ya shart likhit mein chahiye?" } },
  { key: "relationshipCrossroad", focus: "relationships", en: "Relationships / family", hi: "Rishte / parivaar", optionA: { en: "State one specific need and ask for a concrete next step.", hi: "Apni ek zaroorat saaf kahiye aur agla thos kadam poochhiye." }, optionB: { en: "Set one respectful boundary and agree when you will revisit the conversation.", hi: "Ek izzat-bhari seema tay karein aur baat dobara kab hogi, yeh bhi tay karein." }, signal: { en: "The same concern returns, but nobody names a next step or shared responsibility.", hi: "Wahi chinta laut aaye, par agla kadam ya saanjhi zimmedaari tay na ho." }, question: { en: "What can you ask clearly without assuming you already know the other person's intent?", hi: "Doosre vyakti ki niyat maan lene ke bajay, aap kya baat saaf poochh sakte hain?" } },
];

export function PatternCrossroads({ birthDate, lang }: { birthDate: string; lang: "en" | "hi" }) {
  const [context, setContext] = React.useState<LifeContext | null>(null);
  React.useEffect(() => setContext(loadLifeContext(birthDate)), [birthDate]);
  if (!context) return <Card className="mt-4 border-dashed"><CardContent className="flex flex-wrap items-center justify-between gap-3 py-5"><p className="text-sm text-muted-foreground">{lang === "hi" ? "Career, paisa aur rishton ke crossroads ko aapki zindagi se jodne ke liye calibration mein apna sandarbh jodein." : "Add your context in calibration to connect career, money, and relationship crossroads to your actual situation."}</p><Link href="/calibration" className="inline-flex items-center gap-2 text-sm underline underline-offset-4">{lang === "hi" ? "Sandarbh jodein" : "Add context"}<ArrowRight aria-hidden className="size-4" /></Link></CardContent></Card>;

  const hi = lang === "hi";
  const month = Number(birthDate.slice(5, 7));
  const day = Number(birthDate.slice(8, 10));
  const year = new Date().getFullYear();
  const cycle = personalYear(month, day, year).number;
  const review = new Date(); review.setDate(review.getDate() + 30);
  const reviewDate = new Intl.DateTimeFormat(hi ? "hi-IN" : "en-IN", { day: "numeric", month: "long", year: "numeric" }).format(review);
  return <section className="mt-5 space-y-3" aria-labelledby="crossroads-title">
    <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">{hi ? "Faislon ko kaam mein badlein" : "Turn the reading into choices"}</p><h3 id="crossroads-title" className="mt-1 font-display text-xl font-semibold">{hi ? "Teen current crossroads" : "Three current crossroads"}</h3><p className="mt-1 text-sm text-muted-foreground">{hi ? "Jahan aapne apna sandarbh diya hai, vahin use neeche joda hai. Khaali kshetra mein hum aapki sthiti ka daava nahi karte." : "Your own context is used where you supplied it. Where a field is blank, we make no claim about your situation."}</p></div>
    <div className="grid gap-3 xl:grid-cols-3">{CROSSROADS.map((item) => {
      const challenge = context[item.key]?.trim() ?? "";
      const anchors = context.anchors.filter((anchor) => anchor.area === item.focus && anchor.note.trim());
      const theme = personalCycleTheme(cycle, lang);
      return <Card key={item.key} className="glass">
        <CardHeader className="space-y-2"><div className="flex items-center justify-between gap-2"><Badge variant="gold">{hi ? `Personal Year ${cycle}` : `Personal Year ${cycle}`}</Badge><Badge variant="outline">{hi ? "Vichaar" : "Reflection prompt"}</Badge></div><CardTitle className="text-lg">{hi ? item.hi : item.en}</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {challenge ? <div className="rounded-lg border-l-2 border-kesari bg-kesari/5 px-3 py-2"><p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? "Aapne bataya" : "You told us"}</p><p className="mt-1 text-sm">{challenge}</p></div> : <p className="rounded-lg border border-dashed p-3 text-sm text-muted-foreground">{hi ? "Is kshetra ka khaas sandarbh abhi nahi diya. Neeche ke vikalp saamanya planning prompts hain." : "You haven’t added a situation in this area. The options below are general planning prompts."}</p>}
          <p className="text-sm"><span className="font-semibold">{hi ? "Purana pattern jaanchne ka sawaal: " : "A pattern to test—not assume: "}</span>{anchors.length ? (hi ? `Aapke notes (${anchors.map((anchor) => anchor.year).join(", ")}) mein kya aisi milti-julti zimmedaari ya faisla tha?` : `Did a similar decision or responsibility appear in the moments you noted (${anchors.map((anchor) => anchor.year).join(", ")})?`) : (hi ? "Kya aapke kisi yaad kiye mod par aisi hi sthiti aayi thi? Abhi hum uska andaaza nahi laga sakte." : "Have you faced a similar situation at a turning point in your life? We do not have that evidence yet.")}</p>
          {challenge ? <p className="text-sm"><span className="font-semibold">{hi ? "Agar yahi sthiti jaari rahi toh sambhavit keemat: " : "If this stays unresolved, a possible cost is: "}</span>{hi ? `aapke bataye iraade “${cleanQuoteText(context.desiredOutcome || "jo aapke liye maayne rakhta hai")}” ko samay ya dhyaan kam milna. Yeh nateeja nahi—ek risk jaanchne ka sawaal hai.` : `less time or attention for the outcome you named—“${cleanQuoteText(context.desiredOutcome || "what matters to you")}”. This is a risk to examine, not a predicted outcome.`}</p> : null}
          <p className="text-sm"><span className="font-semibold">{hi ? "Is cycle ka planning lens: " : "Cycle lens: "}</span>{theme}. {hi ? "Yeh paramparagat ank-theme hai." : "A traditional number interpretation—not a forecast of an event."}</p>
          <div className="space-y-2 rounded-lg bg-secondary/40 p-3 text-xs"><p><span className="font-semibold">{hi ? "Raasta A: " : "Path A: "}</span>{hi ? item.optionA.hi : item.optionA.en}</p><p><span className="font-semibold">{hi ? "Raasta B: " : "Path B: "}</span>{hi ? item.optionB.hi : item.optionB.en}</p></div>
          <p className="text-sm"><span className="font-semibold">{hi ? "30-din ka prayog: " : "30-day experiment: "}</span>{hi ? `${focusAction(item.focus, lang)} Iska review ${reviewDate} ko karein.` : `${focusAction(item.focus, lang)} Review what changed on ${reviewDate}.`}</p>
          <p className="rounded-lg border bg-background/50 p-3 text-xs"><span className="font-semibold uppercase tracking-wide text-gold">{hi ? "Signal aur sawaal" : "Signal and decision question"}</span><br />{hi ? item.signal.hi : item.signal.en}<br /><span className="mt-1 inline-block">{hi ? item.question.hi : item.question.en}</span></p>
          <details className="rounded-lg border px-3 py-2 text-xs text-muted-foreground"><summary className="cursor-pointer">{hi ? "Yeh yahan kyun hai?" : "Why is this here?"}</summary><p className="mt-2">{hi ? `Ank-aadhaar: Personal Year ${cycle} · ${year}. Sandarbh-aadhaar: aapka diya hua ${challenge ? "is kshetra ka sawaal" : "koi specific sawaal nahi; isliye yeh generic prompt hai"}${anchors.length ? ` aur ${anchors.length} aapke bataye timeline notes` : ""}. Isse ghatna ka kaaran ya guarantee sabit nahi hoti.` : `Number basis: Personal Year ${cycle} · ${year}. Context basis: ${challenge ? "the situation you supplied in this area" : "no specific situation supplied, so this remains a general prompt"}${anchors.length ? ` and ${anchors.length} timeline note(s) you added` : ""}. This cannot establish a cause or guarantee an event.`}</p></details>
        </CardContent>
      </Card>;
    })}</div>
  </section>;
}
