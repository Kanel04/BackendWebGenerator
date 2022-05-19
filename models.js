const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    image:
    {
        data: Buffer,
        contentType: String
    },
    classes: [{ body: String, date: Date }],
    enrolled: { type: Date, default: Date.now }
});

const user = mongoose.model('user', userSchema)

module.exports = user