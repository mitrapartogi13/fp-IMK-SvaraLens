"use client";

import { useCallback, useEffect, useRef } from "react";
import { useSpeech } from "./useSpeech";

export type DoubleTapOptions<T extends HTMLElement> = {
  /** Text read aloud on the first ("selecting") tap. */
  speakText: string;
  /** The element's real action, run only on the confirming second tap. */
  onActivate: (e: React.MouseEvent<T>) => void;
  /**
   * When true the control behaves natively (no read-first interception) — the
   * action fires on the very first tap. Used to opt an element out of the
   * screen-reader gesture (e.g. the Splash "geser" button).
   */
  disabled?: boolean;
  /**
   * Auto-disarm after this many ms without a confirming second tap, so a stale
   * "armed" element can't be activated much later. Set to 0 to keep it armed
   * until it loses focus. Default: 6000.
   */
  resetMs?: number;
};

/**
 * Screen-reader-style "single-tap to read, double-tap to execute" gesture.
 *
 * First tap on an element: prevents the native action, moves focus to it, and
 * speaks `speakText`. While it stays focused it is "armed"; a second tap runs
 * `onActivate`. Tapping a different element (which blurs this one) or waiting
 * out `resetMs` disarms it, so the next tap reads again instead of executing.
 *
 * Returns handlers to spread onto a `<button>` / `<a>`-like element.
 */
export function useDoubleTapAction<T extends HTMLElement>({
  speakText,
  onActivate,
  disabled = false,
  resetMs = 6000,
}: DoubleTapOptions<T>) {
  const { speak } = useSpeech();
  const armedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const disarm = useCallback(() => {
    armedRef.current = false;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Clear any pending timer if the element unmounts while armed.
  useEffect(() => disarm, [disarm]);

  const onClick = useCallback(
    (e: React.MouseEvent<T>) => {
      if (disabled) {
        onActivate(e);
        return;
      }

      if (armedRef.current) {
        // Second tap on the already-selected element → run the real action.
        disarm();
        onActivate(e);
        return;
      }

      // First tap → select + read; swallow the native action for now.
      e.preventDefault();
      armedRef.current = true;
      e.currentTarget.focus();
      speak(speakText);

      if (resetMs > 0) {
        timerRef.current = setTimeout(() => {
          armedRef.current = false;
          timerRef.current = null;
        }, resetMs);
      }
    },
    [disabled, onActivate, disarm, speak, speakText, resetMs],
  );

  // Losing focus (e.g. tapping elsewhere) resets to the read-first state.
  const onBlur = useCallback(() => disarm(), [disarm]);

  return { onClick, onBlur };
}
