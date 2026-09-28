/**
 * Anko Ki Maya v2 — Traditional remedy data (owner's school deck).
 *
 * Source: All India Institute of Occult Science remedy pages (Shrie Kashyap),
 * captured in the project study notes. Presentation rule (hard): these are
 * "traditional remedies that may support the energy" — a faith practice,
 * never medical/financial advice. Gold is the daan acceptable for any planet.
 */

export interface RemedyEntry {
  number: number;
  planetKey: "surya" | "chandra" | "mangal" | "budh" | "guru" | "shukra" | "shani" | "rahu" | "ketu";
  mantra: string; // Devanagari
  japa: number; // traditional japa count
  japaSets: number; // traditional ×4 practice
  yantra: string; // yantra name (Devanagari-friendly label)
  worshipDay: string; // traditional day of yantra/japa worship
  daan: string[]; // traditional daan items (Devanagari)
  extraNote?: string;
}

export const REMEDIES: Record<number, RemedyEntry> = {
  1: {
    number: 1,
    planetKey: "surya",
    mantra: "ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः",
    japa: 7000,
    japaSets: 4,
    yantra: "Surya yantra",
    worshipDay: "Ravivaar",
    daan: ["Maanikya", "Gomed", "taamba", "rakt vastra", "laal chandan"],
  },
  2: {
    number: 2,
    planetKey: "chandra",
    mantra: "ॐ श्रां श्रीं श्रौं सः चंद्राय नमः",
    japa: 11000,
    japaSets: 4,
    yantra: "Chandra yantra",
    worshipDay: "Somvaar",
    daan: ["Moti", "chaawal", "chaandi", "safed chandan", "shwet vastra", "shwet pushp", "mishri", "kapoor"],
  },
  3: {
    number: 3,
    planetKey: "guru",
    mantra: "ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः",
    japa: 19000,
    japaSets: 4,
    yantra: "Guru yantra",
    worshipDay: "Guruvaar",
    daan: [
      "Pukhraj", "chane ki daal", "kaansya paatra", "haldi", "peela vastra",
      "peele pushp", "dharmgranth", "peeli mithai",
    ],
  },
  4: {
    number: 4,
    planetKey: "rahu",
    mantra: "ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः",
    japa: 18000,
    japaSets: 4,
    yantra: "Rahu yantra",
    worshipDay: "Shanivaar",
    daan: ["Gomed", "seesa (raaga)", "saptdhaanya", "neela vastra", "naariyal"],
    extraNote:
      "Rahu upaay vishesh: Rahu ke liye Shanivaar ko saptdhaanya aur naariyal ka daan parampara mein kaha gaya hai; Gomed ratna Guru ki salah se hi dhaaran karo.",
  },
  5: {
    number: 5,
    planetKey: "budh",
    mantra: "ॐ बां बीं बौं सः बुधाय नमः",
    japa: 9000,
    japaSets: 4,
    yantra: "Budh yantra",
    worshipDay: "Budhvaar",
    daan: ["Panna", "moong", "hari ilaayachee", "hara vastra", "hare phal"],
  },
  6: {
    number: 6,
    planetKey: "shukra",
    mantra: "ॐ द्रां द्रीं द्रौं सः शुक्राय नमः",
    japa: 16000,
    japaSets: 4,
    yantra: "Shukra yantra",
    worshipDay: "Shukravaar",
    daan: ["Heera", "chaandi", "dahi", "safed chandan", "safed vastra", "shwet pushp", "mishri", "sugandhit dravya"],
  },
  7: {
    number: 7,
    planetKey: "ketu",
    mantra: "ॐ स्रां स्रीं स्रौं सः केतवे नमः",
    japa: 17000,
    japaSets: 4,
    yantra: "Ketu yantra",
    worshipDay: "Shanivaar",
    daan: ["lehsuniya", "saptdhaanya", "dhoosar pushp", "kastoori", "kambal"],
  },
  8: {
    number: 8,
    planetKey: "shani",
    mantra: "ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः",
    japa: 23000,
    japaSets: 4,
    yantra: "Shani yantra",
    worshipDay: "Shanivaar",
    daan: ["Neelam", "loha", "urad", "kaale pushp", "kaala vastra", "tail (tel)", "kaale joote"],
  },
  9: {
    number: 9,
    planetKey: "mangal",
    mantra: "ॐ क्रां क्रीं क्रौं सः भौमाय नमः",
    japa: 10000,
    japaSets: 4,
    yantra: "Mangal yantra",
    worshipDay: "Mangalvaar",
    daan: ["Moonga", "masoor", "taamba", "laal kaner", "laal vastra", "laal chandan"],
  },
};

/** Gold is traditionally an acceptable daan for every planet (school header rule). */
export const GOLD_NOTE =
  "parampara mein kaha gaya hai — “sona sabhi graha ka daan hai”: agar koi vishesh daan-vastu upalabdh na ho, toh sona (ya sone ki chhoti vastu) sabhi grahon ke daan mein sweekaar maana jaata hai.";

/** Number → remedy; masters fold to their base digit with a note. */
export function remedyForNumber(n: number): { remedy: RemedyEntry; baseOfMaster?: number } {
  if (n === 11) return { remedy: REMEDIES[2], baseOfMaster: 2 };
  if (n === 22) return { remedy: REMEDIES[4], baseOfMaster: 4 };
  if (n === 33) return { remedy: REMEDIES[6], baseOfMaster: 6 };
  return { remedy: REMEDIES[n] ?? REMEDIES[1] };
}