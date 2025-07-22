import { Request, Response, NextFunction } from "express";

export function errorInterceptor(
  err: { status: number; message: string },
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (err.status && err.message) {
    res.status(err.status).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Internal server error" });
  }
}
