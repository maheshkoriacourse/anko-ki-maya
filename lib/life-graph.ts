/**
 * Anko Ki Maya v3 — LIFE GRAPH = PAST AUTO-READING (flagship rebuild).
 *
 * The engine computes the Personal Year for EVERY year from birth → now
 * (+10 years ahead) and, for each PAST year, generates a "kya hua hoga"
 * reading: PY essence + age-context + karmic/pinnacle/9-year-cycle
 * activation, written in the direct jyotishi voice. The graph fills itself
 * from the numbers — the user only confirms: ✓ सही / ✗ गलत.
 *
 * Confirmed (सही) events are pinned on the SVG intensity curve. Confirm/
 * reject counts feed a pattern note that sharpens as the user marks years.
 *
 * Hard-ban safety: past readings never mention death, illness/diagnosis,
 * pregnancy or crime. Family years (PY 6/2) use care/responsibility framing.
 */

import { personalYear, reduce, type Pinnacle } from "./numerology";

/* ------------------------------------------------------------------ */
/* Core types                                                          */
/* ------------------------------------------------------------------ */

export interface PastYearReading {
  year: number;
  age: number; // age turned during that year (year − birthYear)
  py: number; // Personal Year number 1-9 (masters folded)
  intensity: number; // 0-10 for the curve
  readingEn: string;
  readingHi: string;
  /** Karmic/pinnacle/cycle activations that colour this year. */
  activations: string[]; // short EN tags, mirrored in HI via activationTags
  activationTagsHi: string[];
  /** v3.1: true when this is a बड़े साल (BIG year) — timeline built from these. */
  big: boolean;
  /** v3.1: why this year is big (tags from BIG_REASON_LABEL). */
  bigReasons: string[];
  /** v3.1: the LIKELY EVENT TYPE, named directly (SACH with basis). */
  eventEn: string | null;
  eventHi: string | null;
}

export interface FutureYearReading {
  year: number;
  age: number;
  py: number;
  intensity: number;
  readingEn: string;
  readingHi: string;
}

export interface YearMark {
  year: number;
  verdict: "sahi" | "galat"; // ✓ सही / ✗ गलत
}

export interface LifeGraphResult {
  past: PastYearReading[];
  future: FutureYearReading[];
  currentYear: PastYearReading | null; // this year's reading (not markable)
  /** v3.1: the बड़े साल (BIG years) — the timeline is built FROM these. */
  bigYears: PastYearReading[];
  /** Pattern note from marks: sharper as more years are confirmed. */
  patternNoteEn: string | null;
  patternNoteHi: string | null;
  steps: string[];
}

/* ------------------------------------------------------------------ */
/* PY essence lines (direct voice, past-tense "hoga"-style readings)    */
/* ------------------------------------------------------------------ */

interface PyEssence {
  pastEn: string;
  pastHi: string;
  futureEn: string;
  futureHi: string;
  intensity: number;
  volatile: boolean;
}

/**
 * PY 9+1 = major peaks; 6 = minor peak; 8 = money-power peak;
 * 4/7 = troughs. Intensity drives the curve's y-value.
 */
