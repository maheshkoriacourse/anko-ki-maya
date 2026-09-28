/**
 * Anko Ki Maya v3 — DIRECT-VOICE ENGINE COPY (owner order, 29 Sep).
 *
 * Replaces the v2 hedged voice ("may be a supportive period", "theme to
 * reflect on") with the direct jyotishi narrative — EN and HI both:
 *   'Is varsh aapke career mein bada badlav aayega'
 *   'Ye aapka paisa-barne ka saal hai'
 *
 * Only the HARD BAN remains: death-timing, illness/diagnosis, pregnancy,
 * crime, medical claims, '100% guaranteed'. Everything else confident.
 */

/* ------------------------------------------------------------------ */
/* Ank Dasha (Personal Year / Month / Day) — direct voice              */
/* ------------------------------------------------------------------ */

export interface AnkDashaTheme {
  name: string;
  nameHi: string;
  lineEn: string;
  lineHi: string;
  /** One action the year demands (direct imperative). */
  actionEn: string;
  actionHi: string;
}

export const ANK_DASHA_YEAR: Record<number, AnkDashaTheme> = {
  1: {
    name: "Ank Dasha 1 — Surya's ignition",
    nameHi: "Ank Dasha 1 — Surya ka prajvalan",
    lineEn: "This year your career takes a big turn — a new chapter opens and it will carry the next nine. Name the mission and claim it.",
    lineHi: "is saal aapke career mein bada badlaav aayega — naya adhyay khulega jo agle nau saal dhoega. lakshya naam do aur daava karo.",
    actionEn: "Start the thing. This year rewards the first mover.",
    actionHi: "shuru karo. yeh saal pehle badhane waale ko puraskrit karta hai.",
  },
  2: {
    name: "Ank Dasha 2 — Chandra's tide",
    nameHi: "Ank Dasha 2 — Chandrama ki lahar",
    lineEn: "This is your patience year — partnerships ripen and quick wins stay out. What feels slow is compounding underneath.",
    lineHi: "yeh aapka dhairya-saal hai — saajhedariyaan pakengi, jhatpat jeet nahi milegi. jo dheema lag raha hai, woh neeche hi chakravriddhi kar raha hai.",
    actionEn: "Feed the key relationships; stop checking the speedometer.",
    actionHi: "aham rishton ko seencho; speedometer dekhna band karo.",
  },
  3: {
    name: "Ank Dasha 3 — Guru's expression",
    nameHi: "Ank Dasha 3 — Guru ki abhivyakti",
    lineEn: "This is your name-travels year: visibility, teaching, creative wins. Money follows attention this year — put your work where people see it.",
    lineHi: "yeh aapka naam-door-jaane waala saal hai: dikhna, sikhaana, srijan ki jeet. is saal paisa dhyaan ke peechhe aayega — kaam uthaakar logon ke saamne rakho.",
    actionEn: "Publish, present, speak — weekly.",
    actionHi: "publish karo, present karo, bolo — har hafte.",
  },
  4: {
    name: "Ank Dasha 4 — Rahu's grind",
    nameHi: "Ank Dasha 4 — Rahu ki mehnat",
    lineEn: "This is your foundations year — the hardest working year of the cycle. Systems built now carry you for the next eight; shortcuts taken now bill you double.",
    lineHi: "yeh aapka neev-saal hai — cycle ka sabse mehnati saal. ab bana hua system agle aath saal dhoga; ab ka shortcut doguna bill bhejega.",
    actionEn: "Build the boring systems. Delay the big launch one year.",
    actionHi: "ubaaoo system banao. bada launch ek saal taalo.",
  },
  5: {
    name: "Ank Dasha 5 — Budh's motion",
    nameHi: "Ank Dasha 5 — Budh ki chaal",
    lineEn: "This year CHANGE is written — travel, switches, new markets. Your money multiplies through movement; the routine you're clinging to is the ceiling.",
    lineHi: "is saal parivartan likha hai — yatra, badlaav, nae baazaar. paisa chaal se badhaega; jis routine ko aap thaame hain, wahi aapki chhat hai.",
    actionEn: "Say yes to the move; write every deal down before signing.",
    actionHi: "badlaav ko ha kahie; har sauda sign se pehle likhie.",
  },
  6: {
    name: "Ank Dasha 6 — Shukra's bloom",
    nameHi: "Ank Dasha 6 — Shukra ka pushpan",
    lineEn: "This year home and fortune bloom together — family decisions, commitment, beauty, and money through taste. The house rewards attention this year.",
    lineHi: "is saal ghar aur bhaagy ek saath phalenge — parivaarik nirnay, sankalp, saundarya, aur svaad se dhan. ghar is saal dhyaan ka phal deta hai.",
    actionEn: "Make the family decision you've been circling.",
    actionHi: "woh parivaarik nirnay leejie jisake ird-gird aap ghoom rahe the.",
  },
  7: {
    name: "Ank Dasha 7 — Ketu's retreat",
    nameHi: "Ank Dasha 7 — Ketu ka anthpravaah",
    lineEn: "This year is a master-study year — loud pushes stall while mastery compounds. What you learn now runs your next peak; the stage reopens next year.",
    lineHi: "yeh aapka mahaabhyaas-saal hai — shor thamega par mahaarat jamei. ab seekha hua agli choti chalaaega; manch agle saal khulega.",
    actionEn: "Master one craft quietly; save the stage for next year.",
    actionHi: "ek kala chupachaap mein mahaarat karo; manch agle saal ke liye bachaaie.",
  },
  8: {
    name: "Ank Dasha 8 — Shani's harvest",
    nameHi: "Ank Dasha 8 — Shani ki phasal",
    lineEn: "This IS your money year — the paisa-barne ka saal. Ask for the position, close the property, collect the receivables. Saturn audits: keep it clean and it stays earned.",
    lineHi: "yehi aapka dhan-saal hai — paisa-barhane ka saal. pad maagie, sampatti pakki karo, baqaya vasoolie. Shani lekha karta hai: saaf rakhein toh kamai sthaayi rahei.",
    actionEn: "Collect, negotiate, sign — and keep every rupee accounted.",
    actionHi: "vasoolie, mol-bhav karo, sign karo — aur har rupaye ka hisaab rakho.",
  },
  9: {
    name: "Ank Dasha 9 — Mangal's completion",
    nameHi: "Ank Dasha 9 — Mangal ka samaapan",
    lineEn: "This year closes a full cycle — chapters end by choice or by force. Finish what hangs, forgive what binds; the new cycle is already knocking.",
    lineHi: "is saal poora chakra band hoga — adhyay chaahe chunaav se khatm hon, chaahe zor se. lataka kaam poora karo, baadhane waala maaph karo; naya chakra dastak de raha hai.",
    actionEn: "Close gracefully and on purpose.",
    actionHi: "samman se aur jaan-boojhkar band karo.",
  },
  11: {
    name: "Ank Dasha 11 — the intuitive master-year",
    nameHi: "Ank Dasha 11 — antarjnaan ki mahaadasha",
    lineEn: "A master-year: big inner signals, heightened sensitivity, unusual openings. Ground the inspiration into one concrete project or it stays a daydream.",
    lineHi: "mahaavarsh: bade bheetaree sanket, teekshn snvedanasheelata, asaadharan mauqa. prerana ko ek thos pariyojana mein utaarie, varana divaasvapn rah jaaei.",
    actionEn: "One grounded step daily.",
    actionHi: "roz ek jameei kadam.",
  },
  22: {
    name: "Ank Dasha 22 — the master-builder year",
    nameHi: "Ank Dasha 22 — mahaanirmaata ka saal",
    lineEn: "A master-builder year: visions seeking structure. Think in decades, lay one foundation stone a week — this year's build outlasts you.",
    lineHi: "mahaanirmaata-saal: drishti sanrachna maag rahi hai. dashakon mein sochen, hafte mein ek neev-patthar — is saal ka nirmaan aapse bada tikega.",
    actionEn: "Build the structure that serves many.",
    actionHi: "woh sanrachna banao jo anek ki seva kare.",
  },
  33: {
    name: "Ank Dasha 33 — the teacher's year",
    nameHi: "Ank Dasha 33 — shikshak ka saal",
    lineEn: "A devoted-service year: your care ripples beyond your circles. Teach, mentor, heal — and refill your own well weekly.",
    lineHi: "samarpit seva-saal: aapki dekhbhaal apne gheron se aage laharaaei. sikhaaie, maargadarshan do — aur apna kuaa hafte mein bharie.",
    actionEn: "Mentor one person deliberately.",
    actionHi: "ek vyakti ko jaan-boojhkar maargadarshan do.",
  },
};

