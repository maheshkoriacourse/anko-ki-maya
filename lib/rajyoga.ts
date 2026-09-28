/**
 * Anko Ki Maya v3 — RAJYOGA DETECTION ENGINE (owner addition, 29 Sep).
 *
 * Detects 2-digit and 3-digit Rajyogas in the DOB digits, the name-number
 * digits and the Numeroscope grid, per WEB-MINING-CONCEPTS.md (mined from
 * iiag.co.in + astrologyexperts.in, cross-checked against the school decks).
 * Classification: Birth Rajyoga (DOB), Name Rajyoga (name), Combined (both)
 * — combined is the strongest.
 *
 * Engine reports structure only; the interpretive effect-lines live here as
 * original copy in the direct jyotishi voice (no verbatim book text).
 */

export interface RajyogaDef {
  id: string;
  digits: number[]; // sorted ascending
  title: string;
  titleHi: string;
  effectEn: string;
  effectHi: string;
}

export const RAJYOGAS: RajyogaDef[] = [
  // ---- 2-digit ----
  { id: "raja-rani", digits: [1, 2], title: "Raja-Rani Rajyoga", titleHi: "raja-raai Rajyoga", effectEn: "The king and the queen together — command backed by charm. People follow you willingly; authority comes with a soft touch.", effectHi: "raja aur raai ek saath — aakarshan ke saath aadesh. log aapka anusaran dil se karte hain; satta naramee ke saath aai hai." },
  { id: "surya-guru", digits: [1, 3], title: "Surya-Guru Rajyoga", titleHi: "Surya-Guru Rajyoga", effectEn: "Wisdom plus leadership — the counsellor whom kings call. Respect in society, growth through knowledge, and a name that opens doors.", effectHi: "gyaan aur netritv ka sngam — woh salaahakaar jise raja bulaate hain. samaaj mein aadar, gyaan se vridhi, aur darwaaze kholane waala naam." },
  { id: "surya-rahu", digits: [1, 4], title: "Surya-Rahu Rajyoga", titleHi: "Surya-Rahu Rajyoga", effectEn: "The innovator-engineer yoga: unconventional paths that reach high positions. Sudden rises are written here — with a demand for clean methods.", effectHi: "navonmei-injeeniyar yog: aparnparaagat raaste ooche padon tak. achanak chadhaaee yahan lii hai — saaf taur-tareekae ki shart ke saath." },
  { id: "budh-aditya", digits: [1, 5], title: "Budh-Aditya Rajyoga", titleHi: "Budh-Aditya Rajyoga", effectEn: "The most celebrated yoga of intelligence and fame — sharp mind, sharp tongue, sharp fortune. Success through communication and calculation.", effectHi: "buddhi aur pratishtha ka sabse prasiddh yog — tez dimaag, tez vaani, tez kismat. samvaad aur soojh-boojh se saphalata." },
  { id: "shukra-aditya", digits: [1, 6], title: "Shukra-Aditya Rajyoga", titleHi: "Shukra-Aditya Rajyoga", effectEn: "Luxury, arts and fame — the yoga of the good life. Comforts, vehicles, beauty and public shine gather around this pair.", effectHi: "vilaas, kala aur yash ka yog — achchhe jeevan ka sootr. sukh-suvidha, vahaan, saundarya aur saarvajanik chamak is jodi ke ird-gird jutai hai." },
  { id: "bhagya-vriddhi", digits: [1, 7], title: "Bhagya-Vriddhi Rajyoga", titleHi: "bhaagy-vridhi Rajyoga", effectEn: "Divine protection — fortune that saves you at the last step. Dangerous detours somehow land you in the right place.", effectHi: "daiveey sanrakshan — antim kadam par bacha lene waala bhaagy. khataranaak dikhane waala mod bhi aapko sahi jagah pahucha deta hai." },
  { id: "big-thinking", digits: [1, 8], title: "Big-Thinking Rajyoga", titleHi: "vishaal-vichaar Rajyoga", effectEn: "Power plus discipline — the administrator's yoga. You think in decades and build what outlasts you.", effectHi: "shakti aur anushasan ka sngam — prashaasak ka yog. aap dashakon ki soch rakhate hain aur aisa banaate hain jo aapse bada tike." },
  { id: "aditya-mangal", digits: [1, 9], title: "Aditya-Mangal Rajyoga", titleHi: "Aditya-Mangal Rajyoga", effectEn: "Courage and pioneering fire — the yoga of first movers. Where others hesitate, you have already acted and won the ground.", effectHi: "saahas aur agrai agni — pehle kadam badhaane vaalon ka yog. jahan log jhijhakate hain, aap kaam poora kar chuke hote hain." },
  { id: "gaj-kesari", digits: [2, 3], title: "Gaj-Kesari Rajyoga", titleHi: "gaj-kesaree Rajyoga", effectEn: "The elephant-lion yoga — wealth with wisdom, respect in the community, and growth that never fully stops. Among the most auspicious pairs.", effectHi: "gaj-kesaree yog — dhan aur gyaan ka sngam, samaaj mein aadar, aur kai na rukane waali vridhi. sabse shubh jodaiyon mein se ek." },
  { id: "kalatmak", digits: [2, 6], title: "Kalatmak Rajyoga", titleHi: "kalaatmak Rajyoga", effectEn: "Arts and grace — the yoga of refinement. Taste, beauty, and public affection follow your work.", effectHi: "kala aur laality ka yog. svaad, saundarya aur jan-sneh aapke kaam ke peechhe-peechhe chalate hain." },
  { id: "guru-mangal", digits: [3, 9], title: "Guru-Mangal Rajyoga", titleHi: "Guru-Mangal Rajyoga", effectEn: "Visionary leaders — the teacher's wisdom with the soldier's drive. This pair builds institutions, not just careers.", effectHi: "dooradari neta — shikshak ka gyaan aur sainik ki chaal. yeh jodi career nahi, snsthaae banaai hai." },
  { id: "budh-guru", digits: [3, 5], title: "Budh-Guru Rajyoga", titleHi: "Budh-Guru Rajyoga", effectEn: "Thinker-teacher yoga — logic that can also inspire. Writing, teaching, analysis and advisory work are your home ground.", effectHi: "vichaarak-shikshak yog — tark jo prerit bhi kare. lekhan, shikshan, vishleshan aur paraamarsh aapka ghareloo maidan hai." },
  { id: "clever-mind", digits: [4, 5], title: "Clever-Mind Rajyoga", titleHi: "chatur-buddhi Rajyoga", effectEn: "Tech and research sharpness — the yoga of the quick, unconventional brain. Machines, data and puzzles obey this pair.", effectHi: "takneek aur anusndhaan ki nukeei buddhi — tez, aparnparaagat dimaag ka yog. machine, data aur paheliyaa is jodi ke aage jhukai hain." },
  { id: "vriddhi", digits: [5, 5], title: "Vriddhi Rajyoga", titleHi: "vridhi Rajyoga", effectEn: "Growth compounded — when two 5s meet, expansion doubles: multiple trades, multiple income lines, multiple wins.", effectHi: "vridhi ki vridhi — do 5 milate hain toh vistar doguna: kaee dhndhe, kaee aay-srot, kaee jeet." },
  { id: "laxmi-narayan", digits: [5, 6], title: "Laxmi-Narayan Rajyoga", titleHi: "Lakshmi-naaraayan Rajyoga", effectEn: "Wealth and creativity — the yoga of Laxmi's abundance. Money flows through commerce touched with taste; businesses built here flourish.", effectHi: "dhan aur srijan — Lakshmi ki samriddhi ka yog. paisa saundarya-sparsh waale vyaapaar se bahata hai; yahan bana dhndha phalata-phoolata hai." },
  { id: "career-strong", digits: [5, 7], title: "Career-Strong Rajyoga", titleHi: "career-bal Rajyoga", effectEn: "IT, data and research careers run strong here — the yoga of the specialist who becomes indispensable.", effectHi: "aaeei, data aur shodh-career yahan prabal — woh visheshajn yog jo anivaary ban jaata hai." },
  { id: "wealth-property", digits: [5, 8], title: "Wealth-Property Rajyoga", titleHi: "dhan-sampatti Rajyoga", effectEn: "Real estate and asset yoga — land, property and long holdings are where this pair multiplies money.", effectHi: "bhoomi aur sampatti ka yog — jamein, makaan aur lnbee holding mein yeh jodi paisa gunit karti hai." },
  { id: "buddhi-bal", digits: [5, 9], title: "Buddhi-Bal Rajyoga", titleHi: "buddhi-bal Rajyoga", effectEn: "Intellect plus strength — the strategist-athlete yoga. Sharp plans executed with full force.", effectHi: "buddhi aur bal — rananeetikaar-yoddha ka yog. nukeei yojana, poori taakat se nishpaadan." },
  { id: "creative-attraction", digits: [6, 7], title: "Creative-Attraction Rajyoga", titleHi: "kala-aakarshan Rajyoga", effectEn: "Magnetic creativity — the yoga of the artist whom crowds and patrons both notice.", effectHi: "chunbakeey srijan — woh kalakaar yog jis par bheed aur sarapnch dono ki nazar rehti hai." },
  { id: "shukra-mangal", digits: [6, 9], title: "Shukra-Mangal Rajyoga", titleHi: "Shukra-Mangal Rajyoga", effectEn: "Attraction, sports and fashion — the yoga of drive with charm. Bodies, brands and stages reward this pair.", effectHi: "aakarshan, khel aur phaaishan — chaapalooi nahi, chaap aur chamak ka yog. shareer, braand aur manch is jodi ko puraskrit karte hain." },
  // ---- 3-digit ----
  { id: "budh-aditya-gyan", digits: [1, 3, 5], title: "Budh-Aditya-Gyan Rajyoga", titleHi: "Budh-Aditya-gyaan Rajyoga", effectEn: "Triple crown of intelligence, fame and wisdom — a rare chart. People quote you; institutions hire you.", effectHi: "buddhi, yash aur gyaan ka timoorti mukut — durlabh chart. log aapke shabd uddhrit karte hain; snsthaae aapko bulaai hain." },
  { id: "surya-guru-shukra", digits: [1, 3, 6], title: "Surya-Guru-Shukra Rajyoga", titleHi: "Surya-Guru-Shukra Rajyoga", effectEn: "Authority, wisdom and refinement — the yoga of the cultured leader. Position, learning and luxury all three sit in the chart.", effectHi: "pad, gyaan aur laality — snskrit neta ka yog. sthaan, vidya aur vilaas — teeno chart mein baithe hain." },
  { id: "surya-guru-mangal", digits: [1, 3, 9], title: "Surya-Guru-Mangal Career Rajyoga", titleHi: "Surya-Guru-Mangal career Rajyoga", effectEn: "THE career yoga — leadership with wisdom and drive. This trio is the classic mark of founders, commanders and captains of industry.", effectHi: "career ka mahaayog — gyaan aur chaal ke saath netritv. snsthaapakon, senaapatiyon aur udyogapatiyon ki chart mein yehi trayee dikhai hai." },
  { id: "saumya-shukra", digits: [1, 2, 6], title: "Saumya-Shukra Rajyoga", titleHi: "saumy-Shukra Rajyoga", effectEn: "Gentle grace and fortune — the yoga of the beloved. Goodwill protects you where force would fail.", effectHi: "mridu laality aur bhaagy — priyajanon ka yog. jahan zor chook jaaye, wahan subhaavita bacha leti hai." },
  { id: "aditya-shukra-guru", digits: [1, 3, 6], title: "Aditya-Shukra-Guru Rajyoga", titleHi: "Aditya-Shukra-Guru Rajyoga", effectEn: "Same royal trio (1-3-6): position, counsel and luxury — a chart that collects all three currencies.", effectHi: "wahi raajakeey trayee (1-3-6): pad, paraamarsh aur vilaas — teeno mudraae jama karne waala chart." },
  { id: "laxmi-aditya-budh", digits: [1, 5, 6], title: "Laxmi-Aditya-Budh Rajyoga", titleHi: "Lakshmi-Aditya-Budh Rajyoga", effectEn: "Wealth, fame and wit — the merchant-prince yoga. Trade, negotiation and name-building in one line.", effectHi: "dhan, yash aur chaturaai — vyaapaaree-raajakumaar ka yog. saudaagaree, saudebaajaee aur naam-nirmaan — ek hi rekha men." },
  { id: "ek-chatra", digits: [1, 5, 9], title: "Ek-Chatra Rajyoga", titleHi: "ek-chhatr Rajyoga", effectEn: "One umbrella over many — the yoga of command. People, projects and fortunes align under your single banner.", effectHi: "anek par ek chhatr — aadesh ka yog. log, pariyojanaae aur kismat aapke ek hi dhvaj ke neeche saren hoti hain." },
  { id: "shukra-mangal-power", digits: [1, 6, 9], title: "Shukra-Mangal Power & Passion Rajyoga", titleHi: "Shukra-Mangal shakti-vitt Rajyoga", effectEn: "Power and passion — attraction backed by action. This trio wins in public-facing roles, fashion, sport and leadership.", effectHi: "shakti aur vitt/passion — kaam ke saath aakarshan. yeh trayee janasaamane ki bhoomikaaon, phaaishan, khel aur netritv mein jeetai hai." },
];

