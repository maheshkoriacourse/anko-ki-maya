import { redirect } from "next/navigation";

/**
 * Legacy retrospective cycle-scoring page. Its descriptive averages could be
 * mistaken for evidence of predictive accuracy. Keep the URL working, but send
 * customers to the transparent, user-authored timeline in the flagship report.
 * Existing browser-local entries are left untouched.
 */
export default function LifeEventsPage() {
  redirect("/blueprint#timeline");
}
