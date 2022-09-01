const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

exports.findAllUsers = async (req, res, next) => {
    const users = await User.find({});

    res
        .status(200)
        .json({ status: "success", itemCount: users.length, data: users });
};

exports.findUser = async (req, res, next) => {
    const _id = req.params.id;

    const user = await User.findById(_id);

    res.status(200).json({ status: "success", data: user });
};

exports.updateUser = async (req, res, next) => {
    const _id = req.params.id;
    const updatingObject = req.body;

    const user = await User.findByIdAndUpdate(_id, { ...updatingObject });
    res.status(200).json({ status: "success", data: user });
};

exports.deleteUser = async (req, res, next) => {
    const _id = req.params.id;

    const user = await User.findByIdAndDelete(_id);

    res.status(200).json({ status: "success", data: user });
};