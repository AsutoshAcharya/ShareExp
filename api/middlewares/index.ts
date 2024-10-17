import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { CustomError } from "../types";

export interface CustomRequest extends Request {
  user?: any;
}

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
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["x-access-token"] as string;
  console.log(token);
  if (!token) {
    return next(createHttpError(401, "Access token required"));
  }

  jwt.verify(token, process.env.jwt!, (err, user) => {
    if (err) {
      return next(createHttpError(403, "Invalid token"));
    }

    req.user = user;
    next();
  });
};

export const verifyUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  authenticateToken(req, res, next);
  const { userId, role } = req?.user;
  if (userId !== req?.body?.edited_by) {
    throw createHttpError(404, "You are not authorized to edit this post");
  }
  next();
};
