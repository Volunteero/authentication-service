const express = require('express');
const internalAuthMiddleWare = require('../../middleware/internal-request-auth');
const accessQueryComponentsMiddleWare = require('../../middleware/access-query-components');
const internalAccessRequestMiddleWare = require('../../middleware/interal-access-request-authorizer');
const testController = require('./test/controller');
const validate = require('express-jsonschema').validate;
// const schema = require('./input-validation-schema');

module.exports = express
	.Router()
	.get('/test', internalAuthMiddleWare, accessQueryComponentsMiddleWare, internalAccessRequestMiddleWare, testController.test);