"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AppHeader from "../../components/AppHeader";
import { CheckIcon, RefreshIcon } from "../../components/Icons";

/** Scan Berhasil — confirmation after capturing a package. */
export default function ScanSuccessPage() {
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader backHref="/dokumen" />

      <main className="flex flex-1 flex-col items-center px-6 pb-8 text-center">
        <div className="flex flex-1 animate-fade-in flex-col items-center justify-center gap-8">
          <div className="flex size-40 items-center justify-center rounded-full bg-black text-[90px] text-white">
            <CheckIcon />
          </div>
          <h1 className="text-4xl font-black uppercase leading-tight tracking-tight text-heading">
            Scan
            <br />
            Berhasil!
          </h1>
        </div>

        <div className="flex w-full flex-col gap-3">
          <button
            type="button"
            onClick={() => router.push("/dokumen")}
            className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-line bg-paper px-6 py-4 text-xl font-black uppercase tracking-wide text-ink active:bg-surface"
          >
            <RefreshIcon className="text-[24px]" />
            Ulangi
          </button>
          <Link
            href="/dokumen/surat-kuasa"
            className="w-full rounded-full bg-primary px-6 py-5 text-center text-xl font-black uppercase tracking-wide text-black shadow-[0_4px_0_0_var(--color-primary-press)] active:translate-y-0.5"
          >
            Mulai Membaca
          </Link>
        </div>
      </main>
    </div>
  );
}
