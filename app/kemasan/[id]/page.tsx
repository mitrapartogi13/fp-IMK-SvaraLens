"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import AppHeader from "../../components/AppHeader";
import BacaSuaraButton from "../../components/BacaSuaraButton";
import { getPackage, nutritionToSpeech } from "../../data/content";
import AlertBox from "../../components/AlertBox";

/** Detail Kemasan — nutrition facts for a scanned package + read aloud. */
export default function DetailKemasanPage() {
  const params = useParams<{ id: string }>();
  const item = getPackage(params.id);

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
            {item.nutrition.map((n) => (
              <div key={n.label} className="flex justify-between gap-4 text-xl font-black text-ink">
                <dt>{n.label}</dt>
                <dd>{n.value}</dd>
              </div>
            ))}
          </dl>
          {item.alert && <AlertBox type={item.alert.type} text={item.alert.text} className="mt-4" />}
        </div>

        <BacaSuaraButton text={nutritionToSpeech(item)} className="mt-auto" />
      </main>
    </div>
  );
}
