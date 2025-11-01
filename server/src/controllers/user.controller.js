import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError, ApiResponse } from "../utils/apiUtils.js";
import { User } from "../models/users.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendVerificationToken } from "../services/sendVerificationToken.js";
import { generateTokens } from "../services/generateTokens.js";
import { deleteFileFromCloudinary, uploadFileOnCloudinary } from "../services/cloudinary.service.js";

dotenv.config({ path: "./.env" })

const registerUser = asyncHandler(async (req, res, next) => {
  const {
    username,
    fullName,
    email,
    password
  } = req.body

  if ([username, fullName, email, password].some((field) => (!field || field.trim() === ""))) {
    throw new ApiError(400, "All Fields are required!")
  }

  if (password.length < 8) {
    throw new ApiError(400, "Password must be atleast 8 charachers long.")
  }

  const alreadyExists = await User.findOne({ email });

  if (alreadyExists) {
    throw new ApiError(400, "User with this email already exists.")
  }

  const newUser = await User.create({
    username,
    fullName,
    email,
    password
  })

  if (!newUser) {
    throw new ApiError(500, "User Creation Error")
  }


  req.newUser = newUser;
  console.log("New user created:", newUser);
  next();

})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!(email && password)) {
    throw new ApiError(400, "All Fields are Required")
  }

  if (email.trim() === "" || password.trim() === "") {
    throw new ApiError(400, "No Field can be Empty")
  }

  const user = await User.findOne({
    email: email.toLowerCase()
  })

  if (!user) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, "Acoount not found!")
      )
  }

  const isCorrect = await user.isCorrectPassword(password)

  if (!isCorrect) {
    throw new ApiError(400, "Invalid Credentials")
  }

  if (!user.isVerified) {
    throw new ApiError(403, "Email is not verified!")
  } 
  

  const { accessToken, refreshToken } = generateTokens(user)

  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false })

  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })
    .json(
      new ApiResponse(200, "Login Successful")
    )
})

const logoutUser = asyncHandler(async (req, res) => {

  const id = req.user._id;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(401, "Unauthorize Request")
  }

  const user = await User.findById(id)

  if (!user) {
    throw new ApiError(404, "Cannot Find User With Given Id")
  }

  user.refreshToken = undefined;

  await user.save({ validateBeforeSave: false })

  return res
    .status(200)
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    })
    .clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })
    .json(
      new ApiResponse(200, "Logout Successful")
    )

})

const verifyUser = asyncHandler(async (req, res) => {
  const { token } = req.params;
  console.log("Received token for verification:", token);

  if (!token || token.trim() === "") {
    throw new ApiError(400, "Token is required for verification")
  }

  console.log("Verifying token:", token);

  let decodeToken;

  try {
    decodeToken = jwt.verify(
      token,
      process.env.VERIFICATION_SECRET
    )

    console.log("Decoded token:", decodeToken);
    if (!decodeToken) {
      throw new ApiError(400, "Invalid or Expired Token")
    }

    const user = await User.findByIdAndUpdate(
      decodeToken.id,
      {
        $set: {
          isVerified: true
        }
      },
      {
        new: true
      }
    )

    console.log("User after verification:", user);

    if (!user) {
      throw new ApiError(404, "User Not Found")
    }

    return res.status(200).send(`
            <h1>Verification Successful</h1>
            <p>Your account has been verified successfully!</p>
        `)
  } catch (error) {
    return res.status(500).send(`
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verification Successful</title>
  <style>
    body {
      background-color: #0d1117;
      color: #c9d1d9;
      font-family: "Fira Code", monospace;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
    }

    .container {
      background: #161b22;
      padding: 2rem 3rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
      text-align: center;
      max-width: 500px;
      border: 1px solid #30363d;
    }

    .check-icon {
      font-size: 4rem;
      color: #3fb950;
      animation: pop 0.4s ease-in-out;
    }

    @keyframes pop {
      0% { transform: scale(0.5); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }

    h1 {
      margin: 1rem 0 0.5rem;
      font-size: 1.8rem;
      color: #58a6ff;
    }

    p {
      font-size: 1rem;
      line-height: 1.5;
      color: #8b949e;
    }

    .button {
      margin-top: 1.5rem;
      text-decoration: none;
      background: #238636;
      color: white;
      padding: 0.6rem 1.2rem;
      border-radius: 8px;
      font-weight: 500;
      transition: background 0.2s ease;
      display: inline-block;
    }

    .button:hover {
      background: #2ea043;
    }

    footer {
      margin-top: 2rem;
      font-size: 0.8rem;
      color: #6e7681;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="check-icon">✅</div>
    <h1>Verification Successful</h1>
    <p>Your token has been verified successfully. You can now proceed to access secured resources.</p>
    <a href="/" class="button">Continue</a>
  </div>
  <footer>© 2025 Developer Portal</footer>
</body>
</html>
`)
  }
})

const isVerifiedUser = asyncHandler(async (req, res) => {
  const { email } = req.params;

  console.log("Checking verification status for email:", email);

  if (!email || email.trim() === "") {
    throw new ApiError(400, "Email is required")
  }

  const user = await User.findOne({ email });
  console.log("User found for email verification check:", user.isVerified);

  if (!user) {
    throw new ApiError(404, "User Not Found");
  }

  if (!user.isVerified) {
    throw new ApiError(403, "User is not verified");
  }

  const { accessToken, refreshToken } = generateTokens(user)

  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })
    .json({
      isVerified: user.isVerified,
    })
})

const isLoggedInUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(200, {
        success: req.user ? true : false,
        isLoggedIn: req.user ? true : false
      })
    )
})

