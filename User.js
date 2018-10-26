
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    profile: String,
});

const User = mongoose.model('user', userSchema);

module.exports = User;