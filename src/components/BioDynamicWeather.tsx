import React, { useState } from "react";
import { Moon, CloudRain, Sun, Wind, Eye, Sparkles, TrendingDown, TrendingUp, Bird, Bug, Droplets, Info, Compass, HelpCircle } from "lucide-react";

export default function BioDynamicWeather() {
  const [selectedPhase, setSelectedPhase] = useState<"waning" | "new" | "waxing" | "full">("waning");
  const [selectedObservation, setSelectedObservation] = useState<"animal" | "sky" | "temp">("animal");

  // Audio click helper
  const playTabSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {}
  };

  const handlePhaseChange = (phase: "waning" | "new" | "waxing" | "full") => {
    playTabSound();
    setSelectedPhase(phase);
  };

  const handleObservationChange = (type: "animal" | "sky" | "temp") => {
    playTabSound();
    setSelectedObservation(type);
  };

  return (
    <div id="biodynamic-weather-section" className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-850 to-emerald-950 p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white/10 rounded-xl">
            <Moon className="h-6 w-6 text-indigo-300 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-sans tracking-tight">Kearifan Lokal: Pranata Mangsa & BioDynamic</h2>
            <p className="text-xs text-indigo-200 mt-0.5">Penentuan Awal Tanam Fase Bulan & Deteksi Cuaca Alami Lapangan</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        
        {/* BAGIAN 1: BIODYNAMIC LUNAR (AWAL TANAM) */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-indigo-200">
              Metode Kosmis BioDynamic
            </span>
            <h3 className="text-sm font-bold text-slate-900">1. Penentuan Awal Tanam Berdasarkan Fase Bulan</h3>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed mb-6">
            Gaya gravitasi bulan tidak hanya memengaruhi pasang surut air laut, tetapi juga **aliran getah/kadar air di dalam tanaman**. Untuk tanaman umbi seperti bawang merah, penanaman yang diselaraskan dengan fase bulan menghasilkan umbi yang lebih padat, berbobot, dan tidak gampang busuk.
          </p>

          {/* Infografis Fase Bulan */}
          <div className="bg-indigo-50/40 border border-indigo-100/70 rounded-2xl p-5 space-y-6">
            <h4 className="text-xs font-bold text-indigo-950 flex items-center gap-1.5 justify-center sm:justify-start">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              Pilih Fase Bulan Saat Ini Untuk Rekomendasi Tanam Bawang:
            </h4>

            {/* Selector Visual Bulan */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Bulan Susut / Waning Moon */}
              <button
                type="button"
                onClick={() => handlePhaseChange("waning")}
                className={`p-4 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                  selectedPhase === "waning"
                    ? "bg-indigo-900 border-indigo-700 text-white shadow-md shadow-indigo-900/10"
                    : "bg-white border-gray-100 hover:border-indigo-200 text-slate-700"
                }`}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-indigo-950 border border-indigo-800 text-amber-300 text-xl font-bold">
                  🌘
                </div>
                <div>
                  <span className="text-xs font-bold block">Bulan Susut</span>
                  <span className="text-[9px] opacity-75">(Waning Moon)</span>
                </div>
              </button>

              {/* Bulan Mati / New Moon */}
              <button
                type="button"
                onClick={() => handlePhaseChange("new")}
                className={`p-4 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                  selectedPhase === "new"
                    ? "bg-indigo-900 border-indigo-700 text-white shadow-md shadow-indigo-900/10"
                    : "bg-white border-gray-100 hover:border-indigo-200 text-slate-700"
                }`}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-indigo-950 border border-indigo-800 text-slate-400 text-xl font-bold">
                  🌑
                </div>
                <div>
                  <span className="text-xs font-bold block">Bulan Mati / Baru</span>
                  <span className="text-[9px] opacity-75">(New Moon)</span>
                </div>
              </button>

              {/* Bulan Sabit / Waxing Moon */}
              <button
                type="button"
                onClick={() => handlePhaseChange("waxing")}
                className={`p-4 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                  selectedPhase === "waxing"
                    ? "bg-indigo-900 border-indigo-700 text-white shadow-md shadow-indigo-900/10"
                    : "bg-white border-gray-100 hover:border-indigo-200 text-slate-700"
                }`}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-indigo-950 border border-indigo-800 text-amber-300 text-xl font-bold">
                  🌒
                </div>
                <div>
                  <span className="text-xs font-bold block">Bulan Sabit / Naik</span>
                  <span className="text-[9px] opacity-75">(Waxing Moon)</span>
                </div>
              </button>

              {/* Bulan Purnama / Full Moon */}
              <button
                type="button"
                onClick={() => handlePhaseChange("full")}
                className={`p-4 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                  selectedPhase === "full"
                    ? "bg-indigo-900 border-indigo-700 text-white shadow-md shadow-indigo-900/10"
                    : "bg-white border-gray-100 hover:border-indigo-200 text-slate-700"
                }`}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-indigo-950 border border-indigo-800 text-yellow-300 text-xl font-bold animate-pulse">
                  🌕
                </div>
                <div>
                  <span className="text-xs font-bold block">Bulan Purnama</span>
                  <span className="text-[9px] opacity-75">(Full Moon)</span>
                </div>
              </button>
            </div>

            {/* Rekomendasi Dinamis Berdasarkan Fase */}
            <div className="bg-white rounded-xl p-5 border border-indigo-100 shadow-xs">
              {selectedPhase === "waning" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                    <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-md border border-emerald-200">SANGAT DIANJURKAN</span>
                    <span>Waktu Terbaik Tanam Bawang Merah!</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    <strong>Mengapa Sangat Bagus?</strong> Pada fase Bulan Susut (dari cembung akhir hingga mendekati bulan mati), gaya tarik gravitasi bumi lebih dominan dan energi kosmis mengalir turun ke bawah tanah (ke dalam perakaran). Air tanah ditarik ke dalam pori-pori akar.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-gray-500 pt-2 border-t border-gray-100">
                    <div>
                      <strong className="text-slate-800 block mb-1">Efek Pada Bibit Bawang:</strong>
                      Merangsang pertumbuhan akar umbi yang kuat, cepat menancap ke tanah bedengan, dan memicu ukuran umbi bawang merah menjadi lebih padat, berat (tidak kopong), serta tahan disimpan berbulan-bulan.
                    </div>
                    <div>
                      <strong className="text-slate-800 block mb-1">Panduan Tindakan Petani:</strong>
                      Ini adalah momen ideal untuk melakukan <strong>pemotongan ujung umbi bibit bawang 1/3 bagian</strong> dan langsung menanamnya di sawah. Lakukan pengocoran Ghanajeevamrutham padat saat pengolahan bedengan.
                    </div>
                  </div>
                </div>
              )}

              {selectedPhase === "new" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                    <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-md border border-amber-200">FASE NETRAL</span>
                    <span>Fase Istirahat & Pembenahan Lahan</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    <strong>Mengapa Fase Istirahat?</strong> Pada fase Bulan Mati (New Moon), gaya gravitasi paling seimbang dan energi tanaman berada dalam titik paling tenang (dorman). Kelembapan tanah stabil namun tarikan air ke atas atau ke bawah berada dalam posisi seimbang.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-gray-500 pt-2 border-t border-gray-100">
                    <div>
                      <strong className="text-slate-800 block mb-1">Efek Pada Lahan:</strong>
                      Pertumbuhan tanaman lambat namun ini adalah waktu terbaik untuk membasmi gulma pengganggu karena daya regenerasi rumput liar juga sedang di titik terendah.
                    </div>
                    <div>
                      <strong className="text-slate-800 block mb-1">Panduan Tindakan Petani:</strong>
                      Gunakan waktu ini untuk <strong>penyiangan gulma di bedengan</strong>, pembuatan parit drainase bawang agar rapi, dan pencampuran kompos starter di tanah sawah sebelum penanaman periode berikutnya.
                    </div>
                  </div>
                </div>
              )}

              {selectedPhase === "waxing" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-blue-800 font-bold text-xs">
                    <span className="bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-md border border-blue-200">KHUSUS DAUN / VEGETATIF</span>
                    <span>Fase Pacu Tunas & Pertumbuhan Daun Tegak</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    <strong>Mengapa Bagus Untuk Daun?</strong> Pada fase Bulan Sabit/Naik (Waxing Moon), gravitasi bulan menarik cairan getah tanaman naik ke bagian atas (ke daun dan batang). Sel-sel tanaman bawang merah di atas permukaan tanah tumbuh memanjang dengan cepat.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-gray-500 pt-2 border-t border-gray-100">
                    <div>
                      <strong className="text-slate-800 block mb-1">Efek Pada Bawang:</strong>
                      Mempercepat pecahnya tunas daun baru, daun tumbuh tinggi lurus ke atas. Namun, jika ditanam di fase ini, bawang merah cenderung memiliki daun yang terlalu subur berair tapi umbi bawahnya agak kecil dan basah.
                    </div>
                    <div>
                      <strong className="text-slate-800 block mb-1">Panduan Tindakan Petani:</strong>
                      Waktu yang sangat baik untuk <strong>menyemprotkan daun bawang merah dengan Jeevamrutham cair konsentrasi 10%</strong> yang sudah disaring halus guna memicu klorofil daun tumbuh kaku tegak.
                    </div>
                  </div>
                </div>
              )}

              {selectedPhase === "full" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-red-800 font-bold text-xs">
                    <span className="bg-red-100 text-red-800 px-2.5 py-0.5 rounded-md border border-red-200">PANTANG TANAM / RAWAN HAMA</span>
                    <span>Waspada Hama Serangga & Kupu-Kupu Grayak</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    <strong>Mengapa Harus Waspada?</strong> Saat Bulan Purnama (Full Moon), kelembapan tanaman di atas tanah berada pada titik tertinggi. Aliran getah daun sangat manis dan segar. Terang bulan juga mengundang kupu-kupu ngengat aktif terbang mencari tempat bertelur di daun bawang merah.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-gray-500 pt-2 border-t border-gray-100">
                    <div>
                      <strong className="text-slate-800 block mb-1">Efek Hama Serangga:</strong>
                      Hama ulat grayak (Spodoptera exigua) sangat aktif kawin dan bertelur di fase ini. Spora jamur moler juga lebih mudah berkecambah karena daun bawang merah sangat lembap dan basah.
                    </div>
                    <div>
                      <strong className="text-slate-800 block mb-1">Panduan Tindakan Petani:</strong>
                      Hindari menanam bibit baru. Lakukan langkah preventif dengan <strong>menyemprotkan ramuan penolak hama Neemastra atau Agniastra</strong> pada sore hari saat purnama berlangsung untuk mengusir serangga bertelur.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BAGIAN 2: WEATHER OBSERVATION (DETEKSI CUACA ALAMI) */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-200">
              Pranata Mangsa & Bio-Indikator
            </span>
            <h3 className="text-sm font-bold text-slate-900">2. Deteksi Cuaca Melalui Pengamatan Lapang</h3>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed mb-6">
            Alam sekitar selalu memberikan tanda visual sebelum terjadinya perubahan cuaca. Tanpa membutuhkan koneksi internet atau satelit ramalan cuaca, petani dapat mengamati bio-indikator di sawah untuk menyesuaikan langkah mitigasi tanaman bawang merah.
          </p>

          {/* Tab Selector Bio-Indikator */}
          <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl mb-6">
            <button
              onClick={() => handleObservationChange("animal")}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                selectedObservation === "animal"
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-200/50"
              }`}
            >
              <Bug className="h-4 w-4" />
              Tingkah Laku Hewan
            </button>
            <button
              onClick={() => handleObservationChange("sky")}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                selectedObservation === "sky"
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-200/50"
              }`}
            >
              <Sun className="h-4 w-4" />
              Tanda Awan & Langit
            </button>
            <button
              onClick={() => handleObservationChange("temp")}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                selectedObservation === "temp"
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-200/50"
              }`}
            >
              <Wind className="h-4 w-4" />
              Suhu & Angin Sawah
            </button>
          </div>

          {/* Konten Indikator Cuaca */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Sisi Kiri: Tanda Pengamatan & Artinya */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-4">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="h-4.5 w-4.5 text-emerald-600" />
                Tanda Lapangan Yang Terlihat:
              </h4>

              {selectedObservation === "animal" && (
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-sm shrink-0">🐜</div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Semut Merah Pindah Telur</h5>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                        Jika terlihat barisan semut merah sibuk membawa telur mereka ke tempat yang lebih tinggi di tanggul bedengan.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-sm shrink-0">🐉</div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Capung Terbang Sangat Rendah</h5>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                        Gerombolan capung (kinjeng) terbang berputar rendah mendekati pucuk daun bawang merah (ketinggian di bawah 50 cm).
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-sm shrink-0">🐸</div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Katak Sawah Bersuara Nyaring</h5>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                        Katak sawah berbunyi serempak dengan suara melengking bersahut-sahutan di sore/malam hari padahal langit masih tampak cerah.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedObservation === "sky" && (
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-sm shrink-0">🌅</div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Semburat Merah Saat Sunrise</h5>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                        Langit pagi hari arah timur saat matahari terbit tampak merah membara tertutup lapisan awan tipis (tidak biru cerah).
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-sm shrink-0">🌫️</div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Embun Pagi Sangat Tebal</h5>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                        Daun bawang merah tertutup embun (embun upas/embun rorob) yang sangat tebal hingga airnya menetes deras membasahi mulsa di jam 5 pagi.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-sm shrink-0">☁️</div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Awan Cumulus Bertumpuk Hitam</h5>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                        Awan putih bersih berubah cepat membentuk tumpukan menyerupai menara bunga kol kelabu gelap di siang hari bolong.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedObservation === "temp" && (
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center text-sm shrink-0">🥵</div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Suhu Malam Terasa Gerah (Sumuk)</h5>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                        Suhu udara di dalam rumah atau sekitar sawah terasa sangat panas menyengat dan bikin berkeringat (sumuk) dari malam hingga subuh.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center text-sm shrink-0">🍃</div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Angin Lembap Berputar Arah</h5>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                        Hembusan angin sawah yang biasanya kering berganti menjadi tiupan lembap berhembus tidak menentu arah secara tiba-tiba di siang hari.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center text-sm shrink-0">👃</div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Aroma Lumpur Sawah Menyengat</h5>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                        Tercium aroma khas tanah basah/lumpur busuk menyengat dari arah parit bedengan padahal tidak sedang terjadi aktivitas pembajakan.
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Sisi Kanan: Makna & Langkah Mitigasi Petani */}
            <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                  <CloudRain className="h-4.5 w-4.5 text-emerald-700" />
                  Makna Cuaca & Solusi Nyata Tani:
                </h4>

                {selectedObservation === "animal" && (
                  <div className="mt-3 space-y-3">
                    <div className="bg-white p-3.5 rounded-xl border border-emerald-100">
                      <span className="text-red-700 text-xs font-bold block mb-1">🔴 HUJAN DERAS AKAN TURUN (80% Akurat)</span>
                      <p className="text-[11px] text-gray-600 leading-relaxed">
                        Hewan sangat peka terhadap perubahan **tekanan udara** dan kelembapan ekstrem. Semut menyelamatkan koloni telur mereka dari banjir parit, sedangkan capung terbang rendah karena sayap mereka mulai keberatan mengikat molekul uap air yang padat sebelum hujan pecah.
                      </p>
                    </div>
                    <div className="bg-emerald-900 text-emerald-50 p-3.5 rounded-xl text-[11px] leading-relaxed">
                      <strong className="block text-white mb-0.5">Tindakan Cepat Bawang Merah:</strong>
                      Bersihkan parit bedengan agar aliran air lancar (tidak banjir). Jika bawang berumur di bawah 25 hari, segera semprotkan **Neemastra** sebelum hujan turun agar ngengat ulat grayak tidak sempat menitipkan telurnya di daun basah.
                    </div>
                  </div>
                )}

                {selectedObservation === "sky" && (
                  <div className="mt-3 space-y-3">
                    <div className="bg-white p-3.5 rounded-xl border border-emerald-100">
                      <span className="text-red-700 text-xs font-bold block mb-1">🔴 WASPADA SERANGAN JAMUR / EMBUN UPAS</span>
                      <p className="text-[11px] text-gray-600 leading-relaxed">
                        Embun tebal di pagi hari (terutama musim kemarau transisi) mengandung kadar asam yang sangat korosif bagi pori daun bawang merah. Spora jamur moler (Fusarium) tumbuh subur dalam kondisi dingin-lembab tebal ini. Semburat merah pagi menandakan kandungan uap air tinggi di atmosfer atas.
                      </p>
                    </div>
                    <div className="bg-emerald-900 text-emerald-50 p-3.5 rounded-xl text-[11px] leading-relaxed">
                      <strong className="block text-white mb-0.5">Tindakan Cepat Bawang Merah:</strong>
                      Lakukan **penyiraman basuh** menggunakan air sumur bersih sebelum jam 6 pagi untuk melarutkan embun asam yang melekat pada pucuk daun bawang merah agar tidak layu terbakar daunnya.
                    </div>
                  </div>
                )}

                {selectedObservation === "temp" && (
                  <div className="mt-3 space-y-3">
                    <div className="bg-white p-3.5 rounded-xl border border-emerald-100">
                      <span className="text-red-700 text-xs font-bold block mb-1">🔴 AWAN MENDUNG GELAP & BADAI KILAT</span>
                      <p className="text-[11px] text-gray-600 leading-relaxed">
                        Suhu gerah malam hari (sumuk) disebabkan bumi memancarkan panas radiasi kembali namun tertahan oleh selimut awan mendung tebal di atas sawah. Bau lumpur menyengat terjadi karena pelepasan gas nitrogen/metana tanah terdorong oleh penurunan tekanan udara luar.
                      </p>
                    </div>
                    <div className="bg-emerald-900 text-emerald-50 p-3.5 rounded-xl text-[11px] leading-relaxed">
                      <strong className="block text-white mb-0.5">Tindakan Cepat Bawang Merah:</strong>
                      Tunda penyemprotan pupuk cair organik Jeevamrutham ke daun hari ini, karena air hujan akan membasuh habis bahan sebelum terserap daun. Sebaiknya lakukan pemupukan lewat kocor tanah bedengan saja.
                    </div>
                  </div>
                )}
              </div>

              {/* Catatan Kaki Pendidikan */}
              <div className="bg-emerald-100/40 p-3 rounded-lg border border-emerald-200/50 text-[10px] text-emerald-800 leading-relaxed">
                * Tradisi **Pranata Mangsa** ini telah diteliti secara akademis dan terbukti selaras dengan ilmu klimatologi modern dalam membaca tanda-tanda perubahan tekanan barometer mikro di lingkungan persawahan.
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
