const authRouter = require('./controllers/auth/router');
const internalRouter = require('./controllers/internal/router');

module.exports = app => {
	app.use('/auth', authRouter);
	app.use('/internal', internalRouter);
};
