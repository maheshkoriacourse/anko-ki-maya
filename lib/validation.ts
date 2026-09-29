/**
 * v5.1 AKASHIC DOSSIER — VALIDATION ENGINE (data layer; UI ships later).
 *
 * Canonical spec: ~/anko-ki-maya-study/AKASHIC-DOSSIER-MASTER-SPEC.md —
 * "Validation engine secret: 30-50 micro-questions tune the report before
 * generation." This module is the question BANK + the tuner:
 *
 *   1. VALIDATION_QUESTIONS — 39 definitions in narrative order (29 fixed
 *      bilingual questions + 10 DYNAMIC question factories whose text/codes
 *      are computed from the numbers: mulank, bhagyank, missing Lo Shu
 *      digits, age-window phases).
 *   2. buildValidationSet(core) — instantiates the bank for one DOB →
 *      30-50 ordered questions, deterministic per DOB (same numbers →
 *      same set, byte for byte).
 *   3. tuneWeights(answers) — YES/NO/choice answers → insight-weight
 *      adjustments {love, wealth, career, shadow} used later to reorder
 *      chapter emphasis in the dossier.
 *   4. validateSet(set) — data-layer contract gate: throws on out-of-bounds
 *      count, malformed questions, or any owner-banned construction
 *      ('may suggest' / 'theme to reflect' / 'will happen') in any text —
 *      interpret-never-predict, and no formal Devanagari हिंदी (romanized
 *      spoken Hinglish with 'aap' is the house HI voice).
 *
 * Voice rules (school law): spoken-simple EN, spoken Hinglish HI, personal
 * not clinical, master-jyotishi directness. Every question carries a
 * number-keyed evidence code (EV:M2 / EV:W21-29 / EV:S11 …).
 */

import { bhagyankFold } from "./loshu";
import { devNum } from "./navgrah";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type ValidationCategory =
  | "life-event"
  | "trait"
  | "money"
  | "relationship"
  | "fear-hope";

export interface ValidationQuestion {
  id: string;
  cat: ValidationCategory;
  textEn: string;
  textHi: string;
  kind: "yes-no" | "choice";
  /** for kind === "choice": the answer choices (EN), first = chart-lead. */
  options?: string[];
  /** parallel Hinglish choices; same length as options when present. */
  optionsHi?: string[];
  /** number-keyed evidence code, e.g. "EV:M2", "EV:W21-29", "EV:S11". */
  code: string;
}

export interface ValidationWeights {
  love: number;
  wealth: number;
  career: number;
  shadow: number;
}

export type ValidationAnswer = boolean | number | string | null;

export interface ValidationCore {
  mulank: number;
  bhagyank: number;
  namank?: number;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  ageNow: number;
}

/** A dynamic question: bilingual text + code computed from the numbers. */
export interface DynamicValidationQuestion {
  id: string;
  cat: ValidationCategory;
  kind: "yes-no" | "choice";
  make: (core: ValidationCore) => {
    textEn: string;
    textHi: string;
    options?: string[];
    optionsHi?: string[];
  };
  code: (core: ValidationCore) => string;
}

export type ValidationQuestionDef = ValidationQuestion | DynamicValidationQuestion;

export function isDynamicDef(def: ValidationQuestionDef): def is DynamicValidationQuestion {
  return "make" in def;
}

/** Number helpers (school-rule folds)                                  */
/* ------------------------------------------------------------------ */

/**
 * Fold any raw number to its grid digit using the school rule:
 * masters 11→2, 22→4, 33→6; otherwise repeated digit-sum to 1-9.
 * Malformed 0 input folds to 9 (Shani's number — the catch-all).
 */
