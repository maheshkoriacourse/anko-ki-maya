/**
 * Anko Ki Maya v3.1 — NUMBER REPETITIONS ENGINE (owner correction #4,
 * mandatory school method from the students decks: 'वर्तमान अंक गुणन').
 *
 * Count each digit's repetitions in the FULL date of birth:
 *   - 2-same  = energy doubled  → strength + a shadow the number extracts
 *   - 3-same  = very intense (triple 3 = 'गुरु का झंडा' — teacher/speaker)
 *   - same digit as BOTH Mulank and Bhagyank = special callout
 * Every repeated digit carries strength + shadow + upay-for-shadow (EN+HI).
 * Zeros are not counted (no zero in Ank Shastra's grid).
 */

export interface RepetitionEntry {
  digit: number;
  count: number; // 2 or 3+ (singletons are not "repetitions")
  level: "double" | "triple";
  strengthEn: string;
  strengthHi: string;
  shadowEn: string;
  shadowHi: string;
  upayEn: string;
  upayHi: string;
}

export interface RepetitionsResult {
  entries: RepetitionEntry[];
  /** Digit appearing as both Mulank and Bhagyank — the special callout. */
  mulankBhagyankSame: RepetitionEntry | null;
  /** All digit counts 1-9 (singletons included) for the UI tally line. */
  counts: Record<number, number>;
  steps: string[];
}

/* ------------------------------------------------------------------ */
/* School copy per digit: strength (प्रबलता) + shadow (छाया) + upay      */
/* ------------------------------------------------------------------ */

const REP_COPY: Record<
  number,
  {
    strengthEn: string;
    strengthHi: string;
    shadowEn: string;
    shadowHi: string;
    upayEn: string;
    upayHi: string;
    tripleEn: string;
    tripleHi: string;
  }
