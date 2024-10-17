import { RequestHandler } from "express";
import PostSchema, { Post } from "../models/Post";
import UserSchema from "../models/User";
import createHttpError from "http-errors";
import mongoose from "mongoose";
interface EditPost extends Post {
  edited_by: string;
}
export const createPost: RequestHandler<
  unknown,
  unknown,
  Post,
  unknown
> = async (req, res, next) => {
  try {
    const { posted_by, title, body, image } = req.body;
    if (!posted_by || !title || !body)
      throw createHttpError(400, "Bad Request");
    if (!mongoose.Types.ObjectId.isValid(posted_by)) {
      return next(createHttpError(400, "Invalid user ID format"));
    }
    const user = await UserSchema.findOne({ _id: posted_by });
    if (!user)
      throw createHttpError(
        401,
        "You are not authenticated,please create an account to post"
      );

    const newPost = await PostSchema.create({ posted_by, title, body, image });
    res.status(200).json(newPost);
    // res.status(200).json(user?.toObject());
  } catch (error) {
    next(error);
  }
};

export const editPost: RequestHandler<
  unknown,
  unknown,
  EditPost,
  unknown
> = async (req, res, next) => {
  try {
    res.status(200).json({ message: "You can now edit" });
  } catch (error) {
    next(error);
  }
};
