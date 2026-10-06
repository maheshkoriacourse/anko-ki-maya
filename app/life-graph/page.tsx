import { redirect } from "next/navigation";

/** Legacy automatic past-event guesses are quarantined. The report timeline
 * uses only milestones the customer has explicitly added themselves. */
export default function LifeGraphAliasPage() {
  redirect("/blueprint#timeline");
}
