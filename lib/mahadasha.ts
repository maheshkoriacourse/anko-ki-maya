/**
 * v3.9 MAHADASHA + MASTER NUMBERS (owner order, 30 Sep: "dasha mahadasha
 * analysis nahi hai... include karo... master numbers 11,22,33 b nahi hai").
 *
 * Two features, one library:
 * 1) buildMahadasha(): owner-facing Vimshottari Mahadasha timeline — 9 rows
 *    (school graha names, years, start/end, essay from vedic-content), with
 *    the CURRENT mahadasha + its antardashas resolved for a given date.
 * 2) masterSummary(): when Mulank/Bhagyank/Namank is 11/22/33, a full
 *    master-number analysis (meaning + how it lives + folded single-digit line).
 */

import { vedicChart } from "./vedic";
import { dashaEssay } from "./vedic-content";
import { MASTER_MEANINGS, meaningFor } from "./meanings";
import type { Lang } from "./content";

/* ------------------------------------------------------------------ */
/* 1) Mahadasha timeline                                               */
/* ------------------------------------------------------------------ */

export interface MahadashaRow {
  /** panchanga lord name (Sun/Moon/...) — drives the essay lookup. */
  lord: string;
  /** school graha name (Surya/Chandra/...) for display. */
  school: string;
  years: number;
  start: Date;
  end: Date;
  essayEn: string;
  essayHi: string;
  isCurrent: boolean;
  isNext: boolean;
}

export interface AntardashaRow {
  lord: string;
  school: string;
  start: Date;
  end: Date;
}

export interface MahadashaReading {
  rows: MahadashaRow[];
  /** index of the current row in rows (-1 = birth before first period). */
  currentIndex: number;
  /** antardashas of the CURRENT mahadasha (empty when none current). */
  currentAntars: AntardashaRow[];
  currentAntarIndex: number;
  headerEn: string;
  headerHi: string;
}

const PANCH_TO_SCHOOL: Record<string, string> = {
  Sun: "Surya", Moon: "Chandra", Mars: "Mangal", Mercury: "Budh", Jupiter: "Guru",
  Venus: "Shukra", Saturn: "Shani", Rahu: "Rahu", Ketu: "Ketu",
};

function fmt(d: Date, hi: boolean): string {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const y = d.getFullYear();
  return hi ? `${dd}-${mm}-${y}` : `${mm}/${dd}/${y}`;
}

/**
 * Build the full Mahadasha timeline for a birth date.
 * Moon-chart mode (noon fallback) matches lib/vedic.ts — birth time optional.
 */
export function buildMahadasha(
  birth: { year: number; month: number; day: number },
  now: Date = new Date(),
): MahadashaReading {
  const vc = vedicChart({ year: birth.year, month: birth.month, day: birth.day });
  const periods = vc.dasha; // level-1 (mahadasha) list, each with antardashas

  const rows: MahadashaRow[] = periods.map((p) => {
    const essay = dashaEssay(p.lord);
    return {
      lord: p.lord,
      school: PANCH_TO_SCHOOL[p.lord] ?? p.lord,
      years: p.years,
      start: new Date(p.start),
      end: new Date(p.end),
      essayEn: essay.periodEn,
      essayHi: essay.periodHi,
      isCurrent: false,
      isNext: false,
    };
  });

  let currentIndex = -1;
  let currentAntars: AntardashaRow[] = [];
  let currentAntarIndex = -1;
  for (let i = 0; i < periods.length; i++) {
    const p = periods[i];
    if (now >= new Date(p.start) && now < new Date(p.end)) {
      currentIndex = i;
      rows[i].isCurrent = true;
      if (i + 1 < rows.length) rows[i + 1].isNext = true;
      currentAntars = (p.antardashas ?? []).map((a) => ({
        lord: a.lord,
        school: PANCH_TO_SCHOOL[a.lord] ?? a.lord,
        start: new Date(a.start),
        end: new Date(a.end),
      }));
      for (let j = 0; j < currentAntars.length; j++) {
        if (now >= currentAntars[j].start && now < currentAntars[j].end) {
          currentAntarIndex = j;
          break;
        }
      }
      break;
    }
  }

  const cur = currentIndex >= 0 ? rows[currentIndex] : null;
  const nxt = currentIndex + 1 < rows.length && currentIndex >= 0 ? rows[currentIndex + 1] : rows[0];
  const antar = currentAntarIndex >= 0 ? currentAntars[currentAntarIndex] : null;

  const headerEn = cur
    ? `Running now: ${cur.school} Mahadasha (${fmt(cur.start, false)} → ${fmt(cur.end, false)})${antar ? `, inside it the ${antar.school} antardasha until ${fmt(antar.end, false)}` : ""}. After it, the ${nxt.school} years begin from ${fmt(nxt.start, false)}.`
    : `The ${nxt.school} Mahadasha opens this timeline from ${fmt(nxt.start, false)}.`;
  const headerHi = cur
    ? `abhi chal raha: ${cur.school} Mahadasha (${fmt(cur.start, true)} → ${fmt(cur.end, true)})${antar ? `, iske andar ${antar.school} antardasha — ${fmt(antar.end, true)} tak` : ""}. iske baad ${nxt.school} ke saal shuru — ${fmt(nxt.start, true)} se.`
    : ` Mahadasha timeline: ${nxt.school} pehla mahadasha — ${fmt(nxt.start, true)} se.`;

  return { rows, currentIndex, currentAntars, currentAntarIndex, headerEn, headerHi };
}

