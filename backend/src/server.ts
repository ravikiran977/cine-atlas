import express, { type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "../prisma/db.js";
import { searchTmdb } from "./services/tmdb.js";

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
app.use(express.json({ limit: "1mb" }));

const success = (res: Response, data: unknown, status = 200) => res.status(status).json({ success: true, data });
const positiveInt = (value: unknown, fallback: number, maximum: number) => { const parsed = Number.parseInt(String(value), 10); return Number.isFinite(parsed) && parsed > 0 ? Math.min(parsed, maximum) : fallback; };
const reverseGeocodeCache = new Map<string, { name: string; expiresAt: number }>();

async function locationName(latitude: number, longitude: number) {
  const cacheKey = `${latitude.toFixed(3)},${longitude.toFixed(3)}`;
  const cached = reverseGeocodeCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return cached.name;

  const url = new URL("https://nominatim.openstreetmap.org/reverse");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("lat", String(latitude));
  url.searchParams.set("lon", String(longitude));
  // A street-level result includes village and hamlet fields; lower zoom levels
  // frequently return only the surrounding administrative district.
  url.searchParams.set("zoom", "18");
  const response = await fetch(url, { headers: { accept: "application/json", "user-agent": "CineAtlas/1.0 (location display)" }, signal: AbortSignal.timeout(5_000) });
  if (!response.ok) throw new Error(`Reverse geocoding failed with ${response.status}`);
  const result = await response.json() as { address?: Record<string, string> };
  const address = result.address ?? {};
  const locality = address.village || address.hamlet || address.residential || address.suburb || address.town || address.city || address.municipality || address.county || address.state;
  const name = [locality, address.country].filter(Boolean).join(", ");
  if (!name) throw new Error("Reverse geocoding returned no location name");
  reverseGeocodeCache.set(cacheKey, { name, expiresAt: Date.now() + 10 * 60_000 });
  return name;
}

app.get("/api/health", (_req, res) => success(res, { message: "CineAtlas API is running" }));
app.get("/api/reverse-geocode", async (req, res, next) => { try { const latitude = Number(req.query.lat); const longitude = Number(req.query.lng); if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || Math.abs(latitude) > 90 || Math.abs(longitude) > 180) return res.status(400).json({ success: false, message: "Valid lat and lng query parameters are required" }); success(res, { name: await locationName(latitude, longitude) }); } catch (error) { next(error); } });
app.get("/api/movies", async (req, res, next) => { try { const page = positiveInt(req.query.page, 1, 1_000_000); const limit = positiveInt(req.query.limit, 20, 100); const items = await db.orm.public.Movie.orderBy((movie) => movie.createdAt.desc()).offset((page - 1) * limit).limit(limit).all(); success(res, { items, page, limit }); } catch (error) { next(error); } });
app.get("/api/movies/:id", async (req, res, next) => { try { const movie = await db.orm.public.Movie.include("locations", (link) => link.include("location", (location) => location)).first({ id: Number(req.params.id) }); if (!movie) return res.status(404).json({ success: false, message: "Movie not found" }); success(res, movie); } catch (error) { next(error); } });
app.get("/api/locations", async (req, res, next) => { try { const page = positiveInt(req.query.page, 1, 1_000_000); const limit = positiveInt(req.query.limit, 20, 100); const items = await db.orm.public.Location.orderBy((location) => location.createdAt.desc()).offset((page - 1) * limit).limit(limit).all(); success(res, { items, page, limit }); } catch (error) { next(error); } });
app.get("/api/locations/:id", async (req, res, next) => { try { const location = await db.orm.public.Location.include("movies", (link) => link.include("movie", (movie) => movie)).first({ id: Number(req.params.id) }); if (!location) return res.status(404).json({ success: false, message: "Location not found" }); success(res, location); } catch (error) { next(error); } });
app.get("/api/search", async (req, res, next) => { try { const query = typeof req.query.q === "string" ? req.query.q.trim() : ""; if (query.length < 2) return success(res, { movies: [], locations: [] }); const pattern = `%${query}%`; const [movies, locations] = await Promise.all([db.orm.public.Movie.where((movie) => movie.title.ilike(pattern)).limit(10).all(), db.orm.public.Location.where((location) => location.name.ilike(pattern)).limit(10).all()]); success(res, { movies, locations }); } catch (error) { next(error); } });
app.get("/api/movie-suggestions", async (req, res, next) => { try { const query = typeof req.query.q === "string" ? req.query.q.trim() : ""; if (query.length < 2) return success(res, { items: [], source: "none" }); const tmdbItems = await searchTmdb(query); if (tmdbItems) return success(res, { items: tmdbItems, source: "tmdb" }); const pattern = `%${query}%`; const movies = await db.orm.public.Movie.where((movie) => movie.title.ilike(pattern)).limit(10).all(); success(res, { items: movies.map((movie) => ({ tmdbId: movie.tmdbId, title: movie.title, overview: movie.overview || "", releaseDate: movie.releaseDate, posterUrl: movie.posterPath, type: "MOVIE" })), source: "local" }); } catch (error) { next(error); } });
app.use((_req, res) => res.status(404).json({ success: false, message: "Route not found" }));
app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => { console.error("API error", error); res.status(500).json({ success: false, message: "An unexpected server error occurred" }); });
const port = Number(process.env.PORT || 5000);
app.listen(port, () => console.log(`CineAtlas API running on http://localhost:${port}`));
