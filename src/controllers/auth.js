const crypto = require("crypto");
const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");
const ErrorResponse = require("../utils/errorResponse");
const AppError = require("../utils/appError");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
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



// @desc    Forgot Password Initialization
exports.forgotPassword = catchAsync(async (req, res, next) => {
    // 1) Get User based on posted email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new AppError("Email non existant", 404));
    }
  
    // 2) Generate random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
  
    // 3) Send it to user's email
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/forgotpassword/${resetToken}`;
  
    const message = `Veuiller comfirmer votre mot de passe et cliquer sur le lien: ${resetURL}.\n Si vous n'avez pas oublier votre mot de passe s'il vous plait ignorer cet email`;
  
    try {
      await sendEmail({
        email: user.email,
        subject: "Your password reset token (valid for 10 min)",
        message,
      });
      res.status(200).json({
        status: "success",
        message: "Token sent to email",
      });
    } catch (err) {
      user.passwordResetToken = undefined ;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      return next(
        new AppError("There was an error sending the mail. Try again later", 500)
      );
    }
  });


exports.updatePassword = catchAsync(async (req, res, next) => {
    // 1) Get user from collection
    const user = await User.findById(req.user.id).select("+password");
  
    // 2) Check if POSTed current password is correct
    const currentPassword = req.body.currentPassword;
  
    if (!(await user.correctPassword(currentPassword, user.password))) {
      return next(new AppError("Incorrect password", 401));
    }
    // 3) If so, update password
    user.password = req.body.password;
    
    await user.save();
  
    // 4) Log user in, send JWT
    createSendToken(user, 200, res);
  });