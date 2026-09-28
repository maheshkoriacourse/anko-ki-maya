/**
 * Anko Ki Maya — local data layer (localStorage only, no paid APIs).
 * Versioned under the `akm.v1` prefix so future migrations are safe.
 * Export/delete are the user's rights — wired in Settings.
 */

"use client";

import { sanitizeName } from "./numerology";
import { DISCLAIMER } from "./meanings";

const PREFIX = "akm.v1";
export const KEYS = {
  profile: `${PREFIX}.profile`,
  consent: `${PREFIX}.consent`,
  theme: `${PREFIX}.theme`,
  notifications: `${PREFIX}.notifications`,
  journal: `${PREFIX}.journal`,
  milestones: `${PREFIX}.milestones`,
  compatibility: `${PREFIX}.compatibility`,
} as const;

export const JOURNAL_CATEGORIES = [
  "Reflection", "Gratitude", "Career", "Relationships",
  "Money Mindset", "Wellbeing", "Creativity", "Cycle note",
] as const;
export type JournalCategory = (typeof JOURNAL_CATEGORIES)[number];

export const MOODS = ["Calming", "Neutral", "Energising", "Heavy", "Mixed"] as const;
export type Mood = (typeof MOODS)[number];

export interface Profile {
  birthName: string;
  preferredName: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // optional, HH:MM (v1: informational only)
  birthplace: string; // optional, free text (v1: informational only)
  system: "pythagorean" | "chaldean";
  consentAcceptedAt: string;
}

export interface JournalEntry {
  id: string;
  createdAt: string;
  updatedAt?: string;
  date: string; // YYYY-MM-DD
  mood: Mood;
  category: JournalCategory;
  text: string;
  linkedCycle?: string; // e.g. "Personal Year 8 · 2026" — optional tag
}

export interface Milestone {
  id: string;
  date: string; // YYYY-MM-DD (user-chosen)
  title: string;
  note?: string;
}

export interface NotificationPrefs {
  dailyPrompt: boolean;
  cycleReminders: boolean;
  quietHours: string; // e.g. "21:00" — informational in v1
}

export const DEFAULT_NOTIFICATIONS: NotificationPrefs = {
  dailyPrompt: false,
  cycleReminders: false,
  quietHours: "21:00",
};

function safeGet<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    void err;
    return null;
  }
}

function safeSet(key: string, value: unknown): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
 }
}

export function loadProfile(): Profile | null {
  return safeGet<Profile>(KEYS.profile);
}

export function saveProfile(p: Omit<Profile, "consentAcceptedAt"> & { consentAcceptedAt?: string }): Profile {
  const full: Profile = {
    ...p,
    birthName: sanitizeName(p.birthName),
    preferredName: sanitizeName(p.preferredName || ""),
    consentAcceptedAt: p.consentAcceptedAt ?? new Date().toISOString(),
  };
  safeSet(KEYS.profile, full);
  return full;
}

export function loadConsent(): boolean {
  return safeGet<boolean>(KEYS.consent) === true;
}

export function saveConsent(): void {
  safeSet(KEYS.consent, true);
}

export function saveTheme(mode: "light" | "dark" | "system"): void {
  safeSet(KEYS.theme, mode);
}

export function loadTheme(): "light" | "dark" | "system" | null {
  return safeGet<"light" | "dark" | "system">(KEYS.theme);
}

export function saveNotifications(prefs: NotificationPrefs): void {
  safeSet(KEYS.notifications, prefs);
}

export function loadNotifications(): NotificationPrefs {
  return safeGet<NotificationPrefs>(KEYS.notifications) ?? DEFAULT_NOTIFICATIONS;
}

export function loadJournal(): JournalEntry[] {
  return safeGet<JournalEntry[]>(KEYS.journal) ?? [];
}

export function upsertJournalEntry(entry: JournalEntry): JournalEntry[] {
  const all = loadJournal();
  const idx = all.findIndex((e) => e.id === entry.id);
  if (idx >= 0) {
    entry.updatedAt = new Date().toISOString();
    all[idx] = entry;
  } else {
    all.unshift(entry);
  }
  safeSet(KEYS.journal, all);
  return all;
}

export function deleteJournalEntry(id: string): JournalEntry[] {
  const all = loadJournal().filter((e) => e.id !== id);
  safeSet(KEYS.journal, all);
  return all;
}

export function loadMilestones(): Milestone[] {
  return safeGet<Milestone[]>(KEYS.milestones) ?? [];
}

export function upsertMilestone(m: Milestone): Milestone[] {
  const all = loadMilestones();
  const idx = all.findIndex((x) => x.id === m.id);
  if (idx >= 0) all[idx] = m;
  else all.push(m);
  safeSet(KEYS.milestones, all);
  return all;
}

export function deleteMilestone(id: string): Milestone[] {
  const all = loadMilestones().filter((x) => x.id !== id);
  safeSet(KEYS.milestones, all);
  return all;
}

/** Demo profile used by the seeded demo state and tests. */
export function demoProfile(): Profile {
  return {
    birthName: "Aarav Mehta",
    preferredName: "Aarav",
    birthDate: "1990-06-15",
    birthTime: "",
    birthplace: "",
    system: "pythagorean",
    consentAcceptedAt: "2026-09-28T09:00:00.000Z",
  };
}

export function exportAllData(): string {
  return JSON.stringify(
    {
      app: "Anko Ki Maya",
      exportedAt: new Date().toISOString(),
      disclaimer: DISCLAIMER,
      profile: loadProfile(),
      consent: loadConsent(),
      notifications: loadNotifications(),
      journal: loadJournal(),
      milestones: loadMilestones(),
    },
    null,
    2,
  );
}

export function deleteAllData(): void {
  if (typeof window === "undefined") return;
  Object.values(KEYS).forEach((k) => window.localStorage.removeItem(k));
}