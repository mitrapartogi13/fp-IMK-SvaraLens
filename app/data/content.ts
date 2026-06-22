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
      "Penerima kuasa berhak menandatangani dokumen, mengajukan permohonan, menyerahkan berkas persyaratan, menerima dokumen hasil pengurusan, serta melakukan tindakan administratif lain yang diperlukan sepanjang masih dalam ruang lingkup kuasa yang diberikan.",
      "Demikian surat kuasa ini dibuat untuk dipergunakan sebagaimana mestinya dengan penuh tanggung jawab serta itikad baik dari kedua belah pihak."
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

export type NutritionRow = { label: string; value: string; percent?: string };

export type PackageItem = {
  id: string;
  name: string;
  loggedAt: string;
  summary: NutritionRow[];
  nutrition: NutritionRow[];
  vitamins?: NutritionRow[];
  alert?: { type: "warning" | "safe"; text: string };
};

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const PACKAGES: PackageItem[] = [
  {
    id: "ultra-milk",
    name: "ULTRA MILK",
    loggedAt: "2026-06-20",
    summary: [
      { label: "Energi Total", value: "140 kkal" },
      { label: "Lemak Total", value: "3.5 g" },
      { label: "Protein", value: "6 g" },
      { label: "Gula", value: "17 g" },
    ],
    nutrition: [
      { label: "Energi Total", value: "140 kkal" },
      { label: "Energi dari Lemak", value: "30 kkal" },
      { label: "Lemak Total", value: "3.5 g", percent: "5%" },
      { label: "Lemak Jenuh", value: "2.5 g", percent: "13%" },
      { label: "Kolesterol", value: "12 mg", percent: "4%" },
      { label: "Protein", value: "6 g", percent: "10%" },
      { label: "Karbohidrat Total", value: "22 g", percent: "7%" },
      { label: "Gula", value: "17 g" },
      { label: "Natrium", value: "50 mg", percent: "3%" },
      { label: "Kalium", value: "360 mg", percent: "8%" },
    ],
    vitamins: [
      { label: "Vitamin A", value: "20%" },
      { label: "Vitamin C", value: "8%" },
      { label: "Vitamin D3", value: "6%" },
      { label: "Vitamin K", value: "15%" },
      { label: "Vitamin B1", value: "15%" },
      { label: "Vitamin B2", value: "15%" },
      { label: "Vitamin B3", value: "15%" },
      { label: "Vitamin B5", value: "10%" },
      { label: "Vitamin B6", value: "15%" },
      { label: "Vitamin B12", value: "20%" },
      { label: "Biotin", value: "20%" },
      { label: "Kolin", value: "8%" },
      { label: "Kalsium", value: "20%" },
      { label: "Zat Besi", value: "2%" },
      { label: "Zink", value: "6%" },
      { label: "Magnesium", value: "6%" },
      { label: "Fosfor", value: "25%" },
      { label: "Selenium", value: "10%" },
    ],
    alert: { type: "warning", text: "Kadar gula melebihi 50% batas harian!" },
  },
    {
    id: "biskuit-gandum",
    name: "BISKUIT GANDUM",
    loggedAt: "2026-06-19",
    summary: [
      { label: "Energi Total", value: "150 kkal" },
      { label: "Lemak Total", value: "7 g" },
      { label: "Protein", value: "2 g" },
      { label: "Gula", value: "5 g" },
    ],
    nutrition: [
      { label: "Energi Total", value: "150 kkal" },
      { label: "Energi dari Lemak", value: "63 kkal" },
      { label: "Lemak Total", value: "7 g", percent: "11%" },
      { label: "Lemak Jenuh", value: "3 g", percent: "15%" },
      { label: "Kolesterol", value: "0 mg", percent: "0%" },
      { label: "Protein", value: "2 g", percent: "3%" },
      { label: "Karbohidrat Total", value: "19 g", percent: "6%" },
      { label: "Gula", value: "5 g" },
      { label: "Serat Pangan", value: "1.5 g", percent: "6%" },
      { label: "Natrium", value: "90 mg", percent: "4%" },
    ],
    vitamins: [
      { label: "Vitamin A", value: "0%" },
      { label: "Vitamin B1", value: "8%" },
      { label: "Vitamin B2", value: "6%" },
      { label: "Vitamin B6", value: "4%" },
      { label: "Kalsium", value: "2%" },
      { label: "Zat Besi", value: "4%" },
      { label: "Magnesium", value: "3%" },
      { label: "Fosfor", value: "5%" },
    ],
    alert: { type: "safe", text: "Kadar gula aman untuk dikonsumsi" },
  },
];

