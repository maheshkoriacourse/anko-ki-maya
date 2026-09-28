"use client";

/**
 * ANKO KI MAYA v3 — RAJYOGA PAGE (owner addition).
 * 'Aapke chart mein X Rajyoga hai' — birth/name/combined classification,
 * traditional effects, planet friendship context, THE WHY reasoning.
 */

import * as React from "react";
import { Crown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui";
import { PageHeader, EmptyState, LoadingCards, SanatanDivider, YantraMotif } from "@/components/shared";
import { useProfile } from "@/components/seeded-profile";
import { useT } from "@/lib/lang";
import { t as rawT } from "@/lib/content";
import { detectRajyogas, rajyogaHeadline, rajyogaHeadlineForGrid, strongestSource, type RajyogaSource } from "@/lib/rajyoga";
import { devNum, grahaFor, planetRelation, RELATION_LABEL } from "@/lib/navgrah";
import { ReasoningBlock } from "@/components/loshu-kit";

export default function RajyogaPage() {
  const { profile, reading, hasProfile } = useProfile();
  const { lang } = useT();
  const t = (key: string) => rawT(lang, key);
  const hi = lang === "hi";
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => setReady(true), []);

  if (!ready) return <LoadingCards count={3} label="Loading rajyogas" />;

  if (!hasProfile || !profile || !reading) {
    return (
      <EmptyState
        title={hi ? "पहले जन्म-विवरण दीजिए" : "No profile yet"}
        body={hi ? "जन्म-तिथि और नाम दीजिए — राजयोग जाँच तुरंत होगी।" : "Add birth details and name — the yoga check runs instantly."}
        action={<a href="/" className="text-sm text-primary underline">{hi ? "शुरू करें" : "Start"}</a>}
      />
    );
  }

  const y = Number(profile.birthDate.slice(0, 4));
  const m = Number(profile.birthDate.slice(5, 7));
  const d = Number(profile.birthDate.slice(8, 10));
  const result = detectRajyogas(y, m, d, profile.birthName);

  const mulank = reading.birthday.number;
  const bhagyank = reading.lifePath.number;
  const mulBhagRel = planetRelation(mulank, bhagyank);

  const sourceLabel = (s: RajyogaSource): string => {
    if (s === "combined") return hi ? "संयुक्त (जन्म + नाम) — सबसे प्रबल" : "Combined (birth + name) — strongest";
    if (s === "birth") return hi ? "जन्म-राजयोग (तिथि से)" : "Birth Rajyoga (from DOB)";
    return hi ? "नाम-राजयोग (नामांक से)" : "Name Rajyoga (from Namank)";
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title={t("navRajyoga")}
        subtitle={
          hi
            ? "राजयोग = अंकों की राज-संगतियाँ। जन्म-तिथि के अंक, नाम-अंक और अंक-चक्र मिलकर यह जाँच होती है कि आपके चार्ट में कौन-से शाही योग बैठे हैं।"
            : "Rajyoga = royal alignments of numbers. DOB digits, name digits and the grid together decide which royal yogas sit in your chart."
        }
        actions={<Badge variant="gold"><Crown aria-hidden className="size-3" /> {hi ? `${devNum(result.unique.length)} योग` : `${result.unique.length} yogas`}</Badge>}
      />

      {/* HEADLINE */}
      <Card className="glass yantra-bg">
        <CardContent className="py-6 text-center">
          <YantraMotif className="mx-auto mb-3 size-12 text-gold" />
          <p className="font-display text-2xl font-semibold leading-snug">
            {rajyogaHeadline(result.unique.length, lang)}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{rajyogaHeadlineForGrid(lang)}</p>
          <div className="mx-auto mt-4 max-w-xl rounded-lg border bg-card/60 p-3 text-sm">
            {hi
              ? `मूलांक ${devNum(mulank)} + भाग्यांक ${devNum(bhagyank)} का संबंध: ${RELATION_LABEL[mulBhagRel].hi} — ${mulBhagRel === "friend" ? "दोनों राज-ग्रह एक-दूसरे को बल देते हैं, यही आपका बना-बनाया राजयोग है।" : mulBhagRel === "tense" ? "मूलांक-भाग्यांक में घर्षण है — सफलता मिलती है, पर उसकी क़ीमत मेहनत में चुकानी पड़ती है।" : mulBhagRel === "karmic" ? "राहु-केतु कर्मिक जोड़ी — अधूरा काम पूरा करने का जन्म।" : "सम-भाव — संतुलित चाल।"}`
              : `Mulank ${mulank} + Bhagyank ${bhagyank}: ${RELATION_LABEL[mulBhagRel].en} — ${mulBhagRel === "friend" ? "the two royal planets amplify each other; that IS your built-in yoga." : mulBhagRel === "tense" ? "friction between driver and destiny — success comes, but paid for in work." : mulBhagRel === "karmic" ? "the Rahu-Ketu karmic pair — born to finish unfinished work." : "even-handed — a balanced gait."}`}
          </div>
        </CardContent>
      </Card>

      {/* THE YOGAS */}
      {result.unique.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {result.unique.map(({ yoga, sources }) => {
            const strongest = strongestSource(sources);
            return (
              <Card key={yoga.id} className="glass" interactive>
                <CardHeader>
                  <CardTitle className="flex flex-wrap items-center justify-between gap-2">
                    <span className="flex items-center gap-2">
                      <span aria-hidden className="number-glyph mandala-ring grid size-11 place-items-center rounded-full text-sm text-gold">
                        {yoga.digits.map((dg) => (hi ? devNum(dg) : dg)).join("·")}
                      </span>
                      <span>{hi ? yoga.titleHi : yoga.title}</span>
                    </span>
                    <Badge variant={strongest === "combined" ? "gold" : "secondary"}>
                      {sourceLabel(strongest)}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{hi ? yoga.effectHi : yoga.effectEn}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {hi
                      ? `ग्रह-स्वरूप: ${yoga.digits.map((dg) => grahaFor(dg).grahaHi).join(" + ")}`
                      : `Planets: ${yoga.digits.map((dg) => grahaFor(dg).graha).join(" + ")}`}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="py-8 text-center">
            <p className="font-display text-lg text-gold">
              {hi ? "कोई राजयोग नहीं — और यह पूर्णतः मान्य है" : "No Rajyoga — and that is fully valid"}
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              {hi
                ? "संतुलित अंक-चार्ट बिना शाही योग के भी स्थिरता से राज करता है — स्थिरता ही सबसे दीर्घ राजयोग है।"
                : "A balanced chart rules steadily without royal yogas — steadiness itself is the longest-lasting yoga."}
            </p>
          </CardContent>
        </Card>
      )}

      <SanatanDivider />
      <ReasoningBlock title={t("navRajyoga")} steps={result.steps} lang={lang} />
    </div>
  );
}