import { redirect } from "next/navigation";

/**
 * App entry — always launches through the splash screen. The splash branches
 * to the tutorial (first visit) or to /beranda (returning user).
 */
export default function Home() {
  redirect("/splash");
}
