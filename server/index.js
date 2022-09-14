const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

// Router
const authRoute = require("./route/auth");
const userRoute = require("./route/users");
const postRoute = require("./route/posts");
const conversationRoute = require("./route/conversations");
const messageRoute = require("./route/messages");

dotenv.config();

const app = express();

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to MONGO DB");
    })
    .catch((err) => {
      throw err;
    });
};

app.use("/image", express.static(path.join(__dirname, "public/images")));

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/api/v1/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded sucessfully");
  } catch (error) {
    console.log(error);
  }
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/conversations", conversationRoute);
app.use("/api/v1/messages", messageRoute);

app.listen(process.env.PORT, () => {
  connect();
  console.log(`Server is on ${process.env.PORT}`);
});
