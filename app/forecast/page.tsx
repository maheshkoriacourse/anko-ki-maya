"use client";

/**
 * Six-Month Forecast — monthly reflection themes + life-area tabs.
 * Every line is phrased as a possibility; nothing is deterministic.
 */

import * as React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, Tabs } from "@/components/ui";
import { PageHeader, WhyThisReading, EmptyState, LoadingCards } from "@/components/shared";
import { useProfile } from "@/components/seeded-profile";
import { useT } from "@/lib/lang";
import { LIFE_AREA_PROMPT } from "@/lib/meanings";
import { upcomingMonths, monthName, type MonthCycle } from "@/lib/numerology";
import { loadLifeContext, type LifeContext } from "@/lib/storage";
import { ShortHorizonReading } from "@/components/short-horizon-reading";
import { cleanQuoteText, cycleCaution, focusAction, focusSignal, personalCycleTheme } from "@/lib/personal-insights";

const LIFE_AREAS = ["Career", "Relationships", "Money Mindset", "Wellbeing", "Creativity"] as const;
type LifeArea = (typeof LIFE_AREAS)[number];

function areaPrompt(area: LifeArea, hi = false): string {
  if (!hi) return LIFE_AREA_PROMPT[area];
  const hiPrompts: Record<LifeArea, string> = {
    Career: "Is mahine ka career decision kya hai, aur uska agla chhota kadam kya ho sakta hai?",
    Relationships: "Kaunsi baat rishte mein saaf kehni hai? Aapki apni zaroorat kya hai?",
    "Money Mindset": "Kharch ya vaade mein kaunsi ek cheez aap likhit mein dekh sakte hain?",
    Wellbeing: "Kaunsi chhoti routine aap agle do hafton tak realistically nibha sakte hain?",
    Creativity: "Kaunsa chhota, poora kiya hua kaam aap is mahine share karenge?",
  };
  return hiPrompts[area];
}

