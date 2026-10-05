import type { Metadata, Viewport } from "next";
import { Mukta, Rozha_One, Noto_Serif_Devanagari, Cinzel, Inter, Noto_Serif_Display } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import AppShell from "@/components/app-shell";
import { SeededProfileBoot } from "@/components/seeded-profile";
import { LangProvider } from "@/lib/lang";

/**
 * v3 SANATAN TYPE:
 *  - Display: Rozha One (Devanagari serif — headlines in EN & HI both)
 *  - Body: Mukta (Hindi-first sans with latin coverage)
 *  - Devanagari render+print: Noto Serif Devanagari
 * The v2 Western display stack (Cinzel/Cormorant) is deleted.
 */

const mukta = Mukta({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mukta",
  display: "swap",
});
const rozha = Rozha_One({
  subsets: ["latin", "devanagari"],
  weight: "400",
  variable: "--font-rozha",
  display: "swap",
});
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const notoSerifDisplay = Noto_Serif_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-noto-display",
  display: "swap",
});
const notoDevanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-devanagari",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "अंकों की माया — Anko Ki Maya | Ank Shastra: past, present, future",
    template: "%s · अंकों की माया",
  },
  description:
    "Anko Ki Maya is a numerology-informed reflection on personal patterns, lived context, and decisions ahead—not a guaranteed prediction. Explore number cycles, Lo Shu, and optional traditional practices.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f2ec" },
    { media: "(prefers-color-scheme: dark)", color: "#131720" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi" suppressHydrationWarning>
      <body
        className={`${mukta.variable} ${rozha.variable} ${notoDevanagari.variable} ${cinzel.variable} ${inter.variable} ${notoSerifDisplay.variable} font-sans`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LangProvider>
            <SeededProfileBoot>
              <AppShell>{children}</AppShell>
            </SeededProfileBoot>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
