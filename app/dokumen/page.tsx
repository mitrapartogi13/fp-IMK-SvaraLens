"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AppHeader from "../components/AppHeader";
import {
  WaveformIcon,
  MicIcon,
  DocumentIcon,
  ChevronRightIcon,
  SearchXIcon,
  SpeakerIcon,
  AssistantIcon,
} from "../components/Icons";
import { DOCUMENTS } from "../data/content";

function DokumenInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const trimmed = query.trim().toLowerCase();
  const results = trimmed
    ? DOCUMENTS.filter((d) => d.name.toLowerCase().includes(trimmed))
    : DOCUMENTS;
  const noResults = trimmed.length > 0 && results.length === 0;

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader title="RIWAYAT PINDAI" />

      <main className="flex flex-1 flex-col gap-5 px-5 py-5">
        {/* Search */}
        <div className="flex flex-col gap-2">
          <label htmlFor="cari-berkas" className="text-lg font-black tracking-wide text-ink">
            CARI BERKAS
          </label>
          <div className="flex items-center gap-2 rounded-xl border-2 border-line bg-paper px-4 py-3">
            <input
              id="cari-berkas"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="CARI DOKUMEN..."
              className="min-w-0 flex-1 bg-transparent text-lg font-bold text-ink placeholder:text-muted focus:outline-none"
            />
            <WaveformIcon className="text-[24px] text-muted" aria-hidden />
            <button
              type="button"
              onClick={() => router.push("/dokumen/voice-search")}
              aria-label="Cari dengan suara"
              className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-[24px] text-black"
            >
              <MicIcon />
            </button>
          </div>
        </div>

        {noResults ? (
          <NoResults onReset={() => setQuery("")} />
        ) : (
          <ul className="flex flex-col gap-4">
            {results.map((doc) => (
              <li key={doc.id}>
                <Link
                  href={`/dokumen/${doc.id}`}
                  className="flex items-center gap-4 rounded-xl border-2 border-line bg-paper p-3 active:bg-surface"
                >
                  <span className="flex h-20 w-[60px] shrink-0 items-center justify-center rounded-md border-2 border-line bg-surface text-[28px] text-muted">
                    <DocumentIcon />
                  </span>
                  <span className="flex-1 text-xl font-black leading-tight text-ink">
                    {doc.name}
                  </span>
                  <ChevronRightIcon className="text-[26px] text-ink" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

function NoResults({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-1 animate-fade-in flex-col items-center justify-center gap-5 py-6 text-center">
      <div className="relative">
        <div className="flex size-40 items-center justify-center rounded-full bg-surface text-[80px] text-muted">
          <SearchXIcon />
        </div>
        <span className="absolute -right-1 top-1 flex size-12 items-center justify-center rounded-full bg-primary text-[24px] text-black">
          <SpeakerIcon />
        </span>
      </div>

      <h2 className="text-2xl font-black uppercase tracking-tight text-heading">
        Hasil Tidak Ditemukan
      </h2>
      <p className="italic text-lg font-bold text-muted">Coba kata kunci lain</p>

      <div className="flex items-center gap-3 rounded-2xl border-2 border-line bg-paper px-4 py-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-[22px] text-black">
          <AssistantIcon />
        </span>
        <p className="text-base font-bold text-ink">
          &ldquo;Maaf, hasil tidak ditemukan&rdquo;
        </p>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="w-full rounded-full bg-primary px-6 py-4 text-xl font-black uppercase tracking-wide text-black shadow-[0_4px_0_0_var(--color-primary-press)] active:translate-y-0.5"
      >
        Cari Ulang
      </button>
    </div>
  );
}

export default function DokumenPage() {
  return (
    <Suspense fallback={null}>
      <DokumenInner />
    </Suspense>
  );
}
