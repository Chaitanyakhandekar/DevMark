import Router from 'express';
import {upload} from "../middlewares/multer.middleware.js"
import 
{
    createBlog,
    getAllBlogs,
    deleteBlog,
    updateBlog,
    getBlog,
    getUserBlogs,
    getUserDrafts

}
 from "../controllers/blog.controller.js"
import { userAuth } from '../middlewares/userAuth.middleware.js';
import { blogOwner } from '../middlewares/blogOwner.middleware.js';

const router = Router();

router.route("/create").post(upload.array("images",5), userAuth, createBlog)
router.route("/all").get(userAuth,getAllBlogs)
router.route("/user").get(userAuth,getUserBlogs)
router.route("/user/drafts").get(userAuth,getUserDrafts)
router.route("/:id").delete(userAuth,blogOwner,deleteBlog)
router.route("/:id").patch(userAuth,blogOwner,updateBlog)
router.route("/:id").get(userAuth,getBlog)

export default router;