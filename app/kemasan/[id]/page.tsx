"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import AppHeader from "../../components/AppHeader";
import { useSettings, type AudioSpeed } from "../../context/SettingsContext";
import { SpeakerIcon, PauseIcon } from "../../components/Icons";
import { getPackage } from "../../data/content";
import AlertBox from "../../components/AlertBox";

const RATE_BY_SPEED: Record<AudioSpeed, number> = {
  lambat: 0.7,
  normal: 1,
  cepat: 1.4,
};

/** Detail Kemasan — nutrition facts for a scanned package + read aloud,
 *  with the row currently being read highlighted. Speech is implemented
 *  locally here instead of via
 *  the shared BacaSuaraButton/useSpeech, since those don't expose which
 *  row is active — keeps shared files untouched. */
export default function DetailKemasanPage() {
  const params = useParams<{ id: string }>();
  const item = getPackage(params.id);
  const { settings } = useSettings();

  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const playingRef = useRef(false);
  const settingsRef = useRef(settings);

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  const supported =
    typeof window !== "undefined" && "speechSynthesis" in window;

  const segments: string[] = item
    ? [
        item.name,
        ...item.nutrition.map((n) => `${n.label} ${n.value}`),
        ...(item.vitamins ?? []).map((v) => `${v.label} ${v.value}`),
        ...(item.alert ? [item.alert.text] : []),
      ]
    : [];
  const nutritionStart = 1;
  const vitaminsStart = nutritionStart + (item?.nutrition.length ?? 0);
  const alertIndex = item?.alert ? vitaminsStart + (item.vitamins?.length ?? 0) : -1;

  function stop() {
    if (supported) window.speechSynthesis.cancel();
    playingRef.current = false;
    setPlaying(false);
  }

  function speakFrom(index: number) {
    if (!supported || segments.length === 0) return;
    window.speechSynthesis.cancel();
    if (index >= segments.length) {
      stop();
      return;
    }
    setCurrent(index);
    playingRef.current = true;
    setPlaying(true);

    const u = new SpeechSynthesisUtterance(segments[index]);
    u.lang = "id-ID";
    u.rate = RATE_BY_SPEED[settingsRef.current.audioSpeed];
    u.volume = settingsRef.current.volume / 100;
    u.onend = () => {
      if (!playingRef.current) return;
      const next = index + 1;
      if (next < segments.length) speakFrom(next);
      else stop();
    };
    u.onerror = () => stop();
    window.speechSynthesis.speak(u);
  }

  function toggle() {
    if (playingRef.current) stop();
    else speakFrom(current);
  }

  useEffect(() => () => {
    if (supported) window.speechSynthesis.cancel();
  }, [supported]);

  if (!item) {
    return (
      <div className="flex flex-1 flex-col">
        <AppHeader />
        <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-xl font-black text-ink">Kemasan tidak ditemukan.</p>
          <Link
            href="/kemasan/riwayat"
            className="rounded-full bg-primary px-6 py-3 text-lg font-black text-black"
          >
            LIHAT RIWAYAT
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />

      <main className="flex flex-1 flex-col gap-6 px-5 py-5">
        <div className="rounded-xl border-2 border-line bg-paper p-6">
          <h1 className="text-3xl font-black uppercase tracking-tight text-heading">
            {item.name}
          </h1>
          <hr className="my-4 border-t-2 border-line" />

          <dl className="flex flex-col gap-3">
            {item.nutrition.map((n, i) => (
              <div
                key={n.label}
                className={`flex items-baseline justify-between gap-4 rounded-lg px-2 py-1 -mx-2 text-lg font-black text-ink transition-colors ${
                  current === nutritionStart + i ? "bg-primary/30" : ""
                }`}
              >
                <dt>{n.label}</dt>
                <dd className="flex items-baseline gap-2">
                  <span>{n.value}</span>
                  {n.percent && <span className="text-sm font-bold text-muted">{n.percent}</span>}
                </dd>
              </div>
            ))}
          </dl>

          {item.vitamins && item.vitamins.length > 0 && (
            <>
              <hr className="my-4 border-t-2 border-line" />
              <h2 className="mb-3 text-base font-black tracking-wide text-ink">
                VITAMIN &amp; MINERAL (%AKG)
              </h2>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                {item.vitamins.map((v, i) => (
                  <div
                    key={v.label}
                    className={`flex justify-between gap-2 rounded-lg px-2 py-1 -mx-2 text-sm font-bold text-ink transition-colors ${
                      current === vitaminsStart + i ? "bg-primary/30" : ""
                    }`}
                  >
                    <dt>{v.label}</dt>
                    <dd>{v.value}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}

          {item.alert && (
            <AlertBox
              type={item.alert.type}
              text={item.alert.text}
              className={`mt-4 transition-colors ${
                current === alertIndex ? "ring-4 ring-cyan-400" : ""
              }`}
            />
          )}
        </div>

        <button
          type="button"
          onClick={toggle}
          aria-pressed={playing}
          className="mt-auto flex w-full items-center justify-center gap-3 rounded-full border-[3px] border-line bg-primary px-6 py-4 text-xl font-black uppercase tracking-wide text-ink shadow-[5px_5px_0_0_var(--c-line)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_var(--c-line)]"
        >
          {playing ? (
            <PauseIcon className="text-[24px]" strokeWidth={3} />
          ) : (
            <SpeakerIcon className="text-[24px]" strokeWidth={3} />
          )}
          {playing ? "HENTIKAN" : "BACA SUARA"}
        </button>
      </main>
    </div>
  );
}
