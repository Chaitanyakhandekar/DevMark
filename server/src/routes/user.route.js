import e from 'express';
import Router from 'express';
import {
     verifyUser,
     registerUser

 } from '../controllers/user.controller.js';
 import { sendVerificationToken } from '../services/sendVerificationToken.js';

const router = Router();

router.route("/register").post(registerUser, sendVerificationToken)
router.route("/email/verify/:token").get(verifyUser)

export default router;