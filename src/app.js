require('dotenv').config();
require('express-async-errors');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSanitizer = require('express-sanitizer');
const mongoose = require('mongoose');
const cors = require('cors');
const ACL = require('acl');
const pino = require('express-pino-logger')();

mongoose.connect(process.env.MONGO_DB);

const route = require('./route');
const handleBadInputError = require('./middleware/bad-input-error-handler');
const handleGenericError = require('./middleware/generic-error-handler');
const handleUnauthorizedError = require('./middleware/unauthorized-error-handler');
const handleApiError = require('./middleware/api-error-handler');
const corsMiddleware = require('./middleware/cors');
const aclInit = require('./bootstrap/acl-init');
aclInit();

const app = express();

app.use(pino);
app.use(
	cors((req, callback) => {
		callback(null, {
			origin: true,
			credentials: true
		});
	}),
);
app.use('*', cors());
app.use(corsMiddleware);
app.use(cookieParser(process.env.PRIVATE_KEY));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(expressSanitizer());

route(app);

handleApiError(app);
handleBadInputError(app);
handleUnauthorizedError(app);

handleGenericError(app);

module.exports = app;