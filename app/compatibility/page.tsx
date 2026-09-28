"use client";

/**
 * Compatibility — consent-first, privacy-first theme view for two profiles.
 * No data leaves the browser; both people's details are entered voluntarily.
 */

import * as React from "react";
import Link from "next/link";
import { Users, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Label, Checkbox, Badge } from "@/components/ui";
import { DisclaimerLine, StarMotif } from "@/components/shared";
import { meaningFor } from "@/lib/meanings";
import {
  lifePath, nameNumbers, compatibility, type CompatibilityResult,
} from "@/lib/numerology";

interface SideInput {
  name: string;
  date: string;
  consent: boolean;
}

const EMPTY_SIDE: SideInput = { name: "", date: "", consent: false };

export default function CompatibilityPage() {
  const [a, setA] = React.useState<SideInput>(EMPTY_SIDE);
  const [b, setB] = React.useState<SideInput>(EMPTY_SIDE);
  const [result, setResult] = React.useState<CompatibilityResult | null>(null);
  const [names, setNames] = React.useState<{ a: string; b: string }>({ a: "", b: "" });
  const [error, setError] = React.useState<string | null>(null);

  function run(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!a.name.trim() || !b.name.trim() || !a.date || !b.date) {
      setError("Both names and dates are needed.");
      return;
    }
    if (!a.consent || !b.consent) {
      setError("Both people (or the person whose data is entered) must consent — privacy first.");
      return;
    }
    const pa = a.date.split("-").map(Number);
    const pb = b.date.split("-").map(Number);
    const la = lifePath(pa[0], pa[1], pa[2]);
    const lb = lifePath(pb[0], pb[1], pb[2]);
    const na = nameNumbers(a.name);
    const nb = nameNumbers(b.name);
    setNames({ a: a.name.trim(), b: b.name.trim() });
    setResult(
      compatibility(
        { lifePath: la.number, expression: na.expression, soulUrge: na.soulUrge },
        { lifePath: lb.number, expression: nb.expression, soulUrge: nb.soulUrge },
      ),
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="text-center">
        <StarMotif className="mx-auto size-10 text-gold" />
        <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight">Compatibility themes</h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          A gentle lens on how two people&apos;s numbers combine. Entered with both people&apos;s
          consent; nothing is stored — when you leave this page, it&apos;s gone.
        </p>
      </div>

      <Card>
        <CardContent className="pt-5">
          <form onSubmit={run} className="space-y-4" aria-label="Compatibility form">
            <div className="grid gap-4 sm:grid-cols-2">
              {([
                { key: "a", label: "Person A", side: a, set: setA },
                { key: "b", label: "Person B", side: b, set: setB },
              ] as const).map(({ key, label, side, set }) => (
                <fieldset key={key} className="rounded-lg border p-4">
                  <legend className="px-1 text-sm font-medium">{label}</legend>
                  <div className="space-y-2">
                    <div>
                      <Label htmlFor={`${key}-name`}>Birth name</Label>
                      <Input
                        id={`${key}-name`}
                        value={side.name}
                        onChange={(e) => set({ ...side, name: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`${key}-date`}>Date of birth</Label>
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
                      {key === "a" ? "I consent to entering my details (or I am this person)." : "This person has consented to their details being entered."}
                    </label>
                  </div>
                </fieldset>
              ))}
            </div>
            {error ? <p role="alert" className="text-xs text-destructive">{error}</p> : null}
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Not stored, not sent anywhere.</p>
              <Button type="submit">See compatibility themes</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {result ? (
        <div className="space-y-4" aria-live="polite">
          {[
            { title: "Life Path connection", pair: result.lifePathPair },
            { title: "Expression connection", pair: result.expressionPair },
            { title: "Soul Urge connection", pair: result.soulUrgePair },
          ].map(({ title, pair }) => {
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
                  <p className="text-xs text-muted-foreground">
                    A theme the two of you may notice together — an invitation to reflect, never a verdict on the relationship.
                  </p>
                  <details className="rounded-lg border bg-muted/40 px-3 py-2">
                    <summary className="cursor-pointer text-xs font-medium text-primary">Why this reading?</summary>
                    <ol className="mt-2 list-decimal pl-4 text-xs text-muted-foreground">
                      {pair.steps.map((s, i) => <li key={i}>{s}</li>)}
                    </ol>
                  </details>
                </CardContent>
              </Card>
            );
          })}
          <Card className="bg-secondary/40">
            <CardContent className="flex items-start gap-2 py-4 text-xs text-muted-foreground">
              <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                Compatibility numbers describe conversational themes. Real relationships are built
                by the people in them — use this as a prompt for kind conversations, not as a score.
              </span>
            </CardContent>
          </Card>
        </div>
      ) : null}

      <div className="text-center">
        <Link href="/overview" className="text-sm text-primary underline underline-offset-4">
          ← Back to Overview
        </Link>
      </div>
      <DisclaimerLine compact />
      <Badge variant="outline" className="sr-only">privacy-first compatibility view</Badge>
      <span aria-hidden><Users className="hidden" /></span>
    </div>
  );
}