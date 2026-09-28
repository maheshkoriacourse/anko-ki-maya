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
    truthHi: "prabal aarambh-saal — par shuruaat nason par kar leti hai: naee bhoomika apni lagane se pehle bhaari lagai hai.",
    basisEn: "PY 1 = Surya's ignition; combined with your chart it demands self-definition.",
    basisHi: "ank-dasha 1 = Surya ka prajvalan; chart ke saath milakar yeh aatm-sankalp maagata hai.",
    remedyEn: "Sunrise water to Surya, 108× 'Om Suryaya Namah' on Sundays.",
    remedyHi: "Praatah soory-jal arpan, Ravivaar 'ॐ Suryaya Namah' ka 108 japa.",
    easesEn: "The load eases after the first quarter.",
    easesHi: "pahai timaahee ke baad bojh halka hoga.",
  },
  2: {
    kind: "mixed",
    truthEn: "A PATIENCE year — progress is real but slow, and slowness will test your temper. Waiting is not failure; rushing here loses more.",
    truthHi: "dhairya-saal — pragati sachchee par dheemee, aur dheemaapan aapke dhairya ki pariksha lega. intajaar asafalta nahi; yahan jaldabaajaee zyada gvaai hai.",
    basisEn: "PY 2 = Chandra's slow tide; partnerships ripen at the Moon's pace, not yours.",
    basisHi: "ank-dasha 2 = Chandrama ki dheemee lahar; saajhedariyaan Chandra ki gati se pakai hain, aapki nahi.",
    remedyEn: "White daan on Mondays, 108× 'Om Chandraya Namah'.",
    remedyHi: "Somvaar shwet daan, 'ॐ Chandraya Namah' ka 108 japa.",
    easesEn: "Momentum returns visibly in the second half.",
    easesHi: "doosare haaph mein gati saaf dikhei.",
  },
  3: {
    kind: "strong",
    truthEn: "An EXPRESSIVE year — your name travels, rooms open. The truth also: scattered energy is this year's tax; too many tables starve the main one.",
    truthHi: "abhivyakti-saal — aapka naam door jaaega, mahaphailen khuleni. sach yeh bhi: bikharaav is saal ka kar hai; bahut mejaon par baithane se mukhya mej bhooi rah jaati hai.",
    basisEn: "PY 3 = Guru's expansion through voice and network.",
    basisHi: "ank-dasha 3 = Guru ka vaani-aur-sang vistar.",
    remedyEn: "Turmeric daan on Thursdays, 108× 'Om Gurave Namah'; pick two tables, decline the rest.",
    remedyHi: "Guruvaar haldi daan, 'ॐ Gurave Namah' 108 japa; do table chuno, baaki manaa karo.",
    easesEn: "Focus pays within the same year.",
    easesHi: "ekaagrata isi saal phal dei hai.",
  },
  4: {
    kind: "difficult",
    truthEn: "A DIFFICULT, HEAVY year — this is one of your chart's consolidation troughs: effort doubles, applause stays quiet, and pushing a big launch against this grain costs double.",
    truthHi: "kathin, bhaari saal — yeh aapke chart ke snvardhan-garton mein se ek hai: mehnat doguni, taaliyaa maun, aur is lay ke viruddh bada launch doguna mahga padaega.",
    basisEn: "PY 4 = Rahu's grind under discipline; the 4-year punishes shortcuts and rewards only systems.",
    basisHi: "ank-dasha 4 = Rahu ki anushasan-mehnat; 4-saal shortcut dndit karta hai, keval system ko puraskrit karta hai.",
    remedyEn: "Oil daan on Saturdays is for Shani; for 4 keep the ledger daily, 'Om Rahave Namah' 108 japa on Saturdays, and delay big launches one year.",
    remedyHi: "Shani ke liye Shanivaar tail-daan; ank 4 ke liye roz hisaab-kitaab, Shanivaar 'ॐ Rahave Namah' 108 japa, aur bada launch ek saal taalo.",
    easesEn: "This eases at the next PY 5 — the change year unlocks what 4 locked.",
    easesHi: "agle ank-dasha 5 mein khulega — parivartan-saal 4 ka taala kholega.",
  },
  5: {
    kind: "mixed",
    truthEn: "A CHANGE year — movement pays, but volatility is the fee. Switches, travel and new markets bring gains; impulsive big bets lose.",
    truthHi: "parivartan-saal — chaal phalai hai, par utaar-chadhaav isaka kiraayaa hai. badlaav, yatra aur nae baazaar laabh denge; bina soche bada daav haara dega.",
    basisEn: "PY 5 = Budh's commerce; Mercury wins on calculation, loses on impulse.",
    basisHi: "ank-dasha 5 = Budh ki vyaapaar-buddhi; Budh ginai se jeetata hai, laalach se haarata hai.",
    remedyEn: "Green clothing on Wednesdays, 108× 'Om Budhaya Namah'; write every deal down before signing.",
    remedyHi: "Budhvaar hare vastra, 'ॐ Budhaya Namah' 108 japa; har sauda sign se pehle likho.",
    easesEn: "Stability returns at the next PY 6.",
    easesHi: "agle ank-dasha 6 mein sthirta lautei.",
  },
  6: {
    kind: "strong",
    truthEn: "A FAMILY-AND-FORTUNE year — home matters bloom and money through taste improves. The truth also: household duty will pull you hard; neglect at home bills you later.",
    truthHi: "parivaar-aur-bhaagy saal — ghar ke maamale phalenge, saundarya se dhan badhaega. sach yeh bhi: grih-daayitv zor maarega; ghar ki upeksha baad mein bill maagei.",
    basisEn: "PY 6 = Shukra's abundance tied to responsibility.",
    basisHi: "ank-dasha 6 = Shukra ki samriddhi, jo zimmewari se bi hai.",
    remedyEn: "White daan on Fridays, 108× 'Om Shukraya Namah'; keep the family promise before the business one.",
    remedyHi: "Shukravaar shwet daan, 'ॐ Shukraya Namah' 108 japa; parivaarik waada pehle, business baad.",
    easesEn: "Harmony shows by mid-year if duties are honoured early.",
    easesHi: "daayitv pehle nibhaae toh sadbhaav madhy-saal tak dikhega.",
  },
  7: {
    kind: "difficult",
    truthEn: "A DIFFICULT visibility year — loud pushes stall, recognition lags, and self-doubt whispers loudest now. This is a trough by design, not by your failure.",
    truthHi: "drishyata ke liye kathin saal — shor-bhare prayaas thamenge, pahachaan der se aayegi, aur aatm-sndeh abhi sabse zor se phusaphusaaega. yeh gart design se hai, aapki asafalta se nahi.",
    basisEn: "PY 7 = Ketu's inward turn; the ascetic year starves the stage and feeds the study.",
    basisHi: "ank-dasha 7 = Ketu ka bheetar-mukh; tapasvi-saal manch ko bhookha rakhta hai, adhyayan ko tript.",
    remedyEn: "108× 'Om Ketave Namah' on Saturdays, cream/brown daan; master one craft quietly — the stage reopens at PY 8/1.",
    remedyHi: "Shanivaar 'ॐ Ketave Namah' 108 japa, cream/bhoora daan; ek kala mein chupke se maharat — manch ank-dasha 8/1 par phir khulega.",
    easesEn: "Visibility returns at the next PY 8 — what you master now runs there.",
    easesHi: "drishyata agle ank-dasha 8 par lautei — ab ki maharat wahin chalei.",
  },
  8: {
    kind: "strong",
    truthEn: "A MONEY-AND-POWER year — position and property move toward you. The truth also: Saturn audits; every shortcut taken in past years sends its bill this year. Effort is heavy and non-negotiable.",
    truthHi: "dhan-aur-shakti saal — pad aur sampatti aapki or chalenge. sach yeh bhi: Shani lekha-jokha karta hai; pichhle saalon ka har shortcut isi saal bill bhejega. mehnat bhaari aur anivaary hai.",
    basisEn: "PY 8 = Shani's harvest-and-audit; slow judge, permanent ledger.",
    basisHi: "ank-dasha 8 = Shani ki phasal-aur-lekha; dheema nyaayaadheesh, sthaayi bahee.",
    remedyEn: "Oil daan on Saturdays, 108× 'Om Shanicharaya Namah'; keep every deal clean and every promise kept.",
    remedyHi: "Shanivaar tail-daan, 'ॐ Shanicharaya Namah' 108 japa; har sauda saaf, har waada nibhao.",
    easesEn: "The audit softens once dues are paid early in the year.",
    easesHi: "saal ke aarambh mein baqaya chuka do toh jaanch naram pade.",
  },
  9: {
    kind: "mixed",
    truthEn: "A COMPLETION year — chapters end and that feels like loss before it feels like relief. Old frictions resurface for one last reckoning; impatience is this year's trap.",
    truthHi: "samaapan-saal — adhyay band honge; raahat se pehle yeh ghaate jaisa lagega. puraai khat-pat aakhairee hisaab ke liye ubharei; adheerata is saal ka jaal hai.",
    basisEn: "PY 9 = Mangal closing the cycle; Mars ends things forcefully if you delay gently.",
    basisHi: "ank-dasha 9 = Mangal chakra band karta hai; der ki toh Mangal jabaradasi todaega.",
    remedyEn: "Red lentil daan on Tuesdays, 108× 'Om Mangalaya Namah'; choose closure over confrontation.",
    remedyHi: "Mangalvaar masoor daan, 'ॐ Mangalaya Namah' 108 japa; takraav ki jagah samaapan chuno.",
    easesEn: "Relief arrives as the new PY 1 cycle begins.",
    easesHi: "naya ank-dasha 1 chakra shuru hote hi raahat milegi.",
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
    out.truthHi = `${t.truthHi} isake upar aapke chart mein karmic rin-ank (${nums}) hai — is daur ki kathinaaee aapke liye ausat se thodaee zyada padhi jaaei.`;
    out.truthEn = `${t.truthEn} Your chart also carries karmic debt mark(s) (${nums}) — this period reads a notch harder for you than average.`;
    out.basisHi = `${t.basisHi} aadhaar: karmic rin-ank ${nums} — adhoore hisaab isi se lautate hain.`;
    out.basisEn = `${t.basisEn} Basis: karmic debt ${nums} — unfinished accounts return through it.`;
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Chart-level truth summary (karmic debt + missing digits + tense pairs)*/
/* ------------------------------------------------------------------ */

/**
 * The chart's honest ledger: what the numbers say plainly, each with basis,
 * remedy and easing window. Rendered as the report's "sachchai ka Panna".
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
        hi: "aapke chart mein karmic rin 13 baitha hai: mehnat hi aapki tyooshan phaees hai — susi bill bhejei, eemaanadaar joonoon dega. saavdhani se istemaal na hui shakti lautai hai.",
        rem: { en: "Keep daily work-discipline (fixed hours, kept promises) and 108× 'Om' japa at sunrise.", hi: "Roz kaam-anushasan (pakke ghante, nibhaaye waade) aur praatah 'ॐ' ka 108 japa." },
      },
      14: {
        en: "Karmic debt 14 sits in your chart: freedom with risk is your lesson — money and dealings favour you, but over-reach and careless trust bill you.",
        hi: "aapke chart mein karmic rin 14 hai: jokhim ke saath aajaai aapka paath hai — dhan aur saudon mein bhaagy saath deta hai, par ati-utsaah aur laaparavaah bharosa bill bhejega.",
        rem: { en: "Write every deal down, keep a cash buffer, 108× 'Om Budhaya Namah' on Wednesdays.", hi: "Har sauda likho, naqd buffer rakho, Budhvaar 'ॐ Budhaya Namah' 108 japa." },
      },
      16: {
        en: "Karmic debt 16 sits in your chart: towers built on ego take lightning — sudden falls follow pride, especially in partnerships. Humility is the insurance.",
        hi: "aapke chart mein karmic rin 16 hai: ahankaar par khadaee meinaar ko bijai girai hai — garv ke baad achanak giraavat, visheshakar saajhedari men. namrata hi beema hai.",
        rem: { en: "Consult before big calls, share credit openly, 108× 'Om' japa daily.", hi: "Bade faislon se pehle salah, shrey khulkar baanto, roz 'ॐ' ka 108 japa." },
      },
      19: {
        en: "Karmic debt 19 sits in your chart: the prince's debt — success comes, but ego at the summit isolates. Keep advisors close and listen at least once.",
        hi: "aapke chart mein karmic rin 19 hai: raajakumaar ka ran — safalta milegi, par shikhar par ahankaar akela kar dega. salaahakaar paas rakho, kam-se-kam ek baar toh sunen.",
        rem: { en: "Weekly counsel with a truthful elder, daan on your birthday.", hi: "sachche bujaurg se weekly salah, janmadin par daan." },
      },
    };
    const m = map[d] ?? map[13];
    verdicts.push({
      kind: "difficult",
      truthEn: m.en,
      truthHi: m.hi,
      basisEn: `Karmic debt number ${d} detected in the chart's core positions (13/14/16/19 family).`,
      basisHi: `karmic rin-ank ${d} chart ke mukhya sthaanon mein pakada gaya (13/14/16/19 kul).`,
      remedyEn: m.rem.en,
      remedyHi: m.rem.hi,
      easesEn: "Eases as the debt's lessons are paid in behaviour, not just intention.",
      easesHi: "ran ka paath vyavahaar mein chukaayaa jaaye — niyat mein nahi — tab ghatata hai.",
    });
  }

  if (ctx.missingDigits.length > 0) {
    const d = ctx.missingDigits[0];
    verdicts.push({
      kind: "mixed",
      truthEn: `Missing number ${d} in your name: that lesson is not free — life will keep setting exams on digit ${d} until you study it deliberately.`,
      truthHi: `aapke naam mein ank ${d} absent: woh paath free nahi — jeevan ank ${d} ki pariksha tab tak doharaaega jab tak jaan-boojhkar na padhao.`,
      basisEn: `Digit ${d} never appears among the name's letter values (karmic lesson).`,
      basisHi: `naam ke akshar-maanon mein ank ${d} kaheen nahi (karmic paath).`,
      remedyEn: `Write the number ${d} quality into your daily routine deliberately; strengthen its planet via the remedy table.`,
      remedyHi: `ank ${d} ka guna jaan-boojhkar dinacharyaa mein likho; usake graha ko upaay-table se bal dein.`,
      easesEn: null,
      easesHi: null,
    });
  }

  for (const [a, b] of ctx.tensePairs) {
    verdicts.push({
      kind: "difficult",
      truthEn: `Enemy-planet pairing ${a}-${b} sits in your chart: Sun-Saturn-type friction means quick success is NOT your gift — permanent success is. The tension is real; so is the payoff for those who keep discipline.`,
      truthHi: `shatru-graha jodi ${a}-${b} aapke chart mein baii hai: Surya-Shani jaisa gharshan maane — jhatpat safalta aapki den nahi, sthaayi safalta hai. tanaav sachcha hai; anushasan rakhane vaalon ka inaam bhi sachcha hai.`,
      basisEn: `Planet enmity between digit ${a} and ${b} (classical friendship table).`,
      basisHi: `ank ${a} aur ${b} ke grahon ki shatruta (paramparagat mitra-table).`,
      remedyEn: "Surya-Shani reconciliation: sunrise water to the Sun + Saturday oil daan; keep the work-rest ledger honest.",
      remedyHi: "Surya-Shani mel: praatah Surya-jal + Shanivaar tel-daan; kaam-viraam ka lekha eemaanadaar rakho.",
      easesEn: "Friction turns to footing as routines hold for a full season.",
      easesHi: "ek poore mausam routine tike toh gharshan pakad mein badalega.",
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
      ? `is prishth par ${verdicts.length} eemaanadaar nirnaayak hain: ${allDifficult} mein aadhaar aur upaay sahit kathinaaee kahee gaee — chart khaushaamad nahi, sachcha padha gaya hai.`
      : "yeh chart prabal padha gaya — par usake saal phir bhi baari-baari chalenge: choti nirmaan maagei, gart dhairy. koi saal chhoot ka hakadaar nahi.";

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