const uploadAvatar = asyncHandler(async (req, res) => {

  if (!req.file) {
    throw new ApiError(400, "Avatar Image Is Required.")
  }
  const avatarLocalPath = req.file.path

  try {
    const uploadData = await uploadFileOnCloudinary(avatarLocalPath)
    if (uploadData.success === false) {
      throw new ApiError(500, uploadData.message || "Avatar Upload Failed")
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          avatar: uploadData.secure_url,
          avatarPublicId: uploadData.public_id
        }
      },
      {
        new: true
      }
    )

    if (!user) {
      throw new ApiError(500, "MongoDB Server Error While Uploading Avatar.")
    }

    return res
      .status(201)
      .json(
        new ApiResponse(201, "Avatar Uploaded Successfuly.")
      )

  } catch (error) {
    throw new ApiError(500, error.message)
  }

})

const deleteUserAvatar = asyncHandler(async (req,res)=>{   // Header x-delete-only:"true"  if only deletion operation

  if(!req.user.avatar || !req.user.avatarPublicId){
    throw new ApiError(400,"No Avatar To Delete.")
  }

  await deleteFileFromCloudinary(req.user.avatarPublicId)

  const avatarDeleted = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set:{
        avatar:"",
        avatarPublicId:""
      }
    },
    {
      new:true
    }
  ).select("-password -refreshToken")

  if(!avatarDeleted){
    throw new ApiError(500,"Server Error While Deleting Avatar.")
  }

  if(req.headers["x-delete-only"] && req.headers["x-delete-only"]==="true"){
    return res
        .status(200)
        .json(
          new ApiResponse(200,null,"Avatar Deleted Successfully.")
        )
  }

  return  {
      success:true,
      message:"Avatar Deleted Successfully."
    }


})

const getUserAvatar = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (!user) {
    throw new ApiError(404, "User Not Found")
  }

  return res.status(200).json({
    avatar: user.avatar
  })
})

const updateUserAvatar = asyncHandler(async (req,res)=>{
  console.log("Avatar :",req.file)
  if(!req.file){
    throw new ApiError(400,"Avatar Image is Required for Updating Avatar.")
  }

  const newAvatar = req.file.path

  await deleteUserAvatar(req,res)

    const uploadData = await uploadFileOnCloudinary(newAvatar)

    if(uploadData.success===false){
      throw new ApiError(500,uploadData.message)
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set:{
          avatar: uploadData.secure_url,
          avatarPublicId: uploadData.public_id
        }
      },
      {
        new:true
      }
    ).select("-password -refreshToken")

    if(!user){
      throw new ApiError(500,"Server Error While Updating Avatar.")
    }

    return res
        .status(200)
        .json(
          new ApiResponse(200,{
            _id:user._id,
            avatar:uploadData.secure_url
          })
        )

})

const getUserProfile = asyncHandler(async (req, res) => {

  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id)
      }
    },
    {
      $project: {
        fullName: 1,
        username: 1,
        avatar: 1,
        totalFollowers: 1,
        totalFollowing: 1,
        totalBlogs: 1,
        totalSavedBlogs: 1,
        bio: 1,
        skills: 1,
        location: 1,
        website: 1,
        githubUrl: 1,
        linkedinUrl: 1,
        twitterUrl: 1,
        createdAt: 1,
        joinedDate: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
        }

      }
    }
  ])

  if (!user.length) {
    throw new ApiError(500, "Server Error While Fetching User Profile.")
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, user[0], "User Profile Fetched Successfully.")
    )

})

const updateUserProfile = asyncHandler(async (req, res) => {
  const {
    fullName,
    username,
    location,
    website,
    githubUrl,
    twitterUrl,
    linkedinUrl,
    bio,
    skills,
  } = req.body

  const fields = [fullName, username, location, website, githubUrl, twitterUrl, linkedinUrl, bio]
  const fieldsName = ["fullName", "username", "location", "website", "githubUrl", "twitterUrl", "linkedinUrl", "bio"]
  let updateFields = {}
  let throwError = false
  let skillError = false
  let filteredSkills

  if (skills) {
    if (!Array.isArray(skills)) {
      throw new ApiError(400, "Skills Must Be Array.")
    }
    if (Array.isArray(skills) && !skills.length) {
      skillError = true
    }
    else if (Array.isArray(skills) && skills.length) {

      filteredSkills = skills.filter(skill => skill && skill.trim() !== "")
      if (!filteredSkills.length) {
        skillError = true
      }
    }
  }

  if (!fields.some(field => field)) {
    throwError = true
  }

  if (throwError && skillError) {
    throw new ApiError(400, "Atleast One Field is Required for Profile Update.")
  }

  fields.forEach((field,index) => {
    if (field && field.trim() !== "") {
      updateFields = { ...updateFields, [fieldsName[index]]: field }
    }
  })

  if (skills && skills.length) {
    updateFields.skills = filteredSkills
  }

  console.log("Update Fields = ", updateFields)

  const updatedProfile = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set:updateFields
    },
    {
      new:true
    }
  ).select("-password -refreshToken -verificationToken -verificationTokenExpiry -email")

  if(!updatedProfile){
    throw new ApiError(500,"Server Error While Updating Profile Details.")
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedProfile, "Profile Updated Successfully.")
    )

})



export {
  registerUser,
  verifyUser,
  isVerifiedUser,
  loginUser,
  isLoggedInUser,
  logoutUser,
  uploadAvatar,
  getUserAvatar,
  getUserProfile,
  updateUserProfile,
  deleteUserAvatar,
  updateUserAvatar
}