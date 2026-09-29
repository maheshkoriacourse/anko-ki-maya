/**
 * v5.3 AKASHIC DOSSIER — FINAL CHAPTER: THE LIFE PLAYBOOK (action closer).
 * Deterministic per mulank: 4 life-areas, concrete do-this-week moves + why.
 * Voice: gentle-challenging, interpret-only. mulank-2 fully authored; 1,3-9
 * carry the generic moves until copy-agent expansion.
 */

export interface PlayMoveArea {
  areaEn: string; areaHi: string;
  moves: { moveEn: string; moveHi: string; whyEn: string; whyHi: string }[];
}

const MOVES_BY_MULANK: Partial<Record<number, PlayMoveArea[]>> = {
  2: [
    {
      areaEn: "Work & authority", areaHi: "kaam aur adhikar",
      moves: [
        { moveEn: "Once a week, put one opinion FIRST in a meeting — do not wait to be asked.", moveHi: "hafte mein ek baar, kisi baithak mein pehli raay aapki ho — bulaye jaane ka intezaar nahi.", whyEn: "Your reading is elite; your silence taxes it.", whyHi: "aapki samajh uchaar-rangi hai — aur aapki khaamoshi uska ghata hai." },
        { moveEn: "Keep a 'slow-call' list: decisions taken under pressure — review them on Sunday.", moveHi: "ek 'dheere-faisla' ghata banao: dabav ke faisle — unhe ravivar mein dekho.", whyEn: "Twice-processing is your muscle; give it a gym.", whyHi: "do-baar-sochna aapki maanspeshi hai — isko akhaada do." },
        { moveEn: "Own one visible deliverable per month with your name on it.", moveHi: "mahine mein ek naam-likha kaam aapke naam pe.", whyEn: "Quiet excellence starves without a signature.", whyHi: "sanjhi utkrishta bina naam ke bhuki rehti hai." },
      ],
    },
    {
      areaEn: "Love & family", areaHi: "pyaar aur parivaar",
      moves: [
        { moveEn: "Say the appreciation out loud — the people you carry assume it less than you think.", moveHi: "shukriya bol ke batao — jinhe aap dhaarte ho, wo sochte se kam samajhte hain.", whyEn: "Feelings unspoken read as absence.", whyHi: "bin-kahi mehsoos, judaai banti hai." },
        { moveEn: "Guard one family hour daily — no ledger, no phone in that hour.", moveHi: "roz ghar ke ek ghante ka gher — usme hisaab nahi, phone nahi.", whyEn: "Your presence is the inheritance they remember.", whyHi: "aapki maujoodgi hi unki yaad ki virasat hai." },
        { moveEn: "Ask one person who knows you: 'where have I gone quiet?'", moveHi: "kisi apne se poochho: 'main kahan chup ho gaya hoon?'", whyEn: "Suppression hides best from its owner.", whyHi: "dabaaya hua khud, sabse pehle khud se chhupta hai." },
      ],
    },
    {
      areaEn: "Money", areaHi: "paisa",
      moves: [
        { moveEn: "Split every inflow on arrival: needs / family / future — in writing.", moveHi: "har aavak teen hisse likhit mein: zarurat / ghar / aane-wala-kal.", whyEn: "Keeper-money grows by structure, not luck.", whyHi: "hifazati paisa bhaishi se badhta hai, bhaag se nahi." },
        { moveEn: "Set a self-spending ceiling you can cross without guilt.", moveHi: "apne liye ek kharch-ched jo paar karne pe pachtawa na de.", whyEn: "Over-harshness on self is a slow leak too.", whyHi: "khud par sakhtee bhi dheemi dhara hai." },
        { moveEn: "Park 10% in the most boring instrument you own.", moveHi: "das pratishat sabse bhoori-dhaire mein laga do.", whyEn: "Boring is your compounding engine.", whyHi: "bhoori-cheez hi aapki byaaj-dhun hai." },
      ],
    },
    {
      areaEn: "Mind & spirit", areaHi: "mann aur aatma",
      moves: [
        { moveEn: "One diya, one breath, every evening — five minutes, non-negotiable.", moveHi: "ek diya, ek saans, har shaam — paanch minute, jhagda nahi.", whyEn: "Anchors hold the river's banks.", whyHi: "panghurat hi nadi ke kinare hain." },
        { moveEn: "Walk 20 minutes before the day's first decision.", moveHi: "din ke pehle faisal se pehle bees minute paidal.", whyEn: "Movement steadies the twice-thinking mind.", whyHi: "chalna hi do-baar-sochne ke mann ko sanjha hai." },
        { moveEn: "Water before every cup of anything else.", moveHi: "har kapi se pehle ek jal.", whyEn: "The body votes first; keep it friendly.", whyHi: "tan pehla vot daalta hai — usko dost rakho." },
      ],
    },
  ],
};

