module.exports = app => {
	app.use(function(err, req, res, next) {
		if (err.name === 'UnauthorizedError') {
			res.status(401).json({
				code: 'Unauthorized',
				message: err.message,
				errors: err.validations,
			});
		} else {
			// pass error to next error middleware handler
			next(err);
		}
	});
};
