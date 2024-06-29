import mongoose, { Schema } from "mongoose";

const LikeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts",
    },
    commentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
    }
},{
  timestamps: true,
});

const LikesModel = mongoose.model("Likes", LikeSchema);

export default LikesModel;