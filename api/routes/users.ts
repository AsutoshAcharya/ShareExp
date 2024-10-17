import express from "express";
import * as UserController from "../controllers/users";

const router = express.Router();

router.post("/signup", UserController.signUp);
router.post("/login", UserController.logIn);
router.get("/get-user-info/:userId", UserController.getUserInfo);
export default router;
