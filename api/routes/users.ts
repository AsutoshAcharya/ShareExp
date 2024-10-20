import express from "express";
import * as UserController from "../controllers/users";
import * as RatingController from "../controllers/rating";
import { authenticateToken, verifyUser } from "../middlewares";

const router = express.Router();

router.post("/signup", UserController.signUp);
router.post("/login", UserController.logIn);
router.get("/get-user-info/:userId", UserController.getUserInfo);
router.post("/edit-user/:userId", verifyUser, UserController.editUser);

router.post("/give-rating", authenticateToken, RatingController.giveRating);
router.delete(
  "/remove-rating",
  authenticateToken,
  RatingController.removeRating
);

export default router;
