import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { courses } from "../controllers/courses.controllers.js";


const router = express.Router();
router.route("/getcourse").get(courses.getAllCourses);
router.route("/addcourse").post(courses.addCourse);

export const courseRouter = router;
