import express from "express";
import { users } from "../controllers/users.controllers.js";

const router = express.Router();

router.route("/register").post(users.register);
router.route("/login").post(users.login);
router.route("/forget-password").post(users.forgetpassword);
router.route("/reset-password/:id/:token").get(users.rgpassword);
router.route("/reset-password/:id/:token").post(users.rppassword);

export const userRouter = router;
