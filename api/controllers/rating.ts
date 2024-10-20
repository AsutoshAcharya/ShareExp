import UserModel from "../models/User";
import RatingModel from "../models/Rating";
import { RequestHandler } from "express";
import { UserRating } from "./type";
import createHttpError from "http-errors";

const availableRating = [1, 2, 3, 4, 5];

export const giveRating: RequestHandler<
  any,
  unknown,
  UserRating,
  unknown
> = async (req, res, next) => {
  try {
    const { rated_user_id, giver_user_id, rating } = req.body;
    if (!rated_user_id || !giver_user_id || !rating)
      throw createHttpError(404, "Missing parameters");
    const ratedUser = await UserModel.findById({ _id: rated_user_id });
    if (!ratedUser) throw createHttpError(400, "Rated user does not exist");
    const giverUser = await UserModel.findById({ _id: giver_user_id });
    if (!giverUser) throw createHttpError(400, "Giver user does not exist");
    if (rated_user_id === giver_user_id)
      throw createHttpError(400, "You can not rate yourself only others can");
    if (!availableRating.includes(rating))
      throw createHttpError(400, "You can only rate the user from 1-5");
    const alreadyRatedTheUser = await RatingModel.find({
      rated_user_id,
      giver_user_id,
    });
    if (alreadyRatedTheUser.length > 0) {
      await RatingModel.findOneAndUpdate(
        {
          rated_user_id,
          giver_user_id,
        },
        { $set: { rating } }
      );
      res.status(200).json("Rating has been updated");
    } else {
      await RatingModel.create({ rated_user_id, giver_user_id, rating });
      res.status(200).json("User rating has been added");
    }
  } catch (error) {
    next(error);
  }
};

export const removeRating: RequestHandler<
  any,
  unknown,
  UserRating,
  unknown
> = async (req, res, next) => {
  try {
    const { giver_user_id, rated_user_id } = req.body;
    if (!rated_user_id || !giver_user_id)
      throw createHttpError(404, "Missing parameters");
    const ratedUser = await UserModel.findById({ _id: rated_user_id });
    if (!ratedUser) throw createHttpError(400, "Rated user does not exist");
    const giverUser = await UserModel.findById({ _id: giver_user_id });
    if (!giverUser) throw createHttpError(400, "Giver user does not exist");
    if (rated_user_id === giver_user_id)
      throw createHttpError(
        400,
        "You can not remove your rating only others can"
      );
    await RatingModel.findOneAndDelete({ rated_user_id, giver_user_id })
      .then((result) => {
        if (!result)
          throw createHttpError(
            404,
            "Rating not found please add rating to remove it"
          );
        res.status(200).json("Rating has been removed");
      })
      .catch((err) => next(err));
  } catch (error) {
    next(error);
  }
};
