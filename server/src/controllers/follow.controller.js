import { Follow } from "../models/follow.model.js";
import { User } from "../models/users.model.js";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError, ApiResponse } from "../utils/apiUtils.js";


const followUser = asyncHandler(async(req,res)=>{
    const {id} = req.params

    if(!id || !mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(400,"Invalid User Id.")
    }

    const follow = await Follow.create({
        followTo:id,
        followedBy:req.user._id
    })

    if(!follow){
        throw new ApiError(500,"Server Error In Follow Request.")
    }

    const followToUser = await User.findByIdAndUpdate(
        id,
        {
            $inc:{totalFollowers:1}
        },
        {new:true}
    )

    const followedByUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            $inc:{
                totalFollowing:1
            }
        },
        {
            new:true
        }
    )

    if(!(followToUser && followedByUser)){
        throw new ApiError(500,"Server Error In Follow Request.")
    }

    return res.status(200).json(new ApiResponse(201,"Followed Successfully."))
})


const unfollowUser = asyncHandler(async(req,res)=>{})


export {
    followUser,
    unfollowUser
}