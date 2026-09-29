/**
 * v5.3 AKASHIC DOSSIER — CHAPTER: PEOPLE WHO SHAPED YOU (silhouettes+threads)
 * and WEALTH CODE (treasury door + radial temple wheel) and CAREER DNA
 * (sacred mountain) — three spec sections in one file for the turbo build.
 */

export interface PersonKind {
  id: string;
  nameEn: string;
  nameHi: string;
  patternEn: string;
  patternHi: string;
}

const PEOPLE: PersonKind[] = [
  { id: "teachers", nameEn: "Teachers", nameHi: "guru-log", patternEn: "People who arrived holding lessons you didn't ask for — they pushed you when nobody else would, and left the moment you outgrew them.", patternHi: "aise log aaye jinhe sikhane ka kaam mila — jab aap thak gaye, ye aap ko aage badhaya; aur aap bhaar gaye to bina alvida chale gaye." },
  { id: "protectors", nameEn: "Protectors", nameHi: "pehredaar", patternEn: "Those who stood between you and storms — often silently, sometimes without your knowing until much later.", patternHi: "jo aap aur aapki muskil ke beech khade rahe — aksar chup-chaap, kabhi kabhi aapko pata hi nahi chala." },
  { id: "competitors", nameEn: "Competitors", nameHi: "saath-ke-bhaage-wale", patternEn: "Rivals who sharpened you — every comparison they inspired built the standard you now hold yourself to.", patternHi: "jinse muqabla ne aapko tez kiya — har tulna ne andar ek kaancha-maan banaya jise aap aaj bhi pakde hain." },
  { id: "soul", nameEn: "Soul connections", nameHi: "atma-rishtey", patternEn: "Rare bonds that needed no explanation — they saw the version of you that others never bothered to meet.", patternHi: "gintee ke rishtey jahan vichaar alag hote hue bhi ek jaise baith gaye — inhone aapka wo roop dekha jo kisi ne na dekha." },
  { id: "helpers", nameEn: "Hidden helpers", nameHi: "chhupe-madadgar", patternEn: "Quiet hands that opened doors at exactly the right door-bells — often faceless, never forgotten.", patternHi: "unke sanjhi madad jo theek-sahi darwaze pe khul gaye — chehra gayab, ahsaas aaj bhi baaki." },
  { id: "changers", nameEn: "Life changers", nameHi: "mod-daane-wale", patternEn: "One conversation with them re-routed your direction — you still carry the sentence they said to you.", patternHi: "inse ek baat ne aapki disha badal di — unka wo ek vaakya aaj bhi aapke mann mein chhapaa hai." },
];

export function peopleOf(mulank: number): PersonKind[] {
  const m = ((mulank % 9) + 9) % 9 || 9;
  const rest = PEOPLE.filter((p) => PEOPLE[(m - 1) % PEOPLE.length].id !== p.id);
  const first = PEOPLE[(m - 1) % PEOPLE.length];
  return [first, ...rest].slice(0, 6);
}

/* ---------- WEALTH ---------- */
export interface WealthProfile {
  moneyPersonalityEn: string; moneyPersonalityHi: string;
  riskStyleEn: string; riskStyleHi: string;
  earningEn: string; earningHi: string;
  spendingEn: string; spendingHi: string;
  businessAptitudeEn: string; businessAptitudeHi: string;
  legacyEn: string; legacyHi: string;
}

const WEALTH_BY_MULANK: Partial<Record<number, WealthProfile>> = {
  1: { moneyPersonalityEn: "Money follows your name — you earn most when you lead, and least when you obey.", moneyPersonalityHi: "paisa aapke naam ke peeche aata hai — jab aap aage hote ho, tab sabse zyada aata hai.", riskStyleEn: "You bet big once, carefully, and hold long", riskStyleHi: "ek baar bada daav, sochkar — phir der tak pakad ke", earningEn: "through pioneering deals and first-mover entries", earningHi: "naye-kam ke daud mein pehle kadam se", spendingEn: "on tools, image and independence — rarely on help", spendingHi: "zaroori-aala aur pehchaan pe, madad pe nahi", businessAptitudeEn: "high founder instinct, weak on delegation", businessAptitudeHi: "founder-josh ucha, delegation kamzor", legacyEn: "the one who started something that kept paying", legacyHi: "wo insaan jiski ek shuruaat saalon tak paisa deti rahi" },
};

const GENERIC_WEALTH: WealthProfile = {
  moneyPersonalityEn: "You are a keeper by design — money stays longer with you than with friends who earn more.", moneyPersonalityHi: "aap sanjhi-hifazat-wale ho — aapke paas paisa der tak rukta hai — jitna bahar-walon ke paas nahi rukta.", riskStyleEn: "You take calculated risks twice-tested", riskStyleHi: "do baar soche ke, phir rishta lete ho", earningEn: "through steady streams and trusted hands", earningHi: "bharosemand raaste, gehre dhandhe se", spendingEn: "on people and security more than display", spendingHi: "logon aur suraksha pe, dikhawe pe kam", businessAptitudeEn: "strong on systems, patient with results", businessAptitudeHi: "system-ka bharosemand, nateeje pe sabr", legacyEn: "wealth that shelters the next generation", legacyHi: "aisi daulat jo agli peedhi ko aashiyana de" };

export function wealthOf(mulank: number, bhagyank: number): WealthProfile {
  return (WEALTH_BY_MULANK[mulank] || GENERIC_WEALTH) as WealthProfile;
}

/* ---------- CAREER DNA ---------- */
export interface CareerProfile {
  identityEn: string; identityHi: string;
  scores: { label: string; labelHi: string; score: number }[];
}

const CAREER_BY_MULANK: Partial<Record<number, CareerProfile>> = {
  2: {
    identityEn: "You are not designed to follow orders — you are designed to read people faster than they can hide.",
    identityHi: "aap order-maange jaane-wale nahi — aap log ko unse pehle padhne-wale ho.",
    scores: [
      { label: "Judgement", labelHi: "samajh", score: 88 },
      { label: "Patience", labelHi: "sabr", score: 82 },
      { label: "Advising", labelHi: "salah-dena", score: 86 },
      { label: "Execution", labelHi: "kaam-phal", score: 76 },
      { label: "Leadership", labelHi: "netritva", score: 71 },
      { label: "Innovation", labelHi: "nayi-soch", score: 74 },
      { label: "Authority", labelHi: "adhikar", score: 68 },
    ],
  },
};

const GENERIC_CAREER: CareerProfile = {
  identityEn: "You are not designed to work — you are designed to build systems others work inside.",
  identityHi: "aap rozgaar karne ke liye nahi — aap nizam banane ke liye ho jinme doosre kaam karte hain.",
  scores: [
    { label: "Leadership", labelHi: "netritva", score: 78 },
    { label: "Innovation", labelHi: "nayi-soch", score: 74 },
    { label: "Authority", labelHi: "adhikar", score: 82 },
    { label: "Execution", labelHi: "kaam-phal", score: 80 },
    { label: "Advisory", labelHi: "salah-dena", score: 77 },
    { label: "Teaching", labelHi: "sikhaana", score: 73 },
    { label: "Founder", labelHi: "sansthapak", score: 71 },
  ],
};

export function careerOf(mulank: number, bhagyank: number): CareerProfile {
  return (CAREER_BY_MULANK[mulank] || GENERIC_CAREER) as CareerProfile;
}