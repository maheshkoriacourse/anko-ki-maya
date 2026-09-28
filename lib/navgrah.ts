/**
 * Anko Ki Maya v3 — NAVGRAH LAYER (owner addition, 29 Sep).
 *
 * Core concept: every number IS a planet (Ank Shastra = Jyotish ka
 * ank-branch). 1=Surya, 2=Chandra, 3=Guru, 4=Rahu, 5=Budh, 6=Shukra,
 * 7=Ketu, 8=Shani, 9=Mangal. Every analysis card shows: the number, its
 * graha, the graha's nature, and how that planet's energy behaves in the
 * user's chart — in the school's vocabulary and a direct jyotishi voice.
 *
 * Friendship/enmity follows the classical pairs the owner fixed
 * (WEB-MINING-CONCEPTS.md): Sun-Mars and Moon-Jupiter friends;
 * Sun-Saturn and Moon-Saturn tense; Mercury friend to all; Rahu-Ketu the
 * karmic pair. Copy is original — no verbatim book text.
 */

export interface NavgrahEntry {
  digit: number; // 1-9
  graha: string; // "Surya"
  grahaHi: string; // "Surya"
  natureEn: string; // short nature keywords
  natureHi: string;
  friends: number[];
  tense: number[]; // tense/enemy numbers
  karmicPair: number | null; // 4↔7
  behaviorEn: string; // how this planet behaves in a person's chart
  behaviorHi: string;
}

