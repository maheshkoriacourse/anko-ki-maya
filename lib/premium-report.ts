import type { FullReading } from "./numerology";
import { personalMonth, personalYear, reduceFully, upcomingMonths, type MonthCycle } from "./numerology";
import { cycleCaution, focusAction } from "./personal-insights";
import { JOURNAL_CATEGORIES, MOODS, type JournalCategory, type LifeContext, type Mood, type Profile } from "./storage";

export type ReportLanguage = "en" | "hi";
export type EvidenceKind = "calculated" | "customer" | "tradition" | "scenario" | "insufficient";

export interface ReportEvidence {
  kind: EvidenceKind;
  label: string;
}

export interface ReportScenario {
  title: string;
  horizon: string;
  basis: string;
  condition: string;
  upside: string;
  downside: string;
  signal: string;
  counterSignal: string;
  nextStep: string;
}

export interface ReportMonth extends MonthCycle {
  label: string;
  lens: string;
  question: string;
  move: string;
  watchOut: string;
  calculation: string;
}

export function personalYearFor(birthMonth: number, birthDay: number, year: number): number {
  return personalYear(birthMonth, birthDay, year).number;
}

export function nameMappingLabel(system: Profile["system"]): string {
  return system === "chaldean" ? "Chaldean-style" : "Pythagorean-style";
}

const FOCUS: Record<LifeContext["focus"], { en: string; hi: string }> = {
  career: { en: "career or business", hi: "career ya business" },
  money: { en: "money and stability", hi: "paisa aur sthirta" },
  relationships: { en: "relationships", hi: "rishte" },
  family: { en: "family and responsibility", hi: "parivaar aur zimmedaari" },
  wellbeing: { en: "energy and routine", hi: "urja aur dincharya" },
  purpose: { en: "direction and purpose", hi: "disha aur uddeshya" },
  creativity: { en: "creative work", hi: "rachnatmak kaam" },
};
const LIFE_FOCUSES = ["career", "money", "relationships", "family", "wellbeing", "purpose", "creativity"] as const;

export interface JournalRecapEntry { date: string; mood: Mood; category: JournalCategory; text: string }

/** A factual recap of entries explicitly opted into; never interprets entries as numerology predictions. */
export function buildJournalRecap(serialized: string | null, consent: boolean, asOf: string, ownerBirthDate: string): { week: JournalRecapEntry[]; month: JournalRecapEntry[] } | null {
  if (!consent || !serialized || !/^\d{4}-\d{2}-\d{2}$/.test(asOf) || !/^\d{4}-\d{2}-\d{2}$/.test(ownerBirthDate)) return null;
  const toDay = (value: string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return NaN;
    const [year, month, day] = value.split("-").map(Number);
    const timestamp = Date.UTC(year, month - 1, day);
    return new Date(timestamp).toISOString().slice(0, 10) === value ? timestamp / 86_400_000 : NaN;
  };
  const today = toDay(asOf);
  if (!Number.isFinite(today)) return { week: [], month: [] };
  try {
    const values: unknown = JSON.parse(serialized);
    if (!Array.isArray(values)) return { week: [], month: [] };
    const valid = values.flatMap((value): JournalRecapEntry[] => {
      if (!value || typeof value !== "object") return [];
      const entry = value as Record<string, unknown>;
      const date = typeof entry.date === "string" ? entry.date : "";
      if (entry.ownerBirthDate !== ownerBirthDate || !Number.isFinite(toDay(date)) || toDay(date) > today || typeof entry.text !== "string" || !entry.text.trim() ||
          typeof entry.mood !== "string" || !MOODS.includes(entry.mood as Mood) ||
          typeof entry.category !== "string" || !JOURNAL_CATEGORIES.includes(entry.category as JournalCategory)) return [];
      return [{ date, mood: entry.mood as Mood, category: entry.category as JournalCategory, text: entry.text.slice(0, 500) }];
    }).sort((a, b) => b.date.localeCompare(a.date));
    const since7 = new Date((today - 6) * 86_400_000).toISOString().slice(0, 10);
    const since30 = new Date((today - 29) * 86_400_000).toISOString().slice(0, 10);
    return { week: valid.filter((entry) => entry.date >= since7), month: valid.filter((entry) => entry.date >= since30) };
  } catch { return { week: [], month: [] }; }
}