const PY_ESSENCE: Record<number, PyEssence> = {
  1: {
    pastEn:
      "This was a year of NEW BEGINNINGS — a door opened that changed direction. Either you started something of your own, moved, or felt a strong restless push to break out of an old shell. A year you remember as 'the year everything restarted'.",
    pastHi:
      "यह नई शुरुआत का वर्ष था — एक दरवाज़ा खुला जिसने दिशा बदली। या तो आपने अपना कोई काम छेड़ा, गृह/स्थान बदला, या पुराने खोल से निकलने की बेचैनी तेज़ महसूस हुई। याद करेंगे तो 'सब कुछ फिर से शुरू हुआ' यही साल।",
    futureEn:
      "A NEW-BEGINNING year: whatever you start here carries the next nine. Name the goal in one line and move in the first half of the year.",
    futureHi:
      "नई शुरुआत का वर्ष: यहाँ जो शुरू करेंगे, वह अगले नौ साल ढोएगा। लक्ष्य एक लाइन में लिखें और साल के पहले हाफ़ में चल पड़ें।",
    intensity: 8,
    volatile: true,
  },
  2: {
    pastEn:
      "This was a SLOW, PATIENT year — growth underground. Probably felt unrewarding at the time: waiting, small steps, one key relationship or partnership forming quietly. What was planted that year sprouted later.",
    pastHi:
      "यह धीमा, धैर्य भरा वर्ष था — बीज ज़मीन के नीचे था। उस वक़्त बेफ़िज़ूल लगा होगा: इंतज़ार, छोटे कदम, और कोई एक अहम रिश्ता या साझेदारी चुपचाप बनती हुई। उस साल बोया हुआ बाद में उगा।",
    futureEn:
      "A PATIENCE year: partnerships ripen, quick wins don't. Feed relationships and let money compound quietly.",
    futureHi:
      "धैर्य का वर्ष: साझेदारियाँ पकती हैं, झटपट जीत नहीं होती। रिश्तों को सींचें और पैसे को चुपचाप बाढ़ने दें।",
    intensity: 4,
    volatile: false,
  },
  3: {
    pastEn:
      "This was a SOCIAL, EXPRESSIVE year — your name travelled. New friends, public visibility, creative or study wins; also scattered money if you chased every shiny thing. A year of laughter and noise.",
    pastHi:
      "यह सामाजिक, अभिव्यक्ति भरा वर्ष था — आपका नाम दूर तक गया। नई मुलाक़ातें, सार्वजनिक दिखना, सृजन या पढ़ाई की जीत; हर चमकती चीज़ के पीछे भागे तो पैसा बिखरा भी। हँसी और शोर का साल।",
    futureEn:
      "An EXPRESSION year: visibility, networking and creative work pay. Put your work where people can see it.",
    futureHi:
      "अभिव्यक्ति का वर्ष: दिखना, नेटवर्क और सृजनात्मक काम फलता है। अपना काम उठाकर लोगों के सामने रखें।",
    intensity: 6,
    volatile: false,
  },
  4: {
    pastEn:
      "This was a HARD-WORK, FOUNDATIONS year — discipline demanded, shortcuts punished. Probably heavy responsibility, routine, savings discipline or a grind that felt thankless. Whatever base you laid that year still carries you.",
    pastHi:
      "यह कठोर परिश्रम और नींव का वर्ष था — अनुशासन माँगा गया, शॉर्टकट दंडित हुए। भारी ज़िम्मेदारी, रुटीन, बचत का अनुशासन या बेनाम मेहनत — यही रहा होगा। उस साल रखी नींव आज भी आपको ढो रही है।",
    futureEn:
      "A FOUNDATIONS year: build systems, not stunts. Steady bricks this year beat any grand gesture.",
    futureHi:
      "नींव का वर्ष: सिस्टम बनाएँ, तमाशा नहीं। इस साल की स्थिर ईंटें किसी भव्य कदम से बड़ी हैं।",
    intensity: 3,
    volatile: false,
  },
  5: {
    pastEn:
      "This was a CHANGE year — movement, travel, a switch in work or place. Life shook the routine on purpose. Some of it felt like loss at first; it was actually redirection. A year you did something out of character.",
    pastHi:
      "यह परिवर्तन का वर्ष था — यात्रा, स्थानांतरण, काम या जगह की अदला-बदली। ज़िंदगी ने जान-बूझकर रुटीन हिलाई। शुरुआत में नुकसान जैसा लगा होगा; असल में दिशा-परिवर्तन था। इस साल आपने अपने स्वभाव से हटकर कुछ किया।",
    futureEn:
      "A CHANGE year: travel, switches and fresh markets. Say yes to movement — the routine you leave was the ceiling.",
    futureHi:
      "परिवर्तन का वर्ष: यात्रा, बदलाव और नए बाज़ार। हाँ कहें — जो रुटीन छूटेगा, वही आपकी छत थी।",
    intensity: 7,
    volatile: true,
  },
  6: {
    pastEn:
      "This was a FAMILY-AND-RESPONSIBILITY year — home, marriage-heat or household duty took the front seat. Big decisions about home, family functions, or caring for elders filled the calendar. Beauty and money both improved if you kept balance.",
    pastHi:
      "यह परिवार और ज़िम्मेदारी का वर्ष था — घर, रिश्ते-विवाह की चर्चा या गृहस्थी का बोझ आगे बैठा। घर से जुड़े बड़े निर्णय, लोक-आचार, या बड़ों की सेवा ने कैलेंडर भर दिया। संतुलन रखा तो शोभा और धन दोनों बढ़े।",
    futureEn:
      "A FAMILY year: home, harmony and commitment move. Say the important sentence at the dining table this year.",
    futureHi:
      "परिवार का वर्ष: घर, सद्भाव और संकल्प चलेंगे। इस साल खाने की मेज़ पर वह अहम बात कह दें।",
    intensity: 7,
    volatile: false,
  },
  7: {
    pastEn:
      "This was a QUIET, INWARD year — questions bigger than answers. Probably withdrawal from noise, deep study or spiritual pull, and one period of feeling alone even among people. What you learned that year still runs in your blood.",
    pastHi:
      "यह शांत, भीतर-मुखी वर्ष था — सवाल जवाबों से बड़े थे। शोर से हटना, गहन अध्ययन या आध्यात्म का खिंचाव, और भीड़ में भी अकेलापन — यही रहा होगा। उस साल सीखा हुआ आज भी आपके ख़ून में बहता है।",
    futureEn:
      "An INNER year: study, research and retreat pay. Push loud launches next year — this year master the craft.",
    futureHi:
      "अंतरंग वर्ष: अध्ययन, शोध और एकांत फलते हैं। शोर-भरा लॉन्च अगले साल के लिए — इस साल कला में महारत।",
    intensity: 4,
    volatile: false,
  },
  8: {
    pastEn:
      "This was a MONEY-AND-POWER year — career pressure and career reward together. Position, promotion, property, big money-moves; and equally, if you cut corners, a bill arrived. A year of heavy stakes that made you heavier.",
    pastHi:
      "यह धन और शक्ति का वर्ष था — करियर का दबाव और दावत एक साथ। पद, प्रमोशन, संपत्ति, बड़े आर्थिक निर्णय; और रास्ता काटा तो बिल भी आया। भारी दाँव-पेंच का साल जिसने आपको भारी बनाया।",
    futureEn:
      "A MONEY-AND-POWER year: ask for the position, close the property, sign the deal — and do it clean, because Saturn audits.",
    futureHi:
      "धन-शक्ति का वर्ष: पद माँगें, संपत्ति पक्की करें, सौदा बाँधें — और साफ़ खेलें, क्योंकि शनि लेखा जोखा करता है।",
    intensity: 9,
    volatile: true,
  },
  9: {
    pastEn:
      "This was a COMPLETION year — something ended so the next cycle could start: a chapter, a job, a bond, an address. Emotions ran high; letting go was the lesson. By year-end you were already a different person.",
    pastHi:
      "यह समापन का वर्ष था — अगला चक्र शुरू करने के लिए कुछ खत्म हुआ: एक अध्याय, नौकरी, बंधन या पता। भावनाएँ तेज़ चलीं; छोड़ना ही पाठ था। साल खत्म होते-होते आप पहले से अलग इंसान थे।",
    futureEn:
      "A COMPLETION year: close what is finished — gracefully, on purpose. Space you clear now becomes next year's launchpad.",
    futureHi:
      "समापन का वर्ष: जो पूरा हो चुका है, उसे सम्मान से बंद करें। अब खाली की जगह अगले साल का उड़ान-पट्टर है।",
    intensity: 9,
    volatile: true,
  },
};

