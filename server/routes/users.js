const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  likeVideo,
  dislikeVideo,
} = require("../controllers/user");
const verifyToken = require("../verifyToken");

const router = express.Router();

// update user
router.put("/:id", verifyToken,  updateUser);

// delete user
router.delete("/:id", verifyToken,  deleteUser);

// get a user
router.get("/find/:id", getUser);

// subscribe a user
router.put("/sub/:id", verifyToken, subscribe);

// unsubscribe a user
router.put("/unsub/:id", verifyToken,  unsubscribe);

// like a video
router.put("/like/:videoId", verifyToken, likeVideo);

// dislike a video
router.put("/dislike/:videoId", verifyToken, dislikeVideo);

module.exports = router;
