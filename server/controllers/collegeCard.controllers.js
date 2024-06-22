import { json } from "express";
import CollegeCard from "../models/collegeCard.Model.js";


const getcards = async (req, res) => {
  try {
    const cards = await CollegeCard.find();
    res.status(200).json({ status: "success", data: cards });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};


const addcard = async (req, res) => {
  const { name, level, id } = req.body;
  const avatar = req.file.path;
  try {
    const userId = await CollegeCard.findOne({ studentId: id });
    if (userId) {
      return res
        .status(200)
        .json({ status: "fail", message: "user exist found" });
    }
    const newCard = new CollegeCard({
      name,
      level,
      avatar: avatar,
      studentId: id,
    });
    await newCard.save();
    res.status(200).json({ status: "success", data: newCard });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};
export const card = {
  addcard,
  getcards,
};
