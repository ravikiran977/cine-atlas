import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import "./cinemapper.css";
import "./tmdb.css";
import { AuthProvider } from "./components/auth-provider";
const sans = Inter({ variable: "--font-sans", subsets: ["latin"] });
const display = Newsreader({ variable: "--font-display", subsets: ["latin"], style: ["normal", "italic"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], weight: "500" });
export const metadata: Metadata = { title: "CineAtlas — Discover where cinema came to life", description: "Global cinema cartography and filming location scouting." };
export default function RootLayout({ children }: LayoutProps<"/">) { return <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}><body><AuthProvider>{children}</AuthProvider></body></html>; }
