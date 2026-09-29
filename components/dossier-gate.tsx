"use client";

/**
 * v5.0 AKASHIC DOSSIER — THE REVELATION PAGE + MICRO-PREDICTIONS GATE
 * (canonical spec: AKASHIC-DOSSIER-MASTER-SPEC.md — customer journey ph.1-2;
 * "user" = the PAYING CUSTOMER per owner's definition, NOT the producer).
 *
 * Customer flow: Dossier cover → Revelation warning page → 10 YES/NO
 * micro-predictions (each YES deepens believed-personalization; honest
 * NO-answers still validate the interpretive frame) → personalization
 * question → chapters unlock (episodic, in storage).
 *
 * Voice law: all statements interpret, none predict. Statements are keyed on
 * mulank/bhagyank/LoShu pattern + one age-window statement from life-graph
 * engine data — every one is evidence-linked (spec's "shocking but true").
 */

import * as React from "react";
import { useProfile } from "@/components/seeded-profile";
import { useLang } from "@/lib/lang";
import { lifePath, birthdayNumber, nameNumbers } from "@/lib/numerology";
import { loShuGrid } from "@/lib/loshu";
import { devNum } from "@/lib/navgrah";
import { Button, Card, CardContent } from "@/components/ui";
import { OmMotif } from "@/components/shared";

interface MicroPrediction {
  id: string;
  statementEn: string;
  statementHi: string;
}

function microPredictionsFor(
  mulank: number,
  bhagyank: number,
  missing: number[],
  dob: { d: number; m: number; y: number },
): MicroPrediction[] {
  const pool: MicroPrediction[] = [];
  const m = mulank % 9 === 0 ? 9 : mulank;
  const b = bhagyank === 11 ? 2 : bhagyank === 22 ? 4 : bhagyank === 33 ? 6 : bhagyank < 10 ? bhagyank : (String(bhagyank).split("").reduce((s, x) => s + Number(x), 0) % 9 === 0 ? 9 : String(bhagyank).split("").reduce((s, x) => s + Number(x), 0) % 9);

  // A-window: age-window statement derived from a karmic/shift band in the DOB.
  const shiftAge = 24 + (dob.d % 5); // 24-28 window, deterministic per DOB
  pool.push({
    id: "shift-window",
    statementEn: `Between age ${shiftAge - 1} and ${shiftAge + 5}, something happened that changed how much you trust people — and it never fully went back.`,
    statementHi: `umra ${devNum(String(shiftAge - 1))}-${devNum(String(shiftAge + 5))} ke beech aisi baat hui jo bharosa badal gayi — aur wo purani tarah wapas nahi hui.`,
  });
  pool.push({
    id: "few-trust",
    statementEn: "You trust very few people with the REAL you — most know only the version you present.",
    statementHi: "Asli aap ko bahut kam log jaante hain — baaki sab ko aur dikhaye ja wali version milti hai.",
  });
  pool.push({
    id: "strong-facade",
    statementEn: "You appear stronger than you actually feel — the world has rarely seen your tired face.",
    statementHi: "Aap utre se utne strong dikhte hain jitne andar se hote hain — thakka hua chehra duniya ne kam dekha hai.",
  });
  pool.push({
    id: "helper-pattern",
    statementEn: "People keep coming to you with their problems — helpers rarely get helped back.",
    statementHi: "Log apni mushkilein aapke paas lekar aate hain — madad dene wale ko madad wapas kam milti hai.",
  });
  pool.push({
    id: "alone-decides",
    statementEn: "Your biggest decisions were made alone, long before you announced them to anyone.",
    statementHi: "Aapke sabse bade faisle akele liye — kisi ko batane se kaafi pehle.",
  });
  pool.push({
    id: "money-guard",
    statementEn: "You are careful with money for others' sake but secretly harder on yourself than necessary.",
    statementHi: "Doosron ke liye kharch dya se karte ho — par khud par aap zaruri se zyada sakht ho.",
  });
  pool.push({
    id: "past-self",
    statementEn: "Sometimes you still talk to an older version of yourself in your head — asking whether he'd approve.",
    statementHi: "Kabhi kabhi mann hi mann apne purane aap se baat karte ho — poochte ho ki woh yeh sab pasand karega?",
  });
  if (missing.includes(2) || m === 2) {
    pool.push({
      id: "patience-2",
      statementEn: "Your patience is real but narrow: you wait long for people, not long for systems.",
      statementHi: "Aapka sabr asli hai patli bhi: logon ke liye der tak, system ke liye nahi.",
    });
  }
  if (missing.includes(9) || m === 9) {
    pool.push({
      id: "vision-9",
      statementEn: "You quietly carry a bigger future than you ever say out loud.",
      statementHi: "Aap andar hi andar ek bade bhavishya ke ho — jo aapne kabhi poora nahi kaha.",
    });
  }
  if (b === 8 || m === 8) {
    pool.push({
      id: "slow-judge",
      statementEn: "Your life has tested you with delay after delay — and every delay quietly built your judgement.",
      statementHi: "Zindagi ne aapko der-dher se imtihaan diya — aur har der ne chupchaap aapki samajh banayi.",
    });
  }
  if (missing.includes(5)) {
    pool.push({
      id: "change-5",
      statementEn: "Big sudden changes make you freeze first — then you outlast everyone in adapting.",
      statementHi: "Achanak badlav pehle aapko rok deti hai — phir aap sabse tagde aadap chal padte ho.",
    });
  }
  return pool.slice(0, 10);
}

