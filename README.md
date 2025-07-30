# Darts Fines Tracker

This is a small React application bootstrapped with **Vite**. It uses **Supabase** for authentication and data storage. The app lets players log in and track fines accrued during darts matches.

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd DartWebApp
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Environment variables**
   - Copy `.env.example` to `.env` and fill in your Supabase credentials.
   ```bash
   cp .env.example .env
   # edit .env
   ```

## Development

Start a local dev server with hot reloading:
```bash
npm run dev
```

## Production build

Create an optimized build in the `dist` directory:
```bash
npm run build
```
You can preview the build locally with `npm run preview`.

---

For additional information about running tests, you can use:
```bash
npm test
```
