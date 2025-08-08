import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError , ApiResponse} from "../utils/apiUtils.js";
import { User } from "../models/users.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendVerificationToken } from "../services/sendVerificationToken.js";

dotenv.config({path:"./.env"})

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

    const alreadyExists = await User.findOne({ email });

    if(alreadyExists){
        throw new ApiError(400,"User with this email already exists.")
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

    await sendVerificationToken(newUser)


})

const verifyUser = asyncHandler(async (req,res)=>{
    const {token} = req.params;
    let decodeToken;

    try {
        decodeToken = jwt.verify(
            process.env.VERIFICATION_SECRET,
            token
        ) 
        
        if(!decodeToken){
            throw new ApiError(400,"Invalid or Expired Token")
        }

        const user = await User.findByIdAndUpdate(
            decodeToken.id,
            {
                $set:{
                    isVerified:true
                }
            },
            {
                new:true
            }
        )

        if(!user){
            throw new ApiError(404,"User Not Found")
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                "User Verified Successfully"
            )
        )   
    } catch (error) {
        throw new ApiError(500,error.message)   
    }
})

export {
    registerUser,
    verifyUser
}