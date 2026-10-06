/**
 * Numerology number-tool calculation.
 *
 * This is deliberately a calculator and cultural-reference prompt, not a
 * compatibility score or recommendation about a phone, home, or vehicle.
 * Legacy personal-number arguments are accepted for call compatibility but
 * intentionally do not affect the result.
 */

import { reduce, reduceFully } from "./numerology";

export interface NumberToolResult {
  label: string;
  digitsum: number;
  digitSumDisplay: string;
  lineEn: string;
  lineHi: string;
  steps: string[];
}

/** Digit sum of a numeric string, ignoring country codes' punctuation. */
export function digitSum(value: string): number {
  const digits = value.replace(/\D/g, "");
  if (!digits) return 0;
  return reduce(digits.split("").reduce((total, digit) => total + Number(digit), 0));
}

function buildResult(label: string, kind: "phone" | "house" | "vehicle"): NumberToolResult {
  const digitsum = digitSum(label);
  const kindLabel = {
    phone: { en: "phone number", hi: "phone number" },
    house: { en: "house or flat number", hi: "ghar ya flat number" },
    vehicle: { en: "vehicle number", hi: "gaadi number" },
  }[kind];

  return {
    label,
    digitsum,
    digitSumDisplay: `${label} → digit sum ${digitsum}`,
    lineEn: `The digit sum is ${digitsum}. This is an optional traditional-symbolism reference only; it cannot tell you whether a ${kindLabel.en} will bring luck or affect real-world outcomes. Choose based on practical needs, safety, and cost.`,
    lineHi: `Is ${kindLabel.hi} ka ank-yog ${digitsum} hai. Yeh sirf ek optional paramparagat symbolic reference hai; isse shubh-ashubh ya zindagi ke nateeje tay nahi hote. Chunaav zaroorat, suraksha aur kharch dekhkar karein.`,
    steps: [
      `Input: ${label}`,
      `Add the digits and reduce by the selected rule → ${digitsum}.`,
      `This tool makes no planetary-compatibility, luck, safety, or outcome claim.`,
    ],
  };
}

export function analyzePhone(phone: string): NumberToolResult {
  return buildResult(phone, "phone");
}

export function analyzeHouse(houseNo: string): NumberToolResult {
  return buildResult(houseNo, "house");
}

export function analyzeVehicle(regNo: string): NumberToolResult {
  return buildResult(regNo, "vehicle");
}

/** Keep reduceFully exported for parity with the lucky module. */
export { reduceFully };
