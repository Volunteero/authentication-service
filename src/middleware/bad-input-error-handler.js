module.exports = app => {
	app.use(function (err, req, res, next) {

		if (err.name === 'JsonSchemaValidation') {

			res.status(400).json({
				code: 'BadParameterException',
				message: 'There are some missing or invalid parameters in the reuqest',
				errors: err.validations,
			});
		} else {

			// pass error to next error middleware handler
			next(err);
		}
	});
};