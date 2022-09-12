const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const validator = require("validator");
const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Entrer votre nom"],
    },
    lastname: {
        type: String,
        required: [true, "Entrer votre prénom"],
    },
    
    email: {
        type: String,
        required: [true, "Entrer votre email"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "Entrer votre mot de passe "],
        minlength: 6,
        select: false,
    },
    role: {
        type: String,
        enum: ["admin", "operator"],
        default: "operator",
    },
    organization_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Organization",
    },
});

UserSchema.pre("save", async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified("password")) return next();
  
    this.password = await bcrypt.hash(this.password, 12);
  
    this.passwordConfirm = undefined;
    next();
  });
  
  UserSchema.pre("save", function (next) {
    if (!this.isModified("password") || this.isNew) return next();
  
    this.passwordChangedAt = Date.now() - 1000;
    next();
  });
  
  UserSchema.pre(/^find/, function (next) {
    // this points to the current query
    this.find({ active: { $ne: false } });
    next();
  });
  
  UserSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };
  
  UserSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
  
      return JWTTimestamp < changedTimestamp;
    }
    // false means NOT changed
    return false;
  };
  
  UserSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
  
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    console.log({ resetToken }, this.passwordResetToken);
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };
  
  const User = mongoose.model("User", UserSchema);
  
  module.exports = User;