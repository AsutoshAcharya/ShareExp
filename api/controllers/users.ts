import { NextFunction, RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Some } from "../utils/Some";

interface SignUpBody {
  user_name?: string;
  email?: string;
  password?: string;
  phone?: string;
  country?: string;
  year_of_experience?: string;
  role?: string;
  company?: string;
  skills?: Array<string>;
  profile_picture?: string;
  about?: string;
  socials?: Array<{
    type: string;
    link: string;
  }>;
}

async function findErrorInUserBody(
  user: SignUpBody,
  callback: (passwordRaw?: string) => Promise<void>,
  next: NextFunction
) {
  try {
    const {
      user_name,
      email,
      password: passwordRaw,
      phone,
      country,
      year_of_experience,
    } = user;

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

    let errorKeys: string[] = [];
    const fieldsToCheck = { user_name, email, phone };

    for (const key of Object.keys(fieldsToCheck)) {
      const value = fieldsToCheck[key as keyof typeof fieldsToCheck];
      if (value) {
        const existingUserData = await UserModel.findOne({
          [key]: value,
        }).exec();

        if (existingUserData) {
          errorKeys.push(key);
        }
      }
    }

    if (errorKeys.length > 0) {
      throw createHttpError(
        409,
        `${errorKeys.join(", ")} ${
          errorKeys.length > 1 ? "are" : "is"
        } already taken, please choose a different one`
      );
    }
    await callback(passwordRaw);
  } catch (error) {
    next(error);
  }
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  try {
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
      socials,
    } = req.body;
    findErrorInUserBody(
      req?.body,
      async (passwordRaw = "") => {
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
          socials,
        });
        res.status(201).json(newUser);
      },
      next
    );
  } catch (error) {
    next(error);
  }
};
export const logIn: RequestHandler<
  unknown,
  unknown,
  Pick<SignUpBody, "email" | "password">,
  unknown
> = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw createHttpError(400, "No input given");
    const user = await UserModel.findOne({ email }).select("+email +password");
    if (!user) {
      throw createHttpError(404, "User is not registered");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw createHttpError(401, "Invalid password");

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.jwt!,
      {
        expiresIn: "1h",
      }
    );
    const { password: pw, ...userData } = user.toObject();
    res.status(200).json({
      token,
      user: userData,
    });
  } catch (error) {
    next(error);
  }
};
export const getUserInfo: RequestHandler<
  any,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const { userId } = req?.params || {};
    if (!userId) throw createHttpError(404, "User not found");
    const accessUser = req.headers["x-access-user"] as string;
    const user = await UserModel.findById({ _id: userId }).select(
      accessUser === userId ? "+email" : ""
    );
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const editUser: RequestHandler<any, unknown, SignUpBody, unknown> = (
  req,
  res,
  next
) => {
  try {
    const { userId } = Some.Object(req?.params || {});
    if (!userId) throw createHttpError(400, "Parameter missing");
    findErrorInUserBody(
      req?.body,
      async (passwordRaw = "") => {
        const {
          user_name,
          email,
          phone,
          country,
          year_of_experience,
          company,
          skills,
          profile_picture,
          about,
          socials,
        } = req.body;

        const updatedUser = await UserModel.updateOne(
          { _id: userId },
          {
            $set: {
              user_name,
              email,
              phone,
              country,
              year_of_experience,
              company,
              skills,
              profile_picture,
              about,
              socials,
            },
          }
        );
        res.status(200).json(updatedUser);
      },
      next
    );
  } catch (error) {
    next(error);
  }
};