> = {
  1: {
    strengthEn: "Self-leadership doubled — you can start alone where others need a team.",
    strengthHi: "आत्म-नेतृत्व दोगुना — जहाँ दूसरों को टीम चाहिए, आप अकेले शुरुआत कर सकते हैं।",
    shadowEn: "double 1 = ego and impatience — the 'my way' streak burns bridges and loses useful people.",
    shadowHi: "डबल 1 = अहंकार और अधीरता — 'मेरा ही तरीक़ा' का ज़ज़्बा पुल जलाता है और काम के लोग खोता है।",
    upayEn: "Upay for the shadow: one deliberate pause before every decision — Surya's water-offering at sunrise keeps the king-planet humble.",
    upayHi: "छाया का उपाय: हर निर्णय से पहले एक जान-बूझकर ठहराव — प्रातःकाल सूर्य को जल अर्पण से राजा-ग्रह नम्र रहता है।",
    tripleEn: "Triple 1 = the commander signature — extreme self-will; leadership arrives only after the ego is trained.",
    tripleHi: "ट्रिपल 1 = सेनापति का दस्तख़त — अत्यंत स्व-इच्छा; अहंकार के अनुशासित होने के बाद ही नेतृत्व आता है।",
  },
  2: {
    strengthEn: "Sensitivity doubled — you read people's hearts before they speak.",
    strengthHi: "संवेदनशीलता दोगुनी — लोग बोलने से पहले आप उनके मन पढ़ लेते हैं।",
    shadowEn: "double 2 = over-sensitivity — moods swing, criticism lands too deep, waiting stretches too long.",
    shadowHi: "डबल 2 = अति-संवेदनशीलता — मन उतार-चढ़ाव भरा, आलोचना गहरी चुभती है, इंतज़ार लंबा खिंच जाता है।",
    upayEn: "Upay for the shadow: Monday water-offering to the Moon and one spoken sentence per day instead of swallowed silence.",
    upayHi: "छाया का उपाय: सोमवार को चंद्रमा को जल-दान, और रोज़ एक कही हुई बात — निगली हुई ख़ामोशी का इलाज बोलना है।",
    tripleEn: "Triple 2 = the tide-master — extreme emotional tide; boundaries are the lifetime lesson.",
    tripleHi: "ट्रिपल 2 = लहर-स्वामी — अत्यंत भाव-लहर; सीमाएँ रखना जीवन-पाठ है।",
  },
  3: {
    strengthEn: "Expression doubled — knowledge flows out of you naturally; people gather to listen.",
    strengthHi: "अभिव्यक्ति दोगुनी — ज्ञान आपसे सहज बहता है; लोग सुनने के लिए जुटते हैं।",
    shadowEn: "double 3 = scattered energy — ten bright tables starve the main one; starting many, finishing few.",
    shadowHi: "डबल 3 = बिखरी ऊर्जा — दस चमकती मेज़ें, एक पटरी नहीं; बहुत शुरू करना, थोड़ा पूरा करना।",
    upayEn: "Upay for the shadow: one flagship at a time, Thursday haldi/chana-daal daan to keep Guru focused.",
    upayHi: "छाया का उपाय: एक समय पर एक ध्वज-परियोजना; गुरुवार हल्दी/चने-दाल दान से गुरु एकाग्र रहता है।",
    tripleEn: "Triple 3 = गुरु का झंडा — टीचर/स्पीकर: the very intense teacher-speaker signature; the world learns from you, so the world also watches you.",
    tripleHi: "ट्रिपल 3 = गुरु का झंडा — टीचर/स्पीकर: अत्यंत तीव्र शिक्षक-वक्ता का दस्तख़त; दुनिया आपसे सीखेगी, और दुनिया आपको देखेगी भी।",
  },
  4: {
    strengthEn: "Order doubled — systems, routines and paperwork bend to your discipline.",
    strengthHi: "व्यवस्था दोगुनी — सिस्टम, रुटीन और काग़ज़ात आपके अनुशासन में ढलते हैं।",
    shadowEn: "double 4 = rigidity — rules harden into walls; unexpected change (Rahu's weather) hits hard.",
    shadowHi: "डबल 4 = कड़ापन — नियम दीवार बन जाते हैं; अचानक बदलाव (राहु का मौसम) भारी पड़ता है।",
    upayEn: "Upay for the shadow: Saturday sapta-dhanya daan and one deliberate change of routine each week.",
    upayHi: "छाया का उपाय: शनिवार सप्तधान्य दान, और हफ़्ते में एक जान-बूझकर रुटीन-बदलाव।",
    tripleEn: "Triple 4 = the fortress — extreme structure; the risk is a life walled in by its own rules.",
    tripleHi: "ट्रिपल 4 = क़िला — अत्यंत संरचना; जोखिम यह कि अपने ही नियमों की दीवार में जीवन बंद हो जाए।",
  },
  5: {
    strengthEn: "double 5 = restlessness turned productive — adaptability doubled; you move faster than markets change.",
    strengthHi: "डबल 5 = बेचैनी उपयोगी रूप में — अनुकूलन दोगुना; बाज़ार बदलने से पहले आप बदल लेते हैं।",
    shadowEn: "double 5 = restlessness — the mind will not sit; too many switches scatter money and focus.",
    shadowHi: "डबल 5 = बेचैनी — मन टिकता नहीं; बहुत ज़्यादा बदलाव पैसा और ध्यान दोनों बिखेरते हैं।",
    upayEn: "Upay for the shadow: Wednesday moong/green daan and a written rule — no new switch before the old one pays.",
    upayHi: "छाया का उपाय: बुधवार मूँग/हरा दान, और लिखित नियम — पुराना फल देने से पहले नया बदलाव नहीं।",
    tripleEn: "Triple 5 = the storm-rider — extreme motion; the lifetime task is one deep anchor.",
    tripleHi: "ट्रिपल 5 = तूफ़ान-सवार — अत्यंत चंचलता; जीवन-भर का काम एक गहरा लंगर बनाना।",
  },
  6: {
    strengthEn: "Care doubled — home, family and beauty grow wherever you stay long enough.",
    strengthHi: "देखभाल दोगुनी — जहाँ आप टिकते हैं, घर, परिवार और सौंदर्य वहीं खिलते हैं।",
    shadowEn: "double 6 = over-carrying — responsibilities that are not yours pile onto your shoulders.",
    shadowHi: "डबल 6 = अति-वहन — जो ज़िम्मेदारी आपकी नहीं, वह भी कंधों पर आ जाती है।",
    upayEn: "Upay for the shadow: Friday white daan and one honest 'no' per week — Shukra wins through softness, not surrender.",
    upayHi: "छाया का उपाय: शुक्रवार सफ़ेद दान, और हफ़्ते में एक सच्चा 'ना' — शुक्र नरमी से जीतता है, समर्पण से नहीं।",
    tripleEn: "Triple 6 = the homemaker-heart — extreme devotion to family; self-care is the lesson of life.",
    tripleHi: "ट्रिपल 6 = गृहस्थ-हृदय — परिवार के लिए अत्यंत समर्पण; अपनी देखभाल ही जीवन-पाठ।",
  },
  7: {
    strengthEn: "Depth doubled — research, spirituality and single-subject mastery come naturally.",
    strengthHi: "गहराई दोगुनी — शोध, अध्यात्म और एक विषय में महारत सहज आती है।",
    shadowEn: "double 7 = over-detachment — retreating when one honest conversation would do; trust gets hard.",
    shadowHi: "डबल 7 = अति-वैराग्य — जहाँ एक सच्ची बात काफ़ी होती, वहाँ पीछे हट जाना; भरोसा कठिन हो जाता है।",
    upayEn: "Upay for the shadow: Saturday mustard-flowers/camphor daan and one open conversation per week.",
    upayHi: "छाया का उपाय: शनिवार कस्तूरी/धूसर पुष्प दान, और हफ़्ते में एक खुली बातचीत।",
    tripleEn: "Triple 7 = the hermit-sage — extreme inwardness; the world must be re-entered by choice, not avoidance.",
    tripleHi: "ट्रिपल 7 = मुनि-दस्तख़त — अत्यंत अंतर्मुखी; दुनिया में वापसी संकल्प से हो, बचाव से नहीं।",
  },
  8: {
    strengthEn: "double 8 = deep-but-delayed karma — money and position arrive in big blocks, never crumbs; what you build stays built.",
    strengthHi: "डबल 8 = गहरा-पर-विलंबित कर्म — धन और पद टुकड़ों में नहीं, बड़े खंडों में आते हैं; जो बनाया, वह टिकता है।",
    shadowEn: "double 8 = deep-but-delayed karma — early years feel unfairly slow; shortcuts collect interest.",
    shadowHi: "डबल 8 = गहरा-पर-विलंबित कर्म — पहले वर्ष अन्याय-से धीमे लगते हैं; शॉर्टकट ब्याज लेते हैं।",
    upayEn: "Upay for the shadow: Saturday oil daan, daily cash ledger, and patience honoured as a practice — Shani pays the one who stays.",
    upayHi: "छाया का उपाय: शनिवार तेल दान, रोज़ रोकड़ा-बही, और धैर्य को साधना बनाइए — शनि टिकने वाले को देता है।",
    tripleEn: "Triple 8 = the karmic auditor — extreme weight of cause-and-effect; a life of visible accountability.",
    tripleHi: "ट्रिपल 8 = कर्म-लेखक — कारण-परिणाम का अत्यंत भारी हिसाब; उत्तरदायित्व सबके सामने दिखता है।",
  },
  9: {
    strengthEn: "Compassion doubled — your cause-voice moves crowds; finishers' energy completes what 8 starts.",
    strengthHi: "करुणा दोगुनी — आपकी उद्देश्य-वाणी भीड़ चलाती है; समापन-ऊर्जा पूरे चक्र बंद करती है।",
    shadowEn: "double 9 = fire without an address — anger flares, and holding on to finished chapters drains it.",
    shadowHi: "डबल 9 = बिना ठिकाने की अग्नि — क्रोध चटकता है, और ख़त्म अध्यायों को थामे रखना ऊर्जा खींचता है।",
    upayEn: "Upay for the shadow: Tuesday lal-masoor/tamba daan and one deliberate closure ritual — forgive, then move.",
    upayHi: "छाया का उपाय: मंगलवार लाल मसूर/तांबा दान, और एक जान-बूझकर समापन-संस्कार — माफ़ कीजिए, फिर बढ़िए।",
    tripleEn: "Triple 9 = the mahayodha — extreme completion-fire; serve a cause bigger than yourself.",
    tripleHi: "ट्रिपल 9 = महायोद्धा — अत्यंत समापन-अग्नि; अपने से बड़े उद्देश्य की सेवा कीजिए।",
  },
};

