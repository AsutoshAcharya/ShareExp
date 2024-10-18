import express from "express";
import * as UserController from "../controllers/users";
import { verifyUser } from "../middlewares";

const router = express.Router();

router.post("/signup", UserController.signUp);
router.post("/login", UserController.logIn);
router.get("/get-user-info/:userId", UserController.getUserInfo);
router.post("/edit-user/:userId", verifyUser, UserController.editUser);
export default router;
