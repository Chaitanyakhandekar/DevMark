import mongoose from "mongoose";
import { Blog } from "../models/blogs.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError, ApiResponse } from "../utils/apiUtils.js"
import { uploadFileOnCloudinary } from "../services/cloudinary.service.js";

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

const getAllBlogs = asyncHandler(async (req, res) => {

    const totalBlogs = await Blog.countDocuments()
    console.log(totalBlogs)

    const blogs = await Blog.aggregate([
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
                            totalFollowers: 1,
                        }
                    },

                ]
            }
        },
        {
            $unwind: "$owner"
        },
        {
            $project:{
                title: 1,
                content: 1,
                category: 1,
                owner: "$owner",
                tags: 1,
                images: 1,
                totalLikes: 1,
                totalComments: 1,
                status: 1,
                createdAt: 1,
            }
        }
    ])

    if (!blogs.length) {
        throw new ApiResponse(500, "Server Error While Fetching Blogs");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, blogs, "Blogs Fetched Successfuly.")
        )
})

export { createBlog, getAllBlogs };

