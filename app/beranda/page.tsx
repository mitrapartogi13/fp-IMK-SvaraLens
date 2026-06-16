"use client";

import Link from "next/link";
import { useEffect, useRef, type ComponentType, type SVGProps } from "react";
import { useSpeech } from "../hooks/useSpeech";
import {
  DocumentIcon,
  HandWaveIcon,
  PackageIcon,
  PillIcon,
  SettingsIcon,
} from "../components/Icons";

type Tile = {
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Two-line, all-caps title (cleanly broken). */
  lines: [string, string];
  speak: string;
};

const TILES: Tile[] = [
  {
    href: "/dokumen",
    Icon: DocumentIcon,
    lines: ["BACA", "DOKUMEN"],
    speak: "Baca dokumen",
  },
  {
    href: "/obat",
    Icon: PillIcon,
    lines: ["SCAN", "OBAT"],
    speak: "Pindai obat",
  },
  {
    href: "/kemasan",
    Icon: PackageIcon,
    lines: ["CEK", "KEMASAN"],
    speak: "Cek kemasan",
  },
  {
    href: "/pengaturan",
    Icon: SettingsIcon,
    lines: ["PENGAT-", "URAN"],
    speak: "Pengaturan",
  },
];

const WELCOME = "Halo, mau memindai apa? Geser untuk memilih menu, ketuk dua kali untuk membuka.";

export default function BerandaPage() {
  const { speak } = useSpeech();
  const spokenRef = useRef(false);

  useEffect(() => {
    if (spokenRef.current) return;
    spokenRef.current = true;
    const id = setTimeout(() => speak(WELCOME), 350);
    return () => clearTimeout(id);
  }, [speak]);

  return (
    <div className="flex flex-1 flex-col bg-surface">
      {/* ===== Top bar ===== */}
      <header className="flex items-center justify-between border-b-[3px] border-line bg-surface px-5 py-4">
        <h1 className="text-2xl font-black tracking-wide text-ink">SVARALENS</h1>
        <Link
          href="/pengaturan"
          aria-label="Pengaturan"
          className="flex size-11 items-center justify-center rounded-md text-[28px] text-ink hover:bg-paper"
        >
          <SettingsIcon strokeWidth={2.6} />
        </Link>
      </header>

      <main className="flex flex-1 flex-col gap-5 px-5 py-5">
        {/* Welcome status */}
        <section aria-label="Status asisten">
          <p className="text-lg font-bold text-ink">Halo, mau memindai apa?</p>
          <div className="mt-1.5 flex items-center gap-2">
            <span
              className="inline-block size-3 rounded-full bg-[#00e5ff]"
              aria-hidden
            />
            <span className="text-sm font-black uppercase tracking-wide text-muted">
              Asisten Suara Aktif
            </span>
          </div>
        </section>

        {/* 2x2 grid */}
        <nav aria-label="Menu utama" className="grid grid-cols-2 gap-4">
          {TILES.map(({ href, Icon, lines, speak: label }) => (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className="group flex aspect-square flex-col justify-between rounded-2xl border-[3px] border-line bg-paper p-4 shadow-[5px_5px_0_0_var(--c-line)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_var(--c-line)]"
            >
              <Icon className="text-[34px] text-ink" strokeWidth={2.4} />
              <div className="flex flex-col text-left">
                <span className="text-xl font-black leading-[1.1] tracking-tight text-ink">
                  {lines[0]}
                </span>
                <span className="text-xl font-black leading-[1.1] tracking-tight text-ink">
                  {lines[1]}
                </span>
              </div>
            </Link>
          ))}
        </nav>

        {/* Yellow instructional tip bar */}
        <div className="flex items-center gap-3 rounded-2xl border-[3px] border-line bg-primary px-4 py-3 shadow-[4px_4px_0_0_var(--c-line)]">
          <HandWaveIcon className="shrink-0 text-[30px] text-ink" />
          <p className="text-sm font-black leading-snug text-ink">
            Geser untuk memilih menu.
            <br />
            Ketuk dua kali untuk membuka.
          </p>
        </div>
      </main>
    </div>
  );
}
