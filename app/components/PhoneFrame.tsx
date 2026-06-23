/**
 * Mobile-first artboard: max-width 390px, centered on desktop.
 * Provides the off-white themed surface for every page. A flex column so
 * pages grow to fill height and the bottom nav sticks to the base.
 *
 * `min-h-dvh` (dynamic viewport) prevents the iOS Safari URL bar from
 * clipping the bottom CTA. `overflow-x-clip` keeps the brutalist shadows
 * from leaking past the frame edge horizontally WITHOUT trapping vertical
 * content — so when a page (or a large font scale) is taller than the
 * viewport, it scrolls instead of hiding the bottom CTA off-screen.
 */
export default function PhoneFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh justify-center bg-black/5">
      <div className="relative flex min-h-dvh w-full max-w-[390px] flex-col overflow-x-clip bg-surface text-ink shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
        {children}
      </div>
    </div>
  );
}
