"use client";

import { useState } from "react";
import Link from "next/link";
import AppHeader from "../../components/AppHeader";
import BacaSuaraButton from "../../components/BacaSuaraButton";
import { CalendarIcon, MicIcon, ChevronRightIcon } from "../../components/Icons";
import { PACKAGES, nutritionToSpeech } from "../../data/content";

/** Riwayat Kemasan — searchable history of scanned packages. */
export default function RiwayatKemasanPage() {
  const [query, setQuery] = useState("");

  const trimmed = query.trim().toLowerCase();
  const results = trimmed
    ? PACKAGES.filter((p) => p.name.toLowerCase().includes(trimmed))
    : PACKAGES;

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader title="RIWAYAT KEMASAN" />

      <main className="flex flex-1 flex-col gap-5 px-5 py-5">
        {/* Search */}
        <div className="flex flex-col gap-2">
          <label htmlFor="cari-kemasan" className="text-lg font-black tracking-wide text-ink">
            CARI KEMASAN
          </label>
          <div className="flex items-center gap-2 rounded-xl border-2 border-line bg-paper px-4 py-3">
            <input
              id="cari-kemasan"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari Kemasan..."
              className="min-w-0 flex-1 bg-transparent text-lg font-bold text-ink placeholder:text-muted focus:outline-none"
            />
            <CalendarIcon className="text-[24px] text-muted" aria-hidden />
            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-[24px] text-black">
              <MicIcon />
            </span>
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col gap-4">
          {results.map((item) => (
            <article key={item.id} className="rounded-xl border-2 border-line bg-paper p-5">
              <Link href={`/kemasan/${item.id}`} className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-ink">
                    {item.name}
                  </h2>
                  <p className="mt-1 text-base font-bold text-muted">{item.date}</p>
                </div>
                <ChevronRightIcon className="mt-1 text-[26px] text-ink" />
              </Link>

              <hr className="my-4 border-t-2 border-line" />

              <dl className="flex flex-col gap-2">
                {item.nutrition.map((n) => (
                  <div key={n.label} className="flex justify-between gap-4 text-lg font-black text-ink">
                    <dt>{n.label}</dt>
                    <dd>{n.value}</dd>
                  </div>
                ))}
              </dl>

              <BacaSuaraButton text={nutritionToSpeech(item)} className="mt-4" />
            </article>
          ))}

          {results.length === 0 && (
            <p className="py-8 text-center text-lg font-bold text-muted">
              Tidak ada kemasan yang cocok.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
