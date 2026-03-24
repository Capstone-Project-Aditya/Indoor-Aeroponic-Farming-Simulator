# AeroFarm — Advanced Indoor Aeroponic Farming Simulator

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white" />
</p>

## Overview
**AeroFarm** is an advanced, physics-based thermodynamic simulator and active farm management platform designed for indoor aeroponic agriculture. Developed as a comprehensive Capstone Project, this platform allows agricultural engineers, hobbyists, and commercial farmers to accurately predict crop yields, evaluate multi-year financial ROI, diagnose plant diseases via AI, and manage daily thermodynamic schedules—all before investing capital into physical hardware.

## 🚀 Key Features

### 1. Thermodynamic Growth Engine
Run deterministic, physics-based simulations forecasting biomass, yield, and plant stress based on environmental inputs (Temperature, Light Hours, CO₂, pH, EC, etc.). The engine scales across 10+ different crop variants.

### 2. Live Weather API Sync
By integrating with the global **Open-Meteo API**, AeroFarm escapes the assumption of perfect insulation. Sync the simulator to any major city (e.g., Dubai, London, New Delhi) to calculate the actual real-world **HVAC cooling costs** required to maintain your target indoor environment against the external temperature. 

### 3. Business ROI Planner
A dedicated professional tool for calculating the financial viability of an aeroponic farm. Input your available capital and real estate constraints, and the planner automatically calculates maximum structural capacities, amortized infrastructure CapEx, and generates a **5-Year Cash Flow Projection Chart**.

### 4. AI Plant Pathology Scanner (Gemini 2.0 Vision)
Upload photos of infected or struggling crops directly into the Plant Scanner. Powered by **Google Gemini 2.0 Flash Vision** via edge functions, the AI identifies specific pathogens (e.g., Powdery Mildew, Spider Mites) and generates a structured, organic treatment and prevention plan.

### 5. AI Farm Manager & Calendar Sync
Launch a simulation into an "Active Farm cycle". The AI automatically generates a day-by-day agronomic care schedule based on the selected crop. Export this schedule directly to **Google/Apple Calendar (.ics)** so you never miss a nutrient flush, EC calibration, or harvest day.

## 🛠 Tech Stack
- **Frontend Framework:** React 18 (Vite)
- **Language:** TypeScript
- **Styling & UI:** Tailwind CSS, `shadcn/ui`, Framer Motion, Recharts
- **Backend & Database:** Supabase (PostgreSQL), Edge Functions (Deno)
- **AI Integrations:** Google Gemini Pro & Gemini Flash Vision Multimodal APIs

## 📦 Local Setup & Deployment

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/aeroponic-ace.git
   cd aeroponic-ace
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configure Environment Variables**
   Create a \`.env\` file in the root directory and add your Supabase credentials:
   \`\`\`env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   \`\`\`
   
   To use the AI capabilities, ensure you have set your `GEMINI_API_KEY` in your Supabase project's secret manager:
   \`\`\`bash
   supabase secrets set GEMINI_API_KEY=your_api_key
   \`\`\`

4. **Deploy Edge Functions (For AI Features)**
   \`\`\`bash
   supabase functions deploy gemini
   supabase functions deploy gemini-vision
   supabase functions deploy gemini-calendar
   \`\`\`

5. **Start the Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

## 📚 Future Roadmap
- Implementation of IoT sensor integration (MQTT) to ingest live pH/EC telemetry instead of dragging simulation sliders.
- Expanded crop catalog including root-based aeroponic models.
- Supply chain APIs to dynamically pull localized wholesale crop prices.

## License
MIT License. See `LICENSE` for more information.
