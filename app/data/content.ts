/** Mock data for the prototype — no backend. */

export type DocumentItem = {
  id: string;
  name: string;
  paragraphs: string[];
};

export const DOCUMENTS: DocumentItem[] = [
  {
    id: "tagihan-pln",
    name: "Surat Tagihan PLN",
    paragraphs: [
      "Tagihan listrik untuk periode Juni 2026. Nomor pelanggan 5321 0098 7711.",
      "Total pemakaian sebesar 240 kilowatt jam, dengan jumlah tagihan Rp 312.500.",
      "Batas akhir pembayaran adalah tanggal 20 Juni 2026. Mohon bayar tepat waktu untuk menghindari denda keterlambatan.",
    ],
  },
  {
    id: "ktp-john-doe",
    name: "KTP - John Doe",
    paragraphs: [
      "Kartu Tanda Penduduk atas nama John Doe.",
      "Nomor Induk Kependudukan 3174 0512 9001 0007. Tempat dan tanggal lahir Jakarta, 12 Mei 1990.",
      "Alamat Jalan Melati Nomor 10, Kelurahan Sukamaju, Kecamatan Cilandak, Jakarta Selatan.",
    ],
  },
  {
    id: "surat-kuasa",
    name: "Surat Kuasa",
    paragraphs: [
      "Surat kuasa ini dibuat pada tanggal 7 Juni 2026.",
      "Yang bertanda tangan di bawah ini memberikan kuasa penuh kepada penerima kuasa untuk mengurus dokumen kepemilikan kendaraan bermotor.",
      "Kuasa ini berlaku sampai seluruh proses pengurusan selesai dilaksanakan.",
    ],
  },
  {
    id: "polis-asuransi",
    name: "Polis Asuransi",
    paragraphs: [
      "Polis asuransi kesehatan nomor POL 2026 4471 9.",
      "Manfaat pertanggungan mencakup rawat inap, rawat jalan, dan tindakan operasi dengan total nilai pertanggungan Rp 250 juta per tahun.",
      "Premi dibayarkan setiap bulan sebesar Rp 450.000, jatuh tempo pada tanggal 1 setiap bulannya.",
    ],
  },
];

export function getDocument(id: string) {
  return DOCUMENTS.find((d) => d.id === id);
}

export type NutritionRow = { label: string; value: string };

export type PackageItem = {
  id: string;
  name: string;
  date: string;
  nutrition: NutritionRow[];
};

export type PackageItem = {
  id: string;
  name: string;
  date: string;
  /** ISO date (YYYY-MM-DD) — dipakai Kalender Riwayat untuk mencocokkan tanggal. */
  loggedAt: string;
  nutrition: NutritionRow[];
  /** Pesan peringatan opsional (mis. gula melebihi batas harian). */
  warning?: string;
};

export const PACKAGES: PackageItem[] = [
  {
    id: "ultra-milk",
    name: "ULTRA MILK",
    date: "Hari ini",
    loggedAt: "2026-06-20",
    nutrition: [
      { label: "Energi Total", value: "140 kkal" },
      { label: "Lemak Total", value: "3.5 g" },
      { label: "Protein", value: "6 g" },
      { label: "Gula", value: "17 g" },
    ],
    alert: { type: "warning", text: "Kadar gula tinggi!" },
  },
  {
    id: "biskuit-gandum",
    name: "BISKUIT GANDUM",
    date: "Kemarin",
    loggedAt: "2026-06-19",
    nutrition: [
      { label: "Energi Total", value: "150 kkal" },
      { label: "Lemak Total", value: "7 g" },
      { label: "Protein", value: "2 g" },
      { label: "Gula", value: "5 g" },
    ],
    alert: { type: "safe", text: "Kadar gula aman untuk dikonsumsi" },
  },
];

export function getPackage(id: string) {
  return PACKAGES.find((p) => p.id === id);
}

export function nutritionToSpeech(item: PackageItem) {
  const base =
    `${item.name}. ` +
    item.nutrition.map((n) => `${n.label} ${n.value}`).join(", ") +
    ".";
  return item.alert ? `${base} ${item.alert.text}` : base;
}

