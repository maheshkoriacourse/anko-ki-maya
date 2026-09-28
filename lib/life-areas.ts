/**
 * Anko Ki Maya v3 — LIFE-AREA CHAPTERS (owner directive, 29 Sep).
 *
 * Ten life areas readers actually crave: love/marriage, intimacy (dignified),
 * business, job, money, children/family, foreign travel, elder-care (care
 * framing only), friendships — plus the past/current/future spine.
 *
 * Every section = (a) past "kya raha hoga", (b) abhi kya chal raha hai,
 * (c) aage kya hai — WINDOW YEARS WITH AGES, (d) upay. Hook-first: each
 * section's opening line names concrete YEARS from the engine.
 *
 * HARD-BANS unchanged: no death-timing, no illness/diagnosis, no pregnancy
 * prediction, no crime, no medical claims, no '100% guaranteed'. Elder-care
 * is CARE/RESPONSIBILITY framing only. Intimacy is dignified jyotishi phrasing.
 */

import { reduce } from "./numerology";
import { grahaFor } from "./navgrah";

export interface AreaWindow {
  year: number;
  age: number;
  why: string; // short reason (PY/PX/planet)
  whyHi: string;
}

export interface AreaSection {
  areaId: string;
  titleEn: string;
  titleHi: string;
  hookEn: string;
  hookHi: string;
  pastEn: string;
  pastHi: string;
  nowEn: string;
  nowHi: string;
  futureEn: string;
  futureHi: string;
  windows: AreaWindow[]; // year+age windows for (c)
  remedyEn: string;
  remedyHi: string;
}

export interface LifeAreaReport {
  sections: AreaSection[];
  steps: string[];
}

interface AreaInput {
  birthYear: number;
  birthMonth: number; // 1-12
  birthDay: number;
  mulank: number; // reduced birth day
  bhagyank: number; // life path (masters preserved)
  pinnacles: { index: number; number: number; ageStart: number; ageEnd: number }[];
  nowYear: number;
}

/* ------------------------------------------------------------------ */
/* Window-year finder                                                  */
/* ------------------------------------------------------------------ */

/** Personal Year for a calendar year (reduced; masters folded by caller). */
function pyFor(inp: AreaInput, year: number): number {
  return reduce(inp.birthMonth + inp.birthDay + reduce(year));
}

/**
 * Scan a year range and collect the first `limit` years whose PY is in
 * `wanted` (optionally boosted by a pinnacle whose number matches).
 */
