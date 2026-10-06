"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  LayoutDashboard, Hash, CalendarRange, Map, BookOpen,
  Settings, Moon, Sun, Printer, Grid3X3, Gem, Wand2, FileText, Smartphone,
  Compass, Crown } from "lucide-react";
import { Button } from "@/components/ui";
import { DisclaimerLine, OmMotif, SanatanDivider } from "@/components/shared";
import { useHasProfile } from "@/components/seeded-profile";
import { useLang } from "@/lib/lang";
import { t as rawT } from "@/lib/content";

/**
 * v3 NAV — report order is the nav order:
 * Overview → evidence-labelled personal report → forecast and journal →
 * calibration → calculation/number tools → settings and separate services.
 */
export const NAV_ITEMS = [
  { href: "/overview", labelKey: "navOverview", icon: LayoutDashboard },
  { href: "/blueprint", labelKey: "navBlueprint", icon: FileText },
  { href: "/forecast", labelKey: "navForecast", icon: CalendarRange },
  { href: "/journal", labelKey: "navJournal", icon: BookOpen },
  { href: "/calibration", labelKey: "navCalibration", icon: Compass },
  { href: "/numbers", labelKey: "navNumbers", icon: Hash },
  { href: "/loshu", labelKey: "navLoShu", icon: Grid3X3 },
  { href: "/longterm", labelKey: "navLongterm", icon: Map },
  { href: "/lucky", labelKey: "navLucky", icon: Gem },
  { href: "/name-studio", labelKey: "navNameStudio", icon: Wand2 },
  { href: "/number-tools", labelKey: "navNumberTools", icon: Smartphone },
  { href: "/settings", labelKey: "navSettings", icon: Settings },
  { href: "/concierge", labelKey: "navConcierge", icon: Crown },
] as const;

const PRIMARY_HREFS = new Set(["/overview", "/blueprint", "/forecast", "/journal"]);
const MOBILE_LABELS: Record<string, { en: string; hi: string }> = {
  "/overview": { en: "Today", hi: "Abhi" },
  "/blueprint": { en: "Report", hi: "Report" },
  "/forecast": { en: "Next", hi: "Aage" },
  "/journal": { en: "Journal", hi: "Journal" },
};

