import { Router } from "express";
import { generateNewShortURl } from "../controllers/url.controllers.js";

const router = Router();

router.route("/").post(generateNewShortURl);

export default router;
