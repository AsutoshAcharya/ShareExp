import { RequestHandler } from "express";
import PostModel, { Post } from "../models/Post";
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

    const newPost = await PostModel.create({ posted_by, title, body, image });
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
    const post = await PostModel.findById({ _id: postId });
    if (!post) throw createHttpError(404, "Post not found");
    await PostModel.updateOne(
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
    const post = await PostModel.findById({ _id: postId });
    if (!post) throw createHttpError(404, "Post not found");
    await PostModel.deleteOne({ _id: postId });
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
    const allUserSpecificPosts = await PostModel.find({ posted_by: userId });
    res.status(200).json(allUserSpecificPosts);
  } catch (error) {
    next(error);
  }
};

export const getFewPosts: RequestHandler<
  any,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const top5Posts = await PostModel.aggregate([
      {
        $addFields: {
          posted_by: { $toObjectId: "$posted_by" },
          // Convert posted_by to ObjectId
          //because the posted_by is saved as string and in users table its ObjectId
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "posted_by",
          foreignField: "_id",
          as: "user_details",
        },
      },
      {
        $unwind: "$user_details", // Unwind the user_details array to deconstruct it
      },
      {
        $project: {
          _id: 1,
          title: 1,
          body: 1,
          posted_by: 1,
          image: 1,
          total_likes: 1,
          total_comments: 1,
          createdAt: 1,
          updatedAt: 1,
          created_by_id: "$user_details._id",
          created_by: "$user_details.user_name",
          email: "$user_details.email",
          country: "$user_details.country",
          company: "$user_details.company",
          profile_picture: "$user_details.profile_picture",
        },
      },
      {
        $limit: 5,
      },
    ]);
    // console.log(top5Posts);
    res.status(200).send(top5Posts);
  } catch (error) {
    next(error);
  }
};
export const getAllPosts: RequestHandler<any, unknown, unknown, unknown> = (
  req,
  res,
  next
) => {
  //implement offset
};
