import type { NextFunction, Request, Response } from "express";
import { authenticatedUser } from "../services/auth.service.js";
import { AUTH_COOKIE_NAME, readCookie, verifyAccessToken } from "../utils/auth.js";

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const token = readCookie(req.headers.cookie, AUTH_COOKIE_NAME);
    const userId = token ? verifyAccessToken(token) : null;
    if (!userId) return res.status(401).json({ success: false, message: "Authentication is required." });
    const user = await authenticatedUser(userId);
    if (!user) return res.status(401).json({ success: false, message: "Authentication is required." });
    req.authUser = user;
    next();
  } catch (error) { next(error); }
}
