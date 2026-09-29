
/**
 * v5.3 AKASHIC DOSSIER — CHAPTERS: NEXT 12 MONTHS (Netflix style) + NEXT 5 YEARS trailer.
 * Deterministic: PY (personal year) from DOB + target year; month themes
 * cycle through mulank-keyed arcs; interpret-never-predict voice.
 */

export interface MonthCard {
  month: number; // 1-12
  themeEn: string; themeHi: string;
  chanceEn: string; chanceHi: string;
  stressEn: string; stressHi: string;
  focusEn: string; focusHi: string;
}

const MONTH_ARCS: Record<number, { theme: [string, string]; chance: [string, string]; stress: [string, string]; focus: [string, string] }> = {
  1: { theme: ["The Ignition Month", "shuruaat ka mahina"], chance: ["A door opens quietly — the ones who notice first walk in.", "ek darwaza chhup-chaap khulta hai — jo pehle dekh leta hai, wahi bheetar jaata hai."], stress: ["Old expectations will knock; don't answer every call.", "purani umeedein dastak dengi — sab dastak jawab-mat-do."], focus: ["say the thing you rehearsed; once.", "rehersha ki baat aaj ek baar bol do."] },
  2: { theme: ["The Patience Month", "sabr ka mahina"], chance: ["A delayed reply turns out to be your shield.", "der se aaya jawab hi aapki dhaal sabit hui."], stress: ["Waiting will prick; the wait is not a verdict.", "intezaar chubhega — par intezaar faisla nahi hai."], focus: ["protect sleep; big choices need a rested mind.", "neend ka khayal — bade faisalon ko shaant maangna hai."] },
  3: { theme: ["The Voice Month", "awaaz ka mahina"], chance: ["Your words reach further than you planned.", "aapki baat planned se aage pahunchegi."], stress: ["Scattered energy — three starts, no finish.", "josh bikhrega — teen shuruaat, ek bhi mukammal nahi."], focus: ["finish one small thing publicly.", "ek chhoti cheez mukammal karo, aur duniya ke saamne."] },
  4: { theme: ["The Foundation Month", "bunyad ka mahina"], chance: ["A boring routine becomes invisible armor.", "ek bhoori roti-wali aadat bhi invisible zareeva banti hai."], stress: ["Rigidity — a closed mind costs more than a closed door.", "zidd — band dimaag band-darwaze se mehenga hai."], focus: ["write numbers down; money likes ledgers.", "aankde likho; paisa bhaishi jama-kharch se maanta hai."] },
  5: { theme: ["The Change Month", "bandar-raftar ka mahina"], chance: ["A sudden invitation rearranges a plan — say yes.", "achanak ek daawat plan ko badal degi — haan kehna."], stress: ["Overbooking yourself to avoid stillness.", "khalipan se bachne ke liye khud-ko zyada bhar dena."], focus: ["one hour alone, no screen.", "ek ghanta akele, screen ke bina."] },
  6: { theme: ["The Family Month", "ghar-ka mahina"], chance: ["A home conversation heals what distance bent.", "ghar ki ek baat, doori se juda rishta jod degi."], stress: ["You'll carry others' weight; set one boundary.", "doosron ka bojh uthaoge — ek hud-kheench-o."], focus: ["one honest sentence at the dinner table.", "khaane-pe ek sachi baat."] },
  7: { theme: ["The Deep Month", "gehrai ka mahina"], chance: ["Study done now compounds all year.", "ab ki padhai saal bhar byaaj deti hai."], stress: ["Isolation feels like rest, then becomes hiding.", "akele-rahi pehle aaraam lagti hai, phir chhupna ban jaati hai."], focus: ["teach someone something you learned this year.", "saal ki seekh kisi ko sikhaao."] },
  8: { theme: ["The Ledger Month", "hisaab ka mahina"], chance: ["A negotiation lands better than feared.", "baat-cheet darr se behtar utregi."], stress: ["Money pressure shows the leak you ignored.", "paisa ka dabav wahan chhaed dikhaayegi jise aap ne nazar-andaaz kiya."], focus: ["one payment plan, written and dated.", "ek bhugtan-yojana likhi aur aarki-baddhi."] },
  9: { theme: ["The Release Month", "chudai ka mahina"], chance: ["Something you stop makes room for what starts.", "jisse aap chhoot-te ho, uski jagah naya aata hai."], stress: ["Nostalgia will sell you yesterday at tomorrow's price.", "purani yaadein kal ko, aaj ke daam pe bechengi."], focus: ["delete one thing you keep 'just in case'.", "wo ek cheez mitaao jo 'just in case' ke naam pe rakhi."] },
};

function pyNumber(birth: { y: number; m: number; d: number }, year: number): number {
  let s = String(birth.d) + String(birth.m) + String(birth.y) + String(year);
  let sum = s.split("").reduce((a, c) => a + Number(c), 0);
  while (sum > 9 && ![11, 22].includes(sum)) sum = String(sum).split("").reduce((a, c) => a + Number(c), 0);
  return sum;
}

function reduce9(n: number): number {
  let x = n;
  while (x > 9 && ![11, 22].includes(x)) x = String(x).split("").reduce((a, c) => a + Number(c), 0);
  return x;
}

export function next12Months(birth: { y: number; m: number; d: number }, startYear: number, startMonth = 1): MonthCard[] {
  const py = reduce9(pyNumber(birth, startYear));
  const out: MonthCard[] = [];
  for (let i = 0; i < 12; i++) {
    const month = ((startMonth + i - 1) % 12) + 1;
    const arcKey = ((py + month - 1) % 9) + 1;
    const a = MONTH_ARCS[arcKey];
    out.push({
      month,
      themeEn: a.theme[0], themeHi: a.theme[1],
      chanceEn: a.chance[0], chanceHi: a.chance[1],
      stressEn: a.stress[0], stressHi: a.stress[1],
      focusEn: a.focus[0], focusHi: a.focus[1],
    });
  }
  return out;
}

export interface YearTrailer {
  year: number;
  py: number;
  titleEn: string; titleHi: string;
  lineEn: string; lineHi: string;
}

const YEAR_TITLES: Record<number, [string, string, string, string]> = {
  1: ["The Expansion Year", "vistaar ka saal", "New ground opens; your job is to plant, not to harvest.", "naya zameen khulta hai — aapka kaam bo hai, katai nahi."],
  2: ["The Choice Year", "faisle ka saal", "Life asks for a decision you postponed twice already.", "zindagi wahi faisla maangegi jise aap do baar taal chuke ho."],
  3: ["The Breakthrough Year", "pehchaan ka saal", "Hard work from earlier years suddenly becomes visible.", "purani mehnat achanak dekhne lagti hai."],
  4: ["The Responsibility Year", "imtihaan ka saal", "Tests arrive as paperwork and patience, not drama.", "imtihaan drama se nahi — kagaj aur sabr se aata hai."],
  5: ["The Legacy Year", "shohrat ka saal", "What you built starts speaking for you.", "aapka banaya hua aapke liye bolne lagta hai."],
};

export function next5Years(birth: { y: number; m: number; d: number }, startYear: number): YearTrailer[] {
  const out: YearTrailer[] = [];
  for (let i = 0; i < 5; i++) {
    const y2 = startYear + i;
    const py = reduce9(pyNumber(birth, y2));
    const t = YEAR_TITLES[py] || YEAR_TITLES[4];
    out.push({ year: y2, py, titleEn: t[0], titleHi: t[1], lineEn: t[2], lineHi: t[3] });
  }
  return out;
}
