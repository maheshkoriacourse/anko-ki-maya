import { personalYear } from "./numerology";
import type { LifeContext, LifeFocus } from "./storage";

export type InsightConfidence = "Strong pattern" | "Emerging pattern" | "Reflection prompt";

export interface PersonalInsight {
  id: string;
  title: string;
  domain: LifeFocus;
  timeframe: string;
  source_numbers: string[];
  source_user_context: string[];
  interpretation: string;
  confidence_label: InsightConfidence;
  what_would_change_this: string;
  signal_to_watch: string;
  practical_action: string;
  disclaimer: string;
}

const FOCUS: Record<LifeFocus, { en: string; hi: string }> = {
  career: { en: "career or business", hi: "career ya business" },
  money: { en: "money and stability", hi: "paisa aur sthirta" },
  relationships: { en: "relationships", hi: "rishte" },
  family: { en: "family and responsibility", hi: "parivaar aur zimmedaari" },
  wellbeing: { en: "energy and routine", hi: "urja aur dincharya" },
  purpose: { en: "direction and purpose", hi: "disha aur uddeshya" },
  creativity: { en: "creative work", hi: "rachnatmak kaam" },
};

const CYCLE: Record<number, { en: string; hi: string }> = {
  1: { en: "initiative and a clear beginning", hi: "pehal aur saaf shuruaat" },
  2: { en: "patience, cooperation, and careful listening", hi: "dhairya, saajhedaari aur dhyaan se sunna" },
  3: { en: "expression, learning, and visibility", hi: "abhivyakti, seekhna aur saamne aana" },
  4: { en: "systems, steady effort, and practical foundations", hi: "vyavastha, lagataar mehnat aur mazboot neev" },
  5: { en: "experimentation, movement, and flexibility", hi: "naye prayog, gati aur lachilepan" },
  6: { en: "care, commitments, and shared responsibility", hi: "dekhbhaal, vaade aur saanjhi zimmedaari" },
  7: { en: "study, reflection, and refinement", hi: "adhyayan, manan aur sudhaar" },
  8: { en: "leadership, accountability, and measured ambition", hi: "netritva, jawaabdehi aur sochi-samjhi mahatvaakaanksha" },
  9: { en: "completion, review, and making room for a next chapter", hi: "samaapan, samiksha aur agle adhyay ke liye jagah" },
};

const ACTION: Record<LifeFocus, { en: string; hi: string }> = {
  career: { en: "Choose one opportunity to examine. Write down its scope, decision owner, timeline, and what support you need before you commit.", hi: "Ek mauke ko parakhne ke liye uska daayra, faisla lene waala, samay-seema aur zaroori sahaara likhkar hi haan kahein." },
  money: { en: "For four weeks, record income, spending, and fixed commitments. Use the record to ask a better question; do not treat this reading as financial advice.", hi: "Chaar hafton tak aamdani, kharch aur pakke vaade likhein. Is hisaab se behtar sawaal poochhein; reading ko aarthik salaah na samjhein." },
  relationships: { en: "Choose one conversation. Make one specific request, name one boundary, and agree on a follow-up date.", hi: "Ek baat-cheet chunein. Ek saaf darkhwaast, ek seema aur dobara baat karne ki tareekh tay karein." },
  family: { en: "Write one recurring responsibility, what ‘done’ means, and who shares it. Renegotiate one unclear expectation.", hi: "Ek baar-baar aane waali zimmedaari aur uska poora hona kaisa dikhega, likhein. Ek aspasht ummeed par baat karein." },
  wellbeing: { en: "Choose one small routine you can repeat for two weeks. Track how it fits your day; this is reflection, not health guidance.", hi: "Do hafton tak dohra sakne waali ek chhoti dincharya chunein. Dekhein ki woh aapke din mein kaise baithti hai; yeh sehat ki salaah nahi." },
  purpose: { en: "Write three criteria for a meaningful yes. Use them to review one current commitment and one possible next step.", hi: "Kisi kaam ko haan kehne ke teen maapdand likhein. Unse ek maujooda vaade aur ek agle kadam ko parakhein." },
  creativity: { en: "Protect two short work blocks each week and publish or share one small finished piece before polishing the next.", hi: "Har hafte do chhote kaam ke samay bachayein aur agla hissa sanvaarne se pehle ek poora kaam dikhaayein." },
};

