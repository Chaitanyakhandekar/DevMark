const blogSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: String,
    default: ""
  },
  totalLikes: {
    type: Number,
    default: 0
  },
  totalComments: {
    type: Number,
    default: 0
  },
}, {timestamps: true});
