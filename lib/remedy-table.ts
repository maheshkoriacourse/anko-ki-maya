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
    number: 1, planet: "Surya", planetHi: "Surya",
    gem: "Ruby (Manik)", gemHi: "Maanikya (rubee)", color: "saffron/copper-red", colorHi: "kesariyaa/taamr-laal",
    mantra: "ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः", mantraEn: "Om Hraam Hreem Hraum Sah Suryaya Namah",
    japa: 7000, daan: "wheat + jaggery + copper on Sunday at sunrise", daanHi: "Ravivaar sooryoday par gehoo + gud + taamba",
  },
  2: {
    number: 2, planet: "Chandra", planetHi: "Chandra",
    gem: "Pearl (Moti)", gemHi: "Moti (mukta)", color: "white/silver", colorHi: "shwet/chaandi",
    mantra: "ॐ श्रां श्रीं श्रौं सः चंद्राय नमः", mantraEn: "Om Shraam Shreem Shraum Sah Chandraya Namah",
    japa: 11000, daan: "white rice + milk + silver on Monday", daanHi: "Somvaar safed chaawal + doodh + chaandi",
  },
  3: {
    number: 3, planet: "Guru", planetHi: "Guru",
    gem: "Yellow Sapphire (Pukhraj)", gemHi: "Pukhraj", color: "turmeric-yellow", colorHi: "haldi-peela",
    mantra: "ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः", mantraEn: "Om Graam Greem Graum Sah Gurave Namah",
    japa: 19000, daan: "turmeric + chana dal + yellow cloth on Thursday", daanHi: "Guruvaar haldi + chana daal + peela vastra",
  },
  4: {
    number: 4, planet: "Rahu", planetHi: "Rahu",
    gem: "Hessonite (Gomed)", gemHi: "Gomed", color: "smoke-grey/electric blue", colorHi: "dhoosar/bijai-neela",
    mantra: "ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः", mantraEn: "Om Bhraam Bhreem Bhraum Sah Rahave Namah",
    japa: 18000, daan: "mustard oil + black blanket + coconut to the flowing water on Saturday", daanHi: "Shanivaar sarson tel + kaala kambal + naariyal bahate jal ko",
  },
  5: {
    number: 5, planet: "Budh", planetHi: "Budh",
    gem: "Emerald (Panna)", gemHi: "Panna", color: "green", colorHi: "hara",
    mantra: "ॐ प्रां प्रीं प्रौं सः बुधाय नमः", mantraEn: "Om Praam Preem Praum Sah Budhaya Namah",
    japa: 9000, daan: "green moong + green cloth on Wednesday", daanHi: "Budhvaar hari moong + hara vastra",
  },
  6: {
    number: 6, planet: "Shukra", planetHi: "Shukra",
    gem: "Diamond/White Sapphire (Heera)", gemHi: "Heera/safed Pukhraj", color: "white/rose", colorHi: "safed/gulaabi",
    mantra: "ॐ द्रां द्रीं द्रौं सः शुक्राय नमः", mantraEn: "Om Draam Dreem Draum Sah Shukraya Namah",
    japa: 16000, daan: "white sweets + curd + rice on Friday", daanHi: "Shukravaar safed mithaaee + dahi + chaawal",
  },
  7: {
    number: 7, planet: "Ketu", planetHi: "Ketu",
    gem: "Cat's Eye (Lehsunia)", gemHi: "Lehsunia", color: "cream/smoke-brown", colorHi: "cream/dhooe-bhoora",
    mantra: "ॐ स्रां स्रीं स्रौं सः केतवे नमः", mantraEn: "Om Sraam Sreem Sraum Sah Ketave Namah",
    japa: 17000, daan: "seven grains + grey blanket on Saturday", daanHi: "Shanivaar saat anaaj + dhoosar kambal",
  },
  8: {
    number: 8, planet: "Shani", planetHi: "Shani",
    gem: "Blue Sapphire (Neelam)", gemHi: "Neelam", color: "indigo/iron-grey", colorHi: "neela/lohe-sa dhoosar",
    mantra: "ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः", mantraEn: "Om Praam Preem Praum Sah Shanicharaya Namah",
    japa: 23000, daan: "mustard oil + black sesame + iron on Saturday", daanHi: "Shanivaar sarson tel + kaale til + loha",
    caution: "NEELAM RULE (school): Neelam is the sharpest stone in the deck — test it tied on the arm for a week and consult a qualified jyotishi before wearing. Never wear it untested.",
  },
  9: {
    number: 9, planet: "Mangal", planetHi: "Mangal",
    gem: "Red Coral (Moonga)", gemHi: "moonga", color: "red/crimson", colorHi: "laal/kairamijaee",
    mantra: "ॐ क्रां क्रीं क्रौं सः भौमाय नमः", mantraEn: "Om Kraam Kreem Kraum Sah Bhaumaya Namah",
    japa: 10000, daan: "masoor dal + red cloth + jaggery on Tuesday", daanHi: "Mangalvaar masoor daal + laal vastra + gud",
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
    day: "Every sunrise", dayHi: "har sooryoday",
    habitEn: "Face the rising sun, offer water, sit 5 minutes in silence — Surya charges the day's engine.",
    habitHi: "ugate sooraj ko jal arpit karein, 5 minat maun baithen — Surya din ka engine chaarj karta hai.",
  },
  {
    day: "Monday", dayHi: "Somvaar",
    habitEn: "White clothing; offer milk or rice to Shiva; keep the temper gentle (Chandra day).",
    habitHi: "safed vastra; Shiv ko doodh/chaawal arpit karein; krodh se bachen (Chandra-din).",
  },
  {
    day: "Tuesday", dayHi: "Mangalvaar",
    habitEn: "Anger-control day: no harsh words before noon; hanuman Chalisa or red daan.",
    habitHi: "krodh-sanyam divas: dopahar se pehle koi kathor shabd nahi; Hanuman chaaleesa ya laal daan.",
  },
  {
    day: "Wednesday", dayHi: "Budhvaar",
    habitEn: "Green clothing; feed green gram to birds/cows; sign deals only after writing them down.",
    habitHi: "hare vastra; moong pakshiyon/gaayon ko; har sauda likhakar hi sign karo.",
  },
  {
    day: "Friday", dayHi: "Shukravaar",
    habitEn: "White/rose clothing; something white in daan — keep the home fresh and fragrant.",
    habitHi: "safed/gulaabi vastra; safed vastu ka daan — ghar taaja aur sugndhit rakhein.",
  },
  {
    day: "Saturday", dayHi: "Shanivaar",
    habitEn: "Blue-item daan (blue cloth, iron, oil); serve the elderly and workers; keep every promise made this week.",
    habitHi: "neeli vastu ka daan (neela vastra, loha, tel); buzurgon aur majadooron ki seva; hafta ke har vaade nibhaae.",
  },
  {
    day: "Thursday", dayHi: "Guruvaar",
    habitEn: "Yellow clothing; touch the feet of teachers/elders; teach one thing you know — Guru grows by giving.",
    habitHi: "peele vastra; shikshak/badon ke charan-sparsh; apna ek gyaan baaten — Guru baatane se badhata hai.",
  },
];

/** Neelam (8) consult-before-wearing caution line. */
export const NEELAM_CAUTION_EN =
  "Neelam (number 8, Shani) is tradition's sharpest stone: test it on the arm for a week and consult a qualified jyotishi before wearing — never wear it untested.";
export const NEELAM_CAUTION_HI =
  "Neelam (ank 8, Shani) parampara ka sabse tez ratna hai: dhaaran se pehle ek hafta baanh par baandhkar pariksha karein aur yogy jyotishi se salah lein — bina pariksha kai na pehno.";