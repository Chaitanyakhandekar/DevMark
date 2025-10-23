import mongoose from "mongoose";
import { Blog } from "../models/blogs.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError, ApiResponse } from "../utils/apiUtils.js"
import { uploadFileOnCloudinary, deleteFileFromCloudinary } from "../services/cloudinary.service.js";
import { User } from "../models/users.model.js";

const createBlog = asyncHandler(async (req, res) => {

  const {
    title,
    content,
    category,
    status,
    tags,
  } = req.body


  if ([title, content, category].some((field) => !field || (field && field.trim() === ""))) {
    throw new ApiError(400, "All Fields Are Required")
  }

  if (!["draft", "published", "private"].includes(status)) {
    throw new ApiError(400, "Invalid Status Value")
  }

  if (tags && !Array.isArray(tags)) {
    throw new ApiError(400, "Tags must be Array")
  }

  const images = req.files;


  if (images && images.length > 5) {
    throw new ApiError(400, "Maximum 5 Images are allowed")
  }

  let imgs = new Array();

  imgs = images ? await Promise.all(
    images.map(async (image) => {
      const res = await uploadFileOnCloudinary(image.path)
      return {
        url: res.secure_url,
        public_id: res.public_id
      }
    })
  ) : [].then(() => {
    console.log("Uploaded Images", imgs)
  }).catch((err) => {
    throw new ApiError(500, "Image Upload Failed: " + err.message)
  })


  const newBlog = await Blog.create({
    title: title.trim(),
    content: content.trim(),
    category: category.trim(),
    status,
    tags,
    images: imgs,
    owner: req.user.id
  })

  if (!newBlog) {
    throw new ApiError(500, "Blog Creation Failed")
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, newBlog, "Blog Created Successfully")
    )

})

const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Blog Id Required.")
  }

  await Promise.all(
    req.blog.images.map(async (image) => {
      await deleteFileFromCloudinary(image.public_id)
    })
  )

  const deletedBlog = await Blog.findByIdAndDelete(req.blog._id)

  if (!deletedBlog) {
    throw new ApiError(500, "Blog Deletion Failed.")
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, [], "Blog Deleted Successfully.")
    )
})

const updateBlog = asyncHandler(async (req, res) => {
  const {
    title,
    content,
    category,
    status,
    tags,
  } = req.body

  let updateData = {}

  if (!(title || content || category || status || (tags && tags.length))) {
    throw new ApiError(400, "Atleast One Field Is Required For Update Blog.")
  }

  if (title) {
    if (title.trim() === "") {
      throw new ApiError(400, "Title Cannot Be Empty.")
    }
    updateData.title = title
  }

  if (content) {
    if (content.trim() === "") {
      throw new ApiError(400, "Content Cannot Be Empty.")
    }
    updateData.content = content
  }

  if (category) {
    if (category.trim() === "") {
      throw new ApiError(400, "Category Cannot Be Empty.")
    }
    updateData.category = category
  }

  if (status) {
    if (!["draft", "published", "private"].includes(status)) {
      throw new ApiError(400, "Invalid Status.")
    }
    updateData.status = status
  }

  if (tags && tags.length) {
    updateData = { ...updateData, tags }
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.blog._id,
    {
      $set: updateData,
    },
    { new: true }
  )

  if (!updatedBlog) {
    throw new ApiError(500, "Blog Updation Failed.")
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedBlog, "Blog Updated Successfully.")
    )
})

const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Blog Id Is Required.")
  }

  const blog = await Blog.findById(id)

  if (!blog) {
    throw new ApiError(404, "Blog Not Found.")
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, blog, "Blog Fetched Successfully.")
    )
})

