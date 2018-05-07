const express = require('express');
const internalAuthMiddleWare = require('../../middleware/internal-request-auth');
const accessQueryComponentsMiddleWare = require('../../middleware/access-query-components');
const internalAccessRequestMiddleWare = require('../../middleware/interal-access-request-authorizer');
const usersController = require('./users/controller');
const rolesController = require('./roles/controller');
const validate = require('express-jsonschema').validate;
const createUsersSchema = require('./users/create-users-schema');
const attachRolesToUserSchema = require('./users/attach-roles-to-user-schema');
const roleResourcesActionsSchema = require('./roles/role-resources-actions-schema');
const roleNameSchema = require('./roles/role-name-schema');

module.exports = express
	.Router()
	.post(
		'/users/create',
		internalAuthMiddleWare,
		accessQueryComponentsMiddleWare,
		internalAccessRequestMiddleWare,
		validate({
			body: createUsersSchema
		}),
		usersController.create
	)
	.post(
		'/users/getRoles',
		internalAuthMiddleWare,
		accessQueryComponentsMiddleWare,
		internalAccessRequestMiddleWare,
		validate({
			body: createUsersSchema
		}),
		usersController.getRoles
	).post(
		'/users/attachRoles',
		internalAuthMiddleWare,
		accessQueryComponentsMiddleWare,
		internalAccessRequestMiddleWare,
		validate({
			body: attachRolesToUserSchema
		}),
		usersController.attachRoles
	).post(
		'/users/detachRoles',
		internalAuthMiddleWare,
		accessQueryComponentsMiddleWare,
		internalAccessRequestMiddleWare,
		validate({
			body: attachRolesToUserSchema
		}),
		usersController.dettachRoles
	)
	.post(
		'/roles/create',
		internalAuthMiddleWare,
		accessQueryComponentsMiddleWare,
		internalAccessRequestMiddleWare,
		validate({
			body: roleResourcesActionsSchema
		}),
		rolesController.create
	)
	.post(
		'/roles/getPermissions',
		internalAuthMiddleWare,
		accessQueryComponentsMiddleWare,
		internalAccessRequestMiddleWare,
		validate({
			body: roleNameSchema
		}),
		rolesController.getPermissions
	)
	.post(
		'/roles/addPermissions',
		internalAuthMiddleWare,
		accessQueryComponentsMiddleWare,
		internalAccessRequestMiddleWare,
		validate({
			body: roleResourcesActionsSchema
		}),
		rolesController.addPermissions
	)
	.post(
		'/roles/removePermissions',
		internalAuthMiddleWare,
		accessQueryComponentsMiddleWare,
		internalAccessRequestMiddleWare,
		validate({
			body: roleResourcesActionsSchema
		}),
		rolesController.removePermissions
	);