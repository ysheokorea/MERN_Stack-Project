const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const createError = require("../error");
const jwt = require('jsonwebtoken')

const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({...req.body, password:hash});

    await newUser.save();
    res.status(200).json("User has been created!");
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {

    // DB에서 User를 찾아옴
    const user = await User.findOne({name:req.body.name});
    if(!user) return next(createError(404, "User Not Found"));

    // 비밀번호 검증
    const isCorrect = await bcrypt.compare(req.body.password, user.password)
    if(!isCorrect) return next(createError(400, "Wrong Credentials!"));

    // 성공적으로 Login 된 경우
    // JWT AccessToken 발급
    const token = jwt.sign({id : user._id}, process.env.JWT_SECRET)
    const {password, ...others} = user._doc;


    res.cookie('access_token', token, {
        httpOnly : true,
        secure : false,
    }).status(200).json(others);

  } catch (error) {
    next(error);
  }
};

const googleAuth = async (req, res, next)=>{
  try {
    const user = await User.findOne({email : req.body.email});
    if(user){
      const token = jwt.sign({id : user._id}, process.env.JWT_SECRET)
      res.cookie('access_token', token, {
        httpOnly : true,
        secure : false,
    }).status(200).json(user._doc);
    }else{
      const newUser = new User({
        ...req.body, 
        fromGoogle : true,
      })

      const savedUser = await newUser.save();
      const token = jwt.sign({id : savedUser._id}, process.env.JWT_SECRET)
      res.cookie('access_token', token, {
        httpOnly : true,
        secure : false,
    }).status(200).json(savedUser._doc);
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
    signup,
    signin,
    googleAuth
}