"use client";

import Link from "next/link";
import { useState } from "react";
import "./signin.css";

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return <main className="signin-page">
    <header className="signin-nav"><Link href="/" className="signin-brand"><span className="signin-brand-mark">C</span><span>CINEATLAS</span></Link><Link href="/explore" className="signin-explore">Continue as guest <span>↗</span></Link></header>
    <section className="signin-layout">
      <aside className="signin-story" aria-label="CineAtlas introduction"><p className="signin-kicker"><i /> FIELD ACCESS / 2026</p><div><p className="signin-count">08,420</p><p className="signin-count-caption">locations waiting<br />to be rediscovered</p></div><blockquote>“The world is a stage —<br /><em>keep a record of it.</em>”</blockquote><div className="signin-coordinate"><span>YOUR NEXT FRAME</span><code>EXPLORE · COLLECT · CONTRIBUTE</code></div></aside>
      <section className="signin-panel" aria-labelledby="signin-title"><div className="signin-panel-top"><span>MEMBER ACCESS</span><span>01 / 01</span></div><div className="signin-copy"><p className="eyebrow">WELCOME BACK</p><h1 id="signin-title">Return to<br /><em>the atlas.</em></h1><p>Sign in to save the scenes that stay with you, and add the ones you found.</p></div><form className="signin-form" onSubmit={(event) => { event.preventDefault(); setMessage("Authentication will be connected after the secure account migration."); }}><label>Email address<input required type="email" autoComplete="email" placeholder="you@example.com" /></label><label>Password<span className="password-input"><input required type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="••••••••" /><button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? "Hide" : "Show"}</button></span></label><div className="signin-options"><label className="remember-me"><input type="checkbox" /> <span>Keep me signed in</span></label><a href="#password-recovery">Forgot password?</a></div>{message && <p className="form-success">{message}</p>}<button type="submit" className="signin-submit">Enter CineAtlas <span>→</span></button></form><p className="signin-switch">New to CineAtlas? <Link href="/register">Create an account <span>→</span></Link></p></section>
    </section>
  </main>;
}
