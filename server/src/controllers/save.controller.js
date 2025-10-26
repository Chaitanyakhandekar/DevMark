import mongoose from "mongoose";
import { Blog } from "../models/blogs.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError, ApiResponse } from "../utils/apiUtils.js"
import { uploadFileOnCloudinary, deleteFileFromCloudinary } from "../services/cloudinary.service.js";
import { User } from "../models/users.model.js";
import { Like } from "../models/likes.model.js";
import { Save } from "../models/saves.model.js";


const toggleBlogSave = asyncHandler(async (req,res)=>{
    const blogId = req.params.id

    if(!blogId || !mongoose.Types.ObjectId.isValid(blogId)){
        throw new ApiError(400,"Invalid BlogId")
    }

    const isSavedBefore = await Save.findOne({
        blog:blogId,
        user:req.user._id
    })

    if(!isSavedBefore){

        const newSave = await Save.create({
            blog:blogId,
            user:req.user._id
        })

        if(!newSave){
            throw new ApiError(500,"Server Error While Saving Blog")
        }

        return res
            .status(200)
            .json(
                new ApiResponse(200,newSave,"Blog Saved Successfully.")
            )
    }

    isSavedBefore.isSaved = !isSavedBefore.isSaved
    await isSavedBefore.save({validateBeforeSave:false})

    return res
        .status(200)
        .json(
            new ApiResponse(200,isSavedBefore,`${!isSavedBefore.isSaved ? "Blog Unsaved Successfully." : "Blog Saved Successfully."}`)
        )
})


const isSavedToBlog = asyncHandler(async (req,res)=>{
    const blogId = req.params.id

    if(!blogId || !mongoose.Types.ObjectId.isValid(blogId)){
        throw new ApiError(400,"Invalid BlogId")
    }

    const isSaved = await Save.findOne({
        blog:blogId,
        user:req.user._id
    })

    return res
        .status(200)
        .json(
            new ApiResponse(200,isSaved,`${isSaved.isSaved ? "Blog is Saved." : "Blog is Not Saved."}`)
        )
})

export {
    toggleBlogSave,
    isSavedToBlog
}