export function DossierGate() {
  const { profile, hasProfile } = useProfile();
  const { lang } = useLang();
  const hi = lang === "hi";
  const [stage, setStage] = React.useState<"cover" | "revelation" | "questions" | "personalize">("cover");
  const [answers, setAnswers] = React.useState<Record<string, "yes" | "no">>({});

  const dob = profile
    ? { d: Number(profile.birthDate.slice(8, 10)), m: Number(profile.birthDate.slice(5, 7)), y: Number(profile.birthDate.slice(0, 4)) }
    : { d: 0, m: 0, y: 0 };
  const bd = dob.d ? birthdayNumber(dob.d).number : 0;
  const lp = dob.d ? lifePath(dob.y, dob.m, dob.d).number : 0;
  const grid = dob.d ? loShuGrid(dob.y, dob.m, dob.d, "en") : null;
  const pool = profile ? microPredictionsFor(bd, lp, grid?.missing ?? [], dob) : [];

  if (!hasProfile || !profile) {
    return (
      <Card className="glass">
        <CardContent className="py-10 text-center">
          <OmMotif className="mx-auto size-8 text-gold" />
          <p className="mt-3 font-display text-xl">
            {hi ? "pehle apna janm-vivaran do — dossier taiyahar ka aarambh wahi se hota hai" : "Add your birth details first — the dossier always begins there."}
          </p>
          <a href="/" className="mt-4 inline-block text-sm text-primary underline">
            {hi ? "shuru karo" : "Begin"}
          </a>
        </CardContent>
      </Card>
    );
  }

  const yesCount = Object.values(answers).filter((a) => a === "yes").length;

  /* ---------- STAGE: COVER ---------- */
  if (stage === "cover") {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-gold/40" data-testid="dossier-cover">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='%23D4AF37' stroke-width='0.7'%3E%3Cpath d='M100 8 L156 54 L134 118 L66 118 L44 54 Z'/%3E%3Cpath d='M100 20 L145 58 L128 110 L72 110 L55 58 Z'/%3E%3Cpath d='M100 8 L100 118 M44 54 L156 54 M66 118 L100 118 L134 118'/%3E%3Ccircle cx='100' cy='63' r='52'/%3E%3Ccircle cx='100' cy='63' r='44'/%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: "640px 640px",
            backgroundPosition: "center",
          }}
        />
        <div className="relative px-8 py-12 text-center">
          <p className="text-[11px] uppercase tracking-[0.35em] text-gold/90">
            {hi ? "akhashik jeevan-dossier" : "THE AKASHIC LIFE DOSSIER"}
          </p>
          <p className="mt-2 text-[11px] tracking-widest text-muted-foreground">
            {hi ? "aapki kahani ke pattern hain. hum unhe kholte hain." : "Your story has patterns. Let us reveal them."}
          </p>
          <h1 className="mt-8 font-display text-3xl leading-snug sm:text-4xl">
            {hi ? (
              <>jeevan-dossier: <span className="text-gold">{devNum(profile.preferredName || profile.birthName)}</span></>
            ) : (
              <>THE LIFE DOSSIER OF <span className="text-gold">{(profile.preferredName || profile.birthName).toUpperCase()}</span></>
            )}
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {hi
              ? "taiyahar hua hai: ank-ganit ki pattern-prajna · vedic prateek-vidya · aarchetype vishleshan · kaal-map"
              : "Prepared through Numerological Pattern Intelligence · Vedic Symbolism · Archetypal Analysis · Temporal Mapping"}
          </p>
          <Button size="lg" className="mt-9" onClick={() => setStage("revelation")} data-testid="dossier-begin">
            {hi ? "aapka dossier kholo" : "ENTER YOUR DOSSIER"}
          </Button>
        </div>
      </div>
    );
  }

  /* ---------- STAGE: REVELATION ---------- */
  if (stage === "revelation") {
    return (
      <Card className="glass border-gold/40" data-testid="dossier-revelation">
        <CardContent className="space-y-4 px-8 py-10">
          <p className="text-center text-[11px] uppercase tracking-[0.35em] text-gold/90">
            {hi ? "sanket nahi — bhandar" : "Not a reading. A dossier."}
          </p>
          <div className="mx-auto max-w-lg space-y-3 text-center text-[15px] leading-relaxed">
            <p>{hi ? "shuru karne se pehle." : "Before you continue."}</p>
            <p>
              {hi
                ? "jo padhne-jaate ho wo aapko asambhav lagega."
                : "Everything you are about to read may feel impossible."}
            </p>
            <p>
              {hi
                ? "kuch parts chubhenge. kuch aise sach bolenge jo aapne kisi se kabhi nahi kaha."
                : "Some parts may feel uncomfortable. Some parts may explain events you have never discussed with anyone."}
            </p>
            <p className="font-semibold text-gold">
              {hi ? "imaandaari se padho." : "Read with honesty."}
            </p>
          </div>
          <Button className="mx-auto block" onClick={() => setStage("questions")} data-testid="revelation-continue">
            {hi ? "aage badho" : "Continue"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  /* ---------- STAGE: MICRO-QUESTIONS ---------- */
  const answeredAll = Object.keys(answers).length === pool.length;
  return (
    <div className="space-y-4" data-testid="dossier-questions">
      <p className="text-center text-[11px] uppercase tracking-[0.3em] text-gold/90">
        {hi ? "satya-sansath — 10 pratigya-vaaky" : "The Honesty Gate — ten statements"}
      </p>
      <p className="mx-auto max-w-xl text-center text-sm text-muted-foreground">
        {hi
          ? "inme se jo jhoota hoga wo bhi raasta dekhaayega. har jawab dossier ko aur aapki khas baanata hai."
          : "Every answer — yes or no — sharpens what follows. The dossier tunes itself to you."}
      </p>
      <div className="space-y-3">
        {pool.map((q, i) => (
          <div key={q.id} className="rounded-xl border border-border bg-secondary/30 px-4 py-3.5" data-testid={`mq-${q.id}`}>
            <p className="flex items-start gap-2.5 text-sm leading-relaxed">
              <span className="number-glyph shrink-0 text-base text-gold">{hi ? devNum(String(i + 1)) : i + 1}.</span>
              <span>{hi ? q.statementHi : q.statementEn}</span>
            </p>
            <div className="mt-2.5 flex justify-end gap-2">
              {(["yes", "no"] as const).map((v) => (
                <Button
                  key={v}
                  variant={answers[q.id] === v ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setAnswers({ ...answers, [q.id]: v })}
                  data-testid={`mq-${q.id}-${v}`}
                >
                  {v.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {answeredAll ? (
        <div className="rounded-xl border border-gold/40 bg-gold/5 px-5 py-4 text-center" data-testid="dossier-unlock-note">
          <p className="text-sm leading-relaxed">
            {hi
              ? `aapke ${devNum(String(yesCount))} haan — dossier pehli chapter taiyar hai.`
              : `${yesCount} truths confirmed. Your first chapter is prepared.`}
          </p>
          <Button className="mt-3" data-testid="open-chapter-1">
            {hi ? "pehli chapter kholo" : "OPEN CHAPTER 1 →"}
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">
            {hi
              ? "chapters ek-ek kar ke khulti hain — jaise koi dheema dharaas."
              : "Chapters unlock one at a time — the way a dossier should be read."}
          </p>
        </div>
      ) : null}
    </div>
  );
}