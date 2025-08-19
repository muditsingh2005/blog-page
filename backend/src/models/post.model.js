import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    minlength: 3,
  },
  postImage: {
    type: String, //cloudinary url
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, // digg deep
    ref: "User",
    required: true,
  },
  Views: {
    type: Number,
    default: 0,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
});

export const Post = mongoose.model("Post", postSchema);