/** Age-context lines layered onto PY essence (past readings). */
function ageContextHi(age: number): string {
  if (age <= 5) return "बचपन की उम्र — परिवार का माहौल ही उस वर्ष का मौसम था।";
  if (age <= 12) return "स्कूल-दशा की उम्र — पढ़ाई और घर, दोनों ने रूप दिया।";
  if (age <= 18) return "किशोर दशा — रुख़, दोस्ती और पहचान की ज़िम्मेदारी इसी वर्ष के अंकों से चली।";
  if (age <= 25) return "इक्कीस के आसपास की दशा — करियर/पढ़ाई के बड़े निर्णयों की उम्र, अंकों ने रास्ता चुनाया।";
  if (age <= 35) return "तीस के दशक की चढ़ाई — करियर-रिश्ते-धन के बड़े दाँव इसी दौर के अंकों में बँटे।";
  if (age <= 45) return "चालीस के दशक — शिखर और ज़िम्मेदारी दोनों का दबाव, अंकों ने लय तय की।";
  if (age <= 58) return "पचास के दशक — अनुभव का वज़न और नई दिशा की तलाश, इस वर्ष के अंकों से पढ़ी जाती है।";
  return "उम्र के इस पड़ाव पर अंक दिशा बदलने का संकेत देते हैं — समापन और उत्तराधिकार का दौर।";
}

function ageContextEn(age: number): string {
  if (age <= 5) return "Early childhood — the family climate itself was that year's weather.";
  if (age <= 12) return "School years — study and home both shaped the year.";
  if (age <= 18) return "Adolescent phase — direction, friendship and identity moved on this year's numbers.";
  if (age <= 25) return "The early-twenties phase — the age of big career/study decisions; the numbers picked the lane.";
  if (age <= 35) return "The climb of the thirties — big career-relationship-money stakes rode this period's numbers.";
  if (age <= 45) return "The forties — summit and responsibility together; the numbers set the rhythm.";
  if (age <= 58) return "The fifties — the weight of experience and the search for the next direction read through this year.";
  return "At this life-station the numbers signal a change of direction — the era of legacy and completion.";
}

