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
  love: "शुक्र को बल दें: शुक्रवार को सफ़ेद वस्त्र/मिश्री का दान, 'ॐ शुक्राय नमः' का 108 जप, और रिश्ते में कोमल वाणी — शुक्र नरमी से ही जीतता है।",
  intimacy: "चंद्र-मंगल संतुलन: सोमवार को चंद्र जल-दान, मंगलवार संयम-साधना, 'ॐ चंद्राय नमः' 108 जप — निकटता मन की शांति से गहरी होती है।",
  business: "गुरु-बुध की पूजा: बुधवार को हरे वस्त्र/मूँग दान, गुरुवार को पीला/हल्दी दान, नए सौदे अपनी शुभ तिथि पर — 'ॐ बुधाय नमः' 108 जप।",
  job: "सूर्य-जल अर्पण प्रातःकाल, रविवार आदर-व्रत, 'ॐ सुर्याय नमः' 108 जप; बदलाव के वर्ष (राहु) में काग़ज़ात साफ़ रखें।",
  money: "शनि-लक्ष्मी अनुशासन: शनिवार तेल-दान, रोकड़ा-बही दैनिक, 'ॐ शनैश्चराय नमः' 108 जप; धन-वृद्धि वर्षों में बचत पहले, खर्च बाद।",
  children: "बुध-चंद्र विद्या-व्रत: बुधवार बच्चों के साथ अध्ययन-समय, सोमवार श्वेत दान, 'ॐ बुधाय नमः' 108 जप — बच्चों के अंक-विकास पर ध्यान।",
  foreign: "राहु-चंद्र यात्रा-व्रत: शनिवार सप्तधान्य दान, यात्रा से पूर्व 'ॐ राहवे नमः' 108 जप, विदेश-कार्य अपनी शुभ तिथि पर आरंभ करें।",
  eldercare: "सूर्य-शनि सेवा-व्रत: रविवार बड़ों की सेवा विशेष, शनिवार तेल/काले वस्त्र दान, 'ॐ शनैश्चराय नमः' 108 जप — सेवा ही इस दौर का उपाय है।",
  friends: "बुध-गुरु संग-व्रत: बुधवार हरा दान, नई मुलाक़ात शुभ दिन पर, 'ॐ गुरवे नमः' 108 जप — अच्छा संग ही सबसे बड़ा उपाय।",
  spine: "प्रतिदिन प्रातः सूर्य-जल अर्पण और 'ॐ' का 11 बार उच्चारण — मूलांक और भाग्यांक दोनों का संतुलन इसी दैनिक क्रम से बनता है।",
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
      titleHi: "प्रेम, रोमांच और विवाह",
      loveYears: [2, 6, 7],
      pinBoost: [2, 6],
      hookEn: (ys) =>
        ys.length > 0
          ? `The two strongest years for love in your chart are ${ys.slice(0, 2).map((y) => y.year).join(" and ")} — the ${grahaFor(6).graha} and ${grahaFor(2).graha} windows.`
          : "Your love-windows sit in the coming decade — the chart keeps the best chapters later on purpose.",
      hookHi: (ys) =>
        ys.length > 0
          ? `शादी/प्रेम के लिए आपकी चार्ट में दो सबसे दमदार साल ${ys.slice(0, 2).map((y) => y.year).join(" और ")} हैं — ${grahaFor(6).grahaHi} और ${grahaFor(2).grahaHi} की खिड़कियाँ।`
          : "आपकी प्रेम-खिड़कियाँ आने वाले दशक में हैं — चार्ट ने सबसे अच्छे अध्याय जान-बूझकर बाद में रखे हैं।",
      pastEn: (py, inp) =>
        `Love did not pass you by in the last decade: the ${pyFor(inp, inp.nowYear - 5)}-year ${fmtYearList(py) || "years"} carried ${grahaFor(2).graha} tides — a bond either formed, deepened or taught you its lesson there.`,
      pastHi: (py, inp) =>
        `पिछले दशक में प्रेम आपसे गुज़रा: ${fmtYearList(py) || "उस दौर"} के ${grahaFor(2).grahaHi}-प्रधान वर्षों में कोई बंधन बना, गहरा हुआ या उसने अपनी सीख दी।`,
      nowEn: (curPy, inp) =>
        curPy === 2 || curPy === 6 || curPy === 7
          ? `Right now you stand inside a love-window (Personal Year ${curPy}): ${grahaFor(curPy).graha} is awake in your chart — this IS the season to move the relationship forward, not next year.`
          : `Currently ${grahaFor(curPy).graha} rules — love moves at ${grahaFor(curPy).graha}'s pace this year: ${curPy === 8 ? "status and security over romance; the heart settles after the money is set." : "steady ground; the next window (years " + fmtYearList(windowsFor(inp, [2, 6, 7], inp.nowYear + 1, inp.nowYear + 10, 2, "", "")) + ") will be louder."}`,
      nowHi: (curPy, inp) =>
        curPy === 2 || curPy === 6 || curPy === 7
          ? `अभी आप प्रेम-खिड़की के भीतर खड़े हैं (व्यक्तिगत वर्ष ${curPy}): चार्ट में ${grahaFor(curPy).grahaHi} जागृत है — रिश्ता आगे बढ़ाने का यही मौसम है, अगला साल नहीं।`
          : `इस वर्ष ${grahaFor(curPy).grahaHi} का राज है — प्रेम इसी की गति से चलेगा: ${curPy === 8 ? "पहले स्थिरता और अर्थ, फिर मन; पैसा तय होगा तो मन बैठेगा।" : "स्थिर ज़मीन; अगली खिड़की (वर्ष " + fmtYearList(windowsFor(inp, [2, 6, 7], inp.nowYear + 1, inp.nowYear + 10, 2, "", "")) + ") और दमदार होगी।"}`,
      futureEn: (ys) =>
        ys.length > 0
          ? `Ahead, the marriage/love windows open at ages ${ys.map((y) => y.age).join(", ")} — years ${fmtYearList(ys)}. PY 2 bonds, PY 6 commits, PY 7 deepens; the strongest of these is ${ys[0].year} (age ${ys[0].age}).`
          : "The coming decade holds the commitment chapters — the graph marks them as they approach.",
      futureHi: (ys) =>
        ys.length > 0
          ? `आगे विवाह/प्रेम की खिड़कियाँ उम्र ${ys.map((y) => y.age).join(", ")} में खुलती हैं — वर्ष ${fmtYearList(ys)}। अंक 2 बंधन, 6 संकल्प, 7 गहराई; इनमें सबसे प्रबल ${ys[0].year} (उम्र ${ys[0].age})।`
          : "आने वाला दशक संकल्प-अध्याय रखता है — ग्राफ़ उन्हें पास आने पर चिह्नित करेगा।",
    },
    intimacy: {
      areaId: "intimacy",
      titleEn: "Intimacy & Passion",
      titleHi: "निकटता और मोहब्बत की गहराई",
      loveYears: [6, 9, 2],
      pinBoost: [6, 9],
      hookEn: (ys) =>
        ys.length > 0
          ? `Passion peaks in your chart at ${ys.slice(0, 2).map((y) => y.year).join(" and ")} — ${grahaFor(9).graha} drive meeting ${grahaFor(6).graha} charm.`
          : "The passion chapters of your chart open further out — dignity and depth, never noise.",
      hookHi: (ys) =>
        ys.length > 0
          ? `आपके चार्ट में पैशन की चोटी ${ys.slice(0, 2).map((y) => y.year).join(" और ")} में है — ${grahaFor(9).grahaHi} का जोश, ${grahaFor(6).grahaHi} का नैन-नक़श।`
          : "आपके चार्ट के पैशन-अध्याय थोड़े आगे खुलते हैं — गरिमा और गहराई, शोर नहीं।",
      pastEn: (py, inp) =>
        `In the last decade, ${fmtYearList(py) || "the middle years"} ran ${grahaFor(9).graha}/${grahaFor(6).graha} currents — passion ran strong there, and where the two planets clashed, tenderness needed repair.`,
      pastHi: (py, inp) =>
        `पिछले दशक में ${fmtYearList(py) || "बीच के वर्षों"} में ${grahaFor(9).grahaHi}/${grahaFor(6).grahaHi} की धाराएँ चलीं — उस दौर में मोहब्बत में गहराई और जोश दोनों प्रबल रहे।`,
      nowEn: (curPy) =>
        curPy === 6 || curPy === 9
          ? `This year (${grahaFor(curPy).graha}) passion stays strong — closeness deepens when you bring patience along with fire.`
          : `This year is a building year for closeness — ${grahaFor(curPy).graha} asks for trust-building first; the fire follows the foundation.`,
      nowHi: (curPy) =>
        curPy === 6 || curPy === 9
          ? `इस वर्ष (${grahaFor(curPy).grahaHi}) पैशन प्रबल रहता है — आग के साथ धैर्य ले चलें तो निकटता और गहरी होगी।`
          : `यह वर्ष निकटता की नींव रखता है — ${grahaFor(curPy).grahaHi} पहले भरोसा माँगता है; आग नींव के बाद ही चढ़ती है।`,
      futureEn: (ys) =>
        ys.length > 0
          ? `Deep-intimacy years ahead: ${fmtYearList(ys)} (ages ${ys.map((y) => y.age).join(", ")}) — 'mohabbat mein gehrai ka varsh'. Emotional honesty in those years unlocks everything.`
          : "The decade ahead holds quieter, steadier intimacy chapters — depth over fireworks.",
      futureHi: (ys) =>
        ys.length > 0
          ? `आगे गहराई के वर्ष: ${fmtYearList(ys)} (उम्र ${ys.map((y) => y.age).join(", ")}) — 'मोहब्बत में गहराई का वर्ष'। भावनात्मक ईमानदारी इन वर्षों में सब कुछ खोल देगी।`
          : "आने वाला दशक शांत, स्थिर निकटता के अध्याय रखता है — चमक से गहराई बेहतर।",
    },
    business: {
      areaId: "business",
      titleEn: "Business & Enterprise",
      titleHi: "व्यापार और उद्यम",
      loveYears: [1, 3, 8],
      pinBoost: [1, 8],
      hookEn: (ys) =>
        ys.length > 0
          ? `Your chart's strongest launch years are ${ys.slice(0, 2).map((y) => y.year).join(" and ")} — don't open the venture before its window.`
          : "Your venture years are building — the foundation years ARE the launch prep.",
      hookHi: (ys) =>
        ys.length > 0
          ? `आपके चार्ट के सबसे प्रबल लॉन्च-वर्ष ${ys.slice(0, 2).map((y) => y.year).join(" और ")} हैं — खिड़की से पहले उद्यम न खोलें।`
          : "आपके उद्यम-वर्ष बन रहे हैं — नींव के ही वर्ष लॉन्च की तैयारी हैं।",
      pastEn: (py, inp) =>
        `In the past decade, ${fmtYearList(py) || "the working years"} carried expansion currents — ventures tried then either scaled or taught their tuition.`,
      pastHi: (py, inp) =>
        `पिछले दशक के ${fmtYearList(py) || "कार्य-वर्षों"} में विस्तार की धाराएँ थीं — उस दौर के उद्यम या तो बढ़े, या उन्होंने ट्यूशन फ़ीस ली।`,
      nowEn: (curPy) =>
        curPy === 8
          ? `You are standing IN a money-power year (${grahaFor(8).graha}): scale revenue, push the big negotiation now — expansion pays this year.`
          : curPy === 4
            ? `Currently ${grahaFor(4).graha} rules: consolidate, systemise, clean the books — expansion against this grain costs double.`
            : `Currently ${grahaFor(curPy).graha} leads — ${curPy === 5 ? "commerce and contacts expand the trade; keep the ledger daily." : "build the pipeline; the big swing comes at the next 8-year."}`,
      nowHi: (curPy) =>
        curPy === 8
          ? `आप अभी धन-शक्ति के वर्ष में खड़े हैं (${grahaFor(8).grahaHi}): इसी साल रेवेन्यू बढ़ाएँ, बड़ी बातचीत ठीक करें — विस्तार इस वर्ष फलता है।`
          : curPy === 4
            ? `अभी ${grahaFor(4).grahaHi} का राज है: संवर्धन, सिस्टम, बही-खाता साफ़ — इस लय के विरुद्ध विस्तार दोगुना महँगा।`
            : `अभी ${grahaFor(curPy).grahaHi} नेतृत्व कर रहा है — ${curPy === 5 ? "व्यापार और संपर्क बढ़ाएँ; रोकड़ा रोज़ रखें।" : "पाइपलाइन बनाइए; बड़ा दाँव अगले अंक-8 वर्ष में है।"}`,
      futureEn: (ys) =>
        ys.length > 0
          ? `Launch windows: ${fmtYearList(ys)} (ages ${ys.map((y) => y.age).join(", ")}). Partnership years (${grahaFor(5).graha} commerce) follow at ${ys.map((y) => y.year + 1).join(", ")} — expansion vs consolidation is a knife-edge you'll walk there.`
          : "Foundation years ahead are the prep-room of your launch decade.",
      futureHi: (ys) =>
        ys.length > 0
          ? `लॉन्च-खिड़कियाँ: ${fmtYearList(ys)} (उम्र ${ys.map((y) => y.age).join(", ")})। साझेदारी-वर्ष (${grahaFor(5).grahaHi} व्यापार) इसके बाद ${ys.map((y) => y.year + 1).join(", ")} में — विस्तार बनाम संवर्धन वहीं फ़ैसला माँगेगा।`
          : "आगे के नींव-वर्ष आपके लॉन्च-दशक की तैयारी-कक्षा हैं।",
    },
    job: {
      areaId: "job",
      titleEn: "Job & Career",
      titleHi: "नौकरी और करियर",
      loveYears: [1, 4, 8],
      pinBoost: [1, 8],
      hookEn: (ys) =>
        ys.length > 0
          ? `Promotion/change windows: ${ys.slice(0, 2).map((y) => y.year).join(" and ")} — the ${grahaFor(1).graha} and ${grahaFor(8).graha} years decide the ladder.`
          : "The ladder's next rung is being forged in the current foundation years.",
      hookHi: (ys) =>
        ys.length > 0
          ? `प्रमोशन/बदलाव की खिड़कियाँ: ${ys.slice(0, 2).map((y) => y.year).join(" और ")} — सीढ़ी के अगले डग ${grahaFor(1).grahaHi} और ${grahaFor(8).grahaHi} तय करेंगे।`
          : "सीढ़ी की अगली डग इन्हीं नींव-वर्षों में तप रही है।",
      pastEn: (py, inp) =>
        `The last decade's ${fmtYearList(py) || "work years"} moved your job — a switch, a boss-change or a visibility spike happened under ${grahaFor(1).graha}/${grahaFor(4).graha} currents.`,
      pastHi: (py, inp) =>
        `पिछले दशक के ${fmtYearList(py) || "कार्य-वर्षों"} में नौकरी हिली — बदलाव, अध्यक्ष-परिवर्तन या दिखने का उछाल, ${grahaFor(1).grahaHi}/${grahaFor(4).grahaHi} की धारा में।`,
      nowEn: (curPy) =>
        curPy === 1
          ? `This year ${grahaFor(1).graha} hands you the first move: apply, propose, step up — the boss-line (Surya) is listening this year.`
          : curPy === 4
            ? `${grahaFor(4).graha} years break routine on purpose — a job-switch urge is real; move deliberately, keep offers in writing.`
            : `This year rewards steady mastery over job-hopping — ${grahaFor(curPy).graha} tests patience before promotion.`,
      nowHi: (curPy) =>
        curPy === 1
          ? `इस वर्ष ${grahaFor(1).grahaHi} आपको पहला कदम देता है: आवेदन, प्रस्ताव, उत्तरदायित्व — सूर्य-रेखा इस साल सुन रही है।`
          : curPy === 4
            ? `${grahaFor(4).grahaHi} वर्ष रुटीन जान-बूझकर तोड़ता है — नौकरी-बदलाव की इच्छा सच्ची है; सोच-समझकर चलें, प्रस्ताव लिखित रखें।`
            : `यह वर्ष नौकरी-बदली से ज़्यादा स्थिर महारत को पुरस्कृत करता है — ${grahaFor(curPy).grahaHi} प्रमोशन से पहले धैर्य की परीक्षा लेता है।`,
      futureEn: (ys) =>
        ys.length > 0
          ? `Job windows: ${fmtYearList(ys)} (ages ${ys.map((y) => y.age).join(", ")}) — ${grahaFor(8).graha} brings position, ${grahaFor(4).graha} brings the switch. Boss-relations ease in ${grahaFor(1).graha} years.`
          : "The coming years build the resume the next window will spend.",
      futureHi: (ys) =>
        ys.length > 0
          ? `नौकरी-खिड़कियाँ: ${fmtYearList(ys)} (उम्र ${ys.map((y) => y.age).join(", ")}) — ${grahaFor(8).grahaHi} पद देगा, ${grahaFor(4).grahaHi} बदलाव। ${grahaFor(1).grahaHi}-वर्षों में अध्यक्ष-संबंध सरल होंगे।`
          : "आगे के वर्ष वह रिज़्यूमे बनाएँगे जिसे अगली खिड़की ख़र्च करेगी।",
    },
    money: {
      areaId: "money",
      titleEn: "Money & Wealth",
      titleHi: "धन और संपत्ति",
      loveYears: [8, 5, 3],
      pinBoost: [8, 5],
      hookEn: (ys) =>
        ys.length > 0
          ? `Your earning years: ${ys.slice(0, 2).map((y) => y.year).join(" and ")}. ${grahaFor(8).graha} pays the disciplined — save in those years and the compounding is permanent.`
          : "Wealth-building starts in the current consolidation years — seed money now.",
      hookHi: (ys) =>
        ys.length > 0
          ? `आपके कमाई के वर्ष: ${ys.slice(0, 2).map((y) => y.year).join(" और ")}। ${grahaFor(8).grahaHi} अनुशासनी को देता है — उन्हीं वर्षों में बचत कीजिए, चक्रवृद्धि स्थायी होगी।`
          : "धन-निर्माण इन्हीं संवर्धन-वर्षों से शुरू होता है — अभी बीज-धन जुटाइए।",
      pastEn: (py, inp) =>
        `The last decade mixed earning and leaking: ${fmtYearList(py) || "the money years"} paid well under ${grahaFor(8).graha}/${grahaFor(5).graha}, while ${grahaFor(4).graha} years taught where money leaks.`,
      pastHi: (py, inp) =>
        `पिछले दशक में कमाई और चूहेदानी दोनों चलीं: ${fmtYearList(py) || "धन-वर्षों"} में ${grahaFor(8).grahaHi}/${grahaFor(5).grahaHi} ने अच्छा दिया, ${grahaFor(4).grahaHi}-वर्षों ने चूक की जगह दिखाई।`,
      nowEn: (curPy) =>
        curPy === 8
          ? `This IS a money year (${grahaFor(8).graha}): chase receivables, negotiate hard, invest the surplus — don't hoard cash idle.`
          : curPy === 4
            ? `This year is for SAVING, not spending: ${grahaFor(4).graha} builds the vault. Avoid big loans this year.`
            : `Money moves moderately this year — ${grahaFor(curPy).graha} wants the ledger daily and the speculation small.`,
      nowHi: (curPy) =>
        curPy === 8
          ? `यह धन-वर्ष है (${grahaFor(8).grahaHi}): बकाया वसूलें, सख़्त मोल-भाव करें, बचत निवेश करें — नक़द बेकार न पड़े रहने दें।`
          : curPy === 4
            ? `यह वर्ष बचत का है, ख़र्च का नहीं: ${grahaFor(4).grahaHi} तिजोरी बनाता है। बड़ा क़र्ज़ इस साल टालें।`
            : `इस वर्ष धन संयम से चलेगा — ${grahaFor(curPy).grahaHi} रोज़ बही-खाता और छोटा सट्टा चाहता है।`,
      futureEn: (ys) =>
        ys.length > 0
          ? `Wealth stretches: ${fmtYearList(ys)} (ages ${ys.map((y) => y.age).join(", ")}). Watch money-leaks in ${grahaFor(4).graha} years; ${grahaFor(8).graha} years convert discipline into assets — property/long holdings favour those years.`
          : "The saving years now fund the earning years later — the graph shows the handover.",
      futureHi: (ys) =>
        ys.length > 0
          ? `धन-विस्तार: ${fmtYearList(ys)} (उम्र ${ys.map((y) => y.age).join(", ")})। ${grahaFor(4).grahaHi}-वर्षों में चूहेदानी से सावधान; ${grahaFor(8).grahaHi}-वर्ष अनुशासन को संपत्ति में बदलते हैं — ज़मीन/लंबी होल्डिंग उन्हीं के लिए है।`
          : "आज के बचत-वर्ष कल के कमाई-वर्षों को वित्त देंगे — ग्राफ़ यह हस्तांतरण दिखाता है।",
    },
    children: {
      areaId: "children",
      titleEn: "Children & Family Growth",
      titleHi: "संतान और परिवार-वृद्धि",
      loveYears: [6, 2, 5],
      pinBoost: [6, 2],
      hookEn: (ys) =>
        ys.length > 0
          ? `Family-growth years: ${ys.slice(0, 2).map((y) => y.year).join(" and ")} — ${grahaFor(6).graha} and ${grahaFor(2).graha} periods carry home-responsibility themes.`
          : "Family chapters build in the quieter years — responsibility ripens before arrival.",
      hookHi: (ys) =>
        ys.length > 0
          ? `परिवार-वृद्धि के वर्ष: ${ys.slice(0, 2).map((y) => y.year).join(" और ")} — ${grahaFor(6).grahaHi} और ${grahaFor(2).grahaHi} के दौर गृह-ज़िम्मेदारी के विषय लाते हैं।`
          : "परिवार-अध्याय शांत वर्षों में बनते हैं — ज़िम्मेदारी पहले पकती है, आगमन बाद में।",
      pastEn: (py, inp) =>
        `Family duty shaped ${fmtYearList(py) || "the home years"} of the last decade — household moves, family functions, or caretaking filled those years.`,
      pastHi: (py, inp) =>
        `परिवार-कर्तव्य ने पिछले दशक के ${fmtYearList(py) || "गृह-वर्षों"} को रूप दिया — घर की अदला-बदली, लोक-आचार, या देखरेखा ने वर्ष भर दिए।`,
      nowEn: (curPy) =>
        curPy === 6 || curPy === 2
          ? `This year home takes the front seat (${grahaFor(curPy).graha}): family decisions, home beautification, bonding time — the house rewards attention now.`
          : `This year family matters run at maintenance level — ${grahaFor(curPy).graha} keeps home steady while outer work leads.`,
      nowHi: (curPy) =>
        curPy === 6 || curPy === 2
          ? `इस वर्ष घर आगे बैठेगा (${grahaFor(curPy).grahaHi}): पारिवारिक निर्णय, घर की शोभा, साथ बिताया समय — घर अभी ध्यान का फल देता है।`
          : `इस वर्ष घर-बाहर का संतुलन बना रहेगा — ${grahaFor(curPy).grahaHi} घर को स्थिर रखेगा जबकि बाहरी काम आगे चलेगा।`,
      futureEn: (ys) =>
        ys.length > 0
          ? `Family-growth windows: ${fmtYearList(ys)} (ages ${ys.map((y) => y.age).join(", ")}) — home responsibility themes peak there; children's education decisions also cluster in these years.`
          : "The coming decade carries quieter family chapters — steadiness is its own blessing.",
      futureHi: (ys) =>
        ys.length > 0
          ? `परिवार-वृद्धि की खिड़कियाँ: ${fmtYearList(ys)} (उम्र ${ys.map((y) => y.age).join(", ")}) — गृह-ज़िम्मेदारी के विषय वहीं शिखर पर; बच्चों की शिक्षा के निर्णय भी इन्हीं वर्षों में जमते हैं।`
          : "आने वाला दशक शांत पारिवारिक अध्याय रखता है — स्थिरता स्वयं वरदान है।",
    },
    foreign: {
      areaId: "foreign",
      titleEn: "Foreign Travel & Settlement",
      titleHi: "विदेश यात्रा और विदेश-वास",
      loveYears: [4, 5, 7],
      pinBoost: [4, 5],
      hookEn: (ys) =>
        ys.length > 0
          ? `'Videsh yatra ke sanket': your travel windows are ${ys.slice(0, 2).map((y) => y.year).join(" and ")} — ${grahaFor(4).graha} and ${grahaFor(5).graha} both push movement abroad.`
          : "Abroad-signals build in the coming change-years — passports get stamped when 4/5 knock.",
      hookHi: (ys) =>
        ys.length > 0
          ? `'विदेश यात्रा के संकेत': आपकी यात्रा-खिड़कियाँ ${ys.slice(0, 2).map((y) => y.year).join(" और ")} हैं — ${grahaFor(4).grahaHi} और ${grahaFor(5).grahaHi} दोनों विदेश-गमन धकेलते हैं।`
          : "विदेश-संकेत आने वाले परिवर्तन-वर्षों में बनते हैं — 4/5 के दस्तक देते ही पासपोर्ट चलेगा।",
      pastEn: (py, inp) =>
        `Movement marked the last decade: ${fmtYearList(py) || "the restless years"} — travel, relocation or foreign contact stirred under ${grahaFor(4).graha}/${grahaFor(5).graha} currents.`,
      pastHi: (py, inp) =>
        `पिछले दशक में गमन रहा: ${fmtYearList(py) || "बेचैन वर्षों"} में — यात्रा, स्थानांतरण या विदेश-संपर्क, ${grahaFor(4).grahaHi}/${grahaFor(5).grahaHi} की धारा में।`,
      nowEn: (curPy, inp) =>
        curPy === 4 || curPy === 5
          ? `This year movement is written (${grahaFor(curPy).graha}): travel, transfer or foreign contact — apply now, the window is open.`
          : `This year keeps you rooted — ${grahaFor(curPy).graha} completes local karma first; the foreign window follows at years ${fmtYearList(windowsFor(inp, [4, 5, 7], inp.nowYear + 1, inp.nowYear + 10, 2, "", ""))}.`,
      nowHi: (curPy, inp) =>
        curPy === 4 || curPy === 5
          ? `इस वर्ष गमन लिखा है (${grahaFor(curPy).grahaHi}): यात्रा, तबादला या विदेश-संपर्क — अभी आवेदन कीजिए, खिड़की खुली है।`
          : `इस वर्ष जड़ें मज़बूत रखी जाती हैं — ${grahaFor(curPy).grahaHi} पहले स्थानीय कर्म पूरा कराता है; विदेश-खिड़की वर्ष ${fmtYearList(windowsFor(inp, [4, 5, 7], inp.nowYear + 1, inp.nowYear + 10, 2, "", ""))} में।`,
      futureEn: (ys) =>
        ys.length > 0
          ? `Travel windows: ${fmtYearList(ys)} (ages ${ys.map((y) => y.age).join(", ")}) — ${grahaFor(7).graha} years add long stays for study/research; settlement signals strengthen in ${grahaFor(4).graha} years.`
          : "Rooted years now; the movement chapters come at the next 4/5 cycle.",
      futureHi: (ys) =>
        ys.length > 0
          ? `यात्रा-खिड़कियाँ: ${fmtYearList(ys)} (उम्र ${ys.map((y) => y.age).join(", ")}) — ${grahaFor(7).grahaHi} वर्ष अध्ययन/शोध के लंबे प्रवास जोड़ते हैं; ${grahaFor(4).grahaHi}-वर्षों में विदेश-वास के संकेत पक्के होते हैं।`
          : "अभी जड़ों के वर्ष; गमन-अध्याय अगले 4/5 चक्र पर आएँगे।",
    },
    eldercare: {
      areaId: "eldercare",
      titleEn: "Elders & Family Care",
      titleHi: "बड़े और परिवार-सेवा",
      loveYears: [6, 2, 4],
      pinBoost: [6],
      hookEn: (ys) =>
        ys.length > 0
          ? `Care-duty peaks: ${ys.slice(0, 2).map((y) => y.year).join(" and ")} — the years when elders' comfort needs your calendar, not just your prayers.`
          : "The care-chapters arrive with the family years — keep the Sundays for the elders from now.",
      hookHi: (ys) =>
        ys.length > 0
          ? `सेवा-दायित्व की चोटी: ${ys.slice(0, 2).map((y) => y.year).join(" और ")} — वो वर्ष जब बड़ों का आराम आपके कैलेंडर माँगेगा, केवल प्रार्थना नहीं।`
          : "सेवा-अध्याय पारिवारिक वर्षों के साथ आते हैं — रविवार अब से बड़ों के नाम रखिए।",
      pastEn: (py, inp) =>
        `Elders' needs shaped ${fmtYearList(py) || "the home years"} — in ${grahaFor(6).graha}/${grahaFor(2).graha} years the family's centre of gravity shifted toward care.`,
      pastHi: (py, inp) =>
        `बड़ों की ज़रूरत ने ${fmtYearList(py) || "गृह-वर्षों"} को रूप दिया — ${grahaFor(6).grahaHi}/${grahaFor(2).grahaHi} वर्षों में परिवार का केंद्र-भार सेवा की ओर बढ़ा।`,
      nowEn: (curPy) =>
        curPy === 6 || curPy === 2
          ? `This period needs extra care for the elders of the family — their comfort and rest deserve a watchful eye this year (${grahaFor(curPy).graha} rules the home).`
          : `This year family-care runs steady — keep the weekly call and the Sunday visit; ${grahaFor(curPy).graha} holds the house while you build outside.`,
      nowHi: (curPy) =>
        curPy === 6 || curPy === 2
          ? `इस दौर में परिवार के बड़ों का ध्यान ज़्यादा चाहिए — उनकी सेहत और आराम पर इस वर्ष विशेष नज़र रखिए (${grahaFor(curPy).grahaHi} घर का मुखिया है)।`
          : `इस वर्ष परिवार-सेवा संतुलित चलेगी — साप्ताहिक बात और रविवार की मुलाक़ात बनाए रखिए; ${grahaFor(curPy).grahaHi} घर संभालेगा जब आप बाहर बनाएँगे।`,
      futureEn: (ys) =>
        ys.length > 0
          ? `Care windows: ${fmtYearList(ys)} (ages ${ys.map((y) => y.age).join(", ")}) — responsibility themes peak; plan support, comfort and company for the elders in those years.`
          : "The duty chapters come with the family years — prepare the weekly ritual from now.",
      futureHi: (ys) =>
        ys.length > 0
          ? `सेवा-खिड़कियाँ: ${fmtYearList(ys)} (उम्र ${ys.map((y) => y.age).join(", ")}) — ज़िम्मेदारी के विषय वहीं चरम पर; उन वर्षों में बड़ों के लिए सहारा, आराम और साथ पहले से योजना में रखिए।`
          : "कर्तव्य-अध्याय पारिवारिक वर्षों के साथ आते हैं — साप्ताहिक व्रत अब से तैयार रखिए।",
    },
    friends: {
      areaId: "friends",
      titleEn: "Friendships & Alliances",
      titleHi: "मित्रता और संगति",
      loveYears: [3, 5, 9],
      pinBoost: [3, 5],
      hookEn: (ys) =>
        ys.length > 0
          ? `Alliance years: ${ys.slice(0, 2).map((y) => y.year).join(" and ")} — ${grahaFor(3).graha} and ${grahaFor(5).graha} crowd your life with useful people.`
          : "Alliances form in the expressive years ahead — the network builds itself when 3/5 arrive.",
      hookHi: (ys) =>
        ys.length > 0
          ? `संग-वर्ष: ${ys.slice(0, 2).map((y) => y.year).join(" और ")} — ${grahaFor(3).grahaHi} और ${grahaFor(5).grahaHi} आपकी ज़िंदगी काम के लोगों से भर देंगे।`
          : "संगति आने वाले अभिव्यक्ति-वर्षों में बनेगी — 3/5 आते ही नेटवर्क स्वयं जुड़ेगा।",
      pastEn: (py, inp) =>
        `Friendship tested and blessed the last decade: ${fmtYearList(py) || "the social years"} — new alliances under ${grahaFor(3).graha}, and at least one trust-lesson under ${grahaFor(4).graha}/${grahaFor(7).graha}.`,
      pastHi: (py, inp) =>
        `मित्रता ने पिछले दशक में परखा और पुरस्कृत भी किया: ${fmtYearList(py) || "सामाजिक वर्षों"} में — ${grahaFor(3).grahaHi} के नए संग, और कम-से-कम एक विश्वास-पाठ ${grahaFor(4).grahaHi}/${grahaFor(7).grahaHi} में।`,
      nowEn: (curPy) =>
        curPy === 3 || curPy === 5
          ? `This year your circle widens (${grahaFor(curPy).graha}) — useful alliances form; say yes to the right rooms.`
          : `This year keeps the circle small and true — ${grahaFor(curPy).graha} filters friends; old ones stay, ornamental ones go.`,
      nowHi: (curPy) =>
        curPy === 3 || curPy === 5
          ? `इस वर्ष आपका घेरा बढ़ेगा (${grahaFor(curPy).grahaHi}) — काम की संगतियाँ बनेंगी; सही कमरों में हाँ कहिए।`
          : `इस वर्ष घेरा छोटा और सच्चा रहेगा — ${grahaFor(curPy).grahaHi} दोस्त छाँटेगा; पुराने रहेंगे, दिखावटी जाएँगे।`,
      futureEn: (ys) =>
        ys.length > 0
          ? `Alliance windows: ${fmtYearList(ys)} (ages ${ys.map((y) => y.age).join(", ")}). Caution-in-trust applies in ${grahaFor(4).graha}/${grahaFor(7).graha} years — 'naye dosti mein vishwas se pehle samajhdari'.`
          : "The network years approach — keep the loyal three; the crowd follows them.",
      futureHi: (ys) =>
        ys.length > 0
          ? `संग-खिड़कियाँ: ${fmtYearList(ys)} (उम्र ${ys.map((y) => y.age).join(", ")})। ${grahaFor(4).grahaHi}/${grahaFor(7).grahaHi}-वर्षों में 'नई दोस्ती में विश्वास से पहले समझदारी' लागू।`
          : "नेटवर्क-वर्ष पास हैं — वफ़ादार तीनों को रखिए; भीड़ उन्हीं के पीछे आएगी।",
    },
    spine: {
      areaId: "spine",
      titleEn: "Your Life Spine — Past, Now, Coming",
      titleHi: "आपकी जीवन-रेखा — अतीत, वर्तमान, आगे",
      loveYears: [1, 8, 9],
      pinBoost: [],
      hookEn: (ys) =>
        ys.length > 0
          ? `The spine years that decide everything: ${ys.slice(0, 3).map((y) => y.year).join(", ")} — peaks, money-years and completions.`
          : "The spine reads steady — peaks arrive at the next 1/8/9 cycle.",
      hookHi: (ys) =>
        ys.length > 0
          ? `वो वर्ष जो सब तय करते हैं: ${ys.slice(0, 3).map((y) => y.year).join(", ")} — शिखर, धन-वर्ष और समापन।`
          : "जीवन-रेखा स्थिर पढ़ी गई — अगले 1/8/9 चक्र पर शिखर आएँगे।",
      pastEn: (py, inp) =>
        `The last decade ran a full cycle: ${fmtYearList(py) || "the passage years"} covered ${grahaFor(9).graha}'s completion and ${grahaFor(1).graha}'s restart — you crossed both.`,
      pastHi: (py, inp) =>
        `पिछले दशक ने पूरा चक्र चलाया: ${fmtYearList(py) || "प्रवास-वर्षों"} में ${grahaFor(9).grahaHi} का समापन और ${grahaFor(1).grahaHi} का आरंभ — दोनों आपने पार किए।`,
      nowEn: (curPy) =>
        `You stand in Personal Year ${curPy} (${grahaFor(curPy).graha}) — ${curPy === 1 ? "the plan year: name the mission." : curPy === 8 ? "the money year: collect and build." : curPy === 9 ? "the closing year: finish what hangs." : "the working year: keep the pace."}`,
      nowHi: (curPy) =>
        `आप व्यक्तिगत वर्ष ${curPy} (${grahaFor(curPy).grahaHi}) में खड़े हैं — ${curPy === 1 ? "योजना का वर्ष: लक्ष्य नाम दें।" : curPy === 8 ? "धन का वर्ष: वसूलें और बनाएँ।" : curPy === 9 ? "समापन का वर्ष: लटका हुआ पूरा करें।" : "कर्म का वर्ष: लय बनाए रखें।"}`,
      futureEn: (ys) =>
        ys.length > 0
          ? `The decade ahead: peaks at ${fmtYearList(ys)} (ages ${ys.map((y) => y.age).join(", ")}) — money-years and completion-years alternate; the graph shows every peak.`
          : "The decade ahead reads steady — its peaks will be marked on the graph as they come.",
      futureHi: (ys) =>
        ys.length > 0
          ? `आने वाला दशक: शिखर ${fmtYearList(ys)} (उम्र ${ys.map((y) => y.age).join(", ")}) में — धन-वर्ष और समापन-वर्ष बारी-बारी; ग्राफ़ हर चोटी दिखाता है।`
          : "आने वाला दशक स्थिर पढ़ा गया — उसके शिखर आने पर ग्राफ़ चिह्नित करेगा।",
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
    const future = windowsFor(inp, spec.loveYears, inp.nowYear, inp.nowYear + 10, 4, "window year", "खिड़की-वर्ष", spec.pinBoost);
    const past = windowsFor(inp, spec.loveYears, inp.nowYear - 10, inp.nowYear - 1, 3, "past window", "पुरानी खिड़की", spec.pinBoost);
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
  return yearHits && (s.windows.length > 0 || /age|उम्र/.test(text));
}