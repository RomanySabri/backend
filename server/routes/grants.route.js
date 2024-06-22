import express from "express";
import { grants } from "../controllers/grants.controllers.js";

const router = express.Router();

router.route("/getgrants").get(grants.getgrants);
router.route("/addgrants").post(grants.addgrants);

export const grantsRouter = router;
