import type { CookieOptions } from "express";
import jwt from "jsonwebtoken";

export const AUTH_COOKIE_NAME = "cineatlas_token";
export const ROLES = ["USER", "CONTRIBUTOR", "MODERATOR", "ADMIN"] as const;
export type Role = (typeof ROLES)[number];

export type AuthenticatedUser = {
  id: number;
  username: string | null;
  email: string;
  name: string | null;
  role: string;
};

type TokenPayload = { sub: string; type: "access" };

function requiredJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32 || /replace-with|change-me|example/i.test(secret)) {
    throw new Error("Authentication is not configured: JWT_SECRET must be a non-placeholder value of at least 32 characters.");
  }
  return secret;
}

function jwtExpiresIn() {
  return process.env.JWT_EXPIRES_IN?.trim() || "7d";
}

function cookieSecure() {
  const configured = process.env.COOKIE_SECURE?.trim().toLowerCase();
  if (configured === "true") return true;
  if (configured === "false") return false;
  return process.env.NODE_ENV === "production";
}

function cookieSameSite(): CookieOptions["sameSite"] {
  const configured = process.env.COOKIE_SAME_SITE?.trim().toLowerCase();
  if (!configured) return "lax";
  if (configured === "lax" || configured === "strict" || configured === "none") return configured;
  throw new Error("Authentication is not configured: COOKIE_SAME_SITE must be lax, strict, or none.");
}

function maxAgeMilliseconds(expiresIn: string) {
  const match = /^(\d+)\s*(s|m|h|d)$/i.exec(expiresIn);
  if (!match) return 7 * 24 * 60 * 60 * 1000;
  const value = Number(match[1]);
  const units = { s: 1_000, m: 60_000, h: 3_600_000, d: 86_400_000 } as const;
  return value * units[match[2].toLowerCase() as keyof typeof units];
}

export function authCookieOptions(includeLifetime = true): CookieOptions {
  const secure = cookieSecure();
  const sameSite = cookieSameSite();
  if (sameSite === "none" && !secure) {
    throw new Error("Authentication is not configured: COOKIE_SAME_SITE=none requires COOKIE_SECURE=true.");
  }
  return {
    httpOnly: true,
    path: "/",
    secure,
    sameSite,
    ...(includeLifetime ? { maxAge: maxAgeMilliseconds(jwtExpiresIn()) } : {}),
  };
}

export function createAccessToken(userId: number) {
  return jwt.sign({ type: "access" }, requiredJwtSecret(), { subject: String(userId), expiresIn: jwtExpiresIn() as jwt.SignOptions["expiresIn"] });
}

export function verifyAccessToken(token: string): number | null {
  try {
    const payload = jwt.verify(token, requiredJwtSecret()) as TokenPayload;
    if (payload.type !== "access" || !/^\d+$/.test(payload.sub)) return null;
    return Number(payload.sub);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) return null;
    throw error;
  }
}

export function readCookie(header: string | undefined, name: string) {
  if (!header) return undefined;
  const pair = header.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
  if (!pair) return undefined;
  try { return decodeURIComponent(pair.slice(name.length + 1)); } catch { return undefined; }
}

export function toSafeUser(user: AuthenticatedUser): AuthenticatedUser {
  return { id: user.id, username: user.username, email: user.email, name: user.name, role: user.role };
}
