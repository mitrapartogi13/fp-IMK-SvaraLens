"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "../../components/AppHeader";
import { MicIcon } from "../../components/Icons";

const BAR_DELAYS = [0, 0.2, 0.4, 0.15, 0.35];

/**
 * Voice search — simulated "Mendengarkan…" UI. After 3 seconds it returns to
 * /dokumen with a mock query pre-filled to demonstrate the result flow.
 */
export default function VoiceSearchPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace(`/kemasan/ultra-milk`);
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader title="RIWAYAT KEMASAN" />

      <main className="flex flex-1 flex-col items-center justify-center gap-10 px-8 text-center">
        <div className="flex size-44 items-center justify-center rounded-full border-2 border-line bg-primary text-[80px] text-black animate-scan-pulse">
          <MicIcon />
        </div>

        {/* Animated waveform */}
        <div className="flex h-16 items-center gap-2" aria-hidden>
          {BAR_DELAYS.map((delay, i) => (
            <span
              key={i}
              className="h-16 w-3 animate-waveform rounded-full bg-primary"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </div>

        <p className="text-3xl font-black tracking-tight text-heading" aria-live="polite">
          MENDENGARKAN...
        </p>

        <button
          type="button"
          onClick={() => router.replace("/kemasan")}
          className="w-full rounded-full bg-primary px-6 py-5 text-xl font-black uppercase tracking-wide text-black shadow-[0_4px_0_0_var(--color-primary-press)] active:translate-y-0.5"
        >
          Batal
        </button>
      </main>
    </div>
  );
}
