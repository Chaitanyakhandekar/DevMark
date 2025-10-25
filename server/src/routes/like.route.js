import Router from "express";
import {
toggleBlogLike,
isLikedToBlog
}
    from "../controllers/like.controller.js";
import {userAuth} from "../middlewares/userAuth.middleware.js"

const router = Router();

router.route("/is-liked/:id").get(userAuth,isLikedToBlog)
router.route("/:id").post(userAuth,toggleBlogLike)

export default router;