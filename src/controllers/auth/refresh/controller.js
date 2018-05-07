const User = require('../../../models/user');
const bcrypt = require('bcrypt');
const ErrorResponse = require('../../../responses/error-response');
const generateAccessToken = require('../generate-access-token');

module.exports.refresh = async (req, res) => {
	
	const accessToken = generateAccessToken(req.user);

	// Send the response
	res.status(200).json({
		accessToken,
		success: true,
	});
};
