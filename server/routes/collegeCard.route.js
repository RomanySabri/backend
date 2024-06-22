import express from "express";
import { card } from "../controllers/collegeCard.controllers.js";
import multer from "multer";
import { verifyToken } from "../middleware/verifyToken.js";



const router = express.Router();

const diskstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const filename = `user-${Date.now()}.${ext}`;
    console.log(filename);
    cb(null, filename);
  },
});
const fileFilter = (req, file, cb) => {
  const imageType = file.mimetype.split("/")[0];
  if (imageType == "image") {
    return cb(null, true);
  } else {
    cb(error("file must be an image"), false);
  }
};

export const upload = multer({ storage: diskstorage, fileFilter: fileFilter });

router
  .route("/addcard")
  .post(upload.single("avatar"), card.addcard);
router.route("/getcard").get(card.getcards);

export const collegecardRouter = router;
