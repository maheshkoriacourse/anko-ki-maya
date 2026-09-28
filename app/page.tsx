"use client";

/**
 * Onboarding — birth details + numerology-system picker + consent gate.
 * Consent checkbox + disclaimer are REQUIRED before results (spec).
 */

import * as React from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Star } from "lucide-react";
import { Button, Input, Label, Badge, Checkbox, Card, CardContent } from "@/components/ui";
import { DisclaimerLine } from "@/components/shared";
import { ConciergeSection } from "@/components/concierge";
import { useProfile } from "@/components/seeded-profile";
import { isValidBirthDate, sanitizeName } from "@/lib/numerology";
import { DISCLAIMER } from "@/lib/meanings";

interface FormState {
  birthName: string;
  preferredName: string;
  date: string;
  time: string;
  birthplace: string;
  system: "pythagorean" | "chaldean";
  consent: boolean;
}

const EMPTY: FormState = {
  birthName: "",
  preferredName: "",
  date: "",
  time: "",
  birthplace: "",
  system: "pythagorean",
  consent: false,
};

export default function OnboardingPage() {
  const { hasProfile, save } = useProfile();
  const router = useRouter();
  const [form, setForm] = React.useState<FormState>(EMPTY);
  const [errors, setErrors] = React.useState<Partial<Record<keyof FormState, string>>>({});
  const [touchedSubmit, setTouchedSubmit] = React.useState(false);

  React.useEffect(() => {
    // Prefill from the seeded demo profile so the user can explore instantly.
    if (hasProfile) {
      const stored = window.localStorage.getItem("akm.v1.profile");
      if (stored) {
        try {
          const p = JSON.parse(stored) as {
            birthName: string;
            preferredName: string;
            birthDate: string;
            system: string;
          };
          setForm((f) => ({
            ...f,
            birthName: p.birthName || f.birthName,
            preferredName: p.preferredName || f.preferredName,
            date: p.birthDate || f.date,
            system: (p.system as FormState["system"]) || f.system,
          }));
        } catch {
          /* ignore malformed storage */
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function validate(f: FormState): Partial<Record<keyof FormState, string>> {
    const errs: Partial<Record<keyof FormState, string>> = {};
    if (!sanitizeName(f.birthName) || sanitizeName(f.birthName).length < 2) {
      errs.birthName = "Please enter your full birth name (as on your birth certificate).";
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(f.date) || !isValidBirthDate(
      Number(f.date.slice(0, 4)),
      Number(f.date.slice(5, 7)),
      Number(f.date.slice(8, 10)),
    )) {
      errs.date = "Enter a valid date of birth (YYYY-MM-DD).";
    }
    if (f.time && !/^\d{2}:\d{2}$/.test(f.time)) {
      errs.time = "Use HH:MM (24-hour), or leave blank.";
    }
    return errs;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouchedSubmit(true);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0 || !form.consent) return;
    save({
      birthName: sanitizeName(form.birthName),
      preferredName: sanitizeName(form.preferredName),
      birthDate: form.date,
      birthTime: form.time,
      birthplace: form.birthplace.trim(),
      system: form.system,
    });
    router.push("/overview");
  }

  return (
    <div className="mx-auto max-w-2xl">
      <ConciergeSection />
      <div className="my-10 text-center">
        <span aria-hidden className="gold-rule mx-auto block w-40" />
        <p className="mt-4 font-serif-display text-lg italic text-gold">
          …or begin your own reading below — free, private, in this browser only.
        </p>
      </div>
      <div className="mb-8 text-center">
        <span aria-hidden className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground">
          <Sparkles className="size-7" />
        </span>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Welcome to Anko Ki Maya</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A calm space to reflect on the numbers in your birth date and name —
          as themes and possibilities, never predictions.
        </p>
      </div>

      <Card>
        <CardContent className="pt-5">
          <form onSubmit={onSubmit} noValidate className="space-y-5">
            <div>
              <Label htmlFor="birthName">Birth name *</Label>
              <Input
                id="birthName"
                name="birthName"
                autoComplete="name"
                placeholder="e.g. Aarav Mehta"
                value={form.birthName}
                aria-invalid={!!errors.birthName}
                aria-describedby={errors.birthName ? "birthName-err" : undefined}
                onChange={(e) => setForm({ ...form, birthName: e.target.value })}
                className="mt-1.5"
              />
              {errors.birthName ? (
                <p id="native-err" role="alert" className="mt-1 text-xs text-destructive">{errors.birthName}</p>
              ) : (
                <p className="mt-1 text-xs text-muted-foreground">
                  As written on your birth certificate — it shapes Expression and Soul Urge numbers.
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="preferredName">Preferred name</Label>
                <Input
                  id="preferredName"
                  placeholder="e.g. Aarav"
                  value={form.preferredName}
                  onChange={(e) => setForm({ ...form, preferredName: e.target.value })}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="dob">Date of birth *</Label>
                <Input
                  id="dob"
                  type="date"
                  required
                  value={form.date}
                  aria-invalid={!!errors.date}
                  aria-describedby={errors.date ? "dob-err" : undefined}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="mt-1.5"
                />
                {errors.date ? (
                  <p id="dob-err" role="alert" className="mt-1 text-xs text-destructive">{errors.date}</p>
                ) : null}
              </div>
            </div>

            <fieldset className="rounded-lg border p-4">
              <legend className="px-1 text-xs font-medium text-muted-foreground">
                Optional — used only for future features
              </legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="birthTime">
                    Birth time <Badge variant="secondary" className="ml-1 align-middle">optional</Badge>
                  </Label>
                  <Input
                    id="birthTime"
                    type="time"
                    value={form.time}
                    aria-invalid={!!errors.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="mt-1.5"
                  />
                  {errors.time ? <p role="alert" className="mt-1 text-xs text-destructive">{errors.time}</p> : null}
                </div>
                <div>
                  <Label htmlFor="birthplace">
                    Birthplace <Badge variant="secondary" className="ml-1 align-middle">optional</Badge>
                  </Label>
                  <Input
                    id="birthplace"
                    placeholder="e.g. Mumbai, India"
                    value={form.birthplace}
                    onChange={(e) => setForm({ ...form, birthplace: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-2 text-sm font-medium">Numerology system</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-3.5 has-[:checked]:border-primary has-[:checked]:bg-secondary/50">
                  <input
                    type="radio"
                    name="system"
                    value="pythagorean"
                    checked={form.system === "pythagorean"}
                    onChange={() => setForm({ ...form, system: "pythagorean" })}
                    className="mt-1 accent-[var(--primary)]"
                  />
                  <span>
                    <span className="block text-sm font-medium">Pythagorean</span>
                    <span className="block text-xs text-muted-foreground">A–I = 1–9, repeating. The modern standard.</span>
                  </span>
                </label>
                <label className="flex cursor-not-allowed items-start gap-3 rounded-lg border p-3.5 opacity-60">
                  <input type="radio" name="system" disabled className="mt-1" />
                  <span>
                    <span className="block text-sm font-medium">
                      Chaldean <Badge variant="gold" className="ml-1 align-middle">coming soon</Badge>
                    </span>
                    <span className="block text-xs text-muted-foreground">Ancient letter map — engine ready, UI in progress.</span>
                  </span>
                </label>
              </div>
            </fieldset>

            <div className="rounded-lg border bg-secondary/40 p-4">
              <label className="flex items-start gap-3">
                <Checkbox
                  checked={form.consent}
                  onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                  aria-describedby="consent-disclaimer"
                  className="mt-0.5"
                />
                <span className="text-sm">
                  I understand this app is for reflection, not prediction.
                  <span id="consent-disclaimer" className="mt-1 block text-xs text-muted-foreground">
                    {DISCLAIMER}
                  </span>
                </span>
            </label>
            </div>

            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">
                <Star aria-hidden className="mr-1 inline size-3 text-gold" />
                Your data stays in this browser (localStorage) — export or delete anytime in Settings.
              </p>
              <Button type="submit" disabled={!form.consent}>
                Reveal my numbers
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Just exploring? The demo profile (Aarav Mehta, 15 June 1990) is already loaded —{" "}
        <a href="/overview" className="text-primary underline underline-offset-4">go to Overview</a>.
      </p>
      <div className="mt-4 text-center">
        <DisclaimerLine compact />
      </div>
    </div>
  );
}