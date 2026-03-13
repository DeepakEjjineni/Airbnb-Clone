const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// This adds username, hash, and salt fields automatically
// Also adds methods like authenticate(), serializeUser(), etc.
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);