const getAllBlogs = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const userId = new mongoose.Types.ObjectId(req.user._id);

  const totalBlogs = await Blog.countDocuments();

  const blogs = await Blog.aggregate([
    {
      $match: { status: "published" },
    },
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
              username: 1,
              avatar: 1,
              totalFollowers: 1,
            },
          },
        ],
      },
    },
    { $unwind: "$owner" },

    // 👇 Add lookup to check follow status
    {
      $lookup: {
        from: "follows",
        let: { ownerId: "$owner._id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$followedBy", userId] },
                  { $eq: ["$followTo", "$$ownerId"] },
                ],
              },
            },
          },
        ],
        as: "isFollowedDocs",
      },
    },

    // 👇 Convert the result into a boolean
    {
      $addFields: {
        "owner.isFollowed": {
          $cond: {
            if: { $gt: [{ $size: "$isFollowedDocs" }, 0] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        // isFollowedDocs: 0, // remove temp field
        title: 1,
        content: 1,
        category: 1,
        owner: 1,
        tags: 1,
        images: 1,
        totalLikes: 1,
        totalComments: 1,
        status: 1,
        createdAt: 1,
      },
    },
  ]);

  if (!blogs.length) {
    throw new ApiError(404, "No blogs found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        blogs,
        totalBlogs,
        totalPages: Math.ceil(totalBlogs / limit),
        currentPage: page,
        hasNextPage: limit * page < totalBlogs,
      },
      "Blogs fetched successfully."
    )
  );
});

const getUserBlogs = asyncHandler(async (req, res) => {

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const blogs = await Blog.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(req.user._id)
      }
    },
    { $skip: skip },
    { $limit: limit },
    {
      $sort: { createdAt: -1 }
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
              username: 1,
              avatar: 1,
              totalFollowers: 1
            }
          }
        ]
      }
    },
    {
      $unwind: "$owner"
    }

  ])
  if (!blogs.length) {
    throw new ApiError(500, "Server Error While Fetching User Blogs.")
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, {
        blogs,
        page,
        limit,
        totalBlogs: await Blog.countDocuments({ owner: req.user._id }),
        totalPages: Math.ceil(await Blog.countDocuments({ owner: req.user._id }) / limit),
        hasNextPage: limit * page < await Blog.countDocuments({ owner: req.user._id })
      }, "User Blogs Fetched Successfully.")
    )

})

const getUserDrafts = asyncHandler(async (req, res) => {
  const drafts = await Blog.find({
    owner: req.user._id,
    status: "draft"
  })

  if (!drafts) {
    throw new ApiError(500, "Server Error While Fetching Drafts.")
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, drafts, "Drafts Fetched Successfully.")
    )
})

