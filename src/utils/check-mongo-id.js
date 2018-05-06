const ErrorResponse = require('../responses/error-response');
module.exports = id => {
	if (!id.match(/^[0-9a-fA-F]{24}$/)) {
		throw new ErrorResponse(
			400,
			'BadIdFormat',
			'Id must match /^[0-9a-fA-F]{24}$/',
		);
	}
};
