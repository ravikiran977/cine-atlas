"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../components/auth-provider";
import "./register.css";

export default function RegisterPage() {
  const router = useRouter(); const { register } = useAuth();
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(""); const [showPassword, setShowPassword] = useState(false); const [submitting, setSubmitting] = useState(false);
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setMessage("");
    if (!name.trim() || !email.trim() || !password || !confirmPassword) return setMessage("Please complete all account fields.");
    if (password.length < 8) return setMessage("Password must be at least 8 characters.");
    if (password !== confirmPassword) return setMessage("Passwords do not match.");
    setSubmitting(true);
    try { await register({ name, email, password, confirmPassword }); router.push("/explore"); router.refresh(); } catch (error) { setMessage(error instanceof Error ? error.message : "Unable to create your account."); } finally { setSubmitting(false); }
  };
  return <main className="register-page">
    <header className="register-nav"><Link href="/" className="register-brand"><span className="register-brand-mark">C</span><span>CINEATLAS</span></Link><p>Already a member? <Link href="/login">Sign in <span>→</span></Link></p></header>
    <section className="register-layout">
      <div className="register-intro"><p className="register-kicker">START YOUR COLLECTION</p><h1>Every scene<br />has a <em>place.</em></h1><p>Build your own archive of the streets, landscapes, and stories that make cinema unforgettable.</p><div className="register-route"><span className="route-pin one">1</span><i /><span className="route-pin two">2</span><i /><span className="route-pin three">3</span><div><b>DISCOVER</b><b>COLLECT</b><b>CONTRIBUTE</b></div></div><p className="register-note">A personal field guide for the<br />curiously cinematic.</p></div>
      <section className="register-card" aria-labelledby="register-title"><div className="register-step"><span>CREATE YOUR ACCOUNT</span><b>STEP 01 <i /> 01</b></div><div className="register-copy"><p className="eyebrow">JOIN CINEATLAS</p><h2 id="register-title">Make it<br /><em>yours.</em></h2></div><form className="register-form" onSubmit={submit}><label>Display name<input required value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" placeholder="How should we know you?" /></label><label>Email address<input required value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" placeholder="you@example.com" /></label><label>Password<span className="register-password"><input required value={password} onChange={(event) => setPassword(event.target.value)} minLength={8} type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="At least 8 characters" /><button type="button" onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? "Hide" : "Show"}</button></span></label><label>Confirm password<input required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} minLength={8} type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="Repeat your password" /></label><label className="register-terms"><input required type="checkbox" /><span>I agree to the <a href="#terms">Terms of Use</a> and <a href="#privacy">Privacy Policy</a>.</span></label>{message && <p className="form-success" role="alert">{message}</p>}<button disabled={submitting} className="register-submit" type="submit">{submitting ? "Creating account…" : <>Create my atlas <span>→</span></>}</button></form><p className="register-login">Already have an account? <Link href="/login">Sign in instead</Link></p></section>
    </section>
  </main>;
}
