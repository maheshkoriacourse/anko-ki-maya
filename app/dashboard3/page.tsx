import { redirect } from "next/navigation";

/** The former daily cards stated past/today/tomorrow themes without user context. */
export default function Dashboard3Page() {
  redirect("/blueprint#scenarios");
}
