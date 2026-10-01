/**
 * v6.3 DAILY 3-CARD COSMIC DASHBOARD — engine.
 *
 * Owner ask: ek screen par teen cards — kal ki learning, aaj ka focus,
 * kal (tomorrow) ki window. Har card interpretive sanket-framing me —
 * NOT prediction (voice-law: 'will happen' / 'zaroor hoga' banned).
 * Reuses Din-Mausam's mulank/day friendship bands (dost/takrar) and the
 * Dossier's bilingual 4-beat spoken voice (EN plain, HI roman-Hinglish,
 * 'aap' form). Deterministic per (mulank, yyyymmdd): seeded rotation over
 * date digits + mulank — same input, same output, no Math.random().
 */

export interface DashCard {
  id: "yesterday" | "today" | "tomorrow";
  titleHi: string;
  titleEn: string;
  bodyHi: string;
  bodyEn: string;
  actionHi: string;
  actionEn: string;
  /** 1..10 — interpretive day-grade (upar se), sirf display ke liye */
  score: number;
  /** mulank-vs-day band ka naam (dost / takrar / mul) */
  bandHi: string;
  bandEn: string;
}

export interface Dashboard3Result {
  yyyymmdd: number;
  mulank: number;
  /** seeded rotation index — basis-block ke liye (dikhata hai kyun ye card aaya) */
  seed: number;
  cards: [DashCard, DashCard, DashCard];
}

/** Mulank/day friendship map — SAME bands as lib/day-weather.ts (no drift). */
const FRIEND: Record<number, number[]> = {
  1: [1, 2, 4, 5, 9], // Surya: Chandra, Rahu(4), Budh(5), Mangal(9)
  2: [1, 2, 3, 9], // Chandra: Surya, Guru(3), Mangal
  3: [1, 2, 3, 5], // Guru: Surya, Chandra, Budh-neutral
  4: [1, 4, 5, 6, 7], // Rahu: Surya, Budh, Shukra, Shani
  5: [1, 3, 5, 6], // Budh: Surya, Guru, Shukra
  6: [4, 5, 6, 7], // Shukra: Rahu, Budh, Shani
  7: [4, 6, 7, 1], // Shani: Rahu, Shukra, Surya-loose
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
  while (x > 9 && ![11, 22, 33, 29, 12, 13, 14, 16, 19].includes(x)) {
    x = String(x).split("").reduce((a, b) => a + Number(b), 0);
  }
  if (x > 9) x = String(x).split("").reduce((a, b) => a + Number(b), 0);
  return x;
}

/** Seeded rotation index from date digits + mulank — pure, deterministic. */
export function dashSeed(mulank: number, yyyymmdd: number): number {
  const digits = String(yyyymmdd).split("").map(Number);
  const sum = digits.reduce((a, b) => a + b, 0);
  return (sum + mulank * 3) % 9;
}

const WEEKDAY_SWAMI_HI = ["Ravi", "Chandra", "Mangal", "Budh", "Guru", "Shukra", "Shani"];

