
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

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

// @desc    Login user
exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password is provided
    if (!email || !password) {
        return next(new ErrorResponse("Please provide an email and password", 400));
    }

    // Check that user exists by email
    const user = await User.findOne({ email: email }).select("+password");

    if (!user || !(await user.matchPassword(password, user.password))) {
        return next(new ErrorResponse("Invalid credentials", 401));
    }

    createSendToken(user, 200, res);
   
};

// @desc    Register user
exports.register = async (req, res, next) => {
    const { firstname,lastname, email, password } = req.body;

    const user = await User.create({
        firstname,
        lastname,
        email,
        password,
    });

    createSendToken(user, 200, res);
    console.log("user created");
    
};