function windowsFor(
  inp: AreaInput,
  wanted: number[],
  from: number,
  to: number,
  limit: number,
  whyEn: string,
  whyHi: string,
  boostPin?: number[],
): AreaWindow[] {
  const out: AreaWindow[] = [];
  for (let year = from; year <= to && out.length < limit; year++) {
    if (year < inp.nowYear) continue;
    const py = pyFor(inp, year);
    const age = year - inp.birthYear;
    const pin = inp.pinnacles.find((p) => age >= p.ageStart && age <= p.ageEnd);
    const hit = wanted.includes(py) || (boostPin && pin && boostPin.includes(pin.number));
    if (hit) out.push({ year, age, why: whyEn, whyHi });
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Remedy seeds per area (from the school remedy deck, rewritten)       */
/* ------------------------------------------------------------------ */

const AREA_REMEDY_HI: Record<string, string> = {
  love: "Shukra ko bal do: Shukravaar ko safed vastra/mishri ka daan, 'ॐ Shukraya Namah' ka 108 japa, aur rishton mein komal vaani — Shukra narmi se hi jeetta hai.",
  intimacy: "Chandra-Mangal santulan: Somvaar ko Chandra jal-daan, Mangalvaar sanyam-saadhana, 'ॐ Chandraya Namah' 108 japa — nikatata man ki shaanti se gehri hoti hai.",
  business: "Guru-Budh ki pooja: Budhvaar ko hare vastra/moong daan, Guruvaar ko peela/haldi daan, naye saude apni shubh tithi par — 'ॐ Budhaya Namah' 108 japa.",
  job: "Soory-jal arpan praatahkaal, Ravivaar aadar-vrat, 'ॐ Suryaya Namah' 108 japa; badlaav ke saal (Rahu) mein kaagzaat saaf rakho.",
  money: "Shani-Lakshmi anushasan: Shanivaar tail-daan, roqda-bahee daily, 'ॐ Shanicharaya Namah' 108 japa; dhan-vridhi ke saalon mein bachat pehle, kharch baad.",
  children: "Budh-Chandra vidya-vrat: Budhvaar bachchon ke saath study-time, Somvaar shwet daan, 'ॐ Budhaya Namah' 108 japa — bachchon ke ank-vikas par dhyaan.",
  foreign: "Rahu-Chandra yatra-vrat: Shanivaar saptdhaanya daan, yatra se pehle 'ॐ Rahave Namah' 108 japa, videsh-kaam apni shubh tithi par shuru karo.",
  eldercare: "Surya-Shani seva-vrat: Ravivaar badon ki seva vishesh, Shanivaar tail/kaale vastra daan, 'ॐ Shanicharaya Namah' 108 japa — seva hi is daur ka upay hai.",
  friends: "Budh-Guru sang-vrat: Budhvaar hara daan, nayi mulaqaat shubh din par, 'ॐ Gurave Namah' 108 japa — achchha sang hi sabse bada upay.",
  spine: "Roz praatah soory-jal arpan aur 'ॐ' ka 11 baar uccharan — Mulank aur Bhagyank donon ka santulan isi daily-kram se banta hai.",
};

const AREA_REMEDY_EN: Record<string, string> = {
  love: "Strengthen Shukra: white clothing/sugar daan on Fridays, 108 japa of 'Om Shukraya Namah', and gentle speech — Shukra wins only through softness.",
  intimacy: "Chandra-Mangal balance: water-offering to the Moon on Mondays, restraint practice on Tuesdays, 108 japa of 'Om Chandraya Namah' — intimacy deepens with a settled mind.",
  business: "Guru-Budh worship: green clothing/moong daan on Wednesdays, yellow/turmeric daan on Thursdays, start new deals on your lucky date — 108 japa of 'Om Budhaya Namah'.",
  job: "Offer water to the Sun at sunrise, keep the Sunday respect-vow, 108 japa of 'Om Suryaya Namah'; in Rahu (change) years keep paperwork spotless.",
  money: "Shani-Laxmi discipline: oil daan on Saturdays, a daily cash ledger, 108 japa of 'Om Shanicharaya Namah'; in wealth years save first, spend after.",
  children: "Budh-Chandra learning-vow: study time with children on Wednesdays, white daan on Mondays, 108 japa of 'Om Budhaya Namah' — attend to the children's number-growth.",
  foreign: "Rahu-Chandra travel-vow: sapta-dhanya daan on Saturdays, 108 japa of 'Om Rahave Namah' before travel, begin foreign work on your lucky date.",
  eldercare: "Surya-Shani service-vow: special service to elders on Sundays, oil/black-cloth daan on Saturdays, 108 japa of 'Om Shanicharaya Namah' — service itself is the remedy of this period.",
  friends: "Budh-Guru company-vow: green daan on Wednesdays, new meetings on lucky days, 108 japa of 'Om Gurave Namah' — good company is the greatest remedy.",
  spine: "Every sunrise: offer water to the Sun and chant 'Om' 11 times — the balance of Mulank and Bhagyank is built by this daily order.",
};

/* ------------------------------------------------------------------ */
/* Section builder                                                     */
/* ------------------------------------------------------------------ */

type AreaSpec = {
  areaId: string;
  titleEn: string;
  titleHi: string;
  loveYears: number[]; // PYs that open this area's window
  pinBoost: number[];
  hookEn: (years: AreaWindow[], cur: number) => string;
  hookHi: (years: AreaWindow[], cur: number) => string;
  pastEn: (pastYears: AreaWindow[], inp: AreaInput) => string;
  pastHi: (pastYears: AreaWindow[], inp: AreaInput) => string;
  nowEn: (curPy: number, inp: AreaInput) => string;
  nowHi: (curPy: number, inp: AreaInput) => string;
  futureEn: (years: AreaWindow[], cur: number) => string;
  futureHi: (years: AreaWindow[], cur: number) => string;
};

function fmtYearList(years: AreaWindow[]): string {
  return years.map((w) => String(w.year)).join(", ");
}

function specFor(areaId: string): AreaSpec {
  const S: Record<string, AreaSpec> = {
    love: {
      areaId: "love",
      titleEn: "Love, Romance & Marriage",
      titleHi: "prem, romaanch aur vivaah",
      loveYears: [2, 6, 7],
      pinBoost: [2, 6],
      hookEn: (ys) =>
        ys.length > 0
          ? `The two strongest years for love in your chart are ${ys.slice(0, 2).map((y) => y.year).join(" and ")} — the ${grahaFor(6).graha} and ${grahaFor(2).graha} windows.`
          : "Your love-windows sit in the coming decade — the chart keeps the best chapters later on purpose.",
      hookHi: (ys) =>
        ys.length > 0
          ? `shaadi/prem ke liye aapki chart mein do sabse damadaar saal ${ys.slice(0, 2).map((y) => y.year).join(" aur ")} hain — ${grahaFor(6).grahaHi} aur ${grahaFor(2).grahaHi} ki khidkiyaan.`
          : "aapki prem-khidkiyaan aane waale dashak mein hain — chart ne sabse achchhe adhyay jaan-boojhkar baad mein rakhe hain.",
      pastEn: (py, inp) =>
        `Love did not pass you by in the last decade: the ${pyFor(inp, inp.nowYear - 5)}-year ${fmtYearList(py) || "years"} carried ${grahaFor(2).graha} tides — a bond either formed, deepened or taught you its lesson there.`,
      pastHi: (py, inp) =>
        `pichhle dashak mein prem aapse gujara: ${fmtYearList(py) || "us daur"} ke ${grahaFor(2).grahaHi}-pradhaan saalon mein koi bndhan bana, gehra hua ya usane apni seekh i.`,
      nowEn: (curPy, inp) =>
        curPy === 2 || curPy === 6 || curPy === 7
          ? `Right now you stand inside a love-window (Personal Year ${curPy}): ${grahaFor(curPy).graha} is awake in your chart — this IS the season to move the relationship forward, not next year.`
          : `Currently ${grahaFor(curPy).graha} rules — love moves at ${grahaFor(curPy).graha}'s pace this year: ${curPy === 8 ? "status and security over romance; the heart settles after the money is set." : "steady ground; the next window (years " + fmtYearList(windowsFor(inp, [2, 6, 7], inp.nowYear + 1, inp.nowYear + 10, 2, "", "")) + ") will be louder."}`,
      nowHi: (curPy, inp) =>
        curPy === 2 || curPy === 6 || curPy === 7
          ? `abhi aap prem-khidki ke bheetar khadae hain (vyaktigat saal ${curPy}): chart mein ${grahaFor(curPy).grahaHi} jaagrit hai — rishta aage badhaane ka yehi mausam hai, agla saal nahi.`
          : `is saal ${grahaFor(curPy).grahaHi} ka raaj hai — prem isi ki gati se chalega: ${curPy === 8 ? "pehle sthirta aur arth, phir man; paisa tay hoga toh man baithega." : "sthir jamein; agli khidki (saal " + fmtYearList(windowsFor(inp, [2, 6, 7], inp.nowYear + 1, inp.nowYear + 10, 2, "", "")) + ") aur damadaar hoi."}`,
      futureEn: (ys) =>
        ys.length > 0
          ? `Ahead, the marriage/love windows open at ages ${ys.map((y) => y.age).join(", ")} — years ${fmtYearList(ys)}. PY 2 bonds, PY 6 commits, PY 7 deepens; the strongest of these is ${ys[0].year} (age ${ys[0].age}).`
          : "The coming decade holds the commitment chapters — the graph marks them as they approach.",
      futureHi: (ys) =>
        ys.length > 0
          ? `aage vivaah/prem ki khidkiyaan umra ${ys.map((y) => y.age).join(", ")} mein khulai hain — saal ${fmtYearList(ys)}. ank 2 bndhan, 6 sankalp, 7 gehrai; inamen sabse prabal ${ys[0].year} (umra ${ys[0].age}).`
          : "aane waala dashak sankalp-adhyay rakhta hai — graph unhen paas aane par chihnit karega.",
    },
    intimacy: {
      areaId: "intimacy",
      titleEn: "Intimacy & Passion",
      titleHi: "nikatata aur mohabbat ki gehrai",
      loveYears: [6, 9, 2],
      pinBoost: [6, 9],
      hookEn: (ys) =>
        ys.length > 0
          ? `Passion peaks in your chart at ${ys.slice(0, 2).map((y) => y.year).join(" and ")} — ${grahaFor(9).graha} drive meeting ${grahaFor(6).graha} charm.`
          : "The passion chapters of your chart open further out — dignity and depth, never noise.",
      hookHi: (ys) =>
        ys.length > 0
          ? `aapke chart mein passion ki choti ${ys.slice(0, 2).map((y) => y.year).join(" aur ")} mein hai — ${grahaFor(9).grahaHi} ka josh, ${grahaFor(6).grahaHi} ka nain-nakash.`
          : "aapke chart ke passion-adhyay thodae aage khulate hain — garima aur gehrai, shor nahi.",
      pastEn: (py, inp) =>
        `In the last decade, ${fmtYearList(py) || "the middle years"} ran ${grahaFor(9).graha}/${grahaFor(6).graha} currents — passion ran strong there, and where the two planets clashed, tenderness needed repair.`,
      pastHi: (py, inp) =>
        `pichhle dashak mein ${fmtYearList(py) || "beech ke saalon"} mein ${grahaFor(9).grahaHi}/${grahaFor(6).grahaHi} ki dhaaraae chaleen — us daur mein mohabbat mein gehrai aur josh dono prabal rahe.`,
      nowEn: (curPy) =>
        curPy === 6 || curPy === 9
          ? `This year (${grahaFor(curPy).graha}) passion stays strong — closeness deepens when you bring patience along with fire.`
          : `This year is a building year for closeness — ${grahaFor(curPy).graha} asks for trust-building first; the fire follows the foundation.`,
      nowHi: (curPy) =>
        curPy === 6 || curPy === 9
          ? `is saal (${grahaFor(curPy).grahaHi}) passion prabal rehata hai — aag ke saath dhairya le chalen toh nikatata aur gehri hoi.`
          : `yeh saal nikatata ki neev rakhta hai — ${grahaFor(curPy).grahaHi} pehle bharosa maagata hai; aag neev ke baad hi chadhai hai.`,
      futureEn: (ys) =>
        ys.length > 0
          ? `Deep-intimacy years ahead: ${fmtYearList(ys)} (ages ${ys.map((y) => y.age).join(", ")}) — 'mohabbat mein gehrai ka varsh'. Emotional honesty in those years unlocks everything.`
          : "The decade ahead holds quieter, steadier intimacy chapters — depth over fireworks.",
      futureHi: (ys) =>
        ys.length > 0
          ? `aage gehrai ke saal: ${fmtYearList(ys)} (umra ${ys.map((y) => y.age).join(", ")}) — 'mohabbat mein gehrai ka saal'. bhaavanaatmak eemaanadaaree in saalon mein sab kuchh khol dei.`
          : "aane waala dashak shaant, sthir nikatata ke adhyay rakhta hai — chamak se gehrai behatar.",
    },
    business: {
      areaId: "business",
      titleEn: "Business & Enterprise",
      titleHi: "vyaapaar aur udyam",
      loveYears: [1, 3, 8],
      pinBoost: [1, 8],
      hookEn: (ys) =>
        ys.length > 0
          ? `Your chart's strongest launch years are ${ys.slice(0, 2).map((y) => y.year).join(" and ")} — don't open the venture before its window.`
          : "Your venture years are building — the foundation years ARE the launch prep.",
      hookHi: (ys) =>
        ys.length > 0
          ? `aapke chart ke sabse prabal launch-saal ${ys.slice(0, 2).map((y) => y.year).join(" aur ")} hain — khidki se pehle udyam na kholen.`
          : "aapke udyam-saal ban rahe hain — neev ke hi saal launch ki taiyaaree hain.",
      pastEn: (py, inp) =>
        `In the past decade, ${fmtYearList(py) || "the working years"} carried expansion currents — ventures tried then either scaled or taught their tuition.`,
      pastHi: (py, inp) =>
        `pichhle dashak ke ${fmtYearList(py) || "kaarya-saalon"} mein vistar ki dhaaraae theen — us daur ke udyam ya toh badhae, ya unhonne tyooshan phaees i.`,
      nowEn: (curPy) =>
        curPy === 8
          ? `You are standing IN a money-power year (${grahaFor(8).graha}): scale revenue, push the big negotiation now — expansion pays this year.`
          : curPy === 4
            ? `Currently ${grahaFor(4).graha} rules: consolidate, systemise, clean the books — expansion against this grain costs double.`
            : `Currently ${grahaFor(curPy).graha} leads — ${curPy === 5 ? "commerce and contacts expand the trade; keep the ledger daily." : "build the pipeline; the big swing comes at the next 8-year."}`,
      nowHi: (curPy) =>
        curPy === 8
          ? `aap abhi dhan-shakti ke saal mein khadae hain (${grahaFor(8).grahaHi}): isi saal revenue badhao, badi baatacheet theek karein — vistar is saal phalata hai.`
          : curPy === 4
            ? `abhi ${grahaFor(4).grahaHi} ka raaj hai: snvardhan, system, bahee-khaata saaf — is lay ke viruddh vistar doguna mahga.`
            : `abhi ${grahaFor(curPy).grahaHi} netritv kar raha hai — ${curPy === 5 ? "vyaapaar aur sampark badhao; roqda roz rakhein." : "paaipalaain banao; bada daav agle ank-8 saal mein hai."}`,
      futureEn: (ys) =>
        ys.length > 0
          ? `Launch windows: ${fmtYearList(ys)} (ages ${ys.map((y) => y.age).join(", ")}). Partnership years (${grahaFor(5).graha} commerce) follow at ${ys.map((y) => y.year + 1).join(", ")} — expansion vs consolidation is a knife-edge you'll walk there.`
          : "Foundation years ahead are the prep-room of your launch decade.",
      futureHi: (ys) =>
        ys.length > 0
          ? `launch-khidkiyaan: ${fmtYearList(ys)} (umra ${ys.map((y) => y.age).join(", ")}). saajhedari-saal (${grahaFor(5).grahaHi} vyaapaar) isake baad ${ys.map((y) => y.year + 1).join(", ")} mein — vistar banaam snvardhan wahin phaaisala maagega.`
          : "aage ke neev-saal aapke launch-dashak ki taiyaaree-kaksha hain.",
    },
    job: {
      areaId: "job",
      titleEn: "Job & Career",
      titleHi: "naukri aur career",
      loveYears: [1, 4, 8],
      pinBoost: [1, 8],
      hookEn: (ys) =>
        ys.length > 0
          ? `Promotion/change windows: ${ys.slice(0, 2).map((y) => y.year).join(" and ")} — the ${grahaFor(1).graha} and ${grahaFor(8).graha} years decide the ladder.`
          : "The ladder's next rung is being forged in the current foundation years.",
      hookHi: (ys) =>
        ys.length > 0
          ? `pramoshan/badlaav ki khidkiyaan: ${ys.slice(0, 2).map((y) => y.year).join(" aur ")} — seedhaee ke agle dag ${grahaFor(1).grahaHi} aur ${grahaFor(8).grahaHi} tay karenge.`
          : "seedhaee ki agli dag inheen neev-saalon mein tap rahi hai.",
      pastEn: (py, inp) =>
        `The last decade's ${fmtYearList(py) || "work years"} moved your job — a switch, a boss-change or a visibility spike happened under ${grahaFor(1).graha}/${grahaFor(4).graha} currents.`,
      pastHi: (py, inp) =>
        `pichhle dashak ke ${fmtYearList(py) || "kaarya-saalon"} mein naukri hii — badlaav, adhyaksh-parivartan ya dikhane ka uchhaal, ${grahaFor(1).grahaHi}/${grahaFor(4).grahaHi} ki dhaara men.`,
      nowEn: (curPy) =>
        curPy === 1
          ? `This year ${grahaFor(1).graha} hands you the first move: apply, propose, step up — the boss-line (Surya) is listening this year.`
          : curPy === 4
            ? `${grahaFor(4).graha} years break routine on purpose — a job-switch urge is real; move deliberately, keep offers in writing.`
            : `This year rewards steady mastery over job-hopping — ${grahaFor(curPy).graha} tests patience before promotion.`,
      nowHi: (curPy) =>
        curPy === 1
          ? `is saal ${grahaFor(1).grahaHi} aapko pahala kadam deta hai: aavedan, prastaav, uttaradaayitv — Surya-rekha is saal sun rahi hai.`
          : curPy === 4
            ? `${grahaFor(4).grahaHi} saal routine jaan-boojhkar todta hai — naukri-badlaav ki ichchha sachchee hai; soch-samajhakar chalen, prastaav likhit rakhein.`
            : `yeh saal naukri-badai se zyada sthir mahaarat ko puraskrit karta hai — ${grahaFor(curPy).grahaHi} pramoshan se pehle dhairya ki pariksha leta hai.`,
      futureEn: (ys) =>
        ys.length > 0
          ? `Job windows: ${fmtYearList(ys)} (ages ${ys.map((y) => y.age).join(", ")}) — ${grahaFor(8).graha} brings position, ${grahaFor(4).graha} brings the switch. Boss-relations ease in ${grahaFor(1).graha} years.`
          : "The coming years build the resume the next window will spend.",
      futureHi: (ys) =>
        ys.length > 0
          ? `naukri-khidkiyaan: ${fmtYearList(ys)} (umra ${ys.map((y) => y.age).join(", ")}) — ${grahaFor(8).grahaHi} pad dega, ${grahaFor(4).grahaHi} badlaav. ${grahaFor(1).grahaHi}-saalon mein adhyaksh-sambandh saral honge.`
          : "aage ke saal woh rijayoome banaaege jise agli khidki kharch karei.",
    },
    money: {
      areaId: "money",
      titleEn: "Money & Wealth",
      titleHi: "dhan aur sampatti",
      loveYears: [8, 5, 3],
      pinBoost: [8, 5],
      hookEn: (ys) =>
        ys.length > 0
          ? `Your earning years: ${ys.slice(0, 2).map((y) => y.year).join(" and ")}. ${grahaFor(8).graha} pays the disciplined — save in those years and the compounding is permanent.`
          : "Wealth-building starts in the current consolidation years — seed money now.",
      hookHi: (ys) =>
        ys.length > 0
          ? `aapke kamai ke saal: ${ys.slice(0, 2).map((y) => y.year).join(" aur ")}. ${grahaFor(8).grahaHi} anushaasai ko deta hai — unhi saalon mein bachat karo, chakravriddhi sthaayi hoi.`
          : "dhan-nirmaan inheen snvardhan-saalon se shuru hota hai — abhi beej-dhan jutaaie.",
      pastEn: (py, inp) =>
        `The last decade mixed earning and leaking: ${fmtYearList(py) || "the money years"} paid well under ${grahaFor(8).graha}/${grahaFor(5).graha}, while ${grahaFor(4).graha} years taught where money leaks.`,
      pastHi: (py, inp) =>
        `pichhle dashak mein kamai aur choohedaai dono chaleen: ${fmtYearList(py) || "dhan-saalon"} mein ${grahaFor(8).grahaHi}/${grahaFor(5).grahaHi} ne achchha diyaa, ${grahaFor(4).grahaHi}-saalon ne chook ki jagah dikhaaee.`,
      nowEn: (curPy) =>
        curPy === 8
          ? `This IS a money year (${grahaFor(8).graha}): chase receivables, negotiate hard, invest the surplus — don't hoard cash idle.`
          : curPy === 4
            ? `This year is for SAVING, not spending: ${grahaFor(4).graha} builds the vault. Avoid big loans this year.`
            : `Money moves moderately this year — ${grahaFor(curPy).graha} wants the ledger daily and the speculation small.`,
      nowHi: (curPy) =>
        curPy === 8
          ? `yeh dhan-saal hai (${grahaFor(8).grahaHi}): baqaya vasoolen, sakhat mol-bhav karein, bachat nivesh karein — nakad bekaar na padae rahane dein.`
          : curPy === 4
            ? `yeh saal bachat ka hai, kharch ka nahi: ${grahaFor(4).grahaHi} tijoree banata hai. bada karj is saal taalo.`
            : `is saal dhan sanyam se chalega — ${grahaFor(curPy).grahaHi} roz bahee-khaata aur chhota satta chaahata hai.`,
      futureEn: (ys) =>
        ys.length > 0
          ? `Wealth stretches: ${fmtYearList(ys)} (ages ${ys.map((y) => y.age).join(", ")}). Watch money-leaks in ${grahaFor(4).graha} years; ${grahaFor(8).graha} years convert discipline into assets — property/long holdings favour those years.`
          : "The saving years now fund the earning years later — the graph shows the handover.",
      futureHi: (ys) =>
        ys.length > 0
          ? `dhan-vistar: ${fmtYearList(ys)} (umra ${ys.map((y) => y.age).join(", ")}). ${grahaFor(4).grahaHi}-saalon mein choohedaai se saavdhaan; ${grahaFor(8).grahaHi}-saal anushasan ko sampatti mein badalate hain — jamein/lnbee holding unhi ke liye hai.`
          : "aaj ke bachat-saal kal ke kamai-saalon ko vitt denge — graph yeh hastaantaran dikhaata hai.",
    },
    children: {
      areaId: "children",
      titleEn: "Children & Family Growth",
      titleHi: "santaan aur parivaar-vridhi",
      loveYears: [6, 2, 5],
      pinBoost: [6, 2],
      hookEn: (ys) =>
        ys.length > 0
          ? `Family-growth years: ${ys.slice(0, 2).map((y) => y.year).join(" and ")} — ${grahaFor(6).graha} and ${grahaFor(2).graha} periods carry home-responsibility themes.`
          : "Family chapters build in the quieter years — responsibility ripens before arrival.",
      hookHi: (ys) =>
        ys.length > 0
          ? `parivaar-vridhi ke saal: ${ys.slice(0, 2).map((y) => y.year).join(" aur ")} — ${grahaFor(6).grahaHi} aur ${grahaFor(2).grahaHi} ke daur grih-zimmewari ke vishay laate hain.`
          : "parivaar-adhyay shaant saalon mein bante hain — zimmewari pehle pakai hai, aagaman baad men.",
      pastEn: (py, inp) =>
        `Family duty shaped ${fmtYearList(py) || "the home years"} of the last decade — household moves, family functions, or caretaking filled those years.`,
      pastHi: (py, inp) =>
        `parivaar-kartavya ne pichhle dashak ke ${fmtYearList(py) || "grih-saalon"} ko roop diyaa — ghar ki adala-badai, lok-aachaar, ya dekharekha ne saal bhar die.`,
      nowEn: (curPy) =>
        curPy === 6 || curPy === 2
          ? `This year home takes the front seat (${grahaFor(curPy).graha}): family decisions, home beautification, bonding time — the house rewards attention now.`
          : `This year family matters run at maintenance level — ${grahaFor(curPy).graha} keeps home steady while outer work leads.`,
      nowHi: (curPy) =>
        curPy === 6 || curPy === 2
          ? `is saal ghar aage baithega (${grahaFor(curPy).grahaHi}): parivaarik nirnay, ghar ki shobha, saath bitaayaa samay — ghar abhi dhyaan ka phal deta hai.`
          : `is saal ghar-bahar ka santulan bana rahega — ${grahaFor(curPy).grahaHi} ghar ko sthir rakhega jabaki baaharee kaam aage chalega.`,
      futureEn: (ys) =>
        ys.length > 0
          ? `Family-growth windows: ${fmtYearList(ys)} (ages ${ys.map((y) => y.age).join(", ")}) — home responsibility themes peak there; children's education decisions also cluster in these years.`
          : "The coming decade carries quieter family chapters — steadiness is its own blessing.",
      futureHi: (ys) =>
        ys.length > 0
          ? `parivaar-vridhi ki khidkiyaan: ${fmtYearList(ys)} (umra ${ys.map((y) => y.age).join(", ")}) — grih-zimmewari ke vishay wahin shikhar par; bachchon ki shiksha ke nirnay bhi inheen saalon mein jamate hain.`
          : "aane waala dashak shaant parivaarik adhyay rakhta hai — sthirta svayn vardaan hai.",
    },
    foreign: {
      areaId: "foreign",
      titleEn: "Foreign Travel & Settlement",
      titleHi: "videsh yatra aur videsh-vaas",
      loveYears: [4, 5, 7],
      pinBoost: [4, 5],
      hookEn: (ys) =>
        ys.length > 0
          ? `'Videsh yatra ke sanket': your travel windows are ${ys.slice(0, 2).map((y) => y.year).join(" and ")} — ${grahaFor(4).graha} and ${grahaFor(5).graha} both push movement abroad.`
          : "Abroad-signals build in the coming change-years — passports get stamped when 4/5 knock.",
      hookHi: (ys) =>
        ys.length > 0
          ? `'videsh yatra ke sanket': aapki yatra-khidkiyaan ${ys.slice(0, 2).map((y) => y.year).join(" aur ")} hain — ${grahaFor(4).grahaHi} aur ${grahaFor(5).grahaHi} dono videsh-gaman dhakelate hain.`
          : "videsh-sanket aane waale parivartan-saalon mein bante hain — 4/5 ke dastak dete hi paasaport chalega.",
      pastEn: (py, inp) =>
        `Movement marked the last decade: ${fmtYearList(py) || "the restless years"} — travel, relocation or foreign contact stirred under ${grahaFor(4).graha}/${grahaFor(5).graha} currents.`,
      pastHi: (py, inp) =>
        `pichhle dashak mein gaman raha: ${fmtYearList(py) || "bechain saalon"} mein — yatra, sthaanaantaran ya videsh-sampark, ${grahaFor(4).grahaHi}/${grahaFor(5).grahaHi} ki dhaara men.`,
      nowEn: (curPy, inp) =>
        curPy === 4 || curPy === 5
          ? `This year movement is written (${grahaFor(curPy).graha}): travel, transfer or foreign contact — apply now, the window is open.`
          : `This year keeps you rooted — ${grahaFor(curPy).graha} completes local karma first; the foreign window follows at years ${fmtYearList(windowsFor(inp, [4, 5, 7], inp.nowYear + 1, inp.nowYear + 10, 2, "", ""))}.`,
      nowHi: (curPy, inp) =>
        curPy === 4 || curPy === 5
          ? `is saal gaman likha hai (${grahaFor(curPy).grahaHi}): yatra, tabaadala ya videsh-sampark — abhi aavedan karo, khidki khui hai.`
          : `is saal jadaen mazboot rai jaati hain — ${grahaFor(curPy).grahaHi} pehle sthaaneey karm poora karaata hai; videsh-khidki saal ${fmtYearList(windowsFor(inp, [4, 5, 7], inp.nowYear + 1, inp.nowYear + 10, 2, "", ""))} men.`,
      futureEn: (ys) =>
        ys.length > 0
          ? `Travel windows: ${fmtYearList(ys)} (ages ${ys.map((y) => y.age).join(", ")}) — ${grahaFor(7).graha} years add long stays for study/research; settlement signals strengthen in ${grahaFor(4).graha} years.`
          : "Rooted years now; the movement chapters come at the next 4/5 cycle.",
      futureHi: (ys) =>
        ys.length > 0
          ? `yatra-khidkiyaan: ${fmtYearList(ys)} (umra ${ys.map((y) => y.age).join(", ")}) — ${grahaFor(7).grahaHi} saal adhyayan/shodh ke lnbe pravaas jodate hain; ${grahaFor(4).grahaHi}-saalon mein videsh-vaas ke sanket pakke hote hain.`
          : "abhi jadon ke saal; gaman-adhyay agle 4/5 chakra par aaege.",
    },
    eldercare: {
      areaId: "eldercare",
      titleEn: "Elders & Family Care",
      titleHi: "bade aur parivaar-seva",
      loveYears: [6, 2, 4],
      pinBoost: [6],
      hookEn: (ys) =>
        ys.length > 0
          ? `Care-duty peaks: ${ys.slice(0, 2).map((y) => y.year).join(" and ")} — the years when elders' comfort needs your calendar, not just your prayers.`
          : "The care-chapters arrive with the family years — keep the Sundays for the elders from now.",
      hookHi: (ys) =>
        ys.length > 0
          ? `seva-daayitv ki choti: ${ys.slice(0, 2).map((y) => y.year).join(" aur ")} — woh saal jab badon ka aaraam aapke kailendar maagega, keval praarthana nahi.`
          : "seva-adhyay parivaarik saalon ke saath aate hain — Ravivaar ab se badon ke naam rakho.",
      pastEn: (py, inp) =>
        `Elders' needs shaped ${fmtYearList(py) || "the home years"} — in ${grahaFor(6).graha}/${grahaFor(2).graha} years the family's centre of gravity shifted toward care.`,
      pastHi: (py, inp) =>
        `badon ki zaroorat ne ${fmtYearList(py) || "grih-saalon"} ko roop diyaa — ${grahaFor(6).grahaHi}/${grahaFor(2).grahaHi} saalon mein parivaar ka kendra-bhaar seva ki or badha.`,
      nowEn: (curPy) =>
        curPy === 6 || curPy === 2
          ? `This period needs extra care for the elders of the family — their comfort and rest deserve a watchful eye this year (${grahaFor(curPy).graha} rules the home).`
          : `This year family-care runs steady — keep the weekly call and the Sunday visit; ${grahaFor(curPy).graha} holds the house while you build outside.`,
      nowHi: (curPy) =>
        curPy === 6 || curPy === 2
          ? `is daur mein parivaar ke badon ka dhyaan zyada chaahie — unai sehat aur aaraam par is saal vishesh nazar rakho (${grahaFor(curPy).grahaHi} ghar ka mukhiyaa hai).`
          : `is saal parivaar-seva sntulit chalei — weekly baat aur Ravivaar ki mulaakaat banaae rakho; ${grahaFor(curPy).grahaHi} ghar snbhaalega jab aap bahar banaaege.`,
      futureEn: (ys) =>
        ys.length > 0
          ? `Care windows: ${fmtYearList(ys)} (ages ${ys.map((y) => y.age).join(", ")}) — responsibility themes peak; plan support, comfort and company for the elders in those years.`
          : "The duty chapters come with the family years — prepare the weekly ritual from now.",
      futureHi: (ys) =>
        ys.length > 0
          ? `seva-khidkiyaan: ${fmtYearList(ys)} (umra ${ys.map((y) => y.age).join(", ")}) — zimmewari ke vishay wahin charam par; un saalon mein badon ke liye sahaara, aaraam aur saath pehle se yojana mein rakho.`
          : "kartavya-adhyay parivaarik saalon ke saath aate hain — weekly vrat ab se taiyaar rakho.",
    },
    friends: {
      areaId: "friends",
      titleEn: "Friendships & Alliances",
      titleHi: "mitrata aur sngati",
      loveYears: [3, 5, 9],
      pinBoost: [3, 5],
      hookEn: (ys) =>
        ys.length > 0
          ? `Alliance years: ${ys.slice(0, 2).map((y) => y.year).join(" and ")} — ${grahaFor(3).graha} and ${grahaFor(5).graha} crowd your life with useful people.`
          : "Alliances form in the expressive years ahead — the network builds itself when 3/5 arrive.",
      hookHi: (ys) =>
        ys.length > 0
          ? `sang-saal: ${ys.slice(0, 2).map((y) => y.year).join(" aur ")} — ${grahaFor(3).grahaHi} aur ${grahaFor(5).grahaHi} aapki jaindai kaam ke logon se bhar denge.`
          : "sngati aane waale abhivyakti-saalon mein banei — 3/5 aate hi network svayn judaega.",
      pastEn: (py, inp) =>
        `Friendship tested and blessed the last decade: ${fmtYearList(py) || "the social years"} — new alliances under ${grahaFor(3).graha}, and at least one trust-lesson under ${grahaFor(4).graha}/${grahaFor(7).graha}.`,
      pastHi: (py, inp) =>
        `mitrata ne pichhle dashak mein parakha aur puraskrit bhi kiyaa: ${fmtYearList(py) || "saamaajik saalon"} mein — ${grahaFor(3).grahaHi} ke nae sang, aur kam-se-kam ek vishvaas-paath ${grahaFor(4).grahaHi}/${grahaFor(7).grahaHi} men.`,
      nowEn: (curPy) =>
        curPy === 3 || curPy === 5
          ? `This year your circle widens (${grahaFor(curPy).graha}) — useful alliances form; say yes to the right rooms.`
          : `This year keeps the circle small and true — ${grahaFor(curPy).graha} filters friends; old ones stay, ornamental ones go.`,
      nowHi: (curPy) =>
        curPy === 3 || curPy === 5
          ? `is saal aapka ghera badhaega (${grahaFor(curPy).grahaHi}) — kaam ki sngatiyaa baneni; sahi kamaron mein ha kahie.`
          : `is saal ghera chhota aur sachcha rahega — ${grahaFor(curPy).grahaHi} dost chhaatega; puraane rahenge, dikhaavai jaaege.`,
      futureEn: (ys) =>
        ys.length > 0
          ? `Alliance windows: ${fmtYearList(ys)} (ages ${ys.map((y) => y.age).join(", ")}). Caution-in-trust applies in ${grahaFor(4).graha}/${grahaFor(7).graha} years — 'naye dosti mein vishwas se pehle samajhdari'.`
          : "The network years approach — keep the loyal three; the crowd follows them.",
      futureHi: (ys) =>
        ys.length > 0
          ? `sang-khidkiyaan: ${fmtYearList(ys)} (umra ${ys.map((y) => y.age).join(", ")}). ${grahaFor(4).grahaHi}/${grahaFor(7).grahaHi}-saalon mein 'naee dosti mein vishvaas se pehle samajhadaaree' laagoo.`
          : "network-saal paas hain — vaphaadaar teeno ko rakho; bheed unhi ke peechhe aaei.",
    },
    spine: {
      areaId: "spine",
      titleEn: "Your Life Spine — Past, Now, Coming",
      titleHi: "aapki jeevan-rekha — ateet, vartmaan, aage",
      loveYears: [1, 8, 9],
      pinBoost: [],
      hookEn: (ys) =>
        ys.length > 0
          ? `The spine years that decide everything: ${ys.slice(0, 3).map((y) => y.year).join(", ")} — peaks, money-years and completions.`
          : "The spine reads steady — peaks arrive at the next 1/8/9 cycle.",
      hookHi: (ys) =>
        ys.length > 0
          ? `woh saal jo sab tay karte hain: ${ys.slice(0, 3).map((y) => y.year).join(", ")} — shikhar, dhan-saal aur samaapan.`
          : "jeevan-rekha sthir padhi gaee — agle 1/8/9 chakra par shikhar aaege.",
      pastEn: (py, inp) =>
        `The last decade ran a full cycle: ${fmtYearList(py) || "the passage years"} covered ${grahaFor(9).graha}'s completion and ${grahaFor(1).graha}'s restart — you crossed both.`,
      pastHi: (py, inp) =>
        `pichhle dashak ne poora chakra chalaayaa: ${fmtYearList(py) || "pravaas-saalon"} mein ${grahaFor(9).grahaHi} ka samaapan aur ${grahaFor(1).grahaHi} ka aarambh — dono aapne paar kie.`,
      nowEn: (curPy) =>
        `You stand in Personal Year ${curPy} (${grahaFor(curPy).graha}) — ${curPy === 1 ? "the plan year: name the mission." : curPy === 8 ? "the money year: collect and build." : curPy === 9 ? "the closing year: finish what hangs." : "the working year: keep the pace."}`,
      nowHi: (curPy) =>
        `aap vyaktigat saal ${curPy} (${grahaFor(curPy).grahaHi}) mein khadae hain — ${curPy === 1 ? "yojana ka saal: lakshya naam dein." : curPy === 8 ? "dhan ka saal: vasoolen aur banaae." : curPy === 9 ? "samaapan ka saal: lataka hua poora karein." : "karm ka saal: lay banaae rakhein."}`,
      futureEn: (ys) =>
        ys.length > 0
          ? `The decade ahead: peaks at ${fmtYearList(ys)} (ages ${ys.map((y) => y.age).join(", ")}) — money-years and completion-years alternate; the graph shows every peak.`
          : "The decade ahead reads steady — its peaks will be marked on the graph as they come.",
      futureHi: (ys) =>
        ys.length > 0
          ? `aane waala dashak: shikhar ${fmtYearList(ys)} (umra ${ys.map((y) => y.age).join(", ")}) mein — dhan-saal aur samaapan-saal baari-baari; graph har choti dikhaata hai.`
          : "aane waala dashak sthir padha gaya — usake shikhar aane par graph chihnit karega.",
    },
  };
  return S[areaId];
}

/** All ten life-area ids (order = report order). */
export const LIFE_AREA_IDS = [
  "spine", "love", "intimacy", "business", "job",
  "money", "children", "foreign", "eldercare", "friends",
] as const;

/**
 * Build the full life-area report. For each section: past scan (last 10y),
 * current PY reading, future windows (next 10y), remedy.
 */
export function buildLifeAreaReport(inp: AreaInput): LifeAreaReport {
  const sections: AreaSection[] = [];
  const curPy = pyFor(inp, inp.nowYear);

  for (const id of LIFE_AREA_IDS) {
    const spec = specFor(id);
    const future = windowsFor(inp, spec.loveYears, inp.nowYear, inp.nowYear + 10, 4, "window year", "khidki-saal", spec.pinBoost);
    const past = windowsFor(inp, spec.loveYears, inp.nowYear - 10, inp.nowYear - 1, 3, "past window", "puraai khidki", spec.pinBoost);
    sections.push({
      areaId: spec.areaId,
      titleEn: spec.titleEn,
      titleHi: spec.titleHi,
      hookEn: spec.hookEn(future, curPy),
      hookHi: spec.hookHi(future, curPy),
      pastEn: spec.pastEn(past, inp),
      pastHi: spec.pastHi(past, inp),
      nowEn: spec.nowEn(curPy, inp),
      nowHi: spec.nowHi(curPy, inp),
      futureEn: spec.futureEn(future, curPy),
      futureHi: spec.futureHi(future, curPy),
      windows: future,
      remedyEn: AREA_REMEDY_EN[id],
      remedyHi: AREA_REMEDY_HI[id],
    });
  }

  return {
    sections,
    steps: [
      "Each section scans Personal Years (birth month + birth day + calendar year, reduced) over the last decade, this year, and the next ten.",
      "Window years = the PYs tradition assigns to that life-area (2/6/7 love; 8/4 job; 6/9 intimacy; 1/3/8 business…), boosted by matching Pinnacle numbers.",
      "Windows carry year + age so the reader can plan against the calendar.",
      "Remedies follow the school's planet-mantra-japa-daan deck, rewritten in safe language.",
    ],
  };
}

/** Hook test helper: does a section carry concrete years/ages? */
export function hasConcreteYears(s: AreaSection): boolean {
  const text = `${s.hookEn} ${s.futureEn}`;
  const yearHits = /\b(19|20)\d{2}\b/.test(text);
  return yearHits && (s.windows.length > 0 || /age|umra/.test(text));
}