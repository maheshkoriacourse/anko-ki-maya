import { redirect } from "next/navigation";

/** The former Dossier asserted private biographical events from birth numbers.
 * Keep old bookmarks working, but route them to the evidence-labelled report. */
export default function DossierAliasPage() {
  redirect("/blueprint");
}
