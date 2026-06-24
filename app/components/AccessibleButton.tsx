"use client";

import { forwardRef } from "react";
import { useDoubleTapAction } from "../hooks/useDoubleTapAction";

export type AccessibleButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    /**
     * What to read aloud on the first tap. Falls back to `aria-label`, so most
     * existing buttons only need their label.
     */
    speakText?: string;
    /** Opt out of the read-first gesture (action fires on the first tap). */
    nativeTap?: boolean;
  };

/**
 * A `<button>` with the screen-reader "tap to read, tap again to execute"
 * gesture. The supplied `onClick` is the real action — it only runs on the
 * confirming second tap. Renders an ordinary button, so all styling/markup
 * (className, type, children, aria-*) is unchanged.
 */
const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  function AccessibleButton(
    { speakText, nativeTap, onClick, onBlur, children, ...rest },
    ref,
  ) {
    const ariaLabel = rest["aria-label"];
    const { onClick: tapClick, onBlur: tapBlur } =
      useDoubleTapAction<HTMLButtonElement>({
        speakText: speakText ?? ariaLabel ?? "",
        onActivate: (e) => onClick?.(e),
        disabled: nativeTap,
      });

    return (
      <button
        ref={ref}
        onClick={tapClick}
        onBlur={(e) => {
          tapBlur();
          onBlur?.(e);
        }}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

export default AccessibleButton;
