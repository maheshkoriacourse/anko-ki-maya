/**
 * Anko Ki Maya v2 — Grid yoga engine (co-present digit pairs/triples in the
 * Lo Shu grid, following the owner's school's "yutiyaan" teaching style).
 *
 * The school reads co-present digit PAIRS with short verdicts. We rewrite in
 * our own direct jyotishi voice (SACH → KAARAN → UPAY): verdict + working
 * advice, EN spoken-simple / HI spoken Hinglish. Venus-jangha style material
 * becomes advice about luxury/romance/music habits rather than fate claims.
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
      "With 6 and 7 both present, tradition reads refinement joined to inquiry — a taste for beauty, music and meaning. Keep delight and depth in balance: enjoy, but study the craft behind what you enjoy.",
    noteHi:
      "6 aur 7 dono maujood hon toh parampara mein parishkaar aur jijnaasa ka mishran padha jaata hai — saundarya, sangeet aur arth ki ruchi. santulan rakho: anand ke saath gehrai bhi."
  },
  {
    digits: [7, 5],
    titleEn: "Communicator-inquirer pair (5-7)",
    titleHi: "samvaad-jijnaasa yuti (5-7)",
    noteEn:
      "5 and 7 together are traditionally read as fluent communication joined to an investigative mind — often paired with interest in hidden or esoteric subjects. Share your findings — knowledge spoken out loud multiplies; collected silently decays.",
    noteHi:
      "5 aur 7 ka saath parampara mein prabhaavi samvaad + jaanch-pravritti ke roop mein padha jaata hai — goodh vishayon mein ruchi bhi. gyaan sirf jama mat karo — baanto, bolein, likho."
  },
  {
    digits: [1, 8],
    titleEn: "Initiator-steward pair (1-8)",
    titleHi: "aarnbhak-prabndhak yuti (1-8)",
    noteEn:
      "1 with 8 mixes self-starting energy with material stewardship. Traditional readings watch the ego line here: lead the work, and let someone else win the room — the goal outranks the applause.",
    noteHi:
      "1 aur 8 ka mel aatm-aarambh + vastu-prabandhan ki oorja banata hai. parampara yahan ahankaar-rekha par dhyaan deti hai; netritva karo, par har manch jeetne ki zaroorat nahi."
  },
  {
    digits: [8, 9],
    titleEn: "Testing pair (8-9)",
    titleHi: "pareekshan yuti (8-9)",
    noteEn:
      "The school reads 8-9 as a testing combination — strong egos under one roof. Drop 'who is right' early — the shared goal only wins when both egos step below it.",
    noteHi:
      "school ke anusaar 8-9 ek pareekshan-yuti hai — do prabal ahankaar. 'kaun sahi' wali baat jaldi chhodo — saajha lakshya tabhi jeetta hai."
  },
  {
    digits: [3, 2],
    titleEn: "Expression-patience pair (2-3)",
    titleHi: "abhivyakti-dhairya yuti (2-3)",
    noteEn:
      "2 and 3 co-present are read as a creative up-and-down rhythm — success that arrives through persistence rather than speed. Finish what is started — persistence, not speed, is the success route here.",
    noteHi:
      "2 aur 3 saath hon toh rachanaatmak utaar-chadhaav ki lay padhi jaati hai — safalta gati se nahi, tike rahane se. jo shuru kiya use poora karo."
  },
  {
    digits: [5, 4],
    titleEn: "Freedom-order pair (4-5)",
    titleHi: "svatntrata-vyavastha yuti (4-5)",
    noteEn:
      "4 and 5 together mix the system-builder with the freedom-lover — tradition reads a mind that prefers making its own rules. Honour every commitment and keep one door open to move — both, not either.",
    noteHi:
      "4 aur 5 ka sangam vyavasthaavaadi + svatantra-chintak ka hai — aisa man jo apne niyam khud banata hai. vachan nibhaao aur saans lene ki jagah bhi rakho — dono."
  },
  {
    digits: [2, 4],
    titleEn: "Patience-order pair (2-4)",
    titleHi: "dhairya-vyavastha yuti (2-4)",
    noteEn:
      "2 with 4 is read as quiet diligence — steady, methodical, sometimes slow to ask for recognition. Let the work be seen — quiet diligence still needs a visible signature.",
    noteHi:
      "2 aur 4 — shaant mehnat, dheemi lekin gehri pragati; saraahana maangne mein jhijhak. kaam ko dikha bhi do — mehnat bina signature ke adhoori rehti hai."
  },
  {
    digits: [1, 5],
    titleEn: "Adaptive-leadership pair (1-5)",
    titleHi: "anukoolan-netritv yuti (1-5)",
    noteEn:
      "1 and 5 together read as quick, restless initiative — many irons in the fire. One flagship project at a time — the rest of the fires wait their turn.",
    noteHi:
      "1 aur 5 — tez, bechain pahal; kaee lohe aag mein. ek samay par ek hi flagship parojekt chuno, baaki line mein khade rahen."
  },
  {
    digits: [3, 6],
    titleEn: "Art-home pair (3-6)",
    titleHi: "kala-grih yuti (3-6)",
    noteEn:
      "3 and 6 are read as creative expression expressed through care — art, home, hospitality. Channel the creative surplus where it shines — decorate the home that feeds you, teach the art you own.",
    noteHi:
      "3 aur 6 — dekhbhaal ke maadhyam se rachanaatmakta; kala, ghar, aatithya. rachanaatmak oorja ko ek saaf rasta do — ghar sajaao, kala sikhaao."
  },
  {
    digits: [9, 8],
    titleEn: "Idealism-materialism pair (8-9)",
    titleHi: "aadarsh-vastu yuti (9-8)",
    noteEn:
      "9 with 8 blends big-picture compassion with material ambition — tradition reads a 'work for it' pairing. Align the cause with the livelihood — let the big heart pay its own bills.",
    noteHi:
      "9 aur 8 — vishaal drishti + vastu-mahatvaakaanksha; parampara ise 'parishram se laabh' ki yuti padhati hai. uddeshya aur aajeevika ko ek hi rekha mein lao."
  },
  {
    digits: [4, 7],
    titleEn: "Practical-analytical pair (4-7)",
    titleHi: "vyaavahaarik-vishleshan yuti (4-7)",
    noteEn:
      "4 and 7 co-present read as precision — careful hands and careful mind. Ship the perfect plan at 'good enough' — the last 10percent of polish costs the most and pays the least.",
    noteHi:
      "4 aur 7 — sateekata; savdhaan haath aur savdhaan dimaag. perafekt yojana ko 'itna achha' par launch kar do — aakhri 10percent polish sabse mehngi hai."
  },
  {
    digits: [1, 9],
    titleEn: "Vision pair (1-9)",
    titleHi: "drishti yuti (1-9)",
    noteEn:
      "1 and 9 read as the starter and the finisher — beginning things and seeing their wider meaning. Close the arcs you open — the finisher earns as much trust as the starter earns excitement.",
    noteHi:
      "1 aur 9 — aarambh-karta aur samaapan-karta; cheezein shuru karna aur unka vyaapak arth dekhna. jitne naye chapter khulate hain, utne purane band bhi karo."
  },
  {
    digits: [3, 6, 9],
    titleEn: "Intellect arrow (3-6-9)",
    titleHi: "buddhi baan (3-6-9)",
    kind: "triple",
    noteEn:
      "3, 6 and 9 all present form the classic intellect arrow — an active, expressive, analytical mind. Give that sharpness a worthy problem — an unaimed intellect just argues.",
    noteHi:
      "3, 6, 9 teeno maujood — traditional 'buddhi baan'; sakriy, abhivyakt, tekshn man. is tekshn bua ko koi badi samasya do — warna bua sirf behas karta hai."
  },
  {
    digits: [1, 5, 9],
    titleEn: "Determination arrow (1-5-9)",
    titleHi: "sankalp baan (1-5-9)",
    kind: "triple",
    noteEn:
      "1, 5, 9 together are the determination arrow — drive plus adaptability plus staying power. Choose directions worthy of that stamina — strong legs deserve a long road.",
    noteHi:
      "1, 5, 9 saath — sankalp baan; josh + adjust karne ki shakti + tikaav. is tikaav wali oorja ko lambi disha do — mazboot taange lambe raaste ke liye bani hain."
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
      "Yogas are traditional pair-verdicts rewritten as working advice — never fate claims.",
    ],
  };
}