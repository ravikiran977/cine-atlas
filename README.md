# CineAtlas

<<<<<<< ours
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
=======
> Discover where cinema came to life.

CineAtlas is a full-stack web application for exploring real-world filming locations, discovering movies, and building a personal collection of cinematic places. It combines a map-first Next.js experience with a TypeScript/Express API and PostgreSQL-backed catalog.

## Highlights

- Browse and search filming locations on an interactive Leaflet map.
- Use **Near me** to request browser geolocation, place a user marker, and zoom directly to the current coordinates—even where no movie locations exist.
- Resolve the user’s locality with reverse geocoding, including village and hamlet names where available.
- Browse movie and location detail pages.
- Get live movie-title suggestions from TMDB, with a local database fallback.
- Submit movie and location contributions through dedicated UI routes.
- Save and review a personal collection through profile and favourites views.
- Use responsive, custom-designed landing, sign-in, registration, and exploration experiences.

## Architecture

```text
Browser
  │
  ├── Next.js 16 + React 19 frontend (port 3000)
  │     ├── Leaflet / React Leaflet map
  │     └── Browser Geolocation API
  │
  └── Express API (port 5000)
        ├── CineAtlas PostgreSQL database
        ├── TMDB movie-suggestion API (optional)
        └── OpenStreetMap Nominatim reverse geocoding
```

## Tech stack

| Area | Technology |
| --- | --- |
| Frontend | Next.js 16, React 19, TypeScript |
| Maps | Leaflet, React Leaflet, OpenStreetMap tiles |
| Backend | Node.js, Express 5, TypeScript |
| Database | PostgreSQL 15+ |
| Data access | Prisma ORM Postgres / Prisma contract |
| External data | TMDB API, OpenStreetMap Nominatim |

## Repository layout

```text
.
├── backend/
│   ├── prisma/          # Database contract and generated schema artefacts
│   ├── src/             # Express server and services
│   └── .env.example     # Backend environment template
├── frontend/
│   ├── app/             # Next.js App Router routes, components, and styles
│   └── public/          # Static assets
├── .env.example         # Root environment reference
└── package.json         # npm workspace scripts
```

## Prerequisites

- [Node.js](https://nodejs.org/) 20 or later
- npm 10 or later
- PostgreSQL 15 or later
- A TMDB API key (optional; enables remote movie suggestions)

## Quick start

1. Clone the repository and install all workspace dependencies.

   ```bash
   git clone https://github.com/ravikiran977/cine-atlas.git
   cd cine-atlas
   npm install
   ```

2. Create a PostgreSQL database named `cineatlas` (or choose another name).

3. Create `backend/.env` from the backend template.

   ```powershell
   Copy-Item backend/.env.example backend/.env
   ```

   Then set at least `DATABASE_URL` and `JWT_SECRET` in `backend/.env`.

4. Optionally create `frontend/.env.local`:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

   `NEXT_PUBLIC_API_URL` must be the **API origin**, without `/api`, because the frontend appends paths such as `/api/locations` itself.

5. Start both applications.

>>>>>>> theirs
   ```bash
   npm run dev
   ```

<<<<<<< ours
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
=======
6. Open [http://localhost:3000](http://localhost:3000). The API health endpoint is available at [http://localhost:5000/api/health](http://localhost:5000/api/health).

## Environment variables

### Backend: `backend/.env`

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string. |
| `JWT_SECRET` | Yes for authentication | A long, random secret; do not commit it. |
| `CLIENT_URL` | Yes in production | Allowed frontend origin for CORS. Defaults to `http://localhost:3000`. |
| `PORT` | No | API port. Defaults to `5000`. |
| `TMDB_API_KEY` | No | Server-only TMDB v3 API key for movie suggestions. |

Example:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/cineatlas"
JWT_SECRET="replace-with-a-long-random-secret"
CLIENT_URL="http://localhost:3000"
PORT=5000
TMDB_API_KEY=""
```

### Frontend: `frontend/.env.local`

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | No | Express API origin. Defaults to `http://localhost:5000`. |

## Database

The database contract is in [`backend/prisma/schema.prisma`](backend/prisma/schema.prisma). It models users, movies, actors, locations, their relationships, and location submissions.

The backend uses the Prisma 8 contract tooling configured in [`backend/prisma.config.ts`](backend/prisma.config.ts). Keep the database schema and generated contract artefacts in sync when changing models. The repository does not currently expose a root migration or seed script; run the database workflow appropriate to your Prisma setup before starting the API against a new database.

## Scripts

Run these from the repository root:

| Command | Description |
| --- | --- |
| `npm run dev` | Start frontend and backend together. |
| `npm run dev:frontend` | Start Next.js development server only. |
| `npm run dev:backend` | Start Express API in watch mode only. |
| `npm run build` | Build backend, then build frontend. |
| `npm run start:frontend` | Serve an existing frontend production build. |
| `npm run start:backend` | Run the built Express API. |
| `npm run lint:frontend` | Run frontend linting. |

For a production frontend session, rebuild before starting it:

```bash
npm run build
npm run start:frontend
```

## API reference

All API responses use a `{ success, data }` envelope on successful requests.

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/api/health` | API health check. |
| `GET` | `/api/movies?page=1&limit=20` | Paginated movie catalog. |
| `GET` | `/api/movies/:id` | Movie with linked locations. |
| `GET` | `/api/locations?page=1&limit=20` | Paginated filming-location catalog. |
| `GET` | `/api/locations/:id` | Location with linked movies. |
| `GET` | `/api/search?q=...` | Search local movies and locations. |
| `GET` | `/api/movie-suggestions?q=...` | TMDB-backed title suggestions; falls back to local records. |
| `GET` | `/api/reverse-geocode?lat=...&lng=...` | Resolve coordinates to a locality and country. |

The reverse-geocode endpoint uses [OpenStreetMap Nominatim](https://nominatim.openstreetmap.org/). Results are cached briefly in memory, and the UI falls back to coordinates if the service is unavailable.

## Location privacy

Location lookup is opt-in. CineAtlas requests coordinates only after a user clicks a location action or grants browser permission. The map can still be used normally if permission is denied. Reverse geocoding is used to display a locality name, such as a city or village, alongside coordinates.

## Current scope and limitations

- The sign-in and registration designs are complete, but secure account creation and session handling are not yet connected to live authentication endpoints.
- The Explore view shows demo locations whenever the database location list is empty or unavailable.
- TMDB is optional; without `TMDB_API_KEY`, title suggestions fall back to the local catalog.
- No automated test suite or CI workflow is configured yet.

## Production checklist

- Set production values for `DATABASE_URL`, `JWT_SECRET`, `CLIENT_URL`, and `NEXT_PUBLIC_API_URL`.
- Run database migrations/contract deployment against the production database.
- Build both workspaces with `npm run build`.
- Serve frontend and API behind HTTPS.
- Configure CORS through `CLIENT_URL` for the exact public frontend origin.
- Keep TMDB credentials server-side; never expose `TMDB_API_KEY` through a `NEXT_PUBLIC_` variable.
- Follow the [Nominatim usage policy](https://operations.osmfoundation.org/policies/nominatim/) for production traffic; use a dedicated geocoding provider if volume grows.

## Contributing

1. Create a branch from `main`.
2. Make focused changes and keep environment secrets out of Git.
3. Run `npm run build` before opening a pull request.
4. Describe UI, API, schema, and environment-variable changes in the pull request.

## License

No repository-level license has been added yet. Add a `LICENSE` file before distributing or accepting external contributions under defined terms.
>>>>>>> theirs
