/**
 * Anko Ki Maya v2 — Grid yoga engine (co-present digit pairs/triples in the
 * Lo Shu grid, following the owner's school's "युतियाँ" teaching style).
 *
 * The school reads co-present digit PAIRS with short verdicts. We rewrite in
 * our own safe-language words: "may reflect", "a theme to reflect on".
 * Venus-jangha style material is transformed into reflective themes about
 * luxury/romance/music rather than fate claims.
 */

export interface GridYoga {
  id: string;
  digits: number[];
  titleEn: string;
  titleHi: string;
  noteEn: string;
  noteHi: string;
  kind: "pair" | "triple";
}

interface YogaSeed {
  digits: [number, number] | [number, number, number];
  kind?: "pair" | "triple";
  titleEn: string;
  titleHi: string;
  noteEn: string;
  noteHi: string;
}

const YOGA_SEEDS: YogaSeed[] = [
  {
    digits: [6, 7],
    titleEn: "Venus-current pair (6-7)",
    titleHi: "शुक्र-प्रवाह युति (6-7)",
    noteEn:
      "With 6 and 7 both present, tradition reads a blend of refinement and inquiry — a taste for beauty, music and meaning. A theme to reflect on: keeping delight and depth in balance.",
    noteHi:
      "6 और 7 दोनों उपस्थित हों तो परंपरा में परिष्कार और जिज्ञासा का मिश्रण पढ़ा जाता है — सौंदर्य, संगीत और अर्थ की रुचि। चिंतन-विषय: आनंद और गहराई का संतुलन।",
  },
  {
    digits: [7, 5],
    titleEn: "Communicator-inquirer pair (5-7)",
    titleHi: "संवाद-जिज्ञासा युति (5-7)",
    noteEn:
      "5 and 7 together are traditionally read as fluent communication joined to an investigative mind — often paired with interest in hidden or esoteric subjects. A theme: sharing findings, not just collecting them.",
    noteHi:
      "5 और 7 का साथ परंपरा में प्रभावी संवाद + जांच-प्रवृत्ति के रूप में पढ़ा जाता है — गूढ़ विषयों में रुचि भी। चिंतन: ज्ञान केवल जमाना नहीं, बाँटना भी।",
  },
  {
    digits: [1, 8],
    titleEn: "Initiator-steward pair (1-8)",
    titleHi: "आरंभक-प्रबंधक युति (1-8)",
    noteEn:
      "1 with 8 mixes self-starting energy with material stewardship. Traditional readings watch the ego line here; a reflective theme is leading without needing to win every room.",
    noteHi:
      "1 और 8 का मेल आत्म-आरंभ + वस्तु-प्रबंधन की ऊर्जा बनाता है। परंपरा यहाँ अहंकार-रेखा पर ध्यान देती है; चिंतन: बिना हर मंच जीते नेतृत्व।",
  },
  {
    digits: [8, 9],
    titleEn: "Testing pair (8-9)",
    titleHi: "परीक्षण युति (8-9)",
    noteEn:
      "The school reads 8-9 as a testing combination — strong egos under one roof. As reflection: letting go of 'who is right' so the shared goal can win.",
    noteHi:
      "स्कूल के अनुसार 8-9 एक परीक्षण-युति है — दो प्रबल अहंकार। चिंतन: 'कौन सही' से ऊपर उठकर साझा लक्ष्य को जिताना।",
  },
  {
    digits: [3, 2],
    titleEn: "Expression-patience pair (2-3)",
    titleHi: "अभिव्यक्ति-धैर्य युति (2-3)",
    noteEn:
      "2 and 3 co-present are read as a creative up-and-down rhythm — success that arrives through persistence rather than speed. Reflective theme: finishing what is started.",
    noteHi:
      "2 और 3 साथ हों तो रचनात्मक उतार-चढ़ाव की लय पढ़ी जाती है — सफलता गति से नहीं, डटे रहने से। चिंतन: शुरू किया हुआ पूरा करना।",
  },
  {
    digits: [5, 4],
    titleEn: "Freedom-order pair (4-5)",
    titleHi: "स्वतंत्रता-व्यवस्था युति (4-5)",
    noteEn:
      "4 and 5 together mix the system-builder with the freedom-lover — tradition reads a mind that prefers making its own rules. A theme: honouring commitments while leaving room to move.",
    noteHi:
      "4 और 5 का संगम व्यवस्थावादी + स्वतंत्र-चिंतक का है — परंपरा में ऐसा मन जो अपने नियम खुद बनाता है। चिंतन: वचन निभाना और साँस लेने की जगह, दोनों।",
  },
  {
    digits: [2, 4],
    titleEn: "Patience-order pair (2-4)",
    titleHi: "धैर्य-व्यवस्था युति (2-4)",
    noteEn:
      "2 with 4 is read as quiet diligence — steady, methodical, sometimes slow to ask for recognition. Reflective theme: letting your work be seen.",
    noteHi:
      "2 और 4 — शांत मेहनत, धीमी लेकिन गहरी प्रगति; सराहना माँगने में झिझक। चिंतन: अपने काम को दिखाना।",
  },
  {
    digits: [1, 5],
    titleEn: "Adaptive-leadership pair (1-5)",
    titleHi: "अनुकूलन-नेतृत्व युति (1-5)",
    noteEn:
      "1 and 5 together read as quick, restless initiative — many irons in the fire. A reflective theme: one flagship at a time.",
    noteHi:
      "1 और 5 — तेज़, बेचैन पहल; कई लोहे आग में। चिंतन: एक समय पर एक ही ध्वज-परियोजना।",
  },
  {
    digits: [3, 6],
    titleEn: "Art-home pair (3-6)",
    titleHi: "कला-गृह युति (3-6)",
    noteEn:
      "3 and 6 are read as creative expression expressed through care — art, home, hospitality. A theme: channelling the creative surplus somewhere it can shine.",
    noteHi:
      "3 और 6 — देखभाल के माध्यम से रचनात्मकता; कला, घर, आतिथ्य। चिंतन: रचनात्मक ऊर्जा को कहीं स्पष्ट रूप देना।",
  },
  {
    digits: [9, 8],
    titleEn: "Idealism-materialism pair (8-9)",
    titleHi: "आदर्श-वस्तु युति (9-8)",
    noteEn:
      "9 with 8 blends big-picture compassion with material ambition — tradition reads a 'work for it' pairing. A theme: aligning the cause with the livelihood.",
    noteHi:
      "9 और 8 — विशाल दृष्टि + वस्तु-महत्वाकांक्षा; परंपरा इसे 'परिश्रम से लाभ' की युति पढ़ती है। चिंतन: उद्देश्य और आजीविका को एक-रेखा में करना।",
  },
  {
    digits: [4, 7],
    titleEn: "Practical-analytical pair (4-7)",
    titleHi: "व्यावहारिक-विश्लेषण युति (4-7)",
    noteEn:
      "4 and 7 co-present read as precision — careful hands and careful mind. A theme: shipping the perfect plan at 'good enough'.",
    noteHi:
      "4 और 7 — सटीकता; सावधान हाथ और सावधान मन। चिंतन: परफेक्ट योजना को 'इतना अच्छा' पर जारी करना।",
  },
  {
    digits: [1, 9],
    titleEn: "Vision pair (1-9)",
    titleHi: "दृष्टि युति (1-9)",
    noteEn:
      "1 and 9 read as the starter and the finisher — beginning things and seeing their wider meaning. A theme: finishing arcs, not just opening them.",
    noteHi:
      "1 और 9 — आरंभकर्ता और समापनकर्ता; चीज़ें शुरू करना और उनका व्यापक अर्थ देखना। चिंतन: नए चैप्टर खोलने जितना ही पुराने चैप्टर समेटना।",
  },
  {
    digits: [3, 6, 9],
    titleEn: "Intellect arrow (3-6-9)",
    titleHi: "बुद्धि बाण (3-6-9)",
    kind: "triple",
    noteEn:
      "3, 6 and 9 all present form the classic intellect arrow — an active, expressive, analytical mind. A theme: giving that sharpness a worthy problem.",
    noteHi:
      "3, 6, 9 तीनों उपस्थित — पारंपरिक 'बुद्धि बाण'; सक्रिय, अभिव्यक्त, तीक्ष्ण मन। चिंतन: इस तीक्ष्णता को योग्य समस्या देना।",
  },
  {
    digits: [1, 5, 9],
    titleEn: "Determination arrow (1-5-9)",
    titleHi: "संकल्प बाण (1-5-9)",
    kind: "triple",
    noteEn:
      "1, 5, 9 together are the determination arrow — drive plus adaptability plus staying power. A theme: choosing directions worthy of that stamina.",
    noteHi:
      "1, 5, 9 साथ — संकल्प बाण; जोश + अनुकूलन + टिकाऊपन। चिंतन: इस टिकाऊ ऊर्जा के योग्य दिशा चुनना।",
  },
];

