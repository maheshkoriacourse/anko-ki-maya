"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Sparkles, LayoutDashboard, Hash, CalendarRange, Map, BookOpen,
  Settings, Moon, Sun, Printer, Grid3X3, Gem, Wand2, LineChart, FileText, Languages, Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui";
import { DisclaimerLine, OmMotif, SanatanDivider } from "@/components/shared";
import { useHasProfile } from "@/components/seeded-profile";
import { useLang } from "@/lib/lang";
import { t as rawT } from "@/lib/content";

/**
 * v3 NAV — report order is the nav order:
 * Overview(अभी का हाल) → जीवन-ग्राफ़ (past auto-reading flagship) →
 * आपके अंक → अंक-चक्र (Numeroscope/LoShu) → राजयोग → भविष्य-दृश्य →
 * दीर्घ-काल → लकी/उपाय → नाम-स्टूडियो → अंक-उपकरण (phone/house/vehicle) →
 * पत्रिका → रिपोर्ट → सेटिंग्स.
 */
export const NAV_ITEMS = [
  { href: "/overview", labelKey: "navOverview", icon: LayoutDashboard },
  { href: "/life-graph", labelKey: "navLifeGraph", icon: LineChart },
  { href: "/numbers", labelKey: "navNumbers", icon: Hash },
  { href: "/loshu", labelKey: "navLoShu", icon: Grid3X3 },
  { href: "/rajyoga", labelKey: "navRajyoga", icon: Sparkles },
  { href: "/forecast", labelKey: "navForecast", icon: CalendarRange },
  { href: "/longterm", labelKey: "navLongterm", icon: Map },
  { href: "/lucky", labelKey: "navLucky", icon: Gem },
  { href: "/name-studio", labelKey: "navNameStudio", icon: Wand2 },
  { href: "/number-tools", labelKey: "navNumberTools", icon: Smartphone },
  { href: "/journal", labelKey: "navJournal", icon: BookOpen },
  { href: "/blueprint", labelKey: "navBlueprint", icon: FileText },
  { href: "/settings", labelKey: "navSettings", icon: Settings },
] as const;

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={mounted && resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {mounted && resolvedTheme === "dark" ? <Sun aria-hidden /> : <Moon aria-hidden />}
    </Button>
  );
}

/** EN ⇄ हिन्दी toggle — ALWAYS in the top nav (owner order). */
function LangToggle() {
  const { lang, setLang } = useLang();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div
      role="group"
      aria-label="Language / Bhasha"
      className="flex items-center rounded-full border bg-card/70 p-0.5 text-xs font-semibold"
    >
      <button
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </button>
      <button
        aria-pressed={lang === "hi"}
        onClick={() => setLang("hi")}
        className={`rounded-full px-2.5 py-1 font-devanagari transition-colors ${
          lang === "hi" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        हिं
      </button>
    </div>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { hasProfile } = useHasProfile();
  const { lang } = useLang();
  const t = (key: string) => rawT(lang, key);
  const isOnboarding = pathname === "/";
  const isCompatibility = pathname === "/compatibility";
  const isReport = pathname === "/report";
  const isBlueprint = pathname === "/blueprint";
  const bare = isOnboarding || isCompatibility || isReport || isBlueprint;

  // v3.1: app-wide fixed divine-bg texture (lazy: painted by CSS after first
  // paint, never blocks LCP).
  const divineBg = <div aria-hidden className="divine-bg-layer" />;

  function isActive(href: string) {
    if (href === "/overview") return pathname === "/overview" || pathname === "/compatibility";
    return pathname.startsWith(href);
  }

  const nav = (
    <nav aria-label="Primary">
      <ul className="space-y-1">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="nav-link"
              aria-current={isActive(item.href) ? "page" : undefined}
              data-active={isActive(item.href)}
              tabIndex={hasProfile ? 0 : -1}
              aria-disabled={!hasProfile}
              onClick={(e) => {
                if (!hasProfile) e.preventDefault();
              }}
            >
              <item.icon className="size-5" aria-hidden />
              <span>{t(item.labelKey)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

  const brand = (
    <Link
      href="/"
      className="mb-6 flex items-center gap-2.5 px-1"
      aria-label="Anko Ki Maya home"
    >
      <span
        aria-hidden
        className="mandala-ring grid size-9 place-items-center rounded-full bg-primary text-primary-foreground"
      >
        <OmMotif className="text-lg" />
      </span>
      <span className="font-display text-lg font-semibold tracking-tight">
        {t("appName")}
      </span>
    </Link>
  );

  if (bare) {
    // v3.4 (owner: 'blueprint pe nav options chale jaate'): bare pages keep
    // their clean print column, but gain a compact NAV CHIPS row so the
    // app is never more than one tap away on desktop + mobile.
    const bareNavKeys = [
      "/overview",
      "/life-graph",
      "/numbers",
      "/loshu",
      "/forecast",
      "/lucky",
      "/report",
    ] as const;
    const chips = NAV_ITEMS.filter((i) => (bareNavKeys as readonly string[]).includes(i.href));
    return (
      <div className="min-h-dvh starfield diya-glow">
        {divineBg}
        <div className="mx-auto max-w-5xl px-4 py-6 sm:py-10">
          <div className="mb-3 flex items-center justify-between">
            {brand}
            <div className="flex items-center gap-1.5">
              <LangToggle />
              {isReport || isBlueprint ? (
                <Button variant="outline" size="sm" className="no-print" onClick={() => window.print()}>
                  <Printer aria-hidden /> {t("printPdf")}
                </Button>
              ) : null}
              <ThemeToggle />
            </div>
          </div>
          <nav aria-label="Compact primary" className="no-print mb-8 flex flex-wrap gap-2">
            {chips.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-chip rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card/70 text-muted-foreground hover:text-foreground"
                }`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh starfield diya-glow-fixed">
      {divineBg}
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r bg-card/70 px-4 py-6 backdrop-blur md:flex no-print">
        {brand}
        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          {nav}
        </div>
        <div className="mt-4 flex items-center justify-between px-1 pt-3">
          <span className="text-[11px] text-muted-foreground">v3 · Sanatan</span>
          <div className="flex items-center gap-1.5">
            <LangToggle />
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Mobile top bar — lang toggle ALWAYS visible */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b bg-card/80 px-4 py-3 backdrop-blur md:hidden no-print">
        {brand}
        <div className="flex items-center gap-1.5">
          <LangToggle />
          <ThemeToggle />
        </div>
      </header>

      {/* Content */}
      <div className="md:pl-64">
        <main id="main" className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 md:py-10">
          {children}
        </main>
        <footer className="mx-auto max-w-5xl px-4 pb-24 md:pb-10 md:pl-0">
          <SanatanDivider className="mb-4 opacity-70" />
          <DisclaimerLine />
        </footer>
      </div>

      {/* Mobile bottom nav */}
      <nav
        aria-label="Primary mobile"
        className="fixed inset-x-0 bottom-0 z-50 border-t bg-card/95 backdrop-blur md:hidden no-print"
      >
        <ul className="mx-auto flex max-w-md items-stretch justify-between px-1">
          {NAV_ITEMS.slice(0, 5).map((item) => (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-1 py-2 text-[10px] font-medium ${
                  isActive(item.href) ? "text-primary" : "text-muted-foreground"
                }`}
                aria-current={isActive(item.href) ? "page" : undefined}
                aria-label={t(item.labelKey)}
              >
                <item.icon className="size-5" aria-hidden />
                <span aria-hidden>{t(item.labelKey).split(" ")[0]}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}