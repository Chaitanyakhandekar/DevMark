import { Router } from "express";
import { testRoute } from "../controllers/test.js";

const router = Router();

router.route("/test-1").get(testRoute)

export default router;