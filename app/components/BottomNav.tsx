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
  { key: "obat",    label: "OBAT",    href: "/obat",    match: "/obat",    Icon: PillIcon },
  { key: "kemasan", label: "KEMASAN", href: "/kemasan", match: "/kemasan", Icon: PackageIcon },
];

// Routes that should NOT show the bottom nav (full-screen / focused flows).
const HIDDEN_ON = ["/", "/splash", "/tutorial", "/pengaturan", "/dokumen/voice-search"];

/**
 * Global bottom tab bar — brutalist style with thick top border and crisp
 * vertical dividers between columns. Active tab is rendered with a solid
 * yellow background. /beranda shows the bar but doesn't mark any tab active.
 */
export default function BottomNav() {
  const pathname = usePathname();

  if (HIDDEN_ON.includes(pathname)) return null;

  return (
    <nav
      aria-label="Navigasi utama"
      className="sticky bottom-0 z-30 grid grid-cols-3 border-t-[3px] border-line bg-paper"
    >
      {TABS.map(({ key, label, href, match, Icon }, i) => {
        const isActive =
          pathname === match || pathname.startsWith(`${match}/`);
        return (
          <Link
            key={key}
            href={href}
            aria-current={isActive ? "page" : undefined}
            aria-label={label}
            className={[
              "flex min-h-[88px] flex-col items-center justify-center gap-1.5 py-3 transition-colors",
              i > 0 ? "border-l-[3px] border-line" : "",
              isActive ? "bg-primary text-ink" : "bg-paper text-ink",
            ].join(" ")}
          >
            <Icon className="text-[30px]" strokeWidth={2.4} />
            <span className="text-sm font-black tracking-wide">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
