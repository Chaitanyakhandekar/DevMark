import mongoose from "mongoose";
import { Schema } from "mongoose";

const notificationSchema = new Schema({
  reciever: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  link: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: "general"
  },
  isSeen: {
    type: Boolean,
    default: false
  },
}, {timestamps: true});

export const Notification = mongoose.model("Notification", notificationSchema);