export const ANK_DASHA_MONTH: Record<number, { lineEn: string; lineHi: string }> = {
  1: {
    lineEn: "The month to make the first move — proposals land, doors crack open.",
    lineHi: "pahala kadam uthaane ka mahina — prastaav jamate hain, darwaaze khulate hain.",
  },
  2: {
    lineEn: "A listening month — the deal that comes to you quietly beats the one you chase.",
    lineHi: "sunne ka mahina — jo sauda chupachaap aae, wahi bhaage-peechhe waale se behatar.",
  },
  3: {
    lineEn: "A visibility month — speak, post, present; your voice collects favours.",
    lineHi: "dikhane ka mahina — bolie, likhie, prastut karo; aapki vaani ehasaan jutaai hai.",
  },
  4: {
    lineEn: "A systems month — unglamorous work this month is the highest-paid work.",
    lineHi: "system ka mahina — is mahine ki be-glaimar mehnat sabse oochee kamai ki mehnat hai.",
  },
  5: {
    lineEn: "A movement month — travel, pitch, network; the fresh contact pays.",
    lineHi: "chaal ka mahina — yatra, pich, network; naya sampark phal dega.",
  },
  6: {
    lineEn: "A family-and-fortune month — the home promise kept this month returns with interest.",
    lineHi: "parivaar-aur-bhaagy ka mahina — is mahine nibhaayaa ghareloo vaada byaaj sahit lautega.",
  },
  7: {
    lineEn: "A study month — research now saves rework later; visibility can wait.",
    lineHi: "adhyayan ka mahina — ab ka shodh baad ki dobara-mehnat bachaata hai; dikhna ruk sakata hai.",
  },
  8: {
    lineEn: "The money month — chase receivables, negotiate hard, close clean.",
    lineHi: "dhan ka mahina — baqaya vasoolie, sakhat mol-bhav karo, saaf band karo.",
  },
  9: {
    lineEn: "The closure month — finish, forgive, empty the desk for what comes.",
    lineHi: "band karne ka mahina — poora karo, maaph karo, aane waale ke liye mej khaali karo.",
  },
};

