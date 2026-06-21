import AppHeader from "../components/AppHeader";
import { PillIcon } from "../components/Icons";

/** Obat — placeholder tab (feature not yet available). */
export default function ObatPage() {
  return (
    <div className="flex flex-1 flex-col">
      <AppHeader title="OBAT" backHref="/beranda" />

      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
        <div className="flex size-32 items-center justify-center rounded-full bg-surface text-[64px] text-muted">
          <PillIcon />
        </div>
        <h2 className="text-2xl font-black uppercase tracking-tight text-heading">
          Segera Hadir
        </h2>
        <p className="max-w-xs text-lg font-bold text-muted">
          Fitur pemindai obat sedang kami siapkan. Nantikan pembaruan berikutnya.
        </p>
      </main>
    </div>
  );
}
