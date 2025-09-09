import mongoose from "mongoose";
import { Blog } from "../models/blogs.model";
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError, ApiResponse} from "../utils/apiUtils.js"

const createBlog = asyncHandler(async(req,res)=>{
    
    const {
        title,
        content,
        category,
        status,
        tags,
    } = req.body

    if([title,content,category].some((field)=>!field || (field && field.trim()===""))){
        throw new ApiError(400,"All Fields Are Required")
    }

    if(!["draft","published","private"].includes(status)){
        throw new ApiError(400,"Invalid Status Value")
    }

    if(tags && !Array.isArray(tags)){
        throw new ApiError(400,"Tags must be Array")
    }

    const newBlog = await Blog.create({
        title: title.trim(),
        content: content.trim(),
        category: category.trim(),
        status,
        tags,
        owner: req.user.id
    })

    if(!newBlog){
        throw new ApiError(500,"Blog Creation Failed")
    }

    return res
            .status(201)
            .json(
                new ApiResponse(201,newBlog,"Blog Created Successfully")
            )

})

export {createBlog};