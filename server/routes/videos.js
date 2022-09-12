const express = require("express");
const verifyToken = require("../verifyToken");
const {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  addView,
  random,
  trend,
  sub,
  getByTags,
  getByTitles,
} = require("../controllers/video");

const router = express.Router();

router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.post("/", verifyToken, addVideo);
router.get("/find/:id", getVideo);
router.put("/view/:id", addView);
router.get("/trend", trend);
router.get("/random", random);
router.get("/sub", verifyToken, sub);
router.get("/tags", getByTags);
router.get("/search", getByTitles);

module.exports = router;