export const NAVGRAH: Record<number, NavgrahEntry> = {
  1: {
    digit: 1,
    graha: "Surya",
    grahaHi: "Surya",
    natureEn: "leadership, authority, fame",
    natureHi: "leadership, adhikaar, pratishtha",
    friends: [1, 2, 3, 5, 9],
    tense: [8],
    karmicPair: null,
    behaviorEn:
      "Surya in your chart runs the king-line: it wants your name on the door, not on the guest list. It gives authority early to the bold and late to the hesitant — but it always gives it to those who keep their word.",
    behaviorHi:
      "aapke chart mein Surya raja-rekha chalata hai: yeh aapka naam darwaaze ki patiya par chaahata hai, mehamaan-soochi mein nahi. bahaduron ko satta jaldi, jhijhakane vaalon ko der se deta hai — par deta unhi ko hai jo apni baat par tike rehte hain.",
  },
  2: {
    digit: 2,
    graha: "Chandra",
    grahaHi: "Chandrama",
    natureEn: "emotion, intuition, the public's heart",
    natureHi: "bhaavna, antargyaan, jan-dil",
    friends: [1, 2, 3],
    tense: [4, 8],
    karmicPair: null,
    behaviorEn:
      "Chandra in your chart runs the tide-line: moods and markets move together for you. It reads rooms before it reads books, wins people through trust, and pays heavily when you argue with your own gut.",
    behaviorHi:
      "aapke chart mein Chandrama lahar-rekha chalata hai: aapke liye man aur baazaar ek saath chalate hain. yeh kitaabon se pehle kamra padhai hai, bharose se log jeetai hai — aur apni hi antaraatma se jhagada karne par bhaari chook karaai hai.",
  },
  3: {
    digit: 3,
    graha: "Guru",
    grahaHi: "Guru",
    natureEn: "wisdom, expansion, wealth",
    natureHi: "gyaan, vistar, dhan-vridhi",
    friends: [1, 2, 3, 5, 9],
    tense: [6],
    karmicPair: null,
    behaviorEn:
      "Guru in your chart runs the teacher-line: knowledge you refuse to share stagnates; knowledge you teach returns multiplied. Money expands for you through counsel — giving advice, taking advice from the worthy.",
    behaviorHi:
      "aapke chart mein Guru shikshak-rekha chalata hai: jo gyaan aap baatate nahi, woh ruk jaata hai; jo baatate hain, woh gunit hokar lautata hai. dhan aapke liye salah se badhata hai — dene se bhi, sahi aadmi se lene se bhi.",
  },
  4: {
    digit: 4,
    graha: "Rahu",
    grahaHi: "Rahu",
    natureEn: "innovation, disruption, the unconventional",
    natureHi: "navinta, ulat-baazi, apara-ramparaagat",
    friends: [4, 5, 6, 8],
    tense: [1, 2],
    karmicPair: 7,
    behaviorEn:
      "Rahu in your chart runs the disruptor-line: the orthodox path pays you less than the strange one. Big sudden rises and sudden resets both belong to this planet — your rulebook is to keep cash buffers and keep the paperwork clean.",
    behaviorHi:
      "aapke chart mein Rahu ulat-rekha chalata hai: roodhai waala raasta aapko kam deta hai, ajeeb waala jayaada. achanak chadhaaee aur achanak giraavat dono isi graha ke hain — aapka niyam: roqda baphar rakhein, kaagzaat saaf rakhein.",
  },
  5: {
    digit: 5,
    graha: "Budh",
    grahaHi: "Budh",
    natureEn: "logic, commerce, communication",
    natureHi: "tark, vyaapaar, samvaad",
    friends: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    tense: [],
    karmicPair: null,
    behaviorEn:
      "Budh in your chart is the universal friend — it negotiates with every planet and loses to none in wit. Numbers, contracts, languages, code: wherever the deal lives, this planet collects commission for you.",
    behaviorHi:
      "aapke chart mein Budh sabaka mitra hai — har graha se sauda karta hai aur chaturaai mein kii se haarata nahi. hisaab, karaar, bhasha, code: jahan saude ki buddhi chaahie, wahan yeh graha aapki kamai jodta hai.",
  },
  6: {
    digit: 6,
    graha: "Shukra",
    grahaHi: "Shukra",
    natureEn: "luxury, beauty, love",
    natureHi: "vilaas, saundarya, prem",
    friends: [3, 5, 6, 8],
    tense: [1, 2],
    karmicPair: null,
    behaviorEn:
      "Shukra in your chart runs the pleasure-and-craft line: comfort, design, art, romance. It pays the one who makes things beautiful and charges interest on neglect — family time and taste both need maintenance.",
    behaviorHi:
      "aapke chart mein Shukra vilaas-aur-kaarigari ki rekha chalata hai: aaraam, design, kala, prem. yeh ui ko deta hai jo cheejaon ko sundar banata hai aur upeksha par byaaj vasoolata hai — parivaar ka samay aur shauk, dono ki dekhbhaal zaroori hai.",
  },
  7: {
    digit: 7,
    graha: "Ketu",
    grahaHi: "Ketu",
    natureEn: "spirituality, research, detachment",
    natureHi: "adhyatm, anushandhaan, vairagya",
    friends: [5, 6, 8],
    tense: [1, 2],
    karmicPair: 4,
    behaviorEn:
      "Ketu in your chart runs the ascetic-scholar line: it gives mastery in one deep subject and indifference to the crowd's applause. Money comes, but only after you stop chasing it sideways and go straight at the craft.",
    behaviorHi:
      "aapke chart mein Ketu tapasvi-pandit ki rekha chalata hai: ek gahare vishay mein mahaarat deta hai aur bheed ki taaliyon se naata todta hai. dhan aata hai — par tab, jab aap idhar-udhar bhatakana chhod seedhe kaam par jaate hain.",
  },
  8: {
    digit: 8,
    graha: "Shani",
    grahaHi: "Shani",
    natureEn: "discipline, karma, endurance",
    natureHi: "anushasan, karm, sahanshakti",
    friends: [3, 5, 6, 8],
    tense: [1, 2],
    karmicPair: null,
    behaviorEn:
      "Shani in your chart is the slow judge: quick success is not its gift — PERMANENT success is. What you earn under Shani stays earned; what you cut corners for, it collects back with interest.",
    behaviorHi:
      "aapke chart mein Shani dheema nyaayaadheesh hai: jhatpat safalta isai den nahi — sthaayi safalta hai. Shani ke neeche kamaayaa hua wahin ka wahin tikata hai; jis raaste se gadabad ki, woh byaaj samet vaapas vasool leta hai.",
  },
  9: {
    digit: 9,
    graha: "Mangal",
    grahaHi: "Mangal",
    natureEn: "courage, action, energy",
    natureHi: "saahas, kaarya, oorja",
    friends: [1, 2, 3, 5, 9],
    tense: [4, 8],
    karmicPair: null,
    behaviorEn:
      "Mangal in your chart runs the warrior-line: you win by moving first and apologising never. Fire that builds machines can also burn bridges — this planet's discipline is Tuesday's restraint.",
    behaviorHi:
      "aapke chart mein Mangal yoddha-rekha chalata hai: aap pehle badhakar jeetate hain, maaphaee baad mein bhi nahi maagate. yehi agni machinen bhi banaai hai aur pul bhi jalaati hai — is graha ka anushasan Mangalvaar ki sanyam-saadhana hai.",
  },
};

/** Graha for a reduced digit; masters fold to their base digit. */
export function grahaFor(n: number): NavgrahEntry {
  const base = n === 11 || n === 22 || n === 33 ? n / 11 : n; // 11→1? No — school folds 11→2, 22→4, 33→6
  void base;
  const fold = n === 11 ? 2 : n === 22 ? 4 : n === 33 ? 6 : n;
  return NAVGRAH[fold] ?? NAVGRAH[1];
}

/* ------------------------------------------------------------------ */
/* Friendship / enmity                                                 */
/* ------------------------------------------------------------------ */

export type PlanetRelation = "friend" | "tense" | "karmic" | "neutral";

export function planetRelation(a: number, b: number): PlanetRelation {
  const ga = grahaFor(a);
  const gb = grahaFor(b);
  if (ga.digit === gb.digit) return "friend";
  if (ga.karmicPair === gb.digit || gb.karmicPair === ga.digit) return "karmic";
  if (ga.friends.includes(gb.digit) && gb.friends.includes(ga.digit)) return "friend";
  if (ga.tense.includes(gb.digit) || gb.tense.includes(ga.digit)) return "tense";
  return "neutral";
}

