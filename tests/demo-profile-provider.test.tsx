import * as React from "react";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { LangProvider } from "@/lib/lang";
import { KEYS } from "@/lib/storage";
import { SeededProfileBoot, useProfile } from "@/components/seeded-profile";

function ProfileProbe() {
  const { profile } = useProfile();
  return <output>{profile ? `${profile.birthName}:${profile.isDemoProfile ? "sample" : "customer"}` : "no profile"}</output>;
}

function renderProfileProbe() {
  return render(<LangProvider><SeededProfileBoot><ProfileProbe /></SeededProfileBoot></LangProvider>);
}

describe("demo seeding and explicit deletion", () => {
  afterEach(() => {
    cleanup();
    Object.values(KEYS).forEach((key) => window.localStorage.removeItem(key));
  });

  it("keeps the first-visit example explicitly marked as sample data", async () => {
    renderProfileProbe();
    await waitFor(() => expect(screen.getByText("Aarav Mehta:sample")).toBeInTheDocument());
  });

  it("does not recreate any profile after the user opted out of demo seeding", async () => {
    window.localStorage.setItem(KEYS.demoSeedOptOut, JSON.stringify(true));
    renderProfileProbe();
    await waitFor(() => expect(screen.getByText("no profile")).toBeInTheDocument());
    expect(window.localStorage.getItem(KEYS.profile)).toBeNull();
  });
});
