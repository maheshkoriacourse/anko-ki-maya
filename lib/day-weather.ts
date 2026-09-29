/**
 * v3.6 DIN-MAAUSAM + SANKET engine (owner order 30 Sep):
 * "Jo aaj ka din kaisa tha kaisa rahega bataye, kal ka kya hoga kaisa hoga.
 *  Ap kisi negative event ka alert kyun nahi deta? It should warn — bhai dhyan rakhna."
 *
 * Daily forecast = layered jyotishi logic (numerology core, graha layer secret
 * but always explained in Basis blocks — market reads 'numerology', engine
 * reads the whole sky):
 *   1. Personal Day (PY + month + day-reduction)  → din ki mukhya dhaara
 *   2. Weekday graha (Som=Chandra, Mangal=Mangal, Budh=Budh, Guru=Guru,
 *      Shukra=Shukra, Shani=Shani, Ravi=Ravi) → din ka swami
 *   3. Mulank/Bhagyank vs day-number dosti/takrar → support ya friction
 *   4. Activation tags (karmic-debt in compound, surya-grahan days i.e. PY 9
 *      overlapping weekday-Shani, etc.) → sanket (caution) bands
 *
 * WARNING BANDS (the owner's ask — the app now warns, with basis, never doom):
 * always paired with an upay. Voice: direct jyotishi — 'dhyan rakhna' energy,
 * no 'may suggest', no 'theme'. Devanagari only for mantras.
 */

export type Lang = "en" | "hi";

export interface DaySignal {
  /** din ka ek-line saar (headline) */
  headlineEn: string;
  headlineHi: string;
  /** 3-5 beat paragraph — kya chalega, kya atkega, kaise chalana */
  bodyEn: string;
  bodyHi: string;
  /** din ka numeric score 1..10 (upar se) */
  score: number;
  /** graha swami + mulank-bhagyank relation */
  swamiEn: string;
  swamiHi: string;
  /** संकेत / caution bands (empty = clean day) */
  warnings: DayWarning[];
  /** Basis-block steps (har dawa ka hisaab) */
  steps: string[];
}

export interface DayWarning {
  level: "dhyan" | "savdhan" | "rok"; // caution / warning / stop-advice
  en: string;
  hi: string;
  /** upay always attached — warning without remedy is doom-saying */
  upayEn: string;
  upayHi: string;
}

const WEEKDAY_SWAMI: { en: string; hi: string }[] = [
  { en: "Ravi (Sun)", hi: "Ravi (Surya)" }, // Sunday=0
  { en: "Chandra (Moon)", hi: "Chandra" }, // Monday
  { en: "Mangal (Mars)", hi: "Mangal" },
  { en: "Budh (Mercury)", hi: "Budh" },
  { en: "Guru (Jupiter)", hi: "Guru (Brihaspati)" },
  { en: "Shukra (Venus)", hi: "Shukra" },
  { en: "Shani (Saturn)", hi: "Shani" },
];

const SWAMI_NATURE: Record<string, { drivesEn: string; drivesHi: string }> = {
  "Ravi (Sun)": {
    drivesEn: "authority, health, father-figures, government work — good for standing up and being counted",
    drivesHi: "padav, sehat, pita-panth, sarkari kaam — khade hone aur ginti mein aane ke liye uttam",
  },
  "Chandra (Moon)": {
    drivesEn: "mood, mother-side family, home matters, public dealing — flow with feelings but sign nothing on pure emotion",
    drivesHi: "man, maa-panth ka parivaar, ghar, janta-se-nata — jazbaat ke saath behno, par shuddh ehsaas par kagaz mat sign karo",
  },
  "Mangal (Mars)": {
    drivesEn: "action, courage, property, machines, competition — fast wins but fast tempers",
    drivesHi: "karam, saahas, zameen, machine, muqabla — jeet bhi jaldi, gussa bhi jaldi",
  },
  "Budh (Mercury)": {
    drivesEn: "trade, documents, conversations, short travel — the day to send proposals and close paperwork",
    drivesHi: "vyapar, kagza, baat-cheet, chhota safar — prastaav bhejne aur kagaz band karne ka din",
  },
  "Guru (Jupiter)": {
    drivesEn: "teaching, counsel, finance approvals, elders' blessings — expansion day, ask big",
    drivesHi: "sikhaana, salaah, vitti-approval, buzurgon ka aashirwad — phailaav ka din, bada maango",
  },
  "Shukra (Venus)": {
    drivesEn: "love, harmony, design, beauty, money through women clients — soften the tone, upgrade the taste",
    drivesHi: "prem, mel, shilp, sundarta, mahila-clients se dhan — lehja naram, zaiqa ooncha",
  },
  "Shani (Saturn)": {
    drivesEn: "discipline, dues, old work, audits — slow but honest pays; shortcuts multiply",
    drivesHi: "anushasan, bakaya, purana kaam, jaanch — dheema par imaandaar palta hai; shortcut bahugunita hota hai",
  },
};

