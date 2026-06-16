"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BackIcon, SettingsIcon } from "./Icons";

/**
 * Top app bar: optional back arrow (goes to the previous page), centered
 * title, and an optional gear that always links to /pengaturan.
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
    <header className="flex items-center justify-between gap-2 border-b-2 border-line px-4 py-3">
      <div className="flex w-12 shrink-0 items-center">
        {showBack &&
          (backHref ? (
            <Link
              href={backHref}
              aria-label="Kembali"
              className="flex size-12 items-center justify-center rounded-full text-[26px] text-ink hover:bg-surface"
            >
              <BackIcon />
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Kembali"
              className="flex size-12 items-center justify-center rounded-full text-[26px] text-ink hover:bg-surface"
            >
              <BackIcon />
            </button>
          ))}
      </div>

      {title && (
        <h1 className="flex-1 text-center text-xl font-black tracking-tight text-heading">
          {title}
        </h1>
      )}

      <div className="flex w-12 shrink-0 items-center justify-end">
        {showGear && (
          <Link
            href="/pengaturan"
            aria-label="Pengaturan"
            className="flex size-12 items-center justify-center rounded-full text-[26px] text-ink hover:bg-surface"
          >
            <SettingsIcon />
          </Link>
        )}
      </div>
    </header>
  );
}
