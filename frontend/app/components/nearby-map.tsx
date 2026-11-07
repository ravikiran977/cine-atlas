"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { locations, type AtlasLocation } from "../lib/demo-data";
import "leaflet/dist/leaflet.css";

type Position = [number, number];
const world: Position = [20, 8];
const userMarker = L.divIcon({ className: "nearby-user-wrap", html: '<span class="nearby-user-marker"><i></i></span>', iconSize: [28, 28], iconAnchor: [14, 14] });
const movieMarker = (location: AtlasLocation) => L.divIcon({ className: "nearby-movie-wrap", html: `<span class="nearby-movie-marker"><b>${location.film}</b><i></i></span>`, iconSize: [170, 48], iconAnchor: [16, 42] });

function distance(a: Position, b: Position) { const rad = (value: number) => value * Math.PI / 180; const dLat = rad(b[0] - a[0]); const dLng = rad(b[1] - a[1]); const x = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(dLng / 2) ** 2; return 6371 * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x)); }
function MapView({ userPosition, nearest }: { userPosition?: Position; nearest?: AtlasLocation }) { const map = useMap(); useEffect(() => { if (!userPosition) return; if (nearest) map.fitBounds([userPosition, nearest.coordinates], { padding: [90, 90], maxZoom: 7, animate: true }); else map.flyTo(userPosition, 7, { animate: true }); }, [map, nearest, userPosition]); return null; }
function ZoomWatcher({ onChange }: { onChange: (zoom: number) => void }) { useMapEvents({ zoomend: (event) => onChange(event.target.getZoom()) }); return null; }

export function NearbyMap() {
  const [userPosition, setUserPosition] = useState<Position>(); const [showAll, setShowAll] = useState(false); const [locationStatus, setLocationStatus] = useState("Locating you…");
  const nearest = useMemo(() => userPosition ? [...locations].sort((a, b) => distance(userPosition, a.coordinates) - distance(userPosition, b.coordinates))[0] : locations[0], [userPosition]);
  const visibleLocations = showAll ? locations : nearest ? [nearest] : [];
  useEffect(() => { if (!navigator.geolocation) { window.setTimeout(() => setLocationStatus("Choose a place on the map to begin."), 0); return; } navigator.geolocation.getCurrentPosition(({ coords }) => { setUserPosition([coords.latitude, coords.longitude]); setLocationStatus("Your position is on the map."); }, () => setLocationStatus("Location access is off — showing a featured filming location."), { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }); }, []);
  return <section className="nearby-map-shell" aria-label="Filming locations map"><MapContainer center={world} zoom={3} minZoom={2} scrollWheelZoom className="nearby-map"><TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /><MapView userPosition={userPosition} nearest={nearest} /><ZoomWatcher onChange={(nextZoom) => { if (nextZoom <= 4) setShowAll(true); }} />{userPosition && <Marker position={userPosition} icon={userMarker}><Popup>You are here</Popup></Marker>}{visibleLocations.map((location) => <Marker key={location.id} position={location.coordinates} icon={movieMarker(location)}><Popup><div className="map-popup"><strong>{location.name}</strong><span>{location.city}, {location.country}</span><Link href={`/locations/${location.id}`}>View location →</Link></div></Popup></Marker>)}</MapContainer><div className="nearby-map-hint"><span className="hint-dot" />{showAll ? "The full CineAtlas is in view" : "Zoom out to uncover more movie locations"}</div><div className="nearby-map-caption"><p>{nearest?.film}</p><strong>{nearest?.name}</strong><span>{nearest?.city}, {nearest?.country}</span></div><p className="nearby-location-status">{locationStatus}</p></section>;
}
