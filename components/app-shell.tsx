"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Sparkles, LayoutDashboard, Hash, CalendarRange, Map, BookOpen,
  Settings, Moon, Sun, Printer, Grid3X3, Gem, Wand2, LineChart, FileText, Languages,
} from "lucide-react";
import { Button } from "@/components/ui";
import { DisclaimerLine } from "@/components/shared";
import { useHasProfile } from "@/components/seeded-profile";
import { useLang } from "@/lib/lang";
import { t as rawT } from "@/lib/content";

export const NAV_ITEMS = [
  { href: "/overview", labelKey: "navOverview", icon: LayoutDashboard },
  { href: "/numbers", labelKey: "navNumbers", icon: Hash },
  { href: "/loshu", labelKey: "navLoShu", icon: Grid3X3 },
  { href: "/life-events", labelKey: "navLifeEvents", icon: LineChart },
  { href: "/lucky", labelKey: "navLucky", icon: Gem },
  { href: "/name-studio", labelKey: "navNameStudio", icon: Wand2 },
  { href: "/forecast", labelKey: "navForecast", icon: CalendarRange },
  { href: "/longterm", labelKey: "navLongterm", icon: Map },
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

/** EN ⇄ हिन्दी toggle (persisted via the lang module). */
function LangToggle() {
  const { lang, setLang } = useLang();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-1.5 px-2 text-xs"
      aria-label={`Language: switch to ${lang === "en" ? "Hindi" : "English"}`}
      onClick={() => setLang(lang === "en" ? "hi" : "en")}
    >
      <Languages aria-hidden className="size-4 text-gold" />
      <span className={lang === "hi" ? "font-devanagari" : ""}>
        {lang === "en" ? "EN" : "हिन्दी"}
      </span>
    </Button>
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
        className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground"
      >
        <Sparkles className="size-5" />
      </span>
      <span className="font-display text-lg font-semibold tracking-tight">
        {t("appName")}
      </span>
    </Link>
  );

  if (bare) {
    return (
      <div className="min-h-dvh starfield">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:py-10">
          <div className="mb-8 flex items-center justify-between">
            {brand}
            <div className="flex items-center gap-1">
              {isReport || isBlueprint ? (
                <Button variant="outline" size="sm" className="no-print" onClick={() => window.print()}>
                  <Printer aria-hidden /> {t("printPdf")}
                </Button>
              ) : null}
              {isReport ? <LangToggle /> : null}
              <ThemeToggle />
            </div>
          </div>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh starfield aurora-wash-fixed">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r bg-card/60 px-4 py-6 backdrop-blur md:flex no-print">
        {brand}
        {nav}
        <div className="mt-auto flex items-center justify-between px-1 pt-6">
          <span className="text-xs text-muted-foreground">v2 · self-reflection</span>
          <div className="flex items-center gap-1">
            <LangToggle />
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b bg-card/80 px-4 py-3 backdrop-blur md:hidden no-print">
        {brand}
        <div className="flex items-center gap-1">
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