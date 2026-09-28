/**
 * Anko Ki Maya v3 — BALANCED TRUTH-TELLING ENGINE (owner directive, 29 Sep).
 *
 * "App will say truth, not just good and positive — bad news also, good
 * also, with basis and reasoning."
 *
 * Pattern for every difficult verdict: SACCHAN (truth) → KAARAN (basis:
 * which number/karmic/planet combo produced it) → UPAY (remedy) → SAMAY
 * (when it eases). A master jyotishi who respects the reader enough not to
 * lie — direct, calm, never fear-mongering, never dramatised.
 *
 * HARD-BANS unchanged: death-timing, illness/diagnosis, pregnancy, crime,
 * medical claims, '100% guaranteed'. Difficulty is expressed as
 * "difficult year with struggle indications + remedy", never doom claims.
 */

import { reduce } from "./numerology";

export type VerdictKind = "strong" | "difficult" | "mixed";

export interface TruthVerdict {
  kind: VerdictKind;
  /** SACCHAN — the truth, said plainly. */
  truthEn: string;
  truthHi: string;
  /** KAARAN — the reasoning chain (numbers/karmic/planets). */
  basisEn: string;
  basisHi: string;
  /** UPAY — remedy line (always present for difficult verdicts). */
  remedyEn: string;
  remedyHi: string;
  /** SAMAY — when it eases. */
  easesEn: string | null;
  easesHi: string | null;
}

export interface TruthContext {
  mulank: number;
  bhagyank: number;
  py: number; // current/relevant personal year
  karmicDebts: number[]; // e.g. [13, 14] detected
  missingDigits: number[]; // karmic lessons
  tensePairs: [number, number][]; // enemy-planet combos present
  nowYear: number;
  birthYear: number;
}

/* ------------------------------------------------------------------ */
/* Verdict builders per PY (9-year weather, truth-telling form)         */
/* ------------------------------------------------------------------ */

interface PyTruth {
  kind: VerdictKind;
  truthEn: string;
  truthHi: string;
  basisEn: string;
  basisHi: string;
  remedyEn: string;
  remedyHi: string;
  easesEn: string | null;
  easesHi: string | null;
}