/* ------------------------------------------------------------------ */
/* Karmic / pinnacle / cycle activations                               */
/* ------------------------------------------------------------------ */

function karmicActivation(year: number, birthYear: number, birthMonth: number, birthDay: number): string[] {
  const tags: string[] = [];
  // Karmic debt 13/14/16/19 in the compound PY sum (month + day + year digits).
  const sum = reduce(birthMonth) + reduce(birthDay) + reduce(year);
  if ([13, 14, 16, 19].includes(sum)) tags.push("karmic-debt");
  // 9-year cycle boundaries: age divisible by 9 (0 is excluded — birth year).
  const age = year - birthYear;
  if (age > 0 && age % 9 === 0) tags.push("cycle-end");
  return tags;
}

function activationCopy(tag: string, lang: "en" | "hi"): string {
  if (lang === "hi") {
    switch (tag) {
      case "karmic-debt":
        return "कर्मिक ऋण-अंक सक्रिय — इस वर्ष मेहनत का पूरा हिसाब माँगा गया; जो काम अधूरा छोड़ा था, उसी ने दोबारा सिर उठाया।";
      case "cycle-end":
        return "9-वर्षीय चक्र की समाप्ति — एक अध्याय बंद हुआ, अगले साल से नया चक्र चढ़ा।";
      case "pinnacle":
        return "शिखर-अंक का स्थानांतरण — जीवन की धारा इसी वर्ष नए चैनल में उतरी।";
      case "peak-year":
        return "चक्र के शिखर का वर्ष — जो किया, उसका असर साफ़ दिखा।";
      default:
        return "";
    }
  }
  switch (tag) {
    case "karmic-debt":
      return "Karmic debt active — the year demanded a full reckoning of effort; unfinished work resurfaced.";
    case "cycle-end":
      return "End of a 9-year cycle — one chapter closed; a new cycle began from the next year.";
    case "pinnacle":
      return "Pinnacle transition — life's current switched channels in this very year.";
    case "peak-year":
      return "Peak of the cycle — what you did that year showed its effect openly.";
    default:
      return "";
  }
}

function pinnacleAt(pins: Pinnacle[], age: number): Pinnacle {
  return pins.find((p) => age >= p.ageStart && age <= p.ageEnd) ?? pins[pins.length - 1];
}

/* ------------------------------------------------------------------ */
/* v3.1 BIG-YEAR detection ('बड़े साल') — owner correction #2           */
/* ------------------------------------------------------------------ */

/**
 * A PAST year is BIG ('बड़े साल') when ANY of these fires:
 *   1. karmic debt (13/14/16/19) active in the compound PY sum
 *   2. pinnacle boundary/start (a new 9-year pinnacle chapter opens)
 *   3. PY 1 (cycle start) or PY 9 (completion)
 *   4. PY equals Mulank or Bhagyank
 *   5. digit-repetition surge year (see lib/life-graph digitSurge)
 *   6. karmic milestone ages (27/36/45/54)
 * Non-big years render as the faint background curve only.
 */

export interface BigYearOpts {
  mulank?: number; // reduced birth-day number (masters preserved by caller)
  bhagyank?: number; // life-path number (masters preserved by caller)
}

/** Karmic milestone ages the school flags as big-turning-point years. */
export const KARMIC_MILESTONE_AGES = [27, 36, 45, 54] as const;

function foldMaster(n: number): number {
  return n === 11 ? 2 : n === 22 ? 4 : n === 33 ? 6 : n;
}

function ds(n: number): number {
  let s = n;
  while (s > 9) s = String(s).split("").reduce((acc, d) => acc + Number(d), 0);
  return s;
}

/**
 * DIGIT-REPETITION SURGE: for every digit with ≥2 repetitions in the full
 * DOB, simulate the calendar year by ADDING that count to the PY sum — a
 * repeated digit entering the year-sum makes the year compound-heavy. The
 * year is a surge when the sum lands on/crosses a 9-multiple that the
 * base year (without the repeat) did not. Returns the strongest surge.
 */
