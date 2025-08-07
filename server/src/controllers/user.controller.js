import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError , ApiResponse} from "../utils/apiUtils.js";
import { User } from "../models/users.model.js";

const registerUser = asyncHandler(async(req,res)=>{
    const {
        username,
        fullName,
        email,
        password
    } = req.body

    if([username,fullName,email,password].some((field)=>(!field || field.trim()===""))){
        throw new ApiError(400,"All Fields are required!")
    }

    if(password.length<8){
        throw new ApiError(400,"Password must be atleast 8 charachers long.")
    }

    const newUser = await User.create({
        username,
        fullName,
        email,
        password
    })

    if(!newUser){
        throw new ApiError(500,"User Creation Error")
    }


})