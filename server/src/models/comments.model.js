import mongoose from "mongoose";
import { Schema } from "mongoose";

const commentSchema = new Schema({
  blog: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  parentCommentId: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
    default: null
  },
  content: {
    type: String,
    required: true
  },
}, {timestamps: true});

export const Comment = mongoose.model("Comment", commentSchema);