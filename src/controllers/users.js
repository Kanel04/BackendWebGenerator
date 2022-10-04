const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
exports.findAllUsers = async (req, res, next) => {
  const users = await User.find({});

  res
    .status(200)
    .json({ status: "success", itemCount: users.length, data: users });
};

// create token for uptdate password
const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // remove the password from the output
  user.password = undefined;

  res.status(statusCode).json({
      status: "success",
      token,
      data: {
          user,
      },
  });
};


exports.findUser = async (req, res, next) => {
  const _id = req.params.id;

  const user = await User.findById(_id);
  console.log(user);
  res.status(200).json({ status: "success", data: user });
};

exports.updateUser = async (req, res, next) => {
  const _id = req.params.id;
  const updatingObject = req.body;
  const password = await bcrypt.hash(updatingObject.password, 12);
  console.log(password);
  const user = await User.findByIdAndUpdate(_id, { ...updatingObject, password });
  createSendToken(user, 200, res);
};

exports.deleteUser = async (req, res, next) => {
  const _id = req.params.id;

  const user = await User.findByIdAndDelete(_id);

  res.status(200).json({ status: "success", data: user });
};