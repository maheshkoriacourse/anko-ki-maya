/**
 * Anko Ki Maya v2 — Month-weather calendar engine.
 *
 * Builds the "event weather" for 12 months: Personal Month × Life Path
 * resonance × compound date omens. Output = intensity /10 + verdict + best
 * dates + turning-point flags. All phrasing is assertive-but-honest
 * ("strongest money-window in 3 years" is fine; "you WILL get a job" is not).
 */

import {
  personalYear, personalMonth, reduce, reduceFully, monthName,
} from "./numerology";
import { compoundOmenFor } from "./name-studio";
import { remedyForNumber } from "./remedies";

export type Verdict =
  | "MAJOR favorable"
  | "strong but volatile"
  | "caution"
  | "consolidation";

export interface BestDate {
  day: number;
  personalDay: number;
  omenTitle: string;
  tone: string;
  reason: string;
}

export interface MonthWeather {
  year: number;
  month: number; // 1-12
  label: string;
  personalYear: number;
  personalMonth: number;
  intensity: number; // 0-10
  verdict: Verdict;
  verdictHi: string;
  narrative: string;
  narrativeHi: string;
  bestDates: BestDate[];
  warning: string | null;
  warningHi: string | null;
  remedyLine: string | null; // beside each warning
  turningPoint: boolean;
  turningPointWhy: string | null;
  steps: string[];
}

export interface YearWeather {
  months: MonthWeather[];
  turningPoints: MonthWeather[];
  steps: string[];
}

const HI_VERDICT: Record<Verdict, string> = {
  "MAJOR favorable": "pramukh anukool",
  "strong but volatile": "prabal par utaar-chadhaav bhara",
  caution: "saavdhani",
  consolidation: "sanvardhan (consolidation)",
};

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}

/**
 * PY cycle shape per the study notes (David Phillips + school):
 * 9+1 = major peak; 6 = minor peak; 4/7 = troughs (consolidation years —
 * difficult only when pushing major change against the flow).
 */
const PY_SHAPE: Record<number, { peak: number; volatile: boolean; trough: boolean }> = {
  1: { peak: 8, volatile: true, trough: false },
  2: { peak: 4, volatile: false, trough: false },
  3: { peak: 6, volatile: false, trough: false },
  4: { peak: 3, volatile: false, trough: true },
  5: { peak: 7, volatile: true, trough: false },
  6: { peak: 7, volatile: false, trough: false },
  7: { peak: 4, volatile: false, trough: true },
  8: { peak: 9, volatile: true, trough: false },
  9: { peak: 9, volatile: true, trough: false },
};

function verdictFor(intensity: number, volatile: boolean, trough: boolean): Verdict {
  if (intensity >= 8 && !volatile) return "MAJOR favorable";
  if (intensity >= 8) return "strong but volatile";
  if (intensity <= 3) return trough ? "consolidation" : "caution";
  if (trough) return "consolidation";
  if (intensity >= 6) return "MAJOR favorable";
  return "consolidation";
}

/** Best dates inside a month: personal-day harmony + compound date omen. */
function bestDatesFor(
  year: number,
  month: number,
  pm: number,
  lifePathUnit: number,
  count: number,
): BestDate[] {
  const out: BestDate[] = [];
  const daysInMonth = new Date(year, month, 0).getDate();
  const scored: { day: number; pd: number; compound: number; tone: string; title: string; s: number }[] = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const pd = reduceFully(pm + day);
    const compound = reduce(day) + reduce(month) + reduce(year);
    const wrapped = ((compound - 1) % 52) + 1;
    const omen = compoundOmenFor(wrapped);
    const toneScore = omen.tone === "fortunate" ? 3 : omen.tone === "mixed" ? 1 : 0;
    const pdScore = pd === lifePathUnit ? 2 : pd === pm ? 1 : 0;
    scored.push({ day, pd, compound: wrapped, tone: omen.tone, title: omen.title, s: toneScore + pdScore });
  }
  scored.sort((a, b) => b.s - a.s || a.day - b.day);
  for (const c of scored.slice(0, count)) {
    out.push({
      day: c.day,
      personalDay: c.pd,
      omenTitle: c.title,
      tone: c.tone,
      reason: `Personal Day ${c.pd}${c.pd === lifePathUnit ? ` matches your Life Path unit ${lifePathUnit}` : ""}; date omen "${c.title}" (${c.tone}).`,
    });
  }
  return out;
}

