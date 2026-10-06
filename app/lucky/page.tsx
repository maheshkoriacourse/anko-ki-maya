"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Palette } from "lucide-react";
import { Card, CardContent } from "@/components/ui";
import { EmptyState, PageHeader } from "@/components/shared";
import { useProfile } from "@/components/seeded-profile";
import { useT } from "@/lib/lang";
import { luckyProfile, type DayCode } from "@/lib/lucky";
import { lifePath, reduceFully } from "@/lib/numerology";

const DAY_LABEL: Record<DayCode, { en: string; hi: string }> = {
  Sun: { en: "Sunday", hi: "Ravivaar" }, Mon: { en: "Monday", hi: "Somvaar" },
  Tue: { en: "Tuesday", hi: "Mangalvaar" }, Wed: { en: "Wednesday", hi: "Budhvaar" },
  Thu: { en: "Thursday", hi: "Guruvaar" }, Fri: { en: "Friday", hi: "Shukravaar" }, Sat: { en: "Saturday", hi: "Shanivaar" },
};

export default function LuckyPage() {
  const { profile, hasProfile } = useProfile();
  const { lang } = useT();
  const hi = lang === "hi";
  if (!hasProfile || !profile) return <EmptyState title={hi ? "Pehle profile poori karein" : "Complete your profile first"} body={hi ? "Birth details se is parampara ke number nikalte hain." : "Your birth details are used to show this tradition's number associations."} />;

  const month = Number(profile.birthDate.slice(5, 7));
  const day = Number(profile.birthDate.slice(8, 10));
  const year = Number(profile.birthDate.slice(0, 4));
  const birthNumber = reduceFully(day);
  const lifePathUnit = reduceFully(lifePath(year, month, day).number);
  const traditional = luckyProfile(day, lifePathUnit, reduceFully);

  return <div className="mx-auto max-w-4xl space-y-6">
    <PageHeader title={hi ? "Ank-parampara · optional associations" : "Number traditions · optional associations"} subtitle={hi ? "Ek numerology table se jude number, din aur rang. Inhe apni pasand ki mnemonic samjhein—na taqdeer, na date-selection advice." : "Numbers, days, and colors associated in one numerology table. Treat them as optional personal mnemonics—not fate or date-selection advice."} />
    <aside className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm leading-6">{hi ? "Is app ka ank aapki shaadi, sehat, dhan, safalta ya kisi tareekh ki shubhata tay nahi kar sakta. Gemstone, daan, ritual ya paid service khareedna zaroori nahi. Bade faisle vyavaharik jaankari aur apni zaroorat se lein." : "A number cannot determine marriage, health, wealth, success, or whether a date is auspicious. You do not need to buy a gemstone, donation, ritual, or paid service. Make important decisions using practical information and your own needs."}</aside>
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="glass"><CardContent className="py-5"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{hi ? "Janmank · ganit" : "Birth number · calculated"}</p><p className="mt-2 font-display text-5xl text-primary">{birthNumber}</p><p className="mt-2 text-xs text-muted-foreground">{hi ? "Janm-din ke digits ka root" : "Root of the day-of-birth digits"}</p></CardContent></Card>
      <Card className="glass"><CardContent className="py-5"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{hi ? "Jeevan-path unit · ganit" : "Life Path unit · calculated"}</p><p className="mt-2 font-display text-5xl text-primary">{lifePathUnit}</p><p className="mt-2 text-xs text-muted-foreground">{hi ? "Is table ke liye master numbers ko root mein badla gaya" : "Master numbers are reduced here to fit this table"}</p></CardContent></Card>
      <Card className="glass"><CardContent className="py-5"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{hi ? "Ek parampara ka lens" : "One tradition's lens"}</p><p className="mt-2 text-sm leading-6">{hi ? "Din aur rang kuch Cheiro-style numerology charts mein numbers se jode jaate hain." : "Days and colors are linked with numbers in some Cheiro-style numerology charts."}</p></CardContent></Card>
    </div>
    <section className="grid gap-4 sm:grid-cols-3">
      <Card><CardContent className="py-5"><h2 className="flex items-center gap-2 font-semibold"><span className="number-glyph text-primary">{traditional.numbers.join(" · ")}</span></h2><p className="mt-2 text-xs text-muted-foreground">{hi ? "Paramparagat number-sangati; outcome ka score nahi." : "Traditional number associations; not an outcome score."}</p></CardContent></Card>
      <Card><CardContent className="py-5"><h2 className="flex items-center gap-2 font-semibold"><CalendarDays aria-hidden className="size-4 text-primary" />{hi ? "Jude hue din" : "Associated days"}</h2><ul className="mt-3 space-y-1 text-sm">{traditional.days.map((item) => <li key={item}>{hi ? DAY_LABEL[item].hi : DAY_LABEL[item].en}</li>)}</ul></CardContent></Card>
      <Card><CardContent className="py-5"><h2 className="flex items-center gap-2 font-semibold"><Palette aria-hidden className="size-4 text-primary" />{hi ? "Jude hue rang" : "Associated colors"}</h2><ul className="mt-3 space-y-1 text-sm">{traditional.colors.map((item) => <li key={item.en}>{hi ? item.hi : item.en}</li>)}</ul></CardContent></Card>
    </section>
    <div className="rounded-2xl border bg-card p-5"><h2 className="font-display text-xl font-semibold">{hi ? "Vyavaharik guidance aur optional upaay" : "Practical guidance and optional remedies"}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{hi ? "Is tool mein mehnge ratna, daan-rakam, shaadi ke muhurat scores, ya kaamyabi ki guarantee nahi. Report mein aapke chune focus se juda bina khareed wala, palatne-yogya kadam milta hai." : "This tool does not prescribe costly gems, donation amounts, wedding-muhurat scores, or guaranteed success. Your report offers a no-purchase, reversible step tied to the focus you choose."}</p><Link href="/blueprint#scenarios" className="mt-3 inline-flex items-center gap-1 font-semibold text-primary underline">{hi ? "Apna planning drishya aur practical kadam dekhein" : "See your planning scenarios and practical step"}<ArrowRight aria-hidden className="size-4" /></Link></div>
  </div>;
}
