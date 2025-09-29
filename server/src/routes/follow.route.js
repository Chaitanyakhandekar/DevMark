import { Router } from "express";
import 
{
    followUser,
    unfollowUser
}
from "../controllers/follow.controller.js"
import { userAuth } from "../middlewares/userAuth.middleware.js";

const router = Router();

router.route("/follow/:id").post(userAuth,followUser)

export default router;