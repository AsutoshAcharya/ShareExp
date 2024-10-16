import express from "express";
import * as UserController from "../controllers/users";

const router = express.Router();

router.post("/signup", UserController.signUp);
router.post("/login", UserController.logIn);

export default router;
