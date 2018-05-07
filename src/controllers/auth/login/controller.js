require('dotenv').config();
const User = require('../../../models/user');
const bcrypt = require('bcrypt');
const generateAccessToken = require('../generate-access-token');
const { isNumber } = require('util');
const ErrorResponse = require('../../../responses/error-response');

module.exports.login = async (req, res) => {
	const { password, username } = req.body;

	// Check if there is such a user
	const user = await User.findOne({ username });
	if (user === null) {
		// No such user found
		const errorCode = 'UserNotFound';
		req.log.info({ errorCode, username });
		throw new ErrorResponse(404, errorCode, 'User not found');
	}

	// Control login attempts
	const { loginAttempts, loginLockExpiry } = user;
	let loginAttemptLock = false;
	// If we have a lock wait until the time is over
	if (loginLockExpiry > Date.now()) {
		loginAttemptLock = true;
	}
	// If there is no lock, check how many login attempts have been made
	if (loginAttempts >= 5 && !loginAttemptLock) {
		// After 5 attempts we put a new 5 minute lock
		// and reset the login attempts
		const newLoginLockExpiry = Date.now() + 5 * 60 * 1000;
		await user.update({
			loginAttempts: 0,
			loginLockExpiry: newLoginLockExpiry,
		});
		loginAttemptLock = true;
	}
	// If there is a lock, show the message
	if (loginAttemptLock) {
		const errorCode = 'LoginAttemptsExceeded';
		req.log.info({ errorCode, username });
		throw new ErrorResponse(
			401,
			errorCode,
			'You have used a wrong password more than 5 times. Try again in a few minutes',
		);
	}

	// Validate password
	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		// Password invalid
		const errorCode = 'PasswordIncorrect';
		req.log.info({ errorCode, username });
		// When password is incorrect increase login attempts
		await user.update({ loginAttempts: loginAttempts + 1 });
		throw new ErrorResponse(401, errorCode, 'Incorrect password');
	}

	// Password valid - set cookie with token
	const accessToken = generateAccessToken(user);

	// Also reset login attempts
	await user.update({ loginAttempts: 0 });

	// Send the response
	return res.status(200).json({
		accessToken,
		success: true
	});
};
