# CineAtlas

CineAtlas is a full-stack movie discovery and location tracking app with a TypeScript Express API and a Next.js frontend.

## Project structure

- `backend/` — Express + Prisma + PostgreSQL API
- `frontend/` — Next.js app for the web UI

## Requirements

- Node.js 20+
- npm 10+
- PostgreSQL 15+
- TMDB API key (optional for local movie suggestions)

## Quick start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the example environment file and fill in your secrets:
   ```bash
   copy .env.example .env
   ```

   Then update the values in `.env` for your local setup.

3. Start the app:
   ```bash
   npm run dev
   ```

   This starts the backend and frontend together.

## Available scripts

- `npm run dev` — start backend and frontend together
- `npm run dev:backend` — start the backend only
- `npm run dev:frontend` — start the frontend only
- `npm run build` — build both apps
- `npm run start:backend` — run the built backend
- `npm run start:frontend` — run the built frontend

## Environment variables

The backend reads values from `backend/.env` and the frontend reads from `frontend/.env.local` or environment variables in the shell. Example values are included in the root `.env.example` file.

## Notes

- The backend expects a PostgreSQL database and Prisma migration setup.
- The frontend connects to the backend through `NEXT_PUBLIC_API_URL`.
- For production deployments, set secure values and use environment-specific configuration.