export function computeDashboard3(mulankIn: number, date: Date): Dashboard3Result {
  const mulank = ((Math.trunc(mulankIn) - 1) % 9 + 9) % 9 + 1; // clamp 1..9
  const yyyymmdd =
    date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();

  const seed = dashSeed(mulank, yyyymmdd);
  const prev = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  const dayNum = (d: Date) => ds(d.getFullYear() + ds(d.getMonth() + 1) + ds(d.getDate()));
  const bandOf = (d: Date) => {
    const dn = dayNum(d);
    if (dn === mulank) return "mul" as const;
    return FRIEND[mulank].includes(dn) ? ("dost" as const) : ("takrar" as const);
  };
  const bandLabel = (b: "dost" | "takrar" | "mul") =>
    b === "dost"
      ? { en: "dost-day — support flows", hi: "dost-din — dhaara saath chalti hai" }
      : b === "takrar"
        ? { en: "friction window — slow and double-check", hi: "takrar-window — dheema chalo, do baar jaancho" }
        : { en: "your own number — full ownership day", hi: "aapka hi ank — poora ownership ka din" };

  const bandY = bandOf(prev);
  const bandT = bandOf(date);
  const bandN = bandOf(next);

  const swamiN = WEEKDAY_SWAMI_HI[next.getDay()];

  // ---------------- Card 1: YESTERDAY-REFLECTION (ek learning) ----------------
  const c1: DashCard = {
    id: "yesterday",
    titleEn: "Yesterday — Reflection",
    titleHi: "Bita kal — vichar",
    score: (() => {
      const s = (bandY === "dost" ? 8 : bandY === "mul" ? 7 : 4) - (seed % 2);
      return s;
    })(),
    bandEn: bandLabel(bandY).en,
    bandHi: bandLabel(bandY).hi,
    bodyEn:
      bandY === "dost"
        ? `Yesterday ran on a friendly current for your Mulank ${mulank} — the learning it leaves you: what flowed easily yesterday also showed which door opens when you do not force it. Look back once — where did support arrive without a push? That same door dikh sakta hai again when you stop over-driving.`
        : bandY === "mul"
          ? `Yesterday carried your own number's energy (Mulank ${mulank}) — the learning it leaves you: the pace you kept yesterday is your natural engine, and the places where you over-extended show where ownership quietly becomes overload. Look back once — which task deserved less of you? Wahi seekh aaj ka kaam banti hai.`
          : `Yesterday ran on a friction current for Mulank ${mulank} — the learning it leaves you: the resistance you felt was the day's weather, not a verdict on you. Look back at one moment where pushing harder made it worse; us jagah par aaj halka hath rakhna hi kaam aayega.`,
    bodyHi:
      bandY === "dost"
        ? `bita kal aapke Mulank ${mulank} ke liye dost-dhaara par tha — wo seekh chhod gaya: jo aasan beh gaya, usme dikha ki jab aap zabardasti nahi karte to kaunsa darwaza khulta hai. ek baar peechhe dekho — kahan madar bina aayi? wahi darwaza dobara dikh sakta hai jab over-drive rok do.`
        : bandY === "mul"
          ? `bita kal aapke apne ank ${mulank} ki dhaara lekar aaya — wo seekh chhod gaya: jo raftaar aapne kal rakhi, wahi aapka natural engine hai; aur jahan aap zyada phel gaye, wahi hai jahan ownership chupchaap overload banta hai. ek baar dekho — kaunsa kaam aapse kam maangta tha? wahi seekh aaj ka kaam ban jaati hai.`
          : `bita kal Mulank ${mulank} ke liye takrar-dhaara par tha — jo resistance aapne mehsoos kiya wo mausam tha, aapke barein ka faisla nahi. ek pal dekho jahan zyada zor lagane se kaam bigda; us jagah par aaj halka hath rakhna hi kaam aayega.`,
    actionEn: "Write one line: what flowed yesterday, and will you reuse that door today?",
    actionHi: "Ek line likho: kal kya beh gaya, aur kya aaj usi darwaze se kaam nikaloge?",
  };

  // ---------------- Card 2: TODAY-FOCUS (aaj ka sanket + micro-action) -----
  const focusByMulank: Record<number, { en: string; hi: string; actionEn: string; actionHi: string }> = {
    1: {
      en: "Today's sanket for Mulank 1: your first-move instinct is the strongest current — lead the opening line, the first call, the first draft; but the sanket dikhata hai that the day also tests listening. Speak first, then hold one full minute of silence for someone else's word.",
      hi: "aaj Mulank 1 ka sanket: aapka pehla-badam wala junoon sabse tej dhaara hai — pehli line, pehla call, pehla draft aap chaliye; par sanket yeh bhi dikhata hai ki din sunein bhi parakhta hai. pehle bolo, phir kisi aur ke shabd ke liye ek poora minute ruko.",
      actionEn: "One micro-action: open the conversation you postponed.",
      actionHi: "Ek micro-action: wahi baat-cheet shuru karo jo aap taal rahe the.",
    },
    2: {
      en: "Today's sanket for Mulank 2: your reading-the-room sense is the day's sharpest tool — trust the first impression you catch before words; the sanket dikhata hai that patience pays where others rush. Hold steady in one discussion instead of yielding just to keep peace.",
      hi: "aaj Mulank 2 ka sanket: aapka kamre-ka-mausam padhna aaj ki sabse tez aankh hai — shabdon se pehle jo pehla ehsaas aaye, use maano; sanket yeh bhi dikhata hai ki jahan doosre jaldi karte hain, wahan sabr phal deta hai. ek baat-cheet mein sirf talmash se nahi, apna paksh bhi rakho.",
      actionEn: "One micro-action: say one honest 'no' you have been sitting on.",
      actionHi: "Ek micro-action: wo ek saachhi 'nahi' kaho jise aap roz taalte ho.",
    },
    3: {
      en: "Today's sanket for Mulank 3: your words carry blessing-energy — one explanation you give can unstick someone; the sanket dikhata hai that the trap is over-promising. Teach or say yes to one thing only after checking your week's arithmetic.",
      hi: "aaj Mulank 3 ka sanket: aapke shabdon mein aashirwad ki taakat hai — ek samjhana kisi ka atka kaam khol sakta hai; par sanket yeh bhi dikhata hai ki jaal dil se zyada waada karna hai. ek hi cheez par haan karo — pehle apne hafte ka hisaab dekho.",
      actionEn: "One micro-action: finish one promise you owe from this week.",
      actionHi: "Ek micro-action: is hafte ka ek udhaar waada poora karo.",
    },
    4: {
      en: "Today's sanket for Mulank 4: your process instinct wins today — systems, receipts, follow-through; the sanket dikhata hai that rigidity is today's tax: one new method reads like a threat but is a door. Verify one routine and repair, do not rebuild.",
      hi: "aaj Mulank 4 ka sanket: aapka system-ka-dimaag aaj jeetata hai — tarteeb, rasid, nibhaav; par sanket yeh bhi dikhata hai ki akhadt aaj ka tax hai: ek naya tareeqa dhamki jaisa lagta hai par darwaza hai. ek routine jaancho aur theek karo — dobara na banao.",
      actionEn: "One micro-action: fix one small broken routine instead of skipping it.",
      actionHi: "Ek micro-action: ek tooti chhoti routine ko skip karne ki jagah theek karo.",
    },
    5: {
      en: "Today's sanket for Mulank 5: your trade-instinct and quick words open doors — documents, proposals, conversations move fast; the sanket dikhata hai that speed without re-reading is today's leak. Send, but re-read once before it leaves your hand.",
      hi: "aaj Mulank 5 ka sanket: aapki vyapaar-chaal aur tez zubaan darwaze kholati hai — kagaz, prastaav, baat-cheet Tez chalti hai; par sanket yeh bhi dikhata hai ki bina dohrae speed aaj ka leak hai. bhejo — par bhejne se pehle ek baar zaroor dohrao.",
      actionEn: "One micro-action: re-read one message before sending it.",
      actionHi: "Ek micro-action: koi ek message bhejne se pehle ek baar dohrao.",
    },
    6: {
      en: "Today's sanket for Mulank 6: your care-discipline holds the house together — beauty, duty, birthdays; the sanket dikhata hai that the quietest bill is the load you never file. Carry for others, but put your own feeling on today's calendar too.",
      hi: "aaj Mulank 6 ka sanket: aapka dekhbhal ka anushasan poore ghar ko dharan karta hai — sundarta, zimmedari, yaadein; par sanket yeh bhi dikhata hai ki sabse chupchaap bill wahi bojh hai jo aapne kabhi likha nahi. doosron ke liye uthao — par apna ehsaas bhi aaj ki diary mein likho.",
      actionEn: "One micro-action: put one hour of 'yours only' on today's list.",
      actionHi: "Ek micro-action: aaj ki list par ek ghanta likho jo sirf aapka ho.",
    },
    7: {
      en: "Today's sanket for Mulank 7: your inner-research current runs deep — study, quiet, one truth at a time; the sanket dikhata hai that speaking too little reads as distance today. Dive in, then say one finding out loud to a real person.",
      hi: "aaj Mulank 7 ka sanket: aapki andar-ki-khoj ki dhaara gehri hai — padhai, shanti, ek sach ek baar; par sanket yeh bhi dikhata hai ki kam bolna aaj doori banta hai. andar utro — phir apna ek nateeja kisi jeetey-hue insaan ko bol kar dikhao.",
      actionEn: "One micro-action: share one insight you kept private.",
      actionHi: "Ek micro-action: apna ek such-dhundha vichaar kisi se kaho.",
    },
    8: {
      en: "Today's sanket for Mulank 8: your long-judge patience gives you authority in money and structure — weigh, then move; the sanket dikhata hai that control reads cold today. Hold the line on one decision, but name the reason to the person it affects.",
      hi: "aaj Mulank 8 ka sanket: aapka lambe-nyayi sabr paisa aur dhaanche mein aapko adhikaar deta hai — tolo, phir chalo; par sanket yeh bhi dikhata hai ki kabza aaj thanda padhta hai. ek faisle par dhaara pakdo — par uski wajah us insaan ko batao jis par asar padega.",
      actionEn: "One micro-action: explain the 'why' behind one firm decision today.",
      actionHi: "Ek micro-action: aaj ke ek pakke faisle ki wajah usse batao jis par asar pada.",
    },
    9: {
      en: "Today's sanket for Mulank 9: your closing-cycles instinct is awake — ends feel right today where others cling; the sanket dikhata hai that the last mile tests the goodbye. Close one chapter cleanly and let one human cause receive your first hour.",
      hi: "aaj Mulank 9 ka sanket: aapki chakra-band karna ki samajh jaagi hai — jahan doosre chipkte hain, aapko ant sahi lagta hai; par sanket yeh bhi dikhata hai ki aakhri kadam vidaai me parakhta hai. ek chapter saaf-suthra band karo — aur ek insaani kaam ko apna pehla ghanta do.",
      actionEn: "One micro-action: formally close one open loop (message, tab, task).",
      actionHi: "Ek micro-action: ek khula loop band karo (message, tab, ya kaam).",
    },
  };

  const f = focusByMulank[mulank];
  const c2: DashCard = {
    id: "today",
    titleEn: "Today — Focus",
    titleHi: "Aaj — focus",
    score: bandT === "dost" ? 9 - (seed % 2) : bandT === "mul" ? 8 : 5 + (seed % 2),
    bandEn: bandLabel(bandT).en,
    bandHi: bandLabel(bandT).hi,
    bodyEn: `${f.en} Today runs on a ${bandLabel(bandT).en.split(" —")[0]} current against your Mulank — set your pace to that, not to the calendar.`,
    bodyHi: `${f.hi} aaj ki dhaara mulank-${mulank} ke saath ${bandT === "dost" ? "dost" : bandT === "mul" ? "ek-rang" : "takrar"} mein hai — apni raftaar aaj ki dhaara par se rakho, calendar par se nahi.`,
    actionEn: f.actionEn,
    actionHi: f.actionHi,
  };

  // ---------------- Card 3: TOMORROW-WINDOW (interpretive, NO prediction) ---
  const c3: DashCard = {
    id: "tomorrow",
    titleEn: "Tomorrow — Window",
    titleHi: "Kal — jhaanki",
    score: bandN === "dost" ? 8 : bandN === "mul" ? 7 : 4 + ((seed + 5) % 2),
    bandEn: bandLabel(bandN).en,
    bandHi: bandLabel(bandN).hi,
    bodyEn: `Tomorrow's sky shows a ${bandLabel(bandN).en.split(" —")[0]} current for Mulank ${mulank}, with ${swamiN} as the day's swami — this is a sanket-window, not a prediction: keep ${bandN === "takrar" ? "documents double-checked and tempers on a leash" : bandN === "dost" ? "the momentum going — openings dikh sakte hain if you arrive prepared" : "the ownership light — do what is yours, delegate what is not"}. Kal ka mausam yahan dikh sakta hai — ghatna ka ailaan nahi hota.`,
    bodyHi: `kal ke aasman mein Mulank ${mulank} ke liye ${bandLabel(bandN).hi.split(" —")[0]} dhaara dikh rahi hai, din ka swami ${swamiN} — yeh ek sanket-jhaanki hai, bhavishya-vani nahi: ${bandN === "takrar" ? "kagaz do baar jaancho aur gusse ki laagam haath mein rakho" : bandN === "dost" ? "raftaar banaye rakho — taiyar aaye to mauke dikh sakte hain" : "apna kaam apne haath rakho, jo aapka nahi wo baanto"}. kal ka mausam yahan dikh sakta hai — ghatna ka ailaan nahi.`,
    actionEn: "One window-keeping step: decide tonight what tomorrow's one priority is.",
    actionHi: "Ek jhaanki-kadam: raat ko hi tay karo ke kal ki ek priority kya hai.",
  };

  return { yyyymmdd, mulank, seed, cards: [c1, c2, c3] };
}