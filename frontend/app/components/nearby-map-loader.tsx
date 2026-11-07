"use client";

import dynamic from "next/dynamic";

export const NearbyMap = dynamic(
  () => import("./nearby-map").then((module) => module.NearbyMap),
  { ssr: false, loading: () => <div className="nearby-map-loading">Loading your map…</div> },
);
