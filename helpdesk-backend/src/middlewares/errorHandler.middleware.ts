import { Request, Response, NextFunction } from "express";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  if (err.message === "NotFound") {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(500).json({ message: "Internal server error" });
}
