"use client";

import { useState } from "react";
import { CloseIcon } from "./Icons";

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

/** Date picker modal — tanpa backdrop overlay, sesuai desain Figma. */
export default function CalendarModal({
  open,
  value,
  onClose,
  onSelect,
}: {
  open: boolean;
  value: Date;
  onClose: () => void;
  onSelect: (date: Date) => void;
}) {
  const [viewYear, setViewYear] = useState(value.getFullYear());
  const [viewMonth, setViewMonth] = useState(value.getMonth());
  const [picked, setPicked] = useState(value);

  if (!open) return null;

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl border-2 border-line bg-paper p-5 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <select
              value={viewMonth}
              onChange={(e) => setViewMonth(Number(e.target.value))}
              aria-label="Pilih bulan"
              className="bg-transparent text-xl font-black text-ink"
            >
              {MONTHS.map((m, i) => (
                <option key={m} value={i}>{m}</option>
              ))}
            </select>
            <select
              value={viewYear}
              onChange={(e) => setViewYear(Number(e.target.value))}
              aria-label="Pilih tahun"
              className="bg-transparent text-xl font-black text-ink"
            >
              {Array.from({ length: 11 }, (_, i) => viewYear - 5 + i).map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <button type="button" onClick={onClose} aria-label="Tutup" className="text-[22px] text-ink">
            <CloseIcon />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((d, i) => (
            <span key={i} className="py-1 text-sm font-bold text-muted">{d}</span>
          ))}
          {cells.map((c, i) => (
            <button
              key={i}
              type="button"
              disabled={!c.inMonth}
              onClick={() => setPicked(c.date)}
              className={`aspect-square rounded-full text-base font-bold ${
                !c.inMonth
                  ? "text-muted/40"
                  : isSameDay(c.date, picked)
                    ? "bg-primary text-black"
                    : "text-ink hover:bg-surface"
              }`}
            >
              {c.day}
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border-2 border-line py-3 text-lg font-black text-ink"
          >
            BATAL
          </button>
          <button
            type="button"
            onClick={() => onSelect(picked)}
            className="rounded-full bg-primary py-3 text-lg font-black text-black"
          >
            OKE
          </button>
        </div>
      </div>
    </div>
  );
}