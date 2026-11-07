export type AtlasLocation = { id: number; name: string; city: string; country: string; coordinates: [number, number]; image: string; film: string; description?: string };
export const locations: AtlasLocation[] = [
  { id: 1, name: "Chaplin's Corner", city: "Los Angeles", country: "United States", coordinates: [34.101, -118.326] as [number, number], image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80", film: "Once Upon a Time... in Hollywood" },
  { id: 2, name: "Skellig Michael", city: "County Kerry", country: "Ireland", coordinates: [51.771, -10.54] as [number, number], image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80", film: "Star Wars: The Last Jedi" },
  { id: 3, name: "Vasquez Rocks", city: "Agua Dulce", country: "United States", coordinates: [34.477, -118.319] as [number, number], image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80", film: "Star Trek" },
  { id: 4, name: "Gion District", city: "Kyoto", country: "Japan", coordinates: [35.003, 135.778] as [number, number], image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80", film: "Memoirs of a Geisha" },
];
export const films = [
  { id: 1, title: "Once Upon a Time...", year: "2019", type: "FILM", count: 31, image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=85" },
  { id: 2, title: "The Last Jedi", year: "2017", type: "FILM", count: 14, image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=1200&q=85" },
  { id: 3, title: "The White Lotus", year: "2021", type: "SERIES", count: 22, image: "https://images.unsplash.com/photo-1470214304380-aadaedcfff1b?auto=format&fit=crop&w=1200&q=85" },
];
