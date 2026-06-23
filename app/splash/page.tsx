"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSettings } from "../context/SettingsContext";
import { useSpeech } from "../hooks/useSpeech";
import { AudioBarsIcon, ArrowRightIcon, SpeakerIcon } from "../components/Icons";

const WELCOME_TEXT =
  "Halo, saya Svara. Asisten suara untuk membantu membaca dokumen, obat, dan kemasan. Geser ke kanan untuk mulai.";

/**
 * Audio-welcome splash screen.
 * - Speaks the welcome text once on first paint (Web Speech API).
 * - User advances by tapping or swiping right on the yellow CTA.
 * - Double-tapping anywhere replays the welcome message.
 * - Always advances to /tutorial (the hasVisited skip is intentionally disabled
 *   so every launch shows the tutorial).
 */
export default function SplashPage() {
  const router = useRouter();
  const { ready } = useSettings();
  const { speak, supported } = useSpeech();

  // Track if we've spoken the intro yet, so React's strict mode double-mount
  // doesn't cause it to fire twice in dev.
  const spokenRef = useRef(false);

  // Speak the welcome message once after settings hydrate.
  useEffect(() => {
    if (!ready || spokenRef.current || !supported) return;
    spokenRef.current = true;
    const id = setTimeout(() => speak(WELCOME_TEXT), 350);
    return () => clearTimeout(id);
  }, [ready, supported, speak]);

  // DISABLED: returning-user auto-skip. We always force the tutorial after the
  // splash, so this skip-to-dashboard behaviour is commented out.
  // useEffect(() => {
  //   if (!ready || !settings.hasVisited) return;
  //   const id = setTimeout(() => router.replace("/beranda"), 1400);
  //   return () => clearTimeout(id);
  // }, [ready, settings.hasVisited, router]);

  // Guard so a swipe + its synthesized click don't navigate twice.
  const advancedRef = useRef(false);
  const advance = useCallback(() => {
    if (advancedRef.current) return;
    advancedRef.current = true;
    // DISABLED: hasVisited gating. Always go to the tutorial after the splash.
    // const next = settings.hasVisited ? "/beranda" : "/tutorial";
    router.replace("/tutorial");
  }, [router]);

  // --- Swipe-right detection on the yellow CTA --------------------------------
  // Uses Pointer Events so mouse-drag (desktop) and touch-swipe (mobile) behave
  // identically. `touch-action: pan-y` on the button (below) stops the mobile
  // browser from claiming the horizontal swipe as a back-navigation gesture.
  const pointerStartX = useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    pointerStartX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (pointerStartX.current === null) return;
    const dx = e.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (dx > 48) advance(); // ≥48px swipe/drag to the right
  };

  // --- Double-tap to replay the audio welcome --------------------------------
  const lastTapRef = useRef(0);
  const handleTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 380) {
      // Double tap detected — replay the welcome line.
      speak(WELCOME_TEXT);
      lastTapRef.current = 0;
      return;
    }
    lastTapRef.current = now;
  };

  return (
    <div
      className="flex flex-1 flex-col bg-surface"
      onClick={handleTap}
      role="presentation"
    >
      {/* Header bar */}
      <header className="flex items-center justify-between border-b-[3px] border-line bg-surface px-5 py-4">
        <h1 className="text-2xl font-black tracking-wide text-ink">SVARALENS</h1>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            speak(WELCOME_TEXT);
          }}
          aria-label="Putar ulang sambutan"
          className="flex size-11 items-center justify-center rounded-md text-[26px] text-ink hover:bg-paper"
        >
          <SpeakerIcon />
        </button>
      </header>

      {/* Center content */}
      <main className="flex flex-1 flex-col items-center justify-center gap-8 px-8 text-center">
        {/* Wordmark: Svara (black) + Lens (yellow boxed) */}
        <div
          aria-label="SvaraLens"
          className="flex items-baseline gap-0 select-none"
        >
          <span className="text-5xl font-black tracking-tight text-ink">
            Svara
          </span>
          <span
            className="ml-0.5 inline-block rounded-md bg-primary px-2 py-0.5 text-5xl font-black tracking-tight text-ink"
            style={{ WebkitTextStroke: "1px #000" }}
          >
            Lens
          </span>
        </div>

        {/* Cyan audio bars */}
        <div className="text-[#00e5ff]" aria-hidden>
          <AudioBarsIcon className="text-[64px]" />
        </div>

        {/* Greeting */}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-black tracking-tight text-ink">
            Halo, saya Svara.
          </h2>
          <p className="mx-auto max-w-[280px] text-lg font-bold leading-snug text-ink">
            Asisten suara untuk membantu membaca dokumen, obat, dan kemasan.
          </p>
        </div>
      </main>

      {/* Bottom CTA — yellow brutalist swipe target */}
      <div className="px-5 pb-8 pt-4">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            advance();
          }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          style={{ touchAction: "pan-y" }}
          aria-label="Geser ke kanan atau ketuk untuk mulai"
          className="flex w-full items-center gap-4 rounded-2xl border-[3px] border-line bg-primary px-5 py-5 text-left text-ink shadow-[6px_6px_0_0_var(--c-line)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[3px_3px_0_0_var(--c-line)]"
        >
          <ArrowRightIcon className="shrink-0 text-[36px]" strokeWidth={3} />
          <span className="flex flex-col">
            <span className="text-xl font-black uppercase leading-tight tracking-wide">
              Geser ke kanan untuk mulai
            </span>
            <span className="mt-1 text-sm font-bold leading-snug text-ink/80">
              Ketuk dua kali untuk mendengar ulang
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
