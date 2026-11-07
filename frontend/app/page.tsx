import Link from "next/link";
import { NearbyMap } from "./components/nearby-map-loader";
import { UserLocation } from "./components/user-location";
import { films, locations } from "./lib/demo-data";

export default function Home() {
  return <main className="atlas-home">
    <header className="atlas-header"><div className="atlas-shell atlas-nav">
      <Link href="/" className="atlas-brand"><span className="atlas-emblem" aria-hidden="true"><i /></span><span>CineAtlas</span></Link>
      <UserLocation />
      <label className="atlas-search"><span>⌕</span><input aria-label="Search CineAtlas" placeholder="Search locations, titles, or cities" /><kbd>⌘K</kbd></label>
      <nav aria-label="Primary navigation"><Link href="/explore">Atlas</Link><Link href="/favourites">Collections</Link><Link href="/movies/1">Archive</Link><Link href="/login" className="atlas-signin">Sign in</Link></nav>
    </div></header>

    <section className="atlas-hero"><div className="atlas-shell hero-grid">
      <div className="hero-intro"><p className="telemetry-label">GLOBAL CINEMA CARTOGRAPHY · EST. 2026</p><h1>Discover where<br />cinema <em>came to life.</em></h1><p>Trace the exact streets, landscapes, and hidden corners behind the scenes you remember forever.</p><div className="hero-actions"><Link href="/explore" className="atlas-button">Explore the atlas <span>→</span></Link><Link href="/add-location" className="hero-text-link">Add a location <span>↗</span></Link></div></div>
      <div className="hero-coordinate"><span>FIELD NOTE / 040</span><code>40° 43&apos; 08.6&quot; N<br />74° 00&apos; 21.6&quot; W</code></div>
    </div></section>

    <section className="atlas-shell stats-strip" aria-label="CineAtlas statistics"><div><span>ARCHIVE INDEX</span><strong>8,420+</strong><small>Verified coordinates</small></div><div><span>SCREEN LIBRARY</span><strong>120+</strong><small>Titles in the archive</small></div><div><span><i className="live-dot" /> LIVE GPS RADAR</span><strong>Sub-meter</strong><small>Precision lock active</small></div></section>

    <section className="atlas-shell radar-section"><div className="section-lead"><div><p className="telemetry-label">SCOUTING RADAR / LIVE VIEW</p><h2>Places, <em>precisely</em> plotted.</h2></div><p>Follow the coordinates from your screen to the real world. Every pin carries a verified scene dossier.</p></div><div className="radar-frame"><NearbyMap /><div className="radar-tools"><button className="active">Local <small>5 km</small></button><button>City <small>25 km</small></button><button>Global</button></div><div className="radar-scale"><span /> 1.0 km</div></div></section>

    <section className="atlas-shell dossiers"><div className="section-lead"><div><p className="telemetry-label">CURATED DOSSIERS</p><h2>Famous scenes.<br /><em>Real coordinates.</em></h2></div><Link className="atlas-arrow-link" href="/explore">Browse all locations <span>→</span></Link></div><div className="dossier-grid">{locations.slice(0, 3).map((location, index) => <article className="dossier-card" key={location.id}><div className="dossier-still" style={{ backgroundImage: `url(${location.image})` }}><span>{index === 0 ? "ANAMORPHIC 35MM" : index === 1 ? "ZEISS F/1.2" : "PANAVISION PXL"}</span><b>{films[index]?.year ?? "1973"}</b></div><div className="dossier-body"><p>{location.film}</p><h3>{location.name}</h3><span>{location.city}, {location.country}</span><footer><code>{location.coordinates[0].toFixed(4)}° N</code><Link href={`/locations/${location.id}`}>View dossier →</Link></footer></div></article>)}</div></section>

    <section className="ar-banner"><div className="atlas-shell ar-content"><div><p className="telemetry-label">CINEATLAS AR / BETA</p><h2>Stand in the frame.</h2><p>Point your camera at a location and let the scene find you.</p></div><button className="ar-button"><span>◉</span> Engage Camera Lens AR <b>→</b></button></div></section>
    <footer className="atlas-shell atlas-footer"><span>© 2026 CINEATLAS</span><span>MADE FOR THE CURIOUSLY CINEMATIC</span><span>40.7128° N / 74.0060° W</span></footer>
  </main>;
}
