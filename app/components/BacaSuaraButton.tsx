"use client";

import { useSpeech } from "../hooks/useSpeech";
import { SpeakerIcon, PauseIcon } from "./Icons";

/**
 * "BACA SUARA" — yellow pill that reads the given text aloud via the Web
 * Speech API, honoring the user's volume and audio-speed settings. Toggles to
 * a stop state while speaking.
 */
export default function BacaSuaraButton({
  text,
  label = "BACA SUARA",
  className = "",
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const { speak, stop, speaking } = useSpeech();

  return (
    <button
      type="button"
      onClick={() => (speaking ? stop() : speak(text))}
      aria-pressed={speaking}
      className={`flex w-full items-center justify-center gap-3 rounded-full bg-primary px-6 py-4 text-xl font-black uppercase tracking-wide text-black shadow-[0_4px_0_0_var(--color-primary-press)] active:translate-y-0.5 ${className}`}
    >
      {speaking ? (
        <PauseIcon className="text-[24px]" />
      ) : (
        <SpeakerIcon className="text-[24px]" />
      )}
      {speaking ? "HENTIKAN" : label}
    </button>
  );
}
