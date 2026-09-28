import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond, Cinzel, Noto_Serif_Devanagari } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import AppShell from "@/components/app-shell";
import { SeededProfileBoot } from "@/components/seeded-profile";
import { LangProvider } from "@/lib/lang";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
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
    default: "Anko Ki Maya — Numbers for self-reflection",
    template: "%s · Anko Ki Maya",
  },
  description:
    "A calm, reflective numerology companion: explore your core numbers, cycles, Lo Shu grid and life blueprint as themes for self-reflection — never predictions.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f1e8" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0a1a" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${cormorant.variable} ${cinzel.variable} ${notoDevanagari.variable} font-sans`}
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