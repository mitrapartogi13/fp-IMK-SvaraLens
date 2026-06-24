"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";
import { useDoubleTapAction } from "../hooks/useDoubleTapAction";

export type AccessibleLinkProps = React.ComponentProps<typeof Link> & {
  /** What to read aloud on the first tap. Falls back to `aria-label`. */
  speakText?: string;
  /** Use `router.replace` instead of `router.push` for the navigation. */
  replace?: boolean;
  /** Opt out of the read-first gesture (navigates on the first tap). */
  nativeTap?: boolean;
};

/**
 * A `next/link` with the screen-reader "tap to read, tap again to open"
 * gesture. The first tap reads the label; the second navigates via the App
 * Router. Renders a normal Next.js link, so styling/markup is unchanged and
 * prefetching still works.
 */
const AccessibleLink = forwardRef<HTMLAnchorElement, AccessibleLinkProps>(
  function AccessibleLink(
    { speakText, replace, nativeTap, href, onClick, onBlur, children, ...rest },
    ref,
  ) {
    const router = useRouter();
    const ariaLabel = rest["aria-label"];

    const { onClick: tapClick, onBlur: tapBlur } =
      useDoubleTapAction<HTMLAnchorElement>({
        speakText: speakText ?? ariaLabel ?? "",
        // We always preventDefault on the first tap, so navigation on the
        // confirming tap goes through the App Router explicitly.
        onActivate: (e) => {
          onClick?.(e);
          const url = typeof href === "string" ? href : href.toString();
          if (replace) router.replace(url);
          else router.push(url);
        },
        disabled: nativeTap,
      });

    return (
      <Link
        ref={ref}
        href={href}
        onClick={tapClick}
        onBlur={(e) => {
          tapBlur();
          onBlur?.(e);
        }}
        {...rest}
      >
        {children}
      </Link>
    );
  },
);

export default AccessibleLink;