export function digitSurge(
  year: number,
  month: number,
  day: number,
): { digit: number; extra: number } | null {
  const dateStr = `${String(day).padStart(2, "0")}${String(month).padStart(2, "0")}${year}`;
  const counts: Record<number, number> = {};
  for (const ch of dateStr) {
    const d = Number(ch);
    if (d >= 1 && d <= 9) counts[d] = (counts[d] ?? 0) + 1;
  }
  const prevSum = ds(month) + ds(day) + ds(year - 1);
  const curSum = ds(month) + ds(day) + ds(year);
  if (curSum <= prevSum) return null; // wrap year (9→1) — no clean surge read
  let best: { digit: number; extra: number } | null = null;
  for (const [dStr, c] of Object.entries(counts)) {
    if (c < 2) continue;
    const d = Number(dStr);
    const cur = curSum + c;
    const prev = prevSum + c;
    if (cur > prev && Math.floor(cur / 9) > Math.floor(prev / 9)) {
      const cand = { digit: d, extra: c };
      if (!best || cand.extra > best.extra || (cand.extra === best.extra && cand.digit < best.digit)) {
        best = cand;
      }
    }
  }
  return best;
}

/** The LIKELY EVENT TYPE named directly for each big year (owner's lines). */
export const BIG_EVENT_BY_PY: Record<number, { en: string; hi: string }> = {
  1: {
    en: "A big change like a job/admission happened this year — a new chapter opened.",
    hi: "इस साल नौकरी/एडमिशन जैसा बड़ा बदलाव हुआ होगा — नया अध्याय खुला।",
  },
  2: {
    en: "The year of marriage-love — a bond deepened or a partnership formed.",
    hi: "शादी-प्यार का साल — कोई रिश्ता गहरा हुआ या साझेदारी बनी।",
  },
  3: {
    en: "Your name travelled — results, recognition or a creative win.",
    hi: "आपका नाम दूर तक गया — परिणाम, पहचान या सृजन की जीत।",
  },
  4: {
    en: "A foundation year — hard grind that quietly rebuilt your base.",
    hi: "नींव का साल — कठोर मेहनत ने चुपचाप आधार मज़बूत किया।",
  },
  5: {
    en: "Travel-foreign signals — movement, switch or relocation energy.",
    hi: "ट्रैवल-विदेश संकेत — यात्रा, बदलाव या स्थानांतरण की ऊर्जा।",
  },
  6: {
    en: "The year of marriage-love.",
    hi: "शादी-प्यार का साल।",
  },
  7: {
    en: "A study-inward year — deep preparation that paid later.",
    hi: "अध्ययन-अंतरंग वर्ष — गहन तैयारी जो बाद में काम आई।",
  },
  8: {
    en: "A money-income-jump window opened.",
    hi: "पैसा-इनकम जंप की window खुली।",
  },
  9: {
    en: "A chapter closed — an elder of the house passed, the era of legacy began (read with care).",
    hi: "किसी बड़े का जाना — घर में विरासत का दौर (सहानुभूति से पढ़ें)।",
  },
};

/** Short badge labels for each big-year reason. */
export const BIG_REASON_LABEL: Record<string, { en: string; hi: string }> = {
  "karmic-debt": { en: "karmic debt active", hi: "कर्मिक ऋण सक्रिय" },
  "pinnacle-boundary": { en: "pinnacle boundary", hi: "शिखर-बदल की सीमा" },
  "py-1-start": { en: "PY 1 — cycle start", hi: "दशा 1 — चक्र-आरंभ" },
  "py-9-completion": { en: "PY 9 — completion", hi: "दशा 9 — समापन" },
  "py-mulank": { en: "PY = Mulank", hi: "दशा = मूलांक" },
  "py-bhagyank": { en: "PY = Bhagyank", hi: "दशा = भाग्यांक" },
  "digit-surge-2": { en: "digit-repetition surge", hi: "अंक-पुनरावृत्ति वृद्धि" },
  "digit-surge-3": { en: "triple-digit surge", hi: "त्रिक-अंक वृद्धि" },
  "milestone-age": { en: "karmic milestone age", hi: "कर्मिक मील-पत्थर आयु" },
};

/* ------------------------------------------------------------------ */
/* Main builder                                                        */
/* ------------------------------------------------------------------ */

/**
 * Build the full life-graph: every year birth → now (past, markable),
 * the current year (readable, not markable), and +10 future years.
 */
