import mongoose from "mongoose";
const Complaintsschema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  adminResponse: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: 'pending',
  },
}, { timestamps: true }
);

const Complaints = mongoose.model("Complaints", Complaintsschema);
export default Complaints;

