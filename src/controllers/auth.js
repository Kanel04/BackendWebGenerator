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

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get User based on posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with this email address", 404));
  }

  // 2) Generate random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/reset-password/${resetToken}`;

  const message = `Forgot your password ? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email `;

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
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError("There was an error sending the mail. Try again later", 500)
    );
  }
});


/* 
// @desc    Reset User Password
exports.resetPassword = async (req, res, next) => {
  // Compare token in URL params to hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Updated Success",
      token: user.getSignedJwtToken(),
    });
  } catch (err) {
    next(err);
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ sucess: true, token });
}; */


exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  // 3) Update changePasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, res);
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