export function buildLifeGraph(
  birthYear: number,
  birthMonth: number,
  birthDay: number,
  nowYear: number,
  pinnacles: Pinnacle[],
  opts: BigYearOpts = {},
): LifeGraphResult {
  const past: PastYearReading[] = [];
  const future: FutureYearReading[] = [];
  let currentYear: PastYearReading | null = null;

  const mulank = opts.mulank !== undefined ? foldMaster(opts.mulank) : foldMaster(ds(birthDay));
  const bhagyank =
    opts.bhagyank !== undefined ? foldMaster(opts.bhagyank) : foldMaster(bhagyankOf(birthYear, birthMonth, birthDay));

  const total = nowYear + 10 - birthYear + 1;
  for (let i = 0; i < total; i++) {
    const year = birthYear + i;
    const age = i;
    const pyRes = personalYear(birthMonth, birthDay, year);
    const py = pyRes.number;
    const ess = PY_ESSENCE[py] ?? PY_ESSENCE[1];

    // Activations: karmic debt in the compound sum, cycle boundaries, pinnacle shift.
    const acts: string[] = [];
    const actHi: string[] = [];
    const karm = karmicActivation(year, birthYear, birthMonth, birthDay);
    acts.push(...karm);
    actHi.push(...karm.map((t) => activationCopy(t, "hi")));
    const prevPin = pinnacleAt(pinnacles, Math.max(0, age - 1));
    const curPin = pinnacleAt(pinnacles, age);
    if (age > 0 && prevPin.index !== curPin.index) {
      acts.push("pinnacle");
      actHi.push(activationCopy("pinnacle", "hi"));
    }
    if (py === 1 || py === 8 || py === 9) {
      acts.push("peak-year");
      actHi.push(activationCopy("peak-year", "hi"));
    }

    // v3.1 BIG-YEAR detection (past/current years only — future years are
    // weather, not events).
    const bigReasons: string[] = [];
    if (year <= nowYear) {
      if (karm.includes("karmic-debt")) bigReasons.push("karmic-debt");
      if (age > 0 && prevPin.index !== curPin.index) bigReasons.push("pinnacle-boundary");
      if (py === 1) bigReasons.push("py-1-start");
      if (py === 9) bigReasons.push("py-9-completion");
      if (py === mulank) bigReasons.push("py-mulank");
      if (py === bhagyank) bigReasons.push("py-bhagyank");
      const surge = digitSurge(year, birthMonth, birthDay);
      if (surge) bigReasons.push(surge.extra >= 3 ? "digit-surge-3" : "digit-surge-2");
      if ((KARMIC_MILESTONE_AGES as readonly number[]).includes(age)) bigReasons.push("milestone-age");
    }
    const big = bigReasons.length > 0;
    const ev = big ? (BIG_EVENT_BY_PY[py] ?? BIG_EVENT_BY_PY[1]) : null;

    // Intensity: PY shape, boosted by activations.
    let intensity = ess.intensity;
    if (ess.volatile) intensity += 1;
    if (acts.includes("karmic-debt")) intensity += 1;
    if (acts.includes("pinnacle")) intensity += 1;
    intensity = Math.max(1, Math.min(10, intensity));

    const readingEn = `${ess.pastEn} ${ageContextEn(age)}${
      acts.length > 0
        ? " " + acts.map((t) => activationCopy(t, "en")).join(" ")
        : ""
    }`;
    const readingHi = `${ess.pastHi} ${ageContextHi(age)}${
      actHi.length > 0 ? " " + actHi.join(" ") : ""
    }`;

    const isCurrent = year === nowYear;
    const item: PastYearReading = {
      year,
      age,
      py,
      intensity,
      readingEn,
      readingHi,
      activations: acts,
      activationTagsHi: actHi,
      big,
      bigReasons,
      eventEn: ev?.en ?? null,
      eventHi: ev?.hi ?? null,
    };
    if (year < nowYear) past.push(item);
    else if (isCurrent) currentYear = item;
    else
      future.push({
        year,
        age,
        py,
        intensity,
        readingEn: ess.futureEn,
        readingHi: ess.futureHi,
      });
  }

  return {
    past,
    future,
    currentYear,
    bigYears: [...past, ...(currentYear ? [currentYear] : [])].filter((p) => p.big).sort((a, b) => a.year - b.year),
    patternNoteEn: null,
    patternNoteHi: null,
    steps: [
      `Personal Year = birth month ${birthMonth} + birth day ${birthDay} + calendar year, each reduced, then the sum reduced.`,
      `Every year from ${birthYear} to ${nowYear + 10} computed: ${total} readings.`,
      `Past years carry karmic/pinnacle/cycle activation tags; future years carry PY weather.`,
      `Intensity (1-10) = PY shape, boosted by volatile/karmic/pinnacle activations.`,
      `बड़े साल (BIG years): karmic debt 13/14/16/19 active, pinnacle boundary, PY 1 (cycle start) or PY 9 (completion), PY = Mulank or Bhagyank, digit-repetition surge, or karmic milestone ages 27/36/45/54 — each big year names its likely event type; the timeline is built from these.`,
    ],
  };
}

