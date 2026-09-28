/**
 * Anko Ki Maya v3 — REMEDY TABLE (owner expansion, 29 Sep).
 *
 * Per missing/weak number: planet + gemstone + color + mantra + japa count
 * (school remedy-hindi deck) + daan guidance. Plus the daily-habits
 * section (Wed/Fri green-white clothes, Tue anger-control, Sat blue-item
 * daan, sunrise meditation) and the Neelam consult note.
 */

export interface ExpandedRemedy {
  number: number;
  planet: string; // EN
  planetHi: string;
  gem: string;
  gemHi: string;
  color: string;
  colorHi: string;
  mantra: string; // Devanagari
  mantraEn: string;
  japa: number;
  daan: string;
  daanHi: string;
  caution?: string; // e.g. Neelam
}

const R: Record<number, ExpandedRemedy> = {
  1: {
    number: 1, planet: "Surya", planetHi: "सूर्य",
    gem: "Ruby (Manik)", gemHi: "माणिक्य (रुबी)", color: "saffron/copper-red", colorHi: "केसरिया/ताम्र-लाल",
    mantra: "ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः", mantraEn: "Om Hraam Hreem Hraum Sah Suryaya Namah",
    japa: 7000, daan: "wheat + jaggery + copper on Sunday at sunrise", daanHi: "रविवार सूर्योदय पर गेहूँ + गुड़ + तांबा",
  },
  2: {
    number: 2, planet: "Chandra", planetHi: "चंद्र",
    gem: "Pearl (Moti)", gemHi: "मोती (मुक्ता)", color: "white/silver", colorHi: "श्वेत/चाँदी",
    mantra: "ॐ श्रां श्रीं श्रौं सः चंद्राय नमः", mantraEn: "Om Shraam Shreem Shraum Sah Chandraya Namah",
    japa: 11000, daan: "white rice + milk + silver on Monday", daanHi: "सोमवार सफ़ेद चावल + दूध + चाँदी",
  },
  3: {
    number: 3, planet: "Guru", planetHi: "गुरु",
    gem: "Yellow Sapphire (Pukhraj)", gemHi: "पुखराज", color: "turmeric-yellow", colorHi: "हल्दी-पीला",
    mantra: "ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः", mantraEn: "Om Graam Greem Graum Sah Gurave Namah",
    japa: 19000, daan: "turmeric + chana dal + yellow cloth on Thursday", daanHi: "गुरुवार हल्दी + चना दाल + पीला वस्त्र",
  },
  4: {
    number: 4, planet: "Rahu", planetHi: "राहु",
    gem: "Hessonite (Gomed)", gemHi: "गोमेद", color: "smoke-grey/electric blue", colorHi: "धूसर/बिजली-नीला",
    mantra: "ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः", mantraEn: "Om Bhraam Bhreem Bhraum Sah Rahave Namah",
    japa: 18000, daan: "mustard oil + black blanket + coconut to the flowing water on Saturday", daanHi: "शनिवार सरसों तेल + काला कंबल + नारियल बहते जल को",
  },
  5: {
    number: 5, planet: "Budh", planetHi: "बुध",
    gem: "Emerald (Panna)", gemHi: "पन्ना", color: "green", colorHi: "हरा",
    mantra: "ॐ प्रां प्रीं प्रौं सः बुधाय नमः", mantraEn: "Om Praam Preem Praum Sah Budhaya Namah",
    japa: 9000, daan: "green moong + green cloth on Wednesday", daanHi: "बुधवार हरी मूँग + हरा वस्त्र",
  },
  6: {
    number: 6, planet: "Shukra", planetHi: "शुक्र",
    gem: "Diamond/White Sapphire (Heera)", gemHi: "हीरा/सफ़ेद पुखराज", color: "white/rose", colorHi: "सफ़ेद/गुलाबी",
    mantra: "ॐ द्रां द्रीं द्रौं सः शुक्राय नमः", mantraEn: "Om Draam Dreem Draum Sah Shukraya Namah",
    japa: 16000, daan: "white sweets + curd + rice on Friday", daanHi: "शुक्रवार सफ़ेद मिठाई + दही + चावल",
  },
  7: {
    number: 7, planet: "Ketu", planetHi: "केतु",
    gem: "Cat's Eye (Lehsunia)", gemHi: "लहसुनिया", color: "cream/smoke-brown", colorHi: "क्रीम/धूएँ-भूरा",
    mantra: "ॐ स्रां स्रीं स्रौं सः केतवे नमः", mantraEn: "Om Sraam Sreem Sraum Sah Ketave Namah",
    japa: 17000, daan: "seven grains + grey blanket on Saturday", daanHi: "शनिवार सात अनाज + धूसर कंबल",
  },
  8: {
    number: 8, planet: "Shani", planetHi: "शनि",
    gem: "Blue Sapphire (Neelam)", gemHi: "नीलम", color: "indigo/iron-grey", colorHi: "नीला/लोहे-सा धूसर",
    mantra: "ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः", mantraEn: "Om Praam Preem Praum Sah Shanicharaya Namah",
    japa: 23000, daan: "mustard oil + black sesame + iron on Saturday", daanHi: "शनिवार सरसों तेल + काले तिल + लोहा",
    caution: "NEELAM RULE (school): Neelam is the sharpest stone in the deck — test it tied on the arm for a week and consult a qualified jyotishi before wearing. Never wear it untested.",
  },
  9: {
    number: 9, planet: "Mangal", planetHi: "मंगल",
    gem: "Red Coral (Moonga)", gemHi: "मूंगा", color: "red/crimson", colorHi: "लाल/क़िरमिज़ी",
    mantra: "ॐ क्रां क्रीं क्रौं सः भौमाय नमः", mantraEn: "Om Kraam Kreem Kraum Sah Bhaumaya Namah",
    japa: 10000, daan: "masoor dal + red cloth + jaggery on Tuesday", daanHi: "मंगलवार मसूर दाल + लाल वस्त्र + गुड़",
  },
};

