const express = require("express");
const verifyToken = require("../verifyToken");
const {
  addComment,
  deleteComment,
  getComments,
} = require("../controllers/comment");

const router = express.Router();

router.post("/", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/:videoId", verifyToken, getComments);

module.exports = router;
