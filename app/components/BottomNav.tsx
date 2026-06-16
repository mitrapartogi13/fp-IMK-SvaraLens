"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DocumentIcon, PillIcon, PackageIcon } from "./Icons";

type Tab = {
  key: string;
  label: string;
  href: string;
  match: string;
  Icon: typeof DocumentIcon;
};

const TABS: Tab[] = [
  { key: "dokumen", label: "DOKUMEN", href: "/dokumen", match: "/dokumen", Icon: DocumentIcon },
  { key: "obat", label: "OBAT", href: "/obat", match: "/obat", Icon: PillIcon },
  { key: "kemasan", label: "KEMASAN", href: "/kemasan", match: "/kemasan", Icon: PackageIcon },
];

// Routes that should NOT show the bottom nav (full-screen / focused flows).
const HIDDEN_ON = ["/", "/splash", "/tutorial", "/pengaturan", "/dokumen/voice-search"];

/**
 * Global bottom tab bar. Active tab is derived from the current route and is
 * filled solid yellow with a black icon + label.
 */
export default function BottomNav() {
  const pathname = usePathname();

  if (HIDDEN_ON.includes(pathname)) return null;

  return (
    <nav
      aria-label="Navigasi utama"
      className="sticky bottom-0 z-30 grid grid-cols-3 border-t-2 border-line bg-paper"
    >
      {TABS.map(({ key, label, href, match, Icon }) => {
        const isActive =
          pathname === match || pathname.startsWith(`${match}/`);
        return (
          <Link
            key={key}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`flex min-h-[84px] flex-col items-center justify-center gap-1.5 py-3 transition-colors ${
              isActive ? "bg-primary text-black" : "bg-paper text-gray-inactive"
            }`}
          >
            <Icon className="text-[28px]" />
            <span className="text-sm font-extrabold tracking-wide">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
