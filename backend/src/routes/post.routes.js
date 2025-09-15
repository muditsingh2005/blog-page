import { Router } from "express";
import { newPost, likePost } from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post(
  "/create-post",
  verifyJWT,
  upload.fields([{ name: "postImage", maxCount: 1 }]),
  newPost
);

router.post("/like-post/:postId", verifyJWT, likePost);

export default router;
