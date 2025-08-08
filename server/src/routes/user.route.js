import e from 'express';
import Router from 'express';
import {
     verifyUser,
     registerUser

 } from '../controllers/user.controller.js';

const router = Router();

router.route("/register").post(registerUser)
router.route("/email/verify/:token").get(verifyUser)

export default router;