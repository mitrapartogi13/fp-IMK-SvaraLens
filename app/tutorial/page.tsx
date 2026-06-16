"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSettings } from "../context/SettingsContext";
import {
  TapGestureIcon,
  SwipeGestureIcon,
  HoldGestureIcon,
  PinchGestureIcon,
  ArrowRightIcon,
} from "../components/Icons";

const STEPS = [
  {
    Icon: TapGestureIcon,
    title: "TAP",
    description: "Ketuk layar untuk memilih atau membuka item",
  },
  {
    Icon: SwipeGestureIcon,
    title: "GESER",
    description: "Geser ke kiri atau kanan untuk navigasi antar halaman",
  },
  {
    Icon: HoldGestureIcon,
    title: "TAHAN",
    description: "Tahan layar untuk mendengar deskripsi item",
  },
  {
    Icon: PinchGestureIcon,
    title: "CUBIT",
    description: "Cubit layar untuk memperbesar atau memperkecil teks",
  },
];

/** Gesture tutorial — 4 paginated steps shown on first visit. */
export default function TutorialPage() {
  const router = useRouter();
  const { update } = useSettings();
  const [step, setStep] = useState(0);

  const isLast = step === STEPS.length - 1;
  const { Icon, title, description } = STEPS[step];

  function finish() {
    update({ hasVisited: true });
    router.replace("/dokumen");
  }

  function next() {
    if (isLast) finish();
    else setStep((s) => s + 1);
  }

  return (
    <div className="flex flex-1 flex-col px-6 pb-8 pt-4">
      {/* Skip */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={finish}
          className="rounded-full px-4 py-2 text-lg font-black text-muted hover:text-ink"
        >
          LEWATI
        </button>
      </div>

      {/* Step content */}
      <div
        key={step}
        className="flex flex-1 animate-fade-in flex-col items-center justify-center text-center"
      >
        <div className="flex size-44 items-center justify-center rounded-full bg-primary text-[110px] text-black">
          <Icon />
        </div>
        <h1 className="mt-10 text-5xl font-black tracking-tight text-heading">
          {title}
        </h1>
        <p className="mt-4 max-w-xs text-xl font-bold text-muted">{description}</p>
      </div>

      {/* Dots */}
      <div className="mb-8 flex justify-center gap-3" aria-hidden>
        {STEPS.map((_, i) => (
          <span
            key={i}
            className={`size-3.5 rounded-full transition ${
              i === step ? "bg-primary" : "border-2 border-line bg-transparent"
            }`}
          />
        ))}
      </div>

      {/* Continue */}
      <button
        type="button"
        onClick={next}
        className="flex w-full items-center justify-center gap-3 rounded-full bg-primary px-6 py-5 text-xl font-black uppercase tracking-wide text-black shadow-[0_4px_0_0_var(--color-primary-press)] active:translate-y-0.5"
      >
        {isLast ? "MULAI" : "LANJUT"}
        <ArrowRightIcon className="text-[24px]" />
      </button>
    </div>
  );
}
