import bcrypt from "bcryptjs";
import { db } from "../../prisma/db.js";
import { type AuthenticatedUser, toSafeUser } from "../utils/auth.js";

const BCRYPT_ROUNDS = 12;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class AuthError extends Error {
  constructor(public readonly status: number, message: string) { super(message); }
}

type UserRow = AuthenticatedUser & { passwordHash: string | null };

function isUniqueViolation(error: unknown) {
  return typeof error === "object" && error !== null && "sqlState" in error && (error as { sqlState?: string }).sqlState === "23505";
}

export function normalizeEmail(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function slugify(name: string) {
  const slug = name.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return slug || "member";
}

async function findByEmail(email: string) {
  return db.orm.public.User.first({ email }) as Promise<UserRow | null>;
}

async function findById(id: number) {
  return db.orm.public.User.first({ id }) as Promise<UserRow | null>;
}

async function usernameCandidate(base: string) {
  for (let suffix = 1; suffix <= 100; suffix += 1) {
    const username = suffix === 1 ? base : `${base}-${suffix}`;
    const existing = await db.orm.public.User.first({ username });
    if (!existing) return username;
  }
  return `${base}-${Date.now().toString(36)}`;
}

export async function register(input: Record<string, unknown>) {
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = normalizeEmail(input.email);
  const password = typeof input.password === "string" ? input.password : "";
  const confirmPassword = typeof input.confirmPassword === "string" ? input.confirmPassword : "";
  if (!name || !email || !password || !confirmPassword) throw new AuthError(400, "Name, email, password, and password confirmation are required.");
  if (!EMAIL_PATTERN.test(email)) throw new AuthError(400, "Enter a valid email address.");
  if (password.length < 8) throw new AuthError(400, "Password must be at least 8 characters.");
  if (password !== confirmPassword) throw new AuthError(400, "Passwords do not match.");
  if (await findByEmail(email)) throw new AuthError(409, "An account with that email already exists.");

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
  const base = slugify(name).slice(0, 56);
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const username = await usernameCandidate(base);
    try {
      const user = await db.orm.public.User.create({ name, email, passwordHash, username, role: "USER" }) as UserRow;
      return toSafeUser(user);
    } catch (error) {
      if (!isUniqueViolation(error)) throw error;
      const duplicateEmail = await findByEmail(email);
      if (duplicateEmail) throw new AuthError(409, "An account with that email already exists.");
    }
  }
  throw new AuthError(409, "Unable to create a unique username. Please try again.");
}

export async function login(input: Record<string, unknown>) {
  const email = normalizeEmail(input.email);
  const password = typeof input.password === "string" ? input.password : "";
  if (!email || !password) throw new AuthError(400, "Email and password are required.");
  const user = await findByEmail(email);
  if (!user?.passwordHash || !(await bcrypt.compare(password, user.passwordHash))) throw new AuthError(401, "Invalid email or password.");
  return toSafeUser(user);
}

export async function authenticatedUser(userId: number) {
  const user = await findById(userId);
  return user ? toSafeUser(user) : null;
}
