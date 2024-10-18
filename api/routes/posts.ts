import { Router } from "express";
import * as PostController from "../controllers/posts";
import { authenticateToken, verifyUser } from "../middlewares";

const router = Router();

router.post("/create-post", authenticateToken, PostController.createPost);
router.post("/edit-post/:postId", verifyUser, PostController.editPost);
router.delete("/delete-post/:postId", verifyUser, PostController.deletePost);
router.get(
  "/get-user-post/:userId",
  verifyUser,
  PostController.getPostsByUserId
);
router.get("/get-few-posts", PostController.getFewPosts);
export default router;
