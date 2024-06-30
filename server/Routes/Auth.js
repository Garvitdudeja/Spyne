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

router.get("/user/info", Auth, async (req, res) => {
  try {
    console.log("first")
    const UserId = req.user.UserId;
    const userData = await UserModel.findById({ _id: UserId }).lean();
    const postData = await PostsModel.find({ userId: UserId})
    userData["posts"] = postData
    return res.status(400).json(userData);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


router.get("/user/:id", Auth, async (req, res) => {
  try {
    console.log(req.params)
    const id = req.params.id;
    if(!id){
      return res.status(400).json({message:"Enter a valid User Id !"})
    }
    const userData = await UserModel.findById({ _id: id }).lean();
    if(!userData){
      return res.status(404).json({message:"No user found"});
    }
    const postData = await PostsModel.find({ userId: id}).populate("userId")
    userData["posts"] = postData
    return res.status(200).json(userData);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/users", Auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const searchQuery = search
      ? { userName: { $regex: search, $options: "i" } }
      : {};
    
    const aggregationPipeline = [
      { $match: searchQuery }, 
      { $skip: (pageNumber - 1) * limitNumber }, 
      { $limit: limitNumber }, 
      {
        $lookup: {
          from: 'posts', 
          localField: '_id',
          foreignField: 'userId',
          as: 'posts' 
        }
      },
      {
        $project: {
          _id: 1,
          userName: 1,
          email: 1,
          posts: 1,
        }
      }
    ];

    // Execute aggregation pipeline
    const usersWithPosts = await UserModel.aggregate(aggregationPipeline);

    // If no users are found, return an empty array
    if (usersWithPosts.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    // Extract totalUsers and totalPages from aggregation result
    const totalUsers = usersWithPosts[0].totalUsers;
    const totalPages = Math.ceil(totalUsers / limitNumber);

    // Return response with data
    return res.status(200).json({
      data: usersWithPosts,
      totalUsers,
      totalPages,
      currentPage: pageNumber,
      pageSize: limitNumber,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


router.patch("/user/info", Auth, async (req, res) => {
  try {
    const { userName, email, phoneNumber, image } = req.body;
    const userId = req.user.UserId;

    const updateQuery = {};

    if (userName) {
      updateQuery.userName = userName;
    }
    if (email) {
      const existingEmail = await UserModel.findOne({ email: email });
      if (existingEmail) {
        return res
          .status(400)
          .json({ error: "Email already exists user another" });
      }
      updateQuery.email = email;
    }
    if (phoneNumber) {
      updateQuery.phoneNumber = phoneNumber;
    }
    if (image) {
      updateQuery.image = image;
    }
    const updatedUserData = await UserModel.findByIdAndUpdate(
      userId,
      { $set: updateQuery },
      { new: true }
    );

    if (!updatedUserData) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ data: updatedUserData });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


router.get("/users/logout",(req,res)=>{
  try{
    res.clearCookie('jwt').json({data:"Cookie Cleared"});
  }catch(e){
    return res.status(400).json({ error: e.message });
  }
})

router.delete("/user/info", Auth, async (req, res) => {
  try {
    const userId = req.user.UserId;
    const deletedUserData = await UserModel.findByIdAndDelete(userId);
    if (!deletedUserData) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ data: deletedUserData });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});





export default router;
