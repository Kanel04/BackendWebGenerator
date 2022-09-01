
const ErrorResponse = require("../utils/errorResponse");
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
exports.forgotPassword = async (req, res, next) => {
    // Send Email to email provided but first check if user exists
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return next(new ErrorResponse("No email could not be sent", 404));
        }

        // Reset Token Gen and add to database hashed (private) version of token
        const resetToken = createSendToken(user, 200, res);

        await user.save();

        // Create reset url to email to provided email
        const resetUrl = `http://localhost:5000/passwordreset/${resetToken}`;

        // HTML Message
        const message = `
      <h1>Verification</h1>
      <p>S'il vous plait cliquer sur le lien pour confirmer un nouveau mot de passe link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

        try {
            await sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                text: message,
            });

            res.status(200).json({ success: true, data: "Email Sent" });
        } catch (err) {
            console.log(err);


            await user.save();

            return next(new ErrorResponse("Email could not be sent", 500));
        }
    } catch (err) {
        next(err);
    }
};
