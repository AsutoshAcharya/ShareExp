import { Router } from "express";
import * as PostController from "../controllers/posts";
import { authenticateToken, verifyUser } from "../middlewares";

const router = Router();

router.post("/create-post", authenticateToken, PostController.createPost);
router.post("/edit-post", verifyUser, PostController.editPost);
export default router;