const SearchBlogsAndUsers = asyncHandler(async (req, res) => {

  const searchQuery = req.query.searchQuery
  const userId = req.user._id

  if (!searchQuery || (searchQuery && searchQuery.trim() === "")) {
    throw new ApiError(400, "Search Query Is Required for Search.")
  }

  const userResults = await User.aggregate([
    {
      $match:{
        $or: [
        {
          username: { $regex: searchQuery, $options: "i" }
        },
        {
          fullName: { $regex: searchQuery, $options: "i" }
        },
        {
          bio: { $regex: searchQuery, $options: "i" }
        }
      ]
      }
    },
    {
      $lookup:{
        from:"follows",
        let:{channel:"$_id"},
        pipeline:[
          {
            $match:{
              $expr:{
                $and:[
                  {
                    $eq:["$followedBy",userId]
                  },
                  {
                    $eq:["$followTo","$$channel"]
                  }
                ]
              }
            }
          }
        ],
        as:"followDocs"
      }
    },

    {
      $addFields:{
        "isFollowed":{
          $cond:{
            if : { $gt : [{$size: "$followDocs"},0]},
            then : true,
            else : false
          }
        }
      }
    },

    {
      $project:{
        username:1,
        fullName:1,
        avatar:1,
        bio:1,
        position:1,
        totalFollowers:1,
        totalBlogs:1,
        isFollowed:1
      }
    }

  ])

  let result = []
  let ids = [

  ]
  let fields = {
    username: 0,
    fullName: 0,
    bio: 0
  }

  userResults.forEach((user) => {
    if (user.username.toLowerCase().includes(searchQuery.toLowerCase())) {
      result.push({
        query: searchQuery,
        field: "username"
      })
      fields.username += 1;
    }

    if (user.fullName.toLowerCase().includes(searchQuery.toLowerCase())) {
      result.push({
        query: searchQuery,
        field: "fullName"
      })
      fields.fullName += 1;
    }

    if (user.bio.toLowerCase().includes(searchQuery.toLowerCase())) {
      result.push({
        query: searchQuery,
        field: "bio"
      })
      fields.bio += 1;
    }

    ids.push(
      {
        _id: new mongoose.Types.ObjectId(user._id)
      }
    )

  })

  const maxAppear = fields.username >= fields.fullName && fields.username >= fields.bio ? "username" : fields.fullName >= fields.username && fields.fullName >= fields.bio ? "fullName" : "bio"



  if (userResults.length) {

    const blogs = await Blog.aggregate([
      {
        $match: {
          owner: {
            $in: ids.map(i => i._id)
          },
          status: "published"
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
          pipeline: [
            {
              $project: {
                username: 1,
                avatar: 1,
                totalFollowers: 1,
                position:1
              },
            },
          ],
        },
      },
      { $unwind: "$owner" },

      //👇 Add lookup to check follow status
      {
        $lookup: {
          from: "follows",
          let: { ownerId: "$owner._id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$followedBy", userId] },
                    { $eq: ["$followTo", "$$ownerId"] },
                  ],
                },
              },
            },
          ],
          as: "isFollowedDocs",
        },
      },

      // 👇 Convert the result into a boolean
      {
        $addFields: {
          "owner.isFollowed": {
            $cond: {
              if: { $gt: [{ $size: "$isFollowedDocs" }, 0] },
              then: true,
              else: false,
            }
          }
        }
      },
      {
        $project: {
          title: 1,
          content: 1,
          category: 1,
          owner: 1,
          tags: 1,
          images: 1,
          totalLikes: 1,
          totalComments: 1,
          status: 1,
          createdAt: 1,
        },
      },
    ]);

    if (!blogs.length) {
      throw new ApiError(404, "No Results Match With Search Query")
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, {
          users:userResults,
          blogs
        }, "Query Result Fetched Successfully.")
      )
  }

  if (!userResults.length) {
    const blogs = await Blog.aggregate([
      {
        $match: {

          $and: [
            {
              $or: [
                {
                  title: { $regex: searchQuery, $options: "i" }
                },
                {
                  category: { $regex: searchQuery, $options: "i" }
                },
                {
                  content: { $regex: searchQuery, $options: "i" }
                }
              ],
            },

            { status: "published" }
          ]
        }
      },

      {
        $lookup:{
          from:"users",
          localField:"owner",
          foreignField:"_id",
          as:"owner",
          pipeline:[
            {
              $project:{
                 username: 1,
                avatar: 1,
                totalFollowers: 1,
                position:1
              }
            }
          ]
        }
      },

      { $unwind : "$owner" },

      {
        $lookup:{
          from:"follows",
          let:{ownerId:"$owner._id"},
          pipeline:[
            {
              $match:{
                $expr:{
                  $and:[
                    {
                      $eq:["$followedBy",userId]
                    },
                    {
                      $eq:["$followTo","$$ownerId"]
                    }
                  ]
                }
              }
            },
          ],
            as:"followDocs"
        }
      },

      {
        $addFields:{
          "owner.isFollowed":{
            $cond:{
              if: {$gt : [{$size : "$followDocs"},0]},
              then : true,
              else:false
            }
          }
        }
      },

      {
        $project:{
            title: 1,
          content: 1,
          category: 1,
          owner: 1,
          tags: 1,
          images: 1,
          totalLikes: 1,
          totalComments: 1,
          status: 1,
          createdAt: 1,
        }
      }
    ])

    if(!blogs.length){
      throw new ApiError(404,"No Result For Query.")
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200,{
          users:null,
          blogs
        },
        "Query Result Fetched Successfully."
    )
      )
  }

  return res
    .status(404)
    .json(
      new ApiResponse(404,null,"No Result For Search Query.")
    )

})



export {
  createBlog,
  getAllBlogs,
  deleteBlog,
  updateBlog,
  getBlog,
  getUserBlogs,
  getUserDrafts,
  SearchBlogsAndUsers
};

