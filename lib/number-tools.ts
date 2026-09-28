/**
 * Anko Ki Maya v3 — NUMBER TOOLS (owner "light extras", 29 Sep).
 *
 * Mobile-number analyzer + house/vehicle-number check: digit-sum vs the
 * user's Mulank/Bhagyank via planet friendship. Small, high-wow features
 * for Indian users. Pure functions; friendly/neutral/tense verdicts in the
 * direct jyotishi voice.
 */

import { reduce, reduceFully } from "./numerology";
import { grahaFor, planetRelation, devNum } from "./navgrah";

export type ToolVerdict = "friendly" | "neutral" | "tense";

export interface NumberToolResult {
  label: string; // the raw input (e.g. the phone number)
  digitsum: number; // full digit sum (masters folded)
  digitSumDisplay: string; // step string
  mulank: number;
  relation: ToolVerdict;
  lineEn: string;
  lineHi: string;
  steps: string[];
}

function verdictForRelation(rel: string): ToolVerdict {
  if (rel === "friend" || rel === "karmic") return "friendly";
  if (rel === "tense") return "tense";
  return "neutral";
}

const VERDICT_LABEL: Record<ToolVerdict, { en: string; hi: string }> = {
  friendly: { en: "Friendly", hi: "anukool" },
  neutral: { en: "Neutral", hi: "sam-bhav" },
  tense: { en: "Tense", hi: "tanaavapoorn" },
};

/** Digit-sum of any numeric string (ignores +, spaces, dashes). */
export function digitSum(s: string): number {
  const digits = s.replace(/\D/g, "");
  if (!digits) return 0;
  return reduce(digits.split("").reduce((acc, ch) => acc + Number(ch), 0));
}

function buildResult(
  label: string,
  mulank: number,
  bhagyank: number,
  kind: "phone" | "house" | "vehicle",
): NumberToolResult {
  const ds = digitSum(label);
  const rel = planetRelation(ds, mulank);
  const verdict = verdictForRelation(rel);
  const gNum = grahaFor(ds);
  const gMul = grahaFor(mulank);
  const kindWord =
    kind === "phone" ? { en: "number", hi: "number" } : kind === "house" ? { en: "house/flat number", hi: "makaan/phalait number" } : { en: "vehicle number", hi: "gaadi number" };

  const lineEn = `${gNum.graha} (${ds}) meets ${gMul.graha} (${mulank}) — ${
    verdict === "friendly"
      ? `a friendly pairing. This ${kindWord.en} feeds your driver number: keep it, use it for important calls/moves.`
      : verdict === "tense"
        ? `a tense pairing. This ${kindWord.en} argues with your Mulank — if a swap is easy, take the better vibration; if not, don't fear it, just keep the paperwork clean.`
        : `an even pairing. No bonus, no friction — a serviceable ${kindWord.en}.`
  }`;
  const lineHi = `${gNum.grahaHi} (${devNum(ds)}) mile ${gMul.grahaHi} (${devNum(mulank)}) se — ${
    verdict === "friendly"
      ? `mitra jodi. yeh ${kindWord.hi} aapke Mulank ko bal deta hai: rakho, aham kol/kaam isi se karo.`
      : verdict === "tense"
        ? `tanaav jodi. yeh ${kindWord.hi} aapke Mulank se bahas karta hai — badalana aasaan ho toh behatar knpan leejie; na ho toh darie nahi, kaagzaat saaf rakho.`
        : `sam jodi. na bonas, na gharshan — chalate-phirate ${kindWord.hi} hai.`
  }`;

  return {
    label,
    digitsum: ds,
    digitSumDisplay: `${label} → digit sum ${ds}`,
    mulank,
    relation: verdict,
    lineEn,
    lineHi,
    steps: [
      `Digit sum: ${label} → ${ds}`,
      `Mulank (birth day) ${mulank} = ${gMul.graha}; number ${ds} = ${gNum.graha}`,
      `Bhagyank ${bhagyank} noted alongside; the Mulank pairing is primary for ${kind}s.`,
      `Planet relation: ${rel}`,
    ],
  };
}

export function analyzePhone(phone: string, mulank: number, bhagyank: number): NumberToolResult {
  return buildResult(phone, mulank, bhagyank, "phone");
}

export function analyzeHouse(houseNo: string, mulank: number, bhagyank: number): NumberToolResult {
  return buildResult(houseNo, mulank, bhagyank, "house");
}

export function analyzeVehicle(regNo: string, mulank: number, bhagyank: number): NumberToolResult {
  return buildResult(regNo, mulank, bhagyank, "vehicle");
}

/** Label for the verdict chip. */
export function verdictLabel(v: ToolVerdict, lang: "en" | "hi"): string {
  return VERDICT_LABEL[v][lang];
}

/** Keep reduceFully exported for parity with the lucky module. */
export { reduceFully };