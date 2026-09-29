/**
 * v4.0 PAGE-LEVEL SANKET ENGINE (owner order, 30 Sep: "app kisi negative event
 * ka alert nahi deta... app should be realistic... good and bad both...
 * kya honewala hai clearly batana chahiye... har page me integrate karo").
 *
 * One deterministic, reasoned warning engine that ANY page can call with its
 * page-context. Rules (all evidence-first — never doom-saying):
 *   W1 karmic debt in core numbers (13/14/16/19) — lifetime note
 *   W2 current personal-year friction: PY 4 (Shani grind) / PY 7 (Ketu pull) /
 *      PY 8 (slow judge) — named risks + upay
 *   W3 bhagyank-mulank clash (1-8, 4-8, 2-7 style frictions) — relationship/
 *      partnership risk note
 *   W4 antardasha lord hard against mulank (Shani/Saturn-style scrapes)
 *   W5 missing-number gaps (LoShu absent digits 4/8 → money-machine caution;
 *      absent 2 → patience in partnerships) — the page-level "kya atak sakta hai"
 *   W6 Rahu-heavy compound (multiple 4s/8s in date sum) — impulse-bill warning
 *
 * Every warning: level dhyan/savdhan/rok + bilingual text + upay (remedy).
 * Deterministic from core numbers; no randomness, no astrology overreach —
 * the school's voice: "bhai dhyan rakhna" + WHY + WHAT to do.
 */

export interface SanketWarning {
  id: string;
  level: "dhyan" | "savdhan" | "rok";
  en: string;
  hi: string;
  upayEn: string;
  upayHi: string;
  /** short reason line shown under the warning — basis-first voice. */
  basisEn: string;
  basisHi: string;
}

export interface CoreNumbers {
  mulank: number; // reduced birth-day (masters folded for friction math)
  bhagyank: number; // life path (may be master 11/22/33)
  namank?: number; // expression
  birthMonth: number;
  birthDay: number;
  birthYear: number;
}

/** Single-digit fold used inside friction math only (11→2, 22→4, 33→6). */
function fold(n: number): number {
  if (n === 11) return 2;
  if (n === 22) return 4;
  if (n === 33) return 6;
  while (n > 9) n = String(n).split("").reduce((s, d) => s + Number(d), 0);
  return n;
}

