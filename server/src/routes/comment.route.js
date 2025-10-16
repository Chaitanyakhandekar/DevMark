import {Router} from "express"
import { userAuth } from "../middlewares/userAuth.middleware.js";
import { addComment } from "../controllers/comment.controller.js";

const router = Router();


router.route("/").post(userAuth,addComment);

export default router;