/* ------------------------------------------------------------------ */
/* Detection                                                           */
/* ------------------------------------------------------------------ */

export type RajyogaSource = "birth" | "name" | "combined";

export interface RajyogaHit {
  yoga: RajyogaDef;
  source: RajyogaSource;
  /** Where the digits were found, e.g. "DOB 1,4,6,9,3" or "name 5,6". */
  evidence: string;
}

export interface RajyogaResult {
  hits: RajyogaHit[];
  /** Unique yoga defs across sources (for display). */
  unique: { yoga: RajyogaDef; sources: RajyogaSource[] }[];
  steps: string[];
}

/** DOB digits: month, day, year digits (1-9 only; 0 is not mapped). */
export function dobDigits(year: number, month: number, day: number): number[] {
  const raw = `${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}`;
  return raw
    .split("")
    .map(Number)
    .filter((n) => n >= 1 && n <= 9);
}

/** Name digits: Chaldean letter values (the school reads name in Chaldean). */
export function nameDigits(name: string): number[] {
  return name
    .toUpperCase()
    .split("")
    .filter((ch) => ch >= "A" && ch <= "Z")
    .map((ch) => ch.charCodeAt(0) - 64)
    .filter((v) => v >= 1 && v <= 9);
}

function detectFromDigits(digs: number[]): RajyogaDef[] {
  const set = new Set(digs);
  const out: RajyogaDef[] = [];
  for (const y of RAJYOGAS) {
    if (y.digits.every((d) => set.has(d))) out.push(y);
  }
  return out;
}

