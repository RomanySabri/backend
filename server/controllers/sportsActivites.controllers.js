import Sports from "../models/sportsActivitesModel.js";

const getsports = async (req, res) => {
  try {
    const sports = await Sports.find();
    res.json({ status: "success", data: sports });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};
const addsprorts = async (req, res) => {
  const { typeactivity, name, } = req.body;
  const date = new Date();

  try {
    const newSports = new Sports({
      typeactivity,
      date,
      name,
    });
    await newSports.save();
    res.status(200).json({ status: "success", data: newSports });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

export const sports = {
  getsports,
  addsprorts,
};
