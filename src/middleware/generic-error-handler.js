module.exports = app => {
	app.use(function(err, req, res, next) {
		req.log.error({
			errorCode: `ServerError:${err.name}`,
			stack: err.stack,
		});
		return res.status(500).json({
			serverError: true,
		});
	});
};
