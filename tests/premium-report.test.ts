import { describe, expect, it } from "vitest";
import { fullReading, personalYear } from "@/lib/numerology";
import { buildJournalRecap, buildPremiumReport, nameMappingLabel, parseLifeContextForReport, personalYearFor } from "@/lib/premium-report";
import type { LifeContext, Profile } from "@/lib/storage";

const profile: Profile = {
  birthName: "Aarav Mehta",
  preferredName: "Aarav",
  birthDate: "1990-06-15",
  birthTime: "",
  birthplace: "",
  system: "pythagorean",
  consentAcceptedAt: "2026-01-01T00:00:00.000Z",
};
const reading = fullReading({ birthName: profile.birthName, preferredName: profile.preferredName, year: 1990, month: 6, day: 15, system: profile.system });

const context: LifeContext = {
  birthDate: profile.birthDate,
  focus: "career",
  currentChallenge: "I have too many priorities",
  desiredOutcome: "A steadier role",
  importantDecision: "Whether to accept a management role",
  careerCrossroad: "Two interviews scheduled; limited relocation flexibility",
  anchors: [{ id: "a1", year: 2021, area: "career", note: "Changed teams" }],
  updatedAt: "2026-01-01T00:00:00.000Z",
};

describe("premium report evidence and personalisation", () => {
  it("uses consistent modern-style labels for the name table", () => {
    expect(nameMappingLabel("pythagorean")).toBe("Pythagorean-style");
    expect(nameMappingLabel("chaldean")).toBe("Chaldean-style");
    expect(reading.nameNumbers.expressionSteps[0]).toContain("Pythagorean-style");
    const report = buildPremiumReport({ profile, reading, context, year: 2026, lang: "en" });
    expect(report.evidence[0].label).toContain("Pythagorean-style name table");
  });

  it("recaps only explicitly consented, valid user-written journal entries in dated 7/30-day windows", () => {
    const notes = [
      { ownerBirthDate: profile.birthDate, date: "2026-10-06", mood: "Mixed", category: "Career", text: "A direct note" },
      { ownerBirthDate: profile.birthDate, date: "2026-09-06", mood: "Neutral", category: "Reflection", text: "Outside 30 days" },
      { ownerBirthDate: profile.birthDate, date: "2026-10-07", mood: "Heavy", category: "Wellbeing", text: "Future entry" },
      { ownerBirthDate: profile.birthDate, date: "not-a-date", mood: "Heavy", category: "Wellbeing", text: "Invalid date" },
      { ownerBirthDate: profile.birthDate, date: "2026-10-04", mood: "Unknown", category: "Career", text: "Invalid mood" },
      { date: "2026-10-05", mood: "Heavy", category: "Reflection", text: "Legacy note without an owner" },
      { ownerBirthDate: "1980-01-01", date: "2026-10-05", mood: "Heavy", category: "Reflection", text: "Another profile's note" },
    ];
    expect(buildJournalRecap(JSON.stringify(notes), false, "2026-10-06", profile.birthDate)).toBeNull();
    const recap = buildJournalRecap(JSON.stringify(notes), true, "2026-10-06", profile.birthDate);
    expect(recap?.week.map((entry) => entry.text)).toEqual(["A direct note"]);
    expect(recap?.month.map((entry) => entry.text)).toEqual(["A direct note"]);
    expect(buildJournalRecap("malformed", true, "2026-10-06", profile.birthDate)).toEqual({ week: [], month: [] });
  });

  it("fails closed on malformed or profile-mismatched saved context", () => {
    expect(parseLifeContextForReport("not-json", profile.birthDate)).toBeNull();
    expect(parseLifeContextForReport(JSON.stringify({ birthDate: "2001-01-01", focus: "career" }), profile.birthDate)).toBeNull();
    expect(parseLifeContextForReport(JSON.stringify({ birthDate: profile.birthDate, focus: "invented" }), profile.birthDate)).toBeNull();
  });

  it("bounds and normalizes old or malformed optional fields instead of crashing the report", () => {
    const saved = JSON.stringify({
      birthDate: profile.birthDate,
      focus: "career",
      currentChallenge: { unexpected: true },
      anchors: [
        { id: "ok", year: 2020, area: "career", note: "A user note" },
        { year: 9999, area: "career", note: "Out-of-range date" },
        { year: 2021, area: "unknown", note: "Invalid category" },
      ],
      stressLevel: 99,
    });
    const normalized = parseLifeContextForReport(saved, profile.birthDate);
    expect(normalized?.currentChallenge).toBe("");
    expect(normalized?.anchors).toHaveLength(1);
    expect(normalized?.anchors[0].note).toBe("A user note");
    expect(normalized?.stressLevel).toBeUndefined();
  });

  it("uses the app's shared Personal Year calculation, including preserved master numbers", () => {
    for (const year of [2024, 2025, 2026, 2027, 2030, 2033]) {
      expect(personalYearFor(6, 15, year)).toBe(personalYear(6, 15, year).number);
    }
  });

  it("builds a transparent 12-month map from the selected start month across the year boundary", () => {
    const report = buildPremiumReport({ profile, reading, context, year: 2026, month: 11, lang: "en" });
    expect(report.months).toHaveLength(12);
    expect(report.months[0]).toMatchObject({ label: "November 2026", year: 2026, month: 11 });
    expect(report.months[1]).toMatchObject({ label: "December 2026", year: 2026, month: 12 });
    expect(report.months[2]).toMatchObject({ label: "January 2027", year: 2027, month: 1 });
    expect(report.months[2].personalYear).toBe(personalYear(6, 15, 2027).number);
    expect(report.months.every((item) => item.question && item.move && item.watchOut && item.calculation)).toBe(true);
    expect(report.monthAnchor).toContain("Whether to accept a management role");
    expect(report.monthAnchor).toContain("A steadier role");
  });

  it("displays a preserved Personal Month master number while using its reduced digit only for the reflection prompt", () => {
    const report = buildPremiumReport({ profile, reading, context, year: 2026, month: 7, lang: "en" });
    expect(report.months[0].personalMonth).toBe(11);
    expect(report.months[0].calculation).toContain("= 11");
    expect(report.months[0].lens).toBe("cooperation and patient listening");
  });

  it("does not invent biography when the person has shared no context", () => {
    const report = buildPremiumReport({ profile, reading, context: null, year: 2026, lang: "en" });
    expect(report.evidence.some((item) => item.kind === "insufficient")).toBe(true);
    expect(report.summary).toContain("not enough information");
    expect(report.userFacts).toHaveLength(0);
    expect(report.timeline).toHaveLength(0);
    expect(report.scenarios).toHaveLength(0);
    expect(report.months).toHaveLength(12);
    expect(report.monthAnchor).toBeNull();
  });

  it("does not present generated scenarios as personal when the only saved context is a default focus", () => {
    const report = buildPremiumReport({
      profile,
      reading,
      context: { ...context, currentChallenge: "", desiredOutcome: "", importantDecision: "", careerCrossroad: "", anchors: [] },
      year: 2026,
      lang: "en",
    });
    expect(report.evidence.some((item) => item.kind === "insufficient")).toBe(true);
    expect(report.summary).toContain("not enough information");
    expect(report.scenarios).toHaveLength(0);
  });

  it("quotes only user-entered timeline/context and labels future content as scenarios", () => {
    const report = buildPremiumReport({ profile, reading, context, year: 2026, lang: "en" });
    expect(report.userFacts.join(" ")).toContain("I have too many priorities");
    expect(report.userFacts.join(" ")).toContain("2021");
    expect(report.timeline[0]).toMatchObject({ year: 2021, note: "Changed teams" });
    expect(report.timelinePattern).toContain("A single date-cycle");
    expect(report.scenarios).toHaveLength(3);
    expect(report.scenarios.map((scenario) => scenario.horizon)).toEqual([
      "Next 7 days · observe",
      "Next 7 days · small test",
      "Next 30 days · set a boundary",
    ]);
    for (const scenario of report.scenarios) {
      expect(scenario.signal).toBeTruthy();
      expect(scenario.counterSignal).toBeTruthy();
      expect(scenario.nextStep).toBeTruthy();
      expect(scenario.basis).toContain("Personal Year");
      expect(scenario.basis).toContain("I have too many priorities");
      expect(scenario.basis).toContain("Two interviews scheduled; limited relocation flexibility");
      expect(scenario.basis).toContain("A steadier role");
      expect(scenario.basis).toContain("does not establish this scenario's likelihood");
    }
    expect(report.patternQuestion).toContain("limited authority");
    expect(report.evidence.some((item) => item.kind === "scenario")).toBe(true);
  });

  it("surfaces a repeated user-year cycle as an arithmetic pattern, not a causal claim", () => {
    const anchored = {
      ...context,
      anchors: [
        { id: "a1", year: 2016, area: "career" as const, note: "Changed teams" },
        { id: "a2", year: 2025, area: "career" as const, note: "Started a new role" },
      ],
    };
    const report = buildPremiumReport({ profile, reading, context: anchored, year: 2026, lang: "en" });
    expect(report.timeline[0].cycle).toBe(report.timeline[1].cycle);
    expect(report.timelinePattern).toContain("2016 and 2025");
    expect(report.timelinePattern).toContain("not a cause");
  });

  it("shows transparent calculation steps for every core value", () => {
    const report = buildPremiumReport({ profile, reading, context, year: 2026, lang: "hi" });
    expect(report.calculations).toHaveLength(6);
    expect(report.calculations.every((item) => item.steps.length > 0)).toBe(true);
    expect(report.cycleMethod).toContain("11/22/33");
    expect(report.cycleMethod).toContain("Calendar-year paddhati (1 Jan–31 Dec)");
    expect(report.scenarios[0].basis).toContain("Aapke diye sandarbh");
    expect(report.scenarios[0].basis).toContain("Personal Year");
    expect(report.scenarios[0].basis).toContain("nateeja nahi batata");
  });
});
