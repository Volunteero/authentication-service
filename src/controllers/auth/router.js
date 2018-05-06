const express = require('express');
const loginController = require('./login/controller');
const logoutController = require('./logout/controller');
const accessController = require('./access/controller');
const registerController = require('./register/controller');
const refreshController = require('./refresh/controller');
const authRequiredMiddleWare = require('../../middleware/auth-required');
const accessQueryComponentsMiddleWare = require('../../middleware/access-query-components');
const userIdRequiredMiddleWare = require('../../middleware/user-id-required');
const validate = require('express-jsonschema').validate;
const schema = require('./input-validation-schema');

module.exports = express
	.Router()
	.post('/logout', logoutController.logout)
	.get('/access', userIdRequiredMiddleWare, accessQueryComponentsMiddleWare, accessController.access)
	.get('/refresh', authRequiredMiddleWare, refreshController.refresh)
	.post('/login', validate({
		body: schema
	}), loginController.login)
	.post(
		'/register',
		validate({
			body: schema
		}),
		registerController.register,
	);