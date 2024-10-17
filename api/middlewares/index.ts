import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { CustomError } from "../types";
import { Some } from "../utils/Some";

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
  authenticateToken(req, res, () => {
    const { userId, role } = Some.Object(req?.user);
    // console.log(req?.user, req?.body?.post_owner);
    if (Some.String(userId) === Some.String(req?.body?.post_owner)) {
      return next();
    }
    throw createHttpError(404, "You are not authorized to edit this post");
  });
};