/** Mulank/day friendship map (varga-dosti, simplified Vedic friendly-planets). */
const FRIEND: Record<number, number[]> = {
  1: [1, 2, 4, 5, 9], // Surya: Chandra, Rahu(4), Budh(5), Mangal(9)
  2: [1, 2, 3, 9], // Chandra: Surya, Guru(3), Mangal
  3: [1, 2, 3, 5], // Guru: Surya, Chandra, Budh? (Guru-Budh neutral; keep classic)
  4: [1, 4, 5, 6, 7], // Rahu: Surya, Budh, Shukra(6), Shani(7)
  5: [1, 3, 5, 6], // Budh: Surya, Guru, Shukra; enemy: Chandra(2), Mangal(9 per some — keep 4,8 as avoid)
  6: [4, 5, 6, 7], // Shukra: Rahu, Budh, Shani; 
  7: [4, 6, 7, 1], // Shani: Rahu, Shukra; also friendly to Surya(1) loosely — classic list
  8: [4, 6, 7], // Shani-fold for 8
  9: [1, 2, 3, 9], // Mangal: Surya, Chandra, Guru
};

function ds(n: number): number {
  let x = n;
  while (x > 9) x = String(x).split("").reduce((a, b) => a + Number(b), 0);
  return x;
}

function reduceFull(n: number): number {
  let x = n;
  // keep masters 11/22/33 at first pass, then reduce
  while (x > 9 && ![11, 22, 33, 29, 12, 13, 14, 16, 19].includes(x)) {
    x = String(x).split("").reduce((a, b) => a + Number(b), 0);
  }
  if (x > 9) x = String(x).split("").reduce((a, b) => a + Number(b), 0);
  return x;
}

export function dayNumber(d: Date): number {
  return ds(d.getFullYear() + ds(d.getMonth() + 1) + ds(d.getDate()));
}

/** compound personal-day sum BEFORE reduction — karmic debt 13/14/16/19 lives here */
export function personalDayCompound(birthMonth: number, birthDay: number, d: Date): number {
  const py = ds(birthMonth) + ds(birthDay) + ds(d.getFullYear());
  return py + ds(d.getMonth() + 1) + ds(d.getDate());
}

