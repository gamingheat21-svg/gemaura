# GemAura 🔮

GemAura is a full-stack, premium astrology and gemstone recommendation platform. It combines personalized astrological insights with curated gemstone catalogs to help users discover the cosmic energy aligned with their zodiac signs.

## Features ✨

- **Personalized Gemstone Recommendations**: Enter your birth details to instantly discover the gemstone that aligns with your astrological energy.
- **Live Daily Horoscopes**: Integrates with external Astrology APIs to provide daily predictions for your personal life, profession, health, travel, and luck.
- **Astrology Insights**: Dynamic, deep-dive profiles covering your ruling planet, lucky colors, personality traits, and career advice.
- **Interactive Gemstone Catalog**: Browse a rich catalog of gemstones with real-time filtering and a responsive, two-column layout showing personalized astrology insights on the side.
- **User Authentication**: Secure user login and registration system.
- **Save & Track**: Authenticated users can save their recommendations (including the full astrology profile and daily horoscope) to their account history.

## Tech Stack 🛠️

### Frontend
- **React.js (Vite)**: Fast, modern UI development.
- **React Router**: For seamless single-page application (SPA) navigation.
- **Axios**: Handling asynchronous requests to the backend API.
- **Lucide React**: Beautiful, scalable SVG icons.
- **Vanilla CSS**: Custom-built, premium glassmorphism aesthetics, dynamic micro-animations, and responsive layouts without relying on heavy UI frameworks.

### Backend
- **Node.js & Express.js**: Fast and minimal web framework for handling API routing.
- **PostgreSQL**: Relational database for robust storage of users, zodiac profiles, compatibility scores, and gemstone data.
- **JSON Web Tokens (JWT) & bcrypt**: Secure, stateless user authentication and password hashing.
- **Node-Cache**: In-memory caching for external API calls to significantly improve performance and reduce latency.
- **External Integration**: `json.astrologyapi.com` for fetching real-time western horoscopes and daily sun sign predictions.

## Getting Started 🚀

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [PostgreSQL](https://www.postgresql.org/) installed on your machine.

### 1. Database Setup
1. Create a local PostgreSQL database (e.g., `postgres`).
2. Update the `.env` file in the `backend/` directory with your PostgreSQL connection URL:
   ```env
   DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<dbname>
   ```
   *(Note: Remember to URL-encode special characters in your password, e.g., `@` becomes `%40`)*

### 2. Backend Setup
Navigate into the backend directory, install dependencies, initialize the database, and start the server:
```bash
cd backend
npm install
npm run init-db   # This creates the tables and seeds the database
npm run dev       # Starts the backend server on http://localhost:5000
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, install dependencies, and start the React app:
```bash
cd frontend
npm install
npm run dev       # Starts the frontend on http://localhost:5173
```

## Architecture Notes 🏗️
- **Pre-fetching**: The frontend automatically pre-fetches and caches horoscope data in the background immediately upon user login, resulting in zero-wait times on the results page.
- **Fallbacks**: The backend is configured with graceful timeouts and fallback mock data for external API calls, guaranteeing that the UI never hangs even if the 3rd-party astrology service is down or slow.
