import { Router, type Request, type Response, type NextFunction } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { AuthError, login, register } from "../services/auth.service.js";
import { AUTH_COOKIE_NAME, authCookieOptions, createAccessToken } from "../utils/auth.js";

const authRouter = Router();
const body = (req: Request) => (req.body && typeof req.body === "object" && !Array.isArray(req.body) ? req.body as Record<string, unknown> : {});
const sendAuthError = (error: unknown, res: Response, next: NextFunction) => {
  if (error instanceof AuthError) return res.status(error.status).json({ success: false, message: error.message });
  next(error);
};

authRouter.post("/register", async (req, res, next) => {
  try { const user = await register(body(req)); const token = createAccessToken(user.id); res.cookie(AUTH_COOKIE_NAME, token, authCookieOptions()); res.status(201).json({ success: true, data: { user } }); } catch (error) { sendAuthError(error, res, next); }
});
authRouter.post("/login", async (req, res, next) => {
  try { const user = await login(body(req)); const token = createAccessToken(user.id); res.cookie(AUTH_COOKIE_NAME, token, authCookieOptions()); res.json({ success: true, data: { user } }); } catch (error) { sendAuthError(error, res, next); }
});
authRouter.post("/logout", (req, res, next) => {
  try { res.clearCookie(AUTH_COOKIE_NAME, authCookieOptions(false)); res.json({ success: true, data: { message: "Logged out successfully." } }); } catch (error) { next(error); }
});
authRouter.get("/me", authenticate, (req, res) => res.json({ success: true, data: { user: req.authUser } }));

export { authRouter };
