const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');

// Router
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const videoRouter = require("./routes/videos");
const commentRouter = require("./routes/comments");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin : "http://localhost:3000",
  methods : ["GET", "POST", "PUT", "DELETE"],
  credentials : true,
}))
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to MONGO Database");
    })
    .catch((err) => {
      throw err;
    });
};

// API Endpoint
app.get("/", (req, res) => {
  res.json("hello server");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/comments", commentRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something wen wrong!";
  res.status(status).json({
    success : false,
    status : status,
    message : message
  });
});

app.listen(8889, () => {
  connect();
  console.log("connected to Server port of 8889");
});