/** Validate and bound browser-stored context before it reaches report copy. */
export function parseLifeContextForReport(serialized: string | null, birthDate: string): LifeContext | null {
  if (!serialized) return null;
  try {
    const parsed = JSON.parse(serialized) as Partial<LifeContext>;
    if (parsed.birthDate !== birthDate || typeof parsed.focus !== "string" || !LIFE_FOCUSES.includes(parsed.focus as typeof LIFE_FOCUSES[number])) return null;
    const safeText = (value: unknown, max = 500) => typeof value === "string" ? value.slice(0, max) : "";
    const safeEnum = <T extends string>(value: unknown, options: readonly T[]): T | undefined =>
      typeof value === "string" && options.includes(value as T) ? value as T : undefined;
    const anchors = Array.isArray(parsed.anchors) ? parsed.anchors.flatMap((entry) => {
      if (!entry || typeof entry !== "object") return [];
      const anchor = entry as Partial<LifeContext["anchors"][number]>;
      if (!Number.isInteger(anchor.year) || (anchor.year ?? 0) < 1800 || (anchor.year ?? 0) > 2200 || typeof anchor.note !== "string") return [];
      const area = safeEnum(anchor.area, LIFE_FOCUSES);
      if (!area || !anchor.note.trim()) return [];
      return [{ id: safeText(anchor.id, 80) || `${anchor.year}-entry`, year: anchor.year!, area, note: anchor.note.slice(0, 500) }];
    }) : [];
    const stressLevel = typeof parsed.stressLevel === "number" && parsed.stressLevel >= 1 && parsed.stressLevel <= 5 ? parsed.stressLevel : undefined;
    const energyLevel = typeof parsed.energyLevel === "number" && parsed.energyLevel >= 1 && parsed.energyLevel <= 5 ? parsed.energyLevel : undefined;
    return {
      birthDate,
      focus: parsed.focus as LifeContext["focus"],
      currentChallenge: safeText(parsed.currentChallenge),
      desiredOutcome: safeText(parsed.desiredOutcome),
      importantDecision: safeText(parsed.importantDecision, 300),
      careerCrossroad: safeText(parsed.careerCrossroad, 300),
      moneyCrossroad: safeText(parsed.moneyCrossroad, 300),
      relationshipCrossroad: safeText(parsed.relationshipCrossroad, 300),
      anchors,
      energyLevel,
      stressLevel,
      workStyle: safeText(parsed.workStyle, 80),
      relationshipStyle: safeText(parsed.relationshipStyle, 80),
      moneyStyle: safeText(parsed.moneyStyle, 80),
      spiritualPractice: safeText(parsed.spiritualPractice, 80),
      readingTone: safeEnum(parsed.readingTone, ["gentle", "balanced", "candid"]),
      journalAnalysisConsent: parsed.journalAnalysisConsent === true,
      secondPersonConsent: parsed.secondPersonConsent === true,
      updatedAt: safeText(parsed.updatedAt, 64),
    };
  } catch { return null; }
}

const LENSES: Record<number, { en: string; hi: string }> = {
  1: { en: "initiative and a clear beginning", hi: "pehal aur saaf shuruaat" },
  2: { en: "cooperation, patience, and careful listening", hi: "saajhedaari, dhairya aur dhyaan se sunna" },
  3: { en: "expression, learning, and visibility", hi: "abhivyakti, seekhna aur saamne aana" },
  4: { en: "systems, steady effort, and practical foundations", hi: "vyavastha, lagataar mehnat aur mazboot neev" },
  5: { en: "experimentation, movement, and flexibility", hi: "naye prayog, gati aur lachilepan" },
  6: { en: "care, commitments, and shared responsibility", hi: "dekhbhaal, vaade aur saanjhi zimmedaari" },
  7: { en: "study, reflection, and refinement", hi: "adhyayan, manan aur sudhaar" },
  8: { en: "leadership, accountability, and measured ambition", hi: "netritva, jawaabdehi aur sochi-samjhi mahatvaakaanksha" },
  9: { en: "completion, review, and making room for a next chapter", hi: "samaapan, samiksha aur agle adhyay ke liye jagah" },
};

const MONTH_LENSES: Record<number, { en: string; hi: string }> = {
  1: { en: "initiative and a first step", hi: "pehal aur pehla kadam" },
  2: { en: "cooperation and patient listening", hi: "saajhedaari aur dhairya se sunna" },
  3: { en: "clear expression and useful feedback", hi: "saaf baat aur kaam ki pratikriya" },
  4: { en: "structure, scope, and steady effort", hi: "vyavastha, kaam ka daayra aur lagataar mehnat" },
  5: { en: "experimentation and flexibility", hi: "parikshan aur lachilepan" },
  6: { en: "shared commitments and care", hi: "saajhi zimmedaari aur dekhbhaal" },
  7: { en: "review, study, and refinement", hi: "samiksha, adhyayan aur sudhaar" },
  8: { en: "accountability and measured resources", hi: "jawaabdehi aur naap-tol kar saadhan" },
  9: { en: "completion and making room", hi: "samaapan aur jagah banana" },
};

