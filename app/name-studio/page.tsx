"use client";

/**
 * Anko Ki Maya v2 — Name Studio: Chaldean vibration score for personal and
 * brand/company names + 3 suggested spellings.
 */

import * as React from "react";
import { Wand2, Building2, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input, Label } from "@/components/ui";
import { PageHeader } from "@/components/shared";
import { useProfile } from "@/components/seeded-profile";
import { useT } from "@/lib/lang";
import { t as rawT } from "@/lib/content";
import { optimizeName, scoreName } from "@/lib/name-studio";
import { reduceFully } from "@/lib/numerology";
import { ReasoningBlock } from "@/components/loshu-kit";

export default function NameStudioPage() {
  const { profile, hasProfile } = useProfile();
  const { lang } = useT();
  const t = (key: string) => rawT(lang, key);

  const [mode, setMode] = React.useState<"personal" | "brand">("personal");
  const [name, setName] = React.useState("");
  const [result, setResult] = React.useState<ReturnType<typeof optimizeName> | null>(null);

  React.useEffect(() => {
    if (hasProfile && profile && mode === "personal" && !name) {
      setName(profile.preferredName || profile.birthName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasProfile, profile, mode]);

  function analyze(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    let ctx: Parameters<typeof scoreName>[1] = null;
    if (mode === "personal" && profile) {
      const y = Number(profile.birthDate.slice(0, 4));
      const m = Number(profile.birthDate.slice(5, 7));
      const d = Number(profile.birthDate.slice(8, 10));
      const lpRaw = reduceFully((m) + (d) + (y));
      ctx = {
        lifePath: lpRaw,
        birthNumber: d > 9 ? reduceFully(d) : d,
        system: "chaldean",
      };
    }
    setResult(optimizeName(name.trim(), ctx));
  }

  const scoreColor = (s: number): string =>
    s >= 70 ? "text-emerald-500" : s >= 45 ? "text-gold" : "text-destructive";

  return (
    <div className="space-y-8">
      <PageHeader
        title={t("navNameStudio")}
        subtitle={
          lang === "hi"
            ? "कैल्डियन कंपाउंड-अंक परंपरा में नाम का स्कोर — और 3 सुझाए गए वर्तनी-विकल्प। ब्रांड/कंपनी नाम भी जाँचें।"
            : "Chaldean compound-number scoring for your name — plus 3 suggested spellings. Brand/company names welcome."
        }
      />

      <Card>
        <CardContent className="pt-5">
          <form onSubmit={analyze} className="space-y-4">
            <fieldset>
              <legend className="mb-2 text-sm font-medium">{lang === "hi" ? "नाम का प्रकार" : "Name type"}</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3.5 has-[:checked]:border-gold/50 ${mode === "personal" ? "bg-secondary/40" : ""}`}>
                  <input type="radio" name="mode" checked={mode === "personal"} onChange={() => setMode("personal")} className="mt-1 accent-[var(--gold)]" />
                  <span>
                    <span className="flex items-center gap-1.5 text-sm font-medium"><User aria-hidden className="size-4 text-gold" /> {lang === "hi" ? "व्यक्तिगत नाम" : "Personal name"}</span>
                    <span className="block text-xs text-muted-foreground">{lang === "hi" ? "आपके मूलांक/जन्म-अंक से ताल-मेल जाँचा जाता है।" : "Scored against your Life Path and birth number."}</span>
                  </span>
                </label>
                <label className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3.5 has-[:checked]:border-gold/50 ${mode === "brand" ? "bg-secondary/40" : ""}`}>
                  <input type="radio" name="mode" checked={mode === "brand"} onChange={() => setMode("brand")} className="mt-1 accent-[var(--gold)]" />
                  <span>
                    <span className="flex items-center gap-1.5 text-sm font-medium"><Building2 aria-hidden className="size-4 text-gold" /> {lang === "hi" ? "ब्रांड/कंपनी" : "Brand / company"}</span>
                    <span className="block text-xs text-muted-foreground">{lang === "hi" ? "केवल कंपाउंड-शुभता पर स्कोर।" : "Scored on the compound omen alone."}</span>
                  </span>
                </label>
              </div>
            </fieldset>
            <div>
              <Label htmlFor="studio-name">{lang === "hi" ? "नाम" : "Name"}</Label>
              <Input
                id="studio-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={mode === "personal" ? "Aarav Mehta" : "Maya Labs"}
                className="mt-1.5"
                required
              />
            </div>
            <Button type="submit">
              <Wand2 aria-hidden /> {lang === "hi" ? "स्कोर करें" : "Score the name"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result ? <ScoreView result={result} lang={lang} scoreColor={scoreColor} /> : null}
    </div>
  );
}

function ScoreView({
  result,
  lang,
  scoreColor,
}: {
  result: ReturnType<typeof optimizeName>;
  lang: "en" | "hi";
  scoreColor: (n: number) => string;
}) {
  const c = result.current;
  return (
    <div className="space-y-6">
      <Card className="glass constellation-bg">
        <CardHeader>
          <CardTitle className="flex flex-wrap items-center justify-between gap-2">
            <span>{result ? "" : ""}{c.omen.title}</span>
            <span className={`font-display text-3xl ${scoreColor(c.score)}`}>{c.score}<span className="text-sm text-muted-foreground">/100</span></span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="font-devanagari font-serif-display text-2xl">{name_display(result)}</p>
          <div className="flex flex-wrap gap-2 text-xs">
            <Badge variant="secondary">Chaldean total {c.total}</Badge>
            <Badge variant="gold">compound {c.compound}</Badge>
            <Badge variant="outline">digit {c.digit}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{c.omen.meaning}</p>
        </CardContent>
      </Card>

      <ReasoningBlock title={lang === "hi" ? "स्कोर-गणित" : "Score math"} steps={c.reasons} lang={lang} />

      <section aria-labelledby="sug-h">
        <h2 id="sug-h" className="font-display text-lg font-semibold">
          {lang === "hi" ? "सुझाए गए वर्तनी" : "Suggested spellings"}
        </h2>
        {result.suggestions.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">
            {lang === "hi" ? "इस नाम के लिए कोई छोटा वर्तनी-सुधार उपलब्ध नहीं — स्कोर जैसा है वैसा ही रखें।" : "No small spelling shifts available for this name — keep the score as is."}
          </p>
        ) : (
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {result.suggestions.map((s) => (
              <Card key={s.spelling} interactive>
                <CardHeader>
                  <CardTitle className="font-serif-display text-xl">{s.spelling}</CardTitle>
                  <p className={`font-display text-2xl ${scoreColor(s.score)}`}>{s.score}<span className="text-xs text-muted-foreground">/100</span></p>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    {lang === "hi" ? `कुल ${s.total} · "${s.omenTitle}"` : `total ${s.total} · "${s.omenTitle}"`}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        <p className="mt-3 font-serif-display text-xs italic text-muted-foreground">
          {lang === "hi"
            ? "नाम-सुधार परंपरा में संतुलन-कला है — उच्च स्कोर पारंपरिक सामंजस्य दर्शाता है, परिणाम की गारंटी नहीं।"
            : "Name-tuning is a traditional balance art — a higher score reflects traditional harmony, never a guaranteed outcome."}
        </p>
      </section>
    </div>
  );
}

function name_display(result: ReturnType<typeof optimizeName>): string {
  // The scored name itself (uppercase input normalized for display).
  const first = (result.current.reasons[0] ?? "").match(/"([^"]+)"/);
  return first ? first[1] : "";
}