const DAY_MEANING: Record<number, { hdEn: string; hdHi: string; bEn: string; bHi: string }> = {
  1: {
    hdEn: "the day of the first move — your name is louder today",
    hdHi: "pehle kadam ka din — aaj aapka naam tez sunai deta hai",
    bEn: "Open with your own move: send the pitch, ask the question, take the seat at the head. Support flows to those who state their case today; waiting costs more than acting. Keep ego light — Surya days reward the bold who listen.",
    bHi: "Apni pahal se din kholo: aaj pitch bhejo, sawal poochho, sabse aage baitho. Jo aaj apni baat seedha kehte hain unki sunai hoti hai; intezaar karne se chhota jhuka jaata hai. Ahankaar halka rakho — Surya ke din unhi ko dete hain jo bol bhi jaanein aur sun bhi lein.",
  },
  2: {
    hdEn: "the listening day — quiet leverage beats loud effort",
    hdHi: "sunne ka din — chupchaap chaal bade shor se badi",
    bEn: "Progress hides in conversation: the callback, the reference, the reconciling talk. Push today and doors stay shut; ask one person one honest question and they open. Emotions run high for everyone — don't read small moods as insults.",
    bHi: "Aaj tareqqi baat mein chhupi hai: koi call-back, koi reference, koi sulah. Zor lagane se darwaaze band rehte hain; ek imaandaar sawaal khol dete hain. Sab ke man mein halchal hai — kisi ka chhota mood aap par insult mat lo.",
  },
  3: {
    hdEn: "the visibility day — voice turns into opportunity",
    hdHi: "dikhne ka din — awaaz mauqe mein badalti hai",
    bEn: "Speak, post, present, teach. Whatever you put in public today grows teeth — an idea shared today returns as an invite tomorrow. Watch the scatter: three started things beat nothing, but one finished thing beats three started.",
    bHi: "Boliye, likhiye, pesh kijiye, sikhaye. Jo aaj saamne aaya wo kal invite banega. Phailna alag, poora karna alag — ek poora kaam teen adhuron se aage.",
  },
  4: {
    hdEn: "the systems day — boring today, compounding for months",
    hdHi: "system ka din — aaj be-lagam, aane waale mahino mein byaaj",
    bEn: "Fix the process, file the paperwork, return the money owed, tidy the ledger. Rahu tests at corners: the 'adjust kar lete hain' habit is exactly what gets caught. Small honest repairs today save a week of firefighting this quarter.",
    bHi: "Process theek karo, kagaz lagwaye, udhaar laute, hisaab saaf. Rahu kinaron par parikhta hai — 'baad mein hisaab kar lenge' wali aadat hi pakdi jaati hai. Aaj ki ek chhoti imaandaar marammari is quarter ka ek hafta bachaati hai.",
  },
  5: {
    hdEn: "the movement day — roads carry money today",
    hdHi: "harakat ka din — aaj sadke paise le jaati hain",
    bEn: "Travel, negotiate, network, answer fast. New contacts made today pay quickly — but 5 days breed haste: every term in writing before the handshake. One outstation hour can settle what a week of email cannot.",
    bHi: "Safar, mol-bhav, naye log, jawab turant. Aaj ke naye contacts jaldi paalte hain — par 5 ke din jaldi bhi laate hain: haath milane se pehle har shart kaagze par. Bahar ka ek ghanta aksar hafte bhar ki email se bada sauda karwa deta hai.",
  },
  6: {
    hdEn: "the home-and-hearth day — family first pays cash later",
    hdHi: "ghar-parivaar ka din — ghar mehnat bahar phal deti hai",
    bEn: "Keep the home promise today: the pending talk, the child's school thing, the elder's medicine. A settled evening compounds into tomorrow's clear head. Money tied to home (property, family work) moves well — duty done cheerfully, not grudgingly.",
    bHi: "Ghar ka vaada aaj nibhao: taali baat, bachhe ka school kaam, buzurg ki dawai. Shaant shaam kal ke sardi dimag ki neenv hai. Ghar se juda paisa (property, parivaar ka kaam) achha chalta hai — zimmedari khushi se uthao, gusse se nahi.",
  },
  7: {
    hdEn: "the depth day — silence pays compounding",
    hdHi: "gehraai ka din — khamoshi byaaj jama karti hai",
    bEn: "Study, verify, verify again. Loud asks stall today; quiet research doesn't. Sign nothing unread — Ketu days hide fine print. Half an hour of deep reading beats three hours of scattered calls today.",
    bHi: "Padho, jaancho, phir jaancho. Aaj shor wale maange atakte hain; khamosh shodh chalta hai. Bina padhe kuch sign mat karo — Ketu ke din chhupi shartein chhup jaati hain. Aadha ghanta gehra padhna aaj teen ghante bikhere calls se bada hai.",
  },
  8: {
    hdEn: "the money day — collect, negotiate, stay clean",
    hdHi: "paisa ka din — vasooli, mol-bhav, sab saaf",
    bEn: "The strongest day for receivables, price asks and closing deals — and the worst day for tricks. Saturn audits in real time today: every inflated claim gets caught this week itself. Ask plainly for what you earned; give plainly what you owe.",
    bHi: "Baqaya vasooli, apni keemat maangna, saude band karna — aaj sabse tez; aur dhokha ke liye sabse bhari. Shani aaj live jaanch karte hain: har thoda-sa badha khayal isi hafte pakda jaata hai. Kamaya hua saaf maango; dena ka bhi saaf do.",
  },
  9: {
    hdEn: "the closure day — finish, empty, free the next chapter",
    hdHi: "band karne ka din — poora, khaali, agla chapter kholo",
    bEn: "Close the hanging project, send the two-line goodbye, forgive the small grievance. Mars gives the energy to finally end things — unfinished weight today taxes the whole next cycle. Don't start the big new thing today; start it tomorrow.",
    bHi: "Latka project band karo, do-line ka saaf jawab bhejo, chhota shikwaat maaf karo. Mangal aaj cheezein khatam karne ki shakti deta hai — aaj ki latki boojh aane wale poore chakra par lagaan hai. Bada naya kaam aaj mat shuru karo; kal shuru hota hai.",
  },
};

