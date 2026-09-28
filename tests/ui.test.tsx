import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NumberCard, WhyThisReading, JournalShortcut, dailyPrompt } from "@/components/shared";
import { Tabs } from "@/components/ui";

describe("NumberCard", () => {
  it("renders the number, label and the v3.1 'Basis' explainer", () => {
    render(
      <NumberCard
        data={{
          label: "Life Path",
          number: 4,
          steps: ["Birth date: 15/6/1990", "6 + 6 + 1 = 13", "13 → 4"],
          href: "/numbers#life-path",
        }}
      />,
    );
    expect(screen.getByText("Life Path")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText(/Basis — Life Path/)).toBeInTheDocument();
  });

  it("expands calculation steps for transparency", () => {
    render(
      <NumberCard data={{ label: "Soul Urge", number: 8, steps: ["Vowels only", "Sum = 8 → 8"] }} />,
    );
    fireEvent.click(screen.getByText(/Basis — Soul Urge/));
    expect(screen.getByText("Vowels only")).toBeInTheDocument();
    expect(screen.getByText("On this basis we predict your reading.")).toBeInTheDocument();
  });
});

describe("WhyThisReading (v3.1 Basis block)", () => {
  it("lists every step when opened and closes with the predict line", () => {
    render(<WhyThisReading title="Test" steps={["step one", "step two"]} />);
    fireEvent.click(screen.getByText(/Basis — Test/));
    expect(screen.getByText("step one")).toBeInTheDocument();
    expect(screen.getByText("step two")).toBeInTheDocument();
    expect(screen.getByText("On this basis we predict your reading.")).toBeInTheDocument();
  });

  it("never shows the banned 'Why this reading?' phrasing", () => {
    render(<WhyThisReading title="Test" steps={["a"]} />);
    expect(screen.queryByText(/Why this reading/i)).not.toBeInTheDocument();
  });
});

describe("Tabs (keyboard accessible)", () => {
  const tabs = [
    { id: "a", label: "Alpha" },
    { id: "b", label: "Beta" },
    { id: "c", label: "Gamma" },
  ];
  it("arrow keys move selection", () => {
    let active = "a";
    const { rerender } = render(
      <Tabs
        tabs={tabs}
        active={active}
        ariaLabel="test tabs"
        onChange={(id) => {
          active = id;
          rerender(<Tabs tabs={tabs} active={active} ariaLabel="test tabs" onChange={(i) => (active = i)} />);
        }}
      />,
    );
    const beta = screen.getByRole("tab", { name: "Beta" });
    beta.focus();
    fireEvent.keyDown(beta, { key: "ArrowRight" });
    expect(active).toBe("b");
  });
  it("marks the active tab with aria-selected", () => {
    render(<Tabs tabs={tabs} active="b" ariaLabel="test tabs" onChange={() => {}} />);
    expect(screen.getByRole("tab", { name: "Beta" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Alpha" })).toHaveAttribute("aria-selected", "false");
  });
});

describe("JournalShortcut / dailyPrompt", () => {
  it("rotates the daily prompt by day of year", () => {
    const a = dailyPrompt(new Date("2026-09-28"));
    const b = dailyPrompt(new Date("2026-09-29"));
    expect(a).not.toBe(b);
  });
  it("renders a prompt with a link to the journal", () => {
    render(<JournalShortcut prompt="What felt most 'like me' today?" />);
    expect(screen.getByText("What felt most 'like me' today?")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open journal/i })).toHaveAttribute("href", "/journal");
  });
});