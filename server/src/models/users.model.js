import mongoose,{Schema} from 'mongoose';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config({path:"./.env"})

const userSchema = new Schema({

    username:{
        type:String,
        required:[true, "Username is required"],
        unique:true
    },
    fullName:{
        type:String,
        required:[true, "Full Name is required"],
    },

    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    avatar:{
        type:String,
        default:"https://res.cloudinary.com/drftighpf/image/upload/v1751458090/f5ozv63h6ek3ujulc3gg.jpg"
    },
    totalFollowers:{
        type:Number,
        default:0
    },
    totalFollowing:{
        type:Number,
        default:0
    },
    publicId:{
        type:String,
    },
    bio:{
        type:String,
        default:"no bio",
        maxLength:160
    },
    isActive:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    refreshToken:{
        type:String
    },
    verificationToken:{
        type:String
    },
    verificationTokenExpiry:{
        type:String
    },
    isVerified:{
        type:Boolean,
        default:false
    },

},{timestamps:true})



userSchema.pre("save" , async function(next){

    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password,10)
    next()

})

userSchema.methods.isCorrectPassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    try {
        return jwt.sign(
            {
                id:this._id,
                role:this.role,
                isActive:this.isActive
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    } catch (error) {
        return error.message
    }
}


userSchema.methods.generateRefreshToken = function(){
    try {
        return jwt.sign(
            {
                id:this._id
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn:process.env.REFRESH_TOKEN_EXPIRY
            }
        )
    } catch (error) {
        return error.message
    }
}

userSchema.methods.generateVerificationToken = function(){
    try {
        return jwt.sign(
            {
                id:this._id,
            },
            process.env.VERIFICATION_SECRET,
            {
                expiresIn: process.env.VERIFICATION_EXPIRY
            }
        )
    } catch (error) {
        return error.message
    }
}

export const User = mongoose.model("User" , userSchema)
