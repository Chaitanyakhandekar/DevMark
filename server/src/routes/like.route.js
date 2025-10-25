import Router from "express";
import {
toggleBlogLike
}
    from "../controllers/like.controller.js";
import {userAuth} from "../middlewares/userAuth.middleware.js"

const router = Router();

router.route("/:id").post(userAuth,toggleBlogLike)

export default router;