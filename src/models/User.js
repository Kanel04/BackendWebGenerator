const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

UserSchema.methods.matchPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
