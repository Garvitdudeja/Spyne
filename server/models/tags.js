import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  tag: { type: String, required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Posts", required: true }
}, {
  timestamps: true
});

const TagsModel = mongoose.model("Tags", tagSchema);

export default TagsModel;
