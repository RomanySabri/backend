import mongoose from "mongoose";
const Grantschema = new mongoose.Schema({
  name: {
    type: String
  },
  scholarship: {
    type: String,
  },
  date: {
    type: Date,
  },
  studentId: {
    type: mongoose.Types.ObjectId,
    ref: "Student",
  },
});

const Grant = mongoose.model("Grant", Grantschema);
export default Grant;