/* ------------------------------------------------------------------ */
/* 2) Master numbers 11 / 22 / 33                                     */
/* ------------------------------------------------------------------ */

export interface MasterCandidate {
  label: string; // "Mulank" | "Bhagyank" | "Namank"
  labelHi: string;
  number: number;
}

export interface MasterReading {
  /** master numbers actually present in the core set. */
  masters: MasterCandidate[];
  isMaster: boolean;
  /** primary (first found) master analysis. */
  primary?: {
    number: number;
    title: string;
    essence: string;
    strengths: string;
    growthEdge: string;
    reflection: string[];
  };
  /** folded single-digit reading — "11 ka phal 2 ke zariye bhi chalta hai". */
  folded: {
    number: number; // 2, 4 or 6
    lineEn: string;
    lineHi: string;
  };
  lineEn: string;
  lineHi: string;
}

function foldedLine(n: number, lang: Lang): { number: number; lineEn: string; lineHi: string } {
  const folded = n === 11 ? 2 : n === 22 ? 4 : 6;
  const baseTitle = meaningFor(folded).title;
  return {
    number: folded,
    lineEn: `${n} is read as the master vibration above; when it is not consciously lived, it still delivers its folded ${folded} (${baseTitle}) — the same current at household voltage.`,
    lineHi: `${n} upar wale master-vibration ki tarah padha jaata hai; aur agar woh poora na jiya jaaye to iska mura hua ${folded} (${baseTitle}) phal bhi chalta rehta hai — wahi current, ghar ke voltage par.`,
  };
}

export function masterSummary(candidates: MasterCandidate[], lang: Lang = "en"): MasterReading {
  const masters = candidates.filter((c) => c.number === 11 || c.number === 22 || c.number === 33);
  const first = masters[0];
  if (!first) {
    return {
      masters: [],
      isMaster: false,
      folded: foldedLine(candidates[0]?.number ?? 1, lang),
      lineEn: "",
      lineHi: "",
    };
  }
  const m = MASTER_MEANINGS[first.number];
  const f = foldedLine(first.number, lang);
  const list = masters.map((c) => `${c.label} ${c.number}`).join(", ");
  return {
    masters,
    isMaster: true,
    primary: {
      number: first.number,
      title: m.title,
      essence: m.essence,
      strengths: m.strengths,
      growthEdge: m.growthEdge,
      reflection: m.reflectionQuestions,
    },
    folded: f,
    lineEn: `Master number in your core set${masters.length > 1 ? ` (${list})` : `: ${list}`}. ${f.lineEn}`,
    lineHi: `aapke mool ankon mein master number${masters.length > 1 ? ` (${masters.map((c) => `${c.labelHi} ${c.number}`).join(", ")})` : `: ${masters.map((c) => `${c.labelHi} ${c.number}`).join(", ")}`}. ${f.lineHi}`,
  };
}