import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError, ApiResponse } from "../utils/apiUtils.js";
import { User } from "../models/users.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendVerificationToken } from "../services/sendVerificationToken.js";

dotenv.config({ path: "./.env" })

const registerUser = asyncHandler(async (req, res) => {
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

    await sendVerificationToken(newUser)


})

const verifyUser = asyncHandler(async (req, res) => {
    const { token } = req.params;

    if (!token || token.trim() === "") {
        throw new ApiError(400, "Token is required for verification")
    }

    let decodeToken;

    try {
        decodeToken = jwt.verify(
            token,
            process.env.VERIFICATION_SECRET
        )

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

        if (!user) {
            throw new ApiError(404, "User Not Found")
        }

        return res.status(200).send(`
            <h1>Verification Successful</h1>
            <p>Your account has been verified successfully!</p>
        `)
    } catch (error) {
        return res.status(500).send(`
            <!DOCTYPE html>
<html lang="en">
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

export {
    registerUser,
    verifyUser
}