const PY_TRUTHS: Record<number, PyTruth> = {
  1: {
    kind: "strong",
    truthEn: "A STRONG beginning year — but beginnings tax the nerves: new roles feel heavier before they feel yours.",
    truthHi: "प्रबल आरंभ-वर्ष — पर शुरुआत नसों पर कर लेती है: नई भूमिका अपनी लगने से पहले भारी लगती है।",
    basisEn: "PY 1 = Surya's ignition; combined with your chart it demands self-definition.",
    basisHi: "अंक-दशा 1 = सूर्य का प्रज्वलन; चार्ट के साथ मिलकर यह आत्म-संकल्प माँगता है।",
    remedyEn: "Sunrise water to Surya, 108× 'Om Suryaya Namah' on Sundays.",
    remedyHi: "प्रातः सूर्य-जल अर्पण, रविवार 'ॐ सुर्याय नमः' का 108 जप।",
    easesEn: "The load eases after the first quarter.",
    easesHi: "पहली तिमाही के बाद बोझ हल्का होगा।",
  },
  2: {
    kind: "mixed",
    truthEn: "A PATIENCE year — progress is real but slow, and slowness will test your temper. Waiting is not failure; rushing here loses more.",
    truthHi: "धैर्य-वर्ष — प्रगति सच्ची पर धीमी, और धीमापन आपके धैर्य की परीक्षा लेगा। इंतज़ार असफलता नहीं; यहाँ जल्दबाज़ी ज़्यादा गँवाती है।",
    basisEn: "PY 2 = Chandra's slow tide; partnerships ripen at the Moon's pace, not yours.",
    basisHi: "अंक-दशा 2 = चंद्रमा की धीमी लहर; साझेदारियाँ चंद्र की गति से पकती हैं, आपकी नहीं।",
    remedyEn: "White daan on Mondays, 108× 'Om Chandraya Namah'.",
    remedyHi: "सोमवार श्वेत दान, 'ॐ चंद्राय नमः' का 108 जप।",
    easesEn: "Momentum returns visibly in the second half.",
    easesHi: "दूसरे हाफ़ में गति साफ़ दिखेगी।",
  },
  3: {
    kind: "strong",
    truthEn: "An EXPRESSIVE year — your name travels, rooms open. The truth also: scattered energy is this year's tax; too many tables starve the main one.",
    truthHi: "अभिव्यक्ति-वर्ष — आपका नाम दूर जाएगा, महफ़िलें खुलेंगी। सच यह भी: बिखराव इस साल का कर है; बहुत मेज़ों पर बैठने से मुख्य मेज़ भूखी रह जाती है।",
    basisEn: "PY 3 = Guru's expansion through voice and network.",
    basisHi: "अंक-दशा 3 = गुरु का वाणी-और-संग विस्तार।",
    remedyEn: "Turmeric daan on Thursdays, 108× 'Om Gurave Namah'; pick two tables, decline the rest.",
    remedyHi: "गुरुवार हल्दी दान, 'ॐ गुरवे नमः' 108 जप; दो मेज़ें चुनें, बाक़ी मना करें।",
    easesEn: "Focus pays within the same year.",
    easesHi: "एकाग्रता इसी वर्ष फल देती है।",
  },
  4: {
    kind: "difficult",
    truthEn: "A DIFFICULT, HEAVY year — this is one of your chart's consolidation troughs: effort doubles, applause stays quiet, and pushing a big launch against this grain costs double.",
    truthHi: "कठिन, भारी वर्ष — यह आपके चार्ट के संवर्धन-गर्तों में से एक है: मेहनत दोगुनी, तालियाँ मौन, और इस लय के विरुद्ध बड़ा लॉन्च दोगुना महँगा पड़ेगा।",
    basisEn: "PY 4 = Rahu's grind under discipline; the 4-year punishes shortcuts and rewards only systems.",
    basisHi: "अंक-दशा 4 = राहु की अनुशासन-मेहनत; 4-वर्ष शॉर्टकट दंडित करता है, केवल सिस्टम को पुरस्कृत करता है।",
    remedyEn: "Oil daan on Saturdays is for Shani; for 4 keep the ledger daily, 'Om Rahave Namah' 108 japa on Saturdays, and delay big launches one year.",
    remedyHi: "शनि के लिए शनिवार तेल-दान; अंक 4 के लिए रोज़ बही-खाता, शनिवार 'ॐ राहवे नमः' 108 जप, और बड़ा लॉन्च एक वर्ष टालें।",
    easesEn: "This eases at the next PY 5 — the change year unlocks what 4 locked.",
    easesHi: "अगले अंक-दशा 5 में खुलेगा — परिवर्तन-वर्ष 4 का ताला खोलेगा।",
  },
  5: {
    kind: "mixed",
    truthEn: "A CHANGE year — movement pays, but volatility is the fee. Switches, travel and new markets bring gains; impulsive big bets lose.",
    truthHi: "परिवर्तन-वर्ष — चाल फलती है, पर उतार-चढ़ाव इसका किराया है। बदलाव, यात्रा और नए बाज़ार लाभ देंगे; बिना सोचे बड़ा दाँव हारा देगा।",
    basisEn: "PY 5 = Budh's commerce; Mercury wins on calculation, loses on impulse.",
    basisHi: "अंक-दशा 5 = बुध की व्यापार-बुद्धि; बुध गिनती से जीतता है, लालच से हारता है।",
    remedyEn: "Green clothing on Wednesdays, 108× 'Om Budhaya Namah'; write every deal down before signing.",
    remedyHi: "बुधवार हरे वस्त्र, 'ॐ बुधाय नमः' 108 जप; हर सौदा साइन से पहले लिखें।",
    easesEn: "Stability returns at the next PY 6.",
    easesHi: "अगले अंक-दशा 6 में स्थिरता लौटेगी।",
  },
  6: {
    kind: "strong",
    truthEn: "A FAMILY-AND-FORTUNE year — home matters bloom and money through taste improves. The truth also: household duty will pull you hard; neglect at home bills you later.",
    truthHi: "परिवार-और-भाग्य वर्ष — घर के मामले फलेंगे, सौंदर्य से धन बढ़ेगा। सच यह भी: गृह-दायित्व ज़ोर मारेगा; घर की उपेक्षा बाद में बिल माँगेगी।",
    basisEn: "PY 6 = Shukra's abundance tied to responsibility.",
    basisHi: "अंक-दशा 6 = शुक्र की समृद्धि, जो ज़िम्मेदारी से बँधी है।",
    remedyEn: "White daan on Fridays, 108× 'Om Shukraya Namah'; keep the family promise before the business one.",
    remedyHi: "शुक्रवार श्वेत दान, 'ॐ शुक्राय नमः' 108 जप; पारिवारिक वादा पहले, व्यापारिक बाद।",
    easesEn: "Harmony shows by mid-year if duties are honoured early.",
    easesHi: "दायित्व पहले निभाए तो सद्भाव मध्य-वर्ष तक दिखेगा।",
  },
  7: {
    kind: "difficult",
    truthEn: "A DIFFICULT visibility year — loud pushes stall, recognition lags, and self-doubt whispers loudest now. This is a trough by design, not by your failure.",
    truthHi: "दृश्यता के लिए कठिन वर्ष — शोर-भरे प्रयास थमेंगे, पहचान देर से आएगी, और आत्म-संदेह अभी सबसे ज़ोर से फुसफुसाएगा। यह गर्त डिज़ाइन से है, आपकी असफलता से नहीं।",
    basisEn: "PY 7 = Ketu's inward turn; the ascetic year starves the stage and feeds the study.",
    basisHi: "अंक-दशा 7 = केतु का भीतर-मुख; तपस्वी-वर्ष मंच को भूखा रखता है, अध्ययन को तृप्त।",
    remedyEn: "108× 'Om Ketave Namah' on Saturdays, cream/brown daan; master one craft quietly — the stage reopens at PY 8/1.",
    remedyHi: "शनिवार 'ॐ केतवे नमः' 108 जप, क्रीम/भूरा दान; एक कला चुपचाप में महारत — मंच अंक-दशा 8/1 पर फिर खुलेगा।",
    easesEn: "Visibility returns at the next PY 8 — what you master now runs there.",
    easesHi: "दृश्यता अगले अंक-दशा 8 पर लौटेगी — अब की महारत वहीं चलेगी।",
  },
  8: {
    kind: "strong",
    truthEn: "A MONEY-AND-POWER year — position and property move toward you. The truth also: Saturn audits; every shortcut taken in past years sends its bill this year. Effort is heavy and non-negotiable.",
    truthHi: "धन-और-शक्ति वर्ष — पद और संपत्ति आपकी ओर चलेंगे। सच यह भी: शनि लेखा-जोखा करता है; पिछले वर्षों का हर शॉर्टकट इसी साल बिल भेजेगा। मेहनत भारी और अनिवार्य है।",
    basisEn: "PY 8 = Shani's harvest-and-audit; slow judge, permanent ledger.",
    basisHi: "अंक-दशा 8 = शनि की फ़सल-और-लेखा; धीमा न्यायाधीश, स्थायी बही।",
    remedyEn: "Oil daan on Saturdays, 108× 'Om Shanicharaya Namah'; keep every deal clean and every promise kept.",
    remedyHi: "शनिवार तेल-दान, 'ॐ शनैश्चराय नमः' 108 जप; हर सौदा साफ़, हर वादा निभा।",
    easesEn: "The audit softens once dues are paid early in the year.",
    easesHi: "साल के आरंभ में बकाया चुका दें तो जाँच नरम पड़ेगी।",
  },
  9: {
    kind: "mixed",
    truthEn: "A COMPLETION year — chapters end and that feels like loss before it feels like relief. Old frictions resurface for one last reckoning; impatience is this year's trap.",
    truthHi: "समापन-वर्ष — अध्याय बंद होंगे; राहत से पहले यह घाटे जैसा लगेगा। पुरानी खट-पट आख़िरी हिसाब के लिए उभरेगी; अधीरता इस साल का जाल है।",
    basisEn: "PY 9 = Mangal closing the cycle; Mars ends things forcefully if you delay gently.",
    basisHi: "अंक-दशा 9 = मंगल चक्र बंद करता है; देर की तो मंगल ज़बरदस्ती तोड़ेगा।",
    remedyEn: "Red lentil daan on Tuesdays, 108× 'Om Mangalaya Namah'; choose closure over confrontation.",
    remedyHi: "मंगलवार मसूर दान, 'ॐ मंगलाय नमः' 108 जप; टकराव की जगह समापन चुनें।",
    easesEn: "Relief arrives as the new PY 1 cycle begins.",
    easesHi: "नया अंक-दशा 1 चक्र शुरू होते ही राहत मिलेगी।",
  },
};

