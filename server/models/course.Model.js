import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  selectedGrades: {
    type: String,
    required: true,
  },
  selectedMaterials: {
    type: [String],
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
});
const ModelCourse = mongoose.model("course", courseSchema);
export default ModelCourse;
