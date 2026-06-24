import React, { useState } from "react";
import { Hand, Eye, CheckCircle2, AlertTriangle, Droplet, Sparkles, BookOpen, Info, HelpCircle } from "lucide-react";

export default function SoilMoistureManual() {
  const [activeTest, setActiveTest] = useState<"finger" | "sample">("finger");

  return (
    <div id="soil-moisture-section" className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-800 to-emerald-800 p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white/10 rounded-xl">
            <Hand className="h-6 w-6 text-emerald-200" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-sans tracking-tight">Panduan Cek Kelembapan Tanah Manual</h2>
            <p className="text-xs text-emerald-100/90 mt-0.5">Metode Praktis Tradisional Pengganti Sensor Tanpa Biaya</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Deskripsi Pengantar */}
        <p className="text-xs text-gray-600 mb-6 leading-relaxed">
          Petani bawang merah tidak memerlukan alat sensor IoT yang rumit dan mahal untuk mengetahui kadar air tanah. Struktur perakaran bawang merah sangat sensitif terhadap sirkulasi udara (aerasi) dan kelembapan. Gunakan teknik uji fisik sederhana ini untuk menentukan kapan waktu kocor **Jeevamrutham** yang paling tepat.
        </p>

        {/* Tab Selector Metode */}
        <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-6">
          <button
            onClick={() => setActiveTabAndPlaySound("finger")}
            className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTest === "finger"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-200/50"
            }`}
          >
            <Hand className="h-4 w-4" />
            Metode Uji Telunjuk Jari
          </button>
          <button
            onClick={() => setActiveTabAndPlaySound("sample")}
            className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTest === "sample"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-200/50"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Metode Kepal Sampel Tanah
          </button>
        </div>

        {activeTest === "finger" ? (
          /* INFOGRAFIS JARI */
          <div className="space-y-6">
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-emerald-950 mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                Cara Melakukan Uji Jari (Finger Test)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Langkah 1 */}
                <div className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm mb-2">1</div>
                  <h4 className="text-xs font-bold text-gray-800">Benamkan Jari</h4>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                    Masukkan jari telunjuk Anda lurus ke dalam tanah bedengan bawang merah sedalam <strong className="text-gray-700">5 sampai 7 cm</strong> (sekitar dua ruas jari).
                  </p>
                </div>

                {/* Langkah 2 */}
                <div className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm mb-2">2</div>
                  <h4 className="text-xs font-bold text-gray-800">Rasakan Suhu</h4>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                    Rasakan suhu di dalam tanah. Tanah yang sehat dan berair cukup akan terasa <strong className="text-gray-700">sejuk-dingin</strong> dan tidak kering membakar.
                  </p>
                </div>

                {/* Langkah 3 */}
                <div className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm mb-2">3</div>
                  <h4 className="text-xs font-bold text-gray-800">Cek Partikel Daun</h4>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                    Tarik kembali jari telunjuk Anda. Amati partikel tanah yang menempel pada kulit jari Anda sebagai indikator kelembapan tanah.
                  </p>
                </div>
              </div>
            </div>

            {/* INFOGRAFIS MEMBACA HASIL UJI JARI */}
            <div>
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Infografis Indikator Jari Terhadap Tanah Bawang:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Hasil Kering */}
                <div className="border border-red-100 bg-red-50/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2 text-red-700">
                    <AlertTriangle className="h-4.5 w-4.5 shrink-0" />
                    <span className="text-xs font-bold">Tanah Terlalu Kering</span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed mb-3">
                    Jari telunjuk terasa keras saat menusuk, tanah terasa panas berdebu, dan tidak ada butiran tanah yang menempel pada jari Anda saat ditarik.
                  </p>
                  <span className="inline-block bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    TINDAKAN: SEGERA SIRAM / KOCOR
                  </span>
                </div>

                {/* Hasil Pas */}
                <div className="border border-emerald-100 bg-emerald-50/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2 text-emerald-700">
                    <CheckCircle2 className="h-4.5 w-4.5 shrink-0" />
                    <span className="text-xs font-bold">Kondisi Lembap Pas (Ideal)</span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed mb-3">
                    Jari terasa dingin/adem di dalam tanah, dan ada butir tanah berwarna hitam gembur menempel halus tipis-tipis di sela jari tanpa menggumpal basah becek.
                  </p>
                  <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    TINDAKAN: KOCOR JEEVAMRUTHAM 10%
                  </span>
                </div>

                {/* Hasil Becek */}
                <div className="border border-blue-100 bg-blue-50/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2 text-blue-700">
                    <Droplet className="h-4.5 w-4.5 shrink-0" />
                    <span className="text-xs font-bold">Tanah Terlalu Becek (Lumpur)</span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed mb-3">
                    Tanah terasa berair basah menggenang, jari terbenam sangat licin, dan lumpur pekat melekat tebal menutupi seluruh permukaan kuku jari Anda.
                  </p>
                  <span className="inline-block bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    TINDAKAN: BERHENTI MENYIRAM (DRENASE)
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* TUTORIAL SAMPEL TANAH KEPAL */
          <div className="space-y-6">
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-emerald-950 mb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-emerald-600" />
                SOP Pengambilan Sampel & Uji Kepal Tanah (Soil Ball Squeeze)
              </h3>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">1</div>
                    <div className="w-0.5 h-full bg-gray-200 my-1"></div>
                  </div>
                  <div className="pb-3">
                    <h4 className="text-xs font-bold text-emerald-950">Ambil Sampel di 3 Titik Bedengan</h4>
                    <p className="text-[11px] text-gray-600 mt-1">
                      Kikis permukaan mulsa kering/tanah atas setebal 2 cm. Ambil segenggam tanah pada kedalaman <strong className="text-emerald-900">10 cm</strong> menggunakan sekop kecil atau tangan kosong secara acak dari area tengah bedengan bawang merah.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">2</div>
                    <div className="w-0.5 h-full bg-gray-200 my-1"></div>
                  </div>
                  <div className="pb-3">
                    <h4 className="text-xs font-bold text-emerald-950">Genggam dan Remas Tanah Kuat-Kuat</h4>
                    <p className="text-[11px] text-gray-600 mt-1">
                      Kepal tanah sampel tersebut di telapak tangan Anda, lalu remas dengan jari-jari tangan Anda sekencang mungkin selama 3-5 detik membentuk bulatan bola tanah.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">3</div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-950">Amati Reaksi Bola Tanah Saat Dilepas</h4>
                    <p className="text-[11px] text-gray-600 mt-1">
                      Buka telapak tangan Anda secara perlahan dan sentuh bola tanah tersebut dengan ujung jari telunjuk Anda. Evaluasi kepadatannya berdasarkan kriteria infografis di bawah.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* INFOGRAFIS MEMBACA HASIL KEPAL */}
            <div>
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Infografis Hasil Uji Kepal Bola Tanah:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Hasil Kering */}
                <div className="border border-red-100 bg-red-50/30 rounded-xl p-4">
                  <span className="text-xs font-bold text-red-800 block mb-1">Pecah / Tidak Terbentuk</span>
                  <p className="text-[11px] text-gray-600 leading-relaxed mb-3">
                    Tanah langsung hancur berhamburan kembali menjadi butiran pasir/debu kering segera setelah Anda membuka kepalan tangan. Bola tanah gagal mempertahankan bentuk bulatnya.
                  </p>
                  <span className="bg-red-100 text-red-800 text-[9px] font-bold px-2 py-0.5 rounded">
                    KADAR AIR: DI BAWAH 25% (KERING)
                  </span>
                </div>

                {/* Hasil Pas */}
                <div className="border border-emerald-100 bg-emerald-50/30 rounded-xl p-4">
                  <span className="text-xs font-bold text-emerald-800 block mb-1">Bulat Padat Gembur</span>
                  <p className="text-[11px] text-gray-600 leading-relaxed mb-3">
                    Bola tanah tetap berbentuk bulat utuh di telapak tangan Anda. Bila disentuh dengan ujung jari telunjuk secara lembut, bola tanah pecah perlahan menjadi serpihan gembur.
                  </p>
                  <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded">
                    KADAR AIR: 50% - 60% (PAS-SUBUR)
                  </span>
                </div>

                {/* Hasil Becek */}
                <div className="border border-blue-100 bg-blue-50/30 rounded-xl p-4">
                  <span className="text-xs font-bold text-blue-800 block mb-1">Lembek Becek Berair</span>
                  <p className="text-[11px] text-gray-600 leading-relaxed mb-3">
                    Bola tanah terasa lembek seperti liat mainan (plastisin). Air keruh menetes keluar dari sela-sela jari Anda saat meremas bola tanah, dan meninggalkan lapisan lumpur lengket.
                  </p>
                  <span className="bg-blue-100 text-blue-800 text-[9px] font-bold px-2 py-0.5 rounded">
                    KADAR AIR: DI ATAS 80% (BECEK)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tips Agronomis Tambahan */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-start gap-3 text-xs bg-emerald-50/20 p-3 rounded-xl border border-emerald-100/40">
          <Info className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-emerald-950 block">Rekomendasi Ahli Agronomi Bawang:</span>
            Unsur belerang asli tanah vulkanis akan diikat dengan baik jika kelembapan tanah bedengan dipertahankan di kisaran <strong className="text-emerald-900">50% s/d 60% (Bulat Padat Gembur)</strong>. Tanah yang terlalu basah/becek memicu pembusukan sel akar tipis bawang merah dan mengundang infeksi spora penyakit jamur moler (Fusarium).
          </div>
        </div>
      </div>
    </div>
  );

  // Helper fungsi klik sound & tab
  function setActiveTabAndPlaySound(tab: "finger" | "sample") {
    setActiveTest(tab);
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(550, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {}
  }
}
