"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label, Select, Textarea } from "@/components/ui";
import { EmptyState, LoadingCards, PageHeader } from "@/components/shared";
import { useProfile } from "@/components/seeded-profile";
import { useT } from "@/lib/lang";
import { loadLifeContext, saveLifeContext, type LifeAnchor, type LifeContext, type LifeFocus, type ReadingTone } from "@/lib/storage";

const FOCUS: { value: LifeFocus; en: string; hi: string }[] = [
  { value: "career", en: "Career or business", hi: "Career ya business" },
  { value: "money", en: "Money and stability", hi: "Paisa aur sthirta" },
  { value: "relationships", en: "Relationships", hi: "Rishte" },
  { value: "family", en: "Family and responsibility", hi: "Parivaar aur zimmedaari" },
  { value: "wellbeing", en: "Energy and routine", hi: "Urja aur dincharya" },
  { value: "purpose", en: "Direction and purpose", hi: "Disha aur uddeshya" },
  { value: "creativity", en: "Creative work", hi: "Rachnaatmak kaam" },
];

function blankAnchor(): LifeAnchor {
  return { id: crypto.randomUUID(), year: new Date().getFullYear() - 1, area: "career", note: "" };
}

export default function CalibrationPage() {
  const { profile, hydrated } = useProfile();
  if (!hydrated) return <LoadingCards count={2} label="Loading your context" />;
  if (!profile) return <EmptyState title="No profile yet" body="Start a profile before adding personal context." action={<Link href="/" className="text-sm text-primary underline">Start onboarding</Link>} />;
  return <CalibrationForm key={profile.birthDate} profile={profile} initialContext={loadLifeContext(profile.birthDate)} />;
}

