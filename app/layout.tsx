import type { Metadata, Viewport } from "next";
import { Inter, Sora, Cormorant_Garamond } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import AppShell from "@/components/app-shell";
import { SeededProfileBoot } from "@/components/seeded-profile";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Anko Ki Maya — Numbers for self-reflection",
    template: "%s · Anko Ki Maya",
  },
  description:
    "A calm, reflective numerology companion: explore your core numbers, cycles and Lo Shu grid as themes for self-reflection — never predictions.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF8F5" },
    { media: "(prefers-color-scheme: dark)", color: "#14101F" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} ${cormorant.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SeededProfileBoot>
            <AppShell>{children}</AppShell>
          </SeededProfileBoot>
        </ThemeProvider>
      </body>
    </html>
  );
}