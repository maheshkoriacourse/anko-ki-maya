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
    nameHi: "अंक दशा 1 — सूर्य का प्रज्वलन",
    lineEn: "This year your career takes a big turn — a new chapter opens and it will carry the next nine. Name the mission and claim it.",
    lineHi: "इस वर्ष आपके करियर में बड़ा बदलाव आएगा — नया अध्याय खुलेगा जो अगले नौ साल ढोएगा। लक्ष्य नाम दीजिए और दावा कीजिए।",
    actionEn: "Start the thing. This year rewards the first mover.",
    actionHi: "शुरू कीजिए। यह वर्ष पहले बढ़ने वाले को पुरस्कृत करता है।",
  },
  2: {
    name: "Ank Dasha 2 — Chandra's tide",
    nameHi: "अंक दशा 2 — चंद्रमा की लहर",
    lineEn: "This is your patience year — partnerships ripen and quick wins stay out. What feels slow is compounding underneath.",
    lineHi: "यह आपका धैर्य-वर्ष है — साझेदारियाँ पकेंगी, झटपट जीत नहीं मिलेगी। जो धीमा लग रहा है, वह नीचे ही चक्रवृद्धि कर रहा है।",
    actionEn: "Feed the key relationships; stop checking the speedometer.",
    actionHi: "अहम रिश्तों को सींचिए; स्पीडोमीटर देखना बंद कीजिए।",
  },
  3: {
    name: "Ank Dasha 3 — Guru's expression",
    nameHi: "अंक दशा 3 — गुरु की अभिव्यक्ति",
    lineEn: "This is your name-travels year: visibility, teaching, creative wins. Money follows attention this year — put your work where people see it.",
    lineHi: "यह आपका नाम-दूर-जाने वाला वर्ष है: दिखना, सिखाना, सृजन की जीत। इस साल पैसा ध्यान के पीछे आएगा — काम उठाकर लोगों के सामने रखिए।",
    actionEn: "Publish, present, speak — weekly.",
    actionHi: "प्रकाशित करें, प्रस्तुत करें, बोलें — हर हफ़्ते।",
  },
  4: {
    name: "Ank Dasha 4 — Rahu's grind",
    nameHi: "अंक दशा 4 — राहु की मेहनत",
    lineEn: "This is your foundations year — the hardest working year of the cycle. Systems built now carry you for the next eight; shortcuts taken now bill you double.",
    lineHi: "यह आपका नींव-वर्ष है — चक्र का सबसे मेहनती साल। अब बना सिस्टम अगले आठ साल ढोगा; अब का शॉर्टकट दोगुना बिल भेजेगा।",
    actionEn: "Build the boring systems. Delay the big launch one year.",
    actionHi: "उबाऊ सिस्टम बनाइए। बड़ा लॉन्च एक साल टालिए।",
  },
  5: {
    name: "Ank Dasha 5 — Budh's motion",
    nameHi: "अंक दशा 5 — बुध की चाल",
    lineEn: "This year CHANGE is written — travel, switches, new markets. Your money multiplies through movement; the routine you're clinging to is the ceiling.",
    lineHi: "इस वर्ष परिवर्तन लिखा है — यात्रा, बदलाव, नए बाज़ार। पैसा चाल से बढ़ेगा; जिस रुटीन को आप थामे हैं, वही आपकी छत है।",
    actionEn: "Say yes to the move; write every deal down before signing.",
    actionHi: "बदलाव को हाँ कहिए; हर सौदा साइन से पहले लिखिए।",
  },
  6: {
    name: "Ank Dasha 6 — Shukra's bloom",
    nameHi: "अंक दशा 6 — शुक्र का पुष्पन",
    lineEn: "This year home and fortune bloom together — family decisions, commitment, beauty, and money through taste. The house rewards attention this year.",
    lineHi: "इस वर्ष घर और भाग्य एक साथ फलेंगे — पारिवारिक निर्णय, संकल्प, सौंदर्य, और स्वाद से धन। घर इस साल ध्यान का फल देता है।",
    actionEn: "Make the family decision you've been circling.",
    actionHi: "वह पारिवारिक निर्णय लीजिए जिसके इर्द-गिर्द आप घूम रहे थे।",
  },
  7: {
    name: "Ank Dasha 7 — Ketu's retreat",
    nameHi: "अंक दशा 7 — केतु का अंतःप्रवाह",
    lineEn: "This year is a master-study year — loud pushes stall while mastery compounds. What you learn now runs your next peak; the stage reopens next year.",
    lineHi: "यह आपका महाअभ्यास-वर्ष है — शोर थमेगा पर महारत जमेगी। अब सीखा हुआ अगली चोटी चलाएगा; मंच अगले साल खुलेगा।",
    actionEn: "Master one craft quietly; save the stage for next year.",
    actionHi: "एक कला चुपचाप में महारत कीजिए; मंच अगले साल के लिए बचाइए।",
  },
  8: {
    name: "Ank Dasha 8 — Shani's harvest",
    nameHi: "अंक दशा 8 — शनि की फ़सल",
    lineEn: "This IS your money year — the paisa-barne ka saal. Ask for the position, close the property, collect the receivables. Saturn audits: keep it clean and it stays earned.",
    lineHi: "यही आपका धन-वर्ष है — पैसा-बर्हने का साल। पद माँगिए, संपत्ति पक्की कीजिए, बकाया वसूलिए। शनि लेखा करता है: साफ़ रखें तो कमाई स्थायी रहेगी।",
    actionEn: "Collect, negotiate, sign — and keep every rupee accounted.",
    actionHi: "वसूलिए, मोल-भाव कीजिए, साइन कीजिए — और हर रुपये का हिसाब रखिए।",
  },
  9: {
    name: "Ank Dasha 9 — Mangal's completion",
    nameHi: "अंक दशा 9 — मंगल का समापन",
    lineEn: "This year closes a full cycle — chapters end by choice or by force. Finish what hangs, forgive what binds; the new cycle is already knocking.",
    lineHi: "इस वर्ष पूरा चक्र बंद होगा — अध्याय चाहे चुनाव से खत्म हों, चाहे ज़ोर से। लटका काम पूरा कीजिए, बाँधने वाला माफ़ कीजिए; नया चक्र दस्तक दे रहा है।",
    actionEn: "Close gracefully and on purpose.",
    actionHi: "सम्मान से और जान-बूझकर बंद कीजिए।",
  },
  11: {
    name: "Ank Dasha 11 — the intuitive master-year",
    nameHi: "अंक दशा 11 — अंतर्ज्ञान की महादशा",
    lineEn: "A master-year: big inner signals, heightened sensitivity, unusual openings. Ground the inspiration into one concrete project or it stays a daydream.",
    lineHi: "महावर्ष: बड़े भीतरी संकेत, तीक्ष्ण संवेदनशीलता, असाधारण अवसर। प्रेरणा को एक ठोस परियोजना में उतारिए, वरना दिवास्वप्न रह जाएगी।",
    actionEn: "One grounded step daily.",
    actionHi: "रोज़ एक ज़मीनी कदम।",
  },
  22: {
    name: "Ank Dasha 22 — the master-builder year",
    nameHi: "अंक दशा 22 — महानिर्माता का वर्ष",
    lineEn: "A master-builder year: visions seeking structure. Think in decades, lay one foundation stone a week — this year's build outlasts you.",
    lineHi: "महानिर्माता-वर्ष: दृष्टि संरचना माँग रही है। दशकों में सोचें, हफ़्ते में एक नींव-पत्थर — इस साल का निर्माण आपसे बड़ा टिकेगा।",
    actionEn: "Build the structure that serves many.",
    actionHi: "वह संरचना बनाइए जो अनेक की सेवा करे।",
  },
  33: {
    name: "Ank Dasha 33 — the teacher's year",
    nameHi: "अंक दशा 33 — शिक्षक का वर्ष",
    lineEn: "A devoted-service year: your care ripples beyond your circles. Teach, mentor, heal — and refill your own well weekly.",
    lineHi: "समर्पित सेवा-वर्ष: आपकी देखभाल अपने घेरों से आगे लहराएगी। सिखाइए, मार्गदर्शन दीजिए — और अपना कुआँ हफ़्ते में भरिए।",
    actionEn: "Mentor one person deliberately.",
    actionHi: "एक व्यक्ति को जान-बूझकर मार्गदर्शन दीजिए।",
  },
};

