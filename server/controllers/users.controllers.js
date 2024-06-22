import UserModel from "../models/user.Model.js";
import bcrypt from "bcrypt";
import { generateJWT } from "../utils/generateJWT.js";
import JWT from "jsonwebtoken";
import nodemailer from "nodemailer";
const register = async (req, res) => {
  const { name, email, password, gmail, address, phone, dateOfBirth, role } =
    req.body;

  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      return res
        .status(200)
        .json({ status: "fail", message: "Username already exists" });
    }

    const newUser = new UserModel({
      name,
      email,
      password,
      gmail,
      address,
      phone,
      dateOfBirth,
      role,
    });

    const token = await generateJWT({
      email: newUser.email,
      id: newUser._id,
      role: newUser.role,
    });
    newUser.token = token;
    await newUser.save();
    res.status(200).json({ status: "success", data: newUser });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    const id = user._id;
    if (!user) {
      res
        .status(200)
        .json({ status: "fail", message: "user or password incorrect" });
    }
    const matchpassword = await bcrypt.compare(password, user.password);
    if (user && matchpassword) {
      const token = await generateJWT({
        email: user.email,
        id: user._id,
        role: user.role,
      });
      res.status(200).json({ status: "success", data: { id, token } });
    } else {
      res.status(200).json({ status: "fail", message: "something wrong" });
    }
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

const forgetpassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      res
        .status(200)
        .json({ status: "fail", message: "user or password incorrect" });
    }
    const gmail = user.gmail;
    const token = await generateJWT({
      email: user.email,
      id: user._id,
    });
    const link = `http://localhost:4000/api/users/reset-password/${user._id}/${token}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: user.gmail,
      subject: "Reset Password",
      html: `<a href="${link}">Reset Password</a>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent hi mr roma: " + info.response + link);
      }
    });
    console.log();
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};
const rgpassword = async (req, res) => {
  const { id, token } = req.params;
  const user = await UserModel.findOne({ _id: id });
  if (!user) {
    return res.status(200).json({ status: "fail", message: "User Not Exist" });
  }
  try {
    const decodedToken = JWT.verify(token, process.env.JWT_SECRET_KEY);
    res.render("index.ejs", { email: decodedToken.email });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};
const rppassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const user = await UserModel.findOne({ _id: id });
  if (!user) {
    return res.status(200).json({ status: "fail", message: "User Not Exist" });
  }
  try {
    const decodedToken = JWT.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodedToken);
    await UserModel.findOneAndUpdate({ _id: id }, { password: password });
    res.json({ status: "updatedPassword" });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

export const users = {
  login,
  register,
  forgetpassword,
  rppassword,
  rgpassword,
};
