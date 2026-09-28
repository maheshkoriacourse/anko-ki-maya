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
  { id: "raja-rani", digits: [1, 2], title: "Raja-Rani Rajyoga", titleHi: "राजा-रानी राजयोग", effectEn: "The king and the queen together — command backed by charm. People follow you willingly; authority comes with a soft touch.", effectHi: "राजा और रानी एक साथ — आकर्षण के साथ आदेश। लोग आपका अनुसरण दिल से करते हैं; सत्ता नरमी के साथ आती है।" },
  { id: "surya-guru", digits: [1, 3], title: "Surya-Guru Rajyoga", titleHi: "सूर्य-गुरु राजयोग", effectEn: "Wisdom plus leadership — the counsellor whom kings call. Respect in society, growth through knowledge, and a name that opens doors.", effectHi: "ज्ञान और नेतृत्व का संगम — वो सलाहकार जिसे राजा बुलाते हैं। समाज में आदर, ज्ञान से वृद्धि, और दरवाज़े खोलने वाला नाम।" },
  { id: "surya-rahu", digits: [1, 4], title: "Surya-Rahu Rajyoga", titleHi: "सूर्य-राहु राजयोग", effectEn: "The innovator-engineer yoga: unconventional paths that reach high positions. Sudden rises are written here — with a demand for clean methods.", effectHi: "नवोन्मेषी-इंजीनियर योग: अपरंपरागत रास्ते ऊँचे पदों तक। अचानक चढ़ाई यहाँ लिखी है — साफ़ तौर-तरीक़े की शर्त के साथ।" },
  { id: "budh-aditya", digits: [1, 5], title: "Budh-Aditya Rajyoga", titleHi: "बुध-आदित्य राजयोग", effectEn: "The most celebrated yoga of intelligence and fame — sharp mind, sharp tongue, sharp fortune. Success through communication and calculation.", effectHi: "बुद्धि और प्रतिष्ठा का सबसे प्रसिद्ध योग — तेज़ दिमाग़, तेज़ वाणी, तेज़ किस्मत। संवाद और सूझ-बूझ से सफलता।" },
  { id: "shukra-aditya", digits: [1, 6], title: "Shukra-Aditya Rajyoga", titleHi: "शुक्र-आदित्य राजयोग", effectEn: "Luxury, arts and fame — the yoga of the good life. Comforts, vehicles, beauty and public shine gather around this pair.", effectHi: "विलास, कला और यश का योग — अच्छे जीवन का सूत्र। सुख-सुविधा, वाहन, सौंदर्य और सार्वजनिक चमक इस जोड़ी के इर्द-गिर्द जुटती है।" },
  { id: "bhagya-vriddhi", digits: [1, 7], title: "Bhagya-Vriddhi Rajyoga", titleHi: "भाग्य-वृद्धि राजयोग", effectEn: "Divine protection — fortune that saves you at the last step. Dangerous detours somehow land you in the right place.", effectHi: "दैवीय संरक्षण — अंतिम कदम पर बचा लेने वाला भाग्य। ख़तरनाक दिखने वाला मोड़ भी आपको सही जगह पहुँचा देता है।" },
  { id: "big-thinking", digits: [1, 8], title: "Big-Thinking Rajyoga", titleHi: "विशाल-विचार राजयोग", effectEn: "Power plus discipline — the administrator's yoga. You think in decades and build what outlasts you.", effectHi: "शक्ति और अनुशासन का संगम — प्रशासक का योग। आप दशकों की सोच रखते हैं और ऐसा बनाते हैं जो आपसे बड़ा टिके।" },
  { id: "aditya-mangal", digits: [1, 9], title: "Aditya-Mangal Rajyoga", titleHi: "आदित्य-मंगल राजयोग", effectEn: "Courage and pioneering fire — the yoga of first movers. Where others hesitate, you have already acted and won the ground.", effectHi: "साहस और अग्रणी अग्नि — पहले कदम बढ़ाने वालों का योग। जहाँ लोग झिझकते हैं, आप काम पूरा कर चुके होते हैं।" },
  { id: "gaj-kesari", digits: [2, 3], title: "Gaj-Kesari Rajyoga", titleHi: "गज-केसरी राजयोग", effectEn: "The elephant-lion yoga — wealth with wisdom, respect in the community, and growth that never fully stops. Among the most auspicious pairs.", effectHi: "गज-केसरी योग — धन और ज्ञान का संगम, समाज में आदर, और कभी न रुकने वाली वृद्धि। सबसे शुभ जोड़ियों में से एक।" },
  { id: "kalatmak", digits: [2, 6], title: "Kalatmak Rajyoga", titleHi: "कलात्मक राजयोग", effectEn: "Arts and grace — the yoga of refinement. Taste, beauty, and public affection follow your work.", effectHi: "कला और लालित्य का योग। स्वाद, सौंदर्य और जन-स्नेह आपके काम के पीछे-पीछे चलते हैं।" },
  { id: "guru-mangal", digits: [3, 9], title: "Guru-Mangal Rajyoga", titleHi: "गुरु-मंगल राजयोग", effectEn: "Visionary leaders — the teacher's wisdom with the soldier's drive. This pair builds institutions, not just careers.", effectHi: "दूरदर्शी नेता — शिक्षक का ज्ञान और सैनिक की चाल। यह जोड़ी करियर नहीं, संस्थाएँ बनाती है।" },
  { id: "budh-guru", digits: [3, 5], title: "Budh-Guru Rajyoga", titleHi: "बुध-गुरु राजयोग", effectEn: "Thinker-teacher yoga — logic that can also inspire. Writing, teaching, analysis and advisory work are your home ground.", effectHi: "विचारक-शिक्षक योग — तर्क जो प्रेरित भी करे। लेखन, शिक्षण, विश्लेषण और परामर्श आपका घरेलू मैदान है।" },
  { id: "clever-mind", digits: [4, 5], title: "Clever-Mind Rajyoga", titleHi: "चतुर-बुद्धि राजयोग", effectEn: "Tech and research sharpness — the yoga of the quick, unconventional brain. Machines, data and puzzles obey this pair.", effectHi: "तकनीक और अनुसंधान की नुकीली बुद्धि — तेज़, अपरंपरागत दिमाग़ का योग। मशीन, डेटा और पहेलियाँ इस जोड़ी के आगे झुकती हैं।" },
  { id: "vriddhi", digits: [5, 5], title: "Vriddhi Rajyoga", titleHi: "वृद्धि राजयोग", effectEn: "Growth compounded — when two 5s meet, expansion doubles: multiple trades, multiple income lines, multiple wins.", effectHi: "वृद्धि की वृद्धि — दो 5 मिलते हैं तो विस्तार दोगुना: कई धंधे, कई आय-स्रोत, कई जीत।" },
  { id: "laxmi-narayan", digits: [5, 6], title: "Laxmi-Narayan Rajyoga", titleHi: "लक्ष्मी-नारायण राजयोग", effectEn: "Wealth and creativity — the yoga of Laxmi's abundance. Money flows through commerce touched with taste; businesses built here flourish.", effectHi: "धन और सृजन — लक्ष्मी की समृद्धि का योग। पैसा सौंदर्य-स्पर्श वाले व्यापार से बहता है; यहाँ बना धंधा फलता-फूलता है।" },
  { id: "career-strong", digits: [5, 7], title: "Career-Strong Rajyoga", titleHi: "करियर-बल राजयोग", effectEn: "IT, data and research careers run strong here — the yoga of the specialist who becomes indispensable.", effectHi: "आईटी, डेटा और शोध-करियर यहाँ प्रबल — वो विशेषज्ञ योग जो अनिवार्य बन जाता है।" },
  { id: "wealth-property", digits: [5, 8], title: "Wealth-Property Rajyoga", titleHi: "धन-संपत्ति राजयोग", effectEn: "Real estate and asset yoga — land, property and long holdings are where this pair multiplies money.", effectHi: "भूमि और संपत्ति का योग — ज़मीन, मकान और लंबी होल्डिंग में यह जोड़ी पैसा गुणित करती है।" },
  { id: "buddhi-bal", digits: [5, 9], title: "Buddhi-Bal Rajyoga", titleHi: "बुद्धि-बल राजयोग", effectEn: "Intellect plus strength — the strategist-athlete yoga. Sharp plans executed with full force.", effectHi: "बुद्धि और बल — रणनीतिकार-योद्धा का योग। नुकीली योजना, पूरी ताक़त से निष्पादन।" },
  { id: "creative-attraction", digits: [6, 7], title: "Creative-Attraction Rajyoga", titleHi: "कला-आकर्षण राजयोग", effectEn: "Magnetic creativity — the yoga of the artist whom crowds and patrons both notice.", effectHi: "चुंबकीय सृजन — वो कलाकार योग जिस पर भीड़ और सरपंच दोनों की नज़र रहती है।" },
  { id: "shukra-mangal", digits: [6, 9], title: "Shukra-Mangal Rajyoga", titleHi: "शुक्र-मंगल राजयोग", effectEn: "Attraction, sports and fashion — the yoga of drive with charm. Bodies, brands and stages reward this pair.", effectHi: "आकर्षण, खेल और फ़ैशन — चापलूसी नहीं, चाप और चमक का योग। शरीर, ब्रांड और मंच इस जोड़ी को पुरस्कृत करते हैं।" },
  // ---- 3-digit ----
  { id: "budh-aditya-gyan", digits: [1, 3, 5], title: "Budh-Aditya-Gyan Rajyoga", titleHi: "बुध-आदित्य-ज्ञान राजयोग", effectEn: "Triple crown of intelligence, fame and wisdom — a rare chart. People quote you; institutions hire you.", effectHi: "बुद्धि, यश और ज्ञान का तिमूर्ति मुकुट — दुर्लभ चार्ट। लोग आपके शब्द उद्धृत करते हैं; संस्थाएँ आपको बुलाती हैं।" },
  { id: "surya-guru-shukra", digits: [1, 3, 6], title: "Surya-Guru-Shukra Rajyoga", titleHi: "सूर्य-गुरु-शुक्र राजयोग", effectEn: "Authority, wisdom and refinement — the yoga of the cultured leader. Position, learning and luxury all three sit in the chart.", effectHi: "पद, ज्ञान और लालित्य — संस्कृत नेता का योग। स्थान, विद्या और विलास — तीनों चार्ट में बैठे हैं।" },
  { id: "surya-guru-mangal", digits: [1, 3, 9], title: "Surya-Guru-Mangal Career Rajyoga", titleHi: "सूर्य-गुरु-मंगल करियर राजयोग", effectEn: "THE career yoga — leadership with wisdom and drive. This trio is the classic mark of founders, commanders and captains of industry.", effectHi: "करियर का महायोग — ज्ञान और चाल के साथ नेतृत्व। संस्थापकों, सेनापतियों और उद्योगपतियों की चार्ट में यही त्रयी दिखती है।" },
  { id: "saumya-shukra", digits: [1, 2, 6], title: "Saumya-Shukra Rajyoga", titleHi: "सौम्य-शुक्र राजयोग", effectEn: "Gentle grace and fortune — the yoga of the beloved. Goodwill protects you where force would fail.", effectHi: "मृदु लालित्य और भाग्य — प्रियजनों का योग। जहाँ ज़ोर चूक जाए, वहाँ सुभाविता बचा लेती है।" },
  { id: "aditya-shukra-guru", digits: [1, 3, 6], title: "Aditya-Shukra-Guru Rajyoga", titleHi: "आदित्य-शुक्र-गुरु राजयोग", effectEn: "Same royal trio (1-3-6): position, counsel and luxury — a chart that collects all three currencies.", effectHi: "वही राजकीय त्रयी (1-3-6): पद, परामर्श और विलास — तीनों मुद्राएँ जमा करने वाला चार्ट।" },
  { id: "laxmi-aditya-budh", digits: [1, 5, 6], title: "Laxmi-Aditya-Budh Rajyoga", titleHi: "लक्ष्मी-आदित्य-बुध राजयोग", effectEn: "Wealth, fame and wit — the merchant-prince yoga. Trade, negotiation and name-building in one line.", effectHi: "धन, यश और चतुराई — व्यापारी-राजकुमार का योग। सौदागरी, सौदेबाज़ी और नाम-निर्माण — एक ही रेखा में।" },
  { id: "ek-chatra", digits: [1, 5, 9], title: "Ek-Chatra Rajyoga", titleHi: "एक-छत्र राजयोग", effectEn: "One umbrella over many — the yoga of command. People, projects and fortunes align under your single banner.", effectHi: "अनेक पर एक छत्र — आदेश का योग। लोग, परियोजनाएँ और किस्मत आपके एक ही ध्वज के नीचे सरें होती हैं।" },
  { id: "shukra-mangal-power", digits: [1, 6, 9], title: "Shukra-Mangal Power & Passion Rajyoga", titleHi: "शुक्र-मंगल शक्ति-वित्त राजयोग", effectEn: "Power and passion — attraction backed by action. This trio wins in public-facing roles, fashion, sport and leadership.", effectHi: "शक्ति और वित्त/पैशन — काम के साथ आकर्षण। यह त्रयी जनसामने की भूमिकाओं, फ़ैशन, खेल और नेतृत्व में जीतती है।" },
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
    if (count === 0) return "आपके चार्ट में कोई ग्रहणीय राजयोग नहीं बनता — अंकों का संतुलन आपकी ताक़त है, स्थिरता ही आपका राजयोग है।";
    if (count === 1) return "आपके चार्ट में 1 राजयोग है — और वही आपकी ज़िंदगी का मास्टर-कुंजी है।";
    return `आपके चार्ट में ${count} राजयोग हैं — यह असाधारण चार्ट है।`;
  }
  if (count === 0) return "No Rajyoga forms in your chart — balance is your strength; steadiness itself is your yoga.";
  if (count === 1) return "1 Rajyoga sits in your chart — and that single yoga is the master-key of your life.";
  return `${count} Rajyogas sit in your chart — an extraordinary chart.`;
}

/** Rajyoga summary for the Numeroscope grid (digits present in the grid). */
export function rajyogaHeadlineForGrid(lang: "en" | "hi"): string {
  return lang === "hi"
    ? "नीचे के योग आपके जन्मतिथि-अंकों और नाम-अंकों से पढ़े गए हैं — जहाँ तीन अंकों का योग बनता है, वहाँ शक्ति तिगुनी होती है।"
    : "The yogas below are read from your DOB digits and name digits — where a three-digit yoga forms, the force triples.";
}