/**
 * Full detection: DOB digits + name digits. When both a DOB and a name
 * contain the same yoga, classify it Combined (strongest).
 */
export function detectRajyogas(
  year: number,
  month: number,
  day: number,
  fullName: string,
): RajyogaResult {
  const bd = dobDigits(year, month, day);
  const nd = nameDigits(fullName);
  const birth = detectFromDigits(bd);
  const name = detectFromDigits(nd);

  const birthIds = new Set(birth.map((y) => y.id));
  const hits: RajyogaHit[] = [
    ...birth.map((y) => ({ yoga: y, source: "birth" as const, evidence: `DOB digits ${bd.join(",")}` })),
    ...name
      .filter((y) => !birthIds.has(y.id))
      .map((y) => ({ yoga: y, source: "name" as const, evidence: `name digits ${nd.join(",")}` })),
    ...name
      .filter((y) => birthIds.has(y.id))
      .map((y) => ({ yoga: y, source: "combined" as const, evidence: `DOB ${bd.join(",")} + name ${nd.join(",")}` })),
  ];

  const uniqueMap = new Map<string, { yoga: RajyogaDef; sources: RajyogaSource[] }>();
  for (const h of hits) {
    const e = uniqueMap.get(h.yoga.id);
    if (e) {
      if (!e.sources.includes(h.source)) e.sources.push(h.source);
    } else {
      uniqueMap.set(h.yoga.id, { yoga: h.yoga, sources: [h.source] });
    }
  }
  const order: Record<RajyogaSource, number> = { combined: 0, birth: 1, name: 2 };
  const unique = [...uniqueMap.values()].sort(
    (a, b) =>
      order[strongestSource(a.sources)] - order[strongestSource(b.sources)] ||
      b.yoga.digits.length - a.yoga.digits.length,
  );

  return {
    hits,
    unique,
    steps: [
      `DOB digits (0 excluded, as per tradition): ${bd.join(", ") || "—"}`,
      `Name letter digits (Chaldean): ${nd.join(", ") || "—"}`,
      hits.length === 0
        ? "No listed Rajyoga combination is fully present."
        : `${hits.length} Rajyoga instance${hits.length > 1 ? "s" : ""} detected across ${unique.length} unique yoga${unique.length > 1 ? "s" : ""}.`,
    ],
  };
}

