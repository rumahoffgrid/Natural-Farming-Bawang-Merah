import React, { useState } from "react";
import { Scale, Beaker, Info, Droplets, Leaf, ChevronRight, HelpCircle } from "lucide-react";
import { motion } from "motion/react";

interface Props {
  landSize: number;
  onLandSizeChange: (size: number) => void;
}

export default function JeevamruthamCalculator({ landSize, onLandSizeChange }: Props) {
  const [activeTab, setActiveTab] = useState<"liquid" | "solid">("liquid");

  // Rujukan dasar untuk 1 acre (4.000 m²)
  // Jeevamrutham Cair (Liquid):
  // - Air: 200 Liter
  // - Kotoran Sapi Jawa (Peranakan Ongole): 10 kg
  // - Urin Sapi: 10 Liter
  // - Gula Merah: 2 kg
  // - Tepung Kacang Koro: 2 kg
  // - Tanah Hutan: 100 gram (segenggam)
  
  // Ghanajeevamrutham (Padat):
  // - Kotoran Sapi Jawa Kering: 100 kg
  // - Gula Merah: 1 kg
  // - Tepung Kacang Koro: 1 kg
  // - Tanah Hutan: 100 gram
  // - Urin Sapi: ~5 Liter (secukupnya untuk melembapkan)

  const factor = landSize / 4000;

  // Format angka agar ramah dibaca petani
  const formatAmount = (val: number, unit: string) => {
    if (val === 0) return "0";
    
    // Jika kg terlalu kecil, konversi ke gram
    if (unit === "kg" && val < 0.1) {
      return `${Math.round(val * 1000)} g`;
    }
    // Jika Liter terlalu kecil, konversi ke mL
    if (unit === "L" && val < 0.1) {
      return `${Math.round(val * 1000)} mL`;
    }
    
    // Bulatkan agar tidak ada desimal panjang yang membingungkan petani
    if (val % 1 === 0) {
      return `${val} ${unit}`;
    }
    return `${val.toFixed(2).replace(/\.00$/, "")} ${unit}`;
  };

  const seedMin = landSize * 0.1; // 100 gram per m²
  const seedMax = landSize * 0.12; // 120 gram per m²

  return (
    <div id="calculator-section" className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white/10 rounded-xl">
            <Scale className="h-6 w-6 text-emerald-100" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-sans tracking-tight">Kalkulator Jeevamrutham Presisi</h2>
            <p className="text-xs text-emerald-100/90 mt-0.5">Adaptasi ZBNF India untuk Tanah Bawang Merah Indonesia</p>
          </div>
        </div>
      </div>

      {/* Konten Utama */}
      <div className="p-6">
        {/* Input Luas Lahan */}
        <div className="bg-emerald-50/50 rounded-xl p-5 border border-emerald-100/60 mb-6">
          <label className="block text-sm font-semibold text-emerald-950 mb-2 flex items-center gap-2">
            <Leaf className="h-4 w-4 text-emerald-600" />
            Masukkan Luas Lahan Anda (m²)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min="1"
              value={landSize || ""}
              onChange={(e) => onLandSizeChange(Math.max(1, Number(e.target.value)))}
              className="w-full max-w-xs bg-white border border-emerald-200 rounded-xl px-4 py-3 text-lg font-bold text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Misal: 1000"
            />
            <span className="text-emerald-900 font-bold text-lg">Meter Persegi (m²)</span>
          </div>
          
          <div className="mt-3 flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100">
            <Info className="h-4 w-4 shrink-0 text-emerald-600" />
            <span>
              Estimasi Kebutuhan Bibit Bawang Merah:{" "}
              <strong className="text-emerald-900">
                {formatAmount(seedMin, "kg")} s/d {formatAmount(seedMax, "kg")}
              </strong>{" "}
              umbi bibit siap tanam.
            </span>
          </div>
        </div>

        {/* Tab Selector Formula */}
        <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-6">
          <button
            onClick={() => setActiveTab("liquid")}
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
              activeTab === "liquid"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-200/50"
            }`}
          >
            Liquid Jeevamrutham (Cair)
          </button>
          <button
            onClick={() => setActiveTab("solid")}
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
              activeTab === "solid"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-200/50"
            }`}
          >
            Ghanajeevamrutham (Padat)
          </button>
        </div>

        {/* List Bahan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {activeTab === "liquid" ? (
            <>
              {/* Air */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-emerald-50/30 transition-colors">
                <div className="p-3 bg-blue-100 text-blue-700 rounded-xl font-bold">H₂O</div>
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase">Air Bersih (Bebas Kaporit)</h4>
                  <p className="text-lg font-bold text-gray-800">{formatAmount(200 * factor, "L")}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Media berkembang biak mikroba penyubur</p>
                </div>
              </div>

              {/* Kotoran Sapi */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-emerald-50/30 transition-colors">
                <div className="p-3 bg-amber-100 text-amber-800 rounded-xl font-bold">🐄</div>
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase">Kotoran Sapi Jawa Basah (Ongole)</h4>
                  <p className="text-lg font-bold text-gray-800">{formatAmount(10 * factor, "kg")}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Kotoran terbaik dari Sapi Jawa (Peranakan Ongole) segar kaya mikroba lokal</p>
                </div>
              </div>

              {/* Urin Sapi */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-emerald-50/30 transition-colors">
                <div className="p-3 bg-yellow-100 text-yellow-800 rounded-xl font-bold">🧪</div>
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase">Urin Sapi murni</h4>
                  <p className="text-lg font-bold text-gray-800">{formatAmount(10 * factor, "L")}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Sumber nitrogen alami, garam mineral & antiseptik</p>
                </div>
              </div>

              {/* Gula Merah */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-emerald-50/30 transition-colors">
                <div className="p-3 bg-red-100 text-red-800 rounded-xl font-bold">🪵</div>
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase">Gula Merah / Air Tebu asli</h4>
                  <p className="text-lg font-bold text-gray-800">{formatAmount(2 * factor, "kg")}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Sumber energi instan (karbohidrat) bagi mikroba</p>
                </div>
              </div>

              {/* Tepung Kacang */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-emerald-50/30 transition-colors">
                <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl font-bold">🫘</div>
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase">Tepung Kacang Koro saja</h4>
                  <p className="text-lg font-bold text-gray-800">{formatAmount(2 * factor, "kg")}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Kaya protein dari kacang koro untuk fiksasi hara (hindari kacang tanah)</p>
                </div>
              </div>

              {/* Tanah Hutan */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-emerald-50/30 transition-colors">
                <div className="p-3 bg-stone-100 text-stone-800 rounded-xl font-bold">🪵</div>
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase">Tanah Hutan Perawan / Bawah Bambu</h4>
                  <p className="text-lg font-bold text-gray-800">{formatAmount(0.1 * factor, "kg")}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Kaya inokulan mikroba lokal indigenous berdaya tinggi</p>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Kotoran Sapi Kering */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-emerald-50/30 transition-colors">
                <div className="p-3 bg-amber-100 text-amber-800 rounded-xl font-bold">💩</div>
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase">Kotoran Sapi Jawa Kering (Ongole)</h4>
                  <p className="text-lg font-bold text-gray-800">{formatAmount(100 * factor, "kg")}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Kotoran Sapi Jawa PO kering sebagai penyedia karbon & humus terbaik</p>
                </div>
              </div>

              {/* Urin Sapi */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-emerald-50/30 transition-colors">
                <div className="p-3 bg-yellow-100 text-yellow-800 rounded-xl font-bold">🧪</div>
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase">Urin Sapi (Untuk Pelembap)</h4>
                  <p className="text-lg font-bold text-gray-800">{formatAmount(5 * factor, "L")}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Siramkan perlahan agar kadar kelembapan mencapai 40%</p>
                </div>
              </div>

              {/* Gula Merah */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-emerald-50/30 transition-colors">
                <div className="p-3 bg-red-100 text-red-800 rounded-xl font-bold">🪵</div>
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase">Gula Merah / Molase cair</h4>
                  <p className="text-lg font-bold text-gray-800">{formatAmount(1 * factor, "kg")}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Bahan perekat nutrisi untuk memicu fusi padatan</p>
                </div>
              </div>

              {/* Tepung Kacang */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-emerald-50/30 transition-colors">
                <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl font-bold">🫘</div>
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase">Tepung Kacang Koro saja</h4>
                  <p className="text-lg font-bold text-gray-800">{formatAmount(1 * factor, "kg")}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Protein kacang koro murni sebagai aktivator ragi alami (tanpa kacang tanah)</p>
                </div>
              </div>

              {/* Tanah Hutan */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-emerald-50/30 transition-colors">
                <div className="p-3 bg-stone-100 text-stone-800 rounded-xl font-bold">🪵</div>
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase">Tanah Hutan Perawan</h4>
                  <p className="text-lg font-bold text-gray-800">{formatAmount(0.1 * factor, "kg")}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Starter mikroba aktif untuk pembentukan pupuk padat</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Edukasi Proses Fermentasi (Langkah Langkah) */}
        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Beaker className="h-4 w-4 text-emerald-600" />
            Langkah-Langkah Pembuatan {activeTab === "liquid" ? "Jeevamrutham Cair" : "Ghanajeevamrutham"} (7-9 Hari)
          </h3>

          {activeTab === "liquid" ? (
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">1</div>
                  <div className="w-0.5 h-full bg-gray-200 my-1"></div>
                </div>
                <div className="pb-4">
                  <h4 className="text-sm font-bold text-emerald-950">Pencampuran Awal</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Larutkan kotoran sapi Jawa (Ongole) basah dan urin sapi ke dalam tong berisi air bersih sesuai takaran kalkulator di atas. Aduk searah jarum jam secara merata menggunakan tongkat kayu.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">2</div>
                  <div className="w-0.5 h-full bg-gray-200 my-1"></div>
                </div>
                <div className="pb-4">
                  <h4 className="text-sm font-bold text-emerald-950">Aktivasi Bahan Pengikat</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Gerus gula merah hingga larut, lalu masukkan ke tong. Tambahkan tepung kacang koro dan tanah hutan secara perlahan sambil terus diaduk. Aduk searah jarum jam selama 2-3 menit.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">3</div>
                  <div className="w-0.5 h-full bg-gray-200 my-1"></div>
                </div>
                <div className="pb-4">
                  <h4 className="text-sm font-bold text-emerald-950">Penyimpanan & Pengadukan Rutin</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Tutup tong dengan karung goni basah (agar sirkulasi udara aerobik tetap berjalan dan terhindar dari lalat). Letakkan di tempat teduh. <strong className="text-emerald-700">Wajib diaduk searah jarum jam selama 3 menit, 2 kali sehari</strong> (pagi dan sore).
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">4</div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-950">Hari ke-7 s/d 9: Siap Digunakan</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Fermentasi selesai ketika bau ammonia telah berkurang dan digantikan aroma tape segar. Saring larutan dan aplikasikan dengan mencampurkan air bersih (rasio 1:10) untuk kocor ke akar bawang merah atau semprot tipis ke daun.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">1</div>
                  <div className="w-0.5 h-full bg-gray-200 my-1"></div>
                </div>
                <div className="pb-4">
                  <h4 className="text-sm font-bold text-emerald-950">Penggabungan Bahan Padat</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Hamparkan kotoran sapi Jawa (Ongole) kering yang telah digemburkan di permukaan tanah yang teduh. Taburkan secara merata tepung kacang koro, gula merah bubuk, dan tanah hutan perawan di atasnya.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">2</div>
                  <div className="w-0.5 h-full bg-gray-200 my-1"></div>
                </div>
                <div className="pb-4">
                  <h4 className="text-sm font-bold text-emerald-950">Penyiraman Urin Sapi</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Percikkan urin sapi sedikit demi sedikit sambil diaduk menggunakan cangkul, hingga adonan lembap (bila digenggam menggumpal namun tidak mengeluarkan air becek, kelembapan sekitar 35-40%).
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">3</div>
                  <div className="w-0.5 h-full bg-gray-200 my-1"></div>
                </div>
                <div className="pb-4">
                  <h4 className="text-sm font-bold text-emerald-950">Inkubasi 48 Jam</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Gundukan campuran bahan padat tersebut, lalu tutup rapat menggunakan karung goni lembap selama 48 jam (2 hari) di bawah keteduhan untuk perkembangbiakan ragi jamur menguntungkan.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">4</div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-950">Pengeringan & Penyimpanan</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Hamparkan kembali gundukan di tempat teduh dan biarkan mengering angin (hindari sinar matahari langsung agar mikroba tidak mati). Setelah kering, tumbuk halus dan Ghanajeevamrutham siap ditabur di bedengan saat olah lahan bawang merah. Tahan disimpan hingga 6 bulan!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
