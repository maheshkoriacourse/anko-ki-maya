"use client";

import * as React from "react";
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { cleanQuoteText, cycleCaution, focusAction, focusSignal, personalCycleTheme } from "@/lib/personal-insights";
import { loadInsightFeedback, loadLifeContext, saveInsightFeedback, type InsightResponse, type LifeContext } from "@/lib/storage";
import { personalDay, personalMonth, personalYear } from "@/lib/numerology";

type Window = { id: string; title: string; start: Date; end: Date; past: boolean };

function dateAtNoon(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
}

function weekStart(date: Date): Date {
  const result = dateAtNoon(date);
  result.setDate(result.getDate() - ((result.getDay() + 6) % 7));
  return result;
}

function personalCycleForDate(birthDate: string, date: Date): number {
  const month = Number(birthDate.slice(5, 7));
  const day = Number(birthDate.slice(8, 10));
  const year = personalYear(month, day, date.getFullYear()).number;
  const personalMonthNumber = personalMonth(year, date.getMonth() + 1).number;
  return personalDay(personalMonthNumber, date.getDate()).number;
}

function dominantCycle(birthDate: string, start: Date, end: Date): number {
  const counts = new Map<number, number>();
  for (const cursor = dateAtNoon(start); cursor <= end; cursor.setDate(cursor.getDate() + 1)) {
    const cycle = personalCycleForDate(birthDate, cursor);
    counts.set(cycle, (counts.get(cycle) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0] - b[0])[0]?.[0] ?? 1;
}

function formatWindow(window: Window): string {
  // The Hindi option is intentionally Roman Hinglish, so keep dates Roman too.
  const locale = "en-IN";
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" };
  const left = new Intl.DateTimeFormat(locale, options).format(window.start);
  const right = new Intl.DateTimeFormat(locale, options).format(window.end);
  return left === right ? left : `${left} – ${right}`;
}

function focusLabel(context: LifeContext, lang: "en" | "hi") {
  const en: Record<LifeContext["focus"], string> = { career: "career or business", money: "money and stability", relationships: "relationships", family: "family responsibilities", wellbeing: "energy and routine", purpose: "direction and purpose", creativity: "creative work" };
  const hi: Record<LifeContext["focus"], string> = { career: "kaam ya business", money: "paisa aur sthirta", relationships: "rishte", family: "parivaar ki zimmedaari", wellbeing: "urja aur dincharya", purpose: "disha aur uddeshya", creativity: "rachnatmak kaam" };
  return (lang === "hi" ? hi : en)[context.focus];
}

function memoryChecks(context: LifeContext, lang: "en" | "hi"): [string, string] {
  if (lang === "hi") {
    const options: Record<LifeContext["focus"], [string, string]> = {
      career: ["Kya koi nayi zimmedaari ya offer aaya, lekin adhikaar ya samay-seema saaf nahi thi?", "Kya aapne koi kaam ya vichaar isliye rok rakha tha kyunki pehle poora yakeen chahiye tha?"],
      money: ["Kya koi kharch ya paison ka vaada aapki ummeed se kam saaf nikla?", "Kya poora hisaab saamne na hone ki wajah se aapne paison ka faisla taal diya?"],
      relationships: ["Kya zaroori baat shuru hui, par agla kadam tay hue bina ruk gayi?", "Kya shaanti banaaye rakhne ke liye aapne apni koi zaroorat nahi kahi?"],
      family: ["Kya bina saaf sahmati ke koi kaam aapki zimmedaari maan liya gaya?", "Kya madad maangne ke bajay aapne ek kaam chupchaap khud sambhaal liya?"],
      wellbeing: ["Kya aaraam ya dhyaan ka samay kisi aur kaam mein chala gaya?", "Kya urja kam hone par bhi aapne apni aam raftaar jaari rakhi?"],
      purpose: ["Kya koi vaada samay leta raha, par aapke bataaye lakshya ko aage nahi badha paaya?", "Kya koi raasta achha laga, par uske liye kya chhodna padega yeh saaf nahi tha?"],
      creativity: ["Kya kaam ko aur behtar karte rehne ke chalte use share karna talta raha?", "Kya feedback ka intezaar karte hue aapne agla chhota kadam rok diya?"],
    };
    return options[context.focus];
  }
  const options: Record<LifeContext["focus"], [string, string]> = {
    career: ["Did a new responsibility or offer arrive before ownership or timing was clear?", "Did you hold back a piece of work or an idea while waiting for certainty?"],
    money: ["Did a cost or financial commitment turn out less visible than you expected?", "Did you postpone a money decision because the full picture was not written down?"],
    relationships: ["Did an important conversation stop without an agreed next step?", "Did you keep one need to yourself to preserve the peace?"],
    family: ["Did a task become your responsibility without an explicit agreement?", "Did you quietly take something on instead of asking someone to share it?"],
    wellbeing: ["Did time meant for rest or focus get displaced by another demand?", "Did you keep your usual pace even when your energy was lower?"],
    purpose: ["Did a commitment consume time without moving the outcome you named?", "Did an option appeal to you before its trade-offs were clear?"],
    creativity: ["Did polishing or preparation delay sharing something you had finished?", "Did waiting for feedback keep you from taking the next small step?"],
  };
  return options[context.focus];
}

export function ShortHorizonReading({ birthDate, today, lang }: { birthDate: string; today: Date; lang: "en" | "hi" }) {
  const hi = lang === "hi";
  const [context, setContext] = React.useState<LifeContext | null>(null);
  const [feedback, setFeedback] = React.useState<Record<string, InsightResponse>>({});
  React.useEffect(() => {
    setContext(loadLifeContext(birthDate));
    setFeedback(loadInsightFeedback(birthDate));
  }, [birthDate]);

  const monday = weekStart(today);
  const previousStart = new Date(monday); previousStart.setDate(monday.getDate() - 7);
  const previousEnd = new Date(monday); previousEnd.setDate(monday.getDate() - 1);
  const nextStart = new Date(monday); nextStart.setDate(monday.getDate() + 7);
  const nextEnd = new Date(nextStart); nextEnd.setDate(nextStart.getDate() + 6);
  const nextMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 1, 12);
  const nextMonthEnd = new Date(today.getFullYear(), today.getMonth() + 2, 0, 12);
  const windows: Window[] = [
    { id: `last-week-${previousStart.toISOString().slice(0, 10)}`, title: hi ? "Pichhle hafte ka memory check" : "Last week · a memory check", start: previousStart, end: previousEnd, past: true },
    { id: `today-${today.toISOString().slice(0, 10)}`, title: hi ? "Aaj ka sanket" : "Today · the live signal", start: dateAtNoon(today), end: dateAtNoon(today), past: false },
    { id: `next-week-${nextStart.toISOString().slice(0, 10)}`, title: hi ? "Aane wala hafta" : "Coming week · a watch window", start: nextStart, end: nextEnd, past: false },
    { id: `next-month-${nextMonthStart.toISOString().slice(0, 10)}`, title: hi ? "Aane wala mahina" : "Coming month · a planning window", start: nextMonthStart, end: nextMonthEnd, past: false },
  ];

  const focus = context ? focusLabel(context, lang) : null;
  const checks = context ? memoryChecks(context, lang) : null;
  return <section className="space-y-4" aria-labelledby="short-horizon-heading">
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">{hi ? "Chhote samay ke sanket" : "Near-term signals"}</p>
      <h2 id="short-horizon-heading" className="mt-1 font-display text-2xl font-semibold">{hi ? "Pichhla hafta, aaj, agla hafta" : "Last week, today, and what’s next"}</h2>
      <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{hi ? "Ank-cycle se nikle sambhavit themes—na ki aapke jeevan ke baare mein chhupi jaankari. Pichhle hafte ka hissa yaad-dasht ki jaanch hai; sahi lage tabhi use apna anubhav maanein." : "These are possible themes from a traditional number-cycle calculation—not hidden knowledge about your life. The past-week section is a memory check; count it as your experience only if you confirm it."}</p>
    </div>
    <div className="grid gap-4 xl:grid-cols-2">
      {windows.map((window) => {
        const cycle = dominantCycle(birthDate, window.start, window.end);
        const theme = personalCycleTheme(cycle, lang);
        const response = feedback[window.id];
        return <Card key={window.id} className="glass">
          <CardHeader className="space-y-2">
            <div className="flex flex-wrap items-center gap-2"><Badge variant="gold">{formatWindow(window)}</Badge><Badge variant="outline">{hi ? `Vyaktigat din-cycle ${cycle}` : `Personal-day theme ${cycle}`}</Badge></div>
            <CardTitle className="text-lg">{window.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm"><span className="font-semibold">{hi ? "Paramparagat lens: " : "Cycle lens: "}</span>{theme}. <span className="text-muted-foreground">{hi ? `Aapka dhyaan: ${focus ?? "abhi joda nahi"}.` : `Your stated focus: ${focus ?? "not added yet"}.`}</span></p>
            {window.past ? context && checks ? response === "not-me" ? <p role="status" className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">{hi ? "Aapne bataya ki yeh fit nahi hua. Is guess ko yahin chhod rahe hain—ise aapka anubhav nahi maana." : "You said this did not fit, so we’re setting this guess aside. It is not recorded as your experience."}</p> : <div className="space-y-2 rounded-xl border border-kesari/30 bg-kesari/5 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? `Aapne ${focus} mein yeh bataya: “${context.currentChallenge || "koi vartamaan challenge nahi joda"}”` : `Against the ${focus} challenge you shared: “${context.currentChallenge || "no current challenge added"}”`}</p><p className="text-sm">{hi ? `Kya inmein se kuchh hua? ${checks[0]} Ya ${checks[1]} Ya inmein se kuchh nahi?` : `Did either of these happen? ${checks[0]} Or ${checks[1]} Or neither?`}</p><div className="flex flex-wrap gap-2">{(["fits", "partly", "not-me"] as InsightResponse[]).map((key) => <Button key={key} size="sm" variant={response === key ? "secondary" : "outline"} aria-pressed={response === key} onClick={() => setFeedback(saveInsightFeedback(birthDate, window.id, key))}>{key === "fits" ? (hi ? "Haan, yahi hua" : "Yes, that fits") : key === "partly" ? (hi ? "Kuchh had tak" : "Partly") : (hi ? "Nahi, aisa nahi" : "Neither / not me")}</Button>)}</div><p className="text-xs text-muted-foreground">{hi ? "Agar 'nahi' chuna, hum is guess par zor nahi denge. Isse aapki zindagi ka fact nahi maana jaata." : "If you choose ‘neither,’ we won’t insist. This guess is not treated as a fact about your life."}</p></div> : <p className="rounded-lg border border-dashed p-3 text-sm text-muted-foreground">{hi ? "Apna focus aur vartamaan sawaal jodne ke baad hi vyaktigat memory-check milega." : "Add your focus and current question to see a personal memory check here."}</p>
            : <><div className="rounded-xl border border-kesari/30 bg-kesari/5 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? "Sambhavit tanaav / trigger" : "Possible friction / trigger"}</p><p className="mt-1 text-sm">{focus ? focusSignal(context!.focus, lang) : (hi ? "Adhoori jaankari par dabav mein faisla." : "Pressure to decide before the details are clear.")}</p></div><p className="text-sm"><span className="font-semibold">{hi ? "Mauke ka behtar istemaal: " : "Constructive use of this window: "}</span>{context ? focusAction(context.focus, lang) : (hi ? "Bade kadam se pehle chhota aur palatne-yogya parikshan karein." : "Use a small, reversible test before making a larger commitment.")}</p><p className="text-sm"><span className="font-semibold">{hi ? "Savdhaani: " : "Watch the downside: "}</span>{cycleCaution(cycle, lang)}</p><p className="text-sm"><span className="font-semibold">{hi ? "Faisle ka sawaal: " : "Decision question: "}</span>{context?.desiredOutcome ? (hi ? `Kya yeh kadam aapke iraade “${cleanQuoteText(context.desiredOutcome)}” ko aage badhaata hai?` : `Does this step move your stated outcome—“${cleanQuoteText(context.desiredOutcome)}”—forward?`) : (hi ? "Is kadam ka sabse chhota, dikhne wala parinaam kya hoga?" : "What is the smallest observable result this step should produce?")}</p></>}
            <details className="rounded-lg border px-3 py-2 text-xs text-muted-foreground"><summary className="cursor-pointer font-medium">{hi ? "Yeh window kyun? Calculation aur seema dekhein" : "Why this window? See the calculation and its limits"}</summary><div className="mt-2 space-y-2"><p>{hi ? "Janm-mahina + janm-din se vyaktigat varsh; usmein calendar mahina aur tareekh jodkar har din ka personal cycle nikala. Window mein sabse zyada aane wala ank dikhaya hai." : "Personal year is calculated from birth month and day plus calendar year; calendar month and day are then added for each date. This shows the most frequent personal-day number in the window."}</p><p>{context?.currentChallenge ? (hi ? `Aapka diya sandarbh: “${context.currentChallenge}”.` : `Your stated context: “${context.currentChallenge}”.`) : (hi ? "Abhi aapka current challenge is report se link nahi hai." : "No current challenge has been linked to this reading yet.")}</p><p>{hi ? "Paramparagat cycle-theme ghatna ko predict nahi karta. Yeh tabhi upyogi hai jab aap apni paristhiti mein diya signal dekhte hain; agar nahi, toh ise chhod dein." : "A traditional cycle theme does not establish that an event will happen. Use it only if the observable signal appears in your situation; otherwise set it aside."}</p></div></details>
          </CardContent>
        </Card>;
      })}
    </div>
  </section>;
}
