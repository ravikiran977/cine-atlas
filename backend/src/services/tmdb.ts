type TmdbResult = { id: number; title?: string; name?: string; overview?: string; release_date?: string; first_air_date?: string; poster_path?: string | null };
export type MovieSuggestion = { tmdbId: number; title: string; overview: string; releaseDate: string | null; posterUrl: string | null; type: "MOVIE" | "TV_SHOW" };
const cache = new Map<string, { expiresAt: number; items: MovieSuggestion[] }>();
const imageBaseUrl = "https://image.tmdb.org/t/p/w185";
const toSuggestion = (result: TmdbResult, type: MovieSuggestion["type"]): MovieSuggestion => ({ tmdbId: result.id, title: result.title || result.name || "Untitled", overview: result.overview || "", releaseDate: result.release_date || result.first_air_date || null, posterUrl: result.poster_path ? `${imageBaseUrl}${result.poster_path}` : null, type });

export async function searchTmdb(query: string): Promise<MovieSuggestion[] | null> {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) return null;
  const cacheKey = query.toLowerCase(); const cached = cache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return cached.items;
  const search = async (path: "movie" | "tv") => {
    const url = new URL(`https://api.themoviedb.org/3/search/${path}`);
    url.searchParams.set("api_key", apiKey); url.searchParams.set("query", query); url.searchParams.set("include_adult", "false");
    const response = await fetch(url, { signal: AbortSignal.timeout(5000), headers: { accept: "application/json" } });
    if (!response.ok) throw new Error(`TMDB search failed with ${response.status}`);
    return (await response.json() as { results?: TmdbResult[] }).results ?? [];
  };
  const [movies, shows] = await Promise.all([search("movie"), search("tv")]);
  const items = [...movies.map((result) => toSuggestion(result, "MOVIE")), ...shows.map((result) => toSuggestion(result, "TV_SHOW"))].slice(0, 10);
  cache.set(cacheKey, { expiresAt: Date.now() + 60_000, items });
  return items;
}
