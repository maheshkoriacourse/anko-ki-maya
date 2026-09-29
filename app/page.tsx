"use client";

/**
 * Onboarding v3 — DIRECT name + DOB entry (owner order: the gate is gone;
 * no tick-box, no wall of legalese — the jyotishi asks, you answer).
 * Ritual feel: 'Apna naam aur janm-tithi do'.
 * 'Apna naam aur janm-tithi do' — the jyotishi asks, you answer.
 * Only the small footer line stays: 'Traditional numerology-based reading'.
 */

import * as React from "react";
import { useRouter } from "next/navigation";
import { DiyaMotif, OmMotif, SanatanDivider } from "@/components/shared";
import { Button, Input, Label, Badge, Card, CardContent } from "@/components/ui";
import { DisclaimerLine } from "@/components/shared";
import { ConciergeSection } from "@/components/concierge";
import { useProfile } from "@/components/seeded-profile";
import { isValidBirthDate, sanitizeName } from "@/lib/numerology";
import { DdmmyyyyDateInput, ddmmyyyyToIso, isoToDdmmyyyy, type DdmmyyyyParts } from "@/components/ddmmyyyy-date";
import { useLang } from "@/lib/lang";
import { devNum } from "@/lib/navgrah";

interface FormState {
  birthName: string;
  preferredName: string;
  date: DdmmyyyyParts; // v3.8: dd/mm/yyyy entry (owner order)
  system: "pythagorean" | "chaldean";
}

const EMPTY: FormState = {
  birthName: "",
  preferredName: "",
  date: { dd: "", mm: "", yyyy: "" },
  system: "pythagorean",
};

export default function OnboardingPage() {
  const { hasProfile, save } = useProfile();
  const router = useRouter();
  const { lang } = useLang();
  const hi = lang === "hi";
  const [form, setForm] = React.useState<FormState>(EMPTY);
  const [errors, setErrors] = React.useState<Partial<Record<keyof FormState, string>>>({});

  React.useEffect(() => {
    // Prefill from the stored profile so returning users skip typing.
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
            date: p.birthDate ? isoToDdmmyyyy(p.birthDate) : f.date,
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
      errs.birthName = hi ? "Janm-naam likhiye (janm-pramaan-patra wala)." : "Please enter your full birth name (as on your birth certificate).";
    }
    const dIso = ddmmyyyyToIso(f.date); // v3.8: entry dd/mm/yyyy → ISO for engine
    if (!dIso || !isValidBirthDate(
      Number(dIso.slice(0, 4)),
      Number(dIso.slice(5, 7)),
      Number(dIso.slice(8, 10)),
    )) {
      errs.date = hi ? "Sahi janm-tithi dijiye (dd/mm/yyyy)." : "Enter a valid date of birth (dd/mm/yyyy).";
    }
    return errs;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    save({
      birthName: sanitizeName(form.birthName),
      preferredName: sanitizeName(form.preferredName),
      birthDate: ddmmyyyyToIso(form.date),
      birthTime: "",
      birthplace: "",
      system: form.system,
    });
    router.push("/overview");
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="my-10 text-center">
        <span aria-hidden className="mandala-ring mx-auto mb-4 grid size-16 place-items-center rounded-full bg-primary text-primary-foreground">
          <OmMotif className="text-2xl" />
        </span>
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          {hi ? "Apna naam aur janm-tithi do" : "Give your name and birth date"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {hi
            ? "Ank Shastra inhi do cheezon se aapka past, present aur future padhta hai. Koi sahamti-deewar nahi — jaankari dijiye, vachan aapke saamne hai."
            : "Ank Shastra reads your past, present and future from these two things. Nothing to accept — give the details, the reading stands in front of you."}
        </p>
      </div>

      <Card className="glass">
        <CardContent className="pt-5">
          <form onSubmit={onSubmit} noValidate className="space-y-5">
            <div>
              <Label htmlFor="birthName">{hi ? "Janm-naam *" : "Birth name *"}</Label>
              <Input
                id="birthName"
                name="birthName"
                autoComplete="name"
                placeholder={hi ? "jaise: Aarav Mehta" : "e.g. Aarav Mehta"}
                value={form.birthName}
                aria-invalid={!!errors.birthName}
                aria-describedby={errors.birthName ? "birthName-err" : undefined}
                onChange={(e) => setForm({ ...form, birthName: e.target.value })}
                className="mt-1.5"
              />
              {errors.birthName ? (
                <p id="birthName-err" role="alert" className="mt-1 text-xs text-destructive">{errors.birthName}</p>
              ) : (
                <p className="mt-1 text-xs text-muted-foreground">
                  {hi ? "Janm-pramaan-patra wala naam — isi se Namank aur Soul Urge banta hai." : "As written on your birth certificate — it shapes Namank and Soul Urge."}
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="preferredName">{hi ? "Bulaya jaane wala naam" : "Preferred name"}</Label>
                <Input
                  id="preferredName"
                  placeholder={hi ? "jaise: Aarav" : "e.g. Aarav"}
                  value={form.preferredName}
                  onChange={(e) => setForm({ ...form, preferredName: e.target.value })}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="dob">{hi ? "Janm-tithi *" : "Date of birth *"}</Label>
                <div className="mt-1.5">
                  <DdmmyyyyDateInput
                    value={form.date}
                    onChange={(next) => setForm({ ...form, date: next })}
                    invalid={!!errors.date}
                    describedby={errors.date ? "dob-err" : undefined}
                    labels={{
                      dd: hi ? "din (1-31)" : "day (1-31)",
                      mm: hi ? "mahina (1-12)" : "month (1-12)",
                      yyyy: hi ? "saal" : "year",
                    }}
                  />
                </div>
                {errors.date ? (
                  <p id="dob-err" role="alert" className="mt-1 text-xs text-destructive">{errors.date}</p>
                ) : null}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">
                {hi
                  ? "Aapka data isi browser mein rehta hai — Settings se export/delete kabhi bhi."
                  : "Your data stays in this browser (localStorage) — export or delete anytime in Settings."}
              </p>
              <Button type="submit" size="lg">
                <DiyaMotif className="size-5" aria-hidden />
                {hi ? "Mera vachan dikhao" : "Reveal my reading"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        {hi
          ? "Sirf dekh rahe ho? Demo profile (Aarav Mehta, 15 June 1990) pehle se bhari hai — "
          : "Just exploring? The demo profile (Aarav Mehta, 15 June 1990) is already loaded — "}
        <a href="/overview" className="text-primary underline underline-offset-4">
          {hi ? "Abhi ka haal dekho" : "go to Abhi Ka Haal"}
        </a>
        {hi ? devNum(0).slice(0, 0) : ""} <Badge variant="gold">{hi ? "Free" : "free"}</Badge>
      </p>
      <div className="mt-4 text-center">
        <DisclaimerLine compact />
      </div>

      {/* v3.4 (owner order): Mahadev blessings + concierge at the BOTTOM of the
          landing — form first, divine art + premium offer as the closing. */}
      <div className="mt-10 text-center">
        <SanatanDivider className="mx-auto max-w-sm" />
        <p className="mt-4 font-display text-lg text-gold">
          {hi ? "Bhole ki kripa bhi dekh lo — ya seedha premium vachan" : "Take Bhole's darshan — or go straight premium"}
        </p>
      </div>
      <ConciergeSection />
    </div>
  );
}