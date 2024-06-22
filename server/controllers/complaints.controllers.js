import Complaint from '../models/complaintsModel.js';

export const addComplaints = async (req, res) => {
  const { message, id } = req.body;
  try {
    const complaint = new Complaint({ studentId: id, message });
    await complaint.save();
    res.status(200).json({ status: 'success', complaint });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
}
export const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json({ status: 'success', complaints });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
}
export const respondToComplaint = async (req, res) => {
  const { response, id } = req.body;
  try {
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(200).json({ status: 'fail', message: 'Complaint not found' });
    }
    complaint.adminResponse = response;
    complaint.status = 'responded';
    await complaint.save();
    res.status(200).json({ status: 'success', complaint });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
}