/** Remedies for a missing/weak number (falls back to the planet's entry). */
export function expandedRemedyFor(n: number): ExpandedRemedy {
  return R[n] ?? R[1];
}

export const ALL_EXPANDED_REMEDIES = R;

/* ------------------------------------------------------------------ */
/* Daily habits (owner: 'daily-habits section')                        */
/* ------------------------------------------------------------------ */

export interface DailyHabit {
  day: string; // EN
  dayHi: string;
  habitEn: string;
  habitHi: string;
}

export const DAILY_HABITS: DailyHabit[] = [
  {
    day: "Every sunrise", dayHi: "हर सूर्योदय",
    habitEn: "Face the rising sun, offer water, sit 5 minutes in silence — Surya charges the day's engine.",
    habitHi: "उगते सूरज को जल अर्पित करें, 5 मिनट मौन बैठें — सूर्य दिन का इंजन चार्ज करता है।",
  },
  {
    day: "Monday", dayHi: "सोमवार",
    habitEn: "White clothing; offer milk or rice to Shiva; keep the temper gentle (Chandra day).",
    habitHi: "सफ़ेद वस्त्र; शिव को दूध/चावल अर्पित करें; क्रोध से बचें (चंद्र-दिन)।",
  },
  {
    day: "Tuesday", dayHi: "मंगलवार",
    habitEn: "Anger-control day: no harsh words before noon; hanuman Chalisa or red daan.",
    habitHi: "क्रोध-संयम दिवस: दोपहर से पहले कोई कठोर शब्द नहीं; हनुमान चालीसा या लाल दान।",
  },
  {
    day: "Wednesday", dayHi: "बुधवार",
    habitEn: "Green clothing; feed green gram to birds/cows; sign deals only after writing them down.",
    habitHi: "हरे वस्त्र; मूँग पक्षियों/गायों को; हर सौदा लिखकर ही साइन करें।",
  },
  {
    day: "Friday", dayHi: "शुक्रवार",
    habitEn: "White/rose clothing; something white in daan — keep the home fresh and fragrant.",
    habitHi: "सफ़ेद/गुलाबी वस्त्र; सफ़ेद वस्तु का दान — घर ताज़ा और सुगंधित रखें।",
  },
  {
    day: "Saturday", dayHi: "शनिवार",
    habitEn: "Blue-item daan (blue cloth, iron, oil); serve the elderly and workers; keep every promise made this week.",
    habitHi: "नीली वस्तु का दान (नीला वस्त्र, लोहा, तेल); बुज़ुर्गों और मज़दूरों की सेवा; सप्ताह के हर वादे निभाएँ।",
  },
  {
    day: "Thursday", dayHi: "गुरुवार",
    habitEn: "Yellow clothing; touch the feet of teachers/elders; teach one thing you know — Guru grows by giving.",
    habitHi: "पीले वस्त्र; शिक्षक/बड़ों के चरण-स्पर्श; अपना एक ज्ञान बाँटें — गुरु बाँटने से बढ़ता है।",
  },
];

/** Neelam (8) consult-before-wearing caution line. */
export const NEELAM_CAUTION_EN =
  "Neelam (number 8, Shani) is tradition's sharpest stone: test it on the arm for a week and consult a qualified jyotishi before wearing — never wear it untested.";
export const NEELAM_CAUTION_HI =
  "नीलम (अंक 8, शनि) परंपरा का सबसे तेज़ रत्न है: धारण से पहले एक सप्ताह बाँह पर बाँधकर परीक्षा करें और योग्य ज्योतिषी से सलाह लें — बिना परीक्षा कभी न पहनें।";