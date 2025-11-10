import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createDraft } from "../controllers/draft.controller.js";
import { userAuth } from "../middlewares/userAuth.middleware.js";
import { draftImage } from "../middlewares/draftImage.middleware.js";


const router = Router()


router.route("/").post(userAuth,upload.array("images",5), createDraft)

export default router;