const subscribeMounted = () => () => {};
function useMounted(): boolean {
  return React.useSyncExternalStore(subscribeMounted, () => true, () => false);
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
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

/** EN ⇄ Roman Hinglish toggle — ALWAYS in the top nav (owner order). */
function LangToggle() {
  const { lang, setLang } = useLang();
  const mounted = useMounted();
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
        HI
      </button>
    </div>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { hasProfile, isDemoProfile } = useHasProfile();
  const { lang } = useLang();
  const t = (key: string) => rawT(lang, key);
  const isOnboarding = pathname === "/";
  const isReport = pathname === "/report";
  const isBlueprint = pathname === "/blueprint";
  const isDossier = pathname === "/dossier";
  const bare = isOnboarding || isReport || isBlueprint || isDossier;

  // v3.1: app-wide fixed divine-bg texture (lazy: painted by CSS after first
  // paint, never blocks LCP).
  const divineBg = (
    <>
      <div aria-hidden className="divine-bg-layer" />
      <div aria-hidden className="constellation-corners" />
    </>
  );

  const sampleNotice = isDemoProfile ? (
    <div role="status" className="no-print mx-auto mb-4 max-w-5xl rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm leading-5">
      {lang === "hi"
        ? "Yeh namoona profile hai — yeh aapki personal reading nahi. Apni janm-tithi bhar kar ise badlein."
        : "Sample profile active — this is an illustration, not your personal reading. Enter your own birth details to replace it."}
    </div>
  ) : null;

  function isActive(href: string) {
    if (href === "/overview") return pathname === "/overview";
    return pathname.startsWith(href);
  }

  function navLinks(items: readonly (typeof NAV_ITEMS)[number][]) {
    return items.map((item) => (
      <li key={item.href}>
        <Link
          href={item.href}
          className="nav-link"
          aria-current={isActive(item.href) ? "page" : undefined}
          data-active={isActive(item.href)}
          tabIndex={hasProfile ? 0 : -1}
          aria-disabled={!hasProfile}
          onClick={(e) => { if (!hasProfile) e.preventDefault(); }}
        >
          <item.icon className="sidebar-glyph size-5" aria-hidden />
          <span>{t(item.labelKey)}</span>
        </Link>
      </li>
    ));
  }

  const nav = (
    <nav aria-label="Primary">
      <ul className="space-y-1">
        {navLinks(NAV_ITEMS.filter((item) => PRIMARY_HREFS.has(item.href)))}
      </ul>
      <details className="mt-4 rounded-xl border border-border/70 p-2">
        <summary className="cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-accent hover:text-foreground">
          {lang === "hi" ? "Ank aur tools" : "Explore your chart"}
        </summary>
        <ul className="mt-2 space-y-1">
          {navLinks(NAV_ITEMS.filter((item) => !PRIMARY_HREFS.has(item.href)))}
        </ul>
      </details>
    </nav>
  );

  const brandOnly = (
    <Link
      href="/"
      className="mb-1 flex items-center gap-2.5 px-1"
      aria-label="Anko Ki Maya home"
    >
      <span
        aria-hidden
        className="mandala-ring grid size-9 place-items-center rounded-full bg-primary text-primary-foreground"
      >
        <OmMotif className="text-lg" />
      </span>
      <span className="sidebar-brand font-dossier text-lg tracking-tight">
        {t("appName")}
      </span>
    </Link>
  );
  const brand = (
    <div>
      {brandOnly}
      <hr aria-hidden className="sidebar-brand-rule m-0 px-1" />
      <div className="mb-4 mt-3 flex items-center justify-between px-1">
        <span className="sidebar-foot text-[11px] opacity-0 md:hidden">v3 · Sanatan</span>
        <div className="ml-auto flex items-center gap-1.5">
          <LangToggle />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );

  if (isOnboarding) {
    return (
      <div className="landing-shell min-h-dvh">
        <header className="landing-site-header no-print">
          <div className="landing-site-header-inner">
            {brandOnly}
            <nav aria-label="About Anko Ki Maya" className="landing-header-links">
              <Link href="#approach">{lang === "hi" ? "Hamara tareeqa" : "Our approach"}</Link>
              <Link href="#sample-reading">{lang === "hi" ? "Reading ka namoona" : "A sample reading"}</Link>
              <Link href="/concierge">{lang === "hi" ? "Private blueprint" : "Private blueprint"}</Link>
            </nav>
            <div className="landing-header-actions">
              <LangToggle />
              <ThemeToggle />
              <Link href="#begin-reading" className="landing-header-cta">
                {lang === "hi" ? "Shuru karein" : "Begin"}
              </Link>
            </div>
          </div>
        </header>
        {sampleNotice}
        {children}
        <footer className="landing-site-footer">
          <SanatanDivider className="mb-4 opacity-60" />
          <DisclaimerLine />
        </footer>
      </div>
    );
  }

  if (bare) {
    // v3.4 (owner: 'blueprint pe nav options chale jaate'): bare pages keep
    // their clean print column, but gain a compact NAV CHIPS row so the
    // app is never more than one tap away on desktop + mobile.
    const chips = NAV_ITEMS.filter((item) => PRIMARY_HREFS.has(item.href));
    return (
      <div className="min-h-dvh starfield diya-glow sanctum-frame">
        {divineBg}
        <div className="mx-auto max-w-5xl px-4 py-6 sm:py-10">
          <div className="mb-3 flex items-center justify-between">
            {brandOnly}
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
          {hasProfile ? <nav aria-label="Compact primary" className="no-print mb-8 flex flex-wrap gap-2">
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
          </nav> : null}
          {sampleNotice}
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh starfield diya-glow-fixed sanctum-frame">
      {divineBg}
      {/* Desktop sidebar */}
      <aside className="shell-sidebar hidden w-64 flex-col px-4 py-6 md:flex no-print">
        {brand}
        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          {nav}
        </div>
      </aside>

      {/* Mobile top bar — lang toggle ALWAYS visible */}
      <header className="shell-topbar sticky top-0 z-40 flex items-center justify-between gap-2 px-3 py-3 backdrop-blur md:hidden no-print">
        {brandOnly}
        <div className="flex shrink-0 items-center gap-1.5">
          <LangToggle />
          <ThemeToggle />
        </div>
      </header>

      {/* Content */}
      <div className="md:pl-64">
        <main id="main" className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 md:py-10">
          {sampleNotice}
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
        className="shell-bottomnav fixed inset-x-0 bottom-0 z-50 backdrop-blur md:hidden no-print"
      >
        <ul className="mx-auto flex max-w-md items-stretch justify-between px-1">
          {NAV_ITEMS.filter((item) => PRIMARY_HREFS.has(item.href)).map((item) => (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-1 py-2 text-[10px] font-medium ${
                  isActive(item.href) ? "text-gold-bright" : "text-muted-foreground"
                }`}
                data-active={isActive(item.href)}
                aria-current={isActive(item.href) ? "page" : undefined}
                aria-label={t(item.labelKey)}
              >
                <item.icon className="size-5" aria-hidden />
                <span aria-hidden>{MOBILE_LABELS[item.href]?.[lang] ?? t(item.labelKey).split(" ")[0]}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
