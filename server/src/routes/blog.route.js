import Router from 'express';
import {upload} from "../middlewares/multer.middleware.js"
import 
{
    createBlog,
    getAllBlogs

}
 from "../controllers/blog.controller.js"
import { userAuth } from '../middlewares/userAuth.middleware.js';

const router = Router();

router.route("/create").post(upload.array("images",5), userAuth, createBlog)
router.route("/").get(userAuth,getAllBlogs)

export default router;