/* ------------------------------------------------------------------ */
/* Mulank / Bhagyank state lines (Abhi Ka Haal core)                   */
/* ------------------------------------------------------------------ */

export function mulankBhagyankState(
  mulank: number,
  bhagyank: number,
  py: number,
  lang: "en" | "hi",
): { en: string; hi: string } {
  const g = (n: number) => (lang === "hi" ? `${grahaNameHi(n)} (${n})` : `${grahaNameEn(n)} (${n})`);
  const pyLine = ANK_DASHA_YEAR[py] ?? ANK_DASHA_YEAR[1];
  const en = `Your Mulank ${mulank} (${grahaNameEn(mulank)}) runs the first half of your life; Bhagyank ${bhagyank} (${grahaNameEn(bhagyank)}) runs the second. Right now you stand in Ank Dasha ${py} — ${pyLine.lineEn}`;
  const hi = `aapka Mulank ${dev(mulank)} (${grahaNameHi(mulank)}) jeevan ka pahala haaph chalata hai; Bhagyank ${dev(bhagyank)} (${grahaNameHi(bhagyank)}) doosara. abhi aap Ank Dasha ${dev(py)} mein khadae hain — ${pyLine.lineHi}`;
  return { en, hi };
}

function grahaNameEn(n: number): string {
  const names: Record<number, string> = {
    1: "Surya", 2: "Chandra", 3: "Guru", 4: "Rahu", 5: "Budh",
    6: "Shukra", 7: "Ketu", 8: "Shani", 9: "Mangal",
    11: "Surya(11)", 22: "Rahu(22)", 33: "Guru(33)",
  };
  return names[n] ?? "Surya";
}

function grahaNameHi(n: number): string {
  const names: Record<number, string> = {
    1: "Surya", 2: "Chandrama", 3: "Guru", 4: "Rahu", 5: "Budh",
    6: "Shukra", 7: "Ketu", 8: "Shani", 9: "Mangal",
    11: "Surya (11)", 22: "Rahu (22)", 33: "Guru (33)",
  };
  return names[n] ?? "Surya";
}

function dev(n: number): string {
  const map = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  return String(n).split("").map((ch) => (/\d/.test(ch) ? map[Number(ch)] : ch)).join("");
}