export default function ForecastPage() {
  const { profile, today } = useProfile();
  const { lang } = useT();
  const hi = lang === "hi";
  const [ready, setReady] = React.useState(false);
  const [area, setArea] = React.useState<LifeArea>("Career");
  const [lifeContext, setLifeContext] = React.useState<LifeContext | null>(null);
  React.useEffect(() => setReady(true), []);
  React.useEffect(() => {
    if (!profile) return;
    const context = loadLifeContext(profile.birthDate);
    setLifeContext(context);
    if (context) {
      const areaByFocus: Record<string, LifeArea> = {
        career: "Career", money: "Money Mindset", relationships: "Relationships",
        family: "Relationships", wellbeing: "Wellbeing", purpose: "Creativity", creativity: "Creativity",
      };
      setArea(areaByFocus[context.focus] ?? "Career");
    }
  }, [profile]);

  if (!ready) return <LoadingCards count={3} label="Loading your forecast" />;

  if (!profile) {
    return (
      <EmptyState
        title="No profile yet"
        body="Add your birth details to see your personal-year reflection and planning calendar."
        action={<Link href="/" className="text-sm text-primary underline">Start onboarding</Link>}
      />
    );
  }

  const birthMonth = Number(profile.birthDate.slice(5, 7));
  const birthDay = Number(profile.birthDate.slice(8, 10));
  const months: MonthCycle[] = upcomingMonths(
    birthMonth,
    birthDay,
    today.getFullYear(),
    today.getMonth() + 1,
    12,
  );
  const focusForArea = (selected: LifeArea): NonNullable<LifeContext>["focus"] => {
    if (selected === "Money Mindset") return "money";
    if (selected === "Relationships") return "relationships";
    if (selected === "Wellbeing") return "wellbeing";
    if (selected === "Creativity") return "creativity";
    return "career";
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={hi ? "Agle 12 mahine · aapka faisla-calendar" : "Your next 12 months · a decision calendar"}
        subtitle={
          hi
            ? `${monthName(today.getMonth() + 1)} ${today.getFullYear()} – ${months[11] ? `${monthName(months[11].month)} ${months[11].year}` : ""} tak — har mahine ko ek planning lens samjhein, tay ghatna ka ailaan nahi.`
            : `A month-by-month planning lens for ${monthName(today.getMonth() + 1)} ${today.getFullYear()} – ${
                months[11] ? `${monthName(months[11].month)} ${months[11].year}` : ""
              } — for each month: what flows, what stalls, how to work it, and what to guard. This reads the weather, it never announces fixed events.`}
      />
      <ShortHorizonReading birthDate={profile.birthDate} today={today} lang={lang} />

      <Card className="border-gold/35 bg-gold/5">
        <CardHeader>
          <CardTitle>{hi ? "Is calendar ka markaz" : "The goal at the centre of this calendar"}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-[1.3fr_1fr_1fr]">
          <div><p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? "Aapka 12-mahine ka iraada" : "Your 12-month outcome"}</p><p className="mt-1">{lifeContext?.desiredOutcome || (hi ? "Abhi iraada nahi joda" : "Add an outcome in your calibration to make these prompts more personal.")}</p></div>
          <div><p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? "Faisla saamne hai" : "Decision in front of you"}</p><p className="mt-1">{lifeContext?.importantDecision || (hi ? "Koi khaas faisla nahi joda" : "No specific decision added.")}</p></div>
          <div><p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? "Mushkil ho toh" : "When you feel stuck"}</p><p className="mt-1 text-sm">{hi ? "Faisle ko chhote parikshan mein baantein; pehle kya jaan-na hai, likhein; phir bharosemand vyakti se baat karein." : "Shrink the decision to a reversible test. Write down what you still need to learn, set a review date, and talk it through with someone you trust."}</p></div>
        </CardContent>
      </Card>


      <div>
        <p className="mb-2 text-sm font-medium">{hi ? "Jeevan-kshetra lens" : "Life-area lens"}</p>
        <Tabs
          ariaLabel="Life area"
          tabs={LIFE_AREAS.map((a) => ({ id: a, label: a }))}
          active={area}
          onChange={(id) => setArea(id as LifeArea)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {months.map((m, idx) => {
          const pm = m.personalMonth;
          const steps = [
            `Personal Year ${m.personalYear} (birth month + birth day + ${m.year}, reduced)`,
            `Personal Month = PY ${m.personalYear} + calendar month ${m.month} → ${pm}`,
          ];
          return (
            <Card key={m.label} className="flex flex-col">
              <CardHeader className="flex-row items-start justify-between gap-3">
                <div>
                  <CardTitle>{m.label}</CardTitle>
                  <p className="mt-0.5 text-xs font-medium text-gold">
                    {hi ? `vyaktigat mahina ${pm} · ${area}` : `Personal Month ${pm} · ${area}`}
                  </p>
                </div>
                <span aria-hidden className="number-glyph text-5xl text-primary/85">{pm}</span>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-3 text-sm">
                <p className="font-display text-base font-semibold">
                  {personalCycleTheme(pm, lang)}
                </p>
                <p className="text-sm"><span className="font-medium">{hi ? "Sambhavit trigger: " : "Possible trigger: "}</span>{focusSignal(focusForArea(area), lang)}</p>
                <div className="rounded-lg border bg-background/50 p-3 text-xs"><p><span className="font-semibold uppercase tracking-wide text-gold">{hi ? "Mauke ka behtar istemaal" : "Constructive use"}</span><br />{focusAction(focusForArea(area), lang)}</p><p className="mt-2"><span className="font-semibold uppercase tracking-wide text-kesari">{hi ? "Kis baat se bachein" : "Downside to guard against"}</span><br />{cycleCaution(pm, lang)}</p><p className="mt-2"><span className="font-semibold uppercase tracking-wide text-muted-foreground">{hi ? "Mahine ke ant ka check" : "End-of-month check"}</span><br />{lifeContext?.desiredOutcome ? (hi ? `Kya aap apne iraade “${cleanQuoteText(lifeContext.desiredOutcome)}” ki taraf ek dikhne wala kadam badhe?` : `What observable step moved you toward your stated outcome?`) : (hi ? "Kaunsa dikhne wala kadam aapne poora kiya?" : "What visible step did you complete?")}</p></div>
                {idx === 0 && lifeContext?.currentChallenge ? <div className="rounded-lg border border-kesari/30 bg-kesari/5 p-3"><p className="text-xs font-semibold uppercase tracking-wide text-gold">{hi ? "Is report mein aapka sawaal" : "Your stated challenge"}</p><p className="mt-1 text-sm">{lifeContext.currentChallenge}</p><p className="mt-1 text-xs text-muted-foreground">{hi ? "Yeh kalendar aapke diye sawaal ko planning mein jodta hai; ghatna ki bhavishyavaani nahi karta." : "The calendar uses your own words as a planning prompt; it does not predict an event."}</p></div> : null}
                <details className="rounded-lg border px-3 py-2 text-xs text-muted-foreground"><summary className="cursor-pointer font-medium">{hi ? "Yeh month-number kaise nikla?" : "How was this month number calculated?"}</summary><p className="mt-2">{steps.join(" · ")}</p><p className="mt-2">{hi ? "Yeh hisaab paramparagat cycle dikhata hai, ghatna ki guarantee nahi." : "This calculation identifies a traditional cycle; it does not establish that an event will happen."}</p></details>
                <p className="rounded-lg bg-secondary/50 p-2.5 text-xs">
                  <span className="font-semibold uppercase tracking-wide text-muted-foreground">
                    {hi ? "Soch-ne ka saval" : "Journal prompt"}
                  </span>
                  <br />
                  {areaPrompt(area, hi)}
                </p>
                <div className="mt-auto">
                  <WhyThisReading title={`${m.label} · ${hi ? "vyaktigat mahina" : "Personal Month"}`} steps={steps} />
                </div>
                <p className="text-[11px] text-muted-foreground">
                  {idx === 0
                    ? hi
                      ? "chalu mahina — isko mausam ki tarah padho, ailaan ki tarah nahi."
                      : "Current month — read it as weather, not a promise."
                    : hi
                      ? "khidki mahine aane par khulti hai — usi ke andar chalo."
                      : "The window opens when the month arrives — act inside it."}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground">
        {hi
          ? "yeh vachan bhaav aur samay ke jhariye dikhaata hai — ghatna ka ailaan nahi karta. shaadi, sehat, paisa ya koi khaas jeet yahaan se garantee nahi hoti."
          : "The forecast highlights emphases and reflection windows — it does not predict events. Marriage, health, money outcomes or any specific life event are never predicted here."}
      </p>
    </div>
  );
}
