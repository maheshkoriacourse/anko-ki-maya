import { redirect } from "next/navigation";

/** Keep old report links landing on the canonical flagship report. */
export default function ReportAliasPage() {
  redirect("/blueprint");
}
