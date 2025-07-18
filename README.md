# 🌍 GeoTrend

GeoTrend is an interactive global trend explorer that helps users discover trending topics, hashtags, and news based on geographic location. It visualizes live data on a map, offering a unique way to explore what's happening around the world in real time.

## 🚀 Features

- 🗺️ Mapbox-powered interactive world map
- 📍 Location-based trend discovery
- 🔎 Search trends by city or region
- 📊 Trend insights pulled from APIs like Reddit
- 👤 User account and "For You" page based on location

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Supabase (Database + Auth + Realtime) 
- **Map Integration:** Mapbox GL JS
- **APIs Used:** Reddit API, MapBox API
- **Testing:** Vitest
- **CI/CD:** GitHub Actions
- **Version Control:** Git + GitHub

## 📦 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/SevenThanh/GeoTrend.git
   cd GeoTrend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Run tests**
   ```bash
   npm run test
   ```

## ⚙️ Project Structure

```
GeoTrend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── utils/
├── .github/
│   └── workflows/
├── package.json
├── README.md
└── ...
```

## 🧪 GitHub Actions

This project uses GitHub Actions to run unit tests on push and pull requests to both `main` and feature branches. See `.github/workflows/test.yml` for details.

## 🤝 Contributors

- Johan Nguyen  
- Bryan Grisales
- William Jijon

## 📄 License

MIT
