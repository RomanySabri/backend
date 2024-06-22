import express from "express";
import { getcertificate } from "../controllers/certificates.controllers.js";
import { postcertificate } from "../controllers/certificates.controllers.js";
import multer from "multer";
import { upload } from "./collegeCard.route.js";

const router = express.Router()


router.route('/getcertificate').get(getcertificate)
router.route('/addcertificate').post(upload.single('imageUrl'), postcertificate)


export const certificateRouter = router;