const MONTH_PROMPTS: Record<number, { question: { en: string; hi: string }; move: { en: string; hi: string }; watchOut: { en: string; hi: string } }> = {
  1: { question: { en: "What is the smallest first step you can reverse if needed?", hi: "Aapka sabse chhota pehla kadam kya hai jise zaroorat par palta ja sake?" }, move: { en: "Name one low-cost start and decide what result you will check.", hi: "Ek kam-kharch shuruaat chunein aur tay karein ki kaunsa nateeja jaanchenge." }, watchOut: { en: "Do not confuse starting quickly with having agreement or enough information.", hi: "Jaldi shuru karne ko sahmati ya poori jaankari na samjhein." } },
  2: { question: { en: "Whose input matters, and what exactly do you need to ask?", hi: "Kiski rai maayne rakhti hai, aur aapko theek kya poochhna hai?" }, move: { en: "Ask one clear question; record what was agreed rather than inferred.", hi: "Ek saaf sawaal poochhein; jo tay hua wahi likhein, apna anumaan nahi." }, watchOut: { en: "Do not treat silence, warmth, or delay as a definite yes or no.", hi: "Khamoshi, apnapan ya deri ko pakka haan ya naa na samjhein." } },
  3: { question: { en: "What needs to be said, shown, or shared to get specific feedback?", hi: "Kaam ki pratikriya ke liye kya kehna, dikhana ya saanjha karna hoga?" }, move: { en: "Share one concrete request or small draft and ask for a specific response.", hi: "Ek thos darkhwaast ya chhota draft saanjha karke khaas jawaab maangein." }, watchOut: { en: "Too many parallel conversations can blur the decision you are trying to make.", hi: "Bahut si ek-saath baatein asal faisle ko dhundhla kar sakti hain." } },
  4: { question: { en: "Which practical detail—scope, time, cost, or support—must be explicit?", hi: "Kaunsi vyavaharik baat—daayra, samay, kharch ya sahaara—saaf honi chahiye?" }, move: { en: "Write down the conditions, owner, and review date before committing.", hi: "Vaada karne se pehle shartein, zimmedaar vyakti aur samiksha-tareekh likhein." }, watchOut: { en: "A tidy plan is useful, but it cannot remove every unknown or constraint.", hi: "Saaf yojana kaam aati hai, par har anjaani baat ya seema nahi mitaati." } },
  5: { question: { en: "What can you test across the options without locking yourself in?", hi: "Kaun-sa parikshan vikalpon ko jaanch sakta hai bina aapko baandhe?" }, move: { en: "Compare two options through a small, time-bounded experiment.", hi: "Do vikalpon ko chhote, samay-seemit parikshan se tulna karein." }, watchOut: { en: "Novelty is not proof that a change is better; compare its real costs too.", hi: "Naya hona behtar hone ka saboot nahi; asal keemat bhi tolien." } },
  6: { question: { en: "Which responsibility is genuinely shared, and which is being assumed?", hi: "Kaunsi zimmedaari sach mein saajhi hai aur kaunsi bas maan li gayi hai?" }, move: { en: "Clarify one boundary or shared commitment before taking on more.", hi: "Aur zimmedaari lene se pehle ek seema ya saajha vaada saaf karein." }, watchOut: { en: "Care for others does not require ignoring your capacity or consent.", hi: "Doosron ki dekhbhaal ke liye apni kshamata ya sahmati nazarandaaz na karein." } },
  7: { question: { en: "What evidence do you have, and what remains an assumption?", hi: "Aapke paas kaunsa saboot hai, aur abhi kya sirf anumaan hai?" }, move: { en: "Review one dated example and list the next fact you still need.", hi: "Ek tareekh-waala udaharan dekhein aur agla zaroori tathya likhein." }, watchOut: { en: "More research can become a way to postpone a decision indefinitely.", hi: "Aur research karna kabhi-kabhi faisla hamesha taalne ka tareeqa ban sakta hai." } },
  8: { question: { en: "What observable result would make this commitment worthwhile to you?", hi: "Kaunsa dikhne-waala nateeja is vaade ko aapke liye maayne-daar banaayega?" }, move: { en: "Choose one measurable success signal and one condition for pausing.", hi: "Ek naapne-yogya safalta-sanket aur rukne ki ek shart chunein." }, watchOut: { en: "Do not let a target, title, or number replace your wider priorities.", hi: "Koi target, pad ya ank aapki badi prathmiktaon ki jagah na le." } },
  9: { question: { en: "What can be completed, renegotiated, or consciously released?", hi: "Kya poora, dobara tay, ya soch-samajh kar chhoda ja sakta hai?" }, move: { en: "Close one open loop or set a date to renegotiate it.", hi: "Ek khula kaam poora karein ya use dobara tay karne ki tareekh rakhein." }, watchOut: { en: "An ending is not automatically a failure; a new start is not automatically better.", hi: "Khatm hona apne-aap haar nahi; nayi shuruaat apne-aap behtar nahi." } },
};