function warningFor(pm: number): { en: string; hi: string; remedy: string } | null {
  // Rewritten from the school's month-fruit slides in safe-language.
  if (pm === 2)
    return {
      en: "Imagination may float ahead of reality this month — keep feet on the ground, avoid quarrels, and double-check who you trust; a trusted person's advice deserves a second look before money moves.",
      hi: "is mahine kalpanaae vaastavikata se aage tair sakai hain — jamein par rahen, kalah se bachen, aur jin par bharosa kar rahe hain unai baat dhan-nirnay se pehle ek baar jaanch len.",
      remedy: remedyForNumber(2).remedy.mantra + " — 108 japa, Somvaar ko.",
    };
  if (pm === 8)
    return {
      en: "High-output month: watch the work-rest ledger. Effort pays, but grinding without pause borrows from next month's energy.",
      hi: "uchch-utpaadan ka mahina: kaam-viraam ka hisaab rakhein. parishram phal deta hai, par bina viraam ki mehnat agle mahine ki oorja udhaar leti hai.",
      remedy: remedyForNumber(8).remedy.mantra + " — 108 japa, Shanivaar ko.",
    };
  if (pm === 9)
    return {
      en: "Completion energy can turn into impatience — old frictions may resurface; choose closure over confrontation.",
      hi: "samaapan ki oorja adheerata mein badal sakai hai — puraai khat-pat ubhar sakai hain; takaraav ki jagah samaapan chuno.",
      remedy: remedyForNumber(9).remedy.mantra + " — 108 japa, Mangalvaar ko.",
    };
  if (pm === 4)
    return {
      en: "Consolidation month — pushing a major launch or a big change against this grain tends to cost double; steady bricks beat grand gestures.",
      hi: "sanvardhan ka mahina — is lay ke viruddh bada launch ya achanak badlaav doguna mahnga padata hai; sthir eenten, bade bhavy kadam nahi.",
      remedy: remedyForNumber(4).remedy.mantra + " — 108 japa, Shanivaar ko.",
    };
  if (pm === 7)
    return {
      en: "Inner-focus month — visibility and loud pushes feel harder than usual; reflection now saves rework later.",
      hi: "aantarik-chintan ka mahina — drishyata aur shor-bhare prayaas mushkil lagenge; ab ki chintan baad ki dobara-mehnat bachaai hai.",
      remedy: remedyForNumber(7).remedy.mantra + " — 108 japa, Shanivaar ko.",
    };
  return null;
}

/**
 * Build the 12-month weather map.
 * `turningMonths` — preferred months (1-12) to mark as turning points; if
 * omitted the engine picks the 2-3 highest-intensity months.
 */
export function monthWeather(
  birthMonth: number,
  birthDay: number,
  fromYear: number,
  fromMonth: number, // 1-12; the calendar month the year starts at
  lifePathNumber: number,
  turningMonths?: number[],
): YearWeather {
  const lifePathUnit = reduceFully(lifePathNumber);
  const months: MonthWeather[] = [];

  for (let i = 0; i < 12; i++) {
    const calMonth = ((fromMonth - 1 + i) % 12) + 1;
    const calYear = fromYear + Math.floor((fromMonth - 1 + i) / 12);
    const yearForThisMonth = personalYear(birthMonth, birthDay, calYear).number;
    const pm = personalMonth(yearForThisMonth, calMonth).number;
    const shape = PY_SHAPE[yearForThisMonth] ?? PY_SHAPE[1];

    // Intensity blends PM peak-ness and PY volatility.
    const pmPeakness = pm === shape.peak ? 3 : [shape.peak + 1, shape.peak - 1].includes(pm) ? 2 : pm === 9 ? 2 : 1;
    const base = 3 + pmPeakness + (shape.volatile ? 1.5 : 0) + (shape.trough ? -2 : 0);
    const intensity = clamp(Math.round(base), 1, 10);

    const verdict = verdictFor(intensity, shape.volatile, shape.trough);
    const narrative = buildNarrative(calMonth, yearForThisMonth, pm, verdict, intensity);
    const narrativeHi = buildNarrativeHi(calMonth, yearForThisMonth, pm, verdict, intensity);
    const warn = warningFor(pm);

    months.push({
      year: calYear,
      month: calMonth,
      label: `${monthName(calMonth)} ${calYear}`,
      personalYear: yearForThisMonth,
      personalMonth: pm,
      intensity,
      verdict,
      verdictHi: HI_VERDICT[verdict],
      narrative,
      narrativeHi,
      bestDates: bestDatesFor(calYear, calMonth, pm, lifePathUnit, 3),
      warning: warn?.en ?? null,
      warningHi: warn?.hi ?? null,
      remedyLine: warn?.remedy ?? null,
      turningPoint: false,
      turningPointWhy: null,
      steps: [
        `Personal Year ${yearForThisMonth} × Personal Month ${pm}`,
        `Shape of PY ${yearForThisMonth}: ${shape.trough ? "trough/consolidation" : shape.volatile ? "volatile rise" : "steady"}, peak around PM ${shape.peak}`,
        `Intensity = base 3 + PM peak-ness ${pmPeakness} ${shape.volatile ? "+ volatility 1.5" : ""} ${shape.trough ? "− trough 2" : ""} → ${intensity}/10`,
      ],
    });
  }

  // Turning points: 2-3 chosen or highest-intensity months.
  let tp: MonthWeather[] = [];
  if (turningMonths && turningMonths.length > 0) {
    tp = months.filter((m) => turningMonths.includes(m.month)).slice(0, 3);
  } else {
    tp = [...months].sort((a, b) => b.intensity - a.intensity).slice(0, 3);
    tp.sort((a, b) => months.indexOf(a) - months.indexOf(b));
  }
  for (const t of tp) {
    t.turningPoint = true;
    t.turningPointWhy = turningWhy(t, lifePathUnit);
  }

  return {
    months,
    turningPoints: tp,
    steps: [
      `12 months built from Personal Year/Month rolls; intensity blends PM peak-ness, PY volatility and trough shape.`,
      `Verdicts: MAJOR favorable ≥8 steady; strong but volatile ≥8 volatile; caution ≤3; consolidation else.`,
      `Best dates: Personal Day harmony with Life Path unit + compound date omen.`,
    ],
  };
}

