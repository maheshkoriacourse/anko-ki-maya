"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Sparkles, LayoutDashboard, Hash, CalendarRange, Map, BookOpen,
  Settings, Moon, Sun, Printer,
} from "lucide-react";
import { Button } from "@/components/ui";
import { DisclaimerLine } from "@/components/shared";
import { useHasProfile } from "@/components/seeded-profile";

export const NAV_ITEMS = [
  { href: "/overview", label: "Overview", icon: LayoutDashboard },
  { href: "/numbers", label: "Your Numbers", icon: Hash },
  { href: "/forecast", label: "Six-Month Forecast", icon: CalendarRange },
  { href: "/longterm", label: "Long-Term Map", icon: Map },
  { href: "/journal", label: "Journal", icon: BookOpen },
  { href: "/settings", label: "Settings & Privacy", icon: Settings },
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

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { hasProfile } = useHasProfile();
  const isOnboarding = pathname === "/";
  const isCompatibility = pathname === "/compatibility";
  const isReport = pathname === "/report";
  const bare = isOnboarding || isCompatibility || isReport;

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
              <span>{item.label}</span>
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
        Anko Ki Maya
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
              {isReport ? (
                <Button variant="outline" size="sm" className="no-print" onClick={() => window.print()}>
                  <Printer aria-hidden /> Print / Save PDF
                </Button>
                ) : null}
              <ThemeToggle />
            </div>
          </div>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh starfield">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r bg-card/60 px-4 py-6 backdrop-blur md:flex no-print">
        {brand}
        {nav}
        <div className="mt-auto flex items-center justify-between px-1 pt-6">
          <span className="text-xs text-muted-foreground">v1 · self-reflection</span>
          <ThemeToggle />
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b bg-card/80 px-4 py-3 backdrop-blur md:hidden no-print">
        {brand}
        <ThemeToggle />
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
                aria-label={item.label}
              >
                <item.icon className="size-5" aria-hidden />
                <span aria-hidden>{item.label.split(" ")[0]}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}