const MONTH_NAMES: Record<ReportLanguage, string[]> = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  hi: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};

const LENSES_BY_FOCUS: Record<LifeContext["focus"], { en: string[]; hi: string[] }> = {
  career: { en: ["responsibility grows faster than authority, time, or support", "scope, ownership, and support are clarified", "a new responsibility arrives without a named owner or review date"], hi: ["zimmedaari, adhikaar, samay ya sahaare se tez badhe", "kaam ka daayra, adhikaar aur sahaara saaf ho", "nayi zimmedaari aaye par adhikaar ya samiksha-tareekh na ho"] },
  money: { en: ["the full cost and timing are written down", "a small review reveals one adjustable expense or commitment", "a decision is rushed before costs and alternatives are compared"], hi: ["poora kharch aur samay likha jaaye", "chhoti samiksha ek badalne-yogya kharch ya vaada dikhaaye", "kharch aur vikalp tulne se pehle faisle ki jaldi ho"] },
  relationships: { en: ["the same concern returns but the request or boundary stays unspoken", "both people can state the request and boundary clearly", "the concern returns but no follow-up time is agreed"], hi: ["wahi chinta laute par darkhwaast ya seema kahi na jaaye", "dono apni darkhwaast aur seema saaf keh sakein", "chinta laute par dobara baat ka samay tay na ho"] },
  family: { en: ["a recurring responsibility defaults to you without an explicit agreement", "responsibilities and what 'done' means are shared", "the task remains yours even after capacity or timing changes"], hi: ["baar-baar ki zimmedaari bina sahmati aapki maan li jaaye", "zimmedaari aur 'poora' hone ka matlab baanta jaaye", "samay ya kshamata badle phir bhi kaam aapke paas rahe"] },
  wellbeing: { en: ["the plan demands more energy than is reliably available", "a small routine fits the real schedule", "the routine repeatedly drops off on the busiest days"], hi: ["yojana uplabdh urja se zyada maange", "chhoti dincharya asal samay mein fit ho", "sabse vyast dinon mein dincharya baar-baar chhoot jaaye"] },
  purpose: { en: ["time keeps going to an obligation with no agreed outcome", "the next commitment matches written priorities", "a commitment continues without moving a stated priority"], hi: ["bina tay nateeje ke ek vaada samay leta rahe", "agla vaada likhi prathmikta se mile", "koi vaada jaari rahe par bataayi prathmikta na badhe"] },
  creativity: { en: ["polishing expands while nothing is released for feedback", "one finished piece is shared before more polishing", "a draft stays private while its scope keeps expanding"], hi: ["sanvaar badhe par pratikriya ke liye kuch nikle nahi", "aur sanvaarne se pehle ek poora kaam dikhe", "kaam ka daayra badhe par draft saamne na aaye"] },
};

function clean(value: string): string {
  return value.trim().replace(/[.!?]+$/, "");
}

