"use client";

import { useCallback, useEffect, useState } from "react";
import { useSettings, type AudioSpeed } from "../context/SettingsContext";

const RATE_BY_SPEED: Record<AudioSpeed, number> = {
  lambat: 0.7,
  normal: 1,
  cepat: 1.4,
};

/**
 * Text-to-speech via the Web Speech API, wired to the user's volume and
 * audio-speed settings. Returns `speak`, `stop`, and a live `speaking` flag.
 */
export function useSpeech() {
  const { settings } = useSettings();
  const [speaking, setSpeaking] = useState(false);

  const supported =
    typeof window !== "undefined" && "speechSynthesis" in window;

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  const speak = useCallback(
    (text: string) => {
      if (!supported || !text) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "id-ID";
      utterance.rate = RATE_BY_SPEED[settings.audioSpeed];
      utterance.volume = settings.volume / 100;
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    },
    [supported, settings.audioSpeed, settings.volume],
  );

  // Stop any in-flight speech when the component using the hook unmounts.
  useEffect(() => () => stop(), [stop]);

  return { speak, stop, speaking, supported };
}
