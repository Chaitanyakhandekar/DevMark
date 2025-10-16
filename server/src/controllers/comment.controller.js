import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError, ApiResponse } from "../utils/apiUtils.js";
import { Comment } from "../models/comments.model.js";
import { Blog } from "../models/blogs.model.js";
import mongoose from "mongoose";


const addComment = asyncHandler(async (req,res)=>{
    const {
        blogId,
        content
    } = req.body

    if(!blogId || !mongoose.Types.ObjectId.isValid(blogId)){
        throw new ApiError(400,"Invalid Blog Id.")
    }

    const blog = await Blog.findById(blogId)

    if(!blog){
        throw new ApiError(500,"Blog Not Found.")
    }

    if(!content || (content && content?.trim()==="")){
        throw new ApiError(400,"Content Is Required For Adding Comment.")
    }

    const newComment = await Comment.create({
        blog:blogId,
        user:req.user._id,
        content:content.trim()
    })

    if(!newComment){
        throw new ApiError(500,"Server Error While Adding Comment.")
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201,newComment,"Comment Added Successfully.")
        )
})


export {
    addComment
}