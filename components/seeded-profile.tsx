"use client";

/**
 * Seeded-profile context: the app boots with a demo profile on first visit so
 * every screen has content (per spec). Settings → "Reset to demo profile"
 * restores this seed.
 */

import * as React from "react";
import { loadProfile, saveProfile, demoProfile, type Profile } from "@/lib/storage";
import { fullReading, upcomingMonths, type FullReading } from "@/lib/numerology";
import { loShuGrid, type LoShuResult } from "@/lib/loshu";
import { useLang } from "@/lib/lang";

interface Ctx {
  profile: Profile | null;
  hasProfile: boolean;
  reading: FullReading | null;
  loShu: LoShuResult | null;
  today: Date;
  save: (p: Omit<Profile, "consentAcceptedAt">) => void;
  resetToDemo: () => void;
  signOutToOnboarding: () => void;
}

const SeededProfileContext = React.createContext<Ctx | null>(null);

function profileFromStorage(): Profile | null {
  return loadProfile();
}

export function SeededProfileBoot({ children }: { children?: React.ReactNode }) {
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [hydrated, setHydrated] = React.useState(false);
  const today = React.useMemo(() => new Date(), []);
  // v3.4: loShu notes follow the persisted language toggle.
  const { lang: loShuLang } = useLang();

  React.useEffect(() => {
    let p = profileFromStorage();
    if (!p) {
      // Seed the demo profile on first visit (spec: seeded demo profile).
      saveProfile(demoProfile());
      p = profileFromStorage();
    }
    setProfile(p);
    setHydrated(true);
  }, []);

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
      reading,
      loShu,
      today,
      save: (p) => {
        saveProfile(p);
        setProfile(profileFromStorage());
      },
      resetToDemo: () => {
        saveProfile(demoProfile());
        setProfile(profileFromStorage());
      },
      signOutToOnboarding: () => {
        if (typeof window !== "undefined") window.localStorage.removeItem("akm.v1.profile");
        setProfile(null);
      },
    };
  }, [profile, today, loShuLang]);

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

export function useHasProfile(): { hasProfile: boolean } {
  const ctx = React.useContext(SeededProfileContext);
  return { hasProfile: !!ctx?.hasProfile };
}