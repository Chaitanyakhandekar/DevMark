import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createDraft } from "../controllers/draft.controller.js";
import { userAuth } from "../middlewares/userAuth.middleware.js";