import Grant from "../models/grantsModel.js";
const getgrants = async (req, res) => {
  try {
    const grants = await Grant.find();
    res.json({ status: "success", data: grants });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};
const addgrants = async (req, res) => {
  const { name, scholarship, id } = req.body;
  const date = new Date();
  try {
    const newgrants = new Grant({
      name,
      scholarship,
      date,
      studentId: id
    });
    await newgrants.save();
    res.status(201).json({ status: "success", data: newgrants });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

export const grants = {
  getgrants,
  addgrants,
};
