"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AppHeader from "../../components/AppHeader";
import BacaSuaraButton from "../../components/BacaSuaraButton";
import { CalendarIcon, MicIcon, ChevronRightIcon, WaveformIcon } from "../../components/Icons";
import { PACKAGES, nutritionToSpeech, formatDate } from "../../data/content";
import AlertBox from "../../components/AlertBox";
import CalendarModal from "../../components/CalendarModal";

/** Riwayat Kemasan — searchable history of scanned packages. */
export default function RiwayatKemasanPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [filterDate, setFilterDate] = useState<Date | null>(null);

  const trimmed = query.trim().toLowerCase();
  const results = PACKAGES.filter((p) => {
    const matchesQuery = trimmed ? p.name.toLowerCase().includes(trimmed) : true;
    const matchesDate = filterDate
      ? new Date(p.loggedAt).toDateString() === filterDate.toDateString()
      : true;
    return matchesQuery && matchesDate;
  });

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
            <button
              type="button"
              aria-label="Filter berdasarkan tanggal"
              onClick={() => setCalendarOpen(true)}
              className="flex size-6 shrink-0 items-center justify-center"
            >
              <CalendarIcon className="text-[24px] text-muted" />
            </button>
            
            <button
              type="button"
              onClick={() => router.push("/kemasan/voice-search")}
              aria-label="Cari dengan suara"
              className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-[24px] text-black"
            >
              <MicIcon />
            </button>
          </div>
        </div>

        {filterDate && (
          <button
            type="button"
            onClick={() => setFilterDate(null)}
            className="self-start rounded-full bg-primary px-4 py-2 text-sm font-black text-black"
          >
            {filterDate.toLocaleDateString("id-ID")} ✕
          </button>
        )}

        {/* List */}
        <div className="flex flex-col gap-4">
          {results.map((item) => (
            <article key={item.id} className="rounded-xl border-2 border-line bg-paper p-5">
              <Link href={`/kemasan/${item.id}`} className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-ink">
                    {item.name}
                  </h2>
                  <p className="mt-1 text-base font-bold text-muted">{formatDate(item.loggedAt)}</p>
                </div>
                <ChevronRightIcon className="mt-1 text-[26px] text-ink" />
              </Link>

              <hr className="my-4 border-t-2 border-line" />

              <dl className="flex flex-col gap-2">
                {item.summary.map((n) => (
                  <div key={n.label} className="flex justify-between gap-4 text-lg font-black text-ink">
                    <dt>{n.label}</dt>
                    <dd>{n.value}</dd>
                  </div>
                ))}
              </dl>
              {item.alert && <AlertBox type={item.alert.type} text={item.alert.text} className="mt-4" />}
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
      <CalendarModal
        open={calendarOpen}
        value={filterDate ?? new Date()}
        onClose={() => setCalendarOpen(false)}
        onSelect={(d) => {
          setFilterDate(d);
          setCalendarOpen(false);
        }}
      />
    </div>
  );
}
