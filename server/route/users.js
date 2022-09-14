const User = require("../model/User");
const router = require("express").Router();
const {
  updateUser,
  deleteUser,
  getUser,
  getFriends,
  followUser,
  unFollowUser,
} = require("../controller/user");

// Update User
router.put("/:userId", updateUser);

// Delete User
router.delete("/:userId", deleteUser);

// Get a User
router.get("/", getUser);

// get Friends
router.get("/friends/:userId", getFriends);

// Follow a User
router.put("/follow/:userId", followUser);

// Unfollow a User
router.put("/unfollow/:userId", unFollowUser);

module.exports = router;
