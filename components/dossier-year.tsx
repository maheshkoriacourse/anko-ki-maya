"use client";

/**
 * v5.3 DOSSIER — NEXT 12 MONTHS (Netflix-series cards) + NEXT 5 YEARS (trailer)
 * + FUTURE-SELF LETTER (spec chap-12 masterpiece page).
 */

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { next12Months, next5Years } from "@/lib/dossier-year";
import { useProfile } from "@/components/seeded-profile";
import { useLang } from "@/lib/lang";
import { devNum } from "@/lib/navgrah";

const MONTH_NAMES_HI = ["", "janavari", "pharuwari", "marich", "aprail", "mai", "jun", "julai", "agast", "sitambir", "oktobbar", "novambbar", "disambbar"];

export function DossierYearAhead({ onNext }: { onNext?: () => void }) {
  const { profile } = useProfile();
  const { lang } = useLang();
  const hi = lang === "hi";
  if (!profile) return null;
  const d = Number(profile.birthDate.slice(8, 10));
  const m = Number(profile.birthDate.slice(5, 7));
  const y = Number(profile.birthDate.slice(0, 4));
  const months = next12Months({ y, m, d }, new Date().getFullYear(), new Date().getMonth() + 1);

  return (
    <Card className="glass" data-testid="dossier-12m">
      <CardHeader>
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold/90">{hi ? "chapter nau — aane-wala saal" : "Chapter Nine — the next twelve months"}</p>
        <CardTitle className="font-dossier text-2xl">{hi ? "agle barah mahine" : "The next twelve months"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {months.map((mo, i) => (
          <div key={i} data-testid={`month-${mo.month}`} className="rounded-xl border border-border bg-secondary/25 p-3.5">
            <p className="font-display text-lg text-gold">
              {hi ? `${MONTH_NAMES_HI[mo.month]} — ${mo.themeHi}` : `${monthEn(mo.month)} — ${mo.themeEn}`}
            </p>
            <p className="mt-1 text-sm leading-relaxed">{hi ? `${mo.chanceHi}` : mo.chanceEn}</p>
            <p className="mt-1 text-sm leading-relaxed text-secondary-foreground/90">
              <span className="text-xs font-semibold text-saffron">{hi ? "dhyan: " : "watch: "}</span>
              {hi ? mo.stressHi : mo.stressEn}
            </p>
            <p className="mt-1 text-sm italic leading-relaxed text-gold/85">
              {hi ? `aaj se: ${mo.focusHi}` : `today's move: ${mo.focusEn}`}
            </p>
            <p className="mt-1.5 text-xs italic text-muted-foreground">
              {hi ? "jo aaj mamuli lagta hai, kal wahi baat ban ho sakta hai." : "What seems insignificant now may become important later."}
            </p>
          </div>
        ))}
        {onNext ? (
          <div className="flex justify-center pt-2">
            <button onClick={onNext} data-testid="yearahead-next" className="rounded-lg border border-gold/50 bg-gold/10 px-5 py-2.5 text-sm font-semibold text-gold hover:bg-gold/20">
              {hi ? "agli chapter: panch-saal ka trailer →" : "Next: five-year trailer →"}
            </button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function monthEn(m: number): string {
  return ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][m];
}

export function DossierFiveYears({ onNext }: { onNext?: () => void }) {
  const { profile } = useProfile();
  const { lang } = useLang();
  const hi = lang === "hi";
  if (!profile) return null;
  const d = Number(profile.birthDate.slice(8, 10));
  const m = Number(profile.birthDate.slice(5, 7));
  const y = Number(profile.birthDate.slice(0, 4));
  const years = next5Years({ y, m, d }, new Date().getFullYear());

  return (
    <Card className="glass" data-testid="dossier-5y">
      <CardHeader>
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold/90">{hi ? "chapter das — panch-saal ka trailer" : "Chapter Ten — movie trailer"}</p>
        <CardTitle className="font-dossier text-2xl">{hi ? "agle panch saal" : "The next five years"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* road into horizon */}
        <div aria-hidden className="mx-auto flex h-32 max-w-md items-center justify-center rounded-xl border border-gold/25 bg-obsidian/30">
          <svg viewBox="0 0 240 100" className="h-full">
            <path d="M70 100 L108 40 L118 30 L127 40 L180 100 Z" fill="none" stroke="#d4af37" strokeWidth="0.9" opacity="0.8" />
            {[[103, 82], [110, 64], [115, 48]].map(([cx, cy], i) => (
              <rect key={i} x={cx - 2} y={cy} width="4" height="7" fill="#ffb347" opacity="0.85" transform={`rotate(${i % 2 ? 6 : -6} ${cx} ${cy})`} />
            ))}
            <circle cx="118" cy="24" r="8" fill="none" stroke="#ffb347" strokeWidth="1" opacity="0.7" />
            <path d="M118 16 L118 8 M110 20 L104 16 M126 20 L132 16" stroke="#d4af37" strokeWidth="0.6" opacity="0.6" />
          </svg>
        </div>
        {years.map((yr) => (
          <div key={yr.year} data-testid={`year-${yr.year}`} className="rounded-xl border border-gold/30 bg-gold/[0.04] p-3.5">
            <p className="font-display text-xl text-gold">
              {yr.year} — {hi ? yr.titleHi : yr.titleEn}
            </p>
            <p className="mt-1 text-sm leading-relaxed">{hi ? yr.lineHi : yr.lineEn}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {hi ? `personal-year ank: ${devNum(String(yr.py))}` : `personal year number: ${yr.py}`}
            </p>
          </div>
        ))}
        {onNext ? (
          <div className="flex justify-center pt-2">
            <button onClick={onNext} data-testid="fiveyear-next" className="rounded-lg border border-gold/50 bg-gold/10 px-5 py-2.5 text-sm font-semibold text-gold hover:bg-gold/20">
              {hi ? "agli chapter: bhavishya se ek khat →" : "Next: letter from your future self →"}
            </button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

export function DossierFutureLetter() {
  const { profile } = useProfile();
  const { lang } = useLang();
  const hi = lang === "hi";
  const [open, setOpen] = React.useState(false);
  if (!profile) return null;
  const name = profile.preferredName || profile.birthName;

  return (
    <Card className="glass border-gold/40" data-testid="dossier-future-letter">
      <CardHeader>
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold/90">
          {hi ? "chapter agyaara — sabse gehri page" : "Chapter Eleven — the masterpiece page"}
        </p>
        <CardTitle className="font-dossier text-2xl">{hi ? "bhavishya se ek khat" : "A letter from your future self"}</CardTitle>
      </CardHeader>
      <CardContent>
        {!open ? (
          <div className="text-center">
            <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground">
              {hi
                ? "ye khat isi dossier ka sabse bhaari word hai. kholne ke lie ek click, par padhne ke lie — poori raat."
                : "This letter carries the heaviest words of the dossier. It opens with one click — but you will read it all night."}
            </p>
            <button onClick={() => setOpen(true)} data-testid="letter-open" className="mt-4 rounded-lg border border-gold/60 bg-gold/10 px-6 py-2.5 font-display text-sm text-gold hover:bg-gold/20">
              {hi ? "khat kholo" : "OPEN THE LETTER"}
            </button>
          </div>
        ) : (
          <div className="mx-auto max-w-xl font-quote space-y-4 text-[15px] leading-relaxed" data-testid="letter-body">
            <p className="text-center text-xs uppercase tracking-widest text-gold/70">
              {hi ? "panch saal peeche se, aapke naam se" : "From five years ahead, in your name"}
            </p>
            <p>{hi ? `aaj tu jo pareshaan hai — mujhe maaloom hai.` : "I know what is keeping you awake tonight."}</p>
            <p>
              {hi
                ? "aur mujhe yeh bhi maaloom hai — jo aaj dohri dikhegi, wo kal sulajh jaayegi. jis pahad ko tu chadhai batata hai, wo aage se dekhe to seedhi-chaal niklegi."
                : "And I also know what happens next: what binds you today loosens by tomorrow; the wall you call a climb looks like a staircase from here."}
            </p>
            <p>
              {hi
                ? "main un raaton ko yaad hain — jo tu aaj 'asmanjas' naam deta hai. unhi raaton ne mere kandhe banae. jo raat tujhe bhaari lagti hai, wahi mujhe bhaarish de deti hai."
                : "I remember the nights you call 'despair'. Those nights built my shoulders. The night that feels heaviest to you is the one that made me strongest."}
            </p>
            <p>
              {hi
                ? "bas ek maang hai: jo faisla aaj tujhe saanp ki soondi si lag raha hai — usse aaj hi note kar le. kal usi par meri kismat chali thi."
                : "One request only: write down the decision you keep postponing today. Tomorrow, that note becomes the line I live by."}
            </p>
            <p className="text-right font-display text-lg text-gold">— {name}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}