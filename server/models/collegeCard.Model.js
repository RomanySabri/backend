import mongoose from "mongoose";

const CollegeCardschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    default: "upload/profile.png",
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const CollegeCard = mongoose.model("CollegeCard", CollegeCardschema);
export default CollegeCard;
