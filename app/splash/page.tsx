"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSettings } from "../context/SettingsContext";
import { LogoIcon } from "../components/Icons";

/**
 * Splash screen — full-screen black brand moment. Once settings are hydrated,
 * branches to the gesture tutorial on first visit (after 2.5s) or to /dokumen
 * for returning users.
 */
export default function SplashPage() {
  const router = useRouter();
  const { settings, ready } = useSettings();

  useEffect(() => {
    if (!ready) return;
    const firstVisit = !settings.hasVisited;
    const timer = setTimeout(
      () => router.replace(firstVisit ? "/tutorial" : "/dokumen"),
      firstVisit ? 2500 : 1200,
    );
    return () => clearTimeout(timer);
  }, [ready, settings.hasVisited, router]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-black px-8 text-center">
      <div className="flex size-32 items-center justify-center rounded-3xl bg-primary text-[88px] text-black shadow-lg">
        <LogoIcon />
      </div>
      <h1 className="text-5xl font-black tracking-tight text-primary">SvaraLens</h1>
      <p className="text-lg font-bold text-white">Asisten Baca Cerdas Anda</p>

      <div className="mt-6 flex gap-1.5" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-2.5 animate-waveform rounded-full bg-primary"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
