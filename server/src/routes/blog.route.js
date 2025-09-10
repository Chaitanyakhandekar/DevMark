import Router from 'express';
import {upload} from "../middlewares/multer.middleware.js"
import {createBlog} from "../controllers/blog.controller.js"

const router = Router();

router.route("/create").post(upload.array("images",5),createBlog)

export default router;