const SIGNAL: Record<LifeFocus, { en: string; hi: string }> = {
  career: { en: "A new request adds responsibility but leaves ownership, timeline, or support unclear.", hi: "Nayi maang zimmedaari badhaaye, par adhikaar, samay-seema ya sahaara saaf na kare." },
  money: { en: "A decision is being made before the full cost and timing are written down.", hi: "Poora kharch aur samay likhe bina faisla karne ka dabaav bane." },
  relationships: { en: "The same concern returns, but the next step is never agreed out loud.", hi: "Wahi chinta phir aaye, par agla kadam milkar tay na ho." },
  family: { en: "A task is treated as yours by default, without an explicit agreement.", hi: "Bina saaf sahmati ke koi kaam apne-aap aapki zimmedaari maan liya jaaye." },
  wellbeing: { en: "Your routine changes on the very days you hoped to protect for rest or focus.", hi: "Jin dinon ko aaraam ya dhyaan ke liye bachaana tha, unhi mein dincharya toot jaaye." },
  purpose: { en: "A commitment keeps taking time but no longer moves one of your stated priorities.", hi: "Koi vaada samay leta rahe, par aapki bataayi prathmikta ko aage na badhaaye." },
  creativity: { en: "Polishing expands while a finished piece stays unshared.", hi: "Sanvaarne ka samay badhta rahe, par poora kaam saamne na aaye." },
};

/** Avoid doubled punctuation when quoting customer-authored sentences. */
export function cleanQuoteText(value: string): string {
  return value.trim().replace(/[.!?]+$/, "");
}

export function personalCycleTheme(number: number, lang: "en" | "hi"): string {
  return CYCLE[number]?.[lang] ?? CYCLE[1][lang];
}

export function focusAction(focus: LifeFocus, lang: "en" | "hi"): string {
  return ACTION[focus][lang];
}

export function focusSignal(focus: LifeFocus, lang: "en" | "hi"): string {
  return SIGNAL[focus][lang];
}

export function cycleCaution(number: number, lang: "en" | "hi"): string {
  const caution: Record<number, { en: string; hi: string }> = {
    1: { en: "Avoid opening several new fronts before choosing one priority.", hi: "Kai naye kaam ek saath shuru karne se pehle ek prathmikta chunein." },
    2: { en: "Avoid treating a slow reply as a final answer; clarify expectations directly.", hi: "Der se jawaab ko antim faisla na maanein; ummeed saaf poochhein." },
    3: { en: "Avoid scattering effort across ideas before finishing one visible piece.", hi: "Ek dikhne wala kaam poora karne se pehle kai vichaaron mein na bantein." },
    4: { en: "Avoid carrying an unclear commitment without written scope or a review date.", hi: "Aspasht zimmedaari ko daayre aur samiksha-tareekh ke bina na uthaayein." },
    5: { en: "Avoid making a large irreversible change before testing the practical details.", hi: "Vyavaharik baatein jaanche bina bada aur palatna mushkil badlaav na karein." },
    6: { en: "Avoid assuming care means you must carry every responsibility alone.", hi: "Yeh na maanein ki dekhbhaal ka matlab har zimmedaari akele uthana hai." },
    7: { en: "Avoid extending research indefinitely when a small test could teach you more.", hi: "Jab chhota prayog zyada sikha sakta ho, toh jaanch ko anant na kheenchhein." },
    8: { en: "Avoid accepting bigger responsibility before terms, resources, and ownership are clear.", hi: "Shartein, saadhan aur adhikaar saaf hone se pehle badi zimmedaari na lein." },
    9: { en: "Avoid keeping an obligation alive only because you have already invested in it.", hi: "Sirf pehle se ki gayi mehnat ke kaaran kisi vaade ko jaari na rakhein." },
  };
  return caution[number]?.[lang] ?? caution[1][lang];
}

