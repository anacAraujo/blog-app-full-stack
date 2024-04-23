import express from "express";
import logger from "pino-http";
import authRoutes from "./resources/auth/authRoutes.js";
import postRoutes from "./resources/posts/postsRoutes.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import { errorHandlerMiddleware } from "./middlewares/errorHandler.js";

const app = express();

app.use(logger());
app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
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

app.use(errorHandlerMiddleware);

app.listen(8800, () => {
  console.log("Started server!");
});
