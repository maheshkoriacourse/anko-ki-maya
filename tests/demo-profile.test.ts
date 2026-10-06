import { afterEach, describe, expect, it } from "vitest";
import { deleteAllData, demoProfile, hasDisabledDemoSeed, KEYS, loadProfile, saveProfile } from "@/lib/storage";

describe("sample profile provenance", () => {
  afterEach(() => {
    window.localStorage.removeItem(KEYS.profile);
    window.localStorage.removeItem(KEYS.demoSeedOptOut);
  });

  it("marks the built-in example as sample data", () => {
    expect(demoProfile().isDemoProfile).toBe(true);
  });

  it("clears the sample marker when real profile details are saved", () => {
    saveProfile(demoProfile());
    expect(loadProfile()?.isDemoProfile).toBe(true);

    saveProfile({
      birthName: "Nisha Rao",
      preferredName: "Nisha",
      birthDate: "1992-04-17",
      birthTime: "",
      birthplace: "",
      system: "pythagorean",
    });
    expect(loadProfile()?.isDemoProfile).toBe(false);
  });

  it("does not recreate a sample profile after an explicit data deletion", () => {
    saveProfile(demoProfile());
    deleteAllData();
    expect(loadProfile()).toBeNull();
    expect(hasDisabledDemoSeed()).toBe(true);

    saveProfile(demoProfile()); // explicit reset-to-demo is an opt-in
    expect(hasDisabledDemoSeed()).toBe(false);
    expect(loadProfile()?.isDemoProfile).toBe(true);
  });
});
