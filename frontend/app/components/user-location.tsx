"use client";

import { useEffect, useState } from "react";

type LocationState =
  | { label: "Locating you…"; coordinates: null }
  | { label: "Finding your area…"; coordinates: [number, number] }
  | { label: "Your location"; coordinates: [number, number] }
  | { label: string; coordinates: [number, number] }
  | { label: "Location unavailable"; coordinates: null };

const initialState: LocationState = { label: "Locating you…", coordinates: null };

export function UserLocation() {
  const [location, setLocation] = useState<LocationState>(initialState);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({ label: "Location unavailable", coordinates: null });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const coordinates: [number, number] = [coords.latitude, coords.longitude];
        setLocation({ label: "Finding your area…", coordinates });
        try {
          const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
          const response = await fetch(`${baseUrl}/api/reverse-geocode?lat=${coords.latitude}&lng=${coords.longitude}`);
          const body = await response.json() as { success: boolean; data?: { name?: string } };
          setLocation({ label: response.ok && body.success && body.data?.name ? body.data.name : "Your location", coordinates });
        } catch {
          setLocation({ label: "Your location", coordinates });
        }
      },
      () => setLocation({ label: "Location unavailable", coordinates: null }),
      { enableHighAccuracy: false, timeout: 10_000, maximumAge: 300_000 },
    );
  }, []);

  const coordinateLabel = location.coordinates
    ? `${Math.abs(location.coordinates[0]).toFixed(4)}° ${location.coordinates[0] >= 0 ? "N" : "S"}, ${Math.abs(location.coordinates[1]).toFixed(4)}° ${location.coordinates[1] >= 0 ? "E" : "W"}`
    : "—";

  return <div className="atlas-location" aria-live="polite"><span className="gps-dot" /> Detected: {location.label} <code>{coordinateLabel}</code></div>;
}
