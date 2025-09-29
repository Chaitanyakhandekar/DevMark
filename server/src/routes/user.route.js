import e from 'express';
import Router from 'express';
import {
     verifyUser,
     registerUser,
     isVerifiedUser,
     loginUser,
     isLoggedInUser,
     logoutUser,
     uploadAvatar

 } from '../controllers/user.controller.js';
 import { sendVerificationToken } from '../services/sendVerificationToken.js';
 import { userAuth } from '../middlewares/userAuth.middleware.js';
 import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.route("/register").post(registerUser, sendVerificationToken)
router.route("/login").post(loginUser)
router.route("/logout").get(userAuth,logoutUser)
router.route("/email/verify/:token").get(verifyUser)
router.route("/email/is-verify/:email").get(isVerifiedUser)
router.route("/is-logged-in").get(userAuth,isLoggedInUser)
router.route("/avatar").post(userAuth,upload.single("avatar"),uploadAvatar)

export default router;