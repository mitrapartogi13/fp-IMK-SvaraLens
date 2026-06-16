"use client";

import { useEffect, useRef, useState, type ComponentType, type SVGProps } from "react";
import { useRouter } from "next/navigation";
import { useSettings } from "../context/SettingsContext";
import { useSpeech } from "../hooks/useSpeech";
import {
  ArrowRightIcon,
  BackIcon,
  BigCheckIcon,
  DoubleTapIcon,
  SpeakerIcon,
  SwipeHandIcon,
} from "../components/Icons";

type Step = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  ctaLabel: string;
  speak: string;
  /** Optional yellow accent badge inside the illustration frame (e.g. "2x"). */
  badge?: string;
  /** Render the headline checkmark variant (filled black circle). */
  checkVariant?: boolean;
};

const STEPS: Step[] = [
  {
    Icon: SwipeHandIcon,
    title: "GESER",
    description: "Geser jari ke KIRI atau KANAN untuk pindah menu.",
    ctaLabel: "COBA GESER",
    speak:
      "Langkah satu dari tiga. Geser. Geser jari ke kiri atau kanan untuk pindah menu.",
  },
  {
    Icon: DoubleTapIcon,
    title: "KETUK 2X",
    description: "Ketuk layar DUA KALI dengan cepat untuk membuka menu.",
    ctaLabel: "COBA KETUK",
    badge: "2x",
    speak:
      "Langkah dua dari tiga. Ketuk dua kali. Ketuk layar dua kali dengan cepat untuk membuka menu.",
  },
  {
    Icon: BigCheckIcon,
    title: "SELESAI",
    description: "Bagus! Anda siap menggunakan aplikasi.",
    ctaLabel: "MULAI APLIKASI",
    checkVariant: true,
    speak:
      "Langkah tiga dari tiga. Selesai. Bagus, Anda siap menggunakan aplikasi.",
  },
];

/** Gesture tutorial — 3 paginated steps shown on first visit. */
export default function TutorialPage() {
  const router = useRouter();
  const { update } = useSettings();
  const { speak } = useSpeech();
  const [step, setStep] = useState(0);
  const spokenStepRef = useRef<number>(-1);

  const isLast = step === STEPS.length - 1;
  const current = STEPS[step];
  const progressPct = ((step + 1) / STEPS.length) * 100;

  function finish() {
    update({ hasVisited: true });
    router.replace("/beranda");
  }

  function next() {
    if (isLast) return finish();
    setStep((s) => s + 1);
  }

  function prev() {
    setStep((s) => Math.max(0, s - 1));
  }

  // Speak each step's description once when it becomes visible.
  useEffect(() => {
    if (spokenStepRef.current === step) return;
    spokenStepRef.current = step;
    const id = setTimeout(() => speak(current.speak), 200);
    return () => clearTimeout(id);
  }, [step, current.speak, speak]);

  return (
    <div className="flex flex-1 flex-col bg-surface">
      {/* ===== Top: step indicator + progress bar ===== */}
      <header className="border-b-[3px] border-line bg-surface px-5 pb-4 pt-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black tracking-wide text-ink">
            LANGKAH {step + 1}/{STEPS.length}
          </h1>
          <button
            type="button"
            onClick={finish}
            className="rounded-full border-[2.5px] border-line bg-paper px-5 py-2 text-sm font-black tracking-wide text-ink active:translate-y-[1px]"
          >
            {isLast ? "SELESAI" : "LEWATI"}
          </button>
        </div>

        {/* Progress track */}
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progressPct)}
          aria-label={`Langkah ${step + 1} dari ${STEPS.length}`}
          className="mt-4 h-3.5 w-full overflow-hidden rounded-full border-[2px] border-line bg-[#d9d9d9]"
        >
          <div
            className="h-full rounded-full bg-[#00e5ff] transition-[width] duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </header>

      {/* ===== Main: SUARA AKTIF + gesture card ===== */}
      <main className="flex flex-1 flex-col items-center px-5 pb-6 pt-5">
        {/* SUARA AKTIF pill */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border-[2.5px] border-line bg-[#00e5ff] px-4 py-2">
          <SpeakerIcon className="text-[18px] text-ink" />
          <span className="text-sm font-black tracking-wide text-ink">
            SUARA AKTIF
          </span>
        </div>

        {/* Gesture card */}
        <article
          key={step}
          className="flex w-full flex-1 animate-slide-in-right flex-col rounded-3xl border-[3px] border-line bg-paper p-4 shadow-[6px_6px_0_0_var(--c-line)]"
        >
          {/* Inner illustration frame */}
          <div className="relative flex aspect-[5/3] w-full items-center justify-center rounded-2xl border-[2px] border-line bg-frame">
            {/* Yellow 2x badge (step 2 only) */}
            {current.badge && (
              <span className="absolute right-3 top-3 inline-flex items-center justify-center rounded-full border-[2.5px] border-line bg-primary px-3 py-1 text-sm font-black text-ink">
                {current.badge}
              </span>
            )}

            {/* Checkmark uses a special black-circle treatment */}
            {current.checkVariant ? (
              <div className="flex size-28 items-center justify-center rounded-full border-[3px] border-line bg-black text-[60px] text-white shadow-[5px_5px_0_0_var(--c-line)]">
                <BigCheckIcon strokeWidth={3.5} />
              </div>
            ) : (
              <current.Icon className="text-[88px] text-ink" />
            )}
          </div>

          {/* Title + description */}
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-2 py-5 text-center">
            <h2 className="text-4xl font-black tracking-tight text-ink">
              {current.title}
            </h2>
            <p className="max-w-[280px] text-lg font-bold leading-snug text-ink">
              {current.description}
            </p>
          </div>

          {/* Dots */}
          <div
            className="flex items-center justify-center gap-2 pb-2"
            aria-hidden
          >
            {STEPS.map((_, i) => {
              const active = i === step;
              return (
                <span
                  key={i}
                  className={
                    active
                      ? "h-3 w-7 rounded-full border-[2px] border-line bg-[#00e5ff]"
                      : i < step
                        ? "size-3 rounded-full bg-black"
                        : "size-3 rounded-full border-[2px] border-line bg-paper"
                  }
                />
              );
            })}
          </div>
        </article>
      </main>

      {/* ===== Bottom: navigation row ===== */}
      <div className="border-t-[3px] border-line bg-surface px-5 py-4">
        {step === 0 ? (
          <button
            type="button"
            onClick={next}
            className="flex w-full items-center justify-center gap-3 rounded-full border-[3px] border-line bg-primary px-6 py-4 text-lg font-black uppercase tracking-wide text-ink shadow-[5px_5px_0_0_var(--c-line)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_var(--c-line)]"
          >
            {current.ctaLabel}
            <ArrowRightIcon className="text-[22px]" strokeWidth={3} />
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prev}
              aria-label="Kembali ke langkah sebelumnya"
              className="flex size-14 shrink-0 items-center justify-center rounded-full border-[3px] border-line bg-paper text-[24px] text-ink shadow-[4px_4px_0_0_var(--c-line)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_0_var(--c-line)]"
            >
              <BackIcon strokeWidth={3} />
            </button>
            <button
              type="button"
              onClick={next}
              className="flex flex-1 items-center justify-center gap-3 rounded-full border-[3px] border-line bg-primary px-6 py-4 text-lg font-black uppercase tracking-wide text-ink shadow-[5px_5px_0_0_var(--c-line)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_var(--c-line)]"
            >
              {current.ctaLabel}
              <ArrowRightIcon className="text-[22px]" strokeWidth={3} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
