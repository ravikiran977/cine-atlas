"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { authApi, type AuthUser } from "../lib/auth-api";

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  login: (input: { email: string; password: string }) => Promise<AuthUser>;
  register: (input: { name: string; email: string; password: string; confirmPassword: string }) => Promise<AuthUser>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(async () => { try { setUser((await authApi.getCurrentUser()).user); } catch { setUser(null); } finally { setLoading(false); } }, []);
  useEffect(() => { void refresh(); }, [refresh]);
  const value = useMemo<AuthContextValue>(() => ({
    user, loading, refresh,
    login: async (input) => { const nextUser = (await authApi.login(input)).user; setUser(nextUser); return nextUser; },
    register: async (input) => { const nextUser = (await authApi.register(input)).user; setUser(nextUser); return nextUser; },
    logout: async () => { await authApi.logout(); setUser(null); },
  }), [loading, refresh, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider.");
  return context;
}
