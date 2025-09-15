import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from "../models/post.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";

const newPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if ([title, content].some((field) => field?.trim() == "")) {
    throw new ApiError(400, "All fields are required");
  }
  //
  const postImageLocalPath = req.files?.postImage[0]?.path;

  //upload on cloudinary

  const postImage = await uploadOnCloudinary(postImageLocalPath);

  //now create a object and send to db
  const post = await Post.create({
    title,
    content,
    postImage: postImage.url,
    author: req.user._id,
  });

  const createdPost = await Post.findById(post._id);

  if (!createdPost) {
    throw new ApiError(500, "Something went wrong while creating post");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdPost, "User registered successfully"));
});

const likePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.user;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    throw new ApiError(400, "Invalid post ID");
  }

  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  // Prevent duplicate likes
  if (post.likes.includes(userId)) {
    throw new ApiError(400, "You have already liked this post");
  }

  post.likes.push(userId);
  await post.save();

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post liked successfully"));
});

export { newPost, likePost };
