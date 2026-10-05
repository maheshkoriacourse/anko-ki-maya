"use client";

/**
 * Compatibility — v3.3 FUSION VIEW (rule e): guna-milan (36) × number
 * harmony. Consent-first, privacy-first: no data leaves the browser; both
 * people's details are entered voluntarily. UI copy stays number-led —
 * the 36-guna table reads as the 'Ank+Graha Milan' koota sheet.
 */

import * as React from "react";
import Link from "next/link";
import { Users, CheckCircle2, Handshake } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Label, Checkbox, Badge } from "@/components/ui";
import { DisclaimerLine, YantraMotif } from "@/components/shared";
import { useProfile } from "@/components/seeded-profile";
import { useT } from "@/lib/lang";
import { t as rawT } from "@/lib/content";
import { meaningFor } from "@/lib/meanings";
import { relationLine, devNum } from "@/lib/navgrah";
import {
  nameNumbers, compatibility, type CompatibilityResult,
} from "@/lib/numerology";
import { vedicChart, compatibilityFusion, type CompatibilityFusion } from "@/lib/vedic";

interface SideInput {
  name: string;
  date: string;
  consent: boolean;
}

const EMPTY_SIDE: SideInput = { name: "", date: "", consent: false };

/** mm-dd → mulank/bhagyank for both systems from a DOB string. */
function digitsOf(dateStr: string): { mulank: number; bhagyank: number } {
  const [yy, mm, dd] = dateStr.split("-").map(Number);
  const sumDigits = (n: number): number => {
    let s = n;
    while (s > 9) s = String(s).split("").reduce((acc, d) => acc + Number(d), 0);
    return s;
  };
  const mulank = sumDigits(dd);
  const bhagyank = sumDigits(sumDigits(mm) + sumDigits(dd) + sumDigits(yy));
  return { mulank, bhagyank };
}

/** YYYY-MM-DD → reduced life-path unit digit (masters folded). */
function lifePathOf(dateStr: string): number {
  const [yy, mm, dd] = dateStr.split("-").map(Number);
  const sumDigits = (n: number): number => {
    let s = n;
    while (s > 9) s = String(s).split("").reduce((acc, d) => acc + Number(d), 0);
    return s;
  };
  return sumDigits(sumDigits(mm) + sumDigits(dd) + sumDigits(yy));
}

