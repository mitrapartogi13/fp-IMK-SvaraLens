/**
 * Mobile-first artboard: max-width 390px, centered on desktop, themed paper
 * surface. A flex column so pages grow to fill height and the bottom nav
 * sticks to the base.
 */
export default function PhoneFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh justify-center bg-surface">
      <div className="relative flex min-h-dvh w-full max-w-[390px] flex-col bg-paper text-ink shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
        {children}
      </div>
    </div>
  );
}
