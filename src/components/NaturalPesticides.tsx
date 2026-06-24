import React, { useState } from "react";
import { Shield, Sparkles, Leaf, Info, HelpCircle } from "lucide-react";

export default function NaturalPesticides() {
  const [selectedId, setSelectedId] = useState<string>("neemastra");

  const recipes = [
    {
      id: "neemastra",
      name: "Neemastra (Pestisida Daun Mimba)",
      targetPest: "Ulat Grayak (Spodoptera exigua), Kutu Daun, Penggorok Daun",
      description: "Sangat ampuh mengendalikan hama ulat pemakan daun bawang merah dan mencegah ngengat bertelur pada daun.",
      materials: [
        { name: "Daun Mimba Segar (atau Daun Suren)", amount: "5", unit: "kg" },
        { name: "Urin Sapi (Asli)", amount: "5", unit: "Liter" },
        { name: "Kotoran Sapi Basah", amount: "1", unit: "kg" },
        { name: "Air Bersih", amount: "100", unit: "Liter" }
      ],
      steps: [
        "Tumbuk halus daun mimba hingga menjadi bubur pekat.",
        "Campurkan kotoran sapi segar, urin sapi, dan bubur daun mimba ke dalam tong berisi air.",
        "Aduk rata searah jarum jam menggunakan tongkat kayu selama 3 menit.",
        "Tutup rapat tong menggunakan karung goni atau kain selama 24-48 jam di tempat teduh.",
        "Saring larutan menggunakan kain halus sebelum diaplikasikan."
      ],
      application: "Semprotkan langsung ke seluruh daun bawang merah pada sore hari (mulai jam 16.00 sore saat ulat mulai keluar). Gunakan tanpa pengenceran air tambahan untuk serangan parah, atau encerkan 1:5 untuk pencegahan rutin (setiap 7-10 hari sekali)."
    },
    {
      id: "brahmastra",
      name: "Brahmastra (Pestisida Daun Beracun)",
      targetPest: "Ulat Grayak Stadium Lanjut, Hama Penghisap, Jamur Moler",
      description: "Formula ekstra kuat dengan memadukan 5 jenis daun yang tidak disukai ternak (memiliki kandungan alkaloid tinggi/pahit).",
      materials: [
        { name: "Urin Sapi", amount: "10", unit: "Liter" },
        { name: "Daun Mimba (Neem)", amount: "2", unit: "kg" },
        { name: "Daun Pepaya", amount: "2", unit: "kg" },
        { name: "Daun Sirsak / Daun Jarak", amount: "2", unit: "kg" },
        { name: "Daun Giloy / Daun Paitan", amount: "2", unit: "kg" },
        { name: "Daun Cabai / Tembakau", amount: "2", unit: "kg" }
      ],
      steps: [
        "Tumbuk halus semua jenis dedaunan beracun tersebut.",
        "Campurkan urin sapi dan semua dedaunan tumbuk ke dalam panci tanah liat atau wadah tembaga.",
        "Didihkan campuran tersebut dengan api kecil hingga airnya menyusut setengahnya.",
        "Dinginkan larutan selama 24 jam di tempat teduh.",
        "Saring larutan hasil rebusan menggunakan kain bersih, kemudian simpan di botol tertutup (tahan hingga 6 bulan)."
      ],
      application: "Encerkan 2-3 Liter larutan Brahmastra ke dalam 100 Liter air bersih. Semprotkan secara merata ke seluruh daun bawang merah pada pagi atau sore hari."
    },
    {
      id: "agniastra",
      name: "Agniastra (Pestisida Pedas Pengusir Hama)",
      targetPest: "Ulat Tanah, Ulat Grayak, Thrips, Kutu Kebul",
      description: "Pestisida dengan sensasi panas-pedas instan untuk merusak sistem pencernaan dan kulit luar ulat lunak.",
      materials: [
        { name: "Urin Sapi murni", amount: "10", unit: "Liter" },
        { name: "Tembakau Kering / Puntung Rokok", amount: "1", unit: "kg" },
        { name: "Cabai Rawit Pedas (Dihaluskan)", amount: "500", unit: "gram" },
        { name: "Bawang Putih (Dihaluskan)", amount: "500", unit: "gram" },
        { name: "Kotoran Sapi Segar", amount: "1", unit: "kg" }
      ],
      steps: [
        "Campurkan kotoran sapi, urin sapi, cabai lumat, bawang putih lumat, dan tembakau ke dalam satu wadah logam atau tanah liat.",
        "Rebus hingga mendidih sebanyak 4 kali berturut-turut (setelah mendidih, diamkan sebentar, lalu didihkan kembali).",
        "Diamkan rebusan selama 48 jam (2 hari) agar senyawa insektisida terekstraksi maksimal.",
        "Saring menggunakan kain kasa halus.",
        "Simpan dalam botol kaca gelap di tempat teduh."
      ],
      application: "Campurkan 2 Liter Agniastra dengan 100 Liter air bersih. Semprotkan secara merata ke bagian pucuk daun bawang dan sela-sela pangkal tanaman yang rawan dihinggapi ulat grayak."
    }
  ];

  const selectedRecipe = recipes.find((r) => r.id === selectedId) || recipes[0];

  return (
    <div id="pesticides-section" className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-amber-700 p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white/10 rounded-xl">
            <Shield className="h-6 w-6 text-amber-200" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-sans tracking-tight">Manajemen Hama Alami (Astra)</h2>
            <p className="text-xs text-amber-100/90 mt-0.5">Panduan Pembuatan Pestisida Nabati Penyelamat Bawang Merah</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Deskripsi Singkat */}
        <p className="text-xs text-gray-600 mb-6 leading-relaxed">
          Dalam pertanian alami ZBNF, hama dikendalikan menggunakan penolak alami berbasis urin sapi dan tanaman beracun lokal (disebut **Astra**). Ini tidak membunuh musuh alami (predator menguntungkan), melainkan merusak nafsu makan hama utama seperti ulat grayak dan kutu sehingga ekosistem tetap seimbang.
        </p>

        {/* Tab Pilihan Pestisida */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {recipes.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedId(r.id)}
              className={`p-3 text-xs font-bold rounded-xl border text-center transition-all ${
                selectedId === r.id
                  ? "bg-amber-50 border-amber-500 text-amber-900 shadow-sm"
                  : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {r.name.split(" (")[0]}
            </button>
          ))}
        </div>

        {/* Detil Resep Terpilih */}
        <div className="bg-amber-50/25 border border-amber-100 rounded-2xl p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h3 className="text-base font-bold text-amber-950 flex items-center gap-2">
              <Leaf className="h-5 w-5 text-emerald-600" />
              {selectedRecipe.name}
            </h3>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-200">
              Sasaran: {selectedRecipe.targetPest}
            </span>
          </div>

          <p className="text-xs text-gray-700 leading-relaxed mb-4">{selectedRecipe.description}</p>

          {/* Bahan-bahan */}
          <div className="mb-4">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">Bahan yang Dibutuhkan:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedRecipe.materials.map((m, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-100 text-xs">
                  <span className="text-gray-700 font-medium">{m.name}</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {m.amount} {m.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Langkah Pembuatan */}
          <div className="mb-4">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">Langkah Pembuatan:</h4>
            <ol className="space-y-2">
              {selectedRecipe.steps.map((s, idx) => (
                <li key={idx} className="flex gap-2 text-xs text-gray-700 leading-relaxed">
                  <span className="font-bold text-amber-700 shrink-0">{idx + 1}.</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Cara Aplikasi */}
          <div className="mt-4 pt-4 border-t border-amber-100">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              Aturan Pakai & Dosis Lapangan:
            </h4>
            <p className="text-xs text-gray-800 leading-relaxed font-medium bg-white p-3 rounded-xl border border-amber-100/60">
              {selectedRecipe.application}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
