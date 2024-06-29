import express from "express";
import multer from "multer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/Users.js";
import Auth from "../middleware/Auth.js";
import PostsModel from "../models/Posts.js";
import LikesModel from "../models/Likes.js";
import CommentModel from "../models/Comment.js";

const router = express.Router();

const upload = multer({ dest: "uploads" });

router.post("/sign-up",  async (req, res) => {
  try {
    const { userName, password, phoneNumber, email, image } = req.body;

    if (!userName || !password || !phoneNumber || !email) {
      return res.status(400).json({ error: "Add complete Details" });
    }

    const Salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, Salt);
    const user = await UserModel.create({
      userName: userName,
      password: hashedPassword,
      phoneNumber: phoneNumber,
      email: email,
      image: image,
    });
    if (user) {
      const jwtToken = jwt.sign(
        { UserId: user._id },
        process.env.SECRET_TOKEN,
        {
          expiresIn: "30d",
        }
      );
      res.cookie("jwt", jwtToken);
      return res.status(200).json({
        data: {
          _id: user._id,
          userName: user.name,
          email: user.email,
          image: user.image,
          token: jwtToken,
        },
      });
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

router.post("/log-in", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Enter correct email address and password" });
    }
    const cmpPassword = await bcrypt.compare(password, user.password);
    if (cmpPassword) {
      const jwtToken = jwt.sign(
        { UserId: user._id },
        process.env.SECRET_TOKEN,
        {
          expiresIn: "30d",
        }
      );
      res.cookie("jwt", jwtToken);

      return res.status(200).json({
        data: {
          _id: user._id,
          email: user.email,
          token: jwtToken,
        },
      });
    } else {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

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

router.post("/post", Auth, async (req, res) => {
  try {
    const { message, images } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Add Message to the Post!" });
    }
    const userId = req.user.UserId;
    const post = await PostsModel.create({
      userId,
      message,
      images,
    });
    await post.populate('userId');
    return res.status(200).json(post);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post("/post/like/:postId", Auth, async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.UserId;
    const liked = await LikesModel.findOne({ postId, userId });
    if (liked) {
      return res.status(400).json({ error: "Already Liked" });
    }
    const Like = await LikesModel.create({
      userId,
      postId,
    });
    return res.status(200).json(Like);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post("/post/dislike/:postId", Auth, async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.UserId;
    const Like = await LikesModel.findOneAndDelete({
      userId,
      postId,
    });
    return res.status(200).json({ message: "Post Unliked" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.delete("/post/:postId",Auth, async(req,res)=>{
  try {
    const { postId } = req.params;
    const userId = req.user.UserId;
    console.log(postId);
    const deletedPost = await PostsModel.findOneAndDelete({
      _id: postId,
      userId                                                                                                                            
    });
    if(!deletedPost) return res.status(404).json({ error: "No post found" });
    return res.status(200).json({ data: deletedPost });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
})


router.get("/post/:postId",Auth, async(req,res)=>{
  try {
    const { postId } = req.params;
    const post = await PostsModel.find({
      _id: postId                                                                                                                                                 
    });
    if(!post) return res.status(404).json({ error: "No post found" });
    return res.status(200).json({ data: post });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
})


// Add comment
router.post("/post/comment",Auth,async(req,res)=>{
  try {
    const { postId , message } = req.body;
    const userId = req.user.UserId
    const comment = await CommentModel.create({
      postId,
      message,
      userId                                                                                                             
    });
    if(!comment) return res.status(404).json({ error: "No post found" });
    return res.status(200).json({ data: comment });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
})

//Comment a comment
router.post("/comment",Auth,async(req,res)=>{
  try {
    const { commentId , message } = req.body;
    const userId = req.user.UserId
    const comment = await CommentModel.create({
      parentId: commentId,
      message,
      userId                                                                                                                            
    });
    if(!comment) return res.status(404).json({ error: "No post found" });
    return res.status(200).json({ data: comment });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
})

// like a comment
router.post("/comment/like",Auth,async(req,res)=>{
  try {
    const { commentId } = req.body;
    const userId = req.user.UserId
    const comment = await LikesModel.create({
      commentId,
      userId                                                                                                                         
    });
    if(!comment) return res.status(404).json({ error: "No Comment found" });
    return res.status(200).json({ data: comment });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
})


router.get("/post", Auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const searchQuery = search
      ? { message: { $regex: search, $options: "i" } }
      : {};
    
    const userData = await PostsModel.find(searchQuery)
      .populate("userId")
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const totalPosts = await PostsModel.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalPosts / limitNumber);

    return res.status(200).json({
      data: userData,
      totalPosts,
      totalPages,
      currentPage: pageNumber,
      pageSize: limitNumber,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});



export default router;
