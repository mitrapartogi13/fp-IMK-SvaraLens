"use client";

import { useSpeech } from "../hooks/useSpeech";
import AccessibleButton from "./AccessibleButton";
import { SpeakerIcon, PauseIcon } from "./Icons";

/**
 * "BACA SUARA" — yellow brutalist pill that reads the given text aloud via
 * the Web Speech API, honoring the user's volume and audio-speed settings.
 * Toggles to a stop state while speaking.
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
    <AccessibleButton
      type="button"
      speakText={speaking ? "Hentikan" : label}
      onClick={() => (speaking ? stop() : speak(text))}
      aria-pressed={speaking}
      className={`flex w-full items-center justify-center gap-3 rounded-full border-[3px] border-line bg-primary px-6 py-4 text-xl font-black uppercase tracking-wide text-black shadow-[5px_5px_0_0_var(--c-line)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_var(--c-line)] ${className}`}
    >
      {speaking ? (
        <PauseIcon className="text-[24px]" strokeWidth={3} />
      ) : (
        <SpeakerIcon className="text-[24px]" strokeWidth={3} />
      )}
      {speaking ? "HENTIKAN" : label}
    </AccessibleButton>
  );
}
