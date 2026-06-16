"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CameraIcon, HistoryIcon, SettingsIcon } from "../components/Icons";

/**
 * Scan Kemasan — live camera view with a pulsing scan reticle. Falls back to a
 * dark placeholder surface when the camera is unavailable (desktop / denied).
 */
export default function ScanKemasanPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCamera, setHasCamera] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let cancelled = false;

    async function start() {
      if (!navigator.mediaDevices?.getUserMedia) return;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasCamera(true);
        }
      } catch {
        /* no camera / permission denied → keep placeholder */
      }
    }
    start();

    return () => {
      cancelled = true;
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-gradient-to-b from-zinc-700 to-zinc-900">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`absolute inset-0 h-full w-full object-cover ${hasCamera ? "" : "hidden"}`}
      />

      {/* Floating settings */}
      <Link
        href="/pengaturan"
        aria-label="Pengaturan"
        className="absolute right-4 top-4 z-10 flex size-14 items-center justify-center rounded-full bg-black/70 text-[28px] text-white backdrop-blur"
      >
        <SettingsIcon />
      </Link>

      {/* Instruction pill */}
      <div className="z-10 flex justify-center pt-20">
        <div className="rounded-full border-2 border-black bg-white px-6 py-3 text-base font-black tracking-wide text-black shadow-lg">
          ARAHKAN KE KEMASAN
        </div>
      </div>

      {/* Scan reticle */}
      <div className="z-10 mx-10 my-auto aspect-square rounded-2xl border-4 border-primary animate-scan-pulse" />

      {/* Bottom action overlay */}
      <div className="z-10 mt-auto flex gap-3 rounded-t-3xl bg-black p-4">
        <Link
          href="/kemasan/scan-success"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-4 py-4 text-base font-black text-black active:translate-y-0.5"
        >
          <CameraIcon className="text-[24px]" />
          AMBIL GAMBAR
        </Link>
        <Link
          href="/kemasan/riwayat"
          className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-white px-4 py-4 text-base font-black text-white active:translate-y-0.5"
        >
          <HistoryIcon className="text-[24px]" />
          RIWAYAT
        </Link>
      </div>
    </div>
  );
}