/** ---- SANKET (warnings) rules — deterministic, reasoned, remedy-paired ---- */
export function computeDaySignals(
  birthMonth: number,
  birthDay: number,
  birthYear: number,
  d: Date,
  opts?: { mulank?: number; bhagyank?: number; dayLabel?: string; dayLabelHi?: string },
): DaySignal {
  const mulank = opts?.mulank ?? ds(birthDay);
  const bhagyank = opts?.bhagyank ?? reduceFull(birthYear + ds(birthMonth) + ds(birthDay));

  const py = ds(ds(birthMonth) + ds(birthDay) + ds(d.getFullYear()));
  const compound = py + ds(d.getMonth() + 1) + ds(d.getDate());
  const pd = reduceFull(compound);
  const weekday = d.getDay();
  const swami = WEEKDAY_SWAMI[weekday];
  const swamiNature = SWAMI_NATURE[swami.en] ?? SWAMI_NATURE["Budh (Mercury)"];

  const warnings: DayWarning[] = [];

  // W1 — karmic debt in the compound personal-day sum (13/14/16/19)
  if ([13, 14, 16, 19].includes(compound % 100) || [13, 14, 16, 19].includes(compound)) {
    const debt = compound === 13 || compound % 100 === 13 ? 13 : compound === 14 || compound % 100 === 14 ? 14 : compound === 16 || compound % 100 === 16 ? 16 : 19;
    if (debt === 13) {
      warnings.push({
        level: "savdhan",
        en: "Karmic debt 13 active — laziness in the middle of work is the trap today: effort started and abandoned costs double. Finish what you open.",
        hi: "karmic rin 13 sakriy — aaj ka jaal kaam ke beech mein aalsam hai: shuru kiya kaam beech mein chhodna dohara hisaab maangta hai. Jo kholaya, use poora karo.",
        upayEn: "Do one full-cycle task today (start → finish → note it); offer water to the Sun in the morning.",
        upayHi: "Aaj ek kaam shuru-se-anat poora karo (shuru → khatam → likh lo); subah Surya ko jal arpan.",
      });
    } else if (debt === 14) {
      warnings.push({
        level: "savdhan",
        en: "Karmic debt 14 active — excess pulls today: shortcuts, quick money ideas, temptation, drink. What feels like freedom tonight reads like a bill by Friday.",
        hi: "karmic rin 14 sakriy — aaj ati ka kheench: shortcut, fata-kharcha, lalach, daru. Jo aaj raat azaadi lagti hai, wo shukrawar ko bill ban dekhti hai.",
        upayEn: "Delay every yes by one hour; no drink today — keep the evening plain and early.",
        upayHi: "Har haan ko ek ghanta taalo; aaj daru nahi — shaam saadhi aur jaldi band.",
      });
    } else if (debt === 16) {
      warnings.push({
        level: "dhyan",
        en: "Karmic debt 16 active — sudden collapse of old structures (an ego-break day). What breaks was scaffolding; still, drive slow and don't sign under pressure.",
        hi: "karmic rin 16 sakriy — purani sanrachnaon ka achanak girta (ahankaar tootne ka din). Jo toota wo saara tha; phir bhi gaadi dheemi, aur dabaav mein sign nahi.",
        upayEn: "No major signature or confrontation today; Hanuman Chalisa in the evening steadies the ground.",
        upayHi: "Aaj bade sign ya seedhi takraav nahi; shaam ko Hanuman Chalisa zameen pakki karti hai.",
      });
    } else {
      warnings.push({
        level: "dhyan",
        en: "Karmic debt 19 active — ego versus authority: pushing your weight on seniors/family today multiplies resistance. Bow once and doors reopen.",
        hi: "karmic rin 19 sakriy — ahankaar banaam adhikaari: aaj upar-waalon par apna wajan jhonnne se rokedh badhti hai. Ek baar jhuko, darwaaze khul jaate hain.",
        upayEn: "Call the senior/elder first and speak soft — the day rewards the smaller man who moves first.",
        upayHi: "Pehle buzurg/senior ko khud call karo aur naram bolo — din chhota-banke aage badhne ka diwana hai.",
      });
    }
  }

  // W2 — friction day: personal-day number is an enemy of Mulank (takrar ka din)
  const friends = FRIEND[mulank] ?? [];
  const enemiesOf = (m: number): number[] => {
    // inverse map: day d is hostile to mulank m if m not in FRIEND[d]-extended sets; simplified: 4-8/8-4 and 2-5 known frictions, 1-8 clash
    if ((m === 4 && (pd === 8 || pd === 5)) || (m === 8 && (pd === 4 || pd === 1)) || (m === 2 && pd === 5) || (m === 5 && pd === 2) || (m === 1 && pd === 8) || (m === 9 && pd === 4) || (m === 4 && pd === 9) || (m === 7 && pd === 3)) {
      return [pd];
    }
    return [];
  };
  const friction = enemiesOf(mulank);
  if (friction.length > 0 && friends.length > 0 && !friends.includes(pd)) {
    warnings.push({
      level: "dhyan",
      en: `Number friction today — Personal Day ${pd} scrapes Mulank ${mulank}: machinery, signatures and sharp words misfire. Not a bad day — a careful day.`,
      hi: `aank-takrar ka din — vyaktigat din ${pd} Mulank ${mulank} ko khata hai: machine, kagaz aur tez zubaan chuk jaate hain. bura din nahi — sawaaldhaan din hai.`,
      upayEn: "Double-check anything signed or driven; keep two minutes of silence before replying to provocation.",
      upayHi: "Jo sign karo ya chalao, do baar jaancho; uttey par jawab se pehle do minute khamosh raho.",
    });
  }

  // W3 — double-Shani audit: weekday Shani + PY 9 (endings forced) ya Shani + PD 9
  if (weekday === 6 && (py === 9 || pd === 9)) {
    warnings.push({
      level: "savdhan",
      en: "Saturn's day meets a completion number — what closes today closes hard (a request denied, a role given up). Accept it; fighting the closing door jams the next one.",
      hi: "Shani ka din aur samaapti-ank saath — jo aaj band hota hai, sakt band hota hai (mana hui request, chhodi hui jagah). sveekar karo; band darwaaze par zor lagane se agla jam jaata hai.",
      upayEn: "Saturday oil-lamp under peepal or simple 'ॐ शनि दाया नमः' 11×; give the worker his full due today.",
      upayHi: "Shanivaar peepal ke neeche tel ka deepak, ya 'ॐ शनिचराय नमः' 11 baar; aaj kaam-waale ko uska poora haq do.",
    });
  }

  // W4 — Mars collision: weekday Mangal + PD 8 (money-power scuffle) — property/machine caution
  if (weekday === 2 && pd === 8) {
    warnings.push({
      level: "dhyan",
      en: "Mars day with money number 8 — property dealings, vehicle rides and heated negotiations need steel brakes today. Courage yes; adrenaline signature no.",
      hi: "Mangal ke din dhan-ank 8 — property ki deal, gaadi ka safar aur garam mol-bhav mein aaj loha-brake. saahas haan; adrenaline par signature nahi.",
      upayEn: "Walk into money rooms with a list, not a mood; Hanuman Ji ka darshan subah.",
      upayHi: "Paisa-waale kamre mein mood se nahi, suchi se jao; subah Hanuman Ji ka darshan.",
    });
  }

  // W5 — Rahu-shadow travel day: weekday Budh + PD 5 (over-movement, misread terms)
  if (weekday === 3 && pd === 5) {
    warnings.push({
      level: "dhyan",
      en: "Mercury on Mercury — the day of double-speed and doubled misreadings: wrong attachments, wrong fares, wrong promises. One re-read saves the day.",
      hi: "Budh par Budh — dugni raftaar aur dugni galat-padhna ka din: galat file, galat kiraya, galat waada. Ek baar dobara padhne se hee din bachta hai.",
      upayEn: "Read every message twice before sending; Ganesha 'ॐ गं गणपतये नमः' before starting the day's work.",
      upayHi: "Bhejne se pehle har message do baar padho; din ka kaam shuru karne se pehle 'ॐ गं गणपतये नमः'.",
    });
  }

  // W6 — health caution: Chandra day + PD 6 overload (carrying everybody's weight)
  if (weekday === 1 && pd === 6) {
    warnings.push({
      level: "dhyan",
      en: "Moon day with the care number — today everyone's problem lands on your shoulders and your own sleep/food is the first thing you'll sacrifice. Guard the body first.",
      hi: "Chandra ka din aur dekhbhaal ka ank — aaj sabki problem aapke kandhe par aa jaati hai aur sabse pehle aap hi apni neend-khaana kurbaan karte hain. Jism pehle.",
      upayEn: "Eat on time, one 20-minute walk after sunset; say one 'no' today and notice nobody breaks.",
      upayHi: "Time par khaana, shaam ko bees minute paidal chalna; aaj ek 'nahi' bolo aur dekho — koi toota nahi.",
    });
  }

  // Day meaning + base paragraph
  const dm = DAY_MEANING[pd] ?? DAY_MEANING[1];
  // v3.6: date-aware phrasing — 'aaj' for today, 'kal' for tomorrow, generic
  // for other dates (engine never lies about which day it reads).
  const dayLabelEn = opts?.dayLabel ?? "today";
  const dayLabelHi = opts?.dayLabelHi ?? "aaj";
  const headlineEn = `${WEEKDAY_SWAMI[weekday].en} owns ${dayLabelEn} — ${dm.hdEn}`;
  const headlineHi = `${dayLabelHi} ${swami.hi} ke haath mein hai — ${dm.hdHi}`;
  const bodyEn = `${dayLabelEn.charAt(0).toUpperCase() + dayLabelEn.slice(1)} runs on ${swami.en}: ${swamiNature.drivesEn}. The personal-day number ${pd} makes it ${dm.bEn}`;
  const bodyHi = `${dayLabelHi} ka swami ${swami.hi} hai: ${swamiNature.drivesHi}. vyaktigat-din ${pd} ise ${dm.bHi}`;
  const swamiLineEn = `Day lord: ${swami.en} — ${swamiNature.drivesEn.split(" — ")[0]}`;
  const swamiLineHi = `din ka swami: ${swami.hi} — ${swamiNature.drivesHi.split(" — ")[0]}`;

  // Score: base 6; +1 friend-day; +1 PD 1/3/8 (strong movers); w-levels subtract; clamp
  let score = 6;
  if (friends.includes(pd)) score += 1;
  if ([1, 3, 8].includes(pd)) score += 1;
  for (const w of warnings) {
    if (w.level === "dhyan") score -= 0.5;
    if (w.level === "savdhan") score -= 1;
    if (w.level === "rok") score -= 2;
  }
  score = Math.max(2, Math.min(9, Math.round(score)));

  const steps = [
    `Personal Day = Personal Year ${py} (month ${birthMonth} + day ${birthDay} + ${d.getFullYear()}) + this month ${d.getMonth() + 1} + this day ${d.getDate()} → sum ${compound} → ${pd}.`,
    `Day lord: ${swami.en} (weekday rule).`,
    `Mulank ${mulank} vs day ${pd}: ${friends.includes(pd) ? "dost-din (support flows)" : "neutral/daya — no clash detected"}.`,
    `Karmic-debt scan of compound ${compound}: ${[13, 14, 16, 19].includes(compound % 100) ? "HIT — warning band raised" : "clean"}.`,
    warnings.length > 0
      ? `${warnings.length} sanket (warning) band${warnings.length > 1 ? "s" : ""} raised — each carries its own upay; warnings are timing alerts, never doom.`
      : "No sanket — clean day; use the headline's strength fully.",
  ];

  return {
    headlineEn,
    headlineHi,
    bodyEn,
    bodyHi,
    score,
    swamiEn: swamiLineEn,
    swamiHi: swamiLineHi,
    warnings,
    steps,
  };
}