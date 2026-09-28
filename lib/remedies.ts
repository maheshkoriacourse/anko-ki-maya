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
    yantra: "सूर्य यंत्र",
    worshipDay: "रविवार",
    daan: ["माणिक्य", "गोमेद", "तांबा", "रक्त वस्त्र", "लाल चंदन"],
  },
  2: {
    number: 2,
    planetKey: "chandra",
    mantra: "ॐ श्रां श्रीं श्रौं सः चंद्राय नमः",
    japa: 11000,
    japaSets: 4,
    yantra: "चंद्र यंत्र",
    worshipDay: "सोमवार",
    daan: ["मोती", "चावल", "चाँदी", "सफ़ेद चंदन", "श्वेत वस्त्र", "श्वेत पुष्प", "मिश्री", "कपूर"],
  },
  3: {
    number: 3,
    planetKey: "guru",
    mantra: "ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः",
    japa: 19000,
    japaSets: 4,
    yantra: "गुरु यंत्र",
    worshipDay: "गुरुवार",
    daan: [
      "पोखराज", "चने की दाल", "कांस्य पात्र", "हल्दी", "पीला वस्त्र",
      "पीले पुष्प", "धर्मग्रंथ", "पीली मिठाई",
    ],
  },
  4: {
    number: 4,
    planetKey: "rahu",
    mantra: "ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः",
    japa: 18000,
    japaSets: 4,
    yantra: "राहु यंत्र",
    worshipDay: "शनिवार",
    daan: ["गोमेद", "सीसा (राँगा)", "सप्तधान्य", "नीला वस्त्र", "नारियल"],
    extraNote:
      "राहु उपाय विशेष: राहु के लिए शनिवार को सप्तधान्य और नारियल का दान परंपरा में कहा गया है; गोमेद रत्न गुरु की सलाह से ही धारण करें।",
  },
  5: {
    number: 5,
    planetKey: "budh",
    mantra: "ॐ बां बीं बौं सः बुधाय नमः",
    japa: 9000,
    japaSets: 4,
    yantra: "बुध यंत्र",
    worshipDay: "बुधवार",
    daan: ["पन्ना", "मूँग", "हरी इलायची", "हरा वस्त्र", "हरे फल"],
  },
  6: {
    number: 6,
    planetKey: "shukra",
    mantra: "ॐ द्रां द्रीं द्रौं सः शुक्राय नमः",
    japa: 16000,
    japaSets: 4,
    yantra: "शुक्र यंत्र",
    worshipDay: "शुक्रवार",
    daan: ["हीरा", "चाँदी", "दही", "सफ़ेद चंदन", "सफ़ेद वस्त्र", "श्वेत पुष्प", "मिश्री", "सुगंधित द्रव्य"],
  },
  7: {
    number: 7,
    planetKey: "ketu",
    mantra: "ॐ स्रां स्रीं स्रौं सः केतवे नमः",
    japa: 17000,
    japaSets: 4,
    yantra: "केतु यंत्र",
    worshipDay: "शनिवार",
    daan: ["लहसुनियाँ", "सप्तधान्य", "धूसर पुष्प", "कस्तूरी", "कम्बल"],
  },
  8: {
    number: 8,
    planetKey: "shani",
    mantra: "ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः",
    japa: 23000,
    japaSets: 4,
    yantra: "शनि यंत्र",
    worshipDay: "शनिवार",
    daan: ["नीलम", "लोहा", "उड़द", "काले पुष्प", "काला वस्त्र", "मैस (तेल)", "काले जूते"],
  },
  9: {
    number: 9,
    planetKey: "mangal",
    mantra: "ॐ क्रां क्रीं क्रौं सः भौमाय नमः",
    japa: 10000,
    japaSets: 4,
    yantra: "मंगल यंत्र",
    worshipDay: "मंगलवार",
    daan: ["मूँगा", "मसूर", "तांबा", "लाल कनेर", "लाल वस्त्र", "लाल चंदन"],
  },
};

/** Gold is traditionally an acceptable daan for every planet (school header rule). */
export const GOLD_NOTE =
  "परंपरा में कहा गया है — “सोना सभी ग्रह का दान है”: अगर कोई विशेष दान-वस्तु उपलब्ध न हो, तो सोना (या सोने की छोटी वस्तु) सभी ग्रहों के दान में स्वीकार माना जाता है।";

/** Number → remedy; masters fold to their base digit with a note. */
export function remedyForNumber(n: number): { remedy: RemedyEntry; baseOfMaster?: number } {
  if (n === 11) return { remedy: REMEDIES[2], baseOfMaster: 2 };
  if (n === 22) return { remedy: REMEDIES[4], baseOfMaster: 4 };
  if (n === 33) return { remedy: REMEDIES[6], baseOfMaster: 6 };
  return { remedy: REMEDIES[n] ?? REMEDIES[1] };
}