function buildNarrative(
  calMonth: number,
  py: number,
  pm: number,
  verdict: Verdict,
  intensity: number,
): string {
  const m = monthName(calMonth);
  if (verdict === "MAJOR favorable")
    return `${m} is a high-tide month (PY ${py} × PM ${pm}) — intensity ${intensity}/10. A strong window for launches, asks and visibility; pace yourself so the tide carries rather than churns.`;
  if (verdict === "strong but volatile")
    return `${m} is a powerful but swingy month (PY ${py} × PM ${pm}) — intensity ${intensity}/10. Big gains and big frictions can both move fast; keep judgment close and decisions documented.`;
  if (verdict === "caution")
    return `${m} reads quiet (PY ${py} × PM ${pm}) — intensity ${intensity}/10. A reflective month: protect attention, avoid noise-driven commitments, and let plans mature.`;
  return `${m} is a consolidation month (PY ${py} × PM ${pm}) — intensity ${intensity}/10. Steady bricks, systems and rest build the platform the next peak will stand on.`;
}

function buildNarrativeHi(
  calMonth: number,
  py: number,
  pm: number,
  verdict: Verdict,
  intensity: number,
): string {
  const m = monthName(calMonth);
  if (verdict === "MAJOR favorable")
    return `${m} ek uchch-jvaar mahina padha jaata hai (PY ${py} × PM ${pm}) — teevrata ${intensity}/10. parampara mein launch, prastaav aur drishyata ke liye prabal vindo; lay ko apne paksh mein rakhein.`;
  if (verdict === "strong but volatile")
    return `${m} shaktishaai par utaar-chadhaav bhara mahina (PY ${py} × PM ${pm}) — teevrata ${intensity}/10. bade laabh aur bade gharshan dono tejaee se chalate hain; nirnay paas rakhein, nirnay likhit rakhein.`;
  if (verdict === "caution")
    return `${m} shaant mahina padha jaata hai (PY ${py} × PM ${pm}) — teevrata ${intensity}/10. chintan ka mahina: dhyaan ki raksha karein, shor-snchaalit vaadon se bachen, yojanaon ko paripakv hone dein.`;
  return `${m} sanvardhan ka mahina (PY ${py} × PM ${pm}) — teevrata ${intensity}/10. sthir eenten, vyavastha aur viraam woh manch banaate hain jis par agla shikhar khada hoga.`;
}

function turningWhy(t: MonthWeather, lifePathUnit: number): string {
  if (t.verdict === "MAJOR favorable") {
    return `Intensity ${t.intensity}/10 with steady peak conditions — Personal Month ${t.personalMonth} carries the launch/visibility current; dates whose Personal Day matches Life Path unit ${lifePathUnit} add tailwind. Put your year's most important move here.`;
  }
  if (t.verdict === "strong but volatile") {
    return `Intensity ${t.intensity}/10 but the current swings — big upside and big friction share the month. Decide early, write commitments down, and avoid letting others set your tempo.`;
  }
  if (t.verdict === "caution") {
    return `Low-intensity reflective window (${t.intensity}/10) — not for force, but for the pivot decision made calmly before the next high-tide month arrives.`;
  }
  return `Consolidation month (${t.intensity}/10) — the quiet hinge between cycles: what you systematise here determines how high the next peak reaches.`;
}