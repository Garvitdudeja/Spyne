import mongoose from "mongoose";

const PostsSchema = mongoose.Schema({
  message: String,
  images : [String],
  userId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  tags: [String],
},{
  timestamps: true,
});

const PostsModel = mongoose.model("Posts", PostsSchema);

export default PostsModel;