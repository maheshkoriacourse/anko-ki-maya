import { redirect } from "next/navigation";

/**
 * The legacy compatibility screen combined an arbitrary weighted score with
 * birth-chart tables and could be mistaken for a relationship verdict. Keep
 * the old URL as an alias, but do not offer a numeric score as relationship
 * evidence or decision advice.
 */
export default function CompatibilityPage() {
  redirect("/blueprint#summary");
}
