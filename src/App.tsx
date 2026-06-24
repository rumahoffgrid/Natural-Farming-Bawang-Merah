import React, { useState } from "react";
import { Leaf, Scale, Calendar, Camera, BookOpen, Shield, HelpCircle, CheckCircle, Info, ChevronRight, Download, Laptop, Smartphone, FileCode, Cpu, Radio, Network, MessageSquare, Sparkles, Hand, Moon } from "lucide-react";
import JeevamruthamCalculator from "./components/JeevamruthamCalculator";
import CropCalendar from "./components/CropCalendar";
import NaturalPesticides from "./components/NaturalPesticides";
import HealthMonitoring from "./components/HealthMonitoring";
import ScientificReferences from "./components/ScientificReferences";
import SocialAgri from "./components/SocialAgri";
import SoilMoistureManual from "./components/SoilMoistureManual";
import BioDynamicWeather from "./components/BioDynamicWeather";

export default function App() {
  // Pengaturan default pertanian
  const [landSize, setLandSize] = useState<number>(1000); // 1000 m² (0.1 Hektar / Seperempat Rantai)
  const [startDate, setStartDate] = useState<string>("2026-06-24"); // Tanggal Tanam Default

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-emerald-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-2xl shadow-md shadow-emerald-500/10">
              <Leaf className="h-6 w-6 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold text-emerald-950 font-sans tracking-tight">Agri-Smart Bawang Merah</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">Organik ZBNF</span>
              </div>
              <p className="text-[11px] text-gray-500">Aplikasi Produktivitas & Solusi Pengganti Pupuk Kimia Bawang Merah Indonesia</p>
            </div>
          </div>

          {/* Menu Shortcuts dengan Icon SVG Informatif */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <a
              href="#calculator-section"
              className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 text-[11px] font-bold px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl transition-all border border-emerald-100 shadow-xs"
              title="Kalkulator Bahan Jeevamrutham"
            >
              <Scale className="h-4 w-4 text-emerald-700" />
              <span className="hidden md:inline">Hitung Bahan</span>
            </a>
            <a
              href="#calendar-section"
              className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 text-[11px] font-bold px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl transition-all border border-emerald-100 shadow-xs"
              title="Kalender Budidaya Bawang"
            >
              <Calendar className="h-4 w-4 text-emerald-700" />
              <span className="hidden md:inline">Jadwal Tanam</span>
            </a>
            <a
              href="#soil-moisture-section"
              className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 text-[11px] font-bold px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl transition-all border border-emerald-100 shadow-xs"
              title="Uji Kelembapan Tanah Tradisional"
            >
              <Hand className="h-4 w-4 text-emerald-700" />
              <span className="hidden md:inline">Uji Jari</span>
            </a>
            <a
              href="#biodynamic-weather-section"
              className="flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-950 text-[11px] font-bold px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl transition-all border border-indigo-100 shadow-xs"
              title="Kearifan Pranata Mangsa & Bulan"
            >
              <Moon className="h-4 w-4 text-indigo-700" />
              <span className="hidden md:inline">Pranata Mangsa</span>
            </a>
            <a
              href="#monitoring-section"
              className="flex items-center gap-1.5 bg-emerald-900 hover:bg-emerald-850 text-white text-[11px] font-bold px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl transition-all border border-emerald-800 shadow-sm"
              title="Klinik AI Visual Deteksi Hama & Penyakit"
            >
              <Camera className="h-4 w-4 text-emerald-300" />
              <span className="hidden md:inline">Klinik AI</span>
            </a>
            <a
              href="#docs-section"
              className="flex items-center gap-1.5 bg-teal-50 hover:bg-teal-100 text-teal-950 text-[11px] font-bold px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl transition-all border border-teal-100 shadow-xs"
              title="Panduan Teknis & Manual Aplikasi"
            >
              <BookOpen className="h-4 w-4 text-teal-700" />
              <span className="hidden md:inline">Panduan Aplikasi</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="space-y-8">
          {/* Banner Informasi Penting Petani */}
          <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-emerald-600/20">
            <div className="absolute right-0 bottom-0 top-0 opacity-10 flex items-center justify-center p-8 pointer-events-none">
              <Leaf className="w-64 h-64" />
            </div>
            <div className="max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-2 bg-emerald-500/30 border border-emerald-400/40 px-3 py-1 rounded-full text-xs font-bold text-emerald-100 mb-4">
                <Sparkles className="h-4 w-4" /> Solusi Petani Mandiri Indonesia
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                Tingkatkan Hasil Bawang Merah 30% Lebih Gembur Tanpa Pupuk Kimia Mahal!
              </h1>
              <p className="text-sm text-emerald-50/90 mt-3 leading-relaxed">
                Adaptasi mutakhir teknik **Jeevamrutham** dari metode *Zero Budget Natural Farming (ZBNF)* India untuk struktur tanah vulkanis dan iklim tropis Indonesia. Hemat biaya pupuk hingga 80%, tingkatkan ketahanan dari ulat grayak & penyakit moler secara alami.
              </p>
            </div>
          </div>

          {/* Layout Utama: Grid 3 Kolom */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Kolom Kiri: Input Setup & Kalkulator Formulasi */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* 1. Modul Kalkulator */}
                <JeevamruthamCalculator
                  landSize={landSize}
                  onLandSizeChange={setLandSize}
                />

                {/* 2. Resep Pestisida Alami Astra */}
                <NaturalPesticides />

                {/* 3. Panduan Cek Kelembapan Tanah Manual */}
                <SoilMoistureManual />

                {/* 3.5. Kearifan Lokal BioDynamic & Cuaca */}
                <BioDynamicWeather />

              </div>

              {/* Kolom Kanan: Penjadwalan & Klinik Deteksi Penyakit AI */}
              <div className="space-y-8">
                
                {/* 3. Sistem Kalender & Monitoring */}
                <CropCalendar
                  landSize={landSize}
                  startDate={startDate}
                  onStartDateChange={setStartDate}
                />

                {/* 4. AI Image Analysis */}
                <HealthMonitoring />

              </div>

            </div>

            {/* 5. Jaringan Sosial Petani (Social-Agri) */}
            <SocialAgri />

            {/* Kajian Ilmiah Pendukung */}
            <ScientificReferences />

            {/* Halaman Dokumentasi Lengkap */}
            <div id="docs-section" className="bg-white rounded-2xl border border-emerald-100 p-6 sm:p-8 shadow-sm space-y-8 mt-8 scroll-mt-20">
              <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-emerald-600" />
                Dokumentasi Teknis & Panduan Aplikasi
              </h2>
              <p className="text-sm text-gray-500 mt-1">Panduan lengkap instalasi, arsitektur data, rujukan agronomi, dan blueprint IoT Agri-Smart</p>
            </div>

            {/* Seksi 1: Panduan Instalasi Lokal & Deployment */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Laptop className="h-5 w-5 text-emerald-600" />
                1. Cara Instalasi & Deployment Lokal
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Aplikasi Agri-Smart dirancang menggunakan arsitektur full-stack modern yang sangat efisien (React SPA di sisi frontend dan Express Node.js di sisi backend). Aplikasi ini juga mendukung konversi menjadi PWA (Progressive Web App) agar dapat diinstal di smartphone petani tanpa membebani memori penyimpanan.
              </p>

              <div className="bg-slate-900 text-slate-100 p-5 rounded-xl font-mono text-xs overflow-x-auto space-y-3">
                <div>
                  <span className="text-emerald-400"># Langkah 1: Kloning repositori dan masuk ke folder proyek</span>
                  <br />
                  <span className="text-slate-400">git clone https://github.com/username/agri-smart-bawang-merah.git</span>
                  <br />
                  <span className="text-slate-400">cd agri-smart-bawang-merah</span>
                </div>
                <div>
                  <span className="text-emerald-400"># Langkah 2: Instal semua dependensi frontend dan backend</span>
                  <br />
                  <span className="text-slate-400">npm install</span>
                </div>
                <div>
                  <span className="text-emerald-400"># Langkah 3: Konfigurasikan Kunci API Gemini Anda di file .env</span>
                  <br />
                  <span className="text-slate-400">cp .env.example .env</span>
                  <br />
                  <span className="text-slate-400">nano .env </span>
                  <span className="text-amber-400"># Masukkan GEMINI_API_KEY Anda</span>
                </div>
                <div>
                  <span className="text-emerald-400"># Langkah 4: Jalankan server pengembangan (Port 3000)</span>
                  <br />
                  <span className="text-slate-400">npm run dev</span>
                </div>
                <div>
                  <span className="text-emerald-400"># Langkah 5: Bangun aplikasi untuk produksi (Vite + esbuild)</span>
                  <br />
                  <span className="text-slate-400">npm run build</span>
                  <br />
                  <span className="text-slate-400">npm start</span>
                </div>
              </div>
            </div>

            {/* Seksi 2: Struktur Folder Proyek */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <FileCode className="h-5 w-5 text-emerald-600" />
                2. Struktur Folder Proyek Lengkap (MVP)
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                Berikut adalah struktur repositori utama yang mengatur logika agronomis dan visual aplikasi:
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 font-mono text-xs text-slate-700">
                <ul className="space-y-1.5">
                  <li>📁 <strong className="text-emerald-900">/</strong> - Root Project</li>
                  <li>&nbsp;&nbsp;├── 📄 <code className="text-emerald-700">server.ts</code> (Express API proxy untuk Gemini AI & serving static build)</li>
                  <li>&nbsp;&nbsp;├── 📄 <code className="text-emerald-700">package.json</code> (Konfigurasi skrip build, start, & dependencies)</li>
                  <li>&nbsp;&nbsp;├── 📄 <code className="text-emerald-700">metadata.json</code> (Metadata kapabilitas aplikasi di AI Studio)</li>
                  <li>&nbsp;&nbsp;├── 📄 <code className="text-emerald-700">index.html</code> (HTML Entry point)</li>
                  <li>&nbsp;&nbsp;├── 📁 <strong className="text-emerald-900">src/</strong> - Sumber Kode Utama React</li>
                  <li>&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── 📄 <code className="text-emerald-700">main.tsx</code> (React mounter)</li>
                  <li>&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── 📄 <code className="text-emerald-700">App.tsx</code> (Dashboard pusat & routing internal)</li>
                  <li>&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── 📄 <code className="text-emerald-700">index.css</code> (Tailwind CSS global imports)</li>
                  <li>&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;├── 📄 <code className="text-emerald-700">types.ts</code> (TypeScript interfaces untuk data tani, kalkulator, & AI)</li>
                  <li>&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;└── 📁 <strong className="text-emerald-900">components/</strong> - Komponen Modular Reusable</li>
                  <li>&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── 📄 <code className="text-emerald-700">JeevamruthamCalculator.tsx</code> (Kalkulator formula & panduan fermentasi)</li>
                  <li>&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── 📄 <code className="text-emerald-700">CropCalendar.tsx</code> (Kalender 65 hari, pengingat, & checklist)</li>
                  <li>&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── 📄 <code className="text-emerald-700">NaturalPesticides.tsx</code> (Resep penolak hama alami Astra)</li>
                  <li>&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── 📄 <code className="text-emerald-700">SoilMoistureManual.tsx</code> (Panduan infografis cek kelembapan telunjuk & kepal tanah)</li>
                  <li>&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── 📄 <code className="text-emerald-700">BioDynamicWeather.tsx</code> (Panduan penentuan awal tanam fase bulan & tanda cuaca lapang)</li>
                  <li>&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── 📄 <code className="text-emerald-700">HealthMonitoring.tsx</code> (Klinik AI visual deteksi kesehatan tanaman)</li>
                </ul>
              </div>
            </div>

            {/* Seksi 3: Rekomendasi Teknologi Lanjutan (Saran Masa Depan) */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Cpu className="h-5 w-5 text-emerald-600" />
                3. Saran Pengembangan & Integrasi Teknologi Masa Depan
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Untuk meningkatkan akurasi agronomis dari skala MVP ke industri presisi komersial, kami menyarankan peta jalan pengembangan berikut:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/10 hover:bg-emerald-50/20 transition-all">
                  <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg w-fit mb-2">
                    <Hand className="h-5 w-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">1. Standardisasi Uji Fisik Tanah Mandiri</h4>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                    Alih-alih menggunakan sensor IoT elektronik yang mahal dan rentan rusak karena lumpur dan air sawah, lakukan standardisasi kalibrasi metode uji telunjuk jari dan remas kepal tanah di tingkat gabungan kelompok tani (Gapoktan) daerah.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/10 hover:bg-blue-50/20 transition-all">
                  <div className="p-2 bg-blue-100 text-blue-800 rounded-lg w-fit mb-2">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">2. Model AI Klasifikasi On-Device</h4>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                    Mengonversi model visi klasifikasi penyakit bawang merah menjadi TensorFlow Lite (.tflite) agar proses deteksi gambar ulat grayak & moler dapat berjalan offline di tengah sawah tanpa memerlukan kuota internet atau sinyal seluler.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-purple-100 bg-purple-50/10 hover:bg-purple-50/20 transition-all">
                  <div className="p-2 bg-purple-100 text-purple-800 rounded-lg w-fit mb-2">
                    <Network className="h-5 w-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">3. Jaringan Komunitas Petani (Social-Agri)</h4>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                    Membangun forum berbagi data hasil panen bawang merah organik antarkecamatan di Indonesia. Petani dapat membagikan kesuksesan racikan Jeevamrutham mereka dan berkolaborasi menjaga stabilitas harga bawang di pasar lokal.
                  </p>
                </div>
              </div>
            </div>

            {/* Seksi 4: Mengapa Memilih Jeevamrutham? */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <Info className="h-4.5 w-4.5 text-emerald-600" />
                Mengenal Metode Zero Budget Natural Farming (ZBNF)
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-gray-100">
                **ZBNF** dikembangkan oleh pakar agronomi India, **Subhash Palekar**, sebagai respons terhadap tingginya kasus utang petani akibat ketergantungan pada pupuk dan pestisida kimia sintetis yang mahal. 
                <br />
                <br />
                Kunci utama dari metode ini adalah mengembalikan keseimbangan biologi tanah. Tanah hutan perawan kaya akan mikroba lokal indigenous (indigen) yang menguntungkan. Ketika dicampurkan ke dalam kotoran sapi Jawa (Peranakan Ongole) dan urin sapi (sebagai nutrisi pembawa) dan difermentasi dengan energi gula serta protein tepung kacang koro, mikroba ini berlipat ganda miliaran kali dalam 7 hari. Ketika dikocorkan ke tanah bawang merah, mikroba tersebut langsung bekerja melarutkan fosfat tanah yang mengkristal karena residu kimia bertahun-tahun, serta menambat nitrogen udara secara mandiri tanpa memerlukan pupuk urea sintetis lagi.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Berkelanjutan */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Leaf className="h-4 w-4 text-emerald-400" />
              <span>Agri-Smart Bawang Merah</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Sains Budidaya Alamiah Terintegrasi Kecerdasan Buatan</p>
          </div>

          <div className="text-[11px] text-slate-500 text-center md:text-right">
            <span>Dibuat untuk memajukan ketahanan pangan dan kedaulatan pupuk petani Indonesia.</span>
            <span className="block mt-0.5">Metode ZBNF didukung oleh penelitian ilmiah terkemuka. © 2026.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
