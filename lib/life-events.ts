/**
 * Anko Ki Maya v2 — Life Events Graph engine.
 *
 * The user records PAST events (year + label + impact 1-10); the engine maps
 * them onto the personal-year cycle (1-9 rolling since birth) and produces
 * cycle-resonance observations: do the high-impact events cluster in certain
 * personal-year numbers? Purely reflective — patterns over past data, never
 * predictions about future events.
 */

import { reduce } from "./numerology";

export interface LifeEvent {
  id: string;
  year: number;
  label: string;
  impact: number; // 1-10
  note?: string;
}

export interface EventOnCycle {
  event: LifeEvent;
  personalYear: number;
  cycleAge: number;
}

export interface CycleResonance {
  personalYear: number;
  events: EventOnCycle[];
  averageImpact: number;
  count: number;
  observation: string;
}

export interface EventsGraphResult {
  onCycle: EventOnCycle[];
  resonances: CycleResonance[];
  summary: string | null;
  steps: string[];
}

/** Personal year for a given event year (birth month/day folded in). */
export function personalYearForEvent(
  eventYear: number,
  birthMonth: number,
  birthDay: number,
): number {
  const m = reduce(birthMonth);
  const d = reduce(birthDay);
  const y = reduce(eventYear);
  return reduce(m + d + y);
}

/** Full analysis: events on cycle + resonance table + summary observation. */
export function analyzeLifeEvents(
  events: LifeEvent[],
  birthYear: number,
  birthMonth: number,
  birthDay: number,
): EventsGraphResult {
  const sorted = [...events].sort((a, b) => a.year - b.year);
  const onCycle: EventOnCycle[] = sorted
    .filter((e) => e.year >= birthYear)
    .map((e) => ({
      event: e,
      personalYear: personalYearForEvent(e.year, birthMonth, birthDay),
      cycleAge: e.year - birthYear,
    }));

  const byPY = new Map<number, EventOnCycle[]>();
  for (const oc of onCycle) {
    const list = byPY.get(oc.personalYear) ?? [];
    list.push(oc);
    byPY.set(oc.personalYear, list);
  }

  const resonances: CycleResonance[] = [];
  for (let py = 1; py <= 9; py++) {
    const list = byPY.get(py) ?? [];
    if (list.length === 0) continue;
    const avg = list.reduce((s, o) => s + o.event.impact, 0) / list.length;
    resonances.push({
      personalYear: py,
      events: list,
      averageImpact: avg,
      count: list.length,
      observation: resonanceNote(py, avg, list.length),
    });
  }

  resonances.sort((a, b) => b.averageImpact - a.averageImpact);

  const strongest = resonances[0] ?? null;
  const summary = strongest && onCycle.length >= 3
    ? `Your recorded high-impact events cluster most around Personal Year ${strongest.personalYear} cycles (average impact ${strongest.averageImpact.toFixed(1)}/10 across ${strongest.count} event${strongest.count > 1 ? "s" : ""}). A pattern worth reflecting on — three or more events is a hint, not a law.`
    : null;

  const steps = [
    `Each event year is reduced against birth month ${birthMonth} + day ${birthDay}: e.g. ${onCycle[0]?.event.year ?? "—"} → Personal Year ${onCycle[0]?.personalYear ?? "—"}.`,
    `Impacts are averaged per personal-year position (1-9).`,
    `Cycle positions with the highest average impact are highlighted as resonance — reflection, not prediction.`,
  ];

  return { onCycle, resonances, summary, steps };
}

function resonanceNote(py: number, avg: number, count: number): string {
  const strength = avg >= 7 ? "high-impact" : avg >= 4 ? "mid-impact" : "low-impact";
  const theme = PY_THEME_SHORT[py] ?? "";
  return `PY ${py} (${theme}): ${count} recorded ${strength} event${count > 1 ? "s" : ""}, average ${avg.toFixed(1)}/10.`;
}

const PY_THEME_SHORT: Record<number, string> = {
  1: "beginnings",
  2: "patience",
  3: "expression",
  4: "foundations",
  5: "change",
  6: "care/home",
  7: "inner study",
  8: "stewardship",
  9: "completion",
};

/* ------------------------------------------------------------------ */
/* SVG chart geometry                                                  */
/* ------------------------------------------------------------------ */

export interface GraphPoint {
  x: number;
  y: number;
  event: EventOnCycle;
}

export interface GraphGeometry {
  width: number;
  height: number;
  points: GraphPoint[];
  path: string;
  cycleTicks: { x: number; label: string }[];
}

/**
 * Chart: x = year (birth → now), y = impact 1-10. A dotted personal-year
 * cycle ribbon (1-9 sawtooth) runs beneath the events.
 */
export function graphGeometry(
  events: LifeEvent[],
  birthYear: number,
  birthMonth: number,
  birthDay: number,
  nowYear: number,
  width = 800,
  height = 320,
): GraphGeometry {
  const padL = 44;
  const padR = 16;
  const padT = 16;
  const padB = 36;
  const minYear = birthYear;
  const maxYear = Math.max(nowYear, ...events.map((e) => e.year), birthYear + 1);

  const xFor = (year: number): number =>
    padL + ((year - minYear) / Math.max(1, maxYear - minYear)) * (width - padL - padR);
  const yFor = (impact: number): number =>
    padT + (1 - (impact - 1) / 9) * (height - padT - padB);

  const sorted = [...events].filter((e) => e.year >= birthYear).sort((a, b) => a.year - b.year);
  const points: GraphPoint[] = sorted.map((e) => ({
    x: xFor(e.year),
    y: yFor(e.impact),
    event: {
      event: e,
      personalYear: personalYearForEvent(e.year, birthMonth, birthDay),
      cycleAge: e.year - birthYear,
    },
  }));

  // Smooth polyline through the events.
  const path = points
    .map((p, i) => {
      if (i === 0) return `M ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
      const prev = points[i - 1];
      const cx = (prev.x + p.x) / 2;
      return `C ${cx.toFixed(1)} ${prev.y.toFixed(1)}, ${cx.toFixed(1)} ${p.y.toFixed(1)}, ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
    })
    .join(" ");

  const cycleTicks: { x: number; label: string }[] = [];
  for (let year = birthYear; year <= maxYear; year++) {
    cycleTicks.push({ x: xFor(year), label: String(year) });
  }

  return { width, height, points, path, cycleTicks };
}