export function strongestSource(sources: RajyogaSource[]): RajyogaSource {
  if (sources.includes("combined")) return "combined";
  if (sources.includes("birth")) return "birth";
  return "name";
}

/** "Aapke chart mein X Rajyoga hai" — headline line, direct voice. */
export function rajyogaHeadline(count: number, lang: "en" | "hi"): string {
  if (lang === "hi") {
    if (count === 0) return "aapke chart mein koi grahaneey Rajyoga nahi banta — ankon ka santulan aapki taakat hai, sthirta hi aapka Rajyoga hai.";
    if (count === 1) return "aapke chart mein 1 Rajyoga hai — aur wahi aapki jaindai ka maastar-kunjee hai.";
    return `aapke chart mein ${count} Rajyoga hain — yeh asaadharan chart hai.`;
  }
  if (count === 0) return "No Rajyoga forms in your chart — balance is your strength; steadiness itself is your yoga.";
  if (count === 1) return "1 Rajyoga sits in your chart — and that single yoga is the master-key of your life.";
  return `${count} Rajyogas sit in your chart — an extraordinary chart.`;
}

/** Rajyoga summary for the Numeroscope grid (digits present in the grid). */
export function rajyogaHeadlineForGrid(lang: "en" | "hi"): string {
  return lang === "hi"
    ? "neeche ke yog aapke janmatithi-ankon aur naam-ankon se padhae gae hain — jahan teen ankon ka yog banta hai, wahan shakti tigui hoti hai."
    : "The yogas below are read from your DOB digits and name digits — where a three-digit yoga forms, the force triples.";
}