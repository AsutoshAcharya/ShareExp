import { RequestHandler } from "express";
import PostSchema, { Post } from "../models/Post";
import UserSchema from "../models/User";
import createHttpError from "http-errors";
import mongoose from "mongoose";
interface EditPost extends Post {
  edited_by: string;
}
interface PostParams {
  postId: string;
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

export const editPost: RequestHandler<any, unknown, EditPost, unknown> = async (
  req,
  res,
  next
) => {
  try {
    const { postId } = req?.params || {};
    const { title, body, image } = req.body;
    if (!postId || !title || !body) throw createHttpError(400, "Bad Request");
    const post = await PostSchema.findById({ _id: postId });
    if (!post) throw createHttpError(404, "Post not found");
    await PostSchema.updateOne(
      { _id: postId },
      { $set: { title, body, image } }
    );
    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deletePost: RequestHandler<
  any,
  unknown,
  EditPost,
  unknown
> = async (req, res, next) => {
  try {
    const { postId } = req?.params || {};
    if (!postId) throw createHttpError(400, "Bad Request,No postId");
    const post = await PostSchema.findById({ _id: postId });
    if (!post) throw createHttpError(404, "Post not found");
    await PostSchema.deleteOne({ _id: postId });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getPostsByUserId: RequestHandler<
  any,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { userId } = req?.params || {};
    if (!userId) throw createHttpError(404, "User not found,please register");
    const allUserSpecificPosts = await PostSchema.find({ posted_by: userId });
    res.status(200).json(allUserSpecificPosts);
  } catch (error) {
    next(error);
  }
};
