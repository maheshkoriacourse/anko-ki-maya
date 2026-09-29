"use client";

/**
 * v3.6 DIN-MAAUSAM — "Aaj ka din" (owner order 30 Sep):
 * aaj ka din kaisa hai / kaisa rahega, kal ka kya hoga — aur NEGATIVE-EVENT
 * SANKET (warning) bands: 'bhai dhyan rakhna' energy, har warning ke saath
 * uska upay. Basis block har dawa ka hisaab dikhata hai.
 */

import * as React from "react";
import { AlertTriangle, CalendarClock, Sun, MoonStar, ShieldAlert } from "lucide-react";
import { Card, CardContent, Badge } from "@/components/ui";
import { PageHeader, EmptyState, LoadingCards, StarMotif } from "@/components/shared";
import { ReasoningBlock } from "@/components/loshu-kit";
import { useProfile } from "@/components/seeded-profile";
import { useT } from "@/lib/lang";
import { computeDaySignals, type DayWarning } from "@/lib/day-weather";
import { devNum } from "@/lib/navgrah";
import { SanketBanner, coreFromReading } from "@/components/sanket-banner";
import { birthdayNumber as _bn, lifePath as _lp } from "@/lib/numerology";

const WARN_STYLE: Record<DayWarning["level"], { box: string; icon: React.ReactNode; labelEn: string; labelHi: string }> = {
  dhyan: {
    box: "border-amber-500/50 bg-amber-500/10",
    icon: <AlertTriangle className="size-4 text-amber-500" aria-hidden />,
    labelEn: "DHYAN — caution",
    labelHi: "DHYAAN — hoshiyar",
  },
  savdhan: {
    box: "border-kesari/60 bg-kesari/10",
    icon: <ShieldAlert className="size-4 text-kesari" aria-hidden />,
    labelEn: "SAVDHAN — warning",
    labelHi: "SAVDHAAN — bhai dhyan rakhna",
  },
  rok: {
    box: "border-destructive/60 bg-destructive/10",
    icon: <ShieldAlert className="size-4 text-destructive" aria-hidden />,
    labelEn: "ROK — stop and think",
    labelHi: "ROK — ruk ja, soch le",
  },
};

