"use client";

/**
 * v6.3 DAILY 3-CARD COSMIC DASHBOARD — luxury card UI.
 * Palette: AKASHIC family — dark #0B1026 sanctum / v6.2 ivory light, gold
 * hairlines + accents (text-gold / --gold), Cinzel-style display type via
 * the existing .font-dossier utility (hi-mode auto-swaps to Devanagari).
 * Layout: 3 cards side-by-side on desktop (lg:grid-cols-3), stacked on
 * mobile. Subtle gold hover-glow per card. Voice: interpretive sanket
 * framing only. Decoration restraint: one glyph glyph per card, no emoji
 * overload — a roman numeral marker + score mandala per card.
 */

import * as React from "react";
import { History, Sun, Telescope } from "lucide-react";
import { Card, CardContent, Badge } from "@/components/ui";
import { PageHeader, EmptyState, LoadingCards, DisclaimerLine } from "@/components/shared";
import { computeDashboard3, type Dashboard3Result, type DashCard } from "@/lib/dashboard3";
import { devNum } from "@/lib/navgrah";
import { useProfile } from "@/components/seeded-profile";
import { useT } from "@/lib/lang";

const CARD_META: Record<
  DashCard["id"],
  { icon: React.ReactNode; glyph: string; labelEn: string; labelHi: string }
> = {
  yesterday: {
    icon: <History className="size-4 text-gold" aria-hidden />,
    glyph: "Ⅰ",
    labelEn: "Yesterday — Reflection",
    labelHi: "Bita kal — vichar",
  },
  today: {
    icon: <Sun className="size-4 text-gold" aria-hidden />,
    glyph: "Ⅱ",
    labelEn: "Today — Focus",
    labelHi: "Aaj — focus",
  },
  tomorrow: {
    icon: <Telescope className="size-4 text-gold" aria-hidden />,
    glyph: "Ⅲ",
    labelEn: "Tomorrow — Window",
    labelHi: "Kal — jhaanki",
  },
};

function CosmicCard({
  card,
  hi,
  dateLabel,
}: {
  card: DashCard;
  hi: boolean;
  dateLabel: string;
}) {
  const meta = CARD_META[card.id];
  return (
    <Card
      className="glass group relative overflow-hidden border-[color-mix(in_srgb,var(--gold)_28%,var(--border))] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-[0_0_28px_-6px_color-mix(in_srgb,var(--gold)_38%,transparent)]"
      data-testid={`dash3-card-${card.id}`}
    >
      <CardContent className="pt-5">
        {/* header row: glyph + kicker + date | score mandala */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="font-dossier text-sm leading-none text-gold"
              >
                {meta.glyph}
              </span>
              {meta.icon}
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                {hi ? card.titleHi : card.titleEn}
              </p>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">{dateLabel}</p>
          </div>
          <span
            aria-hidden
            className="mandala-ring grid size-11 shrink-0 place-items-center rounded-full border border-gold/40 bg-gold/10 text-sm font-semibold text-gold transition-colors group-hover:bg-gold/20"
          >
            {card.score}
            <span className="sr-only">
              {hi ? "din ka aank" : "day grade"} {card.score}/10
            </span>
          </span>
        </div>

        {/* band badge */}
        <div className="mt-3">
          <Badge variant="gold" className="normal-case tracking-normal">
            {hi ? card.bandHi : card.bandEn}
          </Badge>
        </div>

        {/* body — interpretive sanket voice */}
        <p className="mt-3 font-dossier text-[15px] font-medium leading-relaxed text-foreground/95">
          {hi ? card.bodyHi : card.bodyEn}
        </p>

        {/* action line — gold hairline separator */}
        <div className="mt-4 border-t border-gold/20 pt-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold/80">
            {hi ? "Upay" : "Micro-action"}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-foreground/90">
            {hi ? card.actionHi : card.actionEn}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function Dashboard3Cards({ result }: { result: Dashboard3Result }) {
  const { lang } = useT();
  const hi = lang === "hi";

  const fmt = (offset: number) => {
    const d = new Date(
      Math.floor(result.yyyymmdd / 10000),
      Math.floor((result.yyyymmdd % 10000) / 100) - 1,
      result.yyyymmdd % 100,
    );
    const x = new Date(d.getFullYear(), d.getMonth(), d.getDate() + offset);
    return hi
      ? `${devNum(x.getDate())}-${devNum(x.getMonth() + 1)}`
      : `${x.getDate()}/${x.getMonth() + 1}`;
  };

  return (
    <div
      className="grid gap-4 md:grid-cols-1 lg:grid-cols-3"
      data-testid="dashboard3-grid"
    >
      {result.cards.map((c, i) => (
        <CosmicCard
          key={c.id}
          card={c}
          hi={hi}
          dateLabel={fmt(i - 1)}
        />
      ))}
    </div>
  );
}

export default function Dashboard3View() {
  const { profile, today } = useProfile();
  const { lang } = useT();
  const hi = lang === "hi";
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => setReady(true), []);

  if (!ready)
    return <LoadingCards count={3} label={hi ? "dashboard load ho raha" : "Loading your dashboard"} />;

  if (!profile) {
    return (
      <EmptyState
        title={hi ? "Pehle janm-vivaran do" : "No profile yet"}
        body={
          hi
            ? "aaj ka dashboard aapke Mulank se banta hai — pehle janm-vivaran do, phir teen card dikh jaayenge."
            : "The daily dashboard reads your Mulank — add your birth details to see the three cards."
        }
        action={
          <a href="/" className="text-sm text-primary underline">
            {hi ? "shuru karein" : "Start onboarding"}
          </a>
        }
      />
    );
  }

  // Mulank = digital root of the birth-day digits (x%9 gives 0 only when root=9)
  const m = Number(profile.birthDate.slice(8, 10)) % 9 || 9;
  const result = computeDashboard3(m, today);

  return (
    <div className="space-y-6">
      <PageHeader
        title={hi ? "Aaj Ka Dashboard — teen card" : "Aaj Ka Dashboard — three cards"}
        subtitle={
          hi
            ? `Ek jhaanki mein bita kal ki seekh, aaj ka sanket + micro-action, aur kal ki jhaanki (Mulank ${result.mulank}). Yeh mausam batata hai — ghatna ka ailaan nahi karta.`
            : `One glance: yesterday's learning, today's sanket + one micro-action, tomorrow's window (Mulank ${result.mulank}). This reads weather — it never announces events.`
        }
      />

      <Dashboard3Cards result={result} />

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">
          {hi
            ? `Aadhaar: Mulank ${result.mulank} · seed ${result.seed} · din ${result.yyyymmdd} — same ank, same card.`
            : `Basis: Mulank ${result.mulank} · seed ${result.seed} · day ${result.yyyymmdd} — same numbers, same cards.`}
        </p>
        <DisclaimerLine compact />
      </div>
    </div>
  );
}

export { computeDashboard3 };
export const NAV_LABEL_KEY = "navDashboard3" as const;