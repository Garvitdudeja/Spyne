import express from "express";
import UserModel from "../models/Users.js";
import Auth from "../middleware/Auth.js";
import PostsModel from "../models/Posts.js";
import LikesModel from "../models/Likes.js";
import CommentModel from "../models/Comment.js";
import { userLogin, userSignUp } from "../Controller/auth.controller.js";

const router = express.Router();


router.post("/sign-up",  userSignUp);

router.post("/log-in", userLogin);






export default router;
