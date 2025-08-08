import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError, ApiResponse } from "../utils/apiUtils.js";
import { User } from "../models/users.model.js";
import dotenv from "dotenv";
import { sendEmail } from "./mail.service.js";

dotenv.config({path:"./.env"});

export const sendVerificationToken = async(user)=>{
    try {
        const token = user.generateVerificationToken()

        const userWithToken = await User.findByIdAndUpdate(
            user._id,
            {
                $set:{
                    verificationToken:token,
                    verificationTokenExpiry:"15m"
                }
            },
            {
                new:true
            }
        )

        if(!userWithToken){
            throw new ApiError(500,"Token Creation Error")
        }

        console.log("Verification Token:", userWithToken);

        const emailResponse = await sendEmail(
            "chaitanyakhandekar95@gmail.com",
            "DevMark Account Verification",
            `Click on the link to verify your account: ${process.env.RENDER_SERVER_URL}/api/v1/users/verify/${token}`,
           `<p>Click on the link to verify your account: <a href="${process.env.RENDER_SERVER_URL}/api/v1/users/verify/${token}">Verify Account</a></p>`
        )

        if(!emailResponse.success){
            throw new ApiError(500,"Email Sending Failed")
        }
 

    } catch (error) {
        console.log("Error in generateVerificationToken:", error);
        return error.message
    }
}