const express = require('express');
const validate = require('express-jsonschema').validate;

const authRequiredMiddleWare = require('../../middleware/auth-required');
const accessQueryComponentsMiddleWare = require('../../middleware/access-query-components');
const userIdRequiredMiddleWare = require('../../middleware/user-id-required');

const loginController = require('./login/controller');
const accessController = require('./access/controller');
const assumeOrganisationRoleController = require('./assumeOrganisationRole/controller');
const registerController = require('./register/controller');
const refreshController = require('./refresh/controller');

const schema = require('./input-validation-schema');
const accessSchema = require('./access/access-schema');
const assumeOrganisationRoleSchema = require('./assumeOrganisationRole/access-schema');

module.exports = express
	.Router()
	.get(
		'/access',
		userIdRequiredMiddleWare,
		validate({
			query: accessSchema
		}),
		accessController.access
	)
	.get(
		'/assumeOrganisationRole',
		authRequiredMiddleWare,
		validate({
			query: assumeOrganisationRoleSchema
		}),
		assumeOrganisationRoleController.assume
	)
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