export const RELATION_LABEL: Record<PlanetRelation, { en: string; hi: string }> = {
  friend: { en: "friend planets", hi: "mitra graha" },
  tense: { en: "tense planets", hi: "tanaav graha" },
  karmic: { en: "karmic pair (Rahu-Ketu)", hi: "karmic jodi (Rahu-Ketu)" },
  neutral: { en: "neutral", hi: "sam-bhav" },
};

/** One-line verdict for two numbers' planets (compat engine + name studio). */
export function relationLine(a: number, b: number, lang: "en" | "hi"): string {
  const ga = grahaFor(a);
  const gb = grahaFor(b);
  const rel = planetRelation(a, b);
  const pairEn = `${ga.graha} (${a}) + ${gb.graha} (${b})`;
  const pairHi = `${ga.grahaHi} (${a}) + ${gb.grahaHi} (${b})`;
  if (lang === "hi") {
    switch (rel) {
      case "friend":
        return `${pairHi} — mitra graha. dono ek-doosare ki shakti badhaate hain: yeh jodi jahan baithai hai, wahan raftaar dogui.`;
      case "karmic":
        return `${pairHi} — Rahu-Ketu ki karmic jodi. pichhle janm ka khaata: adhura kaam yahan poora karana hai.`;
      case "tense":
        return `${pairHi} — tanaav graha. yeh jodi mehnat maagai hai: dono sach ek saath rakhoge, toh dono ki taakat kaam aaei.`;
      default:
        return `${pairHi} — sam-bhaav. koi takaraav nahi, koi vishesh vardaan nahi: nishpaksh saajhedaaree.`;
    }
  }
  switch (rel) {
    case "friend":
      return `${pairEn} — friend planets. Each one amplifies the other: wherever this pair sits, speed doubles.`;
    case "karmic":
      return `${pairEn} — the Rahu-Ketu karmic pair. An account from a former life: the unfinished work completes here.`;
    case "tense":
      return `${pairEn} — tense planets. This pair demands work: hold both truths at once and both strengths serve you.`;
    default:
      return `${pairEn} — neutral. No clash, no bonus: an even-handed pairing.`;
  }
}

/* ------------------------------------------------------------------ */
/* Chart composition lines (number + graha + behaviour in the chart)    */
/* ------------------------------------------------------------------ */

export interface GrahaCardData {
  digit: number;
  positions: { key: string; labelEn: string; labelHi: string; number: number }[];
}

/**
 * Composed line for an analysis card: "Aapka Mulank 8 = Shani: ..." —
 * the planet, its nature and its behaviour in THIS chart, direct voice.
 */
export function grahaInChartLine(
  digit: number,
  positions: GrahaCardData["positions"],
  lang: "en" | "hi",
): string {
  const g = grahaFor(digit);
  const posList =
    positions.length > 0
      ? positions
          .map((p) => (lang === "hi" ? `${p.labelHi} ${p.number}` : `${p.labelEn} ${p.number}`))
          .join(", ")
      : lang === "hi"
        ? "aapke chart"
        : "your chart";
  const is = lang === "hi" ? "hai" : "is";
  const head =
    lang === "hi"
      ? `aapka ${posList} = ${g.digit} → ${g.grahaHi} ${is}: ${g.natureHi} ka graha.`
      : `Your ${posList} = ${g.digit} → ${g.graha}: ${is} the planet of ${g.natureEn}.`;
  return `${head} ${lang === "hi" ? g.behaviorHi : g.behaviorEn}`;
}

/** Friend/enemy chips data for the UI. */
export function planetChips(digit: number): {
  friends: number[];
  tense: number[];
  karmicPair: number | null;
} {
  const g = grahaFor(digit);
  return { friends: g.friends.filter((f) => f !== g.digit), tense: g.tense, karmicPair: g.karmicPair };
}

/* ------------------------------------------------------------------ */
/* Terminology (school terms, used across the UI)                      */
/* ------------------------------------------------------------------ */

export const TERMS = {
  mulank: { en: "Mulank (driver number)", hi: "Mulank — chaalak ank" },
  bhagyank: { en: "Bhagyank (destiny number)", hi: "Bhagyank — niyati ank" },
  namank: { en: "Namank (name number)", hi: "Namank — naam-ank" },
  ankDasha: { en: "Ank Dasha", hi: "Ank Dasha" },
  numeroscope: { en: "Numeroscope", hi: "ank-chakra" },
} as const;

/** Devanagari numeral rendering (०१२३४५६७८९) for Hindi-facing displays. */
export function devNum(n: number | string): string {
  const map = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  return String(n)
    .split("")
    .map((ch) => (/\d/.test(ch) ? map[Number(ch)] : ch))
    .join("");
}