"use client";

/**
 * Seeded-profile context: the app boots with a demo profile on first visit so
 * every screen has content (per spec). Settings → "Reset to demo profile"
 * restores this seed.
 */

import * as React from "react";
import { saveProfile, demoProfile, hasDisabledDemoSeed, disableDemoSeed, type Profile } from "@/lib/storage";
import { fullReading, type FullReading } from "@/lib/numerology";
import { loShuGrid, type LoShuResult } from "@/lib/loshu";
import { useLang } from "@/lib/lang";

interface Ctx {
  profile: Profile | null;
  hasProfile: boolean;
  isDemoProfile: boolean;
  reading: FullReading | null;
  loShu: LoShuResult | null;
  today: Date;
  hydrated: boolean;
  save: (p: Omit<Profile, "consentAcceptedAt">) => void;
  resetToDemo: () => void;
  signOutToOnboarding: () => void;
}

const SeededProfileContext = React.createContext<Ctx | null>(null);
const PROFILE_EVENT = "akm:profile-change";
const SERVER_PROFILE_SNAPSHOT = "\u0000server-profile";

function rawProfileSnapshot(): string {
  try { return window.localStorage.getItem("akm.v1.profile") ?? ""; } catch { return ""; }
}

function parseProfileSnapshot(snapshot: string): Profile | null {
  if (!snapshot || snapshot === SERVER_PROFILE_SNAPSHOT) return null;
  try {
    const value: unknown = JSON.parse(snapshot);
    if (!value || typeof value !== "object") return null;
    const profile = value as Partial<Profile>;
    if (typeof profile.birthName !== "string" || typeof profile.birthDate !== "string" ||
      (profile.system !== "pythagorean" && profile.system !== "chaldean")) return null;
    // Recognize the exact pre-flag built-in sample so users with an older local
    // copy also see the demo label. The fixed original consent timestamp is part
    // of this migration guard; a matching name/date alone is not sufficient.
    const legacySample = profile.birthName === "Aarav Mehta" && profile.preferredName === "Aarav" &&
      profile.birthDate === "1990-06-15" && profile.consentAcceptedAt === "2026-09-28T09:00:00.000Z";
    return { ...profile, isDemoProfile: profile.isDemoProfile === true || legacySample } as Profile;
  } catch { return null; }
}

function subscribeToProfile(onChange: () => void): () => void {
  const onStorage = (event: StorageEvent) => {
    if (!event.key || event.key === "akm.v1.profile") onChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(PROFILE_EVENT, onChange);
  // Preserve the first-visit demo experience, but notify through the external
  // store instead of setting React state from an initialization effect.
  if (!parseProfileSnapshot(rawProfileSnapshot()) && !hasDisabledDemoSeed()) {
    saveProfile(demoProfile());
    onChange();
  }
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(PROFILE_EVENT, onChange);
  };
}

function notifyProfileChange() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(PROFILE_EVENT));
}

export function SeededProfileBoot({ children }: { children?: React.ReactNode }) {
  const profileSnapshot = React.useSyncExternalStore(subscribeToProfile, rawProfileSnapshot, () => SERVER_PROFILE_SNAPSHOT);
  const profile = React.useMemo(() => parseProfileSnapshot(profileSnapshot), [profileSnapshot]);
  const hydrated = profileSnapshot !== SERVER_PROFILE_SNAPSHOT;
  const today = React.useMemo(() => new Date(), []);
  // v3.4: loShu notes follow the persisted language toggle.
  const { lang: loShuLang } = useLang();

  const value = React.useMemo<Ctx>(() => {
    const reading = profile
      ? fullReading({
          birthName: profile.birthName,
          preferredName: profile.preferredName,
          year: Number(profile.birthDate.slice(0, 4)),
          month: Number(profile.birthDate.slice(5, 7)),
          day: Number(profile.birthDate.slice(8, 10)),
          system: profile.system,
        })
      : null;
    const loShu = profile
      ? loShuGrid(
          Number(profile.birthDate.slice(0, 4)),
          Number(profile.birthDate.slice(5, 7)),
          Number(profile.birthDate.slice(8, 10)),
          loShuLang,
        )
      : null;
    return {
      profile,
      hasProfile: !!profile,
      isDemoProfile: profile?.isDemoProfile === true,
      reading,
      loShu,
      today,
      hydrated,
      save: (p) => {
        saveProfile(p);
        notifyProfileChange();
      },
      resetToDemo: () => {
        saveProfile(demoProfile());
        notifyProfileChange();
      },
      signOutToOnboarding: () => {
        if (typeof window !== "undefined") window.localStorage.removeItem("akm.v1.profile");
        disableDemoSeed();
        notifyProfileChange();
      },
    };
  }, [profile, today, hydrated, loShuLang]);

  // The provider is ALWAYS mounted; pre-hydration renders serve null profile.
  // Pages show their own skeleton until effects run (no hydration mismatch).
  return (
    <SeededProfileContext.Provider value={value}>
      {children}
    </SeededProfileContext.Provider>
  );
}

export function useProfile(): Ctx {
  const ctx = React.useContext(SeededProfileContext);
  if (!ctx) throw new Error("useProfile must be used inside SeededProfileBoot");
  return ctx;
}

export function useHasProfile(): { hasProfile: boolean; isDemoProfile: boolean } {
  const ctx = React.useContext(SeededProfileContext);
  return { hasProfile: !!ctx?.hasProfile, isDemoProfile: !!ctx?.isDemoProfile };
}
