import mongoose from "mongoose";
import { Schema } from "mongoose";

const saveSchema = new Schema({
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
}, {timestamps: true});

export const Save = mongoose.model("Save", saveSchema);