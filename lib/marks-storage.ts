/**
 * Anko Ki Maya v3 — storage for life-graph year marks (✓ सही / ✗ गलत).
 * Keyed per profile birthDate so multiple profiles don't cross-contaminate.
 */

"use client";

import { safeGet, safeSet } from "./safe-storage";
import type { YearMark } from "./life-graph";

const KEY = "akm.v3.yearMarks";

function bucket(profileKey: string): Record<string, YearMark> {
  const all = safeGet<Record<string, Record<string, YearMark>>>(KEY) ?? {};
  return all[profileKey] ?? {};
}

function write(profileKey: string, marks: Record<string, YearMark>): void {
  const all = safeGet<Record<string, Record<string, YearMark>>>(KEY) ?? {};
  all[profileKey] = marks;
  safeSet(KEY, all);
}

export function loadYearMarks(profileKey: string): YearMark[] {
  return Object.values(bucket(profileKey));
}

/** Set (or replace) the mark for one year. */
export function saveYearMark(profileKey: string, year: number, verdict: YearMark["verdict"]): YearMark[] {
  const marks = bucket(profileKey);
  marks[String(year)] = { year, verdict };
  write(profileKey, marks);
  return Object.values(marks);
}

export function clearYearMarks(profileKey: string): void {
  write(profileKey, {});
}