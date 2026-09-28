/**
 * Anko Ki Maya v3.1 — NUMBER REPETITIONS ENGINE (owner correction #4,
 * mandatory school method from the students decks: 'vartmaan ank gunan').
 *
 * Count each digit's repetitions in the FULL date of birth:
 *   - 2-same  = energy doubled  → strength + a shadow the number extracts
 *   - 3-same  = very intense (triple 3 = 'Guru ka jhanda' — teacher/speaker)
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
/* School copy per digit: strength (prabalata) + shadow (chhaya) + upay      */
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
    strengthHi: "aatm-netritv doguna — jahan doosaron ko teem chaahie, aap akele shuruaat kar sakate hain.",
    shadowEn: "double 1 = ego and impatience — the 'my way' streak burns bridges and loses useful people.",
    shadowHi: "Double 1 = ahankaar aur adheerata — 'mera hi tareeka' ka jwaalanta pul jalaata hai aur kaam ke log khota hai.",
    upayEn: "Upay for the shadow: one deliberate pause before every decision — Surya's water-offering at sunrise keeps the king-planet humble.",
    upayHi: "chhaya ka upaay: har nirnay se pehle ek jaan-boojhkar thaharaav — praatahkaal Surya ko jal arpan se raja-graha namr rehata hai.",
    tripleEn: "Triple 1 = the commander signature — extreme self-will; leadership arrives only after the ego is trained.",
    tripleHi: "triple 1 = senaapati ka dastakhat — atyant svatantr-ichchha; ahankaar ke anushaasit hone ke baad hi netritv aata hai.",
  },
  2: {
    strengthEn: "Sensitivity doubled — you read people's hearts before they speak.",
    strengthHi: "snvedanasheelata doguni — log bolane se pehle aap unake man padh lete hain.",
    shadowEn: "double 2 = over-sensitivity — moods swing, criticism lands too deep, waiting stretches too long.",
    shadowHi: "double 2 = ati-snvedanasheelata — man utaar-chadhaav bhara, aalochana gehri chubhai hai, intajaar lnba khinch jaata hai.",
    upayEn: "Upay for the shadow: Monday water-offering to the Moon and one spoken sentence per day instead of swallowed silence.",
    upayHi: "chhaya ka upaay: Somvaar ko Chandrama ko jal-daan, aur roz ek kahee hui baat — nigai hui khaamoi ka ilaaj bolna hai.",
    tripleEn: "Triple 2 = the tide-master — extreme emotional tide; boundaries are the lifetime lesson.",
    tripleHi: "triple 2 = lahar-Swami — atyant bhav-lahar; seemaae rakhana jeevan-paath hai.",
  },
  3: {
    strengthEn: "Expression doubled — knowledge flows out of you naturally; people gather to listen.",
    strengthHi: "abhivyakti doguni — gyaan aapse sahaj bahata hai; log sunne ke liye jutate hain.",
    shadowEn: "double 3 = scattered energy — ten bright tables starve the main one; starting many, finishing few.",
    shadowHi: "double 3 = bikhri oorja — das chamakti kirchein, ek patang nahi; bahut shuru karo, thoda poora karo.",
    upayEn: "Upay for the shadow: one flagship at a time, Thursday haldi/chana-daal daan to keep Guru focused.",
    upayHi: "chhaya ka upaay: ek samay par ek dhvaj-pariyojana; Guruvaar haldi/chane-daal daan se Guru ekaagr rehata hai.",
    tripleEn: "Triple 3 = Guru ka jhanda — teacher/speaker: the very intense teacher-speaker signature; the world learns from you, so the world also watches you.",
    tripleHi: "triple 3 = Guru ka jhanda — teacher/speaker: atyant teevr shikshak-vakta ka dastakhat; duniyaa aapse seekhei, aur duniyaa aapko dekhei bhi.",
  },
  4: {
    strengthEn: "Order doubled — systems, routines and paperwork bend to your discipline.",
    strengthHi: "vyavastha doguni — system, routine aur kaagzaat aapke anushasan mein dhalate hain.",
    shadowEn: "double 4 = rigidity — rules harden into walls; unexpected change (Rahu's weather) hits hard.",
    shadowHi: "double 4 = kadaapan — niyam deewar ban jaate hain; achanak badlaav (Rahu ka mausam) bhaari padata hai.",
    upayEn: "Upay for the shadow: Saturday sapta-dhanya daan and one deliberate change of routine each week.",
    upayHi: "chhaya ka upaay: Shanivaar saptdhaanya daan, aur hafte mein ek jaan-boojhkar routine-badlaav.",
    tripleEn: "Triple 4 = the fortress — extreme structure; the risk is a life walled in by its own rules.",
    tripleHi: "triple 4 = kaila — atyant sanrachna; jokhim yeh ki apne hi niyamon ki deewar mein jeevan band ho jaae.",
  },
  5: {
    strengthEn: "double 5 = restlessness turned productive — adaptability doubled; you move faster than markets change.",
    strengthHi: "double 5 = bechaini upayoi roop mein — anukoolan doguna; baazaar badalane se pehle aap badal lete hain.",
    shadowEn: "double 5 = restlessness — the mind will not sit; too many switches scatter money and focus.",
    shadowHi: "double 5 = bechaini — man tikata nahi; bahut zyada badlaav paisa aur dhyaan dono bikherate hain.",
    upayEn: "Upay for the shadow: Wednesday moong/green daan and a written rule — no new switch before the old one pays.",
    upayHi: "chhaya ka upaay: Budhvaar moong/hara daan, aur likhit niyam — puraana phal dene se pehle naya badlaav nahi.",
    tripleEn: "Triple 5 = the storm-rider — extreme motion; the lifetime task is one deep anchor.",
    tripleHi: "triple 5 = toophaan-savaar — atyant chnchalata; jeevan-bhar ka kaam ek gehra lngar banaana.",
  },
  6: {
    strengthEn: "Care doubled — home, family and beauty grow wherever you stay long enough.",
    strengthHi: "dekhbhaal doguni — jahan aap tikate hain, ghar, parivaar aur saundarya wahin khilate hain.",
    shadowEn: "double 6 = over-carrying — responsibilities that are not yours pile onto your shoulders.",
    shadowHi: "double 6 = ati-vahan — jo zimmewari aapki nahi, woh bhi kndhon par aa jaati hai.",
    upayEn: "Upay for the shadow: Friday white daan and one honest 'no' per week — Shukra wins through softness, not surrender.",
    upayHi: "chhaya ka upaay: Shukravaar safed daan, aur hafte mein ek sachcha 'na' — Shukra naramee se jeetata hai, samarpan se nahi.",
    tripleEn: "Triple 6 = the homemaker-heart — extreme devotion to family; self-care is the lesson of life.",
    tripleHi: "triple 6 = grihasth-hriday — parivaar ke liye atyant samarpan; apni dekhbhaal hi jeevan-paath.",
  },
  7: {
    strengthEn: "Depth doubled — research, spirituality and single-subject mastery come naturally.",
    strengthHi: "gehrai doguni — shodh, adhyaatm aur ek vishay mein mahaarat sahaj aai hai.",
    shadowEn: "double 7 = over-detachment — retreating when one honest conversation would do; trust gets hard.",
    shadowHi: "double 7 = ati-vairaagy — jahan ek sachchee baat kaaphaee hoti, wahan peechhe hat jaana; bharosa kathin ho jaata hai.",
    upayEn: "Upay for the shadow: Saturday mustard-flowers/camphor daan and one open conversation per week.",
    upayHi: "chhaya ka upaay: Shanivaar kastoori/dhoosar pushp daan, aur hafte mein ek khui baatacheet.",
    tripleEn: "Triple 7 = the hermit-sage — extreme inwardness; the world must be re-entered by choice, not avoidance.",
    tripleHi: "triple 7 = muni-dastakhat — atyant antarmui; duniyaa mein vaapai sankalp se ho, bachaav se nahi.",
  },
  8: {
    strengthEn: "double 8 = deep-but-delayed karma — money and position arrive in big blocks, never crumbs; what you build stays built.",
    strengthHi: "double 8 = gehra-par-vilambit karm — dhan aur pad tukadaon mein nahi, bade khndon mein aate hain; jo banaayaa, woh tikata hai.",
    shadowEn: "double 8 = deep-but-delayed karma — early years feel unfairly slow; shortcuts collect interest.",
    shadowHi: "double 8 = gehra-par-vilambit karm — pehle saal anyaay-se dheeme lagate hain; shortcut byaaj lete hain.",
    upayEn: "Upay for the shadow: Saturday oil daan, daily cash ledger, and patience honoured as a practice — Shani pays the one who stays.",
    upayHi: "chhaya ka upaay: Shanivaar tel daan, roz roqda-bahee, aur dhairya ko saadhana banao — Shani tikane waale ko deta hai.",
    tripleEn: "Triple 8 = the karmic auditor — extreme weight of cause-and-effect; a life of visible accountability.",
    tripleHi: "triple 8 = karm-lekhak — kaaran-parinaam ka atyant bhaari hisaab; uttaradaayitv sabake saamne dikhata hai.",
  },
  9: {
    strengthEn: "Compassion doubled — your cause-voice moves crowds; finishers' energy completes what 8 starts.",
    strengthHi: "karuna doguni — aapki uddeshya-vaani bheed chalaai hai; samaapan-oorja poore chakra band karti hai.",
    shadowEn: "double 9 = fire without an address — anger flares, and holding on to finished chapters drains it.",
    shadowHi: "double 9 = bina thikaane ki agni — krodh chatakata hai, aur khatm adhyayon ko thaame rakhana oorja kheenchata hai.",
    upayEn: "Upay for the shadow: Tuesday lal-masoor/tamba daan and one deliberate closure ritual — forgive, then move.",
    upayHi: "chhaya ka upaay: Mangalvaar laal masoor/taamba daan, aur ek jaan-boojhkar samaapan-snskaar — maaph karo, phir badhaie.",
    tripleEn: "Triple 9 = the mahayodha — extreme completion-fire; serve a cause bigger than yourself.",
    tripleHi: "triple 9 = mahaayoddha — atyant samaapan-agni; apne se bade uddeshya ki seva karo.",
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
    `Rule (school deck 'vartmaan ank gunan'): 2-same = energy doubled (strength + shadow); 3-same = very intense (triple 3 = Guru ka jhanda — teacher/speaker).`,
    `Mulank ${mul} vs Bhagyank ${bhag}: ${mul === bhag ? "SAME digit in both positions — special callout issued." : "different — no combined callout."}`,
  ];

  return { entries, mulankBhagyankSame, counts, steps };
}