function DayCard({
  titleHi,
  titleEn,
  dateLabel,
  sig,
  lang,
}: {
  titleHi: string;
  titleEn: string;
  dateLabel: string;
  sig: ReturnType<typeof computeDaySignals>;
  lang: "en" | "hi";
}) {
  const hi = lang === "hi";
  return (
    <Card className="glass">
      <CardContent className="pt-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">
              {hi ? titleHi : titleEn}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{dateLabel}</p>
          </div>
          <span aria-hidden className="number-glyph mandala-ring grid size-12 place-items-center rounded-full bg-primary/10 text-xl text-primary">
            {sig.score}
            <span className="sr-only">{hi ? "din ka aank" : "day score"} {sig.score}/9</span>
          </span>
        </div>

        <p className="mt-3 font-display text-lg font-semibold leading-snug">
          {hi ? sig.headlineHi : sig.headlineEn}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-foreground/90">
          {hi ? sig.bodyHi : sig.bodyEn}
        </p>
        <p className="mt-2 text-xs text-gold/90">{hi ? sig.swamiHi : sig.swamiEn}</p>

        {/* SANKET bands — the owner's negative-event alerts */}
        {sig.warnings.length > 0 ? (
          <div className="mt-4 space-y-2">
            {sig.warnings.map((w, i) => {
              const st = WARN_STYLE[w.level];
              return (
                <div key={i} className={`rounded-lg border p-3 ${st.box}`} data-testid={`sanket-${w.level}`}>
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide">
                    {st.icon}
                    {hi ? st.labelHi : st.labelEn}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed">{hi ? w.hi : w.en}</p>
                  <p className="mt-1.5 rounded bg-background/60 p-2 text-xs leading-relaxed">
                    <span className="font-semibold text-gold">{hi ? "upay: " : "upay: "}</span>
                    {hi ? w.upayHi : w.upayEn}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="mt-4 rounded-lg border border-emerald-600/40 bg-emerald-600/10 p-3 text-sm">
            {hi
              ? "koi sanket nahi — saaf din. headline wali taakat aaj poori kaam aayegi."
              : "No warnings — a clean day. Use the headline's strength fully."}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default function DinMausamPage() {
  const { profile, today } = useProfile();
  const { lang } = useT();
  const hi = lang === "hi";
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => setReady(true), []);

  if (!ready) return <LoadingCards count={2} label={hi ? "din-mausam load ho raha" : "Loading your day"} />;

  if (!profile) {
    return (
      <EmptyState
        title={hi ? "Pehle janm-vivaran do" : "No profile yet"}
        body={hi ? "aapka din-mausam janm-ankon se banta hai — pehle poora vachan dikh jaayega." : "Add your birth details to see your daily weather."}
        action={<a href="/" className="text-sm text-primary underline">{hi ? "shuru karein" : "Start onboarding"}</a>}
      />
    );
  }

  const y = Number(profile.birthDate.slice(0, 4));
  const m = Number(profile.birthDate.slice(5, 7));
  const d = Number(profile.birthDate.slice(8, 10));
  const reading = profile ? undefined : undefined;

  const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  const sigToday = computeDaySignals(m, d, y, today, {
    mulank: undefined,
    bhagyank: undefined,
    dayLabel: "today",
    dayLabelHi: "aaj",
  });
  const sigTomorrow = computeDaySignals(m, d, y, tomorrow, {
    mulank: undefined,
    bhagyank: undefined,
    dayLabel: "tomorrow",
    dayLabelHi: "kal",
  });

  const fmtHi = (dt: Date) =>
    `${devNum(dt.getDate())}-${devNum(dt.getMonth() + 1)}-${devNum(dt.getFullYear())}`;
  const fmtEn = (dt: Date) => `${dt.getDate()}-${dt.getMonth() + 1}-${dt.getFullYear()}`;

  return (
    <div className="space-y-6">
      <PageHeader
        title={hi ? "Din-Mausam — aaj aur kal ka vachan" : "Day Weather — today & tomorrow"}
        subtitle={
          hi
            ? "har din ka apna mausam: kaunsi dhaara chalegi, kahan takrar banegi, aur kahan 'dhyan rakhna' hai — har sanket ke saath uska upay. ye mausam batata hai, ghatna ka ailaan nahi karta."
            : "Every day has weather: which current flows, where friction builds, and where to keep guard — every warning carries its own remedy. This reads weather, never announces events."
        }
      />
      {/* v4.0: page-level sanket — app-wide honest warnings (owner order) */}
      <SanketBanner core={coreFromReading(_bn(profile.birthDate ? Number(profile.birthDate.slice(8,10)) : 0).number, _lp(Number(profile.birthDate.slice(0,4)), Number(profile.birthDate.slice(5,7)), Number(profile.birthDate.slice(8,10))).number, undefined, profile.birthDate)} lang={lang} />


      <div className="grid gap-4 lg:grid-cols-2">
        <DayCard
          titleHi="AAJ KA DIN"
          titleEn="TODAY"
          dateLabel={hi ? fmtHi(today) : fmtEn(today)}
          sig={sigToday}
          lang={lang}
        />
        <DayCard
          titleHi="KAL KA DIN"
          titleEn="TOMORROW"
          dateLabel={hi ? fmtHi(tomorrow) : fmtEn(tomorrow)}
          sig={sigTomorrow}
          lang={lang}
        />
      </div>

      <ReasoningBlock
        title={hi ? "Din-mausam ka hisaab" : "Day-weather basis"}
        steps={sigToday.steps}
        lang={lang}
      />

      <p className="text-[11px] text-muted-foreground">
        {hi
          ? "sanket (warnings) samay ke aalaram hain, bhavishyawaani nahi — level dhyan/savdhan/rok sirf saavadhaan ki gehraai batata hai. koi jeevan-ghatna (mrityu, bimari, dhan-haani ka ailaan) yahan se kabhi nahi hota."
          : "Warnings are timing alerts, never prophecies — dhyan/savdhan/rok indicate depth of caution only. No life events (death, illness, money-loss announcements) are ever predicted here."}
      </p>
      <StarMotif className="mx-auto opacity-40" />
    </div>
  );
}