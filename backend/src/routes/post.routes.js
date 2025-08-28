import { Router } from "express";
import { newPost } from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// router.route("/create-post").post(verifyJWT, newPost);

router.post(
  "/create-post",
  verifyJWT,
  upload.fields([{ name: "postImage", maxCount: 1 }]),
  newPost
);

export default router;
