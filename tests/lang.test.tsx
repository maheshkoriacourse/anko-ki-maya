import * as React from "react";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { LangProvider, useLang } from "@/lib/lang";

function LanguageProbe() {
  const { lang, setLang } = useLang();
  return <div><span>{lang}</span><button onClick={() => setLang("en")}>English</button></div>;
}

describe("persisted language external store", () => {
  afterEach(() => {
    cleanup();
    window.localStorage.removeItem("akm.v3.lang");
  });

  it("reads the saved language on the first hydrated render", () => {
    window.localStorage.setItem("akm.v3.lang", JSON.stringify("en"));
    render(<LangProvider><LanguageProbe /></LangProvider>);
    expect(screen.getByText("en")).toBeInTheDocument();
  });

  it("updates subscribers and persists a same-tab language change", () => {
    render(<LangProvider><LanguageProbe /></LangProvider>);
    fireEvent.click(screen.getByRole("button", { name: "English" }));
    expect(screen.getByText("en")).toBeInTheDocument();
    expect(window.localStorage.getItem("akm.v3.lang")).toBe(JSON.stringify("en"));
  });
});
