import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import
 { 
    createDraft,
    getAllUserDrafts
 } from "../controllers/draft.controller.js";
import { userAuth } from "../middlewares/userAuth.middleware.js";
import { draftImage } from "../middlewares/draftImage.middleware.js";


const router = Router()


router.route("/").post(userAuth,upload.array("images",5), createDraft)
router.route("/user-drafts").get(userAuth, getAllUserDrafts)

export default router;
