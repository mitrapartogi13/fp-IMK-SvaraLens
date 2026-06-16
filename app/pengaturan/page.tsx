"use client";

import { useState } from "react";
import AppHeader from "../components/AppHeader";
import { useSettings, type AudioSpeed } from "../context/SettingsContext";
import { VolumeIcon, CheckIcon } from "../components/Icons";

const FONT_MIN = 80;
const FONT_MAX = 200;
const FONT_STEP = 10;

const SPEEDS: { key: AudioSpeed; label: string }[] = [
  { key: "lambat", label: "LAMBAT" },
  { key: "normal", label: "NORMAL" },
  { key: "cepat", label: "CEPAT" },
];

/**
 * Pengaturan — theme, font size, assistant volume, and audio speed. Every
 * control updates the SettingsContext (which persists to localStorage and
 * applies theme + font scale live). "SIMPAN" confirms the saved state.
 */
export default function PengaturanPage() {
  const { settings, update } = useSettings();
  const [saved, setSaved] = useState(false);

  function save() {
    update({ ...settings }); // ensure persisted
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader title="PENGATURAN" showGear={false} />

      <main className="flex flex-1 flex-col gap-5 px-5 py-5">
        {/* TEMA WARNA */}
        <Section label="TEMA WARNA">
          <div className="grid grid-cols-2 overflow-hidden rounded-xl border-2 border-line">
            <Segment
              active={settings.theme === "dark"}
              onClick={() => update({ theme: "dark" })}
            >
              Kuning / Hitam
            </Segment>
            <Segment
              active={settings.theme === "light"}
              onClick={() => update({ theme: "light" })}
              divider
            >
              Putih / Hitam
            </Segment>
          </div>
        </Section>

        {/* UKURAN FONT */}
        <Section label="UKURAN FONT">
          <div className="flex items-center justify-between gap-4">
            <Stepper
              label="Kurangi ukuran font"
              disabled={settings.fontSize <= FONT_MIN}
              onClick={() =>
                update({ fontSize: Math.max(FONT_MIN, settings.fontSize - FONT_STEP) })
              }
            >
              A−
            </Stepper>
            <span className="text-3xl font-black text-ink">{settings.fontSize}%</span>
            <Stepper
              label="Tambah ukuran font"
              disabled={settings.fontSize >= FONT_MAX}
              onClick={() =>
                update({ fontSize: Math.min(FONT_MAX, settings.fontSize + FONT_STEP) })
              }
            >
              A+
            </Stepper>
          </div>
        </Section>

        {/* VOLUME ASISTEN AI */}
        <Section label="VOLUME ASISTEN AI">
          <div className="flex items-center gap-4">
            <VolumeIcon className="text-[32px] text-ink" />
            <input
              type="range"
              min={0}
              max={100}
              value={settings.volume}
              onChange={(e) => update({ volume: Number(e.target.value) })}
              aria-label="Volume asisten AI"
              className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-surface accent-primary"
            />
            <span className="w-16 text-right text-2xl font-black text-ink">
              {settings.volume}%
            </span>
          </div>
        </Section>

        {/* KECEPATAN AUDIO */}
        <Section label="KECEPATAN AUDIO">
          <div className="grid grid-cols-3 gap-3">
            {SPEEDS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                aria-pressed={settings.audioSpeed === key}
                onClick={() => update({ audioSpeed: key })}
                className={`rounded-full border-2 border-line py-3 text-base font-black transition ${
                  settings.audioSpeed === key
                    ? "bg-primary text-black"
                    : "bg-paper text-ink hover:bg-surface"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </Section>

        {/* Save */}
        <button
          type="button"
          onClick={save}
          className={`mt-auto flex w-full items-center justify-center gap-2 rounded-full px-6 py-5 text-xl font-black uppercase tracking-wide shadow-[0_4px_0_0_var(--color-primary-press)] transition active:translate-y-0.5 ${
            saved ? "bg-black text-primary" : "bg-primary text-black"
          }`}
        >
          {saved && <CheckIcon className="text-[24px]" />}
          {saved ? "Tersimpan" : "Simpan Pengaturan"}
        </button>
      </main>
    </div>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border-2 border-line bg-paper p-5">
      <h2 className="mb-4 text-lg font-black tracking-wide text-ink">{label}</h2>
      {children}
    </section>
  );
}

function Segment({
  active,
  onClick,
  divider,
  children,
}: {
  active: boolean;
  onClick: () => void;
  divider?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`py-4 text-lg font-black transition ${divider ? "border-l-2 border-line" : ""} ${
        active ? "bg-primary text-black" : "bg-paper text-ink hover:bg-surface"
      }`}
    >
      {children}
    </button>
  );
}

function Stepper({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="flex size-16 items-center justify-center rounded-xl bg-primary text-2xl font-black text-black disabled:opacity-40"
    >
      {children}
    </button>
  );
}
