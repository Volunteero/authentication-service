module.exports = app => {
	app.use(function (err, req, res, next) {

		if (err.name === 'ErrorResponse') {

			res.status(err.status).json({
				code: err.errorCode,
				message: err.message,
			});
		} else {

			// pass error to next error middleware handler
			next(err);
		}
	});
};