function cycleFor(context: LifeContext, year: number): number {
  const month = Number(context.birthDate.slice(5, 7));
  const day = Number(context.birthDate.slice(8, 10));
  const value = personalYear(month, day, year).number;
  return value > 9 ? value % 9 || 9 : value;
}

export function buildPersonalInsights(input: {
  context: LifeContext;
  mulank: number;
  bhagyank: number;
  currentYear: number;
  lang: "en" | "hi";
}): PersonalInsight[] {
  const { context, mulank, bhagyank, currentYear, lang } = input;
  const hi = lang === "hi";
  const focus = FOCUS[context.focus][lang];
  const currentCycle = cycleFor(context, currentYear);
  const cycleTheme = CYCLE[currentCycle][lang];
  const evidence = [
    `Mulank ${mulank}`,
    `Bhagyank ${bhagyank}`,
    `Personal Year ${currentCycle} (${currentYear})`,
  ];
  const userContext = [
    `Selected focus: ${focus}`,
    ...(context.currentChallenge ? [`Stated challenge: “${context.currentChallenge}”`] : []),
    ...(context.desiredOutcome ? [`12-month outcome: “${context.desiredOutcome}”`] : []),
    ...(context.workStyle ? [`Self-described work style: ${context.workStyle}`] : []),
    ...(context.relationshipStyle ? [`Self-described relationship priority: ${context.relationshipStyle}`] : []),
    ...(context.moneyStyle ? [`Self-described money approach: ${context.moneyStyle}`] : []),
    ...(context.energyLevel ? [`Self-rated energy lately: ${context.energyLevel}/5`] : []),
    ...(context.stressLevel ? [`Self-rated stress lately: ${context.stressLevel}/5`] : []),
  ];
  const groundedAction = context.stressLevel && context.stressLevel >= 4
    ? (hi ? `${ACTION[context.focus].hi} Tanaav zyada ho toh ise ek chhote, palatne-yogya kadam tak seemit rakhein.` : `${ACTION[context.focus].en} With stress feeling high, keep this to one small, reversible step.`)
    : context.energyLevel && context.energyLevel <= 2
      ? (hi ? `${ACTION[context.focus].hi} Kam urja ke dinon ke liye halka version chunein; ise sehat ki salah na maanein.` : `${ACTION[context.focus].en} Choose a lighter version for low-energy days; this is not health advice.`)
      : ACTION[context.focus][lang];
  const styleHypothesis = context.focus === "career" || context.focus === "creativity"
    ? context.workStyle
      ? (hi ? `Aapne kaam ka apna tareeka “${context.workStyle}” chuna. Yeh aapki pasand ka bayan hai, personality ka saboot nahi. Aapki batayi uljhan ke saath ek jaanchne layak sawaal: kya rukavat hunar se zyada kaam ke daayre, raftaar ya saath ka tareeka hai?` : `You described your work style as “${context.workStyle}”. That is your stated preference, not a personality diagnosis. Alongside the challenge you named, test whether the friction is more about scope, pace, or how the work is organised than about your ability.`)
      : ""
    : context.focus === "relationships" || context.focus === "family"
      ? context.relationshipStyle
        ? (hi ? `Aapne rishton mein “${context.relationshipStyle}” ko ahmiyat di. Aapki batayi hui uljhan ke saath dekhein: kya isi zaroorat ko saamne wale se saaf taur par kaha gaya hai?` : `You said “${context.relationshipStyle}” matters in relationships. Given the tension you named, check whether that need has been stated clearly to the other person.`)
        : ""
      : context.focus === "money" && context.moneyStyle
        ? (hi ? `Aapne paison ka apna tareeka “${context.moneyStyle}” bataya. Yeh aadat ka aapka nazariya hai, bhavishya ka sanket nahi. Dekhein ki aapke maujooda faisle ko kaunsa likhit hisaab behtar bana sakta hai.` : `You described your money approach as “${context.moneyStyle}”. That is self-reported context, not a forecast. Ask which written number—full cost, timing, or fixed commitment—would make the current decision clearer.`)
        : "";
  const insightOne: PersonalInsight = {
    id: `current-${context.focus}-${currentCycle}`,
    title: hi ? "Aapka vartamaan sawaal" : "The question you are carrying now",
    domain: context.focus,
    timeframe: hi ? `Personal Year ${currentCycle} · ${currentYear}` : `Personal Year ${currentCycle} · ${currentYear}`,
    source_numbers: evidence,
    source_user_context: userContext,
    interpretation: hi
      ? `${context.currentChallenge ? `Aapne apni uljhan yun bataayi: “${cleanQuoteText(context.currentChallenge)}”.` : `Aapka mukhya dhyaan ${focus} par hai.`} Is saal ka paramparagat ank-theme ${cycleTheme} hai. ${context.desiredOutcome ? `Aapka iraada hai: “${cleanQuoteText(context.desiredOutcome)}”. ` : ""}Is theme ko kisi ghatna ki bhavishyavaani nahi, balki agle faisle ko parakhne ka sawaal banaayein.`
      : `${context.currentChallenge ? `You described the live tension as “${cleanQuoteText(context.currentChallenge)}”.` : `You chose ${focus} as your main focus.`} ${styleHypothesis} The traditional theme for this cycle is ${cycleTheme}. ${context.desiredOutcome ? `You said you want to “${cleanQuoteText(context.desiredOutcome)}”. ` : ""}Use that theme as a question for your next decision, not as a forecast of an event.`,
    confidence_label: "Reflection prompt",
    what_would_change_this: hi ? "Aapka challenge ya iraada badle, ya yeh cycle-theme aapke anubhav se na mile, toh is nateeje ko update karein." : "Update this reading if your challenge or goal changes, or if this cycle theme does not match your experience.",
    signal_to_watch: SIGNAL[context.focus][lang],
    practical_action: groundedAction,
    disclaimer: hi ? "Paramparagat ank-vyakhya; nishchit bhavishyavaani nahi." : "Traditional numerology interpretation; not a certain prediction.",
  };

  const anchors = context.anchors.filter((anchor) => anchor.note.trim());
  const anchorCycles = anchors.map((anchor) => ({ anchor, cycle: cycleFor(context, anchor.year) }));
  const counts = new Map<number, number>();
  for (const item of anchorCycles) counts.set(item.cycle, (counts.get(item.cycle) ?? 0) + 1);
  const repeated = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0] - b[0])[0];
  const hasRepeat = anchors.length >= 2 && (repeated?.[1] ?? 0) >= 2;
  const insightTwo: PersonalInsight = {
    id: `timeline-${repeated?.[0] ?? "anchors"}`,
    title: hi ? "Aapki timeline mein dikh raha dhaaga" : "A thread in the timeline you marked",
    domain: anchors[0]?.area ?? context.focus,
    timeframe: anchors.length ? anchors.map((item) => String(item.year)).join(" · ") : (hi ? "Aapke chune hue saal" : "Your selected years"),
    source_numbers: anchors.length ? anchorCycles.map(({ anchor, cycle }) => `${anchor.year}: Personal Year ${cycle}`) : evidence,
    source_user_context: anchors.map((anchor) => `${anchor.year}: ${anchor.note}`),
    interpretation: anchors.length >= 2 && hasRepeat
      ? hi
        ? `${repeated?.[1]} mein se ${anchors.length} chune hue saal Personal Year ${repeated?.[0]} mein aate hain. Yeh aapki dates mein ek cycle ka dohraav hai. Dekhein ki un saalon ke vaastavik halaat mein koi milta-julta faisla ya zimmedaari thi—ank ko kaaran na maan kar.`
        : `${repeated?.[1]} of the ${anchors.length} years you marked fall in Personal Year ${repeated?.[0]}. That is a cycle recurrence in the dates you supplied. Check whether the real circumstances shared a decision or responsibility; the number itself is not a cause.`
      : anchors.length >= 2
        ? hi
          ? "Aapke chune hue saal alag-alag Personal Year cycles mein aate hain; abhi ek cycle ka dohraav nahi dikh raha. Asli halaat ko compare karein—sirf ank milna pattern ka saboot nahi."
          : "The years you chose fall in different Personal Year cycles; there is no repeated cycle yet. Compare the real circumstances—shared numbers alone do not establish a pattern."
        : hi
        ? "Abhi ek ya usse kam turning point joda hai. Isse pattern ka daava nahi banega. Doosra ya teesra waaqiya jodne par unke ank-cycle saath dekh sakte hain."
        : "You have added fewer than two turning points, so there is not enough evidence to call this a pattern. Add another moment and compare the cycles against the actual circumstances.",
    confidence_label: "Reflection prompt",
    what_would_change_this: hi ? "Kisi saal ya note ko badlein, ya koi cycle match na lage, toh timeline pattern bhi badal jaayega." : "Changing a year or note—or deciding a cycle does not fit—changes this timeline reflection.",
    signal_to_watch: hi ? "Kya aapke note ki hui ghatnaon mein milta-julta faisla, paristhiti ya bhoomika thi?" : "Did the moments you marked share a decision, circumstance, or role in real life?",
    practical_action: hi ? "Har chune hue saal ke saamne ek line likhein: us waqt kya badla, aur aapne kya chuna?" : "Add one line beside each year: what changed in real life, and what choice did you make?",
    disclaimer: hi ? "Yeh aapke diye hue saalon ka ganit hai; kaaran ya pramaan nahi." : "This calculation compares the years you entered; it does not establish cause or proof.",
  };

  const outcome = context.desiredOutcome || (hi ? "apna chuna hua lakshya" : "your stated outcome");
  const decision = context.importantDecision;
  const insightThree: PersonalInsight = {
    id: `decision-${context.focus}-${currentCycle}`,
    title: hi ? "Agla kadam: 30-din ka parikshan" : "A useful next move: a 30-day test",
    domain: context.focus,
    timeframe: hi ? "Agle 30 din" : "Next 30 days",
    source_numbers: evidence,
    source_user_context: [
      ...(decision ? [`Decision being considered: “${decision}”`] : []),
      ...(context.desiredOutcome ? [`Desired outcome: “${context.desiredOutcome}”`] : []),
      ...(anchors.length ? [`${anchors.length} user-confirmed timeline anchors`] : []),
    ],
    interpretation: decision
      ? hi
        ? `Aap “${cleanQuoteText(decision)}” par vichaar kar rahe hain. Is saal ka ${cycleTheme} theme faisla nahi karega; 30 din ke chhote parikshan se dekhein ki yeh kadam “${cleanQuoteText(outcome)}” ko kitna aage badhaata hai.`
        : `You are weighing “${cleanQuoteText(decision)}”. The cycle theme of ${cycleTheme} cannot choose for you. Use a 30-day test to see whether this step moves “${cleanQuoteText(outcome)}” forward.`
      : hi
        ? `Aapka 12-mahine ka lakshya “${cleanQuoteText(outcome)}” hai. Is cycle ke ${cycleTheme} theme ko ek naapne laayak chhote kadam se jodein, phir 30 din baad nateeja dekhein.`
        : `Your 12-month aim is “${cleanQuoteText(outcome)}”. Connect this cycle’s ${cycleTheme} theme to one measurable small step, then review the result in 30 days.`,
    confidence_label: "Reflection prompt",
    what_would_change_this: hi ? "Aapka faisla, lakshya ya uplabdh saadhan badlein toh parikshan ko bhi badlein." : "Change the experiment if your decision, goal, or available resources change.",
    signal_to_watch: hi ? "30 din mein kaunsa dikhne waala nateeja bataayega ki aap lakshya ke kareeb aaye?" : "What observable result in 30 days would show that you moved closer to the goal?",
    practical_action: ACTION[context.focus][lang],
    disclaimer: hi ? "Yeh planning ka abhyaas hai, nateeje ki guarantee nahi." : "This is a planning exercise, not a guarantee of outcome.",
  };

  return [insightOne, insightTwo, insightThree];
}
