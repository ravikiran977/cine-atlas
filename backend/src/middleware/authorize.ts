import type { NextFunction, Request, Response } from "express";
import type { Role } from "../utils/auth.js";

export function authorize(...roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.authUser) return res.status(401).json({ success: false, message: "Authentication is required." });
    if (!roles.includes(req.authUser.role as Role)) return res.status(403).json({ success: false, message: "You do not have permission to perform this action." });
    next();
  };
}
