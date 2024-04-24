import express from "express";
import logger from "pino-http";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from "cors";

import authRoutes from "./resources/auth/authRoutes.js";
import postRoutes from "./resources/posts/postsRoutes.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(logger());
app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOAD_FOLDER);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;

  res.status(200).json({ filename: file.filename });
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.use(function (req, res, next) {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandlerMiddleware);

app.listen(process.env.PORT, () => {
  console.log("Started server!");
});
