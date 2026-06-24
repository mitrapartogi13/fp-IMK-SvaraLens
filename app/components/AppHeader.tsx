"use client";

import { useRouter } from "next/navigation";
import AccessibleButton from "./AccessibleButton";
import AccessibleLink from "./AccessibleLink";
import { BackIcon, SettingsIcon } from "./Icons";

/**
 * Top app bar — brutalist style. Optional back arrow (previous page), centered
 * title, and an optional gear icon that always links to /pengaturan.
 */
export default function AppHeader({
  title,
  showBack = true,
  showGear = true,
  backHref,
}: {
  title?: string;
  showBack?: boolean;
  showGear?: boolean;
  backHref?: string;
}) {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between gap-2 border-b-[3px] border-line bg-surface px-4 py-3">
      <div className="flex w-12 shrink-0 items-center">
        {showBack &&
          (backHref ? (
            <AccessibleLink
              href={backHref}
              aria-label="Kembali"
              className="flex size-12 items-center justify-center rounded-md text-[28px] text-ink hover:bg-paper"
            >
              <BackIcon strokeWidth={2.6} />
            </AccessibleLink>
          ) : (
            <AccessibleButton
              type="button"
              speakText="Kembali"
              onClick={() => router.back()}
              aria-label="Kembali"
              className="flex size-12 items-center justify-center rounded-md text-[28px] text-ink hover:bg-paper"
            >
              <BackIcon strokeWidth={2.6} />
            </AccessibleButton>
          ))}
      </div>

      {title && (
        <h1 className="flex-1 text-center text-xl font-black tracking-tight text-heading">
          {title}
        </h1>
      )}

      <div className="flex w-12 shrink-0 items-center justify-end">
        {showGear && (
          <AccessibleLink
            href="/pengaturan"
            aria-label="Pengaturan"
            className="flex size-12 items-center justify-center rounded-md text-[28px] text-ink hover:bg-paper"
          >
            <SettingsIcon strokeWidth={2.6} />
          </AccessibleLink>
        )}
      </div>
    </header>
  );
}
