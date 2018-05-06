const ErrorResponse = require('../responses/error-response');
module.exports = user => {
	if (user === null) {
		throw new ErrorResponse(
			400,
			'NoUserFound',
			'There is no user with the current login',
		);
	}
};
