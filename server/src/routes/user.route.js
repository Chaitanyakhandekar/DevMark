import e from 'express';
import Router from 'express';
import {
     verifyUser,
     registerUser,
     isVerifiedUser,
     loginUser,
     isLoggedInUser,
     logoutUser

 } from '../controllers/user.controller.js';
 import { sendVerificationToken } from '../services/sendVerificationToken.js';
 import { userAuth } from '../middlewares/userAuth.middleware.js';

const router = Router();

router.route("/register").post(registerUser, sendVerificationToken)
router.route("/login").post(loginUser)
router.route("/logout").get(userAuth,logoutUser)
router.route("/email/verify/:token").get(verifyUser)
router.route("/email/is-verify/:email").get(isVerifiedUser)
router.route("/is-logged-in").get(userAuth,isLoggedInUser)

export default router;