import express from "express";
import logger from "pino-http";
import authRoutes from "./resources/auth/authRoutes.js";
import postRoutes from "./resources/posts/postsRoutes.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();

app.use(logger());
app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

const errorHandlerMiddleware = (error, req, res, next) => {
  req.log.error(error);

  switch (error.name) {
    case "ValidationError":
      const message = error.details[0].message;
      res.status(400).json({ message });
      break;
    case "JsonWebTokenError":
      res.status(403).json({ message: "Token is not valid!" });
      break;
    default:
      res.status(500).json({ message: "Internal server error!" });
  }
};

app.use(errorHandlerMiddleware);

app.listen(8800, () => {
  console.log("Started server!");
});
