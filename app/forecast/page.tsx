"use client";

/**
 * Six-Month Forecast — monthly reflection themes + life-area tabs.
 * Every line is phrased as a possibility; nothing is deterministic.
 */

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, Tabs } from "@/components/ui";
import { PageHeader, WhyThisReading, EmptyState, LoadingCards } from "@/components/shared";
import { useProfile } from "@/components/seeded-profile";
import { useT } from "@/lib/lang";
import { PERSONAL_MONTH_WATCHOUTS, LIFE_AREA_PROMPT } from "@/lib/meanings";
import { monthHeadline, monthDeep } from "@/lib/deep-essays";
import { upcomingMonths, monthName, type MonthCycle } from "@/lib/numerology";

const LIFE_AREAS = ["Career", "Relationships", "Money Mindset", "Wellbeing", "Creativity"] as const;
type LifeArea = (typeof LIFE_AREAS)[number];

function suggestedFocus(pm: number, area: LifeArea, hi = false): string {
  const base: Record<number, { en: string; hi: string }> = {
    1: { en: "make the one small, self-led move yourself", hi: "ek chhota self-led move khud karo" },
    2: { en: "have the one honest conversation", hi: "ek imaandaar baat-cheet kar lo" },
    3: { en: "put one piece of your work in front of people", hi: "apne kaam ka ek tukda sabke saamne rakho" },
    4: { en: "tighten one routine that keeps slipping", hi: "ek routine pakki karo jo phisal rahi hai" },
    5: { en: "change one scene — the trip, the room, the market", hi: "ek badlav do — safar, kamra, ya bazaar" },
    6: { en: "do one act of care — for them or for you", hi: "ek dekhbhaal ka kaam karo — unke liye ya apne liye" },
    7: { en: "give one quiet hour to study", hi: "padhai ko ek khamosh ghanta do" },
    8: { en: "make one calm money or career review", hi: "paisa ya career ki ek thandi jaanch karo" },
    9: { en: "close one open loop, gracefully", hi: "ek adhura kaam sundairta se band karo" },
  };
  const b = base[pm] ?? { en: "take one small reflective step", hi: "ek chhota soch-baar kadam uthao" };
  const core = hi ? b.hi : b.en;
  return hi ? `${core} — ${areaHiName(area)} ki nazar se.` : `${core} — through the lens of ${area.toLowerCase()}.`;
}

const AREA_HI: Record<LifeArea, string> = {
  Career: "career",
  Relationships: "rishtey",
  "Money Mindset": "paisa-ka-soch",
  Wellbeing: "sehat-sukoon",
  Creativity: "srijan",
};
function areaHiName(a: LifeArea): string {
  return AREA_HI[a];
}

const HI_WATCHOUTS: Record<number, string> = {
  1: "tezyee dhairya-waalon ko jalaa deti hai — alliance pehle, jaldi baad mein",
  2: "doosron ke mood apne andar uthaye bina jaane — apna dhyan bhi rakho",
  3: "das chamakte mein baithak asal wale ko bhookha chhod dete hain",
  4: "jahan plan ko mornaa zaroori hai, wahan zidd na karo",
  5: "jaldi ka bada daav — pehle sauda likho, phir kadam lo",
  6: "jo zimmedari aapki nahi, wo uthaate-uthaate khud peechhe reh jaoge",
  7: "jab ek imaandaar baat kaafi ho, to pichhe hat jaana mat",
  8: "shortcut — Shani ka bill isi saal mein aata hai",
  9: "jo saaf khatam hai, use thaam ke rakhna — haath bhaari karta hai",
};

function areaPrompt(pm: number, area: LifeArea, hi = false): string {
  void pm;
  if (!hi) return LIFE_AREA_PROMPT[area];
  const hiPrompts: Record<LifeArea, string> = {
    Career: "is mahine career mein konsa ek kadam pakka ho sakta hai — aur usse aaj kya rok raha hai?",
    Relationships: "kis ek rishtey ko is mahine aapka paani chahiye — aur kya aapko uski zaroorat hai?",
    "Money Mindset": "is mahine paisa kahan chhup-chaap baha raha hai — aur konsa ek band karna keemti hoga?",
    Wellbeing: "is mahine sehat-sukoon ke liye konsa ek chhota rooj pakka hoga — aur use konsi cheez torh degi?",
    Creativity: "is mahine andar jo banaya, use saamne kyun nahi dikhaya — kis ka darr hai?",
  };
  return hiPrompts[area];
}

export default function ForecastPage() {
  const { profile, today } = useProfile();
  const { lang } = useT();
  const hi = lang === "hi";
  const [ready, setReady] = React.useState(false);
  const [area, setArea] = React.useState<LifeArea>("Career");
  React.useEffect(() => setReady(true), []);

  if (!ready) return <LoadingCards count={3} label="Loading your forecast" />;

  if (!profile) {
    return (
      <EmptyState
        title="No profile yet"
        body="Add your birth details to see your six-month reflection themes."
        action={<a href="/" className="text-sm text-primary underline">Start onboarding</a>}
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
    6,
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title={hi ? "Agale chhe mahine ka Panch-Aangrahi vachan" : "Six-Month Forecast"}
        subtitle={
          hi
            ? `${monthName(today.getMonth() + 1)} ${today.getFullYear()} – ${months[5] ? `${monthName(months[5].month)} ${months[5].year}` : ""} tak — har mahine ka poora vishleshan: kya chalega, kya atkega, kaise kaam karo, aur kis se bacho. ye bhaav batata hai, koi fix ghatna ka ailaan nahi.`
            : `Full reading for ${monthName(today.getMonth() + 1)} ${today.getFullYear()} – ${
                months[5] ? `${monthName(months[5].month)} ${months[5].year}` : ""
              } — for each month: what flows, what stalls, how to work it, and what to guard. This reads the weather, it never announces fixed events.`}
      />

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
                    {hi ? `vyaktigat mahina ${pm}` : `Personal Month ${pm}`}
                  </p>
                </div>
                <span aria-hidden className="number-glyph text-5xl text-primary/85">{pm}</span>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-3 text-sm">
                {/* v3.5 DEPTH (owner: '1/2 sentence se kya engage hoga, pura
                    details do') — headline + 4-beat paragraph replace the
                    'Theme:/Opportunities:' one-liners. */}
                <p className="font-display text-base font-semibold">
                  {monthHeadline(pm, lang)}
                </p>
                <p className="leading-relaxed text-foreground/90">{monthDeep(pm, lang)}</p>
                <p>
                  <span className="font-medium">{hi ? "is kshetra mein is mahine: " : "In this area this month: "}</span>
                  {suggestedFocus(pm, area, hi)}
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium">{hi ? "saweedhaan: " : "Watch-out: "}</span>{" "}
                  {hi
                    ? HI_WATCHOUTS[pm] ?? ("apni seema se tez chalna — kadam dheema, disha samaan rakho.")
                    : (PERSONAL_MONTH_WATCHOUTS[pm] ?? "watch-out: moving faster than your values — slow the step, keep the direction")}.
                </p>
                <p className="rounded-lg bg-secondary/50 p-2.5 text-xs">
                  <span className="font-semibold uppercase tracking-wide text-muted-foreground">
                    {hi ? "Soch-ne ka saval" : "Journal prompt"}
                  </span>
                  <br />
                  {areaPrompt(pm, area, hi)}
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