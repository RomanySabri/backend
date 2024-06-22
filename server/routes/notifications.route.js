import { Router } from "express";
import { getNotifications } from "../controllers/notifications.controllers.js";
const router = Router();


router.route("/getnotifications").post(getNotifications);
export const notificationsRouter = router