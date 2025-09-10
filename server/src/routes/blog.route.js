import Router from 'express';
import {upload} from "../middlewares/multer.middleware.js"
import {createBlog} from "../controllers/blog.controller.js"
import { userAuth } from '../middlewares/userAuth.middleware.js';

const router = Router();

router.route("/create").post(upload.array("images",5), userAuth, createBlog)

export default router;