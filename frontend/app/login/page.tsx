"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../components/auth-provider";
import "./signin.css";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setMessage("");
    if (!email.trim() || !password) return setMessage("Email and password are required.");
    setSubmitting(true);
    try { await login({ email, password }); router.push("/explore"); router.refresh(); } catch (error) { setMessage(error instanceof Error ? error.message : "Unable to sign in."); } finally { setSubmitting(false); }
  };
  return <main className="signin-page">
    <header className="signin-nav"><Link href="/" className="signin-brand"><span className="signin-brand-mark">C</span><span>CINEATLAS</span></Link><Link href="/explore" className="signin-explore">Continue as guest <span>↗</span></Link></header>
    <section className="signin-layout">
      <aside className="signin-story" aria-label="CineAtlas introduction"><p className="signin-kicker"><i /> FIELD ACCESS / 2026</p><div><p className="signin-count">08,420</p><p className="signin-count-caption">locations waiting<br />to be rediscovered</p></div><blockquote>“The world is a stage —<br /><em>keep a record of it.</em>”</blockquote><div className="signin-coordinate"><span>YOUR NEXT FRAME</span><code>EXPLORE · COLLECT · CONTRIBUTE</code></div></aside>
      <section className="signin-panel" aria-labelledby="signin-title"><div className="signin-panel-top"><span>MEMBER ACCESS</span><span>01 / 01</span></div><div className="signin-copy"><p className="eyebrow">WELCOME BACK</p><h1 id="signin-title">Return to<br /><em>the atlas.</em></h1><p>Sign in to save the scenes that stay with you, and add the ones you found.</p></div><form className="signin-form" onSubmit={submit}><label>Email address<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="you@example.com" /></label><label>Password<span className="password-input"><input required value={password} onChange={(event) => setPassword(event.target.value)} type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="••••••••" /><button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? "Hide" : "Show"}</button></span></label><div className="signin-options"><span>Secure 7-day session</span><a href="#password-recovery">Forgot password?</a></div>{message && <p className="form-success" role="alert">{message}</p>}<button disabled={submitting} type="submit" className="signin-submit">{submitting ? "Signing in…" : <>Enter CineAtlas <span>→</span></>}</button></form><p className="signin-switch">New to CineAtlas? <Link href="/register">Create an account <span>→</span></Link></p></section>
    </section>
  </main>;
}
