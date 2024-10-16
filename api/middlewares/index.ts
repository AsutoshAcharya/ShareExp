import { NextFunction, Request, Response } from "express";
import { CustomError } from "types/*";

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(500).json({ error: err?.message || "Something Went Wrong" });
};
