"use client";

import { useState } from "react";
import Link from "next/link";
import AppHeader from "../../components/AppHeader";
import BacaSuaraButton from "../../components/BacaSuaraButton";
import { CalendarIcon, MicIcon, ChevronRightIcon, PillIcon } from "../../components/Icons";
import { MEDICINES, medicineToSpeech } from "../../data/content";
import AlertBox from "../../components/AlertBox";
import ModalContainer from "../../components/ModalContainer";

const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Riwayat Obat — searchable history of scanned medicines with a calendar modal filter. */
export default function RiwayatObatPage() {
  const [query, setQuery] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [filterDate, setFilterDate] = useState<Date | null>(null);

  // States for date picker inside ModalContainer
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [pickedDate, setPickedDate] = useState(today);

  const trimmed = query.trim().toLowerCase();
  const results = MEDICINES.filter((m) => {
    const matchesQuery = trimmed ? m.name.toLowerCase().includes(trimmed) : true;
    const matchesDate = filterDate
      ? new Date(m.loggedAt).toDateString() === filterDate.toDateString()
      : true;
    return matchesQuery && matchesDate;
  });

  // Calculate calendar days
  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay();
  const totalDays = daysInMonth(viewYear, viewMonth);
  const prevMonthDays = daysInMonth(viewYear, viewMonth - 1);

  const cells: { day: number; inMonth: boolean; date: Date }[] = [];
  for (let i = 0; i < firstWeekday; i++) {
    const day = prevMonthDays - firstWeekday + 1 + i;
    cells.push({ day, inMonth: false, date: new Date(viewYear, viewMonth - 1, day) });
  }
  for (let d = 1; d <= totalDays; d++) {
    cells.push({ day: d, inMonth: true, date: new Date(viewYear, viewMonth, d) });
  }
  let nextDay = 1;
  while (cells.length < 42) {
    cells.push({ day: nextDay, inMonth: false, date: new Date(viewYear, viewMonth + 1, nextDay) });
    nextDay++;
  }

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader title="RIWAYAT OBAT" backHref="/obat" />

      <main className="flex flex-1 flex-col gap-5 px-5 py-5">
        {/* Full-Page Calendar Route Button */}
        <Link
          href="/obat/calendar"
          className="flex items-center justify-between gap-3 rounded-xl border-[3px] border-line bg-primary p-4 shadow-[4px_4px_0_0_var(--c-line)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_var(--c-line)]"
        >
          <div className="flex items-center gap-3">
            <CalendarIcon className="text-[28px] text-black animate-bounce" />
            <div>
              <h2 className="text-lg font-black uppercase tracking-tight text-black">
                Kalender Jadwal Obat
              </h2>
              <p className="text-xs font-bold text-black/80">
                Lihat daftar obat bulanan lengkap
              </p>
            </div>
          </div>
          <ChevronRightIcon className="text-[24px] text-black" />
        </Link>

        {/* Search */}
        <div className="flex flex-col gap-2">
          <label htmlFor="cari-obat" className="text-lg font-black tracking-wide text-ink">
            CARI OBAT
          </label>
          <div className="flex items-center gap-2 rounded-xl border-2 border-line bg-paper px-4 py-3">
            <input
              id="cari-obat"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari Obat..."
              className="min-w-0 flex-1 bg-transparent text-lg font-bold text-ink placeholder:text-muted focus:outline-none"
            />
            <button
              type="button"
              aria-label="Filter berdasarkan tanggal"
              onClick={() => setCalendarOpen(true)}
              className="flex size-6 shrink-0 items-center justify-center hover:scale-110 active:scale-95"
            >
              <CalendarIcon className="text-[24px] text-muted" />
            </button>
            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-[24px] text-black">
              <MicIcon />
            </span>
          </div>
        </div>

        {filterDate && (
          <button
            type="button"
            onClick={() => setFilterDate(null)}
            className="self-start rounded-full bg-primary px-4 py-2 text-sm font-black text-black border-2 border-line active:translate-y-0.5"
          >
            {filterDate.toLocaleDateString("id-ID")} ✕
          </button>
        )}

        {/* Medicine List */}
        <div className="flex flex-col gap-4">
          {results.map((item) => (
            <article key={item.id} className="rounded-xl border-[3px] border-line bg-paper p-5 shadow-[4px_4px_0_0_var(--c-line)]">
              <Link href={`/obat/${item.id}`} className="flex items-start justify-between gap-2">
                <div className="flex gap-3">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface border-2 border-line text-[24px] text-muted">
                    <PillIcon />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight text-ink">
                      {item.name}
                    </h2>
                    <p className="mt-1 text-base font-bold text-muted">{item.date}</p>
                  </div>
                </div>
                <ChevronRightIcon className="mt-1 text-[26px] text-ink" />
              </Link>

              <hr className="my-4 border-t-2 border-line" />

              <dl className="flex flex-col gap-2">
                <div className="flex justify-between gap-4 text-lg font-black text-ink">
                  <dt>Dosis</dt>
                  <dd className="bg-primary/20 px-2 py-0.5 rounded border border-line text-sm">{item.dosage}</dd>
                </div>
                <div className="flex justify-between gap-4 text-lg font-black text-ink">
                  <dt>Kedaluwarsa</dt>
                  <dd className="text-sm font-bold text-muted">{item.expiry}</dd>
                </div>
              </dl>
              {item.alert && <AlertBox type={item.alert.type} text={item.alert.text} className="mt-4" />}
              <BacaSuaraButton text={medicineToSpeech(item)} className="mt-4" />
            </article>
          ))}

          {results.length === 0 && (
            <p className="py-8 text-center text-lg font-bold text-muted">
              Tidak ada obat yang cocok.
            </p>
          )}
        </div>
      </main>

      {/* Date Picker using ModalContainer without dark backdrop overlay */}
      <ModalContainer
        open={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        title="Pilih Tanggal"
      >
        <div className="flex items-center gap-2 mb-4 justify-center">
          <select
            value={viewMonth}
            onChange={(e) => setViewMonth(Number(e.target.value))}
            aria-label="Pilih bulan"
            className="bg-transparent text-lg font-black text-ink border-2 border-line rounded px-1"
          >
            {MONTHS.map((m, i) => (
              <option key={m} value={i}>{m}</option>
            ))}
          </select>
          <select
            value={viewYear}
            onChange={(e) => setViewYear(Number(e.target.value))}
            aria-label="Pilih tahun"
            className="bg-transparent text-lg font-black text-ink border-2 border-line rounded px-1"
          >
            {Array.from({ length: 11 }, (_, i) => today.getFullYear() - 5 + i).map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mb-4">
          {WEEKDAYS.map((d, i) => (
            <span key={i} className="py-1 text-xs font-bold text-muted uppercase">{d}</span>
          ))}
          {cells.map((c, i) => (
            <button
              key={i}
              type="button"
              disabled={!c.inMonth}
              onClick={() => setPickedDate(c.date)}
              className={`aspect-square rounded-full text-sm font-bold transition-all ${
                !c.inMonth
                  ? "text-muted/20 cursor-default"
                  : isSameDay(c.date, pickedDate)
                    ? "bg-primary text-black border-2 border-line scale-110 shadow-[2px_2px_0_0_var(--c-line)]"
                    : "text-ink hover:bg-surface"
              }`}
            >
              {c.day}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => setCalendarOpen(false)}
            className="rounded-full border-2 border-line py-2 text-base font-black text-ink bg-paper active:bg-surface"
          >
            BATAL
          </button>
          <button
            type="button"
            onClick={() => {
              setFilterDate(pickedDate);
              setCalendarOpen(false);
            }}
            className="rounded-full bg-primary border-2 border-line py-2 text-base font-black text-black active:translate-y-0.5"
          >
            PILIH TANGGAL
          </button>
        </div>
      </ModalContainer>
    </div>
  );
}
