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
import { Button, Input, Label, Card, CardContent } from "@/components/ui";
import { DisclaimerLine } from "@/components/shared";
import { ConciergeSection } from "@/components/concierge";
import { useProfile } from "@/components/seeded-profile";
import { isValidBirthDate, sanitizeName } from "@/lib/numerology";
import { DdmmyyyyDateInput, ddmmyyyyToIso, isoToDdmmyyyy, type DdmmyyyyParts } from "@/components/ddmmyyyy-date";
import { useLang } from "@/lib/lang";

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
    router.push("/calibration");
  }

  return (
    <main className="landing-page">
      <section className="landing-hero" aria-labelledby="landing-title">
        <div className="landing-hero-copy">
          <p className="landing-eyebrow">{hi ? "ANK SHASTRA · AAPKI ZINDAGI KA SANDARBH" : "NUMEROLOGY · YOUR LIFE, IN CONTEXT"}</p>
          <h1 id="landing-title" className="landing-hero-title">
            {hi ? <>Apni kahani ka<br /><em>pattern samjhein.</em></> : <>Read the pattern.<br /><em>Choose your next move.</em></>}
          </h1>
          <p className="landing-hero-lede">
            {hi
              ? "Ank ek paramparagat lens hain—faisla aapka. Apne janm-ank aur aaj ke jeevan-sandarbh ko jodkar ek sochi-samjhi, kaam ki reading paayein."
              : "Numbers offer a traditional lens, not a verdict. Connect your numerology with the context of your life today—and leave with a reading you can actually use."}
          </p>
          <div className="landing-hero-meta">
            <span>{hi ? "01 · Apne ank" : "01 · Your numbers"}</span>
            <span>{hi ? "02 · Aapka sandarbh" : "02 · Your context"}</span>
            <span>{hi ? "03 · Agla kadam" : "03 · A next step"}</span>
          </div>
          <a href="#approach" className="landing-text-link">{hi ? "Yeh reading kaise banti hai" : "How the reading is built"} <span aria-hidden>↗</span></a>
        </div>

        <div className="landing-hero-art" aria-hidden="true">
          <div className="landing-art-orbit landing-art-orbit-outer" />
          <div className="landing-art-orbit landing-art-orbit-inner" />
          <div className="landing-art-core"><span>7</span><small>REFLECT</small></div>
          <span className="landing-art-number landing-art-number-one">1</span>
          <span className="landing-art-number landing-art-number-two">4</span>
          <span className="landing-art-number landing-art-number-three">9</span>
          <span className="landing-art-caption">A lens for the life<br />you are living now</span>
        </div>

        <Card className="landing-intake-card" id="begin-reading">
          <div className="landing-form-heading">
            <div><p className="landing-step-label">{hi ? "PEHLA KADAM · AADHAAR" : "FIRST · THE FOUNDATION"}</p>
              <h2>{hi ? "Shuruaat aap se." : "Start with you."}</h2></div>
            <span className="landing-step-count">01 <i>/ 03</i></span>
          </div>
          <p className="landing-form-intro">{hi ? "Naam aur janm-tithi se ank nikalte hain. Aage chalkar hum aapse poochhenge ki zindagi mein abhi kya chal raha hai." : "Your name and birth date establish the numbers. Next, we’ll ask what is actually happening in your life."}</p>
        <CardContent className="landing-intake-content pt-5">
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

            <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">
                {hi
                  ? "Aapka data isi browser mein rehta hai — Settings se export/delete kabhi bhi."
                  : "Your data stays in this browser (localStorage) — export or delete anytime in Settings."}
              </p>
              <Button type="submit" size="lg" className="landing-submit mx-auto whitespace-nowrap sm:mx-0">
                {hi ? "Aage badhein" : "Build my foundation"}<span aria-hidden>→</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      </section>

      {hasProfile ? <p className="landing-returning">
        {hi ? "Pehle se profile hai? " : "Already have a profile? "}
        <a href="/overview" className="text-primary underline underline-offset-4">
          {hi ? "Apni current reading kholein" : "Continue to your reading"}
        </a>
      </p> : null}
      <Card className="landing-sample" id="sample-reading">
        <CardContent className="space-y-3 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">{hi ? "Reading ka namoona · sirf misaal" : "A sample of the reading · illustration only"}</p>
          <p className="font-display text-lg font-semibold">{hi ? "Sanket se zyada kaam ki baat" : "A useful signal, not a dramatic promise"}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{hi ? "Maan lijiye aapne bataya ki career mein zimmedaari badh rahi hai, par role aur samay-seema saaf nahi. Reading aapko koi promotion pakka nahi batayegi; woh kahegi: kaam badhne par adhikaar, samay aur muawza likhit mein saaf karein—phir dekhein ki mauka aapke 12-mahine ke iraade ko sach mein aage badhata hai ya nahi." : "Say you tell us your responsibilities at work are growing, but role and timing remain unclear. The reading will not promise a promotion. It will help you name the decision: clarify ownership, timeline, and compensation in writing, then test whether the opportunity advances your 12-month goal."}</p>
          <p className="text-xs text-muted-foreground">{hi ? "Yeh kalpanik misaal hai, kisi customer ki reading nahi. Personal insight aapke ank aur aapke diye sandarbh ko saath rakhega." : "This is a fictional illustration, not a customer reading. Your report combines your calculated numbers with context you choose to provide."}</p>
        </CardContent>
      </Card>
      <section className="landing-approach" id="approach">
        <div className="landing-section-heading"><p className="landing-eyebrow">{hi ? "SIRF ANK NAHI · AAPKI ASLI ZINDAGI" : "MORE THAN A CHART · YOUR ACTUAL LIFE"}</p>
          <h2>{hi ? "Reading ko zameen se jodein." : "Make meaning practical."}</h2>
          <p>{hi ? "Koi generic bhavishyavani nahi. Har insight ke peeche uska aadhar aur seema saaf." : "No generic fortune-telling. Every insight should show its reasoning—and where that reasoning stops."}</p></div>
        <div className="landing-steps-grid">
          <article><span>01</span><h3>{hi ? "Pattern" : "The pattern"}</h3><p>{hi ? "Naam aur janm-tithi se nikle ankon ko saaf tareeke se samjhein." : "See the numerology calculations clearly, with the tradition and method named."}</p></article>
          <article><span>02</span><h3>{hi ? "Aapka sandarbh" : "Your context"}</h3><p>{hi ? "Career, rishte ya paise mein jo chal raha hai—reading aapke bataye sandarbh se judi hai." : "Career, relationships, money: interpretation should connect to the context you choose to share."}</p></article>
          <article><span>03</span><h3>{hi ? "Agla samajhdaar kadam" : "A grounded next step"}</h3><p>{hi ? "Mauke aur mushkil dono dekhein. Faisla ya guarantee nahi—sochne aur baat karne ke kaam ke tareeqe." : "Consider opportunities and friction alike. No guarantees—just useful questions and actions to consider."}</p></article>
        </div>
      </section>
      <div className="landing-disclaimer"><DisclaimerLine compact /></div>
      <div className="landing-concierge"><ConciergeSection /></div>
    </main>
  );
}