export function getPackage(id: string) {
  return PACKAGES.find((p) => p.id === id);
}

export function nutritionToSpeech(item: PackageItem) {
  return (
    `${item.name}. ` +
    item.summary.map((n) => `${n.label} ${n.value}`).join(", ") +
    "."
  );
}

export type MedicineItem = {
  id: string;
  name: string;
  date: string;
  loggedAt: string; // ISO date (YYYY-MM-DD)
  dosage: string;
  expiry: string;
  paragraphs: string[];
  alert?: { type: "warning" | "safe"; text: string };
};

export const MEDICINES: MedicineItem[] = [
  {
    id: "paracetamol",
    name: "PARACETAMOL",
    date: "Hari ini",
    loggedAt: "2026-06-21",
    dosage: "3 x 1 tablet sehari",
    expiry: "Kedaluwarsa: Des 2028",
    paragraphs: [
      "Parasetamol 500 miligram.",
      "Indikasi: Digunakan untuk meredakan demam, sakit kepala, dan nyeri ringan.",
      "Dosis: Dewasa 1 sampai 2 tablet, 3 hingga 4 kali sehari. Anak-anak setengah sampai 1 tablet, 3 hingga 4 kali sehari.",
      "Aturan pakai: Diminum setelah makan untuk menghindari iritasi lambung.",
      "Peringatan: Jangan melebihi dosis yang dianjurkan. Hentikan penggunaan jika terjadi reaksi alergi.",
    ],
    alert: { type: "safe", text: "Gunakan sesuai dosis yang dianjurkan." },
  },
  {
    id: "amoxicillin",
    name: "AMOXICILLIN",
    date: "Kemarin",
    loggedAt: "2026-06-20",
    dosage: "3 x 1 tablet sehari",
    expiry: "Kedaluwarsa: Okt 2027",
    paragraphs: [
      "Amoksisilin 500 miligram.",
      "Indikasi: Mengobati infeksi saluran pernapasan, kulit, dan saluran kemih akibat bakteri.",
      "Dosis: Harus diminum sesuai resep dokter. Biasanya 1 tablet setiap 8 jam.",
      "Aturan pakai: Dapat diminum dengan atau tanpa makanan. Harus dihabiskan untuk mencegah resistensi bakteri.",
      "Peringatan: Hindari bagi pasien dengan riwayat alergi penisilin.",
    ],
    alert: { type: "warning", text: "Harus dihabiskan!" },
  },
  {
    id: "antasida-doen",
    name: "ANTASIDA DOEN",
    date: "18 Juni 2026",
    loggedAt: "2026-06-18",
    dosage: "3 x 1 tablet sehari",
    expiry: "Kedaluwarsa: Mar 2029",
    paragraphs: [
      "Antasida DOEN tablet kunyah.",
      "Indikasi: Meredakan gejala maag, asam lambung tinggi, dan kembung.",
      "Dosis: Dewasa 1 sampai 2 tablet, 3 hingga 4 kali sehari. Anak-anak setengah sampai 1 tablet.",
      "Aturan pakai: Dikunyah terlebih dahulu sebelum ditelan, diminum 1 jam sebelum makan atau 2 jam setelah makan.",
      "Peringatan: Hindari penggunaan terus-menerus selama lebih dari 2 minggu tanpa resep dokter.",
    ],
  },
];

export function getMedicine(id: string) {
  return MEDICINES.find((m) => m.id === id);
}

export function medicineToSpeech(item: MedicineItem) {
  const base =
    `${item.name}. Dosis: ${item.dosage}. ${item.expiry}. ` +
    item.paragraphs.join(" ");
  return item.alert ? `${base} Peringatan: ${item.alert.text}` : base;
}

