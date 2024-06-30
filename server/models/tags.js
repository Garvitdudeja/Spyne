import mongoose from "mongoose";

const tagSchema = mongoose.Schema({
  tag: String,
  postId: {
    type: mongoose.Types.ObjectId,
    ref: "Posts"
  }
},{
  timestamps: true,
});

const TagsModel = mongoose.model("tags", tagSchema);

export default TagsModel;