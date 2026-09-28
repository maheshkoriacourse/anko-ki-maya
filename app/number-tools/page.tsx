"use client";

/**
 * ANKO KI MAYA v3 — ANK TOOLS (phone / house / vehicle number check).
 * Digit-sum vs Mulank via planet friendship — small, high-wow, Indian-first.
 */

import * as React from "react";
import { Smartphone, Home, Car } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Input, Label } from "@/components/ui";
import { PageHeader, EmptyState, SanatanDivider } from "@/components/shared";
import { useProfile } from "@/components/seeded-profile";
import { useT } from "@/lib/lang";
import { analyzePhone, analyzeHouse, analyzeVehicle, verdictLabel, type NumberToolResult } from "@/lib/number-tools";
import { devNum, grahaFor } from "@/lib/navgrah";
import { ReasoningBlock } from "@/components/loshu-kit";

type Kind = "phone" | "house" | "vehicle";

export default function NumberToolsPage() {
  const { profile, reading, hasProfile } = useProfile();
  const { lang } = useT();
  const hi = lang === "hi";
  const [kind, setKind] = React.useState<Kind>("phone");
  const [value, setValue] = React.useState("");
  const [result, setResult] = React.useState<NumberToolResult | null>(null);

  if (!hasProfile || !profile || !reading) {
    return (
      <EmptyState
        title={hi ? "pehle janm-vivaran do" : "No profile yet"}
        body={hi ? "Mulank chaahie — janm-tithi do." : "Your Mulank is needed — add your birth date first."}
        action={<a href="/" className="text-sm text-primary underline">{hi ? "shuru karein" : "Start"}</a>}
      />
    );
  }

  const mulank = reading.birthday.number;
  const bhagyank = reading.lifePath.number;

  function check(e: React.FormEvent) {
    e.preventDefault();
    const v = value.trim();
    if (!v || !/\d/.test(v)) return;
    if (kind === "phone") setResult(analyzePhone(v, mulank, bhagyank));
    else if (kind === "house") setResult(analyzeHouse(v, mulank, bhagyank));
    else setResult(analyzeVehicle(v, mulank, bhagyank));
  }

  const kinds: { id: Kind; icon: React.ReactNode; label: string; labelHi: string; ph: string; phHi: string }[] = [
    { id: "phone", icon: <Smartphone aria-hidden className="size-4" />, label: "Mobile number", labelHi: "mobile number", ph: "98765 43210", phHi: "९८७६५ ४३२१०" },
    { id: "house", icon: <Home aria-hidden className="size-4" />, label: "House / flat no.", labelHi: "makaan / phalait nn.", ph: "B-402", phHi: "bee-४०२" },
    { id: "vehicle", icon: <Car aria-hidden className="size-4" />, label: "Vehicle no.", labelHi: "gaadi nn.", ph: "MH 12 AB 4321", phHi: "emaech १२ ebee ४३२१" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={hi ? "ank-upakaran" : "Ank Tools"}
        subtitle={
          hi
            ? "phone, makaan ya gaadi ka number apne Mulank se jaachie — ank-yog ka graha aapke chaalak-graha se mitra hai ya shatru, yehi saara khel hai."
            : "Check your phone, house or vehicle number against your Mulank — the digit-sum's planet either befriends or opposes your driver planet."
        }
      />

      <Card className="glass">
        <CardContent className="pt-5">
          <div className="mb-4 flex flex-wrap gap-1.5" role="tablist" aria-label={hi ? "upakaran" : "Tool"}>
            {kinds.map((k) => (
              <button
                key={k.id}
                role="tab"
                aria-selected={kind === k.id}
                onClick={() => { setKind(k.id); setResult(null); }}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  kind === k.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {k.icon} {hi ? k.labelHi : k.label}
              </button>
            ))}
          </div>
          <form onSubmit={check} className="flex flex-wrap items-end gap-3">
            <div className="min-w-[200px] flex-1">
              <Label htmlFor="tool-value">{hi ? kinds.find((k) => k.id === kind)!.labelHi : kinds.find((k) => k.id === kind)!.label}</Label>
              <Input
                id="tool-value"
                value={value}
                placeholder={hi ? kinds.find((k) => k.id === kind)!.phHi : kinds.find((k) => k.id === kind)!.ph}
                onChange={(e) => setValue(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button type="submit">{hi ? "Jaanch karo" : "Check"}</Button>
          </form>

          {result ? (
            <div className="mt-5 rounded-xl border p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-display text-lg font-semibold">
                  {hi ? `ank-yog ${devNum(result.digitsum)} — ${grahaFor(result.digitsum).grahaHi}` : `Digit sum ${result.digitsum} — ${grahaFor(result.digitsum).graha}`}
                </p>
                <Badge variant={result.relation === "friendly" ? "gold" : "secondary"}>
                  {verdictLabel(result.relation, lang)}
                </Badge>
              </div>
              <p className="mt-2 text-sm leading-relaxed">{hi ? result.lineHi : result.lineEn}</p>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <SanatanDivider />
      <p className="text-xs text-muted-foreground">
        {hi
          ? "yeh jaanch paramparagat mitra-graha table par hai — nirnay aapka; upayogita aur vyavahaar-suvidha bhi number chunate samay vajan rakhate hain."
          : "This check uses the traditional planet-friendship table — the decision is yours; utility and practicality also weigh when choosing a number."}
      </p>
      <ReasoningBlock
        title={hi ? "ank-upakaran" : "Ank Tools"}
        lang={lang}
        steps={
          result?.steps ?? [
            hi ? "number do — jaanch ke charan yahan dikhenge." : "Enter a number — the calculation steps appear here.",
          ]
        }
      />
    </div>
  );
}