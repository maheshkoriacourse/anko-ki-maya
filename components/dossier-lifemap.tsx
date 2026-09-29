"use client";

/**
 * v5.2 DOSSIER CHAPTER 3 — THE LIFE MAP (river of time)
 * Ancient-Indian river visual (SVG) + bands list. Cliffhanger → wounds.
 */

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { buildLifeMap } from "@/lib/dossier-lifemap";
import { useProfile } from "@/components/seeded-profile";
import { useLang } from "@/lib/lang";
import { devNum } from "@/lib/navgrah";

export function DossierLifeMap() {
  const { profile } = useProfile();
  const { lang } = useLang();
  const hi = lang === "hi";
  if (!profile) return null;
  const d = Number(profile.birthDate.slice(8, 10));
  const m = Number(profile.birthDate.slice(5, 7));
  const y = Number(profile.birthDate.slice(0, 4));
  const map = buildLifeMap(y, m, d);
  const riverWidth = 920; // matches viewBox
  const bandCount = map.bands.length;
  const totalSpan = Math.max(...map.bands.map((b) => b.toAge), map.ageNow + 1) - Math.min(...map.bands.map((b) => b.fromAge), 0);
  const ageToX = (a: number) => ((a - 0) / totalSpan) * (riverWidth - 60) + 30;

  return (
    <Card className="glass" data-testid="dossier-life-map">
      <CardHeader>
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold/90">
          {hi ? "chapter teen" : "Chapter Three"}
        </p>
        <CardTitle className="font-dossier text-2xl">
          {hi ? "jo saalon ne tumhein banaya" : "The years that shaped you"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* RIVER OF TIME — golden river meandering left→right with milestone markers */}
        <div aria-hidden className="overflow-x-auto rounded-xl border border-gold/25 bg-obsidian/40 px-2 py-4" data-testid="life-map-river">
          <svg viewBox={`0 0 ${riverWidth} 190`} className="min-w-[640px]">
            <defs>
              <linearGradient id="riverGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#B87333" stopOpacity="0.55" />
                <stop offset="55%" stopColor="#D4AF37" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#FFB347" stopOpacity="0.95" />
              </linearGradient>
            </defs>
            <path
              d={`M 20 110 C 180 60, 320 150, 470 100 S 780 40, ${riverWidth - 18} 96`}
              fill="none" stroke="url(#riverGrad)" strokeWidth="9" strokeLinecap="round" opacity="0.9"
            />
            {map.bands.map((b, i) => {
              const x = ageToX(b.fromAge);
              const cx = Math.min(x, riverWidth - 30);
              return (
                <g key={`${b.nameEn}-${b.fromAge}-${i}`}>
                  <circle cx={cx} cy={95} r="4.5" fill="#FFB347" stroke="#080808" strokeWidth="1" opacity={b.nameHi.includes("anchor") ? 0.75 : 1} />
                  <text x={cx} y={80} textAnchor="middle" fontSize="11" fill="#f0d58c" transform={`rotate(-40 ${cx} 80)`}>
                    {b.nameHi.includes("anchor") ? `${devNum(String(b.fromAge))}` : `${b.nameHi.split(" ")[0]}`}
                  </text>
                </g>
              );
            })}
            <circle cx={ageToX(Math.min(map.ageNow, totalSpan))} cy="96" r="6" fill="#fff" stroke="#D4AF37" strokeWidth="2" />
            <text x={ageToX(Math.min(map.ageNow, totalSpan))} y="126" textAnchor="middle" fontSize="11" fill="#FFB347">
              {hi ? `aaj — ${devNum(String(map.ageNow))} saal` : `today — ${map.ageNow}`}
            </text>
          </svg>
        </div>

        <div className="space-y-2.5">
          {map.bands.map((b, i) => (
            <div key={`${b.nameEn}-${b.fromAge}-${i}-row`} className="rounded-xl border border-border bg-secondary/30 px-4 py-3" data-testid={`band-${i}`}>
              <p className="text-sm font-semibold text-gold">
                {hi
                  ? `${devNum(String(b.fromAge))}${b.toAge !== b.fromAge ? "-"+devNum(String(b.toAge)) : ""} · ${b.nameHi}`
                  : `${b.fromAge}${b.toAge !== b.fromAge ? "–"+b.toAge : ""} · ${b.nameEn}`}
              </p>
              <p className="mt-1 text-sm leading-relaxed">{hi ? b.gistHi : b.gistEn}</p>
              <p className="mt-1 text-xs text-muted-foreground">{b.basis}</p>
            </div>
          ))}
        </div>

        {/* cliffhanger → wounds */}
        <div className="rounded-xl border border-gold/30 bg-gold/5 px-4 py-3 text-center" data-testid="lifemap-cliffhanger">
          <p className="text-sm italic text-muted-foreground">
            {hi
              ? '"…har jhukao, har mod ke peeche ek aisa zakham bhi hai jo aapne kabhi dekha hi nahi. agli chapter mein: wo zakham — aur wo kaise kamal ban gaya."'
              : '"…behind every bend of this river lies a wound you never saw clearly. Next: the wound — and how it became the lotus."'}
          </p>
          <p className="mt-1 text-xs font-semibold text-gold">
            {hi ? "agli chapter: wo ghaav jo kabhi bhar na aaye →" : "Next: the wounds you never healed →"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}