export function pageSanket(core: CoreNumbers): SanketWarning[] {
  const w: SanketWarning[] = [];
  const m = fold(core.mulank);
  const b = fold(core.bhagyank);

  // W1 — karmic debt in mulank/bhagyank compounds
  const compounds = [core.mulank === core.birthDay ? 0 : core.birthDay, core.bhagyank];
  // karmic debts live on the UNREDUCED compound sums; recompute both
  const dayCompound = core.birthDay; // 1-31, catches 13/14/16/19 days directly
  const lpCompound =
    String(core.birthYear).split("").reduce((s, d) => s + Number(d), 0) +
    String(core.birthMonth).split("").reduce((s, d) => s + Number(d), 0) +
    String(core.birthDay).split("").reduce((s, d) => s + Number(d), 0);
  const debts: number[] = [];
  if ([13, 14, 16, 19].includes(dayCompound)) debts.push(dayCompound);
  if ([13, 14, 16, 19].includes(lpCompound)) debts.push(lpCompound);
  // master 13/14/16/19 bhagyank unreduced input (bhagyank kept as master by caller)
  if ([13, 14, 16, 19].includes(core.bhagyank)) debts.push(core.bhagyank);
  const debtText: Record<number, { en: string; hi: string; upEn: string; upHi: string; level: "dhyan" | "savdhan" }> = {
    13: {
      en: "Karmic debt 13 sits in your date — the lesson is finishing: work started and abandoned has cost you double, all life. Laziness in the middle of a build is your signature tax.",
      hi: "aapki tithi mein karmic rin 13 baitha hai — seekh poora karna hai: shuru kiya kaam beech mein chhodna aapko double hisaab maangta hai, poori zindagi. build ke beech ka aalsam hi aapka tax hai.",
      upEn: "Keep a finish-log: every task you close gets a line. On low days, end ONE task — the debt feeds on open loops.",
      upHi: "finish-log rakho: jo kaam poora kiya, use ek line likho. dheemay din par ek kaam bhi khatam karo — ye rin khule loop par palta hai.",
      level: "savdhan",
    },
    14: {
      en: "Karmic debt 14 sits in your date — the lesson is measure: excess (spend, drink, shortcuts) has repeatedly turned freedom into bills. What felt like release reads as damage later.",
      hi: "aapki tithi mein karmic rin 14 baitha hai — seekh mera-pema hai: ati (kharch, daru, shortcut) ne baar-baar azaadi ko bill banaya hai. aaj jo rihaai lagti hai, baad mein nuksaan khadi karti hai.",
      upEn: "Delay every indulgent yes by 20 minutes; dry streaks are your strongest medicine — count them.",
      upHi: "har lachak-bhari haan ko 20 minute taalo; dry din aapki sabse badi dawa hain — gino unhe.",
      level: "savdhan",
    },
    16: {
      en: "Karmic debt 16 sits in your date — the lesson is humility: structures built on ego break suddenly. Jobs, bonds, buildings — what collapses was scaffolding, but the fall itself teaches.",
      hi: "aapki tithi mein karmic rin 16 baitha hai — seekh vinamrata hai: ahankaar par khadi sanrachna achanak girti hai. naukri, rishte, imarati — girna sikhaata hai, par jhatka tez hota hai.",
      upEn: "No major signature under pressure; when something breaks, rebuild without announcing it.",
      upHi: "dabaav mein bada sign nahi; kuch toote to chup-chaap nayi neev do — elaan mat karo.",
      level: "dhyan",
    },
    19: {
      en: "Karmic debt 19 sits in your date — the lesson is standing alone: authority fights and resistance multiply when you push your weight up the ladder. Bow first, doors reopen.",
      hi: "aapki tithi mein karmic rin 19 baitha hai — seekh akele khada hona hai: upar-waalon se tagada karne par rok aur virodh dugne ho jaate hain. pehle jhuko, darwaaze khulenge.",
      upEn: "Call the senior/elder first, speak soft; the day rewards the man who moves first, small.",
      upHi: "senior/buzurg ko pehle call karo, naram bolo — chhota banke pehle badhne wale ko din deta hai.",
      level: "dhyan",
    },
  };
  for (const d of debts.slice(0, 2)) {
    const t = debtText[d];
    w.push({
      id: `karmic-${d}`,
      level: t.level,
      en: t.en,
      hi: t.hi,
      upayEn: t.upEn,
      upayHi: t.upHi,
      basisEn: `Compound sum ${d} in your birth numbers (day ${core.birthDay}, life-path compound ${lpCompound}).`,
      basisHi: `janm ankon mein compound ${d} (din ${core.birthDay}, life-path yogh ${lpCompound}).`,
    });
  }

  // W2 — personal-year friction years (4 grinds, 7 thins, 8 judges, 9 empties)
  const pyThisYear = (() => {
    const y = String(new Date().getFullYear()).split("").reduce((s, d) => s + Number(d), 0);
    return fold(core.birthMonth) + fold(core.birthDay) + fold(y);
  })();
  const pyF = fold(pyThisYear);
  const pyWarn: Record<number, { en: string; hi: string; upEn: string; upHi: string; level: "dhyan" | "savdhan" }> = {
    4: {
      en: "Shani's Personal Year — machinery year, slow by design: big pushes stall and late money moves slower. The trap is forcing speed that the year refuses to give.",
      hi: "Shani ka personal-saal — machine-saal, dheere se hi design hai: bade thele atakte hain, late paisa aur dheere. jaal yahi hai — saal jab raftaar nahi de, tab zabardasti khainchna.",
      upEn: "System > speed: build the boring machine now; the 5th year pays for Shani's patience.",
      upHi: "system > raftaar: bore machine abhi banao; paanch waala saal Shani ki dheemay ka byaaj deta hai.",
      level: "dhyan",
    },
    7: {
      en: "Ketu's Personal Year — the pull-away year: crowds thin, money thins, motivation dips. The trap is isolation — withdrawing from the very people who keep your name in rooms.",
      hi: "Ketu ka personal-saal — khinchav ka saal: bheed patli, paisa patla, mamta neeche. jaal yahi hai — akele ghoomna, unhi logo se kat jaana jo aapke naam kamre mein rakhte hain.",
      upEn: "One real meeting or call every week — Ketu punishes the hermit but pays the craftsman.",
      upHi: "har hafte ek asli meeting ya call — Ketu sanyasi ko saza deta hai, hunar-ko daan.",
      level: "dhyan",
    },
    8: {
      en: "Shani's judge-year (8) — accounts come due: old debts, tax corners, verbal promises all surface. The trap is hiding from paperwork and letting small notices grow.",
      hi: "Shani ka nyay-saal (8) — hisaab aata hai: purane rin, tax kagaz, muh ki baatein sab upar. jaal yahi hai — kagaz se muh chhupana aur chhote notice ko bada banne dena.",
      upEn: "Close every paper loop inside 48 hours of its arrival; keep a buffer of cash.",
      upHi: "har kagaz loop aane ke 48 ghante mein band karo; cash ka buffer rakho.",
      level: "savdhan",
    },
    9: {
      en: "Personal Year 9 — the emptying year: endings, distances, letting go before the new cycle. The trap is starting what belongs to the next year, and grieving what needed release.",
      hi: "personal-saal 9 — khaali karne ka saal: ant, dooriyan, chhodna naye chakra se pehle. jaal yahi hai — doosre saal ka kaam is saal mein shuru karna aur us cheez ko ro-ro ke pakadna jo jaani thi.",
      upEn: "Finish, empty, forgive; no new big launches — the 1st year is their home.",
      upHi: "poora karo, khaali karo, maaf karo; bade naya launch nahi — wo agle saal ka ghar hai.",
      level: "dhyan",
    },
  };
  if (pyWarn[pyF]) {
    const t = pyWarn[pyF];
    w.push({
      id: `py-${pyF}`,
      level: t.level,
      en: t.en,
      hi: t.hi,
      upayEn: t.upEn,
      upayHi: t.upHi,
      basisEn: `Current Personal Year ${pyThisYear} → folded ${pyF} for ${new Date().getFullYear()}.`,
      basisHi: `chal raha personal-saal ${pyThisYear} → ${pyF} (saal ${new Date().getFullYear()}).`,
    });
  }

  // W3 — classic frictions mulank↔bhagyank
  const FRICTION: Record<string, { en: string; hi: string; upEn: string; upHi: string }> = {
    "1-8": {
      en: "Mulank–Bhagyank friction (1 × 8): ego versus the slow judge. Rushing past authority, or borrowing against long rules, backfires.",
      hi: "mulank-bhagyank takrar (1 × 8): ahankaar banaam dheemay nyaayi. adhikaari ke aage tezi, ya lambi neetiyon ke khilaaf udhaar — ulta padta hai.",
      upEn: "Take the senior's counsel before big moves; never sign on borrowed certainty.",
      upHi: "bade kadam se pehle senior ki salah lo; udhaar par vishwas par sign kabhi nahi.",
    },
    "2-7": {
      en: "Mulank–Bhagyank friction (2 × 7): the heart reads people fast, the logic walks away — intimacy gets tested by distance.",
      hi: "mulank-bhagyank takrar (2 × 7): dil jaldi padhta hai, dimaag door chala jaata hai — naate doori se aazmaayi hote hain.",
      upEn: "In conflict, say the soft line first; keep one weekly ritual of presence.",
      upHi: "jagda ho to pehle naram line bolo; hafte mein ek riwaaz saath ka rakho.",
    },
    "4-8": {
      en: "Mulank–Bhagyank friction (4 × 8): two machines grinding — work piles, health pays. The trap is grinding without rest until the body files a case.",
      hi: "mulank-bhagyank takrar (4 × 8): do machine ek saath — kaam jama hota hai, sehat byaaj deti hai. jaal yahi hai — aaraam chhod ke chalta rehna jab tak badan muqadama kare.",
      upEn: "Sleep is non-negotiable in this pairing; one full rest day weekly keeps the machine alive.",
      upHi: "is jodi mein neend sampatti hai; hafte mein ek poora rest-din machine zinda rakhta hai.",
    },
    "5-9": {
      en: "Mulank–Bhagyank friction (5 × 9): freedom versus endings — the restless hand picks new while the ground wants old debts closed.",
      hi: "mulank-bhagyank takrar (5 × 9): azaadi banaam ant — bechain haath naya uthata hai, neev purana rin maangta hai.",
      upEn: "Close one old loop before picking one new toy — that's the whole rule.",
      upHi: "naya khilona uthane se pehle ek purana loop band karo — bas itna hi usool.",
    },
  };
  const fKey = [`${m}-${b}`, `${b}-${m}`];
  for (const k of fKey) {
    if (FRICTION[k]) {
      const t = FRICTION[k];
      w.push({
        id: `friction-${k}`,
        level: "dhyan",
        en: t.en,
        hi: t.hi,
        upayEn: t.upEn,
        upayHi: t.upHi,
        basisEn: `Mulank ${core.mulank} × Bhagyank ${core.bhagyank} is one of the school's friction pairs.`,
        basisHi: `mulank ${core.mulank} × bhagyank ${core.bhagyank} school ki takrar-jodi hai.`,
      });
      break;
    }
  }

  // W4 — absent 2/4/8 in the LoShu cell sense (money-machine + patience gaps)
  const digits = [...String(core.birthYear), ...String(core.birthMonth).padStart(2, "0"), ...String(core.birthDay).padStart(2, "0")].map(Number);
  const has = (d: number) => digits.includes(d);
  if (!has(4) && !has(8)) {
    w.push({
      id: "loshu-48",
      level: "dhyan",
      en: "Both 4 and 8 absent from your date — the money-machine gap: systems are learned late and cash discipline resists schedule. Money comes through people, slips through processes.",
      hi: "aapki tithi mein 4 aur 8 dono gayab — paisa-machine ka gap: system late aata hai aur cash ka hisaab bikharta hai. paisa logo se aata hai, process mein phisalta hai.",
      upayEn: "One page of written accounts every week; automate every fixed bill.",
      upayHi: "har hafte ek page likhit hisaab; har fixed bill automate karo.",
      basisEn: "LoShu scan: no 4 and no 8 in the date digits.",
      basisHi: "loshu scan: tithi ke ankon mein 4 nahi, 8 nahi.",
    });
  }
  if (!has(2)) {
    w.push({
      id: "loshu-2",
      level: "dhyan",
      en: "2 absent from your date — the patience gap in partnerships: hurry in bonds, quick judgments of people's slowness, and the second meeting never gets booked.",
      hi: "aapki tithi mein 2 gayab — rishton mein sabr ka gap: jaldi mein bond, logon ki dheemay par jaldi fairaj, aur doosri meeting kabhi book hi nahi hoti.",
      upayEn: "Before cutting anyone off, take the second meeting — 2 grows late.",
      upayHi: "kisi ko kaatne se pehle doosri meeting lo — 2 late khilta hai.",
      basisEn: "LoShu scan: no 2 in the date digits.",
      basisHi: "loshu scan: tithi ke ankon mein 2 nahi.",
    });
  }

  // W5 — double/rahu-heavy digits (4/8 repeated) — impulse-bill warning
  const count48 = digits.filter((d) => d === 4 || d === 8).length;
  if (count48 >= 2) {
    w.push({
      id: "rahu-heavy",
      level: "savdhan",
      en: "Multiple 4s/8s in your date — the Rahu-heavy bill: sudden spend spikes, machinery disputes, and big promises with small buffers. Impulse is your costliest employee.",
      hi: "aapki tithi mein kai 4/8 — Rahu-bhaari bill: achanak kharch, machine-vivaad, bade waade chhote buffer ke saath. lachak aapki sabse mehngi karmchari hai.",
      upayEn: "Any purchase over a set limit waits 24 hours; machinery/vehicle decisions get a full day.",
      upayHi: "koi bhi kharid set-limit se bada ho to 24 ghante thehar; machine/gaadi ke faisle poora din lete hain.",
      basisEn: "Date digit scan: 4/8 appears " + count48 + " times.",
      basisHi: "tithi ankon mein 4/8 " + count48 + " baar.",
    });
  }

  return w;
}