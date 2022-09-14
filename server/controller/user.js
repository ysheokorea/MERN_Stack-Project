const User = require("../model/User");
const bcrypt = require("bcrypt");

const updateUser = async (req, res) => {
  if (req.body.userId === req.params.userId || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt(req.body.password, salt);
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, {
        $set: req.body,
      });
      res.status(200).json({ data: user, message: "Account has been updated" });
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
};

// Delete User
const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.userId || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.userId);
      res.status(200).json("User has been deleteed");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can delete your account only!");
  }
};

// Get a User

const getUser = async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (error) {
    res.status(500).json(error);
  }
};

const followUser = async (req, res) => {
  if (req.body.userId !== req.params.userId) {
    try {
      const user = await User.findById(req.params.userId);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({
          $push: { followings: req.params.userId },
        });
        res.status(200).json("User has been followed");
      } else {
        res.status(403).json("User already follow this user");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    rs.status(403).json("You cannot follow yourself");
  }
};

const unFollowUser = async (req, res) => {
  if (req.body.userId !== req.params.userId) {
    try {
      const user = await User.findById(req.params.userId);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({
          $pull: { followings: req.params.userId },
        });
        res.status(200).json("User has been unfollowed");
      } else {
        res.status(403).json("User already unfollow this user");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    rs.status(403).json("You cannot unfollow yourself");
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  getFriends,
  followUser,
  unFollowUser,
};