export function buildPremiumReport(input: {
  profile: Profile;
  reading: FullReading;
  context: LifeContext | null;
  year: number;
  month?: number;
  lang: ReportLanguage;
}): {
  evidence: ReportEvidence[];
  summary: string;
  focus: string | null;
  cycle: number;
  cycleLens: string;
  cycleMethod: string;
  keyQuestion: string;
  userFacts: string[];
  timeline: { year: number; area: string; note: string; cycle: number }[];
  timelinePattern: string | null;
  remedy: { practice: string; caution: string } | null;
  patternQuestion: string | null;
  scenarios: ReportScenario[];
  months: ReportMonth[];
  monthAnchor: string | null;
  calculations: { label: string; value: number; steps: string[] }[];
  pinnacles: FullReading["pinnacles"];
  challenges: FullReading["challenges"];
  pinnacleSteps: string[];
  challengeSteps: string[];
  convergence: { repeated: number[]; distinct: number[]; preservedMasters: { number: number; positions: string[] }[] };
} {
  const { context, profile, reading, year, lang } = input;
  const hi = lang === "hi";
  const startMonth = Number.isInteger(input.month) && input.month! >= 1 && input.month! <= 12 ? input.month! : 1;
  const month = Number(profile.birthDate.slice(5, 7));
  const day = Number(profile.birthDate.slice(8, 10));
  const cycle = personalYearFor(month, day, year);
  const cycleLens = (LENSES[cycle] ?? LENSES[reduceFully(cycle)] ?? LENSES[1])[lang];
  const focus = context ? FOCUS[context.focus][lang] : null;
  const focusCrossroad = context ? context.focus === "career" || context.focus === "creativity"
    ? context.careerCrossroad
    : context.focus === "money"
      ? context.moneyCrossroad
      : context.focus === "relationships" || context.focus === "family"
        ? context.relationshipCrossroad
        : undefined : undefined;
  const hasPersonalContext = !!context && !!(
    context.currentChallenge.trim() || context.desiredOutcome.trim() || context.importantDecision.trim() ||
    context.anchors.some((a) => a.note.trim()) || focusCrossroad?.trim()
  );
  const focusCrossroadText = focusCrossroad?.trim() ?? "";
  const decisionInView = context?.importantDecision.trim() || focusCrossroad?.trim() || "";
  const evidence: ReportEvidence[] = [
    { kind: "calculated", label: hi ? `Janm-tithi aur naam se nikle ank · ${nameMappingLabel(profile.system)} naam-table` : `Numbers calculated from date and name · ${nameMappingLabel(profile.system)} name table` },
    ...(context ? [{ kind: "customer" as const, label: hi ? "Aapke dwara diya gaya sandarbh" : "Context you supplied" }] : []),
    { kind: "tradition", label: hi ? "Paramparagat numerology lens; vaigyanik roop se siddh bhavishyavaani nahi" : "Traditional numerology lens; not a scientifically established forecast" },
    { kind: hasPersonalContext ? "scenario" : "insufficient", label: hasPersonalContext ? (hi ? "Shart-aadhaarit planning drishya" : "Conditional planning scenarios") : (hi ? "Vyaktigat ghatna ka daava karne ke liye sandarbh kam hai" : "Not enough context to make a personal claim") },
  ];
  const summary = !context || !hasPersonalContext
    ? hi
      ? `Aapke mukhya ank nikaale gaye hain, par aapki vartamaan sthiti ya mahatvapurn ateet ke baare mein paryapt jaankari nahi hai. Isliye yeh report koi chhupi hui ghatna jaanne ka daava nahi karti. Personal Year ${cycle} ka paramparagat lens ${cycleLens} hai—ise apne agle faisle par sochne ka sawaal samjhein.`
      : `Your core numbers are calculated, but there is not enough information about your current situation or important past events to make a personal claim. This report will not pretend to uncover hidden events. The traditional lens for Personal Year ${cycle} is ${cycleLens}—use it as a question for a decision, not as a prediction.`
    : hi
      ? `Aapne ${focus} ko chuna${context.currentChallenge.trim() ? ` aur apni vartamaan uljhan “${clean(context.currentChallenge)}” bataayi` : ""}${focusCrossroad?.trim() ? `; is kshetra ka saamne ka sawaal “${clean(focusCrossroad)}” hai` : ""}${context.desiredOutcome.trim() ? `; aapka iraada “${clean(context.desiredOutcome)}” hai` : ""}. Personal Year ${cycle} ka paramparagat lens ${cycleLens} hai. Ank aapki baat ko kaaran ya bhavishyavaani nahi banate—neeche ke drishya aapki sthiti ko alag-alag sambhavnayon se parakhne ke liye hain.`
      : `You selected ${focus}${context.currentChallenge.trim() ? ` and described the live tension as “${clean(context.currentChallenge)}”` : ""}${focusCrossroad?.trim() ? `; the specific crossroads you named is “${clean(focusCrossroad)}”` : ""}${context.desiredOutcome.trim() ? `; your stated aim is “${clean(context.desiredOutcome)}”` : ""}. The traditional lens for Personal Year ${cycle} is ${cycleLens}. The numbers do not cause or predict your circumstances; the scenarios below test your stated situation from several angles.`;
  const scenarios = context && hasPersonalContext ? LENSES_BY_FOCUS[context.focus][lang].map((condition, index) => ({
    title: hi ? ["Agar yeh uljhan bani rahe", "Ek chhota mauka jaanchein", "Agar yeh sanket dikhe"][index] : ["If this pressure point holds", "Test a small opening", "If this risk signal appears"][index],
    horizon: hi ? ["Agle 7 din · nazar rakhein", "Agle 7 din · chhota parikshan", "Agle 30 din · seema tay karein"][index] : ["Next 7 days · observe", "Next 7 days · small test", "Next 30 days · set a boundary"][index],
    basis: hi
      ? `Aapke diye sandarbh: chuna hua kshetra (${focus})${context.currentChallenge.trim() ? `; vartamaan uljhan “${clean(context.currentChallenge)}”` : ""}${focusCrossroadText ? `; ${focus} ka aapka khaas sawaal “${clean(focusCrossroadText)}”` : ""}${decisionInView && decisionInView !== focusCrossroadText ? `; saamne ka faisla “${clean(decisionInView)}”` : ""}${context.desiredOutcome.trim() ? `; iraada “${clean(context.desiredOutcome)}”` : ""}. Alag se, Personal Year ${cycle} ka paramparagat lens “${cycleLens}” hai. Yeh lens drishya ki sambhaavna ya naukri/faisle ka nateeja nahi batata.`
      : `Your stated inputs: selected area (${focus})${context.currentChallenge.trim() ? `; current challenge (“${clean(context.currentChallenge)}”)` : ""}${focusCrossroadText ? `; specific ${focus} context (“${clean(focusCrossroadText)}”)` : ""}${decisionInView && decisionInView !== focusCrossroadText ? `; decision in view (“${clean(decisionInView)}”)` : ""}${context.desiredOutcome.trim() ? `; stated aim (“${clean(context.desiredOutcome)}”)` : ""}. Separately, Personal Year ${cycle} supplies the traditional lens “${cycleLens}”; it does not establish this scenario's likelihood or a job/decision outcome.`,
    condition: decisionInView
      ? (hi ? `Aapke faisle “${clean(decisionInView)}” ke sandarbh mein dekhein: ${condition}.` : `For the decision you named (“${clean(decisionInView)}”), check whether: ${condition}.`)
      : condition,
    upside: hi ? ["Aap bina bada jokhim liye zaroori jaankari paa sakte hain.", "Chhota parikshan faisle se pehle pratikriya de sakta hai.", "Pehle se seema tay karne par nuksaan ko simit rakh sakte hain."][index] : ["You may gain useful information without taking a large risk.", "A small test can give feedback before a major commitment.", "Naming the limit early can contain avoidable cost."][index],
    downside: hi ? ["Bina jaanch ke wahi uljhan chalti reh sakti hai.", "Chhota prayog bhi samay ya dhyaan le sakta hai.", "Sirf is jokhim par dhyaan dene se achha mauka chhoot sakta hai."][index] : ["The same friction may continue if nothing is checked.", "Even a small experiment can cost time or attention.", "Focusing only on this risk could make you miss a useful opening."][index],
    signal: condition,
    counterSignal: hi ? ["Yeh drishya kam sambhav lagega agar agle 2–4 hafton mein sharton ya zimmedaariyon mein saaf badlaav aaye.", "Yeh mauka kam prasangik hoga agar pratikriya na aaye ya lakshya badal jaaye.", "Yeh jokhim kam hoga agar kharch, sahmati aur samay-seema pehle saaf hon."][index] : ["This scenario becomes less relevant if terms or responsibilities clearly change in the next 2–4 weeks.", "This opening matters less if feedback does not arrive or your goal changes.", "This risk is lower when cost, consent, and timeline are explicit up front."][index],
    nextStep: hi ? ["Ek likhit maapdand aur do hafton baad samiksha ki tareekh chunein.", "Kam kharch wala 14–30 din ka parikshan tay karein.", "Aage badhne se pehle ek seema, zimmedaar vyakti aur rukne ka niyam likhein."][index] : ["Choose one written measure and a review date two weeks from now.", "Set a low-cost 14–30 day experiment.", "Before proceeding, write down one limit, owner, and stop condition."][index],
  })) : [];
  const months: ReportMonth[] = upcomingMonths(month, day, year, startMonth, 12).map((cycleMonth) => {
    const pm = personalMonth(cycleMonth.personalYear, cycleMonth.month);
    const normalized = reduceFully(cycleMonth.personalMonth);
    const number = MONTH_PROMPTS[normalized] ? normalized : 1;
    const prompt = MONTH_PROMPTS[number] ?? MONTH_PROMPTS[1];
    return {
      ...cycleMonth,
      label: `${MONTH_NAMES[lang][cycleMonth.month - 1]} ${cycleMonth.year}`,
      lens: (MONTH_LENSES[number] ?? MONTH_LENSES[1])[lang],
      question: prompt.question[lang],
      move: prompt.move[lang],
      watchOut: prompt.watchOut[lang],
      calculation: pm.steps.join("; "),
    };
  });
  const anchorParts = context && hasPersonalContext ? [
    context.importantDecision.trim() ? `${hi ? "Saamne ka faisla" : "Decision in view"}: “${clean(context.importantDecision)}”` : "",
    context.desiredOutcome.trim() ? `${hi ? "Aapka iraada" : "Your stated aim"}: “${clean(context.desiredOutcome)}”` : "",
    !context.importantDecision.trim() && !context.desiredOutcome.trim() && context.currentChallenge.trim() ? `${hi ? "Vartamaan uljhan" : "Current challenge"}: “${clean(context.currentChallenge)}”` : "",
  ].filter(Boolean) : [];
  const monthAnchor = anchorParts.length
    ? (hi ? `Is calendar ko aapke diye sandarbh ke saath padhein — ${anchorParts.join("; ")}. Yeh ank inmein se kisi nateeje ko hone ka daava nahi karte.` : `Read this calendar alongside the context you supplied — ${anchorParts.join("; ")}. The numbers do not claim that any outcome will occur.`)
    : null;
  const userFacts = context ? [
    ...(context.currentChallenge.trim() ? [`${hi ? "Aapki bataayi vartamaan uljhan" : "Current challenge you reported"}: “${clean(context.currentChallenge)}”`] : []),
    ...(context.desiredOutcome.trim() ? [`${hi ? "Aapka lakshya" : "Your stated aim"}: “${clean(context.desiredOutcome)}”`] : []),
    ...(context.importantDecision.trim() ? [`${hi ? "Aapka mahatvapurn faisla" : "Decision you are weighing"}: “${clean(context.importantDecision)}”`] : []),
    ...(focusCrossroad?.trim() ? [`${hi ? `Aapka ${focus} se juda crossroads` : `Crossroads you reported in ${focus}`}: “${clean(focusCrossroad)}”`] : []),
    ...(context.focus === "career" || context.focus === "creativity" ? context.workStyle ? [`${hi ? "Aapka bataya work-style" : "Work style you selected"}: ${context.workStyle}`] : [] : []),
    ...(context.focus === "relationships" || context.focus === "family" ? context.relationshipStyle ? [`${hi ? "Rishton ki aapki batayi prathmikta" : "Relationship priority you selected"}: ${context.relationshipStyle}`] : [] : []),
    ...(context.focus === "money" && context.moneyStyle ? [`${hi ? "Paison ke faisle ka aapka tareeka" : "Money approach you selected"}: ${context.moneyStyle}`] : []),
    ...(context.energyLevel ? [`${hi ? "Aapki self-rated urja" : "Energy you rated"}: ${context.energyLevel}/5`] : []),
    ...(context.stressLevel ? [`${hi ? "Aapka self-rated tanaav" : "Stress you rated"}: ${context.stressLevel}/5`] : []),
  ] : [];
  const anchors = context?.anchors.filter((a) => a.note.trim()) ?? [];
  for (const anchor of anchors) userFacts.push(`${anchor.year} · ${FOCUS[anchor.area][lang]} · “${clean(anchor.note)}”`);
  const patternQuestion = context && (context.currentChallenge.trim() || context.importantDecision.trim() || focusCrossroad?.trim())
    ? context.focus === "career" || context.focus === "creativity"
      ? (hi ? `Jaanchne layak sawaal: aapki bataayi rukavat ka bada hissa kaam ki maatra hai, faisle par kam adhikaar hai, ya bina rukawat dhyaan ka samay nahi milta? In teenon ke hal alag hain. Pehle ek haal ki misaal se parakhein.` : `A testable question: is the main friction you described the amount of work, limited authority over decisions, or too little uninterrupted focus time? Each calls for a different response. Check one recent example before treating it as a pattern.`)
      : context.focus === "relationships" || context.focus === "family"
        ? (hi ? `Jaanchne layak sawaal: jis zaroorat ya seema ka aapne zikr kiya, kya use saamne waale ko khaas shabdon mein bataya gaya? Agar nahi, pehle ek saaf darkhwaast karke pratikriya dekhein.` : `A testable question: has the need or boundary you mentioned been stated to the other person in concrete terms? If not, try one clear request and observe the response before inferring intent.`)
        : context.focus === "money"
          ? (hi ? `Jaanchne layak sawaal: kya aapke saamne poori lagat, samay-seema aur palatne ki gunjaish likhit hai? Ank kisi nivesh ya kharche ki suraksha nahi bataate.` : `A testable question: are the full cost, timeline, and reversibility written down? Numbers here cannot establish whether a purchase or investment is safe.`)
          : (hi ? `Jaanchne layak sawaal: aapke lakshya ki taraf kaunsa chhota kadam agle do hafton mein dekha ja sakta hai? Use pehle se likhein, baad mein arth na ghadhein.` : `A testable question: what small step toward your goal could you observe in the next two weeks? Define it now rather than fitting a story to the outcome later.`)
    : null;
  const core = [
    { label: hi ? "Jeevan Path" : "Life Path", value: reading.lifePath.number, steps: reading.lifePath.steps },
    { label: hi ? "Abhivyakti" : "Expression", value: reading.nameNumbers.expression, steps: reading.nameNumbers.expressionSteps },
    { label: hi ? "Antarman" : "Soul Urge", value: reading.nameNumbers.soulUrge, steps: reading.nameNumbers.soulUrgeSteps },
    { label: hi ? "Vyaktitva" : "Personality", value: reading.nameNumbers.personality, steps: reading.nameNumbers.personalitySteps },
    { label: hi ? "Janmank" : "Birthday Number", value: reading.birthday.number, steps: reading.birthday.steps },
    { label: hi ? "Paripakvata" : "Maturity", value: reading.maturity.number, steps: reading.maturity.steps },
  ];
  const counts = new Map<number, number>();
  core.forEach((item) => counts.set(item.value, (counts.get(item.value) ?? 0) + 1));
  const preservedMasters = [...new Set(core.map((item) => item.value).filter((value) => value === 11 || value === 22 || value === 33))]
    .map((number) => ({ number, positions: core.filter((item) => item.value === number).map((item) => item.label) }));
  return {
    evidence,
    summary,
    focus,
    cycle,
    cycleLens,
    cycleMethod: hi ? `Calendar-year paddhati (1 Jan–31 Dec): janm ka mahina (${month}), din (${day}) aur saal (${year}) pehle alag ghataaye jaate hain; phir yog ghataate hain. Is paddhati mein 11/22/33 bach sakte hain.` : `Calendar-year convention (Jan 1–Dec 31): reduce the birth month (${month}), birth day (${day}), and year (${year}) separately; add those results and reduce the sum. This method preserves 11/22/33.`,
    keyQuestion: decisionInView
      ? (hi ? `Faisle “${clean(decisionInView)}” ko aage badhane se pehle, agle 30 din mein kaunsa chhota parinaam aapka lakshya dikhayega?` : `Before advancing “${clean(decisionInView)}”, what small result in the next 30 days would show progress toward your aim?`)
      : (hi ? `Agle 30 din mein ${focus ?? ("aapki prathmikta")} mein kaunsa chhota, naapne-yogya kadam aapke iraade ko aage badhaayega?` : `What small, measurable step in ${focus ?? "your priority"} would move your stated intention forward in the next 30 days?`),
    userFacts,
    timeline: anchors.map((anchor) => ({
      year: anchor.year,
      area: FOCUS[anchor.area][lang],
      note: clean(anchor.note),
      cycle: personalYearFor(month, day, anchor.year),
    })),
    timelinePattern: anchors.length < 2
      ? (anchors.length === 1 ? (hi ? "Sirf ek turning point diya gaya hai. Ek date-cycle akela pattern ya ghatna ka sabab nahi batata." : "You have shared one turning point. A single date-cycle does not establish a pattern or cause.") : null)
      : (() => {
          const groups = new Map<number, number[]>();
          for (const anchor of anchors) {
            const value = personalYearFor(month, day, anchor.year);
            groups.set(value, [...(groups.get(value) ?? []), anchor.year]);
          }
          const repeated = [...groups.entries()].filter(([, years]) => years.length > 1);
          return repeated.length
            ? (hi ? `Aapke diye hue saalon mein ${repeated.map(([number, years]) => `${years.join(" aur ")} (Personal Year ${number})`).join("; ")} cycle dohraate hain. Asli halaat ya faisle milte the ya nahi, yeh aapke notes se alag jaanchna hoga—cycle kaaran nahi.` : `Among the years you supplied, ${repeated.map(([number, years]) => `${years.join(" and ")} (Personal Year ${number})`).join("; ")} share a cycle number. Check separately whether the real circumstances or decisions were similar; the cycle is not a cause.`)
            : (hi ? "Aapke chune saal alag Personal Year cycles mein aate hain; diye gaye notes mein abhi koi cycle dohraav nahi." : "The years you chose fall in different Personal Year cycles; the notes supplied do not show a repeated cycle.");
        })(),
    remedy: context ? {
      practice: context.stressLevel && context.stressLevel >= 4
        ? (hi ? `${focusAction(context.focus, lang)} Tanaav zyada ho toh ise ek chhote, palatne-yogya kadam tak seemit rakhein.` : `${focusAction(context.focus, lang)} With stress feeling high, keep it to one small, reversible step.`)
        : focusAction(context.focus, lang),
      caution: cycleCaution(reduceFully(cycle), lang),
    } : null,
    patternQuestion,
    scenarios,
    months,
    monthAnchor,
    calculations: core,
    pinnacles: reading.pinnacles,
    challenges: reading.challenges,
    pinnacleSteps: reading.pinnacleSteps,
    challengeSteps: reading.challengeSteps,
    convergence: {
      repeated: [...counts.entries()].filter(([, count]) => count > 1).map(([number]) => number),
      distinct: [...counts.entries()].filter(([, count]) => count === 1).map(([number]) => number),
      preservedMasters,
    },
  };
}
