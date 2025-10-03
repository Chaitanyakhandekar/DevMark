import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError, ApiResponse } from "../utils/apiUtils.js";
import { User } from "../models/users.model.js";
import dotenv from "dotenv";
import { sendEmail } from "./brevoMail.service.js";

dotenv.config({path:"./.env"});

export const sendVerificationToken = asyncHandler(async(req,res)=>{
    try {
        const user = req.newUser;
        const token = user.generateVerificationToken()

        console.log("User for whom token is generated:", user);
        console.log("Generated Verification Token:", token);


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
            // userWithToken.email,
            // // userWithToken.name,
            // subject="DevMark Account Verification",
            // htmlContent=`Click on the link to verify your account: <a href="https://dev-mark.vercel.app/verify/${userWithToken.verificationToken}">Verify Account</a>`,
            // textContent=`Click on the link to verify your account: <a href="https://dev-mark.vercel.app/verify/${userWithToken.verificationToken}">Verify Account</a>`
        )

        // if(!emailResponse.success){
        //     throw new ApiError(500,"Email Sending Failed")
        // }

        return res
        .status(200)
        .json(
            new ApiResponse(200,"Verification Token Send On Registered Email")
        )

    } catch (error) {
        console.log("Error in generateVerificationToken:", error);
        return error.message
    }
})