import { Router } from "express";
import {
  generateNewShortURl,
  shortIdFindAndRedirectURL,
  Analytics,
} from "../controllers/url.controllers.js";

const router = Router();

router.route("/").post(generateNewShortURl);
router.route("/:shortID").get(shortIdFindAndRedirectURL);
router.route("/analytics/:shortID").get(Analytics);

export default router;