export const ANK_DASHA_MONTH: Record<number, { lineEn: string; lineHi: string }> = {
  1: {
    lineEn: "The month to make the first move — proposals land, doors crack open.",
    lineHi: "पहला कदम उठाने का महीना — प्रस्ताव जमते हैं, दरवाज़े खुलते हैं।",
  },
  2: {
    lineEn: "A listening month — the deal that comes to you quietly beats the one you chase.",
    lineHi: "सुनने का महीना — जो सौदा चुपचाप आए, वही भागे-पीछे वाले से बेहतर।",
  },
  3: {
    lineEn: "A visibility month — speak, post, present; your voice collects favours.",
    lineHi: "दिखने का महीना — बोलिए, लिखिए, प्रस्तुत कीजिए; आपकी वाणी एहसान जुटाती है।",
  },
  4: {
    lineEn: "A systems month — unglamorous work this month is the highest-paid work.",
    lineHi: "सिस्टम का महीना — इस महीने की बे-ग्लैमर मेहनत सबसे ऊँची कमाई की मेहनत है।",
  },
  5: {
    lineEn: "A movement month — travel, pitch, network; the fresh contact pays.",
    lineHi: "चाल का महीना — यात्रा, पिच, नेटवर्क; नया संपर्क फल देगा।",
  },
  6: {
    lineEn: "A family-and-fortune month — the home promise kept this month returns with interest.",
    lineHi: "परिवार-और-भाग्य का महीना — इस महीने निभाया घरेलू वादा ब्याज सहित लौटेगा।",
  },
  7: {
    lineEn: "A study month — research now saves rework later; visibility can wait.",
    lineHi: "अध्ययन का महीना — अब का शोध बाद की दोबारा-मेहनत बचाता है; दिखना रुक सकता है।",
  },
  8: {
    lineEn: "The money month — chase receivables, negotiate hard, close clean.",
    lineHi: "धन का महीना — बकाया वसूलिए, सख़्त मोल-भाव कीजिए, साफ़ बंद कीजिए।",
  },
  9: {
    lineEn: "The closure month — finish, forgive, empty the desk for what comes.",
    lineHi: "बंद करने का महीना — पूरा कीजिए, माफ़ कीजिए, आने वाले के लिए मेज़ खाली कीजिए।",
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
  const hi = `आपका मूलांक ${dev(mulank)} (${grahaNameHi(mulank)}) जीवन का पहला हाफ़ चलाता है; भाग्यांक ${dev(bhagyank)} (${grahaNameHi(bhagyank)}) दूसरा। अभी आप अंक दशा ${dev(py)} में खड़े हैं — ${pyLine.lineHi}`;
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
    1: "सूर्य", 2: "चंद्रमा", 3: "गुरु", 4: "राहु", 5: "बुध",
    6: "शुक्र", 7: "केतु", 8: "शनि", 9: "मंगल",
    11: "सूर्य (11)", 22: "राहु (22)", 33: "गुरु (33)",
  };
  return names[n] ?? "सूर्य";
}

function dev(n: number): string {
  const map = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  return String(n).split("").map((ch) => (/\d/.test(ch) ? map[Number(ch)] : ch)).join("");
}