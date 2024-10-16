import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/User";
import bcrypt from "bcryptjs";
interface SignUpBody {
  user_name?: string;
  email?: string;
  password?: string;
  phone?: string;
  country?: string;
  year_of_experience?: string;
  role?: string;
  company?: string;
  skills?: string;
  profile_picture?: string;
  about?: string;
}
export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const {
    user_name,
    email,
    password: passwordRaw,
    phone,
    country,
    year_of_experience,
    company,
    skills,
    profile_picture,
    about,
  } = req.body;

  try {
    if (
      !user_name ||
      !phone ||
      !passwordRaw ||
      !email ||
      !country ||
      !year_of_experience
    ) {
      throw createHttpError(400, "Parameters missing");
    }
    let errorkeys: string[] = [];
    const fieldsToCheck = { user_name, email, phone };
    for (const key of Object.keys(fieldsToCheck)) {
      const value = fieldsToCheck[key as keyof typeof fieldsToCheck];
      if (value) {
        const existingUserData = await UserModel.findOne({
          [key]: value,
        }).exec();
        if (existingUserData) {
          errorkeys.push(key);
        }
      }
    }
    if (errorkeys.length > 0) {
      throw createHttpError(
        409,
        `${errorkeys.join(", ")} ${
          errorkeys.length > 1 ? "are" : "is"
        } already taken, please choose a different one`
      );
    }
    const passwordHash = await bcrypt.hash(passwordRaw, 10);

    const newUser = await UserModel.create({
      user_name,
      email,
      password: passwordHash,
      phone,
      country,
      year_of_experience,
      company,
      skills,
      profile_picture,
      about,
    });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