function foldToDigit(n: number): number {
  if (n === 11) return 2;
  if (n === 22) return 4;
  if (n === 33) return 6;
  let s = n;
  while (s > 9) s = String(s).split("").reduce((a, c) => a + Number(c), 0);
  return s === 0 ? 9 : s;
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

interface GridState {
  counts: Record<number, number>;
  missing: number[];
  best: number; // most repeated digit
  bestCount: number;
}

/**
 * Lo Shu count state from the DOB (DDMMYYYY digits) + the Bhagyank digit
 * (school rule: Bhagyank bhi grid mein bharta hai) — mirrors lib/loshu.ts.
 */
function gridState(core: ValidationCore): GridState {
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  const dobStr = `${pad2(core.birthDay)}${pad2(core.birthMonth)}${core.birthYear}`;
  for (const ch of dobStr) {
    const d = Number(ch);
    if (d > 0) counts[d]++;
  }
  counts[foldToDigit(core.bhagyank)]++;
  const missing: number[] = [];
  let best = 1;
  let bestCount = -1;
  for (let d = 1; d <= 9; d++) {
    if (counts[d] === 0) missing.push(d);
    if (counts[d] > bestCount) {
      bestCount = counts[d];
      best = d;
    }
  }
  return { counts, missing, best, bestCount };
}

/** School reading order for gaps — strongest pattern-probe first. */
const MISSING_PRIORITY: number[] = [8, 4, 5, 2, 6, 7, 3, 1, 9];

function pickMissing(missing: number[]): number {
  for (const d of MISSING_PRIORITY) if (missing.includes(d)) return d;
  return 8; // unreachable when missing[] is non-empty
}

/** Age window phases per DOB — "past / inside / ahead" wording families. */
type AgePhase = "past" | "inside" | "ahead";
function agePhase(ageNow: number, start: number, end: number): AgePhase {
  if (ageNow >= end) return "past";
  if (ageNow >= start) return "inside";
  return "ahead";
}

/* ------------------------------------------------------------------ */
/* DYNAMIC question factories (10 — numbers change text, code, order)  */
/* ------------------------------------------------------------------ */

function codeWindow(a: number | string, b: number | string): string {
  return `EV:W${a}-${b}`;
}

const DYN: DynamicValidationQuestion[] = [
  {
    id: "ev-conf-window",
    cat: "life-event",
    kind: "yes-no",
    // Spec line: "Between age 21 and 29 something happened which permanently
    // changed your confidence" — window start derived from the birth day.
    code: (c) => {
      const a = 21 + (c.birthDay % 8);
      return codeWindow(a, a + 8);
    },
    make: (c) => {
      const a = 21 + (c.birthDay % 8);
      const b = a + 8;
      const ph = agePhase(c.ageNow, a, b);
      if (ph === "past") {
        return {
          textEn: `Between age ${a} and ${b}, something happened that borrowed a piece of your confidence — and it never truly came back. True?`,
          textHi: `umra ${devNum(a)} se ${devNum(b)} ke beech kuch hua tha jo aapka bharosa chhu le gaya — aur wo hissa poora wapas nahi aaya. sach?`,
        };
      }
      if (ph === "inside") {
        return {
          textEn: `You are standing inside a ${a}-${b} age window right now — the years that decide how loudly you back yourself. Something keeps testing it, doesn't it?`,
          textHi: `aap abhi ${devNum(a)}-${devNum(b)} ki umra-window mein khade ho — wahi daur jo aapke andar ke bharose ki awaaz tay karta hai. kuch na kuch imtihaan leta hai, hai na?`,
        };
      }
      return {
        textEn: `Your ${a}-${b} age window is still ahead — the stretch that decides how loudly you back yourself. You feel the weight coming, don't you?`,
        textHi: `aapki ${devNum(a)}-${devNum(b)} umra-window abhi aage padi hai — wahi daur jis mein andar wala bharosa tay hota hai. wazan ko door se mehsoos karte ho, na?`,
      };
    },
  },
  {
    id: "ev-money-window",
    cat: "life-event",
    kind: "yes-no",
    code: (c) => {
      const a = 24 + (c.birthDay % 5);
      return codeWindow(a, a + 7);
    },
    make: (c) => {
      const a = 24 + (c.birthDay % 5);
      const b = a + 7;
      const ph = agePhase(c.ageNow, a, b);
      if (ph === "past") {
        return {
          textEn: `Between ages ${a} and ${b}, money took one turn you didn't choose — a loan, a loss, or a load that landed on you. True?`,
          textHi: `umra ${devNum(a)} se ${devNum(b)} ke beech paisa ek aise mod pe aake thithka tha jo aapne chuna hi nahi — karz, khoti, ya koi bojh jo sir pe aa gaya. sach?`,
        };
      }
      if (ph === "inside") {
        return {
          textEn: `You are inside a money-rebuild phase right now (${a}-${b}) — the stretch that reorganizes who you trust with money. True?`,
          textHi: `aap abhi paisa-phir-see-banane wale daur mein ho ${devNum(a)}-${devNum(b)} — jis daur mein aapse ye khul jaata hai ki paisa kis par bharosa kare. sach?`,
        };
      }
      return {
        textEn: `Your ${a}-${b} window sits ahead — a stretch where money stops behaving simply for you. You already sense it, don't you?`,
        textHi: `aapki ${devNum(a)}-${devNum(b)} window abhi aage hai — wahi daur jis mein paisa aapke liye seedha-sada rehna chhod deta hai. andar se mehsoos kar rahe ho, na?`,
      };
    },
  },
  {
    id: "ev-recent",
    cat: "life-event",
    kind: "yes-no",
    code: (c) => {
      const span = (c.ageNow % 4) + 2;
      return codeWindow(c.birthYear + c.ageNow - span, c.birthYear + c.ageNow);
    },
    make: (c) => {
      const span = (c.ageNow % 4) + 2;
      if (span <= 2) {
        return {
          textEn: `In the last two years, one role you carried quietly ended — and almost only you noticed. True?`,
          textHi: `pichhle do saalon mein aapka ek kaam ya pehchaan ka roop chupchaap khatam ho gaya — aur uske sab se paas sirf aap hi the. sach?`,
        };
      }
      if (span === 4) {
        return {
          textEn: `These last few years took something from you that never fully came back — you don't complain about it, but you feel it. True?`,
          textHi: `pichhle chand saalon ne ek cheez aapse li hai jo poori tarah wapas nahi aayi — aap shikayat nahi karte, par mehsoos karte hain. sach?`,
        };
      }
      return {
        textEn: `The last three years rebuilt one corner of your life from zero — heavier work than any decade before them. True?`,
        textHi: `pichhle teen saalon ne aapki zindagi ka ek kona poore tareeke se zero se banaya — pichhli das saalon se bhi bhaari kaam. sach?`,
      };
    },
  },
  {
    id: "tr-mulank",
    cat: "trait",
    kind: "yes-no",
    code: (c) => `EV:M${foldToDigit(c.mulank)}`,
    make: (c) => {
      const m = foldToDigit(c.mulank);
      const M: Record<number, { en: string; hi: string }> = {
        1: {
          en: `Do people say you never really follow orders — you hear them out, then do it your own way?`,
          hi: `log kehte hain na, aap hukum poore hi nahi maante — sun lete ho par kaam apne tareeke se karte ho. sach hai kya?`,
        },
        2: {
          en: `Do people call you stubborn about details?`,
          hi: `log kehte hain na aap chhoti-chhoti baaton mein zidd karte ho — wo sach hai kya?`,
        },
        3: {
          en: `In school and at home, were you the one who always had something to say — and mostly made it land?`,
          hi: `school aur ghar, bolne wala banda aap hi rahe ho — aur aksar sahi bhi bolte ho, hai na?`,
        },
        4: {
          en: `Do people call you the planner of disasters — you prepare for what others never imagine?`,
          hi: `log kehte hain aap har musibat ka plan pehle hi bana lete ho — jo doosron ke dimaag mein aata bhi nahi. sach?`,
        },
        5: {
          en: `Have people given up predicting you — same night you cancel plans and walk a new road?`,
          hi: `log aapko padhna chhod chuke hain — raat ke andar plan cancel, aur nayi raah pe chal pade. yaad aata hai?`,
        },
        6: {
          en: `Do people say you never let go of what you've arranged — the meals, the gifts, the family calendar are fully yours?`,
          hi: `log kehte hain aap jo bhi sambhaale — intezaam, tohfe, ghar ka hisaab — usse chhodne mein marte ho. sach?`,
        },
        7: {
          en: `Do people read you wrongly as proud — because you leave the room when it fills with noise?`,
          hi: `aap bheed-bhaad se bhar e kamre chhod dete ho — aur log us akelapan ko ghamand samajh lete hain. hua hai na?`,
        },
        8: {
          en: `Have people called you slow — while you quietly finished everything they started and dropped?`,
          hi: `log aapko dheema kehte hain — aur aap chupke se sab poora kar dete ho jo aapne shuru karke chhod diya tha. sach?`,
        },
        9: {
          en: `Do conversations turn into battles around you — you cannot let a wrong claim pass uncorrected?`,
          hi: `baat-cheet aapke paas behas ban jaati hai — kisi galat baat ko jaane dete hi nahi. sach na?`,
        },
      };
      return { textEn: M[m].en, textHi: M[m].hi };
    },
  },
  {
    id: "tr-grid-gap",
    cat: "trait",
    kind: "yes-no",
    // Missing digit wording (or grid-complete → loudest repeated digit).
    code: (c) => {
      const g = gridState(c);
      return g.missing.length > 0 ? `EV:G${pickMissing(g.missing)}` : `EV:G${g.best}`;
    },
    make: (c) => {
      const g = gridState(c);
      if (g.missing.length > 0) {
        const d = pickMissing(g.missing);
        const W: Record<number, { en: string; hi: string }> = {
          1: {
            en: `Starting fresh scares you more than people think — the first step is the expensive one for you. True?`,
            hi: `naya shuru karna aapko logon ki soch se zyada daraata hai — pehla kadam hi aapse zyada le leta hai. sach?`,
          },
          2: {
            en: `You take longer to trust than most people — but once in, completely. True?`,
            hi: `bharosa aapko doosron se zyada waqt leta hai — par ek baar hua, toh poora. sach?`,
          },
          3: {
            en: `What you actually feel and what you actually say rarely match — the translation gets lost in between. True?`,
            hi: `jo mehsoos karte ho aur jo bolte ho, wo dono aksar alag hote hain — beech mein anuwad chhut jaata hai. sach?`,
          },
          4: {
            en: `You start far more than you finish — half-built plans quietly pile up around you. True?`,
            hi: `shuru chhod poora karne se zyada — adhoore plan chupchaap aapke girdhar jama ho jaate hain. sach?`,
          },
          5: {
            en: `One person's mood can turn your whole day — feelings steer you before logic does. True?`,
            hi: `ek bandhe ki chaahat aapka poora din palat sakti hai — tark se pehle bhaav chalte hain. sach?`,
          },
          6: {
            en: `Being taken care of feels uncomfortable — you are the one who takes care. True?`,
            hi: `khayal diya jaana aapko ajeeb lagta hai — aap khud hi khayal rakhne wale ho. sach?`,
          },
          7: {
            en: `Your own company is your favourite company — crowds drain you faster than work does. True?`,
            hi: `aapki pasandeeda sanggat aap khud ho — bheed bhaad, kaam se bhi jaldi drain kar deti hai. sach?`,
          },
          8: {
            en: `Money comes to you fast — and leaves faster. Earning is easy, holding is the fight. True?`,
            hi: `paisa aapke paas jaldi aata hai — aur us se bhi jaldi nikal jaata hai. kamana aasan, thamba jhagda. sach?`,
          },
          9: {
            en: `Old chapters keep running as background noise — closed, but never fully silent. True?`,
            hi: `purane chapter man ke peeche chalte hi rehte hain — band ho gaye, par khamosh kabhi nahi hue. sach?`,
          },
        };
        return { textEn: W[d].en, textHi: W[d].hi };
      }
      // Grid complete — the lou repetition probe (rare DOBs).
      return {
        textEn: `The number ${g.best} repeats ${g.bestCount} times in your grid — one demand in you speaks louder than everything else. Does it run most of your decisions?`,
        textHi: `aapke grid mein ${devNum(g.best)} ka dohrav ${devNum(g.bestCount)} baar hai — aapke andar ek bhook sab se oonchi bolati hai. faislon ka rukh bhi wahi chalata hai, hai na?`,
      };
    },
  },
  {
    id: "mon-golden",
    cat: "money",
    kind: "yes-no",
    // Golden diagonal 2-4-6-8 (school's money diagonal) complete or open.
    code: () => "EV:GOLDEN",
    make: (c) => {
      const g = gridState(c);
      const complete = [2, 4, 6, 8].every((d) => g.counts[d] > 0);
      if (complete) {
        return {
          textEn: `Money reaches you in waves — it comes big, and it goes big. Sab aata hai, sab jaata hai. Is your pocket the same?`,
          textHi: `paisa aapke paas lehar ki tarah aata hai — bada aata hai, aur bada bhi jaata hai. aapki jeb bhi aisi hi hai kya?`,
        };
      }
      return {
        textEn: `Holding money is harder for you than earning it — the muscle of keeping is the one that aches. True?`,
        textHi: `paisa banana aapke liye rakhne se aasan hai — jama karne wali koshish hi peede me dukhti hai. sach?`,
      };
    },
  },
  {
    id: "rel-family",
    cat: "relationship",
    kind: "yes-no",
    code: (c) =>
      c.namank != null ? `EV:N${foldToDigit(c.namank)}` : `EV:B${foldToDigit(c.bhagyank)}`,
    make: (c) => {
      const raw = c.namank != null ? c.namank : c.bhagyank;
      const f = foldToDigit(raw);
      if (f <= 3) {
        return {
          textEn: `New bonds, you enter whole-heart — full devotion first, careful thought after. That order has cost you more than once, hasn't it?`,
          textHi: `naye rishton mein aap poore dil se ghus-te ho — pehle sab kuch, savdhaan baad mein. isi tareeke se aapki chot bhi baar-baar lagi. hai na?`,
        };
      }
      if (f <= 6) {
        return {
          textEn: `You give more in your relationships than you take — on purpose, not out of habit. True?`,
          textHi: `rishton mein aap dena zyada karte ho, lena kam — majboori se nahi, munaasbat se. sach?`,
        };
      }
      return {
        textEn: `After the first closeness, you pull back one step — even when the other person did nothing wrong. True?`,
        textHi: `shuruaati karebi ke baad aap ek kadam peeche khinche ho — chahe doosre ne kuch galat kiya hi na ho. sach?`,
      };
    },
  },
  {
    id: "rel-care-6",
    cat: "relationship",
    kind: "yes-no",
    // Digit 6 = Shukra's care seat in the grid — present vs missing pattern.
    code: () => "EV:G6",
    make: (c) => {
      const g = gridState(c);
      if (g.counts[6] > 0) {
        return {
          textEn: `In your home, one job is simply assumed to be yours — someone's care, the running of the table. It doesn't run without you. True?`,
          textHi: `ghar mein ek kaam pakka aapka hi maana jaata hai — kisi ka khayal, poori ghadi ka intezaam. aapke bina wo chalta hi nahi. sach kya?`,
        };
      }
      return {
        textEn: `You take care of people beautifully — asking to be taken care of is the part you never learned. True?`,
        textHi: `khayal rakhna aap achhi tarah jaante ho — par aapse khayal maangna, wahi sabak aapne kabhi paaya hi nahi. sach?`,
      };
    },
  },
  {
    id: "fh-fear-choice",
    cat: "fear-hope",
    kind: "choice",
    // Options are ordered by mulank: YOUR signature fear leads the list.
    code: (c) => `EV:F${foldToDigit(c.mulank)}`,
    make: (c) => {
      const m = foldToDigit(c.mulank);
      const F: Record<number, { en: string; hi: string }> = {
        1: { en: `Being told what to do by someone I don't respect`, hi: `mujhe unse hukum milna jo aap meri nazar se neeche hain` },
        2: { en: `Being needed, then quietly dropped`, hi: `zaroorat ke waqt chahiye, poore hone pe chupke se chhod diya jana` },
        3: { en: `Being talked over — my words landing too late`, hi: `mere shabd adhoore pade rahein — baat aage bad jaaye` },
        4: { en: `Doing everything right — and still being doubted`, hi: `sab sahi karun — aur phir bhi shak rahe` },
        5: { en: `Staying in one room, one life, one more year`, hi: `ek hi kamre mein ek aur saal beet jaaye` },
        6: { en: `Carrying people who never carry me back`, hi: `jinhe main uthaun, wo mujhe kabhi na uthayein` },
        7: { en: `Being fully known — and still misread`, hi: `poora jaan liya jaaye — aur phir bhi galat samjha jaoon` },
        8: { en: `Losing what I built — slowly, in public`, hi: `jo banaya hai, dheere-dheere sabke saamne choot jaaye` },
        9: { en: `Burning out while everyone still calls me strong`, hi: `andar se tapaun — aur duniya kahe 'strong' hi` },
      };
      return {
        textEn: `Which of these walks beside you most quietly? Pick the truest one.`,
        textHi: `kaun sa dar sab se chupchaap aapke saath chalta hai? sab se suchee chuno.`,
        options: [
          F[m].en,
          `Being wrong in front of the people who doubted me`,
          `Being alone when it actually matters`,
          `Losing the respect I built, over one honest slip`,
        ],
        optionsHi: [
          F[m].hi,
          `jinhone shaak kiya tha, unke saamne galat ho jaana`,
          `asli waqt pe bilkul akele reh jaana`,
          `ek sachchi chook pe — jo izzat bani hai, wo chheen li jaana`,
        ],
      };
    },
  },
  {
    id: "fh-next-year",
    cat: "fear-hope",
    kind: "yes-no",
    // Hope probe for the coming Personal Year (school: month + day + year).
    code: (c) => `EV:PY${bhagyankFold(c.birthYear + 1, c.birthMonth, c.birthDay)}`,
    make: (c) => {
      const p = bhagyankFold(c.birthYear + 1, c.birthMonth, c.birthDay);
      const P: Record<number, { en: string; hi: string }> = {
        1: {
          en: `Something in your life is quietly restarting right now — a phase closing so the next one can open. Do you feel it?`,
          hi: `aapki zindagi mein abhi kuch chupchaap dobara shuru ho raha hai — ek phase band, agla khunle ko. mehsoos ho raha hai?`,
        },
        2: {
          en: `This stretch is teaching you a patience you never wanted to learn — but the bonds are growing deeper for it. True?`,
          hi: `ye daur aapko wo sabar sikhane ka haq rakhata hai jo aapne kabhi maanga hi nahi tha — par bandhan isi se aur gehre ho rahe hain. sach?`,
        },
        3: {
          en: `You are being pushed to speak and be seen beyond what's comfortable — growth sounds loud around you now. Feeling it?`,
          hi: `aapse bole jaane aur dikhe jaane pe zor lag raha hai — aaram dene se bhi zyada. badlav wale din ab shor ke saath aate hain. mehsoos ho raha?`,
        },
        4: {
          en: `This year's work is foundation — slow, heavy, un-glamorous; the part everyone skips and you can't. True?`,
          hi: `is saal ka kaam neev ka hai — dheema, bhaari, jis par koi taali bajaata bhi nahi; par jo aap chhod hi nahi sakte. sach?`,
        },
        5: {
          en: `Change has circled you all year — plans keep bending, and somehow you keep landing on your feet. True?`,
          hi: `badlav poore saal aapke chakkar kaat raha hai — plan mudte hi rehte hain, aur aap har baar pairon pe utarte hain. sach na?`,
        },
        6: {
          en: `This stretch asks more of you at home than at work — the care-load grew heavier on purpose. Feeling it?`,
          hi: `ye daur office se zyada ghar se maangta hai — khayal ka bojh jaan-boojh ke badh gaya hai. mehsoos ho?`,
        },
        7: {
          en: `You are being pulled inward this stretch — study, silence, one question that keeps circling back. True?`,
          hi: `ye daur aapko andar khinchta hai — padhaai, khamoshi, aur ek sawaal jo ghoom-ghoom wapas aata hai. sach?`,
        },
        8: {
          en: `Money and standing are both under weight this stretch — both reviewed, both can grow. You feel the pressure, don't you?`,
          hi: `is daur mein aapke paise aur aapki haisiyat dono par wazan hai — dono ki samjhe, dono badh bhi sakte hain. dabav mehsoos hota hai, na?`,
        },
        9: {
          en: `Old things are leaving your life — rooms, people, versions of you — and it stings even when it's right. True?`,
          hi: `purani cheezein aapki zindagi se nikal rahi hain — kamre, log, aapke roop — aur sahi hone pe bhi chubht hai. sach?`,
        },
      };
      return { textEn: P[p].en, textHi: P[p].hi };
    },
  },
];

/* ------------------------------------------------------------------ */
/* STATIC questions (29) — school-voice micro-probes, no numbers       */
/* ------------------------------------------------------------------ */

type Q = Omit<ValidationQuestion, never>;

const STATIC: Q[] = [
  {
    id: "ev-school-feel",
    cat: "life-event",
    kind: "yes-no",
    textEn: `Around age 8, did you already feel older than the kids around you — like you'd seen a layer of the world they hadn't reached yet?`,
    textHi: `umra ${devNum(8)} ke aas-paas hi aap bachchon mein bhare mehsoos hote the — jaise duniya ki ek satah aapne dekh li thi jo baaki abhi pahunch hi nahi rahe the. sach kya?`,
    code: "EV:S1",
  },
  {
    id: "ev-independence",
    cat: "life-event",
    kind: "yes-no",
    textEn: `By your teen years, "my weight, my shoulders" had already become your rule — help was never a given. True?`,
    textHi: `kitaan ke saal hi "apna bojh, apne kandhe" aapka usool ban gaye — kisi ke sahare kaa bharosa kabhi rahe hi nahi. sach?`,
    code: "EV:S2",
  },
  {
    id: "ev-assigned-role",
    cat: "life-event",
    kind: "choice",
    textEn: `Growing up, life assigned you a role without asking — which one was yours?`,
    textHi: `bachpan, zindagi ne aapko ek role de diya bina pooche — aapka kaun sa tha?`,
    options: [
      `The responsible one — I carried it`,
      `The peacemaker — I settled the storms`,
      `The invisible one — I watched and stayed quiet`,
      `The entertainer — I lifted the room`,
    ],
    optionsHi: [
      `zimmedaar wala — bojh utha liya`,
      `suljhaane wala — toofan shaant kiye`,
      `gayab wala — chup raha, dekhta raha`,
      `hansi-lane wala — mahaul sanwaarta tha`,
    ],
    code: "EV:S3",
  },
  {
    id: "ev-sudden-shift",
    cat: "life-event",
    kind: "yes-no",
    textEn: `One shift in your life arrived without your consent — a house, a city, a school, or a person that was yours suddenly wasn't. True?`,
    textHi: `zindagi ka ek bada badlav aapki marzi ke bina aaya — ek ghar, ek shaher, ek school, ya apna jo ek din ake achanak aap ka hi nahi raha. sach?`,
    code: "EV:S4",
  },
  {
    id: "ev-loss-guard",
    cat: "life-event",
    kind: "yes-no",
    textEn: `You've carried one heavy truth about your own family since you were young — and you've never said it out loud. True?`,
    textHi: `bachpan se hi apne parivaar ka ek bhaari sach aapke andar pada hai — aur aaj tak zubaan pe nahi laaye. sach?`,
    code: "EV:S5",
  },
  {
    id: "ev-early-money",
    cat: "life-event",
    kind: "yes-no",
    textEn: `Money independence reached you before it reached your friends — first earning or first real need, you handled yours early. True?`,
    textHi: `paise ki azaadi aapko doston se pehle mil gayi — pehli kamai ya pehli asli zaroorat, apna khud aap ne jaldi sambhal liya. sach?`,
    code: "EV:S6",
  },
  {
    id: "tr-night-mind",
    cat: "trait",
    kind: "yes-no",
    textEn: `Your best thinking starts when everyone else is done for the day — the noise is off and the mind finally opens. True?`,
    textHi: `aapka sab se tez dimaag tab chalta hai jab baaki sab din nipta chuke hote hain — shor band, aur man aakhir mein khulta hai. sach?`,
    code: "EV:S7",
  },
  {
    id: "tr-quiet-read",
    cat: "trait",
    kind: "yes-no",
    textEn: `You read changes in a person's voice and mood before they say a single word. True?`,
    textHi: `kisi ki awaaz aur chaahat mein badlav aap pehle pakad lete ho — unke ek shabd bolne se pehle. sach?`,
    code: "EV:S8",
  },
  {
    id: "tr-too-much",
    cat: "trait",
    kind: "yes-no",
    textEn: `You have been called 'too much' — too intense, too particular, too much of everything; often by people who gave little. Heard it?`,
    textHi: `log keh chuke hain aapko 'zyada' — zyada tez, zyada baarik, har cheez mein zyada — aksar unse jo aapko kuch de hi nahi paaye. suna ho ga?`,
    code: "EV:S9",
  },
  {
    id: "tr-recharge-silence",
    cat: "trait",
    kind: "yes-no",
    textEn: `After a heavy people-day, silence is the medicine — you need it the way food is needed. True?`,
    textHi: `logon wale ek bhaari din ke baad khamoshi hi dawa hai — khane jaisi. sach?`,
    code: "EV:S10",
  },
  {
    id: "tr-few-circle",
    cat: "trait",
    kind: "yes-no",
    textEn: `Your real circle fits in one breath — two people, three at most, who have seen the unedited you. Right count?`,
    textHi: `aapka asli circle ek saans mein gin lo — do log, teen se zyada nahi — jinhone bina-filter aap ko dekha ho. ginti theek?`,
    code: "EV:S11",
  },
  {
    id: "tr-silent-pride",
    cat: "trait",
    kind: "yes-no",
    textEn: `Silence has cost you people — you held your ground instead of saying sorry, and they walked. True?`,
    textHi: `khamoshi ne aapse log chheen liye — maafi keh dene ki jagah zameen pakdi, aur wo chale gaye. sach?`,
    code: "EV:S12",
  },
  {
    id: "mon-given-quiet",
    cat: "money",
    kind: "yes-no",
    textEn: `You have given money to family or friends and never brought it up again — not once. True?`,
    textHi: `apno ya doston ko paisa diya aur uska zikr dobara kabhi nahi kiya — ek baar bhi nahi. sach?`,
    code: "EV:S13",
  },
  {
    id: "mon-pay-quiet",
    cat: "money",
    kind: "yes-no",
    textEn: `You don't bargain — full price, quiet payment, no theatre. True?`,
    textHi: `mole-tol aapka khel nahi — poora daam, chupke se dena, koi drama nahi. sach?`,
    code: "EV:S14",
  },
  {
    id: "mon-first-earn",
    cat: "money",
    kind: "yes-no",
    textEn: `Your first real earnings went to someone else's need before your own. True?`,
    textHi: `pehli asli kamai pehle kisi aur ke kaam mein lag gayi — apne se pehle. sach?`,
    code: "EV:S15",
  },
  {
    id: "mon-debt-weight",
    cat: "money",
    kind: "yes-no",
    textEn: `Owing money — even a small amount — sits on your chest until it is cleared. True?`,
    textHi: `karz na utre tab tak — chhota bhi ho — seene par hi baitha rehta hai. sach?`,
    code: "EV:S16",
  },
  {
    id: "mon-surplus",
    cat: "money",
    kind: "choice",
    textEn: `Extra money lands in your hands — what actually happens first?`,
    textHi: `faaltu paisa aapke haath mein aa jaaye — pehle kya hota hai sach mein?`,
    options: [
      `It goes where the people I love need it`,
      `It goes quiet — into savings, untouched`,
      `It goes on one good thing — just for me`,
      `It goes into making the next big thing happen`,
    ],
    optionsHi: [
      `apno ki zaroorat mein chala jaata hai`,
      `chupchaap jama ho jaata hai — kaan ta nahi`,
      `ek achhi cheez pe lag jaata hai — sirf mere liye`,
      `agla bada kaam banane mein lag jaata hai`,
    ],
    code: "EV:S17",
  },
  {
    id: "mon-status-quiet",
    cat: "money",
    kind: "yes-no",
    textEn: `You have never spent to be seen — the work said it, and that was enough. True?`,
    textHi: `dikhne ke liye kharch aap ne kabhi nahi kiya — kaam hi bol diya, aur bas. sach?`,
    code: "EV:S18",
  },
  {
    id: "rel-trust-steps",
    cat: "relationship",
    kind: "yes-no",
    textEn: `Trust arrives for you in half-steps — complete only after long watching, and only for the very few. True?`,
    textHi: `aapke paas bharosa aadhe kadam mein aata hai — lambi nazar ke baad hi poora, aur bas bahut kum logon pe. sach?`,
    code: "EV:S19",
  },
  {
    id: "rel-love-in-work",
    cat: "relationship",
    kind: "yes-no",
    textEn: `Your love shows in work — providing, fixing, showing up — far more than in saying it. True?`,
    textHi: `aapka pyaar kaamon se dikhta hai — jodna, theek karna, pahunchna — kehne se nahi. sach?`,
    code: "EV:S20",
  },
  {
    id: "rel-helper-seat",
    cat: "relationship",
    kind: "yes-no",
    textEn: `People come to you with their problems and leave lighter — but for your own problems, that seat stays empty. True?`,
    textHi: `log apni muskilein aapke paas laate hain aur halka ho ke jaate hain — par aapki muskil ki kursi khaali khadi rehti hai. sach?`,
    code: "EV:S21",
  },
  {
    id: "rel-hope-more",
    cat: "relationship",
    kind: "yes-no",
    textEn: `From the people you love, you never learned to hope small — every hurt came from hoping more, not less. True?`,
    textHi: `apno se apni umeed kam maana hi nahi aapne — har chot umeed ke zyada hone se aayi, kam hone se nahi. sach?`,
    code: "EV:S22",
  },
  {
    id: "rel-loyalty-binary",
    cat: "relationship",
    kind: "yes-no",
    textEn: `Your loyalty runs in one switch — once someone is yours, you don't look around; it is all in, or gone. True?`,
    textHi: `aapki wafadaari ek chaabi ki hai — jiska hua to poora, warna band — aata-paas nahi dekha. sach?`,
    code: "EV:S23",
  },
  {
    id: "rel-fight-first",
    cat: "relationship",
    kind: "choice",
    textEn: `When a fight finds you, what does your body choose first?`,
    textHi: `jhagde aapko chhu le to sab se pehle kya hota hai?`,
    options: [
      `Go silent — disappear into work`,
      `Say it sharp — all of it, right then`,
      `Replay it for days before speaking`,
      `Fix the problem — never mention it again`,
    ],
    optionsHi: [
      `chup ho jaana — kaam mein gaayab ho jaana`,
      `tez bolna — poora, usi waqt`,
      `dinon andar chalbaat chalein, phir bolo`,
      `masla nipta do — dobara zikr tak na karo`,
    ],
    code: "EV:S24",
  },
  {
    id: "fh-big-success",
    cat: "fear-hope",
    kind: "yes-no",
    textEn: `Some part of you is more afraid of a big success than of a fall — falls you have survived; the weight of the big win you haven't yet. True?`,
    textHi: `andar se aap bade jeet se zyada dar rahe ho — girna aapne jhel liya hai; badi jeet ka bojh ab tak nahi. sach?`,
    code: "EV:S25",
  },
  {
    id: "fh-take-away",
    cat: "fear-hope",
    kind: "yes-no",
    textEn: `Right at your best moments, a small voice asks — how long before this is taken from me? True?`,
    textHi: `sab se achhi ghadi mein bhi ek chhoti awaaz puchti hai — ye mujhse kab tak chheen liya jayega — hmm — sach?`,
    code: "EV:S26",
  },
  {
    id: "fh-best-decade",
    cat: "fear-hope",
    kind: "yes-no",
    textEn: `Somewhere under everything, you are still sure of one thing: your best decade has not arrived yet. True?`,
    textHi: `sab ke neeche ek baat pe aap pake ho — aapka sab se bada daur abhi aaya hi nahi hai. sach?`,
    code: "EV:S27",
  },
  {
    id: "fh-built-for",
    cat: "fear-hope",
    kind: "yes-no",
    textEn: `You were built for one thing — you have named it privately, even when you have said it to no one. True?`,
    textHi: `aap ek hi kaam ke liye bane hain — naam aap mann hi mann rakhe hue ho, chahe zubaan pe kisi se na kaha ho. sach?`,
    code: "EV:S28",
  },
  {
    id: "fh-pick-first",
    cat: "fear-hope",
    kind: "choice",
    textEn: `Last one — if all four were real today, which do you pick first?`,
    textHi: `aakhri sawaal — agar chaaron sach aaj the, pehle kya chunte?`,
    options: [
      `Respect that never needs proving again`,
      `Money that makes problems boring`,
      `A circle where nothing needs managing`,
      `Thirty good years of health to use all of it`,
    ],
    optionsHi: [
      `wo izzat — jise phir kabhi saboot na maange`,
      `aisa paisa — jo maslon ko bore kar de`,
      `aisa circle — jahan kuch sambhalna hi na pade`,
      `tees saal sihat — sab kuch bhogane ke liye`,
    ],
    code: "EV:S29",
  },
];

/* ------------------------------------------------------------------ */
/* THE BANK — 39 definitions in narrative order                         */
/* life-event (1-9) → trait (10-17) → money (18-24) →                   */
/* relationship (25-32) → fear-hope (33-39)                             */
/* ------------------------------------------------------------------ */

/** Bank order (narrative): ev → tr → mon → rel → fh. */
export const VALIDATION_QUESTIONS: ValidationQuestionDef[] = [
  // — life-event opens with the dynamic age-window "shocking" probes —
  DYN[0], // ev-conf-window
  DYN[1], // ev-money-window
  DYN[2], // ev-recent
  ...STATIC.slice(0, 6), // ev-school-feel .. ev-early-money
  // — trait block (mulank statement leads) —
  DYN[3], // tr-mulank
  DYN[4], // tr-grid-gap
  ...STATIC.slice(6, 12), // tr-night-mind .. tr-silent-pride
  // — money block (golden diagonal leads) —
  DYN[5], // mon-golden
  ...STATIC.slice(12, 18), // mon-given-quiet .. mon-status-quiet
  // — relationship block (numank/care dynamics lead) —
  DYN[6], // rel-family
  DYN[7], // rel-care-6
  ...STATIC.slice(18, 24), // rel-trust-steps .. rel-fight-first
  // — fear-hope closes (dynamics first, statics, finale choice) —
  DYN[8], // fh-fear-choice
  DYN[9], // fh-next-year
  ...STATIC.slice(24), // fh-big-success .. fh-pick-first
];

/* ------------------------------------------------------------------ */
/* buildValidationSet — instantiate the bank for one DOB                */
/* ------------------------------------------------------------------ */

/**
 * Build the validation question set for one DOB. Deterministic: the same
 * numbers produce the same ordered set, byte for byte. Ordered per the
 * narrative (life events first, fear/hope last). The internal gate runs
 * the same validateSet() the chapter-builder will run.
 */
export function buildValidationSet(core: ValidationCore): ValidationQuestion[] {
  const set: ValidationQuestion[] = VALIDATION_QUESTIONS.map((def) => {
    if (isDynamicDef(def)) {
      const made = def.make(core);
      return { id: def.id, cat: def.cat, kind: def.kind, ...made, code: def.code(core) };
    }
    return { ...def };
  });
  validateSet(set);
  return set;
}

/* ------------------------------------------------------------------ */
/* tuneWeights — answers → chapter-emphasis adjustments                 */
/* ------------------------------------------------------------------ */

/** Base YES-delta per category (chapter emphasis moves). */
const CAT_YES: Record<ValidationCategory, Partial<ValidationWeights>> = {
  "life-event": { shadow: 2 },
  trait: { career: 1, shadow: 1 },
  money: { wealth: 2 },
  relationship: { love: 2 },
  "fear-hope": { shadow: 1 },
};

/** Per-question tuning rules; `choices` slots map option index → delta. */
interface TuneRule {
  yes?: Partial<ValidationWeights>;
  no?: Partial<ValidationWeights>;
  choices?: Partial<ValidationWeights>[];
}

const TUNE: Record<string, TuneRule> = {
  // life-event: confirmation deepens the shadow story; denial leaves love.
  "ev-conf-window": { yes: { shadow: 2 }, no: { love: 1 } },
  "ev-money-window": { yes: { shadow: 1, wealth: 1 }, no: { love: 1 } },
  "ev-recent": { yes: { shadow: 2 }, no: { career: 1 } },
  "ev-school-feel": { yes: { career: 1, shadow: 1 }, no: { love: 1 } },
  "ev-independence": { yes: { career: 2 }, no: { love: 1 } },
  "ev-assigned-role": {
    choices: [
      { career: 1, shadow: 1 }, // responsible
      { love: 1, shadow: 1 }, // peacemaker
      { shadow: 2 }, // invisible
      { love: 1, career: 1 }, // entertainer
    ],
  },
  "ev-sudden-shift": { yes: { shadow: 2 }, no: { love: 1 } },
  "ev-loss-guard": { yes: { shadow: 2 }, no: { love: 1 } },
  "ev-early-money": { yes: { wealth: 1, career: 1 }, no: { love: 1 } },
  // trait: confirmed self-image feeds career + shadow; a mulank-8/9/4 YES
  // hits shadow harder (Shani/Mangal/Rahu pressure reading).
  "tr-mulank": { yes: { career: 1, shadow: 1 }, no: { career: 1 } },
  "tr-grid-gap": { yes: { shadow: 2 }, no: { career: 1 } },
  "tr-night-mind": { yes: { career: 1 }, no: { love: 1 } },
  "tr-quiet-read": { yes: { love: 1, shadow: 1 }, no: {} },
  "tr-too-much": { yes: { shadow: 2 }, no: { love: 1 } },
  "tr-recharge-silence": { yes: { shadow: 1 }, no: { love: 1 } },
  "tr-few-circle": { yes: { shadow: 1, love: 1 }, no: { love: 1 } },
  "tr-silent-pride": { yes: { shadow: 2 }, no: { love: 1 } },
  // money: confirming the pattern moves wealth; denial steadies it.
  "mon-golden": { yes: { wealth: 2, shadow: 1 }, no: { wealth: -1 } },
  "mon-given-quiet": { yes: { wealth: 1, love: 1 }, no: { wealth: -1 } },
  "mon-pay-quiet": { yes: { wealth: 1 }, no: { wealth: -1 } },
  "mon-first-earn": { yes: { wealth: 1, love: 1 }, no: { wealth: -1 } },
  "mon-debt-weight": { yes: { wealth: 1, shadow: 1 }, no: { wealth: -1 } },
  "mon-surplus": {
    choices: [
      { love: 2 }, // people first
      { wealth: 2 }, // savings
      { wealth: 1, shadow: 1 }, // self-splurge
      { career: 2, wealth: 1 }, // next venture
    ],
  },
  "mon-status-quiet": { yes: { career: 2 }, no: { wealth: -1 } },
  // relationship: YES warms love; NO cools it (chapter demotes).
  "rel-family": { yes: { love: 2 }, no: { love: -1 } },
  "rel-care-6": { yes: { love: 2 }, no: { love: -1, shadow: 1 } },
  "rel-trust-steps": { yes: { love: 1, shadow: 1 }, no: { love: -1 } },
  "rel-love-in-work": { yes: { love: 1, career: 1 }, no: { love: -1 } },
  "rel-helper-seat": { yes: { shadow: 2, love: 1 }, no: { love: -1 } },
  "rel-hope-more": { yes: { love: 2, shadow: 1 }, no: { love: -1 } },
  "rel-loyalty-binary": { yes: { love: 2 }, no: { love: -1 } },
  "rel-fight-first": {
    choices: [
      { career: 1, shadow: 1 }, // silent → work
      { shadow: 2 }, // sharp in the moment
      { shadow: 1, love: 1 }, // replay
      { love: 1, career: 1 }, // fix quietly
    ],
  },
  // fear-hope: a named fear deepens shadow; the hope probes lift career.
  "fh-fear-choice": {
    choices: [{ shadow: 2 }, { shadow: 1 }, { shadow: 1 }, { shadow: 1 }],
  },
  "fh-next-year": { yes: { career: 1, shadow: 1 }, no: { love: 1 } },
  "fh-big-success": { yes: { shadow: 2 }, no: { career: 1 } },
  "fh-take-away": { yes: { shadow: 2 }, no: { career: 1 } },
  "fh-best-decade": { yes: { career: 1, love: 1 }, no: { career: 1 } },
  "fh-built-for": { yes: { career: 2 }, no: { love: 1 } },
  "fh-pick-first": {
    choices: [
      { career: 2 }, // respect
      { wealth: 2 }, // money
      { love: 2 }, // circle
      { love: 1, shadow: 1 }, // health-years
    ],
  },
};

const YES_WORDS = new Set(["yes", "haan", "ha", "sahi", "sach", "true"]);
const NO_WORDS = new Set(["no", "nahi", "nahin", "galat", "jhooth", "false"]);

function add(w: ValidationWeights, d: Partial<ValidationWeights>): void {
  w.love += d.love ?? 0;
  w.wealth += d.wealth ?? 0;
  w.career += d.career ?? 0;
  w.shadow += d.shadow ?? 0;
}

/**
 * Map validation answers → chapter-emphasis adjustments.
 * - missing / null / skipped answers contribute nothing.
 * - yes-no: true/yes-words → `yes` delta; false/no-words → `no` delta.
 * - choice kind: answer is the option index (0-based) → its slot delta;
 *   any other non-null answer falls to a mild shadow confirmation.
 * Unknown ids are ignored (no crash, no noise).
 */
export function tuneWeights(
  answers: Record<string, ValidationAnswer>,
): ValidationWeights {
  const w: ValidationWeights = { love: 0, wealth: 0, career: 0, shadow: 0 };
  const byId = new Map<string, ValidationQuestionDef>();
  for (const def of VALIDATION_QUESTIONS) byId.set(def.id, def);

  for (const [id, a] of Object.entries(answers)) {
    if (a === null || a === undefined) continue;
    const def = byId.get(id);
    if (!def) continue;
    const rule = TUNE[id] ?? {};

    if (def.kind === "choice" && typeof a === "number" && rule.choices) {
      add(w, rule.choices[a] ?? { shadow: 1 });
      continue;
    }

    let yes: boolean | null = null;
    if (typeof a === "boolean") yes = a;
    else if (typeof a === "number") yes = a > 0; // index-like answer on yes-no
    else if (typeof a === "string") {
      const s = a.trim().toLowerCase();
      if (YES_WORDS.has(s)) yes = true;
      else if (NO_WORDS.has(s)) yes = false;
    }
    if (yes === null) continue;
    add(w, yes ? (rule.yes ?? CAT_YES[def.cat]) : (rule.no ?? {}));
  }
  return w;
}

/* ------------------------------------------------------------------ */
/* validateSet — data-layer contract gate                              */
/* ------------------------------------------------------------------ */

/** Owner voice-law bans (case-insensitive) + formal-Devanagari ban. */
const BANNED_PHRASES: RegExp[] = [
  /may suggest/i,
  /theme to reflect/i,
  /will happen/i,
  // formal Devanagari possessives — HI voice law is romanized 'aap',
  // never the formal 'आपका' register.
  /आपका|आपके|आपकी|आपको/,
];

const EV_CODE_RE = /^EV:[A-Z]{1,6}(?:\d+(?:-\d+)?)?$/;
const CATS: ValidationCategory[] = [
  "life-event",
  "trait",
  "money",
  "relationship",
  "fear-hope",
];

/**
 * Contract gate for a built validation set. Throws Error when:
 * - the set holds fewer than 30 or more than 50 questions;
 * - any question is malformed (missing id/cat/text/code, invalid kind,
 *   a choice without ≥2 options, mismatched bilingual option arrays,
 *   duplicate ids, invalid evidence code);
 * - any banned construction appears in textEn, textHi, options or
 *   optionsHi ('may suggest' | 'theme to reflect' | 'will happen' |
 *   formal-Devanagari आपका-family).
 */
export function validateSet(set: ValidationQuestion[]): void {
  if (!Array.isArray(set)) throw new Error("validateSet: set must be an array of questions");
  if (set.length < 30) {
    throw new Error(
      `validateSet: a validation set needs at least 30 questions — got ${set.length}`,
    );
  }
  if (set.length > 50) {
    throw new Error(
      `validateSet: a validation set allows at most 50 questions — got ${set.length}`,
    );
  }
  const seen = new Set<string>();
  set.forEach((q, i) => {
    const at = `question#${i}(${q?.id ?? "?"})`;
    if (!q || typeof q !== "object") throw new Error(`validateSet: ${at} is not a question`);
    if (!q.id || typeof q.id !== "string") throw new Error(`validateSet: ${at} missing id`);
    if (seen.has(q.id)) throw new Error(`validateSet: duplicate id "${q.id}"`);
    seen.add(q.id);
    if (!CATS.includes(q.cat)) throw new Error(`validateSet: ${at} invalid category "${q.cat}"`);
    if (q.kind !== "yes-no" && q.kind !== "choice") {
      throw new Error(`validateSet: ${at} invalid kind "${q.kind}"`);
    }
    if (typeof q.textEn !== "string" || q.textEn.trim().length < 8) {
      throw new Error(`validateSet: ${at} textEn missing/too short`);
    }
    if (typeof q.textHi !== "string" || q.textHi.trim().length < 8) {
      throw new Error(`validateSet: ${at} textHi missing/too short`);
    }
    if (typeof q.code !== "string" || !EV_CODE_RE.test(q.code)) {
      throw new Error(`validateSet: ${at} invalid evidence code "${q.code}"`);
    }
    if (q.kind === "choice") {
      if (!Array.isArray(q.options) || q.options.length < 2) {
        throw new Error(`validateSet: ${at} choice question needs ≥2 options`);
      }
      if (q.optionsHi && q.optionsHi.length !== q.options.length) {
        throw new Error(`validateSet: ${at} options/optionsHi length mismatch`);
      }
    }
    const texts: string[] = [q.textEn, q.textHi, ...(q.options ?? []), ...(q.optionsHi ?? [])];
    for (const t of texts) {
      for (const ban of BANNED_PHRASES) {
        if (ban.test(t)) {
          throw new Error(
            `validateSet: ${at} uses banned construction ${ban} in "${t.slice(0, 60)}…"`,
          );
        }
      }
    }
  });
}