/** Reduced Bhagyank for the surge/big-year math (no master preservation). */
function bhagyankOf(year: number, month: number, day: number): number {
  return ds(month) + ds(day) + ds(year);
}

/* ------------------------------------------------------------------ */
/* Pattern note from user marks                                        */
/* ------------------------------------------------------------------ */

/**
 * Marks sharpen the pattern note: count सही/गलत, name the strongest
 * confirmed PY cluster and the most rejected year-type.
 */
export function patternNote(
  marks: YearMark[],
  past: PastYearReading[],
): { en: string | null; hi: string | null } {
  if (marks.length === 0) return { en: null, hi: null };
  const byYear = new Map(past.map((p) => [p.year, p]));
  const sahi = marks.filter((m) => m.verdict === "sahi" && byYear.has(m.year));
  const galat = marks.filter((m) => m.verdict === "galat" && byYear.has(m.year));
  if (sahi.length === 0 && galat.length === 0) return { en: null, hi: null };

  const pyCount = new Map<number, number>();
  for (const m of sahi) {
    const p = byYear.get(m.year)!;
    pyCount.set(p.py, (pyCount.get(p.py) ?? 0) + 1);
  }
  const topPy = [...pyCount.entries()].sort((a, b) => b[1] - a[1])[0];

  const sahiYears = sahi.map((m) => m.year).sort((a, b) => a - b);
  const galatYears = galat.map((m) => m.year).sort((a, b) => a - b);

  if (langIsHi(topPy === undefined)) {
    // unreachable, kept for type narrowing
  }

  if (topPy) {
    const en = `You confirmed ${sahi.length} year${sahi.length > 1 ? "s" : ""} (✓ सही: ${sahiYears.join(", ")}) and rejected ${galat.length} (✗ गलत${galatYears.length ? ": " + galatYears.join(", ") : ""}). Your confirmed events cluster in Personal Year ${topPy[0]} cycles — the ${topPy[1]}× confirmation sharpens every future reading on this graph.`;
    const hi = `आपने ${sahi.length} वर्ष सही (✓: ${sahiYears.join(", ")}) और ${galat.length} गलत (✗${galatYears.length ? ": " + galatYears.join(", ") : ""}) किए। आपकी पक्की घटनाएँ व्यक्तिगत-वर्ष ${topPy[0]} के चक्र में जमा हैं — ${topPy[1]}× पुष्टि इस ग्राफ़ की आगे की हर रीडिंग को और तेज़ करती है।`;
    return { en, hi };
  }
  const en = `You rejected ${galat.length} reading${galat.length > 1 ? "s" : ""} — your chart runs off-cycle, which is itself a rare signature. Keep marking; the pattern will name itself.`;
  const hi = `आपने ${galat.length} रीडिंग गलत की — आपका चार्ट चक्र से बाहर चलता है, यह आप में दुर्लभ दस्तख़त है। चिह्न लगाते रहें; पैटर्न अपना नाम खुद बोलेगा।`;
  return { en, hi };
}

function langIsHi(_x: unknown): boolean {
  return false;
}

/* ------------------------------------------------------------------ */
/* Curve geometry                                                      */
/* ------------------------------------------------------------------ */

export interface CurvePoint {
  x: number;
  y: number;
  year: number;
  intensity: number;
  py: number;
  isFuture: boolean;
  isCurrent: boolean;
  pinned: boolean; // confirmed सही event
  rejected: boolean; // marked गलत
  big: boolean; // v3.1 बड़े साल
  bigReasons: string[]; // v3.1 why big
  eventLabel: string | null; // v3.1 likely event type (lang-neutral key resolved by UI)
  eventLabelHi: string | null;
}

export interface CurveGeometry {
  width: number;
  height: number;
  points: CurvePoint[];
  path: string;
  futurePath: string;
  faintPath: string; // v3.1: non-big past years = faint background curve
  bigPath: string; // v3.1: big years = strong curve
  ticks: { x: number; label: string }[];
  pins: CurvePoint[];
  bigPins: CurvePoint[]; // v3.1: big-year pins with event labels
}

