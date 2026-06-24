# Natural Farming Bawang Merah (Shallot ZBNF Tracker & Smart Assistant) 🧅🌱

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite-Modern-646CFF?style=flat-square&logo=vite)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4.0-38B2AC?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-Powered-8E44AD?style=flat-square&logo=googlegemini)](https://deepmind.google/technologies/gemini/)
[![Zero Budget Natural Farming](https://img.shields.io/badge/ZBNF-Subhash_Palekar-2ECC71?style=flat-square)](#about-the-method)

An advanced full-stack web application designed for Indonesian shallot (*bawang merah*) farmers adopting the **Zero Budget Natural Farming (ZBNF)** methodology. This tool helps farmers calculate precise, localized formulations of biological soil inoculants (*Jeevamrutham* & *Ghanajeevamrutham*), manage their crop cycles through a 65-day calendar, track lunar & traditional *Pranata Mangsa* weather patterns, brew natural pest repellents, and perform AI-driven plant disease diagnostics.

> **💡 Real-World Agronomy**: Fully customized for Indonesian agricultural contexts. Optimized to recommend **Sapi Jawa / Peranakan Ongole (PO)** cattle inputs and premium **Kacang Koro** flour for optimal indigenous microbe multiplication—strictly avoiding common chemical residues.

---

## 📸 Application Preview & Interface

Below are high-quality visual representations of the application's screens:

### 1. Unified Dashboard & Jeevamrutham Calculator
```
+-------------------------------------------------------------------------+
| [🧅 Agri-Smart Bawang Merah]         [Calculate] [Calendar] [AI Clinic] |
|                                                                         |
|  🟢 Tingkatkan Hasil Bawang Merah 30% Lebih Gembur!                      |
|  Zero Budget Natural Farming (ZBNF) adaptasi iklim tropis & tanah vulkanik |
|                                                                         |
|  +---------------------------------+  +-------------------------------+ |
|  | 📐 LAND SIZE CONFIGURATION      |  | 🧪 CALCULATOR RESULT          | |
|  | Enter area: [ 1000 ] sq meters  |  | • 100L Water                  | |
|  | Sowing Date: [ 2026-06-24 ]     |  | • 5 kg Sapi Jawa (PO) Dung    | |
|  |                                 |  | • 5 Liters Raw Cow Urine      | |
|  | [Recalculate Dynamic Formula]   |  | • 1 kg Kacang Koro Flour      | |
|  +---------------------------------+  +-------------------------------+ |
+-------------------------------------------------------------------------+
```
*(Add actual screenshot: `docs/assets/dashboard_calculator.png`)*

### 2. Live 65-Day Interactive Shallot Crop Calendar
```
+-------------------------------------------------------------------------+
| 📅 KALENDER BUDIDAYA INTERAKTIF (65 HARI)                               |
| [ Vegetative Phase (Days 0-25) ]  [ Generative Phase (Days 26-50) ]     |
|                                                                         |
| [✓] Hari 10: Pembersihan rumput liar secara manual & gemburkan tanah   |
| [✓] Hari 12: Penyemprotan Jeevamrutham Cair pertama pada jam 16:00      |
| [ ] Hari 15: Cek kadar kelembapan telunjuk tanah secara berkala         |
|                                                                         |
| Progress: [=====================>-------------] 65% Completed           |
+-------------------------------------------------------------------------+
```
*(Add actual screenshot: `docs/assets/crop_calendar.png`)*

### 3. Traditional Wisdom (Pranata Mangsa) & Moon Phase Tracker
```
+-------------------------------------------------------------------------+
| 🌙 KEARIFAN LOKAL BIODYNAMIC & CUACA                                    |
| [ Fase Bulan: Waxing Gibbous ]  ->  Sangat Baik untuk pertumbuhan daun |
| [ Pranata Mangsa: Kasa / Kesatu ] -> Musim kemarau, cocok tanam bawang  |
|                                                                         |
| 🌾 Field Observations Checklist:                                        |
| [✓] Angin berembus kering dari arah Tenggara (Tanda kemarau stabil)     |
| [ ] Kabut tipis pagi hari di lereng bukit                               |
+-------------------------------------------------------------------------+
```
*(Add actual screenshot: `docs/assets/biodynamic_weather.png`)*

### 4. Smart AI Visual Disease Diagnostician (Gemini-Powered)
```
+-------------------------------------------------------------------------+
| 📸 KLINIK AI DETEKSI PENYAKIT & HAMA                                    |
|  Upload shallot leaf photo or take a picture with smartphone camera:     |
|  +-----------------------------+                                        |
|  |      [ Upload Image ]       |  -> Diagnostics Result:               |
|  |                             |     ⚠️ 100% Detected: Moler (Rot)      |
|  |  (Thrips / Moler / Grayak)  |     Recommendation: Apply Agniastra    |
|  +-----------------------------+     organic spray immediately.         |
+-------------------------------------------------------------------------+
```
*(Add actual screenshot: `docs/assets/ai_clinic.png`)*

---

## 🌟 Key Features

### 1. 🐄 Sapi Jawa & Kacang Koro Customized Jeevamrutham Calculator
- **Custom Native Inputs**: Specifically tailored to prompt for **Kotoran Sapi Jawa (Peranakan Ongole)** which contains higher indigenous microbial counts due to local grazing habits, and **Tepung Kacang Koro** for protein to activate multiplication (strictly omitting peanut flour which can introduce unwanted fungal pathogens).
- **Dynamic Unit Converter**: Input your farm size in square meters ($m^2$), and the tool dynamically scales quantities of water, fresh cow dung, cow urine, palm sugar, legume flour, and fertile forest soil.
- **Dual Formulations**: Supports both **Liquid Jeevamrutham** (weekly foliar/soil spray) and **Ghanajeevamrutham** (dry granulated compost for baseline soil conditioning).

### 2. 📅 Comprehensive 65-Day Shallot Lifecycle Calendar
- **Interactive Checklists**: Fully detailed daily tasks from Day 1 to Day 65 divided into pre-planting, early vegetative, rapid growth, bulbing (generative), and pre-harvest drying.
- **Dynamic Date Computations**: Calculates the exact calendar dates for every agronomical activity based on your chosen sowing date.
- **Alert Indicators**: Includes specific warnings regarding optimal application times (e.g., spraying Jeevamrutham strictly after 16:00 to prevent microbial UV damage).

### 3. 🌀 Natural Pesticides & Repellents Library (Astra Formulations)
- Step-by-step preparation, dilution rules, and spraying guide for natural repellents:
  - **Neemastra**: Based on neem leaves and fresh cow urine (broad-spectrum repellent for sucking insects and moths).
  - **Agniastra**: Infused with garlic, hot chili, and tobacco (combats tough leaf caterpillars and thrips).
  - **Brahmastra**: Formulated using local toxic weeds (mimosa, custard apple, papaya leaves) for deep-acting pest control.

### 4. 🌙 Local Lunar (Biodynamic) & Pranata Mangsa Weather Tracker
- **Lunar Guidance**: Recommends activities based on moon phases (e.g., planting during the Waxing Moon for maximum sap ascent; pruning during the Waning Moon).
- **Pranata Mangsa Seasons**: Maps Javanese crop-season indicators to direct Shallot cycles.
- **Field Signs**: Checklist to record wind directions, morning dew, and bird activities to forecast micro-climate shifts without expensive weather stations.

### 5. 🔬 Finger & Fist Traditional Soil Moisture Guide
- **Finger Piercing Test**: Graphical, easy-to-understand field guide on checking soil moisture using the index finger depth (1.5 inches).
- **Soil Clumping Test**: Interactive walkthrough on checking moisture via soil compaction and crumble consistency (ensuring optimal 35-40% moisture for microbial survival).

### 6. 🧠 AI Plant Clinic (Visual Disease Diagnostics)
- **Image Upload & Camera Support**: Directly upload leaf photos from your phone or desktop.
- **Gemini-powered Analysis**: Analyzes plant visual symptoms for common Indonesian shallot threats:
  - *Moler / Layu Fusarium* (Fusarium Wilt)
  - *Ulat Grayak* (Spodoptera exigua)
  - *Thrips / Gurem* (Thrips tabaci)
  - *Otot Beras / Bercak Ungu* (Alternaria porri)
- **Actionable Organic Remedies**: Instantly generates specific, non-chemical botanical recipes based on the diagnostic results.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite (Asset bundling & server), Tailwind CSS (Elegant typography and responsive utility styling), Lucide React (Informative vector iconography), and Motion/React (Fluid navigation and entry transitions).
- **Backend**: Node.js, Express (API gateway proxying requests to Google Gemini with complete API Key protection).
- **AI Model**: Google Gemini Pro API (`gemini-3.5-flash`) via the modern `@google/genai` TypeScript SDK.
- **Build System**: Compiled to single-bundle ESM with native type stripping and packaged utilizing `esbuild` for production container compatibility.

---

## 🚀 Local Installation & Configuration

Follow these quick steps to set up and run the application on your computer:

### 1. Clone the Repository
```bash
git clone https://github.com/rumahoffgrid/Natural-Farming-Bawang-Merah.git
cd Natural-Fawang-Bawang-Merah
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root folder of the project:
```bash
cp .env.example .env
```
Open the `.env` file and insert your Google Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Start Development Server
```bash
npm run dev
```
The server will start running on **[http://localhost:3000](http://localhost:3000)**. Open this address in your web browser.

### 5. Build for Production
To build the server and client bundle for Cloud Run, Docker containers, or production deployment:
```bash
npm run build
npm start
```

---

## 📖 Under the Hood: The ZBNF Chemistry
Natural Farming is not simply "farming without chemicals"; it is active biological engineering:
1. **Soil Microbe Multiplication**: Pristine forest soil containing beneficial indigenous microbes is dissolved in cow dung and urine.
2. **Protein & Sugar Catalyst**: The addition of local palm sugar (jaggery) provides carbohydrates, while **Kacang Koro** flour provides rich nitrogenous proteins to multiply microbes by billions in 7 days.
3. **Phosphate Mobilization**: These multiplied bacteria dissolve bound crystallized phosphates in the soil and absorb atmospheric nitrogen directly, eliminating the need for synthetic chemical Urea or NPK fertilizers.

---

## 🤝 Contribution & Community
We welcome improvements, translations, and localization suggestions for other regional Indonesian farming groups (e.g., Sunda, Bali, Bugis).

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

---
*Created with love and respect for Indonesian local farmers by **Rumah Off-Grid**.* 🇮🇩🌾  
*Website: [github.com/rumahoffgrid](https://github.com/rumahoffgrid)*
