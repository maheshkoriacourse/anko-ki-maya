/**
 * Anko Ki Maya v2 — storage for life events (extends the v1 storage layer).
 */

"use client";

import { safeGet, safeSet } from "./safe-storage";
import type { LifeEvent } from "./life-events";

const KEY = "akm.v2.lifeEvents";

export function loadLifeEvents(): LifeEvent[] {
  return safeGet<LifeEvent[]>(KEY) ?? [];
}

export function upsertLifeEvent(e: LifeEvent): LifeEvent[] {
  const all = loadLifeEvents();
  const idx = all.findIndex((x) => x.id === e.id);
  if (idx >= 0) all[idx] = e;
  else all.unshift(e);
  safeSet(KEY, all);
  return all;
}

export function deleteLifeEvent(id: string): LifeEvent[] {
  const all = loadLifeEvents().filter((x) => x.id !== id);
  safeSet(KEY, all);
  return all;
}