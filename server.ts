import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Parse large JSON payloads for base64 image uploads
app.use(express.json({ limit: "15mb" }));

function getGeminiClient(userApiKey?: string) {
  const apiKey = userApiKey || process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    return null;
  }
  try {
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } catch (error) {
    console.error("Gagal menginisialisasi Google Gen AI client:", error);
    return null;
  }
}

// API: Diagnosis Kesehatan Tanaman Bawang Merah bertenaga AI
app.post("/api/analyze-crop", async (req, res) => {
  const { description, image } = req.body;
  const userApiKey = req.headers["x-gemini-api-key"] as string | undefined;
  const ai = getGeminiClient(userApiKey);

  // Mode Simulasi jika Kunci API tidak ada
  if (!ai) {
    console.log("Menjalankan analisis dalam mode simulasi agronomis (Kunci API Gemini tidak dikonfigurasi).");
    
    // Logika simulasi cerdas berdasarkan kata kunci
    const descLower = (description || "").toLowerCase();
    let diagnosis = "Tanaman Sehat (Saran Pencegahan)";
    let confidence = "90%";
    let explanation = "Daun bawang tampak sehat dan tumbuh dengan baik. Namun, perawatan rutin menggunakan pupuk hayati Jeevamrutham cair sangat dianjurkan untuk memperkuat imun tanaman dari serangan penyakit.";
    let remedy = [
      "Siramkan larutan Jeevamrutham cair 10% setiap 10-14 hari sekali pada area perakaran.",
      "Lakukan sanitasi gulma di sekitar tanaman secara berkala agar tidak menjadi sarang hama.",
      "Pastikan drainase bedengan baik untuk mencegah kelembapan berlebih di area umbi."
    ];
    let organicPesticide = "Jeevamrutham Cair (Pencegahan)";

    if (descLower.includes("ulat") || descLower.includes("grayak") || descLower.includes("bolong") || descLower.includes("makan")) {
      diagnosis = "Serangan Ulat Grayak (Spodoptera exigua)";
      confidence = "85% (Simulasi)";
      explanation = "Ulat grayak adalah hama utama bawang merah di Indonesia. Mereka memakan bagian dalam daun bawang hingga menyisakan kulit ari transparan. Jika dibiarkan, fotosintesis akan terganggu parah dan menyebabkan kegagalan umbi.";
      remedy = [
        "Semprotkan pestisida nabati Neemastra (berbahan daun mimba dan urin sapi) secara merata pada sore hari.",
        "Lakukan pemetikan kelompok telur ulat secara manual pada pagi hari sebelum menetas.",
        "Pasang perangkap lampu (light trap) di sekitar lahan untuk menangkap ngengat dewasa."
      ];
      organicPesticide = "Neemastra";
    } else if (descLower.includes("moler") || descLower.includes("layu") || descLower.includes("fusarium") || descLower.includes("melintir")) {
      diagnosis = "Penyakit Moler / Layu Fusarium (Fusarium oxysporum)";
      confidence = "80% (Simulasi)";
      explanation = "Penyakit moler ditandai dengan daun melintir, layu mendadak, dan pangkal umbi membusuk berwarna putih kecokelatan. Penyakit ini disebabkan oleh jamur tular tanah yang berkembang pesat pada kelembapan tinggi.";
      remedy = [
        "Segera cabut dan bakar tanaman yang terinfeksi agar jamur tidak menular ke tanaman sehat.",
        "Taburkan Ghanajeevamrutham (pupuk padat mikroba kaya tanah hutan) pada tanah di sekitar tanaman sehat untuk memperkuat agen pengendali hayati.",
        "Semprotkan pestisida nabati Brahmastra untuk menekan penyebaran spora jamur."
      ];
      organicPesticide = "Brahmastra / Ghanajeevamrutham";
    } else if (descLower.includes("kuning") || descLower.includes("pucat") || descLower.includes("kerdil") || descLower.includes("pupuk")) {
      diagnosis = "Defisiensi Nutrisi (Terutama Nitrogen / Kalium)";
      confidence = "75% (Simulasi)";
      explanation = "Daun bawang menguning dari ujung atau tampak pucat kerdil mengindikasikan kekurangan unsur hara makro Nitrogen atau Kalium akibat kualitas tanah yang rusak atau kurangnya bahan organik aktif.";
      remedy = [
        "Kocorkan Jeevamrutham cair konsentrasi tinggi (15%) langsung ke perakaran setiap 7 hari sekali.",
        "Tambahkan pupuk kandang matang yang sudah difermentasi dengan ragi hutan di bedengan.",
        "Lakukan pendangiran tanah (penggemburan ringan) di sela bedengan agar akar dapat bernapas dan menyerap nutrisi dengan optimal."
      ];
      organicPesticide = "Jeevamrutham Cair (Klorofil Booster)";
    }

    return res.json({
      status: "success",
      mode: "simulation",
      diagnosis,
      confidence,
      explanation,
      remedy,
      organicPesticide,
      message: "Menggunakan sistem diagnosis agronomis cadangan (Gemini API Key tidak terdeteksi)."
    });
  }

  try {
    const parts: any[] = [];

    if (image && image.data) {
      // Hilangkan skema data:image/...;base64 jika ada
      let base64Data = image.data;
      if (base64Data.includes(",")) {
        base64Data = base64Data.split(",")[1];
      }
      parts.push({
        inlineData: {
          mimeType: image.mimeType || "image/jpeg",
          data: base64Data,
        },
      });
    }

    const promptText = `Anda adalah pakar agroteknologi bawang merah di Indonesia. Lakukan diagnosis penyakit/hama/kekurangan nutrisi berdasarkan info berikut:
Deskripsi gejala petani: ${description || 'Tidak ada deskripsi tambahan.'}

Berikan diagnosis mendalam dan rekomendasi spesifik penanganan alami (Gunakan pupuk organik Jeevamrutham/Ghanajeevamrutham, atau pestisida nabati seperti Neemastra/Brahmastra jika sesuai). Jawab dalam bahasa Indonesia. Berikan respons dalam format JSON yang valid sesuai dengan struktur yang ditentukan.`;

    parts.push({ text: promptText });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING },
            diagnosis: { type: Type.STRING },
            confidence: { type: Type.STRING },
            explanation: { type: Type.STRING },
            remedy: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            organicPesticide: { type: Type.STRING },
          },
          required: ["status", "diagnosis", "confidence", "explanation", "remedy", "organicPesticide"],
        },
      },
    });

    const resultText = response.text || "{}";
    const parsedResult = JSON.parse(resultText);

    return res.json({
      ...parsedResult,
      mode: "live"
    });

  } catch (error: any) {
    console.error("Gagal melakukan analisis kesehatan tanaman dengan Gemini:", error);
    return res.status(500).json({
      status: "error",
      message: "Gagal mendiagnosis kesehatan tanaman: " + error.message,
    });
  }
});

// Jalankan integrasi Vite untuk development atau serve static files untuk production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Memulai server dalam mode PENGEMBANGAN...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Memulai server dalam mode PRODUKSI...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server berjalan di http://0.0.0.0:${PORT}`);
  });
}

startServer();
