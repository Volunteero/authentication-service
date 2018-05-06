module.exports.logout = async (req, res) => {

	// Logout
	res.clearCookie('accessToken');
	// Send the response
	res.status(200).json({
		success: true,
	});
};
