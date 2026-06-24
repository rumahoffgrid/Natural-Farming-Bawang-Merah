import React, { useState, useRef, useEffect } from "react";
import { Camera, Upload, AlertTriangle, CheckCircle2, RefreshCw, Sparkles, HelpCircle, ArrowRight, Eye, Key, Lock, ExternalLink } from "lucide-react";
import { DiagnosisResult } from "../types";

export default function HealthMonitoring() {
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState("image/jpeg");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State untuk BYOK Gemini API Key
  const [apiKey, setApiKey] = useState("");
  const [keySaved, setKeySaved] = useState(false);
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [tempKey, setTempKey] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("agri_smart_gemini_api_key") || "";
    setApiKey(saved);
    setTempKey(saved);
    setKeySaved(saved !== "");
  }, []);

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = tempKey.trim();
    localStorage.setItem("agri_smart_gemini_api_key", trimmed);
    setApiKey(trimmed);
    setKeySaved(trimmed !== "");
    setShowKeyInput(false);
  };

  const handleClearKey = () => {
    localStorage.removeItem("agri_smart_gemini_api_key");
    setApiKey("");
    setTempKey("");
    setKeySaved(false);
  };

  // Sampel foto bawang merah untuk memudahkan petani melakukan uji coba langsung
  const sampleCrops = [
    {
      id: "normal",
      label: "Tanaman Sehat",
      description: "Daun hijau segar tegak lurus tanpa bercak.",
      previewUrl: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=200",
      queryText: "Daun bawang merah hijau tegak segar, tidak ada hama, pertumbuhan seragam."
    },
    {
      id: "ulat",
      label: "Ulat Grayak",
      description: "Daun berlubang sisa selaput bening tipis.",
      previewUrl: "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&q=80&w=200",
      queryText: "Ada ulat grayak hijau merusak bagian dalam daun bawang merah, daun menjadi transparan berlubang lurus."
    },
    {
      id: "moler",
      label: "Penyakit Moler",
      description: "Daun berpilin/melintir layu dari pangkal.",
      previewUrl: "https://images.unsplash.com/photo-1628352081506-83c43074edab?auto=format&fit=crop&q=80&w=200",
      queryText: "Pangkal umbi membusuk putih basah, daun melintir kusut, layu fusarium moler."
    },
    {
      id: "kuning",
      label: "Daun Menguning",
      description: "Ujung daun mengering menguning pucat kerdil.",
      previewUrl: "https://images.unsplash.com/photo-1505236858219-8359eb29e3a5?auto=format&fit=crop&q=80&w=200",
      queryText: "Ujung daun bawang merah mengering kuning kecokelatan, kurang nitrogen pupuk makro."
    }
  ];

  const handleSelectSample = (sample: typeof sampleCrops[0]) => {
    setDescription(sample.queryText);
    setSelectedImage(sample.previewUrl);
    // Kosongkan hasil analisis agar petani terdorong menekan tombol deteksi kembali
    setResult(null);
    setError(null);
  };

  // Upload/Drag-and-Drop foto buatan petani sendiri
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError("Ukuran foto terlalu besar. Maksimal adalah 10 MB.");
      return;
    }

    setImageMimeType(file.type);
    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json"
      };

      if (apiKey) {
        headers["x-gemini-api-key"] = apiKey;
      }

      const response = await fetch("/api/analyze-crop", {
        method: "POST",
        headers,
        body: JSON.stringify({
          description,
          image: selectedImage ? {
            mimeType: imageMimeType,
            data: selectedImage
          } : null
        })
      });

      if (!response.ok) {
        throw new Error("Gagal menerima diagnosis dari server agronomis.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Terjadi kesalahan koneksi sistem diagnosis AI.");
    } finally {
      setLoading(false);
    }
  };

  const clearUpload = () => {
    setSelectedImage(null);
    setDescription("");
    setResult(null);
    setError(null);
  };

  return (
    <div id="monitoring-section" className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-900 p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white/10 rounded-xl">
            <Camera className="h-6 w-6 text-emerald-200" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-sans tracking-tight">Klinik Kesehatan Bawang Merah (AI)</h2>
            <p className="text-xs text-emerald-100/90 mt-0.5">Analisis Penyakit, Hama, & Defisiensi Nutrisi Lapangan</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* BYOK (Bring Your Own Key) Settings Widget */}
        <div className="mb-6 border border-slate-200/85 rounded-2xl bg-slate-50/70 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-xl shrink-0 ${keySaved ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : "bg-amber-100 text-amber-800 border border-amber-200"}`}>
                <Key className="h-4.5 w-4.5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-xs font-bold text-slate-800">Sistem AI BYOK (Bring Your Own Key)</h4>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                    keySaved 
                      ? "bg-emerald-100 text-emerald-800 border-emerald-200" 
                      : "bg-amber-50 text-amber-700 border-amber-200"
                  }`}>
                    {keySaved ? "Mode Live AI Aktif (Kunci Terpasang)" : "Mode Simulasi Aktif (Tanpa Kunci API)"}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  {keySaved 
                    ? "Menggunakan Kunci API Gemini Anda sendiri untuk analisis visual real-time." 
                    : "Sistem mendeteksi Anda belum memasukkan Kunci API. Silakan hubungkan Kunci API Gemini Anda sendiri untuk analisis live asli."
                  }
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
              {keySaved ? (
                <>
                  <button
                    onClick={() => {
                      setShowKeyInput(true);
                      setTempKey(apiKey);
                    }}
                    className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Ubah Kunci
                  </button>
                  <button
                    onClick={handleClearKey}
                    className="bg-red-50 border border-red-100 hover:bg-red-100 text-red-600 text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Hapus
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowKeyInput(!showKeyInput);
                    setTempKey(apiKey);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  {showKeyInput ? "Batal" : "Hubungkan Kunci API"}
                </button>
              )}
            </div>
          </div>

          {/* Form Input Kunci API */}
          {showKeyInput && (
            <form onSubmit={handleSaveKey} className="mt-4 pt-4 border-t border-dashed border-gray-200 space-y-3">
              <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-3 text-[11px] text-amber-900 leading-relaxed">
                <p className="font-bold mb-1">Cara mendapatkan Kunci API Gemini Gratis:</p>
                <ol className="list-decimal list-inside space-y-1 text-amber-800">
                  <li>Buka <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="underline font-bold text-emerald-800 inline-flex items-center gap-0.5">Google AI Studio <ExternalLink className="h-3 w-3 inline" /></a></li>
                  <li>Login dengan akun Google Anda.</li>
                  <li>Klik tombol <strong className="text-emerald-950">"Get API key"</strong> lalu klik <strong className="text-emerald-950">"Create API key"</strong>.</li>
                  <li>Salin kunci yang dihasilkan (biasanya diawali dengan <code className="bg-white px-1 py-0.5 rounded font-mono text-[10px]">AIzaSy...</code>) dan tempel di bawah ini.</li>
                </ol>
                <p className="mt-2 text-gray-500 text-[10px]">
                  * Kunci API Anda disimpan secara aman dan lokal di browser Anda (tidak dikirimkan ke pihak lain).
                </p>
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="Masukkan Kunci API Gemini Anda (AIzaSy...)"
                    value={tempKey}
                    onChange={(e) => setTempKey(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-gray-800"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shrink-0 cursor-pointer"
                >
                  Simpan Kunci
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Info Penjelasan Logika Klasifikasi */}
        <div className="bg-emerald-50 text-emerald-900 border border-emerald-100 rounded-xl p-4 text-xs leading-relaxed mb-6 flex gap-3">
          <Sparkles className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-emerald-950 font-bold block mb-1">Cara Kerja Sistem Analisis AI:</strong>
            Sistem kami menggunakan model visi komputer Gemini AI untuk mengevaluasi kondisi visual tanaman. AI mengklasifikasikan gejala berdasarkan pola kerusakan daun, yaitu:
            <ul className="list-disc list-inside mt-1.5 space-y-1 text-emerald-800">
              <li><strong className="text-emerald-950">Kerusakan Epidermis:</strong> Deteksi alur transparan mengindikasikan gigitan ulat grayak.</li>
              <li><strong className="text-emerald-950">Morfologi Pilin Daun:</strong> Gejala melintir mengindikasikan infeksi jamur layu moler (Fusarium).</li>
              <li><strong className="text-emerald-950">Pola Klorosis Pigmen:</strong> Gradasi menguning dari ujung mengindikasikan defisiensi hara (N/K).</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Kolom Kiri: Input Gambar & Gejala */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-3">Langkah 1: Pilih Contoh Gejala atau Unggah Foto Sendiri</h3>
            
            {/* Contoh Gejala */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
              {sampleCrops.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSelectSample(s)}
                  className={`flex flex-col items-center p-2 rounded-xl border text-center transition-all ${
                    selectedImage === s.previewUrl
                      ? "bg-emerald-50 border-emerald-500 shadow-sm"
                      : "bg-gray-50 border-gray-100 hover:bg-gray-100"
                  }`}
                >
                  <img
                    src={s.previewUrl}
                    alt={s.label}
                    className="w-full h-14 object-cover rounded-lg mb-1.5"
                  />
                  <span className="text-[11px] font-bold text-gray-800">{s.label}</span>
                  <span className="text-[9px] text-gray-500 leading-none mt-0.5">{s.description}</span>
                </button>
              ))}
            </div>

            {/* Unggah Foto / Area Input */}
            <div className="mb-5">
              {selectedImage ? (
                <div className="relative border border-dashed border-gray-300 rounded-xl p-3 bg-gray-50 flex flex-col items-center">
                  <img
                    src={selectedImage}
                    alt="Tanaman Bawang Merah Petani"
                    className="max-h-56 rounded-lg object-contain mb-3"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white border border-gray-300 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-gray-50"
                    >
                      Ganti Foto
                    </button>
                    <button
                      onClick={clearUpload}
                      className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-red-100"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-emerald-200 hover:border-emerald-400 bg-emerald-50/10 hover:bg-emerald-50/25 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all"
                >
                  <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl mb-3">
                    <Upload className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-bold text-gray-800">Unggah Foto Daun Bawang Merah</span>
                  <span className="text-xs text-gray-500 mt-1">Mendukung drag-and-drop atau ambil foto kamera</span>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* Input Deskripsi Tambahan */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Deskripsi Tambahan Gejala Petani (Opsional):
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Misal: Ujung daun kuning layu meliuk-liuk, atau ada banyak ulat kecil-kecil berwarna kehijauan merayap di dalam daun..."
                rows={3}
                className="w-full bg-white border border-gray-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800"
              />
            </div>

            {/* Tombol Jalankan Deteksi */}
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white font-bold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  <span>Sedang Menganalisis Deteksi Agronomis...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  <span>Analisis Kondisi Tanaman Sekarang</span>
                </>
              )}
            </button>
          </div>

          {/* Kolom Kanan: Hasil Diagnosis & Solusi */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-3">Langkah 2: Hasil Pemeriksaan Lab Tanaman</h3>

            {!result && !loading && !error && (
              <div className="h-full min-h-[300px] border border-gray-100 rounded-2xl flex flex-col items-center justify-center p-6 text-center bg-gray-50/50">
                <div className="p-4 bg-gray-100 text-gray-400 rounded-full mb-3">
                  <Eye className="h-8 w-8" />
                </div>
                <h4 className="text-sm font-bold text-gray-500">Belum Ada Analisis yang Berjalan</h4>
                <p className="text-xs text-gray-400 max-w-xs mt-1">
                  Silakan pilih sampel atau unggah foto daun bawang merah Anda, lalu tekan tombol "Analisis" untuk memulai diagnosis.
                </p>
              </div>
            )}

            {loading && (
              <div className="h-full min-h-[300px] border border-emerald-100 rounded-2xl flex flex-col items-center justify-center p-6 text-center bg-emerald-50/20 animate-pulse">
                <div className="p-4 bg-emerald-100 text-emerald-600 rounded-full mb-3">
                  <RefreshCw className="h-8 w-8 animate-spin" />
                </div>
                <h4 className="text-sm font-bold text-emerald-800">Mengevaluasi Gejala Visual Tanaman</h4>
                <p className="text-xs text-emerald-600 max-w-xs mt-1">
                  Menjalankan klasifikasi citra daun bawang, mengidentifikasi kerusakan epidermis, klorosis, dan layu tular tanah...
                </p>
              </div>
            )}

            {error && (
              <div className="border border-red-100 bg-red-50 text-red-900 rounded-2xl p-5 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold">Terjadi Gangguan Koneksi AI</h4>
                  <p className="text-xs text-red-700 mt-1">{error}</p>
                  <button
                    onClick={handleAnalyze}
                    className="mt-3 text-xs font-bold text-red-900 bg-white border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-100"
                  >
                    Coba Lagi
                  </button>
                </div>
              </div>
            )}

            {result && (
              <div className="border border-emerald-100 bg-emerald-50/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Hasil Diagnosis AI Sukses</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-emerald-100/60 shadow-sm mb-4">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">Kesimpulan Hama/Penyakit:</span>
                  <h4 className="text-base font-bold text-emerald-950 mt-0.5">{result.diagnosis}</h4>
                  <div className="flex items-center gap-1 mt-1 text-xs">
                    <span className="text-gray-500 font-medium">Tingkat Keyakinan Klasifikasi:</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[11px]">{result.confidence}</span>
                  </div>
                </div>

                {/* Deskripsi/Penjelasan */}
                <div className="mb-4 text-xs">
                  <span className="font-bold text-gray-700 block mb-1">Penjelasan Gejala Agronomis:</span>
                  <p className="text-gray-600 leading-relaxed bg-white/50 p-3 rounded-lg border border-gray-100">
                    {result.explanation}
                  </p>
                </div>

                {/* Rekomendasi Alami */}
                <div className="mb-4">
                  <span className="text-xs font-bold text-gray-700 block mb-1.5">Rekomendasi Penanganan Berkelanjutan:</span>
                  <ul className="space-y-1.5">
                    {result.remedy.map((r, idx) => (
                      <li key={idx} className="flex gap-2 text-xs text-gray-600 leading-relaxed items-start">
                        <ArrowRight className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Rekomendasi Ramuan ZBNF */}
                <div className="border-t border-emerald-100 pt-4 mt-4 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase block">Rekomendasi Ramuan ZBNF:</span>
                    <span className="text-xs font-bold text-emerald-900 block mt-0.5">Semprotkan ramuan {result.organicPesticide}</span>
                  </div>
                  <a
                    href={result.organicPesticide.includes("Neem") || result.organicPesticide.includes("Brahm") || result.organicPesticide.includes("Agni") ? "#pesticides-section" : "#calculator-section"}
                    className="text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-2 rounded-lg transition-colors shrink-0"
                  >
                    Lihat Cara Buat
                  </a>
                </div>

                {/* Penjelasan Mode */}
                <div className="text-[10px] text-gray-400 mt-4 pt-2 border-t border-gray-100 text-center">
                  {result.mode === "live" 
                    ? "Didukung oleh Gemini 3.5 Flash secara langsung (Live API)."
                    : "Menjalankan sistem klasifikasi agronomis lokal bawang merah Indonesia."
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
