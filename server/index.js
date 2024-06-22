import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from 'socket.io';
import http from 'http';
import multer from 'multer';

// routesURL
import { complaintsRouter } from "./routes/complaints.route.js";
import { userRouter } from "./routes/user.route.js";
import { notificationsRouter } from "./routes/notifications.route.js";
import { courseRouter } from "./routes/course.route.js";
import { collegecardRouter } from "./routes/collegeCard.route.js";
import { sportsRouter } from "./routes/sportsActivites.route.js";
import { certificateRouter } from "./routes/certificates.route.js";
import { grantsRouter } from "./routes/grants.route.js";

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  }
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.set('io', io);

const url_mongo = process.env.MONGO_URL;
mongoose
  .connect(url_mongo, {
    serverSelectionTimeoutMS: 5000
  })
  .then(() => {
    console.log("db started");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());

// routes
app.use("/api/users", userRouter);
app.use("/api/courses", courseRouter);
app.use("/api/collegecard", collegecardRouter);
app.use("/api/notifications", notificationsRouter);
app.use("/api/complaints", complaintsRouter);
app.use("/api/sports", sportsRouter);
app.use("/api/certificates", certificateRouter);
app.use("/api/grants", grantsRouter);

// /api/users/login POST => email, password
// /api/users/forget-password POST => email
// /api/collegecard/getcard GET =>
// /api/collegecard/addcard POST => name, level, id, avatar
// /api/complaints/addcomplaint POST => message, studentId
// /api/complaints/getcomplaint GET =>
// /api/complaints/:id/response POST => response, id
// /api/sports/getsports GET =>
// /api/sports/addsports post => typeactivity, name


server.listen(4000, () => {
  console.log("application started");
});
