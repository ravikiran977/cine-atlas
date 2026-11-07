import Link from "next/link";

export function SiteNav({ action = "Sign in", href = "/login" }: { action?: string; href?: string }) {
  return <header className="site-nav"><Link href="/" className="brand"><span className="brand-mark">C</span> CINEATLAS</Link><nav><Link href="/explore">Explore map</Link><Link href="/movies/1">Films & series</Link><Link href="/add-location">Contribute</Link></nav><Link className="nav-action" href={href}>{action} <span>↗</span></Link></header>;
}
