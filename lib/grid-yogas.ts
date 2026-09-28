/**
 * Anko Ki Maya v2 — Grid yoga engine (co-present digit pairs/triples in the
 * Lo Shu grid, following the owner's school's "yutiyaan" teaching style).
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
    titleHi: "Shukra-pravaah yuti (6-7)",
    noteEn:
      "With 6 and 7 both present, tradition reads a blend of refinement and inquiry — a taste for beauty, music and meaning. A theme to reflect on: keeping delight and depth in balance.",
    noteHi:
      "6 aur 7 dono maujood hon toh parampara mein parishkaar aur jijnaasa ka mishran padha jaata hai — saundarya, sngeet aur arth ki ruchi. chintan-vishay: anand aur gehrai ka santulan.",
  },
  {
    digits: [7, 5],
    titleEn: "Communicator-inquirer pair (5-7)",
    titleHi: "samvaad-jijnaasa yuti (5-7)",
    noteEn:
      "5 and 7 together are traditionally read as fluent communication joined to an investigative mind — often paired with interest in hidden or esoteric subjects. A theme: sharing findings, not just collecting them.",
    noteHi:
      "5 aur 7 ka saath parampara mein prabhaavi samvaad + jaanch-pravritti ke roop mein padha jaata hai — goodh vishayon mein ruchi bhi. chintan: gyaan keval jamaana nahi, baatana bhi.",
  },
  {
    digits: [1, 8],
    titleEn: "Initiator-steward pair (1-8)",
    titleHi: "aarnbhak-prabndhak yuti (1-8)",
    noteEn:
      "1 with 8 mixes self-starting energy with material stewardship. Traditional readings watch the ego line here; a reflective theme is leading without needing to win every room.",
    noteHi:
      "1 aur 8 ka mel aatm-aarambh + vastu-prabndhan ki oorja banata hai. parampara yahan ahankaar-rekha par dhyaan dei hai; chintan: bina har manch jeete netritv.",
  },
  {
    digits: [8, 9],
    titleEn: "Testing pair (8-9)",
    titleHi: "pareekshan yuti (8-9)",
    noteEn:
      "The school reads 8-9 as a testing combination — strong egos under one roof. As reflection: letting go of 'who is right' so the shared goal can win.",
    noteHi:
      "school ke anusaar 8-9 ek pareekshan-yuti hai — do prabal ahnkaar. chintan: 'kaun sahi' se upar uthakar saajha lakshya ko jitaana.",
  },
  {
    digits: [3, 2],
    titleEn: "Expression-patience pair (2-3)",
    titleHi: "abhivyakti-dhairya yuti (2-3)",
    noteEn:
      "2 and 3 co-present are read as a creative up-and-down rhythm — success that arrives through persistence rather than speed. Reflective theme: finishing what is started.",
    noteHi:
      "2 aur 3 saath hon toh rachanaatmak utaar-chadhaav ki lay padhi jaati hai — safalta gati se nahi, date rahane se. chintan: shuru kiyaa hua poora karna.",
  },
  {
    digits: [5, 4],
    titleEn: "Freedom-order pair (4-5)",
    titleHi: "svatntrata-vyavastha yuti (4-5)",
    noteEn:
      "4 and 5 together mix the system-builder with the freedom-lover — tradition reads a mind that prefers making its own rules. A theme: honouring commitments while leaving room to move.",
    noteHi:
      "4 aur 5 ka sngam vyavasthaavaai + svatntr-chintak ka hai — parampara mein aisa man jo apne niyam khud banata hai. chintan: vachan nibhaana aur saas lene ki jagah, dono.",
  },
  {
    digits: [2, 4],
    titleEn: "Patience-order pair (2-4)",
    titleHi: "dhairya-vyavastha yuti (2-4)",
    noteEn:
      "2 with 4 is read as quiet diligence — steady, methodical, sometimes slow to ask for recognition. Reflective theme: letting your work be seen.",
    noteHi:
      "2 aur 4 — shaant mehnat, dheemee lekin gehri pragati; saraahana maagane mein jhijhak. chintan: apne kaam ko dikhaana.",
  },
  {
    digits: [1, 5],
    titleEn: "Adaptive-leadership pair (1-5)",
    titleHi: "anukoolan-netritv yuti (1-5)",
    noteEn:
      "1 and 5 together read as quick, restless initiative — many irons in the fire. A reflective theme: one flagship at a time.",
    noteHi:
      "1 aur 5 — tez, bechain pahal; kaee lohe aag men. chintan: ek samay par ek hi dhvaj-pariyojana.",
  },
  {
    digits: [3, 6],
    titleEn: "Art-home pair (3-6)",
    titleHi: "kala-grih yuti (3-6)",
    noteEn:
      "3 and 6 are read as creative expression expressed through care — art, home, hospitality. A theme: channelling the creative surplus somewhere it can shine.",
    noteHi:
      "3 aur 6 — dekhbhaal ke maadhyam se rachanaatmakata; kala, ghar, aatithy. chintan: rachanaatmak oorja ko kaheen spasht roop dena.",
  },
  {
    digits: [9, 8],
    titleEn: "Idealism-materialism pair (8-9)",
    titleHi: "aadarsh-vastu yuti (9-8)",
    noteEn:
      "9 with 8 blends big-picture compassion with material ambition — tradition reads a 'work for it' pairing. A theme: aligning the cause with the livelihood.",
    noteHi:
      "9 aur 8 — vishaal drishti + vastu-mahatvaakaanksha; parampara ise 'parishram se laabh' ki yuti padhai hai. chintan: uddeshya aur aajeevika ko ek-rekha mein karna.",
  },
  {
    digits: [4, 7],
    titleEn: "Practical-analytical pair (4-7)",
    titleHi: "vyaavahaarik-vishleshan yuti (4-7)",
    noteEn:
      "4 and 7 co-present read as precision — careful hands and careful mind. A theme: shipping the perfect plan at 'good enough'.",
    noteHi:
      "4 aur 7 — sateekata; saavdhaan haath aur saavdhaan man. chintan: paraphekt yojana ko 'itana achchha' par jaaree karna.",
  },
  {
    digits: [1, 9],
    titleEn: "Vision pair (1-9)",
    titleHi: "drishti yuti (1-9)",
    noteEn:
      "1 and 9 read as the starter and the finisher — beginning things and seeing their wider meaning. A theme: finishing arcs, not just opening them.",
    noteHi:
      "1 aur 9 — aarnbhakarta aur samaapanakarta; cheejaen shuru karana aur unaka vyaapak arth dekhana. chintan: nae chaiptar kholane jitana hi puraane chaiptar sametana.",
  },
  {
    digits: [3, 6, 9],
    titleEn: "Intellect arrow (3-6-9)",
    titleHi: "buddhi baan (3-6-9)",
    kind: "triple",
    noteEn:
      "3, 6 and 9 all present form the classic intellect arrow — an active, expressive, analytical mind. A theme: giving that sharpness a worthy problem.",
    noteHi:
      "3, 6, 9 teeno maujood — traditional 'buddhi baan'; sakriy, abhivyakt, teekshn man. chintan: is teekshnata ko yogy samasyaa dena.",
  },
  {
    digits: [1, 5, 9],
    titleEn: "Determination arrow (1-5-9)",
    titleHi: "sankalp baan (1-5-9)",
    kind: "triple",
    noteEn:
      "1, 5, 9 together are the determination arrow — drive plus adaptability plus staying power. A theme: choosing directions worthy of that stamina.",
    noteHi:
      "1, 5, 9 saath — sankalp baan; josh + anukoolan + tikaaoopan. chintan: is tikaaoo oorja ke yogy disha chunana.",
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