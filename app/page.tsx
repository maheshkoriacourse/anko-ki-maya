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
import { useLang } from "@/lib/lang";
import { devNum } from "@/lib/navgrah";

interface FormState {
  birthName: string;
  preferredName: string;
  date: string;
  system: "pythagorean" | "chaldean";
}

const EMPTY: FormState = {
  birthName: "",
  preferredName: "",
  date: "",
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
      errs.birthName = hi ? "जन्म-नाम लिखिए (जन्म-प्रमाण-पत्र वाला)।" : "Please enter your full birth name (as on your birth certificate).";
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(f.date) || !isValidBirthDate(
      Number(f.date.slice(0, 4)),
      Number(f.date.slice(5, 7)),
      Number(f.date.slice(8, 10)),
    )) {
      errs.date = hi ? "सही जन्म-तिथि दीजिए (YYYY-MM-DD)।" : "Enter a valid date of birth (YYYY-MM-DD).";
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
      birthDate: form.date,
      birthTime: "",
      birthplace: "",
      system: form.system,
    });
    router.push("/overview");
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* v3.1: subdued divine banner on onboarding — blurred, melts downward */}
      <div aria-hidden className="relative mb-8 h-40 overflow-hidden rounded-2xl sm:h-52">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/divine-header.webp"
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full scale-110 object-cover object-center opacity-70 blur-[2px]"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--indigo-deep) 30%, transparent), transparent 42%, var(--background) 100%)",
          }}
        />
      </div>
      <ConciergeSection />
      <div className="my-10 text-center">
        <SanatanDivider className="mx-auto max-w-sm" />
        <p className="mt-4 font-display text-lg text-gold">
          {hi ? "…या नीचे अपना वाचन शुरू कीजिए — मुफ़्त, निजी, इसी ब्राउज़र में।" : "…or begin your own reading below — free, private, in this browser only."}
        </p>
      </div>

      <div className="mb-8 text-center">
        <span aria-hidden className="mandala-ring mx-auto mb-4 grid size-16 place-items-center rounded-full bg-primary text-primary-foreground">
          <OmMotif className="text-2xl" />
        </span>
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          {hi ? "अपना नाम और जन्म-तिथि दीजिए" : "Give your name and birth date"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {hi
            ? "अंक शास्त्र इन्हीं दो चीज़ों से आपका भूत, वर्तमान और भविष्य पढ़ता है। कोई सहमति-दीवार नहीं — जानकारी दीजिए, वाचन आपके सामने है।"
            : "Ank Shastra reads your past, present and future from these two things. Nothing to accept — give the details, the reading stands in front of you."}
        </p>
      </div>

      <Card className="glass">
        <CardContent className="pt-5">
          <form onSubmit={onSubmit} noValidate className="space-y-5">
            <div>
              <Label htmlFor="birthName">{hi ? "जन्म-नाम *" : "Birth name *"}</Label>
              <Input
                id="birthName"
                name="birthName"
                autoComplete="name"
                placeholder={hi ? "जैसे: आरव मेहता" : "e.g. Aarav Mehta"}
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
                  {hi ? "जन्म-प्रमाण-पत्र वाला नाम — इसी से नामांक और आत्म-इच्छा बनते हैं।" : "As written on your birth certificate — it shapes Namank and Soul Urge."}
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="preferredName">{hi ? "बुलाया जाने वाला नाम" : "Preferred name"}</Label>
                <Input
                  id="preferredName"
                  placeholder={hi ? "जैसे: आरव" : "e.g. Aarav"}
                  value={form.preferredName}
                  onChange={(e) => setForm({ ...form, preferredName: e.target.value })}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="dob">{hi ? "जन्म-तिथि *" : "Date of birth *"}</Label>
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

            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">
                {hi
                  ? "आपका डेटा इसी ब्राउज़र में रहता है — सेटिंग्स से निर्यात/हटाएँ कभी भी।"
                  : "Your data stays in this browser (localStorage) — export or delete anytime in Settings."}
              </p>
              <Button type="submit" size="lg">
                <DiyaMotif className="size-5" aria-hidden />
                {hi ? "मेरा वाचन दिखाओ" : "Reveal my reading"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        {hi
          ? "बस देख रहे हैं? डेमो प्रोफ़ाइल (आरव मेहता, १५ जून १९९०) पहले से भरी है — "
          : "Just exploring? The demo profile (Aarav Mehta, 15 June 1990) is already loaded — "}
        <a href="/overview" className="text-primary underline underline-offset-4">
          {hi ? "अभी का हाल देखें" : "go to Abhi Ka Haal"}
        </a>
        {hi ? devNum(0).slice(0, 0) : ""} <Badge variant="gold">{hi ? "निःशुल्क" : "free"}</Badge>
      </p>
      <div className="mt-4 text-center">
        <DisclaimerLine compact />
      </div>
    </div>
  );
}