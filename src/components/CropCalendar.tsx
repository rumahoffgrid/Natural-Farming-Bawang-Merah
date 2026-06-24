import React, { useState, useEffect } from "react";
import { Calendar, CheckCircle2, Circle, Clock, Bell, Info, Sparkles, RefreshCw, Volume2, Droplet } from "lucide-react";
import { CropTask } from "../types";

interface Props {
  landSize: number;
  startDate: string;
  onStartDateChange: (date: string) => void;
}

export default function CropCalendar({ landSize, startDate, onStartDateChange }: Props) {
  const [tasks, setTasks] = useState<CropTask[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "completed">("all");
  const [reminderActive, setReminderActive] = useState(true);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [timerCount, setTimerCount] = useState<string>("02:14:45"); // Simulated countdown timer for next watering

  // Efek suara ketika checklist ditekan (Web Audio API sederhana tanpa eksternal asset)
  const playClickSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
      // Abaikan jika browser memblokir audio otomatis
    }
  };

  // Inisialisasi daftar tugas bawaan yang diadaptasi secara agronomi Indonesia
  const baseTasks = [
    {
      dayNumber: -7,
      title: "Pengolahan Lahan & Tabur Ghanajeevamrutham",
      description: "Gemburkan bedengan dan taburkan pupuk padat Ghanajeevamrutham sebanyak 250 g/m² (total sekitar " + Math.round(landSize * 0.25) + " kg). Siram bedengan agar lembap.",
      phase: "Persiapan" as const,
      actionType: "land" as const,
    },
    {
      dayNumber: 0,
      title: "Penanaman Bibit Bawang Merah",
      description: "Pilih umbi bibit yang sehat berumur simpan 2-3 bulan. Potong ujung umbi bibit 1/3 bagian untuk merangsang tumbuhnya tunas serempak. Tanam pada jarak 15x15 cm.",
      phase: "Persiapan" as const,
      actionType: "land" as const,
    },
    {
      dayNumber: 7,
      title: "Kocoran Jeevamrutham Cair Ke-1 (Fase Tunas)",
      description: "Bawang merah mulai bertunas 2-5 cm. Siramkan larutan Jeevamrutham cair konsentrasi 10% (1 bagian Jeevamrutham + 10 bagian air bersih) pada area perakaran.",
      phase: "Vegetatif" as const,
      actionType: "jeevamrutham" as const,
    },
    {
      dayNumber: 14,
      title: "Penyiangan Gulma Ke-1 & Kocor Jeevamrutham Ke-2",
      description: "Cabut rumput pengganggu di sekitar tanaman bawang merah agar tidak berebut makanan. Kocorkan kembali larutan Jeevamrutham cair 10% untuk pasokan Nitrogen hayati.",
      phase: "Vegetatif" as const,
      actionType: "weeding" as const,
    },
    {
      dayNumber: 21,
      title: "Kocoran Jeevamrutham Cair Ke-3 (Fase Anakan Aktif)",
      description: "Anakan bawang mulai bertambah banyak (fase vegetatif puncak). Siramkan larutan Jeevamrutham cair 10% untuk menjaga pertumbuhan batang daun yang rimbun dan sehat.",
      phase: "Vegetatif" as const,
      actionType: "jeevamrutham" as const,
    },
    {
      dayNumber: 28,
      title: "Pencegahan Ulat Grayak dengan Semprotan Neemastra",
      description: "Ulat grayak rawan menyerang daun bawang. Semprotkan pestisida nabati Neemastra 5% pada seluruh daun bawang merah di sore hari sebagai pengusir ngengat penelur.",
      phase: "Vegetatif" as const,
      actionType: "pesticide" as const,
    },
    {
      dayNumber: 35,
      title: "Kocoran Jeevamrutham Ke-4 (Awal Inisiasi Umbi)",
      description: "Pangkal batang tanaman mulai membulat merah (fase generatif awal). Kocor Jeevamrutham 12% untuk menyuplai unsur Kalium hayati yang mempercepat pembentukan umbi.",
      phase: "Pembentukan Umbi" as const,
      actionType: "jeevamrutham" as const,
    },
    {
      dayNumber: 42,
      title: "Penyiangan Gulma Ke-2 & Semprotan Daun Jeevamrutham",
      description: "Lakukan pembersihan gulma akhir agar umbi mendapat sinar matahari cukup. Saring halus Jeevamrutham cair, encerkan menjadi 10%, semprotkan ke daun bawang di pagi hari.",
      phase: "Pembentukan Umbi" as const,
      actionType: "weeding" as const,
    },
    {
      dayNumber: 49,
      title: "Kocoran Jeevamrutham Ke-5 (Pembesaran Umbi)",
      description: "Periode krusial pengisian umbi bawang merah. Kocor Jeevamrutham 15% di sekitar perakaran. Jaga drainase bedengan agar tidak tergenang air yang bisa memicu busuk umbi.",
      phase: "Pembentukan Umbi" as const,
      actionType: "jeevamrutham" as const,
    },
    {
      dayNumber: 56,
      title: "Penghentian Nutrisi Cair & Pengeringan Bedengan",
      description: "Hentikan penyiraman air dan pupuk hayati Jeevamrutham cair. Biarkan tanah mengering agar kulit umbi bawang merah mengeras, merah cerah mengkilap, dan awet disimpan lama.",
      phase: "Pematangan" as const,
      actionType: "land" as const,
    },
    {
      dayNumber: 65,
      title: "Masa Panen Raya Bawang Merah",
      description: "Bawang merah siap panen ketika 60-70% daun layu rebah, umbi menyembul kemerahan tua. Cabut rumpun bawang merah pagi hari cerah, ikat rindang, lalu lakukan pengeringan (curing) daun melipat.",
      phase: "Panen" as const,
      actionType: "harvest" as const,
    },
  ];

  // Kalkulasi tanggal asli berdasarkan startDate petani
  useEffect(() => {
    const baseDate = new Date(startDate);
    
    // Cari Day 0 (bibit ditanam)
    // Jika startDate adalah pengolahan lahan (Day -7), maka Day 0 adalah baseDate + 7 hari.
    // Mari asumsikan startDate yang diinput pengguna adalah Tanggal Tanam (Day 0) agar paling mudah dipahami petani!
    // Ya, mari buat startDate = Tanggal Tanam (Day 0)
    
    const calculated = baseTasks.map((bt, index) => {
      const taskDate = new Date(baseDate);
      taskDate.setDate(baseDate.getDate() + bt.dayNumber);
      
      return {
        id: `task-${index}-${bt.dayNumber}`,
        dayNumber: bt.dayNumber,
        title: bt.title,
        description: bt.description,
        phase: bt.phase,
        isCompleted: false,
        dueDate: taskDate.toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        }),
        actionType: bt.actionType
      };
    });

    // Load status checklist dari localStorage jika ada agar awet pengisiannya
    const savedStates = localStorage.getItem(`agri_smart_tasks_${startDate}_${landSize}`);
    if (savedStates) {
      try {
        const parsed = JSON.parse(savedStates);
        const merged = calculated.map(task => {
          if (parsed[task.id] !== undefined) {
            return { ...task, isCompleted: parsed[task.id] };
          }
          return task;
        });
        setTasks(merged);
      } catch (e) {
        setTasks(calculated);
      }
    } else {
      setTasks(calculated);
    }
  }, [startDate, landSize]);

  // Handle Checklist tugas
  const toggleTask = (id: string) => {
    playClickSound();
    const updated = tasks.map(t => {
      if (t.id === id) {
        return { ...t, isCompleted: !t.isCompleted };
      }
      return t;
    });
    setTasks(updated);

    // Simpan ke localStorage
    const stateMap = updated.reduce((acc, t) => {
      acc[t.id] = t.isCompleted;
      return acc;
    }, {} as Record<string, boolean>);
    localStorage.setItem(`agri_smart_tasks_${startDate}_${landSize}`, JSON.stringify(stateMap));
  };

  // Simulasi memicu notifikasi penyiraman langsung di browser untuk kenyamanan demo petani
  const triggerSimulatedNotification = () => {
    setShowNotificationPopup(true);
    playClickSound();
    setTimeout(() => {
      // Mainkan suara bell notifikasi ganda
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        const playTone = (time: number, freq: number) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.setValueAtTime(freq, time);
          gain.gain.setValueAtTime(0.15, time);
          gain.gain.exponentialRampToValueAtTime(0.01, time + 0.3);
          osc.start(time);
          osc.stop(time + 0.3);
        };

        playTone(ctx.currentTime, 523.25); // C5
        playTone(ctx.currentTime + 0.15, 659.25); // E5
        playTone(ctx.currentTime + 0.3, 783.99); // G5
      } catch (e) {}
    }, 100);
  };

  // Filter tugas berdasarkan tab aktif
  const filteredTasks = tasks.filter(t => {
    if (activeTab === "pending") return !t.isCompleted;
    if (activeTab === "completed") return t.isCompleted;
    return true;
  });

  const progressPercentage = tasks.length > 0
    ? Math.round((tasks.filter(t => t.isCompleted).length / tasks.length) * 100)
    : 0;

  return (
    <div id="calendar-section" className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-800 to-emerald-700 p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-xl">
              <Calendar className="h-6 w-6 text-purple-200" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-sans tracking-tight">Sistem Budidaya & Pengingat Penyiraman</h2>
              <p className="text-xs text-purple-100/90 mt-0.5">Jadwal Tanam Presisi Bawang Merah Indonesia 65 Hari</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={triggerSimulatedNotification}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-md transition-all animate-bounce"
            >
              <Bell className="h-4 w-4 shrink-0" />
              <span>Tes Pengingat</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Setting Tanggal Tanam */}
        <div className="bg-purple-50/50 border border-purple-100/60 rounded-xl p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <label className="block text-sm font-semibold text-purple-950 mb-1 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-purple-600" />
              Atur Tanggal Mulai Tanam Anda:
            </label>
            <p className="text-xs text-purple-700">Kalender penanaman bawang merah akan dihitung ulang secara otomatis.</p>
          </div>
          <div>
            <input
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="bg-white border border-purple-200 text-purple-950 font-bold px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Info Notifikasi Widget */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Progress Bar */}
          <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-800">Kemajuan Budidaya</span>
              <span className="text-xs font-bold text-emerald-950 bg-emerald-100 px-2 py-0.5 rounded-full">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
              <div className="bg-emerald-600 h-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <p className="text-[11px] text-emerald-700 italic">
              {progressPercentage === 100 ? "Luar biasa! Panen raya sukses!" : "Selesaikan tugas terjadwal agar hasil bawang merah maksimal."}
            </p>
          </div>

          {/* Countdown pengingat kocor */}
          <div className="bg-blue-50/40 border border-blue-100 rounded-xl p-4 flex items-center gap-3">
            <div className="p-3 bg-blue-100 text-blue-700 rounded-xl">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-blue-800 block">Jadwal Kocor Terdekat</span>
              <span className="text-lg font-mono font-bold text-blue-950">{timerCount}</span>
              <span className="text-[10px] text-blue-600 block mt-0.5">Waktunya menyiramkan Jeevamrutham Cair</span>
            </div>
          </div>

          {/* Tips Aktif */}
          <div className="bg-amber-50/40 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-lg shrink-0 mt-0.5">
              <Info className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-800 block">Tips Penyiraman Bawang</span>
              <p className="text-[11px] text-amber-950/90 leading-relaxed mt-0.5">
                Paling ideal kocor Jeevamrutham pada jam <strong className="text-amber-900">06.00-08.00 pagi</strong> atau <strong className="text-amber-900">16.00-18.00 sore</strong> saat mikroba tanah sedang aktif berkembang biak.
              </p>
            </div>
          </div>
        </div>

        {/* Tab & Filter */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4 gap-2">
          <div className="flex gap-1.5 p-0.5 bg-gray-100 rounded-lg">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                activeTab === "all" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Semua Tugas
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                activeTab === "pending" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Belum Selesai ({tasks.filter(t => !t.isCompleted).length})
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                activeTab === "completed" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Selesai ({tasks.filter(t => t.isCompleted).length})
            </button>
          </div>

          <span className="text-xs text-gray-500">
            Total: <strong className="text-gray-800">{filteredTasks.length}</strong> langkah
          </span>
        </div>

        {/* Timeline Tasks List */}
        <div className="relative border-l-2 border-dashed border-gray-200 ml-4 pl-6 space-y-6">
          {filteredTasks.map((task) => {
            // Menentukan warna badge fase
            const phaseColors = {
              "Persiapan": "bg-stone-100 text-stone-700 border-stone-200",
              "Vegetatif": "bg-emerald-100 text-emerald-800 border-emerald-200",
              "Pembentukan Umbi": "bg-purple-100 text-purple-800 border-purple-200",
              "Pematangan": "bg-amber-100 text-amber-800 border-amber-200",
              "Panen": "bg-rose-100 text-rose-800 border-rose-200",
            };

            const actionColors = {
              jeevamrutham: "bg-emerald-600 border-emerald-600 text-white",
              pesticide: "bg-red-500 border-red-500 text-white",
              land: "bg-stone-600 border-stone-600 text-white",
              weeding: "bg-blue-500 border-blue-500 text-white",
              harvest: "bg-rose-600 border-rose-600 text-white",
            };

            return (
              <div key={task.id} className="relative group">
                {/* Bullet Icon */}
                <div
                  onClick={() => toggleTask(task.id)}
                  className={`absolute -left-[37px] top-1.5 w-6 h-6 rounded-full border-2 bg-white flex items-center justify-center cursor-pointer transition-all duration-200 z-10 ${
                    task.isCompleted
                      ? "border-emerald-600 bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                      : "border-gray-300 text-gray-300 hover:border-emerald-500 hover:text-emerald-500"
                  }`}
                >
                  {task.isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 fill-emerald-600 text-white" />
                  ) : (
                    <Circle className="h-3 w-3 shrink-0" />
                  )}
                </div>

                {/* Task Box */}
                <div
                  className={`p-5 rounded-xl border transition-all ${
                    task.isCompleted
                      ? "bg-gray-50 border-gray-200 opacity-75"
                      : "bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-100"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-lg">
                        Hari ke-{task.dayNumber}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${phaseColors[task.phase]}`}>
                        {task.phase}
                      </span>
                    </div>

                    <span className="text-xs text-gray-500 font-medium font-mono">{task.dueDate}</span>
                  </div>

                  <h3
                    onClick={() => toggleTask(task.id)}
                    className={`text-sm font-bold text-gray-800 cursor-pointer hover:text-emerald-600 transition-colors ${
                      task.isCompleted ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {task.title}
                  </h3>
                  
                  <p className={`text-xs text-gray-600 mt-1.5 leading-relaxed ${task.isCompleted ? "text-gray-400" : ""}`}>
                    {task.description}
                  </p>

                  {/* Actions / Reminders shortcut */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {task.actionType === "jeevamrutham" && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg">
                        <Droplet className="h-3 w-3 text-emerald-500" />
                        Kocor Jeevamrutham Cair 10%
                      </span>
                    )}
                    {task.actionType === "pesticide" && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-700 bg-red-50 border border-red-100 px-2.5 py-1 rounded-lg">
                        <Sparkles className="h-3 w-3 text-red-500" />
                        Semprot Pengusir Ulat (Neemastra)
                      </span>
                    )}
                    {task.actionType === "weeding" && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-lg">
                        Penyiangan Rumput Liar
                      </span>
                    )}
                    {task.actionType === "harvest" && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-lg">
                        Panen Raya & Curing
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Simulated Push Notification Toast */}
      {showNotificationPopup && (
        <div className="fixed bottom-6 right-6 max-w-sm w-full bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-800 p-5 z-50 animate-bounce">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-emerald-600 rounded-xl text-white shrink-0 mt-0.5">
              <Bell className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400">PENGINGAT AGRI-SMART</span>
                <button onClick={() => setShowNotificationPopup(false)} className="text-gray-400 hover:text-white text-xs font-bold font-mono">X</button>
              </div>
              <h4 className="text-sm font-bold text-white mt-1">Waktunya Penyiraman! 📅</h4>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                Hari ini adalah jadwal mengocorkan <strong className="text-emerald-300">Jeevamrutham Cair 10%</strong> untuk bawang merah Anda. Silakan saring tong fermentasi Anda sekarang!
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => {
                    const taskToComplete = tasks.find(t => t.actionType === "jeevamrutham" && !t.isCompleted);
                    if (taskToComplete) {
                      toggleTask(taskToComplete.id);
                    }
                    setShowNotificationPopup(false);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg"
                >
                  Sudah Saya Siram
                </button>
                <button onClick={() => setShowNotificationPopup(false)} className="bg-slate-800 hover:bg-slate-700 text-gray-300 text-[10px] font-bold px-3 py-1.5 rounded-lg">
                  Nanti Saja
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