/** Truth-verdict for a personal year in context. */
export function truthForYear(py: number, ctx: TruthContext): TruthVerdict {
  const t = PY_TRUTHS[py] ?? PY_TRUTHS[1];
  const out: TruthVerdict = {
    kind: t.kind,
    truthEn: t.truthEn,
    truthHi: t.truthHi,
    basisEn: t.basisEn,
    basisHi: t.basisHi,
    remedyEn: t.remedyEn,
    remedyHi: t.remedyHi,
    easesEn: t.easesEn,
    easesHi: t.easesHi,
  };
  // Karmic debt present: sharpen the difficulty line with the basis chain.
  if (ctx.karmicDebts.length > 0 && (t.kind !== "strong" || py === 4 || py === 7)) {
    const nums = ctx.karmicDebts.join("/");
    out.truthHi = `${t.truthHi} इसके ऊपर आपके चार्ट में कर्मिक ऋण-अंक (${nums}) है — इस दौर की कठिनाई आपके लिए औसत से थोड़ी ज़्यादा पढ़ी जाएगी।`;
    out.truthEn = `${t.truthEn} Your chart also carries karmic debt mark(s) (${nums}) — this period reads a notch harder for you than average.`;
    out.basisHi = `${t.basisHi} आधार: कर्मिक ऋण-अंक ${nums} — अधूरे हिसाब इसी से लौटते हैं।`;
    out.basisEn = `${t.basisEn} Basis: karmic debt ${nums} — unfinished accounts return through it.`;
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Chart-level truth summary (karmic debt + missing digits + tense pairs)*/
/* ------------------------------------------------------------------ */

/**
 * The chart's honest ledger: what the numbers say plainly, each with basis,
 * remedy and easing window. Rendered as the report's "सच्चाई का पन्ना".
 */
export interface ChartTruth {
  verdicts: TruthVerdict[];
  summaryEn: string;
  summaryHi: string;
  steps: string[];
}

export function chartTruth(ctx: TruthContext): ChartTruth {
  const verdicts: TruthVerdict[] = [];

  for (const d of ctx.karmicDebts) {
    const map: Record<number, { en: string; hi: string; rem: { en: string; hi: string } }> = {
      13: {
        en: "Karmic debt 13 sits in your chart: hard work is your tuition — laziness will bill you, honest grind will pay you. Power used carelessly turns back.",
        hi: "आपके चार्ट में कर्मिक ऋण 13 बैठा है: मेहनत ही आपकी ट्यूशन फ़ीस है — सुस्ती बिल भेजेगी, ईमानदार जूनून देगा। सावधानी से इस्तेमाल न हुई शक्ति लौटती है।",
        rem: { en: "Keep daily work-discipline (fixed hours, kept promises) and 108× 'Om' japa at sunrise.", hi: "रोज़ काम-अनुशासन (पक्के घंटे, निभाए वादे) और प्रातः 'ॐ' का 108 जप।" },
      },
      14: {
        en: "Karmic debt 14 sits in your chart: freedom with risk is your lesson — money and dealings favour you, but over-reach and careless trust bill you.",
        hi: "आपके चार्ट में कर्मिक ऋण 14 है: जोखिम के साथ आज़ादी आपका पाठ है — धन और सौदों में भाग्य साथ देता है, पर अति-उत्साह और लापरवाह भरोसा बिल भेजेगा।",
        rem: { en: "Write every deal down, keep a cash buffer, 108× 'Om Budhaya Namah' on Wednesdays.", hi: "हर सौदा लिखें, नक़द बफ़र रखें, बुधवार 'ॐ बुधाय नमः' 108 जप।" },
      },
      16: {
        en: "Karmic debt 16 sits in your chart: towers built on ego take lightning — sudden falls follow pride, especially in partnerships. Humility is the insurance.",
        hi: "आपके चार्ट में कर्मिक ऋण 16 है: अहंकार पर खड़ी मीनार को बिजली गिरती है — गर्व के बाद अचानक गिरावट, विशेषकर साझेदारी में। नम्रता ही बीमा है।",
        rem: { en: "Consult before big calls, share credit openly, 108× 'Om' japa daily.", hi: "बड़े फ़ैसले से पहले सलाह, श्रेय खुलकर बाँटें, रोज़ 'ॐ' का 108 जप।" },
      },
      19: {
        en: "Karmic debt 19 sits in your chart: the prince's debt — success comes, but ego at the summit isolates. Keep advisors close and listen at least once.",
        hi: "आपके चार्ट में कर्मिक ऋण 19 है: राजकुमार का ऋण — सफलता मिलेगी, पर शिखर पर अहंकार अकेला कर देगा। सलाहकार पास रखें, कम-से-कम एक बार तो सुनें।",
        rem: { en: "Weekly counsel with a truthful elder, daan on your birthday.", hi: "सच्चे बुज़ुर्ग से साप्ताहिक सलाह, जन्मदिन पर दान।" },
      },
    };
    const m = map[d] ?? map[13];
    verdicts.push({
      kind: "difficult",
      truthEn: m.en,
      truthHi: m.hi,
      basisEn: `Karmic debt number ${d} detected in the chart's core positions (13/14/16/19 family).`,
      basisHi: `कर्मिक ऋण-अंक ${d} चार्ट के मुख्य स्थानों में पकड़ा गया (13/14/16/19 कुल)।`,
      remedyEn: m.rem.en,
      remedyHi: m.rem.hi,
      easesEn: "Eases as the debt's lessons are paid in behaviour, not just intention.",
      easesHi: "ऋण का पाठ व्यवहार में चुकाया जाए — नियत में नहीं — तब घटता है।",
    });
  }

  if (ctx.missingDigits.length > 0) {
    const d = ctx.missingDigits[0];
    verdicts.push({
      kind: "mixed",
      truthEn: `Missing number ${d} in your name: that lesson is not free — life will keep setting exams on digit ${d} until you study it deliberately.`,
      truthHi: `आपके नाम में अंक ${d} अनुपस्थित: वह पाठ मुफ़्त नहीं — जीवन अंक ${d} की परीक्षा तब तक दोहराएगा जब तक जान-बूझकर न पढ़ो।`,
      basisEn: `Digit ${d} never appears among the name's letter values (karmic lesson).`,
      basisHi: `नाम के अक्षर-मानों में अंक ${d} कहीं नहीं (कर्मिक पाठ)।`,
      remedyEn: `Write the number ${d} quality into your daily routine deliberately; strengthen its planet via the remedy table.`,
      remedyHi: `अंक ${d} का गुण जान-बूझकर दिनचर्या में लिखें; उसके ग्रह को उपाय-तालिका से बल दें।`,
      easesEn: null,
      easesHi: null,
    });
  }

  for (const [a, b] of ctx.tensePairs) {
    verdicts.push({
      kind: "difficult",
      truthEn: `Enemy-planet pairing ${a}-${b} sits in your chart: Sun-Saturn-type friction means quick success is NOT your gift — permanent success is. The tension is real; so is the payoff for those who keep discipline.`,
      truthHi: `शत्रु-ग्रह जोड़ी ${a}-${b} आपके चार्ट में बैठी है: सूर्य-शनि जैसा घर्षण माने — झटपट सफलता आपकी देन नहीं, स्थायी सफलता है। तनाव सच्चा है; अनुशासन रखने वालों का इनाम भी सच्चा है।`,
      basisEn: `Planet enmity between digit ${a} and ${b} (classical friendship table).`,
      basisHi: `अंक ${a} और ${b} के ग्रहों की शत्रुता (परंपरागत मित्र-तालिका)।`,
      remedyEn: "Surya-Shani reconciliation: sunrise water to the Sun + Saturday oil daan; keep the work-rest ledger honest.",
      remedyHi: "सूर्य-शनि मेल: प्रातः सूर्य-जल + शनिवार तेल-दान; काम-विराम का लेखा ईमानदार रखें।",
      easesEn: "Friction turns to footing as routines hold for a full season.",
      easesHi: "एक पूरे मौसम रुटीन टिके तो घर्षण पकड़ में बदलेगा।",
    });
  }

  // Current-year truth (always present).
  verdicts.push(truthForYear(ctx.py, ctx));

  const allDifficult = verdicts.filter((v) => v.kind !== "strong").length;
  const summaryEn =
    allDifficult > 0
      ? `${verdicts.length} honest verdict(s) on this page: ${allDifficult} carry difficulty with basis and remedy — a chart read truthfully, not flattered.`
      : "This chart reads strong — but its years still alternate: peaks demand building, troughs demand patience. No year is exempt.";
  const summaryHi =
    allDifficult > 0
      ? `इस पृष्ठ पर ${verdicts.length} ईमानदार निर्णायक हैं: ${allDifficult} में आधार और उपाय सहित कठिनाई कही गई — चार्ट ख़ुशामद नहीं, सच्चा पढ़ा गया है।`
      : "यह चार्ट प्रबल पढ़ा गया — पर उसके वर्ष फिर भी बारी-बारी चलेंगे: चोटी निर्माण माँगेगी, गर्त धैर्य। कोई वर्ष छूट का हक़दार नहीं।";

  return {
    verdicts,
    summaryEn,
    summaryHi,
    steps: [
      "Truth pattern: SACCHAN (the plain statement) → KAARAN (number/karmic/planet basis) → UPAY (remedy) → SAMAY (when it eases).",
      "Sources: karmic debts in core positions, missing name digits, enemy-planet pairings, Personal Year weather.",
      "Hard-bans respected: difficulty is stated as struggle-indications with remedy — never as death/illness/pregnancy/crime timing.",
    ],
  };
}

/** All verdict kinds present in a corpus? (test helper) */
export function corpusHasBothSides(verdicts: VerdictKind[]): boolean {
  return verdicts.includes("strong") && verdicts.includes("difficult");
}