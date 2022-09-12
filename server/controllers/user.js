const User = require("../models/User");
const mongoose = require("mongoose");
const createError = require("../error");
const Video = require("../models/Video");

const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
};
const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (error) {
      next(err);
    }
  } else {
    return next(createError(403, "You can delete only your account!"));
  }
};
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
const subscribe = async (req, res, next) => {
  try {
    // const user = await User.findById(req.user.id)
    // const isExist = user.subscribedUsers.filter((item) => {
    //   return item === req.params.id;
    // }).length;

    // if (isExist === 0) {
    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscribtion successful");
    // }else{
    //     res.status(403).json("Already Subsribed that channel");
    // }
  } catch (error) {
    next(error);
  }
};
const unsubscribe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const isExist = user.subscribedUsers.filter((item) => {
      return item === req.params.id;
    }).length;

    if (isExist > 0) {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { subscribedUsers: req.params.id },
      });
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: -1 },
      });
      res.status(200).json("Unsubscribtion successful");
    } else {
      res.status(200).json("You dont subscribe that channel");
    }
  } catch (error) {
    next(error);
  }
};

const likeVideo = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.videoId, {
      $addToSet: { likes: req.user.id },
      $pull: { dislikes: req.user.id },
    });
    res.status(200).json("You like this video");
  } catch (error) {
    next(error);
  }
};
const dislikeVideo = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.videoId, {
      $addToSet: { dislikes: req.user.id },
      $pull: { likes: req.user.id },
    });
    res.status(200).json("You dislike this video");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  likeVideo,
  dislikeVideo,
};
