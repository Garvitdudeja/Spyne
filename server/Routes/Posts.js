import express from "express";
import Auth from "../middleware/Auth.js";
import PostsModel from "../models/Posts.js";
import LikesModel from "../models/Likes.js";
import CommentModel from "../models/Comment.js";
import {
  LikeComment,
  LikePost,
  addPost,
  commentOnComment,
  commentOnPost,
  deletePost,
  dislikePost,
  getAllPost,
  getPostById,
} from "../Controller/posts.controller.js";

const router = express.Router();

router.post("/post", Auth, addPost);

router.post("/post/like/:postId", Auth, LikePost);

router.post("/post/dislike/:postId", Auth, dislikePost);

router.delete("/post/:postId", Auth, deletePost);

router.get("/post/:postId", Auth, getPostById);

// Add comment
router.post("/post/comment", Auth, commentOnPost);

//Comment a comment
router.post("/comment", Auth, commentOnComment);

// like a comment
router.post("/comment/like", Auth, LikeComment);

router.get("/post", Auth, getAllPost);

export default router;
