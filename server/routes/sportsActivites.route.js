import express from "express";
import { sports } from "../controllers/sportsActivites.controllers.js";

const router = express.Router();

router.route("/getsports").get(sports.getsports);
router.route("/addsports").post(sports.addsprorts);

export const sportsRouter = router;
