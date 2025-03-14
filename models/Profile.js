const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bio: String,
    email: { type: String, required: true },
    phone: String,
    website: String
});

module.exports = mongoose.model('Profile', ProfileSchema);
