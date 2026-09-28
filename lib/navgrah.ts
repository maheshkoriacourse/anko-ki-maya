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
  grahaHi: string; // "सूर्य"
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
    grahaHi: "सूर्य",
    natureEn: "leadership, authority, fame",
    natureHi: "नेतृत्व, अधिकार, प्रतिष्ठा",
    friends: [1, 2, 3, 5, 9],
    tense: [8],
    karmicPair: null,
    behaviorEn:
      "Surya in your chart runs the king-line: it wants your name on the door, not on the guest list. It gives authority early to the bold and late to the hesitant — but it always gives it to those who keep their word.",
    behaviorHi:
      "आपके चार्ट में सूर्य राजा-रेखा चलाता है: यह आपका नाम दरवाज़े की पटिया पर चाहता है, मेहमान-सूची में नहीं। बहादुरों को सत्ता जल्दी, झिझकने वालों को देर से देता है — पर देता उन्हीं को है जो अपनी बात पर टिके रहते हैं।",
  },
  2: {
    digit: 2,
    graha: "Chandra",
    grahaHi: "चंद्रमा",
    natureEn: "emotion, intuition, the public's heart",
    natureHi: "भावना, अंतर्ज्ञान, जन-हृदय",
    friends: [1, 2, 3],
    tense: [4, 8],
    karmicPair: null,
    behaviorEn:
      "Chandra in your chart runs the tide-line: moods and markets move together for you. It reads rooms before it reads books, wins people through trust, and pays heavily when you argue with your own gut.",
    behaviorHi:
      "आपके चार्ट में चंद्रमा लहर-रेखा चलाता है: आपके लिए मन और बाज़ार एक साथ चलते हैं। यह किताबों से पहले कमरा पढ़ती है, भरोसे से लोग जीतती है — और अपनी ही अंतरात्मा से झगड़ा करने पर भारी चूक कराती है।",
  },
  3: {
    digit: 3,
    graha: "Guru",
    grahaHi: "गुरु",
    natureEn: "wisdom, expansion, wealth",
    natureHi: "ज्ञान, विस्तार, धन-वृद्धि",
    friends: [1, 2, 3, 5, 9],
    tense: [6],
    karmicPair: null,
    behaviorEn:
      "Guru in your chart runs the teacher-line: knowledge you refuse to share stagnates; knowledge you teach returns multiplied. Money expands for you through counsel — giving advice, taking advice from the worthy.",
    behaviorHi:
      "आपके चार्ट में गुरु शिक्षक-रेखा चलाता है: जो ज्ञान आप बाँटते नहीं, वह रुक जाता है; जो बाँटते हैं, वह गुणित होकर लौटता है। धन आपके लिए सलाह से बढ़ता है — देने से भी, सही आदमी से लेने से भी।",
  },
  4: {
    digit: 4,
    graha: "Rahu",
    grahaHi: "राहु",
    natureEn: "innovation, disruption, the unconventional",
    natureHi: "नवीनता, उलट-बाज़ी, अपरंपरागत",
    friends: [4, 5, 6, 8],
    tense: [1, 2],
    karmicPair: 7,
    behaviorEn:
      "Rahu in your chart runs the disruptor-line: the orthodox path pays you less than the strange one. Big sudden rises and sudden resets both belong to this planet — your rulebook is to keep cash buffers and keep the paperwork clean.",
    behaviorHi:
      "आपके चार्ट में राहु उलट-रेखा चलाता है: रूढ़ि वाला रास्ता आपको कम देता है, अजीब वाला ज़्यादा। अचानक चढ़ाई और अचानक गिरावट दोनों इसी ग्रह के हैं — आपका नियम: रोकड़ा बफ़र रखें, काग़ज़ात साफ़ रखें।",
  },
  5: {
    digit: 5,
    graha: "Budh",
    grahaHi: "बुध",
    natureEn: "logic, commerce, communication",
    natureHi: "तर्क, व्यापार, संवाद",
    friends: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    tense: [],
    karmicPair: null,
    behaviorEn:
      "Budh in your chart is the universal friend — it negotiates with every planet and loses to none in wit. Numbers, contracts, languages, code: wherever the deal lives, this planet collects commission for you.",
    behaviorHi:
      "आपके चार्ट में बुध सबका मित्र है — हर ग्रह से सौदा करता है और चतुराई में किसी से हारता नहीं। हिसाब, करार, भाषा, कोड: जहाँ सौदे की बुद्धि चाहिए, वहाँ यह ग्रह आपकी कमाई जोड़ता है।",
  },
  6: {
    digit: 6,
    graha: "Shukra",
    grahaHi: "शुक्र",
    natureEn: "luxury, beauty, love",
    natureHi: "विलास, सौंदर्य, प्रेम",
    friends: [3, 5, 6, 8],
    tense: [1, 2],
    karmicPair: null,
    behaviorEn:
      "Shukra in your chart runs the pleasure-and-craft line: comfort, design, art, romance. It pays the one who makes things beautiful and charges interest on neglect — family time and taste both need maintenance.",
    behaviorHi:
      "आपके चार्ट में शुक्र विलास-और-कारीगरी की रेखा चलाता है: आराम, डिज़ाइन, कला, प्रेम। यह उसी को देता है जो चीज़ों को सुंदर बनाता है और उपेक्षा पर ब्याज वसूलता है — परिवार का समय और शौक़, दोनों की देखभाल ज़रूरी है।",
  },
  7: {
    digit: 7,
    graha: "Ketu",
    grahaHi: "केतु",
    natureEn: "spirituality, research, detachment",
    natureHi: "अध्यात्म, अनुसंधान, वैराग्य",
    friends: [5, 6, 8],
    tense: [1, 2],
    karmicPair: 4,
    behaviorEn:
      "Ketu in your chart runs the ascetic-scholar line: it gives mastery in one deep subject and indifference to the crowd's applause. Money comes, but only after you stop chasing it sideways and go straight at the craft.",
    behaviorHi:
      "आपके चार्ट में केतु तपस्वी-पंडित की रेखा चलाता है: एक गहरे विषय में महारत देता है और भीड़ की तालियों से नाता तोड़ता है। धन आता है — पर तब, जब आप इधर-उधर भटकना छोड़ सीधे काम पर जाते हैं।",
  },
  8: {
    digit: 8,
    graha: "Shani",
    grahaHi: "शनि",
    natureEn: "discipline, karma, endurance",
    natureHi: "अनुशासन, कर्म, सहनशक्ति",
    friends: [3, 5, 6, 8],
    tense: [1, 2],
    karmicPair: null,
    behaviorEn:
      "Shani in your chart is the slow judge: quick success is not its gift — PERMANENT success is. What you earn under Shani stays earned; what you cut corners for, it collects back with interest.",
    behaviorHi:
      "आपके चार्ट में शनि धीमा न्यायाधीश है: झटपट सफलता इसकी देन नहीं — स्थायी सफलता है। शनि के नीचे कमाया हुआ वहीं का वहीं टिकता है; जिस रास्ते से गड़बड़ की, वह ब्याज समेत वापस वसूल लेता है।",
  },
  9: {
    digit: 9,
    graha: "Mangal",
    grahaHi: "मंगल",
    natureEn: "courage, action, energy",
    natureHi: "साहस, कार्य, ऊर्जा",
    friends: [1, 2, 3, 5, 9],
    tense: [4, 8],
    karmicPair: null,
    behaviorEn:
      "Mangal in your chart runs the warrior-line: you win by moving first and apologising never. Fire that builds machines can also burn bridges — this planet's discipline is Tuesday's restraint.",
    behaviorHi:
      "आपके चार्ट में मंगल योद्धा-रेखा चलाता है: आप पहले बढ़कर जीतते हैं, माफ़ी बाद में भी नहीं माँगते। यही अग्नि मशीनें भी बनाती है और पुल भी जलाती है — इस ग्रह का अनुशासन मंगलवार की संयम-साधना है।",
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
  friend: { en: "friend planets", hi: "मित्र ग्रह" },
  tense: { en: "tense planets", hi: "तनाव ग्रह" },
  karmic: { en: "karmic pair (Rahu-Ketu)", hi: "कर्मिक जोड़ी (राहु-केतु)" },
  neutral: { en: "neutral", hi: "सम-भाव" },
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
        return `${pairHi} — मित्र ग्रह। दोनों एक-दूसरे की शक्ति बढ़ाते हैं: यह जोड़ी जहाँ बैठती है, वहाँ रफ़्तार दोगुनी।`;
      case "karmic":
        return `${pairHi} — राहु-केतु की कर्मिक जोड़ी। पिछले जन्म का खाता: अधूरा काम यहाँ पूरा करना है।`;
      case "tense":
        return `${pairHi} — तनाव ग्रह। यह जोड़ी मेहनत माँगती है: दोनों सच एक साथ रखिएगा, तो दोनों की ताक़त काम आएगी।`;
      default:
        return `${pairHi} — सम-भाव। कोई टकराव नहीं, कोई विशेष वरदान नहीं: निष्पक्ष साझेदारी।`;
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
        ? "आपके चार्ट"
        : "your chart";
  const is = lang === "hi" ? "है" : "is";
  const head =
    lang === "hi"
      ? `आपका ${posList} = ${g.digit} → ${g.grahaHi} ${is}: ${g.natureHi} का ग्रह।`
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
  mulank: { en: "Mulank (driver number)", hi: "मूलांक — चालक अंक" },
  bhagyank: { en: "Bhagyank (destiny number)", hi: "भाग्यांक — नियति अंक" },
  namank: { en: "Namank (name number)", hi: "नामांक — नाम-अंक" },
  ankDasha: { en: "Ank Dasha", hi: "अंक दशा" },
  numeroscope: { en: "Numeroscope", hi: "अंक-चक्र" },
} as const;

/** Devanagari numeral rendering (०१२३४५६७८९) for Hindi-facing displays. */
export function devNum(n: number | string): string {
  const map = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  return String(n)
    .split("")
    .map((ch) => (/\d/.test(ch) ? map[Number(ch)] : ch))
    .join("");
}