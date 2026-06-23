"use client";

import { CloseIcon } from "./Icons";

/**
 * ModalContainer — a brutalist modal container without a dark backdrop overlay.
 * Uses a visually transparent click-catcher so users can still see the main page
 * clearly, but clicking outside the modal will still dismiss it.
 */
export default function ModalContainer({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      {/* Click-catcher background (transparent, but blocks clicks and triggers onClose) */}
      <div
        className="fixed inset-0 pointer-events-auto bg-transparent"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal content box */}
      <div className="relative w-full max-w-sm pointer-events-auto rounded-2xl border-[3px] border-line bg-paper p-5 shadow-[6px_6px_0_0_var(--c-line)] animate-fade-in">
        <div className="flex items-center justify-between gap-4 mb-4">
          {title ? (
            <h2 className="text-xl font-black text-heading uppercase tracking-tight">
              {title}
            </h2>
          ) : (
            <div />
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="flex size-10 items-center justify-center rounded-md border-2 border-line bg-paper text-[20px] text-ink hover:bg-surface active:translate-y-0.5"
          >
            <CloseIcon strokeWidth={3} />
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}
