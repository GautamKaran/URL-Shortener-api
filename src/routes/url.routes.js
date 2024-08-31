import { Router } from "express";
import {
  generateNewShortURl,
  shortIdFindAndRedirectURL,
} from "../controllers/url.controllers.js";

const router = Router();

router.route("/").post(generateNewShortURl);
router.route("/:shortID").get(shortIdFindAndRedirectURL);

export default router;
