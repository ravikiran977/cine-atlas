export type AuthUser = { id: number; username: string | null; email: string; name: string | null; role: string };
type ApiResponse<T> = { success: boolean; data?: T; message?: string };

const apiOrigin = () => process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function request<T>(path: string, options: RequestInit = {}) {
  let response: Response;
  try {
    response = await fetch(`${apiOrigin()}/api/auth${path}`, { credentials: "include", ...options, headers: { "Content-Type": "application/json", ...options.headers } });
  } catch { throw new Error("Unable to reach CineAtlas. Please try again."); }
  const body = await response.json().catch(() => ({})) as ApiResponse<T>;
  if (!response.ok || !body.success) throw new Error(body.message || "Something went wrong. Please try again.");
  return body.data as T;
}

export const authApi = {
  register: (input: { name: string; email: string; password: string; confirmPassword: string }) => request<{ user: AuthUser }>("/register", { method: "POST", body: JSON.stringify(input) }),
  login: (input: { email: string; password: string }) => request<{ user: AuthUser }>("/login", { method: "POST", body: JSON.stringify(input) }),
  logout: () => request<{ message: string }>("/logout", { method: "POST" }),
  getCurrentUser: () => request<{ user: AuthUser }>("/me"),
};
