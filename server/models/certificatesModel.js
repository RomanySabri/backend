import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  certificateType: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true,
    default: "upload/profile.png",
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
});

const Certificate = mongoose.model('Certificate', certificateSchema);

export default Certificate;