export interface GridYogasResult {
  yogas: GridYoga[];
  steps: string[];
}

function digitsInYoga(seed: YogaSeed, counts: Record<number, number>): boolean {
  return seed.digits.every((d) => (counts[d] ?? 0) > 0);
}

/** Compute co-present grid yogas from the Lo Shu digit counts. */
export function gridYogas(counts: Record<number, number>): GridYogasResult {
  const yogas: GridYoga[] = [];
  for (const seed of YOGA_SEEDS) {
    if (!digitsInYoga(seed, counts)) continue;
    const isTriple = seed.digits.length === 3;
    yogas.push({
      id: `yoga-${seed.digits.join("-")}`,
      digits: [...seed.digits],
      kind: isTriple ? "triple" : "pair",
      titleEn: seed.titleEn,
      titleHi: seed.titleHi,
      noteEn: seed.noteEn,
      noteHi: seed.noteHi,
    });
  }
  const presentDigits = ([1, 2, 3, 4, 5, 6, 7, 8, 9] as const).filter((d) => (counts[d] ?? 0) > 0);
  return {
    yogas,
    steps: [
      `Grid pairs/triples are read among co-present digits: ${presentDigits.join(", ")}.`,
      `${yogas.length} yoga pattern${yogas.length === 1 ? "" : "s"} found in your grid.`,
      "Yogas are traditional pair-verdicts rewritten as reflective themes — never fate claims.",
    ],
  };
}