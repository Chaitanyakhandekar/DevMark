import mongoose from "mongoose";
import { Schema } from "mongoose";

const likeSchema = new Schema({
  blog: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
    required: true
  },
  likedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
}, {timestamps: true});
export const Like = mongoose.model("Like", likeSchema);