import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts",
    },
    parentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
    },
    message: {
        type: String,
        required: true
    }
},{
  timestamps: true,
});

const CommentModel = mongoose.model("Comments", CommentSchema);

export default CommentModel;