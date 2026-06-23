"use client";

import { useState } from "react";
import Link from "next/link";
import AppHeader from "../../components/AppHeader";
import { useSpeech } from "../../hooks/useSpeech";
import { MEDICINES } from "../../data/content";
import { CalendarIcon, ChevronRightIcon, PillIcon } from "../../components/Icons";
import AlertBox from "../../components/AlertBox";

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

/** Calendar Obat Page — full dashboard displaying monthly grid with daily scheduled medicines. */
export default function CalendarObatPage() {
  const { speak, stop, speaking } = useSpeech();
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [viewMonth, setViewMonth] = useState<number>(today.getMonth());
  const [viewYear, setViewYear] = useState<number>(today.getFullYear());

  // Filter medicines for the selected date
  const selectedMedicines = MEDICINES.filter((m) => {
    return new Date(m.loggedAt).toDateString() === selectedDate.toDateString();
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

  // Speak the day's schedule aloud
  function speakSchedule() {
    if (speaking) {
      stop();
      return;
    }
    const formattedDate = selectedDate.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    if (selectedMedicines.length === 0) {
      speak(`Jadwal obat untuk hari ${formattedDate} kosong. Tidak ada obat yang harus diminum.`);
    } else {
      const listSpeech = selectedMedicines
        .map((m, idx) => `Obat ke ${idx + 1}, ${m.name}. Dosis ${m.dosage}.`)
        .join(" ");
      speak(`Berikut jadwal obat untuk hari ${formattedDate}. ${listSpeech}`);
    }
  }

  // Check if a date has any registered medicines
  function hasMedicineOnDate(date: Date) {
    return MEDICINES.some(
      (m) => new Date(m.loggedAt).toDateString() === date.toDateString()
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-surface">
      <AppHeader title="KALENDER OBAT" backHref="/obat/riwayat" />

      <main className="flex flex-1 flex-col gap-5 px-5 py-5">
        {/* Monthly Grid Calendar Card */}
        <section aria-label="Kalender Bulanan" className="rounded-xl border-[3px] border-line bg-paper p-5 shadow-[4px_4px_0_0_var(--c-line)]">
          <div className="flex items-center gap-2 mb-4 justify-between">
            <h2 className="text-xl font-black text-heading uppercase tracking-tight">
              {MONTHS[viewMonth]} {viewYear}
            </h2>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => {
                  if (viewMonth === 0) {
                    setViewMonth(11);
                    setViewYear((y) => y - 1);
                  } else {
                    setViewMonth((m) => m - 1);
                  }
                }}
                className="size-10 border-2 border-line bg-paper text-base font-black text-ink rounded active:bg-surface"
              >
                &lt;
              </button>
              <button
                type="button"
                onClick={() => {
                  if (viewMonth === 11) {
                    setViewMonth(0);
                    setViewYear((y) => y + 1);
                  } else {
                    setViewMonth((m) => m + 1);
                  }
                }}
                className="size-10 border-2 border-line bg-paper text-base font-black text-ink rounded active:bg-surface"
              >
                &gt;
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {WEEKDAYS.map((d, i) => (
              <span key={i} className="py-1 text-xs font-black text-muted uppercase">
                {d}
              </span>
            ))}
            {cells.map((c, i) => {
              const isSelected = isSameDay(c.date, selectedDate);
              const hasObat = hasMedicineOnDate(c.date);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    if (c.inMonth) {
                      setSelectedDate(c.date);
                    }
                  }}
                  disabled={!c.inMonth}
                  className={`relative aspect-square rounded-full text-sm font-bold transition-all flex flex-col items-center justify-center ${
                    !c.inMonth
                      ? "text-muted/20 cursor-default"
                      : isSelected
                        ? "bg-primary text-black border-2 border-line scale-110 shadow-[2px_2px_0_0_var(--c-line)]"
                        : "text-ink hover:bg-surface"
                  }`}
                >
                  {c.day}
                  {hasObat && c.inMonth && !isSelected && (
                    <span className="absolute bottom-1 size-1.5 rounded-full bg-[#00e5ff]" />
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Selected Date Summary */}
        <section aria-label="Jadwal Obat Harian" className="flex flex-1 flex-col gap-4">
          <div className="flex items-center justify-between border-b-2 border-line pb-2">
            <h3 className="text-xl font-black text-heading uppercase tracking-tight">
              {selectedDate.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </h3>
            <span className="text-sm font-bold text-muted bg-surface border border-line px-2 py-0.5 rounded">
              {selectedMedicines.length} Obat
            </span>
          </div>

          {/* Voice Schedule Button */}
          <button
            type="button"
            onClick={speakSchedule}
            className="flex items-center justify-center gap-2 rounded-xl border-[3px] border-line bg-primary px-4 py-3 shadow-[4px_4px_0_0_var(--c-line)] text-lg font-black uppercase text-black active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_var(--c-line)] hover:bg-[#ffe14d]"
          >
            <CalendarIcon className="text-[24px]" />
            {speaking ? "HENTIKAN SUARA" : "BACA JADWAL HARI INI"}
          </button>

          {/* Medicines scheduled list */}
          <div className="flex flex-col gap-3">
            {selectedMedicines.map((m) => (
              <article
                key={m.id}
                className="flex items-center justify-between gap-4 p-4 rounded-xl border-2 border-line bg-paper hover:bg-surface transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-surface border border-line text-[20px] text-muted">
                    <PillIcon />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-ink uppercase">{m.name}</h4>
                    <p className="text-sm font-bold text-muted">{m.dosage}</p>
                  </div>
                </div>
                <Link
                  href={`/obat/${m.id}`}
                  className="flex size-10 items-center justify-center rounded-full bg-black text-white hover:bg-black/80"
                  aria-label={`Lihat detail ${m.name}`}
                >
                  <ChevronRightIcon className="text-[20px]" />
                </Link>
              </article>
            ))}

            {selectedMedicines.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-2 py-8 text-center bg-paper rounded-xl border-2 border-dashed border-line">
                <p className="text-lg font-bold text-muted">
                  Tidak ada jadwal obat pada tanggal ini.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