export default function CompatibilityPage() {
  const { profile } = useProfile();
  const { lang } = useT();
  const t = (key: string) => rawT(lang, key);
  const hi = lang === "hi";
  const [a, setA] = React.useState<SideInput>(EMPTY_SIDE);
  const [b, setB] = React.useState<SideInput>(EMPTY_SIDE);
  const [result, setResult] = React.useState<CompatibilityResult | null>(null);
  const [fusion, setFusion] = React.useState<CompatibilityFusion | null>(null);
  const [names, setNames] = React.useState<{ a: string; b: string }>({ a: "", b: "" });
  const [error, setError] = React.useState<string | null>(null);

  // v3.3: prefill person A from the user's own profile (consent implied — it's them).
  React.useEffect(() => {
    if (profile?.birthDate && !a.date) {
      setA((s) => ({
        name: s.name || profile.preferredName || profile.birthName,
        date: profile.birthDate,
        consent: true,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  function run(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!a.name.trim() || !b.name.trim() || !a.date || !b.date) {
      setError(hi ? "donon naam aur janm-tithi chahiye." : "Both names and dates are needed.");
      return;
    }
    if (!a.consent || !b.consent) {
      setError(hi ? "sahmati zaroori hai — privacy pehle." : "Both people (or the person whose data is entered) must consent — privacy first.");
      return;
    }
    const pa = a.date.split("-").map(Number);
    const pb = b.date.split("-").map(Number);
    const la = lifePathOf(a.date);
    const lb = lifePathOf(b.date);
    const na = nameNumbers(a.name);
    const nb = nameNumbers(b.name);
    setNames({ a: a.name.trim(), b: b.name.trim() });
    setResult(
      compatibility(
        { lifePath: la, expression: na.expression, soulUrge: na.soulUrge },
        { lifePath: lb, expression: nb.expression, soulUrge: nb.soulUrge },
      ),
    );
    // v3.3 FUSION — ashtakoota guna milan from BOTH charts × number harmony.
    const da = digitsOf(a.date);
    const db = digitsOf(b.date);
    const chartA = vedicChart({ year: pa[0], month: pa[1], day: pa[2], hour: 12, minute: 0 });
    const chartB = vedicChart({ year: pb[0], month: pb[1], day: pb[2], hour: 12, minute: 0 });
    setFusion(compatibilityFusion(chartA, chartB, da.mulank, db.mulank, da.bhagyank, db.bhagyank));
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="text-center">
        <YantraMotif className="mx-auto size-10 text-gold" />
        <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight">
          {hi ? "Ank+Graha Milan — jodi ka poora hisaab" : "Compatibility — the full match sheet"}
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          {hi
            ? "do table ek saath chalti hain: 36-guna milan aur ank-harmony. dono ki sahmati se bhari gayi; kuch bhi save nahi hota — page chhodo, sab gaya."
            : "Two tables run together: the 36-guna sheet and number harmony. Entered with both people's consent; nothing is stored — when you leave this page, it's gone."}
        </p>
      </div>

      <Card>
        <CardContent className="pt-5">
          <form onSubmit={run} className="space-y-4" aria-label="Compatibility form">
            <div className="grid gap-4 sm:grid-cols-2">
              {([
                { key: "a", label: hi ? "Pehla janm" : "Person A", side: a, set: setA },
                { key: "b", label: hi ? "Doosra janm" : "Person B", side: b, set: setB },
              ] as const).map(({ key, label, side, set }) => (
                <fieldset key={key} className="rounded-lg border p-4">
                  <legend className="px-1 text-sm font-medium">{label}</legend>
                  <div className="space-y-2">
                    <div>
                      <Label htmlFor={`${key}-name`}>{hi ? "janm-naam" : "Birth name"}</Label>
                      <Input
                        id={`${key}-name`}
                        value={side.name}
                        onChange={(e) => set({ ...side, name: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`${key}-date`}>{hi ? "janm-tithi" : "Date of birth"}</Label>
                      <Input
                        id={`${key}-date`}
                        type="date"
                        value={side.date}
                        onChange={(e) => set({ ...side, date: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <label className="flex items-start gap-2 text-xs">
                      <Checkbox
                        checked={side.consent}
                        onChange={(e) => set({ ...side, consent: e.target.checked })}
                        className="mt-0.5"
                      />
                      {hi
                        ? key === "a"
                          ? "main apni jaankari daal raha hoon (ya main hi ye insaan hoon)."
                          : "is insaan ki sahmati hai uski jaankari daalne ki."
                        : key === "a"
                          ? "I consent to entering my details (or I am this person)."
                          : "This person has consented to their details being entered."}
                    </label>
                  </div>
                </fieldset>
              ))}
            </div>
            {error ? <p role="alert" className="text-xs text-destructive">{error}</p> : null}
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {hi ? "save nahi hota, kahin bheja nahi jaata." : "Not stored, not sent anywhere."}
              </p>
              <Button type="submit">
                <Handshake aria-hidden className="size-4" />
                {hi ? "milan-baithak dikhao" : "Run the match sheet"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {fusion ? (
        <Card className="glass yantra-bg" data-testid="guna-milan">
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-display text-lg">
                {hi ? "guna-milan — 36-gunon ki koota-table" : "Guna milan — the 36-point koota table"}
              </span>
              <Badge variant="gold">{hi ? `sanyukt score ${devNum(fusion.combinedScore)}/100` : `combined score ${fusion.combinedScore}/100`}</Badge>
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              {hi
                ? `${names.a} (${devNum(digitsOf(a.date).mulank)}) + ${names.b} (${devNum(digitsOf(b.date).mulank)}) — nakshatra/rashi table × ank-harmony (guna 70% + ank 30%).`
                : `${names.a} (${digitsOf(a.date).mulank}) + ${names.b} (${digitsOf(b.date).mulank}) — nakshatra/rashi tables × number harmony (guna 70% + numbers 30%).`}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Combined score meter */}
            <div className="intensity" aria-hidden>
              <span style={{ width: `${Math.min(100, Math.max(0, fusion.combinedScore))}%` }} />
            </div>
            <p className="text-sm font-medium">
              {hi ? fusion.bandHi : fusion.bandEn}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {hi ? fusion.adviceHi : fusion.adviceEn}
            </p>

            {/* The 8-koota table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-sm" aria-label={hi ? "koota breakdown" : "Koota breakdown"}>
                <thead>
                  <tr className="border-b text-left text-xs text-muted-foreground">
                    <th className="py-2 pr-3">{hi ? "mez" : "Koota"}</th>
                    <th className="py-2 pr-3">{hi ? "score" : "Score"}</th>
                    <th className="py-2">{hi ? "aadhaar" : "Basis"}</th>
                  </tr>
                </thead>
                <tbody>
                  {fusion.guna.kootas.map((k) => (
                    <tr key={k.koota} className="border-b last:border-0">
                      <td className="py-2 pr-3 font-medium">{k.koota}</td>
                      <td className="py-2 pr-3 whitespace-nowrap">
                        <span className={k.scored >= k.max / 2 ? "text-gold font-semibold" : "text-destructive font-semibold"}>
                          {hi ? `${devNum(k.scored)}/${devNum(k.max)}` : `${k.scored}/${k.max}`}
                        </span>
                      </td>
                      <td className="py-2 text-xs text-muted-foreground">{k.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Dosha flags from the koota run */}
            <div className="rounded-lg border bg-secondary/40 p-3 text-xs space-y-1" data-testid="koota-doshas">
              {fusion.guna.doshas.nadi ? (
                <p>
                  <span className="font-semibold">
                    {hi ? "Nadi: " : "Nadi: "}
                  </span>
                  {fusion.guna.doshas.nadi.present
                    ? hi
                      ? fusion.guna.doshas.nadi.cancelled
                        ? "dosh tha, par parampara ke niyam se cancel — 8 guna wapas mil gaye."
                        : "dosh sakriya — breakdown me dekho; milan-baithak mein wajan rakho."
                      : fusion.guna.doshas.nadi.cancelled
                        ? "present but cancelled under the classical rule — its 8 points are restored."
                        : "active — see the breakdown; weigh it at the match table."
                    : null}
                </p>
              ) : null}
              {fusion.guna.doshas.bhakoota ? (
                <p>
                  <span className="font-semibold">
                    {hi ? "Bhakoota: " : "Bhakoota: "}
                  </span>
                  {fusion.guna.doshas.bhakoota.present
                    ? hi
                      ? fusion.guna.doshas.bhakoota.mitigated
                        ? "dosh ka wajan kam — swami-grahon ki mitrata ne rahat di."
                        : "dosh sakriya — score 0 chal raha hai; samay aur saaf zimmedari se bharna hoga."
                      : fusion.guna.doshas.bhakoota.mitigated
                        ? "present but mitigated — the friendly-lords rule gives relief (advisory)."
                        : "active — the koota keeps its 0; time and clear roles fill the gap."
                    : null}
                </p>
              ) : null}
            </div>

            {/* Number-harmony verdicts per pair */}
            <div className="space-y-2 text-sm">
              {([
                { title: hi ? "Bhagyank jodi" : "Life Path pair", pair: result!.lifePathPair },
                { title: hi ? "Naam-ank jodi" : "Expression pair", pair: result!.expressionPair },
                { title: hi ? "Soul Urge jodi" : "Soul Urge pair", pair: result!.soulUrgePair },
              ] as const).map(({ title, pair }) => {
                const m = meaningFor(pair.combined);
                return (
                  <div key={title} className="rounded-lg border px-3 py-2">
                    <p className="text-xs font-medium text-gold">{title}: {pair.numbers[0]} + {pair.numbers[1]} → {pair.combined}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {m.title}. {m.essence}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">{hi ? relationLine(pair.numbers[0], pair.numbers[1], "hi") : relationLine(pair.numbers[0], pair.numbers[1], "en")}</p>
                  </div>
                );
              })}
            </div>

            <details className="rounded-lg border border-gold/25 bg-muted/30 px-3 py-2">
              <summary className="cursor-pointer font-serif-display text-xs italic text-gold">
                {hi ? "Basis — hisaab kaise bana" : "Basis — how the sheet was scored"}
              </summary>
              <ol className="mt-2 list-decimal pl-4 text-xs text-muted-foreground">
                {hi ? (
                  <>
                    <li>dono janm-tithi se nakshatra/rashi nikle (Moon-chart paddhati).</li>
                    <li>ashtakoota ke 8 mez score huye: guna {devNum(fusion.guna.total)}/{devNum(36)}.</li>
                    <li>ank-harmony: Mulank×Mulank aur Bhagyank×Bhagyank ke grah-sambandh se {devNum(fusion.numberScore)}/100.</li>
                    <li>sanyukt = guna 70% + ank 30% = {devNum(fusion.combinedScore)}/100.</li>
                  </>
                ) : (
                  <>
                    <li>Both birth dates resolved to nakshatra/rashi (Moon-chart mode).</li>
                    <li>The 8 ashtakoota tables scored: guna {fusion.guna.total}/36.</li>
                    <li>Number harmony from Mulank×Mulank and Bhagyank×Bhagyank planet relations: {fusion.numberScore}/100.</li>
                    <li>Combined = guna 70% + numbers 30% = {fusion.combinedScore}/100.</li>
                  </>
                )}
              </ol>
              <p className="mt-1.5 font-serif-display text-xs italic text-gold">
                {hi ? "Yeh ank-ganna ka aadhar hai; isse rishta kaisa chalega, yeh pakka nahi hota." : "This shows the calculation; it cannot determine how a relationship will turn out."}
              </p>
            </details>
          </CardContent>
        </Card>
      ) : null}

      {fusion ? null : result ? (
        <div className="space-y-4" aria-live="polite">
          {([
            { title: hi ? "Bhagyank jodi" : "Life Path connection", pair: result!.lifePathPair },
            { title: hi ? "Naam-ank jodi" : "Expression connection", pair: result!.expressionPair },
            { title: hi ? "Soul Urge jodi" : "Soul Urge connection", pair: result!.soulUrgePair },
          ] as const).map(({ title, pair }) => {
            const m = meaningFor(pair.combined);
            return (
              <Card key={title}>
                <CardHeader className="flex-row items-center justify-between">
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {names.a} ({pair.numbers[0]}) + {names.b} ({pair.numbers[1]}) → {pair.combined}
                    </p>
                  </div>
                  <span aria-hidden className="number-glyph text-4xl text-primary">{pair.combined}</span>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><span className="font-medium text-gold">{m.title}.</span> {m.essence}</p>
                  <details className="rounded-lg border bg-muted/40 px-3 py-2">
                    <summary className="cursor-pointer text-xs font-medium text-primary">
                      {hi ? "Basis" : "Basis"}
                    </summary>
                    <ol className="mt-2 list-decimal pl-4 text-xs text-muted-foreground">
                      {pair.steps.map((s, i) => <li key={i}>{s}</li>)}
                    </ol>
                    <p className="mt-1.5 font-serif-display text-xs italic text-gold">
                      {hi ? "Yeh ank-ganna ka aadhar hai; isse rishta kaisa chalega, yeh pakka nahi hota." : "This shows the calculation; it cannot determine how a relationship will turn out."}
                    </p>
                  </details>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : null}

      {fusion ? (
        <Card className="bg-secondary/40">
          <CardContent className="flex items-start gap-2 py-4 text-xs text-muted-foreground">
            <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>
              {hi
                ? "dono table milkar itna bataate hain — jodi ka asli kaam toh log hi banate hain. ise pyaar-bhare conversations ka ishaara banao, score nahi."
                : "The tables describe conversational themes. Real relationships are built by the people in them — use this as a prompt for kind conversations, not as a score."}
            </span>
          </CardContent>
        </Card>
      ) : null}

      <div className="text-center">
        <Link href="/overview" className="text-sm text-primary underline underline-offset-4">
          ← {hi ? "abhi ka haal" : "Back to Overview"}
        </Link>
      </div>
      <DisclaimerLine compact />
      <Badge variant="outline" className="sr-only">privacy-first compatibility view</Badge>
      <span aria-hidden><Users className="hidden" /></span>
    </div>
  );
}
