import ModelCourse from '../models/course.Model.js'

const getAllCourses = async (req, res) => {
  try {
    const courses = await ModelCourse.find();
    res.json({ status: "success", data: { courses } });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};


const addCourse = async (req, res) => {
  try {
    const { name, selectedGrades, selectedMaterials, id } = req.body;
    const course = await ModelCourse.findOne({ name: name });
    if (course) {
      return res.status(200).json({ message: "course already been taken" });
    }
    const newCourse = new ModelCourse(
      {
        name,
        selectedGrades,
        selectedMaterials,
        studentId: id
      }
    );
    newCourse.save();
    res.status(200).json({ status: "success", newCourse });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};


export const courses = {
  addCourse,
  getAllCourses,
};
