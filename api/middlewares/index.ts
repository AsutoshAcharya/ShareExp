import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { CustomError } from "../types";
export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(500).json({ error: err?.message || "Something Went Wrong" });
};

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["x-access-token"] as string;
  console.log(token);
  if (!token) {
    return next(createHttpError(401, "Access token required"));
  }

  jwt.verify(token, process.env.jwt!, (err, userId) => {
    console.log(userId);
    if (err) {
      return next(createHttpError(403, "Invalid token"));
    }

    req.body.userId = userId;
    next();
  });
};
