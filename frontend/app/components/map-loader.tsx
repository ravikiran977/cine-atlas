"use client";
import dynamic from "next/dynamic";

export const FeatureMap = dynamic(
  () => import("./feature-map").then((module) => module.FeatureMap),
  { ssr: false, loading: () => <div className="map-loading">Loading map…</div> },
);
