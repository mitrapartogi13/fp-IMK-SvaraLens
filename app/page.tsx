import { redirect } from "next/navigation";

/** App entry — always launches through the splash screen, which then branches
 *  to the tutorial (first visit) or straight to /dokumen (returning user). */
export default function Home() {
  redirect("/splash");
}
