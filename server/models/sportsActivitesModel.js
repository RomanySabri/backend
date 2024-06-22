import mongoose from "mongoose";
const Sportsschema = new mongoose.Schema({
  name: {
    type: String,
  },
  typeactivity: {
    type: String,
  },
  date: {
    type: Date,
  },
  studentId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});

const Sports = mongoose.model("Sports", Sportsschema);
export default Sports;
