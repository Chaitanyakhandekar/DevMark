import Router from 'express';
import {upload} from "../middlewares/multer.middleware.js"
import 
{
    createBlog,
    getAllBlogs,
    deleteBlog

}
 from "../controllers/blog.controller.js"
import { userAuth } from '../middlewares/userAuth.middleware.js';
import { blogOwner } from '../middlewares/blogOwner.middleware.js';

const router = Router();

router.route("/create").post(upload.array("images",5), userAuth, createBlog)
router.route("/").get(userAuth,getAllBlogs)
router.route("/:id").delete(userAuth,blogOwner,deleteBlog)

export default router;