import Certificate from "../models/certificatesModel.js";
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const getcertificate = async (req, res) => {
  const { name, certificateType } = req.body;
  try {
    const certificate = await Certificate.findOne({ name: name, certificateType: certificateType });
    if (!certificate) {
      return res.status(404).json({ status: 'fail', message: 'Certificate not found' });
    }
    const filepath = path.join(__dirname, "../uploads", certificate.imageUrl);
    res.sendFile(filepath);
    // res.json({ status: "success", data: { certificate } });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
}

export const postcertificate = async (req, res) => {
  const { name, certificateType, id } = req.body;
  const imageUrl = req.file.path;
  try {
    const certificate = new Certificate({
      name,
      certificateType,
      imageUrl: imageUrl,
      studentId: id
    });
    await certificate.save();
    res.status(200).json({ status: 'success', certificate });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