/** SVG geometry for the intensity curve birth → now (+10 ahead, dashed). */
export function curveGeometry(
  graph: LifeGraphResult,
  marks: YearMark[],
  width = 820,
  height = 340,
): CurveGeometry {
  const padL = 46;
  const padR = 20;
  const padT = 24;
  const padB = 40;
  const markMap = new Map(marks.map((m) => [m.year, m.verdict]));

  const all: CurvePoint[] = [];
  const push = (r: PastYearReading | FutureYearReading, isFuture: boolean) => {
    const verdict = markMap.get(r.year);
    const pr = r as PastYearReading;
    all.push({
      x: 0,
      y: 0,
      year: r.year,
      intensity: r.intensity,
      py: r.py,
      isFuture,
      isCurrent: !isFuture && r.year === graph.currentYear?.year,
      pinned: verdict === "sahi",
      rejected: verdict === "galat",
      big: !isFuture && pr.big === true,
      bigReasons: !isFuture ? (pr.bigReasons ?? []) : [],
      eventLabel: !isFuture ? (pr.eventEn ?? null) : null,
      eventLabelHi: !isFuture ? (pr.eventHi ?? null) : null,
    });
  };
  graph.past.forEach((p) => push(p, false));
  if (graph.currentYear) push(graph.currentYear, false);
  graph.future.forEach((f) => push(f, true));

  const minYear = all[0]?.year ?? 0;
  const maxYear = all[all.length - 1]?.year ?? minYear + 1;
  const span = Math.max(1, maxYear - minYear);
  for (const p of all) {
    p.x = padL + ((p.year - minYear) / span) * (width - padL - padR);
    p.y = padT + (1 - (p.intensity - 1) / 9) * (height - padT - padB);
  }

  const mkPath = (pts: CurvePoint[]): string =>
    pts
      .map((p, i) => {
        if (i === 0) return `M ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
        const prev = pts[i - 1];
        const cx = (prev.x + p.x) / 2;
        return `C ${cx.toFixed(1)} ${prev.y.toFixed(1)}, ${cx.toFixed(1)} ${p.y.toFixed(1)}, ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
      })
      .join(" ");

  const solid = all.filter((p) => !p.isFuture);
  const futurePts = all.filter((p) => p.isFuture);
  // Future path starts at the last solid point so the dashed segment connects.
  const futurePath = solid.length > 0 && futurePts.length > 0
    ? mkPath([solid[solid.length - 1], ...futurePts])
    : "";

  // v3.1: big years = strong curve, non-big past years = faint background.
  // Runs of consecutive big/non-big years form segments so the curve stays
  // connected where consecutive years share the same class.
  const bigPts = solid.filter((p) => p.big || p.isCurrent);
  const faintPts = solid.filter((p) => !p.big && !p.isCurrent);
  const toSegments = (pts: CurvePoint[]): string => {
    if (pts.length === 0) return "";
    const segs: CurvePoint[][] = [];
    let cur: CurvePoint[] = [pts[0]];
    for (let i = 1; i < pts.length; i++) {
      const prev = cur[cur.length - 1];
      if (pts[i].year - prev.year > 1) {
        segs.push(cur);
        cur = [pts[i]];
      } else {
        cur.push(pts[i]);
      }
    }
    segs.push(cur);
    const out: string[] = [];
    for (const seg of segs) {
      if (seg.length === 1) {
        // Single isolated point — draw a short horizontal dash so it reads.
        const p = seg[0];
        out.push(`M ${(p.x - 5).toFixed(1)} ${p.y.toFixed(1)} L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`);
      } else {
        out.push(mkPath(seg));
      }
    }
    return out.join(" ");
  };
  const bigPath = toSegments(bigPts);
  const faintPath = toSegments(faintPts);

  const ticks: { x: number; label: string }[] = all
    .filter((_, i) => i % 5 === 0 || i === all.length - 1)
    .map((p) => ({ x: p.x, label: String(p.year) }));

  return {
    width,
    height,
    points: all,
    path: mkPath(solid),
    futurePath,
    faintPath,
    bigPath,
    ticks,
    pins: all.filter((p) => p.pinned),
    bigPins: all.filter((p) => p.big || p.isCurrent),
  };
}

/** Public for tests: PY essence shape used by the curve. */
export function pyEssenceShape(py: number): { intensity: number; volatile: boolean } {
  const e = PY_ESSENCE[py] ?? PY_ESSENCE[1];
  return { intensity: e.intensity, volatile: e.volatile };
}

/** Public for tests: activation copy exists for every tag. */
export function activationTags(): string[] {
  return ["karmic-debt", "cycle-end", "pinnacle", "peak-year"];
}