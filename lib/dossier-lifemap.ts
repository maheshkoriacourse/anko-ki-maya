/**
 * v5.2 AKASHIC DOSSIER — CHAPTER 3: THE LIFE MAP (river of time)
 * Canonical spec: age 0→70+ band map, each band = emotional theme + basis;
 * bands derived from mahadasha (MahadashaRow) + age anchors so the map is
 * deterministic per DOB. Interpret-never-predict voice.
 */

import { buildMahadasha, type MahadashaRow } from "@/lib/mahadasha";
import { loShuGrid } from "@/lib/loshu";

export interface LifeBand {
  fromAge: number;
  toAge: number;
  nameEn: string;
  nameHi: string;
  gistEn: string;
  gistHi: string;
  basis: string; // "Mahadasha: Rahu 18y (2020–2038)" etc
}

const AGE_THEMES: Record<number, { en: string; hi: string }> = {
  8: { en: "Feeling different — the child observed more than shared", hi: "alag feel karna — bachcha dekhna seekh gaya, batana kam" },
  14: { en: "Independence awakening — the first 'I decide'", hi: "azaadi ki jhalak — pehli baar 'main faisla karunga'" },
  18: { en: "Identity conflict — pulled between two worlds", hi: "pehchaan ka sangharsh — do duniyaon ke beech" },
  24: { en: "The love/loyalty lesson begins", hi: "pyaar-aur-wafaa ki paathshala shuru" },
  31: { en: "Responsibility explosion — shoulders widen", hi: "zimmedariyon ka visfotan — kandhe chaude hue" },
  38: { en: "Power year — quiet authority, real decisions", hi: "shakti-varsh — sanjhi hukoomat, asli faisle" },
  45: { en: "The mid-river mirror — what is truly mine?", hi: "nadi-ke-bich ka aaina — asli mein mera kya hai?" },
  58: { en: "Harvest window — giving back begins", hi: "phalon ka darwaza — wapsi ki shuruaat" },
};

const LORD_FLAVOR: Record<string, { en: string; hi: string }> = {
  Sun: { en: "identity sharpened, visibility earned", hi: "pehchaan ki aag — naam aur adhikar ka dasa" },
  Moon: { en: "belonging, home and emotional currents", hi: "mann ki nadi — rishton aur ghar ka dasa" },
  Mars: { en: "bold starts and hard knocks", hi: "josh ki chadhai — thokar aur tez-raftar ka dasa" },
  Mercury: { en: "business, wit and speed", hi: "dhandha aur dimaag — kathin aur tez-raftaar" },
  Jupiter: { en: "depth, mentoring and trust", hi: "gehraai aur vidya ka dasa — sab se bharosemand" },
  Venus: { en: "beauty, sweetness and money-flow", hi: "sur aur sundarta ka dasa — madhurna aur paisa dono" },
  Saturn: { en: "delays that quietly built permanence", hi: "mehnat ka maha-dasa — jitna dheire, utna pakka" },
  Rahu: { en: "big hunger, faster rise, louder noise", hi: "bade-sapno ka dasa — chadhai tez, hawa bhi tez" },
  Ketu: { en: "detachment and old-weight leaving", hi: "nirapeksh ka dasa — purane bojh ka utarna" },
};

function bandOf(row: MahadashaRow, birthYear: number, ageNow: number): LifeBand {
  const flavor = LORD_FLAVOR[row.lord] || { en: "the theme this river carried", hi: "is daur ka ras" };
  const startAge = row.start.getFullYear() - birthYear;
  const endAge = row.end.getFullYear() - birthYear;
  return {
    fromAge: Math.max(0, startAge),
    toAge: endAge,
    nameEn: `${row.school} period`,
    nameHi: `${row.school} mahadasha`,
    gistEn: `Life pressed the ${row.school}-flavour: ${flavor.en}.`,
    gistHi: `is daur mein zindagi ne ${row.school}-ras dala — ${flavor.hi}.`,
    basis: `Mahadasha: ${row.school} ${row.years}y (${row.start.getFullYear()}–${row.end.getFullYear()})${row.isCurrent ? " ● abhi" : ""}`,
  };
}

export function buildLifeMap(
  y: number, m: number, d: number,
  nowIso: string = new Date().toISOString().slice(0, 10),
): { bands: LifeBand[]; ageNow: number; missing: number[] } {
  const birthYear = y;
  const now = new Date(`${nowIso}T06:00:00Z`);
  let age = now.getFullYear() - birthYear;
  const md = now.getMonth() + 1, dd = now.getDate();
  if (md < m || (md === m && dd < d)) age--;

  const mah = buildMahadasha({ year: y, month: m, day: d });
  const bands = mah.rows.map((r) => bandOf(r, birthYear, age));

  // anchor years interleaved near the band whose span contains them
  for (const [ageStr, theme] of Object.entries(AGE_THEMES)) {
    const a = Number(ageStr);
    const host = bands.find((b) => a >= b.fromAge && a <= b.toAge);
    if (host && a <= age + 4) {
      bands.splice(bands.indexOf(host) + 1, 0, {
        fromAge: a, toAge: a,
        nameEn: "Anchor year",
        nameHi: "anchor-saal",
        gistEn: theme.en,
        gistHi: theme.hi,
        basis: "age-theme anchor",
      });
    }
  }

  const grid = loShuGrid(y, m, d, "en");
  return { bands, ageNow: age, missing: grid?.missing ?? [] };
}