const GENERIC_MOVES: PlayMoveArea[] = [
  { areaEn: "Work", areaHi: "kaam", moves: [
    { moveEn: "Name the ONE thing this month that compounds — give it your best hour daily.", moveHi: "mahine ke us ek kaam ko naam do jo byaaj dega — roz usse sabse accha ghanta.", whyEn: "Focus compounds; attention pays the bill.", whyHi: "dhyan hi byaaj deta hai; bikharna hisaab khata hai." },
    { moveEn: "Make one postponed decision and date it.", moveHi: "ek tala hua faisla chuno aur taarikh do.", whyEn: "Postponement pays interest too.", whyHi: "talne pe bhi byaaj baithta hai." },
  ]},
  { areaEn: "Relationships", areaHi: "rishte", moves: [
    { moveEn: "One call to someone you keep meaning to call — this week.", moveHi: "jis-se sochte rahe bulane ka — is hafte bulao.", whyEn: "Connections die of delay, not distance.", whyHi: "rishtey faasle se nahi, taal-taal se murjhaate hain." },
    { moveEn: "Send one written thank-you every week.", moveHi: "hafte mein ek likha shukriya.", whyEn: "Gratitude builds the net you'll need later.", whyHi: "shukriya wo jaal bunta hai jo kal kaam aayegi." },
  ]},
  { areaEn: "Money", areaHi: "paisa", moves: [
    { moveEn: "Track every rupee for 30 days — pattern first, plan second.", moveHi: "tees din har rupaye ka hisaab — pehle naksha, phir yojana.", whyEn: "You cannot steer a river you've never seen flow.", whyHi: "bina behti dekhe nadi ko raasta kaun deta hai." },
    { moveEn: "Automate one saving on payday morning.", moveHi: "tankhah-wali subah ek bachat aap-baakhir laga do.", whyEn: "Wills fail; standing orders don't.", whyHi: "irade kachhe hote hain; aadesh ki taarikh nahi." },
  ]},
  { areaEn: "Mind & spirit", areaHi: "mann aur aatma", moves: [
    { moveEn: "Evening diya + five quiet breaths.", moveHi: "shaam ka diya aur paanch shaant saans.", whyEn: "The anchor holds when the wave tests it.", whyHi: "lahar imtihaan le, tab hi panghurat kaam aate hain." },
    { moveEn: "A fixed bedtime hour — rested sleep is inheritance of better thinking.", moveHi: "som-laya se sone ki taarikh-baddhi — acche vichar shaant neend ki virasat hain.", whyEn: "Tired minds bet on yesterday.", whyHi: "thake mann kal pe daav lagaate hain." },
  ]},
];

export function playbookOf(mulank: number, bhagyank: number): PlayMoveArea[] {
  void bhagyank;
  return MOVES_BY_MULANK[mulank] || GENERIC_MOVES;
}

/** banned-copy + completeness validator */
export function validatePlaybook(): void {
  const banned = ["will happen", "may suggest", "theme to reflect"];
  for (const [m, list] of Object.entries(MOVES_BY_MULANK)) {
    for (const pm of list as PlayMoveArea[]) {
      for (const mv of pm.moves) {
        const lo = `${mv.moveEn} ${mv.whyEn}`.toLowerCase();
        for (const b of banned) if (lo.includes(b)) throw new Error(`banned copy in mulank-${m} playbook`);
        if (mv.moveHi.length < 20) throw new Error(`thin HI move in mulank-${m}`);
      }
    }
  }
  if (GENERIC_MOVES.length < 3) throw new Error("generic playbook too thin");
}