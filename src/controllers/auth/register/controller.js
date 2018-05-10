const Account = require('../../../models/account');
const bcrypt = require('bcrypt');
const ErrorResponse = require('../../../responses/error-response');

module.exports.register = async (req, res) => {
	let { password, username } = req.body;
	username = req.sanitize(username);
	// Check if there is such a user
	const user = await Account.findOne({ username });
	if (user !== null) {
		// User already exsists
		const errorCode = 'UserExists';
		req.log.info({ errorCode, username });
		throw new ErrorResponse(409, errorCode, 'Username exists');
	}

	// Create new user
	let newUser = new Account({
		password: await bcrypt.hash(password, 10),
		username,
	});

	// Save in DB
	const result = await newUser.save();

	// Send the response
	res.status(201).json({
		success: true,
	});
};
