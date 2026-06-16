"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import AppHeader from "../../components/AppHeader";
import { useSettings, type AudioSpeed } from "../../context/SettingsContext";
import { getDocument } from "../../data/content";
import { PlayIcon, PauseIcon, SkipIcon, RefreshIcon } from "../../components/Icons";

const RATE_BY_SPEED: Record<AudioSpeed, number> = {
  lambat: 0.7,
  normal: 1,
  cepat: 1.4,
};

/** Detail Dokumen — reads the document aloud paragraph by paragraph, with the
 *  active paragraph highlighted. Uses the Web Speech API + user settings. */
export default function DetailDokumenPage() {
  const params = useParams<{ id: string }>();
  const doc = getDocument(params.id);
  const { settings } = useSettings();

  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);

  const currentRef = useRef(0);
  const playingRef = useRef(false);
  const settingsRef = useRef(settings);
  const paraRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  const supported =
    typeof window !== "undefined" && "speechSynthesis" in window;

  function setIndex(i: number) {
    currentRef.current = i;
    setCurrent(i);
    paraRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function stop() {
    if (supported) window.speechSynthesis.cancel();
    playingRef.current = false;
    setPlaying(false);
  }

  function speakFrom(index: number) {
    if (!supported || !doc) return;
    window.speechSynthesis.cancel();
    if (index >= doc.paragraphs.length) {
      stop();
      return;
    }
    setIndex(index);
    playingRef.current = true;
    setPlaying(true);

    const u = new SpeechSynthesisUtterance(doc.paragraphs[index]);
    u.lang = "id-ID";
    u.rate = RATE_BY_SPEED[settingsRef.current.audioSpeed];
    u.volume = settingsRef.current.volume / 100;
    u.onend = () => {
      if (!playingRef.current) return;
      const next = index + 1;
      if (next < doc.paragraphs.length) speakFrom(next);
      else stop();
    };
    u.onerror = () => stop();
    window.speechSynthesis.speak(u);
  }

  function toggle() {
    if (playingRef.current) stop();
    else speakFrom(currentRef.current);
  }

  function skipParagraph() {
    if (!doc) return;
    const next = Math.min(currentRef.current + 1, doc.paragraphs.length - 1);
    if (playingRef.current) speakFrom(next);
    else setIndex(next);
  }

  // Stop speech on unmount.
  useEffect(() => () => {
    if (supported) window.speechSynthesis.cancel();
  }, [supported]);

  if (!doc) {
    return (
      <div className="flex flex-1 flex-col">
        <AppHeader title="DETAIL DOKUMEN" />
        <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-xl font-black text-ink">Dokumen tidak ditemukan.</p>
          <Link
            href="/dokumen"
            className="rounded-full bg-primary px-6 py-3 text-lg font-black text-black"
          >
            KEMBALI
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <AppHeader title="DETAIL DOKUMEN" />

      <main className="flex flex-1 flex-col gap-5 px-5 py-5">
        <h1 className="text-3xl font-black uppercase tracking-tight text-heading">
          {doc.name}
        </h1>

        <div className="rounded-xl border-2 border-line bg-paper p-5">
          {playing && (
            <div className="mb-4 flex items-center gap-2">
              <span className="size-3 animate-pulse rounded-full bg-primary" />
              <span className="text-sm font-black uppercase tracking-wide text-muted">
                Sedang Membaca
              </span>
            </div>
          )}
          <div className="flex flex-col gap-3">
            {doc.paragraphs.map((p, i) => (
              <p
                key={i}
                ref={(el) => {
                  paraRefs.current[i] = el;
                }}
                className={`rounded-lg px-2 py-1 text-lg font-semibold leading-relaxed transition-colors ${
                  i === current ? "bg-primary/30 text-ink" : "text-ink"
                }`}
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Play / pause */}
        <div className="flex justify-center py-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Jeda" : "Putar"}
            aria-pressed={playing}
            className="flex size-24 items-center justify-center rounded-full bg-primary text-[52px] text-black shadow-[0_5px_0_0_var(--color-primary-press)] active:translate-y-1"
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>

        {/* Secondary actions */}
        <div className="mt-auto grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={skipParagraph}
            className="flex items-center justify-center gap-2 rounded-full border-2 border-line bg-paper px-4 py-4 text-base font-black text-ink active:bg-surface"
          >
            <SkipIcon className="text-[22px]" />
            LEWATI PARAGRAF
          </button>
          <button
            type="button"
            onClick={() => speakFrom(0)}
            className="flex items-center justify-center gap-2 rounded-full bg-black px-4 py-4 text-base font-black text-white active:translate-y-0.5"
          >
            <RefreshIcon className="text-[22px]" />
            BACA ULANG
          </button>
        </div>
      </main>
    </div>
  );
}
