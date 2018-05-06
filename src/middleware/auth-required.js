require('dotenv').config();
const jwt = require('express-jwt');
const getToken = require('../utils/get-access-token-from-request');
const secret = Buffer.from(process.env.PUBLIC_KEY, 'base64');

module.exports = jwt({
	getToken,
	secret
});