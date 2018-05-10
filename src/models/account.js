const mongoose = require('mongoose');
const schema = mongoose.Schema({
	username: { type: String, index: true },
	password: String,
	loginAttempts: { type: Number, default: 0 },
	loginLockExpiry: Number,
});
module.exports = mongoose.model('Account', schema);
