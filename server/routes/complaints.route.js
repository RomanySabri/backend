import express from "express";
import { addComplaints } from "../controllers/complaints.controllers.js";
import { getComplaints } from "../controllers/complaints.controllers.js";
import { respondToComplaint } from "../controllers/complaints.controllers.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.route("/addcomplaint").post(addComplaints);
router.route("/getcomplaint").get(getComplaints);
router.route('/:id/response').post(respondToComplaint);

export const complaintsRouter = router;