function CalibrationForm({ profile, initialContext }: { profile: NonNullable<ReturnType<typeof useProfile>["profile"]>; initialContext: LifeContext | null }) {
  const { lang } = useT();
  const hi = lang === "hi";
  const [focus, setFocus] = React.useState<LifeFocus>(initialContext?.focus ?? "career");
  const [currentChallenge, setCurrentChallenge] = React.useState(initialContext?.currentChallenge ?? "");
  const [desiredOutcome, setDesiredOutcome] = React.useState(initialContext?.desiredOutcome ?? "");
  const [importantDecision, setImportantDecision] = React.useState(initialContext?.importantDecision ?? "");
  const [careerCrossroad, setCareerCrossroad] = React.useState(initialContext?.careerCrossroad ?? "");
  const [moneyCrossroad, setMoneyCrossroad] = React.useState(initialContext?.moneyCrossroad ?? "");
  const [relationshipCrossroad, setRelationshipCrossroad] = React.useState(initialContext?.relationshipCrossroad ?? "");
  const [anchors, setAnchors] = React.useState<LifeAnchor[]>(initialContext?.anchors ?? []);
  const [energyLevel, setEnergyLevel] = React.useState(initialContext?.energyLevel ?? 3);
  const [stressLevel, setStressLevel] = React.useState(initialContext?.stressLevel ?? 3);
  const [workStyle, setWorkStyle] = React.useState(initialContext?.workStyle ?? "");
  const [relationshipStyle, setRelationshipStyle] = React.useState(initialContext?.relationshipStyle ?? "");
  const [moneyStyle, setMoneyStyle] = React.useState(initialContext?.moneyStyle ?? "");
  const [spiritualPractice, setSpiritualPractice] = React.useState(initialContext?.spiritualPractice ?? "");
  const [readingTone, setReadingTone] = React.useState<ReadingTone>(initialContext?.readingTone ?? "balanced");
  const [journalAnalysisConsent, setJournalAnalysisConsent] = React.useState(initialContext?.journalAnalysisConsent ?? false);
  const [secondPersonConsent, setSecondPersonConsent] = React.useState(initialContext?.secondPersonConsent ?? false);
  const [saved, setSaved] = React.useState(false);

  function updateAnchor(id: string, patch: Partial<LifeAnchor>) {
    setAnchors((items) => items.map((item) => item.id === id ? { ...item, ...patch } : item));
    setSaved(false);
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profile) return;
    saveLifeContext({
      birthDate: profile.birthDate,
      focus,
      currentChallenge: currentChallenge.trim(),
      desiredOutcome: desiredOutcome.trim(),
      importantDecision: importantDecision.trim(),
      careerCrossroad: careerCrossroad.trim(),
      moneyCrossroad: moneyCrossroad.trim(),
      relationshipCrossroad: relationshipCrossroad.trim(),
      anchors: anchors.filter((anchor) => anchor.note.trim()).map((anchor) => ({ ...anchor, note: anchor.note.trim() })),
      energyLevel,
      stressLevel,
      workStyle,
      relationshipStyle,
      moneyStyle,
      spiritualPractice,
      readingTone,
      journalAnalysisConsent,
      secondPersonConsent,
    });
    setSaved(true);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader
        title={hi ? "Apni kahaani ka sandarbh" : "Give your reading real context"}
        subtitle={hi
          ? "Aapke ank ek parampara ka lens hain. Aapki zindagi ke waaqe aur aaj ka sawaal is reading ko aapka banaate hain. Har jawaab optional hai."
          : "Your numbers offer a traditional lens. Your lived turning points and current question make the reading specific to you. Every answer is optional."}
      />

      <form onSubmit={onSubmit} className="space-y-5">
        <Card className="glass">
          <CardHeader>
            <CardTitle>{hi ? "Aaj aapka dhyaan kahaan hai?" : "What is taking your attention now?"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="focus">{hi ? "Sabse zaroori jeevan-kshetra" : "Your main life area"}</Label>
              <Select id="focus" value={focus} onChange={(e) => { setFocus(e.target.value as LifeFocus); setSaved(false); }}>
                {FOCUS.map((item) => <option key={item.value} value={item.value}>{hi ? item.hi : item.en}</option>)}
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="challenge">{hi ? "Abhi kya uljhan ya dabaav hai?" : "What feels difficult or unresolved?"}</Label>
              <Textarea id="challenge" maxLength={500} value={currentChallenge} onChange={(e) => { setCurrentChallenge(e.target.value); setSaved(false); }} placeholder={hi ? "Jitna theek lage utna hi bataayein…" : "Share only what you are comfortable sharing…"} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="outcome">{hi ? "Agle 12 mahine mein kya badalna chahte hain?" : "What would you like to be different 12 months from now?"}</Label>
              <Textarea id="outcome" maxLength={500} value={desiredOutcome} onChange={(e) => { setDesiredOutcome(e.target.value); setSaved(false); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="decision">{hi ? "Koi faisla saamne hai? (optional)" : "Is there a decision in front of you? (optional)"}</Label>
              <Input id="decision" maxLength={300} value={importantDecision} onChange={(e) => { setImportantDecision(e.target.value); setSaved(false); }} placeholder={hi ? "jaise: role badalun ya apna kaam shuru karun?" : "e.g. whether to change roles or start something of my own"} />
            </div>
            {focus === "career" ? <p className="rounded-lg border border-dashed p-3 text-xs leading-5 text-muted-foreground">{hi ? "Career focus: apni abhi ki sthiti, saamne ka faisla, lakshya aur ek zaroori seema (jaise samay ya location) bata sakte hain. Report in baaton se planning ke raaste samjhayegi—janmank se naukri milne ya uske samay ka pata nahi laga sakti." : "Career focus: share your current stage, the decision, goal, and one constraint you want considered (such as timing or location). The report can map planning paths from those facts; birth numbers cannot establish whether or when you’ll get hired."}</p> : null}
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>{hi ? "Teen bade faisle—sirf jitna theek lage" : "Three crossroads—share only what feels useful"}</CardTitle>
            <p className="text-sm text-muted-foreground">{hi ? "Har kshetra optional hai. Yeh details report mein sawaal aur planning ko behtar jodengi; hum purani ghatna ya bhavishya khud se nahi maanenge." : "Each field is optional. These details help tailor the questions and planning; we will not infer past events or claim to know your future."}</p>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2"><Label htmlFor="career-crossroad">{hi ? "Kaam / career" : "Career / business"}</Label><Textarea id="career-crossroad" maxLength={300} value={careerCrossroad} onChange={(e) => { setCareerCrossroad(e.target.value); setSaved(false); }} placeholder={hi ? "Jaise: naukri dhoondh rahe hain, offer dekh rahe hain, ya role badalne ka soch rahe hain?" : "For example: are you job-searching, weighing an offer, or considering a role change?"} /></div>
            <div className="space-y-2"><Label htmlFor="money-crossroad">{hi ? "Paisa / suraksha" : "Money / security"}</Label><Textarea id="money-crossroad" maxLength={300} value={moneyCrossroad} onChange={(e) => { setMoneyCrossroad(e.target.value); setSaved(false); }} placeholder={hi ? "Aap kis paison ke faisle ko dekh rahe hain?" : "What money decision are you working through?"} /></div>
            <div className="space-y-2"><Label htmlFor="relationship-crossroad">{hi ? "Rishte / parivaar" : "Relationships / family"}</Label><Textarea id="relationship-crossroad" maxLength={300} value={relationshipCrossroad} onChange={(e) => { setRelationshipCrossroad(e.target.value); setSaved(false); }} placeholder={hi ? "Kis baat ko saaf karna zaroori hai?" : "What conversation or expectation needs clarity?"} /></div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>{hi ? "Aapke liye reading kaise behtar ho?" : "Tune the reading to you"}</CardTitle>
            <p className="text-sm text-muted-foreground">{hi ? "Yeh optional sawaal hain; koi jawab sahi ya galat nahi." : "Optional preferences—there are no right or wrong answers."}</p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm" htmlFor="energy">
                <span className="block font-medium">{hi ? "Aaj ki urja" : "Energy lately"} · {energyLevel}/5</span>
                <input id="energy" type="range" min="1" max="5" value={energyLevel} onChange={(e) => setEnergyLevel(Number(e.target.value))} className="w-full accent-amber-600" />
              </label>
              <label className="space-y-2 text-sm" htmlFor="stress">
                <span className="block font-medium">{hi ? "Aaj ka tanaav" : "Stress lately"} · {stressLevel}/5</span>
                <input id="stress" type="range" min="1" max="5" value={stressLevel} onChange={(e) => setStressLevel(Number(e.target.value))} className="w-full accent-amber-600" />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label htmlFor="work-style">{hi ? "Kaam mein aapka tareeka" : "Your work style"}</Label><Select id="work-style" value={workStyle} onChange={(e) => setWorkStyle(e.target.value)}><option value="">{hi ? "Chunein (optional)" : "Choose (optional)"}</option><option value="structured">{hi ? "Yojana aur sthirta" : "Structure and consistency"}</option><option value="adaptive">{hi ? "Mauke ke saath dhalna" : "Adapt as things change"}</option><option value="independent">{hi ? "Akele gehra kaam" : "Independent deep work"}</option><option value="collaborative">{hi ? "Milkar kaam" : "Collaborative work"}</option></Select></div>
              <div className="space-y-2"><Label htmlFor="relationship-style">{hi ? "Rishton mein kya zaroori lagta hai?" : "What matters in relationships?"}</Label><Select id="relationship-style" value={relationshipStyle} onChange={(e) => setRelationshipStyle(e.target.value)}><option value="">{hi ? "Chunein (optional)" : "Choose (optional)"}</option><option value="communication">{hi ? "Khuli baat-cheet" : "Open communication"}</option><option value="space">{hi ? "Apni jagah" : "Room for independence"}</option><option value="reliability">{hi ? "Bharosemand saath" : "Reliability"}</option><option value="shared-growth">{hi ? "Saath badhna" : "Growing together"}</option></Select></div>
              <div className="space-y-2"><Label htmlFor="money-style">{hi ? "Paison ka faisla kaise lete hain?" : "How do you approach money decisions?"}</Label><Select id="money-style" value={moneyStyle} onChange={(e) => setMoneyStyle(e.target.value)}><option value="">{hi ? "Chunein (optional)" : "Choose (optional)"}</option><option value="careful">{hi ? "Pehle suraksha" : "Security first"}</option><option value="opportunistic">{hi ? "Mauka dikhe toh kadam" : "Act when opportunity appears"}</option><option value="avoidant">{hi ? "Kabhi-kabhi taal deta hoon" : "Sometimes I put it off"}</option><option value="collaborative">{hi ? "Parivaar/saathi ke saath" : "Discuss with family or partner"}</option></Select></div>
              <div className="space-y-2"><Label htmlFor="spiritual-practice">{hi ? "Aapki pasand ka aadhyaatmik tareeka" : "Spiritual practice preference"}</Label><Select id="spiritual-practice" value={spiritualPractice} onChange={(e) => setSpiritualPractice(e.target.value)}><option value="">{hi ? "Koi nahi / batana nahi" : "None / prefer not to say"}</option><option value="prayer">{hi ? "Prarthana ya mantra" : "Prayer or mantra"}</option><option value="meditation">{hi ? "Dhyaan" : "Meditation"}</option><option value="service">{hi ? "Seva" : "Service"}</option><option value="secular">{hi ? "Vyavaharik, bina dharmik upaay" : "Practical, non-spiritual guidance"}</option></Select></div>
            </div>
            <div className="space-y-2"><Label htmlFor="reading-tone">{hi ? "Baat karne ka andaaz" : "How direct should the reading be?"}</Label><Select id="reading-tone" value={readingTone} onChange={(e) => setReadingTone(e.target.value as ReadingTone)}><option value="gentle">{hi ? "Naram aur protsaahit karne wala" : "Gentle and encouraging"}</option><option value="balanced">{hi ? "Santulit" : "Balanced"}</option><option value="candid">{hi ? "Seedha aur spasht" : "Candid and direct"}</option></Select></div>
            <div className="space-y-3 border-t pt-4 text-sm">
              <label className="flex items-start gap-2"><input type="checkbox" checked={journalAnalysisConsent} onChange={(e) => { setJournalAnalysisConsent(e.target.checked); setSaved(false); }} className="mt-1 accent-amber-600" /><span>{hi ? "Main apne isi browser ke journal notes ko report mein pichhle 7/30 din ke factual recap ke liye dikhane ki alag sahmati deta/deti hoon. Optional." : "I separately consent to showing journal notes saved in this browser as a factual past-7/30-day recap in my report. Optional."}</span></label>
              <label className="flex items-start gap-2"><input type="checkbox" checked={secondPersonConsent} onChange={(e) => setSecondPersonConsent(e.target.checked)} className="mt-1 accent-amber-600" /><span>{hi ? "Agar main kisi doosre vyakti ki details doon, toh unka consent lekar hi use karunga/karungi." : "I will only submit another person’s details with their consent."}</span></label>
              {journalAnalysisConsent ? <p className="text-xs text-muted-foreground">{hi ? "Report aapke isi profile se jude journal notes, tareekh, category aur self-rated mood ko hi recap karegi—koi pattern, chhupi ghatna, diagnosis ya numerology se verification nahi banayegi. Bina profile-owner link waali purani entries shamil nahi hongi. Data isi browser se read hota hai, server par upload nahi. Consent uncheck karke recap hataayein. Print/PDF mein notes aa sakte hain." : "The report only recaps journal notes linked to this same profile, with dates, categories, and self-rated moods—it does not infer patterns, hidden events, diagnoses, or numerical verification. Legacy notes without a profile-owner link are excluded. Data is read in this browser and not uploaded. Uncheck consent to remove the recap. Notes may appear in print/PDF."}</p> : null}
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle>{hi ? "Peechhe mudkar dekhein" : "Mark a few turning points"}</CardTitle>
                <p className="mt-1 text-xs text-muted-foreground">{hi ? "Yaad aane waale saal aur waaqe likhein. 5 tak, sab optional." : "Add years and moments you remember. Up to five; all optional."}</p>
              </div>
              <Button type="button" variant="outline" size="sm" disabled={anchors.length >= 5} onClick={() => { setAnchors((items) => [...items, blankAnchor()]); setSaved(false); }}>
                <Plus aria-hidden /> {hi ? "Saal jodein" : "Add a year"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {anchors.length === 0 ? <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">{hi ? "Misal: 2018 mein career ka bada mod, ya 2021 mein nayi zimmedaari." : "For example: a career turning point in 2018, or a new family responsibility in 2021."}</p> : null}
            {anchors.map((anchor, index) => (
              <div key={anchor.id} className="grid gap-3 rounded-xl border bg-background/50 p-3 sm:grid-cols-[7rem_12rem_1fr_auto] sm:items-end">
                <div className="space-y-2">
                  <Label htmlFor={`anchor-year-${anchor.id}`}>{hi ? "Saal" : "Year"}</Label>
                  <Input id={`anchor-year-${anchor.id}`} type="number" min={1900} max={new Date().getFullYear()} value={anchor.year} onChange={(e) => updateAnchor(anchor.id, { year: Number(e.target.value) })} aria-label={`${hi ? "Saal" : "Year"} ${index + 1}`} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`anchor-area-${anchor.id}`}>{hi ? "Kshetra" : "Area"}</Label>
                  <Select id={`anchor-area-${anchor.id}`} value={anchor.area} onChange={(e) => updateAnchor(anchor.id, { area: e.target.value as LifeFocus })}>
                    {FOCUS.map((item) => <option key={item.value} value={item.value}>{hi ? item.hi : item.en}</option>)}
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`anchor-note-${anchor.id}`}>{hi ? "Kya hua tha?" : "What changed?"}</Label>
                  <Input id={`anchor-note-${anchor.id}`} maxLength={180} value={anchor.note} onChange={(e) => updateAnchor(anchor.id, { note: e.target.value })} placeholder={hi ? "Ek chhota sa note" : "A short note"} />
                </div>
                <Button type="button" variant="ghost" size="icon" aria-label={hi ? "Is saal ko hataayein" : "Remove this year"} onClick={() => { setAnchors((items) => items.filter((item) => item.id !== anchor.id)); setSaved(false); }}><Trash2 aria-hidden /></Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="max-w-xl text-xs text-muted-foreground">{hi ? "Aapke jawaab isi browser mein rehte hain. Hum kisi waaqe ko ank-ganit se hua sach nahi maanenge; aapke chihn aur aapki baat alag dikhegi." : "Your answers stay in this browser. We will not treat a numerology theme as proof that an event happened; your facts and the traditional reading remain clearly separate."}</p>
          <div className="flex items-center gap-3">
            {saved ? <span role="status" className="text-sm text-emerald-700 dark:text-emerald-300">{hi ? "Sandarbh sahej diya" : "Context saved"}</span> : null}
            <Button type="submit">{hi ? "Sandarbh sahein" : "Save context"}</Button>
            <Link href="/overview" className="inline-flex h-10 items-center justify-center rounded-lg border bg-transparent px-4 text-sm font-medium transition-colors hover:bg-accent">{hi ? "Reading par jaayein" : "View my reading"}</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
