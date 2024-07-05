import PostsModel from "../models/Posts.js";
import LikesModel from "../models/Likes.js";
import CommentModel from "../models/Comment.js";
import TagsModel from "../models/tags.js";

const addPost = async (req, res) => {
  try {
    const { message, images, tags } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Add Message to the Post!" });
    }
    const userId = req.user.UserId;
    const post = await PostsModel.create({
      userId,
      message,
      images,
      tags,
    });
    const tagsList = tags?.map((item) => ({ postId: post._id, tag: item }));
    if(Array.isArray(tagsList) && tagsList.length > 0) {
    const tagsResponse = await TagsModel.create(tagsList);}
    await post.populate("userId");
    return res.status(200).json(post);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const LikePost = async (req, res) => {
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
};

const dislikePost = async (req, res) => {
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
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.UserId;
    console.log(postId);
    const deletedPost = await PostsModel.findOneAndDelete({
      _id: postId,
      userId,
    });
    if (!deletedPost) return res.status(404).json({ error: "No post found" });
    return res.status(200).json({ data: deletedPost });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await PostsModel.find({
      _id: postId,
    });
    if (!post) return res.status(404).json({ error: "No post found" });
    return res.status(200).json({ data: post });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const commentOnPost = async (req, res) => {
  try {
    const { postId, message } = req.body;
    const userId = req.user.UserId;
    const comment = await CommentModel.create({
      postId,
      message,
      userId,
    });
    if (!comment) return res.status(404).json({ error: "No post found" });
    return res.status(200).json({ data: comment });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const commentOnComment = async (req, res) => {
  try {
    const { commentId, message } = req.body;
    const userId = req.user.UserId;
    const comment = await CommentModel.create({
      parentId: commentId,
      message,
      userId,
    });
    if (!comment) return res.status(404).json({ error: "No post found" });
    return res.status(200).json({ data: comment });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const LikeComment = async (req, res) => {
  try {
    const { commentId } = req.body;
    const userId = req.user.UserId;
    const comment = await LikesModel.create({
      commentId,
      userId,
    });
    if (!comment) return res.status(404).json({ error: "No Comment found" });
    return res.status(200).json({ data: comment });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getAllPost = async (req, res) => {
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

    // Fetch likes for each post
    const postIds = userData.map(post => post._id);
    const likesPromises = postIds.map(postId =>
      LikesModel.find({ postId, userId: req?.user?.userId })
    );
    const likesResults = await Promise.all(likesPromises);

    // Add likes data to userData
    const userDataWithLikes = userData.map((post, index) => ({
      ...post.toObject(),
      likes: likesResults[index]  // Attach likes array to each post
    }));

    return res.status(200).json({
      data: userDataWithLikes,
      totalPosts,
      totalPages,
      currentPage: pageNumber,
      pageSize: limitNumber,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


const searchWithTag = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    const searchQuery = search
      ? { tag: { $regex: search, $options: "i" } }
      : {};

    // Aggregation pipeline to fetch and format posts
    const aggregationPipeline = [
      { $match: searchQuery },
      { $sort: { createdAt: -1 } }, 
      { $skip: (pageNumber - 1) * limitNumber }, 
      { $limit: limitNumber }, 
      {
        $lookup: {
          from: "posts", 
          localField: "postId", 
          foreignField: "_id",
          as: "post" 
        }
      },
      { $unwind: "$post" },
      {
        $project: {
          _id: "$post._id",
          message: "$post.message",
          images: "$post.images",
          tags: "$post.tags",
          createdAt: "$post.createdAt",
          updatedAt: "$post.updatedAt"
        }
      }
    ];

    const postsData = await TagsModel.aggregate(aggregationPipeline);


    const totalPosts = await TagsModel.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalPosts / limitNumber);
    
    return res.status(200).json({
      data: postsData,
      totalPosts,
      totalPages,
      currentPage: pageNumber,
      pageSize: limitNumber,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};




export {
  addPost,
  LikePost,
  dislikePost,
  deletePost,
  getPostById,
  commentOnPost,
  commentOnComment,
  LikeComment,
  getAllPost,
  searchWithTag,
};
