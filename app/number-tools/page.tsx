"use client";

/**
 * ANKO KI MAYA — optional digit-sum reference for phone / home / vehicle labels.
 * It does not score compatibility or recommend purchases or changes.
 */

import * as React from "react";
import { Smartphone, Home, Car } from "lucide-react";
import { Card, CardContent, Badge, Button, Input, Label } from "@/components/ui";
import { PageHeader, SanatanDivider } from "@/components/shared";
import { useT } from "@/lib/lang";
import { analyzePhone, analyzeHouse, analyzeVehicle, type NumberToolResult } from "@/lib/number-tools";
import { ReasoningBlock } from "@/components/loshu-kit";

type Kind = "phone" | "house" | "vehicle";

export default function NumberToolsPage() {
  const { lang } = useT();
  const hi = lang === "hi";
  const [kind, setKind] = React.useState<Kind>("phone");
  const [value, setValue] = React.useState("");
  const [result, setResult] = React.useState<NumberToolResult | null>(null);

  function check(e: React.FormEvent) {
    e.preventDefault();
    const v = value.trim();
    if (!v || !/\d/.test(v)) return;
    if (kind === "phone") setResult(analyzePhone(v));
    else if (kind === "house") setResult(analyzeHouse(v));
    else setResult(analyzeVehicle(v));
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
        subtitle={hi
          ? "Phone, ghar ya gaadi ke number ka ank-yog dekhein. Yeh paramparagat symbolic reference hai, khareed ya faisle ki salah nahi."
          : "See the digit sum for a phone, home, or vehicle number. This is a traditional symbolic reference, not purchase or decision advice."}
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
                  {hi ? `Ank-yog ${result.digitsum}` : `Digit sum ${result.digitsum}`}
                </p>
                <Badge variant="secondary">{hi ? "Paramparagat reference" : "Traditional reference"}</Badge>
              </div>
              <p className="mt-2 text-sm leading-relaxed">{hi ? result.lineHi : result.lineEn}</p>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <SanatanDivider />
      <p className="text-xs text-muted-foreground">
        {hi
          ? "Phone coverage, ghar ki jagah, gaadi ki suraksha aur kul kharch ko is ank se zyada ahmiyat dein. Is tool ki salah par number badalne ya mehngi cheez khareedne ki zaroorat nahi."
          : "Prioritize phone coverage, home location, vehicle safety, and total cost over this number. You do not need to change a number or buy anything expensive based on this tool."}
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