function foldMaster(n: number): number {
  return n === 11 ? 2 : n === 22 ? 4 : n === 33 ? 6 : n;
}

/**
 * Build the repetition reading from a full DOB (YYYY-MM-DD parts).
 * @param mulank reduced birth-day number (masters preserved by caller, folded here)
 * @param bhagyank life-path number (masters preserved by caller, folded here)
 */
export function analyzeRepetitions(
  year: number,
  month: number,
  day: number,
  mulank?: number,
  bhagyank?: number,
): RepetitionsResult {
  const dateStr = `${String(day).padStart(2, "0")}${String(month).padStart(2, "0")}${year}`;
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  for (const ch of dateStr) {
    const d = Number(ch);
    if (d >= 1 && d <= 9) counts[d]++;
  }

  const entries: RepetitionEntry[] = [];
  for (let d = 1; d <= 9; d++) {
    const c = counts[d];
    if (c < 2) continue;
    const copy = REP_COPY[d];
    const level: "double" | "triple" = c >= 3 ? "triple" : "double";
    entries.push({
      digit: d,
      count: c,
      level,
      strengthEn: level === "triple" ? copy.tripleEn : copy.strengthEn,
      strengthHi: level === "triple" ? copy.tripleHi : copy.strengthHi,
      shadowEn: copy.shadowEn,
      shadowHi: copy.shadowHi,
      upayEn: copy.upayEn,
      upayHi: copy.upayHi,
    });
  }

  const mul = foldMaster(mulank ?? foldMaster(day));
  const bhag = foldMaster(bhagyank ?? foldMaster(day + month + year));
  let mulankBhagyankSame: RepetitionEntry | null = null;
  if (mul === bhag) {
    const found = entries.find((e) => e.digit === mul);
    if (found) {
      mulankBhagyankSame = found;
    } else {
      // Same digit as Mulank and Bhagyank but not repeated in the DOB digits —
      // still the special callout, synthesised from the copy bank.
      const copy = REP_COPY[mul];
      mulankBhagyankSame = {
        digit: mul,
        count: counts[mul] || 1,
        level: "double",
        strengthEn: copy.strengthEn,
        strengthHi: copy.strengthHi,
        shadowEn: copy.shadowEn,
        shadowHi: copy.shadowHi,
        upayEn: copy.upayEn,
        upayHi: copy.upayHi,
      };
    }
  }

  const tally = ([1, 2, 3, 4, 5, 6, 7, 8, 9] as const)
    .filter((d) => counts[d] > 0)
    .map((d) => `${d}×${counts[d]}`)
    .join(", ");

  const steps: string[] = [
    `Full date ${String(day).padStart(2, "0")}-${String(month).padStart(2, "0")}-${year} → digits ${dateStr.split("").join(", ")}; 0 is not counted (no zero in the grid).`,
    `Tally: ${tally}.`,
    `Rule (school deck 'वर्तमान अंक गुणन'): 2-same = energy doubled (strength + shadow); 3-same = very intense (triple 3 = गुरु का झंडा — teacher/speaker).`,
    `Mulank ${mul} vs Bhagyank ${bhag}: ${mul === bhag ? "SAME digit in both positions — special callout issued." : "different — no combined callout."}`,
  ];

  return { entries, mulankBhagyankSame, counts, steps };
}